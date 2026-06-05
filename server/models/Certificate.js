const mongoose = require('mongoose');
const crypto = require('crypto');

const certificateSchema = new mongoose.Schema(
  {
    member:  { type: mongoose.Schema.Types.ObjectId, ref: 'Member',  required: true },
    program: { type: mongoose.Schema.Types.ObjectId, ref: 'Program', required: true },
    enrollment: { type: mongoose.Schema.Types.ObjectId, ref: 'Enrollment' },

    // ── Certificate details ───────────────────────────────────
    certificateNumber: {
      type: String,
      unique: true,
    },
    memberName:    { type: String, required: true },
    programTitle:  { type: String, required: true },

    issuedAt:   { type: Date, default: Date.now },
    expiresAt:  { type: Date }, // null = no expiry

    // ── Verification ──────────────────────────────────────────
    verificationCode: { type: String },
    isValid: { type: Boolean, default: true },

    // ── File ──────────────────────────────────────────────────
    fileUrl: { type: String }, // PDF URL (S3 or local)
  },
  { timestamps: true }
);

// Auto-generate certificate number and verification code
certificateSchema.pre('save', function (next) {
  if (!this.certificateNumber) {
    const year = new Date().getFullYear();
    const rand = crypto.randomBytes(4).toString('hex').toUpperCase();
    this.certificateNumber = `SCF-${year}-${rand}`;
  }
  if (!this.verificationCode) {
    this.verificationCode = crypto.randomBytes(8).toString('hex').toUpperCase();
  }
  next();
});

certificateSchema.index({ member: 1 });
certificateSchema.index({ certificateNumber: 1 });
certificateSchema.index({ verificationCode: 1 });

module.exports = mongoose.model('Certificate', certificateSchema);
