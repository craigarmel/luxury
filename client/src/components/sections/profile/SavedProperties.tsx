import { PropertyCard } from "@/components/features/PropertyCard";
import { Property, PropertyType, RoomType } from "@/types/Property";

interface SavedPropertiesProps {
    savedProperties: Array<Property>;
}

// Example mock data (remove if you get savedProperties as a prop)
const savedProperties: Array<Property> = [
    {
        _id: "1",
        hostId: "host1",
        title: "Luxury Beachfront Villa",
        description: "A stunning villa with ocean views and private beach access.",
        propertyType: PropertyType.VILLA,
        roomType: RoomType.ENTIRE_PLACE,
        location: {
            address: "123 Ocean Drive, Malibu, CA",
            city: "Malibu",
            state: "CA",
            country: "USA",
            zipCode: "90265",
            coordinates: {
                latitude: 34.0259,
                longitude: -118.7798,
            },
            isExactLocation: true,
        },
        capacity: {
            guests: 6,
            bedrooms: 3,
            beds: 3,
            bathrooms: 2,
        },
        amenities: ["Pool", "WiFi", "Kitchen"],
        images: [
            {
                showButton: <></>,
                url: "/villa.jpg",
                caption: "Ocean view",
                isPrimary: true,
                order: 1,
            },
        ],
        highlights: [
            {
                icon: <></>,
                title: "Oceanfront",
                desc: "Direct access to the beach",
            },
        ],
        reviews: [],
        pricing: {
            basePrice: 1200,
            currency: "USD",
            cleaningFee: 100,
            serviceFee: 50,
            securityDeposit: 500,
            extraGuestFee: 50,
        },
        availability: {
            minStay: 2,
            maxStay: 30,
            advanceNotice: 1,
            preparationTime: 1,
            checkInTime: { from: "15:00", to: "20:00" },
            checkOutTime: "11:00",
            instantBook: true,
        },
        houseRules: {
            smokingAllowed: false,
            petsAllowed: true,
            partiesAllowed: false,
        },
        status: "active",
        verificationStatus: "approved",
        stats: {
            totalBookings: 12,
            rating: {
                overall: 4.8,
                cleanliness: 4.9,
                accuracy: 4.8,
                communication: 5,
                location: 5,
                checkIn: 4.7,
                value: 4.6,
                reviewCount: 8,
            },
            viewCount: 120,
        },
        badge: { type: "gold", text: "Top Rated" },
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
        type: PropertyType.VILLA
    },
    {
        _id: "2",
        hostId: "host2",
        title: "Modern Apartment",
        description: "Central location, modern amenities, and skyline views.",
        propertyType: PropertyType.APARTMENT,
        roomType: RoomType.ENTIRE_PLACE,
        location: {
            address: "456 Main St, New York, NY",
            city: "New York",
            state: "NY",
            country: "USA",
            zipCode: "10001",
            coordinates: {
                latitude: 40.7128,
                longitude: -74.0060,
            },
            isExactLocation: true,
        },
        capacity: {
            guests: 4,
            bedrooms: 2,
            beds: 2,
            bathrooms: 1,
        },
        amenities: ["Elevator", "WiFi", "Gym"],
        images: [
            {
                showButton: <></>,
                url: "/apartment.jpg",
                caption: "Skyline view",
                isPrimary: true,
                order: 1,
            },
        ],
        highlights: [
            {
                icon: <></>,
                title: "Central",
                desc: "Heart of the city",
            },
        ],
        reviews: [],
        pricing: {
            basePrice: 800,
            currency: "USD",
            cleaningFee: 80,
            serviceFee: 40,
            securityDeposit: 300,
            extraGuestFee: 30,
        },
        availability: {
            minStay: 1,
            maxStay: 20,
            advanceNotice: 1,
            preparationTime: 1,
            checkInTime: { from: "14:00", to: "22:00" },
            checkOutTime: "10:00",
            instantBook: false,
        },
        houseRules: {
            smokingAllowed: false,
            petsAllowed: false,
            partiesAllowed: false,
        },
        status: "active",
        verificationStatus: "approved",
        stats: {
            totalBookings: 8,
            rating: {
                overall: 4.5,
                cleanliness: 4.6,
                accuracy: 4.5,
                communication: 4.7,
                location: 4.8,
                checkIn: 4.4,
                value: 4.3,
                reviewCount: 5,
            },
            viewCount: 90,
        },
        badge: { type: "white", text: "New" },
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
        type: PropertyType.VILLA
    },
];

export const SavedProperties: React.FC<SavedPropertiesProps> = ({
}) => {
    return (
        <section>
            <h2>Saved Properties by Users</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                {savedProperties.length === 0 ? (
                    <p className="text-gray-500">No saved properties yet.</p>
                ) : (
                    savedProperties.map((property) => (
                        <PropertyCard key={property._id} property={property} />
                    ))
                )}
            </div>
        </section>
    );
};