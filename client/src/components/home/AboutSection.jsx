import TiltCard from '../common/TiltCard';

const AboutSection = () => {
  const values = [
    {
      icon: '🌟',
      title: 'Empowerment',
      desc: 'We believe every woman has untapped potential waiting to be unlocked.',
    },
    {
      icon: '📚',
      title: 'Education',
      desc: 'Knowledge is the most powerful tool we can give to transform lives.',
    },
    {
      icon: '🤝',
      title: 'Community',
      desc: 'Building supportive networks where women lift each other up.',
    },
    {
      icon: '💻',
      title: 'Technology',
      desc: 'Bridging the digital divide to open doors in the modern economy.',
    },
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <span className="inline-block text-primary-600 font-semibold text-sm tracking-widest uppercase mb-4">
              Who We Are
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Building a World Where Every Woman{' '}
              <span className="text-gradient">Can Succeed</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Founded in 2015, She Can Foundation has been at the forefront of women's empowerment across underserved communities. We provide education, mentorship, and career development resources to help women break through barriers and realize their full potential.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Our holistic approach combines technical skills training with personal development, mental health support, and access to professional networks — creating lasting change, not just temporary solutions.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-xs">✓</span>
                Free workshops and training
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-xs">✓</span>
                1-on-1 mentorship programs
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-xs">✓</span>
                Job placement assistance
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-xs">✓</span>
                Digital literacy programs
              </div>
            </div>
          </div>

          {/* Right: Values cards */}
          <div className="grid grid-cols-2 gap-6">
            {values.map((v, i) => (
              <TiltCard
                key={v.title}
                className="bg-slate-50 rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:shadow-primary-100/10 transition-shadow"
                intensity={12}
              >
                <span className="text-3xl mb-3 block">{v.icon}</span>
                <h3 className="font-display font-semibold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
