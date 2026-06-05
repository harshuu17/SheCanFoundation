import TiltCard from '../common/TiltCard';

const programs = [
  {
    icon: '💻',
    tag: '12 Weeks',
    title: 'Tech Bootcamp',
    desc: 'Hands-on coding training in web development, data analysis, and UX design — from complete beginner to job-ready.',
    highlights: ['HTML, CSS, JavaScript', 'React & Node.js basics', 'Portfolio projects', 'Mock interviews'],
    color: 'from-violet-500 to-primary-600',
    bg: 'bg-violet-50',
  },
  {
    icon: '🚀',
    tag: '8 Weeks',
    title: 'Entrepreneurship Lab',
    desc: 'Turn your business idea into reality with mentorship from successful founders, financial literacy, and pitch practice.',
    highlights: ['Business model canvas', 'Financial planning', 'Marketing basics', 'Investor pitch prep'],
    color: 'from-rose-500 to-pink-600',
    bg: 'bg-rose-50',
  },
  {
    icon: '🌱',
    tag: 'Ongoing',
    title: 'Mentorship Network',
    desc: '1-on-1 pairing with industry professionals who guide you through career transitions, promotions, and personal growth.',
    highlights: ['Matched mentors', 'Monthly check-ins', 'Career roadmapping', 'Professional network'],
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50',
  },
];

const ProgramsSection = () => {
  return (
    <section id="programs" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-primary-600 font-semibold text-sm tracking-widest uppercase mb-4">
            What We Offer
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Programs Built for{' '}
            <span className="text-gradient">Real Impact</span>
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Each program is designed with input from employers, graduates, and community leaders — ensuring what we teach is what the world needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((prog) => (
            <TiltCard
              key={prog.title}
              className="rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-gray-200/60 transition-shadow"
              intensity={8}
            >
              {/* Card header */}
              <div className={`bg-gradient-to-br ${prog.color} p-8 text-white`}>
                <span className="text-4xl block mb-4">{prog.icon}</span>
                <div className="inline-block bg-white/20 text-white text-xs font-medium px-3 py-1 rounded-full mb-3">
                  {prog.tag}
                </div>
                <h3 className="font-display text-2xl font-bold">{prog.title}</h3>
              </div>

              {/* Card body */}
              <div className="p-8 bg-white">
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{prog.desc}</p>
                <ul className="space-y-2">
                  {prog.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-xs shrink-0">
                        ✓
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="mt-6 w-full bg-gray-50 hover:bg-primary-50 hover:text-primary-700 text-gray-700 font-medium py-3 rounded-xl transition-colors text-sm border border-gray-200 hover:border-primary-200"
                >
                  Apply Now →
                </button>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
