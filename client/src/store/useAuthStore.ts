// import { create } from 'zustand'
// import { persist } from 'zustand/middleware'

// interface User {
//   id: string
//   email: string
//   firstName: string
//   lastName: string
//   role: 'user' | 'host' | 'admin'
//   avatar?: string
// }

// interface AuthState {
//   user: User | null
//   token: string | null
//   isAuthenticated: boolean
//   isLoading: boolean
//   login: (email: string, password: string) => Promise<void>
//   register: (userData: RegisterData) => Promise<void>
//   logout: () => void
//   setUser: (user: User) => void
//   setToken: (token: string) => void
// }

// interface RegisterData {
//   firstName: string
//   lastName: string
//   email: string
//   password: string
// }

// export const useAuthStore = create<AuthState>()(
//   persist(
//     (set, get) => ({
//       user: null,
//       token: null,
//       isAuthenticated: false,
//       isLoading: false,

//       login: async (email: string, password: string) => {
//         set({ isLoading: true })
//         try {
//           // Simulate API call
//           const response = await fetch('/api/auth/login', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ email, password }),
//           })
          
//           if (!response.ok) throw new Error('Login failed')
          
//           const data = await response.json()
          
//           set({
//             user: data.user,
//             token: data.token,
//             isAuthenticated: true,
//             isLoading: false,
//           })
//         } catch (error) {
//           set({ isLoading: false })
//           throw error
//         }
//       },

//       register: async (userData: RegisterData) => {
//         set({ isLoading: true })
//         try {
//           const response = await fetch('/api/auth/register', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(userData),
//           })
          
//           if (!response.ok) throw new Error('Registration failed')
          
//           const data = await response.json()
          
//           set({
//             user: data.user,
//             token: data.token,
//             isAuthenticated: true,
//             isLoading: false,
//           })
//         } catch (error) {
//           set({ isLoading: false })
//           throw error
//         }
//       },

//       logout: () => {
//         set({
//           user: null,
//           token: null,
//           isAuthenticated: false,
//         })
//       },

//       setUser: (user: User) => set({ user }),
//       setToken: (token: string) => set({ token }),
//     }),
//     {
//       name: 'auth-storage',
//       partialize: (state) => ({
//         user: state.user,
//         token: state.token,
//         isAuthenticated: state.isAuthenticated,
//       }),
//     }
//   )
// )