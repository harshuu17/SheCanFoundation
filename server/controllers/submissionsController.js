const ContactSubmission = require('../models/ContactSubmission');

// @desc    Get all submissions (with pagination & search)
// @route   GET /api/submissions
// @access  Protected
const getSubmissions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const skip = (page - 1) * limit;

    // Build search query
    let query = {};
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { subject: { $regex: search, $options: 'i' } },
        ],
      };
    }

    const [submissions, total] = await Promise.all([
      ContactSubmission.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      ContactSubmission.countDocuments(query),
    ]);

    // Today's count
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayCount = await ContactSubmission.countDocuments({
      createdAt: { $gte: today },
    });

    res.json({
      success: true,
      data: submissions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      stats: {
        total,
        today: todayCount,
      },
    });
  } catch (error) {
    console.error('Get submissions error:', error);
    res.status(500).json({ error: 'Failed to fetch submissions.' });
  }
};

// @desc    Delete a submission
// @route   DELETE /api/submissions/:id
// @access  Protected
const deleteSubmission = async (req, res) => {
  try {
    const submission = await ContactSubmission.findByIdAndDelete(req.params.id);

    if (!submission) {
      return res.status(404).json({ error: 'Submission not found.' });
    }

    res.json({ success: true, message: 'Submission deleted successfully.' });
  } catch (error) {
    console.error('Delete submission error:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid submission ID.' });
    }
    res.status(500).json({ error: 'Failed to delete submission.' });
  }
};

module.exports = { getSubmissions, deleteSubmission };
