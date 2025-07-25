import React from "react";

export interface ProfileStatCardProps {
    icon: React.ReactNode;
    title: string;
    value: string | number;
    description: string;
}

const ProfileStatCard: React.FC<ProfileStatCardProps> = ({
    icon,
    title,
    value,
    description,
}) => (
    <div className="ziggla-bg-secondary m-6 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center mb-2 space-x-2">
            {icon}
            <h3 className="font-bold dark:text-white">{title}</h3>
        </div>
        <p className="text-3xl font-bold dark:text-white">{value}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
    </div>
);

export default ProfileStatCard;