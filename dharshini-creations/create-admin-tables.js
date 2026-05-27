// create-admin-tables.js — creates all admin dashboard tables
// Run with: node create-admin-tables.js

const ACCESS_TOKEN = 'sbp_f53aa94f7db0732f91f7850f7c064c9da033b8bc';
const PROJECT_REF  = 'pzdulbzdolnrtyxnuxkp';

const sql = `
-- ── ANALYTICS METRICS (daily snapshot) ─────────────────────
create table if not exists analytics_metrics (
  id              serial primary key,
  date            date not null default current_date,
  page_views      int default 0,
  unique_visitors int default 0,
  bounce_rate     numeric(5,2) default 0,
  avg_session_sec int default 0,
  conversion_rate numeric(5,2) default 0,
  created_at      timestamptz default now()
);

-- ── ANALYTICS TRAFFIC (monthly revenue/expenses) ────────────
create table if not exists analytics_traffic (
  id           serial primary key,
  month        text not null,
  year         int not null,
  revenue      numeric(12,2) default 0,
  expenses     numeric(12,2) default 0,
  organic      int default 0,
  paid         int default 0,
  created_at   timestamptz default now()
);

-- ── ANALYTICS TOP PAGES ──────────────────────────────────────
create table if not exists analytics_top_pages (
  id           serial primary key,
  path         text not null,
  views        int default 0,
  unique_views int default 0,
  bounce_rate  numeric(5,2) default 0,
  avg_time_sec int default 0,
  created_at   timestamptz default now()
);

-- ── ANALYTICS DAILY VISITORS (bar chart) ────────────────────
create table if not exists analytics_daily_visitors (
  id         serial primary key,
  day_name   text not null,
  visitors   int default 0,
  week_start date default current_date,
  created_at timestamptz default now()
);

-- ── ANALYTICS REVENUE BY CHANNEL ────────────────────────────
create table if not exists analytics_channels (
  id         serial primary key,
  channel    text not null,
  revenue    numeric(12,2) default 0,
  period     text default 'monthly',
  created_at timestamptz default now()
);

-- ── SITE SETTINGS ────────────────────────────────────────────
create table if not exists site_settings (
  id          serial primary key,
  key         text not null unique,
  value       text,
  category    text default 'general',
  updated_at  timestamptz default now()
);

-- ── ADMIN NOTIFICATIONS ──────────────────────────────────────
create table if not exists admin_notifications (
  id         serial primary key,
  type       text not null,
  title      text not null,
  message    text,
  read       boolean default false,
  created_at timestamptz default now()
);

-- ── RLS: admin tables are private (no public access) ────────
alter table analytics_metrics       enable row level security;
alter table analytics_traffic       enable row level security;
alter table analytics_top_pages     enable row level security;
alter table analytics_daily_visitors enable row level security;
alter table analytics_channels      enable row level security;
alter table site_settings           enable row level security;
alter table admin_notifications     enable row level security;

-- Service role bypasses RLS automatically, so no policies needed
-- for admin-only tables. Anon/authenticated users cannot read them.
`;

async function runQuery(query) {
  const res = await fetch(`https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ACCESS_TOKEN}`
    },
    body: JSON.stringify({ query })
  });
  return res.json();
}

console.log('Creating admin tables...');
const r = await runQuery(sql);
if (r.error) { console.error('Error:', r.error); process.exit(1); }
console.log('✅ Admin tables created');
console.log('\nSeeding analytics data...');

const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6ZHVsYnpkb2xucnR5eG51eGtwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTg2MTIyNCwiZXhwIjoyMDk1NDM3MjI0fQ.PmFFMG6IsjTDeQGfljUU3mROSfXDYaQAl48Eac-4Zy4';
const SUPABASE_URL = 'https://pzdulbzdolnrtyxnuxkp.supabase.co';

import { createClient } from '@supabase/supabase-js';
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, { auth: { persistSession: false } });

