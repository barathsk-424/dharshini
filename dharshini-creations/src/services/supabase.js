/**
 * supabase.js — all Supabase data-fetching helpers
 */
import { supabase } from '../lib/supabase';

// ── CATEGORIES ──────────────────────────────────────────────

export const fetchCategories = async () => {
  const { data, error } = await supabase.from('categories').select('*').order('id');
  if (error) { console.error('fetchCategories:', error.message); return null; }
  return data.map(c => ({ ...c, startingPrice: c.starting_price }));
};

// ── PRODUCTS ────────────────────────────────────────────────

export const fetchProducts = async (categoryId = null) => {
  let query = supabase.from('products').select('*, product_images(url, is_primary)').order('id');
  if (categoryId) query = query.eq('category_id', categoryId);
  const { data, error } = await query;
  if (error) { console.error('fetchProducts:', error.message); return null; }
  return data.map(normaliseProduct);
};

export const fetchProduct = async (id) => {
  const { data, error } = await supabase
    .from('products')
    .select('*, product_images(url, is_primary), categories(name, slug)')
    .eq('id', id)
    .maybeSingle();
  if (error) { console.error('fetchProduct:', error.message); return null; }
  return data ? normaliseProduct(data) : null;
};

const normaliseProduct = (p) => ({
  ...p,
  basePrice:      p.base_price,
  categoryId:     p.category_id,
  isCustomizable: p.is_customizable,
  image: p.product_images?.find(i => i.is_primary)?.url
      || p.product_images?.[0]?.url
      || 'https://via.placeholder.com/300?text=No+Image',
});

export const createProduct = async (product) => {
  const { data, error } = await supabase
    .from('products')
    .insert([{
      category_id:     product.category_id,
      name:            product.name,
      description:     product.description,
      base_price:      product.base_price,
      tags:            product.tags || [],
      is_customizable: product.is_customizable || false,
      colors:          product.colors || [],
      sizes:           product.sizes || [],
    }])
    .select()
    .single();
  if (error) { console.error('createProduct:', error.message); return { success: false, error: error.message }; }
  // Insert primary image if provided
  if (product.image_url && data) {
    await supabase.from('product_images').insert([{ product_id: data.id, url: product.image_url, is_primary: true }]);
  }
  return { success: true, product: data };
};

export const updateProduct = async (id, updates) => {
  const { error } = await supabase.from('products').update({
    name:            updates.name,
    description:     updates.description,
    base_price:      updates.base_price,
    category_id:     updates.category_id,
    is_customizable: updates.is_customizable,
    tags:            updates.tags,
    colors:          updates.colors,
    sizes:           updates.sizes,
  }).eq('id', id);
  if (error) { console.error('updateProduct:', error.message); return false; }
  return true;
};

export const deleteProduct = async (id) => {
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) { console.error('deleteProduct:', error.message); return false; }
  return true;
};

// ── REVIEWS ─────────────────────────────────────────────────

export const fetchReviews = async () => {
  const { data, error } = await supabase.from('reviews').select('*').order('created_at', { ascending: false });
  if (error) { console.error('fetchReviews:', error.message); return null; }
  return data.map(r => ({ ...r, hasVideo: r.has_video }));
};

// ── GALLERY IMAGES ──────────────────────────────────────────

export const fetchGalleryImages = async () => {
  const { data, error } = await supabase.from('gallery_images').select('*').order('id');
  if (error) { console.error('fetchGalleryImages:', error.message); return null; }
  return data;
};

// ── INSTAGRAM POSTS ─────────────────────────────────────────

export const fetchInstagramPosts = async () => {
  const { data, error } = await supabase.from('instagram_posts').select('*').order('fetched_at', { ascending: false });
  if (error) { console.error('fetchInstagramPosts:', error.message); return null; }
  return data.map(p => ({ ...p, mediaUrl: p.media_url }));
};

// ── INQUIRIES ───────────────────────────────────────────────

export const submitInquiry = async (name, email, message) => {
  const { data, error } = await supabase.from('inquiries').insert([{ name, email, message }]).select().single();
  if (error) { console.error('submitInquiry:', error.message); return { success: false, error: error.message }; }
  return { success: true, id: data.id };
};

export const deleteInquiry = async (id) => {
  const { error } = await supabase.from('inquiries').delete().eq('id', id);
  if (error) { console.error('deleteInquiry:', error.message); return false; }
  return true;
};

// ── ORDERS ──────────────────────────────────────────────────

export const createOrder = async (order) => {
  const { data, error } = await supabase.from('orders').insert([order]).select().single();
  if (error) { console.error('createOrder:', error.message); return { success: false, error: error.message }; }
  return { success: true, order: data };
};

export const fetchUserOrders = async (userId) => {
  const { data, error } = await supabase.from('orders').select('*').eq('user_id', userId).order('created_at', { ascending: false });
  if (error) { console.error('fetchUserOrders:', error.message); return null; }
  return data;
};

// ── USER PROFILE ────────────────────────────────────────────

export const upsertUserProfile = async (profile) => {
  const { error } = await supabase.from('users').upsert(profile, { onConflict: 'id' });
  if (error) { console.error('upsertUserProfile:', error.message); return false; }
  return true;
};

export const fetchUserProfile = async (userId) => {
  const { data, error } = await supabase.from('users').select('*').eq('id', userId).maybeSingle();
  if (error) { console.error('fetchUserProfile:', error.message); return null; }
  return data;
};

// ── ADMIN: ANALYTICS ────────────────────────────────────────

