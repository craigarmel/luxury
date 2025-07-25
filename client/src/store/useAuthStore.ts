import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'
// import router from 'next/dist/shared/lib/router/router'

interface User {
  token: string
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'user' | 'host' | 'admin'
  avatar?: string
  isVerified: boolean
  createdAt: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => void
  setUser: (user: User) => void
  setToken: (token: string) => void
  clearError: () => void
  refreshToken: () => Promise<void>
}

interface RegisterData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  role?: 'user' | 'host'
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null })
        try {
          const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, password })
          const data = response.data
          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          })
          if (typeof window !== 'undefined') {
            window.location.href = '/'
          }
        } catch (error: unknown) {
          let errorMessage = 'Login failed'
          if (axios.isAxiosError(error)) {
            errorMessage = error.response?.data?.message || error.message || errorMessage
          } else if (error instanceof Error) {
            errorMessage = error.message
          }
          set({ 
            isLoading: false,
            error: errorMessage
          })
          throw error
        }
      },

      register: async (userData: RegisterData) => {
        set({ isLoading: true, error: null })
        try {
          const response = await axios.post(`${API_BASE_URL}/auth/register`, userData)
          const data = response.data
          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          })
          if (typeof window !== 'undefined') {
            window.location.href = '/'
          }
        } catch (error: unknown) {
          let errorMessage = 'Registration failed'
          if (axios.isAxiosError(error)) {
            errorMessage = error.response?.data?.message || error.message || errorMessage
          } else if (error instanceof Error) {
            errorMessage = error.message
          }
          set({ 
            isLoading: false,
            error: errorMessage
          })
          throw error
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        })
        localStorage.removeItem('auth-storage')
      },

      setUser: (user: User) => set({ user }),
      setToken: (token: string) => set({ token }),
      clearError: () => set({ error: null }),

      refreshToken: async () => {
        const currentToken = get().token
        if (!currentToken) return

        try {
          const response = await axios.post(
            `${API_BASE_URL}/auth/refresh`,
            {},
            {
              headers: {
                'Authorization': `Bearer ${currentToken}`,
                'Content-Type': 'application/json'
              }
            }
          )
          const data = response.data
          set({ token: data.token })
        } catch (error) {
            console.error('Failed to refresh token:', error);
          get().logout()
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
