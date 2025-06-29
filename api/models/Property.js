const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: 1000
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  bedrooms: {
    type: Number,
    required: true,
    min: 0,
    max: 20
  },
  bathrooms: {
    type: Number,
    required: true,
    min: 0,
    max: 20
  },
  maxGuests: {
    type: Number,
    required: true,
    min: 1,
    max: 50
  },
  amenities: [{
    type: String,
    trim: true
  }],
  images: [{
    url: String,
    alt: String
  }],
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalReviews: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index pour la géolocalisation
propertySchema.index({ location: '2dsphere' });
propertySchema.index({ host: 1, isActive: 1 });
propertySchema.index({ price: 1 });
propertySchema.index({ averageRating: -1 });

module.exports = mongoose.model('Property', propertySchema);