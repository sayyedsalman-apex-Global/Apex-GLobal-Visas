import { useState } from 'react';
import { destinations } from '../data/content';
import { Compass, FileText, ArrowUpRight, Search } from 'lucide-react';

// Country SVG Flags for a crisp, production-grade appearance
const Flag = ({ code, className = "w-6 h-4" }) => {
  if (code === 'US') {
    return (
      <svg viewBox="0 0 760 400" className={className} aria-hidden="true">
        <rect width="760" height="400" fill="#b22234"/>
        <path d="M0,0 H760 M0,61.5 H760 M0,123 H760 M0,184.6 H760 M0,246.1 H760 M0,307.7 H760 M0,369.2 H760" stroke="#fff" strokeWidth="30.8"/>
        <rect width="304" height="215.4" fill="#3c3b6e"/>
        <path d="M 0 0 L 304 215.4" stroke="rgba(255,255,255,0.15)" strokeWidth="1" /> {/* simplified starfield background grid */}
        <circle cx="152" cy="107" r="30" fill="#fff" opacity="0.9" /> {/* Simplified central shield/emblem look */}
      </svg>
    );
  }
  if (code === 'CA') {
    return (
      <svg viewBox="0 0 512 256" className={className} aria-hidden="true">
        <rect width="512" height="256" fill="#ff0000"/>
        <rect x="128" width="256" height="256" fill="#ffffff"/>
        {/* Simplified Maple Leaf */}
        <path d="M 256 60 L 270 100 L 310 90 L 290 125 L 325 150 L 280 150 L 285 180 L 270 180 L 265 195 L 247 195 L 242 180 L 227 180 L 232 150 L 187 150 L 222 125 L 202 90 L 242 100 Z" fill="#ff0000" />
      </svg>
    );
  }
  if (code === 'GB') {
    return (
      <svg viewBox="0 0 600 300" className={className} aria-hidden="true">
        <rect width="600" height="300" fill="#012169"/>
        <path d="M0,0 L600,300 M600,0 L0,300" stroke="#fff" strokeWidth="60"/>
        <path d="M0,0 L600,300 M600,0 L0,300" stroke="#C8102E" strokeWidth="40"/>
        <path d="M300,0 V300 M0,150 H600" stroke="#fff" strokeWidth="100"/>
        <path d="M300,0 V300 M0,150 H600" stroke="#C8102E" strokeWidth="60"/>
      </svg>
    );
  }
  if (code === 'AU') {
    return (
      <svg viewBox="0 0 1280 640" className={className} aria-hidden="true">
        <rect width="1280" height="640" fill="#071442"/>
        {/* Union Jack inside AU */}
        <g transform="scale(0.5)">
          <rect width="1280" height="640" fill="#071442"/>
          <path d="M0,0 L1280,640 M1280,0 L0,640" stroke="#fff" strokeWidth="120"/>
          <path d="M0,0 L1280,640 M1280,0 L0,640" stroke="#E6193C" strokeWidth="80"/>
          <path d="M640,0 V640 M0,320 H1280" stroke="#fff" strokeWidth="200"/>
          <path d="M640,0 V640 M0,320 H1280" stroke="#E6193C" strokeWidth="120"/>
        </g>
        {/* Simplified Commonwealth Star */}
        <polygon points="320,400 330,430 360,430 335,450 345,480 320,460 295,480 305,450 280,430 310,430" fill="#fff" />
      </svg>
    );
  }
  if (code === 'NZ') {
    return (
      <svg viewBox="0 0 1200 600" className={className} aria-hidden="true">
        <rect width="1200" height="600" fill="#00247D"/>
        {/* Union Jack inside NZ */}
        <g transform="scale(0.5)">
          <path d="M0,0 L1200,600 M1200,0 L0,600" stroke="#fff" strokeWidth="120"/>
          <path d="M0,0 L1200,600 M1200,0 L0,600" stroke="#CC142B" strokeWidth="80"/>
          <path d="M600,0 V600 M0,300 H1200" stroke="#fff" strokeWidth="200"/>
          <path d="M600,0 V600 M0,300 H1200" stroke="#CC142B" strokeWidth="120"/>
        </g>
        {/* Southern Cross stars (simplified representation) */}
        <polygon points="900,120 905,135 920,135 908,145 912,160 900,150 888,160 892,145 880,135 895,135" fill="#fff" stroke="#CC142B" strokeWidth="2"/>
        <polygon points="1000,280 1005,295 1020,295 1008,305 1012,320 1000,310 988,320 992,305 980,295 995,295" fill="#fff" stroke="#CC142B" strokeWidth="2"/>
      </svg>
    );
  }
  if (code === 'EU') {
    return (
      <svg viewBox="0 0 810 540" className={className} aria-hidden="true">
        <rect width="810" height="540" fill="#003399"/>
        {/* Circle of stars representation */}
        <circle cx="405" cy="270" r="120" fill="none" stroke="#ffcc00" strokeWidth="5" strokeDasharray="1 65" strokeLinecap="round" />
      </svg>
    );
  }
  if (code === 'GLOBAL') {
    return (
      <span className="text-xl flex items-center justify-center select-none" role="img" aria-label="Globe">🌍</span>
    );
  }
  return null;
};

