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
  const hashedPassword = await bcrypt.hash('Sucre2026!', 10);
  await prisma.admin.create({
    data: {
      username: 'sucre_admin',
      email: 'admin@sucreevents.ng',
      password: hashedPassword,
      name: 'Cathedral Administrator',
      role: 'SUPER_ADMIN',
    },
  });
  console.log('Admin account created: sucre_admin / Sucre2026!');

  // Seed Flagship Hall
  const cathedralHall = await prisma.hall.create({
    data: {
      grade: 5,
      name: 'The Cathedral',
      subtitle: "Ibadan's Crown Jewel — Luxury Event Venue for Royal Celebrations",
      capacityMin: 800,
      capacityMax: 1000,
      basePrice: 2800000, // Standard price
      image: 'https://images.unsplash.com/photo-1543968996-ee822b8176ba?auto=format&fit=crop&w=1200&q=80',
      description: 'An architectural masterpiece combining breathtaking cathedral archways, massive dual LED walls, hydraulic stage lifts, VIP presidential suites, and dual synchronized generators — designed for royal wedding receptions, high-stakes corporate galas, and VIP celebrations in Ibadan, Oyo State.',
      features: JSON.stringify([
        'Capacity: 800 to 1,000 guests',
        'Exclusive Full-Venue Access',
        'Presidential VIP Holding Lounge',
        'Dual 500kVA Synchronized Heavy-Duty Generators',
        'Fully Air-Conditioned with 100% Power Backup',
        'Integrated 4K Ultra-HD LED Wall',
        'State-of-the-Art LED Stage Rigging',
        'Green Room & Media Control Booth',
        'Ample Covered Parking for 300+ Vehicles',
        'Curated Security & Event Protocol Officers'
      ])
    }
  });
  console.log('Seeded Flagship Hall (The Cathedral).');

  // Seed Flagship Package
  const flagshipPkg = await prisma.package.create({
    data: {
      tier: 'Flagship',
      name: 'The Cathedral All-Inclusive Package',
      price: 0, // Included in hall rental
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
        'Curated Event Protocol Officers'
      ])
    }
  });
  console.log('Seeded Flagship Experience Package.');

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

  // Note: We intentionally do NOT seed any bookings to start analytics from ZERO.

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
