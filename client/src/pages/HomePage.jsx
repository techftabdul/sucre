import React from 'react';
import { Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import FacilitiesCarousel from '../components/FacilitiesCarousel';
import { Calendar, Crown, ShieldCheck, Sparkles, Star, Users, CheckCircle2, ChevronRight, Phone, MessageCircle, Award, Zap, MapPin, Tag, Flame } from 'lucide-react';
import facilityVideo from '../assets/facilities/facility-video.mp4';

export default function HomePage() {
  const { packages, formatCurrency, HALL_STANDARD_PRICE, HALL_PROMO_PRICE, flagshipHall } = useBooking();

  return (
    <div className="min-h-screen bg-cathedral-bg text-cathedral-ivory space-y-24 pb-20">
      
      {/* HERO SECTION — Carousel Background */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-12 pb-24 overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            src={facilityVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover brightness-[0.35]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cathedral-bg via-cathedral-bg/70 to-transparent z-[2]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-transparent z-[2]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 text-xs uppercase tracking-[0.25em] font-semibold backdrop-blur-md">
            <Crown className="w-4 h-4 text-gold-400" />
            Ibadan's Crown Jewel Event Venue
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-cathedral-ivory leading-tight">
              SUCRE Events Centre
            </h1>
            <div className="text-xl md:text-3xl font-serif italic text-gold-gradient font-medium tracking-wide">
              — The Cathedral —
            </div>
            <p className="max-w-2xl mx-auto text-sm md:text-base text-cathedral-muted leading-relaxed font-sans pt-2">
              An architectural masterpiece designed for royal wedding receptions, high-stakes corporate galas, and VIP celebrations in Ibadan, Oyo State.
            </p>
          </div>

          {/* PROMO BANNER — Hero Level */}
          <div className="inline-block animate-promo-glow">
            <div className="bg-gradient-to-r from-red-900/40 via-red-800/50 to-red-900/40 border-2 border-red-500/60 rounded-2xl px-6 py-4 backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-400 to-transparent" />
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-red-400 animate-pulse" />
                  <span className="text-red-300 font-bold text-xs uppercase tracking-widest">Ends October 30th</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-cathedral-muted line-through text-sm font-mono">{formatCurrency(HALL_STANDARD_PRICE)}</span>
                  <span className="text-2xl sm:text-3xl font-serif font-bold animate-gold-shimmer">{formatCurrency(HALL_PROMO_PRICE)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/book"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gold-gradient text-cathedral-bg font-bold text-sm uppercase tracking-widest hover:brightness-110 transition-all duration-300 shadow-gold-glow flex items-center justify-center gap-2 group"
            >
              <Calendar className="w-5 h-5" />
              Reserve at Promo Price
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/halls"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-cathedral-card/80 border border-gold-500/40 text-gold-300 font-semibold text-sm uppercase tracking-widest hover:bg-gold-500/10 hover:border-gold-400 transition-all duration-300 backdrop-blur-md flex items-center justify-center gap-2"
            >
              Explore Our Venue
            </Link>
          </div>

          {/* Key Metrics */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-gold-500/20 max-w-4xl mx-auto text-left">
            <div className="bg-cathedral-card/40 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
              <div className="text-2xl font-serif font-bold text-gold-gradient">1,500+</div>
              <div className="text-xs text-cathedral-muted uppercase tracking-wider mt-1">Max Guest Capacity</div>
            </div>
            <div className="bg-cathedral-card/40 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
              <div className="text-2xl font-serif font-bold text-gold-gradient">Premium</div>
              <div className="text-xs text-cathedral-muted uppercase tracking-wider mt-1">Facility Views</div>
            </div>
            <div className="bg-cathedral-card/40 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
              <div className="text-2xl font-serif font-bold text-gold-gradient">100%</div>
              <div className="text-xs text-cathedral-muted uppercase tracking-wider mt-1">Power Redundancy</div>
            </div>
            <div className="bg-cathedral-card/40 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
              <div className="text-2xl font-serif font-bold text-gold-gradient">50%</div>
              <div className="text-xs text-cathedral-muted uppercase tracking-wider mt-1">Deposit Date Lock</div>
            </div>
          </div>
        </div>
      </section>

      {/* BRAND POSITIONING & ARCHITECTURE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-gold-400 text-xs uppercase tracking-widest font-semibold">
              <Sparkles className="w-4 h-4" />
              Unrivaled Luxury & Distinction
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-cathedral-ivory leading-tight">
              Where Royal Elegance Meets Modern Event Technology
            </h2>
            <p className="text-cathedral-muted text-sm leading-relaxed">
              Located in Ibadan, SUCRE Events Centre ("The Cathedral") stands as an iconic venue crafted for discerning hosts who refuse to compromise on splendor, acoustic precision, or VIP guest comfort.
            </p>
            
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3 bg-cathedral-card p-4 rounded-xl border border-cathedral-border">
                <ShieldCheck className="w-6 h-6 text-gold-400 shrink-0 mt-1" />
                <div>
                  <h4 className="font-serif text-sm font-bold text-cathedral-ivory">CAC Registered & Fully Licensed</h4>
                  <p className="text-xs text-cathedral-muted mt-0.5">Operating officially under RC 9749267 with verified safety standards.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-cathedral-card p-4 rounded-xl border border-cathedral-border">
                <Zap className="w-6 h-6 text-gold-400 shrink-0 mt-1" />
                <div>
                  <h4 className="font-serif text-sm font-bold text-cathedral-ivory">Dual Synchronized Generator Grid</h4>
                  <p className="text-xs text-cathedral-muted mt-0.5">Heavy industrial generators ensuring zero voltage drops or power interruptions during your celebration.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-cathedral-card p-4 rounded-xl border border-cathedral-border">
                <Award className="w-6 h-6 text-gold-400 shrink-0 mt-1" />
                <div>
                  <h4 className="font-serif text-sm font-bold text-cathedral-ivory">Curated Security & Event Contact</h4>
                  <p className="text-xs text-cathedral-muted mt-0.5">Dedicated event supervisors, protocol officers, armed escorts, and valet parking.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Facility Video Embed */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden border border-gold-500/30 shadow-cathedral-card group">
              <FacilitiesCarousel
                showVideo={false}
                autoPlay={true}
                interval={6000}
                height="h-[480px]"
                showDots={true}
                showArrows={true}
              />
              <div className="absolute bottom-6 left-6 right-6 bg-glass p-6 rounded-2xl border border-gold-500/20 backdrop-blur-md z-30 pointer-events-none">
                <div className="text-xs uppercase tracking-widest text-gold-400 font-bold mb-1">Flagship Venue</div>
                <div className="text-lg font-serif font-bold text-cathedral-ivory">{flagshipHall.name}</div>
                <div className="text-xs text-cathedral-muted mt-1">Capacity: {flagshipHall.capacityMin} - {flagshipHall.capacityMax}+ Guests</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SINGLE HALL SHOWCASE + PROMO PRICING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <div className="text-xs uppercase tracking-[0.3em] font-bold text-gold-400">Our Flagship Venue</div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-cathedral-ivory">{flagshipHall.name}</h2>
          <p className="max-w-xl mx-auto text-xs md:text-sm text-cathedral-muted">
            {flagshipHall.subtitle}
          </p>
        </div>

        {/* Promo Pricing Card */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-cathedral-card rounded-3xl border-2 border-gold-400/50 overflow-hidden shadow-gold-glow relative">
            {/* Promo Ribbon */}
            <div className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 py-3 px-6 flex items-center justify-center gap-3 animate-promo-pulse">
              <Tag className="w-5 h-5 text-white" />
              <span className="text-white font-bold text-sm md:text-base uppercase tracking-wider">
                Special Offer: {formatCurrency(HALL_PROMO_PRICE)} — Ends October 30th!
              </span>
              <Flame className="w-5 h-5 text-yellow-300 animate-pulse" />
            </div>

            <div className="p-8 md:p-10 space-y-8">
              {/* Price Display */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-center sm:text-left space-y-2">
                  <div className="text-xs uppercase tracking-widest text-cathedral-muted font-semibold">Standard Venue Rental</div>
                  <div className="text-2xl text-cathedral-muted font-serif line-through">{formatCurrency(HALL_STANDARD_PRICE)}</div>
                </div>
                <div className="text-center sm:text-right space-y-2">
                  <div className="text-xs uppercase tracking-widest text-red-400 font-bold flex items-center justify-center sm:justify-end gap-1.5">
                    <Flame className="w-3.5 h-3.5" />
                    October 30th Promo Price
                  </div>
                  <div className="text-4xl md:text-5xl font-serif font-bold animate-gold-shimmer">{formatCurrency(HALL_PROMO_PRICE)}</div>
                  <div className="text-xs text-gold-300 font-mono">Save {formatCurrency(HALL_STANDARD_PRICE - HALL_PROMO_PRICE)}</div>
                </div>
              </div>

              {/* Feature Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-cathedral-border">
                {flagshipHall.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-cathedral-muted">
                    <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Deposit Info */}
              <div className="bg-gradient-to-r from-gold-900/20 to-cathedral-elevated border border-gold-400/40 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <div className="text-xs uppercase tracking-widest text-gold-400 font-bold">50% Deposit to Lock Your Date</div>
                  <div className="text-2xl font-serif font-bold text-gold-400 mt-1">{formatCurrency(HALL_PROMO_PRICE * 0.5)}</div>
                </div>
                <Link
                  to="/book"
                  className="px-8 py-4 rounded-full bg-gold-gradient text-cathedral-bg font-bold text-sm uppercase tracking-widest hover:brightness-110 transition-all shadow-gold-glow flex items-center gap-2 group"
                >
                  <Calendar className="w-5 h-5" />
                  Book Now
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VIRTUAL TOUR — Video Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <div className="text-xs uppercase tracking-[0.3em] font-bold text-gold-400">Virtual Tour</div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-cathedral-ivory">Our Stunning Facilities</h2>
          <p className="max-w-xl mx-auto text-xs md:text-sm text-cathedral-muted">
            Take an immersive video tour through The Cathedral — from grand ballroom archways to VIP suites, state-of-the-art stage rigs, and outdoor pavilions.
          </p>
        </div>

        <div className="relative rounded-3xl overflow-hidden border border-gold-500/30 shadow-2xl">
          <video
            src={facilityVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-[300px] md:h-[560px] object-cover"
          />
          {/* Subtle bottom gradient overlay with venue name */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cathedral-bg to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between z-10">
            <div className="bg-glass px-5 py-3 rounded-xl border border-gold-500/20 backdrop-blur-md">
              <div className="text-[10px] uppercase tracking-widest text-gold-400 font-bold">Now Showing</div>
              <div className="text-sm font-serif font-bold text-cathedral-ivory mt-0.5">The Cathedral — SUCRE Events Centre</div>
            </div>
          </div>
        </div>
      </section>

      {/* FLAGSHIP PACKAGE HIGHLIGHT */}
      <section className="bg-cathedral-card/50 py-20 border-y border-gold-500/20 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <div className="text-xs uppercase tracking-[0.3em] font-bold text-gold-400">All-Inclusive Flagship Package</div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-cathedral-ivory">Everything Is Included</h2>
            <p className="max-w-xl mx-auto text-xs md:text-sm text-cathedral-muted">
              Your venue rental comes complete with full production, VIP lounges, security, and all event infrastructure — at no extra tier cost.
            </p>
          </div>

          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-cathedral-card rounded-3xl p-8 md:p-12 border-2 border-gold-400/50 shadow-gold-glow relative">
              {pkg.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold-gradient text-cathedral-bg text-[11px] uppercase font-bold tracking-widest px-6 py-1.5 rounded-full shadow-lg">
                  {pkg.badge}
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="space-y-6">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-gold-400 font-semibold">{pkg.tier} Package</div>
                    <h3 className="text-2xl font-serif font-bold text-cathedral-ivory mt-1">{pkg.name}</h3>
                    <p className="text-xs text-cathedral-muted mt-2 leading-relaxed">{pkg.description}</p>
                  </div>

                  <ul className="space-y-3 text-xs text-cathedral-muted">
                    {(typeof pkg.features === 'string' ? JSON.parse(pkg.features) : pkg.features).map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-center space-y-4">
                  <div className="text-xs uppercase tracking-widest text-cathedral-muted font-semibold">Package is Included in Venue Rental</div>
                  <div className="text-4xl md:text-5xl font-serif font-bold animate-gold-shimmer">{formatCurrency(HALL_PROMO_PRICE)}</div>
                  <div className="text-xs text-cathedral-muted font-mono">Promo price — Ends October 30th</div>
                  <Link
                    to="/book"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold-gradient text-cathedral-bg font-bold text-sm uppercase tracking-widest hover:brightness-110 transition-all shadow-gold-glow group"
                  >
                    <Calendar className="w-5 h-5" />
                    Book This Package
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GOOGLE MAPS LOCATION & DIRECTIONS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-cathedral-card border border-gold-500/30 rounded-3xl p-8 md:p-12 space-y-8 shadow-cathedral-card">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-gold-400 text-xs uppercase font-bold tracking-widest">
                <MapPin className="w-4 h-4 text-gold-400" />
                Quick Access Location & Driving Directions
              </div>
              <h3 className="text-2xl md:text-4xl font-serif font-bold text-cathedral-ivory">
                Find SUCRE Events Centre
              </h3>
              <p className="text-xs md:text-sm text-cathedral-muted max-w-2xl leading-relaxed">
                <strong className="text-gold-300 font-semibold">Address:</strong> Ilero, Ayegun Oleyo Road, Off Akala Expressway, passing through Christ High School Ashipa. Ibadan, Oyo State.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Ilero+Ayegun+Oleyo+Road+Off+Akala+Expressway+Ibadan"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-full bg-gold-gradient text-cathedral-bg font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-md"
              >
                <MapPin className="w-4 h-4" />
                Open Google Maps App
              </a>
              <a
                href="https://wa.me/2349058804253?text=Hello%20SUCRE%20Events%20Centre,%20please%20send%20me%20the%20exact%20GPS%20location%20and%20driving%20directions."
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-full bg-cathedral-elevated border border-gold-500/40 text-gold-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-gold-500/10 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                WhatsApp Directions
              </a>
            </div>
          </div>

          {/* Map Frame */}
          <div className="w-full h-[420px] rounded-2xl overflow-hidden border border-cathedral-border relative shadow-2xl">
            <iframe
              title="SUCRE Events Centre Google Maps Location"
              src="https://maps.google.com/maps?q=Ayegun%20Oleyo%20Road%20Off%20Akala%20Expressway%20Ibadan%20Oyo%20State&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0 filter grayscale invert contrast-125 opacity-90 hover:grayscale-0 transition-all duration-500"
              allowFullScreen=""
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* QUICK INQUIRY / CONTACT CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-cathedral-card via-cathedral-elevated to-cathedral-card rounded-3xl p-8 md:p-12 border border-gold-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <MessageCircle className="w-4 h-4" />
              Instant Date Availability Check
            </div>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-cathedral-ivory">
              Need Immediate Date Reservation Assistance?
            </h3>
            <p className="text-xs md:text-sm text-cathedral-muted max-w-xl">
              Connect directly with our Chief Event Coordinator via phone or official WhatsApp contact line (09058804253).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full md:w-auto">
            <a
              href="tel:09058804253"
              className="px-6 py-3.5 rounded-full bg-cathedral-bg border border-gold-500/40 text-gold-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-gold-500/10 transition-colors"
            >
              <Phone className="w-4 h-4 text-gold-400" />
              Call 09058804253
            </a>
            <a
              href="https://wa.me/2349058804253?text=Hello%20SUCRE%20Events%20Centre,%20I%20want%20to%20check%20date%20availability."
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-full bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-emerald-500 transition-colors shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Direct
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
