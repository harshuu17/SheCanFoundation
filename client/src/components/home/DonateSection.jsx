import { useState } from 'react';
import toast from 'react-hot-toast';
import { submitDonation } from '../../services/api';
import TiltCard from '../common/TiltCard';

const donationTiers = [
  {
    amount: '500',
    displayAmount: '₹500',
    impact: '5 Girls',
    duration: '1 Month',
    desc: 'Provide sanitary hygiene kits and basic wellness workshops for 5 girls.',
    popular: false,
    color: 'border-purple-200 hover:border-purple-400',
  },
  {
    amount: '1500',
    displayAmount: '₹1,500',
    impact: '15 Girls',
    duration: '3 Months',
    desc: 'Ensure 15 girls have safe, clean menstrual hygiene access for a full quarter.',
    popular: true,
    color: 'border-primary-300 hover:border-primary-500 shadow-md shadow-primary-100',
  },
  {
    amount: '5000',
    displayAmount: '₹5,000',
    impact: '25 Girls',
    duration: 'School Year',
    desc: 'Equip 25 girls to stay in school without shame, maintaining their dignity and attendance.',
    popular: false,
    color: 'border-pink-200 hover:border-pink-400',
  },
  {
    amount: '10000',
    displayAmount: '₹10,000',
    impact: 'Classroom',
    duration: 'Entire Year',
    desc: 'Empower an entire classroom of girls with annual supplies and health education.',
    popular: false,
    color: 'border-emerald-200 hover:border-emerald-400',
  },
];

