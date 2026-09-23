import React from 'react';
import { Link } from 'react-router-dom';
import SucreLogo from '../../assets/SucreLogo';
import { Phone, MessageCircle, MapPin, Instagram, Facebook, ShieldCheck, Mail, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-cathedral-bg border-t border-gold-500/20 text-cathedral-ivory pt-16 pb-8 relative overflow-hidden">
      {/* Background Subtle Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gold-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-cathedral-border/50">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <SucreLogo className="h-16 sm:h-20 md:h-28 max-w-[220px] sm:max-w-none" />
            <p className="text-xs text-cathedral-muted leading-relaxed font-sans mt-3">
              Ibadan’s premier crown jewel for luxury wedding receptions, corporate galas, VIP banquets, and state events. Architectural magnificence redefined.
            </p>
            <div className="pt-2 text-xs text-gold-400 font-semibold space-y-1">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-gold-400" />
                <span>CAC Reg No: RC 9749267</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-widest text-gold-gradient font-bold mb-4">
              Explore Venue
            </h4>
            <ul className="space-y-2.5 text-xs text-cathedral-muted">
              <li>
                <Link to="/" className="hover:text-gold-400 transition-colors flex items-center gap-1">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/halls" className="hover:text-gold-400 transition-colors flex items-center gap-1">
                  Halls Showcase (Grades 1 - 5)
                </Link>
              </li>
              <li>
                <Link to="/book" className="hover:text-gold-400 transition-colors flex items-center gap-1 text-gold-300">
                  Interactive Booking Wizard <ArrowUpRight className="w-3 h-3 text-gold-400" />
                </Link>
              </li>
              <li>
                <Link to="/policies" className="hover:text-gold-400 transition-colors flex items-center gap-1">
                  Deposit & Cancellation Policies
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold-400 transition-colors flex items-center gap-1">
                  Location & Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Direct Concierge */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-widest text-gold-gradient font-bold mb-4">
              Official Concierge
            </h4>
            <ul className="space-y-3 text-xs text-cathedral-muted">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>SUCRE Events Centre ("The Cathedral"), Ilero, Ayegun Oleyo Road, Off Akala Expressway, passing through Christ High School Ashipa. Ibadan, Oyo State</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <a href="tel:08174303757" className="hover:text-gold-300 transition-colors font-mono">
                  08174303757
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a 
                  href="https://wa.me/2348174303757?text=Hello%20SUCRE%20Events%20Centre,%20I%20want%20to%20inquire%20about%20booking." 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-emerald-400 hover:underline"
                >
                  Direct WhatsApp Chat (08174303757)
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <a href="mailto:info@sucrecentre.com" className="hover:text-gold-300 transition-colors">
                  info@sucrecentre.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Social & Deposit Rules */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-widest text-gold-gradient font-bold mb-4">
              Connect & Terms
            </h4>
            <p className="text-xs text-cathedral-muted mb-4">
              Follow our official social media handles for live event showcases and venue updates.
            </p>
            <div className="flex items-center gap-3 mb-6">
              <a 
                href="https://instagram.com/sucreeventcenter" 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-full bg-cathedral-card border border-gold-500/30 flex items-center justify-center text-gold-400 hover:bg-gold-400 hover:text-cathedral-bg transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://facebook.com/sucreeventcenter" 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-full bg-cathedral-card border border-gold-500/30 flex items-center justify-center text-gold-400 hover:bg-gold-400 hover:text-cathedral-bg transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <span className="text-xs text-cathedral-muted font-medium ml-1">@sucreeventcenter</span>
            </div>

            <div className="bg-cathedral-card border border-gold-500/20 rounded-xl p-3 text-[11px] text-cathedral-muted leading-tight">
              <span className="font-bold text-gold-300 block mb-0.5">50% Reservation Rule:</span>
              Date bookings are secured upon receipt of a 50% deposit via Paystack. Balance due 14 days prior to event date.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-cathedral-muted">
          <div>
            © {new Date().getFullYear()} SUCRE Events Centre (The Cathedral). All Rights Reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/policies" className="hover:text-gold-400 transition-colors">Privacy & Booking Policies</Link>
            <span>•</span>
            <Link to="/admin/login" className="hover:text-gold-400 transition-colors font-semibold">Admin Access</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
