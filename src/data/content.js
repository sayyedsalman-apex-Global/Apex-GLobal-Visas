// Content Mock Data for APEX GLOBAL VISAS

export const destinations = [
  {
    id: "usa",
    country: "United States",
    flagCode: "US",
    popularFor: "Education & Tech Jobs",
    description: "Navigate the complex US immigration system with expert preparation for visa petitions and consular interviews.",
    categories: [
      { code: "B1/B2", name: "Business & Tourist Visa" },
      { code: "F1 / M1", name: "Academic & Vocational Student" },
      { code: "H-1B", name: "Specialty Occupations Work Visa" },
      { code: "L-1", name: "Intracompany Transferee Executive" },
      { code: "EB-1 / EB-2", name: "Employment-Based Green Card" }
    ],
    accentColor: "from-blue-600/20 to-indigo-600/20",
    hoverBorder: "hover:border-blue-500/50"
  },
  {
    id: "canada",
    country: "Canada",
    flagCode: "CA",
    popularFor: "Express Entry & PR",
    description: "Streamlined assistance for Permanent Residency, provincial nominations, and university study permits.",
    categories: [
      { code: "Express Entry", name: "Federal Skilled Worker Program" },
      { code: "PNP", name: "Provincial Nominee Program" },
      { code: "Study Permit", name: "Designated Learning Institution Route" },
      { code: "Super Visa", name: "Parents & Grandparents Visa" },
      { code: "LMIA Work", name: "Employer-Specific Work Permit" }
    ],
    accentColor: "from-red-600/20 to-rose-600/20",
    hoverBorder: "hover:border-red-500/50"
  },
  {
    id: "uk",
    country: "United Kingdom",
    flagCode: "GB",
    popularFor: "Point-Based System",
    description: "Customized advisory for Student Route, Skilled Worker Route, and High Value Innovator/Founder visas.",
    categories: [
      { code: "Skilled Worker", name: "Tier 2 Sponsored Work Route" },
      { code: "Student Route", name: "Higher Education Study Visa" },
      { code: "Innovator Founder", name: "Business Investment Visa" },
      { code: "Scale-up Visa", name: "Fast-Growth Company Route" },
      { code: "High Potential", name: "Top University Graduate Visa" }
    ],
    accentColor: "from-indigo-600/20 to-purple-600/20",
    hoverBorder: "hover:border-indigo-500/50"
  },
  {
    id: "australia",
    country: "Australia",
    flagCode: "AU",
    popularFor: "Skilled & Family Visas",
    description: "Achieve Australian residency via points-tested skilled visa streams, partner visas, and regional permits.",
    categories: [
      { code: "Subclass 189", name: "Skilled Independent Visa" },
      { code: "Subclass 190", name: "Skilled Nominated Visa" },
      { code: "Subclass 482", name: "Temporary Skill Shortage Work" },
      { code: "Subclass 500", name: "Student Visa Program" },
      { code: "Subclass 600", name: "Visitor & Tourist Visa" }
    ],
    accentColor: "from-teal-600/20 to-cyan-600/20",
    hoverBorder: "hover:border-teal-500/50"
  },
  {
    id: "nz",
    country: "New Zealand",
    flagCode: "NZ",
    popularFor: "Work to Residence",
    description: "Expert counsel for Accredited Employer Work Visas and Green List pathway residency registrations.",
    categories: [
      { code: "AEWV", name: "Accredited Employer Work Visa" },
      { code: "Green List PR", name: "Fast-Track In-Demand Roles" },
      { code: "Skilled Migrant", name: "Points-based Residency Category" },
      { code: "Student Visa", name: "Tertiary Study & Post-Study Work" },
      { code: "Partner Visa", name: "Family Reunification Permit" }
    ],
    accentColor: "from-emerald-600/20 to-teal-600/20",
    hoverBorder: "hover:border-emerald-500/50"
  },
  {
    id: "schengen",
    country: "Schengen Area",
    flagCode: "EU",
    popularFor: "27 European Countries",
    description: "Comprehensive itinerary curation and document structuring for Business, Tourism, or Long-Term Stay visas.",
    categories: [
      { code: "Type C Tourist", name: "Short-stay Tourism Visa" },
      { code: "Type C Business", name: "Professional Meetings & Events" },
      { code: "Type D Student", name: "National Visa for University Studies" },
      { code: "Golden Visa", name: "Residency by Investment Schemes" },
      { code: "Digital Nomad", name: "Remote Worker Permits (Spain/Portugal)" }
    ],
    accentColor: "from-amber-600/20 to-yellow-600/20",
    hoverBorder: "hover:border-amber-500/50"
  },
  {
    id: "global",
    country: "Many More Countries",
    flagCode: "GLOBAL",
    popularFor: "100+ DESTINATIONS",
    description: "Looking for guidance on Turkey, Japan, UAE / Dubai, Singapore, or other destinations? We provide end-to-end visa application assistance worldwide.",
    categories: [
      { code: "Turkey & Europe", name: "eVisa, Tourist & Business Permits" },
      { code: "UAE / Dubai", name: "Express Tourist & Golden Visas" },
      { code: "Asia-Pacific", name: "Japan, Singapore & South Korea eVisas" },
      { code: "Custom Guidance", name: "Personalised Application Structuring" }
    ],
    accentColor: "from-sky-600/20 to-teal-600/20",
    hoverBorder: "hover:border-sky-500/50"
  }
];

