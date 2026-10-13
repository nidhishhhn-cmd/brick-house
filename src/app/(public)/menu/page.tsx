import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ArrowRight } from 'lucide-react';
import { RESTAURANT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Menu',
  description: `Explore the Brick House menu — Continental, Chinese, North Indian, fast food, desserts, and beverages. Located in Mangaluru.`,
};

// Sample menu data — clearly labelled as samples. Owner must confirm items & prices.
const SAMPLE_CATEGORIES = [
  { id: '1', name: 'Continental', slug: 'continental' },
  { id: '2', name: 'Chinese', slug: 'chinese' },
  { id: '3', name: 'North Indian', slug: 'north-indian' },
  { id: '4', name: 'Fast Food', slug: 'fast-food' },
  { id: '5', name: 'Desserts', slug: 'desserts' },
  { id: '6', name: 'Beverages', slug: 'beverages' },
];

const SAMPLE_ITEMS = [
  {
    id: '1', category_id: '1', name: 'Chicken Lasagna', description: 'Layers of tender pasta, seasoned chicken, rich béchamel, and melted cheese baked to golden perfection.',
    price: 0, image: '/images/food-lasagna.jpg', is_vegetarian: false, is_featured: true, is_available: true,
  },
  {
    id: '2', category_id: '1', name: 'Spaghetti Meatballs', description: 'Classic spaghetti with hand-rolled meatballs in a slow-simmered tomato sauce, topped with parmesan.',
    price: 0, image: '/images/food-spaghetti.jpg', is_vegetarian: false, is_featured: true, is_available: true,
  },
  {
    id: '3', category_id: '1', name: 'Peri Peri Chicken', description: 'Flame-grilled chicken pieces glazed in our signature peri peri sauce, served with fresh herbs and lemon.',
    price: 0, image: '/images/food-peri-chicken.jpg', is_vegetarian: false, is_featured: true, is_available: true,
  },
  {
    id: '4', category_id: '1', name: 'Mushroom Risotto', description: 'Creamy arborio rice with wild mushrooms, parmesan, and a drizzle of truffle oil.',
    price: 0, image: null, is_vegetarian: true, is_featured: false, is_available: true,
  },
  {
    id: '5', category_id: '2', name: 'Chilli Chicken', description: 'Crispy fried chicken tossed with bell peppers, onions, and fiery green chillies.',
    price: 0, image: null, is_vegetarian: false, is_featured: false, is_available: true,
  },
  {
    id: '6', category_id: '2', name: 'Hakka Noodles', description: 'Stir-fried noodles with fresh vegetables and Indo-Chinese seasoning.',
    price: 0, image: null, is_vegetarian: true, is_featured: false, is_available: true,
  },
  {
    id: '7', category_id: '3', name: 'Butter Chicken', description: 'Tender chicken pieces in a rich, creamy tomato-butter gravy, served with naan.',
    price: 0, image: null, is_vegetarian: false, is_featured: false, is_available: true,
  },
  {
    id: '8', category_id: '3', name: 'Paneer Tikka', description: 'Marinated paneer cubes grilled to perfection with bell peppers and onions.',
    price: 0, image: null, is_vegetarian: true, is_featured: false, is_available: true,
  },
  {
    id: '9', category_id: '4', name: 'Classic Burger', description: 'Juicy grilled patty with lettuce, tomato, cheese, and our house sauce in a toasted bun.',
    price: 0, image: null, is_vegetarian: false, is_featured: false, is_available: true,
  },
  {
    id: '10', category_id: '5', name: 'Chocolate Lava Cake', description: 'Warm, rich chocolate cake with a molten centre, served with vanilla ice cream.',
    price: 0, image: null, is_vegetarian: true, is_featured: false, is_available: true,
  },
  {
    id: '11', category_id: '6', name: 'Fresh Lime Soda', description: 'Refreshing lime soda, available sweet or salted.',
    price: 0, image: null, is_vegetarian: true, is_featured: false, is_available: true,
  },
];

