import { z } from 'zod';

// ─── Reservation Validation ───
export const reservationSchema = z.object({
  customer_name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long'),
  customer_phone: z.string()
    .regex(/^[+]?[\d\s-]{10,15}$/, 'Please enter a valid phone number'),
  customer_email: z.string()
    .email('Please enter a valid email')
    .optional()
    .or(z.literal('')),
  reservation_date: z.string()
    .min(1, 'Please select a date'),
  reservation_time: z.string()
    .min(1, 'Please select a time'),
  guest_count: z.number()
    .min(1, 'At least 1 guest required')
    .max(20, 'For larger parties, please call us directly'),
  special_requests: z.string()
    .max(500, 'Special requests must be under 500 characters')
    .optional(),
});

export type ReservationInput = z.infer<typeof reservationSchema>;

// ─── Contact Form Validation ───
export const contactSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long'),
  email: z.string()
    .email('Please enter a valid email'),
  phone: z.string()
    .regex(/^[+]?[\d\s-]{10,15}$/, 'Please enter a valid phone number')
    .optional()
    .or(z.literal('')),
  subject: z.string()
    .min(2, 'Subject must be at least 2 characters')
    .max(200, 'Subject is too long'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message is too long'),
});

export type ContactInput = z.infer<typeof contactSchema>;

// ─── Menu Item Validation ───
export const menuItemSchema = z.object({
  category_id: z.string().uuid('Please select a category'),
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long'),
  description: z.string()
    .max(500, 'Description is too long')
    .optional()
    .or(z.literal('')),
  price: z.number()
    .min(0, 'Price cannot be negative')
    .max(50000, 'Price seems too high'),
  is_vegetarian: z.boolean().default(false),
  is_vegan: z.boolean().default(false),
  is_featured: z.boolean().default(false),
  is_available: z.boolean().default(true),
  is_published: z.boolean().default(false),
  sort_order: z.number().int().min(0).default(0),
});

export type MenuItemInput = z.infer<typeof menuItemSchema>;

// ─── Menu Category Validation ───
export const menuCategorySchema = z.object({
  name: z.string()
    .min(2, 'Category name must be at least 2 characters')
    .max(50, 'Category name is too long'),
  description: z.string()
    .max(200, 'Description is too long')
    .optional()
    .or(z.literal('')),
  sort_order: z.number().int().min(0).default(0),
  is_active: z.boolean().default(true),
});

export type MenuCategoryInput = z.infer<typeof menuCategorySchema>;

// ─── Offer Validation ───
export const offerSchema = z.object({
  title: z.string()
    .min(2, 'Title must be at least 2 characters')
    .max(100, 'Title is too long'),
  description: z.string()
    .max(500, 'Description is too long')
    .optional()
    .or(z.literal('')),
  start_date: z.string().min(1, 'Please select a start date'),
  end_date: z.string().min(1, 'Please select an end date'),
  is_active: z.boolean().default(true),
  is_homepage_banner: z.boolean().default(false),
});

export type OfferInput = z.infer<typeof offerSchema>;

// ─── Login Validation ───
export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export type LoginInput = z.infer<typeof loginSchema>;

// ─── Site Settings Validation ───
export const siteSettingSchema = z.object({
  key: z.string().min(1),
  value: z.string(),
});

// ─── Gallery Image Validation ───
export const galleryImageSchema = z.object({
  alt_text: z.string()
    .min(2, 'Alt text is required for accessibility')
    .max(200, 'Alt text is too long'),
  caption: z.string()
    .max(300, 'Caption is too long')
    .optional()
    .or(z.literal('')),
  category: z.enum(['interior', 'food', 'drinks', 'ambience', 'events']),
  sort_order: z.number().int().min(0).default(0),
  is_published: z.boolean().default(true),
});

export type GalleryImageInput = z.infer<typeof galleryImageSchema>;
