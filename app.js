// app.js – Supabase client + UI logic

// Initialize Supabase client (variables from config.js)
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// UI element references
const authSection = document.getElementById("auth-section");
const appSection = document.getElementById("app-section");
const showSignInBtn = document.getElementById("show-signin");
const showSignUpBtn = document.getElementById("show-signup");
const signInForm = document.getElementById("signin-form");
const signUpForm = document.getElementById("signup-form");
const logoutBtn = document.getElementById("logout");
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

// Simple state
let user = null;

// ----- Auth UI -----
showSignInBtn.addEventListener("click", () => {
  showSignInBtn.classList.add("active");
  showSignUpBtn.classList.remove("active");
  signInForm.classList.remove("hidden");
  signUpForm.classList.add("hidden");
});
showSignUpBtn.addEventListener("click", () => {
  showSignUpBtn.classList.add("active");
  showSignInBtn.classList.remove("active");
  signUpForm.classList.remove("hidden");
  signInForm.classList.add("hidden");
});

// Sign‑In
signInForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("signin-email").value;
  const password = document.getElementById("signin-password").value;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    alert(error.message);
    return;
  }
  user = data.user;
  afterAuth();
});

// Sign‑Up
signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) {
    alert(error.message);
    return;
  }
  alert("Check your email for a confirmation link, then sign in.");
});

logoutBtn.addEventListener("click", async () => {
  await supabase.auth.signOut();
  user = null;
  authSection.classList.remove("hidden");
  appSection.classList.add("hidden");
});

// ----- After successful auth -----
async function afterAuth() {
  authSection.classList.add("hidden");
  appSection.classList.remove("hidden");
  await loadTasks();
}

// ----- Task CRUD -----
async function loadTasks() {
  const { data, error } = await supabase.from("tasks").select("id, content");
  if (error) {
    console.error(error);
    return;
  }
  taskList.innerHTML = "";
  data.forEach(renderTask);
}

function renderTask(task) {
  const li = document.createElement("li");
  li.className = "task-item";
  li.dataset.id = task.id;

  const span = document.createElement("span");
  span.textContent = task.content;

  const actions = document.createElement("div");
  actions.className = "task-actions";

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", () => editTask(task.id, span));

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.addEventListener("click", () => deleteTask(task.id));

  actions.append(editBtn, delBtn);
  li.append(span, actions);
  taskList.appendChild(li);
}

async function addTask(e) {
  e.preventDefault();
  const content = taskInput.value.trim();
  if (!content) return;
  const { data, error } = await supabase.from("tasks").insert([{ content }]);
  if (error) {
    alert(error.message);
    return;
  }
  taskInput.value = "";
  renderTask(data[0]);
}

taskForm.addEventListener("submit", addTask);

function editTask(id, textSpan) {
  const newContent = prompt("Edit task", textSpan.textContent);
  if (newContent === null) return; // cancelled
  if (!newContent.trim()) return;
  supabase.from("tasks").update({ content: newContent }).eq("id", id)
    .then(({ error }) => {
      if (error) {
        alert(error.message);
        return;
      }
      textSpan.textContent = newContent;
    });
}

async function deleteTask(id) {
  const { error } = await supabase.from("tasks").delete().eq("id", id);
  if (error) {
    alert(error.message);
    return;
  }
  const li = taskList.querySelector(`li[data-id="${id}"]`);
  if (li) li.remove();
}

// Optional: listen to auth state changes (useful for page reloads)
supabase.auth.onAuthStateChange((_event, session) => {
  if (session?.user) {
    user = session.user;
    afterAuth();
  } else {
    user = null;
    authSection.classList.remove("hidden");
    appSection.classList.add("hidden");
  }
});

