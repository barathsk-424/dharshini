import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bgehwvbjtyadpqkrljby.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnZWh3dmJqdHlhZHBxa3JsamJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3OTU2ODcsImV4cCI6MjA5NTM3MTY4N30.0cwbFoU8Vfu9-9exVVjIMJkoV9Iwe8lfBJqqnBUhX-Q';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkTables() {
  const { data, error } = await supabase.from('products').select('*').limit(1);
  if (error) {
    console.error('Error fetching products:', error.message);
  } else {
    console.log('Products data:', data);
  }
}

checkTables();
