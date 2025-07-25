'use client';
import ProfileHeader from "@/components/sections/profile/ProfileHeader";
import ProfileStats from "@/components/sections/profile/ProfileStats";
import ProfileTabs from "@/components/sections/profile/ProfileTabs";

import { useEffect, useState } from "react";

interface DashboardPageProps {
  params: { userId: string }
}

export default function DashboardPage({ params }: DashboardPageProps) {
    const [userId, setUserId] = useState<string>("");

    useEffect(() => {
        if (params && params.userId) {
            setUserId(params.userId);
        }
    }, [params]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <ProfileHeader userId={userId} />
            <ProfileStats />
            <ProfileTabs />
        </div>
    );
};