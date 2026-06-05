#!/usr/bin/env node
/**
 * She Can Foundation — Database Seeder
 * 
 * Seeds the database with sample contact submissions for testing.
 * Usage: node scripts/seed.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const ContactSubmission = require('../models/ContactSubmission');

const sampleData = [
  {
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '+91-9876543210',
    subject: 'Inquiry about Digital Literacy Workshop',
    message: 'Hello, I am interested in joining your digital literacy program. Could you please share the schedule and any prerequisites required? I am a homemaker looking to re-enter the workforce.',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    name: 'Aisha Johnson',
    email: 'aisha.j@example.com',
    phone: '+1-555-0101',
    subject: 'Partnership Opportunity',
    message: 'Our organization runs a community center in downtown and would love to collaborate with She Can Foundation on a joint skill-building program for women aged 25-40.',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    name: 'Fatima Al-Hassan',
    email: 'fatima.alhassan@example.com',
    phone: '',
    subject: 'Volunteering',
    message: 'I am a software engineer with 8 years of experience and I would like to volunteer as a mentor for your tech training program. Please let me know how I can contribute.',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    name: 'Maria Garcia',
    email: 'maria.garcia@example.com',
    phone: '+1-555-0202',
    subject: 'Donation and Sponsorship',
    message: 'Our company would like to sponsor one of your upcoming workshops. We have a budget allocated for CSR activities focused on women empowerment. Please send us a sponsorship proposal.',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    name: 'Sunita Patel',
    email: 'sunita.p@example.com',
    phone: '+91-8765432109',
    subject: 'Success Story — Thank You!',
    message: 'I completed your 3-month coding bootcamp last year and just got hired as a junior developer! I wanted to thank the entire She Can team for believing in me when I did not believe in myself.',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
  {
    name: 'Lily Chen',
    email: 'lily.chen@example.com',
    phone: '+1-555-0303',
    subject: 'Request for Information',
    message: 'I am a journalist writing a feature article on women-led NGOs in the technology education space. Would anyone from She Can Foundation be available for a short interview?',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
  },
  // Today's submission
  {
    name: 'Neha Verma',
    email: 'neha.verma@example.com',
    phone: '+91-9988776655',
    subject: 'Career Counselling Session',
    message: 'I am a recent graduate struggling to find my first job. I heard about your mentorship program through a friend. Could you guide me on how to apply?',
    createdAt: new Date(),
  },
];

(async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI not set in .env file');
    }

    console.log('\n🌱 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected!\n');

    const existing = await ContactSubmission.countDocuments();
    if (existing > 0) {
      console.log(`ℹ️  Database already has ${existing} submissions. Skipping seed to avoid duplicates.`);
      console.log('   To force reseed, run: node scripts/seed.js --force\n');
      if (!process.argv.includes('--force')) {
        await mongoose.disconnect();
        return;
      }
      await ContactSubmission.deleteMany({});
      console.log('🗑️  Cleared existing submissions.\n');
    }

    const result = await ContactSubmission.insertMany(sampleData);
    console.log(`✅ Seeded ${result.length} sample submissions successfully!\n`);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('👋 Disconnected from MongoDB.\n');
  }
})();
