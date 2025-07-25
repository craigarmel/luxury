import UpcomingTripCard from "@/components/bookings/UpcomingTripCard.tsx";
import React from "react";

const upcomingTrips = [
    {
        title: "Caldera View Penthouse",
        location: "Santorini, Greece",
        checkIn: "Jul 15, 2023",
        checkOut: "Jul 22, 2023",
        guests: "2 guests",
        badge: "In 2 weeks",
        imageAlt: "Caldera View Penthouse",
    },
    {
        title: "Oia Sunset Penthouse",
        location: "Santorini, Greece",
        checkIn: "Aug 10, 2023",
        checkOut: "Aug 17, 2023",
        guests: "2 guests",
        badge: "In 1 month",
        imageAlt: "Oia Sunset Penthouse",
    },
];

const UpcomingTrips: React.FC = () => (
    <div className="mb-12">
        <h2 className="text-2xl font-serif font-bold mb-6 dark:text-white">Upcoming Trips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingTrips.map((trip, idx) => (
                <UpcomingTripCard countdown={""} key={idx} {...trip} />
            ))}
        </div>
    </div>
);

export default UpcomingTrips;
