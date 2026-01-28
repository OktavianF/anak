import React from 'react';

export function AssessmentBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      <div className="absolute top-10 left-10 transform rotate-12">
        <svg width="60" height="60" viewBox="0 0 60 60" className="text-white">
          <path
            d="M10 10h15v15h-15z M25 10h15v15h-15z M10 25h15v15h-15z M25 25h15v15h-15z"
            fill="currentColor"
            opacity="0.3"
          />
        </svg>
      </div>
      <div className="absolute top-20 right-20 transform -rotate-45">
        <svg width="80" height="80" viewBox="0 0 80 80" className="text-white">
          <path
            d="M15 15h20v20h-20z M35 15h20v20h-20z M15 35h20v20h-20z M35 35h20v20h-20z"
            fill="currentColor"
            opacity="0.3"
          />
        </svg>
      </div>
      <div className="absolute bottom-20 left-16 transform rotate-45">
        <svg width="70" height="70" viewBox="0 0 70 70" className="text-white">
          <path
            d="M12 12h18v18h-18z M30 12h18v18h-18z M12 30h18v18h-18z M30 30h18v18h-18z"
            fill="currentColor"
            opacity="0.3"
          />
        </svg>
      </div>
      <div className="absolute bottom-10 right-10 transform -rotate-12">
        <svg width="50" height="50" viewBox="0 0 50 50" className="text-white">
          <path
            d="M8 8h12v12h-12z M20 8h12v12h-12z M8 20h12v12h-12z M20 20h12v12h-12z"
            fill="currentColor"
            opacity="0.3"
          />
        </svg>
      </div>
    </div>
  );
}
