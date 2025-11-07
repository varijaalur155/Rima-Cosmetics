// Script to seed products into the database
// This file provides SQL statements to populate the database with all products

export const seedProductsSQL = `
-- Seed all products for Rima Cosmetics

-- Hair Oil
INSERT INTO kv_store_35cd97c6 (key, value) VALUES (
  'product:1',
  '{"id":"1","name":"Hair Oil","price":175,"category":"hair-care","description":"100% organic hair oil for nourishment and hair growth. Made with natural herbs.","image":"https://images.unsplash.com/photo-1669281393403-e1f3248dce2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800","inStock":true,"volume":"100ml"}'::jsonb
) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Herbal Shampoo
INSERT INTO kv_store_35cd97c6 (key, value) VALUES (
  'product:2',
  '{"id":"2","name":"Herbal Shampoo","price":175,"category":"hair-care","description":"Natural herbal shampoo for healthy, shiny hair. SLS and paraben free.","image":"https://images.unsplash.com/photo-1608571899793-a1c0c27a7555?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800","inStock":true,"volume":"100ml"}'::jsonb
) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Coconut Milk Soap
INSERT INTO kv_store_35cd97c6 (key, value) VALUES (
  'product:3',
  '{"id":"3","name":"Coconut Milk Soap","price":150,"category":"soap","description":"Moisturizing coconut milk soap for soft and smooth skin.","image":"https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800","inStock":true}'::jsonb
) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Herbal Bath Powder
INSERT INTO kv_store_35cd97c6 (key, value) VALUES (
  'product:4',
  '{"id":"4","name":"Herbal Bath Powder","price":120,"category":"skin-care","description":"Traditional herbal bath powder for natural cleansing and glow.","image":"https://images.unsplash.com/photo-1717051029512-6c8e675a5ad0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800","inStock":true,"volume":"100gm"}'::jsonb
) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Aloe Vera Gel
INSERT INTO kv_store_35cd97c6 (key, value) VALUES (
  'product:5',
  '{"id":"5","name":"Aloe Vera Gel","price":100,"category":"skin-care","description":"Pure aloe vera gel for skin hydration and soothing.","image":"https://images.unsplash.com/photo-1619451334792-150fd785ee74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800","inStock":true}'::jsonb
) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Saffron Gel
INSERT INTO kv_store_35cd97c6 (key, value) VALUES (
  'product:6',
  '{"id":"6","name":"Saffron Gel","price":100,"category":"skin-care","description":"Luxurious saffron gel for radiant and glowing skin.","image":"https://images.unsplash.com/photo-1760507776802-358a3868cbb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800","inStock":true}'::jsonb
) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Lipstick
INSERT INTO kv_store_35cd97c6 (key, value) VALUES (
  'product:7',
  '{"id":"7","name":"Lipstick (Red, Pink)","price":100,"category":"lip-care","description":"100% organic lipstick available in red and pink shades.","image":"https://images.unsplash.com/photo-1584013544027-acfe4d8ca478?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800","inStock":true}'::jsonb
) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Lip Balm
INSERT INTO kv_store_35cd97c6 (key, value) VALUES (
  'product:8',
  '{"id":"8","name":"Lip Balm (Beetroot, Rose)","price":50,"category":"lip-care","description":"Nourishing lip balm with natural beetroot and rose extracts.","image":"https://images.unsplash.com/photo-1556228720-74787810a501?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800","inStock":true}'::jsonb
) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Neem Tulasi Soap
INSERT INTO kv_store_35cd97c6 (key, value) VALUES (
  'product:9',
  '{"id":"9","name":"Neem Tulasi Soap","price":100,"category":"soap","description":"Antibacterial neem and tulasi soap for clear skin.","image":"https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800","inStock":true}'::jsonb
) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Detan Soap
INSERT INTO kv_store_35cd97c6 (key, value) VALUES (
  'product:10',
  '{"id":"10","name":"Detan Soap","price":100,"category":"soap","description":"Natural de-tan soap to remove tan and brighten skin.","image":"https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800","inStock":true}'::jsonb
) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Sandalwood Soap
INSERT INTO kv_store_35cd97c6 (key, value) VALUES (
  'product:11',
  '{"id":"11","name":"Sandalwood Soap","price":100,"category":"soap","description":"Premium sandalwood soap for fragrant and glowing skin.","image":"https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800","inStock":true}'::jsonb
) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Pigmentation Soap
INSERT INTO kv_store_35cd97c6 (key, value) VALUES (
  'product:12',
  '{"id":"12","name":"Pigmentation Soap","price":100,"category":"soap","description":"Specially formulated soap to reduce pigmentation.","image":"https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800","inStock":true}'::jsonb
) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Shampoo Bar
INSERT INTO kv_store_35cd97c6 (key, value) VALUES (
  'product:13',
  '{"id":"13","name":"Shampoo Bar","price":250,"category":"hair-care","description":"Eco-friendly shampoo bar for natural hair cleansing.","image":"https://images.unsplash.com/photo-1621483942317-baa33317d58f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800","inStock":true}'::jsonb
) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Saffron Soap
INSERT INTO kv_store_35cd97c6 (key, value) VALUES (
  'product:14',
  '{"id":"14","name":"Saffron Soap","price":150,"category":"soap","description":"Luxurious saffron soap for radiant complexion.","image":"https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800","inStock":true}'::jsonb
) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Baby Bath Soap
INSERT INTO kv_store_35cd97c6 (key, value) VALUES (
  'product:15',
  '{"id":"15","name":"Baby Bath Soap (Nalangumaavu)","price":150,"category":"soap","description":"Gentle baby bath soap with traditional nalangumaavu.","image":"https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800","inStock":true}'::jsonb
) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Face Wash
INSERT INTO kv_store_35cd97c6 (key, value) VALUES (
  'product:16',
  '{"id":"16","name":"Face Wash","price":185,"category":"skin-care","description":"SLS and paraben free face wash for gentle cleansing.","image":"https://images.unsplash.com/photo-1609175214983-594001465d18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800","inStock":true,"volume":"100ml"}'::jsonb
) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Body Wash
INSERT INTO kv_store_35cd97c6 (key, value) VALUES (
  'product:17',
  '{"id":"17","name":"Body Wash","price":300,"category":"skin-care","description":"Organic body wash for refreshing and nourishing skin.","image":"https://images.unsplash.com/photo-1647452118444-44d38fc1637b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800","inStock":true,"volume":"100ml"}'::jsonb
) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Under Eye Gel
INSERT INTO kv_store_35cd97c6 (key, value) VALUES (
  'product:18',
  '{"id":"18","name":"Under Eye Gel","price":300,"category":"skin-care","description":"Reduces dark circles and puffiness around eyes.","image":"https://images.unsplash.com/photo-1592869642456-7fee88e27aad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800","inStock":true}'::jsonb
) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Skin Whitening Cream
INSERT INTO kv_store_35cd97c6 (key, value) VALUES (
  'product:19',
  '{"id":"19","name":"Skin Whitening Cream","price":200,"category":"skin-care","description":"Natural skin brightening cream for even tone.","image":"https://images.unsplash.com/photo-1751821195194-0bbc1caab446?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800","inStock":true}'::jsonb
) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Body Scrub
INSERT INTO kv_store_35cd97c6 (key, value) VALUES (
  'product:20',
  '{"id":"20","name":"Body Scrub","price":350,"category":"skin-care","description":"Exfoliating body scrub for smooth and glowing skin.","image":"https://images.unsplash.com/photo-1677769237703-629d082d89bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800","inStock":true}'::jsonb
) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Leave-in Conditioner
INSERT INTO kv_store_35cd97c6 (key, value) VALUES (
  'product:21',
  '{"id":"21","name":"Leave-in Conditioner","price":300,"category":"hair-care","description":"Nourishing leave-in conditioner for manageable hair.","image":"https://images.unsplash.com/photo-1686121544192-6112bb5ffded?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800","inStock":true}'::jsonb
) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Anti-Dandruff Shampoo
INSERT INTO kv_store_35cd97c6 (key, value) VALUES (
  'product:22',
  '{"id":"22","name":"Anti-Dandruff Shampoo","price":200,"category":"hair-care","description":"Effective anti-dandruff shampoo with natural ingredients.","image":"https://images.unsplash.com/photo-1704819177121-cd91a0d4351c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800","inStock":true}'::jsonb
) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
`;

// Instructions for using this seed script:
// 1. Copy the SQL above
// 2. Go to Supabase Dashboard → SQL Editor
// 3. Create a new query
// 4. Paste the SQL
// 5. Click Run
// 6. All products will be added to your database
