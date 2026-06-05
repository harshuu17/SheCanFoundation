const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema(
  {
    member:  { type: mongoose.Schema.Types.ObjectId, ref: 'Member',  required: true },
    program: { type: mongoose.Schema.Types.ObjectId, ref: 'Program', required: true },

    // ── Progress ─────────────────────────────────────────────
    status: {
      type: String,
      enum: ['enrolled', 'in_progress', 'completed', 'dropped'],
      default: 'enrolled',
    },
    progressPercent: { type: Number, default: 0, min: 0, max: 100 },

    // ── Session attendance ────────────────────────────────────
    sessionsAttended: { type: Number, default: 0 },
    totalSessions:    { type: Number, default: 0 },

    // ── Module completion ─────────────────────────────────────
    completedModules: [{ type: String }], // module titles or IDs

    // ── Dates ─────────────────────────────────────────────────
    enrolledAt:   { type: Date, default: Date.now },
    completedAt:  { type: Date },
    lastActivityAt: { type: Date, default: Date.now },

    // ── Feedback ──────────────────────────────────────────────
    rating:   { type: Number, min: 1, max: 5 },
    feedback: { type: String, maxlength: [1000, 'Feedback too long'] },

    certificateIssued: { type: Boolean, default: false },
    certificate: { type: mongoose.Schema.Types.ObjectId, ref: 'Certificate' },
  },
  { timestamps: true }
);

// One enrollment per member-program pair
enrollmentSchema.index({ member: 1, program: 1 }, { unique: true });
enrollmentSchema.index({ member: 1 });
enrollmentSchema.index({ program: 1 });
enrollmentSchema.index({ status: 1 });

module.exports = mongoose.model('Enrollment', enrollmentSchema);
