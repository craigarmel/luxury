"use client";

import { usePropertyStore } from "@/store/usePropertyStore";
import { Property } from "@/types/Property";
import React from "react";

interface BookingCardProps {
    propertyId: string;
}

const BookingCard: React.FC<BookingCardProps> = ({ propertyId }) => {
    const { getPropertyById, isLoading } = usePropertyStore();
    const [property, setProperty] = React.useState<Property | null>(null);

    React.useEffect(() => {
        const fetchProperty = async () => {
            const data = await getPropertyById(propertyId);
            setProperty(data);
        };
        if (propertyId) {
            fetchProperty();
        }
    }, [getPropertyById, propertyId]);

    if (isLoading || !property) {
        return (
            <div className="w-full lg:w-1/3">
                <div className="sticky top-24">
                    <div className="booking-card ziggla-bg-secondary rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
                        <p>Loading...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full lg:w-1/3">
            <div className="sticky top-24">
                <div className="booking-card ziggla-bg-secondary rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <p className="text-2xl font-bold ziggla-texte-secondary">
                                <span className="gold-text">${property.pricing.basePrice}</span>{" "}
                                <span className="text-base ziggla-texte-secondary opacity-70">night</span>
                            </p>
                        </div>
                        <div className="flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-gold"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-sm font-medium ml-1 ziggla-texte-secondary">{property.stats.rating.overall}</span>
                            <span className="text-sm ziggla-texte-secondary opacity-70 ml-1">({property.stats.rating.reviewCount})</span>
                        </div>
                    </div>

                    <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden mb-4">
                        <div className="grid grid-cols-2">
                            <div className="p-4 border-r border-b border-gray-300 dark:border-gray-700">
                                <label className="block text-xs font-medium ziggla-texte-secondary opacity-70 mb-1">
                                    CHECK-IN
                                </label>
                                <input
                                    type="date"
                                    className="text-sm font-medium ziggla-texte-secondary bg-transparent focus:outline-none"
                                    value={property.checkInDate || new Date().toISOString().split("T")[0]}
                                    onChange={e => {
                                        const checkInDate = e.target.value;
                                        setProperty((prev) => ({
                                            ...prev,
                                            checkInDate,
                                            checkOutDate:
                                                prev?.checkOutDate && prev.checkOutDate < checkInDate
                                                    ? ""
                                                    : prev?.checkOutDate,
                                        } as Property));
                                    }}
                                />
                            </div>
                            <div className="p-4 border-b border-gray-300 dark:border-gray-700">
                                <label className="block text-xs font-medium ziggla-texte-secondary opacity-70 mb-1">
                                    CHECKOUT
                                </label>
                                <input
                                    type="date"
                                    className="text-sm font-medium ziggla-texte-secondary bg-transparent focus:outline-none"
                                    value={property.checkOutDate || new Date().toISOString().split("T")[0]}
                                    min={property.checkInDate || new Date().toISOString().split("T")[0]}
                                    onChange={e => {
                                        const checkOutDate = e.target.value;
                                        setProperty((prev: Property | null) => ({
                                            ...prev,
                                            checkOutDate,
                                        } as Property));
                                    }}
                                />
                            </div>
                            <div className="p-4 col-span-2">
                                <label className="block text-xs font-medium ziggla-texte-secondary opacity-70 mb-1">
                                    GUESTS
                                </label>
                                <select className="w-full bg-transparent text-sm font-medium focus:outline-none ziggla-texte-secondary">
                                    <option>2 guests</option>
                                    <option>1 guest</option>
                                    <option>3 guests</option>
                                    <option>4 guests</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <button className="w-full py-3 bg-gold text-white font-bold rounded-lg hover:bg-gold-dark transition mb-4">
                        Reserve
                    </button>
                    <p className="text-center text-sm ziggla-texte-secondary opacity-70 mb-6">
                        You won&apos;t be charged yet
                    </p>

                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span className="ziggla-texte-secondary underline">
                                ${property.pricing.basePrice} x {property.checkInDate && property.checkOutDate
                                    ? Math.max(
                                        1,
                                        Math.ceil(
                                            (new Date(property.checkOutDate).getTime() - new Date(property.checkInDate).getTime()) /
                                                (1000 * 60 * 60 * 24)
                                        )
                                    )
                                    : 1
                                } nights
                            </span>
                            <span className="ziggla-texte-secondary">
                                ${property.checkInDate && property.checkOutDate
                                    ? property.pricing.basePrice *
                                      Math.max(
                                          1,
                                          Math.ceil(
                                              (new Date(property.checkOutDate).getTime() -
                                                  new Date(property.checkInDate).getTime()) /
                                                  (1000 * 60 * 60 * 24)
                                          )
                                      )
                                    : property.pricing.basePrice}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="ziggla-texte-secondary underline">Cleaning fee</span>
                            <span className="ziggla-texte-secondary">${property.pricing.cleaningFee}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="ziggla-texte-secondary underline">Service fee</span>
                            <span className="ziggla-texte-secondary">${property.pricing.serviceFee}</span>
                        </div>
                        <div className="flex justify-between pt-4 border-t border-gray-300 dark:border-gray-700">
                            <span className="font-bold ziggla-texte-secondary">Total before taxes</span>
                            <span className="font-bold ziggla-texte-secondary">
                                {(() => {
                                    const nights =
                                        property.checkInDate && property.checkOutDate
                                            ? Math.max(
                                                  1,
                                                  Math.ceil(
                                                      (new Date(property.checkOutDate).getTime() -
                                                          new Date(property.checkInDate).getTime()) /
                                                          (1000 * 60 * 60 * 24)
                                                  )
                                              )
                                            : 1;
                                    const basePrice = property.pricing.basePrice;
                                    const cleaningFee = property.pricing.cleaningFee;
                                    const serviceFee = property.pricing.serviceFee;
                                    const total = basePrice * nights + cleaningFee + serviceFee;
                                    return `$${total}`;
                                })()}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-6 p-6 ziggla-bg-secondary rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <h3 className="font-bold mb-4 ziggla-texte-secondary">This property is in high demand!</h3>
                    <div className="flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gold mr-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <p className="ziggla-texte-secondary text-sm">Booked {property.stats.totalBookings} times overall</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingCard;