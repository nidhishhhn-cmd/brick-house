import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin, Clock, Phone, Utensils, Star } from 'lucide-react';
import { RESTAURANT } from '@/lib/constants';

// Sample featured dishes (clearly labelled — owner must confirm before launch)
const SAMPLE_FEATURED = [
  {
    name: 'Chicken Lasagna',
    description: 'Layers of tender pasta, seasoned chicken, rich béchamel, and melted cheese baked to golden perfection.',
    image: '/images/food-lasagna.jpg',
    tag: 'Continental',
  },
  {
    name: 'Spaghetti Meatballs',
    description: 'Classic spaghetti with hand-rolled meatballs in a slow-simmered tomato sauce, topped with parmesan.',
    image: '/images/food-spaghetti.jpg',
    tag: 'Continental',
  },
  {
    name: 'Peri Peri Chicken',
    description: 'Flame-grilled chicken pieces glazed in our signature peri peri sauce, served with fresh herbs.',
    image: '/images/food-peri-chicken.jpg',
    tag: 'Grills',
  },
];

const CUISINE_TAGS = RESTAURANT.cuisines;

export default function HomePage() {
  return (
    <>
      {/* ─── Hero Section ─── */}
      <section className="relative h-[85vh] min-h-[600px] max-h-[900px] flex items-end">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero.jpg"
            alt="Brick House restaurant interior with warm brick walls and elegant table settings"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-charcoal/15" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/30 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-16 lg:pb-20 w-full">
          <div className="max-w-2xl animate-fade-in-up">
            <p className="!text-white/90 text-sm font-semibold uppercase tracking-[0.2em] mb-4 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              {RESTAURANT.name} · Mangaluru
            </p>
            <h1 className="font-serif !text-white text-5xl sm:text-6xl lg:text-7xl leading-[1.05] mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
              Good Food.<br />
              Great Company.
            </h1>
            <p className="!text-white/90 text-lg sm:text-xl leading-relaxed mb-8 max-w-lg drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">
              A warm, inviting space where flavours from across the world meet the
              hospitality of Mangaluru.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-brick !text-white font-medium text-sm tracking-wide rounded-sm hover:bg-brick-dark transition-colors duration-200 shadow-md"
              >
                Explore Menu
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/reservations"
                className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/80 !text-white font-medium text-sm tracking-wide rounded-sm hover:bg-white/15 transition-colors duration-200 shadow-md"
              >
                Book a Table
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Cuisine Tags Strip ─── */}
      <section className="bg-charcoal py-5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            {CUISINE_TAGS.map((cuisine, i) => (
              <span
                key={cuisine}
                className="text-ivory/50 text-xs uppercase tracking-[0.2em] flex items-center gap-3"
              >
                {cuisine}
                {i < CUISINE_TAGS.length - 1 && (
                  <span className="text-ivory/20">·</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Introduction Section ─── */}
      <section className="py-20 lg:py-28 bg-ivory">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-brick text-xs font-semibold uppercase tracking-[0.2em]">
              Welcome to Brick House
            </span>
            <h2 className="font-serif text-charcoal text-3xl sm:text-4xl lg:text-5xl mt-4 mb-6">
              Where Every Meal<br className="hidden sm:block" /> Tells a Story
            </h2>
            <p className="text-muted text-lg leading-relaxed">
              Nestled on New Balmatta Road in the heart of Mangaluru, Brick House brings together
              the warmth of exposed brick, the comfort of familiar flavours, and the excitement
              of discovering something new. From Continental classics to Chinese favourites,
              North Indian comfort food to quick bites — every dish is prepared with care
              and served with a smile.
            </p>
            <div className="mt-10 flex items-center justify-center gap-8 text-sm text-muted">
              <div className="flex items-center gap-2">
                <Utensils className="w-4 h-4 text-brick" />
                <span>Multi-Cuisine</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brick" />
                <span>{RESTAURANT.hours}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-brick" />
                <span>Family Friendly</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Featured Dishes ─── */}
      <section className="py-20 lg:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-14">
            <div>
              <span className="text-brick text-xs font-semibold uppercase tracking-[0.2em]">
                From Our Kitchen
              </span>
              <h2 className="font-serif text-charcoal text-3xl sm:text-4xl mt-3">
                Signature Dishes
              </h2>
            </div>
            <Link
              href="/menu"
              className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 text-sm font-medium text-brick hover:text-brick-dark transition-colors"
            >
              View Full Menu
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Editorial Grid — varied layout, not identical cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Large featured dish */}
            <div className="lg:col-span-7 group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                <Image
                  src={SAMPLE_FEATURED[0].image}
                  alt={SAMPLE_FEATURED[0].name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  <span className="inline-block px-3 py-1 bg-brick/90 text-ivory text-xs font-medium tracking-wide rounded-sm mb-3">
                    {SAMPLE_FEATURED[0].tag}
                  </span>
                  <h3 className="font-serif text-ivory text-2xl lg:text-3xl mb-2">
                    {SAMPLE_FEATURED[0].name}
                  </h3>
                  <p className="text-ivory/70 text-sm leading-relaxed max-w-md">
                    {SAMPLE_FEATURED[0].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Two stacked dishes */}
            <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8">
              {SAMPLE_FEATURED.slice(1).map((dish) => (
                <div key={dish.name} className="group flex-1">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-sm">
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 42vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
                      <span className="inline-block px-3 py-1 bg-brick/90 text-ivory text-xs font-medium tracking-wide rounded-sm mb-2">
                        {dish.tag}
                      </span>
                      <h3 className="font-serif text-ivory text-xl lg:text-2xl mb-1">
                        {dish.name}
                      </h3>
                      <p className="text-ivory/70 text-xs leading-relaxed">
                        {dish.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-6 text-xs text-muted italic text-center">
            Sample dishes shown. Actual menu items and prices will be confirmed by the restaurant owner.
          </p>
        </div>
      </section>

      {/* ─── Our Story Preview ─── */}
      <section className="py-20 lg:py-28 bg-ivory">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-sm overflow-hidden">
                <Image
                  src="/images/story.jpg"
                  alt="Brick House restaurant cozy corner with brick walls and warm lighting"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Decorative accent */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-brick/20 rounded-sm hidden lg:block" />
            </div>

            {/* Content */}
            <div>
              <span className="text-brick text-xs font-semibold uppercase tracking-[0.2em]">
                Our Story
              </span>
              <h2 className="font-serif text-charcoal text-3xl sm:text-4xl mt-3 mb-6">
                Built on Warmth,<br /> Served with Heart
              </h2>
              <div className="prose-restaurant">
                <p>
                  Brick House was born from a simple idea — to create a space where
                  great food and good company come together in Mangaluru. Our exposed
                  brick walls are more than décor; they represent the foundation of
                  what we believe in: honesty, warmth, and lasting quality.
                </p>
                <p>
                  Every dish on our menu is a conversation between tradition and
                  creativity. Whether you&apos;re here for a quick lunch, a family dinner,
                  or a celebration with friends, we want you to feel at home.
                </p>
              </div>
              <Link
                href="/our-story"
                className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-brick hover:text-brick-dark transition-colors"
              >
                Read Our Full Story
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Reservation CTA ─── */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-charcoal/85" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-brick-light text-xs font-semibold uppercase tracking-[0.2em]">
            Reserve Your Table
          </span>
          <h2 className="font-serif text-ivory text-3xl sm:text-4xl lg:text-5xl mt-4 mb-6">
            Join Us for a<br /> Memorable Evening
          </h2>
          <p className="text-ivory/65 text-lg leading-relaxed mb-10 max-w-lg mx-auto">
            Whether it&apos;s a quiet dinner for two or a celebration with friends and
            family, we&apos;ll set the table just right.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/reservations"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brick text-ivory font-medium tracking-wide rounded-sm hover:bg-brick-dark transition-colors"
            >
              Book a Table
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`tel:${RESTAURANT.phone}`}
              className="inline-flex items-center gap-2 px-8 py-4 border border-ivory/30 text-ivory font-medium tracking-wide rounded-sm hover:bg-ivory/10 transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call Us
            </a>
          </div>
        </div>
      </section>

      {/* ─── Location Section ─── */}
      <section className="py-20 lg:py-28 bg-ivory">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-brick text-xs font-semibold uppercase tracking-[0.2em]">
              Find Us
            </span>
            <h2 className="font-serif text-charcoal text-3xl sm:text-4xl mt-3">
              Visit Brick House
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-4xl mx-auto">
            {/* Address */}
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-brick/10 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-brick" />
              </div>
              <h3 className="font-serif text-charcoal text-lg mb-2">Location</h3>
              <p className="text-muted text-sm leading-relaxed">
                {RESTAURANT.address}
              </p>
              <a
                href={RESTAURANT.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-brick hover:text-brick-dark transition-colors"
              >
                Get Directions
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Hours */}
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-brick/10 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-brick" />
              </div>
              <h3 className="font-serif text-charcoal text-lg mb-2">Hours</h3>
              <p className="text-muted text-sm leading-relaxed">
                Open Daily<br />
                {RESTAURANT.hours}
              </p>
            </div>

            {/* Contact */}
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-brick/10 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-brick" />
              </div>
              <h3 className="font-serif text-charcoal text-lg mb-2">Contact</h3>
              <a
                href={`tel:${RESTAURANT.phone}`}
                className="text-muted text-sm hover:text-charcoal transition-colors block"
              >
                {RESTAURANT.phone}
              </a>
              <a
                href={RESTAURANT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-brick hover:text-brick-dark transition-colors"
              >
                WhatsApp Us
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
