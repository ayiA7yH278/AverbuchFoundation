import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Business } from '@/data/businesses';
import { ArrowLeft, MapPin, Phone, Mail, Clock, Menu, X } from 'lucide-react';

interface Props { business: Business; page: string; }

export default function WhitestoneSite({ business: b, page }: Props) {
  const [sent, setSent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { colors, fonts, hero, about, services, testimonials, contact, image } = b;
  const slug = b.slug;
  const links = [
    { path: `/${slug}`, label: 'Home', pg: 'home' },
    { path: `/${slug}/about`, label: 'Studio', pg: 'about' },
    { path: `/${slug}/services`, label: 'Services', pg: 'services' },
    { path: `/${slug}/contact`, label: 'Contact', pg: 'contact' },
  ];

  return (
    <div style={{ fontFamily: fonts.body, backgroundColor: colors.background, color: colors.foreground }}>
      {/* Nav — bordered, architectural, grid lines */}
      <nav className="sticky top-0 z-50 px-6 py-4 border-b-2" style={{ backgroundColor: colors.background, borderColor: colors.foreground }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-xs opacity-30 hover:opacity-100"><ArrowLeft className="w-3.5 h-3.5" /></Link>
            <Link to={`/${slug}`} className="text-lg font-black uppercase tracking-[0.15em]" style={{ fontFamily: fonts.heading }}>{b.name}</Link>
          </div>
          <div className="hidden md:flex items-center gap-0">
            {links.map((l, i) => (
              <Link key={l.pg} to={l.path} className={`text-xs uppercase tracking-[0.15em] px-5 py-2 font-medium border-l ${i === links.length - 1 ? 'border-r' : ''}`} style={{ borderColor: page === l.pg ? colors.foreground : `${colors.muted}30`, color: colors.foreground, opacity: page === l.pg ? 1 : 0.4, backgroundColor: page === l.pg ? `${colors.muted}10` : 'transparent' }}>{l.label}</Link>
            ))}
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
        </div>
        {menuOpen && <div className="md:hidden pt-4 space-y-2">{links.map(l => <Link key={l.pg} to={l.path} onClick={() => setMenuOpen(false)} className="block py-2 text-xs uppercase tracking-widest" style={{ opacity: page === l.pg ? 1 : 0.4 }}>{l.label}</Link>)}</div>}
      </nav>

      {page === 'home' && (
        <>
          {/* Strict 50/50 split hero */}
          <section className="min-h-[80vh] grid md:grid-cols-2">
            <div className="flex items-center p-10 md:p-16 lg:p-24 border-r-2" style={{ borderColor: colors.foreground }}>
              <div>
                <span className="font-mono text-xs block mb-4" style={{ color: colors.muted }}>001 — Architecture</span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase leading-[1.05] mb-6" style={{ fontFamily: fonts.heading }}>{hero.headline}</h1>
                <p className="text-base leading-relaxed mb-8" style={{ color: colors.muted }}>{hero.subheadline}</p>
                <Link to={`/${slug}/services`} className="inline-block px-6 py-3 text-xs uppercase tracking-widest font-bold border-2 hover:bg-black hover:text-white transition-colors" style={{ borderColor: colors.foreground }}>{hero.cta}</Link>
              </div>
            </div>
            <div className="min-h-[50vh]"><img src={image} alt={b.name} className="w-full h-full object-cover" /></div>
          </section>

          {/* Services grid with borders */}
          <section className="border-t-2" style={{ borderColor: colors.foreground }}>
            <div className="grid md:grid-cols-3">
              {services.slice(0, 3).map((s, i) => (
                <div key={i} className="p-10 border-b-2 md:border-r-2 last:border-r-0" style={{ borderColor: `${colors.muted}30` }}>
                  <span className="font-mono text-xs block mb-4" style={{ color: colors.muted }}>{String(i + 1).padStart(3, '0')}</span>
                  <h3 className="text-lg font-bold uppercase tracking-wide mb-3" style={{ fontFamily: fonts.heading }}>{s.name}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: colors.muted }}>{s.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Testimonial with architectural framing */}
          <section className="py-20 px-6 border-t-2" style={{ borderColor: colors.foreground }}>
            <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
              <div><span className="font-mono text-xs" style={{ color: colors.muted }}>Testimonial</span></div>
              <div className="md:col-span-2 border-l-2 pl-8" style={{ borderColor: colors.foreground }}>
                <p className="text-lg leading-relaxed mb-4">"{testimonials[0].text}"</p>
                <p className="font-bold text-sm">{testimonials[0].name}</p>
                <p className="text-xs" style={{ color: colors.muted }}>{testimonials[0].role}</p>
              </div>
            </div>
          </section>
        </>
      )}

      {page === 'about' && (
        <>
          <section className="py-20 px-6 border-b-2" style={{ borderColor: colors.foreground }}>
            <div className="max-w-4xl mx-auto">
              <span className="font-mono text-xs block mb-4" style={{ color: colors.muted }}>About the Studio</span>
              <h1 className="text-4xl md:text-5xl font-black uppercase" style={{ fontFamily: fonts.heading }}>Our Practice</h1>
            </div>
          </section>
          <section className="py-16 px-6">
            <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-12">
              <div className="md:col-span-2 space-y-6">
                {about.story.map((p, i) => <p key={i} className="text-base leading-[1.9]">{p}</p>)}
              </div>
              <div className="space-y-6 border-l-2 pl-6" style={{ borderColor: `${colors.muted}30` }}>
                <div><span className="font-mono text-xs block" style={{ color: colors.muted }}>Est.</span><p className="text-3xl font-black mt-1" style={{ fontFamily: fonts.heading }}>{about.founded}</p></div>
                <div className="pt-6 border-t" style={{ borderColor: `${colors.muted}20` }}><span className="font-mono text-xs block mb-2" style={{ color: colors.muted }}>Mission</span><p className="text-sm italic leading-relaxed">{about.mission}</p></div>
              </div>
            </div>
          </section>
          <section className="py-16 px-6 border-t-2" style={{ borderColor: `${colors.muted}30` }}>
            <div className="max-w-4xl mx-auto">
              <span className="font-mono text-xs block mb-6" style={{ color: colors.muted }}>Principals</span>
              <div className="grid md:grid-cols-2 gap-0">
                {about.team.map((m, i) => (
                  <div key={i} className="p-8 border" style={{ borderColor: `${colors.muted}20` }}>
                    <h3 className="font-bold uppercase tracking-wider">{m.name}</h3>
                    <p className="text-xs mt-1 mb-3" style={{ color: colors.muted }}>{m.role}</p>
                    <p className="text-sm leading-relaxed" style={{ color: colors.muted }}>{m.bio}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {page === 'services' && (
        <>
          <section className="py-20 px-6 border-b-2" style={{ borderColor: colors.foreground }}>
            <div className="max-w-4xl mx-auto">
              <span className="font-mono text-xs block mb-4" style={{ color: colors.muted }}>Services</span>
              <h1 className="text-4xl font-black uppercase" style={{ fontFamily: fonts.heading }}>What We Do</h1>
            </div>
          </section>
          <section className="py-0">
            <div className="max-w-4xl mx-auto">
              {services.map((s, i) => (
                <div key={i} className="py-10 px-6 border-b-2 grid md:grid-cols-4 gap-6" style={{ borderColor: `${colors.muted}20` }}>
                  <span className="font-mono text-sm" style={{ color: colors.muted }}>{String(i + 1).padStart(3, '0')}</span>
                  <div className="md:col-span-3">
                    <h3 className="text-xl font-bold uppercase tracking-wider mb-2" style={{ fontFamily: fonts.heading }}>{s.name}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: colors.muted }}>{s.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {page === 'contact' && (
        <>
          <section className="py-20 px-6 border-b-2" style={{ borderColor: colors.foreground }}>
            <div className="max-w-4xl mx-auto">
              <span className="font-mono text-xs block mb-4" style={{ color: colors.muted }}>Contact</span>
              <h1 className="text-4xl font-black uppercase" style={{ fontFamily: fonts.heading }}>Get in Touch</h1>
            </div>
          </section>
          <section className="py-16 px-6">
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-0">
              <div className="p-8 border-2" style={{ borderColor: `${colors.muted}20` }}>
                {sent ? <p className="text-center py-8 font-bold uppercase tracking-wider">Inquiry received. We'll follow up.</p> : (
                  <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-4">
                    <input required placeholder="NAME" className="w-full px-0 py-3 bg-transparent border-b text-sm outline-none uppercase tracking-wider placeholder:opacity-30" style={{ borderColor: `${colors.muted}30` }} />
                    <input required type="email" placeholder="EMAIL" className="w-full px-0 py-3 bg-transparent border-b text-sm outline-none uppercase tracking-wider placeholder:opacity-30" style={{ borderColor: `${colors.muted}30` }} />
                    <input type="tel" placeholder="PHONE" className="w-full px-0 py-3 bg-transparent border-b text-sm outline-none uppercase tracking-wider placeholder:opacity-30" style={{ borderColor: `${colors.muted}30` }} />
                    <textarea required rows={4} placeholder="PROJECT DETAILS" className="w-full px-0 py-3 bg-transparent border-b text-sm outline-none uppercase tracking-wider placeholder:opacity-30 resize-none" style={{ borderColor: `${colors.muted}30` }} />
                    <button type="submit" className="px-6 py-3 text-xs font-bold uppercase tracking-widest border-2 hover:bg-black hover:text-white transition-colors" style={{ borderColor: colors.foreground }}>Submit</button>
                  </form>
                )}
              </div>
              <div className="p-8 border-2 border-l-0 space-y-6" style={{ borderColor: `${colors.muted}20` }}>
                <div><span className="font-mono text-xs block mb-2" style={{ color: colors.muted }}>Address</span><p className="text-sm">{contact.address}<br />{contact.city}<br />{contact.country}</p></div>
                <div><span className="font-mono text-xs block mb-2" style={{ color: colors.muted }}>Contact</span><p className="text-sm">{contact.phone}<br />{contact.email}</p></div>
                <div><span className="font-mono text-xs block mb-2" style={{ color: colors.muted }}>Hours</span>{contact.hours.map((h, i) => <p key={i} className="text-sm">{h}</p>)}</div>
              </div>
            </div>
          </section>
        </>
      )}

      <footer className="py-8 px-6 border-t-2" style={{ borderColor: colors.foreground }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs uppercase tracking-widest">{b.name} © 2026 Enterprise</p>
          <div className="flex gap-6">{links.map(l => <Link key={l.pg} to={l.path} className="text-xs uppercase tracking-widest opacity-40 hover:opacity-100">{l.label}</Link>)}</div>
        </div>
      </footer>
    </div>
  );
}
