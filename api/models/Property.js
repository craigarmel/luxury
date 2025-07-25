const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  hostId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  propertyType: {
    type: String,
    enum: ['apartment', 'house', 'studio', 'loft', 'villa', 'chalet'],
    required: true
  },
  roomType: {
    type: String,
    enum: ['entire_place', 'private_room', 'shared_room'],
    required: true
  },
  location: {
    address: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, trim: true },
    country: { type: String, required: true, trim: true },
    zipCode: { type: String, trim: true },
    neighborhood: { type: String, trim: true },
    coordinates: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true }
    },
    isExactLocation: { type: Boolean, default: true }
  },
  capacity: {
    guests: { type: Number, required: true, min: 1, max: 50 },
    bedrooms: { type: Number, required: true, min: 0, max: 20 },
    beds: { type: Number, required: true, min: 0, max: 50 },
    bathrooms: { type: Number, required: true, min: 0, max: 20 }
  },
  amenities: [{
    type: String,
    enum: [
      'wifi', 'kitchen', 'parking', 'pool', 'gym', 'elevator', 'balcony', 'garden',
      'pets_allowed', 'smoking_allowed', 'wheelchair_accessible', 'air_conditioning',
      'heating', 'washer', 'dryer', 'dishwasher', 'tv', 'workspace'
    ]
  }],
  images: [{
    url: { type: String, required: true },
    caption: { type: String },
    isPrimary: { type: Boolean, default: false },
    order: { type: Number }
  }],
  pricing: {
    basePrice: { type: Number, required: true, min: 0 },
    currency: { type: String, required: true },
    cleaningFee: { type: Number, default: 0 },
    securityDeposit: { type: Number, default: 0 },
    extraGuestFee: { type: Number, default: 0 },
    weeklyDiscount: { type: Number, default: 0 },
    monthlyDiscount: { type: Number, default: 0 },
    seasonalPricing: [{
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
      price: { type: Number, required: true },
      name: { type: String }
    }]
  },
  availability: {
    minStay: { type: Number, default: 1 },
    maxStay: { type: Number, default: 365 },
    advanceNotice: { type: Number, default: 0 },
    preparationTime: { type: Number, default: 0 },
    checkInTime: {
      from: { type: String },
      to: { type: String }
    },
    checkOutTime: { type: String },
    instantBook: { type: Boolean, default: false }
  },
  houseRules: {
    smokingAllowed: { type: Boolean, default: false },
    petsAllowed: { type: Boolean, default: false },
    partiesAllowed: { type: Boolean, default: false },
    quietHours: {
      from: { type: String },
      to: { type: String }
    },
    additionalRules: [{ type: String }]
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'inactive', 'suspended'],
    default: 'draft'
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  featuredUntil: { type: Date },
  stats: {
    totalBookings: { type: Number, default: 0 },
    rating: {
      overall: { type: Number, default: 0, min: 0, max: 5 },
      cleanliness: { type: Number, default: 0, min: 0, max: 5 },
      accuracy: { type: Number, default: 0, min: 0, max: 5 },
      communication: { type: Number, default: 0, min: 0, max: 5 },
      location: { type: Number, default: 0, min: 0, max: 5 },
      checkIn: { type: Number, default: 0, min: 0, max: 5 },
      value: { type: Number, default: 0, min: 0, max: 5 },
      reviewCount: { type: Number, default: 0 }
    },
    viewCount: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

propertySchema.index({ 'location.coordinates': '2dsphere' });
propertySchema.index({ hostId: 1, status: 1 });
propertySchema.index({ 'pricing.basePrice': 1 });
propertySchema.index({ 'stats.rating.overall': -1 });

module.exports = mongoose.model('Property', propertySchema);