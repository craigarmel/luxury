// api/controllers/profileController.js
const UserProfile = require('../models/Profile');
const User = require('../models/User');
const { uploadToGCS, deleteFromGCS, upload } = require('../config/gcp-storage');
const { validationResult } = require('express-validator');

// @desc    Get user profile
// @route   GET /api/profile
// @access  Private
const getProfile = async (req, res) => {
    try {
        let profile = await UserProfile.findByUserId(req.user._id);
        if (!profile) {
            profile = await UserProfile.create({
                userId: req.user._id,
                stats: { joinDate: req.user.createdAt }
            });
            await profile.populate('userId', 'firstName lastName email');
        }
        res.status(200).json({ success: true, data: profile });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// @desc    Update user profile
// @route   PUT /api/profile
// @access  Private
const updateProfile = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        const { lastName, firstName, bio, dateOfBirth, gender, phone, alternateEmail, address, social, preferences } = req.body;
        let profile = await UserProfile.findOne({ userId: req.user._id }).populate('userId', 'firstName lastName email');
        if (!profile) {
            profile = new UserProfile({ userId: req.user._id });
        }
        if (firstName !== undefined) profile.userId.firstName = firstName;
        if (lastName !== undefined) profile.userId.lastName = lastName;
        if (firstName !== undefined || lastName !== undefined) await profile.userId.save();
        if (bio !== undefined) profile.bio = bio;
        if (dateOfBirth !== undefined) profile.dateOfBirth = dateOfBirth;
        if (gender !== undefined) profile.gender = gender;
        if (phone !== undefined) profile.phone = phone;
        if (alternateEmail !== undefined) profile.alternateEmail = alternateEmail;
        if (address !== undefined) profile.address = { ...profile.address, ...address };
        if (social !== undefined) profile.social = { ...profile.social, ...social };
        if (preferences !== undefined) profile.preferences = { ...profile.preferences, ...preferences };
        await profile.save();

        // Ensure all nested fields exist and have defaults
        const data = {
            bio: profile.bio || '',
            address: profile.address || {},
            verification: profile.verification || { status: 'unverified', documents: [] },
            preferences: profile.preferences || {},
            hostInfo: profile.hostInfo || {
                verification: { phone: false, email: false, identity: false, background: false },
                isHost: false,
                responseRate: 0,
                languages: [],
                superhost: false
            },
            stats: profile.stats || {
                joinDate: profile.createdAt,
                totalBookings: 0,
                totalReviews: 0,
                averageRating: 0,
                lastActive: profile.updatedAt
            },
            _id: profile._id,
            userId: profile.userId,
            firstName: profile.userId.firstName,
            lastName: profile.userId.lastName,
            alternateEmail: profile.alternateEmail || '',
            email: profile.userId.email,
            dateOfBirth: profile.dateOfBirth || null,
            avatar: profile.avatar || {
                url: '',
                publicId: '',
                uploadedAt: null
            },
            social: profile.social || {},
            address: profile.address || {},
            phone: profile.phone || '',
            gender: profile.gender || 'prefer_not_to_say',
            createdAt: profile.createdAt,
            updatedAt: profile.updatedAt,
            __v: profile.__v
        };

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};


// @desc    Upload avatar
// @route   POST /api/profile/avatar
// @access  Private
const uploadAvatar = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }
        // Upload to GCS
        const gcsResult = await uploadToGCS(req.file, {
            folder: 'user_avatars',
            filename: `avatar_${req.user._id}`
        });

        let profile = await UserProfile.findOne({ userId: req.user._id });
        if (!profile) profile = new UserProfile({ userId: req.user._id });

        // Delete old avatar if exists
        if (profile.avatar?.publicId) {
            await deleteFromGCS(profile.avatar.publicId);
        }

        profile.avatar = {
            url: gcsResult.url,
            publicId: gcsResult.publicId,
            uploadedAt: new Date()
        };
        await profile.save();

        res.status(200).json({
            success: true,
            message: 'Avatar uploaded successfully',
            data: { avatarUrl: gcsResult.url }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to upload avatar', error: error.message });
    }
};

// @desc    Delete avatar
// @route   DELETE /api/profile/avatar
// @access  Private
const deleteAvatar = async (req, res) => {
    try {
        const profile = await UserProfile.findOne({ userId: req.user._id });
        if (!profile || !profile.avatar?.publicId) {
            return res.status(404).json({ success: false, message: 'No avatar found' });
        }
        await deleteFromGCS(profile.avatar.publicId);
        profile.avatar = undefined;
        await profile.save();
        res.status(200).json({ success: true, message: 'Avatar deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete avatar', error: error.message });
    }
};

