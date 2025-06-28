# API Réservation Appartements - Architecture Simplifiée

## 🛠️ Stack Technique

### **Backend - Node.js + Express.js**
```json
{
  "runtime": "Node.js 18+",
  "framework": "Express.js",
  "packages": {
    "core": [
      "express",
      "cors",
      "helmet",
      "compression",
      "morgan",
      "express-rate-limit",
      "express-validator"
    ],
    "database": [
      "mongoose",
      "@google-cloud/firestore",
      "redis",
      "ioredis"
    ],
    "authentication": [
      "jsonwebtoken",
      "bcryptjs",
      "passport",
      "passport-jwt",
      "passport-google-oauth20"
    ],
    "payments": [
      "stripe",
      "paypal-rest-sdk"
    ],
    "email": [
      "nodemailer",
      "@sendgrid/mail"
    ],
    "file_upload": [
      "multer",
      "@google-cloud/storage",
      "sharp",
      "cloudinary"
    ],
    "utilities": [
      "moment",
      "lodash",
      "axios",
      "uuid",
      "joi",
      "dotenv",
      "winston"
    ],
    "testing": [
      "jest",
      "supertest",
      "mongodb-memory-server"
    ]
  }
}
```

### **Frontend - Next.js**
```json
{
  "framework": "Next.js 14+",
  "packages": {
    "core": [
      "next",
      "react",
      "react-dom",
      "typescript"
    ],
    "ui_components": [
      "@mui/material",
      "@mui/icons-material",
      "@emotion/react",
      "@emotion/styled",
      "framer-motion",
      "react-spring"
    ],
    "state_management": [
      "zustand",
      "@tanstack/react-query",
      "swr"
    ],
    "forms": [
      "react-hook-form",
      "@hookform/resolvers",
      "yup"
    ],
    "maps_location": [
      "@react-google-maps/api",
      "react-map-gl",
      "mapbox-gl"
    ],
    "payments": [
      "@stripe/stripe-js",
      "@stripe/react-stripe-js"
    ],
    "media": [
      "react-image-gallery",
      "react-dropzone",
      "next-cloudinary"
    ],
    "utilities": [
      "date-fns",
      "lodash",
      "axios",
      "react-hot-toast",
      "react-infinite-scroll-component"
    ],
    "testing": [
      "@testing-library/react",
      "@testing-library/jest-dom",
      "cypress"
    ]
  }
}
```

### **APIs Google Cloud Platform**
```json
{
  "compute": {
    "app_engine": "Hébergement backend scalable",
    "cloud_run": "Microservices containerisés",
    "compute_engine": "Serveurs dédiés si nécessaire"
  },
  "storage": {
    "cloud_storage": "Stockage images/documents",
    "firestore": "Base de données NoSQL principale",
    "cloud_sql": "Base relationnelle pour analytics",
    "memorystore_redis": "Cache et sessions"
  },
  "apis": {
    "maps_platform": {
      "maps_javascript_api": "Cartes interactives",
      "places_api": "Autocomplétion adresses",
      "geocoding_api": "Conversion adresse/coordonnées",
      "distance_matrix_api": "Calcul distances",
      "elevation_api": "Données altitude"
    },
    "cloud_vision_api": "Modération automatique images",
    "cloud_translation_api": "Traduction multi-langues",
    "cloud_natural_language_api": "Analyse sentiment avis"
  },
  "security": {
    "cloud_identity": "Authentification",
    "cloud_kms": "Chiffrement clés",
    "cloud_armor": "Protection DDoS",
    "reCAPTCHA": "Protection bot"
  },
  "monitoring": {
    "cloud_monitoring": "Surveillance infrastructure",
    "cloud_logging": "Logs centralisés",
    "error_reporting": "Gestion erreurs",
    "cloud_trace": "Performance tracing"
  }
}
```

---

## 🏗️ Architecture des Services

