const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { submitDonation, getDonations } = require('../controllers/donationController');
const authMiddleware = require('../middleware/auth');

const donationValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('phone')
    .optional({ checkFalsy: true })
    .matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
    .withMessage('Please provide a valid phone number'),
  body('amount')
    .notEmpty().withMessage('Amount is required')
    .isNumeric().withMessage('Amount must be a number')
    .custom(val => val >= 1).withMessage('Amount must be at least 1'),
  body('campaign')
    .optional()
    .trim(),
];

// POST /api/donations (Public)
router.post('/', donationValidation, submitDonation);

// GET /api/donations (Admin only)
router.get('/', authMiddleware, getDonations);

module.exports = router;
