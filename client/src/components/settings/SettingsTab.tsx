import React, { useState } from 'react';
import { Bell, Shield, Globe, Save } from 'lucide-react';
import { UserProfile } from '@/types/UserProfile';
import { Input } from '../ui/Input';

type Preferences = {
  language: string;
  currency: string;
  timezone: string;
  notifications: {
    email: {
      bookings: boolean;
      promotions: boolean;
      updates: boolean;
      reminders: boolean;
    };
    push: {
      bookings: boolean;
      messages: boolean;
      promotions: boolean;
    };
    sms: {
      bookings: boolean;
      emergencies: boolean;
    };
  };
  privacy: {
    profileVisibility: string;
    showEmail: boolean;
    showPhone: boolean;
    allowMessages: boolean;
  };
  travel: {
    accommodationType: string[];
    priceRange: { min: number; max: number };
    amenities: string[];
    accessibility: {
      wheelchairAccessible: boolean;
      visualAid: boolean;
      hearingAid: boolean;
    };
  };
};

type SettingsTabProps = {
  profile: UserProfile;
  onUpdate: (fn: (prev: UserProfile) => UserProfile) => void;
};

const SettingsTab: React.FC<SettingsTabProps> = ({ profile, onUpdate }) => {
  const [preferences, setPreferences] = useState<Preferences>({
    language: profile?.preferences?.language || 'en',
    currency: profile?.preferences?.currency || 'USD',
    timezone: profile?.preferences?.timezone || 'UTC',
    notifications: {
      email: {
        bookings: profile?.preferences?.notifications?.email?.bookings ?? true,
        promotions: profile?.preferences?.notifications?.email?.promotions ?? true,
        updates: profile?.preferences?.notifications?.email?.updates ?? true,
        reminders: profile?.preferences?.notifications?.email?.reminders ?? true,
      },
      push: {
        bookings: profile?.preferences?.notifications?.push?.bookings ?? true,
        messages: profile?.preferences?.notifications?.push?.messages ?? true,
        promotions: profile?.preferences?.notifications?.push?.promotions ?? false,
      },
      sms: {
        bookings: profile?.preferences?.notifications?.sms?.bookings ?? false,
        emergencies: profile?.preferences?.notifications?.sms?.emergencies ?? true,
      },
    },
    privacy: {
      profileVisibility: profile?.preferences?.privacy?.profileVisibility || 'hosts_only',
      showEmail: profile?.preferences?.privacy?.showEmail ?? false,
      showPhone: profile?.preferences?.privacy?.showPhone ?? false,
      allowMessages: profile?.preferences?.privacy?.allowMessages ?? true,
    },
    travel: {
      accommodationType: profile?.preferences?.travel?.accommodationType || [],
      priceRange: {
        min: profile?.preferences?.travel?.priceRange?.min || 0,
        max: profile?.preferences?.travel?.priceRange?.max || 1000,
      },
      amenities: profile?.preferences?.travel?.amenities || [],
      accessibility: {
        wheelchairAccessible: profile?.preferences?.travel?.accessibility?.wheelchairAccessible ?? false,
        visualAid: profile?.preferences?.travel?.accessibility?.visualAid ?? false,
        hearingAid: profile?.preferences?.travel?.accessibility?.hearingAid ?? false,
      },
    },
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: string; text: string }>({ type: '', text: '' });

  const handlePreferenceChange = <T extends keyof Preferences, K extends keyof Preferences[T]>(
    section: T,
    field: K,
    value: string | boolean | number
  ) => {
    setPreferences((prev) => ({
      ...prev,
      [section]: {
        ...((prev[section] as object) || {}),
        [field]: value,
      },
    }));
  };

  const handleNestedChange = (
    section: keyof Preferences,
    subsection: string,
    field: string,
    value: string | boolean | number
  ) => {
    setPreferences((prev) => ({
      ...prev,
      [section]: {
        ...((prev[section] as object) || {}),
        [subsection]: {
          ...((prev[section] as Record<string, unknown>)[subsection] || {}),
          [field]: value,
        },
      },
    }));
  };

  const handleArrayChange = (
    section: keyof Preferences,
    field: string,
    value: string,
    checked: boolean
  ) => {
    setPreferences((prev) => {
      const currentArray = ((prev[section] as Record<string, unknown>)[field] as string[] || []);
      if (checked) {
        return {
          ...prev,
          [section]: {
            ...((prev[section] as object) || {}),
            [field]: [...currentArray, value],
          },
        };
      } else {
        return {
          ...prev,
          [section]: {
            ...((prev[section] as object) || {}),
            [field]: currentArray.filter((item: string) => item !== value),
          },
        };
      }
    });
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('/api/profile/preferences', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ preferences }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Preferences updated successfully!' });
        onUpdate((prev: UserProfile) => ({ ...prev, preferences: data.data }));
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to update preferences' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again. ' + JSON.stringify(error) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {message.text && (
        <div
          className={`p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-50 text-green-700'
              : 'bg-red-50 text-red-700'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* General Settings */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Globe className="w-5 h-5 mr-2" />
          General Settings
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <select
              value={preferences.language}
              onChange={(e) =>
                setPreferences((prev) => ({ ...prev, language: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="it">Italiano</option>
              <option value="pt">Português</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Currency
            </label>
            <select
              value={preferences.currency}
              onChange={(e) =>
                setPreferences((prev) => ({ ...prev, currency: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="CAD">CAD (C$)</option>
              <option value="AUD">AUD (A$)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Timezone
            </label>
            <select
              value={preferences.timezone}
              onChange={(e) =>
                setPreferences((prev) => ({ ...prev, timezone: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="UTC">UTC</option>
              <option value="America/New_York">Eastern Time</option>
              <option value="America/Chicago">Central Time</option>
              <option value="America/Denver">Mountain Time</option>
              <option value="America/Los_Angeles">Pacific Time</option>
              <option value="Europe/London">London Time</option>
              <option value="Europe/Paris">Paris Time</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Bell className="w-5 h-5 mr-2" />
          Notification Preferences
        </h3>
        {/* Email Notifications */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Email Notifications</h4>
          <div className="space-y-3">
            {[
              { key: 'bookings', label: 'Booking confirmations and updates' },
              { key: 'promotions', label: 'Special offers and promotions' },
              { key: 'updates', label: 'Platform updates and news' },
              { key: 'reminders', label: 'Trip reminders and check-in info' },
            ].map((item) => (
              <div key={item.key} className="flex items-center">
                <input
                  type="checkbox"
                  id={`email-${item.key}`}
                  checked={preferences.notifications.email[item.key as keyof typeof preferences.notifications.email]}
                  onChange={(e) =>
                    handleNestedChange('notifications', 'email', item.key, e.target.checked)
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor={`email-${item.key}`} className="ml-3 text-sm text-gray-700">
                  {item.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        {/* Push Notifications */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Push Notifications</h4>
          <div className="space-y-3">
            {[
              { key: 'bookings', label: 'Booking confirmations and updates' },
              { key: 'messages', label: 'New messages from hosts' },
              { key: 'promotions', label: 'Special offers and promotions' },
            ].map((item) => (
              <div key={item.key} className="flex items-center">
                <Input
                  type="checkbox"
                  id={`push-${item.key}`}
                  checked={preferences.notifications.push[item.key as keyof typeof preferences.notifications.push]}
                  onChange={(e) =>
                    handleNestedChange('notifications', 'push', item.key, e.target.checked)
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor={`push-${item.key}`} className="ml-3 text-sm text-gray-700">
                  {item.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        {/* SMS Notifications */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">SMS Notifications</h4>
          <div className="space-y-3">
            {[
              { key: 'bookings', label: 'Booking confirmations' },
              { key: 'emergencies', label: 'Emergency notifications' },
            ].map((item) => (
              <div key={item.key} className="flex items-center">
                <Input
                  type="checkbox"
                  id={`sms-${item.key}`}
                  checked={preferences.notifications.sms[item.key as keyof typeof preferences.notifications.sms]}
                  onChange={(e) =>
                    handleNestedChange('notifications', 'sms', item.key, e.target.checked)
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor={`sms-${item.key}`} className="ml-3 text-sm text-gray-700">
                  {item.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Privacy Settings */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          Privacy Settings
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Visibility
            </label>
            <select
              value={preferences.privacy.profileVisibility}
              onChange={(e) =>
                handlePreferenceChange('privacy', 'profileVisibility', e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="public">Public - Anyone can see your profile</option>
              <option value="hosts_only">Hosts only - Only hosts can see your profile</option>
              <option value="private">Private - Your profile is hidden</option>
            </select>
          </div>
          <div className="space-y-3">
            {[
              { key: 'showEmail', label: 'Show email address on public profile' },
              { key: 'showPhone', label: 'Show phone number to hosts' },
              { key: 'allowMessages', label: 'Allow messages from hosts' },
            ].map((item) => (
              <div key={item.key} className="flex items-center">
                <input
                  type="checkbox"
                  id={`privacy-${item.key}`}
                  checked={Boolean(preferences.privacy[item.key as keyof typeof preferences.privacy])}
                  onChange={(e) =>
                    handlePreferenceChange('privacy', item.key as keyof typeof preferences.privacy, e.target.checked)
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor={`privacy-${item.key}`} className="ml-3 text-sm text-gray-700">
                  {item.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Travel Preferences */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Travel Preferences</h3>
        {/* Accommodation Types */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Preferred Accommodation Types</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {['apartment', 'house', 'villa', 'penthouse', 'studio'].map((type) => (
              <div key={type} className="flex items-center">
                <input
                  type="checkbox"
                  id={`accom-${type}`}
                  checked={preferences.travel.accommodationType.includes(type)}
                  onChange={(e) =>
                    handleArrayChange('travel', 'accommodationType', type, e.target.checked)
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor={`accom-${type}`} className="ml-3 text-sm text-gray-700 capitalize">
                  {type}
                </label>
              </div>
            ))}
          </div>
        </div>
        {/* Price Range */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Price Range (per night)</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Min Price</label>
              <input
                type="number"
                value={preferences.travel.priceRange.min}
                onChange={(e) =>
                  handleNestedChange('travel', 'priceRange', 'min', parseInt(e.target.value) || 0)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Max Price</label>
              <input
                type="number"
                value={preferences.travel.priceRange.max}
                onChange={(e) =>
                  handleNestedChange('travel', 'priceRange', 'max', parseInt(e.target.value) || 1000)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="0"
              />
            </div>
          </div>
        </div>
        {/* Preferred Amenities */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Preferred Amenities</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['wifi', 'parking', 'pool', 'gym', 'kitchen', 'balcony', 'tv', 'ac'].map((amenity) => (
              <div key={amenity} className="flex items-center">
                <input
                  type="checkbox"
                  id={`amenity-${amenity}`}
                  checked={preferences.travel.amenities.includes(amenity)}
                  onChange={(e) =>
                    handleArrayChange('travel', 'amenities', amenity, e.target.checked)
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor={`amenity-${amenity}`} className="ml-3 text-sm text-gray-700 capitalize">
                  {amenity === 'wifi'
                    ? 'Wi-Fi'
                    : amenity === 'ac'
                    ? 'A/C'
                    : amenity === 'tv'
                    ? 'TV'
                    : amenity}
                </label>
              </div>
            ))}
          </div>
        </div>
        {/* Accessibility */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Accessibility Needs</h4>
          <div className="space-y-3">
            {[
              { key: 'wheelchairAccessible', label: 'Wheelchair accessible' },
              { key: 'visualAid', label: 'Visual aid accommodations' },
              { key: 'hearingAid', label: 'Hearing aid accommodations' },
            ].map((item) => (
              <div key={item.key} className="flex items-center">
                <input
                  type="checkbox"
                  id={`accessibility-${item.key}`}
                  checked={preferences.travel.accessibility[item.key as keyof typeof preferences.travel.accessibility]}
                  onChange={(e) =>
                    handleNestedChange('travel', 'accessibility', item.key, e.target.checked)
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor={`accessibility-${item.key}`} className="ml-3 text-sm text-gray-700">
                  {item.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Save Button */}
      <div className="flex justify-end pt-6 border-t border-gray-200">
        <button
          onClick={handleSave}
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center disabled:opacity-50"
        >
          {loading ? (
            <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          {loading ? 'Saving...' : 'Save Preferences'}
        </button>
      </div>
    </div>
  );
};

export default SettingsTab;