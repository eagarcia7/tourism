import React from 'react';
import type { Destination } from '../../types/api';

interface Props {
  destination: Destination;
}

const DestinationCard: React.FC<Props> = ({ destination }) => {
  const { name, slug, shortDescription, image, imageUrl } = destination.attributes;
  
  return (
    <a 
      href={`/islands/${slug}`} 
      className="group block relative aspect-[4/3] overflow-hidden rounded-lg"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={imageUrl}
          alt={image?.data?.attributes.alternativeText || name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
      </div>
      
      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-6 text-white">
        <h3 className="text-2xl font-bold mb-2 text-white">
          {name}
        </h3>
        {shortDescription && (
          <p className="text-sm text-white/90 mb-4 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            {shortDescription}
          </p>
        )}
        <div className="flex items-center text-sm font-medium">
          <span>Explore</span>
          <svg 
            className="w-4 h-4 ml-1 transform transition-transform duration-300 group-hover:translate-x-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5l7 7-7 7" 
            />
          </svg>
        </div>
      </div>
    </a>
  );
};

export default DestinationCard;