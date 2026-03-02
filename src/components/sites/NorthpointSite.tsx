import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Business } from '@/data/businesses';
import { BrandSiteFooter } from '@/components/BrandSiteFooter';
import { ArrowLeft, ArrowRight, MapPin, Phone, Mail, Clock, Menu, X, TrendingUp } from 'lucide-react';

interface Props { business: Business; page: string; }

export default function NorthpointSite({ business: b, page }: Props) {
  const [sent, setSent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { colors, fonts, hero, about, services, testimonials, contact, image } = b;
  const slug = b.slug;
  const base = `/gallery/${slug}`;
  const links = [
    { path: `${base}`, label: 'Home', pg: 'home' },
    { path: `${base}/about`, label: 'About', pg: 'about' },
    { path: `${base}/services`, label: 'Capabilities', pg: 'services' },
    { path: `${base}/contact`, label: 'Contact', pg: 'contact' },
  ];

  return (
    <div style={{ fontFamily: fonts.body, backgroundColor: colors.background, color: colors.foreground }}>
      {/* Nav — corporate, light bg, bottom border */}
      <nav className="sticky top-0 z-50 px-6 py-3 border-b" style={{ backgroundColor: colors.background, borderColor: `${colors.muted}20` }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/gallery" className="text-xs opacity-40 hover:opacity-100"><ArrowLeft className="w-3.5 h-3.5" /></Link>
            <Link to={base} className="text-lg font-bold flex items-center gap-2" style={{ fontFamily: fonts.heading, color: colors.primary }}>
              <TrendingUp className="w-5 h-5" />{b.name}
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <Link key={l.pg} to={l.path} className="text-sm border-b-2 pb-1" style={{ color: colors.foreground, borderColor: page === l.pg ? colors.primary : 'transparent', opacity: page === l.pg ? 1 : 0.5 }}>{l.label}</Link>
            ))}
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
        </div>
        {menuOpen && <div className="md:hidden pt-3 space-y-2">{links.map(l => <Link key={l.pg} to={l.path} onClick={() => setMenuOpen(false)} className="block py-2 text-sm">{l.label}</Link>)}</div>}
      </nav>

      {page === 'home' && (
        <>
          {/* Hero with large background metric */}
          <section className="relative min-h-[70vh] flex items-center px-6 overflow-hidden" style={{ backgroundColor: colors.accent }}>
            <div className="absolute right-10 top-1/2 -translate-y-1/2 text-[12rem] md:text-[20rem] font-black opacity-[0.04] select-none leading-none" style={{ fontFamily: fonts.heading, color: colors.primary }}>92%</div>
            <div className="max-w-3xl relative z-10 py-20">
              <p className="text-xs uppercase tracking-[0.3em] mb-3 font-medium" style={{ color: colors.primary }}>Strategy & Operations</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6" style={{ fontFamily: fonts.heading }}>{hero.headline}</h1>
              <p className="text-lg mb-8 leading-relaxed" style={{ color: colors.muted }}>{hero.subheadline}</p>
              <p className="text-sm mb-10 flex items-center gap-2" style={{ color: colors.primary }}><TrendingUp className="w-4 h-4" /> 92% of clients report measurable improvement within the first quarter</p>
              <Link to={`${base}/contact`} className="inline-flex items-center gap-2 px-7 py-3.5 rounded text-sm font-medium" style={{ backgroundColor: colors.primary, color: colors.primaryForeground }}>{hero.cta} <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </section>

          {/* Capabilities grid */}
          <section className="py-24 px-6" style={{ backgroundColor: colors.background }}>
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-4 gap-px" style={{ backgroundColor: `${colors.muted}20` }}>
                <div className="p-8 md:col-span-4" style={{ backgroundColor: colors.background }}>
                  <p className="text-xs uppercase tracking-[0.3em] mb-1" style={{ color: colors.primary }}>Our Capabilities</p>
                  <h2 className="text-2xl font-bold" style={{ fontFamily: fonts.heading }}>How We Help</h2>
                </div>
                {services.slice(0, 4).map((s, i) => (
                  <div key={i} className="p-8" style={{ backgroundColor: colors.background }}>
                    <p className="text-xs font-mono mb-4" style={{ color: colors.muted }}>{String(i + 1).padStart(2, '0')}</p>
                    <h3 className="font-semibold mb-2">{s.name}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: colors.muted }}>{s.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Single testimonial highlight */}
          <section className="py-20 px-6" style={{ backgroundColor: colors.primary, color: colors.primaryForeground }}>
            <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
              <div><p className="text-xs uppercase tracking-[0.3em] mb-2 opacity-60">Client Feedback</p><p className="text-2xl font-bold" style={{ fontFamily: fonts.heading }}>Results That Speak</p></div>
              <div className="md:col-span-2 md:border-l md:pl-8" style={{ borderColor: `${colors.primaryForeground}20` }}>
                <p className="text-lg leading-relaxed mb-4 opacity-90">"{testimonials[0].text}"</p>
                <p className="font-semibold text-sm">{testimonials[0].name}</p>
                <p className="text-xs opacity-60">{testimonials[0].role}</p>
              </div>
            </div>
          </section>
        </>
      )}

      {page === 'about' && (
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: colors.primary }}>About Us</p>
            <h1 className="text-4xl font-bold mb-12" style={{ fontFamily: fonts.heading }}>Who We Are</h1>
            <div className="grid md:grid-cols-3 gap-12">
              <div className="md:col-span-2 space-y-6">
                {about.story.map((p, i) => <p key={i} className="text-base leading-[1.9]">{p}</p>)}
              </div>
              <div className="space-y-8">
                <div className="p-6 rounded" style={{ backgroundColor: colors.accent }}>
                  <p className="text-xs uppercase tracking-wider mb-2" style={{ color: colors.primary }}>Founded</p>
                  <p className="text-3xl font-bold" style={{ fontFamily: fonts.heading }}>{about.founded}</p>
                </div>
                <div className="p-6 rounded" style={{ backgroundColor: colors.accent }}>
                  <p className="text-xs uppercase tracking-wider mb-2" style={{ color: colors.primary }}>Mission</p>
                  <p className="text-sm italic leading-relaxed">"{about.mission}"</p>
                </div>
              </div>
            </div>
            <div className="mt-16 pt-16 border-t" style={{ borderColor: `${colors.muted}20` }}>
              <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: fonts.heading }}>Leadership</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {about.team.map((m, i) => (
                  <div key={i} className="flex gap-4"><div className="w-12 h-12 rounded flex-shrink-0 flex items-center justify-center font-bold text-sm" style={{ backgroundColor: colors.primary, color: colors.primaryForeground }}>{m.name.split(' ').map(n => n[0]).join('')}</div>
                  <div><h3 className="font-semibold">{m.name}</h3><p className="text-xs mb-1" style={{ color: colors.primary }}>{m.role}</p><p className="text-sm" style={{ color: colors.muted }}>{m.bio}</p></div></div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {page === 'services' && (
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: colors.primary }}>Capabilities</p>
            <h1 className="text-4xl font-bold mb-12" style={{ fontFamily: fonts.heading }}>What We Do</h1>
            <div className="grid md:grid-cols-2 gap-px" style={{ backgroundColor: `${colors.muted}20` }}>
              {services.map((s, i) => (
                <div key={i} className="p-8" style={{ backgroundColor: colors.background }}>
                  <p className="text-xs font-mono mb-3" style={{ color: colors.muted }}>{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="text-lg font-semibold mb-2">{s.name}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: colors.muted }}>{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {page === 'contact' && (
        <section className="py-20 px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: fonts.heading }}>Let's Start a Conversation</h1>
            <p className="mb-10" style={{ color: colors.muted }}>Tell us about your challenge and we'll follow up within one business day.</p>
            {sent ? <div className="p-8 rounded text-center" style={{ backgroundColor: colors.accent }}><p className="font-semibold" style={{ color: colors.primary }}>Thank you. We'll be in touch shortly.</p></div> : (
              <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input required placeholder="Name" className="w-full px-4 py-3 rounded border text-sm outline-none" style={{ borderColor: `${colors.muted}30` }} />
                  <input required type="email" placeholder="Email" className="w-full px-4 py-3 rounded border text-sm outline-none" style={{ borderColor: `${colors.muted}30` }} />
                </div>
                <input placeholder="Company" className="w-full px-4 py-3 rounded border text-sm outline-none" style={{ borderColor: `${colors.muted}30` }} />
                <textarea required rows={5} placeholder="What challenge are you facing?" className="w-full px-4 py-3 rounded border text-sm outline-none resize-none" style={{ borderColor: `${colors.muted}30` }} />
                <button type="submit" className="px-8 py-3 rounded text-sm font-medium" style={{ backgroundColor: colors.primary, color: colors.primaryForeground }}>Submit</button>
              </form>
            )}
            <div className="mt-12 grid md:grid-cols-3 gap-6 text-sm">
              <div><p className="font-medium mb-1">Office</p><p style={{ color: colors.muted }}>{contact.address}, {contact.city}</p></div>
              <div><p className="font-medium mb-1">Phone & Email</p><p style={{ color: colors.muted }}>{contact.phone}</p><p style={{ color: colors.muted }}>{contact.email}</p></div>
              <div><p className="font-medium mb-1">Hours</p>{contact.hours.map((h, i) => <p key={i} style={{ color: colors.muted }}>{h}</p>)}</div>
            </div>
          </div>
        </section>
      )}

      <BrandSiteFooter name={b.name} backgroundColor={colors.background} />
    </div>
  );
}
