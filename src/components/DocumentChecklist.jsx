import { useState, useEffect } from 'react';
import { Files, CheckSquare, Square, Info, ShieldAlert, X } from 'lucide-react';

const checklistDatabase = {
  US: {
    country: "United States",
    categories: {
      "B1/B2 Visitor": [
        "Valid Passport (with at least 6 months validity beyond stay)",
        "DS-160 Online Nonimmigrant Application confirmation printout",
        "Consular Interview Appointment Letter",
        "MRV Visa Fee payment receipt logs",
        "Documented travel itinerary (flights and hotel reservations)",
        "Financial proof (last 6 months bank statements and salary slips)",
        "Employer letter / NOC (confirming leave approval and salary status)"
      ],
      "F1 Student": [
        "Official Form I-20 issued by SEVIS-approved institution",
        "SEVIS I-901 fee payment receipt ($350)",
        "Valid Passport & DS-160 confirmation page printout",
        "Academic transcripts, degrees, and GRE/TOEFL/IELTS certificate reports",
        "Liquid Sponsor financial declarations & liquid fund bank certs",
        "Statement of Purpose (SOP) detailing academic and career goals"
      ],
      "H-1B Work": [
        "Form I-797 Approval Notice (Petition for Nonimmigrant Worker)",
        "Certified Labor Condition Application (LCA)",
        "Valid Passport & DS-160 confirmation printout",
        "Academic certificates, transcripts, and credentials evaluations",
        "Detailed employer employment agreement & support letters",
        "Pay slips (last 6 months) and W-2 logs (if currently working in US)"
      ]
    }
  },
  CA: {
    country: "Canada",
    categories: {
      "Express Entry PR": [
        "Educational Credential Assessment (ECA) certificate",
        "Language exam report (IELTS General or CELPIP report sheet)",
        "Valid Passport (copy of biodata pages)",
        "Proof of Funds letter (IRCC format liquid certs on bank letterhead)",
        "Detailed employment reference letters (detailing NOC tasks and duties)",
        "Police Clearance Certificates (PCC) from all countries of residency for >6 months"
      ],
      "Study Permit": [
        "Designated Learning Institution (DLI) Letter of Acceptance (LOA)",
        "Proof of Financial Support (Guaranteed Investment Certificate (GIC) receipt of $20,635+)",
        "Valid Passport & visa photo scans",
        "Letter of Explanation / Study Statement of Purpose (Study SOP)",
        "Academic transcripts and IELTS certificate sheets",
        "Upfront Medical Exam diagnostic receipt (e-Medical confirmation)"
      ],
      "Super Visa": [
        "Letter of invitation from Canadian child/grandchild",
        "Proof of child/grandchild's minimum necessary income (NOA/LICO limits)",
        "Valid Passport",
        "Proof of medical insurance coverage from a Canadian insurance company (paid in full)",
        "Relationship certificate logs (birth certificates showing child details)",
        "Consular medical examination clearance record"
      ]
    }
  },
  GB: {
    country: "United Kingdom",
    categories: {
      "Skilled Worker": [
        "Certificate of Sponsorship (CoS) reference number from UK employer",
        "TB Medical Test certificate (if from a designated country)",
        "Proof of English proficiency (IELTS General or academic degree taught in English)",
        "Valid Passport",
        "Financial maintenance declaration (last 3 months bank statements unless employer certifies)",
        "Criminal record certificate from all locations resided in for >12 months in the last 10 years"
      ],
      "Student Route": [
        "Confirmation of Acceptance for Studies (CAS) reference number from UK sponsor",
        "Valid Passport",
        "Liquid fund maintenance proof (28-day holding bank stamp rule)",
        "Tuberculosis (TB) medical clearance certificate",
        "Academic transcripts and certificates listed on CAS profile",
        "Consent letter from sponsor/parents (if under 18)"
      ]
    }
  },
  AU: {
    country: "Australia",
    categories: {
      "Subclass 189/190 PR": [
        "Skilled Skills Assessment outcome report from relevant authority",
        "English language test scores (PTE Academic or IELTS logs)",
        "Valid Passport",
        "Detailed employment reference records & taxation/salary payouts files",
        "Complete academic transcripts & degree certificates",
        "Australian federal police check (if applicable) and home country PCCs",
        "Consular health assessment exams"
      ],
      "Subclass 600 Visitor": [
        "Valid Passport",
        "Bank account statements showing active transaction logs for past 6 months",
        "Detailed tourist itinerary or family invitation letter",
        "Employment approval certificate / Leave application letter from employer",
        "Previous travel history visa stamps (copy of old passport visa pages)"
      ]
    }
  },
  EU: {
    country: "Schengen Area",
    categories: {
      "Type C Tourist": [
        "Schengen Visa Application Form fully completed and signed",
        "Travel Medical Insurance certificate (minimum €30,000 coverage for all member states)",
        "Valid Passport (with at least 2 blank pages, issued within 10 years)",
        "Flight Reservation (roundtrip tickets with airline codes)",
        "Confirmed Hotel booking vouchers or invitation host sponsorships",
        "Bank statements showing active salary payouts (past 3 months)",
        "Income tax return (ITR) copies"
      ],
      "Digital Nomad": [
        "Schengen National Type D application form",
        "Proof of steady monthly remote earnings (minimum Portuguese €3,280 or equivalent)",
        "Employment contract, freelance service agreement or remote work declaration",
        "Valid Passport & TB clearance test (if applicable)",
        "Proof of accommodation (lease contract or deed in host country)",
        "Criminal background record certificate (duly apostilled/translated)"
      ]
    }
  }
};

