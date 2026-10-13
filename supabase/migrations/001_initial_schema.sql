-- ================================================
-- Brick House — Database Schema Migration
-- Run this in your Supabase SQL Editor
-- ================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── 1. Profiles ───
-- Linked to Supabase Auth users
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'business_owner' CHECK (role IN ('platform_admin', 'business_owner')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  avatar_url TEXT,
  last_sign_in TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Trigger to auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'business_owner')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ─── 2. Menu Categories ───
CREATE TABLE IF NOT EXISTS menu_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  slug TEXT NOT NULL UNIQUE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_menu_categories_sort ON menu_categories(sort_order);
CREATE INDEX idx_menu_categories_active ON menu_categories(is_active);

-- ─── 3. Menu Items ───
CREATE TABLE IF NOT EXISTS menu_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID NOT NULL REFERENCES menu_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (price >= 0),
  image_url TEXT,
  is_vegetarian BOOLEAN NOT NULL DEFAULT false,
  is_vegan BOOLEAN NOT NULL DEFAULT false,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_available BOOLEAN NOT NULL DEFAULT true,
  is_published BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_menu_items_category ON menu_items(category_id);
CREATE INDEX idx_menu_items_published ON menu_items(is_published, is_available);
CREATE INDEX idx_menu_items_featured ON menu_items(is_featured);
CREATE INDEX idx_menu_items_sort ON menu_items(sort_order);

-- ─── 4. Reservations ───
CREATE TABLE IF NOT EXISTS reservations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  reservation_date DATE NOT NULL,
  reservation_time TIME NOT NULL,
  guest_count INTEGER NOT NULL CHECK (guest_count > 0 AND guest_count <= 20),
  special_requests TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'rejected', 'cancelled', 'completed')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_reservations_date ON reservations(reservation_date);
CREATE INDEX idx_reservations_status ON reservations(status);
CREATE INDEX idx_reservations_date_status ON reservations(reservation_date, status);

-- ─── 5. Reservation Settings ───
CREATE TABLE IF NOT EXISTS reservation_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  max_guests_per_slot INTEGER NOT NULL DEFAULT 30,
  max_reservations_per_slot INTEGER NOT NULL DEFAULT 10,
  min_advance_hours INTEGER NOT NULL DEFAULT 2,
  max_advance_days INTEGER NOT NULL DEFAULT 30,
  slot_duration_minutes INTEGER NOT NULL DEFAULT 30,
  opening_time TIME NOT NULL DEFAULT '10:30',
  closing_time TIME NOT NULL DEFAULT '22:30',
  is_reservations_enabled BOOLEAN NOT NULL DEFAULT true,
  blocked_dates JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Insert default settings
INSERT INTO reservation_settings (id) VALUES (uuid_generate_v4()) ON CONFLICT DO NOTHING;

-- ─── 6. Gallery Images ───
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  image_url TEXT NOT NULL,
  alt_text TEXT NOT NULL DEFAULT '',
  caption TEXT,
  category TEXT NOT NULL DEFAULT 'food' CHECK (category IN ('interior', 'food', 'drinks', 'ambience', 'events')),
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_gallery_published ON gallery_images(is_published);
CREATE INDEX idx_gallery_category ON gallery_images(category);
CREATE INDEX idx_gallery_sort ON gallery_images(sort_order);

-- ─── 7. Offers ───
CREATE TABLE IF NOT EXISTS offers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_homepage_banner BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_offers_active ON offers(is_active, start_date, end_date);

-- ─── 8. Contact Enquiries ───
CREATE TABLE IF NOT EXISTS contact_enquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_enquiries_status ON contact_enquiries(status);
CREATE INDEX idx_enquiries_created ON contact_enquiries(created_at DESC);

-- ─── 9. Site Settings ───
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Insert default settings
INSERT INTO site_settings (key, value) VALUES
  ('hero_heading', 'Good Food. Great Company.'),
  ('hero_subheading', 'A warm, inviting space where flavours from across the world meet the hospitality of Mangaluru.'),
  ('intro_text', 'Nestled on New Balmatta Road in the heart of Mangaluru, Brick House brings together the warmth of exposed brick, the comfort of familiar flavours, and the excitement of discovering something new.'),
  ('story_heading', 'Built on Warmth, Served with Heart'),
  ('story_content', 'Brick House was born from a simple idea — to create a space where great food and good company come together in Mangaluru.'),
  ('announcement', ''),
  ('meta_title', 'Brick House — Good Food. Great Company. | Mangaluru'),
  ('meta_description', 'A warm, inviting restaurant in Mangaluru serving Continental, Chinese, North Indian, and fast food favorites.')
ON CONFLICT (key) DO NOTHING;

-- ─── 10. Audit Logs ───
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  details JSONB,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_audit_user ON audit_logs(user_id);
CREATE INDEX idx_audit_created ON audit_logs(created_at DESC);
CREATE INDEX idx_audit_entity ON audit_logs(entity_type, entity_id);

-- ─── Updated At Trigger ───
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
DO $$
DECLARE
  t TEXT;
BEGIN
  FOR t IN
    SELECT unnest(ARRAY[
      'profiles', 'menu_categories', 'menu_items', 'reservations',
      'reservation_settings', 'gallery_images', 'offers',
      'contact_enquiries', 'site_settings'
    ])
  LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS set_updated_at ON %I', t);
    EXECUTE format('CREATE TRIGGER set_updated_at BEFORE UPDATE ON %I FOR EACH ROW EXECUTE FUNCTION update_updated_at()', t);
  END LOOP;
