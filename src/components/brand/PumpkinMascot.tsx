import React from 'react';

export type PumpkinPose = 'study' | 'sleep' | 'snack' | 'stress' | 'lab' | 'happy' | 'thinking';

interface PumpkinMascotProps {
  pose?: PumpkinPose;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  className?: string;
  alt?: string;
}

export const PumpkinMascot: React.FC<PumpkinMascotProps> = ({
  pose = 'study',
  size = 'md',
  className = '',
  alt = 'น้องพัมคิน (Pumpkin - Professor Meow)',
}) => {
  const sizeMap = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
    xl: 'w-32 h-32',
    hero: 'w-48 h-48 sm:w-60 sm:h-60',
  };

  if (pose === 'lab') {
    return (
      <div className={`relative inline-block overflow-hidden rounded-2xl shadow-sm ${className}`}>
        <img
          src="/mascot/pumpkin_lab.jpg"
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }

  // Poses extracted from pumpkin_poses.png sprite
  // Top-left: study, Top-right: sleep, Bottom-left: snack, Bottom-right: stress
  let spritePosition = '0% 0%';
  if (pose === 'sleep') spritePosition = '100% 0%';
  else if (pose === 'snack') spritePosition = '0% 100%';
  else if (pose === 'stress' || pose === 'thinking') spritePosition = '100% 100%';
  else if (pose === 'happy') spritePosition = '0% 100%';

  return (
    <div
      className={`inline-block shrink-0 select-none transition-transform hover:scale-105 ${sizeMap[size]} ${className}`}
      title="น้องพัมคิน แมวส้มแว่นกลม สวมกาวน์โบว์ม่วง"
    >
      <div
        className="w-full h-full rounded-2xl"
        style={{
          backgroundImage: 'url(/mascot/pumpkin_poses.png)',
          backgroundSize: '200% 200%',
          backgroundPosition: spritePosition,
          backgroundRepeat: 'no-repeat',
        }}
        aria-label={alt}
      />
    </div>
  );
};
