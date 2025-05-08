/**
 * Central type definitions for the Hawaii Tourism project
 */

// Re-export common types
// export * from './common';

// Re-export API types
export * from './api';



export interface HeaderProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  backgroundImage?: string;
  isTransparent?: boolean;
  navigationItems?: Array<{
    url: string;
    label: string;
    isActive?: boolean;
  }>;
}

/**
 * Navigation item interface for Header and MainLayout
 */
export interface NavigationItem {
    /** Label displayed for the navigation item */
    label: string;
    /** URL the item links to */
    url: string;
    /** Whether the item is currently active */
    isActive?: boolean;
}


export interface SocialMediaLink {
  /** Platform name (e.g., "Facebook", "Instagram") */
  platform: string;
  /** URL to social media profile */
  url: string;
  /** Icon name or path */
  icon: string;
}

export interface FooterNavSection {
  /** Section title */
  title: string;
  /** Links within this section */
  links: Array<{
    label: string;
    url: string;
  }>;
}

export interface FooterProps {
  /** Main title for the footer */
  title?: string;
  /** Subtitle or tagline for the footer */
  subtitle?: string;
  /** Tech stack or similar information to display */
  techStack?: string[];
  /** Copyright notice text */
  copyrightText?: string;
  /** Array of social media links */
  socialLinks?: SocialMediaLink[];
  /** Navigation sections for the footer */
  navSections?: FooterNavSection[];
  /** Year for copyright notice */
  year?: number;
}

/**
 * Navigation tab interface
 */
export interface NavigationTab {
    /** Unique identifier for the tab */
    id: string;
    /** Display label for the tab */
    label: string;
    /** URL path the tab links to */
    path?: string;
    /** Icon name or class (optional) */
    icon?: string;
    /** Whether the tab is disabled */
    disabled?: boolean;
}

  /**
   * Props for the Navigation component
   */
export interface NavigationProps {
    /** Array of navigation tabs */
    tabs: NavigationTab[];
    /** ID of the currently active tab */
    activeTab?: string;
    /** Callback function when a tab is changed */
    onTabChange?: (tabId: string) => void;
    /** Whether to use router for navigation */
    useRouter?: boolean;
    /** CSS class for the navigation container */
    className?: string;
    /** Whether to render tabs as pills */
    variant?: 'tabs' | 'pills' | 'underline';
}


/**
 * Common type definitions for the Hawaii Tourism project
 */

/**
 * Content item attributes from Strapi CMS
 */
export interface ContentAttributes {
    /** Creation date */
    createdAt: string;
    /** Last update date */
    updatedAt: string;
    /** Publication date */
    publishedAt: string;
    /** Locale of the content */
    locale: string;
  }
  
  /**
   * Media object from Strapi CMS
   */
  export interface MediaItem {
    data: {
      id: number;
      attributes: {
        name: string;
        alternativeText: string | null;
        caption: string | null;
        width: number;
        height: number;
        formats: {
          thumbnail: {
            url: string;
            width: number;
            height: number;
          };
          small: {
            url: string;
            width: number;
            height: number;
          };
          medium: {
            url: string;
            width: number;
            height: number;
          };
          large: {
            url: string;
            width: number;
            height: number;
          };
        };
        url: string;
        previewUrl: string | null;
        provider: string;
        createdAt: string;
        updatedAt: string;
      };
    } | null;
  }
  
  /**
   * Destination data structure from CMS
   */
  export interface Destination {
    id: number;
    attributes: ContentAttributes & {
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
    };
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
      imageUrl?: string;
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
    meta: {};
  }
  
  /**
   * Error response from API
   */
  export interface ApiError {
    status: number;
    name: string;
    message: string;
    details: any;
  }