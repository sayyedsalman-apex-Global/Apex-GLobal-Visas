import { reviews } from '../data/content';
import { MessageSquareQuote, Star, CheckCircle } from 'lucide-react';

export default function Testimonials() {
  const displayReviews = reviews;

  return (
    <section id="testimonials" className="py-16 sm:py-24 bg-slate-950 border-t border-slate-900 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 sm:mb-16">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-semibold text-blue-400 mb-3 uppercase tracking-wider">
              <MessageSquareQuote className="w-3.5 h-3.5" />
              <span>Success Stories</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Trusted By Over 15,000 Clients
            </h2>
            <p className="text-slate-400 mt-2 max-w-xl text-sm sm:text-base font-light">
              Read firsthand accounts of families, students, and professionals who bypassed administrative barriers with our support.
            </p>
          </div>

        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayReviews.map((review) => (
            <div
              key={review.id}
              className="glass-card p-6.5 rounded-2xl flex flex-col justify-between hover:scale-[1.01] transition-all"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 fill-amber-500 stroke-amber-500" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-slate-300 italic text-sm leading-relaxed mb-6 font-light">
                  "{review.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-slate-900/60 flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-bold text-white leading-snug">{review.name}</h4>
                  <span className="text-[11px] font-semibold text-slate-500 block">{review.role}</span>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
                    <CheckCircle className="w-3 h-3 text-blue-400" />
                    <span>{review.visaType}</span>
                  </span>
                  <span className="text-[10px] block text-slate-600 mt-1">{review.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
