// Restaurant business constants

export const RESTAURANT = {
  name: 'Brick House',
  tagline: 'Good Food. Great Company.',
  description: 'A warm, inviting restaurant in the heart of Mangaluru, serving Continental, Chinese, North Indian, and fast food favorites crafted with care.',
  address: 'New Balmatta Road, Bendoor, Mangaluru, Karnataka 575001, India',
  phone: '+91 82442 77788',
  email: 'hello@brickhousemangaluru.com',
  hours: '10:30 AM – 10:30 PM daily',
  openingTime: '10:30',
  closingTime: '22:30',
  cuisines: ['Continental', 'Chinese', 'Fast Food', 'North Indian', 'Desserts', 'Beverages'],
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Brick+House+New+Balmatta+Road+Bendoor+Mangaluru+Karnataka+575001',
  whatsappUrl: 'https://wa.me/918244277788',
  social: {
    instagram: '#',
    facebook: '#',
    zomato: 'https://www.zomato.com/mangalore/brick-house-hampankatta',
  },
} as const;

export const NAV_LINKS = [
  { label: 'Menu', href: '/menu' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
] as const;

export const RESERVATION_TIMES = [
  '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00',
  '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
  '21:00', '21:30',
] as const;

export const GUEST_COUNT_OPTIONS = Array.from({ length: 12 }, (_, i) => i + 1);

export const RESERVATION_STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  rejected: 'Rejected',
  cancelled: 'Cancelled',
  completed: 'Completed',
};

export const RESERVATION_STATUS_COLORS: Record<string, string> = {
  pending: 'bg-warning/10 text-warning',
  confirmed: 'bg-success/10 text-success',
  rejected: 'bg-error/10 text-error',
  cancelled: 'bg-muted/10 text-muted',
  completed: 'bg-info/10 text-info',
};

export const ENQUIRY_STATUS_LABELS: Record<string, string> = {
  new: 'New',
  in_progress: 'In Progress',
  resolved: 'Resolved',
};

export const GALLERY_CATEGORIES = [
  { value: 'interior', label: 'Interior' },
  { value: 'food', label: 'Food' },
  { value: 'drinks', label: 'Drinks' },
  { value: 'ambience', label: 'Ambience' },
  { value: 'events', label: 'Events' },
] as const;

// Default site settings keys
export const SITE_SETTINGS_KEYS = {
  HERO_HEADING: 'hero_heading',
  HERO_SUBHEADING: 'hero_subheading',
  INTRO_TEXT: 'intro_text',
  STORY_HEADING: 'story_heading',
  STORY_CONTENT: 'story_content',
  STORY_IMAGE: 'story_image',
  ANNOUNCEMENT: 'announcement',
  META_TITLE: 'meta_title',
  META_DESCRIPTION: 'meta_description',
} as const;
