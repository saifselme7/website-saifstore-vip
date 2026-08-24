-- Row Level Security Policies for SAIF STORE

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Profiles: users see own profile, admins see all
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id OR EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Categories: public read, admin write
CREATE POLICY "Categories public read"
  ON categories FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Categories admin write"
  ON categories FOR ALL
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- Products: public read active, admin all
CREATE POLICY "Products public read active"
  ON products FOR SELECT
  TO authenticated, anon
  USING (status = 'active');

CREATE POLICY "Products admin all"
  ON products FOR ALL
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- Variants: public read, admin write
CREATE POLICY "Variants public read"
  ON product_variants FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Variants admin write"
  ON product_variants FOR ALL
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- Wishlists: own only
CREATE POLICY "Wishlists own"
  ON wishlists FOR ALL
  USING (auth.uid() = user_id);

-- Carts: own or session
CREATE POLICY "Carts own or session"
  ON carts FOR ALL
  USING (user_id = auth.uid() OR session_id = coalesce(current_setting('request.headers'::text, true)::json->>'x-session-id', ''));

-- Cart items: through cart ownership
CREATE POLICY "Cart items through cart"
  ON cart_items FOR ALL
  USING (EXISTS (
    SELECT 1 FROM carts WHERE carts.id = cart_items.cart_id AND (carts.user_id = auth.uid() OR carts.session_id = coalesce(current_setting('request.headers'::text, true)::json->>'x-session-id', ''))
  ));

-- Orders: own orders, admin all
CREATE POLICY "Orders own"
  ON orders FOR SELECT
  USING (user_id = auth.uid() OR EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

CREATE POLICY "Orders user insert"
  ON orders FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Orders admin update"
  ON orders FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- Order items: through order ownership
CREATE POLICY "Order items through order"
  ON order_items FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND (orders.user_id = auth.uid() OR EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
    ))
  ));

CREATE POLICY "Order items admin insert"
  ON order_items FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- Coupons: public read active, admin all
CREATE POLICY "Coupons public read active"
  ON coupons FOR SELECT
  TO authenticated, anon
  USING (is_active = true);

CREATE POLICY "Coupons admin all"
  ON coupons FOR ALL
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- Reviews: public read approved, own write
CREATE POLICY "Reviews public read approved"
  ON reviews FOR SELECT
  TO authenticated, anon
  USING (status = 'approved');

CREATE POLICY "Reviews own write"
  ON reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Reviews admin manage"
  ON reviews FOR ALL
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));

-- Site settings: public read, admin write
CREATE POLICY "Site settings public read"
  ON site_settings FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Site settings admin write"
  ON site_settings FOR ALL
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  ));
