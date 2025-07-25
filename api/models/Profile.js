// api/models/UserProfile.js
const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  
  // Basic Profile Info
  bio: {
    type: String,
    maxlength: 500,
    trim: true
  },
  dateOfBirth: {
    type: Date
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other', 'prefer_not_to_say'],
    default: 'prefer_not_to_say'
  },
  
  // Contact Information
  phone: {
    type: String,
    trim: true
  },
  alternateEmail: {
    type: String,
    lowercase: true
  },
  
  // Address Information
  address: {
    street: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    zipCode: { type: String, trim: true },
    country: { type: String, trim: true, default: 'US' }
  },
  
  // Avatar & Media
  avatar: {
    url: { type: String },
    publicId: { type: String }, // For cloud storage
    uploadedAt: { type: Date }
  },
  
  // Identity Verification
  verification: {
    status: {
      type: String,
      enum: ['unverified', 'pending', 'verified', 'rejected'],
      default: 'unverified'
    },
    documents: [{
      type: {
        type: String,
        enum: ['passport', 'driver_license', 'national_id', 'utility_bill']
      },
      url: String,
      publicId: String,
      uploadedAt: { type: Date, default: Date.now },
      verifiedAt: Date,
      rejectionReason: String
    }],
    submittedAt: Date,
    verifiedAt: Date,
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rejectionReason: String
  },
  
  // User Preferences
  preferences: {
    language: { type: String, default: 'en' },
    currency: { type: String, default: 'USD' },
    timezone: { type: String, default: 'UTC' },
    
    // Notification preferences
    notifications: {
      email: {
        bookings: { type: Boolean, default: true },
        promotions: { type: Boolean, default: true },
        updates: { type: Boolean, default: true },
        reminders: { type: Boolean, default: true }
      },
      push: {
        bookings: { type: Boolean, default: true },
        messages: { type: Boolean, default: true },
        promotions: { type: Boolean, default: false }
      },
      sms: {
        bookings: { type: Boolean, default: false },
        emergencies: { type: Boolean, default: true }
      }
    },
    
    // Privacy settings
    privacy: {
      profileVisibility: {
        type: String,
        enum: ['public', 'hosts_only', 'private'],
        default: 'hosts_only'
      },
      showEmail: { type: Boolean, default: false },
      showPhone: { type: Boolean, default: false },
      allowMessages: { type: Boolean, default: true }
    },
    
    // Travel preferences
    travel: {
      accommodationType: [{
        type: String,
        enum: ['apartment', 'house', 'villa', 'penthouse', 'studio']
      }],
      priceRange: {
        min: { type: Number, default: 0 },
        max: { type: Number, default: 1000 }
      },
      amenities: [{
        type: String,
        enum: ['wifi', 'parking', 'pool', 'gym', 'kitchen', 'balcony', 'tv', 'ac']
      }],
      accessibility: {
        wheelchairAccessible: { type: Boolean, default: false },
        visualAid: { type: Boolean, default: false },
        hearingAid: { type: Boolean, default: false }
      }
    }
  },
  
  // Social & Reviews
  social: {
    website: String,
    linkedin: String,
    instagram: String,
    facebook: String
  },
  
  // Host-specific data (if user is a host)
  hostInfo: {
    isHost: { type: Boolean, default: false },
    hostSince: Date,
    responseRate: { type: Number, default: 0, min: 0, max: 100 },
    responseTime: { type: String, enum: ['within_hour', 'few_hours', 'day', 'few_days'] },
    languages: [{ type: String }],
    superhost: { type: Boolean, default: false },
    
    // Host verification
    verification: {
      phone: { type: Boolean, default: false },
      email: { type: Boolean, default: false },
      identity: { type: Boolean, default: false },
      background: { type: Boolean, default: false }
    }
  },
  
  // Statistics
  stats: {
    totalBookings: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0, min: 0, max: 5 },
    joinDate: { type: Date, default: Date.now },
    lastActive: { type: Date, default: Date.now }
  }
}, {
  timestamps: true
});

// Indexes
userProfileSchema.index({ userId: 1 });
userProfileSchema.index({ 'verification.status': 1 });
userProfileSchema.index({ 'hostInfo.isHost': 1 });
userProfileSchema.index({ 'preferences.travel.accommodationType': 1 });

// Methods
userProfileSchema.methods.updateLastActive = function() {
  this.stats.lastActive = new Date();
  return this.save();
};

userProfileSchema.methods.calculateAverageRating = async function() {
  const Review = mongoose.model('Review');
  const result = await Review.aggregate([
    { $match: { targetUser: this.userId } },
    { $group: { _id: null, avgRating: { $avg: '$rating' }, count: { $sum: 1 } } }
  ]);
  
  if (result.length > 0) {
    this.stats.averageRating = Math.round(result[0].avgRating * 10) / 10;
    this.stats.totalReviews = result[0].count;
  }
  
  return this.save();
};

// Static methods
userProfileSchema.statics.findByUserId = function(userId) {
  return this.findOne({ userId }).populate('userId', 'firstName lastName email');
};

module.exports = mongoose.model('UserProfile', userProfileSchema);