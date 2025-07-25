'use client';
import React, { useState, useEffect } from 'react';
import { Star, MapPin, Wifi, Home, Clock, User, Lightbulb, BarChart3 } from 'lucide-react';
import { usePropertyStore } from '@/store/usePropertyStore';
import { PropertyType, RoomType } from '@/types/Property';
import { Button } from '../ui/Button';

type IconName = 'star' | 'home' | 'wifi' | 'mappin' | 'clock' | 'user' | 'lightbulb' | 'chart';


interface PropertyDetailsProps {
  id: string;
}

const PropertyDetailsComponent: React.FC<PropertyDetailsProps> = ({ id }) => {
  const amenityIcons: Record<string, React.ReactNode> = {
    wifi: <Wifi className="h-6 w-6" />,
    kitchen: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="2"/>
        <rect x="7" y="3" width="10" height="4" rx="1" stroke="currentColor" strokeWidth="2"/>
        <circle cx="8.5" cy="13.5" r="1.5" fill="currentColor"/>
        <circle cx="15.5" cy="13.5" r="1.5" fill="currentColor"/>
      </svg>
    ),
    parking: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="7" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
        <rect x="7" y="11" width="10" height="4" rx="1" stroke="currentColor" strokeWidth="2"/>
        <circle cx="7" cy="17" r="2" fill="currentColor"/>
        <circle cx="17" cy="17" r="2" fill="currentColor"/>
      </svg>
    ),
    pool: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="12" rx="8" ry="4" stroke="currentColor" strokeWidth="2"/>
        <path d="M4 12c0 2.21 3.58 4 8 4s8-1.79 8-4" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    balcony: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
        <rect x="5" y="10" width="14" height="7" rx="2" stroke="currentColor" strokeWidth="2"/>
        <rect x="8" y="7" width="8" height="3" rx="1" stroke="currentColor" strokeWidth="2"/>
        <line x1="7" y1="17" x2="7" y2="21" stroke="currentColor" strokeWidth="2"/>
        <line x1="17" y1="17" x2="17" y2="21" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    air_conditioning: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="7" width="18" height="6" rx="2" stroke="currentColor" strokeWidth="2"/>
        <line x1="7" y1="17" x2="7" y2="19" stroke="currentColor" strokeWidth="2"/>
        <line x1="12" y1="17" x2="12" y2="19" stroke="currentColor" strokeWidth="2"/>
        <line x1="17" y1="17" x2="17" y2="19" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    heating: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
        <path d="M8 17c0-2.5 4-2.5 4 0" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 17c0-2.5 4-2.5 4 0" stroke="currentColor" strokeWidth="2"/>
        <rect x="5" y="7" width="14" height="6" rx="2" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    washer: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="12" r="2" fill="currentColor"/>
      </svg>
    ),
    dryer: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    dishwasher: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
        <rect x="8" y="8" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="12" r="2" fill="currentColor"/>
      </svg>
    ),
    tv: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
        <line x1="8" y1="20" x2="16" y2="20" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    workspace: (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="8" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
        <rect x="8" y="4" width="8" height="4" rx="1" stroke="currentColor" strokeWidth="2"/>
        <line x1="12" y1="14" x2="12" y2="18" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
  };
  const { 
    currentProperty, 
    isLoading, 
    getPropertyById 
  } = usePropertyStore();
  
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [expandedDescription, setExpandedDescription] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setError(null);
        await getPropertyById(id);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch property');
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id, getPropertyById]);

interface IconProps {
  className?: string;
}

