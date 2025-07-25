const express = require('express');
const { auth } = require('../middleware/auth');
const { validateProfileUpdate, validatePreferences } = require('../middleware/validation');
const {
  getProfile,
  updateProfile,
  uploadAvatar,
  deleteAvatar,
  submitIdentityVerification,
  getVerificationStatus,
  updatePreferences,
  getPublicProfile
} = require('../controllers/usersController');

const router = express.Router();

// Profile CRUD routes
router.get('/', auth, getProfile);
router.put('/', auth, validateProfileUpdate, updateProfile);

// Avatar management
router.post('/avatar', auth, uploadAvatar);
router.delete('/avatar', auth, deleteAvatar);

// Identity verification
router.post('/verify-identity', auth, submitIdentityVerification);
router.get('/verification-status', auth, getVerificationStatus);

// Preferences management
router.put('/preferences', auth, validatePreferences, updatePreferences);

// Public profile (no auth required)
router.get('/public/:userId', getPublicProfile);

module.exports = router;
