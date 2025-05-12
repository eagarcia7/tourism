import React from 'react';
import type { Destination } from '../../types/api';
import BackButton from '../common/BackButton';
import InfoSection from '../common/InfoSection';
import PhotoGallery from '../common/PhotoGallery';
import TagList from '../common/TagList';

interface DestinationDetailProps {
  /** Destination data to display */
  destination: Destination;
  /** Function to handle back button click */
  onBack: () => void;
}

/**
 * Component to display detailed information about a destination
 */
const DestinationDetail: React.FC<DestinationDetailProps> = ({
  destination,
  onBack
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <BackButton onBack={onBack} label="Back to all destinations" />
      
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800">{destination.name}</h2>
        
        {destination.imageUrl && (
          <img 
            src={destination.imageUrl} 
            alt={destination.name} 
            className="w-full h-64 object-cover my-4 rounded"
          />
        )}
        
        {destination.shortDescription && (
          <InfoSection 
            title={destination.shortDescription}
            content={destination.description}
          />
        )}

        {/* Weather Info Section */}
        {destination.weatherInfo && (
          <InfoSection
            title="Weather & Climate"
            content={destination.weatherInfo}
          />
        )}
        
        {/* Travel Tips Section */}
        {destination.travelTips && (
          <InfoSection
            title="Travel Tips"
            content={destination.travelTips}
          />
        )}
        
        {/* Activities Section */}
        <h3 className="font-bold text-lg text-gray-800 mt-6 mb-2">Popular Activities</h3>
        <TagList 
          items={destination.activities || []} 
          className="bg-blue-100 text-blue-800" 
        />
        
        {/* Photo Gallery */}
        {/* {destination.gallery?.data && destination.gallery.data.length > 0 && (
          <div className="mt-8">
            <h3 className="font-bold text-lg text-gray-800 mb-3">Photo Gallery</h3>
            <PhotoGallery 
              photos={destination.gallery.data.filter(photo => photo !== null)} 
              namePrefix={destination.name}
            />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default DestinationDetail;