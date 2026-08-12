import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import logoMark from '../assets/logo-mark.png';
import { Menu, X, LogIn, LogOut, ChevronDown, Files } from 'lucide-react';

export default function Navbar({ onOpenChecklist }) {
  const { user, setIsAuthModalOpen, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Travel Visas', href: '#services' },
    { name: 'Latest News', href: '#news' },
    { name: 'Contact Us', href: '#contact' }
  ];

  // Helper to extract first name
  const getFirstName = (fullName) => {
    if (!fullName) return '';
    return fullName.trim().split(' ')[0];
  };

  const handleBookAdvisoryClick = (e) => {
    if (!user) {
      e.preventDefault();
      alert("Please login to book an advisory session.");
      setIsAuthModalOpen(true);
    }
  };



  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'glass-nav py-3.5 shadow-lg' 
        : 'bg-transparent py-5 border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Stacked Branding Combo */}
          <a href="#" className="flex items-center gap-3 cursor-pointer group select-none">
            <img 
              src={logoMark} 
              alt="APEX GLOBAL VISAS Logo" 
              className="h-10 w-10 object-contain rounded-lg transition-transform duration-200 group-hover:scale-[1.02]" 
            />
            <div className="flex flex-col">
              <span className="text-lg font-extrabold tracking-wider text-white leading-none">
                APEX
              </span>
              <span className="text-xs font-bold tracking-widest text-blue-500 leading-tight mt-0.5 uppercase">
                GLOBAL VISAS
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-bold tracking-wide uppercase text-slate-400 hover:text-white transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}

            {/* Tools & Services Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1 text-xs font-bold tracking-wide uppercase text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                <span>Tools & Services</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu Items */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-3.5 w-56 rounded-xl bg-slate-900 border border-slate-800 p-2 shadow-2xl animate-slide-up">
                  <button
                    onClick={() => { onOpenChecklist(); setIsDropdownOpen(false); }}
                    className="flex items-center gap-2.5 w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <Files className="w-4 h-4 text-blue-500" />
                    <span>Document Checklist</span>
                  </button>

                </div>
              )}
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              // Authenticated welcome badge
              <div className="flex items-center gap-3 bg-slate-900/60 border border-slate-800 rounded-xl pl-3.5 pr-2 py-1.5 transition-all">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs text-slate-300">
                    Welcome, <span className="font-bold text-white">{getFirstName(user.name)}</span>
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-red-400 hover:text-white hover:bg-red-500/10 border border-red-500/10 hover:border-red-500/30 transition-all cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1.5 px-4.5 py-2.5 text-xs font-bold text-slate-300 bg-slate-900/80 hover:bg-slate-900 hover:text-white rounded-xl border border-slate-850 hover:border-slate-700 transition-all cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-blue-500" />
                <span>Login</span>
              </button>
            )}

            {/* Book Advisory Button */}
            <a
              href="#contact"
              onClick={handleBookAdvisoryClick}
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-lg shadow-blue-600/20 hover:bg-blue-500 hover:shadow-blue-500/30 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              Book Advisory
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div className={`md:hidden absolute top-full left-0 right-0 border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl transition-all duration-300 ease-in-out max-h-[85vh] overflow-y-auto ${
        isMobileMenuOpen 
          ? 'opacity-100 translate-y-0 pointer-events-auto' 
          : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}>
        <div className="px-4 pt-3 pb-6 space-y-2.5">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-semibold text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
            >
              {link.name}
            </a>
          ))}

          {/* Mobile Tools Category Header */}
          <div className="border-t border-slate-900 pt-3 px-3">
            <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase block mb-2">Tools & Services</span>
            <div className="grid grid-cols-1 gap-1 pl-1">
              <button
                onClick={() => { onOpenChecklist(); setIsMobileMenuOpen(false); }}
                className="flex items-center gap-2 py-2 text-sm font-semibold text-slate-300 hover:text-white text-left cursor-pointer"
              >
                <Files className="w-4 h-4 text-blue-400" />
                <span>Document Checklist</span>
              </button>

            </div>
          </div>

          {/* Mobile Auth Panel */}
          <div className="border-t border-slate-900 pt-3">
            {user ? (
              <div className="px-3 flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Logged In As</span>
                <span className="text-sm font-bold text-white leading-none">{user.name}</span>
                <span className="text-xs text-slate-500 leading-none">{user.email}</span>
                <button
                  onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                  className="w-full mt-2.5 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold text-red-400 hover:text-white bg-red-950/20 border border-red-500/20 transition-all cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="px-3 flex flex-col gap-2">
                <a
                  href="https://www.instagram.com/apexglobalvisas?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 text-pink-500"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                  <span>Follow on Instagram</span>
                </a>
                <button
                  onClick={() => { setIsAuthModalOpen(true); setIsMobileMenuOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer"
                >
                  <LogIn className="w-4 h-4 text-blue-500" />
                  <span>Login</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Book Advisory CTA */}
          <div className="pt-2 px-3">
            <a
              href="#contact"
              onClick={(e) => { handleBookAdvisoryClick(e); setIsMobileMenuOpen(false); }}
              className="flex w-full items-center justify-center px-5 py-3 text-base font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/25"
            >
              Book Advisory
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
