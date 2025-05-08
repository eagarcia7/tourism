import React from 'react';

interface ExperienceCardProps {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  title,
  description,
  imageUrl,
  link
}) => {
  return (
    <a 
      href={link}
      className="group block relative aspect-video overflow-hidden rounded-lg bg-gray-900"
    >
      {/* Background Image */}
      <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover opacity-90 group-hover:opacity-75 transition-opacity duration-300"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-8 text-white">
        <h3 className="text-2xl font-bold mb-3 transform transition-transform duration-300 group-hover:-translate-y-2">
          {title}
        </h3>
        <p className="text-sm text-white/80 mb-6 max-w-md transform transition-all duration-300 group-hover:-translate-y-2">
          {description}
        </p>
        <div className="flex items-center text-sm font-medium transform transition-all duration-300 group-hover:-translate-y-2">
          <span>Learn More</span>
          <svg 
            className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M17 8l4 4m0 0l-4 4m4-4H3" 
            />
          </svg>
        </div>
      </div>
    </a>
  );
};

export default ExperienceCard;