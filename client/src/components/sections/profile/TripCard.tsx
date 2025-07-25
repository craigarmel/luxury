import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
const Trips = [
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

const TripCard: React.FC = () => (
    <div className="mb-12">
        <h2 className="text-2xl font-serif font-bold mb-6 dark:text-white">Upcoming Trips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Trips.map((trip, idx) => (
                <div key={idx} className="bg-white dark:bg-dark-800 rounded-lg shadow-md p-6">
                    <div className="relative mb-4">
                        <Image
                            src={`/images/trips/${trip.imageAlt.toLowerCase().replace(/ /g, "-")}.jpg`}
                            alt={trip.imageAlt}
                            className="w-full h-48 object-cover rounded-lg"
                        />
                        <span className="absolute top-2 left-2 bg-primary-600 text-white px-3 py-1 rounded-full text-sm">
                            {trip.badge}
                        </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{trip.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{trip.location}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                        {trip.checkIn} - {trip.checkOut} • {trip.guests}
                    </p>
                    <Button className="mt-4 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors">
                        View Details
                    </Button>
                </div>
            ))}
        </div>
    </div>
);

export default TripCard;
