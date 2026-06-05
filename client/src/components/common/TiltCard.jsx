import { useState, useRef } from 'react';

const TiltCard = ({ children, className = '', intensity = 15 }) => {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({});

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position inside the card
    const y = e.clientY - rect.top;  // y position inside the card

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation degree (between -intensity and intensity)
    const rotateX = ((centerY - y) / centerY) * intensity;
    const rotateY = ((x - centerX) / centerX) * intensity;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease-out',
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s ease-out',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden transition-all duration-300 ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        ...style,
      }}
    >
      {/* 3D Reflection Glare Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-10 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 60%)',
          transform: 'translateZ(20px)',
        }}
      />
      <div style={{ transform: 'translateZ(10px)' }}>{children}</div>
    </div>
  );
};

export default TiltCard;
