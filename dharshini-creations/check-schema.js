import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bgehwvbjtyadpqkrljby.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnZWh3dmJqdHlhZHBxa3JsamJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3OTU2ODcsImV4cCI6MjA5NTM3MTY4N30.0cwbFoU8Vfu9-9exVVjIMJkoV9Iwe8lfBJqqnBUhX-Q';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkSchema() {
  const { data: catData, error: catErr } = await supabase.from('categories').select('*').limit(1);
  console.log('Categories data:', catData, 'Error:', catErr);

  const { data: prodData, error: prodErr } = await supabase.from('products').select('*').limit(1);
  console.log('Products data:', prodData, 'Error:', prodErr);
  
  // To get columns, we can just insert a bad payload and see the error, or query the REST API directly.
  // Actually, we can fetch all categories and see what columns exist if there's any data.
  // Or fetch with open-ended query.
}

checkSchema();
