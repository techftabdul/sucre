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

// ─── Add-ons ──────────────────────────────────────────────────────────────────
const STATIC_ADDONS = [
  {
    id: 'addon-1',
    category: 'Catering & Dining',
    name: 'Gourmet 3-Course Buffet & Continental Service',
    price: 12000,
    unit: 'per guest',
    description: 'Extensive culinary spread by top master chefs featuring traditional Nigerian dishes, intercontinental cuisines, and dessert stations.'
  },
  {
    id: 'addon-2',
    category: 'Decoration & Lighting',
    name: 'Signature Floral Ceiling Canopy & Ambient Intelligent Lighting',
    price: 450000,
    unit: 'per event',
    description: 'Bespoke ceiling draping, imported fresh floral archways, computerized beam lights, and custom monogram projections.'
  },
  {
    id: 'addon-3',
    category: 'Audio & Entertainment',
    name: 'Executive Live DJ & Line-Array Sound System',
    price: 250000,
    unit: 'per event',
    description: 'Concert-grade sound system tuned by audio engineers with experienced event DJ and MC support.'
  },
  {
    id: 'addon-4',
    category: 'Security & Safety',
    name: 'Executive Armed Security & Bouncers (10 Officers)',
    price: 180000,
    unit: 'per event',
    description: 'Professional uniformed security personnel, access gate control, metal detectors, and motorcade parking guides.'
  },
  {
    id: 'addon-5',
    category: 'Media & Production',
    name: '4K Cinema Videography & Aerial Drone Coverage',
    price: 350000,
    unit: 'per event',
    description: 'Full-day cinematic coverage by 3 camera operators, live video mixing, highlights reel, and raw footage delivery.'
  },
  {
    id: 'addon-6',
    category: 'VIP Experience',
    name: 'Presidential VIP Lounge & Champagne Bar',
    price: 150000,
    unit: 'per event',
    description: 'Private air-conditioned retreat room with butler service, imported champagne, and private restroom facility.'
  },
  {
    id: 'addon-7',
    category: 'Power & Utility',
    name: 'Synchronized Heavy Generator & Backup AC Unit',
    price: 200000,
    unit: 'per event',
    description: 'Zero-downtime diesel power redundancy ensuring seamless AC and lighting operations throughout your event.'
  }
];

// ─── Local calculation (used when backend is unreachable) ─────────────────────
function localCalculate({ hallPrice, pkg, addonIds, guestCount }) {
  const addonItems = STATIC_ADDONS.filter(a => addonIds.includes(a.id));
  const addonsTotal = addonItems.reduce((sum, a) => {
    return sum + (a.unit === 'per guest' ? a.price * guestCount : a.price);
  }, 0);
  const subtotal = (hallPrice || 0) + (pkg?.price || 0) + addonsTotal;
  const deposit = Math.ceil(subtotal * 0.5);
  const balance = subtotal - deposit;
  return {
    hall: { cost: hallPrice || 0 },
    package: { cost: pkg?.price || 0 },
    addonsTotal,
    subtotal,
    totalAmount: subtotal,
    depositAmount: deposit,
    balanceAmount: balance,
    addonsBreakdown: addonItems.map(a => ({
      name: a.name,
      amount: a.unit === 'per guest' ? a.price * guestCount : a.price
    }))
  };
}

// ─── Context ──────────────────────────────────────────────────────────────────
const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [currentStep, setCurrentStep] = useState(1);

  // Catalog — single hall, packages, addons
  const [packages] = useState(STATIC_PACKAGES);
  const [addons] = useState(STATIC_ADDONS);
  const [loadingInitial] = useState(false);

  // Promo pricing toggle — defaults to promo active
  const [usePromoPrice, setUsePromoPrice] = useState(true);

  // Wizard state
  const [selectedEventType, setSelectedEventType] = useState('Wedding Reception');
  const [guestCount, setGuestCount] = useState(500);
  const [selectedPackage, setSelectedPackage] = useState(STATIC_PACKAGES[0]);
  const [selectedAddonIds, setSelectedAddonIds] = useState([]);
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
          addonIds: selectedAddonIds,
          guestCount,
        });
        setCalculation(res.data.data);
      } catch {
        // Backend not available — use local calculation
        setCalculation(
          localCalculate({
            hallPrice: activeHallPrice,
            pkg: selectedPackage,
            addonIds: selectedAddonIds,
            guestCount,
          })
        );
      } finally {
        setIsCalculating(false);
      }
    }
    recalculate();
  }, [activeHallPrice, selectedPackage, selectedAddonIds, guestCount]);

  const toggleAddon = (addonId) => {
    setSelectedAddonIds(prev =>
      prev.includes(addonId) ? prev.filter(id => id !== addonId) : [...prev, addonId]
    );
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5));
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
      // Packages & addons
      packages,
      addons,
      loadingInitial,
      // Wizard state
      selectedEventType,
      setSelectedEventType,
      guestCount,
      setGuestCount,
      selectedPackage,
      setSelectedPackage,
      selectedAddonIds,
      toggleAddon,
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
