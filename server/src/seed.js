require('dotenv').config();
const { db } = require('./firebaseAdmin');
const bcrypt = require('bcryptjs');

async function main() {
  console.log('Seeding Firestore Database...');

  // 1. Seed Admin
  const adminEmail = 'info@sucrecentre.com';
  const plainPassword = 'Sucre2026!';
  const hashedPassword = await bcrypt.hash("Sucre2026!");

  const adminsRef = db.collection('admins');
  const adminsSnapshot = await adminsRef.where('email', '==', adminEmail).get();

  if (adminsSnapshot.empty) {
    await adminsRef.add({
      email: adminEmail,
      username: 'sucre_admin', // Keep for backward compatibility if needed
      password: hashedPassword,
      name: 'Super Admin',
      role: 'SUPER_ADMIN',
      createdAt: new Date().toISOString()
    });
    console.log(`Admin created: ${adminEmail}`);
  } else {
    // Update password
    for (const doc of adminsSnapshot.docs) {
      await doc.ref.update({ password: hashedPassword });
    }
    console.log(`Admin updated: ${adminEmail}`);
  }

  // 2. Seed Single Flagship Hall
  const hallsRef = db.collection('halls');
  const flagshipHallQuery = await hallsRef.where('name', '==', 'SUCRE Flagship Hall').get();
  const hallData = {
    name: 'SUCRE Flagship Hall',
    standardPrice: 2800000,
    promoPrice: 2200000,
    maxCapacity: 1000,
    createdAt: new Date().toISOString()
  };

  if (flagshipHallQuery.empty) {
    await hallsRef.add(hallData);
    console.log('Flagship Hall seeded.');
  } else {
    for (const doc of flagshipHallQuery.docs) {
      await doc.ref.update(hallData);
    }
    console.log('Flagship Hall updated.');
  }

  console.log('Seeding completed.');
  process.exit(0);
}

main().catch((error) => {
  console.error('Seeding error:', error);
  process.exit(1);
});
