-- ============================================
-- ORGANIC GARLIC PREMIUM - DATABASE SCHEMA
-- Run this in Supabase SQL Editor
-- ============================================

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  compare_price DECIMAL(10,2),
  unit TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  nutrition JSONB DEFAULT '{}',
  benefits TEXT[] DEFAULT '{}',
  storage TEXT,
  in_stock BOOLEAN DEFAULT true,
  weight TEXT,
  origin TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  items JSONB NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  shipping DECIMAL(10,2) DEFAULT 0,
  discount DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','confirmed','processing','shipped','delivered','cancelled')),
  user_id UUID REFERENCES auth.users(id),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  shipping_address TEXT NOT NULL,
  shipping_city TEXT NOT NULL,
  shipping_state TEXT NOT NULL,
  shipping_pincode TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  payment_id TEXT,
  razorpay_order_id TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Coupons table
CREATE TABLE IF NOT EXISTS coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  discount_percent INTEGER,
  discount_amount DECIMAL(10,2),
  min_order DECIMAL(10,2) DEFAULT 0,
  max_uses INTEGER,
  used_count INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  phone TEXT,
  address JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Newsletter subscribers
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admin users
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin','superadmin')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_product ON reviews(product_id);

-- RLS Policies
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Public read access for products
CREATE POLICY "Public can view products" ON products FOR SELECT USING (true);
CREATE POLICY "Public can view reviews" ON reviews FOR SELECT USING (true);

-- Authenticated insert for orders
CREATE POLICY "Anyone can create orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (user_id = auth.uid());

-- Subscribers
CREATE POLICY "Anyone can subscribe" ON subscribers FOR INSERT WITH CHECK (true);

-- Seed data
INSERT INTO products (name, slug, description, price, compare_price, unit, images, category, tags, nutrition, benefits, storage, in_stock, weight, origin) VALUES
('Premium Peeled Garlic', 'premium-peeled-garlic', 'Hand-selected, organically grown premium garlic cloves, carefully peeled and packed at peak freshness.', 349, 449, '250g pack', ARRAY['/images/garlic-peeled.jpg'], 'Garlic', ARRAY['organic','premium','peeled'], '{"calories":4,"fat":0,"carbs":1,"protein":0.2,"fiber":0.1,"vitaminC":1,"manganese":2}', ARRAY['Boosts immune system','Natural antibiotic properties','Supports heart health','Rich in antioxidants'], 'Store in a cool, dry place. Refrigerate after opening.', true, '250g', 'Himachal Pradesh, India'),
('Organic Garlic Whole', 'organic-garlic-whole', 'Farm-fresh whole organic garlic bulbs. Sun-dried and cured naturally for maximum flavor.', 199, 249, '500g pack', ARRAY['/images/garlic-whole.jpg'], 'Garlic', ARRAY['organic','whole','bulbs'], '{"calories":4,"fat":0,"carbs":1,"protein":0.2,"fiber":0.1,"vitaminC":1,"manganese":2}', ARRAY['Heart health support','Natural immunity booster','Anti-inflammatory properties'], 'Store in a cool, dark, well-ventilated area.', true, '500g', 'Himachal Pradesh, India'),
('Black Garlic Fermented', 'black-garlic-fermented', 'Premium aged black garlic, fermented over 60 days. Sweet, umami-rich flavor with zero pungency.', 599, 749, '100g pack', ARRAY['/images/black-garlic.jpg'], 'Specialty', ARRAY['fermented','black garlic','aged'], '{"calories":6,"fat":0,"carbs":1.5,"protein":0.3,"fiber":0.2,"vitaminC":0.5,"manganese":1}', ARRAY['Double the antioxidants','Easier to digest','Rich umami flavor','No garlic breath'], 'Store in a cool, dry place.', true, '100g', 'Himachal Pradesh, India'),
('Garlic Powder Premium', 'garlic-powder-premium', 'Finely ground powder from sun-dried organic garlic cloves. No additives or preservatives.', 249, NULL, '100g jar', ARRAY['/images/garlic-powder.jpg'], 'Spices', ARRAY['powder','dried','seasoning'], '{"calories":10,"fat":0,"carbs":2,"protein":0.5,"fiber":0.1,"vitaminC":0,"manganese":1}', ARRAY['Long shelf life','Concentrated flavor','Versatile seasoning'], 'Store in an airtight container.', true, '100g', 'Himachal Pradesh, India'),
('Garlic Infused Olive Oil', 'garlic-infused-olive-oil', 'Cold-pressed extra virgin olive oil gently infused with organic garlic.', 449, NULL, '250ml bottle', ARRAY['/images/garlic-oil.jpg'], 'Oils', ARRAY['infused','olive oil','dressing'], '{"calories":120,"fat":14,"carbs":0,"protein":0,"fiber":0,"vitaminC":0,"manganese":0}', ARRAY['Premium cold-pressed','Natural garlic infusion','Heart-healthy fats'], 'Store away from direct sunlight.', true, '250ml', 'Himachal Pradesh, India'),
('Organic Garlic Chutney', 'organic-garlic-chutney', 'Traditional Indian garlic chutney made with organic ingredients. No artificial preservatives.', 179, NULL, '200g jar', ARRAY['/images/garlic-chutney.jpg'], 'Condiments', ARRAY['chutney','spread','traditional'], '{"calories":25,"fat":1.5,"carbs":3,"protein":0.5,"fiber":0.3,"vitaminC":1,"manganese":0.5}', ARRAY['Traditional recipe','No preservatives','Bold flavor'], 'Refrigerate after opening.', true, '200g', 'Himachal Pradesh, India');
