-- Seed data for SAIF STORE

-- Insert default site settings
INSERT INTO site_settings (store_name, store_description, contact_email, currency, shipping_fee, hero_title, hero_subtitle, footer_text)
VALUES (
  'SAIF STORE',
  'Premium fashion and digital products.',
  'hello@saifstore.com',
  'USD',
  5.00,
  'SAIF STORE',
  'Premium fashion and digital products. Carefully curated.'
);

-- Insert categories
INSERT INTO categories (name, slug, description, sort_order, is_active) VALUES
  ('T-Shirts', 't-shirts', 'Premium cotton tees', 1, true),
  ('Hoodies', 'hoodies', 'Comfortable hoodies', 2, true),
  ('Pants', 'pants', 'Streetwear bottoms', 3, true),
  ('Accessories', 'accessories', 'Caps, bags, and more', 4, true),
  ('Digital', 'digital', 'Digital services and products', 5, true);

-- Insert sample products (physical)
INSERT INTO products (name, slug, description, short_description, price, compare_at_price, product_type, category_id, images, thumbnail, stock, sku, status, featured, bestseller, tags) VALUES
  ('Off by Design Tee', 'off-by-design-tee', 'Made to be worn. Or judged. Or both. Premium heavyweight cotton with a minimal screen-printed design.', 'Premium heavyweight cotton tee.', 45.00, 55.00, 'physical', (SELECT id FROM categories WHERE slug = 't-shirts'), ARRAY['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80', 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80'], 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80', 24, 'SAIF-TS-001', 'active', true, false, ARRAY['tee', 'cotton', 'minimal']),
  ('Kerned Confidence Cap', 'kerned-confidence-cap', 'Designed with enough spacing to keep your thoughts aligned. Structured 6-panel cap with embroidered logo.', 'Structured cap with embroidered logo.', 35.00, NULL, 'physical', (SELECT id FROM categories WHERE slug = 'accessories'), ARRAY['https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80'], 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80', 18, 'SAIF-AC-001', 'active', false, true, ARRAY['cap', 'accessory']),
  ('Positive Space Tote', 'positive-space-tote', 'For those who believe in leaving room to breathe. Heavy canvas tote with contrast stitching.', 'Heavy canvas tote bag.', 28.00, 35.00, 'physical', (SELECT id FROM categories WHERE slug = 'accessories'), ARRAY['https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80'], 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80', 32, 'SAIF-AC-002', 'active', true, false, ARRAY['tote', 'bag']),
  ('Command K Hoodie', 'command-k-hoodie', 'The shortcut to comfort. Oversized fit hoodie with kangaroo pocket and tonal embroidery.', 'Oversized fit hoodie.', 68.00, NULL, 'physical', (SELECT id FROM categories WHERE slug = 'hoodies'), ARRAY['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80'], 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80', 12, 'SAIF-HD-001', 'active', false, true, ARRAY['hoodie', 'oversized']),
  ('Monochrome Joggers', 'monochrome-joggers', 'A declaration of intent. Relaxed fit joggers with elastic cuffs and side pockets.', 'Relaxed fit joggers.', 55.00, 70.00, 'physical', (SELECT id FROM categories WHERE slug = 'pants'), ARRAY['https://images.unsplash.com/photo-1517438476312-10d79c077509?w=800&q=80'], 'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=800&q=80', 20, 'SAIF-PT-001', 'active', false, false, ARRAY['joggers', 'pants']),
  ('Red Beanie', 'red-beanie', 'Warmth with an edge. Ribbed knit beanie in signature red.', 'Ribbed knit beanie.', 30.00, NULL, 'physical', (SELECT id FROM categories WHERE slug = 'accessories'), ARRAY['https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800&q=80'], 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800&q=80', 15, 'SAIF-AC-003', 'active', false, false, ARRAY['beanie', 'winter']);

-- Insert sample digital products
INSERT INTO products (name, slug, description, short_description, price, product_type, category_id, images, thumbnail, stock, sku, status, featured, tags, metadata) VALUES
  ('TikTok Followers — 1K', 'tiktok-followers-1k', 'Real TikTok followers delivered within 24 hours. No password required. Safe and secure.', '1,000 real TikTok followers.', 12.00, 'digital', (SELECT id FROM categories WHERE slug = 'digital'), ARRAY['https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80'], 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80', 999, 'SAIF-DG-001', 'active', true, ARRAY['tiktok', 'social', 'followers'], '{"delivery_time": "24h", "platform": "tiktok", "quantity": 1000}'::jsonb),
  ('TikTok Followers — 5K', 'tiktok-followers-5k', 'Real TikTok followers delivered within 48 hours. No password required. Safe and secure.', '5,000 real TikTok followers.', 45.00, 'digital', (SELECT id FROM categories WHERE slug = 'digital'), ARRAY['https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80'], 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80', 999, 'SAIF-DG-002', 'active', false, ARRAY['tiktok', 'social', 'followers'], '{"delivery_time": "48h", "platform": "tiktok", "quantity": 5000}'::jsonb),
  ('Instagram Likes — 500', 'instagram-likes-500', 'High-quality Instagram likes delivered instantly. Boost your engagement.', '500 Instagram likes.', 8.00, 'digital', (SELECT id FROM categories WHERE slug = 'digital'), ARRAY['https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80'], 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80', 999, 'SAIF-DG-003', 'active', false, ARRAY['instagram', 'social', 'likes'], '{"delivery_time": "instant", "platform": "instagram", "quantity": 500}'::jsonb),
  ('YouTube Views — 10K', 'youtube-views-10k', 'Real YouTube views to boost your video. Gradual delivery for safety.', '10,000 YouTube views.', 25.00, 'digital', (SELECT id FROM categories WHERE slug = 'digital'), ARRAY['https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&q=80'], 'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&q=80', 999, 'SAIF-DG-004', 'active', false, ARRAY['youtube', 'social', 'views'], '{"delivery_time": "72h", "platform": "youtube", "quantity": 10000}'::jsonb);

-- Insert variants for physical products
INSERT INTO product_variants (product_id, name, sku, price, stock, size, color) VALUES
  ((SELECT id FROM products WHERE slug = 'off-by-design-tee'), 'Small / Black', 'SAIF-TS-001-S-BLK', NULL, 8, 'S', 'Black'),
  ((SELECT id FROM products WHERE slug = 'off-by-design-tee'), 'Medium / Black', 'SAIF-TS-001-M-BLK', NULL, 8, 'M', 'Black'),
  ((SELECT id FROM products WHERE slug = 'off-by-design-tee'), 'Large / Black', 'SAIF-TS-001-L-BLK', NULL, 8, 'L', 'Black'),
  ((SELECT id FROM products WHERE slug = 'command-k-hoodie'), 'Medium / Grey', 'SAIF-HD-001-M-GRY', NULL, 6, 'M', 'Grey'),
  ((SELECT id FROM products WHERE slug = 'command-k-hoodie'), 'Large / Grey', 'SAIF-HD-001-L-GRY', NULL, 6, 'L', 'Grey'),
  ((SELECT id FROM products WHERE slug = 'monochrome-joggers'), 'Medium / Black', 'SAIF-PT-001-M-BLK', NULL, 10, 'M', 'Black'),
  ((SELECT id FROM products WHERE slug = 'monochrome-joggers'), 'Large / Black', 'SAIF-PT-001-L-BLK', NULL, 10, 'L', 'Black');

-- Insert sample coupon
INSERT INTO coupons (code, type, value, min_order_value, max_uses, is_active) VALUES
  ('WELCOME20', 'percentage', 20, 50.00, 100, true),
  ('SAIF10', 'fixed', 10, NULL, NULL, true);