// Seed analytics_traffic (monthly)
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const revenueData = [12000,19000,15000,22000,18000,32000,28000,35000,31000,42000,38000,48290];
const expensesData = [8000,11000,9000,13000,12000,18000,16000,20000,19000,24000,22000,28000];
const organicData = [35000,41000,38000,45000,52000,58000,61000,68000,72000,75000,81000,86000];
const paidData = [15000,18000,22000,25000,28000,31000,35000,38000,41000,45000,48000,52000];

const trafficRows = months.map((m, i) => ({
  month: m, year: 2025,
  revenue: revenueData[i], expenses: expensesData[i],
  organic: organicData[i], paid: paidData[i]
}));

const { error: e1 } = await supabase.from('analytics_traffic').upsert(trafficRows, { onConflict: 'id' });
if (e1) console.error('analytics_traffic:', e1.message);
else console.log('✅ analytics_traffic seeded');

// Seed analytics_daily_visitors
const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const visitors = [1200,1900,1500,2200,1800,3200,2800];
const { error: e2 } = await supabase.from('analytics_daily_visitors').upsert(
  days.map((d, i) => ({ day_name: d, visitors: visitors[i] })), { onConflict: 'id' }
);
if (e2) console.error('analytics_daily_visitors:', e2.message);
else console.log('✅ analytics_daily_visitors seeded');

// Seed analytics_top_pages
const topPages = [
  { path: '/shop/t-shirts', views: 24592, unique_views: 18402, bounce_rate: 42.1, avg_time_sec: 165 },
  { path: '/shop/hoodies', views: 18245, unique_views: 12890, bounce_rate: 38.5, avg_time_sec: 192 },
  { path: '/customize/hoodie', views: 15820, unique_views: 10244, bounce_rate: 25.4, avg_time_sec: 510 },
  { path: '/pricing', views: 12450, unique_views: 9800, bounce_rate: 55.2, avg_time_sec: 75 },
  { path: '/checkout', views: 8920, unique_views: 6450, bounce_rate: 12.8, avg_time_sec: 260 },
];
const { error: e3 } = await supabase.from('analytics_top_pages').upsert(topPages, { onConflict: 'id' });
if (e3) console.error('analytics_top_pages:', e3.message);
else console.log('✅ analytics_top_pages seeded');

// Seed analytics_metrics
const { error: e4 } = await supabase.from('analytics_metrics').upsert([{
  date: new Date().toISOString().split('T')[0],
  page_views: 145678, unique_visitors: 98432,
  bounce_rate: 32.4, avg_session_sec: 272, conversion_rate: 3.2
}], { onConflict: 'id' });
if (e4) console.error('analytics_metrics:', e4.message);
else console.log('✅ analytics_metrics seeded');

// Seed analytics_channels
const channels = [
  { channel: 'Organic Search', revenue: 42500 },
  { channel: 'Direct', revenue: 28300 },
  { channel: 'Social Media', revenue: 15400 },
  { channel: 'Email', revenue: 12800 },
  { channel: 'Referral', revenue: 8500 },
];
const { error: e5 } = await supabase.from('analytics_channels').upsert(channels, { onConflict: 'id' });
if (e5) console.error('analytics_channels:', e5.message);
else console.log('✅ analytics_channels seeded');

// Seed site_settings
const settings = [
  { key: 'store_name', value: 'Dharshini Creations', category: 'general' },
  { key: 'store_email', value: 'dharshini@example.com', category: 'general' },
  { key: 'store_phone', value: '+91 81224 59197', category: 'general' },
  { key: 'currency', value: 'INR', category: 'general' },
  { key: 'free_shipping_threshold', value: '1000', category: 'shipping' },
  { key: 'standard_shipping_fee', value: '80', category: 'shipping' },
  { key: 'instagram_handle', value: '@threads.by.dharshini0612', category: 'social' },
  { key: 'whatsapp_number', value: '+918122459197', category: 'social' },
];
const { error: e6 } = await supabase.from('site_settings').upsert(settings, { onConflict: 'key' });
if (e6) console.error('site_settings:', e6.message);
else console.log('✅ site_settings seeded');

console.log('\n🎉 All admin tables created and seeded!');
