// Import Apollo Client as a CommonJS module to avoid ESM/CJS compatibility issues
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

import type {
  ApiResponse,
  SingleItemApiResponse,
  Destination,
  Event,
  Activity,
  Accommodation,
  Restaurant,
  BlogPost
} from '../types';

// Flag to force using mock data (set to true during development)
// Setting USE_MOCK_DATA to true will bypass API calls and use mock data
const USE_MOCK_DATA: boolean = import.meta.env.USE_MOCK_DATA === 'true';

/**
 * GraphQL client configuration
 */
const client = new ApolloClient({
  uri: import.meta.env.STRAPI_GRAPHQL_URL || 'http://localhost:1337/graphql',
  cache: new InMemoryCache(),
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${import.meta.env.STRAPI_API_TOKEN}`
  }
});

/**
 * Get all destinations with a minimal query structure
 * @returns Promise with destinations data
 */
export const fetchDestinations = async (): Promise<Destination[]> => {
  if (USE_MOCK_DATA) {
    console.log('Using mock destinations data');
    return mockFetchDestinations();
  }

  try {
    const { data } = await client.query({
      query: gql`
        query {
          destinations {
            documentId
            name
            slug
            description
            activities
            shortDescription
            imageUrl
          }
        }
      `
    });
    
    return data.destinations;
  } catch (error) {
    console.error('Error fetching destinations:', error);
    console.log('Falling back to mock data');
    return mockFetchDestinations();
  }
};

/**
 * Get a single destination by slug
 * @param slug - The destination slug
 * @returns Promise with destination data
 */
export const fetchDestinationBySlug = async (slug: string): Promise<Destination> => {
  if (USE_MOCK_DATA) {
    console.log('Using mock destination data for slug:', slug);
    const destinations = await mockFetchDestinations();
    const destination = destinations.find(d => d.slug === slug); // Access 'slug' under 'attributes'
    if (!destination) {
      throw new Error(`Destination with slug "${slug}" not found`);
    }
    return destination;
  }

  try {
    const { data } = await client.query({
      query: gql`
        query GetDestination($slug: String!) {
          destinations(filters: { slug: { eq: $slug } }) {
            documentId
            name
            slug
            description
            activities
            shortDescription
            weatherInfo
            travelTips
            imageUrl
          }
        }
      `,
      variables: { slug }
    });
    
    if (!data.destinations || !data.destinations.length) {
      throw new Error(`Destination with slug "${slug}" not found`);
    }
    
    return data.destinations[0];
  } catch (error) {
    console.error(`Error fetching destination with slug "${slug}":`, error);
    const destinations = await mockFetchDestinations();
    const destination = destinations.find(d => d.slug === slug); // Access 'slug' under 'attributes'
    if (!destination) {
      throw new Error(`Destination with slug "${slug}" not found in mock data`);
    }
    return destination;
  }
};

/**
 * Get all activities (mock implementation)
 * @param params - Optional filter parameters
 * @returns Promise with activities data
 */
export const fetchActivities = async (params?: { 
  destinationId?: string;
  category?: string;
}): Promise<Activity[]> => {
  // Always return mock activities data for now
  return [
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
              url: "/images/snorkeling.jpeg",
              width: 800,
              height: 500,
              alternativeText: "Snorkeling at Molokini Crater",
              name: "snorkeling.jpg",
              caption: null,
              formats: {
                thumbnail: {
                  url: "/images/snorkeling-thumb.jpg",
                  width: 200,
                  height: 150
                },
                small: {
                  url: "/images/snorkeling-small.jpg",
                  width: 400,
                  height: 300
                },
                medium: {
                  url: "/images/snorkeling-medium.jpg",
                  width: 600,
                  height: 400
                },
                large: {
                  url: "/images/snorkeling.jpg",
                  width: 800,
                  height: 500
                }
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
              url: "/images/road-to-hana.jpg",
              width: 800,
              height: 500,
              alternativeText: "Road to Hana Tour",
              name: "road-to-hana.jpg",
              caption: null,
              formats: {
                thumbnail: {
                  url: "/images/road-to-hana-thumb.jpg",
                  width: 200,
                  height: 150
                },
                small: {
                  url: "/images/road-to-hana-small.jpg",
                  width: 400,
                  height: 300
                },
                medium: {
                  url: "/images/road-to-hana-medium.jpg",
                  width: 600,
                  height: 400
                },
                large: {
                  url: "/images/road-to-hana.jpg",
                  width: 800,
                  height: 500
                }
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
              url: "/images/luau.jpg",
              width: 800,
              height: 500,
              alternativeText: "Traditional Luau",
              name: "luau.jpg",
              caption: null,
              formats: {
                thumbnail: {
                  url: "/images/luau-thumb.jpg",
                  width: 200,
                  height: 150
                },
                small: {
                  url: "/images/luau-small.jpg",
                  width: 400,
                  height: 300
                },
                medium: {
                  url: "/images/luau-medium.jpg",
                  width: 600,
                  height: 400
                },
                large: {
                  url: "/images/luau.jpg",
                  width: 800,
                  height: 500
                }
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
};

/**
 * Mock function to fetch destinations data
 * @returns Promise with mock destinations
 */
export const mockFetchDestinations = async (): Promise<Destination[]> => {
  const mockDestinationsData = [
    {
      id: 1,
      documentId: "1",
      name: "Maui",
      slug: "maui",
      description: "Known for its stunning beaches, lush rainforests, and the winding Road to Hana.",
      shortDescription: "The Valley Isle with diverse landscapes and activities",
      image: {
        data: {
          id: 1,
          attributes: {
            url: "/images/maui-landscape.jpg",
            width: 800,
            height: 500,
            alternativeText: "Maui landscape",
            name: "maui-landscape.jpg",
            caption: null,
            formats: {
              thumbnail: {
                url: "/images/maui-landscape-thumb.jpg",
                width: 200,
                height: 150
              },
              small: {
                url: "/images/maui-landscape-small.jpg",
                width: 400,
                height: 300
              },
              medium: {
                url: "/images/maui-landscape-medium.jpg",
                width: 600,
                height: 400
              },
              large: {
                url: "/images/maui-landscape.jpg",
                width: 800,
                height: 500
              }
            },
            previewUrl: null,
            provider: "local",
            createdAt: "2023-01-01T00:00:00.000Z",
            updatedAt: "2023-01-01T00:00:00.000Z"
          }
        }
      },
      weatherInfo: "Maui enjoys a tropical climate with temperatures typically ranging from 75-85°F year-round. The western side tends to be drier, while the eastern side receives more rainfall, creating lush landscapes.",
      travelTips: "Rent a car to explore the island at your own pace. The Road to Hana is a must-do, but start early to avoid crowds. Don't miss watching the sunrise from Haleakalā crater (reservations required).",
      imageUrl: "/images/maui-landscape.jpg",
      createdAt: "2023-01-01T00:00:00.000Z",
      updatedAt: "2023-01-01T00:00:00.000Z",
      publishedAt: "2023-01-01T00:00:00.000Z",
      activities: [],
      locale: "en"
    },
    {
      id: 2,
      documentId: "2",
      name: "Oahu",
      slug: "oahu",
      description: "Home to the capital Honolulu and the famous Waikiki Beach with vibrant city life.",
      shortDescription: "The Gathering Place blending urban culture with natural beauty",
      image: {
        data: {
          id: 2,
          attributes: {
            url: "/images/oahu-landscape.jpg",
            width: 800,
            height: 500,
            alternativeText: "Oahu landscape",
            name: "oahu-landscape.jpg",
            caption: null,
            formats: {
              thumbnail: {
                url: "/images/oahu-landscape-thumb.jpg",
                width: 200,
                height: 150
              },
              small: {
                url: "/images/oahu-landscape-small.jpg",
                width: 400,
                height: 300
              },
              medium: {
                url: "/images/oahu-landscape-medium.jpg",
                width: 600,
                height: 400
              },
              large: {
                url: "/images/oahu-landscape.jpg",
                width: 800,
                height: 500
              }
            },
            previewUrl: null,
            provider: "local",
            createdAt: "2023-01-01T00:00:00.000Z",
            updatedAt: "2023-01-01T00:00:00.000Z"
          }
        }
      },
      weatherInfo: "Oahu's climate is warm and consistent with temperatures ranging from 70-85°F throughout the year. The windward (eastern) side receives more rainfall, while the leeward (western) coast is typically drier and sunnier.",
      travelTips: "While Waikiki is a popular tourist spot, venture out to North Shore for world-class surfing (winter) and laid-back vibe. Don't miss Pearl Harbor and hiking up Diamond Head for panoramic views.",
      imageUrl: "/images/oahu-landscape.jpg",
      createdAt: "2023-01-01T00:00:00.000Z",
      updatedAt: "2023-01-01T00:00:00.000Z",
      publishedAt: "2023-01-01T00:00:00.000Z",
      activities: [],
      locale: "en"
    },
    {
      id: 3,
      documentId: "3",
      name: "Kauai",
      slug: "kauai",
      description: "The Garden Isle features dramatic cliffs, lush valleys, and the breathtaking Na Pali Coast.",
      shortDescription: "The Garden Isle with untamed natural splendor",
      image: {
        data: {
          id: 3,
          attributes: {
            url: "/images/kauai-landscape.jpg",
            width: 800,
            height: 500,
            alternativeText: "Kauai landscape",
            name: "kauai-landscape.jpg",
            caption: null,
            formats: {
              thumbnail: {
                url: "/images/kauai-landscape-thumb.jpg",
                width: 200,
                height: 150
              },
              small: {
                url: "/images/kauai-landscape-small.jpg",
                width: 400,
                height: 300
              },
              medium: {
                url: "/images/kauai-landscape-medium.jpg",
                width: 600,
                height: 400
              },
              large: {
                url: "/images/kauai-landscape.jpg",
                width: 800,
                height: 500
              }
            },
            previewUrl: null,
            provider: "local",
            createdAt: "2023-01-01T00:00:00.000Z",
            updatedAt: "2023-01-01T00:00:00.000Z"
          }
        }
      },
      weatherInfo: "Kauai is the rainiest of the Hawaiian islands, particularly around Mount Waialeale (one of the wettest spots on Earth). The island's climate varies dramatically between the wet north/east shores and the drier south/west regions.",
      travelTips: "A helicopter tour offers the best views of the stunning Na Pali Coast and Waimea Canyon. Pack rain gear even in the dry season, as weather can change quickly. Poipu Beach is perfect for family-friendly swimming.",
      imageUrl: "/images/kauai-landscape.jpg",
      createdAt: "2023-01-01T00:00:00.000Z",
      updatedAt: "2023-01-01T00:00:00.000Z",
      publishedAt: "2023-01-01T00:00:00.000Z",
      activities: [],
      locale: "en"
    }
  ];
  
  return new Promise(resolve => {
    setTimeout(() => resolve(mockDestinationsData), 800);
  });
};

export default {
  fetchDestinations,
  fetchDestinationBySlug,
  fetchActivities,
  // For demo purposes
  mockFetchDestinations
};