import React from "react";
import { Star } from 'lucide-react'
import Image from "next/image";
interface ReviewCardProps {
    reviewerName: string;
    reviewDate: string;
    rating: number; // 1 to 5
    comment: string;
    avatarUrl?: string;
    initials?: string;
    location?: string;
    property?: string;
    theme?: "light" | "dark";
    compact?: boolean;
    hideText?: boolean;
    hideProperty?: boolean;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
    reviewerName,
    reviewDate,
    rating,
    comment,
    avatarUrl,
    initials,
    location,
    property,
    theme = "light",
}) => {
    return (
        <div
            className={`bg-white/90 dark:bg-dark-800/80 rounded-2xl p-8 shadow-xl hover:shadow-2xl border ${
                theme === "dark" ? "border-gold-900" : "border-gold-100"
            } transition-all duration-300 flex flex-col ziggla-bg-secondary`}
        >
            <div className="flex items-center mb-5">
                {avatarUrl ? (
                    <Image
                        src={avatarUrl}
                        alt={reviewerName}
                        className="w-14 h-14 rounded-full object-cover mr-4 shadow-md border-2 border-gold-200 dark:border-gold-700"
                    />
                ) : (
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 via-gold-400 to-gold-600 flex items-center justify-center mr-4 shadow-md border-2 border-gold-200 dark:border-gold-700">
                        <span className="text-xl ziggla-text-primary font-extrabold">
                            {initials || reviewerName.charAt(0)}
                        </span>
                    </div>
                )}
                <div>
                    <h4 className="font-bold ziggla-text-primary text-lg">
                        {reviewerName}
                    </h4>
                    <p className="text-sm ziggla-text-secondary">
                        {location || reviewDate}
                    </p>
                </div>
            </div>

            <div className="flex mb-4">
                {[...Array(rating)].map((_, i) => (
                    <Star
                        key={i}
                        className="h-5 w-5 text-gold drop-shadow-sm"
                        fill="gold"
                    />
                ))}
            </div>

            <p className="mb-5 italic flex-1 ziggla-text-secondary">
                “{comment}”
            </p>

            {property && (
                <p className="text-sm text-black dark:text-gold-400 font-medium mt-auto ziggla-text-secondary">
                    Stayed at <span className="font-semibold">{property}</span>
                </p>
            )}
        </div>
    );
};