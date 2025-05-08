import React from 'react';
import type { Destination } from '../../types/api';

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
  const { attributes } = destination;
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <button 
        onClick={onBack}
        className="ml-4 mt-4 px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
        aria-label="Back to all destinations"
      >
        ← Back to all destinations
      </button>
      
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800">{attributes.name}</h2>
        
        {attributes.image?.data && (
          <img 
            src={attributes.image.data.attributes.url} 
            alt={attributes.image.data.attributes.alternativeText || attributes.name} 
            className="w-full h-64 object-cover my-4 rounded"
          />
        )}
        
        {attributes.shortDescription && (
          <p className="text-gray-700 font-medium mb-4">{attributes.shortDescription}</p>
        )}
        
        <p className="text-gray-600 mb-6">{attributes.description}</p>
        
        {/* Weather Info Section */}
        {attributes.weatherInfo && (
          <div className="mb-6">
            <h3 className="font-bold text-lg text-gray-800 mb-2">Weather & Climate</h3>
            <p className="text-gray-600">{attributes.weatherInfo}</p>
          </div>
        )}
        
        {/* Travel Tips Section */}
        {attributes.travelTips && (
          <div className="mb-6">
            <h3 className="font-bold text-lg text-gray-800 mb-2">Travel Tips</h3>
            <p className="text-gray-600">{attributes.travelTips}</p>
          </div>
        )}
        
        {/* Activities Section */}
        <h3 className="font-bold text-lg text-gray-800 mt-6 mb-2">Popular Activities</h3>
        <div className="flex flex-wrap gap-2">
          {attributes.activities.map((activity, index) => (
            <span 
              key={index} 
              className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
            >
              {activity}
            </span>
          ))}
        </div>
        
        {/* Photo Gallery */}
        {attributes.gallery?.data && attributes.gallery.data.length > 0 && (
          <div className="mt-8">
            <h3 className="font-bold text-lg text-gray-800 mb-3">Photo Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {attributes.gallery.data.filter(photo => photo !== null).map((photo, index) => (
                <div key={photo.id} className="h-40 overflow-hidden rounded">
                  <img 
                    src={photo.attributes.url} 
                    alt={photo.attributes.alternativeText || `${attributes.name} photo ${index + 1}`} 
                    className="w-full h-full object-cover transition transform hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationDetail;