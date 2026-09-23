import React, { createContext, useContext, useState, useEffect } from 'react';
import { getHalls, getPackages, getAddons, calculateBooking } from '../services/api';

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [halls, setHalls] = useState([]);
  const [packages, setPackages] = useState([]);
  const [addons, setAddons] = useState([]);
  const [loadingInitial, setLoadingInitial] = useState(true);

  // Wizard state
  const [selectedEventType, setSelectedEventType] = useState('Wedding Reception');
  const [guestCount, setGuestCount] = useState(500);
  const [selectedHall, setSelectedHall] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedAddonIds, setSelectedAddonIds] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: '',
  });

  // Calculation output from backend
  const [calculation, setCalculation] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Load halls, packages, addons on mount
  useEffect(() => {
    async function loadCatalog() {
      try {
        setLoadingInitial(true);
        const [hallsRes, packagesRes, addonsRes] = await Promise.all([
          getHalls(),
          getPackages(),
          getAddons()
        ]);

        const loadedHalls = hallsRes.data.data || [];
        const loadedPackages = packagesRes.data.data || [];
        const loadedAddons = addonsRes.data.data || [];

        setHalls(loadedHalls);
        setPackages(loadedPackages);
        setAddons(loadedAddons);

        // Auto select defaults (Grade 5 Cathedral Master Grandeur & Silver Package)
        if (loadedHalls.length > 0) {
          const defaultHall = loadedHalls.find(h => h.grade === 5) || loadedHalls[0];
          setSelectedHall(defaultHall);
        }
        if (loadedPackages.length > 0) {
          const defaultPkg = loadedPackages.find(p => p.tier === 'Silver') || loadedPackages[0];
          setSelectedPackage(defaultPkg);
        }
      } catch (err) {
        console.error('Failed to load catalog data from server:', err);
      } finally {
        setLoadingInitial(false);
      }
    }
    loadCatalog();
  }, []);

  // Recalculate whenever selections change
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
      } catch (err) {
        console.error('Calculation error:', err);
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
      formatCurrency
    }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}
