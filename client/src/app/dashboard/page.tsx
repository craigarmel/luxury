'use client';
import ProfileHeader from "@/components/sections/profile/ProfileHeader";
import ProfileStats from "@/components/sections/profile/ProfileStats";
import ProfileTabs from "@/components/sections/profile/ProfileTabs";

import { useParams } from "next/navigation";

export default function DashboardPage() {
    const params = useParams();
    const userId = params?.userId as string;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <ProfileHeader userId={userId} />
            <ProfileStats />
            <ProfileTabs />
        </div>
    );
}