END;
$$;


-- ================================================
-- ROW LEVEL SECURITY POLICIES
-- ================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservation_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper function to get user role
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS TEXT AS $$
  SELECT role FROM profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- ─── Profiles ───
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (id = auth.uid());
CREATE POLICY "Platform admins can view all profiles" ON profiles
  FOR SELECT USING (get_user_role() = 'platform_admin');
CREATE POLICY "Platform admins can update profiles" ON profiles
  FOR UPDATE USING (get_user_role() = 'platform_admin');
CREATE POLICY "Users can update own profile name and avatar" ON profiles
  FOR UPDATE USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- ─── Menu Categories (public read, admin write) ───
CREATE POLICY "Public can view active categories" ON menu_categories
  FOR SELECT USING (is_active = true);
CREATE POLICY "Business owners can manage categories" ON menu_categories
  FOR ALL USING (get_user_role() IN ('business_owner', 'platform_admin'));

-- ─── Menu Items (published items public, admin manages) ───
CREATE POLICY "Public can view published items" ON menu_items
  FOR SELECT USING (is_published = true AND is_available = true);
CREATE POLICY "Business owners can manage menu items" ON menu_items
  FOR ALL USING (get_user_role() IN ('business_owner', 'platform_admin'));

-- ─── Reservations (public can insert, admin manages) ───
CREATE POLICY "Anyone can create reservations" ON reservations
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view all reservations" ON reservations
  FOR SELECT USING (get_user_role() IN ('business_owner', 'platform_admin'));
CREATE POLICY "Business owners can update reservations" ON reservations
  FOR UPDATE USING (get_user_role() IN ('business_owner', 'platform_admin'));

-- ─── Reservation Settings ───
CREATE POLICY "Public can view reservation settings" ON reservation_settings
  FOR SELECT USING (true);
CREATE POLICY "Business owners can update settings" ON reservation_settings
  FOR UPDATE USING (get_user_role() IN ('business_owner', 'platform_admin'));

-- ─── Gallery (public read published, admin manages) ───
CREATE POLICY "Public can view published gallery" ON gallery_images
  FOR SELECT USING (is_published = true);
CREATE POLICY "Business owners can manage gallery" ON gallery_images
  FOR ALL USING (get_user_role() IN ('business_owner', 'platform_admin'));

-- ─── Offers (public read active, admin manages) ───
CREATE POLICY "Public can view active offers" ON offers
  FOR SELECT USING (is_active = true AND start_date <= CURRENT_DATE AND end_date >= CURRENT_DATE);
CREATE POLICY "Business owners can manage offers" ON offers
  FOR ALL USING (get_user_role() IN ('business_owner', 'platform_admin'));

-- ─── Contact Enquiries (public can submit, admin reads) ───
CREATE POLICY "Anyone can submit enquiries" ON contact_enquiries
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view enquiries" ON contact_enquiries
  FOR SELECT USING (get_user_role() IN ('business_owner', 'platform_admin'));
CREATE POLICY "Admins can update enquiries" ON contact_enquiries
  FOR UPDATE USING (get_user_role() IN ('business_owner', 'platform_admin'));

-- ─── Site Settings (public read, admin write) ───
CREATE POLICY "Public can view site settings" ON site_settings
  FOR SELECT USING (true);
CREATE POLICY "Business owners can update site settings" ON site_settings
  FOR UPDATE USING (get_user_role() IN ('business_owner', 'platform_admin'));

-- ─── Audit Logs (platform admin only) ───
CREATE POLICY "Platform admins can view audit logs" ON audit_logs
  FOR SELECT USING (get_user_role() = 'platform_admin');
CREATE POLICY "Authenticated users can insert audit logs" ON audit_logs
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);


-- ================================================
-- STORAGE BUCKETS
-- ================================================

-- Create storage buckets for images
INSERT INTO storage.buckets (id, name, public)
VALUES ('menu-images', 'menu-images', true)
ON CONFLICT DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery-images', 'gallery-images', true)
ON CONFLICT DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('offer-images', 'offer-images', true)
ON CONFLICT DO NOTHING;

-- Storage policies — authenticated admins can upload, public can view
CREATE POLICY "Public can view menu images" ON storage.objects
  FOR SELECT USING (bucket_id = 'menu-images');
CREATE POLICY "Admins can upload menu images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'menu-images' AND auth.uid() IS NOT NULL);
CREATE POLICY "Admins can update menu images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'menu-images' AND auth.uid() IS NOT NULL);
CREATE POLICY "Admins can delete menu images" ON storage.objects
  FOR DELETE USING (bucket_id = 'menu-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Public can view gallery images" ON storage.objects
  FOR SELECT USING (bucket_id = 'gallery-images');
CREATE POLICY "Admins can upload gallery images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'gallery-images' AND auth.uid() IS NOT NULL);
CREATE POLICY "Admins can update gallery images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'gallery-images' AND auth.uid() IS NOT NULL);
CREATE POLICY "Admins can delete gallery images" ON storage.objects
  FOR DELETE USING (bucket_id = 'gallery-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Public can view offer images" ON storage.objects
  FOR SELECT USING (bucket_id = 'offer-images');
CREATE POLICY "Admins can upload offer images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'offer-images' AND auth.uid() IS NOT NULL);