export default function Services({ onSelectCountry }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleApply = (countryName, destId) => {
    if (onSelectCountry) {
      onSelectCountry(countryName);
    }
  };

  const filteredDestinations = destinations.filter(dest => {
    const matchesCountry = dest.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = dest.categories.some(cat => 
      cat.code.toLowerCase().includes(searchQuery.toLowerCase()) || 
      cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return matchesCountry || matchesCategory;
  });

  return (
    <section id="services" className="py-16 sm:py-24 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-semibold text-blue-400 mb-3 uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              <span>In-Demand Visa Destinations</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Destinations We Specialize In
            </h2>
            <p className="text-slate-400 mt-2 max-w-xl">
              Select a destination below to explore customized pathways, entry thresholds, and start your compliance checks.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <Search className="w-4 h-4 text-slate-500" />
            </span>
            <input
              type="text"
              placeholder="Search country or visa stream..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
          </div>
        </div>

        {/* Grid Layout */}
        {filteredDestinations.length === 0 ? (
          <div className="text-center py-12 bg-slate-900/30 rounded-2xl border border-slate-900">
            <p className="text-slate-500 text-base">No destinations or visa pathways match your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((dest) => (
              <div 
                key={dest.id}
                className={`glass-card p-6.5 rounded-2xl flex flex-col justify-between group transition-all relative overflow-hidden ${dest.hoverBorder}`}
              >
                {/* Accent Background Glow */}
                <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${dest.accentColor} rounded-full blur-[64px] pointer-events-none opacity-60 group-hover:scale-125 transition-transform duration-500`} />

                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-5 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="shadow-lg shadow-black/40 rounded overflow-hidden border border-slate-800 w-9 h-6.5 flex items-center justify-center">
                        <Flag code={dest.flagCode} className="w-full h-full object-cover" />
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {dest.country}
                      </h3>
                    </div>
                    <span className="text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                      {dest.popularFor}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-400 leading-relaxed mb-6 font-light">
                    {dest.description}
                  </p>

                  {/* Visa Subcategories list */}
                  <div className="space-y-2.5 mb-8">
                    <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5" />
                      Key Pathways Supported
                    </span>
                    {dest.categories.map((cat, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center justify-between p-2 rounded-lg bg-slate-950/50 border border-slate-900/60 hover:bg-slate-950 transition-colors"
                      >
                        <span className="text-xs font-bold text-blue-400">{cat.code}</span>
                        <span className="text-[11px] text-slate-400 text-right truncate max-w-[180px]">{cat.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Link */}
                <button
                  onClick={() => handleApply(dest.country, dest.id)}
                  className="flex items-center justify-center gap-1.5 w-full py-3 rounded-xl bg-slate-900/80 hover:bg-blue-600 text-slate-300 hover:text-white font-semibold text-xs border border-slate-800 hover:border-blue-500 transition-all shadow-sm group/btn cursor-pointer"
                >
                  <span>{dest.id === 'global' ? 'Apply Other Destination ↗' : `Apply ${dest.country} Visa`}</span>
                  {dest.id !== 'global' && (
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  )}
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