### 1. **Service d'Authentification** (`/api/auth`)
- `POST /api/auth/register` - Inscription (locataire/propriétaire)
- `POST /api/auth/login` - Connexion utilisateur
- `POST /api/auth/logout` - Déconnexion
- `POST /api/auth/refresh` - Rafraîchir le token JWT
- `POST /api/auth/forgot-password` - Mot de passe oublié
- `POST /api/auth/reset-password` - Réinitialiser mot de passe
- `GET /api/auth/verify-email/:token` - Vérification email
- `POST /api/auth/google` - Connexion Google OAuth
- `POST /api/auth/two-factor/enable` - Activer 2FA
- `POST /api/auth/two-factor/verify` - Vérifier code 2FA

### 2. **Service Utilisateurs** (`/api/users`)
- `GET /api/users/profile` - Profil utilisateur connecté
- `PUT /api/users/profile` - Modifier profil
- `POST /api/users/avatar` - Upload photo de profil (Cloud Storage)
- `PUT /api/users/change-password` - Changer mot de passe
- `GET /api/users/identity-verification` - Statut vérification identité
- `POST /api/users/identity-verification` - Soumettre documents (Cloud Vision)
- `PUT /api/users/preferences` - Préférences utilisateur
- `GET /api/users/dashboard` - Tableau de bord personnel
- `GET /api/users/:id/public-profile` - Profil public utilisateur
- `POST /api/users/report` - Signaler un utilisateur
- `GET /api/users/verification-badges` - Badges de vérification

### 3. **Service Propriétés** (`/api/properties`)
- `GET /api/properties` - Rechercher propriétés (filtres + Maps API)
- `GET /api/properties/:id` - Détails d'une propriété
- `POST /api/properties` - Créer une propriété (propriétaire)
- `PUT /api/properties/:id` - Modifier une propriété
- `DELETE /api/properties/:id` - Supprimer une propriété
- `POST /api/properties/:id/images` - Upload photos (Cloud Storage + Vision API)
- `DELETE /api/properties/:id/images/:imageId` - Supprimer photo
- `PUT /api/properties/:id/availability` - Mettre à jour disponibilités
- `GET /api/properties/:id/calendar` - Calendrier disponibilités
- `PUT /api/properties/:id/pricing` - Mettre à jour tarifs
- `PUT /api/properties/:id/status` - Activer/désactiver propriété
- `GET /api/properties/my-properties` - Propriétés du propriétaire connecté
- `GET /api/properties/:id/reviews` - Avis sur une propriété
- `GET /api/properties/featured` - Propriétés mises en avant
- `GET /api/properties/nearby` - Propriétés à proximité (Distance Matrix API)
- `POST /api/properties/:id/duplicate` - Dupliquer propriété
- `GET /api/properties/:id/analytics` - Statistiques propriété

### 4. **Service Réservations** (`/api/bookings`)
- `GET /api/bookings` - Réservations de l'utilisateur
- `GET /api/bookings/:id` - Détails d'une réservation
- `POST /api/bookings` - Créer une réservation
- `PUT /api/bookings/:id/cancel` - Annuler réservation
- `PUT /api/bookings/:id/modify` - Modifier réservation
- `POST /api/bookings/:id/confirm` - Confirmer réservation (propriétaire)
- `PUT /api/bookings/:id/reject` - Rejeter réservation (propriétaire)
- `GET /api/bookings/host` - Réservations reçues (propriétaire)
- `PUT /api/bookings/:id/check-in` - Enregistrer arrivée
- `PUT /api/bookings/:id/check-out` - Enregistrer départ
- `POST /api/bookings/:id/extend` - Demande prolongation séjour
- `GET /api/bookings/:id/invoice` - Facture réservation
- `POST /api/bookings/:id/special-requests` - Demandes spéciales

### 5. **Service Paiements** (`/api/payments`)
- `POST /api/payments/calculate` - Calculer coût total réservation
- `POST /api/payments/create-intent` - Créer intention de paiement (Stripe)
- `POST /api/payments/confirm` - Confirmer paiement
- `GET /api/payments/:bookingId` - Détails paiement réservation
- `POST /api/payments/refund` - Rembourser réservation
- `GET /api/payments/payouts` - Virements propriétaires
- `POST /api/payments/webhook` - Webhook Stripe
- `GET /api/payments/invoices` - Factures utilisateur
- `POST /api/payments/disputes` - Gérer litiges
- `GET /api/payments/methods` - Méthodes de paiement utilisateur
- `POST /api/payments/methods` - Ajouter méthode de paiement

