import React from 'react';
import PropertyHeader from '@/components/sections/properties/PropertyHeader';
import ImageGallery from '@/components/sections/properties/ImageGallery';
import PropertyDisplay from '@/components/sections/properties/PropertyDisplay';
import SimilarProperties from '@/components/sections/properties/SimilarProperties';

interface PropertyPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { id } = await params;

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <PropertyHeader propertyId={id} />
      <ImageGallery propertyId={id} />
      <PropertyDisplay id={id} />
      <SimilarProperties />
    </div>
  );
}