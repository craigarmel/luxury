"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import React, { useState } from "react";

const PROPERTY_TYPES = [
    { id: "villa", label: "Villa" },
    { id: "penthouse", label: "Penthouse" },
    { id: "mansion", label: "Mansion" },
    { id: "chalet", label: "Chalet" },
];

const AMENITIES = [
    { id: "pool", label: "Private Pool" },
    { id: "spa", label: "Spa" },
    { id: "chef", label: "Private Chef" },
    { id: "butler", label: "Butler Service" },
    { id: "gym", label: "Fitness Center" },
    { id: "beach", label: "Beachfront" },
];

const RATINGS = [
    { id: "any", label: "Any" },
    { id: "4plus", label: "4.5 & up" },
    { id: "4", label: "4.0 & up" },
];

const MIN_PRICE = 100;
const MAX_PRICE = 5000;

const SearchFilter: React.FC = () => {
    const [price, setPrice] = useState(1500);
    const [propertyTypes, setPropertyTypes] = useState<string[]>(["penthouse"]);
    const [amenities, setAmenities] = useState<string[]>(["pool", "spa", "beach"]);
    const [rating, setRating] = useState("4plus");

    const handlePropertyTypeChange = (id: string) => {
        setPropertyTypes((prev) =>
            prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
        );
    };

    const handleAmenityChange = (id: string) => {
        setAmenities((prev) =>
            prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
        );
    };

    const handleClearAll = () => {
        setPrice(1500);
        setPropertyTypes([]);
        setAmenities([]);
        setRating("any");
    };

    const handleApply = (e: React.FormEvent) => {
        e.preventDefault();
        // handle filter apply logic here
    };

    return (
        <div className="max-w-md mx-auto mt-8">
            <form
                className="ziggla-bg-secondary rounded-xl p-6 shadow-sm sticky top-24"
                onSubmit={handleApply}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Filters</h2>
                    <Button
                        variant="outline"
                        onClick={handleClearAll}
                    >
                        Clear All
                    </Button>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                    <h3 className="font-bold mb-3">Price Range</h3>
                    <div className="mb-4">
                        <input
                            type="range"
                            min={MIN_PRICE}
                            max={MAX_PRICE}
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            className="range-slider w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                    <div className="flex ziggla-text-secondary justify-between">
                        <span className="text-sm ">
                            ${MIN_PRICE}
                        </span>
                        <span className="text-sm font-medium">
                            Up to ${price.toLocaleString()}
                        </span>
                        <span className="text-sm ">
                            ${MAX_PRICE.toLocaleString()}+
                        </span>
                    </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 my-6"></div>

                {/* Property Type */}
                <div className="mb-6">
                    <h3 className="font-bold mb-3">Property Type</h3>
                    <div className="space-y-2">
                        {PROPERTY_TYPES.map((type) => (
                            <div className="flex items-center" key={type.id}>
                                <Input
                                    type="checkbox"
                                    id={type.id}
                                    className="hidden filter-option "
                                    checked={propertyTypes.includes(type.id)}
                                    onChange={() => handlePropertyTypeChange(type.id)}
                                />
                                <label
                                    htmlFor={type.id}
                                    className={`flex-1 py-2 px-3 border border-gray-300 dark:dark-filter-label rounded-md text-sm cursor-pointer hover:border-gold transition ${
                                        propertyTypes.includes(type.id)
                                            ? "ziggla-text-secondary"
                                            : ""
                                    }`}
                                >
                                    {type.label}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 my-6"></div>

                {/* Amenities */}
                <div className="mb-6">
                    <h3 className="font-bold mb-3">Amenities</h3>
                    <div className="space-y-2">
                        {AMENITIES.map((amenity) => (
                            <div className="flex items-center" key={amenity.id}>
                                <input
                                    type="checkbox"
                                    id={amenity.id}
                                    className="mr-2"
                                    checked={amenities.includes(amenity.id)}
                                    onChange={() => handleAmenityChange(amenity.id)}
                                />
                                <label
                                    htmlFor={amenity.id}
                                    className="text-sm dark:text-gray-300"
                                >
                                    {amenity.label}
                                </label>
                            </div>
                        ))}
                    </div>
                    <button
                        type="button"
                        className="text-gold text-sm font-medium mt-2"
                        // onClick={...} // Implement show more if needed
                    >
                        Show more
                    </button>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 my-6"></div>

                {/* Guest Rating */}
                <div className="mb-6">
                    <h3 className="font-bold mb-3">Guest Rating</h3>
                    <div className="space-y-2">
                        {RATINGS.map((r) => (
                            <div className="flex items-center" key={r.id}>
                                <input
                                    type="radio"
                                    name="rating"
                                    id={r.id}
                                    className="mr-2"
                                    checked={rating === r.id}
                                    onChange={() => setRating(r.id)}
                                />
                                <label htmlFor={r.id} className="text-sm dark:text-gray-300">
                                    {r.label}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <Button
                    variant="outline"
                    type="submit"
                >
                    Apply Filters
                </Button>
            </form>
        </div>
    );
};

export default SearchFilter;