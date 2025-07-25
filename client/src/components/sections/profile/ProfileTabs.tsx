import React, { useState } from "react";
// import { ReviewCard } from "@/components/reviews/ReviewCard";
import TripCard from "@/components/bookings/TripCard";
// import { PropertyCard } from "@/components/features/PropertyCard";
// import SettingsTab from "@/components/settings/SettingsTab";
// import EditTab from "@/components/forms/edit/EditProfile";
// import { Profile } from "@/types/UserProfile";

const tabs = [
    { label: "My Trips" },
    { label: "Saved" },
    { label: "Reviews" },
    { label: "Edit Profile" },
    { label: "Account Settings" },
];

const tabClass =
    "py-4 px-1 border-b-2 ziggla-text-secondary font-medium text-sm focus:outline-none transition-colors";
const activeClass = "border-black dark:border-white text-black dark:text-white";
const inactiveClass =
    "border-transparent text-gray-500 hover:text-black dark:hover:text-white hover:border-gray-300";

const ProfileTabs: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="mb-8">
            <div className="border-b ziggla-text-primary border-gray-200 dark:border-gray-700">
                <nav className="flex justify-center space-x-8">
                    {tabs.map((tab, idx) => (
                        <button
                            key={tab.label}
                            className={`${tabClass} ${
                                activeTab === idx ? activeClass : inactiveClass
                            }`}
                            onClick={() => setActiveTab(idx)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>
            <div className="w-full mt-6">
                {tabs[activeTab].label === "My Trips" && (
                    <>
                        {(() => {
                            const trips = {
                                upcoming: [
                                    {
                                        title: "Santorini Cliffside Villa",
                                        location: "Santorini, Greece",
                                        checkIn: "2024-07-10",
                                        checkOut: "2024-07-15",
                                        guests: "2 Adults",
                                        countdown: "in 12 days",
                                    },
                                ],
                                past: [
                                    {
                                        title: "Parisian Loft",
                                        location: "Paris, France",
                                        checkIn: "2024-05-01",
                                        checkOut: "2024-05-05",
                                        guests: "1 Adult",
                                        countdown: "Completed",
                                    },
                                ],
                            };

                            return (
                                <>
                                    <div className="mb-6">
                                        <h3 className="text-xl font-semibold mb-2">Upcoming Trips</h3>
                                        {trips.upcoming.map((trip, idx) => (
                                            <TripCard
                                                image="/villa.jpg"
                                                key={trip.title + idx}
                                                {...trip}
                                                onDetailsClick={() => alert('Trip Details clicked')}
                                                onMenuClick={() => alert('Menu clicked')}
                                            />
                                        ))}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">Past Trips</h3>
                                        {trips.past.map((trip, idx) => (
                                            <TripCard
                                                image="/villa.jpg"
                                                key={trip.title + idx}
                                                {...trip}
                                                onDetailsClick={() => alert('Trip Details clicked')}
                                                onMenuClick={() => alert('Menu clicked')}
                                            />
                                        ))}
                                    </div>
                                </>
                            );
                        })()}
                    </>
                )}
                {/* {tabs[activeTab].label === "Saved" && (
                    <section>
                        <h2 className="text-xl font-semibold mb-4">Saved Properties by Users</h2>
                        <div className="flex flex-wrap gap-4 justify-center">
                            {(() => {
                                // Mock properties data
                                const savedProperties: Array<{
                                    id: string;
                                    title: string;
                                    location: string;
                                    rating: number;
                                    description: string;
                                    badge?: { type: "gold" | "white"; text: string };
                                    image: string;
                                    price: number;
                                    currency: string;
                                }> = [
                                    {
                                        id: "1",
                                        title: "Luxury Beachfront Villa",
                                        location: "Malibu, California",
                                        rating: 4.8,
                                        description: "A stunning villa with ocean views and private beach access.",
                                        badge: { type: "gold", text: "Top Rated" },
                                        image: "/villa.jpg",
                                        price: 1200,
                                        currency: "USD",
                                    },
                                    {
                                        id: "2",
                                        title: "Modern Apartment",
                                        location: "New York, NY",
                                        rating: 4.5,
                                        description: "Central location, modern amenities, and skyline views.",
                                        badge: { type: "white", text: "New" },
                                        image: "/villa.jpg",
                                        price: 800,
                                        currency: "USD",
                                    },
                                ];

                                return savedProperties.length === 0 ? (
                                    <p className="text-gray-500">No saved properties yet.</p>
                                ) : (
                                    // savedProperties.map((property) => (
                                    //     <PropertyCard
                                    //         key={property.id}
                                    //         property={{
                                    //             ...property,
                                    //             stats: {
                                    //                 totalBookings: 0,
                                    //                 viewCount: 0,
                                    //                 rating: PropertyRating,
                                    //             },
                                    //             description: property.description ?? "No description available.",
                                    //             badge:
                                    //                 property.badge &&
                                    //                 (property.badge.type === "white" || property.badge.type === "gold")
                                    //                     ? property.badge
                                    //                     : undefined,
                                    //         }}
                                    //     />
                                    // ))
                                // );
                            })()}
                        </div>
                    </section>
                )}
                {tabs[activeTab].label === "Reviews" && (
                    <div>
                        <ReviewCard
                            location="Paris, France"
                            initials="JD"
                            rating={5}
                            property="Charming Studio in Montmartre"
                            compact
                            hideText
                            hideProperty
                            reviewerName="John Doe"
                            reviewDate="March 15, 2023"
                            comment="Absolutely loved my stay! The location was perfect and the host was incredibly helpful."
                        />
                    </div>
                )}
                {/* {tabs[activeTab].label === "Account Settings" && (
                    <SettingsTab profile={undefined} onUpdate={function (fn: (prev: any) => any): void {
                        throw new Error("Function not implemented.");
                    } } />
                )}
                {tabs[activeTab].label === "Edit Profile" && (
                    <EditTab profile={undefined} onUpdate={function (updatedProfile: Profile): void {
                        throw new Error("Function not implemented.");
                    } } />
                )} */}
            </div>
        </div>
    );
};

export default ProfileTabs;
