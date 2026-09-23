import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { createBooking, initializePayment, verifyPayment } from '../services/api';
import confetti from 'canvas-confetti';
import { 
  Check, ChevronRight, ChevronLeft, Calendar as CalendarIcon, Users, Crown, 
  Sparkles, ShieldCheck, CreditCard, Lock, PartyPopper, AlertCircle, CheckCircle2 
} from 'lucide-react';

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const {
    currentStep,
    nextStep,
    prevStep,
    goToStep,
    halls,
    packages,
    addons,
    selectedEventType,
    setSelectedEventType,
    guestCount,
    setGuestCount,
    selectedHall,
    setSelectedHall,
    selectedPackage,
    setSelectedPackage,
    selectedAddonIds,
    toggleAddon,
    customerInfo,
    setCustomerInfo,
    calculation,
    isCalculating,
    formatCurrency
  } = useBooking();

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [verifiedBooking, setVerifiedBooking] = useState(null);

  // Check URL params for returned Paystack payment status
  useEffect(() => {
    const refParam = searchParams.get('reference');
    const statusParam = searchParams.get('status');

    if (refParam && statusParam === 'success') {
      verifyPayment({ bookingReference: refParam })
        .then(res => {
          if (res.data.success) {
            setVerifiedBooking(res.data.data.booking);
            confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
          }
        })
        .catch(err => console.error('Verification error:', err));
    }
  }, [searchParams]);

  const eventTypes = [
    { name: 'Wedding Ceremony & Reception', icon: '💍', description: 'Royal wedding banquets & bridal showcases' },
    { name: 'Corporate Gala & Executive Summit', icon: '🏛️', description: 'High-level business symposiums & awards' },
    { name: 'Milestone Birthday Banquet', icon: '🎉', description: 'Opulent anniversary & birthday celebrations' },
    { name: 'Concert, Show & Live Broadcast', icon: '🎵', description: 'Stage productions & entertainment shows' },
    { name: 'Exhibition & Trade Expo', icon: '🎨', description: 'Spacious floor layouts & product launches' },
  ];

  const handleCheckout = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.eventDate) {
      setErrorMessage('Please fill in all contact and event date fields.');
      return;
    }

    try {
      setSubmitting(true);
      // 1. Create booking record on server
      const bookingRes = await createBooking({
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phone,
        eventType: selectedEventType,
        guestCount,
        eventDate: customerInfo.eventDate,
        hallId: selectedHall.id,
        packageId: selectedPackage.id,
        addonIds: selectedAddonIds,
        notes: customerInfo.notes,
      });

      const newBooking = bookingRes.data.data;

      // 2. Initialize Paystack checkout
      const payRes = await initializePayment({
        bookingId: newBooking.id,
        email: customerInfo.email,
        amount: newBooking.depositAmount,
      });

      if (payRes.data.data && payRes.data.data.authorization_url) {
        // Redirect to Paystack secure inline checkout page
        window.location.href = payRes.data.data.authorization_url;
      } else {
        // Direct verification fallback
        const verifyRes = await verifyPayment({ bookingReference: newBooking.reference });
        setVerifiedBooking(verifyRes.data.data.booking);
        confetti({ particleCount: 150, spread: 100 });
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setErrorMessage(err.response?.data?.error || 'Checkout process failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // SUCCESS CONFIRMATION VIEW
  if (verifiedBooking) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full bg-cathedral-card border border-gold-400 rounded-3xl p-8 md:p-12 text-center space-y-6 shadow-gold-glow relative overflow-hidden">
          <div className="w-20 h-20 rounded-full bg-gold-400/20 text-gold-400 mx-auto flex items-center justify-center border border-gold-400/50">
            <PartyPopper className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-emerald-400">
              50% Deposit Payment Verified
            </span>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-cathedral-ivory">
              Your Date is Secured!
            </h1>
            <p className="text-xs text-cathedral-muted">
              Booking Reference: <span className="font-mono text-gold-300 font-bold">{verifiedBooking.reference}</span>
            </p>
          </div>

          <div className="bg-cathedral-bg/80 border border-cathedral-border rounded-2xl p-6 text-left text-xs space-y-3">
            <div className="flex justify-between border-b border-cathedral-border pb-2">
              <span className="text-cathedral-muted">Client Name:</span>
              <span className="font-semibold text-cathedral-ivory">{verifiedBooking.customerName}</span>
            </div>
            <div className="flex justify-between border-b border-cathedral-border pb-2">
              <span className="text-cathedral-muted">Event Date:</span>
              <span className="font-semibold text-gold-300">{new Date(verifiedBooking.eventDate).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between border-b border-cathedral-border pb-2">
              <span className="text-cathedral-muted">Reserved Hall:</span>
              <span className="font-semibold text-cathedral-ivory">{verifiedBooking.hall?.name}</span>
            </div>
            <div className="flex justify-between border-b border-cathedral-border pb-2">
              <span className="text-cathedral-muted">Deposit Paid (50%):</span>
              <span className="font-bold text-emerald-400">{formatCurrency(verifiedBooking.depositAmount)}</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-cathedral-muted">Remaining Balance (Due 14 Days Prior):</span>
              <span className="font-bold text-gold-gradient">{formatCurrency(verifiedBooking.balanceAmount)}</span>
            </div>
          </div>

          <div className="text-xs text-cathedral-muted">
            Our Chief Event Concierge will contact you within 24 hours at <span className="text-gold-300">{verifiedBooking.customerPhone}</span> to finalize layout setup.
          </div>

          <button
            onClick={() => window.location.href = '/'}
            className="px-8 py-3.5 rounded-full bg-gold-gradient text-cathedral-bg font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all"
          >
            Return to Home Overview
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cathedral-bg text-cathedral-ivory py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Title */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 text-xs uppercase tracking-widest font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          Interactive 5-Step Reservation Wizard
        </div>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-cathedral-ivory">
          Reserve Your Date at The Cathedral
        </h1>
      </div>

      {/* STEP PROGRESS BAR */}
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-cathedral-border -translate-y-1/2 z-0" />
          
          {[
            { step: 1, label: 'Event Type' },
            { step: 2, label: 'Guests' },
            { step: 3, label: 'Hall & Tier' },
            { step: 4, label: 'Add-ons' },
            { step: 5, label: 'Checkout' },
          ].map((s) => {
            const isCompleted = currentStep > s.step;
            const isCurrent = currentStep === s.step;
            return (
              <div key={s.step} className="relative z-10 flex flex-col items-center">
                <button
                  onClick={() => s.step < currentStep && goToStep(s.step)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                    isCompleted
                      ? 'bg-gold-400 text-cathedral-bg'
                      : isCurrent
                      ? 'bg-cathedral-card border-2 border-gold-400 text-gold-400 shadow-gold-glow'
                      : 'bg-cathedral-elevated text-cathedral-muted border border-cathedral-border'
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5 stroke-[3]" /> : s.step}
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
          
          {/* STEP 1: EVENT TYPE */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-serif font-bold text-cathedral-ivory">
                  Step 1: What type of event are you hosting?
                </h2>
                <p className="text-xs text-cathedral-muted mt-1">
                  Select your event category so we can tailor layout seating and acoustic setup.
                </p>
              </div>

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
            </div>
          )}

          {/* STEP 2: GUEST COUNT */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-serif font-bold text-cathedral-ivory">
                  Step 2: How many guests are expected?
                </h2>
                <p className="text-xs text-cathedral-muted mt-1">
                  Adjust the slider or pick a range to filter appropriate hall capacities.
                </p>
              </div>

              <div className="bg-cathedral-elevated p-8 rounded-2xl border border-cathedral-border space-y-6 text-center">
                <div className="text-4xl md:text-5xl font-serif font-bold text-gold-gradient">
                  {guestCount} Guests
                </div>

                <input
                  type="range"
                  min="100"
                  max="1500"
                  step="50"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full h-2 bg-cathedral-border rounded-lg appearance-none cursor-pointer accent-gold-400"
                />

                <div className="flex justify-between text-xs text-cathedral-muted font-mono">
                  <span>100 (Intimate)</span>
                  <span>750 (Prestige)</span>
                  <span>1,500+ (Cathedral)</span>
                </div>
              </div>

              {/* Quick Guest Count Presets */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[250, 500, 800, 1200].map((preset) => (
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

          {/* STEP 3: HALL & PACKAGE SELECTION */}
          {currentStep === 3 && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-serif font-bold text-cathedral-ivory">
                  Step 3: Select Hall Grade & Experience Tier
                </h2>
                <p className="text-xs text-cathedral-muted mt-1">
                  Pick your preferred hall grade and luxury production package.
                </p>
              </div>

              {/* Hall Selector */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-gold-400 block">
                  Select Venue Hall Grade:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {halls.map((h) => {
                    const isSelected = selectedHall?.id === h.id;
                    return (
                      <div
                        key={h.id}
                        onClick={() => setSelectedHall(h)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-gold-400 bg-gold-400/10'
                            : 'border-cathedral-border bg-cathedral-elevated hover:border-gold-500/30'
                        }`}
                      >
                        <div>
                          <div className="text-xs uppercase font-bold text-gold-400">Grade {h.grade}</div>
                          <div className="font-serif font-bold text-sm text-cathedral-ivory">{h.name}</div>
                          <div className="text-[10px] text-cathedral-muted">{h.capacityMin}-{h.capacityMax} Guests</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-serif font-bold text-gold-gradient">{formatCurrency(h.basePrice)}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Experience Tier Selector */}
              <div className="space-y-3 pt-4 border-t border-cathedral-border">
                <label className="text-xs font-bold uppercase tracking-widest text-gold-400 block">
                  Select Production Experience Tier:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {packages.map((pkg) => {
                    const isSelected = selectedPackage?.id === pkg.id;
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedPackage(pkg)}
                        className={`p-5 rounded-2xl border cursor-pointer transition-all relative flex flex-col justify-between ${
                          isSelected
                            ? 'border-gold-400 bg-gold-500/15 shadow-gold-glow'
                            : 'border-cathedral-border bg-cathedral-elevated hover:border-gold-500/30'
                        }`}
                      >
                        {pkg.badge && (
                          <span className="text-[9px] uppercase tracking-widest font-bold text-cathedral-bg bg-gold-400 px-2.5 py-0.5 rounded-full absolute -top-2.5 left-4">
                            {pkg.badge}
                          </span>
                        )}
                        <div>
                          <div className="font-serif font-bold text-base text-cathedral-ivory">{pkg.name}</div>
                          <div className="text-[11px] text-cathedral-muted mt-1">{pkg.tier} Tier</div>
                        </div>
                        <div className="mt-4 pt-3 border-t border-cathedral-border/50">
                          <div className="text-base font-serif font-bold text-gold-gradient">{formatCurrency(pkg.price)}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: DYNAMIC ADD-ONS TOGGLE */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-serif font-bold text-cathedral-ivory">
                  Step 4: Dynamic Bespoke Add-ons
                </h2>
                <p className="text-xs text-cathedral-muted mt-1">
                  Customize your event experience with gourmet catering, extra security, and media production.
                </p>
              </div>

              <div className="space-y-3">
                {addons.map((addon) => {
                  const isChecked = selectedAddonIds.includes(addon.id);
                  const calculatedCost = addon.unit === 'per guest' ? addon.price * guestCount : addon.price;

                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                        isChecked
                          ? 'border-gold-400 bg-gold-400/10'
                          : 'border-cathedral-border bg-cathedral-elevated hover:border-gold-500/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center border ${
                          isChecked ? 'bg-gold-400 border-gold-400 text-cathedral-bg' : 'border-cathedral-border bg-cathedral-bg'
                        }`}>
                          {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                        </div>
                        <div>
                          <div className="text-xs text-gold-400 uppercase tracking-widest font-semibold">{addon.category}</div>
                          <div className="font-serif font-bold text-sm text-cathedral-ivory">{addon.name}</div>
                          <div className="text-[11px] text-cathedral-muted">{addon.description}</div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-sm font-serif font-bold text-gold-gradient">
                          +{formatCurrency(calculatedCost)}
                        </div>
                        <div className="text-[10px] text-cathedral-muted font-mono">
                          {formatCurrency(addon.price)} / {addon.unit}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: CHECKOUT & CUSTOMER INFO */}
          {currentStep === 5 && (
            <form onSubmit={handleCheckout} className="space-y-6">
              <div>
                <h2 className="text-2xl font-serif font-bold text-cathedral-ivory">
                  Step 5: Client Information & Date Lock
                </h2>
                <p className="text-xs text-cathedral-muted mt-1">
                  Enter host contact details to generate your reservation code and proceed to 50% deposit checkout.
                </p>
              </div>

              {errorMessage && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold text-cathedral-ivory">Full Name / Organization *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chief Adebayo Adeleke"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-cathedral-elevated border border-cathedral-border text-cathedral-ivory focus:border-gold-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-cathedral-ivory">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="adebayo@example.com"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-cathedral-elevated border border-cathedral-border text-cathedral-ivory focus:border-gold-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-cathedral-ivory">Phone / WhatsApp Line *</label>
                  <input
                    type="tel"
                    required
                    placeholder="08031234567"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-cathedral-elevated border border-cathedral-border text-cathedral-ivory focus:border-gold-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-cathedral-ivory">Requested Event Date *</label>
                  <input
                    type="date"
                    required
                    value={customerInfo.eventDate}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, eventDate: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-cathedral-elevated border border-cathedral-border text-gold-300 font-mono focus:border-gold-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-xs">
                <label className="font-semibold text-cathedral-ivory">Special Setup Notes / Color Theme</label>
                <textarea
                  rows="3"
                  placeholder="Mention color palette, seating arrangements, or special VIP security requirements..."
                  value={customerInfo.notes}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-cathedral-elevated border border-cathedral-border text-cathedral-ivory focus:border-gold-400 focus:outline-none"
                />
              </div>

              <div className="p-4 rounded-xl bg-gold-400/10 border border-gold-400/30 text-xs text-cathedral-muted space-y-2">
                <div className="font-bold text-gold-300 flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-gold-400" />
                  Secure Paystack Payment Guarantee
                </div>
                <p>
                  You are locking in your requested date with a mandatory 50% deposit via Paystack (Debit Cards, Bank Transfer, USSD). Remaining balance is payable 14 days prior to event.
                </p>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-full bg-gold-gradient text-cathedral-bg font-bold text-sm uppercase tracking-widest hover:brightness-110 transition-all shadow-gold-glow flex items-center justify-center gap-2"
              >
                {submitting ? 'Initializing Paystack Gateway...' : `Proceed to Pay 50% Deposit (${formatCurrency(calculation?.depositAmount)})`}
              </button>
            </form>
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

            {currentStep < 5 && (
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
              <span className="font-semibold text-cathedral-ivory">{selectedEventType}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-cathedral-muted">Guest Count:</span>
              <span className="font-mono text-gold-300 font-semibold">{guestCount} Guests</span>
            </div>

            <div className="flex justify-between">
              <span className="text-cathedral-muted">Selected Hall:</span>
              <span className="font-semibold text-cathedral-ivory">{selectedHall?.name || 'Grade 5'}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-cathedral-muted">Experience Tier:</span>
              <span className="font-semibold text-cathedral-ivory">{selectedPackage?.name || 'Silver'}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-cathedral-muted">Active Add-ons:</span>
              <span className="font-semibold text-gold-400">{selectedAddonIds.length} Extras</span>
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="bg-cathedral-bg/80 border border-cathedral-border rounded-2xl p-4 space-y-2 text-xs">
            <div className="flex justify-between text-cathedral-muted">
              <span>Hall Base Rental:</span>
              <span>{formatCurrency(calculation?.hall?.cost)}</span>
            </div>
            <div className="flex justify-between text-cathedral-muted">
              <span>Production Package:</span>
              <span>{formatCurrency(calculation?.package?.cost)}</span>
            </div>
            <div className="flex justify-between text-cathedral-muted">
              <span>Selected Extras:</span>
              <span>{formatCurrency(calculation?.addonsTotal)}</span>
            </div>
            
            <div className="pt-3 border-t border-cathedral-border flex justify-between font-serif font-bold text-base text-cathedral-ivory">
              <span>Total Estimation:</span>
              <span className="text-gold-gradient">{formatCurrency(calculation?.totalAmount)}</span>
            </div>
          </div>

          {/* 50% Deposit Calculation Box */}
          <div className="bg-gradient-to-r from-gold-900/20 to-cathedral-elevated border border-gold-400/40 rounded-2xl p-4 space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="font-bold text-gold-300 uppercase tracking-wider text-[11px]">Required 50% Deposit:</span>
              <span className="font-serif font-bold text-lg text-gold-400">{formatCurrency(calculation?.depositAmount)}</span>
            </div>
            <div className="flex justify-between text-[11px] text-cathedral-muted">
              <span>Remaining Balance (Due 14 days prior):</span>
              <span>{formatCurrency(calculation?.balanceAmount)}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
