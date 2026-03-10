import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Business } from '@/data/businesses';
import { ArrowLeft, ArrowRight, MapPin, Phone, Mail, Clock, Menu, X } from 'lucide-react';

interface Props { business: Business; page: string; }

export default function ForgeSite({ business: b, page }: Props) {
  const [sent, setSent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { colors, fonts, hero, about, services, testimonials, contact, image } = b;
  const slug = b.slug;
  const links = [
    { path: `/${slug}`, label: 'HOME', pg: 'home' },
    { path: `/${slug}/about`, label: 'ABOUT', pg: 'about' },
    { path: `/${slug}/services`, label: 'PROGRAMS', pg: 'services' },
    { path: `/${slug}/contact`, label: 'JOIN', pg: 'contact' },
  ];

  return (
    <div style={{ fontFamily: fonts.body, color: '#FFFFFF' }}>
      {/* Nav — black, uppercase, orange dots */}
      <nav className="sticky top-0 z-50 px-6 py-4" style={{ backgroundColor: '#0A0A0A' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-xs opacity-30 hover:opacity-100 text-white"><ArrowLeft className="w-3.5 h-3.5" /></Link>
            <Link to={`/${slug}`} className="text-xl font-black uppercase tracking-wider" style={{ fontFamily: fonts.heading, color: colors.primary }}>{b.name}</Link>
          </div>
          <div className="hidden md:flex items-center gap-1">
            {links.map((l, i) => (
              <span key={l.pg} className="flex items-center">
                <Link to={l.path} className="text-xs font-bold tracking-widest transition-colors px-3" style={{ color: page === l.pg ? colors.primary : '#FFFFFF80' }}>{l.label}</Link>
                {i < links.length - 1 && <span className="w-1 h-1 rounded-full" style={{ backgroundColor: colors.primary }} />}
              </span>
            ))}
          </div>
          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
        </div>
        {menuOpen && <div className="md:hidden pt-4 space-y-2">{links.map(l => <Link key={l.pg} to={l.path} onClick={() => setMenuOpen(false)} className="block py-2 text-xs font-bold tracking-widest" style={{ color: page === l.pg ? colors.primary : '#FFFFFF60' }}>{l.label}</Link>)}</div>}
      </nav>

      {page === 'home' && (
        <>
          {/* Massive text hero on black */}
          <section className="min-h-screen flex items-end pb-16 md:pb-24 px-6 relative" style={{ backgroundColor: '#0A0A0A' }}>
            <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
              <img src={image} alt={b.name} className="w-full h-full object-cover opacity-40" style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)' }} />
            </div>
            <div className="relative z-10 max-w-4xl">
              <div className="w-20 h-1 mb-8" style={{ backgroundColor: colors.primary }} />
              <h1 className="text-5xl md:text-7xl lg:text-9xl font-black uppercase leading-[0.9] mb-8" style={{ fontFamily: fonts.heading }}>{hero.headline}</h1>
              <p className="text-lg md:text-xl opacity-50 max-w-md mb-10">{hero.subheadline}</p>
              <Link to={`/${slug}/contact`} className="inline-flex items-center gap-3 px-8 py-4 text-sm font-bold uppercase tracking-widest" style={{ backgroundColor: colors.primary, color: '#FFFFFF' }}>
                {hero.cta} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

          {/* Stats bar */}
          <section className="px-6 py-12" style={{ backgroundColor: colors.primary }}>
            <div className="max-w-6xl mx-auto grid grid-cols-3 gap-8 text-center">
              <div><p className="text-4xl md:text-5xl font-black" style={{ fontFamily: fonts.heading }}>400+</p><p className="text-xs uppercase tracking-widest opacity-70 mt-1">Members</p></div>
              <div><p className="text-4xl md:text-5xl font-black" style={{ fontFamily: fonts.heading }}>6</p><p className="text-xs uppercase tracking-widest opacity-70 mt-1">Coaches</p></div>
              <div><p className="text-4xl md:text-5xl font-black" style={{ fontFamily: fonts.heading }}>5+</p><p className="text-xs uppercase tracking-widest opacity-70 mt-1">Years</p></div>
            </div>
          </section>

          {/* Services as alternating strips */}
          <section style={{ backgroundColor: '#0A0A0A' }}>
            {services.slice(0, 3).map((s, i) => (
              <div key={i} className="px-6 py-12 border-b" style={{ borderColor: '#FFFFFF10', backgroundColor: i % 2 === 0 ? '#0A0A0A' : '#111111' }}>
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center gap-4 md:gap-12">
                  <span className="text-5xl font-black opacity-20" style={{ fontFamily: fonts.heading, color: colors.primary }}>{String(i + 1).padStart(2, '0')}</span>
                  <div className="flex-1"><h3 className="text-xl font-bold uppercase tracking-wider mb-1">{s.name}</h3><p className="text-sm opacity-50">{s.description}</p></div>
                  {s.price && <span className="text-lg font-bold" style={{ color: colors.primary }}>{s.price}</span>}
                </div>
              </div>
            ))}
          </section>

          {/* Testimonial */}
          <section className="py-20 px-6" style={{ backgroundColor: '#111111' }}>
            <div className="max-w-3xl mx-auto">
              <div className="w-12 h-1 mb-6" style={{ backgroundColor: colors.primary }} />
              <p className="text-xl leading-relaxed mb-6 opacity-80">"{testimonials[0].text}"</p>
              <p className="font-bold uppercase tracking-wider text-sm">{testimonials[0].name}</p>
              <p className="text-xs opacity-40">{testimonials[0].role}</p>
            </div>
          </section>
        </>
      )}

      {page === 'about' && (
        <div style={{ backgroundColor: '#0A0A0A' }}>
          <section className="py-20 px-6">
            <div className="max-w-4xl mx-auto">
              <div className="w-16 h-1 mb-6" style={{ backgroundColor: colors.primary }} />
              <h1 className="text-4xl md:text-6xl font-black uppercase mb-10" style={{ fontFamily: fonts.heading }}>About Forge</h1>
              {about.story.map((p, i) => <p key={i} className="text-base leading-[1.9] mb-6 opacity-70">{p}</p>)}
              <div className="my-16 py-10 border-t border-b" style={{ borderColor: '#FFFFFF10' }}>
                <p className="text-xl font-bold uppercase tracking-wider" style={{ color: colors.primary }}>"{about.mission}"</p>
              </div>
              <h2 className="text-2xl font-black uppercase tracking-wider mb-8">Coaches</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {about.team.map((m, i) => (
                  <div key={i} className="p-6 border" style={{ borderColor: '#FFFFFF10' }}>
                    <h3 className="font-bold uppercase tracking-wider">{m.name}</h3>
                    <p className="text-xs mt-1" style={{ color: colors.primary }}>{m.role}</p>
                    <p className="text-sm mt-3 opacity-50">{m.bio}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {page === 'services' && (
        <div style={{ backgroundColor: '#0A0A0A' }}>
          <section className="py-20 px-6">
            <div className="max-w-4xl mx-auto">
              <div className="w-16 h-1 mb-6" style={{ backgroundColor: colors.primary }} />
              <h1 className="text-4xl md:text-6xl font-black uppercase mb-12" style={{ fontFamily: fonts.heading }}>Programs</h1>
              {services.map((s, i) => (
                <div key={i} className="py-8 border-b flex flex-col md:flex-row md:items-start gap-4 md:gap-8" style={{ borderColor: '#FFFFFF10' }}>
                  <span className="text-4xl font-black" style={{ color: colors.primary, fontFamily: fonts.heading }}>{String(i + 1).padStart(2, '0')}</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold uppercase tracking-wider mb-2">{s.name}</h3>
                    <p className="text-sm opacity-50">{s.description}</p>
                  </div>
                  {s.price && <span className="text-lg font-bold whitespace-nowrap" style={{ color: colors.primary }}>{s.price}</span>}
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {page === 'contact' && (
        <div style={{ backgroundColor: '#0A0A0A' }}>
          <section className="py-20 px-6">
            <div className="max-w-3xl mx-auto">
              <div className="w-16 h-1 mb-6" style={{ backgroundColor: colors.primary }} />
              <h1 className="text-4xl font-black uppercase mb-10" style={{ fontFamily: fonts.heading }}>Join Forge</h1>
              {sent ? <div className="p-8 border text-center" style={{ borderColor: colors.primary }}><p className="font-bold uppercase tracking-wider">Message sent. We'll be in touch.</p></div> : (
                <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-4">
                  <input required placeholder="NAME" className="w-full px-4 py-4 bg-transparent border text-sm text-white outline-none uppercase tracking-wider placeholder:opacity-30" style={{ borderColor: '#FFFFFF20' }} />
                  <input required type="email" placeholder="EMAIL" className="w-full px-4 py-4 bg-transparent border text-sm text-white outline-none uppercase tracking-wider placeholder:opacity-30" style={{ borderColor: '#FFFFFF20' }} />
                  <input type="tel" placeholder="PHONE" className="w-full px-4 py-4 bg-transparent border text-sm text-white outline-none uppercase tracking-wider placeholder:opacity-30" style={{ borderColor: '#FFFFFF20' }} />
                  <textarea required rows={4} placeholder="WHAT ARE YOUR GOALS?" className="w-full px-4 py-4 bg-transparent border text-sm text-white outline-none uppercase tracking-wider placeholder:opacity-30 resize-none" style={{ borderColor: '#FFFFFF20' }} />
                  <button type="submit" className="w-full py-4 font-bold uppercase tracking-widest text-sm" style={{ backgroundColor: colors.primary }}>Send</button>
                </form>
              )}
              <div className="mt-12 grid md:grid-cols-3 gap-6 text-sm opacity-50">
                <div><p className="font-bold uppercase text-xs tracking-wider mb-2" style={{ color: colors.primary, opacity: 1 }}>Location</p><p>{contact.address}</p><p>{contact.city}</p></div>
                <div><p className="font-bold uppercase text-xs tracking-wider mb-2" style={{ color: colors.primary, opacity: 1 }}>Contact</p><p>{contact.phone}</p><p>{contact.email}</p></div>
                <div><p className="font-bold uppercase text-xs tracking-wider mb-2" style={{ color: colors.primary, opacity: 1 }}>Hours</p>{contact.hours.map((h, i) => <p key={i}>{h}</p>)}</div>
              </div>
            </div>
          </section>
        </div>
      )}

      <footer className="py-8 px-6 border-t" style={{ backgroundColor: '#0A0A0A', borderColor: '#FFFFFF10' }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs opacity-40 uppercase tracking-wider">{b.name} © 2026 Enterprise</p>
          <div className="flex gap-6">{links.map(l => <Link key={l.pg} to={l.path} className="text-xs opacity-30 hover:opacity-100 uppercase tracking-wider">{l.label}</Link>)}</div>
        </div>
      </footer>
    </div>
  );
}
