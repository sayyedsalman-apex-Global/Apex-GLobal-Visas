import { ChevronRight, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Hero() {
  const { user, setIsAuthModalOpen } = useAuth();

  const handleBookAdvisoryClick = (e) => {
    if (!user) {
      e.preventDefault();
      alert("Please login to book an advisory session.");
      setIsAuthModalOpen(true);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 sm:pt-40 pb-16 sm:pb-32 overflow-hidden bg-slate-950">
      
      {/* Premium Gradient Glow Backdrops */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[130px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-20 right-1/4 w-[350px] h-[350px] bg-indigo-600/5 rounded-full blur-[110px] pointer-events-none" />
      
      {/* Modern Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_50%,#000_75%,transparent_100%)] opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        
        {/* Trust Badge with elegant border glows */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-[10px] sm:text-xs font-semibold text-blue-400 mb-8 sm:mb-10 animate-slide-up shadow-inner backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span className="tracking-wide">Trusted Travel & Visa Advisory Service</span>
        </div>

        {/* Spacious, bold typography with modern title colors */}
        <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 sm:mb-8 max-w-5xl mx-auto leading-[1.1] sm:leading-[1.05] animate-slide-up">
          Your Visa. Our Expertise. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-500 drop-shadow-[0_2px_15px_rgba(59,130,246,0.15)]">
            Zero Stress.
          </span>
        </h1>

        {/* Clean, well-spaced subtitle detailing end-to-end guidance */}
        <p className="text-xs sm:text-base lg:text-lg text-slate-400 max-w-3xl mx-auto mb-8 sm:mb-14 leading-relaxed font-light">
          Apex Global Visas delivers end-to-end guidance for global travel, study, and professional settlement. 
          From professional risk-assessed file assembly to personalized 1-on-1 consular interview preparation.
        </p>

        {/* Primary Action CTA buttons */}
        <div className="flex flex-row items-center justify-center gap-4 mb-16 sm:mb-24">
          <a
            href="#contact"
            onClick={handleBookAdvisoryClick}
            className="flex items-center justify-center px-9 py-4 text-sm sm:text-base font-semibold text-white bg-blue-600 rounded-xl shadow-2xl shadow-blue-600/35 hover:bg-blue-500 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
          >
            Book Advisory
          </a>
          <a
            href="#services"
            className="flex items-center gap-2 px-9 py-4 text-sm sm:text-base font-semibold text-slate-300 bg-slate-900/60 hover:bg-slate-900 hover:text-white rounded-xl border border-slate-800 hover:border-slate-700 hover:-translate-y-0.5 transition-all duration-200"
          >
            <span>Explore Destinations</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        {/* Stats counter section spaced below with premium divider styling */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-4.5xl mx-auto pt-8 sm:pt-10 border-t border-slate-900/80">
          {[
            { label: "Visa Approval Rate", value: "98.7%" },
            { label: "Consultations Completed", value: "15,000+" },
            { label: "Certified Legal Counselors", value: "45+" },
            { label: "Global Destinations Path", value: "27+" }
          ].map((item, idx) => (
            <div key={idx} className="p-4 sm:p-5.5 rounded-xl bg-slate-900/30 border border-slate-900/80 backdrop-blur-sm shadow-md">
              <span className="block text-2xl sm:text-3xl font-extrabold text-white mb-1 sm:mb-1.5">{item.value}</span>
              <span className="block text-[10px] text-slate-500 font-semibold tracking-wider uppercase">{item.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
