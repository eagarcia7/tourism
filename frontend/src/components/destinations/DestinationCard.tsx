import React from 'react';
import type { Destination } from '../../types/api';
import ImageWithFallback from '../common/ImageWithFallback';
import GradientOverlay from '../common/GradientOverlay';
import ArrowLink from '../common/ArrowLink';

interface DestinationCardProps {
  /** Destination data to display */
  destination: Destination;
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Card component for displaying destination previews
 */
const DestinationCard: React.FC<DestinationCardProps> = ({ 
  destination,
  className = ''
}) => {
  return (
    <a 
      href={`/islands/${destination.slug}`} 
      className={`group block relative aspect-[4/3] overflow-hidden rounded-lg ${className}`}
    >
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <ImageWithFallback
          imageData={
            destination.image?.data
              ? {
                  ...destination.image.data,
                  attributes: {
                    ...destination.image.data.attributes,
                    alternativeText: destination.image.data.attributes.alternativeText ?? undefined,
                  },
                }
              : undefined
          }
          fallbackUrl={destination.imageUrl}
          altText={destination.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <GradientOverlay 
          direction="to-t" 
          className="group-hover:opacity-90" 
        />
      </div>
      
      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-6 text-white">
        <h3 className="text-2xl font-bold mb-2 text-white">
          {destination.name}
        </h3>
        {destination.shortDescription && (
          <p className="text-sm text-white/90 mb-4 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            {destination.shortDescription}
          </p>
        )}
        <ArrowLink label="Explore" />
      </div>
    </a>
  );
};

export default DestinationCard;