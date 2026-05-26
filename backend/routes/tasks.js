// routes/tasks.js – CRUD endpoints for tasks scoped to authenticated user
import { Router } from 'express';
import { supabase } from '../supabaseClient.js';

const router = Router();

// GET / – list tasks for current user
router.get('/', async (req, res) => {
  const userId = req.user.id;
  const { data, error } = await supabase
    .from('tasks')
    .select('id, content')
    .eq('user_id', userId);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// POST / – create a new task
router.post('/', async (req, res) => {
  const userId = req.user.id;
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: 'Content required' });
  const { data, error } = await supabase
    .from('tasks')
    .insert([{ content, user_id: userId }])
    .single();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

// PUT /:id – update a task
router.put('/:id', async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: 'Content required' });
  // Ensure the task belongs to the user
  const { data: existing, error: fetchErr } = await supabase
    .from('tasks')
    .select('id')
    .eq('id', id)
    .eq('user_id', userId)
    .single();
  if (fetchErr) return res.status(404).json({ error: 'Task not found' });
  const { data, error } = await supabase
    .from('tasks')
    .update({ content })
    .eq('id', id);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// DELETE /:id – delete a task
router.delete('/:id', async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  // Verify ownership
  const { error: fetchErr } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id)
    .eq('user_id', userId);
  if (fetchErr) return res.status(404).json({ error: 'Task not found or not owned' });
  res.status(204).send();
});

export default router;
