// import axios from 'axios'
// import { useAuthStore } from '@/store/useAuthStore'

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

// // Créer une instance Axios
// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   timeout: 10000,
// })

// // Intercepteur pour ajouter le token d'authentification
// api.interceptors.request.use(
//   (config) => {
//     const token = useAuthStore.getState().token
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   }
// )

// // Intercepteur pour gérer les erreurs de réponse
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // Token expiré ou invalide
//       useAuthStore.getState().logout()
//       window.location.href = '/auth/login'
//     }
//     return Promise.reject(error)
//   }
// )

// // Services API
// export const authAPI = {
//   login: (email: string, password: string) =>
//     api.post('/auth/login', { email, password }),
  
//   register: (userData: any) =>
//     api.post('/auth/register', userData),
  
//   me: () =>
//     api.get('/auth/me'),
  
//   logout: () =>
//     api.post('/auth/logout'),
// }

// export const propertyAPI = {
//   getAll: (params?: any) =>
//     api.get('/properties', { params }),
  
//   getById: (id: string) =>
//     api.get(`/properties/${id}`),
  
//   create: (data: any) =>
//     api.post('/properties', data),
  
//   update: (id: string, data: any) =>
//     api.put(`/properties/${id}`, data),
  
//   delete: (id: string) =>
//     api.delete(`/properties/${id}`),
  
//   search: (filters: any) =>
//     api.get('/properties/search', { params: filters }),
// }

// export default api