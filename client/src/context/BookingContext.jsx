import React, { createContext, useContext, useState, useEffect } from 'react';
import { calculateBooking, createBooking, initializePayment, verifyPayment } from '../services/api';

// ─── Static catalog data (embedded so the site works on Netlify without a backend) ───
const STATIC_HALLS = [
  {
    id: 'hall-grade-1',
    grade: 1,
    name: 'Intimate Sanctuary',
    subtitle: 'Bespoke elegance for micro-weddings and private VIP dinners',
    capacityMin: 100,
    capacityMax: 250,
    basePrice: 650000,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
    description: 'An enchanting, climate-controlled space with crystal chandeliers, private foyer, and ambient mood lighting designed for executive meetings, intimate receptions, and private celebrations.',
    features: JSON.stringify([
      'Capacity: Up to 250 guests',
      'Fully Air-Conditioned with 100% Power Backup',
      'Private VIP Prep Suite',
      'Dedicated Restrooms',
      'Acoustic Soundproofing'
    ])
  },
  {
    id: 'hall-grade-2',
    grade: 2,
    name: 'Classic Pavilion',
    subtitle: 'Chic architectural setup with adaptable lighting & modern acoustics',
    capacityMin: 250,
    capacityMax: 450,
    basePrice: 950000,
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80',
    description: 'Versatile and sophisticated hall ideal for corporate galas, mid-scale wedding receptions, and milestone birthday banquets. Equipped with expansive elevated staging.',
    features: JSON.stringify([
      'Capacity: Up to 450 guests',
      'State-of-the-Art LED Stage Rigging',
      '2 VIP Executive Changing Rooms',
      'Dedicated Catering Serving Bay',
      'High-Speed Guest Wi-Fi'
    ])
  },
  {
    id: 'hall-grade-3',
    grade: 3,
    name: 'Grand Arch Ballroom',
    subtitle: 'Opulent hall showcasing high-vaulted ceilings & panoramic LED walls',
    capacityMin: 450,
    capacityMax: 700,
    basePrice: 1400000,
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
    description: 'Designed to impress. Features signature cathedral vault arches, massive 4K LED video screens, and a sprawling dance floor created for royal banquets and high-profile events.',
    features: JSON.stringify([
      'Capacity: Up to 700 guests',
      'High-Vaulted Architectural Ceilings',
      'Integrated 4K Ultra-HD LED Wall',
      'Green Room & Media Control Booth',
      'Ample Covered Parking for 300+ Vehicles'
    ])
  },
  {
    id: 'hall-grade-4',
    grade: 4,
    name: 'Prestige Royal Suite',
    subtitle: 'High-capacity luxury domain for majestic galas and royal weddings',
    capacityMin: 700,
    capacityMax: 900,
    basePrice: 1950000,
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80',
    description: 'A grand architectural marvel featuring double-tier balcony seating, custom gold-leaf trimming, and comprehensive event production infrastructure.',
    features: JSON.stringify([
      'Capacity: Up to 900 guests',
      'Double-Tier Mezzanine Viewing Gallery',
      'Executive Red-Carpet Entrance Foyer',
      'Dual Catering Preparation Wings',
      '24/7 Armed Security Escort Patrols'
    ])
  },
  {
    id: 'hall-grade-5',
    grade: 5,
    name: 'The Cathedral Master Grandeur',
    subtitle: 'The flagship crown jewel of Ibadan — Unlimited luxury & 1,500+ capacity',
    capacityMin: 900,
    capacityMax: 1500,
    basePrice: 2600000,
    image: 'https://images.unsplash.com/photo-1543968996-ee822b8176ba?auto=format&fit=crop&w=1200&q=80',
    description: 'The ultimate pinnacle of event space in Oyo State. Combines breathtaking cathedral archways, massive dual LED walls, hydraulic stage lifts, and VIP presidential suites.',
    features: JSON.stringify([
      'Capacity: 900 to 1,500+ guests',
      'Exclusive Full-Venue Access',
      'Presidential VIP Holding Lounge',
      'Dual 500kVA Synchronized Heavy-Duty Generators',
      'Helipad Access & Executive Motorcade Protocol'
    ])
  }
];

