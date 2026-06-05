import ThreeDBackground from '../common/ThreeDBackground';

const HeroSection = () => {
  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950"
    >
      {/* Background gradient (darker and more premium to highlight 3D particles) */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-primary-950 to-purple-900" />

      {/* Decorative circles */}
      <div className="absolute top-1/4 -left-24 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-3xl" />

      {/* Interactive 3D Background */}
      <ThreeDBackground />

      {/* Decorative dots pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 text-white/90 text-sm px-5 py-2 rounded-full mb-8 animate-fade-in shadow-xl shadow-purple-950/20">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse-slow" />
          NGO Empowering Women Since 2015
        </div>

        {/* Headline */}
        <h1
          className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6 tracking-tight drop-shadow-md"
          style={{ animationDelay: '0.2s' }}
        >
          Empowering Women Through{' '}
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary-300 via-primary-200 to-purple-300">
            Education,
          </span>{' '}
          Technology, &amp; Opportunity
        </h1>

        {/* Subtitle */}
        <p className="font-body text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow">
          She Can Foundation is dedicated to helping women build skills, confidence, and successful careers — one story at a time.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => scrollTo('#contact')}
            className="bg-white text-primary-900 font-semibold px-8 py-4 rounded-full shadow-xl hover:shadow-2xl hover:bg-primary-50 transition-all hover:scale-105 active:scale-100"
          >
            Contact Us
          </button>
          <button
            onClick={() => scrollTo('#about')}
            className="bg-white/10 backdrop-blur-md border-2 border-white/20 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/20 transition-all hover:scale-105 active:scale-100"
          >
            Learn More ↓
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/40 text-xs tracking-widest uppercase">Scroll</span>
          <svg className="w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