// @desc    Submit identity verification documents
// @route   POST /api/profile/verify-identity
// @access  Private
const submitIdentityVerification = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: 'No documents uploaded' });
        }
        const { documentType } = req.body;
        const allowedTypes = ['passport', 'driver_license', 'national_id', 'utility_bill'];
        if (!allowedTypes.includes(documentType)) {
            return res.status(400).json({ success: false, message: 'Invalid document type' });
        }
        let profile = await UserProfile.findOne({ userId: req.user._id });
        if (!profile) profile = new UserProfile({ userId: req.user._id });

        // Upload documents to GCS
        const uploadedDocs = [];
        for (const file of req.files) {
            const gcsResult = await uploadToGCS(file, {
                folder: 'identity_documents',
                filename: `${documentType}_${req.user._id}_${Date.now()}`
            });
            uploadedDocs.push({
                type: documentType,
                url: gcsResult.url,
                publicId: gcsResult.publicId,
                uploadedAt: new Date()
            });
        }
        profile.verification.documents.push(...uploadedDocs);
        profile.verification.status = 'pending';
        profile.verification.submittedAt = new Date();
        await profile.save();

        res.status(200).json({
            success: true,
            message: 'Identity documents submitted successfully',
            data: {
                status: profile.verification.status,
                documentsCount: profile.verification.documents.length
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to submit identity verification', error: error.message });
    }
};

// @desc    Get verification status
// @route   GET /api/profile/verification-status
// @access  Private
const getVerificationStatus = async (req, res) => {
    try {
        const profile = await UserProfile.findOne({ userId: req.user._id });
        if (!profile) {
            return res.status(200).json({
                success: true,
                data: {
                    status: 'unverified',
                    documents: [],
                    submittedAt: null,
                    verifiedAt: null
                }
            });
        }
        res.status(200).json({
            success: true,
            data: {
                status: profile.verification.status,
                documents: profile.verification.documents.map(doc => ({
                    type: doc.type,
                    uploadedAt: doc.uploadedAt,
                    verifiedAt: doc.verifiedAt
                })),
                submittedAt: profile.verification.submittedAt,
                verifiedAt: profile.verification.verifiedAt,
                rejectionReason: profile.verification.rejectionReason
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// @desc    Update preferences
// @route   PUT /api/profile/preferences
// @access  Private
const updatePreferences = async (req, res) => {
    try {
        const { preferences } = req.body;
        let profile = await UserProfile.findOne({ userId: req.user._id });
        if (!profile) profile = new UserProfile({ userId: req.user._id });
        profile.preferences = { ...profile.preferences, ...preferences };
        await profile.save();
        res.status(200).json({ success: true, message: 'Preferences updated successfully', data: profile.preferences });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update preferences', error: error.message });
    }
};

// @desc    Get public profile
// @route   GET /api/profile/public/:userId
// @access  Public
const getPublicProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const profile = await UserProfile.findByUserId(userId);
        if (!profile) {
            return res.status(404).json({ success: false, message: 'Profile not found' });
        }
        if (profile.preferences?.privacy?.profileVisibility === 'private') {
            return res.status(403).json({ success: false, message: 'Profile is private' });
        }
        const publicData = {
            user: {
                firstName: profile.userId.firstName,
                lastName: profile.userId.lastName
            },
            bio: profile.bio,
            avatar: {
                url: profile.avatar?.url || '',
                publicId: profile.avatar?.publicId || '',
                uploadedAt: profile.avatar?.uploadedAt || null
            },
            hostInfo: profile.hostInfo?.isHost ? {
                isHost: true,
                hostSince: profile.hostInfo.hostSince,
                responseRate: profile.hostInfo.responseRate,
                responseTime: profile.hostInfo.responseTime,
                languages: profile.hostInfo.languages,
                superhost: profile.hostInfo.superhost
            } : null,
            stats: {
                totalReviews: profile.stats.totalReviews,
                averageRating: profile.stats.averageRating,
                joinDate: profile.stats.joinDate
            },
            verification: {
                status: profile.verification.status
            }
        };
        if (profile.preferences?.privacy?.showEmail) {
            publicData.user.email = profile.userId.email;
        }
        if (profile.preferences?.privacy?.showPhone) {
            publicData.phone = profile.phone;
        }
        res.status(200).json({ success: true, data: publicData });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

module.exports = {
    getProfile,
    updateProfile,
    uploadAvatar: [upload.single('avatar'), uploadAvatar],
    deleteAvatar,
    submitIdentityVerification: [upload.array('documents', 5), submitIdentityVerification],
    getVerificationStatus,
    updatePreferences,
    getPublicProfile
};
