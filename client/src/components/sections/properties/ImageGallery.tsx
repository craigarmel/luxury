'use client';
import { Button } from "@/components/ui/Button";
import { usePropertyStore } from "@/store/usePropertyStore";
import React from "react";
import Image from "next/image";

type ImageGalleryProps = {
    propertyId: string;
};

const ImageGallery: React.FC<ImageGalleryProps> = () => {
    const { 
        currentProperty, 
        isLoading, 
    } = usePropertyStore();

    const [showAll, setShowAll] = React.useState(false);

    if (isLoading || !currentProperty) {
        return <div className="m-10">Loading...</div>;
    }
    const images = currentProperty.images;

    // If showAll is true, show all images in a grid
    if (showAll) {
        return (
            <div className="w-full m-10 grid grid-cols-3 gap-4">
                {images.map((img, idx) => (
                    <div key={img.caption + idx} className="relative group overflow-hidden">
                        <Image
                            src={img.url}
                            alt={img.caption}
                            className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-0.5 rounded text-xs">
                            {img.caption}
                        </span>
                    </div>
                ))}
                <Button className="col-span-3 mt-4" variant="outline" onClick={() => setShowAll(false)}>
                    Hide Photos
                </Button>
            </div>
        );
    }

    return (
        <div className="w-full ml-10 mr-10 flex flex-row gap-4">
            {/* Main Image */}
            <div className="w-1/2 aspect-[4/2] max-h-[400px] overflow-hidden relative group">
                <Image
                    src={images[0].url}
                    alt={images[0].caption}
                    width={800}
                    height={400}
                    className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
                    {images[0].caption}
                </span>
            </div>
            {/* Miniatures */}
            <div className="w-1/2 grid grid-cols-2 grid-rows-2 gap-2 max-h-[400px]">
                {images.slice(1, 5).map((img, idx) => (
                    <div
                        key={img.caption + idx}
                        className="relative group overflow-hidden"
                    >
                        <Image
                            src={img.url}
                            alt={img.caption}
                            width={400}
                            height={200}
                            className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-0.5 rounded text-xs">
                            {img.caption}
                        </span>
                        {/* Show "View All Photos" button on the last thumbnail if images > 4 */}
                        {images.length > 4 && idx === 3 && (
                            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-90 flex items-center justify-center transition-opacity">
                                <Button variant="outline" onClick={() => setShowAll(true)}>
                                    View All Photos
                                </Button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;
