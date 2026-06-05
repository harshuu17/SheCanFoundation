import TiltCard from '../common/TiltCard';

const testimonials = [
  {
    quote: 'She Can Foundation gave me the skills and the confidence I never knew I had. Within 3 months of completing the bootcamp, I landed my first developer role.',
    name: 'Priya Sharma',
    role: 'Junior Developer, TechCorp',
    initials: 'PS',
    color: 'bg-violet-100 text-violet-700',
  },
  {
    quote: 'The mentorship program connected me with an incredible leader who helped me navigate the corporate world as a woman of color. I got promoted twice in one year.',
    name: 'Aisha Johnson',
    role: 'Product Manager, StartupXYZ',
    initials: 'AJ',
    color: 'bg-rose-100 text-rose-700',
  },
  {
    quote: "I started a small catering business after She Can's entrepreneurship program. They gave me the tools, the network, and most importantly — belief in myself.",
    name: 'Maria Garcia',
    role: 'Founder, Sabor Catering',
    initials: 'MG',
    color: 'bg-emerald-100 text-emerald-700',
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-primary-50 to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-primary-600 font-semibold text-sm tracking-widest uppercase mb-4">
            Voices of Change
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-gray-900">
            Stories That Inspire Us
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <TiltCard
              key={t.name}
              className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow flex flex-col"
              intensity={10}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-600 text-sm leading-relaxed italic flex-1 mb-6">
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${t.color} rounded-full flex items-center justify-center font-bold text-sm shrink-0`}>
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.role}</div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
