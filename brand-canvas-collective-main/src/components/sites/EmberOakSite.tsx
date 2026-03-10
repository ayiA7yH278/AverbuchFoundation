import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Business } from '@/data/businesses';
import { ArrowLeft, ArrowRight, Star, MapPin, Phone, Mail, Clock, Menu, X } from 'lucide-react';

interface Props { business: Business; page: string; }

export default function EmberOakSite({ business: b, page }: Props) {
  const [sent, setSent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { colors, fonts, hero, about, services, testimonials, contact, image } = b;
  const slug = b.slug;
  const links = [
    { path: `/${slug}`, label: 'Home', pg: 'home' },
    { path: `/${slug}/about`, label: 'About', pg: 'about' },
    { path: `/${slug}/services`, label: 'Menu', pg: 'services' },
    { path: `/${slug}/contact`, label: 'Visit', pg: 'contact' },
  ];

  return (
    <div style={{ fontFamily: fonts.body, backgroundColor: colors.background, color: colors.foreground }}>
      {/* Nav — transparent overlay */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-xs opacity-50 hover:opacity-100 transition-opacity flex items-center gap-1" style={{ color: page === 'home' ? colors.primaryForeground : colors.foreground }}>
              <ArrowLeft className="w-3 h-3" /> Gallery
            </Link>
            <Link to={`/${slug}`} className="text-xl font-bold" style={{ fontFamily: fonts.heading, color: page === 'home' ? colors.primaryForeground : colors.primary }}>{b.name}</Link>
          </div>
          <div className="hidden md:flex gap-8">
            {links.map(l => (
              <Link key={l.pg} to={l.path} className="text-sm transition-opacity hover:opacity-100" style={{ color: page === 'home' ? colors.primaryForeground : colors.foreground, opacity: page === l.pg ? 1 : 0.6 }}>{l.label}</Link>
            ))}
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" style={{ color: page === 'home' ? colors.primaryForeground : colors.foreground }} />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden mt-4 p-4 rounded-xl shadow-lg" style={{ backgroundColor: colors.background }}>
            {links.map(l => <Link key={l.pg} to={l.path} onClick={() => setMenuOpen(false)} className="block py-2 text-sm" style={{ color: colors.foreground, opacity: page === l.pg ? 1 : 0.5 }}>{l.label}</Link>)}
          </div>
        )}
      </nav>

      {/* Pages */}
      {page === 'home' && (
        <>
          {/* Full-bleed hero — text at bottom in cream strip */}
          <section className="relative h-screen">
            <img src={image} alt={b.name} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16" style={{ backgroundColor: `${colors.background}F0` }}>
              <div className="max-w-5xl">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4" style={{ fontFamily: fonts.heading, color: colors.foreground }}>{hero.headline}</h1>
                <p className="text-lg md:text-xl max-w-xl" style={{ color: colors.muted }}>{hero.subheadline}</p>
              </div>
            </div>
          </section>

          {/* Horizontal scroll services */}
          <section className="py-20 px-6" style={{ backgroundColor: colors.background }}>
            <div className="max-w-6xl mx-auto">
              <p className="text-xs uppercase tracking-[0.3em] mb-2" style={{ color: colors.primary }}>What We Pour</p>
              <h2 className="text-3xl font-bold mb-10" style={{ fontFamily: fonts.heading }}>Our Offerings</h2>
              <div className="flex gap-6 overflow-x-auto pb-4 -mx-6 px-6 snap-x">
                {services.map((s, i) => (
                  <div key={i} className="min-w-[280px] flex-shrink-0 snap-start p-6 rounded-2xl border" style={{ borderColor: `${colors.muted}20` }}>
                    <span className="text-5xl font-bold opacity-10" style={{ fontFamily: fonts.heading }}>{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="text-lg font-semibold mt-2 mb-2" style={{ fontFamily: fonts.heading }}>{s.name}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: colors.muted }}>{s.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Big testimonial */}
          <section className="py-24 px-6" style={{ backgroundColor: colors.accent }}>
            <div className="max-w-3xl mx-auto text-center">
              <div className="text-6xl mb-6" style={{ fontFamily: fonts.heading, color: colors.secondary }}>"</div>
              <p className="text-xl md:text-2xl leading-relaxed italic mb-8" style={{ fontFamily: fonts.heading }}>{testimonials[0].text}</p>
              <p className="font-semibold">{testimonials[0].name}</p>
              <p className="text-sm" style={{ color: colors.muted }}>{testimonials[0].role}</p>
            </div>
          </section>
        </>
      )}

      {page === 'about' && (
        <div className="pt-24">
          <section className="py-16 px-6">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: colors.primary }}>Our Story</p>
                <h1 className="text-4xl md:text-5xl font-bold mb-8" style={{ fontFamily: fonts.heading }}>How It Started</h1>
                {about.story.map((p, i) => <p key={i} className="text-base leading-[1.9] mb-6" style={{ color: colors.foreground }}>{p}</p>)}
              </div>
              <div className="sticky top-24 aspect-[3/4] rounded-2xl overflow-hidden">
                <img src={image} alt="About" className="w-full h-full object-cover" />
              </div>
            </div>
          </section>
          <section className="py-16 px-6" style={{ backgroundColor: colors.accent }}>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-2xl md:text-3xl leading-relaxed" style={{ fontFamily: fonts.heading }}>"{about.mission}"</p>
            </div>
          </section>
          <section className="py-16 px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-10" style={{ fontFamily: fonts.heading }}>The Team</h2>
              <div className="space-y-8">
                {about.team.map((m, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <div className="w-16 h-16 rounded-full flex-shrink-0 flex items-center justify-center text-lg font-bold" style={{ backgroundColor: colors.primary, color: colors.primaryForeground, fontFamily: fonts.heading }}>{m.name.split(' ').map(n => n[0]).join('')}</div>
                    <div><h3 className="font-semibold text-lg">{m.name}</h3><p className="text-sm mb-1" style={{ color: colors.primary }}>{m.role}</p><p className="text-sm" style={{ color: colors.muted }}>{m.bio}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {page === 'services' && (
        <div className="pt-24">
          <section className="py-16 px-6">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: colors.primary }}>The Menu</p>
              <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: fonts.heading }}>What We Offer</h1>
              <div className="w-16 h-px mx-auto my-8" style={{ backgroundColor: colors.secondary }} />
              <div className="space-y-10 text-left">
                {services.map((s, i) => (
                  <div key={i} className="pb-8 border-b" style={{ borderColor: `${colors.muted}20` }}>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold" style={{ fontFamily: fonts.heading }}>{s.name}</h3>
                      {s.price && <span className="font-semibold" style={{ color: colors.primary }}>{s.price}</span>}
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: colors.muted }}>{s.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {page === 'contact' && (
        <div className="pt-24">
          <section className="py-16 px-6">
            <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-12">
              <div className="md:col-span-3">
                <h1 className="text-4xl font-bold mb-8" style={{ fontFamily: fonts.heading }}>Come Say Hello</h1>
                {sent ? (
                  <div className="p-10 rounded-2xl text-center" style={{ backgroundColor: colors.accent }}>
                    <p className="text-xl font-semibold" style={{ fontFamily: fonts.heading }}>Thanks for reaching out!</p>
                    <p className="mt-2" style={{ color: colors.muted }}>We'll be in touch soon.</p>
                  </div>
                ) : (
                  <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <input required placeholder="Name" className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={{ borderColor: `${colors.muted}30`, backgroundColor: colors.background }} />
                      <input required type="email" placeholder="Email" className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={{ borderColor: `${colors.muted}30`, backgroundColor: colors.background }} />
                    </div>
                    <input type="tel" placeholder="Phone" className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={{ borderColor: `${colors.muted}30`, backgroundColor: colors.background }} />
                    <textarea required rows={5} placeholder="Your message" className="w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none" style={{ borderColor: `${colors.muted}30`, backgroundColor: colors.background }} />
                    <button type="submit" className="px-8 py-3 rounded-xl text-sm font-medium" style={{ backgroundColor: colors.primary, color: colors.primaryForeground }}>Send Message</button>
                  </form>
                )}
              </div>
              <div className="md:col-span-2 space-y-6">
                <div className="p-6 rounded-2xl" style={{ backgroundColor: colors.accent }}>
                  <div className="flex items-start gap-3 mb-4"><MapPin className="w-4 h-4 mt-1" style={{ color: colors.primary }} /><div><p className="text-sm font-medium">{contact.address}</p><p className="text-sm" style={{ color: colors.muted }}>{contact.city}, {contact.country}</p></div></div>
                  <div className="flex items-start gap-3 mb-4"><Phone className="w-4 h-4 mt-1" style={{ color: colors.primary }} /><p className="text-sm">{contact.phone}</p></div>
                  <div className="flex items-start gap-3 mb-4"><Mail className="w-4 h-4 mt-1" style={{ color: colors.primary }} /><p className="text-sm">{contact.email}</p></div>
                  <div className="flex items-start gap-3"><Clock className="w-4 h-4 mt-1" style={{ color: colors.primary }} /><div>{contact.hours.map((h, i) => <p key={i} className="text-sm" style={{ color: colors.muted }}>{h}</p>)}</div></div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Footer */}
      <footer className="py-10 px-6" style={{ backgroundColor: colors.foreground, color: colors.background }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm opacity-70">{b.name} © 2026 Enterprise</p>
          <div className="flex gap-6">{links.map(l => <Link key={l.pg} to={l.path} className="text-sm opacity-50 hover:opacity-100 transition-opacity">{l.label}</Link>)}</div>
        </div>
      </footer>
    </div>
  );
}
