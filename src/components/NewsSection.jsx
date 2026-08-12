import { useState } from 'react';
import { Newspaper, Calendar, Clock, ArrowRight, X, ChevronRight, BookOpen } from 'lucide-react';

const NEWS_ARTICLES = [
  {
    id: 'featured-1',
    isFeatured: true,
    title: 'USA & Canada Visa Guidelines 2026: Key Policy Revisions & Caps',
    category: 'Policy Update',
    date: 'August 02, 2026',
    readTime: '5 min read',
    summary: 'Important structural updates regarding study permits, specialty occupation caps, and expedited processing pathways for the upcoming fiscal years in the United States and Canada. Learn how these adjustments impact your timeline.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    content: [
      'The departments of immigration in both the United States (USCIS) and Canada (IRCC) have announced updated guidelines for the 2026 fiscal year. These reforms aim to prioritize high-skilled professionals and balance local labor shortages.',
      'Key US Updates: The H-1B specialty occupation cap remains subject to stricter auditing, while USCIS has introduced a streamlined premium processing pathway for Eb-1 and Eb-2 applicant streams to reduce backlogs.',
      'Key Canada Updates: IRCC is introducing a redesigned provincial nomination quota matrix. International student permit numbers are now tied directly to local student housing indices, meaning universities with verified housing facilities will see faster permit processing.',
      'How to Prepare: Applicants are advised to submit applications at least 6 months in advance. Ensuring that job descriptions align perfectly with national occupational codes is crucial to avoid requests for evidence (RFEs).'
    ]
  },
  {
    id: 'recent-1',
    isFeatured: false,
    title: 'Schengen Visa Slot Availability Update',
    category: 'Consulate Alert',
    date: 'July 28, 2026',
    readTime: '3 min read',
    summary: 'Major Schengen consulates introduce a rolling 90-day booking window to curb slot hoarding and third-party bots.',
    image: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=400&q=80',
    content: [
      'In a bid to combat slot scalping and AI booking bots, European consulates (led by France, Spain, and Germany) have launched a modernized rolling appointment system.',
      'Under the new system, appointment slots will be released in small, random batches throughout the week rather than on fixed monthly intervals. The booking window is now capped strictly at 90 days from the current date.',
      'Consulates also require biometric pre-verification at the time of slot reservation. This step effectively prevents resellers from booking slots under placeholder names.',
      'Our team suggests keeping a pre-validated dossier on hand, as slots are often claimed within minutes of release. Having a travel itinerary pre-authorized by our advisory desk ensures you can grab any open slot instantly.'
    ]
  },
  {
    id: 'recent-2',
    isFeatured: false,
    title: 'UK Student Visa Rule Changes',
    category: 'Student Route',
    date: 'July 22, 2026',
    readTime: '4 min read',
    summary: 'Home Office details work authorization restrictions and post-study transition updates for academic intakes.',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=400&q=80',
    content: [
      'The UK Home Office has announced adjustments to Student Route (formerly Tier 4) visa regulations, tightening work authorizations while protecting post-study benefits.',
      'Main Adjustments: In-term working allowances are capped at 15 hours per week for undergraduate students, down from the previous 20 hours. Postgraduate research students, however, retain their unrestricted work hours during holidays.',
      'Dependant Policies: Sponsoring dependants is now exclusively limited to students enrolled in postgraduate research programs (Ph.D. or research-based Masters). Standard taught Master routes will no longer permit accompanying family members.',
      'The Graduate Route (PSW) remains active, allowing graduates to seek employment in the UK for up to 2 years (3 years for doctoral graduates) under current points-based requirements.'
    ]
  },
  {
    id: 'recent-3',
    isFeatured: false,
    title: 'Australia Skilled Migration Program Cap Adjustments',
    category: 'Skilled Migration',
    date: 'July 15, 2026',
    readTime: '4 min read',
    summary: 'State-nominated streams receive new allocation numbers for Subclass 190 and 491 visa pathways.',
    image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=400&q=80',
    content: [
      'The Australian Department of Home Affairs has released the official state nomination caps for the Subclass 190 (Skilled Nominated) and Subclass 491 (Skilled Work Regional) streams for the current fiscal year.',
      'Regional Focus: Allocation quotas for regional visas (Subclass 491) have been increased by 15% to encourage skilled migrants to settle in fast-growing regional hubs. Major metropolitan caps (Sydney, Melbourne) have been slightly reduced to manage urban infrastructure strain.',
      'Priority Sectors: Health, education, and technology sectors continue to dominate fast-track processing queues. Expression of Interest (EOI) pools in these categories will require a lower point threshold for invitation rounds.',
      'Applicants should double-check their skills assessment validity. It is recommended to update skill profiles with updated language scores or additional work experience entries to stay competitive in the EOI pool.'
    ]
  }
];

