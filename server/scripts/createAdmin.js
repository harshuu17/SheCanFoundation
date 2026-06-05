require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

const ADMIN_DATA = {
  name: 'admin',
  email: 'admin@shecanfoundation.org',
  password: 'admin@123',
  role: 'super_admin',
  isActive: true,
};

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Delete existing admin with the same email if any
    await Admin.deleteOne({ email: ADMIN_DATA.email });
    console.log('🧹 Cleaned up old admin if existed');

    // Create the new admin
    const newAdmin = await Admin.create(ADMIN_DATA);
    console.log('🎉 Super Admin created successfully!');
    console.log('   Name:    ', newAdmin.name);
    console.log('   Email:   ', newAdmin.email);
    console.log('   Password:', ADMIN_DATA.password);
    console.log('   Role:    ', newAdmin.role);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    process.exit(1);
  }
}

run();
