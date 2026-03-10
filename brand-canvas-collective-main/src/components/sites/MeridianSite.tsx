import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Business } from '@/data/businesses';
import { ArrowLeft, ArrowRight, MapPin, Phone, Mail, Clock, Menu, X, Star } from 'lucide-react';

interface Props { business: Business; page: string; }

export default function MeridianSite({ business: b, page }: Props) {
  const [sent, setSent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { colors, fonts, hero, about, services, testimonials, contact, image } = b;
  const slug = b.slug;
  const links = [
    { path: `/${slug}`, label: 'Home', pg: 'home' },
    { path: `/${slug}/about`, label: 'About', pg: 'about' },
    { path: `/${slug}/services`, label: 'Services', pg: 'services' },
    { path: `/${slug}/contact`, label: 'Contact', pg: 'contact' },
  ];

  return (
    <div style={{ fontFamily: fonts.body, backgroundColor: colors.background, color: colors.foreground }}>
      {/* Nav — white, CTA button */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-xs opacity-40 hover:opacity-100"><ArrowLeft className="w-3.5 h-3.5" /></Link>
            <Link to={`/${slug}`} className="text-lg font-bold" style={{ fontFamily: fonts.heading, color: colors.primary }}>{b.name}</Link>
          </div>
          <div className="hidden md:flex items-center gap-6">
            {links.slice(0, 3).map(l => (
              <Link key={l.pg} to={l.path} className="text-sm" style={{ color: colors.foreground, opacity: page === l.pg ? 1 : 0.5 }}>{l.label}</Link>
            ))}
            <Link to={`/${slug}/contact`} className="px-5 py-2 rounded-lg text-sm font-medium" style={{ backgroundColor: colors.primary, color: colors.primaryForeground }}>Contact Us</Link>
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
        </div>
        {menuOpen && <div className="md:hidden pt-3 space-y-2">{links.map(l => <Link key={l.pg} to={l.path} onClick={() => setMenuOpen(false)} className="block py-2 text-sm">{l.label}</Link>)}</div>}
      </nav>

      {page === 'home' && (
        <>
          {/* Hero image with overlapping stat card */}
          <section className="relative">
            <div className="h-[65vh]"><img src={image} alt={b.name} className="w-full h-full object-cover" /></div>
            <div className="max-w-6xl mx-auto px-6 -mt-28 relative z-10">
              <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 grid md:grid-cols-3 gap-8 items-start">
                <div className="md:col-span-2">
                  <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: colors.primary }}>{b.tagline}</p>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: fonts.heading }}>{hero.headline}</h1>
                  <p className="text-base leading-relaxed" style={{ color: colors.muted }}>{hero.subheadline}</p>
                  <Link to={`/${slug}/services`} className="inline-flex items-center gap-2 mt-6 text-sm font-medium hover:gap-3 transition-all" style={{ color: colors.primary }}>{hero.cta} <ArrowRight className="w-4 h-4" /></Link>
                </div>
                <div className="space-y-4 md:border-l md:pl-8" style={{ borderColor: `${colors.muted}20` }}>
                  <div><p className="text-3xl font-bold" style={{ color: colors.primary, fontFamily: fonts.heading }}>$2.3B+</p><p className="text-xs" style={{ color: colors.muted }}>In transactions</p></div>
                  <div><p className="text-3xl font-bold" style={{ color: colors.primary, fontFamily: fonts.heading }}>15+</p><p className="text-xs" style={{ color: colors.muted }}>Years in South Florida</p></div>
                  <div><p className="text-3xl font-bold" style={{ color: colors.primary, fontFamily: fonts.heading }}>850+</p><p className="text-xs" style={{ color: colors.muted }}>Homes sold</p></div>
                </div>
              </div>
            </div>
          </section>

          {/* Services as property-style cards */}
          <section className="py-24 px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-10" style={{ fontFamily: fonts.heading }}>What We Do</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {services.slice(0, 3).map((s, i) => (
                  <div key={i} className="group p-6 rounded-xl border hover:shadow-lg transition-all" style={{ borderColor: `${colors.muted}20` }}>
                    <div className="w-full h-1 rounded-full mb-6 transition-all group-hover:h-1.5" style={{ backgroundColor: colors.primary }} />
                    <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: fonts.heading }}>{s.name}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: colors.muted }}>{s.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-20 px-6" style={{ backgroundColor: colors.accent }}>
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <div key={i} className="p-6 rounded-xl bg-white">
                  <div className="flex gap-0.5 mb-3">{[...Array(5)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-current" style={{ color: colors.secondary }} />)}</div>
                  <p className="text-sm leading-relaxed mb-4">"{t.text}"</p>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs" style={{ color: colors.muted }}>{t.role}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {page === 'about' && (
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-5 gap-12 items-start">
              <div className="md:col-span-3">
                <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: colors.primary }}>About</p>
                <h1 className="text-4xl font-bold mb-8" style={{ fontFamily: fonts.heading }}>Our Story</h1>
                {about.story.map((p, i) => <p key={i} className="text-base leading-[1.9] mb-6">{p}</p>)}
              </div>
              <div className="md:col-span-2 sticky top-20 space-y-6">
                <div className="aspect-[3/4] rounded-xl overflow-hidden"><img src={image} alt="About" className="w-full h-full object-cover" /></div>
                <div className="p-6 rounded-xl" style={{ backgroundColor: colors.accent }}>
                  <p className="text-sm italic leading-relaxed" style={{ color: colors.primary }}>"{about.mission}"</p>
                </div>
              </div>
            </div>
            <div className="mt-16 pt-16 border-t" style={{ borderColor: `${colors.muted}20` }}>
              <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: fonts.heading }}>Leadership</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {about.team.map((m, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-14 h-14 rounded-lg flex-shrink-0 flex items-center justify-center font-bold" style={{ backgroundColor: colors.primary, color: colors.primaryForeground }}>{m.name.split(' ').map(n => n[0]).join('')}</div>
                    <div><h3 className="font-semibold">{m.name}</h3><p className="text-xs mb-1" style={{ color: colors.primary }}>{m.role}</p><p className="text-sm" style={{ color: colors.muted }}>{m.bio}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {page === 'services' && (
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: fonts.heading }}>Our Services</h1>
            <p className="mb-12" style={{ color: colors.muted }}>Full-service real estate for every stage of your journey.</p>
            <div className="grid md:grid-cols-2 gap-6">
              {services.map((s, i) => (
                <div key={i} className="p-8 rounded-xl border-l-4 hover:shadow-md transition-shadow" style={{ borderColor: colors.primary, backgroundColor: colors.accent }}>
                  <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: fonts.heading }}>{s.name}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: colors.muted }}>{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {page === 'contact' && (
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: fonts.heading }}>Let's Talk</h1>
            <p className="mb-12" style={{ color: colors.muted }}>Ready to make your move? We're here to help.</p>
            <div className="grid md:grid-cols-2 gap-12">
              {sent ? <div className="p-10 rounded-xl text-center" style={{ backgroundColor: colors.accent }}><p className="text-xl font-bold" style={{ color: colors.primary }}>Message sent!</p></div> : (
                <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-4">
                  <input required placeholder="Name" className="w-full px-4 py-3 rounded-lg border text-sm outline-none" style={{ borderColor: `${colors.muted}30` }} />
                  <input required type="email" placeholder="Email" className="w-full px-4 py-3 rounded-lg border text-sm outline-none" style={{ borderColor: `${colors.muted}30` }} />
                  <input type="tel" placeholder="Phone" className="w-full px-4 py-3 rounded-lg border text-sm outline-none" style={{ borderColor: `${colors.muted}30` }} />
                  <textarea required rows={5} placeholder="Tell us what you're looking for" className="w-full px-4 py-3 rounded-lg border text-sm outline-none resize-none" style={{ borderColor: `${colors.muted}30` }} />
                  <button type="submit" className="px-8 py-3 rounded-lg text-sm font-medium" style={{ backgroundColor: colors.primary, color: colors.primaryForeground }}>Send Message</button>
                </form>
              )}
              <div className="space-y-6 text-sm">
                <div><MapPin className="w-4 h-4 mb-1" style={{ color: colors.primary }} /><p className="font-medium">{contact.address}</p><p style={{ color: colors.muted }}>{contact.city}, {contact.country}</p></div>
                <div><Phone className="w-4 h-4 mb-1" style={{ color: colors.primary }} /><p>{contact.phone}</p></div>
                <div><Mail className="w-4 h-4 mb-1" style={{ color: colors.primary }} /><p>{contact.email}</p></div>
                <div><Clock className="w-4 h-4 mb-1" style={{ color: colors.primary }} />{contact.hours.map((h, i) => <p key={i} style={{ color: colors.muted }}>{h}</p>)}</div>
              </div>
            </div>
          </div>
        </section>
      )}

      <footer className="py-8 px-6" style={{ backgroundColor: colors.primary, color: colors.primaryForeground }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm opacity-70">{b.name} © 2026 Enterprise</p>
          <div className="flex gap-6">{links.map(l => <Link key={l.pg} to={l.path} className="text-sm opacity-50 hover:opacity-100">{l.label}</Link>)}</div>
        </div>
      </footer>
    </div>
  );
}
