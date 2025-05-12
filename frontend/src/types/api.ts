import type { ContentAttributes, MediaItem } from './index';

/**
 * API response format from Strapi
 */
export interface ApiResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/**
 * Single item API response format from Strapi
 */
export interface SingleItemApiResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}

/**
 * Error response from API
 */
export interface ApiError {
  status: number;
  name: string;
  message: string;
  details: unknown;
}

/**
 * Destination data structure from CMS
 */
export interface Destination {
  documentId: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  image: MediaItem;
  gallery?: {
    data: Array<MediaItem['data']>;
  };
  activities: string[];
  weatherInfo?: string;
  travelTips?: string;
  imageUrl?: string;
}

/**
 * Event data structure from CMS
 */
export interface Event {
  id: number;
  attributes: ContentAttributes & {
    title: string;
    slug: string;
    description: string;
    date: string;
    location: string;
    image?: MediaItem;
    category?: string;
    url?: string;
  };
}

/**
 * Activity data structure from CMS
 */
export interface Activity {
  id: number;
  attributes: ContentAttributes & {
    title: string;
    slug: string;
    description: string;
    shortDescription?: string;
    featuredImage: MediaItem;
    gallery?: {
      data: Array<MediaItem['data']>;
    };
    priceRange: string;
    duration: string;
    category: string;
    location: {
      address: string;
      city: string;
      zipCode: string;
      coordinates: {
        lat: number;
        lng: number;
      };
    };
    bookingInfo?: string;
  };
}

/**
 * Accommodation data structure from CMS
 */
export interface Accommodation {
  id: number;
  attributes: ContentAttributes & {
    name: string;
    slug: string;
    description: string;
    shortDescription?: string;
    featuredImage: MediaItem;
    accommodationType: string;
    priceRange: string;
    amenities: string[];
    location: {
      address: string;
      city: string;
      zipCode: string;
      coordinates: {
        lat: number;
        lng: number;
      };
    };
    websiteUrl?: string;
    bookingUrl?: string;
    contactInfo?: string;
  };
}

/**
 * Restaurant data structure from CMS
 */
export interface Restaurant {
  id: number;
  attributes: ContentAttributes & {
    name: string;
    slug: string;
    description: string;
    shortDescription?: string;
    featuredImage: MediaItem;
    cuisineType: string;
    priceRange: string;
    hoursOfOperation: {
      [key: string]: {
        open: string;
        close: string;
        isClosed: boolean;
      };
    };
    location: {
      address: string;
      city: string;
      zipCode: string;
      coordinates: {
        lat: number;
        lng: number;
      };
    };
    menuUrl?: string;
    reservationUrl?: string;
    contactInfo?: string;
  };
}

/**
 * Blog post data structure from CMS
 */
export interface BlogPost {
  id: number;
  attributes: ContentAttributes & {
    title: string;
    slug: string;
    content: string;
    featuredImage: MediaItem;
    publishDate: string;
    author: {
      data: {
        id: number;
        attributes: {
          name: string;
          email: string;
          avatar?: MediaItem;
        };
      };
    };
    categories: {
      data: Array<{
        id: number;
        attributes: {
          name: string;
          slug: string;
        };
      }>;
    };
  };
}