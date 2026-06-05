require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Donation = require('../models/Donation');

const DEMO_DONATIONS = [
  {
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '9876543210',
    amount: 1500,
    campaign: "Her Period Shouldn't End Her Education",
    status: 'completed'
  },
  {
    name: 'Rahul Verma',
    email: 'rahul.verma@example.com',
    phone: '9812345678',
    amount: 5000,
    campaign: "Her Period Shouldn't End Her Education",
    status: 'completed'
  },
  {
    name: 'Anjali Gupta',
    email: 'anjali.gupta@example.com',
    phone: '8877665544',
    amount: 500,
    campaign: "Her Period Shouldn't End Her Education",
    status: 'completed'
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ Connected to MongoDB Atlas');

  // Insert mock donations
  await Donation.deleteMany({}); // Optional: clear existing test donations
  const created = await Donation.create(DEMO_DONATIONS);
  console.log(`🎉 Seeded ${created.length} mock donations successfully!`);

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
