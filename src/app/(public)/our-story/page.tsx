import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Heart, Users, Utensils, MapPin } from 'lucide-react';
import { RESTAURANT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Our Story',
  description: `Discover the story behind Brick House — a warm, inviting restaurant in Mangaluru where great food meets genuine hospitality.`,
};

export default function OurStoryPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-20 lg:pt-32 lg:pb-28 bg-ivory">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="text-brick text-xs font-semibold uppercase tracking-[0.2em]">
                Our Story
              </span>
              <h1 className="font-serif text-charcoal text-4xl sm:text-5xl lg:text-6xl mt-3 mb-6 leading-[1.1]">
                Built on Warmth,<br /> Served with Heart
              </h1>
              <div className="prose-restaurant">
                <p>
                  Brick House began with a simple conviction: Mangaluru deserved a place where
                  thoughtfully prepared food and genuine warmth come together under one roof.
                  Not just another restaurant, but a second home — a place where every meal
                  feels personal and every visit feels familiar.
                </p>
                <p>
                  Our name isn&apos;t just about the exposed brick walls that define our space.
                  It&apos;s about building something that lasts — real flavours, real connections,
                  and a real sense of belonging. From the first plate to the last,
                  everything at Brick House is created with care.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-sm overflow-hidden">
                <Image
                  src="/images/story.jpg"
                  alt="Brick House restaurant interior with warm brick walls, pendant lighting, and cozy seating"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="absolute -bottom-5 -left-5 w-28 h-28 border-2 border-brick/15 rounded-sm hidden lg:block" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-brick text-xs font-semibold uppercase tracking-[0.2em]">
              What We Believe In
            </span>
            <h2 className="font-serif text-charcoal text-3xl sm:text-4xl mt-3">
              Our Philosophy
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-5 bg-brick/10 rounded-full flex items-center justify-center">
                <Utensils className="w-6 h-6 text-brick" />
              </div>
              <h3 className="font-serif text-charcoal text-xl mb-3">Honest Food</h3>
              <p className="text-muted text-sm leading-relaxed">
                We believe great food doesn&apos;t need shortcuts. Every dish is prepared
                with quality ingredients and the attention it deserves — no compromises,
                no pretences.
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-5 bg-brick/10 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-brick" />
              </div>
              <h3 className="font-serif text-charcoal text-xl mb-3">Genuine Warmth</h3>
              <p className="text-muted text-sm leading-relaxed">
                Hospitality isn&apos;t a performance here — it&apos;s who we are.
                From the moment you walk in, we want you to feel welcomed,
                comfortable, and cared for.
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 mx-auto mb-5 bg-brick/10 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-brick" />
              </div>
              <h3 className="font-serif text-charcoal text-xl mb-3">Community First</h3>
              <p className="text-muted text-sm leading-relaxed">
                Brick House is built for Mangaluru. We&apos;re not just serving food —
                we&apos;re creating a gathering place where families, friends, and
                neighbours come together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Space */}
      <section className="py-20 lg:py-28 bg-ivory">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-brick text-xs font-semibold uppercase tracking-[0.2em]">
                The Space
              </span>
              <h2 className="font-serif text-charcoal text-3xl sm:text-4xl mt-3 mb-6">
                A Place That Feels<br /> Like Home
              </h2>
              <div className="prose-restaurant">
                <p>
                  Step inside Brick House and you&apos;ll notice the details — the warmth
                  of exposed brick, the glow of pendant lights, the rustle of good
                  conversation. Our space is designed to make you slow down, savour,
                  and stay a little longer.
                </p>
                <p>
                  Whether you&apos;re settling into a quiet corner for a solo lunch
                  or gathering around a long table with friends, every seat in the
                  house is the best seat.
                </p>
              </div>
              <div className="flex items-center gap-2 mt-6 text-sm text-muted">
                <MapPin className="w-4 h-4 text-brick" />
                <span>{RESTAURANT.address}</span>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="aspect-[4/3] rounded-sm overflow-hidden">
                <Image
                  src="/images/hero.jpg"
                  alt="Brick House dining area with elegant table settings and warm ambience"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Teaser */}
      <section className="py-20 lg:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-brick text-xs font-semibold uppercase tracking-[0.2em]">
              The Food
            </span>
            <h2 className="font-serif text-charcoal text-3xl sm:text-4xl mt-3 mb-6">
              A Menu for Every Mood
            </h2>
            <p className="text-muted text-lg leading-relaxed mb-4">
              Our kitchen draws inspiration from around the world — Continental
              comfort, Chinese favourites, North Indian classics, and fast food
              done right. Add in handcrafted desserts and refreshing beverages,
              and there&apos;s truly something for everyone.
            </p>
            <p className="text-muted text-sm leading-relaxed mb-10 italic">
              The full menu, including actual items and pricing, will be available
              once confirmed by the restaurant owner.
            </p>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-brick text-ivory font-medium tracking-wide rounded-sm hover:bg-brick-dark transition-colors"
            >
              Explore Our Menu
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-charcoal text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="font-serif text-ivory text-3xl sm:text-4xl mb-4">
            Come, Be Our Guest
          </h2>
          <p className="text-ivory/60 mb-8 leading-relaxed">
            We can&apos;t wait to welcome you to Brick House. Reserve your table
            and let us take care of the rest.
          </p>
          <Link
            href="/reservations"
            className="inline-flex items-center gap-2 px-8 py-4 bg-brick text-ivory font-medium tracking-wide rounded-sm hover:bg-brick-dark transition-colors"
          >
            Book a Table
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