export default function NewsSection() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const featuredArticle = NEWS_ARTICLES.find(article => article.isFeatured);
  const recentArticles = NEWS_ARTICLES.filter(article => !article.isFeatured);

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80';
  };

  return (
    <section id="news" className="py-16 sm:py-24 bg-slate-950 border-t border-slate-900 relative overflow-hidden">
      {/* Background Decorative Blur */}
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-indigo-600/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-semibold text-blue-400 mb-3 uppercase tracking-wider">
            <Newspaper className="w-3.5 h-3.5" />
            <span>Updates & Insights</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Latest Visa News & Updates
          </h2>
          <p className="text-slate-400 mt-2 max-w-xl mx-auto text-sm sm:text-base font-light">
            Stay informed with the latest immigration policies, slot availability updates, and critical visa regulations.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Left Column: Featured Article */}
          {featuredArticle && (
            <div className="lg:col-span-7 flex flex-col">
              <div className="glass-card rounded-2xl overflow-hidden flex flex-col h-full group hover:border-slate-800 transition-all duration-300">

                {/* Image wrapper with hover effect */}
                <div className="relative overflow-hidden aspect-[16/9] w-full bg-slate-900">
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    onError={handleImageError}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                  {/* Category Badge on top of image */}
                  <span className="absolute top-4 left-4 inline-block px-3 py-1 text-[10px] font-bold tracking-wider uppercase bg-blue-600/90 text-white rounded-md backdrop-blur-sm">
                    {featuredArticle.category}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-8 flex flex-col flex-grow">

                  {/* Meta items */}
                  <div className="flex items-center gap-4 text-xs text-slate-400 mb-3.5">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {featuredArticle.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      {featuredArticle.readTime}
                    </span>
                  </div>

                  {/* Headline */}
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-4 group-hover:text-blue-400 transition-colors leading-tight">
                    {featuredArticle.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-slate-400 text-sm font-light leading-relaxed mb-6 flex-grow">
                    {featuredArticle.summary}
                  </p>

                  {/* Read More Action */}
                  <div>
                    <button
                      onClick={() => setSelectedArticle(featuredArticle)}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-500 hover:text-white transition-colors duration-200 group/btn cursor-pointer"
                    >
                      <span>Read Full Article</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
                    </button>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* Right Column: Recent News Feed */}
          <div className="lg:col-span-5 flex flex-col gap-5 justify-between">
            <h4 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-1">
              Recent Feed
            </h4>

            <div className="flex flex-col gap-4 flex-grow justify-between">
              {recentArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="glass-card p-4 rounded-xl flex gap-4 cursor-pointer hover:border-slate-800 transition-all duration-300 group/card"
                >
                  {/* Thumbnail */}
                  <img
                    src={article.image}
                    alt={article.title}
                    onError={handleImageError}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-lg object-cover flex-shrink-0 bg-slate-800 transition-transform duration-500 group-hover/card:scale-105"
                  />

                  {/* Details */}
                  <div className="flex flex-col justify-between flex-grow">
                    <div>
                      {/* Category and date */}
                      <div className="flex items-center gap-3.5 text-[10px] font-bold text-slate-500 uppercase mb-1">
                        <span className="text-blue-500">{article.category}</span>
                        <span>•</span>
                        <span>{article.date}</span>
                      </div>

                      {/* Title */}
                      <h4 className="text-sm font-bold text-slate-200 group-hover/card:text-blue-400 transition-colors leading-snug line-clamp-2">
                        {article.title}
                      </h4>
                    </div>

                    {/* Action link */}
                    <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-400 group-hover/card:text-blue-500 transition-colors mt-2">
                      <span>Read Updates</span>
                      <ChevronRight className="w-3 h-3 transition-transform duration-200 group-hover/card:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Interactive Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setSelectedArticle(null)}
          />

          {/* Modal Content container */}
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl z-10 max-h-[92vh] sm:max-h-[85vh] flex flex-col animate-slide-up">

            {/* Modal Header Actions */}
            <div className="absolute top-4 right-4 z-20">
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-1.5 rounded-full bg-slate-950/60 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Contents */}
            <div className="overflow-y-auto p-6 sm:p-8">

              {/* Header Image */}
              <div className="relative rounded-xl overflow-hidden aspect-[21/9] w-full mb-6 bg-slate-950 border border-slate-800">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  onError={handleImageError}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              </div>

              {/* Category Pill and reading data */}
              <div className="flex items-center gap-3.5 mb-4">
                <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-blue-600/20 text-blue-400 border border-blue-500/20 rounded-md">
                  {selectedArticle.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  {selectedArticle.date}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  {selectedArticle.readTime}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-6 leading-snug">
                {selectedArticle.title}
              </h3>

              {/* Article Paragraphs */}
              <div className="space-y-4 text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                {selectedArticle.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Callout box */}
              <div className="mt-8 p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex items-start gap-3">
                <div className="p-1 rounded bg-blue-600/10 text-blue-400 mt-0.5">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">Apex Advisory Tip</h4>
                  <p className="text-xs text-slate-400 font-light leading-relaxed">
                    Visa policies change frequently. For a personalized profile analysis based on these latest rules, click the "Book Advisory" button on the navigation bar to speak with a compliance auditor.
                  </p>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-900/80 border-t border-slate-800 flex justify-end gap-3.5">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Close
              </button>
              <a
                href="#contact"
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2 text-xs font-bold uppercase tracking-wider bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors inline-flex items-center justify-center"
              >
                Get Advisory Advice
              </a>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
