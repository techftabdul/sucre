import React, { createContext, useContext, useState, useEffect } from 'react';
import { calculateBooking, createBooking, initializePayment, verifyPayment } from '../services/api';

// ─── Pricing Constants ────────────────────────────────────────────────────────
const HALL_STANDARD_PRICE = 2800000;
const HALL_PROMO_PRICE = 2200000;

// ─── Single Flagship Hall ─────────────────────────────────────────────────────
const FLAGSHIP_HALL = {
  id: 'hall-cathedral',
  name: 'The Cathedral',
  subtitle: 'Ibadan\'s Crown Jewel — Luxury Event Venue for Royal Celebrations',
  capacityMin: 800,
  capacityMax: 1000,
  standardPrice: HALL_STANDARD_PRICE,
  promoPrice: HALL_PROMO_PRICE,
  description: 'An architectural masterpiece combining breathtaking cathedral archways, massive dual LED walls, hydraulic stage lifts, VIP presidential suites, and dual synchronized generators — designed for royal wedding receptions, high-stakes corporate galas, and VIP celebrations in Ibadan, Oyo State.',
  features: [
    'Capacity: 800 to 1,000 guests',
    'Exclusive Full-Venue Access',
    'Presidential VIP Holding Lounge',
    'Dual 500kVA Synchronized Heavy-Duty Generators',
    'Fully Air-Conditioned with 100% Power Backup',
    'Integrated 4K Ultra-HD LED Wall',
    'State-of-the-Art LED Stage Rigging',
    'Green Room & Media Control Booth',
    'Ample Covered Parking for 300+ Vehicles',
    'Curated Security & Event Protocol Officers',
  ],
};

// ─── Single Flagship Package ──────────────────────────────────────────────────
const STATIC_PACKAGES = [
  {
    id: 'pkg-flagship',
    tier: 'Flagship',
    name: 'The Cathedral All-Inclusive Package',
    price: 0, // Package is included in the hall rental price
    badge: 'Included in Venue',
    description: 'The complete Cathedral experience — venue rental, full production rig, VIP lounges, security, and all standard event infrastructure included.',
    features: JSON.stringify([
      'Exclusive Full-Venue Access (Up to 14 hours)',
      'Premium Chiavari / Luxury Dior Seating for All Guests',
      'Integrated 4K Ultra-HD LED Screen Backdrop Display',
      'Professional Event DJ & Intelligent Moving-Head Lights',
      'Dedicated Presidential VIP Holding Lounge',
      'Armed Security & Traffic Management Team',
      'Dual 500kVA Synchronized Heavy-Duty Generators',
      'Fully Air-Conditioned with 100% Power Backup',
      'Ample Covered Parking for 300+ Vehicles',
      'Curated Event Protocol Officers',
    ])
  }
];

// ─── Local calculation (used when backend is unreachable) ─────────────────────
function localCalculate({ hallPrice, pkg, guestCount }) {
  const subtotal = (hallPrice || 0) + (pkg?.price || 0);
  const deposit = Math.ceil(subtotal * 0.5);
  const balance = subtotal - deposit;
  return {
    hall: { cost: hallPrice || 0 },
    package: { cost: pkg?.price || 0 },
    subtotal,
    totalAmount: subtotal,
    depositAmount: deposit,
    balanceAmount: balance,
  };
}

// ─── Context ──────────────────────────────────────────────────────────────────
const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [currentStep, setCurrentStep] = useState(1);

  // Catalog — single hall, packages
  const [packages] = useState(STATIC_PACKAGES);
  const [loadingInitial] = useState(false);

  // Promo pricing toggle — defaults to promo active
  const [usePromoPrice, setUsePromoPrice] = useState(true);

  // Wizard state
  const [selectedEventType, setSelectedEventType] = useState('Wedding Reception');
  const [guestCount, setGuestCount] = useState(500);
  const [selectedPackage, setSelectedPackage] = useState(STATIC_PACKAGES[0]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: '',
  });

  // Active hall price derived from promo toggle
  const activeHallPrice = usePromoPrice ? HALL_PROMO_PRICE : HALL_STANDARD_PRICE;

  // Calculation
  const [calculation, setCalculation] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Recalculate whenever selections change
  useEffect(() => {
    async function recalculate() {
      if (!selectedPackage) return;
      setIsCalculating(true);
      try {
        const res = await calculateBooking({
          hallId: FLAGSHIP_HALL.id,
          packageId: selectedPackage.id,
          addonIds: [], // Hardcoded to empty since we dropped addons
          guestCount,
        });
        setCalculation(res.data.data);
      } catch {
        // Backend not available — use local calculation
        setCalculation(
          localCalculate({
            hallPrice: activeHallPrice,
            pkg: selectedPackage,
            guestCount,
          })
        );
      } finally {
        setIsCalculating(false);
      }
    }
    recalculate();
  }, [activeHallPrice, selectedPackage, guestCount]);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  const goToStep = (step) => setCurrentStep(step);

  const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) return '₦0';
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <BookingContext.Provider value={{
      currentStep,
      setCurrentStep,
      nextStep,
      prevStep,
      goToStep,
      // Single hall data
      flagshipHall: FLAGSHIP_HALL,
      HALL_STANDARD_PRICE,
      HALL_PROMO_PRICE,
      activeHallPrice,
      usePromoPrice,
      setUsePromoPrice,
      // Packages
      packages,
      loadingInitial,
      // Wizard state
      selectedEventType,
      setSelectedEventType,
      guestCount,
      setGuestCount,
      selectedPackage,
      setSelectedPackage,
      customerInfo,
      setCustomerInfo,
      calculation,
      isCalculating,
      formatCurrency,
      // Expose API helpers for booking submission steps
      createBooking,
      initializePayment,
      verifyPayment,
    }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}
