
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl">
      <div className="relative h-24 w-24">
        <div className="absolute top-0 left-0 h-full w-full border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center text-blue-500">
          ✈️
        </div>
      </div>
      <p className="mt-6 text-lg font-semibold text-gray-700">
        あなたにぴったりの場所を探しています...
      </p>
    </div>
  );
};

export default LoadingSpinner;
