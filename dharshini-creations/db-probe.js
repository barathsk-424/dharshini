import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bgehwvbjtyadpqkrljby.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnZWh3dmJqdHlhZHBxa3JsamJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3OTU2ODcsImV4cCI6MjA5NTM3MTY4N30.0cwbFoU8Vfu9-9exVVjIMJkoV9Iwe8lfBJqqnBUhX-Q';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Exhaustive column probe for key tables
const allCols = [
  'id','name','title','slug','description','image','image_url','thumbnail',
  'price','base_price','starting_price','discount','discount_price','sale_price',
  'category','category_id','brand_id','email','phone','message','subject',
  'rating','comment','review','body','content','text',
  'tags','is_customizable','is_active','is_featured','status','type',
  'colors','sizes','color','size','stock','quantity','sku','barcode',
  'avatar','avatar_url','author','user_id','user_name','customer_name',
  'date','has_video','video_url',
  'src','url','media_url','caption','permalink','link',
  'likes','views','shares','order','sort_order','position',
  'resolved','is_read','is_approved',
  'question','answer','faq_category',
  'created_at','updated_at','deleted_at',
  'meta_title','meta_description','label','badge',
  'original_price','offer_price','mrp',
  'product_id','order_id','variant_name',
  'short_description','long_description','summary',
  'specifications','features','attributes','metadata',
  'banner_image','banner_url','banner_title','banner_text',
  'code','min_order','max_discount','expiry_date','usage_limit',
  'blog_title','blog_content','blog_image','blog_author',
  'subscriber_email','subscribed_at',
  'notification_title','notification_body','notification_type',
  'payment_method','payment_status','amount','transaction_id',
  'tracking_number','shipping_status','delivery_date',
  'role','password_hash','last_login','ip_address','device'
];

async function discoverAllColumns(table) {
  const found = [];
  const promises = allCols.map(async (col) => {
    const { error } = await supabase.from(table).select(col).limit(0);
    if (!error) found.push(col);
  });
  await Promise.all(promises);
  return found;
}

async function main() {
  const tables = ['categories','products','reviews','faqs','contact_messages',
    'banners','blogs','brands','cart','coupons','product_gallery',
    'product_variants','product_tags','orders','order_items','payments',
    'wishlist','newsletter_subscribers','notifications','login_history','admins'];
  
  for (const t of tables) {
    const cols = await discoverAllColumns(t);
    console.log(`${t}: [${cols.join(', ')}]`);
  }
}

main();
