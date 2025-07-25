import React from "react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

interface TripCardProps {
    image?: string;
    title: string;
    location: string;
    checkIn: string;
    checkOut: string;
    guests: string;
    countdown: string;
    onDetailsClick?: () => void;
    onMenuClick?: () => void;
}

const TripCard: React.FC<TripCardProps> = ({
    image,
    title,
    location,
    checkIn,
    checkOut,
    guests,
    countdown,
    onDetailsClick,
    onMenuClick,
}) => {
    return (
        <div className="booking-card ziggla-bg-secondary rounded-xl overflow-hidden shadow-sm  border-gray-200 dark:border-black">
            <div className="h-48 bg-gray-300 dark:bg-gray-700 relative">
                {image ? (
                    <Image
                        src={image}
                        alt={title}
                        width={1000}
                        height={1000}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 400 200"
                        className="w-full h-full"
                    >
                        <rect
                            width="400"
                            height="200"
                            fill="#E5E5E5"
                            className="dark:fill-gray-700"
                        ></rect>
                        <text
                            x="200"
                            y="100"
                            fontFamily="Arial"
                            fontSize="20"
                            textAnchor="middle"
                            fill="#888888"
                            className="ziggla-text-secondary dark:fill-gray-400"
                        >
                            {title}
                        </text>
                    </svg>
                )}
                <div className="absolute top-4 right-4 bg-white dark:bg-darkbg-light px-3 py-1 rounded-full text-sm font-medium shadow-md ziggla-text-secondary">
                    {countdown}
                </div>
            </div>
            <div className="m-6">
                <h3 className="text-xl font-bold mb-2 ziggla-text-secondary">{title}</h3>
                <p className="mb-4">{location}</p>

                <div className="flex justify-between items-center mb-4">
                    <div>
                        <p className="text-sm ziggla-text-secondary">Check-in</p>
                        <p className="font-medium ziggla-text-secondary">{checkIn}</p>
                    </div>
                    <div>
                        <p className="text-sm ziggla-text-secondary">Check-out</p>
                        <p className="font-medium ziggla-text-secondary">{checkOut}</p>
                    </div>
                    <div>
                        <p className="text-sm ziggla-text-secondary">Guests</p>
                        <p className="font-medium ziggla-text-secondary">{guests}</p>
                    </div>
                </div>

                <div className="flex space-x-3">
                    <Button
                    variant="outline"
                        onClick={onDetailsClick}
                        className="ziggla-text-secondary"
                    >
                        Trip Details
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={onMenuClick}
                        className="ziggla-text-secondary"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TripCard;