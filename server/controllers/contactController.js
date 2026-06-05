const ContactSubmission = require('../models/ContactSubmission');
const { validationResult } = require('express-validator');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array().map(e => ({ field: e.path, message: e.msg })),
      });
    }

    const { name, email, phone, subject, message } = req.body;

    const submission = new ContactSubmission({
      name,
      email,
      phone,
      subject,
      message,
    });

    await submission.save();

    res.status(201).json({
      success: true,
      message: 'Your message has been received. We will get back to you soon!',
      id: submission._id,
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ error: messages.join(', ') });
    }
    res.status(500).json({ error: 'Failed to submit contact form. Please try again.' });
  }
};

module.exports = { submitContact };