const DonateSection = () => {
  const [selectedTier, setSelectedTier] = useState(1); // Default to ₹1,500
  const [modalOpen, setModalOpen] = useState(false);
  const [donorInfo, setDonorInfo] = useState({ name: '', email: '', phone: '', amount: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleOpenModal = () => {
    setDonorInfo({
      name: '',
      email: '',
      phone: '',
      amount: donationTiers[selectedTier].amount,
    });
    setModalOpen(true);
  };

  const handleInputChange = (e) => {
    setDonorInfo({ ...donorInfo, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!donorInfo.name || !donorInfo.email || !donorInfo.amount) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    try {
      // Save details to the backend database
      await submitDonation({
        name: donorInfo.name,
        email: donorInfo.email,
        phone: donorInfo.phone || undefined,
        amount: Number(donorInfo.amount),
        campaign: "Her Period Shouldn't End Her Education",
      });

      toast.success('Donation details registered! Routing to secure payment gateway...');
      
      // Redirect to Razorpay in a new tab
      window.open('https://rzp.io/rzp/shecanfoundation', '_blank', 'noopener,noreferrer');
      
      // Close modal and reset state
      setModalOpen(false);
      setDonorInfo({ name: '', email: '', phone: '', amount: '' });
    } catch (error) {
      console.error('Donation submission error:', error);
      toast.error(error.response?.data?.error || 'Failed to register donation. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="donate" className="py-24 bg-gradient-to-b from-slate-900 via-purple-950 to-slate-950 text-white relative overflow-hidden">
      {/* Decorative Blur elements */}
      <div className="absolute top-1/3 -left-36 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 -right-36 w-96 h-96 bg-rose-600/15 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: Campaign Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-primary-200 text-xs font-semibold px-4 py-2 rounded-full uppercase tracking-wider">
              ❤️ Urgent Campaign
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-black text-white leading-tight">
              "Her Period Shouldn't <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-primary-300 to-purple-400">
                End Her Education
              </span>"
            </h2>
            <p className="text-gray-300 leading-relaxed text-base font-light">
              Every month, young girls in villages across India are forced to miss school simply because they cannot afford sanitary pads. Many drop out completely, losing their dreams of education, freedom, and self-respect.
            </p>

            {/* Crucial Facts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
                <span className="text-3xl block mb-2">🏫</span>
                <div className="text-2xl font-bold text-pink-400">1 in 5 Girls</div>
                <div className="text-xs text-gray-400 mt-1 leading-normal">
                  In India drops out of school due to a lack of menstrual hygiene access.
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
                <span className="text-3xl block mb-2">🩹</span>
                <div className="text-2xl font-bold text-purple-400">12 Crore+</div>
                <div className="text-xs text-gray-400 mt-1 leading-normal">
                  Women and girls in India still lack basic sanitary products.
                </div>
              </div>
            </div>

            {/* Govt Reg NGO info */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-10 h-10 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                ✓
              </div>
              <div>
                <div className="text-sm font-semibold text-white">GOVT. REG. NGO</div>
                <div className="text-xs text-gray-400">Registered under the Indian Society Act, 1860.</div>
              </div>
            </div>
          </div>

          {/* Right Side: Donation Tiers & Calculator */}
          <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-10 backdrop-blur-md shadow-2xl">
            <div className="mb-6">
              <h3 className="font-display text-2xl font-bold text-white mb-2">Choose Donation Amount</h3>
              <p className="text-gray-400 text-sm">Your contribution goes directly toward purchasing hygiene kits & conducting school workshops.</p>
            </div>

            {/* Donation Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {donationTiers.map((tier, idx) => (
                <div
                  key={tier.amount}
                  onClick={() => setSelectedTier(idx)}
                  className={`cursor-pointer rounded-2xl p-5 border-2 transition-all relative ${
                    selectedTier === idx
                      ? 'bg-gradient-to-br from-primary-600/30 to-purple-600/20 border-primary-500 shadow-lg shadow-primary-500/10'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  {tier.popular && (
                    <span className="absolute -top-3 right-4 bg-gradient-to-r from-pink-500 to-primary-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                      Most Impactful
                    </span>
                  )}
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-2xl font-extrabold text-white">{tier.displayAmount}</span>
                    <span className="text-xs font-semibold text-primary-300">{tier.impact}</span>
                  </div>
                  <div className="text-xs text-purple-200 mb-2 font-medium">Provides pads for {tier.duration}</div>
                  <div className="text-xs text-gray-400 leading-relaxed font-light">{tier.desc}</div>
                </div>
              ))}
            </div>

            {/* Selected Impact Summary */}
            <div className="bg-primary-950/40 border border-primary-500/20 rounded-2xl p-5 mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-primary-300 font-semibold block mb-1">Your Impact Summary</span>
                <span className="text-sm text-gray-300 leading-normal">
                  You are donating <strong className="text-white font-semibold">{donationTiers[selectedTier].displayAmount}</strong> to keep <strong className="text-white font-semibold">{donationTiers[selectedTier].impact}</strong> in school with dignity.
                </span>
              </div>
              <div className="text-4xl shrink-0">
                {selectedTier === 0 ? '🌸' : selectedTier === 1 ? '🎒' : selectedTier === 2 ? '🏫' : '👩‍🎓'}
              </div>
            </div>

            {/* Donate CTA Button (Triggers Dialog Modal) */}
            <button
              onClick={handleOpenModal}
              className="w-full text-center bg-gradient-to-r from-pink-500 via-primary-600 to-purple-600 hover:from-pink-600 hover:via-primary-700 hover:to-purple-700 text-white font-bold py-4.5 rounded-xl transition-all shadow-xl hover:shadow-primary-500/20 hover:scale-[1.01] active:scale-95 cursor-pointer"
            >
              Secure Donation via Razorpay →
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
              🔒 Safe & Secure 80G Tax Exemption Eligible Donation
            </div>
          </div>

        </div>
      </div>

      {/* Glassmorphic Donor Info Dialog Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg bg-slate-900/90 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl text-white">
            
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-display text-2xl font-bold text-white">Donor Information</h3>
                <p className="text-xs text-gray-400 mt-1">Please enter your details to register tax deduction & updates.</p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g., John Doe"
                  value={donorInfo.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-primary-500 transition-colors text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="e.g., john@example.com"
                  value={donorInfo.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-primary-500 transition-colors text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">Mobile Number (Optional)</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="e.g., 9876543210"
                  value={donorInfo.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-primary-500 transition-colors text-sm text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">Donation Amount (INR) *</label>
                <input
                  type="number"
                  name="amount"
                  required
                  min="1"
                  placeholder="1500"
                  value={donorInfo.amount}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-primary-500 transition-colors text-sm text-white font-semibold"
                />
              </div>

              {/* Action Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-pink-500 to-primary-600 hover:from-pink-600 hover:to-primary-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-primary-500/10 flex items-center justify-center gap-2 mt-2 disabled:opacity-50 cursor-pointer"
              >
                {submitting ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Registering details...</span>
                  </>
                ) : (
                  <span>Register &amp; Proceed to Pay ₹{donorInfo.amount || '0'} →</span>
                )}
              </button>
            </form>

            <div className="mt-4 text-[10px] text-center text-gray-500">
              * Required fields. Your information will be safely secured under She Can Foundation privacy policies.
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

export default DonateSection;
