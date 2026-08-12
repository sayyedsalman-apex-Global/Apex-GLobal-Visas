import { useState } from 'react';
import { processSteps } from '../data/content';
import { Network, ClipboardCheck, AlertTriangle, Route, MessageSquare, Files } from 'lucide-react';

const icons = [
  ClipboardCheck,
  AlertTriangle,
  Route,
  MessageSquare,
  Files
];

export default function Process() {
  const [activeStep, setActiveStep] = useState(null);

  return (
    <section id="process" className="py-16 sm:py-24 bg-slate-950 border-t border-slate-900 relative overflow-hidden">
      {/* Background Decorative Blur */}
      <div className="absolute top-1/2 left-10 w-[350px] h-[350px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-semibold text-blue-400 mb-3 uppercase tracking-wider">
            <Network className="w-3.5 h-3.5" />
            <span>Consulting Pipeline</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            How Our Advisory Process Works
          </h2>
          <p className="text-slate-400 mt-2 max-w-xl mx-auto text-sm sm:text-base font-light">
            We follow a risk-managed, audited roadmap to eliminate guesswork and prepare you for absolute compliance.
          </p>
        </div>

        {/* Desktop Connected Roadmap */}
        <div className="hidden md:block relative mt-16 mb-8">
          {/* Connector Line */}
          <div className="absolute top-1/2 left-[10%] right-[10%] h-[2px] bg-slate-900 -translate-y-8 z-0">
            <div className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 transition-all duration-500" 
                 style={{ 
                   width: activeStep !== null ? `${(activeStep / (processSteps.length - 1)) * 100}%` : '0%' 
                 }} 
            />
          </div>

          <div className="grid grid-cols-5 gap-4 relative z-10">
            {processSteps.map((item, idx) => {
              const IconComponent = icons[idx] || ClipboardCheck;
              const isActive = activeStep === idx;
              const isPassed = activeStep !== null && idx < activeStep;

              return (
                <div 
                  key={idx}
                  onMouseEnter={() => setActiveStep(idx)}
                  onMouseLeave={() => setActiveStep(null)}
                  className="flex flex-col items-center text-center px-2 group cursor-pointer"
                >
                  {/* Step Bubble */}
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 mb-6 transition-all duration-300 ${
                    isActive 
                      ? 'bg-blue-600 border-blue-500 text-white scale-110 shadow-lg shadow-blue-600/30' 
                      : isPassed 
                        ? 'bg-slate-900 border-blue-600/60 text-blue-400' 
                        : 'bg-slate-900 border-slate-800 text-slate-400 group-hover:border-slate-700'
                  }`}>
                    <IconComponent className="w-6 h-6" />
                  </div>

                  {/* Step Index Badge */}
                  <span className={`text-[10px] font-bold tracking-widest uppercase mb-2 ${
                    isActive ? 'text-blue-400' : 'text-slate-500'
                  }`}>
                    Step {item.step}
                  </span>

                  {/* Title */}
                  <h3 className={`text-base font-bold mb-2 transition-colors ${
                    isActive ? 'text-white' : 'text-slate-300'
                  }`}>
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-500 leading-relaxed font-light transition-opacity group-hover:text-slate-400">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile/Tablet Steps Layout */}
        <div className="md:hidden space-y-6 mt-12">
          {processSteps.map((item, idx) => {
            const IconComponent = icons[idx] || ClipboardCheck;
            
            return (
              <div 
                key={idx}
                className="flex gap-4 p-5 rounded-xl bg-slate-900/40 border border-slate-900 hover:border-slate-800/80 transition-colors"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-500">
                  <IconComponent className="w-5.5 h-5.5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-bold text-slate-500 tracking-wider">STEP {item.step}</span>
                    <h3 className="text-base font-bold text-white">{item.title}</h3>
                  </div>
                  <p className="text-sm text-slate-400 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