export default function MenuPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-28 pb-12 lg:pt-32 lg:pb-16 bg-ivory">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-brick text-xs font-semibold uppercase tracking-[0.2em]">
              Our Menu
            </span>
            <h1 className="font-serif text-charcoal text-4xl sm:text-5xl mt-3 mb-4">
              Explore Our Flavours
            </h1>
            <p className="text-muted text-lg leading-relaxed">
              From Continental classics to North Indian favourites, Chinese delights
              to quick bites — there&apos;s something for every palate at {RESTAURANT.name}.
            </p>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="sticky top-[72px] lg:top-[80px] z-40 bg-ivory border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide">
            <button className="px-4 py-2 bg-charcoal text-ivory text-sm font-medium rounded-sm whitespace-nowrap">
              All
            </button>
            {SAMPLE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className="px-4 py-2 text-muted text-sm font-medium rounded-sm whitespace-nowrap hover:bg-ivory-dark hover:text-charcoal transition-colors"
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="py-12 lg:py-20 bg-ivory">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Sample Notice */}
          <div className="mb-10 p-4 bg-warning/5 border border-warning/20 rounded-sm">
            <p className="text-sm text-warning">
              <strong>Note:</strong> The items shown below are sample entries based on publicly listed information.
              Actual menu items, prices, and availability will be confirmed by the restaurant owner through
              the admin dashboard before launch.
            </p>
          </div>

          {/* Featured Items */}
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-8">
              <Star className="w-5 h-5 text-brick" />
              <h2 className="font-serif text-charcoal text-2xl">Featured Dishes</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SAMPLE_ITEMS.filter(item => item.is_featured).map((item) => (
                <div key={item.id} className="group">
                  {item.image && (
                    <div className="relative aspect-[4/3] rounded-sm overflow-hidden mb-4">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {item.is_vegetarian ? (
                          <span className="w-4 h-4 border-2 border-success rounded-sm flex items-center justify-center">
                            <span className="w-2 h-2 bg-success rounded-full" />
                          </span>
                        ) : (
                          <span className="w-4 h-4 border-2 border-error rounded-sm flex items-center justify-center">
                            <span className="w-2 h-2 bg-error rounded-full" />
                          </span>
                        )}
                        <h3 className="font-serif text-charcoal text-lg">{item.name}</h3>
                      </div>
                      <p className="text-muted text-sm leading-relaxed mt-1">{item.description}</p>
                    </div>
                    <span className="text-muted text-sm italic whitespace-nowrap">
                      {item.price > 0 ? `₹${item.price}` : 'Price TBD'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* All Categories */}
          {SAMPLE_CATEGORIES.map((category) => {
            const items = SAMPLE_ITEMS.filter(item => item.category_id === category.id);
            if (items.length === 0) return null;
            return (
              <div key={category.id} id={category.slug} className="mb-14 last:mb-0">
                <div className="flex items-center gap-3 mb-6 pb-3 border-b border-border">
                  <h2 className="font-serif text-charcoal text-2xl">{category.name}</h2>
                  <span className="text-muted text-xs uppercase tracking-wider">
                    {items.length} {items.length === 1 ? 'item' : 'items'}
                  </span>
                </div>
                <div className="space-y-5">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start justify-between gap-4 py-4 border-b border-border-light last:border-0"
                    >
                      <div className="flex items-start gap-3 flex-1">
                        {item.is_vegetarian ? (
                          <span className="w-4 h-4 mt-1 border-2 border-success rounded-sm flex items-center justify-center shrink-0">
                            <span className="w-2 h-2 bg-success rounded-full" />
                          </span>
                        ) : (
                          <span className="w-4 h-4 mt-1 border-2 border-error rounded-sm flex items-center justify-center shrink-0">
                            <span className="w-2 h-2 bg-error rounded-full" />
                          </span>
                        )}
                        <div>
                          <h3 className="text-charcoal font-medium">{item.name}</h3>
                          {item.description && (
                            <p className="text-muted text-sm mt-1 leading-relaxed max-w-lg">{item.description}</p>
                          )}
                        </div>
                      </div>
                      <span className="text-charcoal font-medium whitespace-nowrap">
                        {item.price > 0 ? `₹${item.price}` : '—'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-charcoal text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="font-serif text-ivory text-2xl sm:text-3xl mb-4">
            Ready to Dine With Us?
          </h2>
          <p className="text-ivory/60 mb-8">
            Reserve your table and enjoy an unforgettable dining experience.
          </p>
          <Link
            href="/reservations"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-brick text-ivory font-medium tracking-wide rounded-sm hover:bg-brick-dark transition-colors"
          >
            Book a Table
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
