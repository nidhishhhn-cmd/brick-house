// ─── Database Types ───

export type UserRole = 'platform_admin' | 'business_owner';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  role: UserRole;
  is_active: boolean;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
  last_sign_in: string | null;
}

export interface MenuCategory {
  id: string;
  name: string;
  description: string | null;
  slug: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface MenuItem {
  id: string;
  category_id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  is_vegetarian: boolean;
  is_vegan: boolean;
  is_featured: boolean;
  is_available: boolean;
  is_published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  // Joined
  category?: MenuCategory;
}

export type ReservationStatus = 'pending' | 'confirmed' | 'rejected' | 'cancelled' | 'completed';

export interface Reservation {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  reservation_date: string;
  reservation_time: string;
  guest_count: number;
  special_requests: string | null;
  status: ReservationStatus;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface ReservationSettings {
  id: string;
  max_guests_per_slot: number;
  max_reservations_per_slot: number;
  min_advance_hours: number;
  max_advance_days: number;
  slot_duration_minutes: number;
  opening_time: string;
  closing_time: string;
  is_reservations_enabled: boolean;
  blocked_dates: string[];
  updated_at: string;
}

export interface GalleryImage {
  id: string;
  image_url: string;
  alt_text: string;
  caption: string | null;
  category: 'interior' | 'food' | 'drinks' | 'ambience' | 'events';
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  start_date: string;
  end_date: string;
  is_active: boolean;
  is_homepage_banner: boolean;
  created_at: string;
  updated_at: string;
}

export type EnquiryStatus = 'new' | 'in_progress' | 'resolved';

export interface ContactEnquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: EnquiryStatus;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  id: string;
  key: string;
  value: string;
  updated_at: string;
}

export interface AuditLog {
  id: string;
  user_id: string;
  action: string;
  entity_type: string;
  entity_id: string | null;
  details: Record<string, unknown> | null;
  ip_address: string | null;
  created_at: string;
  // Joined
  user?: Profile;
}

// ─── API Response Types ───

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ─── Form Types ───

export interface ReservationFormData {
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  reservation_date: string;
  reservation_time: string;
  guest_count: number;
  special_requests?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface MenuItemFormData {
  category_id: string;
  name: string;
  description?: string;
  price: number;
  is_vegetarian: boolean;
  is_vegan: boolean;
  is_featured: boolean;
  is_available: boolean;
  is_published: boolean;
  sort_order: number;
}
