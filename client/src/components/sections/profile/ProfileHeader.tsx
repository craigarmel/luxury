import { Button } from '@/components/ui/Button';
import React from 'react';
import { Camera } from 'lucide-react';
import { useUserProfileStore } from '@/store/useUserProfileStore';
import Image from 'next/image';
import { Input } from '@/components/ui/Input';

interface ProfileHeaderProps {
    userId?: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ userId }) => {
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    // Use the store inside the component for better reactivity and SSR compatibility
    const { getPublicProfile, profile } = useUserProfileStore();
    React.useEffect(() => {
        if (userId) {
            getPublicProfile(userId);
        }
    }, [userId, getPublicProfile]);

    const handleAvatarUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleAvatarFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            console.log('Selected file:', file);
        }
    };

    return (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
            <div className="flex m-6 items-center mb-4 md:mb-0">
                <div className="relative w-20 h-20 rounded-full ziggla-bg-secondary flex items-center justify-center mr-6">
                    {profile?.avatar ? (
                        <Image
                            src={profile.avatar.url || ''}
                            alt={profile.user ? profile.user.firstName + ' ' + profile.user.lastName : 'User Avatar'}
                            className="w-20 h-20 rounded-full object-cover"
                        />
                    ) : (
                        <span className="ziggla-text-primary text-3xl">
                            {/* {profile?.user?.firstName ? profile.user.firstName.charAt(0) : ''} */}
                        </span>
                    )}
                    <Button
                        variant='outline'
                        className="absolute bottom-0 right-0 ziggla-bg-secondary rounded-full p-2 shadow-md hover:shadow-lg transition-shadow duration-200 w-9 h-9 flex items-center justify-center"
                        onClick={handleAvatarUploadClick}
                        type="button"
                        aria-label="Change avatar"
                        style={{ minWidth: 0 }}
                    >
                        <Camera className="w-4 h-4" />
                    </Button>
                    <Input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleAvatarFileChange}
                    />
                </div>
                <div>
                    <h1 className="text-3xl ziggla-text-primary font-serif font-bold mb-1 dark:text-white">
                        {/* {profile?.user.firstName + ' ' + profile?.user.lastName} */}
                    </h1>
                    <p className="ziggla-text-primary">
                        Member since {profile?.stats?.joinDate
                            ? new Date(profile.stats.joinDate).toLocaleDateString('default', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                            })
                            : 'N/A'}
                    </p>
                </div>
            </div>
            <div className="flex m-6 flex-wrap gap-3">
                <Button variant='ghost'>
                    Edit Profile
                </Button>
                <Button variant='outline'>
                    Share Profile
                </Button>
            </div>
        </div>
    );
};

export default ProfileHeader;