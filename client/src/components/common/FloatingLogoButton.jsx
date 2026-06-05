import { useState, useEffect } from 'react';

const FloatingLogoButton = () => {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down more than 300px
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in pointer-events-none">
      <button
        onClick={scrollToTop}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="pointer-events-auto flex items-center gap-3 bg-slate-950/80 hover:bg-slate-950 backdrop-blur-md border border-white/10 p-2.5 rounded-2xl transition-all duration-500 group shadow-2xl relative"
        style={{
          boxShadow: hovered 
            ? '0 0 25px 5px rgba(139, 92, 246, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.1)' 
            : '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Glow beneath the purple square (matching the user's image exactly) */}
        <div 
          className="absolute bottom-1 left-3 w-10 h-6 bg-purple-400/40 rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" 
          style={{ transform: 'translateZ(-1px)' }}
        />

        {/* Purple Square Logo Icon */}
        <div 
          className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden transition-all duration-500 group-hover:rotate-6 group-hover:scale-105 shrink-0"
        >
          {/* Inner glass light reflections */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000" />
          <span className="text-white font-display font-extrabold text-base tracking-wider drop-shadow-sm select-none">
            sc
          </span>
        </div>

        {/* Expandable Text Label */}
        <div 
          className="flex flex-col text-left overflow-hidden transition-all duration-500"
          style={{ 
            width: hovered ? '140px' : '0px', 
            opacity: hovered ? 1 : 0,
            marginRight: hovered ? '10px' : '0px'
          }}
        >
          <span className="font-display font-bold text-white text-base leading-none tracking-wide">
            She Can
          </span>
          <span className="text-[10px] font-body text-purple-300 font-medium tracking-widest uppercase mt-0.5">
            Foundation
          </span>
        </div>

        {/* Animated Arrow Icon (Only shown when not hovered) */}
        <div 
          className="transition-all duration-500 overflow-hidden shrink-0 flex items-center justify-center"
          style={{
            width: hovered ? '0px' : '16px',
            opacity: hovered ? 0 : 0.6
          }}
        >
          <svg 
            className="w-4 h-4 text-white animate-bounce" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </div>
      </button>
    </div>
  );
};

export default FloatingLogoButton;
