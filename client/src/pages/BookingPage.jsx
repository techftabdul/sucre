import React from 'react';
import { useBooking } from '../context/BookingContext';
import { 
  Check, ChevronRight, ChevronLeft, Crown, 
  Sparkles, Lock, MessageCircle, Wrench, Phone, ArrowUpRight, Flame, Tag, Shield, Calendar, CheckCircle2
} from 'lucide-react';

export default function BookingPage() {
  const {
    currentStep,
    nextStep,
    prevStep,
    goToStep,
    flagshipHall,
    HALL_STANDARD_PRICE,
    HALL_PROMO_PRICE,
    activeHallPrice,
    usePromoPrice,
    setUsePromoPrice,
    packages,
    selectedEventType,
    setSelectedEventType,
    guestCount,
    setGuestCount,
    selectedPackage,
    customerInfo,
    setCustomerInfo,
    calculation,
    formatCurrency
  } = useBooking();

  // Build a pre-filled WhatsApp message from the current booking selections
  const buildWhatsAppMessage = () => {
    const pricingLabel = usePromoPrice ? 'Promo' : 'Standard';
    const lines = [
      '🏛️ *SUCRE Events Centre — Manual Booking Request*',
      '',
      `👤 *Name:* ${customerInfo.name || '(not provided)'}`,
      `📱 *Phone:* ${customerInfo.phone || '(not provided)'}`,
      `📧 *Email:* ${customerInfo.email || '(not provided)'}`,
      `📅 *Event Date:* ${customerInfo.eventDate || '(not provided)'}`,
      `🎉 *Event Type:* ${selectedEventType}`,
      `👥 *Guests:* ${guestCount}`,
      `🏟️ *Venue:* ${flagshipHall.name} (${pricingLabel} Price: ${formatCurrency(activeHallPrice)})`,
      `✨ *Package:* ${selectedPackage?.name || ''} (${selectedPackage?.tier || ''} Tier)`,
      `💰 *Estimated Total:* ${formatCurrency(calculation?.totalAmount || 0)}`,
      `🔒 *Required 50% Deposit:* ${formatCurrency(calculation?.depositAmount || 0)}`,
      '',
      customerInfo.notes ? `📝 *Notes:* ${customerInfo.notes}` : '',
      '',
      'Kindly confirm availability and send payment details. Thank you!',
    ];
    return encodeURIComponent(lines.filter(l => l !== undefined).join('\n'));
  };

  const whatsAppHref = `https://wa.me/2349058804253?text=${buildWhatsAppMessage()}`;

  const eventTypes = [
    { name: 'Wedding Ceremony & Reception', icon: '💍', description: 'Royal wedding banquets & bridal showcases' },
    { name: 'Corporate Gala & Executive Summit', icon: '🏛️', description: 'High-level business symposiums & awards' },
    { name: 'Milestone Birthday Banquet', icon: '🎉', description: 'Opulent anniversary & birthday celebrations' },
    { name: 'Concert, Show & Live Broadcast', icon: '🎵', description: 'Stage productions & entertainment shows' },
    { name: 'Exhibition & Trade Expo', icon: '🎨', description: 'Spacious floor layouts & product launches' },
  ];

  return (
    <div className="min-h-screen bg-cathedral-bg text-cathedral-ivory py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Title */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 text-xs uppercase tracking-widest font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          Interactive 3-Step Reservation Wizard
        </div>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-cathedral-ivory">
          Reserve Your Date at The Cathedral
        </h1>
      </div>

      {/* STEP PROGRESS BAR */}
      <div className="max-w-3xl mx-auto space-y-3 px-1">
        {/* Mobile Active Step Indicator */}
        <div className="flex sm:hidden items-center justify-between bg-cathedral-card p-3 rounded-2xl border border-gold-500/30 text-xs">
          <span className="font-semibold text-cathedral-ivory">
            Step {currentStep} of 3: <span className="text-gold-300 font-bold">
              {['Event Details', 'Guest Capacity', 'Checkout'][currentStep - 1]}
            </span>
          </span>
          <span className="text-[10px] font-mono text-gold-400 font-bold bg-gold-400/10 px-2 py-0.5 rounded-full border border-gold-400/30">
            {Math.round((currentStep / 3) * 100)}% Complete
          </span>
        </div>

        <div className="flex items-center justify-between relative px-4">
          <div className="absolute top-1/2 left-8 right-8 h-0.5 bg-cathedral-border -translate-y-1/2 z-0" />
          
          {[
            { step: 1, label: 'Event Details' },
            { step: 2, label: 'Guest Capacity' },
            { step: 3, label: 'Checkout' },
          ].map((s) => {
            const isCompleted = currentStep > s.step;
            const isCurrent = currentStep === s.step;
            return (
              <div key={s.step} className="relative z-10 flex flex-col items-center">
                <button
                  onClick={() => s.step < currentStep && goToStep(s.step)}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                    isCompleted
                      ? 'bg-gold-400 text-cathedral-bg'
                      : isCurrent
                      ? 'bg-cathedral-card border-2 border-gold-400 text-gold-400 shadow-gold-glow'
                      : 'bg-cathedral-elevated text-cathedral-muted border border-cathedral-border'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3]" /> : s.step}
                </button>
                <span className={`text-[11px] font-medium tracking-wider uppercase mt-2 hidden sm:block ${
                  isCurrent ? 'text-gold-400 font-bold' : 'text-cathedral-muted'
                }`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* MAIN WIZARD CONTAINER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT FORM STEP CONTENT (8 COLS) */}
        <div className="lg:col-span-8 bg-cathedral-card border border-cathedral-border/80 rounded-3xl p-6 sm:p-8 space-y-8 shadow-2xl">
          
          {/* STEP 1: EVENT TYPE & DATE */}
          {currentStep === 1 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-serif font-bold text-cathedral-ivory">
                  Step 1: Event Type & Date
                </h2>
                <p className="text-xs text-cathedral-muted mt-1">
                  Select your event category and requested date to begin.
                </p>
              </div>

              {/* Event Type Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {eventTypes.map((type) => {
                  const isSelected = selectedEventType === type.name;
                  return (
                    <div
                      key={type.name}
                      onClick={() => setSelectedEventType(type.name)}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 flex items-start gap-4 ${
                        isSelected
                          ? 'border-gold-400 bg-gold-500/10 shadow-gold-glow'
                          : 'border-cathedral-border/80 bg-cathedral-elevated/40 hover:border-gold-500/30'
                      }`}
                    >
                      <span className="text-3xl">{type.icon}</span>
                      <div>
                        <div className={`font-serif font-bold text-sm ${isSelected ? 'text-gold-300' : 'text-cathedral-ivory'}`}>
                          {type.name}
                        </div>
                        <div className="text-[11px] text-cathedral-muted mt-1">
                          {type.description}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Event Date Picker */}
              <div className="space-y-3 pt-6 border-t border-cathedral-border">
                <label className="text-sm font-semibold text-cathedral-ivory flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gold-400" />
                  Requested Event Date
                </label>
                <input
                  type="date"
                  value={customerInfo.eventDate}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, eventDate: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl bg-cathedral-elevated border border-cathedral-border text-gold-300 font-mono focus:border-gold-400 focus:outline-none transition-colors"
                />
              </div>
            </div>
          )}

          {/* STEP 2: GUEST COUNT */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-serif font-bold text-cathedral-ivory">
                  Step 2: Guest Capacity
                </h2>
                <p className="text-xs text-cathedral-muted mt-1">
                  Adjust the slider or pick a range to estimate your event scale. Max capacity is strictly 1,000 guests.
                </p>
              </div>

              <div className="bg-cathedral-elevated p-8 rounded-2xl border border-cathedral-border space-y-6 text-center">
                <div className="text-4xl md:text-5xl font-serif font-bold text-gold-gradient">
                  {guestCount} Guests
                </div>

                <input
                  type="range"
                  min="100"
                  max="1000"
                  step="50"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full h-2 bg-cathedral-border rounded-lg appearance-none cursor-pointer accent-gold-400"
                />

                <div className="flex justify-between text-xs text-cathedral-muted font-mono">
                  <span>100 (Intimate)</span>
                  <span>500 (Classic)</span>
                  <span>1,000 (Max Capacity)</span>
                </div>
              </div>

              {/* Quick Guest Count Presets */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[150, 400, 750, 1000].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setGuestCount(preset)}
                    className={`py-3 rounded-xl border text-xs font-semibold tracking-wider ${
                      guestCount === preset
                        ? 'border-gold-400 bg-gold-400/20 text-gold-300'
                        : 'border-cathedral-border bg-cathedral-elevated text-cathedral-muted hover:text-cathedral-ivory'
                    }`}
                  >
                    {preset} Guests
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: CHECKOUT — MANUAL BOOKING VIA WHATSAPP (Payment gateway under maintenance) */}
          {currentStep === 3 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-serif font-bold text-cathedral-ivory">
                  Step 3: Checkout & Reservation Summary
                </h2>
                <p className="text-xs text-cathedral-muted mt-1">
                  Select your pricing tier, complete your details, and book your date.
                </p>
              </div>

              {/* Venue Pricing Toggle */}
              <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-widest text-gold-400 block">
                  Select Venue Pricing:
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Promo Price Option */}
                  <div
                    onClick={() => setUsePromoPrice(true)}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all relative overflow-hidden ${
                      usePromoPrice
                        ? 'border-gold-400 bg-gold-500/10 shadow-gold-glow'
                        : 'border-cathedral-border bg-cathedral-elevated hover:border-gold-500/30'
                    }`}
                  >
                    {/* Promo ribbon */}
                    <div className="absolute top-0 right-0 bg-red-500 text-white text-[9px] uppercase font-bold tracking-wider px-3 py-1 rounded-bl-xl z-10">
                      <Flame className="w-3 h-3 inline mr-1" />
                      Save {formatCurrency(HALL_STANDARD_PRICE - HALL_PROMO_PRICE)}
                    </div>

                    <div className="flex items-center gap-3 mb-3 relative z-10">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        usePromoPrice ? 'border-gold-400 bg-gold-400' : 'border-cathedral-border'
                      }`}>
                        {usePromoPrice && <Check className="w-3 h-3 text-cathedral-bg stroke-[3]" />}
                      </div>
                      <div className="text-xs uppercase font-bold tracking-widest text-red-400 flex items-center gap-1">
                        <Tag className="w-3.5 h-3.5" />
                        October Promo Price
                      </div>
                    </div>
                    <div className="text-2xl font-serif font-bold text-gold-gradient relative z-10">{formatCurrency(HALL_PROMO_PRICE)}</div>
                    <div className="text-[10px] text-cathedral-muted mt-1 relative z-10">Limited time — Ending October 30th!</div>
                  </div>

                  {/* Standard Price Option */}
                  <div
                    onClick={() => setUsePromoPrice(false)}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                      !usePromoPrice
                        ? 'border-gold-400 bg-gold-500/10 shadow-gold-glow'
                        : 'border-cathedral-border bg-cathedral-elevated hover:border-gold-500/30'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        !usePromoPrice ? 'border-gold-400 bg-gold-400' : 'border-cathedral-border'
                      }`}>
                        {!usePromoPrice && <Check className="w-3 h-3 text-cathedral-bg stroke-[3]" />}
                      </div>
                      <div className="text-xs uppercase font-bold tracking-widest text-cathedral-muted">
                        Standard Price
                      </div>
                    </div>
                    <div className="text-2xl font-serif font-bold text-gold-gradient">{formatCurrency(HALL_STANDARD_PRICE)}</div>
                    <div className="text-[10px] text-cathedral-muted mt-1">Full-rate venue rental</div>
                  </div>
                </div>
              </div>

              {/* ── Maintenance Notice ── */}
              <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-400/40 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0">
                  <Wrench className="w-5 h-5 text-amber-400" />
                </div>
                <div className="space-y-1">
                  <div className="text-amber-300 font-bold text-sm flex items-center gap-2">
                    Online Payment Gateway — Under Maintenance
                  </div>
                  <p className="text-xs text-amber-200/70 leading-relaxed">
                    Our Paystack checkout is currently undergoing scheduled maintenance. Kindly complete your booking manually by sending your details to our WhatsApp contact line and we will process your reservation immediately.
                  </p>
                </div>
              </div>

              {/* ── Prominent Deposit Callout ── */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-gold-900/30 to-cathedral-elevated border-2 border-gold-400/50 animate-deposit-pulse space-y-3">
                <div className="flex items-center gap-2 text-gold-400">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm font-bold uppercase tracking-wider">Booking Payment Summary</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-cathedral-muted font-semibold">Total Estimation</div>
                    <div className="text-xl font-serif font-bold text-cathedral-ivory mt-1">{formatCurrency(calculation?.totalAmount)}</div>
                  </div>
                  <div className="bg-gold-400/10 rounded-xl p-3 border border-gold-400/30 shadow-inner">
                    <div className="text-[10px] uppercase tracking-widest text-gold-400 font-bold">Required Deposit (50%)</div>
                    <div className="text-2xl font-serif font-bold text-gold-400 mt-1">{formatCurrency(calculation?.depositAmount)}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-cathedral-muted font-semibold">Balance Due (14 Days Prior)</div>
                    <div className="text-xl font-serif font-bold text-cathedral-ivory mt-1">{formatCurrency(calculation?.balanceAmount)}</div>
                  </div>
                </div>
              </div>

              {/* ── Customer Detail Form ── */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-gold-400 uppercase tracking-widest border-b border-cathedral-border pb-2">Client Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-cathedral-ivory">Full Name / Organization</label>
                    <input
                      type="text"
                      placeholder="e.g. Chief Adebayo Adeleke"
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-cathedral-elevated border border-cathedral-border text-cathedral-ivory focus:border-gold-400 focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-cathedral-ivory">Email Address</label>
                    <input
                      type="email"
                      placeholder="adebayo@example.com"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-cathedral-elevated border border-cathedral-border text-cathedral-ivory focus:border-gold-400 focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="font-semibold text-cathedral-ivory">Phone / WhatsApp Line</label>
                    <input
                      type="tel"
                      placeholder="09058804253"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-cathedral-elevated border border-cathedral-border text-cathedral-ivory focus:border-gold-400 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 text-xs pt-2">
                  <label className="font-semibold text-cathedral-ivory">Special Setup Notes / Color Theme</label>
                  <textarea
                    rows="3"
                    placeholder="Mention color palette, seating arrangements, or special VIP security requirements..."
                    value={customerInfo.notes}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-cathedral-elevated border border-cathedral-border text-cathedral-ivory focus:border-gold-400 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* ── WhatsApp Booking CTA ── */}
              <div className="space-y-3 pt-4 border-t border-cathedral-border">
                <a
                  id="whatsapp-book-now"
                  href={whatsAppHref}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-3 group"
                >
                  <MessageCircle className="w-5 h-5" />
                  Book Now via WhatsApp Contact
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href="tel:09058804253"
                  className="w-full py-3.5 rounded-full bg-cathedral-elevated border border-gold-500/30 text-gold-300 font-bold text-xs uppercase tracking-widest hover:bg-gold-500/10 transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-gold-400" />
                  Or Call Us Directly: 09058804253
                </a>
              </div>

              {/* Booking policy reminder */}
              <div className="p-4 rounded-xl bg-gold-400/10 border border-gold-400/30 text-xs text-cathedral-muted space-y-1 text-center">
                <div className="font-bold text-gold-300 flex items-center justify-center gap-1.5">
                  <Lock className="w-4 h-4 text-gold-400" />
                  50% Deposit Date-Lock Policy
                </div>
                <p>
                  Your date is officially reserved upon receipt of a 50% deposit. Our contact team will send you payment account details immediately via WhatsApp.
                </p>
              </div>
            </div>
          )}

          {/* PREV / NEXT BUTTONS */}
          <div className="pt-6 border-t border-cathedral-border flex items-center justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-2.5 rounded-full border border-cathedral-border text-xs uppercase tracking-wider text-cathedral-muted hover:text-cathedral-ivory disabled:opacity-30 flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>

            {currentStep < 3 && (
              <button
                onClick={nextStep}
                className="px-8 py-3 rounded-full bg-gold-gradient text-cathedral-bg font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all flex items-center gap-1 shadow-md"
              >
              Continue <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>

        {/* RIGHT LIVE CALCULATION SUMMARY CARD (4 COLS) */}
        <div className="lg:col-span-4 bg-cathedral-card border border-gold-500/30 rounded-3xl p-6 space-y-6 shadow-cathedral-card sticky top-28">
          <div className="border-b border-cathedral-border pb-4 flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-gold-400">Live Calculation</div>
              <h3 className="text-xl font-serif font-bold text-cathedral-ivory">Booking Summary</h3>
            </div>
            <Crown className="w-5 h-5 text-gold-400" />
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between">
              <span className="text-cathedral-muted">Event Type:</span>
              <span className="font-semibold text-cathedral-ivory text-right max-w-[150px]">{selectedEventType}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-cathedral-muted">Date:</span>
              <span className="font-mono font-semibold text-cathedral-ivory">{new Date(customerInfo.eventDate).toLocaleDateString()}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-cathedral-muted">Guest Count:</span>
              <span className="font-mono text-gold-300 font-semibold">{guestCount} Guests</span>
            </div>

            <div className="flex justify-between">
              <span className="text-cathedral-muted">Venue:</span>
              <span className="font-semibold text-cathedral-ivory">{flagshipHall.name}</span>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-cathedral-border">
              <span className="text-cathedral-muted">Selected Pricing:</span>
              <span className="font-semibold">
                {usePromoPrice ? (
                  <span className="inline-flex items-center gap-1.5 text-red-400">
                    <Flame className="w-3 h-3" />
                    October Promo
                  </span>
                ) : (
                  <span className="text-cathedral-ivory">Standard Rate</span>
                )}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-cathedral-muted">Included Package:</span>
              <span className="font-semibold text-cathedral-ivory text-right max-w-[150px]">{packages[0]?.name}</span>
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="bg-cathedral-bg/80 border border-cathedral-border rounded-2xl p-4 space-y-2 text-xs">
            <div className="flex justify-between text-cathedral-muted">
              <span>Venue Rental{usePromoPrice ? ' (Promo)' : ''}:</span>
              <span>{formatCurrency(calculation?.hall?.cost)}</span>
            </div>
            <div className="flex justify-between text-cathedral-muted">
              <span>Production Package:</span>
              <span className="text-emerald-400 font-semibold">Included</span>
            </div>
            
            <div className="pt-3 border-t border-cathedral-border flex justify-between font-serif font-bold text-base text-cathedral-ivory">
              <span>Total Estimation:</span>
              <span className="text-gold-gradient">{formatCurrency(calculation?.totalAmount)}</span>
            </div>
          </div>

          {/* 50% Deposit Calculation Box — PROMINENT */}
          <div className="bg-gradient-to-r from-gold-900/20 to-cathedral-elevated border-2 border-gold-400/40 rounded-2xl p-5 space-y-3 animate-deposit-pulse">
            <div className="flex justify-between items-center">
              <span className="font-bold text-gold-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-gold-400" />
                Required Deposit (50%):
              </span>
              <span className="font-serif font-bold text-xl text-gold-400">{formatCurrency(calculation?.depositAmount)}</span>
            </div>
            <div className="flex justify-between text-[11px] text-cathedral-muted">
              <span>Remaining Balance:</span>
              <span>{formatCurrency(calculation?.balanceAmount)}</span>
            </div>
          </div>

          {/* Promo badge in sidebar */}
          {usePromoPrice && (
            <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-3 text-center animate-promo-pulse">
              <div className="text-[10px] uppercase tracking-widest text-red-400 font-bold flex items-center justify-center gap-1">
                <Flame className="w-3 h-3" />
                Promo Active — Save {formatCurrency(HALL_STANDARD_PRICE - HALL_PROMO_PRICE)}
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
