'use client';
import BookingCard from "@/components/bookings/BookingCard";
import PropertyDetails from "@/components/properties/PropertyDetails";

interface PropertyDisplayProps {
  id: string;
}

const PropertyDisplay: React.FC<PropertyDisplayProps> = ({ id }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-12 m-10">
      <PropertyDetails id={id} />
      <BookingCard propertyId={id} />
    </div>
  );
}
export default PropertyDisplay;