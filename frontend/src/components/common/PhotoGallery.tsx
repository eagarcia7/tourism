import React, { useState } from 'react';

interface Photo {
  id: string | number;
  attributes: {
    url: string;
    alternativeText?: string;
  };
}

interface PhotoGalleryProps {
  /** Array of photo objects to display */
  photos: Photo[];
  /** Prefix for alt text if no alternativeText is available */
  namePrefix?: string;
  /** Number of columns for different screen sizes */
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
  };
}

/**
 * Reusable photo gallery component with optional lightbox functionality
 */
const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  photos,
  namePrefix = '',
  columns = { sm: 2, md: 3 }
}) => {
  // Future enhancement: add lightbox functionality
  // const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  // Determine grid column class based on props
  const getGridClass = () => {
    const sm = columns.sm || 2;
    const md = columns.md || 3;
    return `grid-cols-${sm} md:grid-cols-${md}`;
  };

  return (
    <div className={`grid ${getGridClass()} gap-4`}>
      {photos.map((photo, index) => (
        <div key={photo.id} className="h-40 overflow-hidden rounded">
          <img 
            src={photo.attributes.url} 
            alt={photo.attributes.alternativeText || `${namePrefix} photo ${index + 1}`} 
            className="w-full h-full object-cover transition transform hover:scale-110"
            // onClick={() => setSelectedPhoto(photo)}
          />
        </div>
      ))}
      
      {/* Lightbox placeholder for future enhancement */}
      {/* {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <img 
              src={selectedPhoto.attributes.url} 
              alt={selectedPhoto.attributes.alternativeText || "Enlarged photo"} 
              className="max-w-full max-h-[90vh] object-contain"
            />
            <button 
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-2 right-2 bg-white rounded-full p-2"
              aria-label="Close lightbox"
            >
              X
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default PhotoGallery;