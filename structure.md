client/
├── public/
│   ├── images/
│   ├── icons/
│   └── favicon.ico
│
├── src/
│   ├── app/                       # App Router Next.js 14+
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx               # Page d'accueil
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   │
│   │   ├── auth/                  # Pages d'authentification
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   └── reset-password/
│   │   │       └── page.tsx
│   │   │
│   │   ├── properties/            # Pages propriétés
│   │   │   ├── page.tsx           # Liste des propriétés
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx       # Détail propriété
│   │   │   └── create/
│   │   │       └── page.tsx       # Créer propriété
│   │   │
│   │   ├── bookings/              # Pages réservations
│   │   │   ├── page.tsx           # Mes réservations
│   │   │   └── [id]/
│   │   │       └── page.tsx       # Détail réservation
│   │   │
│   │   ├── search/                # Page de recherche
│   │   │   └── page.tsx
│   │   │
│   │   ├── profile/               # Profil utilisateur
│   │   │   ├── page.tsx
│   │   │   ├── edit/
│   │   │   │   └── page.tsx
│   │   │   └── dashboard/
│   │   │       └── page.tsx
│   │   │
│   │   ├── admin/                 # Interface d'administration
│   │   │   ├── layout.tsx         # Layout admin avec sidebar
│   │   │   ├── page.tsx           # Dashboard admin principal
│   │   │   │
│   │   │   ├── properties/        # Gestion propriétés admin
│   │   │   │   ├── page.tsx       # Liste toutes propriétés
│   │   │   │   ├── [id]/
│   │   │   │   │   └── page.tsx   # Détail propriété admin
│   │   │   │   ├── pending/
│   │   │   │   │   └── page.tsx   # Propriétés en attente
│   │   │   │   └── reports/
│   │   │   │       └── page.tsx   # Propriétés signalées
│   │   │   │
│   │   │   ├── users/             # Gestion utilisateurs
│   │   │   │   ├── page.tsx       # Liste tous utilisateurs
│   │   │   │   ├── [id]/
│   │   │   │   │   └── page.tsx   # Profil utilisateur admin
│   │   │   │   ├── hosts/
│   │   │   │   │   └── page.tsx   # Gestion propriétaires
│   │   │   │   └── verification/
│   │   │   │       └── page.tsx   # Vérifications en attente
│   │   │   │
│   │   │   ├── bookings/          # Gestion réservations admin
│   │   │   │   ├── page.tsx       # Toutes les réservations
│   │   │   │   ├── [id]/
│   │   │   │   │   └── page.tsx   # Détail réservation admin
│   │   │   │   ├── disputes/
│   │   │   │   │   └── page.tsx   # Litiges
│   │   │   │   └── refunds/
│   │   │   │       └── page.tsx   # Demandes remboursement
│   │   │   │
│   │   │   ├── payments/          # Gestion paiements
│   │   │   │   ├── page.tsx       # Vue d'ensemble paiements
│   │   │   │   ├── transactions/
│   │   │   │   │   └── page.tsx   # Toutes transactions
│   │   │   │   ├── payouts/
│   │   │   │   │   └── page.tsx   # Virements propriétaires
│   │   │   │   └── failed/
│   │   │   │       └── page.tsx   # Paiements échoués
│   │   │   │
│   │   │   ├── reviews/           # Modération avis
│   │   │   │   ├── page.tsx       # Tous les avis
│   │   │   │   ├── pending/
│   │   │   │   │   └── page.tsx   # Avis en attente modération
│   │   │   │   └── reported/
│   │   │   │       └── page.tsx   # Avis signalés
│   │   │   │
│   │   │   ├── analytics/         # Analytics et rapports
│   │   │   │   ├── page.tsx       # Dashboard analytics
│   │   │   │   ├── revenue/
│   │   │   │   │   └── page.tsx   # Rapport revenus
│   │   │   │   ├── bookings/
│   │   │   │   │   └── page.tsx   # Statistiques réservations
│   │   │   │   └── users/
│   │   │   │       └── page.tsx   # Statistiques utilisateurs
│   │   │   │
│   │   │   └── settings/          # Paramètres plateforme
│   │   │       ├── page.tsx       # Paramètres généraux
│   │   │       ├── fees/
│   │   │       │   └── page.tsx   # Configuration frais
│   │   │       ├── policies/
│   │   │       │   └── page.tsx   # Politiques plateforme
│   │   │       └── maintenance/
│   │   │           └── page.tsx   # Mode maintenance
│   │   │
│   │   └── api/                   # Routes API Next.js (optionnel)
│   │       └── test/
│   │           └── route.ts
│   │
│   ├── components/                # Composants réutilisables
│   │   ├── ui/                    # Composants UI de base
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Loading.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── layout/                # Composants de layout
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Navigation.tsx
│   │   │
│   │   ├── auth/                  # Composants d'authentification
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   └── AdminRoute.tsx     # Protection routes admin
│   │   │
│   │   ├── admin/                 # Composants interface admin
│   │   │   ├── layout/
│   │   │   │   ├── AdminSidebar.tsx
│   │   │   │   ├── AdminHeader.tsx
│   │   │   │   └── AdminBreadcrumb.tsx
│   │   │   │
│   │   │   ├── dashboard/
│   │   │   │   ├── StatsCards.tsx
│   │   │   │   ├── RevenueChart.tsx
│   │   │   │   ├── BookingsChart.tsx
│   │   │   │   └── RecentActivity.tsx
│   │   │   │
│   │   │   ├── properties/
│   │   │   │   ├── PropertyTable.tsx
│   │   │   │   ├── PropertyStatusBadge.tsx
│   │   │   │   ├── PropertyModerationForm.tsx
│   │   │   │   └── PropertyReports.tsx
│   │   │   │
│   │   │   ├── users/
│   │   │   │   ├── UserTable.tsx
│   │   │   │   ├── UserStatusBadge.tsx
│   │   │   │   ├── UserVerificationForm.tsx
│   │   │   │   └── UserActions.tsx
│   │   │   │
│   │   │   ├── bookings/
│   │   │   │   ├── BookingTable.tsx
│   │   │   │   ├── BookingDetails.tsx
│   │   │   │   ├── DisputeForm.tsx
│   │   │   │   └── RefundForm.tsx
│   │   │   │
│   │   │   ├── payments/
│   │   │   │   ├── TransactionTable.tsx
│   │   │   │   ├── PayoutQueue.tsx
│   │   │   │   └── PaymentAnalytics.tsx
│   │   │   │
│   │   │   ├── reviews/
│   │   │   │   ├── ReviewModerationTable.tsx
│   │   │   │   ├── ReviewDetails.tsx
│   │   │   │   └── ReviewActions.tsx
│   │   │   │
│   │   │   ├── analytics/
│   │   │   │   ├── AnalyticsDashboard.tsx
│   │   │   │   ├── RevenueReports.tsx
│   │   │   │   ├── UserGrowthChart.tsx
│   │   │   │   └── MarketInsights.tsx
│   │   │   │
│   │   │   └── settings/
│   │   │       ├── PlatformSettings.tsx
│   │   │       ├── FeeConfiguration.tsx
│   │   │       ├── PolicyEditor.tsx
│   │   │       └── MaintenanceMode.tsx
│   │   │
│   │   ├── property/              # Composants propriétés
│   │   │   ├── PropertyCard.tsx
│   │   │   ├── PropertyList.tsx
│   │   │   ├── PropertyForm.tsx
│   │   │   ├── PropertyGallery.tsx
│   │   │   └── PropertyFilters.tsx
│   │   │
│   │   ├── booking/               # Composants réservations
│   │   │   ├── BookingForm.tsx
│   │   │   ├── BookingCard.tsx
│   │   │   ├── BookingCalendar.tsx
│   │   │   └── BookingStatus.tsx
│   │   │
│   │   ├── search/                # Composants de recherche
│   │   │   ├── SearchBar.tsx
│   │   │   ├── SearchFilters.tsx
│   │   │   └── SearchResults.tsx
│   │   │
│   │   ├── maps/                  # Composants de cartes
│   │   │   ├── PropertyMap.tsx
│   │   │   └── LocationPicker.tsx
│   │   │
│   │   └── common/                # Composants communs
│   │       ├── ErrorBoundary.tsx
│   │       ├── Pagination.tsx
│   │       └── ImageUpload.tsx
│   │
│   ├── hooks/                     # Custom React hooks (SIMPLIFIÉS)
│   │   ├── useAuth.ts             # Hook authentification seulement
│   │   └── useLocalStorage.ts     # Hook localStorage basique
│   │
│   ├── store/                     # State management (SIMPLIFIÉ)
│   │   ├── authStore.ts           # Authentification seulement
│   │   └── index.ts
│   │
│   ├── services/                  # Services API directs (Axios)
│   │   ├── axios.js               # Configuration Axios de base
│   │   ├── authService.js         # Service authentification
│   │   ├── propertyService.js     # Service propriétés
│   │   ├── bookingService.js      # Service réservations
│   │   ├── userService.js         # Service utilisateurs
│   │   ├── paymentService.js      # Service paiements
│   │   ├── locationService.js     # Service localisation
│   │   ├── reviewService.js       # Service avis
│   │   ├── analyticsService.js    # Service analytics
│   │   ├── searchService.js       # Service recherche
│   │   └── adminService.js        # Service admin
│   │
│   ├── lib/                       # Utilitaires et configurations (SIMPLIFIÉ)
│   │   ├── constants.js           # Constantes
│   │   ├── utils.js               # Fonctions utilitaires basiques
│   │   └── formatters.js          # Formatage dates, prix
│   │
│   ├── types/                     # Types TypeScript (OPTIONNEL)
│   │   ├── property.js            # Types propriétés (si TS)
│   │   ├── booking.js             # Types réservations (si TS)
│   │   └── user.js                # Types utilisateurs (si TS)
│   │
│   ├── styles/                    # Styles globaux
│   │   ├── globals.css
│   │   ├── components.css
│   │   └── variables.css
│   │
│   └── middleware.ts              # Middleware Next.js
│
│ # ===================================
│ # EXEMPLE DE SERVICE SIMPLIFIÉ
│ # ===================================
│
│ # services/axios.js - Configuration de base
│ import axios from 'axios';
│
│ const API = axios.create({
│   baseURL: 'http://localhost:5000/api',
│   headers: {
│     'Content-Type': 'application/json'
│   }
│ });
│
│ export default API;
│
│ # services/propertyService.js - Service direct
│ import API from './axios';
│
│ export const propertyService = {
│   // Récupérer toutes les propriétés
│   getAll: () => API.get('/properties'),
│
│   // Récupérer une propriété par ID
│   getById: (id) => API.get(`/properties/${id}`),
│
│   // Créer une propriété
│   create: (data) => API.post('/properties', data),
│
│   // Modifier une propriété
│   update: (id, data) => API.put(`/properties/${id}`, data),
│
│   // Supprimer une propriété
│   delete: (id) => API.delete(`/properties/${id}`),
│
│   // Rechercher propriétés
│   search: (filters) => API.get('/properties', { params: filters })
│ };
│
│ # Utilisation dans un composant
│ import { propertyService } from '../services/propertyService';
│
│ function PropertyList() {
│   const [properties, setProperties] = useState([]);
│
│   useEffect(() => {
│     propertyService.getAll()
│       .then(response => setProperties(response.data))
│       .catch(error => console.error(error));
│   }, []);
│
│   return (
│     <div>
│       {properties.map(property => (
│         <div key={property.id}>{property.title}</div>
│       ))}
│     </div>
│   );
│ }