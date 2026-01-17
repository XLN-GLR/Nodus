
import React from 'react';
import { ThemeColor, AppMode } from '../types';
import { THEMES } from '../constants';

interface NodusLogoProps {
  size?: number;
  theme: ThemeColor;
  mode: AppMode;
  className?: string;
}

const NodusLogo: React.FC<NodusLogoProps> = ({ size = 40, theme, mode, className = "" }) => {
  const isNeon = mode === AppMode.NEON;
  const isHighContrast = mode === AppMode.HIGH_CONTRAST;
  const themeColors = THEMES[theme];

  // Colores dinámicos basados en el modo
  const accentColor = isNeon ? '#ff00ff' : (isHighContrast ? '#ffff00' : '#4f46e5');
  const ringColor = isNeon ? '#00ffff' : (isHighContrast ? '#ffffff' : '#94a3b8');

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} transition-all duration-500`}
    >
      <defs>
        {/* Filtro de resplandor para modo Neón */}
        <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        
        {/* Degradado para la Flecha de Ascenso */}
        <linearGradient id="arrowGradient" x1="50" y1="30" x2="50" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={isNeon ? '#ff00ff' : (isHighContrast ? '#ffffff' : '#6366f1')} />
          <stop offset="100%" stopColor={isNeon ? '#7000ff' : (isHighContrast ? '#ffff00' : '#4338ca')} />
        </linearGradient>
      </defs>

      {/* 1. ANILLO PERIMETRAL (Tiempo y Enfoque) */}
      <circle 
        cx="50" cy="50" r="45" 
        stroke={ringColor} 
        strokeWidth="4" 
        strokeDasharray="15 5" 
        strokeLinecap="round"
        opacity={isNeon ? "0.8" : "0.3"}
        filter={isNeon ? "url(#neonGlow)" : "none"}
      />

      {/* 2. LA FLECHA CENTRAL (Gamificación y Ascenso) */}
      <path 
        d="M50 25 L75 55 L60 55 L60 75 L40 75 L40 55 L25 55 Z" 
        fill="url(#arrowGradient)"
        filter={isNeon ? "url(#neonGlow)" : "none"}
        className="transition-all duration-500"
      />

      {/* 3. EL NODO CONECTOR (Libro y Check) */}
      <path 
        d="M35 75 C35 75 42 82 50 82 C58 82 65 75 65 75 M40 82 L50 90 L70 70" 
        stroke={isNeon ? "#ffffff" : (isHighContrast ? "#ffffff" : "#1e293b")}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={isNeon ? "url(#neonGlow)" : "none"}
      />
    </svg>
  );
};

export default NodusLogo;
