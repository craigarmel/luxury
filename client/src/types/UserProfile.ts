export type Gender = 'male' | 'female' | 'other' | 'prefer_not_to_say';

export interface Address {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
}

export interface Avatar {
    url?: string;
    publicId?: string;
    uploadedAt?: Date | string;
}

export interface Verification {
    status: 'unverified' | 'pending' | 'verified' | 'rejected';
    documents?: {
        type: 'passport' | 'driver_license' | 'national_id' | 'utility_bill';
        url?: string;
        publicId?: string;
        uploadedAt?: Date | string;
        verifiedAt?: Date | string;
        rejectionReason?: string;
    }[];
    submittedAt?: Date | string;
    verifiedAt?: Date | string;
    verifiedBy?: string;
    rejectionReason?: string;
}

export interface Preferences {
    language?: string;
    currency?: string;
    timezone?: string;
    notifications?: {
        email?: {
            bookings?: boolean;
            promotions?: boolean;
            updates?: boolean;
            reminders?: boolean;
        };
        push?: {
            bookings?: boolean;
            messages?: boolean;
            promotions?: boolean;
        };
        sms?: {
            bookings?: boolean;
            emergencies?: boolean;
        };
    };
    privacy?: {
        profileVisibility?: 'public' | 'hosts_only' | 'private';
        showEmail?: boolean;
        showPhone?: boolean;
        allowMessages?: boolean;
    };
    travel?: {
        accommodationType?: ('apartment' | 'house' | 'villa' | 'penthouse' | 'studio')[];
        priceRange?: {
            min?: number;
            max?: number;
        };
        amenities?: (
            | 'wifi'
            | 'parking'
            | 'pool'
            | 'gym'
            | 'kitchen'
            | 'balcony'
            | 'tv'
            | 'ac'
        )[];
        accessibility?: {
            wheelchairAccessible?: boolean;
            visualAid?: boolean;
            hearingAid?: boolean;
        };
    };
}

export interface Social {
    website?: string;
    linkedin?: string;
    instagram?: string;
    facebook?: string;
}

export interface HostInfo {
    isHost?: boolean;
    hostSince?: Date | string;
    responseRate?: number;
    responseTime?: 'within_hour' | 'few_hours' | 'day' | 'few_days';
    languages?: string[];
    superhost?: boolean;
    verification?: {
        phone?: boolean;
        email?: boolean;
        identity?: boolean;
        background?: boolean;
    };
}

export interface Stats {
    totalBookings?: number;
    totalReviews?: number;
    averageRating?: number;
    joinDate?: Date | string;
    lastActive?: Date | string;
}

export interface UserProfile {
    user: UserData
    userId: string;
    bio?: string;
    dateOfBirth?: Date | string;
    gender?: Gender;
    phone?: string;
    alternateEmail?: string;
    address?: Address;
    avatar?: Avatar;
    verification?: Verification;
    preferences?: Preferences;
    social?: Social;
    hostInfo?: HostInfo;
    stats?: Stats;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}
export interface UserData {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
}
// For backwards compatibility
export type Profile = UserProfile;
