import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 100 100" 
    className={className}
    fill="none"
  >
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00d4ff" />
        <stop offset="50%" stopColor="#d946ef" />
        <stop offset="100%" stopColor="#fbbf24" />
      </linearGradient>
    </defs>
    {/* Outer Cube */}
    <path d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z" stroke="url(#logoGradient)" strokeWidth="6" strokeLinejoin="round" />
    <path d="M50 10 L50 50 L90 30" stroke="url(#logoGradient)" strokeWidth="6" strokeLinejoin="round" />
    <path d="M10 30 L50 50 L50 90" stroke="url(#logoGradient)" strokeWidth="6" strokeLinejoin="round" />
    
    {/* Inner Cube */}
    <path d="M50 30 L70 40 L70 60 L50 70 L30 60 L30 40 Z" stroke="url(#logoGradient)" strokeWidth="4" strokeLinejoin="round" />
    <path d="M50 30 L50 50 L70 40" stroke="url(#logoGradient)" strokeWidth="4" strokeLinejoin="round" />
    <path d="M30 40 L50 50 L50 70" stroke="url(#logoGradient)" strokeWidth="4" strokeLinejoin="round" />
    
    {/* Connecting Lines */}
    <line x1="10" y1="30" x2="30" y2="40" stroke="url(#logoGradient)" strokeWidth="4" strokeLinecap="round" />
    <line x1="90" y1="30" x2="70" y2="40" stroke="url(#logoGradient)" strokeWidth="4" strokeLinecap="round" />
    <line x1="10" y1="70" x2="30" y2="60" stroke="url(#logoGradient)" strokeWidth="4" strokeLinecap="round" />
    <line x1="90" y1="70" x2="70" y2="60" stroke="url(#logoGradient)" strokeWidth="4" strokeLinecap="round" />
    <line x1="50" y1="10" x2="50" y2="30" stroke="url(#logoGradient)" strokeWidth="4" strokeLinecap="round" />
    <line x1="50" y1="90" x2="50" y2="70" stroke="url(#logoGradient)" strokeWidth="4" strokeLinecap="round" />
  </svg>
);
