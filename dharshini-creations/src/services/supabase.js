/**
 * supabase.js — all Supabase data-fetching helpers
 * Replaces the Firebase api.js
 */
import { supabase } from '../lib/supabase';

// ── CATEGORIES ──────────────────────────────────────────────

export const fetchCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('id');
  if (error) { console.error('fetchCategories:', error.message); return null; }
  // Normalise snake_case → camelCase for backward compat
  return data.map(c => ({ ...c, startingPrice: c.starting_price }));
};

// ── PRODUCTS ────────────────────────────────────────────────

export const fetchProducts = async (categoryId = null) => {
  let query = supabase
    .from('products')
    .select('*, product_images(url, is_primary)')
    .order('id');

  if (categoryId) query = query.eq('category_id', categoryId);

  const { data, error } = await query;
  if (error) { console.error('fetchProducts:', error.message); return null; }

  return data.map(p => ({
    ...p,
    basePrice:      p.base_price,
    categoryId:     p.category_id,
    isCustomizable: p.is_customizable,
    image: p.product_images?.find(i => i.is_primary)?.url
        || p.product_images?.[0]?.url
        || 'https://via.placeholder.com/300?text=No+Image',
  }));
};

// ── SINGLE PRODUCT ──────────────────────────────────────────

export const fetchProduct = async (id) => {
  const { data, error } = await supabase
    .from('products')
    .select('*, product_images(url, is_primary), categories(name, slug)')
    .eq('id', id)
    .single();
  if (error) { console.error('fetchProduct:', error.message); return null; }
  return {
    ...data,
    basePrice:      data.base_price,
    categoryId:     data.category_id,
    isCustomizable: data.is_customizable,
    image: data.product_images?.find(i => i.is_primary)?.url
        || data.product_images?.[0]?.url
        || 'https://via.placeholder.com/300?text=No+Image',
  };
};

// ── REVIEWS ─────────────────────────────────────────────────

export const fetchReviews = async () => {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) { console.error('fetchReviews:', error.message); return null; }
  return data.map(r => ({ ...r, hasVideo: r.has_video }));
};

// ── GALLERY IMAGES ──────────────────────────────────────────

export const fetchGalleryImages = async () => {
  const { data, error } = await supabase
    .from('gallery_images')
    .select('*')
    .order('id');
  if (error) { console.error('fetchGalleryImages:', error.message); return null; }
  return data;
};

// ── INSTAGRAM POSTS ─────────────────────────────────────────

export const fetchInstagramPosts = async () => {
  const { data, error } = await supabase
    .from('instagram_posts')
    .select('*')
    .order('fetched_at', { ascending: false });
  if (error) { console.error('fetchInstagramPosts:', error.message); return null; }
  return data.map(p => ({ ...p, mediaUrl: p.media_url }));
};

// ── INQUIRIES ───────────────────────────────────────────────

export const submitInquiry = async (name, email, message) => {
  const { data, error } = await supabase
    .from('inquiries')
    .insert([{ name, email, message }])
    .select()
    .single();
  if (error) { console.error('submitInquiry:', error.message); return { success: false, error: error.message }; }
  return { success: true, id: data.id };
};

// ── ORDERS ──────────────────────────────────────────────────

export const createOrder = async (order) => {
  const { data, error } = await supabase
    .from('orders')
    .insert([order])
    .select()
    .single();
  if (error) { console.error('createOrder:', error.message); return { success: false, error: error.message }; }
  return { success: true, order: data };
};

export const fetchUserOrders = async (userId) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) { console.error('fetchUserOrders:', error.message); return null; }
  return data;
};

// ── USER PROFILE ────────────────────────────────────────────

export const upsertUserProfile = async (profile) => {
  const { error } = await supabase
    .from('users')
    .upsert(profile, { onConflict: 'id' });
  if (error) { console.error('upsertUserProfile:', error.message); return false; }
  return true;
};

export const fetchUserProfile = async (userId) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) { console.error('fetchUserProfile:', error.message); return null; }
  return data;
};

// ── ADMIN: ANALYTICS ────────────────────────────────────────

export const fetchAnalyticsMetrics = async () => {
  const { data, error } = await supabase
    .from('analytics_metrics')
    .select('*')
    .order('date', { ascending: false })
    .limit(1)
    .single();
  if (error) { console.error('fetchAnalyticsMetrics:', error.message); return null; }
  return data;
};

