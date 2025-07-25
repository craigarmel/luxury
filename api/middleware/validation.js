const { body, validationResult } = require('express-validator');

// Middleware pour gérer les erreurs de validation
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// Règles de validation pour l'inscription
const validateRegister = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  body('firstName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),
  body('lastName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),
  handleValidationErrors
];

// Règles de validation pour la connexion
const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors
];

// Règles de validation pour la propriété
const validateProperty = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Title must be between 5 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 20, max: 1000 })
    .withMessage('Description must be between 20 and 1000 characters'),
  body('price')
    .isNumeric()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('address')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Address is required'),
  body('bedrooms')
    .isInt({ min: 0, max: 20 })
    .withMessage('Bedrooms must be between 0 and 20'),
  body('bathrooms')
    .isInt({ min: 0, max: 20 })
    .withMessage('Bathrooms must be between 0 and 20'),
  handleValidationErrors
];

// Validation middleware
const validateProfileUpdate = [
  body('bio').optional().isLength({ max: 500 }).withMessage('Bio must not exceed 500 characters'),
  body('phone').optional().isMobilePhone().withMessage('Invalid phone number'),
  body('alternateEmail').optional().isEmail().withMessage('Invalid alternate email'),
  body('dateOfBirth').optional().isISO8601().withMessage('Invalid date format'),
  body('gender').optional().isIn(['male', 'female', 'other', 'prefer_not_to_say']).withMessage('Invalid gender'),
  body('address.street').optional().isLength({ max: 100 }).withMessage('Street address too long'),
  body('address.city').optional().isLength({ max: 50 }).withMessage('City name too long'),
  body('address.state').optional().isLength({ max: 50 }).withMessage('State name too long'),
  body('address.zipCode').optional().isLength({ max: 20 }).withMessage('ZIP code too long'),
  body('address.country').optional().isLength({ max: 50 }).withMessage('Country name too long')
];

const validatePreferences = [
  body('preferences.language').optional().isIn(['en', 'es', 'fr', 'de', 'it', 'pt']).withMessage('Invalid language'),
  body('preferences.currency').optional().isIn(['USD', 'EUR', 'GBP', 'CAD', 'AUD']).withMessage('Invalid currency'),
  body('preferences.notifications.email.bookings').optional().isBoolean().withMessage('Must be boolean'),
  body('preferences.notifications.email.promotions').optional().isBoolean().withMessage('Must be boolean'),
  body('preferences.privacy.profileVisibility').optional().isIn(['public', 'hosts_only', 'private']).withMessage('Invalid visibility setting')
];

module.exports = {
  validateRegister,
  validateLogin,
  validateProperty,
  validateProfileUpdate,
  validatePreferences
};