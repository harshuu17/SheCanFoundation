const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contact');
const submissionRoutes = require('./routes/submissions');
const donationRoutes = require('./routes/donations');

const app = express();

// Security middleware
app.use(helmet());
app.use(morgan('combined'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { error: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

// CORS
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5000'
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    const isAllowed = allowedOrigins.includes(origin) || 
                      origin.endsWith('.vercel.app') || 
                      origin === process.env.CLIENT_URL;
                      
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Body parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/donations', donationRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  });
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

module.exports = app;
