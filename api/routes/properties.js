const express = require('express');
const propertiesController = require('../controllers/propertyController');
const { auth } = require('../middleware/auth');

const router = express.Router();

router
    .route('/')
    .get(propertiesController.getAllProperties)
    .post(auth, propertiesController.createProperty);

router.get('/my-properties', auth, propertiesController.getMyProperties);

router
    .route('/:id')
    .get(propertiesController.getPropertyById)
    .put(auth, propertiesController.updateProperty)
    .delete(auth, propertiesController.deleteProperty);

router.post('/:id/images', auth, propertiesController.uploadPropertyImages);
router.delete('/:id/images/:imageId', auth, propertiesController.deletePropertyImage);

router.put('/:id/availability', auth, propertiesController.updateAvailability);
router.get('/:id/calendar', auth, propertiesController.getAvailabilityCalendar);
router.put('/:id/pricing', auth, propertiesController.updatePricing);
router.put('/:id/status', auth, propertiesController.updateStatus);

router.get('/:id/reviews', auth, propertiesController.getPropertyReviews);
router.post('/:id/duplicate', auth, propertiesController.duplicateProperty);
router.get('/:id/analytics', auth, propertiesController.getPropertyAnalytics);

module.exports = router;
