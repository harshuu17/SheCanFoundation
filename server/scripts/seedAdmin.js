/**
 * Seed Super Admin
 * Run: node scripts/seedAdmin.js
 */
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Admin    = require('../models/Admin');

const SUPER_ADMIN = {
  name:     'Super Admin',
  email:    'superadmin@shecanfoundation.org',
  password: 'SheCanAdmin@2024',
  role:     'super_admin',
  isActive: true,
};

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ Connected to MongoDB Atlas');

  const existing = await Admin.findOne({ email: SUPER_ADMIN.email });
  if (existing) {
    console.log('ℹ️  Super admin already exists:', existing.email);
    console.log('   Role:', existing.role);
    console.log('   Use the credentials below to login.');
  } else {
    await Admin.create(SUPER_ADMIN);
    console.log('🎉 Super admin created successfully!');
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  SUPER ADMIN CREDENTIALS');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  Email   :', SUPER_ADMIN.email);
  console.log('  Password:', SUPER_ADMIN.password);
  console.log('  Login at: http://localhost:5173/login → Admin Login tab');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
