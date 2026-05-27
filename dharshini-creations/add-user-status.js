const ACCESS_TOKEN = 'sbp_f53aa94f7db0732f91f7850f7c064c9da033b8bc';
const PROJECT_REF  = 'pzdulbzdolnrtyxnuxkp';

const sql = `
alter table users add column if not exists status text default 'Active';
alter table users add column if not exists phone text;
`;

const res = await fetch(`https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${ACCESS_TOKEN}` },
  body: JSON.stringify({ query: sql })
});
const data = await res.json();
if (data.error) console.error(data.error);
else console.log('✅ users table updated with status column');
