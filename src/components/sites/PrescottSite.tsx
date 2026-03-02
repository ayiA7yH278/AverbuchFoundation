import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Business } from '@/data/businesses';
import { BrandSiteFooter } from '@/components/BrandSiteFooter';
import { ArrowLeft, ArrowRight, MapPin, Phone, Mail, Clock, Menu, X } from 'lucide-react';

interface Props { business: Business; page: string; }

export default function PrescottSite({ business: b, page }: Props) {
  const [sent, setSent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { colors, fonts, hero, about, services, testimonials, contact, image } = b;
  const slug = b.slug;
  const base = `/gallery/${slug}`;
  const links = [
    { path: `${base}`, label: 'Home', pg: 'home' },
    { path: `${base}/about`, label: 'About', pg: 'about' },
    { path: `${base}/services`, label: 'Practice Areas', pg: 'services' },
    { path: `${base}/contact`, label: 'Contact', pg: 'contact' },
  ];
  const GoldLine = () => <div className="w-16 h-px mx-auto my-8" style={{ backgroundColor: colors.secondary }} />;

  return (
    <div style={{ fontFamily: fonts.body, color: colors.foreground }}>
      {/* Nav — dark navy, gold accents, serif logo */}
      <nav className="sticky top-0 z-50 px-6 py-4" style={{ backgroundColor: colors.primary }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/gallery" className="text-xs opacity-40 hover:opacity-100" style={{ color: colors.primaryForeground }}><ArrowLeft className="w-3.5 h-3.5" /></Link>
            <Link to={base} className="text-xl font-bold" style={{ fontFamily: fonts.heading, color: colors.secondary }}>{b.name}</Link>
          </div>
          <div className="hidden md:flex gap-8">
            {links.map(l => (
              <Link key={l.pg} to={l.path} className="text-sm transition-all border-b-2 pb-0.5" style={{ color: colors.primaryForeground, borderColor: page === l.pg ? colors.secondary : 'transparent', opacity: page === l.pg ? 1 : 0.7 }}>{l.label}</Link>
            ))}
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ color: colors.primaryForeground }}>{menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
        </div>
        {menuOpen && <div className="md:hidden pt-4 space-y-2">{links.map(l => <Link key={l.pg} to={l.path} onClick={() => setMenuOpen(false)} className="block py-2 text-sm" style={{ color: colors.primaryForeground, opacity: page === l.pg ? 1 : 0.6 }}>{l.label}</Link>)}</div>}
      </nav>

      {page === 'home' && (
        <>
          {/* Dark centered hero with gold lines */}
          <section className="min-h-[75vh] flex items-center justify-center text-center px-6" style={{ backgroundColor: colors.primary, color: colors.primaryForeground }}>
            <div className="max-w-3xl">
              <GoldLine />
              <p className="text-sm uppercase tracking-[0.4em] mb-6 opacity-60">{b.tagline}</p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6" style={{ fontFamily: fonts.heading }}>{hero.headline}</h1>
              <GoldLine />
              <p className="text-lg leading-relaxed opacity-80 mb-10 max-w-xl mx-auto">{hero.subheadline}</p>
              <Link to={`${base}/contact`} className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-medium border-2 transition-colors hover:bg-white/10" style={{ borderColor: colors.secondary, color: colors.secondary }}>
                {hero.cta} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

          {/* Two-column content */}
          <section className="py-24 px-6" style={{ backgroundColor: colors.background }}>
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
              <div className="aspect-[3/4] overflow-hidden"><img src={image} alt={b.name} className="w-full h-full object-cover" /></div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: colors.secondary }}>Our Practice</p>
                <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: fonts.heading }}>{about.story[0].substring(0, 100)}...</h2>
                <p className="text-base leading-[1.9] mb-6" style={{ color: colors.muted }}>{about.story[0]}</p>
                <Link to={`${base}/about`} className="text-sm font-medium inline-flex items-center gap-1 hover:gap-2 transition-all" style={{ color: colors.secondary }}>Read More <ArrowRight className="w-3.5 h-3.5" /></Link>
              </div>
            </div>
          </section>

          {/* Testimonial in bordered box */}
          <section className="py-20 px-6" style={{ backgroundColor: colors.accent }}>
            <div className="max-w-3xl mx-auto p-10 border-2 text-center" style={{ borderColor: colors.secondary }}>
              <p className="text-lg md:text-xl leading-relaxed italic mb-6" style={{ fontFamily: fonts.heading }}>"{testimonials[0].text}"</p>
              <p className="font-semibold text-sm">{testimonials[0].name}</p>
              <p className="text-xs" style={{ color: colors.muted }}>{testimonials[0].role}</p>
            </div>
          </section>
        </>
      )}

      {page === 'about' && (
        <>
          <section className="py-20 px-6 text-center" style={{ backgroundColor: colors.primary, color: colors.primaryForeground }}>
            <GoldLine />
            <h1 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: fonts.heading }}>About the Firm</h1>
            <GoldLine />
          </section>
          <section className="py-20 px-6" style={{ backgroundColor: colors.background }}>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg leading-[2] first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-2" style={{ fontFamily: fonts.heading }}>{about.story[0]}</p>
              <p className="text-base leading-[1.9] mt-6">{about.story[1]}</p>
              <div className="my-12 p-8 text-center border-t border-b" style={{ borderColor: `${colors.secondary}40` }}>
                <p className="text-xl italic leading-relaxed" style={{ fontFamily: fonts.heading }}>"{about.mission}"</p>
              </div>
              <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: fonts.heading }}>Our Partners</h2>
              {about.team.map((m, i) => (
                <div key={i} className="py-6 border-b flex gap-6 items-start" style={{ borderColor: `${colors.muted}20` }}>
                  <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center font-bold text-lg" style={{ backgroundColor: colors.primary, color: colors.secondary, fontFamily: fonts.heading }}>{m.name.split(' ').map(n => n[0]).join('')}</div>
                  <div><h3 className="font-semibold text-lg" style={{ fontFamily: fonts.heading }}>{m.name}</h3><p className="text-sm mb-1" style={{ color: colors.secondary }}>{m.role}</p><p className="text-sm" style={{ color: colors.muted }}>{m.bio}</p></div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {page === 'services' && (
        <>
          <section className="py-16 px-6 text-center" style={{ backgroundColor: colors.primary, color: colors.primaryForeground }}>
            <GoldLine />
            <h1 className="text-4xl font-bold" style={{ fontFamily: fonts.heading }}>Practice Areas</h1>
            <GoldLine />
          </section>
          <section className="py-20 px-6" style={{ backgroundColor: colors.background }}>
            <div className="max-w-3xl mx-auto space-y-0">
              {services.map((s, i) => (
                <div key={i} className="py-10 border-b" style={{ borderColor: `${colors.muted}15` }}>
                  <div className="flex items-start gap-6">
                    <span className="text-3xl font-bold" style={{ color: colors.secondary, fontFamily: fonts.heading }}>{String(i + 1).padStart(2, '0')}</span>
                    <div><h3 className="text-xl font-bold mb-2" style={{ fontFamily: fonts.heading }}>{s.name}</h3><p className="text-sm leading-relaxed" style={{ color: colors.muted }}>{s.description}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {page === 'contact' && (
        <>
          <section className="py-16 px-6 text-center" style={{ backgroundColor: colors.primary, color: colors.primaryForeground }}>
            <GoldLine />
            <h1 className="text-4xl font-bold" style={{ fontFamily: fonts.heading }}>Contact Us</h1>
            <GoldLine />
          </section>
          <section className="py-20 px-6" style={{ backgroundColor: colors.background }}>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16">
              <div>
                <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: fonts.heading }}>Get in Touch</h2>
                {sent ? <div className="p-8 text-center border-2" style={{ borderColor: colors.secondary }}><p className="font-semibold" style={{ fontFamily: fonts.heading }}>Thank you for your inquiry.</p></div> : (
                  <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-4">
                    <input required placeholder="Full Name" className="w-full px-4 py-3 border text-sm outline-none" style={{ borderColor: `${colors.muted}30` }} />
                    <input required type="email" placeholder="Email" className="w-full px-4 py-3 border text-sm outline-none" style={{ borderColor: `${colors.muted}30` }} />
                    <input type="tel" placeholder="Phone" className="w-full px-4 py-3 border text-sm outline-none" style={{ borderColor: `${colors.muted}30` }} />
                    <textarea required rows={5} placeholder="Describe your legal matter" className="w-full px-4 py-3 border text-sm outline-none resize-none" style={{ borderColor: `${colors.muted}30` }} />
                    <button type="submit" className="px-8 py-3 text-sm font-medium" style={{ backgroundColor: colors.primary, color: colors.secondary }}>Submit Inquiry</button>
                  </form>
                )}
              </div>
              <div className="space-y-6">
                <h2 className="text-2xl font-bold" style={{ fontFamily: fonts.heading }}>Office</h2>
                <div className="space-y-4 text-sm">
                  <p>{contact.address}<br />{contact.city}<br />{contact.country}</p>
                  <p>{contact.phone}</p>
                  <p>{contact.email}</p>
                  {contact.hours.map((h, i) => <p key={i} style={{ color: colors.muted }}>{h}</p>)}
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      <BrandSiteFooter name={b.name} backgroundColor={colors.primary} />
    </div>
  );
}
