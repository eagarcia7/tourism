import type { Activity } from '../types';

/**
 * Mock activities data for development and testing
 */
export const MOCK_ACTIVITIES: Activity[] = [
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