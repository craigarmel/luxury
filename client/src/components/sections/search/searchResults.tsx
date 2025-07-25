'use client';
import React, { useState, useEffect } from "react";
import SearchFilter from "@/components/forms/search/SearchFilter";
import { PropertyCard } from "@/components/features/PropertyCard";
import { Button } from "@/components/ui/Button";
import { usePropertyStore } from "@/store/usePropertyStore";
import type { Property } from "@/types/Property";

const filters = [
    { label: "All", value: "all" },
    { label: "Villas", value: "villas" },
    { label: "Penthouses", value: "penthouses" },
    { label: "Beachfront", value: "beachfront" },
];

const sortOptions = [
    "Recommended",
    "Price: Low to High",
    "Price: High to Low",
    "Guest Rating",
];

const SearchResults: React.FC = () => {
    const properties = usePropertyStore((state) => state.properties);
    const fetchProperties = usePropertyStore((state) => state.fetchProperties);
    const [activeFilter, setActiveFilter] = useState("all");
    const [sortBy, setSortBy] = useState(sortOptions[0]);
    const [page, setPage] = useState(1);
    const [filteredProperties, setFilteredProperties] = useState<Array<typeof properties[0]>>([]);
    
    useEffect(() => {
        fetchProperties();
    }, [fetchProperties]);
    
    useEffect(() => {
        let filtered = Array.isArray(properties) ? properties : [];
    
        // Filter
        if (activeFilter !== "all") {
            filtered = filtered.filter((property: Property) =>
                property.type?.toLowerCase() === activeFilter
            );
        }
    
        // Sort
        if (sortBy === "Price: Low to High") {
            filtered = filtered.slice().sort((a: Property, b: Property) => (a.pricing.basePrice ?? 0) - (b.pricing.basePrice ?? 0));
        } else if (sortBy === "Price: High to Low") {
            filtered = filtered.slice().sort((a: Property, b: Property) => (b.pricing.basePrice ?? 0) - (a.pricing.basePrice ?? 0));
        } else if (sortBy === "Guest Rating") {
            filtered = filtered.slice().sort((a: Property, b: Property) => (b.stats.rating.overall ?? 0) - (a.stats.rating.overall ?? 0));
        }
    
        setFilteredProperties(filtered);
    }, [properties, activeFilter, sortBy]);

    return (
        <div className="flex m-6 ziggla-bg-secondaryx">
            {/* Sidebar Filter */}
            <aside className="w-full lg:w-1/4 mb-8 lg:mb-0">
                <SearchFilter />
            </aside>

            {/* Main Content */}
            <main className="w-full m-6 lg:w-3/4 dark:ziggla-bg-dark-secondary p-6 rounded-lg shadow-lg">
                <div className="mb-6">
                    <h1 className="text-2xl font-serif font-bold mb-2 dark:text-white">
                        Luxury Stays
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {/* 42 properties found • July 15-22, 2023 • 2 guests */}
                    </p>
                </div>

                {/* Filters and Sort */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex space-x-2 overflow-x-auto pb-2">
                        {filters.map((filter) => (
                            <Button
                                variant="ghost"
                                key={filter.value}
                                className={`px-4 py-2 m-1 border rounded-full text-sm font-medium transition ${
                                    activeFilter === filter.value
                                        ? "ziggla-bg-secondary ziggla-text-primary border-gold"
                                        : "  dark:bg-dark-bg-secondary border-gray-300 dark:border-gray-700 hover:border-gold dark:text-white"
                                }`}
                                onClick={() => setActiveFilter(filter.value)}
                            >
                                {filter.label}
                            </Button>
                        ))}
                    </div>
                    <div className="flex items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">
                            Sort by:
                        </span>
                        <select
                            className="border-0 focus:ring-0 text-sm font-medium bg-transparent dark:text-white"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            {sortOptions.map((option) => (
                                <option key={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {/* Property Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredProperties.length === 0 ? (
                        <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-12">
                            No properties found.
                        </div>
                    ) : (
                        filteredProperties.map((property, idx) => (
                            <PropertyCard
                                key={property._id ?? idx}
                                property={property}
                            />
                        ))
                    )}
                </div>

                {/* Pagination */}
                <div className="mt-10 flex justify-center">
                    <nav className="flex items-center space-x-2">
                        <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gold hover:text-gold transition">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                        {[1, 2, 3, 4].map((num) => (
                            <button
                                key={num}
                                className={`w-10 h-10 flex items-center justify-center rounded-full ${
                                    page === num
                                        ? "ziggla-bg-secondary ziggla-text-secondary font-bold"
                                        : "border border-gray-300 dark:border-gray-700 dark:text-white hover:border-gold hover:text-gold transition"
                                }`}
                                onClick={() => setPage(num)}
                            >
                                {num}
                            </button>
                        ))}
                        <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gold hover:text-gold transition">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </nav>
                </div>

                {/* Map View Toggle */}
                <div className="mt-10 text-center">
                    <Button 
                        variant="ghost"
                        className="ziggla-text-secondary"
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        Show Map View
                    </Button>
                </div>
            </main>
        </div>
    );
};

export default SearchResults;