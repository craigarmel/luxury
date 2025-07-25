import React from "react";
import ProfileStatCard from "@/components/statistics/ProfileStatCard";

const stats = [
    {
        title: "Trips",
        value: 12,
        description: "Total bookings",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gold mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
            </svg>
        ),
    },
    {
        title: "Reviews",
        value: 8,
        description: "Reviews written",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gold mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
            </svg>
        ),
    },
    {
        title: "Saved",
        value: 24,
        description: "Saved properties",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gold mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
            </svg>
        ),
    },
    {
        title: "Rewards",
        value: "2,450",
        description: "Reward points",
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gold mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
            </svg>
        ),
    },
];

const ProfileStats: React.FC = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
            <ProfileStatCard
                key={stat.title}
                icon={stat.icon}
                title={stat.title}
                value={stat.value}
                description={stat.description}
            />
        ))}
    </div>
);

export default ProfileStats;