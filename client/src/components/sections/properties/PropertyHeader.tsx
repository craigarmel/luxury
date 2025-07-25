"use client"
import { Button } from "@/components/ui/Button";
import React from "react";
import { usePropertyStore } from "@/store/usePropertyStore";

interface PropertyHeaderProps {
    propertyId: string;
}

const PropertyHeader: React.FC<PropertyHeaderProps> = () => {
    const { currentProperty } = usePropertyStore();
    return (
        <header className="w-full p-4 mb-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2 dark:text-white leading-tight">
                        {currentProperty?.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-2 mb-2 text-sm">
                        <span className="flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gold"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="ml-1 font-semibold dark:text-white">{currentProperty?.stats.rating.overall}</span>
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">({currentProperty?.stats.rating.reviewCount} reviews)</span>
                        <span className="mx-2 text-gray-400">•</span>
                        <span className="font-medium text-gray-600 dark:text-gray-300">
                            {currentProperty?.location.address || "Loading..."}
                        </span>
                    </div>
                </div>
                <div className="flex space-x-2 flex-shrink-0">
                    <Button variant="ghost" aria-label="Share property">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                            />
                        </svg>
                        <span className="hidden md:inline">Share</span>
                    </Button>
                    <Button aria-label="Save property">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                        <span className="hidden md:inline">Save</span>
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default PropertyHeader;