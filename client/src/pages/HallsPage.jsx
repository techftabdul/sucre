import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import FacilitiesCarousel from '../components/FacilitiesCarousel';
import { Crown, Users, CheckCircle2, ChevronRight, Sparkles, Building2, Tag, Flame, Calendar, Shield } from 'lucide-react';

// Import all facility images for the masonry grid
const imageModules = import.meta.glob('../assets/facilities/facility-*.jpg', { eager: true });
const facilityImages = Object.entries(imageModules)
  .sort(([a], [b]) => {
    const numA = parseInt(a.match(/facility-(\d+)/)?.[1] || '0');
    const numB = parseInt(b.match(/facility-(\d+)/)?.[1] || '0');
    return numA - numB;
  })
  .map(([path, mod]) => ({
    src: mod.default,
    alt: `SUCRE Events Centre Facility ${path.match(/facility-(\d+)/)?.[1] || ''}`,
  }));

// Import facility video
import facilityVideo from '../assets/facilities/facility-video.mp4';

export default function HallsPage() {
  const { flagshipHall, HALL_STANDARD_PRICE, HALL_PROMO_PRICE, formatCurrency, goToStep } = useBooking();
  const navigate = useNavigate();

  const handleReserve = () => {
    goToStep(1);
    navigate('/book');
  };

  return (
    <div className="min-h-screen bg-cathedral-bg text-cathedral-ivory py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 text-xs uppercase tracking-[0.25em] font-semibold">
          <Building2 className="w-4 h-4 text-gold-400" />
          Our Flagship Venue
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-cathedral-ivory">
          {flagshipHall.name}
        </h1>
        <p className="text-sm md:text-base text-cathedral-muted leading-relaxed">
          {flagshipHall.subtitle}
        </p>
      </div>

      {/* Hero Video + Promo Banner */}
      <div className="space-y-8">
        {/* Video Showcase */}
        <div className="relative rounded-3xl overflow-hidden border border-gold-500/30 shadow-cathedral-card">
          <video
            src={facilityVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-[300px] md:h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cathedral-bg via-transparent to-transparent" />
          
          {/* Overlay Info */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="bg-glass p-5 rounded-2xl border border-gold-500/20 backdrop-blur-md">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-5 h-5 text-gold-400" />
                <span className="text-xs uppercase tracking-widest text-gold-400 font-bold">Flagship Venue</span>
              </div>
              <div className="text-xl font-serif font-bold text-cathedral-ivory">{flagshipHall.name}</div>
              <div className="text-xs text-cathedral-muted mt-1 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-gold-400" />
                Capacity: {flagshipHall.capacityMin} - {flagshipHall.capacityMax}+ Guests
              </div>
            </div>
          </div>
        </div>

        {/* Promo Pricing Banner */}
        <div className="bg-cathedral-card rounded-3xl border-2 border-gold-400/50 overflow-hidden shadow-gold-glow">
          <div className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 py-3 px-6 flex items-center justify-center gap-3 animate-promo-pulse">
            <Tag className="w-5 h-5 text-white" />
            <span className="text-white font-bold text-sm md:text-base uppercase tracking-wider">
              Special Offer: {formatCurrency(HALL_PROMO_PRICE)} — Ending in October!
            </span>
            <Flame className="w-5 h-5 text-yellow-300 animate-pulse" />
          </div>

          <div className="p-8 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* Left: Description + Features */}
              <div className="space-y-6">
                <p className="text-sm text-cathedral-muted leading-relaxed">
                  {flagshipHall.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {flagshipHall.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-cathedral-muted">
                      <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Pricing + CTA */}
              <div className="bg-cathedral-elevated rounded-2xl border border-cathedral-border p-8 space-y-6 text-center">
                <div>
                  <div className="text-xs uppercase tracking-widest text-cathedral-muted font-semibold mb-2">Standard Venue Rental</div>
                  <div className="text-2xl text-cathedral-muted font-serif line-through">{formatCurrency(HALL_STANDARD_PRICE)}</div>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-widest text-red-400 font-bold flex items-center justify-center gap-1.5 mb-2">
                    <Flame className="w-3.5 h-3.5" />
                    October Promotional Price
                  </div>
                  <div className="text-4xl md:text-5xl font-serif font-bold animate-gold-shimmer">{formatCurrency(HALL_PROMO_PRICE)}</div>
                  <div className="text-xs text-gold-300 font-mono mt-2">You save {formatCurrency(HALL_STANDARD_PRICE - HALL_PROMO_PRICE)}</div>
                </div>

                {/* Deposit */}
                <div className="bg-gold-900/20 border border-gold-400/30 rounded-xl p-4">
                  <div className="text-[11px] uppercase tracking-widest text-gold-400 font-bold">Required 50% Deposit</div>
                  <div className="text-2xl font-serif font-bold text-gold-400 mt-1">{formatCurrency(HALL_PROMO_PRICE * 0.5)}</div>
                </div>

                <button
                  onClick={handleReserve}
                  className="w-full py-4 rounded-full bg-gold-gradient text-cathedral-bg font-bold text-sm uppercase tracking-widest hover:brightness-110 transition-all shadow-gold-glow flex items-center justify-center gap-2 group"
                >
                  <Calendar className="w-5 h-5" />
                  Reserve at Promo Price
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FACILITIES GALLERY — Full Image Showcase */}
      <section className="space-y-8">
        <div className="text-center space-y-3">
          <div className="text-xs uppercase tracking-[0.3em] font-bold text-gold-400">Virtual Tour</div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-cathedral-ivory">
            Our Stunning Facilities
          </h2>
          <p className="max-w-xl mx-auto text-xs md:text-sm text-cathedral-muted">
            Explore every angle of The Cathedral — from the grand ballroom archways to VIP suites, outdoor pavilions, and state-of-the-art lighting rigs.
          </p>
        </div>

        {/* Main Carousel */}
        <FacilitiesCarousel
          showVideo={false}
          autoPlay={true}
          interval={4000}
          height="h-[300px] md:h-[500px]"
          showDots={true}
          showArrows={true}
          className="shadow-lg"
        />

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {facilityImages.map((img, idx) => (
            <div
              key={idx}
              className="relative rounded-lg overflow-hidden border border-cathedral-border hover:border-gold-400/50 transition-all group cursor-pointer aspect-square"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-cathedral-bg/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-[10px] font-mono text-gold-300 bg-cathedral-bg/70 px-2 py-0.5 rounded-full">{idx + 1}/21</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
