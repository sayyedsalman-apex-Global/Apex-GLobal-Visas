import logo from '../assets/logo.png';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-8 relative overflow-hidden">
      {/* Footer Top Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">

          {/* Logo & Description (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <a href="#" className="flex items-center group">
              <img
                src={logo}
                alt="APEX GLOBAL VISAS"
                className="h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              />
            </a>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
              Apex Global Visas provides premium, risk-assessed files and advisory pathways for travel, study, and skilled work migration across 27+ countries.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/apexglobalvisas"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer group"
                aria-label="Instagram Profile"
              >
                <div className="p-2 rounded-lg bg-slate-900/50 border border-slate-800 group-hover:border-slate-750 transition-all flex items-center justify-center">
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
                </div>
                <span className="font-light tracking-wide text-xs">@APEXGLOBALVISAS</span>
              </a>
            </div>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>800/2, Gurunanak Nagar, Gaibanshah Dargah Road, LBS Marg, Next to Madhuban Toyota Showroom, Ghatkopar West, Mumbai - 400086</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <span>+91 70453 62942 / +91 91365 20802</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <a
                  href="mailto:sayyedsalman@apexglobalvisas.com"
                  className="hover:text-white transition-colors duration-200"
                >
                  sayyedsalman@apexglobalvisas.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: "Home", href: "#" },
                { name: "Travel Visas", href: "#services" },
                { name: "How It Works", href: "#process" },
                { name: "Reviews", href: "#testimonials" },
                { name: "Contact Us", href: "#contact" }
              ].map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-xs text-slate-400 hover:text-white transition-colors duration-200">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services breakdown (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Visa Categories</h4>
            <ul className="space-y-2">
              {[
                { name: "US B1/B2 & F1 Visas", href: "#services" },
                { name: "Canada Express Entry & PR", href: "#services" },
                { name: "UK Skilled Worker Pathway", href: "#services" },
                { name: "Australia Subclass 189/190", href: "#services" },
                { name: "Schengen Short-Stay Visas", href: "#services" }
              ].map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-xs text-slate-400 hover:text-white transition-colors duration-200 flex items-center gap-1">
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Official resources / Affiliates (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Government Portals</h4>
            <p className="text-xs text-slate-500 font-light leading-relaxed">
              Verify official updates directly on national consular platforms:
            </p>
            <ul className="space-y-2 text-xs">
              {[
                { name: "US State Department Travel", href: "https://travel.state.gov" },
                { name: "Canada Citizenship (IRCC)", href: "https://www.canada.ca" },
                { name: "UK Visa Decisions Portal", href: "https://www.gov.uk" },
                { name: "Australia Home Affairs", href: "https://immi.homeaffairs.gov.au" }
              ].map((portal, idx) => (
                <li key={idx}>
                  <a
                    href={portal.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1 group"
                  >
                    <span>{portal.name}</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Legal disclaimer & copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-900/60">
        <div className="space-y-4 text-center md:text-left">

          {/* Disclaimer text */}
          <p className="text-[10px] text-slate-600 leading-relaxed font-light">
            <strong>Disclaimer:</strong> Apex Global Visas is a private, independent legal and visa consulting advisory firm. We are not affiliated with, nor do we represent, any embassy, consulate, or government department of the United States, Canada, the United Kingdom, Australia, New Zealand, or the Schengen Union. The information provided on this platform is for guidance purposes only and does not constitute formal legal advice. Visa approvals are at the sole discretion of the respective country's consular officers.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-[11px] text-slate-500">
              © {currentYear} Apex Global Visas. All rights reserved. Registered private advisory corporation.
            </span>
            <div className="flex items-center gap-6 text-[11px]">
              <a href="#" className="text-slate-500 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors">Refund Guidelines</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
