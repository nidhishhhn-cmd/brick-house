import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Explore the Brick House gallery — restaurant interiors, food photography, and dining ambience in Mangaluru.',
};

// Sample gallery — will be managed via admin dashboard
const GALLERY_ITEMS = [
  { id: '1', src: '/images/hero.jpg', alt: 'Restaurant interior with warm brick walls and table settings', category: 'Interior', span: 'col-span-2 row-span-2' },
  { id: '2', src: '/images/food-lasagna.jpg', alt: 'Chicken Lasagna with golden melted cheese', category: 'Food', span: 'col-span-1 row-span-1' },
  { id: '3', src: '/images/food-spaghetti.jpg', alt: 'Spaghetti Meatballs with tomato sauce', category: 'Food', span: 'col-span-1 row-span-1' },
  { id: '4', src: '/images/story.jpg', alt: 'Cozy corner with exposed brick and pendant lighting', category: 'Ambience', span: 'col-span-1 row-span-1' },
  { id: '5', src: '/images/food-peri-chicken.jpg', alt: 'Peri Peri Chicken with herbs and sauce', category: 'Food', span: 'col-span-1 row-span-1' },
  { id: '6', src: '/images/hero.jpg', alt: 'Dining area with elegant candlelit ambience', category: 'Interior', span: 'col-span-2 row-span-1' },
];

const CATEGORIES = ['All', 'Interior', 'Food', 'Ambience'];

export default function GalleryPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-28 pb-12 lg:pt-32 lg:pb-16 bg-ivory">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-brick text-xs font-semibold uppercase tracking-[0.2em]">
              Gallery
            </span>
            <h1 className="font-serif text-charcoal text-4xl sm:text-5xl mt-3 mb-4">
              A Glimpse Inside
            </h1>
            <p className="text-muted text-lg leading-relaxed">
              Take a peek at our space, our food, and the moments that make Brick House special.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="bg-ivory border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-2 py-4">
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat}
                className={`px-4 py-2 text-sm font-medium rounded-sm whitespace-nowrap transition-colors ${
                  i === 0
                    ? 'bg-charcoal text-ivory'
                    : 'text-muted hover:bg-ivory-dark hover:text-charcoal'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 lg:py-20 bg-ivory">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 auto-rows-[200px] lg:auto-rows-[260px]">
            {GALLERY_ITEMS.map((item) => (
              <div
                key={item.id}
                className={`group relative overflow-hidden rounded-sm cursor-pointer ${item.span}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-block px-2 py-1 bg-ivory/90 text-charcoal text-xs font-medium rounded-sm">
                    {item.category}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-xs text-muted italic text-center">
            Gallery images will be managed by the restaurant owner through the admin dashboard.
            Additional photos can be uploaded, reordered, and captioned.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-charcoal text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="font-serif text-ivory text-2xl sm:text-3xl mb-4">
            See It in Person
          </h2>
          <p className="text-ivory/60 mb-8">
            Photos only tell half the story. Come experience the warmth, the aromas,
            and the atmosphere yourself.
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
