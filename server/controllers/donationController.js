const Donation = require('../models/Donation');
const { validationResult } = require('express-validator');

// @desc    Submit a donation record (Public)
// @route   POST /api/donations
// @access  Public
const submitDonation = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array().map(e => ({ field: e.path, message: e.msg })),
      });
    }

    const { name, email, phone, amount, campaign } = req.body;

    const donation = new Donation({
      name,
      email,
      phone,
      amount,
      campaign,
    });

    await donation.save();

    res.status(201).json({
      success: true,
      message: 'Donation recorded successfully!',
      donation,
    });
  } catch (error) {
    console.error('Donation submission error:', error);
    res.status(500).json({ error: 'Failed to record donation. Please try again.' });
  }
};

// @desc    Get all donations (Admin only)
// @route   GET /api/donations
// @access  Private
const getDonations = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';

    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { transactionId: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await Donation.countDocuments(query);
    const donations = await Donation.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    // Calculate sum of all donations for stats
    const stats = await Donation.aggregate([
      { $match: query },
      { $group: { _id: null, totalAmount: { $sum: '$amount' } } }
    ]);
    const totalDonationAmount = stats[0] ? stats[0].totalAmount : 0;

    res.status(200).json({
      success: true,
      donations,
      page,
      pages: Math.ceil(total / limit),
      total,
      totalDonationAmount,
    });
  } catch (error) {
    console.error('Fetch donations error:', error);
    res.status(500).json({ error: 'Failed to fetch donations.' });
  }
};

module.exports = {
  submitDonation,
  getDonations,
};
