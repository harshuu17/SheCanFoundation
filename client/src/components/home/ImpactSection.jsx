import { useState, useEffect, useRef } from 'react';

const useCountUp = (target, duration = 2000, start = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);

  return count;
};

const StatCard = ({ icon, number, suffix, label, desc, color, delay, animate }) => {
  const count = useCountUp(number, 2000, animate);

  return (
    <div
      className={`relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center text-2xl mb-6`}>
        {icon}
      </div>
      <div className="font-display text-5xl font-bold text-gray-900 mb-1">
        {animate ? count.toLocaleString() : 0}{suffix}
      </div>
      <div className="font-semibold text-gray-800 mb-2">{label}</div>
      <div className="text-sm text-gray-500 leading-relaxed">{desc}</div>
    </div>
  );
};

const ImpactSection = () => {
  const [animate, setAnimate] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      icon: '👩',
      number: 2500,
      suffix: '+',
      label: 'Women Supported',
      desc: 'Women who have completed our programs and transformed their careers.',
      color: 'bg-primary-50',
      delay: 0,
    },
    {
      icon: '🏆',
      number: 180,
      suffix: '+',
      label: 'Workshops Conducted',
      desc: 'Skill-building workshops on tech, entrepreneurship, and leadership.',
      color: 'bg-rose-50',
      delay: 0.1,
    },
    {
      icon: '🌍',
      number: 45,
      suffix: '',
      label: 'Communities Reached',
      desc: 'Diverse communities where our programs have made a measurable difference.',
      color: 'bg-amber-50',
      delay: 0.2,
    },
    {
      icon: '📈',
      number: 87,
      suffix: '%',
      label: 'Employment Rate',
      desc: 'Of our graduates secure employment or start a business within 6 months.',
      color: 'bg-green-50',
      delay: 0.3,
    },
  ];

  return (
    <section id="impact" className="py-24 bg-slate-50 bg-mesh" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-primary-600 font-semibold text-sm tracking-widest uppercase mb-4">
            Our Impact
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Numbers That Tell Our Story
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Every number represents a real woman who found her path, a community transformed, and a future rewritten.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} animate={animate} />
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-primary-500 rounded-3xl p-10 text-center text-white">
          <h3 className="font-display text-3xl font-bold mb-3">Be Part of the Change</h3>
          <p className="text-primary-100 mb-6 max-w-lg mx-auto">
            Your support helps us reach more women who need education, mentorship, and opportunities to succeed.
          </p>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-primary-700 font-semibold px-8 py-3 rounded-full hover:bg-primary-50 transition-colors shadow-lg"
          >
            Get in Touch Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
