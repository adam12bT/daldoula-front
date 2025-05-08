import React from 'react';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  online?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 'md', online }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  return (
    <div className="relative">
      <img 
        src={src} 
        alt={alt} 
        className={`${sizeClasses[size]} rounded-full object-cover border-2 border-white`} 
      />
      {online !== undefined && (
        <span 
          className={`absolute bottom-0 right-0 block rounded-full ${online ? 'bg-green-500' : 'bg-gray-400'}`}
          style={{ 
            width: size === 'sm' ? '8px' : '10px', 
            height: size === 'sm' ? '8px' : '10px',
            border: '2px solid #ffffff'
          }}
        />
      )}
    </div>
  );
};

export default Avatar;