const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const memberSchema = new mongoose.Schema(
  {
    // ── Identity ──────────────────────────────────────────────
    mobile: {
      type: String,
      required: [true, 'Mobile number is required'],
      unique: true,
      trim: true,
      match: [/^[6-9]\d{9}$/, 'Please provide a valid 10-digit Indian mobile number'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // never returned in queries by default
    },

    // ── Profile ───────────────────────────────────────────────
    name: {
      type: String,
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
      sparse: true,
    },
    dateOfBirth: { type: Date },
    gender: {
      type: String,
      enum: ['female', 'male', 'other', 'prefer_not_to_say'],
      default: 'prefer_not_to_say',
    },
    profilePhoto: { type: String }, // URL

    // ── Address ───────────────────────────────────────────────
    address: {
      street:  { type: String, trim: true },
      city:    { type: String, trim: true },
      state:   { type: String, trim: true },
      pincode: { type: String, trim: true, match: [/^\d{6}$/, 'Invalid pincode'] },
    },

    // ── Status ────────────────────────────────────────────────
    isActive:    { type: Boolean, default: true },
    isVerified:  { type: Boolean, default: false },
    role:        { type: String, enum: ['member', 'volunteer', 'mentor'], default: 'member' },

    // ── Stats ─────────────────────────────────────────────────
    programsEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Program' }],
    certificatesEarned: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Certificate' }],
    lastLogin: { type: Date },
  },
  { timestamps: true }
);

// Hash password before saving
memberSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});

// Compare password
memberSchema.methods.comparePassword = async function (candidatePw) {
  return bcrypt.compare(candidatePw, this.password);
};

memberSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Member', memberSchema);