const STATIC_PACKAGES = [
  {
    id: 'pkg-classic',
    tier: 'Classic',
    name: 'Classic Cathedral Package',
    price: 1250000,
    badge: 'Standard Luxury',
    description: 'Essential luxury setup including venue rental, standard banqueting chairs, tables, sound system, and basic lighting.',
    features: JSON.stringify([
      'Full Hall Access for 10 hours',
      'Standard Banquet Tables & Gold Chiavari Chairs',
      'Base Sound System & Wireless Mics',
      'Standard Ambient Lighting',
      'Standard Security & Parking Management'
    ])
  },
  {
    id: 'pkg-silver',
    tier: 'Silver',
    name: 'Silver Cathedral Experience',
    price: 1750000,
    badge: 'Most Popular',
    description: 'Our signature event experience package combining venue rental, LED screen displays, enhanced decor lighting, DJ service, and security.',
    features: JSON.stringify([
      'Full Hall Access for 14 hours',
      'Premium Chiavari / Luxury Dior Seating',
      'Integrated 4K LED Screen Backdrop Display',
      'Professional Event DJ & Intelligent Moving-Head Lights',
      'Dedicated VIP Suite with Complimentary Refreshments',
      'Armed Security & Traffic Management Team'
    ])
  },
  {
    id: 'pkg-gold',
    tier: 'Gold',
    name: 'Gold Royal Cathedral Sovereign',
    price: 2800000,
    badge: 'All-Inclusive Royalty',
    description: 'The ultimate royal experience. Complete full-day venue reservation, 360-degree event production, red carpet setup, photography, and VIP concierge.',
    features: JSON.stringify([
      'Exclusive 24-Hour Venue Access',
      'Custom Floral Decor & Gold Crystal Table Settings',
      'Dual 4K LED Screen Displays & Live Broadcast Feed',
      'Full Executive Security Protocol & VIP Escorts',
      'Presidential VIP Bridal Lounge with Private Chef Service',
      '4K Drone Photography & Videography Package Included',
      'Complimentary 50-Guest Welcome Cocktail Bar'
    ])
  }
];

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
function localCalculate({ hall, pkg, addonIds, guestCount }) {
  const addonItems = STATIC_ADDONS.filter(a => addonIds.includes(a.id));
  const addonsTotal = addonItems.reduce((sum, a) => {
    return sum + (a.unit === 'per guest' ? a.price * guestCount : a.price);
  }, 0);
  const subtotal = (hall?.basePrice || 0) + (pkg?.price || 0) + addonsTotal;
  const deposit = Math.ceil(subtotal * 0.5);
  const balance = subtotal - deposit;
  return {
    subtotal,
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

  // Catalog — start with static data immediately (no loading delay)
  const [halls] = useState(STATIC_HALLS);
  const [packages] = useState(STATIC_PACKAGES);
  const [addons] = useState(STATIC_ADDONS);
  const [loadingInitial] = useState(false);

  // Wizard state
  const [selectedEventType, setSelectedEventType] = useState('Wedding Reception');
  const [guestCount, setGuestCount] = useState(500);
  const [selectedHall, setSelectedHall] = useState(
    STATIC_HALLS.find(h => h.grade === 5) || STATIC_HALLS[0]
  );
  const [selectedPackage, setSelectedPackage] = useState(
    STATIC_PACKAGES.find(p => p.tier === 'Silver') || STATIC_PACKAGES[0]
  );
  const [selectedAddonIds, setSelectedAddonIds] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: '',
  });

  // Calculation
  const [calculation, setCalculation] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Recalculate whenever selections change — try backend, fall back to local
  useEffect(() => {
    async function recalculate() {
      if (!selectedHall || !selectedPackage) return;
      setIsCalculating(true);
      try {
        const res = await calculateBooking({
          hallId: selectedHall.id,
          packageId: selectedPackage.id,
          addonIds: selectedAddonIds,
          guestCount,
        });
        setCalculation(res.data.data);
      } catch {
        // Backend not available (e.g. static hosting) — use local calculation
        setCalculation(
          localCalculate({
            hall: selectedHall,
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
  }, [selectedHall, selectedPackage, selectedAddonIds, guestCount]);

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
      halls,
      packages,
      addons,
      loadingInitial,
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
