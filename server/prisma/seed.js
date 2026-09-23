const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding SUCRE Events Centre database...');

  // Clear existing data
  await prisma.payment.deleteMany();
  await prisma.bookingAddon.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.addon.deleteMany();
  await prisma.package.deleteMany();
  await prisma.hall.deleteMany();
  await prisma.admin.deleteMany();

  // Seed Admin
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.admin.create({
    data: {
      username: 'admin',
      email: 'admin@sucreevents.ng',
      password: hashedPassword,
      name: 'Cathedral Administrator',
      role: 'SUPER_ADMIN',
    },
  });
  console.log('Admin account created: admin / admin123');

  // Seed Halls (Grades 1 to 5)
  const halls = [
    {
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
    },
  ];

  for (const hall of halls) {
    await prisma.hall.create({ data: hall });
  }
  console.log('Seeded 5 Halls (Grades 1 to 5).');

  // Seed Packages
  const packages = [
    {
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
    },
  ];

  for (const pkg of packages) {
    await prisma.package.create({ data: pkg });
  }
  console.log('Seeded 3 Experience Packages.');

  // Seed Addons
  const addons = [
    {
      category: 'Catering & Dining',
      name: 'Gourmet 3-Course Buffet & Continental Service',
      price: 12000,
      unit: 'per guest',
      description: 'Extensive culinary spread by top master chefs featuring traditional Nigerian dishes, intercontinental cuisines, and dessert stations.'
    },
    {
      category: 'Decoration & Lighting',
      name: 'Signature Floral Ceiling Canopy & Ambient Intelligent Lighting',
      price: 450000,
      unit: 'per event',
      description: 'Bespoke ceiling draping, imported fresh floral archways, computerized beam lights, and custom monogram projections.'
    },
    {
      category: 'Audio & Entertainment',
      name: 'Executive Live DJ & Line-Array Sound System',
      price: 250000,
      unit: 'per event',
      description: 'Concert-grade sound system tuned by audio engineers with experienced event DJ and MC support.'
    },
    {
      category: 'Security & Safety',
      name: 'Executive Armed Security & Bouncers (10 Officers)',
      price: 180000,
      unit: 'per event',
      description: 'Professional uniformed security personnel, access gate control, metal detectors, and motorcade parking guides.'
    },
    {
      category: 'Media & Production',
      name: '4K Cinema Videography & Aerial Drone Coverage',
      price: 350000,
      unit: 'per event',
      description: 'Full-day cinematic coverage by 3 camera operators, live video mixing, highlights reel, and raw footage delivery.'
    },
    {
      category: 'VIP Experience',
      name: 'Presidential VIP Lounge & Champagne Bar',
      price: 150000,
      unit: 'per event',
      description: 'Private air-conditioned retreat room with butler service, imported champagne, and private restroom facility.'
    },
    {
      category: 'Power & Utility',
      name: 'Synchronized Heavy Generator & Backup AC Unit',
      price: 200000,
      unit: 'per event',
      description: 'Zero-downtime diesel power redundancy ensuring seamless AC and lighting operations throughout your event.'
    }
  ];

  for (const addon of addons) {
    await prisma.addon.create({ data: addon });
  }
  console.log('Seeded 7 Add-ons.');

  // Seed sample initial bookings
  const cathedralHall = await prisma.hall.findFirst({ where: { grade: 5 } });
  const silverPkg = await prisma.package.findFirst({ where: { tier: 'Silver' } });

  if (cathedralHall && silverPkg) {
    const booking = await prisma.booking.create({
      data: {
        reference: 'SUCRE-2026-9812',
        customerName: 'Chief & Mrs. Adebayo Adeleke',
        customerEmail: 'adebayo.adeleke@example.com',
        customerPhone: '08031234567',
        eventType: 'Royal Wedding Ceremony & Reception',
        guestCount: 1000,
        eventDate: new Date('2026-11-28'),
        hallId: cathedralHall.id,
        packageId: silverPkg.id,
        totalAmount: 4350000,
        depositAmount: 2175000,
        balanceAmount: 2175000,
        status: 'DEPOSIT_PAID',
        paystackRef: 'PST_TEST_REF_881920',
        notes: 'Requested gold table accents and extra security guards.',
      }
    });

    await prisma.payment.create({
      data: {
        reference: 'PAY-881920-SUCRE',
        bookingId: booking.id,
        amount: 2175000,
        gateway: 'PAYSTACK',
        status: 'SUCCESS',
        channel: 'card',
        paystackRef: 'PST_TEST_REF_881920'
      }
    });
  }

  console.log('Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