export const processSteps = [
  {
    step: "01",
    title: "Case Review",
    description: "Our legal experts scrutinize your personal, academic, and professional background to check eligibility markers."
  },
  {
    step: "02",
    title: "Risk Assessment",
    description: "We analyze previous visa applications, gaps, and potential grounds for refusal to devise custom mitigation strategies."
  },
  {
    step: "03",
    title: "Strategic Guidance",
    description: "Drafting a customized immigration roadmap specifying optimal visa streams, timeline milestones, and document checklist maps."
  },
  {
    step: "04",
    title: "Interview Preparation",
    description: "Simulating authentic consular environments with live 1-on-1 mock sessions, feedback logs, and confidence coaching."
  },
  {
    step: "05",
    title: "Documentation Advice",
    description: "Final vetting of financial proof declarations, letters of explanation (SOP), sponsor links, and translation checks."
  }
];

export const reviews = [
  {
    id: 1,
    name: "Dr. Arvind Swamy",
    role: "Senior Citizen / Family Visa",
    comment: "Securing the Canadian Super Visa for our parents seemed daunting due to insurance audits, but the Apex team guided us through every step. Their risk assessment was flawless.",
    rating: 5,
    location: "Bengaluru, India",
    visaType: "Canada Super Visa"
  },
  {
    id: 2,
    name: "Siddharth Mehta",
    role: "Graduate Student",
    comment: "The 1-on-1 mock interviews prepared by Apex for my F1 visa were incredibly realistic. By the time I stood at the counter in Mumbai, my confidence was sky-high. Approved in 2 minutes!",
    rating: 5,
    location: "Mumbai, India",
    visaType: "USA F1 Student Visa"
  },
  {
    id: 3,
    name: "Elena Rostova",
    role: "Skilled Professional",
    comment: "Apex resolved all my queries regarding the UK Skilled Worker Sponsor transition. Their Strategic Guidance step saved me weeks of manual tracking and document rework.",
    rating: 5,
    location: "London, UK",
    visaType: "UK Skilled Worker Visa"
  },
  {
    id: 4,
    name: "The Vance Family",
    role: "Family Migration",
    comment: "Migrating to Australia with children required a perfect Subclass 190 application. The meticulous documentation checks by Apex made sure we got our PR granted without queries.",
    rating: 5,
    location: "Auckland, NZ",
    visaType: "Australia Subclass 190 PR"
  },
  {
    id: 5,
    name: "Meera Nair",
    role: "Digital Nomad",
    comment: "I applied for the Portuguese Digital Nomad visa through their Schengen desk. Apex helped structure my contracts and statements perfectly. Highly recommended for remote workers!",
    rating: 5,
    location: "Kochi, India",
    visaType: "Portugal D8 Nomad Visa"
  }
];
