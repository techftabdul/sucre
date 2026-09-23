import React from 'react';
import mainLogo from './logo/main logo.png';
import goldHorizontalLogo from './logo/sucre gold horizontal.png';
import sureGoldLogo from './logo/sure gold.png';
import whiteHorizontalLogo from './logo/sucre white horizontal.png';
import secondaryLogo from './logo/secondary logo.png';

export default function SucreLogo({ className = "h-24 md:h-32", variant = "main" }) {
  let logoSrc = mainLogo;

  if (variant === "horizontal" || variant === "gold") {
    logoSrc = goldHorizontalLogo;
  } else if (variant === "white") {
    logoSrc = whiteHorizontalLogo;
  } else if (variant === "secondary") {
    logoSrc = secondaryLogo;
  } else if (variant === "icon-only" || variant === "icon") {
    logoSrc = sureGoldLogo;
  }

  return (
    <div className="inline-flex items-center justify-start select-none shrink-0 overflow-visible py-1">
      <img 
        src={logoSrc} 
        alt="SUCRE Events Centre - The Cathedral" 
        className={`w-auto object-contain scale-110 transition-transform duration-300 filter drop-shadow-[0_0_15px_rgba(212,175,55,0.45)] ${className}`} 
      />
    </div>
  );
}
