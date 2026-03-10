import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Business } from '@/data/businesses';
import { ArrowLeft, ArrowRight, MapPin, Phone, Mail, Clock, Menu, X, Heart } from 'lucide-react';

interface Props { business: Business; page: string; }

export default function ClearviewSite({ business: b, page }: Props) {
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
      {/* Nav — white, rounded active pills */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-xs opacity-40 hover:opacity-100"><ArrowLeft className="w-3.5 h-3.5" /></Link>
            <Link to={`/${slug}`} className="text-lg font-bold" style={{ color: colors.primary }}>{b.name}</Link>
          </div>
          <div className="hidden md:flex gap-2">
            {links.map(l => (
              <Link key={l.pg} to={l.path} className="px-4 py-1.5 rounded-full text-sm font-medium transition-all" style={{ backgroundColor: page === l.pg ? colors.primary : 'transparent', color: page === l.pg ? colors.primaryForeground : colors.foreground }}>{l.label}</Link>
            ))}
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
        </div>
        {menuOpen && <div className="md:hidden pt-3 pb-1 space-y-1">{links.map(l => <Link key={l.pg} to={l.path} onClick={() => setMenuOpen(false)} className="block px-4 py-2 rounded-lg text-sm" style={{ backgroundColor: page === l.pg ? colors.accent : 'transparent' }}>{l.label}</Link>)}</div>}
      </nav>

      {page === 'home' && (
        <>
          {/* Gradient hero with rounded image */}
          <section className="min-h-[80vh] flex items-center px-6" style={{ background: `linear-gradient(160deg, ${colors.accent} 0%, ${colors.background} 100%)` }}>
            <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center py-20">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-6" style={{ backgroundColor: `${colors.primary}15`, color: colors.primary }}>
                  <Heart className="w-3 h-3" /> {b.tagline}
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6" style={{ color: colors.foreground }}>{hero.headline}</h1>
                <p className="text-lg mb-8 leading-relaxed" style={{ color: colors.muted }}>{hero.subheadline}</p>
                <Link to={`/${slug}/contact`} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-transform hover:scale-105" style={{ backgroundColor: colors.primary, color: colors.primaryForeground }}>
                  {hero.cta} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="aspect-square rounded-[2rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                <img src={image} alt={b.name} className="w-full h-full object-cover" />
              </div>
            </div>
          </section>

          {/* Services in rounded cards */}
          <section className="py-20 px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">How We Help</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {services.slice(0, 3).map((s, i) => (
                  <div key={i} className="p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow" style={{ backgroundColor: i === 1 ? colors.primary : colors.background, color: i === 1 ? colors.primaryForeground : colors.foreground }}>
                    <div className="text-4xl font-bold opacity-20 mb-4">{String(i + 1).padStart(2, '0')}</div>
                    <h3 className="text-lg font-semibold mb-2">{s.name}</h3>
                    <p className="text-sm leading-relaxed" style={{ opacity: 0.7 }}>{s.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials row */}
          <section className="py-20 px-6" style={{ backgroundColor: colors.accent }}>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-10">What Patients Say</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {testimonials.map((t, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-white">
                    <p className="text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs" style={{ color: colors.muted }}>{t.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {page === 'about' && (
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-4" style={{ backgroundColor: colors.accent, color: colors.primary }}>Founded {about.founded}</div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
            </div>
            <div className="rounded-2xl overflow-hidden mb-12 aspect-[2/1]"><img src={image} alt="About" className="w-full h-full object-cover" /></div>
            {about.story.map((p, i) => <p key={i} className="text-base leading-[1.9] mb-6">{p}</p>)}
            <div className="p-8 rounded-2xl my-12 text-center" style={{ backgroundColor: colors.accent }}>
              <p className="text-xl leading-relaxed italic" style={{ color: colors.primary }}>"{about.mission}"</p>
            </div>
            <h2 className="text-2xl font-bold mb-8">Meet the Team</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {about.team.map((m, i) => (
                <div key={i} className="p-6 rounded-2xl shadow-md flex gap-4 items-start">
                  <div className="w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center font-bold" style={{ backgroundColor: colors.primary, color: colors.primaryForeground }}>{m.name.split(' ').map(n => n[0]).join('')}</div>
                  <div><h3 className="font-semibold">{m.name}</h3><p className="text-xs mb-1" style={{ color: colors.primary }}>{m.role}</p><p className="text-sm" style={{ color: colors.muted }}>{m.bio}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {page === 'services' && (
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-4">Our Services</h1>
            <p className="text-center mb-12" style={{ color: colors.muted }}>Comprehensive dental care for the whole family.</p>
            <div className="grid md:grid-cols-2 gap-6">
              {services.map((s, i) => (
                <div key={i} className="p-8 rounded-2xl border-2 hover:border-current transition-colors" style={{ borderColor: `${colors.primary}20` }}>
                  <h3 className="text-xl font-semibold mb-3">{s.name}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: colors.muted }}>{s.description}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link to={`/${slug}/contact`} className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-medium" style={{ backgroundColor: colors.primary, color: colors.primaryForeground }}>{hero.cta} <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </div>
        </section>
      )}

      {page === 'contact' && (
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-2">Book an Appointment</h1>
            <p className="text-center mb-12" style={{ color: colors.muted }}>We'd love to hear from you.</p>
            <div className="grid md:grid-cols-2 gap-12">
              {sent ? (
                <div className="p-10 rounded-2xl text-center" style={{ backgroundColor: colors.accent }}><p className="text-xl font-semibold" style={{ color: colors.primary }}>Message sent!</p><p className="text-sm mt-2" style={{ color: colors.muted }}>We'll be in touch soon.</p></div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-4">
                  <input required placeholder="Full Name" className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={{ borderColor: `${colors.muted}30` }} />
                  <input required type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={{ borderColor: `${colors.muted}30` }} />
                  <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 rounded-xl border text-sm outline-none" style={{ borderColor: `${colors.muted}30` }} />
                  <textarea required rows={4} placeholder="How can we help?" className="w-full px-4 py-3 rounded-xl border text-sm outline-none resize-none" style={{ borderColor: `${colors.muted}30` }} />
                  <button type="submit" className="w-full py-3.5 rounded-full font-medium text-sm" style={{ backgroundColor: colors.primary, color: colors.primaryForeground }}>Send Message</button>
                </form>
              )}
              <div className="space-y-6">
                <div className="p-6 rounded-2xl" style={{ backgroundColor: colors.accent }}>
                  <h3 className="font-semibold mb-4">Contact Information</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex gap-3"><MapPin className="w-4 h-4 flex-shrink-0" style={{ color: colors.primary }} /><span>{contact.address}, {contact.city}</span></div>
                    <div className="flex gap-3"><Phone className="w-4 h-4 flex-shrink-0" style={{ color: colors.primary }} /><span>{contact.phone}</span></div>
                    <div className="flex gap-3"><Mail className="w-4 h-4 flex-shrink-0" style={{ color: colors.primary }} /><span>{contact.email}</span></div>
                    <div className="flex gap-3"><Clock className="w-4 h-4 flex-shrink-0" style={{ color: colors.primary }} /><div>{contact.hours.map((h, i) => <p key={i}>{h}</p>)}</div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <footer className="py-8 px-6" style={{ backgroundColor: colors.primary, color: colors.primaryForeground }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm opacity-80">{b.name} © 2026 Enterprise</p>
          <div className="flex gap-6">{links.map(l => <Link key={l.pg} to={l.path} className="text-sm opacity-60 hover:opacity-100">{l.label}</Link>)}</div>
        </div>
      </footer>
    </div>
  );
}
