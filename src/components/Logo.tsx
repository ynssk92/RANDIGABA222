import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'header' | 'footer' | 'large' | 'hero';
  light?: boolean;
  withSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'header',
  light = false,
  withSubtitle = false,
}) => {
  // Official Dar Randigaba asset path
  const logoSrc = '/assets/aistudio/logo-randigaba_2x_0bd4f40f.png';

  // Size configurations preserving exact natural proportions
  let heightClass = 'h-8 sm:h-9';
  if (variant === 'large') {
    heightClass = 'h-14 sm:h-16 md:h-20';
  } else if (variant === 'footer') {
    heightClass = 'h-11 sm:h-13';
  } else if (variant === 'hero') {
    heightClass = 'h-12 sm:h-16';
  }

  // Filter to render authentic warm ivory/white when on dark backgrounds, or natural olive on light
  const filterStyle = light
    ? {
        filter:
          'brightness(0) saturate(100%) invert(98%) sepia(3%) saturate(543%) hue-rotate(336deg) brightness(102%) contrast(97%)',
      }
    : undefined;

  return (
    <div className={`inline-flex flex-col items-start select-none ${className}`}>
      <img
        src={logoSrc}
        alt="Dar Randigaba — Official Logo"
        className={`${heightClass} w-auto object-contain transition-all duration-300`}
        style={filterStyle}
      />
      {withSubtitle && (
        <span
          className={`text-[9px] sm:text-[10px] tracking-[0.32em] uppercase mt-2 font-sans font-medium ${
            light ? 'text-[#D9C8AE]' : 'text-[#4B502E]'
          }`}
        >
          Taroudant · Morocco
        </span>
      )}
    </div>
  );
};
