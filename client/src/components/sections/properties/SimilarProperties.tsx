'use client';
import React from "react";
import { PropertyCard } from "@/components/features/PropertyCard";
import { usePropertyStore } from "@/store/usePropertyStore";

export default function SimilarProperties() {
    const { properties, isLoading, fetchProperties } = usePropertyStore();

    React.useEffect(() => {
        fetchProperties();
    }, [fetchProperties]);

    if (isLoading || !properties || properties.length === 0) {
        return null;
    }
    return (
        <div className="m-10">
            <h2 className="text-2xl font-serif font-bold mb-8 ziggla-text-secondary">
                More places you may like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto">
                {properties.slice(0, 2).map((property) => (
                    <PropertyCard
                        key={property._id}
                        property={property}
                    />  
                ))}
            </div>
        </div>
    );
}
