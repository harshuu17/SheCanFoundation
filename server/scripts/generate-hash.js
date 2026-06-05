#!/usr/bin/env node
/**
 * She Can Foundation — Admin Setup Script
 * 
 * Run this once to generate a bcrypt password hash for your admin account.
 * Usage: node scripts/generate-hash.js <your-password>
 * 
 * Then paste the output into your .env file as ADMIN_PASSWORD_HASH=<hash>
 */

const bcrypt = require('bcryptjs');

const password = process.argv[2];

if (!password) {
  console.error('\n❌  Please provide a password as an argument.');
  console.error('   Usage: node scripts/generate-hash.js yourPassword\n');
  process.exit(1);
}

if (password.length < 8) {
  console.error('\n❌  Password must be at least 8 characters.\n');
  process.exit(1);
}

(async () => {
  console.log('\n🔐 Generating bcrypt hash (salt rounds: 12)...');
  const hash = await bcrypt.hash(password, 12);
  console.log('\n✅  Success! Add this to your server/.env file:\n');
  console.log(`ADMIN_PASSWORD_HASH=${hash}\n`);
})();
