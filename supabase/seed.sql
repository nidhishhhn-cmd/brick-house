-- ================================================
-- Brick House — Sample Seed Data
-- CLEARLY IDENTIFIED AS DEMO DATA — NOT REAL CUSTOMER RECORDS
-- ================================================

-- Sample Menu Categories
INSERT INTO menu_categories (id, name, description, slug, sort_order, is_active) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'Continental', 'European-inspired dishes', 'continental', 1, true),
  ('a1000000-0000-0000-0000-000000000002', 'Chinese', 'Indo-Chinese favourites', 'chinese', 2, true),
  ('a1000000-0000-0000-0000-000000000003', 'North Indian', 'Classic North Indian cuisine', 'north-indian', 3, true),
  ('a1000000-0000-0000-0000-000000000004', 'Fast Food', 'Quick bites and snacks', 'fast-food', 4, true),
  ('a1000000-0000-0000-0000-000000000005', 'Desserts', 'Sweet endings', 'desserts', 5, true),
  ('a1000000-0000-0000-0000-000000000006', 'Beverages', 'Refreshing drinks', 'beverages', 6, true)
ON CONFLICT DO NOTHING;

-- Sample Menu Items
-- NOTE: Prices set to 0 — restaurant owner must confirm actual prices before publishing
INSERT INTO menu_items (category_id, name, description, price, is_vegetarian, is_featured, is_available, is_published, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'Chicken Lasagna', 'Layers of tender pasta, seasoned chicken, rich béchamel, and melted cheese baked to golden perfection.', 0, false, true, true, false, 1),
  ('a1000000-0000-0000-0000-000000000001', 'Spaghetti Meatballs', 'Classic spaghetti with hand-rolled meatballs in a slow-simmered tomato sauce, topped with parmesan.', 0, false, true, true, false, 2),
  ('a1000000-0000-0000-0000-000000000001', 'Peri Peri Chicken', 'Flame-grilled chicken pieces glazed in signature peri peri sauce, served with fresh herbs.', 0, false, true, true, false, 3),
  ('a1000000-0000-0000-0000-000000000001', 'Mushroom Risotto', 'Creamy arborio rice with wild mushrooms, parmesan, and truffle oil.', 0, true, false, true, false, 4),
  ('a1000000-0000-0000-0000-000000000002', 'Chilli Chicken', 'Crispy fried chicken tossed with bell peppers, onions, and fiery green chillies.', 0, false, false, true, false, 1),
  ('a1000000-0000-0000-0000-000000000002', 'Hakka Noodles', 'Stir-fried noodles with fresh vegetables and Indo-Chinese seasoning.', 0, true, false, true, false, 2),
  ('a1000000-0000-0000-0000-000000000003', 'Butter Chicken', 'Tender chicken pieces in a rich, creamy tomato-butter gravy.', 0, false, false, true, false, 1),
  ('a1000000-0000-0000-0000-000000000003', 'Paneer Tikka', 'Marinated paneer cubes grilled to perfection with bell peppers and onions.', 0, true, false, true, false, 2),
  ('a1000000-0000-0000-0000-000000000004', 'Classic Burger', 'Juicy grilled patty with lettuce, tomato, cheese, and house sauce.', 0, false, false, true, false, 1),
  ('a1000000-0000-0000-0000-000000000005', 'Chocolate Lava Cake', 'Warm, rich chocolate cake with a molten centre, served with vanilla ice cream.', 0, true, false, true, false, 1),
  ('a1000000-0000-0000-0000-000000000006', 'Fresh Lime Soda', 'Refreshing lime soda, available sweet or salted.', 0, true, false, true, false, 1)
ON CONFLICT DO NOTHING;

-- NOTE: No sample reservations with real personal data are created.
-- The admin dashboard will show real bookings once the system is live.
