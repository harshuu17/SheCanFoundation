const mongoose = require('mongoose');

const programSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Program title is required'],
      trim: true,
      maxlength: [150, 'Title cannot exceed 150 characters'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    category: {
      type: String,
      enum: ['digital_literacy', 'entrepreneurship', 'financial', 'health', 'leadership', 'vocational', 'other'],
      required: true,
    },
    icon:       { type: String, default: '📚' },
    coverImage: { type: String }, // URL

    // ── Schedule ─────────────────────────────────────────────
    status: {
      type: String,
      enum: ['draft', 'active', 'upcoming', 'completed', 'archived'],
      default: 'draft',
    },
    startDate:   { type: Date },
    endDate:     { type: Date },
    totalSessions: { type: Number, default: 0 },
    durationWeeks: { type: Number, default: 0 },

    // ── Delivery ─────────────────────────────────────────────
    mode: {
      type: String,
      enum: ['online', 'offline', 'hybrid'],
      default: 'offline',
    },
    location: { type: String, trim: true },
    maxCapacity: { type: Number, default: 30 },
    currentEnrollments: { type: Number, default: 0 },

    // ── Curriculum ───────────────────────────────────────────
    modules: [
      {
        title:       { type: String, required: true },
        description: { type: String },
        order:       { type: Number },
        duration:    { type: String }, // e.g., "2 hours"
      }
    ],

    isFeatured: { type: Boolean, default: false },
    createdBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  },
  { timestamps: true }
);

// Auto-generate slug from title
programSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = this.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  }
  next();
});

programSchema.index({ status: 1 });
programSchema.index({ category: 1 });
programSchema.index({ slug: 1 });

module.exports = mongoose.model('Program', programSchema);
