import React from 'react';

export const AppLogoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    {/* 3D Isometric Cube */}
    <path d="M12 4.5L3.5 9.5L12 14.5L20.5 9.5L12 4.5Z" fillOpacity="0.3" />
    <path d="M3.5 9.5V18.5L12 23.5V14.5L3.5 9.5Z" fillOpacity="0.6" />
    <path d="M20.5 9.5V18.5L12 23.5V14.5L20.5 9.5Z" fillOpacity="1.0" />
    
    {/* Sparkle / Star element for "Creative" nuance */}
    <path d="M12 0L12.8 2.5L15.5 3.3L12.8 4.1L12 6.6L11.2 4.1L8.5 3.3L11.2 2.5L12 0Z" fillOpacity="0.9" />
    <path d="M19 2L19.4 3.2L20.5 3.5L19.4 3.8L19 5L18.6 3.8L17.5 3.5L18.6 3.2L19 2Z" fillOpacity="0.7" />
    <path d="M5 2.5L5.3 3.4L6.2 3.7L5.3 4L5 4.9L4.7 4L3.8 3.7L4.7 3.4L5 2.5Z" fillOpacity="0.5" />
  </svg>
);