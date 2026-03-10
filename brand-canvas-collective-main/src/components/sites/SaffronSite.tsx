import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Business } from '@/data/businesses';
import { ArrowLeft, MapPin, Phone, Mail, Clock, Menu, X, Star } from 'lucide-react';

interface Props { business: Business; page: string; }

export default function SaffronSite({ business: b, page }: Props) {
  const [sent, setSent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { colors, fonts, hero, about, services, testimonials, contact, image } = b;
  const slug = b.slug;
  const links = [
    { path: `/${slug}`, label: 'Home', pg: 'home' },
    { path: `/${slug}/about`, label: 'Story', pg: 'about' },
    { path: `/${slug}/services`, label: 'Dining', pg: 'services' },
    { path: `/${slug}/contact`, label: 'Reserve', pg: 'contact' },
  ];
  const Ornament = () => <div className="flex items-center justify-center gap-3 my-8"><div className="w-12 h-px" style={{ backgroundColor: colors.secondary }} /><div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: colors.secondary }} /><div className="w-12 h-px" style={{ backgroundColor: colors.secondary }} /></div>;

  return (
    <div style={{ fontFamily: fonts.body, backgroundColor: colors.background, color: colors.foreground }}>
      {/* Nav — transparent, centered serif, over hero */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-xs opacity-40 hover:opacity-100" style={{ color: page === 'home' ? '#FFF8F0' : colors.foreground }}><ArrowLeft className="w-3.5 h-3.5" /></Link>
          <Link to={`/${slug}`} className="text-2xl font-bold tracking-wider" style={{ fontFamily: fonts.heading, color: page === 'home' ? '#FFF8F0' : colors.primary }}>{b.name}</Link>
          <div className="hidden md:flex gap-6">
            {links.map(l => (
              <Link key={l.pg} to={l.path} className="text-xs uppercase tracking-[0.2em]" style={{ color: page === 'home' ? '#FFF8F0' : colors.foreground, opacity: page === l.pg ? 1 : 0.5 }}>{l.label}</Link>
            ))}
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ color: page === 'home' ? '#FFF8F0' : colors.foreground }}>{menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
        </div>
        {menuOpen && <div className="absolute top-full left-0 right-0 p-6 shadow-lg" style={{ backgroundColor: colors.background }}>{links.map(l => <Link key={l.pg} to={l.path} onClick={() => setMenuOpen(false)} className="block py-2 text-sm text-center" style={{ opacity: page === l.pg ? 1 : 0.5 }}>{l.label}</Link>)}</div>}
      </nav>

      {page === 'home' && (
        <>
          {/* Moody full-screen hero with decorative frame */}
          <section className="relative h-screen flex items-center justify-center">
            <img src={image} alt={b.name} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/55" />
            {/* Decorative inset border frame */}
            <div className="absolute inset-6 md:inset-12 lg:inset-16 border pointer-events-none" style={{ borderColor: `${colors.secondary}35` }} />
            <div className="relative text-center px-6" style={{ color: colors.primaryForeground }}>
              <p className="text-xs uppercase tracking-[0.5em] mb-4 opacity-70">{b.tagline}</p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-2" style={{ fontFamily: fonts.heading }}>{hero.headline}</h1>
              <Ornament />
              <p className="text-base md:text-lg opacity-80 max-w-md mx-auto mb-10">{hero.subheadline}</p>
              <Link to={`/${slug}/contact`} className="inline-block px-8 py-3.5 text-sm uppercase tracking-[0.2em] font-medium border transition-colors hover:bg-white/10" style={{ borderColor: colors.secondary, color: colors.secondary }}>
                {hero.cta}
              </Link>
            </div>
          </section>

          {/* Menu-card style services */}
          <section className="py-24 px-6" style={{ backgroundColor: colors.background }}>
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-xs uppercase tracking-[0.4em] mb-3" style={{ color: colors.primary }}>The Experience</p>
              <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: fonts.heading }}>What Awaits</h2>
              <Ornament />
              {services.slice(0, 3).map((s, i) => (
                <div key={i} className="py-6">
                  <h3 className="text-xl font-semibold mb-1" style={{ fontFamily: fonts.heading }}>{s.name}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: colors.muted }}>{s.description}</p>
                  {i < 2 && <div className="w-8 h-px mx-auto mt-6" style={{ backgroundColor: `${colors.muted}30` }} />}
                </div>
              ))}
            </div>
          </section>

          {/* Wine-list style testimonials */}
          <section className="py-20 px-6" style={{ backgroundColor: colors.primary, color: colors.primaryForeground }}>
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex justify-center gap-1 mb-6">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" style={{ color: colors.secondary }} />)}</div>
              <p className="text-lg md:text-xl leading-relaxed italic mb-6" style={{ fontFamily: fonts.heading }}>"{testimonials[0].text}"</p>
              <p className="text-sm font-medium">{testimonials[0].name}</p>
              <p className="text-xs opacity-60">{testimonials[0].role}</p>
            </div>
          </section>
        </>
      )}

      {page === 'about' && (
        <div className="pt-24">
          <section className="py-16 px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <p className="text-xs uppercase tracking-[0.4em] mb-3" style={{ color: colors.primary }}>Our Story</p>
              <h1 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: fonts.heading }}>A Table Worth Gathering Around</h1>
              <Ornament />
              <div className="text-left space-y-6">
                {about.story.map((p, i) => <p key={i} className="text-base leading-[1.9]">{p}</p>)}
              </div>
              <div className="my-16 py-10 border-t border-b text-center" style={{ borderColor: `${colors.muted}20` }}>
                <p className="text-xl italic leading-relaxed" style={{ fontFamily: fonts.heading, color: colors.primary }}>"{about.mission}"</p>
              </div>
              <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: fonts.heading }}>The Team</h2>
              <div className="grid md:grid-cols-2 gap-8 text-left">
                {about.team.map((m, i) => (
                  <div key={i} className="p-6 border" style={{ borderColor: `${colors.muted}20` }}>
                    <h3 className="font-bold" style={{ fontFamily: fonts.heading }}>{m.name}</h3>
                    <p className="text-xs mb-2" style={{ color: colors.primary }}>{m.role}</p>
                    <p className="text-sm" style={{ color: colors.muted }}>{m.bio}</p>
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
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-xs uppercase tracking-[0.4em] mb-3" style={{ color: colors.primary }}>Dining</p>
              <h1 className="text-4xl font-bold" style={{ fontFamily: fonts.heading }}>The Menu</h1>
              <Ornament />
              {services.map((s, i) => (
                <div key={i} className="py-8 text-left">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold" style={{ fontFamily: fonts.heading }}>{s.name}</h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: colors.muted }}>{s.description}</p>
                  {i < services.length - 1 && <div className="w-8 h-px mx-auto mt-8" style={{ backgroundColor: `${colors.muted}20` }} />}
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {page === 'contact' && (
        <div className="pt-24">
          <section className="py-16 px-6">
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-xs uppercase tracking-[0.4em] mb-3" style={{ color: colors.primary }}>Reservations</p>
              <h1 className="text-4xl font-bold" style={{ fontFamily: fonts.heading }}>Reserve Your Table</h1>
              <Ornament />
              <div className="text-left mt-8">
                {sent ? <div className="p-10 border text-center" style={{ borderColor: colors.secondary }}><p className="text-lg font-semibold" style={{ fontFamily: fonts.heading, color: colors.primary }}>Thank you. We look forward to welcoming you.</p></div> : (
                  <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <input required placeholder="Name" className="w-full px-4 py-3 border text-sm outline-none" style={{ borderColor: `${colors.muted}25`, backgroundColor: colors.background }} />
                      <input required type="email" placeholder="Email" className="w-full px-4 py-3 border text-sm outline-none" style={{ borderColor: `${colors.muted}25`, backgroundColor: colors.background }} />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <input type="tel" placeholder="Phone" className="w-full px-4 py-3 border text-sm outline-none" style={{ borderColor: `${colors.muted}25`, backgroundColor: colors.background }} />
                      <input placeholder="Party size" className="w-full px-4 py-3 border text-sm outline-none" style={{ borderColor: `${colors.muted}25`, backgroundColor: colors.background }} />
                    </div>
                    <textarea required rows={3} placeholder="Special requests or occasion" className="w-full px-4 py-3 border text-sm outline-none resize-none" style={{ borderColor: `${colors.muted}25`, backgroundColor: colors.background }} />
                    <button type="submit" className="w-full py-3.5 text-sm uppercase tracking-[0.2em] font-medium" style={{ backgroundColor: colors.primary, color: colors.primaryForeground }}>Request Reservation</button>
                  </form>
                )}
              </div>
              <div className="mt-12 space-y-2 text-sm" style={{ color: colors.muted }}>
                <p>{contact.address}, {contact.city}, {contact.country}</p>
                <p>{contact.phone} · {contact.email}</p>
                {contact.hours.map((h, i) => <p key={i}>{h}</p>)}
              </div>
            </div>
          </section>
        </div>
      )}

      <footer className="py-10 px-6" style={{ backgroundColor: colors.primary, color: colors.primaryForeground }}>
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-lg mb-4" style={{ fontFamily: fonts.heading }}>{b.name}</p>
          <div className="flex justify-center gap-6 mb-4">{links.map(l => <Link key={l.pg} to={l.path} className="text-xs uppercase tracking-[0.2em] opacity-50 hover:opacity-100">{l.label}</Link>)}</div>
          <p className="text-xs opacity-40">{b.name} © 2026 Enterprise</p>
        </div>
      </footer>
    </div>
  );
}
