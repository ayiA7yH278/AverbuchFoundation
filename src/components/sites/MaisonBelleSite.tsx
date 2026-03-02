import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Business } from '@/data/businesses';
import { BrandSiteFooter } from '@/components/BrandSiteFooter';
import { ArrowLeft, ArrowRight, MapPin, Phone, Mail, Clock, Menu, X, Star } from 'lucide-react';

interface Props { business: Business; page: string; }

export default function MaisonBelleSite({ business: b, page }: Props) {
  const [sent, setSent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { colors, fonts, hero, about, services, testimonials, contact, image } = b;
  const slug = b.slug;
  const base = `/gallery/${slug}`;
  const links = [
    { path: `${base}`, label: 'Home', pg: 'home' },
    { path: `${base}/about`, label: 'About', pg: 'about' },
    { path: `${base}/services`, label: 'Services', pg: 'services' },
    { path: `${base}/contact`, label: 'Book', pg: 'contact' },
  ];

  return (
    <div style={{ fontFamily: fonts.body, backgroundColor: colors.background, color: colors.foreground }}>
      {/* Nav — delicate, serif logo, thin */}
      <nav className="sticky top-0 z-50 px-6 py-4" style={{ backgroundColor: `${colors.background}F0`, backdropFilter: 'blur(12px)' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/gallery" className="text-xs opacity-40 hover:opacity-100"><ArrowLeft className="w-3 h-3" /></Link>
            <Link to={base} className="text-2xl font-light italic" style={{ fontFamily: fonts.heading, color: colors.primary }}>{b.name}</Link>
          </div>
          <div className="hidden md:flex gap-8">
            {links.map(l => (
              <Link key={l.pg} to={l.path} className="text-xs uppercase tracking-[0.2em] transition-opacity" style={{ color: colors.foreground, opacity: page === l.pg ? 1 : 0.4 }}>{l.label}</Link>
            ))}
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
        </div>
        {menuOpen && <div className="md:hidden pt-4 space-y-3 text-center">{links.map(l => <Link key={l.pg} to={l.path} onClick={() => setMenuOpen(false)} className="block text-sm" style={{ opacity: page === l.pg ? 1 : 0.5 }}>{l.label}</Link>)}</div>}
      </nav>

      {page === 'home' && (
        <>
          {/* Asymmetric hero — large offset image with overlapping text card */}
          <section className="min-h-[85vh] flex items-center py-20 px-6" style={{ backgroundColor: colors.background }}>
            <div className="max-w-7xl mx-auto w-full grid md:grid-cols-5 items-center gap-0">
              <div className="md:col-span-3 aspect-[4/5] md:aspect-auto md:h-[70vh] rounded-2xl overflow-hidden">
                <img src={image} alt={b.name} className="w-full h-full object-cover" />
              </div>
              <div className="md:col-span-2 md:-ml-16 relative z-10 p-8 md:p-12 rounded-2xl shadow-xl mt-[-3rem] md:mt-0" style={{ backgroundColor: colors.background }}>
                <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: colors.primary }}>{b.tagline}</p>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight mb-6" style={{ fontFamily: fonts.heading, color: colors.foreground }}>{hero.headline}</h1>
                <p className="text-base leading-relaxed mb-8" style={{ color: colors.muted }}>{hero.subheadline}</p>
                <Link to={`${base}/contact`} className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium border transition-colors" style={{ borderColor: colors.primary, color: colors.primary }}>
                  {hero.cta} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* Alternating service previews */}
          <section className="py-20 px-6" style={{ backgroundColor: colors.accent }}>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-light text-center mb-16" style={{ fontFamily: fonts.heading }}>Our Services</h2>
              {services.slice(0, 3).map((s, i) => (
                <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 mb-12 last:mb-0 items-center`}>
                  <div className="w-20 h-20 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${colors.primary}15` }}>
                    <span className="text-2xl font-light" style={{ fontFamily: fonts.heading, color: colors.primary }}>{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl font-medium mb-2" style={{ fontFamily: fonts.heading }}>{s.name}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: colors.muted }}>{s.description}</p>
                    {s.price && <p className="text-sm font-medium mt-2" style={{ color: colors.primary }}>{s.price}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Soft testimonial */}
          <section className="py-24 px-6" style={{ backgroundColor: colors.background }}>
            <div className="max-w-2xl mx-auto text-center">
              <div className="flex justify-center gap-1 mb-6">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" style={{ color: colors.secondary }} />)}</div>
              <p className="text-lg md:text-xl leading-relaxed italic mb-6" style={{ fontFamily: fonts.heading }}>"{testimonials[0].text}"</p>
              <p className="text-sm font-medium">{testimonials[0].name}</p>
              <p className="text-xs" style={{ color: colors.muted }}>{testimonials[0].role}</p>
            </div>
          </section>
        </>
      )}

      {page === 'about' && (
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-light mb-12" style={{ fontFamily: fonts.heading }}>About {b.name}</h1>
            <div className="aspect-[2/1] rounded-2xl overflow-hidden mb-12"><img src={image} alt="About" className="w-full h-full object-cover" /></div>
            <div className="text-left space-y-6">
              {about.story.map((p, i) => <p key={i} className="text-base leading-[1.9]">{p}</p>)}
            </div>
            <div className="my-16 py-10 border-t border-b" style={{ borderColor: `${colors.muted}20` }}>
              <p className="text-xl font-light italic leading-relaxed" style={{ fontFamily: fonts.heading, color: colors.primary }}>"{about.mission}"</p>
            </div>
            <h2 className="text-2xl font-light mb-8" style={{ fontFamily: fonts.heading }}>Our Stylists</h2>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              {about.team.map((m, i) => (
                <div key={i} className="p-6 rounded-2xl" style={{ backgroundColor: colors.accent }}>
                  <h3 className="font-medium text-lg" style={{ fontFamily: fonts.heading }}>{m.name}</h3>
                  <p className="text-xs mb-2" style={{ color: colors.primary }}>{m.role}</p>
                  <p className="text-sm" style={{ color: colors.muted }}>{m.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {page === 'services' && (
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-light text-center mb-16" style={{ fontFamily: fonts.heading }}>Services & Pricing</h1>
            <div className="space-y-0">
              {services.map((s, i) => (
                <div key={i} className="py-8 border-b flex flex-col md:flex-row md:items-start justify-between gap-4" style={{ borderColor: `${colors.muted}15` }}>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium mb-1" style={{ fontFamily: fonts.heading }}>{s.name}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: colors.muted }}>{s.description}</p>
                  </div>
                  {s.price && <span className="text-base font-medium whitespace-nowrap" style={{ color: colors.primary }}>{s.price}</span>}
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link to={`${base}/contact`} className="inline-flex items-center gap-2 px-6 py-3 rounded-full border text-sm" style={{ borderColor: colors.primary, color: colors.primary }}>{hero.cta} <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </div>
        </section>
      )}

      {page === 'contact' && (
        <section className="py-20 px-6" style={{ backgroundColor: colors.accent }}>
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-light text-center mb-12" style={{ fontFamily: fonts.heading }}>Book Your Visit</h1>
            <div className="p-8 md:p-12 rounded-2xl shadow-lg" style={{ backgroundColor: colors.background }}>
              {sent ? <div className="text-center py-8"><p className="text-xl font-light" style={{ fontFamily: fonts.heading, color: colors.primary }}>Thank you! We'll confirm your appointment shortly.</p></div> : (
                <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-4">
                  <input required placeholder="Your name" className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={{ borderColor: `${colors.muted}25`, backgroundColor: colors.accent }} />
                  <input required type="email" placeholder="Email address" className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={{ borderColor: `${colors.muted}25`, backgroundColor: colors.accent }} />
                  <input type="tel" placeholder="Phone number" className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={{ borderColor: `${colors.muted}25`, backgroundColor: colors.accent }} />
                  <textarea required rows={4} placeholder="What service are you interested in?" className="w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none" style={{ borderColor: `${colors.muted}25`, backgroundColor: colors.accent }} />
                  <button type="submit" className="w-full py-3.5 rounded-xl text-sm font-medium" style={{ backgroundColor: colors.primary, color: colors.primaryForeground }}>Request Appointment</button>
                </form>
              )}
            </div>
            <div className="mt-10 text-center text-sm space-y-2" style={{ color: colors.muted }}>
              <p>{contact.address}, {contact.city}</p>
              <p>{contact.phone} · {contact.email}</p>
              {contact.hours.map((h, i) => <p key={i}>{h}</p>)}
            </div>
          </div>
        </section>
      )}

      <BrandSiteFooter name={b.name} backgroundColor={colors.primary} />
    </div>
  );
}
