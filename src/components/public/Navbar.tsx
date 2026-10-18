'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { RESTAURANT, NAV_LINKS } from '@/lib/constants';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  const isActive = (href: string) => pathname === href;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-ivory/95 backdrop-blur-sm shadow-subtle'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-18 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="Brick House - Home"
          >
            <div className="w-9 h-9 bg-brick rounded-sm flex items-center justify-center shadow-sm">
              <span className="font-serif text-white text-lg font-bold leading-none">B</span>
            </div>
            <div className="flex flex-col">
              <span className={`font-serif text-xl leading-tight tracking-tight transition-colors duration-200 ${
                isScrolled ? 'text-charcoal' : 'text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]'
              }`}>
                {RESTAURANT.name}
              </span>
              <span className={`text-[10px] uppercase tracking-[0.15em] leading-none hidden sm:block transition-colors duration-200 ${
                isScrolled ? 'text-muted' : 'text-white/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]'
              }`}>
                Mangaluru
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
                  isActive(link.href)
                    ? 'text-brick-light font-semibold'
                    : isScrolled
                    ? 'text-charcoal/70 hover:text-charcoal'
                    : 'text-white/90 hover:text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/reservations"
              className={`inline-flex items-center px-5 py-2.5 text-sm font-medium tracking-wide rounded-sm transition-colors duration-200 shadow-sm ${
                isScrolled
                  ? 'bg-charcoal text-ivory hover:bg-charcoal-light'
                  : 'bg-brick text-white hover:bg-brick-dark'
              }`}
            >
              Book a Table
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 transition-colors ${
              isScrolled ? 'text-charcoal hover:text-brick' : 'text-white hover:text-white/80'
            }`}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-ivory border-t border-border shadow-elevated animate-fade-in">
            <div className="px-6 py-6 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block py-3 text-base font-medium border-b border-border-light transition-colors ${
                    isActive(link.href)
                      ? 'text-brick'
                      : 'text-charcoal/80 hover:text-charcoal'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4">
                <Link
                  href="/reservations"
                  className="block w-full text-center px-5 py-3 bg-charcoal text-ivory font-medium rounded-sm hover:bg-charcoal-light transition-colors"
                >
                  Book a Table
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