export const fetchAnalyticsMetrics = async () => {
  const { data, error } = await supabase.from('analytics_metrics').select('*').order('date', { ascending: false }).limit(1).maybeSingle();
  if (error) { console.error('fetchAnalyticsMetrics:', error.message); return null; }
  return data;
};

export const fetchAnalyticsTraffic = async () => {
  const { data, error } = await supabase.from('analytics_traffic').select('*').order('id');
  if (error) { console.error('fetchAnalyticsTraffic:', error.message); return null; }
  return data;
};

export const fetchAnalyticsDailyVisitors = async () => {
  const { data, error } = await supabase.from('analytics_daily_visitors').select('*').order('id');
  if (error) { console.error('fetchAnalyticsDailyVisitors:', error.message); return null; }
  return data;
};

export const fetchAnalyticsTopPages = async () => {
  const { data, error } = await supabase.from('analytics_top_pages').select('*').order('views', { ascending: false });
  if (error) { console.error('fetchAnalyticsTopPages:', error.message); return null; }
  return data;
};

export const fetchAnalyticsChannels = async () => {
  const { data, error } = await supabase.from('analytics_channels').select('*').order('revenue', { ascending: false });
  if (error) { console.error('fetchAnalyticsChannels:', error.message); return null; }
  return data;
};

// ── ADMIN: ORDERS ────────────────────────────────────────────

export const fetchAllOrders = async () => {
  const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
  if (error) { console.error('fetchAllOrders:', error.message); return null; }
  return data.map(o => ({
    ...o,
    customer: o.shipping_address?.fullName || 'Guest',
    email:    o.shipping_address?.email || '',
    date:     new Date(o.created_at).toISOString().split('T')[0],
    amount:   `₹${o.total}`,
    product:  Array.isArray(o.items) ? o.items.map(i => i.name).join(', ') : '',
    // Normalise status to Title Case for display
    status:   o.status ? o.status.charAt(0).toUpperCase() + o.status.slice(1) : 'Pending',
  }));
};

export const updateOrderStatus = async (id, status) => {
  const { error } = await supabase.from('orders').update({ status: status.toLowerCase() }).eq('id', id);
  if (error) { console.error('updateOrderStatus:', error.message); return false; }
  return true;
};

export const deleteOrder = async (id) => {
  const { error } = await supabase.from('orders').delete().eq('id', id);
  if (error) { console.error('deleteOrder:', error.message); return false; }
  return true;
};

// ── ADMIN: USERS ─────────────────────────────────────────────

export const fetchAllUsers = async () => {
  const { data, error } = await supabase.from('users').select('*').order('created_at', { ascending: false });
  if (error) { console.error('fetchAllUsers:', error.message); return null; }
  return data.map(u => ({
    ...u,
    joined: new Date(u.created_at).toISOString().split('T')[0],
    status: u.status || 'Active',
  }));
};

export const updateUserStatus = async (id, status) => {
  const { error } = await supabase.from('users').update({ status }).eq('id', id);
  if (error) { console.error('updateUserStatus:', error.message); return false; }
  return true;
};

export const deleteUser = async (id) => {
  const { error } = await supabase.from('users').delete().eq('id', id);
  if (error) { console.error('deleteUser:', error.message); return false; }
  return true;
};

// ── ADMIN: MESSAGES (inquiries) ──────────────────────────────

export const fetchAllInquiries = async () => {
  const { data, error } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false });
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
  const { error } = await supabase.from('inquiries').update({ resolved: true }).eq('id', id);
  if (error) { console.error('markInquiryResolved:', error.message); return false; }
  return true;
};

// ── ADMIN: SITE SETTINGS ─────────────────────────────────────

export const fetchSiteSettings = async () => {
  const { data, error } = await supabase.from('site_settings').select('*');
  if (error) { console.error('fetchSiteSettings:', error.message); return null; }
  return data.reduce((acc, row) => ({ ...acc, [row.key]: row.value }), {});
};

export const updateSiteSetting = async (key, value) => {
  const { error } = await supabase.from('site_settings').upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' });
  if (error) { console.error('updateSiteSetting:', error.message); return false; }
  return true;
};

// ── ADMIN: DASHBOARD STATS ───────────────────────────────────

export const fetchDashboardStats = async () => {
  const [usersRes, ordersRes, revenueRes, productsRes] = await Promise.all([
    supabase.from('users').select('id', { count: 'exact', head: true }),
    supabase.from('orders').select('id', { count: 'exact', head: true }),
    supabase.from('orders').select('total'),
    supabase.from('products').select('id', { count: 'exact', head: true }),
  ]);
  return {
    totalUsers:    usersRes.count ?? 0,
    totalOrders:   ordersRes.count ?? 0,
    totalProducts: productsRes.count ?? 0,
    totalRevenue:  revenueRes.data ? revenueRes.data.reduce((s, o) => s + Number(o.total), 0) : 0,
  };
};

// ── ADMIN: CATEGORY SALES (for doughnut chart) ───────────────

export const fetchCategorySales = async () => {
  const { data, error } = await supabase
    .from('orders')
    .select('items');
  if (error) { console.error('fetchCategorySales:', error.message); return null; }
  // Count items per category name from order items
  const counts = {};
  data.forEach(order => {
    if (Array.isArray(order.items)) {
      order.items.forEach(item => {
        const cat = item.category || item.name || 'Other';
        counts[cat] = (counts[cat] || 0) + (item.quantity || 1);
      });
    }
  });
  return counts;
};
