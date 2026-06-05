import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Programs', href: '#programs' },
    { label: 'Impact', href: '#impact' },
    { label: 'Donate', href: '#donate' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollTo = (id) => {
    setMobileOpen(false);
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-md shadow-primary-100/30' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group relative">
            {/* Glow under the logo square */}
            <div className="absolute -bottom-1 left-2 w-9 h-4 bg-purple-400/40 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="w-9.5 h-9.5 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300 relative overflow-hidden shrink-0">
              <span className="text-white font-display font-extrabold text-sm tracking-wide select-none">sc</span>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>
            
            <div className="flex flex-col">
              <span className={`font-display font-bold text-base leading-none tracking-wide transition-colors ${
                scrolled ? 'text-gray-900 group-hover:text-primary-600' : 'text-white group-hover:text-primary-200'
              }`}>
                She Can
              </span>
              <span className={`text-[10px] font-body font-semibold tracking-wider mt-0.5 transition-colors ${
                scrolled ? 'text-primary-600 group-hover:text-primary-700' : 'text-primary-200 group-hover:text-purple-200'
              }`}>
                Foundation
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`text-sm font-medium font-body transition-colors hover:text-primary-500 ${
                  scrolled ? 'text-gray-600' : 'text-white/90'
                }`}
              >
                {link.label}
              </button>
            ))}
            
            {/* Quick Donate Link */}
            <a
              href="https://rzp.io/rzp/shecanfoundation"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white text-xs font-semibold px-4.5 py-2.5 rounded-full shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40 hover:scale-105 transition-all flex items-center gap-1.5 shrink-0"
            >
              <span>Donate Now</span> <span className="text-sm">❤️</span>
            </a>

            {sessionStorage.getItem('sc_mobile') ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/dashboard"
                  className={`text-sm font-medium px-4 py-2 rounded-full border transition-all ${
                    scrolled 
                      ? 'border-primary-400 text-primary-600 hover:bg-primary-50' 
                      : 'border-white/30 text-white hover:bg-white/10'
                  }`}
                >
                  My Dashboard
                </Link>
                <button
                  onClick={() => { sessionStorage.removeItem('sc_mobile'); window.location.href = '/login'; }}
                  className={`text-sm font-medium transition-colors ${scrolled ? 'text-gray-500 hover:text-red-500' : 'text-white/70 hover:text-red-300'}`}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium px-5 py-2.5 rounded-full shadow-lg shadow-primary-200/50 hover:shadow-primary-300/50 transition-all hover:scale-105"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            className={`md:hidden p-2 ${scrolled ? 'text-gray-800' : 'text-white'}`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-lg animate-fade-in">
          <div className="px-4 py-4 flex flex-col gap-3">
            {navLinks.map(link => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-left text-gray-700 font-medium py-2 border-b border-gray-100 last:border-0"
              >
                {link.label}
              </button>
            ))}
            
            <a
              href="https://rzp.io/rzp/shecanfoundation"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold py-3 rounded-xl mt-2 text-center shadow-lg"
            >
              Donate Now ❤️
            </a>

            <button
              onClick={() => scrollTo('#contact')}
              className="bg-gray-100 text-gray-800 font-medium py-3 rounded-xl"
            >
              Get Involved
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
