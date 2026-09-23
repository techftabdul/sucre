import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { Crown, Users, CheckCircle2, ChevronRight, Sparkles, Building2 } from 'lucide-react';

export default function HallsPage() {
  const { halls, setSelectedHall, formatCurrency, goToStep } = useBooking();
  const navigate = useNavigate();

  const handleSelectHall = (hall) => {
    setSelectedHall(hall);
    goToStep(3); // Navigate to package selection step in wizard
    navigate('/book');
  };

  return (
    <div className="min-h-screen bg-cathedral-bg text-cathedral-ivory py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 text-xs uppercase tracking-[0.25em] font-semibold">
          <Building2 className="w-4 h-4 text-gold-400" />
          Hall Grade Matrix (Grades 1 to 5)
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-cathedral-ivory">
          Architectural Grandeur Tailored to Every Scale
        </h1>
        <p className="text-sm md:text-base text-cathedral-muted leading-relaxed">
          From intimate VIP banquets to Ibadan's largest 1,500-guest royal celebrations. Select a grade to view specs or begin your date reservation.
        </p>
      </div>

      {/* Hall Cards List */}
      <div className="space-y-12">
        {halls.map((hall) => {
          const parsedFeatures = typeof hall.features === 'string' ? JSON.parse(hall.features) : hall.features;
          const isCathedralMaster = hall.grade === 5;

          return (
            <div 
              key={hall.id}
              className={`bg-cathedral-card rounded-3xl border overflow-hidden transition-all duration-300 ${
                isCathedralMaster 
                  ? 'border-gold-400 shadow-gold-glow bg-gradient-to-r from-cathedral-card via-cathedral-elevated to-cathedral-card' 
                  : 'border-cathedral-border hover:border-gold-500/40'
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 md:p-8">
                
                {/* Image Showcase */}
                <div className="lg:col-span-5 relative rounded-2xl overflow-hidden h-64 lg:h-80 group">
                  <img 
                    src={hall.image} 
                    alt={hall.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 left-4 bg-gold-gradient text-cathedral-bg font-bold text-xs uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-lg">
                    Grade {hall.grade}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 bg-cathedral-bg/90 backdrop-blur-md border border-gold-500/30 rounded-xl p-3 flex items-center justify-between text-xs">
                    <span className="text-cathedral-muted flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-gold-400" />
                      Guest Capacity
                    </span>
                    <span className="font-mono font-bold text-gold-300">
                      {hall.capacityMin} - {hall.capacityMax} Guests
                    </span>
                  </div>
                </div>

                {/* Content & Specs */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl md:text-3xl font-serif font-bold text-cathedral-ivory">
                        {hall.name}
                      </h2>
                      {isCathedralMaster && (
                        <span className="inline-flex items-center gap-1 bg-gold-400/20 border border-gold-400 text-gold-300 text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full">
                          <Crown className="w-3 h-3 text-gold-400" /> Crown Jewel
                        </span>
                      )}
                    </div>
                    <p className="text-xs italic text-gold-300/80 mt-1 font-serif">
                      {hall.subtitle}
                    </p>
                    <p className="text-xs text-cathedral-muted mt-3 leading-relaxed">
                      {hall.description}
                    </p>
                  </div>

                  {/* Feature Checklist */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs text-cathedral-muted pt-2 border-t border-cathedral-border/60">
                    {parsedFeatures.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price & Select Button */}
                  <div className="pt-4 border-t border-cathedral-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-cathedral-muted font-medium">Starting Base Rental</div>
                      <div className="text-2xl font-serif font-bold text-gold-gradient">
                        {formatCurrency(hall.basePrice)}
                      </div>
                    </div>

                    <button
                      onClick={() => handleSelectHall(hall)}
                      className="w-full sm:w-auto px-7 py-3 rounded-full bg-gold-gradient text-cathedral-bg font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-md flex items-center justify-center gap-2 group"
                    >
                      Select Grade {hall.grade} & Reserve
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
