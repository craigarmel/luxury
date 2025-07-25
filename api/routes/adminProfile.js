const express = require('express');
const { auth, authorize } = require('../middleware/auth');
const UserProfile = require('../models/Profile');
const cloudinary = require('../config/cloudinary');

const adminRouter = express.Router();

// @desc    Get pending verifications
// @route   GET /api/admin/profiles/pending-verifications
// @access  Admin only
adminRouter.get('/pending-verifications', auth, authorize('admin'), async (req, res) => {
  try {
    const pendingProfiles = await UserProfile.find({
      'verification.status': 'pending'
    }).populate('userId', 'firstName lastName email').sort({ 'verification.submittedAt': -1 });

    res.status(200).json({
      success: true,
      data: pendingProfiles.map(profile => ({
        _id: profile._id,
        user: profile.userId,
        verification: profile.verification,
        submittedAt: profile.verification.submittedAt
      }))
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Approve/Reject verification
// @route   PUT /api/admin/profiles/:profileId/verification
// @access  Admin only
adminRouter.put('/:profileId/verification', auth, authorize('admin'), async (req, res) => {
  try {
    const { profileId } = req.params;
    const { action, rejectionReason } = req.body; // action: 'approve' or 'reject'

    const profile = await UserProfile.findById(profileId);
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    if (action === 'approve') {
      profile.verification.status = 'verified';
      profile.verification.verifiedAt = new Date();
      profile.verification.verifiedBy = req.user._id;
      profile.verification.rejectionReason = undefined;
    } else if (action === 'reject') {
      if (!rejectionReason) {
        return res.status(400).json({
          success: false,
          message: 'Rejection reason is required'
        });
      }
      profile.verification.status = 'rejected';
      profile.verification.rejectionReason = rejectionReason;
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid action. Use "approve" or "reject"'
      });
    }

    await profile.save();

    res.status(200).json({
      success: true,
      message: `Verification ${action}d successfully`,
      data: {
        status: profile.verification.status,
        verifiedAt: profile.verification.verifiedAt,
        rejectionReason: profile.verification.rejectionReason
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @desc    Get verification document
// @route   GET /api/admin/profiles/:profileId/documents/:documentId
// @access  Admin only
adminRouter.get('/:profileId/documents/:documentIndex', auth, authorize('admin'), async (req, res) => {
  try {
    const { profileId, documentIndex } = req.params;
    
    const profile = await UserProfile.findById(profileId);
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    const document = profile.verification.documents[documentIndex];
    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document not found'
      });
    }

    res.status(200).json({
      success: true,
      data: document
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = { profileRoutes: router, adminProfileRoutes: adminRouter };