import { Link } from 'react-router-dom';
import { businesses } from '@/data/businesses';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

export default function Gallery() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="pt-20 md:pt-32 pb-8 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <Link 
            to="/" 
            className="inline-block mb-8 text-muted-foreground hover:text-foreground transition-colors font-sans-body text-sm uppercase tracking-monument"
          >
            ← Back to Home
          </Link>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-muted-foreground text-xs uppercase tracking-[0.4em] mb-6 font-sans-body"
          >
            Portfolio — 2026
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif-display text-4xl md:text-6xl lg:text-7xl font-medium leading-[1.05] mb-6 max-w-4xl tracking-tight"
          >
            Selected Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-base md:text-lg max-w-xl font-sans-body leading-relaxed tracking-wide-custom"
          >
            A collection of brand experiences crafted across industries — from local cafés to global consultancies.
          </motion.p>
        </div>
      </header>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="h-px bg-border" />
      </div>

      {/* Grid */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {businesses.map((biz, i) => (
            <motion.div
              key={biz.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link
                to={`/gallery/${biz.slug}`}
                className="group block"
              >
                <div className="rounded-sm overflow-hidden bg-muted/30 border border-border transition-all duration-500 hover:-translate-y-2 hover:shadow-lg">
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
                      <h3 className="text-base font-semibold font-serif-display tracking-tight">{biz.name}</h3>
                      <span className="text-[11px] text-muted-foreground uppercase tracking-widest font-sans-body">{biz.industry}</span>
                    </div>
                    <p className="text-sm text-muted-foreground font-sans-body leading-relaxed">{biz.shortDescription}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm font-sans-body">© 2026 Averbuch Foundation. All rights reserved.</p>
          <p className="text-muted-foreground text-sm font-sans-body">Built with care and craft.</p>
        </div>
      </footer>
    </div>
  );
}