export const fetchAnalyticsTraffic = async () => {
  const { data, error } = await supabase
    .from('analytics_traffic')
    .select('*')
    .order('id');
  if (error) { console.error('fetchAnalyticsTraffic:', error.message); return null; }
  return data;
};

export const fetchAnalyticsDailyVisitors = async () => {
  const { data, error } = await supabase
    .from('analytics_daily_visitors')
    .select('*')
    .order('id');
  if (error) { console.error('fetchAnalyticsDailyVisitors:', error.message); return null; }
  return data;
};

export const fetchAnalyticsTopPages = async () => {
  const { data, error } = await supabase
    .from('analytics_top_pages')
    .select('*')
    .order('views', { ascending: false });
  if (error) { console.error('fetchAnalyticsTopPages:', error.message); return null; }
  return data;
};

export const fetchAnalyticsChannels = async () => {
  const { data, error } = await supabase
    .from('analytics_channels')
    .select('*')
    .order('revenue', { ascending: false });
  if (error) { console.error('fetchAnalyticsChannels:', error.message); return null; }
  return data;
};

// ── ADMIN: ORDERS ────────────────────────────────────────────

export const fetchAllOrders = async () => {
  const { data, error } = await supabase
    .from('orders')
    .select('*, users(name, email)')
    .order('created_at', { ascending: false });
  if (error) { console.error('fetchAllOrders:', error.message); return null; }
  return data.map(o => ({
    ...o,
    customer: o.users?.name || o.shipping_address?.fullName || 'Guest',
    email:    o.users?.email || o.shipping_address?.email || '',
    date:     new Date(o.created_at).toISOString().split('T')[0],
    amount:   `₹${o.total}`,
    product:  Array.isArray(o.items) ? o.items.map(i => i.name).join(', ') : '',
  }));
};

export const updateOrderStatus = async (id, status) => {
  const { error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', id);
  if (error) { console.error('updateOrderStatus:', error.message); return false; }
  return true;
};

// ── ADMIN: USERS ─────────────────────────────────────────────

export const fetchAllUsers = async () => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) { console.error('fetchAllUsers:', error.message); return null; }
  return data.map(u => ({
    ...u,
    joined: new Date(u.created_at).toISOString().split('T')[0],
    status: u.status || 'Active',
  }));
};

export const updateUserStatus = async (id, status) => {
  const { error } = await supabase
    .from('users')
    .update({ status })
    .eq('id', id);
  if (error) { console.error('updateUserStatus:', error.message); return false; }
  return true;
};

// ── ADMIN: MESSAGES (inquiries) ──────────────────────────────

export const fetchAllInquiries = async () => {
  const { data, error } = await supabase
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) { console.error('fetchAllInquiries:', error.message); return null; }
  return data.map(m => ({
    ...m,
    sender:   m.name,
    subject:  m.message.substring(0, 60) + (m.message.length > 60 ? '...' : ''),
    preview:  m.message.substring(0, 100),
    fullText: m.message,
    read:     m.resolved,
    date:     new Date(m.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
  }));
};

export const markInquiryResolved = async (id) => {
  const { error } = await supabase
    .from('inquiries')
    .update({ resolved: true })
    .eq('id', id);
  if (error) { console.error('markInquiryResolved:', error.message); return false; }
  return true;
};

// ── ADMIN: SITE SETTINGS ─────────────────────────────────────

export const fetchSiteSettings = async () => {
  const { data, error } = await supabase
    .from('site_settings')
    .select('*');
  if (error) { console.error('fetchSiteSettings:', error.message); return null; }
  // Convert array to key-value object
  return data.reduce((acc, row) => ({ ...acc, [row.key]: row.value }), {});
};

export const updateSiteSetting = async (key, value) => {
  const { error } = await supabase
    .from('site_settings')
    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' });
  if (error) { console.error('updateSiteSetting:', error.message); return false; }
  return true;
};

// ── ADMIN: DASHBOARD STATS ───────────────────────────────────

export const fetchDashboardStats = async () => {
  const [usersRes, ordersRes, revenueRes] = await Promise.all([
    supabase.from('users').select('id', { count: 'exact', head: true }),
    supabase.from('orders').select('id', { count: 'exact', head: true }),
    supabase.from('orders').select('total'),
  ]);

  const totalUsers   = usersRes.count ?? 0;
  const totalOrders  = ordersRes.count ?? 0;
  const totalRevenue = revenueRes.data
    ? revenueRes.data.reduce((sum, o) => sum + Number(o.total), 0)
    : 0;

  return { totalUsers, totalOrders, totalRevenue };
};
