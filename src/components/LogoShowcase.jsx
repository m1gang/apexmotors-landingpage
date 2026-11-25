import React, { useState, useEffect } from 'react';

// Logo variants configuration
const logoVariants = [
  { file: '/LOGOTIPO 1.svg', name: 'Light Horizontal', color: '#E1E7F5' },
  { file: '/LOGOTIPO 2.svg', name: 'Dark Horizontal', color: '#BE4B6B' },
  { file: '/LOGOTIPO CUADRADO 1.svg', name: 'Light Square', color: '#E1E7F5' },
  { file: '/LOGOTIPO CUADRADO 2.svg', name: 'Dark Square', color: '#BE4B6B' }
];

// CSS-only 3D logo showcase with fade transitions
const LogoShowcase = () => {
  const [currentVariant, setCurrentVariant] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVariant((prev) => (prev + 1) % logoVariants.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const logo = logoVariants[currentVariant];

  return (
    <div className="relative w-64 h-64 md:w-96 md:h-96 mx-auto preserve-3d">
      {/* Background for 3D effect */}
      <div className="absolute inset-0 border-2 border-dashed border-apex-light/20 rounded-full rotate-45"></div>

      {/* Logo with 3D transform */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <img
          src={logo.file}
          alt="Apex Motors Logo"
          className="w-48 h-48 md:w-64 md:h-64 object-contain transition-all duration-1000 ease-in-out"
          style={{
            filter: `drop-shadow(0 0 20px ${logo.color})`,
            color: logo.color,
            transformStyle: 'preserve-3d',
            transform: 'perspective(1000px) rotateY(0deg) rotateX(0deg)'
          }}
        />
      </div>

      {/* Rotating border for 3D effect */}
      <div className="absolute inset-0 border-2 border-apex-dark/30 rounded-full animate-spin-slow"></div>
    </div>
  );
};

export default LogoShowcase;