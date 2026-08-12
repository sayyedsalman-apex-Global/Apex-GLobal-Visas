import { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

const GENERAL_FAQ = [
  {
    question: "What visa services does Apex Global Visas provide?",
    answer: "We assist with Student Visas, Tourist/Travel Visas, Work Permits, Business Visas, and Permanent Residency (PR) applications for major global destinations including Canada, UK, USA, Australia, Europe, and Gulf countries."
  },
  {
    question: "How do I book an advisory session?",
    answer: "You can click on the \"Book Advisory\" button at the top or fill out the \"Initial File Assessment Form\" in the Contact Us section. Our team will review your requirements and assign a certified consultant."
  },
  {
    question: "Where is your office located?",
    answer: "Our main office is located at 800/2, Gurunanak Nagar, Gaibanshah Dargah Road, LBS Marg, Next to Madhuban Toyota Showroom, Ghatkopar West, Mumbai - 400086."
  },
  {
    question: "What documents do I need for my initial file assessment?",
    answer: "For an initial review, you generally need your updated CV/Resume, academic transcripts or work experience documents, and a copy of your valid passport."
  },
  {
    question: "How long does the visa processing take?",
    answer: "Processing times vary depending on the destination country, visa category, and embassy response times. During your profile review, we provide an estimated timeline based on your specific case file."
  }
];

const USA_VISA_FAQ = [
  {
    question: "What documents are required for a U.S. visa application?",
    answer: "Essential documents include a valid passport (valid for at least 6 months beyond intended stay), DS-160 confirmation page, application fee receipt, and appointment confirmation page. Additional supporting documents include financial proof, employment/education ties, and travel itinerary."
  },
  {
    question: "Are applicants under the age of 14 or over the age of 79 required to be present for their appointment?",
    answer: "Generally, applicants under 14 and over 79 are exempt from attending the in-person interview, provided they meet specific eligibility criteria for the interview waiver (Drop Box) program."
  },
  {
    question: "My passport has expired, but the U.S. visa in it is still valid. Do I need to apply for a new visa?",
    answer: "No, as long as the U.S. visa is undamaged and valid, you can travel using your old expired passport containing the valid visa alongside your new valid passport, provided both passports are from the same country and for the same visa category."
  },
  {
    question: "Can my friends and I apply together as a family to travel to the United States?",
    answer: "Friends cannot apply under a single 'family' application group. However, you can schedule group appointments together if traveling as a recognized delegation or group, or simply book appointments in the same time window individually."
  },
  {
    question: "How can I extend my visa?",
    answer: "U.S. visas cannot be 'extended' while inside or outside the U.S. To stay longer while in the U.S., you must file an extension of stay with USCIS before your I-94 expires. If your visa foil expires, you must re-apply for a new visa at a U.S. Embassy/Consulate abroad."
  },
  {
    question: "Why does my visa say 'FNU'?",
    answer: "'FNU' stands for 'First Name Unknown'. If your passport only contains one full name without a clear separation of Given Name and Surname, the U.S. Consulate enters your entire name in the Surname field and defaults the Given Name to FNU."
  },
  {
    question: "What if I miss my VAC or Consular appointment date?",
    answer: "If you miss your appointment, you must log in to your U.S. visa scheduling portal to reschedule it for an available future slot. Note that frequent missed appointments may hit your system rescheduling limit."
  },
  {
    question: "What is the rescheduling limit on appointment?",
    answer: "Applicants are generally allowed to reschedule their visa appointment up to 2-3 times depending on current embassy portal policies. Exceeding this limit may require paying a new MRV visa fee."
  },
  {
    question: "What is a properly completed DS-160 form and why is expert advice recommended? Will DS-160 affect my visa approval?",
    answer: "The DS-160 is the core document reviewed by the consular officer. Inaccuracies, inconsistencies, or omissions can lead to delays or outright refusal under Section 214(b). Expert guidance ensures information matches your supporting documentation seamlessly."
  },
  {
    question: "How early should I apply for my student visa?",
    answer: "You should apply as soon as you receive your I-20 or DS-2019 form from your educational institution. F and M student visas can be issued up to 365 days before the course start date, but you cannot enter the U.S. earlier than 30 days before start date."
  },
  {
    question: "I received my F1 student visa, when should I travel?",
    answer: "You can enter the U.S. no earlier than 30 days prior to the program start date listed on your I-20 form."
  },
  {
    question: "I am applying for an H1B/L1 visa and would like my spouse to travel with me. Can he or she apply for a dependent visa (H4/L2) at the same time as me or should they wait until my visa has been issued?",
    answer: "Yes, dependents (spouses and unmarried children under 21) can schedule and attend their visa interview appointment together at the same time as the principal applicant."
  },
  {
    question: "I have a valid H1B visa which contains my previous petitioner's details. I have changed my employer with a valid I-797 and am back in India for a short trip. Can I travel back to the U.S. on the same visa or do I need to apply for a new visa?",
    answer: "Yes, you can travel using your unexpired H1B visa carrying your previous employer's name, provided you carry your original, approved Form I-797 Notice of Action for your new employer along with a current employment verification letter."
  },
  {
    question: "What should I do if my visa is lost or stolen?",
    answer: "Report the loss or theft immediately to the local police and obtain a police report. Next, report it to the U.S. Embassy/Consulate that issued the visa. You must re-apply for a new visa from scratch if you plan to travel again."
  }
];

const AUSTRALIA_VISA_FAQ = [
  {
    question: "Do I need to submit my passport to the embassy?",
    answer: "No, Australia issues electronic visas (eVisa / ETA / Subclass 600). Your visa is digitally linked to your passport number in the Australian immigration system, so you do not need to submit your physical passport to an embassy."
  },
  {
    question: "Can I extend my visitor visa?",
    answer: "You cannot directly 'extend' a visitor visa. However, if your current visa does not have Condition 8503 ('No Further Stay'), you can apply for a new onshore Visitor Visa (Subclass 600) before your current visa expires."
  },
  {
    question: "Is my visa fee refundable if my application is rejected?",
    answer: "No, Australian Department of Home Affairs visa application charges are non-refundable processing fees, regardless of whether your application is approved, delayed, or refused."
  },
  {
    question: "What if my \"first entry\" date has passed?",
    answer: "If the 'Must Not Enter After' or 'First Entry' date on your visa grant notification has passed, your visa is no longer valid for travel and you must apply for a new visa from scratch."
  },
  {
    question: "Do I need health insurance?",
    answer: "While travel/health insurance is not strictly mandatory for all tourist visa applicants, it is highly recommended as non-residents are not covered by Australia's national healthcare scheme (Medicare) and medical costs can be extremely high."
  },
  {
    question: "Can I work on a tourist visa?",
    answer: "No, working is strictly prohibited on an Australian Visitor Visa (Subclass 600) under Condition 8101 ('No Work'). Unpaid volunteer work or limited online work for your overseas employer may be permitted under specific conditions, but local employment is strictly illegal."
  }
];

const CANADA_VISA_FAQ = [
  {
    question: "How long can I stay?",
    answer: "Most visitors can stay in Canada for up to 6 months from the date of entry. The border services officer at the port of entry may stamp your passport or issue a visitor record indicating a different date by which you must leave."
  },
  {
    question: "What are the main requirements?",
    answer: "Key requirements include a valid passport, proof of financial support to cover your stay, strong ties to your home country (job, assets, family), good health (medical exam if requested), no criminal record, and a clear intention to leave Canada at the end of your visit."
  },
  {
    question: "Do I need an interview?",
    answer: "In most cases, an in-person interview is not required for a Canadian visitor visa or study permit. Decisions are usually made based on your submitted online documents and biometrics. However, IRCC officers may request an interview if clarification is needed."
  },
  {
    question: "Can I work?",
    answer: "No, you cannot work on a standard Visitor Visa in Canada. Working without a valid Canadian work permit is illegal."
  },
  {
    question: "Will I need to go in person to give my fingerprints and photograph each time I apply?",
    answer: "Generally, biometrics (fingerprints and photo) given for a Canadian visa remain valid for 10 years. You do not need to give biometrics again until the 10-year period expires, even if you re-apply for a new visitor visa."
  },
  {
    question: "Is an appointment required for submitting biometrics at the Canada Visa Application Centre?",
    answer: "Yes, prior booking of an appointment is mandatory for submitting biometrics at a VFS Global Canada Visa Application Centre (VAC) after receiving your Biometric Instruction Letter (BIL) from IRCC."
  },
  {
    question: "When do I need a study permit?",
    answer: "You need a study permit if your program of study in Canada lasts longer than 6 months. For courses or programs lasting 6 months or less, a study permit is generally not required, though you still need a valid visitor visa/eTA."
  },
  {
    question: "Can I work with a student visa?",
    answer: "Yes, full-time international students holding a valid study permit enrolled at a Designated Learning Institution (DLI) can work off-campus for up to 20–24 hours per week during regular academic sessions and full-time during scheduled breaks, provided their permit explicitly permits work."
  }
];

const SCHENGEN_VISA_FAQ = [
  {
    question: "WHICH COUNTRIES ISSUE SCHENGEN VISA?",
    answer: "A Schengen visa is issued by any of the 29 European member countries belonging to the Schengen Area, including France, Germany, Italy, Spain, Switzerland, Austria, Belgium, the Netherlands, Greece, and others."
  },
  {
    question: "Can I visit multiple countries with one Schengen visa and where should I apply?",
    answer: "Yes, a uniform Schengen visa allows you to travel across all Schengen member states. You must apply at the embassy/consulate of the country that is your main destination (where you will spend the most days). If spending equal time in multiple countries, apply to the country of first entry."
  },
  {
    question: "Do I need an interview for a Schengen visa?",
    answer: "Most applicants must attend an in-person appointment at the designated Visa Application Centre (like VFS Global or TLScontact) to submit physical documents and record biometrics. An actual embassy interview is rare unless the visa officer requires further clarification."
  },
  {
    question: "Is biometrics required for a Schengen visa? Who is exempt?",
    answer: "Yes, biometrics (fingerprints and digital photo) are mandatory for all applicants. Exemptions apply to children under 12 years of age, persons for whom fingerprinting is physically impossible, and applicants whose fingerprints were collected within the last 59 months."
  },
  {
    question: "Do I need travel medical insurance for a Schengen visa?",
    answer: "Yes, travel medical insurance is strictly mandatory. It must cover minimum emergency medical and repatriation expenses of €30,000, be valid across all Schengen countries, and cover the full duration of your stay."
  },
  {
    question: "How long before the start of the intended visit should I apply for a visa?",
    answer: "You can apply up to 6 months before your intended travel date, but no later than 15 calendar days prior to departure. It is highly recommended to apply at least 3 to 4 weeks in advance."
  },
  {
    question: "I have a valid long stay visa/residence permit for a country that is part of the Schengen area. Do I need another visa to travel to other Schengen states?",
    answer: "No, a valid national long-stay visa (Type D) or residence permit issued by any Schengen member state allows you to travel freely across other Schengen countries for up to 90 days in any 180-day period without needing an additional visa."
  }
];

export default function FAQ() {
  const [activeTab, setActiveTab] = useState('general'); // 'general', 'canada', 'usa', 'australia', or 'schengen'
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = activeTab === 'general' 
    ? GENERAL_FAQ 
    : activeTab === 'canada'
    ? CANADA_VISA_FAQ
    : activeTab === 'usa' 
    ? USA_VISA_FAQ 
    : activeTab === 'australia'
    ? AUSTRALIA_VISA_FAQ
    : SCHENGEN_VISA_FAQ;

  return (
    <section id="faq" className="py-16 sm:py-24 bg-slate-950 border-t border-slate-900 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/4 w-[350px] h-[350px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-semibold text-blue-400 mb-3 uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Support desk</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 mt-2 text-sm sm:text-base font-light max-w-xl mx-auto">
            Find quick answers to common queries regarding our migration compliance, service booking, and visa routes.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center mb-10 w-full overflow-hidden">
          <div className="flex p-1 rounded-xl bg-slate-900 border border-slate-800 overflow-x-auto no-scrollbar max-w-full gap-1 items-center flex-nowrap justify-start sm:justify-center">
            <button
              onClick={() => { setActiveTab('general'); setOpenIndex(null); }}
              className={`px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'general'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              General Support
            </button>
            <button
              onClick={() => { setActiveTab('canada'); setOpenIndex(null); }}
              className={`px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'canada'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Canada
            </button>
            <button
              onClick={() => { setActiveTab('usa'); setOpenIndex(null); }}
              className={`px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'usa'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              U.S. Visa
            </button>
            <button
              onClick={() => { setActiveTab('australia'); setOpenIndex(null); }}
              className={`px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'australia'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Australia
            </button>
            <button
              onClick={() => { setActiveTab('schengen'); setOpenIndex(null); }}
              className={`px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'schengen'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Schengen Visa
            </button>
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqData.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className="glass-card rounded-2xl border border-slate-800 hover:border-slate-700/80 transition-all overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-white pr-2 group-hover:text-blue-400 transition-colors">
                    {item.question}
                  </span>
                  <div className={`p-1.5 rounded-lg bg-slate-950 border border-slate-850 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-400 border-blue-500/30' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-[500px] border-t border-slate-850/60 bg-slate-950/20' : 'max-h-0'
                  }`}
                >
                  <p className="p-5 sm:p-6 text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                    {item.answer}
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
