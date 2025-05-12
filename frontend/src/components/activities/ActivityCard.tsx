import React from 'react';
import type { Activity } from '../../types';
import ImageWithFallback from '../common/ImageWithFallback';
import Badge from '../ui/Badge';
import Icon from '../ui/Icon';
import ArrowLink from '../common/ArrowLink';

interface ActivityCardProps {
  /** Activity data to display */
  activity: Activity;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Card component for displaying activity details
 */
const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  className = ''
}) => {
  const { attributes } = activity;

  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition ${className}`}
    >
      {attributes.featuredImage?.data && (
        <div className="h-48 overflow-hidden">
          <ImageWithFallback 
            imageData={{
              ...attributes.featuredImage.data,
              attributes: {
                ...attributes.featuredImage.data.attributes,
                alternativeText: attributes.featuredImage.data.attributes.alternativeText ?? undefined,
              },
            }}
            altText={attributes.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-gray-800">{attributes.title}</h3>
          <Badge label={attributes.category} color="blue" />
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mt-2 mb-3 gap-4">
          <span className="flex items-center gap-1">
            <Icon name="clock" size="sm" className="text-gray-500" />
            <span>{attributes.duration}</span>
          </span>
          <span className="flex items-center gap-1">
            <Icon name="dollar" size="sm" className="text-gray-500" />
            <span>{attributes.priceRange}</span>
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {attributes.shortDescription || attributes.description}
        </p>
        
        <a 
          href={`/activities/${attributes.slug}`}
          className="inline-block w-full text-center text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition group"
        >
          <span className="flex items-center justify-center">
            Learn More
            <Icon 
              name="arrow-right" 
              size="sm" 
              className="ml-1 transform transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </a>
      </div>
    </div>
  );
};

export default ActivityCard;
