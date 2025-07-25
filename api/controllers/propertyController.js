const Property = require('../models/Property');

// GET /api/properties - Search properties (filters + Maps API)
exports.getAllProperties = async (req, res) => {
    try {
        // Example: filter by location, price, etc.
        const filters = {};
        if (req.query.city) filters.city = req.query.city;
        // Add more filters as needed
        // TODO: Integrate Maps API for geo queries if needed
        const properties = await Property.find(filters);
        res.json(properties);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// // GET /api/properties/featured - Featured properties
// exports.getFeaturedProperties = async (req, res) => {
//     try {
//         const properties = await Property.find({ featured: true });
//         res.json(properties);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// // GET /api/properties/nearby - Properties nearby (Distance Matrix API)
// exports.getNearbyProperties = async (req, res) => {
//     try {
//         // TODO: Use Distance Matrix API with req.query.lat/lng
//         res.json([]); // Placeholder
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// GET /api/properties/my-properties - Properties of logged-in owner
exports.getMyProperties = async (req, res) => {
    try {
        // Assumes req.user.id is set by auth middleware
        const properties = await Property.find({ owner: req.user.id });
        res.json(properties);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET /api/properties/:id - Property details
exports.getPropertyById = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) return res.status(404).json({ error: 'Property not found' });
        res.json(property);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// POST /api/properties - Create property (owner)
exports.createProperty = async (req, res) => {
    try {
        const property = await Property.create({ ...req.body, owner: req.user.id });
        res.status(201).json(property);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// PUT /api/properties/:id - Update property
exports.updateProperty = async (req, res) => {
    try {
        const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!property) return res.status(404).json({ error: 'Property not found' });
        res.json(property);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// DELETE /api/properties/:id - Delete property
exports.deleteProperty = async (req, res) => {
    try {
        const property = await Property.findByIdAndDelete(req.params.id);
        if (!property) return res.status(404).json({ error: 'Property not found' });
        res.json({ message: 'Property deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// POST /api/properties/:id/images - Upload images (Cloud Storage + Vision API)
exports.uploadPropertyImages = async (req, res) => {
    try {
        // TODO: Handle file upload, store in GCP Cloud Storage
        // and analyze with Vision API if needed
        const images = req.files; // Assuming files are uploaded using multer or similar middleware
        if (!images || images.length === 0) {
            return res.status(400).json({ error: 'No images uploaded' });
        }
        res.status(201).json({ message: 'Images uploaded' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// DELETE /api/properties/:id/images/:imageId - Delete image
exports.deletePropertyImage = async (req, res) => {
    try {
        // TODO: Remove image from cloud storage and property.images array
        const property = await Property.findById(req.params.id);
        if (!property) return res.status(404).json({ error: 'Property not found' });
        const imageIndex = property.images.findIndex(img => img._id.toString() === req.params.imageId);
        if (imageIndex === -1) return res.status(404).json({ error: 'Image not found' });
        // Assuming images are stored in cloud storage, delete from there as well
        property.images.splice(imageIndex, 1);
        await property.save();
        res.json({ message: 'Image deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// PUT /api/properties/:id/availability - Update availability
exports.updateAvailability = async (req, res) => {
    try {
        // TODO: Update availability calendar using GCP calendar API or custom logic
        const { availability } = req.body; // Assuming availability is an object with date ranges
        const property = await Property.findById(req.params.id);
        if (!property) return res.status(404).json({ error: 'Property not found' });
        // Update the availability field in the property
        property.availability = { ...property.availability, ...availability };
        await property.save();
        res.json({ message: 'Availability updated' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// GET /api/properties/:id/calendar - Get availability calendar
exports.getAvailabilityCalendar = async (req, res) => {
    try {
        // TODO: Return availability calendar
        const property = await Property.findById(req.params.id);
        if (!property) return res.status(404).json({ error: 'Property not found' });
        // Assuming property.availability contains the calendar data
        // This could be an array of date ranges or similar structure
        // For simplicity, returning an empty array here
        // In a real implementation, you would format the calendar data properly
        if (!property.availability || !property.availability.calendar) {
            return res.status(404).json({ error: 'Availability calendar not found' });
        }
        res.json({ calendar: property.availability.calendar });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// PUT /api/properties/:id/pricing - Update pricing
exports.updatePricing = async (req, res) => {
    try {
        // TODO: Update pricing fields
        const { pricing } = req.body;
        const property = await Property.findById(req.params.id);
        if (!property) return res.status(404).json({ error: 'Property not found' });
        property.pricing = { ...property.pricing, ...pricing };
        await property.save();
        res.json({ message: 'Pricing updated' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// PUT /api/properties/:id/status - Activate/deactivate property
exports.updateStatus = async (req, res) => {
    try {
        // TODO: Update status (active/inactive)
        const { status } = req.body; // Expected to be 'active', 'inactive', etc.
        const property = await Property.findById(req.params.id);
        if (!property) return res.status(404).json({ error: 'Property not found' });
        if (!['draft', 'active', 'inactive', 'suspended'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }
        property.status = status;
        await property.save();
        res.json({ message: 'Status updated' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// GET /api/properties/:id/reviews - Get property reviews
exports.getPropertyReviews = async (req, res) => {
    try {
        // TODO: Fetch reviews for property
        const property = await Property.findById(req.params.id);
        if (!property) return res.status(404).json({ error: 'Property not found' });
        res.json({ reviews: [ property.reviews ] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// POST /api/properties/:id/duplicate - Duplicate property
exports.duplicateProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) return res.status(404).json({ error: 'Property not found' });
        const newProperty = await Property.create({ ...property.toObject(), _id: undefined, owner: req.user.id });
        res.status(201).json(newProperty);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// GET /api/properties/:id/analytics - Property analytics
exports.getPropertyAnalytics = async (req, res) => {
    try {
        // TODO: Return analytics data
        const property = await Property.findById(req.params.id);
        if (!property) return res.status(404).json({ error: 'Property not found' });
        res.json({ analytics: {} });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};