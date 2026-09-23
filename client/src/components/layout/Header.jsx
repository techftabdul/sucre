import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SucreLogo from '../../assets/SucreLogo';
import { Phone, MessageCircle, Calendar, Menu, X, ShieldCheck, ChevronRight } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Hall Showcase', path: '/halls' },
    { name: 'Reserve / Book', path: '/book' },
    { name: 'Policies', path: '/policies' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="relative w-full z-30">
      {/* Top Brand Notification Bar */}
      <div className="bg-cathedral-bg/95 border-b border-gold-500/20 py-2 px-4 text-xs font-medium text-cathedral-ivory">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-cathedral-muted">
            <span className="flex items-center gap-1.5 hover:text-gold-400 transition-colors">
              <Phone className="w-3.5 h-3.5 text-gold-400" />
              <a href="tel:08174303757" className="tracking-wide">08174303757</a>
            </span>
            <span className="hidden md:inline text-gold-500/30">|</span>
            <span className="hidden md:flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors">
              <MessageCircle className="w-3.5 h-3.5 fill-emerald-500/20" />
              <a 
                href="https://wa.me/2348174303757?text=Hello%20SUCRE%20Events%20Centre,%20I%20would%20like%20to%20inquire%20about%20booking%20the%20Cathedral." 
                target="_blank" 
                rel="noreferrer"
              >
                WhatsApp Instant Concierge
              </a>
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-cathedral-muted">
            <span className="hidden lg:flex items-center gap-1 text-gold-300/80">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
              RC 9749267
            </span>
            <Link 
              to="/admin/login" 
              className="text-cathedral-muted hover:text-gold-400 transition-colors flex items-center gap-1 font-semibold"
            >
              Admin Portal <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-cathedral-card/90 backdrop-blur-md border-b border-cathedral-border/60 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 md:h-28 flex items-center justify-between gap-2">
          {/* Logo */}
          <Link to="/" className="group flex items-center shrink-0">
            <SucreLogo className="h-12 sm:h-16 md:h-22 lg:h-28" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium tracking-wider uppercase transition-all duration-200 relative py-1 ${
                  isActive(link.path)
                    ? 'text-gold-400 font-semibold'
                    : 'text-cathedral-ivory/80 hover:text-gold-300'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold-gradient rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Action CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/book"
              className="relative group overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-gold-400"
            >
              <span className="absolute inset-0 bg-gold-gradient group-hover:scale-105 transition-transform duration-300 rounded-full" />
              <span className="relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-cathedral-bg text-gold-300 font-semibold text-xs uppercase tracking-widest group-hover:bg-transparent group-hover:text-cathedral-bg transition-colors duration-300">
                <Calendar className="w-4 h-4" />
                Reserve Your Date
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <Link
              to="/book"
              className="px-3.5 py-1.5 rounded-full bg-gold-400 text-cathedral-bg font-bold text-xs uppercase tracking-wider"
            >
              Book
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-cathedral-ivory hover:text-gold-400 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-cathedral-bg/98 border-b border-gold-500/20 px-6 py-6 space-y-4 shadow-2xl backdrop-blur-xl">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block text-base font-serif tracking-wider ${
                isActive(link.path) ? 'text-gold-400 font-bold' : 'text-cathedral-ivory/80'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-cathedral-border/50 flex flex-col gap-3 text-xs text-cathedral-muted">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gold-400" />
              <span>08174303757</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400">
              <MessageCircle className="w-4 h-4" />
              <a href="https://wa.me/2348174303757" target="_blank" rel="noreferrer">
                Chat on WhatsApp
              </a>
            </div>
            <div className="text-[10px] text-gold-500/80 pt-1">
              CAC: RC 9749267
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
