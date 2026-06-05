require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const ContactSubmission = require('../models/ContactSubmission');

async function checkSubmissions() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const count = await ContactSubmission.countDocuments();
    console.log(`📊 Total contact submissions: ${count}`);

    const latest = await ContactSubmission.find().sort({ createdAt: -1 }).limit(5).lean();
    console.log('📋 Latest 5 submissions:');
    latest.forEach((sub, i) => {
      console.log(`--- [${i + 1}] ---`);
      console.log(`Name:    ${sub.name}`);
      console.log(`Email:   ${sub.email}`);
      console.log(`Phone:   ${sub.phone || 'N/A'}`);
      console.log(`Subject: ${sub.subject}`);
      console.log(`Message: ${sub.message}`);
      console.log(`Date:    ${sub.createdAt}`);
    });

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error checking submissions:', error);
    process.exit(1);
  }
}

checkSubmissions();