### 6. **Service Avis** (`/api/reviews`)
- `GET /api/reviews/property/:propertyId` - Avis d'une propriété
- `POST /api/reviews` - Créer un avis (après séjour)
- `PUT /api/reviews/:id` - Modifier son avis
- `DELETE /api/reviews/:id` - Supprimer son avis
- `POST /api/reviews/:id/response` - Réponse propriétaire à un avis
- `GET /api/reviews/user/:userId` - Avis reçus par un utilisateur
- `POST /api/reviews/:id/report` - Signaler un avis inapproprié
- `POST /api/reviews/:id/helpful` - Marquer avis comme utile
- `GET /api/reviews/sentiment-analysis` - Analyse sentiment (Natural Language API)
- `GET /api/reviews/insights` - Insights avis pour propriétaire

### 7. **Service Localisation** (`/api/locations`)
- `GET /api/locations/cities` - Villes disponibles
- `GET /api/locations/neighborhoods/:cityId` - Quartiers d'une ville
- `GET /api/locations/nearby` - Propriétés à proximité (Maps API)
- `GET /api/locations/autocomplete` - Autocomplétion adresses (Places API)
- `GET /api/locations/:id/points-of-interest` - Points d'intérêt (Places API)
- `POST /api/locations/geocode` - Géocoder adresse (Geocoding API)
- `GET /api/locations/travel-time` - Temps de trajet (Distance Matrix API)
- `GET /api/locations/elevation` - Données altitude (Elevation API)

### 8. **Service Analytics** (`/api/analytics`)
- `GET /api/analytics/host-dashboard` - Tableau de bord propriétaire
- `GET /api/analytics/booking-stats` - Statistiques réservations
- `GET /api/analytics/revenue` - Revenus propriétaire
- `GET /api/analytics/occupancy` - Taux d'occupation
- `GET /api/analytics/market-insights` - Insights marché local
- `GET /api/analytics/competitor-analysis` - Analyse concurrence
- `GET /api/analytics/pricing-suggestions` - Suggestions prix
- `GET /api/analytics/demand-forecast` - Prévision demande

### 9. **Service Recherche** (`/api/search`)
- `GET /api/search/properties` - Recherche propriétés avec filtres
- `GET /api/search/suggestions` - Suggestions de recherche
- `POST /api/search/saved-searches` - Sauvegarder recherche
- `GET /api/search/saved-searches` - Récupérer recherches sauvées
- `GET /api/search/trending` - Destinations tendance
- `POST /api/search/alerts` - Alertes de prix

---

## 🗄️ Collections de Base de Données

