import React from 'react';
import { Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { Calendar, Crown, ShieldCheck, Sparkles, Star, Users, CheckCircle2, ChevronRight, Phone, MessageCircle, Award, Zap, MapPin } from 'lucide-react';

export default function HomePage() {
  const { halls, packages, formatCurrency } = useBooking();

  return (
    <div className="min-h-screen bg-cathedral-bg text-cathedral-ivory space-y-24 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-12 pb-24 overflow-hidden">
        {/* Background Image Overlay with Dark Glass Gradient */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2000&q=80" 
            alt="SUCRE Events Centre Cathedral Hall" 
            className="w-full h-full object-cover object-center filter brightness-[0.35] scale-105 transition-transform duration-10000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cathedral-bg via-cathedral-bg/70 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 text-xs uppercase tracking-[0.25em] font-semibold backdrop-blur-md">
            <Crown className="w-4 h-4 text-gold-400" />
            Ibadan’s Crown Jewel Event Venue
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

          {/* CTAs */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/book"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gold-gradient text-cathedral-bg font-bold text-sm uppercase tracking-widest hover:brightness-110 transition-all duration-300 shadow-gold-glow flex items-center justify-center gap-2 group"
            >
              <Calendar className="w-5 h-5" />
              Reserve Your Date Now
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/halls"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-cathedral-card/80 border border-gold-500/40 text-gold-300 font-semibold text-sm uppercase tracking-widest hover:bg-gold-500/10 hover:border-gold-400 transition-all duration-300 backdrop-blur-md flex items-center justify-center gap-2"
            >
              Explore 5 Hall Grades
            </Link>
          </div>

          {/* Key Metrics */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-gold-500/20 max-w-4xl mx-auto text-left">
            <div className="bg-cathedral-card/40 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
              <div className="text-2xl font-serif font-bold text-gold-gradient">1,500+</div>
              <div className="text-xs text-cathedral-muted uppercase tracking-wider mt-1">Max Guest Capacity</div>
            </div>
            <div className="bg-cathedral-card/40 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
              <div className="text-2xl font-serif font-bold text-gold-gradient">5 Grades</div>
              <div className="text-xs text-cathedral-muted uppercase tracking-wider mt-1">Intimate to Master</div>
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
                  <h4 className="font-serif text-sm font-bold text-cathedral-ivory">Curated Concierge & Security</h4>
                  <p className="text-xs text-cathedral-muted mt-0.5">Dedicated event supervisors, protocol officers, armed escorts, and valet parking.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden border border-gold-500/30 shadow-cathedral-card group">
              <img 
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80" 
                alt="Cathedral Grand Hall Interior" 
                className="w-full h-[480px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cathedral-bg via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 bg-glass p-6 rounded-2xl border border-gold-500/20 backdrop-blur-md">
                <div className="text-xs uppercase tracking-widest text-gold-400 font-bold mb-1">Featured Venue</div>
                <div className="text-lg font-serif font-bold text-cathedral-ivory">Grade 5: The Cathedral Master Grandeur</div>
                <div className="text-xs text-cathedral-muted mt-1">Capacity: 900 - 1,500+ Guests • Base: ₦2,600,000</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HALL GRADES PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <div className="text-xs uppercase tracking-[0.3em] font-bold text-gold-400">Tailored Capacity Options</div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-cathedral-ivory">Explore Our 5 Hall Grades</h2>
          <p className="max-w-xl mx-auto text-xs md:text-sm text-cathedral-muted">
            From intimate VIP sanctuary dinners to mega 1,500-guest royal banquets, choose the perfect scale for your event.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {halls.slice(0, 3).map((hall) => (
            <div key={hall.id} className="bg-cathedral-card rounded-2xl overflow-hidden border border-cathedral-border/80 hover:border-gold-500/50 transition-all duration-300 flex flex-col group">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={hall.image} 
                  alt={hall.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-gold-400 text-cathedral-bg text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-md">
                  Grade {hall.grade}
                </div>
                <div className="absolute bottom-3 right-3 bg-cathedral-bg/90 text-gold-300 text-xs font-mono px-3 py-1 rounded-full backdrop-blur-sm border border-gold-500/30">
                  {hall.capacityMin} - {hall.capacityMax} Guests
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-cathedral-ivory group-hover:text-gold-300 transition-colors">
                    {hall.name}
                  </h3>
                  <p className="text-xs text-cathedral-muted mt-1 line-clamp-2">
                    {hall.subtitle}
                  </p>
                </div>

                <div className="pt-4 border-t border-cathedral-border flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-cathedral-muted">Starting Base Price</div>
                    <div className="text-lg font-serif font-bold text-gold-gradient">
                      {formatCurrency(hall.basePrice)}
                    </div>
                  </div>
                  <Link 
                    to="/halls" 
                    className="p-2.5 rounded-full bg-gold-500/10 text-gold-400 hover:bg-gold-400 hover:text-cathedral-bg transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <Link
            to="/halls"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-cathedral-card border border-gold-500/40 text-gold-300 font-semibold text-xs uppercase tracking-widest hover:border-gold-400 transition-colors"
          >
            View Full 5-Grade Matrix & Specifications <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* EXPERIENCE PACKAGES HIGHLIGHT */}
      <section className="bg-cathedral-card/50 py-20 border-y border-gold-500/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <div className="text-xs uppercase tracking-[0.3em] font-bold text-gold-400">Bespoke Experience Tiers</div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-cathedral-ivory">Curated Event Packages</h2>
            <p className="max-w-xl mx-auto text-xs md:text-sm text-cathedral-muted">
              Select an all-inclusive production tier designed to take care of lighting, sound, VIP suites, and security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div 
                key={pkg.id} 
                className={`bg-cathedral-card rounded-3xl p-8 border transition-all duration-300 relative flex flex-col justify-between ${
                  pkg.tier === 'Silver' 
                    ? 'border-gold-400 shadow-gold-glow bg-gradient-to-b from-cathedral-card to-gold-900/10 scale-105' 
                    : 'border-cathedral-border hover:border-gold-500/30'
                }`}
              >
                {pkg.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gold-gradient text-cathedral-bg text-[10px] uppercase font-bold tracking-widest px-4 py-1 rounded-full shadow-lg">
                    {pkg.badge}
                  </div>
                )}

                <div className="space-y-6">
                  <div className="border-b border-cathedral-border pb-6">
                    <div className="text-xs uppercase tracking-widest text-gold-400 font-semibold">{pkg.tier} Tier</div>
                    <h3 className="text-2xl font-serif font-bold text-cathedral-ivory mt-1">{pkg.name}</h3>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-3xl font-serif font-bold text-gold-gradient">{formatCurrency(pkg.price)}</span>
                      <span className="text-xs text-cathedral-muted">/ package</span>
                    </div>
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

                <div className="pt-8">
                  <Link
                    to="/book"
                    className={`w-full py-3.5 rounded-full font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                      pkg.tier === 'Silver'
                        ? 'bg-gold-gradient text-cathedral-bg shadow-md hover:brightness-110'
                        : 'bg-cathedral-elevated border border-gold-500/30 text-gold-300 hover:bg-gold-500/10'
                    }`}
                  >
                    Select {pkg.tier} Package
                  </Link>
                </div>
              </div>
            ))}
          </div>
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
                href="https://wa.me/2348174303757?text=Hello%20SUCRE%20Events%20Centre,%20please%20send%20me%20the%20exact%20GPS%20location%20and%20driving%20directions."
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

      {/* QUICK INQUIRY / CONCIERGE CALLOUT */}
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
              Connect directly with our Chief Event Coordinator via phone or official WhatsApp concierge line (08174303757).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full md:w-auto">
            <a
              href="tel:08174303757"
              className="px-6 py-3.5 rounded-full bg-cathedral-bg border border-gold-500/40 text-gold-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-gold-500/10 transition-colors"
            >
              <Phone className="w-4 h-4 text-gold-400" />
              Call 08174303757
            </a>
            <a
              href="https://wa.me/2348174303757?text=Hello%20SUCRE%20Events%20Centre,%20I%20want%20to%20check%20date%20availability."
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

