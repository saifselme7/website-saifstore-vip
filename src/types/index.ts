export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: number;
  compare_at_price: number | null;
  product_type: 'physical' | 'digital';
  category_id: string | null;
  images: string[];
  thumbnail: string | null;
  stock: number;
  sku: string | null;
  status: 'active' | 'draft' | 'archived';
  featured: boolean;
  bestseller: boolean;
  tags: string[];
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
  categories?: Category;
  variants?: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  product_id: string;
  name: string;
  sku: string | null;
  price: number | null;
  stock: number;
  size: string | null;
  color: string | null;
  image: string | null;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface CartItem {
  id: string;
  product: Product;
  variant: ProductVariant | null;
  quantity: number;
}

export interface WishlistItem {
  id: string;
  product: Product;
  created_at: string;
}

export interface Order {
  id: string;
  order_number: string;
  user_id: string;
  status: OrderStatus;
  subtotal: number;
  discount: number;
  total: number;
  coupon_code: string | null;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  shipping_address: Record<string, any> | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'ready'
  | 'shipped'
  | 'delivered'
  | 'completed'
  | 'cancelled'
  | 'rejected';

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  variant_id: string | null;
  product_name: string;
  variant_name: string | null;
  price: number;
  quantity: number;
  total: number;
  product?: Product;
}

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  title: string;
  body: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  user?: { full_name: string; avatar_url: string | null };
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  min_order_value: number | null;
  max_uses: number | null;
  uses_count: number;
  expires_at: string | null;
  is_active: boolean;
  created_at: string;
}

export interface SiteSettings {
  id: string;
  store_name: string;
  store_description: string;
  logo_url: string | null;
  favicon_url: string | null;
  contact_email: string;
  contact_phone: string | null;
  social_links: Record<string, string>;
  announcement: string | null;
  maintenance_mode: boolean;
  currency: string;
  shipping_fee: number;
  free_shipping_threshold: number | null;
  hero_title: string | null;
  hero_subtitle: string | null;
  hero_image: string | null;
  footer_text: string | null;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  address: Record<string, any> | null;
  role: 'customer' | 'admin';
  created_at: string;
  updated_at: string;
}