export default function DocumentChecklist({ isOpen, onClose }) {
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    const categories = Object.keys(checklistDatabase[selectedCountry].categories);
    setSelectedCategory(categories[0]);
    setCheckedItems({});
  }, [selectedCountry]);

  useEffect(() => {
    setCheckedItems({});
  }, [selectedCategory]);

  if (!isOpen) return null;

  const currentCountryObj = checklistDatabase[selectedCountry];
  const availableCategories = Object.keys(currentCountryObj.categories);
  const currentChecklist = currentCountryObj.categories[selectedCategory] || [];

  const handleToggleCheckbox = (idx) => {
    setCheckedItems(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalCount = currentChecklist.length;
  const progressPercent = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;

  // Print and Download features removed as per request

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full p-5 sm:p-8 shadow-2xl relative animate-slide-up max-h-[92vh] overflow-y-auto">
        
        {/* Glow Line Header */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_20px_4px_rgba(59,130,246,0.3)]" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800/50 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5.5 h-5.5" />
        </button>

        {/* Modal Title Banner */}
        <div className="mb-6 flex items-center gap-2">
          <Files className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-bold text-white">Document Checklist Generator</h3>
        </div>

        {/* Inner Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Controls Panel (4 Cols) */}
          <div className="lg:col-span-4 bg-slate-950/40 border border-slate-800 p-5.5 rounded-xl space-y-4">
            
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Target Destination</label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 transition-all appearance-none"
              >
                {Object.entries(checklistDatabase).map(([code, db]) => (
                  <option key={code} value={code} className="bg-slate-950">{db.country}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">Visa Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 transition-all appearance-none"
              >
                {availableCategories.map((cat) => (
                  <option key={cat} value={cat} className="bg-slate-950">{cat} Visa</option>
                ))}
              </select>
            </div>

            {/* Print and Download section removed */}

            <div className="flex items-start gap-2 p-3.5 rounded-xl bg-blue-950/20 border border-blue-900/20 text-slate-400 text-[10px]">
              <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
              <p className="font-light leading-relaxed">
                Checklists match standard consulate parameters. Audits are recommended for complex sponsorship setups.
              </p>
            </div>

          </div>

          {/* Checklist Items Panel (8 Cols) */}
          <div className="lg:col-span-8 bg-slate-950/20 border border-slate-800 p-6 rounded-xl relative overflow-hidden">
            
            {/* Title & Progress indicators */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-5 border-b border-slate-850">
              <div>
                <h4 className="text-sm font-bold text-white">{currentCountryObj.country} Visa Requirements</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">{selectedCategory} Stream Checklist</p>
              </div>
              
              <div className="text-right">
                <span className="text-[11px] text-slate-400 block mb-1">
                  Checked: <span className="font-bold text-white">{checkedCount}</span> of <span className="font-bold text-white">{totalCount}</span>
                </span>
                <div className="w-32 h-1.5 bg-slate-950 rounded-full border border-slate-850 overflow-hidden inline-block">
                  <div className="h-full bg-blue-600 rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>
            </div>

            {/* Checklist lists */}
            <div className="space-y-2.5 max-h-[42vh] overflow-y-auto pr-1">
              {currentChecklist.map((doc, idx) => {
                const isChecked = !!checkedItems[idx];
                return (
                  <button
                    key={idx}
                    onClick={() => handleToggleCheckbox(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs flex items-start gap-3 ${
                      isChecked
                        ? 'bg-blue-600/5 border-blue-500/30 text-slate-300'
                        : 'bg-slate-950/60 border-slate-900 text-slate-400 hover:border-slate-800'
                    }`}
                  >
                    <span className="mt-0.5 flex-shrink-0 text-blue-400">
                      {isChecked ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4 text-slate-700" />}
                    </span>
                    <span className={`${isChecked ? 'line-through text-slate-500' : 'font-light leading-relaxed'}`}>{doc}</span>
                  </button>
                );
              })}
            </div>

            {/* Vetting disclaimer banner */}
            <div className="mt-6 flex items-center gap-2 p-3 rounded-lg bg-slate-950 border border-slate-900 text-[10px] text-slate-500 font-light">
              <ShieldAlert className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
              <p>
                Consulate officers reserve absolute rights to request supplemental proofs. This checklist serves as a core document filing guide only.
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
