import { create } from 'zustand';
import axios from 'axios';
import type * as UserProfileTypes from '@/types/UserProfile';
type UserProfile = UserProfileTypes.UserProfile;

interface UseUserProfileStore {
    profile: UserProfile | null;
    publicProfile: UserProfile | null;
    verificationStatus: string | null;
    loading: boolean;
    error: string | null;
    getProfile: () => Promise<void>;
    updateProfile: (data: Partial<UserProfile>) => Promise<void>;
    uploadAvatar: (file: File) => Promise<void>;
    deleteAvatar: () => Promise<void>;
    submitIdentityVerification: (data: Partial<UserProfile>) => Promise<void>;
    getVerificationStatus: () => Promise<void>;
    updatePreferences: (prefs: Partial<UserProfile['preferences']>) => Promise<void>;
    getPublicProfile: (userId: string) => Promise<void>;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const useUserProfileStore = create<UseUserProfileStore>((set) => ({
    profile: null,
    publicProfile: null,
    verificationStatus: null,
    loading: false,
    error: null,

    async getProfile() {
        set({ loading: true, error: null });
        try {
            const res = await axios.get<UserProfile>(`${API_BASE_URL}/users`);
            set({ profile: res.data, loading: false });
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                set({ error: err.message, loading: false });
            } else {
                set({ error: 'An unexpected error occurred', loading: false });
            }
        }
    },

    async updateProfile(data) {
        set({ loading: true, error: null });
        try {
            const res = await axios.put<UserProfile>(`${API_BASE_URL}/users`, data);
            set({ profile: res.data, loading: false });
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                set({ error: err.message, loading: false });
            } else {
                set({ error: 'An unexpected error occurred', loading: false });
            }
        }
    },

    async uploadAvatar(file) {
        set({ loading: true, error: null });
        try {
            const formData = new FormData();
            formData.append('avatar', file);
            const res = await axios.post<{ avatarUrl: string }>(`${API_BASE_URL}/users/avatar`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            set((state) => ({
                profile: state.profile ? { ...state.profile, avatarUrl: res.data.avatarUrl } : null,
                loading: false,
            }));
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                set({ error: err.message, loading: false });
            } else {
                set({ error: 'An unexpected error occurred', loading: false });
            }
        }
    },

    async deleteAvatar() {
        set({ loading: true, error: null });
        try {
            await axios.delete(`${API_BASE_URL}/users/avatar`);
            set((state) => ({
                profile: state.profile ? { ...state.profile, avatarUrl: undefined } : null,
                loading: false,
            }));
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                set({ error: err.message, loading: false });
            } else {
                set({ error: 'An unexpected error occurred', loading: false });
            }
        }
    },

    async submitIdentityVerification(data) {
        set({ loading: true, error: null });
        try {
            await axios.post(`${API_BASE_URL}/users/verify-identity`, data);
            set({ loading: false });
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                set({ error: err.message, loading: false });
            } else {
                set({ error: 'An unexpected error occurred', loading: false });
            }
        }
    },

    async getVerificationStatus() {
        set({ loading: true, error: null });
        try {
            const res = await axios.get<{ status: string }>(`${API_BASE_URL}/users/verification-status`);
            set({ verificationStatus: res.data.status, loading: false });
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                set({ error: err.message, loading: false });
            } else {
                set({ error: 'An unexpected error occurred', loading: false });
            }
        }
    },

    async updatePreferences(prefs) {
        set({ loading: true, error: null });
        try {
            const res = await axios.put<{ preferences: UserProfile['preferences'] }>(
                `${API_BASE_URL}/users/preferences`,
                prefs
            );
            set((state) => ({
                profile: state.profile ? { ...state.profile, preferences: res.data.preferences } : null,
                loading: false,
            }));
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                set({ error: err.message, loading: false });
            } else {
                set({ error: 'An unexpected error occurred', loading: false });
            }
        }
    },

    async getPublicProfile(userId) {
        set({ loading: true, error: null });
        try {
            const res = await axios.get<UserProfile>(`${API_BASE_URL}/users/public/${userId}`);
            set({ publicProfile: res.data, loading: false });
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                set({ error: err.message, loading: false });
            } else {
                set({ error: 'An unexpected error occurred', loading: false });
            }
        }
    },
}));