### Collection `users`
```json
{
  "_id": "ObjectId",
  "firstName": "string",
  "lastName": "string",
  "email": "string (unique)",
  "phone": "string",
  "password": "string (hashed)",
  "avatar": "string (URL)",
  "dateOfBirth": "Date",
  "gender": "enum ['male', 'female', 'other', 'prefer_not_to_say']",
  "role": "enum ['guest', 'host', 'admin']",
  "languages": ["string"],
  "isEmailVerified": "boolean",
  "isPhoneVerified": "boolean",
  "isIdentityVerified": "boolean",
  "identityDocuments": [
    {
      "type": "enum ['passport', 'id_card', 'driving_license']",
      "documentUrl": "string",
      "verificationStatus": "enum ['pending', 'approved', 'rejected']",
      "submittedAt": "Date"
    }
  ],
  "address": {
    "street": "string",
    "city": "string",
    "state": "string",
    "zipCode": "string",
    "country": "string"
  },
  "emergencyContact": {
    "name": "string",
    "phone": "string",
    "relationship": "string"
  },
  "preferences": {
    "currency": "string",
    "language": "string",
    "emailNotifications": "boolean"
  },
  "hostProfile": {
    "bio": "string",
    "responseRate": "number",
    "responseTime": "string",
    "joinedAt": "Date",
    "totalEarnings": "number",
    "superhost": "boolean"
  },
  "guestProfile": {
    "bio": "string",
    "occupation": "string",
    "totalBookings": "number",
    "verificationBadges": ["string"]
  },
  "isActive": "boolean",
  "lastLoginAt": "Date",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Collection `properties`
```json
{
  "_id": "ObjectId",
  "hostId": "ObjectId",
  "title": "string",
  "description": "string",
  "propertyType": "enum ['apartment', 'house', 'studio', 'loft', 'villa', 'chalet']",
  "roomType": "enum ['entire_place', 'private_room', 'shared_room']",
  "location": {
    "address": "string",
    "city": "string",
    "state": "string",
    "country": "string",
    "zipCode": "string",
    "neighborhood": "string",
    "coordinates": {
      "latitude": "number",
      "longitude": "number"
    },
    "isExactLocation": "boolean"
  },
  "capacity": {
    "guests": "number",
    "bedrooms": "number",
    "beds": "number",
    "bathrooms": "number"
  },
  "amenities": [
    "enum ['wifi', 'kitchen', 'parking', 'pool', 'gym', 'elevator', 'balcony', 'garden', 'pets_allowed', 'smoking_allowed', 'wheelchair_accessible', 'air_conditioning', 'heating', 'washer', 'dryer', 'dishwasher', 'tv', 'workspace']"
  ],
  "images": [
    {
      "url": "string",
      "caption": "string",
      "isPrimary": "boolean",
      "order": "number"
    }
  ],
  "pricing": {
    "basePrice": "number",
    "currency": "string",
    "cleaningFee": "number",
    "securityDeposit": "number",
    "extraGuestFee": "number",
    "weeklyDiscount": "number",
    "monthlyDiscount": "number",
    "seasonalPricing": [
      {
        "startDate": "Date",
        "endDate": "Date",
        "price": "number",
        "name": "string"
      }
    ]
  },
  "availability": {
    "minStay": "number",
    "maxStay": "number",
    "advanceNotice": "number",
    "preparationTime": "number",
    "checkInTime": {
      "from": "string",
      "to": "string"
    },
    "checkOutTime": "string",
    "instantBook": "boolean"
  },
  "houseRules": {
    "smokingAllowed": "boolean",
    "petsAllowed": "boolean",
    "partiesAllowed": "boolean",
    "quietHours": {
      "from": "string",
      "to": "string"
    },
    "additionalRules": ["string"]
  },
  "status": "enum ['draft', 'active', 'inactive', 'suspended']",
  "verificationStatus": "enum ['pending', 'approved', 'rejected']",
  "featuredUntil": "Date",
  "stats": {
    "totalBookings": "number",
    "rating": {
      "overall": "number",
      "cleanliness": "number",
      "accuracy": "number",
      "communication": "number",
      "location": "number",
      "checkIn": "number",
      "value": "number",
      "reviewCount": "number"
    },
    "viewCount": "number"
  },
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Collection `bookings`
```json
{
  "_id": "ObjectId",
  "bookingNumber": "string (unique)",
  "propertyId": "ObjectId",
  "hostId": "ObjectId",
  "guestId": "ObjectId",
  "status": "enum ['pending', 'confirmed', 'cancelled', 'completed', 'no_show']",
  "dates": {
    "checkIn": "Date",
    "checkOut": "Date",
    "nights": "number"
  },
  "guests": {
    "adults": "number",
    "children": "number",
    "infants": "number",
    "total": "number"
  },
  "pricing": {
    "basePrice": "number",
    "nights": "number",
    "subtotal": "number",
    "cleaningFee": "number",
    "serviceFee": "number",
    "taxes": "number",
    "total": "number",
    "currency": "string",
    "hostPayout": "number"
  },
  "payment": {
    "paymentIntentId": "string",
    "status": "enum ['pending', 'paid', 'partially_refunded', 'refunded']",
    "paidAt": "Date",
    "refundAmount": "number",
    "refundedAt": "Date"
  },
  "guestInfo": {
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phone": "string",
    "specialRequests": "string",
    "arrivalTime": "string"
  },
  "checkInOut": {
    "checkInAt": "Date",
    "checkOutAt": "Date",
    "actualCheckIn": "Date",
    "actualCheckOut": "Date"
  },
  "cancellation": {
    "cancelledBy": "enum ['guest', 'host', 'admin']",
    "reason": "string",
    "cancelledAt": "Date",
    "refundAmount": "number"
  },
  "modifications": [
    {
      "type": "enum ['dates', 'guests', 'cancellation']",
      "oldValue": "object",
      "newValue": "object",
      "requestedBy": "ObjectId",
      "status": "enum ['pending', 'approved', 'rejected']",
      "requestedAt": "Date",
      "respondedAt": "Date"
    }
  ],
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Collection `availability`
```json
{
  "_id": "ObjectId",
  "propertyId": "ObjectId",
  "date": "Date",
  "available": "boolean",
  "price": "number",
  "minStay": "number",
  "bookingId": "ObjectId | null",
  "blockedReason": "enum ['booked', 'blocked_by_host', 'maintenance', 'not_available']",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Collection `reviews`
```json
{
  "_id": "ObjectId",
  "bookingId": "ObjectId",
  "propertyId": "ObjectId",
  "hostId": "ObjectId",
  "guestId": "ObjectId",
  "type": "enum ['guest_to_host', 'host_to_guest']",
  "ratings": {
    "overall": "number (1-5)",
    "cleanliness": "number (1-5)",
    "accuracy": "number (1-5)",
    "communication": "number (1-5)",
    "location": "number (1-5)",
    "checkIn": "number (1-5)",
    "value": "number (1-5)"
  },
  "comment": "string",
  "response": {
    "comment": "string",
    "respondedAt": "Date"
  },
  "isPublic": "boolean",
  "reportedBy": ["ObjectId"],
  "moderationStatus": "enum ['approved', 'pending', 'hidden']",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Collection `locations`
```json
{
  "_id": "ObjectId",
  "name": "string",
  "type": "enum ['city', 'neighborhood', 'landmark']",
  "parentId": "ObjectId | null",
  "country": "string",
  "state": "string",
  "coordinates": {
    "latitude": "number",
    "longitude": "number"
  },
  "popularityScore": "number",
  "isActive": "boolean",
  "createdAt": "Date"
}
```

### Collection `saved_searches`
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "name": "string",
  "searchCriteria": {
    "location": "string",
    "checkIn": "Date",
    "checkOut": "Date",
    "guests": "number",
    "priceMin": "number",
    "priceMax": "number",
    "propertyType": "string",
    "amenities": ["string"]
  },
  "alertsEnabled": "boolean",
  "lastNotified": "Date",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

---

## 📋 Index de Base de Données Recommandés

### Indexes essentiels pour les performances :
- `users`: `{ email: 1 }`, `{ phone: 1 }`, `{ role: 1, isActive: 1 }`
- `properties`: `{ hostId: 1, status: 1 }`, `{ "location.coordinates": "2dsphere" }`, `{ status: 1, verificationStatus: 1 }`
- `bookings`: `{ guestId: 1, createdAt: -1 }`, `{ hostId: 1, status: 1 }`, `{ propertyId: 1, "dates.checkIn": 1 }`
- `availability`: `{ propertyId: 1, date: 1 }`, `{ date: 1, available: 1 }`
- `reviews`: `{ propertyId: 1, moderationStatus: 1 }`, `{ hostId: 1, type: 1 }`
- `locations`: `{ "coordinates": "2dsphere" }`, `{ type: 1, isActive: 1 }`
- `saved_searches`: `{ userId: 1 }`, `{ alertsEnabled: 1, lastNotified: 1 }`

## 🏗️ Architecture Microservices avec Cloud Run

```yaml
services:
  - name: auth-service
    container: gcr.io/project/auth-service
    env: Node.js + Express + JWT
    
  - name: property-service
    container: gcr.io/project/property-service
    env: Node.js + Express + Firestore
    
  - name: booking-service
    container: gcr.io/project/booking-service
    env: Node.js + Express + Redis
    
  - name: payment-service
    container: gcr.io/project/payment-service
    env: Node.js + Express + Stripe
    
  - name: analytics-service
    container: gcr.io/project/analytics-service
    env: Node.js + Express + Cloud SQL
```

Cette architecture simplifiée se concentre sur les fonctionnalités essentielles pour une plateforme de réservation d'appartements : authentification, gestion des propriétés, réservations, paiements, avis et localisation.