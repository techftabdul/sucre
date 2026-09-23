import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

// Programmatically import all facility images using Vite's glob
const imageModules = import.meta.glob('../assets/facilities/facility-*.jpg', { eager: true });

// Sort images by number (facility-1, facility-2, … facility-21)
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

export default function FacilitiesCarousel({
  showVideo = false,
  autoPlay = true,
  interval = 4000,
  className = '',
  height = 'h-[300px] md:h-[500px]',
  showDots = true,
  showArrows = true,
  overlay = false,
}) {
  const totalSlides = showVideo ? facilityImages.length + 1 : facilityImages.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef(null);
  const touchStartRef = useRef(0);
  const touchEndRef = useRef(0);

  // Track visited slides to only render media when needed, optimizing memory
  const [visited, setVisited] = useState(() => new Set([0, 1, totalSlides - 1]));

  useEffect(() => {
    setVisited(prev => {
      const next = new Set(prev);
      next.add(currentIndex);
      next.add((currentIndex + 1) % totalSlides);
      next.add((currentIndex - 1 + totalSlides) % totalSlides);
      return next;
    });
  }, [currentIndex, totalSlides]);

  const goToSlide = useCallback((index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning]);

  const goNext = useCallback(() => {
    goToSlide((currentIndex + 1) % totalSlides);
  }, [currentIndex, totalSlides, goToSlide]);

  const goPrev = useCallback(() => {
    goToSlide((currentIndex - 1 + totalSlides) % totalSlides);
  }, [currentIndex, totalSlides, goToSlide]);

  // Auto-advance
  useEffect(() => {
    if (!autoPlay) return;
    timerRef.current = setInterval(goNext, interval);
    return () => clearInterval(timerRef.current);
  }, [autoPlay, interval, goNext]);

  // Pause auto-play on hover
  const pauseAuto = () => { if (timerRef.current) clearInterval(timerRef.current); };
  const resumeAuto = () => {
    if (!autoPlay) return;
    timerRef.current = setInterval(goNext, interval);
  };

  // Touch swipe support
  const onTouchStart = (e) => { touchStartRef.current = e.targetTouches[0].clientX; };
  const onTouchMove = (e) => { touchEndRef.current = e.targetTouches[0].clientX; };
  const onTouchEnd = () => {
    const diff = touchStartRef.current - touchEndRef.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  // Build slides array
  const slides = [];
  if (showVideo) {
    slides.push({ type: 'video', src: facilityVideo });
  }
  facilityImages.forEach((img) => {
    slides.push({ type: 'image', ...img });
  });

  return (
    <div
      className={`relative overflow-hidden rounded-xl ${height} ${className}`}
      onMouseEnter={pauseAuto}
      onMouseLeave={resumeAuto}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="w-full h-full flex-shrink-0 relative bg-cathedral-bg/50 flex items-center justify-center">
            {/* Background Spinner */}
            <Loader2 className="absolute w-8 h-8 text-gold-500/50 animate-spin z-0" />
            
            {visited.has(i) && (
              slide.type === 'video' ? (
                <video
                  src={slide.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover relative z-10"
                />
              ) : (
                <img
                  src={slide.src}
                  alt={slide.alt}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  className="w-full h-full object-cover relative z-10"
                />
              )
            )}
          </div>
        ))}
      </div>

      {/* Dark overlay for hero usage */}
      {overlay && (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-cathedral-bg via-cathedral-bg/60 to-cathedral-bg/30 pointer-events-none z-[1]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-transparent pointer-events-none z-[1]" />
        </>
      )}

      {/* Arrow Navigation */}
      {showArrows && (
        <>
          <button
            onClick={goPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-cathedral-bg/70 backdrop-blur-md border border-gold-500/30 flex items-center justify-center text-gold-400 hover:bg-gold-400 hover:text-cathedral-bg transition-all duration-300 shadow-lg"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-cathedral-bg/70 backdrop-blur-md border border-gold-500/30 flex items-center justify-center text-gold-400 hover:bg-gold-400 hover:text-cathedral-bg transition-all duration-300 shadow-lg"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dot Indicators */}
      {showDots && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? 'w-8 h-2.5 bg-gold-400 shadow-gold-glow'
                  : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Slide Counter Badge */}
      <div className="absolute top-4 right-4 z-20 bg-cathedral-bg/70 backdrop-blur-md border border-gold-500/30 rounded-full px-3 py-1 text-[10px] font-mono text-gold-300 tracking-wider">
        {currentIndex + 1} / {totalSlides}
      </div>
    </div>
  );
}
