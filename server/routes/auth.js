const express = require('express');
const jwt = require('jsonwebtoken');
const Member = require('../models/Member');
const Admin = require('../models/Admin');
const router = express.Router();

const signToken = (id, role) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

// ─── Check if mobile exists ───────────────────────────────────────────────────
// POST /api/auth/member/check
router.post('/member/check', async (req, res) => {
  try {
    const { mobile } = req.body;
    if (!mobile) return res.status(400).json({ error: 'Mobile number is required.' });
    const exists = await Member.exists({ mobile });
    res.json({ exists: !!exists });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// ─── Member Register (first time only) ───────────────────────────────────────
// POST /api/auth/member/register
router.post('/member/register', async (req, res) => {
  try {
    const { mobile, password, name } = req.body;
    if (!mobile || !password) {
      return res.status(400).json({ error: 'Mobile number and password are required.' });
    }
    const existing = await Member.findOne({ mobile });
    if (existing) {
      return res.status(409).json({ error: 'This mobile number is already registered. Please sign in.' });
    }
    const member = await Member.create({ mobile, password, name });
    const token = signToken(member._id, 'member');
    res.status(201).json({
      token,
      user: { id: member._id, mobile: member.mobile, name: member.name, role: member.role },
    });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Registration failed.' });
  }
});

// ─── Member Login (strict password match) ────────────────────────────────────
// POST /api/auth/member/login
router.post('/member/login', async (req, res) => {
  try {
    const { mobile, password } = req.body;
    if (!mobile || !password) {
      return res.status(400).json({ error: 'Mobile number and password are required.' });
    }
    const member = await Member.findOne({ mobile }).select('+password');
    if (!member) {
      return res.status(404).json({ error: 'No account found for this mobile number. Please register first.' });
    }
    const isMatch = await member.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Incorrect password. Please try again.' });
    }
    if (!member.isActive) {
      return res.status(403).json({ error: 'Your account has been deactivated. Contact support.' });
    }
    member.lastLogin = new Date();
    await member.save({ validateBeforeSave: false });

    const token = signToken(member._id, 'member');
    res.json({
      token,
      user: { id: member._id, mobile: member.mobile, name: member.name, email: member.email, role: member.role },
    });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Login failed.' });
  }
});


// ─── Admin Login ──────────────────────────────────────────────────────────────
// POST /api/auth/login  (existing admin route, kept intact)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }
    const admin = await Admin.findOne({ email }).select('+password');
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    if (!admin.isActive) {
      return res.status(403).json({ error: 'Account deactivated.' });
    }
    admin.lastLogin = new Date();
    await admin.save({ validateBeforeSave: false });

    const token = signToken(admin._id, 'admin');
    res.json({ token, user: { id: admin._id, email: admin.email, name: admin.name, role: admin.role } });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Login failed.' });
  }
});

// ─── Admin Profile ────────────────────────────────────────────────────────────
// GET /api/auth/profile  (protected — requires JWT)
router.get('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Not authenticated.' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let user;
    if (decoded.role === 'member') {
      user = await Member.findById(decoded.id).populate('programsEnrolled');
    } else {
      user = await Admin.findById(decoded.id);
    }
    if (!user) return res.status(404).json({ error: 'User not found.' });
    res.json({ user });
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token.' });
  }
});

module.exports = router;
