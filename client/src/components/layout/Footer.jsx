import React from 'react';
import { Link } from 'react-router-dom';
import SucreLogo from '../../assets/SucreLogo';
import { Phone, MessageCircle, MapPin, Instagram, Facebook, ShieldCheck, Mail, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-cathedral-bg border-t border-gold-500/20 text-cathedral-ivory pt-16 pb-8 relative overflow-hidden">
      {/* Background Subtle Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gold-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center justify-center text-center space-y-12">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center space-y-4">
          <SucreLogo className="h-16 sm:h-20 md:h-28" />
          <p className="text-xs text-cathedral-muted leading-relaxed font-sans max-w-xl mx-auto mt-3">
            Ibadan’s premier crown jewel for luxury wedding receptions, corporate galas, VIP banquets, and state events. Architectural magnificence redefined.
          </p>
        </div>

        {/* Regulatory & Social Info Row */}
        <div className="flex flex-col items-center space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-gold-400 font-semibold bg-cathedral-card/50 border border-gold-500/20 px-6 py-2 rounded-full">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-gold-400" />
              <span>CAC Reg No: RC 9749267</span>
            </div>
          </div>

          {/* Social Handles */}
          <div className="flex items-center gap-3">
            <a 
              href="https://instagram.com/sucreeventcenter" 
              target="_blank" 
              rel="noreferrer" 
              className="w-10 h-10 rounded-full bg-cathedral-card border border-gold-500/30 flex items-center justify-center text-gold-400 hover:bg-gold-400 hover:text-cathedral-bg transition-all duration-300 shadow-md"
              aria-label="Instagram"
            >
              <Instagram className="w-4.5 h-4.5" />
            </a>
            <a 
              href="https://facebook.com/sucreeventcenter" 
              target="_blank" 
              rel="noreferrer" 
              className="w-10 h-10 rounded-full bg-cathedral-card border border-gold-500/30 flex items-center justify-center text-gold-400 hover:bg-gold-400 hover:text-cathedral-bg transition-all duration-300 shadow-md"
              aria-label="Facebook"
            >
              <Facebook className="w-4.5 h-4.5" />
            </a>
            <span className="text-sm text-gold-300 font-bold ml-2">@sucreeventcenter</span>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center space-y-3 max-w-2xl">
          <div className="flex items-center justify-center gap-2.5 text-sm">
            <MapPin className="w-4 h-4 text-gold-400 shrink-0" />
            <span className="text-cathedral-muted">Ilero, Ayegun Oleyo Road, Off Akala Expressway, Ibadan, Oyo State</span>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-2">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gold-400" />
              <a href="tel:08174303757" className="text-cathedral-muted hover:text-gold-300 transition-colors font-mono">
                08174303757
              </a>
            </div>
            <span className="hidden sm:inline text-cathedral-border">|</span>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <a 
                href="https://wa.me/2348174303757?text=Hello%20SUCRE%20Events%20Centre,%20I%20want%20to%20inquire%20about%20booking." 
                target="_blank" 
                rel="noreferrer"
                className="text-emerald-400 hover:underline"
              >
                WhatsApp Direct
              </a>
            </div>
            <span className="hidden sm:inline text-cathedral-border">|</span>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gold-400" />
              <a href="mailto:info@sucrecentre.com" className="text-cathedral-muted hover:text-gold-300 transition-colors">
                info@sucrecentre.com
              </a>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="w-full max-w-4xl pt-8 border-t border-cathedral-border/50">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-cathedral-muted">
            <li><Link to="/" className="hover:text-gold-400 transition-colors">Home</Link></li>
            <li><Link to="/halls" className="hover:text-gold-400 transition-colors">Venue Showcase</Link></li>
            <li><Link to="/book" className="text-gold-300 hover:text-gold-400 transition-colors font-bold flex items-center gap-1">Booking Wizard <ArrowUpRight className="w-3 h-3" /></Link></li>
            <li><Link to="/policies" className="hover:text-gold-400 transition-colors">Policies</Link></li>
            <li><Link to="/contact" className="hover:text-gold-400 transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Deposit Rule */}
        <div className="bg-cathedral-card border border-gold-500/20 rounded-xl p-3 text-[11px] text-cathedral-muted max-w-lg mx-auto">
          <span className="font-bold text-gold-300 mb-0.5 inline-block mr-1">50% Reservation Rule:</span>
          Date bookings are secured upon receipt of a 50% deposit. Balance due 14 days prior to event.
        </div>

        {/* Copyright */}
        <div className="w-full pt-8 border-t border-cathedral-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cathedral-muted">
          <div>
            © {new Date().getFullYear()} SUCRE Events Centre. All Rights Reserved.
          </div>
          <div>
            <Link to="/admin/login" className="hover:text-gold-400 transition-colors">Admin Portal</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
