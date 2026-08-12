import { useState, useEffect } from 'react';
import { Mail, Phone, User, Globe, MessageSquare, Send, CheckCircle2, ShieldCheck, AlertCircle, Lock, ExternalLink } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ContactForm({ preselectedCountry, prefilledMessage }) {
  const { user, setIsAuthModalOpen } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    requirements: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Sync selected country and requirements prefill from Quiz/Services
  useEffect(() => {
    if (preselectedCountry) {
      setFormData(prev => ({ ...prev, country: preselectedCountry }));
    }
    if (prefilledMessage) {
      setFormData(prev => ({ ...prev, requirements: prefilledMessage }));
    }
    if (preselectedCountry || prefilledMessage) {
      const element = document.getElementById('contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [preselectedCountry, prefilledMessage]);

  const validate = () => {
    let tempErrors = {};
    if (!formData.fullName.trim()) tempErrors.fullName = 'Full Name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email address is invalid';
    }
    if (!formData.phone.trim()) {
      tempErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{8,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      tempErrors.phone = 'Please enter a valid phone number (8-15 digits)';
    }
    if (!formData.country) tempErrors.country = 'Please select a destination country';
    if (!formData.requirements.trim()) tempErrors.requirements = 'Brief description of requirements is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error on keydown
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to book an advisory session.");
      setIsAuthModalOpen(true);
      return;
    }
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('/api/send-assessment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          requirements: formData.requirements
        })
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.error || 'Failed to dispatch profile assessment email');
      }

      setIsSubmitting(false);
      setShowSuccessModal(true);
      // Reset form on success
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        country: '',
        requirements: ''
      });
    } catch (error) {
      console.error('Resend Send Failure:', error);
      setIsSubmitting(false);
      setSubmitError(error.message || 'Failed to dispatch mail server request. Please try again later.');
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-slate-950 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Information Column (Left) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-semibold text-blue-400 mb-3 uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Advisory Booking</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Connect With An Immigration Expert
              </h2>
              <p className="text-slate-400 mt-3 font-light leading-relaxed">
                Book your initial assessment audit. We will review your profile logs and assign a certified consultant within one business hour.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/30 border border-slate-900">
                <div className="p-2 rounded-lg bg-blue-600/10 border border-blue-500/20 text-blue-400 flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Call Specialist Desk</h4>
                  <p className="text-xs text-slate-400 mt-0.5">+91 70453 62942 / +91 91365 20802</p>
                  <p className="text-[10px] text-slate-500">Mon-Fri (09:00 - 18:00 IST)</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/30 border border-slate-900">
                <div className="p-2 rounded-lg bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Consular Support Hub</h4>
                  <p className="text-xs text-slate-400 mt-0.5">sayyedsalman@apexglobalvisas.com</p>
                  <p className="text-[10px] text-slate-500">Secure PGP encryption supported</p>
                </div>
              </div>
            </div>

            {/* Social Media Link Card */}
            <div className="p-5.5 rounded-2xl bg-gradient-to-r from-blue-950/20 to-indigo-950/20 border border-blue-900/30">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-2 flex items-center gap-1.5 font-semibold">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3.5 h-3.5 text-pink-500"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                <span>Official Socials</span>
              </h4>
              <p className="text-xs text-slate-400 font-light leading-relaxed mb-4">
                Follow us on Instagram for daily visa updates and success stories.
              </p>
              <a
                href="https://www.instagram.com/apexglobalvisas"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-500 hover:to-rose-450 text-[11px] font-bold text-white shadow-md hover:shadow-pink-500/10 transition-all cursor-pointer group"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 text-white"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                <span>@APEXGLOBALVISAS</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            <div className="p-5.5 rounded-2xl bg-gradient-to-r from-blue-950/20 to-indigo-950/20 border border-blue-900/30">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-1.5">No-Refusal Guarantee Assessment</h4>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                If our initial risk review detects a refusal potential above 40%, we will advise on alternative destinations or work programs at no upfront cost.
              </p>
            </div>
          </div>

          {/* Form Column (Right) */}
          <div className="lg:col-span-7">
            {user ? (
              <div className="glass-card p-6.5 sm:p-8 rounded-2xl">
                <h3 className="text-lg font-bold text-white mb-6">Initial File Assessment Form</h3>

                {/* Submit Error Card */}
                {submitError && (
                  <div className="mb-5 flex items-start gap-2.5 p-3.5 rounded-xl bg-red-950/20 border border-red-500/30 text-red-400 text-xs">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{submitError}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">

                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-xs font-semibold text-slate-400 mb-2">Full Name</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <User className="w-4 h-4 text-slate-500" />
                      </span>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="e.g. Johnathan Doe"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 bg-slate-950 border rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 transition-all ${errors.fullName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-800 focus:border-blue-500 focus:ring-blue-500'
                          }`}
                      />
                    </div>
                    {errors.fullName && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.fullName}</p>}
                  </div>

                  {/* Grid for Email / Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-slate-400 mb-2">Email Address</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Mail className="w-4 h-4 text-slate-500" />
                        </span>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 bg-slate-950 border rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 transition-all ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-800 focus:border-blue-500 focus:ring-blue-500'
                            }`}
                        />
                      </div>
                      {errors.email && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold text-slate-400 mb-2">Phone Number</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Phone className="w-4 h-4 text-slate-500" />
                        </span>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+1 (555) 019-2834"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 bg-slate-950 border rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 transition-all ${errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-800 focus:border-blue-500 focus:ring-blue-500'
                            }`}
                        />
                      </div>
                      {errors.phone && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.phone}</p>}
                    </div>
                  </div>

                  {/* Country Selector */}
                  <div>
                    <label htmlFor="country" className="block text-xs font-semibold text-slate-400 mb-2">Target Destination</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Globe className="w-4 h-4 text-slate-500" />
                      </span>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 bg-slate-950 border rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 transition-all appearance-none ${errors.country ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-800 focus:border-blue-500 focus:ring-blue-500'
                          }`}
                      >
                        <option value="" disabled className="text-slate-600 bg-slate-950">Select target country...</option>
                        <option value="United States" className="bg-slate-950">United States</option>
                        <option value="Canada" className="bg-slate-950">Canada</option>
                        <option value="United Kingdom" className="bg-slate-950">United Kingdom</option>
                        <option value="Australia" className="bg-slate-950">Australia</option>
                        <option value="New Zealand" className="bg-slate-950">New Zealand</option>
                        <option value="Schengen Area" className="bg-slate-950">Schengen Area</option>
                        <option value="Many More Countries" className="bg-slate-950">Other / Global</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
                        ▼
                      </div>
                    </div>
                    {errors.country && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.country}</p>}
                  </div>

                  {/* Requirements */}
                  <div>
                    <label htmlFor="requirements" className="block text-xs font-semibold text-slate-400 mb-2">Requirement Details</label>
                    <div className="relative">
                      <span className="absolute top-3.5 left-3 pointer-events-none">
                        <MessageSquare className="w-4 h-4 text-slate-500" />
                      </span>
                      <textarea
                        id="requirements"
                        name="requirements"
                        rows="4"
                        placeholder="Detail your current visa goals (e.g. Express Entry profile details, university offer received, tourist duration requirements...)"
                        value={formData.requirements}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 bg-slate-950 border rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 transition-all ${errors.requirements ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-800 focus:border-blue-500 focus:ring-blue-500'
                          }`}
                      />
                    </div>
                    {errors.requirements && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.requirements}</p>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800/80 transition-all shadow-lg shadow-blue-600/25 cursor-pointer disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Book Free Advisory</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              <div className="glass-card p-8 rounded-2xl text-center flex flex-col items-center justify-center min-h-[400px] border border-slate-800">
                <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-850 flex items-center justify-center text-blue-500 mb-6 shadow-inner animate-pulse">
                  <Lock className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Advisory Booking Locked</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 font-light max-w-sm mx-auto">
                  Please login to book an advisory session. Access to our certified immigration expert assessment requires client verification.
                </p>
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-600/20 cursor-pointer"
                >
                  Sign In / Register
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Success Modal Overlay */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-8 text-center shadow-2xl relative animate-slide-up">
            <div className="w-16 h-16 bg-blue-600/10 border border-blue-500/20 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-white mb-2">Request Received Successfully!</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 font-light">
              Thank you! We have received your details. Our expert team will review your profile and contact you shortly.
            </p>

            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-sm transition-all"
            >
              Back to Home
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
