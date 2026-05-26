import {} from "../lib/supabase";

// Fetch all categories
export const fetchCategories = async () => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching categories:", error);
    return null;
  }
  return data;
};

// Fetch products by category
export const fetchProducts = async (categoryId?: number) => {
  let query = supabase.from("products").select("*, product_images(url)");

  if (categoryId) {
    query = query.eq("category_id", categoryId);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching products:", error);
    return null;
  }
  return data;
};

// Insert a new contact inquiry
export const submitInquiry = async (
  name: string,
  email: string,
  message: string,
) => {
  const { data, error } = await supabase
    .from("inquiries")
    .insert([{ name, email, message }]);

  if (error) {
    console.error("Error submitting inquiry:", error);
    return { success: false, error };
  }
  return { success: true, data };
};
