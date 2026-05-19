import React from 'react';

interface SkeletonLoaderProps {
  height?: number | string;
  width?: number | string;
  className?: string;
}

export const SkeletonLoader = ({ 
  height = 16, 
  width = '100%', 
  className = '' 
}: SkeletonLoaderProps) => {
  return (
    <div 
      className={`animate-pulse bg-gray-200 rounded ${className}`} 
      style={{ 
        height: typeof height === 'number' ? `${height}px` : height,
        width: typeof width === 'number' ? `${width}px` : width 
      }}
    />
  );
};

interface SkeletonTextProps {
  lines?: number;
  className?: string;
}

export const SkeletonText = ({ lines = 3, className = '' }: SkeletonTextProps) => {
  return (
    <div className={className}>
      {Array.from({ length: lines }).map((_, index) => (
        <div 
          key={index} 
          className="my-1 animate-pulse bg-gray-200 rounded h-4 w-[90%]"
          style={{ 
            width: index === lines - 1 ? '60%' : '90%' 
          }}
        />
      ))}
    </div>
  );
};

interface SkeletonCardProps {
  className?: string;
}

export const SkeletonCard = ({ className = '' }: SkeletonCardProps) => {
  return (
    <div className={`bg-white rounded-lg shadow ${className}`} style={{ height: '120px' }}>
      <div className="p-4">
        <SkeletonText lines={3} />
      </div>
    </div>
  );
};