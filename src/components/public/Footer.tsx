import Link from 'next/link';
import { MapPin, Phone, Clock } from 'lucide-react';
import { RESTAURANT, NAV_LINKS } from '@/lib/constants';

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-charcoal text-ivory/80">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 bg-brick rounded-sm flex items-center justify-center">
                <span className="font-serif text-white text-lg font-bold leading-none">B</span>
              </div>
              <span className="font-serif text-ivory text-xl tracking-tight">
                {RESTAURANT.name}
              </span>
            </div>
            <p className="text-ivory/60 text-sm leading-relaxed mb-6">
              {RESTAURANT.description}
            </p>
            <div className="flex items-center gap-4">
              <a
                href={RESTAURANT.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-ivory/20 rounded-sm flex items-center justify-center text-ivory/50 hover:text-ivory hover:border-ivory/40 transition-all duration-200"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={RESTAURANT.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-ivory/20 rounded-sm flex items-center justify-center text-ivory/50 hover:text-ivory hover:border-ivory/40 transition-all duration-200"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href={RESTAURANT.social.zomato}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-ivory/20 rounded-sm flex items-center justify-center text-ivory/50 hover:text-ivory hover:border-ivory/40 transition-all text-xs font-bold duration-200"
                aria-label="Zomato"
              >
                Z
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-ivory text-xs font-semibold uppercase tracking-[0.15em] mb-5">
              Explore
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ivory/60 hover:text-ivory transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/reservations"
                  className="text-sm text-brick-light hover:text-brick transition-colors duration-200"
                >
                  Book a Table
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-ivory text-xs font-semibold uppercase tracking-[0.15em] mb-5">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brick-light mt-0.5 shrink-0" />
                <span className="text-sm text-ivory/60 leading-relaxed">
                  {RESTAURANT.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brick-light shrink-0" />
                <a
                  href={`tel:${RESTAURANT.phone}`}
                  className="text-sm text-ivory/60 hover:text-ivory transition-colors"
                >
                  {RESTAURANT.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-brick-light shrink-0" />
                <span className="text-sm text-ivory/60">{RESTAURANT.hours}</span>
              </li>
            </ul>
          </div>

          {/* Directions */}
          <div>
            <h3 className="text-ivory text-xs font-semibold uppercase tracking-[0.15em] mb-5">
              Visit Us
            </h3>
            <p className="text-sm text-ivory/60 leading-relaxed mb-5">
              Located on New Balmatta Road in the Bendoor area, easily accessible from the city center.
            </p>
            <a
              href={RESTAURANT.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-brick-light hover:text-brick transition-colors duration-200"
            >
              <MapPin className="w-4 h-4" />
              Get Directions
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-ivory/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-ivory/40">
            © 2026 {RESTAURANT.name}, Mangaluru. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/contact" className="text-xs text-ivory/40 hover:text-ivory/60 transition-colors">
              Privacy
            </Link>
            <Link href="/contact" className="text-xs text-ivory/40 hover:text-ivory/60 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
