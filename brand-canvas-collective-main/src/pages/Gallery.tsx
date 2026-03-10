import { Link } from 'react-router-dom';
import { businesses } from '@/data/businesses';
import { ArrowUpRight } from 'lucide-react';

export default function Gallery() {
  return (
    <div className="min-h-screen bg-gallery text-gallery-text">
      {/* Header */}
      <header className="pt-20 md:pt-32 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-gallery-muted text-xs uppercase tracking-[0.4em] mb-6 font-space">
            Portfolio — 2026
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-space leading-[1.05] mb-6 max-w-4xl">
            Selected Projects
          </h1>
          <p className="text-gallery-muted text-base md:text-lg max-w-xl font-dm leading-relaxed">
            A collection of brand experiences crafted across industries — from local cafés to global consultancies.
          </p>
        </div>
      </header>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-gallery-border" />
      </div>

      {/* Grid */}
      <main className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {businesses.map((biz, i) => (
            <Link
              key={biz.slug}
              to={`/${biz.slug}`}
              className="group block animate-float-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="rounded-xl overflow-hidden bg-gallery-surface border border-gallery-border transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(255,255,255,0.07)]">
                <div className="aspect-[3/2] overflow-hidden relative">
                  <img
                    src={biz.image}
                    alt={`${biz.name} — ${biz.industry}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="text-base font-semibold font-space tracking-tight">{biz.name}</h3>
                    <span className="text-[11px] text-gallery-muted uppercase tracking-widest font-dm">{biz.industry}</span>
                  </div>
                  <p className="text-sm text-gallery-muted font-dm leading-relaxed">{biz.shortDescription}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gallery-border py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gallery-muted text-sm font-dm">© 2026 Portfolio. All rights reserved.</p>
          <p className="text-gallery-muted text-sm font-dm">Built with care and craft.</p>
        </div>
      </footer>
    </div>
  );
}