const renderIcon = (iconElement: React.ReactNode | IconName, className: string = "h-8 w-8") => {
  if (React.isValidElement(iconElement)) {
    return React.cloneElement(
      iconElement as React.ReactElement<IconProps>,
      { className }
    );
  }
  
  const iconMap: Record<IconName, React.ReactNode> = {
    'star': <Star className={className} />,
    'home': <Home className={className} />,
    'wifi': <Wifi className={className} />,
    'mappin': <MapPin className={className} />,
    'clock': <Clock className={className} />,
    'user': <User className={className} />,
    'lightbulb': <Lightbulb className={className} />,
    'chart': <BarChart3 className={className} />
  };
  
  return iconMap[iconElement as IconName] || <Home className={className} />;
};

  const formatPropertyType = (type: PropertyType) => {
    return type.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatRoomType = (type: RoomType) => {
    return type.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="w-full lg:w-2/3 animate-pulse">
        <div className="text-center p-8">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
          <p className="ziggla-text-secondary">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full lg:w-2/3 p-6 bg-red-50 dark:bg-red-900/20 rounded-lg">
        <p className="text-red-600 dark:text-red-400">Error: {error}</p>
      </div>
    );
  }

  if (!currentProperty) {
    return (
      <div className="w-full lg:w-2/3 p-6 ziggla-bg-secondary rounded-lg">
        <p className="ziggla-text-secondary">Property not found</p>
      </div>
    );
  }

  const property = currentProperty;
  if (!property.capacity || !property.location || !property.pricing) {
    return (
      <div className="w-full lg:w-2/3 p-6 bg-red-50 dark:bg-red-900/20 rounded-lg">
        <p className="text-red-600 dark:text-red-400">Property data is incomplete or corrupted</p>
        <pre className="text-xs mt-2 overflow-auto max-h-40">
          {JSON.stringify(property, null, 2)}
        </pre>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-2/3">
      {/* Host Info */}
      <div className="flex justify-between items-center mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
        <div>
          <h2 className="text-2xl font-serif font-bold mb-2 ziggla-text-secondary">
            {property.title}
          </h2>
          <p className="ziggla-text-secondary">
            {property.capacity.guests} guests • {property.capacity.bedrooms} bedrooms • 
            {property.capacity.beds} beds • {property.capacity.bathrooms} baths
          </p>
          <p className="text-sm text-gray-500 ziggla-text-secondary mt-1">
            {formatPropertyType(property.propertyType)} • {formatRoomType(property.roomType)}
          </p>
        </div>
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center relative">
            {/* {property.host?.avatar ? (
              <Image 
                src={property.host.avatar} 
                alt={property.host.name || 'Host'}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-gray-500 ziggla-text-secondary text-xl">
                {property.host?.name?.charAt(0) || 'H'}
              </span>
            )}
            {property.badge && (
              <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-white w-6 h-6 rounded-full flex items-center justify-center">
                <Star className="h-4 w-4 fill-current" />
              </div>
            )} */}
          </div>
        </div>
      </div>

      {/* Property Highlights */}
      {property.highlights && property.highlights.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
          {property.highlights.map((highlight, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-shrink-0 mr-4 text-yellow-500">
                {renderIcon(highlight.icon)}
              </div>
              <div>
                <h3 className="font-bold mb-1 ziggla-text-secondary">{highlight.title}</h3>
                <p className="ziggla-text-secondary text-sm">{highlight.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Description */}
      <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-serif font-bold mb-4 ziggla-text-secondary">About this space</h2>
        <div className="ziggla-text-secondary">
          <div className={`${!expandedDescription ? 'line-clamp-4' : ''}`}>
            <p>{property.description}</p>
          </div>
          {property.description.length > 200 && (
            <button 
              onClick={() => setExpandedDescription(!expandedDescription)}
              className="mt-4 text-yellow-500 font-medium hover:underline"
            >
              {expandedDescription ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>
      </div>

      {/* Amenities */}
      <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-serif font-bold mb-6 ziggla-text-secondary">What this place offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6">
          {property.amenities.slice(0, showAllAmenities ? undefined : 8).map((amenity, index) => (
            <div key={index} className="flex items-center">
              <div className="mr-4 text-gray-700 ziggla-text-secondary">
                {amenityIcons[amenity]}
              </div>
              <span className="ziggla-text-secondary">{amenity}</span>
            </div>
          ))}
        </div>
        {property.amenities.length > 8 && (
          <Button 
            variant='ghost'
            className='mt-6 px-6 py-3 border border-gray'
            onClick={() => setShowAllAmenities(!showAllAmenities)}
          >
            {showAllAmenities ? 'Show less' : `Show all ${property.amenities.length} amenities`}
          </Button>
        )}
      </div>

      {/* Pricing & Availability */}
      <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-serif font-bold mb-6 ziggla-text-secondary">Pricing & Availability</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="ziggla-bg-secondary p-6 rounded-lg">
            <h3 className="font-bold mb-4 ziggla-text-secondary">Pricing Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="ziggla-text-secondary">Base price per night</span>
                <span className="font-medium ziggla-text-secondary">
                  {property.pricing.currency} {property.pricing.basePrice}
                </span>
              </div>
              {property.pricing.cleaningFee > 0 && (
                <div className="flex justify-between">
                  <span className="ziggla-text-secondary">Cleaning fee</span>
                  <span className="font-medium ziggla-text-secondary">
                    {property.pricing.currency} {property.pricing.cleaningFee}
                  </span>
                </div>
              )}
              {property.pricing.securityDeposit > 0 && (
                <div className="flex justify-between">
                  <span className="ziggla-text-secondary">Security deposit</span>
                  <span className="font-medium ziggla-text-secondary">
                    {property.pricing.currency} {property.pricing.securityDeposit}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          <div className="ziggla-bg-secondary p-6 rounded-lg">
            <h3 className="font-bold mb-4 ziggla-text-secondary">Stay Requirements</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="ziggla-text-secondary">Minimum stay</span>
                <span className="font-medium ziggla-text-secondary">{property.availability.minStay} nights</span>
              </div>
              <div className="flex justify-between">
                <span className="ziggla-text-secondary">Maximum stay</span>
                <span className="font-medium ziggla-text-secondary">{property.availability.maxStay} nights</span>
              </div>
              <div className="flex justify-between">
                <span className="ziggla-text-secondary">Check-in</span>
                <span className="font-medium ziggla-text-secondary">
                  {property.availability.checkInTime.from} - {property.availability.checkInTime.to}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="ziggla-text-secondary">Check-out</span>
                <span className="font-medium ziggla-text-secondary">{property.availability.checkOutTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      {property.stats.rating.reviewCount > 0 && (
        <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-6">
            <Star className="h-6 w-6 text-yellow-400 fill-current" />
            <span className="text-xl font-bold ml-2 ziggla-text-secondary">
              {property.stats.rating.overall.toFixed(1)}
            </span>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-gray-700 ziggla-text-secondary">
              {property.stats.rating.reviewCount} reviews
            </span>
          </div>

          {/* Review Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex flex-col space-y-3">
              {Object.entries({
                cleanliness: property.stats.rating.cleanliness,
                accuracy: property.stats.rating.accuracy,
                communication: property.stats.rating.communication
              }).map(([category, rating]) => (
                <div key={category} className="flex justify-between items-center">
                  <span className="text-gray-700 ziggla-text-secondary capitalize">{category}</span>
                  <div className="flex items-center">
                    <div className="w-24 h-1 bg-gray-200 dark:bg-gray-700 rounded-full mr-2">
                      <div 
                        className="h-1 bg-yellow-400 rounded-full" 
                        style={{ width: `${(rating / 5) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium ziggla-text-secondary">{rating.toFixed(1)}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col space-y-3">
              {Object.entries({
                location: property.stats.rating.location,
                'check-in': property.stats.rating.checkIn,
                value: property.stats.rating.value
              }).map(([category, rating]) => (
                <div key={category} className="flex justify-between items-center">
                  <span className="text-gray-700 ziggla-text-secondary capitalize">{category}</span>
                  <div className="flex items-center">
                    <div className="w-24 h-1 bg-gray-200 dark:bg-gray-700 rounded-full mr-2">
                      <div 
                        className="h-1 bg-yellow-400 rounded-full" 
                        style={{ width: `${(rating / 5) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium ziggla-text-secondary">{rating.toFixed(1)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Reviews */}
          {property.reviews && property.reviews.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {property.reviews.slice(0, showAllReviews ? undefined : 4).map((review, index) => (
                  <div key={index} className="p-6 bg-white ziggla-bg-secondary rounded-xl shadow-sm">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center mr-4">
                        <span className="text-gray-500 ziggla-text-secondary">
                          {review.user.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-bold ziggla-text-secondary">{review.user}</h4>
                        <p className="text-sm text-gray-500 ziggla-text-secondary">
                          {formatDate(review.date)}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 ziggla-text-secondary">{review.content}</p>
                  </div>
                ))}
              </div>

              {property.reviews.length > 4 && (
                <button 
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  className="px-6 py-3 border border-gray-900 dark:border-gray-300 rounded-lg text-gray-900 ziggla-text-secondary font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  {showAllReviews ? 'Show less' : `Show all ${property.reviews.length} reviews`}
                </button>
              )}
            </>
          )}
        </div>
      )}

      {/* House Rules */}
      <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-serif font-bold mb-6 ziggla-text-secondary">House Rules</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center">
            <div className={`w-4 h-4 rounded mr-3 ${property.houseRules.smokingAllowed ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="ziggla-text-secondary">
              {property.houseRules.smokingAllowed ? 'Smoking allowed' : 'No smoking'}
            </span>
          </div>
          <div className="flex items-center">
            <div className={`w-4 h-4 rounded mr-3 ${property.houseRules.petsAllowed ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="ziggla-text-secondary">
              {property.houseRules.petsAllowed ? 'Pets allowed' : 'No pets'}
            </span>
          </div>
          <div className="flex items-center">
            <div className={`w-4 h-4 rounded mr-3 ${property.houseRules.partiesAllowed ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="ziggla-text-secondary">
              {property.houseRules.partiesAllowed ? 'Parties allowed' : 'No parties'}
            </span>
          </div>
        </div>
        {property.houseRules.quietHours && (
          <div className="mt-4">
            <p className="text-gray-700 ziggla-text-secondary">
              Quiet hours: {property.houseRules.quietHours.from} - {property.houseRules.quietHours.to}
            </p>
          </div>
        )}
        {property.houseRules.additionalRules && property.houseRules.additionalRules.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2 ziggla-text-secondary">Additional Rules:</h4>
            <ul className="list-disc list-inside text-gray-700 ziggla-text-secondary">
              {property.houseRules.additionalRules.map((rule, index) => (
                <li key={index}>{rule}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Location */}
      <div className="mb-8">
        <h2 className="text-2xl font-serif font-bold mb-6 ziggla-text-secondary">Where you&lsquo;ll be</h2>
        <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg mb-6 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 ziggla-text-secondary">Map component would be implemented here</p>
          </div>
        </div>
        <h3 className="font-bold mb-2 ziggla-text-secondary">
          {property.location.city}, {property.location.country}
        </h3>
        <div className="text-gray-700 ziggla-text-secondary space-y-2">
          <p><strong>Address:</strong> {property.location.address}</p>
          {property.location.neighborhood && (
            <p><strong>Neighborhood:</strong> {property.location.neighborhood}</p>
          )}
          <p><strong>Postal Code:</strong> {property.location.zipCode}</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsComponent;
