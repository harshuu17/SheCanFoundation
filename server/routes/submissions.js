const express = require('express');
const router = express.Router();
const { getSubmissions, deleteSubmission } = require('../controllers/submissionsController');
const authMiddleware = require('../middleware/auth');

// All submission routes are protected
router.use(authMiddleware);

// GET /api/submissions
router.get('/', getSubmissions);

// DELETE /api/submissions/:id
router.delete('/:id', deleteSubmission);

module.exports = router;
