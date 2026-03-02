import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Business } from '@/data/businesses';
import { BrandSiteFooter } from '@/components/BrandSiteFooter';
import { ArrowLeft, MapPin, Phone, Mail, Clock, Menu, X } from 'lucide-react';

interface Props { business: Business; page: string; }

export default function LumenSite({ business: b, page }: Props) {
  const [sent, setSent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { colors, fonts, hero, about, services, testimonials, contact, image } = b;
  const slug = b.slug;
  const base = `/gallery/${slug}`;
  const links = [
    { path: `${base}`, label: 'Home', pg: 'home' },
    { path: `${base}/about`, label: 'About', pg: 'about' },
    { path: `${base}/services`, label: 'Work', pg: 'services' },
    { path: `${base}/contact`, label: 'Inquire', pg: 'contact' },
  ];

  return (
    <div style={{ fontFamily: fonts.body, backgroundColor: colors.background, color: colors.foreground }}>
      {/* Nav — ultra minimal, transparent */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-5 mix-blend-difference">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/gallery" className="text-xs text-white opacity-40 hover:opacity-100"><ArrowLeft className="w-3 h-3" /></Link>
            <Link to={base} className="text-sm font-medium tracking-[0.2em] uppercase text-white">{b.name}</Link>
          </div>
          <div className="hidden md:flex gap-8">
            {links.map(l => (
              <Link key={l.pg} to={l.path} className="text-xs tracking-[0.15em] uppercase text-white transition-opacity" style={{ opacity: page === l.pg ? 1 : 0.4 }}>{l.label}</Link>
            ))}
          </div>
          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
        </div>
      </nav>
      {menuOpen && <div className="fixed inset-0 z-40 flex items-center justify-center" style={{ backgroundColor: colors.foreground }}>
        <button className="absolute top-5 right-6 text-white" onClick={() => setMenuOpen(false)}><X className="w-6 h-6" /></button>
        <div className="text-center space-y-6">{links.map(l => <Link key={l.pg} to={l.path} onClick={() => setMenuOpen(false)} className="block text-2xl font-light text-white" style={{ opacity: page === l.pg ? 1 : 0.4 }}>{l.label}</Link>)}</div>
      </div>}

      {page === 'home' && (
        <>
          {/* Full-bleed image hero — NO text overlay */}
          <section className="h-screen relative">
            <img src={image} alt={b.name} className="absolute inset-0 w-full h-full object-cover" />
          </section>

          {/* Minimal text section below the fold */}
          <section className="py-32 px-6 text-center">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6" style={{ fontFamily: fonts.heading }}>{hero.headline}</h1>
              <p className="text-base leading-relaxed" style={{ color: colors.muted }}>{hero.subheadline}</p>
            </div>
          </section>

          {/* Services as simple text list */}
          <section className="py-20 px-6 border-t" style={{ borderColor: `${colors.muted}15` }}>
            <div className="max-w-2xl mx-auto">
              {services.map((s, i) => (
                <div key={i} className="py-6 border-b flex justify-between items-center" style={{ borderColor: `${colors.muted}15` }}>
                  <span className="text-base font-medium">{s.name}</span>
                  <span className="text-xs tracking-widest uppercase" style={{ color: colors.secondary }}>→</span>
                </div>
              ))}
            </div>
          </section>

          {/* Testimonial */}
          <section className="py-24 px-6">
            <div className="max-w-xl mx-auto text-center">
              <p className="text-base leading-relaxed italic mb-6" style={{ color: colors.muted }}>"{testimonials[0].text}"</p>
              <p className="text-sm font-medium">{testimonials[0].name}</p>
              <p className="text-xs" style={{ color: colors.muted }}>{testimonials[0].role}</p>
            </div>
          </section>
        </>
      )}

      {page === 'about' && (
        <div className="pt-24">
          <section className="py-16 px-6">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-12" style={{ fontFamily: fonts.heading }}>About</h1>
              {about.story.map((p, i) => <p key={i} className="text-base leading-[2] mb-6">{p}</p>)}
            </div>
          </section>
          <section className="py-12"><div className="aspect-[3/1] w-full"><img src={image} alt="Studio" className="w-full h-full object-cover" /></div></section>
          <section className="py-16 px-6">
            <div className="max-w-2xl mx-auto">
              <p className="text-base leading-relaxed italic mb-12 border-l-2 pl-6" style={{ borderColor: colors.secondary }}>"{about.mission}"</p>
              <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: fonts.heading }}>Team</h2>
              {about.team.map((m, i) => (
                <div key={i} className="py-4 border-b" style={{ borderColor: `${colors.muted}15` }}>
                  <p className="font-medium">{m.name} — <span style={{ color: colors.muted }}>{m.role}</span></p>
                  <p className="text-sm mt-1" style={{ color: colors.muted }}>{m.bio}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {page === 'services' && (
        <div className="pt-24">
          <section className="py-16 px-6">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-4xl font-bold mb-16" style={{ fontFamily: fonts.heading }}>Work</h1>
              {services.map((s, i) => (
                <div key={i} className="py-10 border-b" style={{ borderColor: `${colors.muted}15` }}>
                  <h3 className="text-2xl font-medium mb-3" style={{ fontFamily: fonts.heading }}>{s.name}</h3>
                  <p className="text-sm leading-[1.8]" style={{ color: colors.muted }}>{s.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {page === 'contact' && (
        <div className="pt-24">
          <section className="py-16 px-6">
            <div className="max-w-lg mx-auto">
              <h1 className="text-4xl font-bold mb-12" style={{ fontFamily: fonts.heading }}>Inquire</h1>
              {sent ? <p className="text-center py-8" style={{ color: colors.muted }}>Thank you. We'll follow up shortly.</p> : (
                <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-6">
                  <div><label className="block text-xs uppercase tracking-widest mb-2" style={{ color: colors.muted }}>Name</label><input required className="w-full border-b bg-transparent py-2 text-sm outline-none" style={{ borderColor: `${colors.muted}30` }} /></div>
                  <div><label className="block text-xs uppercase tracking-widest mb-2" style={{ color: colors.muted }}>Email</label><input required type="email" className="w-full border-b bg-transparent py-2 text-sm outline-none" style={{ borderColor: `${colors.muted}30` }} /></div>
                  <div><label className="block text-xs uppercase tracking-widest mb-2" style={{ color: colors.muted }}>Phone</label><input type="tel" className="w-full border-b bg-transparent py-2 text-sm outline-none" style={{ borderColor: `${colors.muted}30` }} /></div>
                  <div><label className="block text-xs uppercase tracking-widest mb-2" style={{ color: colors.muted }}>Project Details</label><textarea required rows={4} className="w-full border-b bg-transparent py-2 text-sm outline-none resize-none" style={{ borderColor: `${colors.muted}30` }} /></div>
                  <button type="submit" className="px-6 py-3 text-sm font-medium" style={{ backgroundColor: colors.foreground, color: colors.background }}>Send</button>
                </form>
              )}
              <div className="mt-16 space-y-3 text-sm" style={{ color: colors.muted }}>
                <p>{contact.address}, {contact.city}</p>
                <p>{contact.phone}</p>
                <p>{contact.email}</p>
                {contact.hours.map((h, i) => <p key={i}>{h}</p>)}
              </div>
            </div>
          </section>
        </div>
      )}

      <BrandSiteFooter name={b.name} backgroundColor={colors.background} />
    </div>
  );
}
