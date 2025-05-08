import React, { useState, useEffect } from 'react';
import type { Activity } from '../../types';
import { fetchActivities } from '../../services/api';
import LoadingIndicator from '../ui/LoadingIndicator';

interface ActivityGridProps {
  /** ID of the destination to filter activities by */
  destinationId?: number;
  /** Number of activities to display */
  limit?: number;
  /** Category to filter by */
  category?: string;
}

/**
 * Grid component for displaying activities
 */
const ActivityGrid: React.FC<ActivityGridProps> = ({
  destinationId,
  limit = 6,
  category
}) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>(category || 'all');

  const filters = [
    { id: 'all', label: 'All Activities' },
    { id: 'water', label: 'Water Activities' },
    { id: 'land', label: 'Land Activities' },
    { id: 'cultural', label: 'Cultural' },
    { id: 'food', label: 'Food & Drink' }
  ];

  useEffect(() => {
    const loadActivities = async () => {
      try {
        setLoading(true);
        
        // Prepare filter parameters
        const params: { destinationId?: number; category?: string } = {};
        if (destinationId) {
          params.destinationId = destinationId;
        }
        if (activeFilter !== 'all') {
          params.category = activeFilter;
        }
        
        // Fetch activities with filters
        const activitiesData = await fetchActivities(params);
        
        // Apply limit if specified
        const limitedData = limit ? activitiesData.slice(0, limit) : activitiesData;
        
        setActivities(limitedData);
        setError(null);
      } catch (err) {
        console.error("Error loading activities:", err);
        setError("Failed to load activities. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, [destinationId, limit, activeFilter]);

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
  };

  // Placeholder data for demo (if real API not available)
  const placeholderActivities: Activity[] = [
    {
      id: 1,
      attributes: {
        title: "Snorkeling at Molokini Crater",
        slug: "snorkeling-molokini",
        description: "Experience the stunning marine life at this partially submerged volcanic crater, one of Maui's most popular snorkeling destinations.",
        shortDescription: "Explore a vibrant underwater world teeming with tropical fish and coral reefs.",
        featuredImage: {
          data: {
            id: 10,
            attributes: {
              url: "/api/placeholder/800/500",
              width: 800,
              height: 500,
              alternativeText: "Snorkeling at Molokini Crater",
              name: "snorkeling.jpg",
              caption: null,
              formats: {
                thumbnail: { url: "/api/placeholder/200/150", width: 200, height: 150 },
                small: { url: "/api/placeholder/400/300", width: 400, height: 300 },
                medium: { url: "/api/placeholder/600/400", width: 600, height: 400 },
                large: { url: "/api/placeholder/800/500", width: 800, height: 500 }
              },
              previewUrl: null,
              provider: "local",
              createdAt: "2023-01-01T00:00:00.000Z",
              updatedAt: "2023-01-01T00:00:00.000Z"
            }
          }
        },
        priceRange: "$80-150",
        duration: "4-5 hours",
        category: "water",
        location: {
          address: "Molokini Crater",
          city: "Maui",
          zipCode: "96753",
          coordinates: {
            lat: 20.6331,
            lng: -156.4967
          }
        },
        bookingInfo: "Tours depart daily from Maalaea Harbor.",
        createdAt: "2023-01-01T00:00:00.000Z",
        updatedAt: "2023-01-01T00:00:00.000Z",
        publishedAt: "2023-01-01T00:00:00.000Z",
        locale: "en"
      }
    },
    {
      id: 2,
      attributes: {
        title: "Road to Hana Tour",
        slug: "road-to-hana",
        description: "This legendary road trip along Maui's eastern coastline features 620 curves and 59 bridges, with breathtaking views of waterfalls, beaches, and rainforests.",
        shortDescription: "Journey along Maui's stunning coastal highway with spectacular scenery at every turn.",
        featuredImage: {
          data: {
            id: 11,
            attributes: {
              url: "/api/placeholder/800/500",
              width: 800,
              height: 500,
              alternativeText: "Road to Hana Tour",
              name: "road-to-hana.jpg",
              caption: null,
              formats: {
                thumbnail: { url: "/api/placeholder/200/150", width: 200, height: 150 },
                small: { url: "/api/placeholder/400/300", width: 400, height: 300 },
                medium: { url: "/api/placeholder/600/400", width: 600, height: 400 },
                large: { url: "/api/placeholder/800/500", width: 800, height: 500 }
              },
              previewUrl: null,
              provider: "local",
              createdAt: "2023-01-01T00:00:00.000Z",
              updatedAt: "2023-01-01T00:00:00.000Z"
            }
          }
        },
        priceRange: "$120-200",
        duration: "Full day (10-12 hours)",
        category: "land",
        location: {
          address: "Hana Highway",
          city: "Maui",
          zipCode: "96708",
          coordinates: {
            lat: 20.7978,
            lng: -156.0884
          }
        },
        bookingInfo: "Guided tours include transportation, lunch, and stops at key attractions.",
        createdAt: "2023-01-01T00:00:00.000Z",
        updatedAt: "2023-01-01T00:00:00.000Z",
        publishedAt: "2023-01-01T00:00:00.000Z",
        locale: "en"
      }
    },
    {
      id: 3,
      attributes: {
        title: "Traditional Luau Experience",
        slug: "traditional-luau",
        description: "Immerse yourself in Hawaiian culture with an authentic luau featuring traditional food, music, and dance performances including the spectacular fire knife dance.",
        shortDescription: "Experience an evening of Hawaiian culture, cuisine and entertainment.",
        featuredImage: {
          data: {
            id: 12,
            attributes: {
              url: "/api/placeholder/800/500",
              width: 800,
              height: 500,
              alternativeText: "Traditional Luau",
              name: "luau.jpg",
              caption: null,
              formats: {
                thumbnail: { url: "/api/placeholder/200/150", width: 200, height: 150 },
                small: { url: "/api/placeholder/400/300", width: 400, height: 300 },
                medium: { url: "/api/placeholder/600/400", width: 600, height: 400 },
                large: { url: "/api/placeholder/800/500", width: 800, height: 500 }
              },
              previewUrl: null,
              provider: "local",
              createdAt: "2023-01-01T00:00:00.000Z",
              updatedAt: "2023-01-01T00:00:00.000Z"
            }
          }
        },
        priceRange: "$90-150",
        duration: "3-4 hours",
        category: "cultural",
        location: {
          address: "Various locations",
          city: "Maui",
          zipCode: "96761",
          coordinates: {
            lat: 20.8911,
            lng: -156.5047
          }
        },
        bookingInfo: "Most resorts offer luau experiences multiple nights per week.",
        createdAt: "2023-01-01T00:00:00.000Z",
        updatedAt: "2023-01-01T00:00:00.000Z",
        publishedAt: "2023-01-01T00:00:00.000Z",
        locale: "en"
      }
    }
  ];

  // If no activities or loading, use placeholder data for demo
  const displayActivities = activities.length > 0 ? activities : placeholderActivities;

  return (
    <div>
      {/* Category filters */}
      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map(filter => (
          <button
            key={filter.id}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeFilter === filter.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => handleFilterChange(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Loading state */}
      {loading && (
        <LoadingIndicator message="Loading activities..." size="small" />
      )}

      {/* Error state */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-6">
          <p>{error}</p>
        </div>
      )}

      {/* Activities grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayActivities.map(activity => (
            <div 
              key={activity.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              {activity.attributes.featuredImage?.data && (
                <div className="h-48 overflow-hidden">
                  <img 
                    src={activity.attributes.featuredImage.data.attributes.url} 
                    alt={activity.attributes.featuredImage.data.attributes.alternativeText || activity.attributes.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
              )}
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-gray-800">{activity.attributes.title}</h3>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {activity.attributes.category}
                  </span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600 mt-2 mb-3">
                  <span className="mr-4">
                    <span className="font-medium">Duration:</span> {activity.attributes.duration}
                  </span>
                  <span>
                    <span className="font-medium">Price:</span> {activity.attributes.priceRange}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {activity.attributes.shortDescription || activity.attributes.description}
                </p>
                
                <a 
                  href={`/activities/${activity.attributes.slug}`}
                  className="inline-block w-full text-center text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition"
                >
                  Learn More
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* View more link */}
      {displayActivities.length > 0 && limit && displayActivities.length >= limit && (
        <div className="mt-8 text-center">
          <a 
            href={destinationId ? `/islands/${destinationId}/activities` : "/activities"} 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            View all activities
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
};

export default ActivityGrid;