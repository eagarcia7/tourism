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
const USE_MOCK_DATA = import.meta.env.USE_MOCK_DATA;

/**
 * GraphQL client configuration
 */
const client = new ApolloClient({
  uri: import.meta.env.STRAPI_GRAPHQL_URL || 'http://localhost:1337/graphql',
  cache: new InMemoryCache(),
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Fragment for basic destination fields
 */
const DESTINATION_FRAGMENT = gql`
  fragment DestinationFields on DestinationEntity {
    id
    attributes {
      name
      slug
      description
      shortDescription
      image {
        data {
          attributes {
            url
            width
            height
            alternativeText
          }
        }
      }
      activities
      createdAt
      publishedAt
    }
  }
`;

/**
 * Fragment for basic event fields
 */
const EVENT_FRAGMENT = gql`
  fragment EventFields on EventEntity {
    id
    attributes {
      title
      slug
      description
      date
      location
      image {
        data {
          attributes {
            url
            width
            height
            alternativeText
          }
        }
      }
      category
      url
      createdAt
      publishedAt
    }
  }
`;

/**
 * Get all destinations
 * @returns Promise with destinations data
 */
export const fetchDestinations = async (): Promise<Destination[]> => {
  // If using mock data, return mocks directly
  if (USE_MOCK_DATA) {
    return mockFetchDestinations();
  }

  try {
    const { data } = await client.query({
      query: gql`
        query GetDestinations {
          destinations {
            data {
              ...DestinationFields
            }
          }
        }
        ${DESTINATION_FRAGMENT}
      `
    });
    
    return data.destinations.data;
  } catch (error) {
    console.error('Error fetching destinations:', error);
    // Fall back to mock data if the API request fails
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
  // If using mock data, return from mocks
  if (USE_MOCK_DATA) {
    const destinations = await mockFetchDestinations();
    const destination = destinations.find(d => d.attributes.slug === slug);
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
            data {
              ...DestinationFields
              attributes {
                gallery {
                  data {
                    attributes {
                      url
                      width
                      height
                      alternativeText
                    }
                  }
                }
                weatherInfo
                travelTips
              }
            }
          }
        }
        ${DESTINATION_FRAGMENT}
      `,
      variables: { slug }
    });
    
    if (!data.destinations.data.length) {
      throw new Error(`Destination with slug "${slug}" not found`);
    }
    
    return data.destinations.data[0];
  } catch (error) {
    console.error(`Error fetching destination with slug "${slug}":`, error);
    // Try to fall back to mock data
    console.log('Falling back to mock data for destination');
    const destinations = await mockFetchDestinations();
    const destination = destinations.find(d => d.attributes.slug === slug);
    if (!destination) {
      throw new Error(`Destination with slug "${slug}" not found in mock data`);
    }
    return destination;
  }
};

/**
 * Get all events
 * @returns Promise with events data
 */
export const fetchEvents = async (): Promise<Event[]> => {
  // If using mock data, return mocks directly
  if (USE_MOCK_DATA) {
    return mockFetchEvents();
  }

  try {
    const { data } = await client.query({
      query: gql`
        query GetEvents {
          events {
            data {
              ...EventFields
            }
          }
        }
        ${EVENT_FRAGMENT}
      `
    });
    
    return data.events.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    // Fall back to mock data if the API request fails
    console.log('Falling back to mock data for events');
    return mockFetchEvents();
  }
};

/**
 * Get a single event by slug
 * @param slug - The event slug
 * @returns Promise with event data
 */
export const fetchEventBySlug = async (slug: string): Promise<Event> => {
  // If using mock data, return from mocks
  if (USE_MOCK_DATA) {
    const events = await mockFetchEvents();
    const event = events.find(e => e.attributes.slug === slug);
    if (!event) {
      throw new Error(`Event with slug "${slug}" not found`);
    }
    return event;
  }

  try {
    const { data } = await client.query({
      query: gql`
        query GetEvent($slug: String!) {
          events(filters: { slug: { eq: $slug } }) {
            data {
              ...EventFields
            }
          }
        }
        ${EVENT_FRAGMENT}
      `,
      variables: { slug }
    });
    
    if (!data.events.data.length) {
      throw new Error(`Event with slug "${slug}" not found`);
    }
    
    return data.events.data[0];
  } catch (error) {
    console.error(`Error fetching event with slug "${slug}":`, error);
    // Try to fall back to mock data
    console.log('Falling back to mock data for event');
    const events = await mockFetchEvents();
    const event = events.find(e => e.attributes.slug === slug);
    if (!event) {
      throw new Error(`Event with slug "${slug}" not found in mock data`);
    }
    return event;
  }
};

/**
 * Get all activities
 * @param params - Optional filter parameters
 * @returns Promise with activities data
 */
export const fetchActivities = async (params?: { 
  destinationId?: number;
  category?: string;
}): Promise<Activity[]> => {
  // For mock data, we'll just return some placeholder activities
  if (USE_MOCK_DATA) {
    // This is a simplified version - in a real implementation you would filter based on params
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
                url: "/api/placeholder/800/500",
                width: 800,
                height: 500,
                alternativeText: "Snorkeling at Molokini Crater",
                name: "snorkeling.jpg",
                caption: null,
                formats: {
                  thumbnail: {
                    url: "/api/placeholder/200/150",
                    width: 200,
                    height: 150
                  },
                  small: {
                    url: "/api/placeholder/400/300",
                    width: 400,
                    height: 300
                  },
                  medium: {
                    url: "/api/placeholder/600/400",
                    width: 600,
                    height: 400
                  },
                  large: {
                    url: "/api/placeholder/800/500",
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
                url: "/api/placeholder/800/500",
                width: 800,
                height: 500,
                alternativeText: "Road to Hana Tour",
                name: "road-to-hana.jpg",
                caption: null,
                formats: {
                  thumbnail: {
                    url: "/api/placeholder/200/150",
                    width: 200,
                    height: 150
                  },
                  small: {
                    url: "/api/placeholder/400/300",
                    width: 400,
                    height: 300
                  },
                  medium: {
                    url: "/api/placeholder/600/400",
                    width: 600,
                    height: 400
                  },
                  large: {
                    url: "/api/placeholder/800/500",
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
                url: "/api/placeholder/800/500",
                width: 800,
                height: 500,
                alternativeText: "Traditional Luau",
                name: "luau.jpg",
                caption: null,
                formats: {
                  thumbnail: {
                    url: "/api/placeholder/200/150",
                    width: 200,
                    height: 150
                  },
                  small: {
                    url: "/api/placeholder/400/300",
                    width: 400,
                    height: 300
                  },
                  medium: {
                    url: "/api/placeholder/600/400",
                    width: 600,
                    height: 400
                  },
                  large: {
                    url: "/api/placeholder/800/500",
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
  }

  try {
    let filterVariables = {};
    let filterQuery = '';
    
    if (params?.destinationId) {
      filterVariables = { ...filterVariables, destinationId: params.destinationId };
      filterQuery = `(filters: { destination: { id: { eq: $destinationId } } })`;
    }
    
    if (params?.category) {
      filterVariables = { ...filterVariables, category: params.category };
      filterQuery = filterQuery 
        ? filterQuery.replace(')', `, category: { eq: $category } })`) 
        : `(filters: { category: { eq: $category } })`;
    }
    
    const { data } = await client.query({
      query: gql`
        query GetActivities${Object.keys(filterVariables).length ? `($${Object.keys(filterVariables).join(': String!, $')}: String!)` : ''} {
          activities${filterQuery} {
            data {
              id
              attributes {
                title
                slug
                description
                shortDescription
                featuredImage {
                  data {
                    attributes {
                      url
                      width
                      height
                      alternativeText
                    }
                  }
                }
                priceRange
                duration
                category
                createdAt
                publishedAt
              }
            }
          }
        }
      `,
      variables: filterVariables
    });
    
    return data.activities.data;
  } catch (error) {
    console.error('Error fetching activities:', error);
    console.log('Falling back to mock activities data');
    // Return mock activities as a fallback
    return [
      // Mock activities would be returned here
    ];
  }
};

// Mock implementations for demo
// In a real implementation, these would be actual GraphQL queries as above

/**
 * Mock function to fetch destinations data
 * @returns Promise with mock destinations
 */
export const mockFetchDestinations = async (): Promise<Destination[]> => {
  const mockDestinationsData = [
    {
      id: 1,
      attributes: {
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
                  url: "/api/placeholder/200/150",
                  width: 200,
                  height: 150
                },
                small: {
                  url: "/api/placeholder/400/300",
                  width: 400,
                  height: 300
                },
                medium: {
                  url: "/api/placeholder/600/400",
                  width: 600,
                  height: 400
                },
                large: {
                  url: "/api/placeholder/800/500",
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
        activities: ["Surfing", "Hiking", "Snorkeling"],
        createdAt: "2023-01-01T00:00:00.000Z",
        updatedAt: "2023-01-01T00:00:00.000Z",
        publishedAt: "2023-01-01T00:00:00.000Z",
        locale: "en"
      }
    },
    {
      id: 2,
      attributes: {
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
                  url: "/api/placeholder/200/150",
                  width: 200,
                  height: 150
                },
                small: {
                  url: "/api/placeholder/400/300",
                  width: 400,
                  height: 300
                },
                medium: {
                  url: "/api/placeholder/600/400",
                  width: 600,
                  height: 400
                },
                large: {
                  url: "/api/placeholder/800/500",
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
        activities: ["Shopping", "Historical Tours", "Beach Activities"],
        createdAt: "2023-01-01T00:00:00.000Z",
        updatedAt: "2023-01-01T00:00:00.000Z",
        publishedAt: "2023-01-01T00:00:00.000Z",
        locale: "en"
      }
    },
    {
      id: 3,
      attributes: {
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
                  url: "/api/placeholder/200/150",
                  width: 200,
                  height: 150
                },
                small: {
                  url: "/api/placeholder/400/300",
                  width: 400,
                  height: 300
                },
                medium: {
                  url: "/api/placeholder/600/400",
                  width: 600,
                  height: 400
                },
                large: {
                  url: "/api/placeholder/800/500",
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
        activities: ["Kayaking", "Helicopter Tours", "Nature Walks"],
        createdAt: "2023-01-01T00:00:00.000Z",
        updatedAt: "2023-01-01T00:00:00.000Z",
        publishedAt: "2023-01-01T00:00:00.000Z",
        locale: "en"
      }
    }
  ];
  
  return new Promise(resolve => {
    setTimeout(() => resolve(mockDestinationsData), 800);
  });
};

/**
 * Mock function to fetch events data
 * @returns Promise with mock events
 */
export const mockFetchEvents = async (): Promise<Event[]> => {
  const mockEventsData = [
    {
      id: 1,
      attributes: {
        title: "Annual Lei Day Celebration",
        slug: "lei-day-celebration",
        description: "A celebration of Hawaiian culture featuring lei-making contests and hula performances.",
        date: "May 1, 2025",
        location: "Kapiolani Park",
        image: {
          data: {
            id: 4,
            attributes: {
              url: "/images/Lei-day-celebration.jpg",
              width: 800,
              height: 500,
              alternativeText: "Lei Day celebration",
              name: "lei-day.jpg",
              caption: null,
              formats: {
                thumbnail: {
                  url: "/api/placeholder/200/150",
                  width: 200,
                  height: 150
                },
                small: {
                  url: "/api/placeholder/400/300",
                  width: 400,
                  height: 300
                },
                medium: {
                  url: "/api/placeholder/600/400",
                  width: 600,
                  height: 400
                },
                large: {
                  url: "/api/placeholder/800/500",
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
        category: "Cultural",
        url: "https://example.com/events/lei-day",
        createdAt: "2023-01-01T00:00:00.000Z",
        updatedAt: "2023-01-01T00:00:00.000Z",
        publishedAt: "2023-01-01T00:00:00.000Z",
        locale: "en"
      }
    },
    {
      id: 2,
      attributes: {
        title: "Honolulu Festival",
        slug: "honolulu-festival",
        description: "A cultural exchange event celebrating the relationship between Hawaii and the Asia-Pacific region.",
        date: "March 8-9, 2025",
        location: "Honolulu",
        image: {
          data: {
            id: 5,
            attributes: {
              url: "/images/honolulu-festival.jpg",
              width: 800,
              height: 500,
              alternativeText: "Honolulu Festival",
              name: "honolulu-festival.jpg",
              caption: null,
              formats: {
                thumbnail: {
                  url: "/api/placeholder/200/150",
                  width: 200,
                  height: 150
                },
                small: {
                  url: "/api/placeholder/400/300",
                  width: 400,
                  height: 300
                },
                medium: {
                  url: "/api/placeholder/600/400",
                  width: 600,
                  height: 400
                },
                large: {
                  url: "/api/placeholder/800/500",
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
        category: "Festival",
        url: "https://example.com/events/honolulu-festival",
        createdAt: "2023-01-01T00:00:00.000Z",
        updatedAt: "2023-01-01T00:00:00.000Z",
        publishedAt: "2023-01-01T00:00:00.000Z",
        locale: "en"
      }
    }
  ];
  
  return new Promise(resolve => {
    setTimeout(() => resolve(mockEventsData), 800);
  });
};

export default {
  fetchDestinations,
  fetchDestinationBySlug,
  fetchEvents,
  fetchEventBySlug,
  fetchActivities,
  // For demo purposes
  mockFetchDestinations,
  mockFetchEvents
};