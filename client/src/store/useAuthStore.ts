import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const API_URL = process.env.NEXT_PUBLIC_API_URL

interface User {
    id: string
    email: string
    firstName: string
    lastName: string
    role: 'user' | 'host' | 'admin'
    avatar?: string
}

interface AuthResponse {
    user: User
    token: string
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
}

interface RegisterData {
    firstName: string
    lastName: string
    email: string
    password: string
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            login: async (email: string, password: string) => {
                set({ isLoading: true, error: null })
                try {
                    const response = await fetch(`${API_URL}/auth/login`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, password }),
                    })

                    if (!response.ok) {
                        const err = await response.json().catch(() => ({}))
                        throw new Error(err.message || 'Login failed')
                    }

                    const data: AuthResponse = await response.json()
                    set({
                        user: data.user,
                        token: data.token,
                        isAuthenticated: true,
                        isLoading: false,
                        error: null,
                    })
                } catch (error: any) {
                    set({ isLoading: false, error: error.message || 'Login failed' })
                    throw error
                }
            },

            register: async (userData: RegisterData) => {
                set({ isLoading: true, error: null })
                try {
                    const response = await fetch(`${API_URL}/auth/register`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(userData),
                    })

                    if (!response.ok) {
                        const err = await response.json().catch(() => ({}))
                        throw new Error(err.message || 'Registration failed')
                    }

                    const data: AuthResponse = await response.json()
                    set({
                        user: data.user,
                        token: data.token,
                        isAuthenticated: true,
                        isLoading: false,
                        error: null,
                    })
                } catch (error: any) {
                    set({ isLoading: false, error: error.message || 'Registration failed' })
                    throw error
                }
            },

            logout: () => {
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                    isLoading: false,
                    error: null,
                })
            },

            setUser: (user: User) => set({ user }),
            setToken: (token: string) => set({ token }),
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