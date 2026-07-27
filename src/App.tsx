import { useState, useEffect, useRef } from 'react'
import { Analytics } from '@vercel/analytics/react'
import symphonyLogo from '@/imports/symphony_consultancy.jpeg'
import ridimaPic from '@/imports/Ridima_Ja.png'

const NAV_LINKS = ['Services', 'Process', 'Sectors', 'Team']

const SERVICES = [
  {
    number: '01',
    title: 'Business Consulting',
    desc: 'We align your founder vision with an executable roadmap — structuring clarity out of chaos so every step leads to momentum, from ideation to unicorn potential.',
    tags: ['Vision-to-Roadmap', 'Strategic Alignment'],
  },
  {
    number: '02',
    title: 'Fund Raising',
    desc: 'Direct VC and angel intros, pitch deck overhauls, and deal closure support. We craft the narrative that unlocks capital and secures strategic partnerships.',
    tags: ['VC Intros', 'Pitch Mastery', 'Deal Closure'],
  },
  {
    number: '03',
    title: 'Digital Marketing',
    desc: 'Full-funnel digital marketing powered by SEO, Google Ads, Meta Ads, and YouTube Promotion — engineered to generate high-quality leads and drive measurable conversions at scale.',
    tags: ['SEO', 'Google Ads', 'Meta Ads', 'YouTube'],
  },
  {
    number: '04',
    title: 'Backoffice & CRM',
    desc: 'Frictionless CRM setups, compliance frameworks, and operational infrastructure — freeing your team to focus entirely on high-value creation and growth.',
    tags: ['CRM Setup', 'Compliance', 'Ops'],
  },
  {
    number: '05',
    title: 'Expansion & Strategy',
    desc: 'Domain-specific growth blueprints with comprehensive benchmarking. We navigate new markets and turn ambition into automated, measurable scaling.',
    tags: ['Benchmarking', 'Growth Blueprints', 'Market Entry'],
  },
  {
    number: '06',
    title: 'TECH / Fintech Advisory',
    desc: 'Advanced risk modeling, MVP advisory, and tech integrations designed to embed scalability from day one — for fintech, e-commerce, and beyond.',
    tags: ['Risk Modeling', 'MVP Advisory', 'Tech Integration'],
  },
  {
    number: '07',
    title: 'Financial Consulting',
    desc: "Investor-grade financial models and forecasts engineered for confidence and rapid capital raises. We speak the language your investors need to hear.",
    tags: ['Investor-Grade Models', '3-Year Forecasts'],
  },
  {
    number: '08',
    title: 'Events & Networking',
    desc: 'Curated CEO roundtables and vendor events that spark the right partnerships. We keep your network expanding in flow — connecting you to the ecosystem that matters.',
    tags: ['CEO Roundtables', 'Vendor Events', 'Partnerships'],
  },
]

const STATS = [
  { value: '8+', label: 'Core Services' },
  { value: '5', label: 'Sectors & Counting' },
  { value: '100%', label: 'Hands-On Execution' },
]

const PROCESS = [
  {
    step: '01',
    title: 'Discovery & Strategy',
    desc: 'Deep-dive session to identify bottlenecks, map your market, and align your vision with executable, measurable goals.',
    duration: 'Week 1–2',
  },
  {
    step: '02',
    title: 'Custom Activation',
    desc: 'Tailored service mix deployment — e.g., Fundraising prep + Digital Marketing engines — built specifically around your stage and vertical.',
    duration: 'Week 3–5',
  },
  {
    step: '03',
    title: 'Execution & Tracking',
    desc: 'Rigorous implementation with milestone tracking to ensure velocity. We move with you, adjusting the playbook as you learn and grow.',
    duration: 'Ongoing',
  },
  {
    step: '04',
    title: 'Flow State Achieved',
    desc: 'Sustainable growth achieved. Friction removed. Your startup scales effortlessly — with the systems and partnerships that compound over time.',
    duration: 'Through Close',
  },
]

const SECTORS = [
  { name: 'Fintech', sub: 'Payments & Lending', icon: '💳' },
  { name: 'E-Commerce', sub: 'D2C & Marketplaces', icon: '🛒' },
  { name: 'Quick Commerce', sub: 'Rapid Delivery & Dark Stores', icon: '⚡' },
  { name: 'Fashion Brand', sub: 'Apparel & Lifestyle', icon: '👗' },
  { name: 'Tech', sub: 'B2B & Enterprise', icon: '🖥️' },
]

const ACCENT = '#D4F53C'
const ACCENT_GOLD = '#F5A623'

function useScrollY() {
  const [y, setY] = useState(0)
  useEffect(() => {
    const handler = () => setY(window.scrollY)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])
  return y
}

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

function Reveal({ children, delay = 0, className = '', fill = false }: { children: React.ReactNode; delay?: number; className?: string; fill?: boolean }) {
  const { ref, inView } = useInView()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
        ...(fill ? { height: '100%', display: 'flex', flexDirection: 'column' } : {}),
      }}
    >
      {children}
    </div>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeService, setActiveService] = useState<number | null>(null)
  const scrollY = useScrollY()
  const navStuck = scrollY > 40

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <div style={{ backgroundColor: '#0C0C0E', color: '#F0EDE8', fontFamily: "'Barlow', sans-serif" }}>

      {/* ── NAV ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        borderBottom: navStuck ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
        backgroundColor: navStuck ? 'rgba(12,12,14,0.94)' : 'transparent',
        backdropFilter: navStuck ? 'blur(12px)' : 'none',
        transition: 'all 0.3s ease',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'default' }}>
            <img src={symphonyLogo} alt="Symphony Consulting logo" style={{ height: 34, width: 'auto', objectFit: 'contain' }} />
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 18, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Symphony <span style={{ color: ACCENT }}>Consulting</span>
            </span>
          </div>

          <div style={{ display: 'flex', gap: 40, alignItems: 'center' }} className="nav-links">
            {NAV_LINKS.map(link => (
              <button key={link} onClick={() => scrollTo(link.toLowerCase())}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#7A7A85', fontSize: 13, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', padding: 0, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#F0EDE8')}
                onMouseLeave={e => (e.currentTarget.style.color = '#7A7A85')}
              >
                {link}
              </button>
            ))}
            <button onClick={() => scrollTo('contact')}
              style={{ background: ACCENT, color: '#0C0C0E', border: 'none', padding: '8px 20px', fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer', transition: 'opacity 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Join the Flow
            </button>
          </div>

          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#F0EDE8', display: 'none' }}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth={2}>
              {menuOpen ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div style={{ background: '#0C0C0E', borderTop: '1px solid rgba(255,255,255,0.07)', padding: '20px 32px 28px' }}>
            {[...NAV_LINKS, 'Join the Flow'].map(link => (
              <button key={link} onClick={() => scrollTo(link === 'Join the Flow' ? 'contact' : link.toLowerCase())}
                style={{ display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', color: link === 'Join the Flow' ? ACCENT : '#F0EDE8', fontSize: 16, fontWeight: 500, padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', letterSpacing: '0.04em' }}>
                {link}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="hero-section" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        <div style={{ position: 'absolute', top: '15%', right: '-5%', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,245,60,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(56px, 10vw, 140px)', lineHeight: 0.92, textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: 32 }}>
            We Build<br />
            <span style={{ color: ACCENT }}>Startups</span><br />
            That Win.
          </h1>

          <div style={{ borderLeft: `3px solid ${ACCENT_GOLD}`, paddingLeft: 16, marginBottom: 36, fontStyle: 'italic', fontSize: 20, color: ACCENT_GOLD, fontWeight: 400 }}>
            "From Chaos to Momentum"
          </div>

          <div className="hero-grid">
            <p style={{ fontSize: 18, lineHeight: 1.65, color: '#9A9A9F', fontWeight: 300, margin: 0 }}>
              We propel startups in tech, fintech, e-commerce, and beyond to seamless scaling — handling VC connections, pitch mastery, digital marketing, and operations so you innovate while we orchestrate growth.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button onClick={() => scrollTo('contact')}
                style={{ background: ACCENT, color: '#0C0C0E', border: 'none', padding: '16px 36px', fontSize: 14, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s', width: '100%' }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}>
                Join Symphony Today →
              </button>
              <button onClick={() => scrollTo('services')}
                style={{ background: 'transparent', color: '#F0EDE8', border: '1px solid rgba(255,255,255,0.15)', padding: '16px 36px', fontSize: 14, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', transition: 'border-color 0.2s', width: '100%' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)')}>
                Explore Our Services
              </button>
            </div>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: 0.35, zIndex: 1 }}>
          <span style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Scroll</span>
          <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, #F0EDE8, transparent)' }} />
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div className="stats-grid">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 80}>
                <div style={{ padding: '52px 32px', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(36px, 4vw, 56px)', color: ACCENT, letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 8 }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7A7A85' }}>
                    {s.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="section-pad" style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Reveal>
          <div style={{ marginBottom: 72 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: ACCENT, marginBottom: 16 }}>Core Services</div>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(36px, 5vw, 72px)', textTransform: 'uppercase', lineHeight: 0.95, letterSpacing: '-0.01em' }}>
              End-to-End<br />Startup Acceleration.
            </h2>
          </div>
        </Reveal>
        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <Reveal key={s.number} delay={i * 50} fill>
              <div onMouseEnter={() => setActiveService(i)} onMouseLeave={() => setActiveService(null)}
                style={{ flex: 1 }}
                style={{ background: activeService === i ? '#131316' : '#0C0C0E', padding: '48px 44px', cursor: 'default', transition: 'background 0.25s', position: 'relative', overflow: 'hidden', flex: 1 }}>
                {activeService === i && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: ACCENT }} />}
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 12, color: ACCENT, letterSpacing: '0.12em', marginBottom: 16 }}>{s.number}</div>
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 28, textTransform: 'uppercase', letterSpacing: '0.01em', marginBottom: 14, lineHeight: 1 }}>{s.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: '#9A9A9F', fontWeight: 300, marginBottom: 24 }}>{s.desc}</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {s.tags.map(tag => (
                    <span key={tag} style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '3px 10px', fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6A6A75' }}>{tag}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" className="process-section" style={{ background: '#0E0E11', borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Reveal>
            <div className="process-header-grid">
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: ACCENT, marginBottom: 16 }}>Success Roadmap</div>
                <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(36px, 5vw, 72px)', textTransform: 'uppercase', lineHeight: 0.95 }}>
                  No Decks.<br />No Retainers.<br />Just Results.
                </h2>
              </div>
              <p style={{ fontSize: 16, lineHeight: 1.75, color: '#7A7A85', fontWeight: 300, alignSelf: 'flex-end' }}>
                From initial strategy session to sustainable flow state — four phases, zero friction, measurable results at every milestone.
              </p>
            </div>
          </Reveal>

          <div className="process-grid">
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={i * 80} fill>
                <div style={{ background: '#0E0E11', padding: '48px 32px', flex: 1 }}>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 60, fontWeight: 900, color: 'rgba(212,245,60,0.1)', lineHeight: 1, marginBottom: 20, letterSpacing: '-0.03em' }}>{p.step}</div>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: ACCENT, border: '1px solid rgba(212,245,60,0.2)', display: 'inline-block', padding: '3px 8px', marginBottom: 12 }}>{p.duration}</div>
                  <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 20, textTransform: 'uppercase', letterSpacing: '0.02em', margin: '12px 0 12px' }}>{p.title}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.75, color: '#7A7A85', fontWeight: 300, margin: 0 }}>{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTORS ── */}
      <section id="sectors" className="section-pad" style={{ maxWidth: 1280, margin: '0 auto' }}>
        <Reveal>
          <div className="section-header-grid">
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: ACCENT, marginBottom: 16 }}>Sectors We Serve</div>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(36px, 5vw, 72px)', textTransform: 'uppercase', lineHeight: 0.95 }}>
                Built for<br />High-Growth<br />Sectors.
              </h2>
            </div>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: '#7A7A85', fontWeight: 300, alignSelf: 'flex-end' }}>
              Integrated solutions across industries — from rapid-delivery commerce to fintech and fashion brands — with deep sector-specific expertise at every engagement.
            </p>
          </div>
        </Reveal>
        <div className="sectors-grid">
          {SECTORS.map((s, i) => (
            <Reveal key={s.name} delay={i * 70} fill>
              <div style={{ background: '#0C0C0E', padding: '44px 28px', transition: 'background 0.25s', flex: 1 }}
                onMouseEnter={e => (e.currentTarget.style.background = '#131316')}
                onMouseLeave={e => (e.currentTarget.style.background = '#0C0C0E')}>
                <div style={{ fontSize: 34, marginBottom: 18 }}>{s.icon}</div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 20, textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: 6 }}>{s.name}</div>
                <div style={{ fontSize: 12, color: '#7A7A85', fontWeight: 300 }}>{s.sub}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── FOUNDER ── */}
      <section id="team" className="process-section" style={{ background: '#0E0E11', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Reveal>
            <div style={{ marginBottom: 72 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: ACCENT, marginBottom: 16 }}>Leadership</div>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(36px, 5vw, 72px)', textTransform: 'uppercase', lineHeight: 0.95 }}>
                The Vision<br />Behind Symphony.
              </h2>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="founder-grid">
              <div className="founder-photo">
                <img
                  src={ridimaPic}
                  alt="Ridima Jaiswal — Founder & CEO, Symphony Consulting"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block', filter: 'grayscale(10%)', transition: 'transform 0.6s ease, filter 0.4s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.03)'; (e.currentTarget as HTMLImageElement).style.filter = 'grayscale(0%)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; (e.currentTarget as HTMLImageElement).style.filter = 'grayscale(10%)' }}
                />
              </div>

              {/* Bio */}
              <div className="founder-bio">
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 48, textTransform: 'uppercase', letterSpacing: '-0.01em', lineHeight: 1, marginBottom: 8 }}>
                  Ridima Jaiswal
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: ACCENT, border: `1px solid rgba(212,245,60,0.25)`, display: 'inline-block', padding: '5px 14px', marginBottom: 36 }}>
                  Founder & CEO
                </div>

                <p style={{ fontSize: 16, lineHeight: 1.8, color: '#9A9A9F', fontWeight: 300, marginBottom: 24 }}>
                  Ridima Jaiswal is the driving force behind Symphony Consulting — a strategist, operator, and entrepreneur who built the firm on a single conviction: startups deserve more than advice. They deserve a partner who executes.
                </p>
                <p style={{ fontSize: 16, lineHeight: 1.8, color: '#9A9A9F', fontWeight: 300, marginBottom: 36 }}>
                  With deep expertise spanning business development, fundraising, and digital growth, Ridima has guided founders across fintech, e-commerce, quick commerce, and fashion — transforming early-stage chaos into scalable, investor-ready momentum.
                </p>

                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  {['BD Strategy', 'Fundraising', 'Growth', 'Founder Coaching'].map(skill => (
                    <span key={skill} style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '6px 14px', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#7A7A85' }}>{skill}</span>
                  ))}
                </div>

                <div style={{ marginTop: 40, paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                  <div style={{ fontSize: 15, fontStyle: 'italic', color: ACCENT_GOLD, lineHeight: 1.6, borderLeft: `3px solid ${ACCENT_GOLD}`, paddingLeft: 16 }}>
                    "I started Symphony because I'd seen too many great founders fail not from lack of ideas — but lack of execution partners. We exist to close that gap."
                  </div>
                  <div style={{ fontSize: 12, color: '#7A7A85', marginTop: 10, paddingLeft: 19 }}>— Ridima Jaiswal</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CONTACT / CTA ── */}
      <section id="contact" className="section-pad" style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)', width: 800, height: 500, background: 'radial-gradient(ellipse, rgba(212,245,60,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <Reveal>
          <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: ACCENT, marginBottom: 20 }}>Get Started</div>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(48px, 8vw, 100px)', textTransform: 'uppercase', lineHeight: 0.92, letterSpacing: '-0.01em', marginBottom: 24 }}>
              Ready to Enter<br />the <span style={{ color: ACCENT }}>Flow State?</span>
            </h2>
            <div style={{ borderLeft: `3px solid ${ACCENT_GOLD}`, paddingLeft: 16, marginBottom: 40, fontStyle: 'italic', fontSize: 18, color: ACCENT_GOLD, textAlign: 'left', maxWidth: 420, margin: '0 auto 40px' }}>
              "From Chaos to Momentum"
            </div>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: '#7A7A85', fontWeight: 300, marginBottom: 48, maxWidth: 480, margin: '0 auto 48px' }}>
              Stop fighting friction. Start building momentum. Tell us where you are — Symphony will get you where you need to go.
            </p>

            <ContactForm />

            <div className="contact-info-row">
              {[
                { icon: '🌐', text: 'www.symphonyconsulting.com' },
                { icon: '✉️', text: 'ridima@symphonyconsultancy.in' },
                { icon: '📞', text: '+91 9611613471' },
              ].map(item => (
                <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#7A7A85', fontSize: 13 }}>
                  <span>{item.icon}</span><span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '40px 32px' }}>
        <div className="footer-inner" style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src={symphonyLogo} alt="Symphony Consulting" style={{ height: 30, objectFit: 'contain' }} />
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 16, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Symphony <span style={{ color: ACCENT }}>Consulting</span>
            </span>
          </div>
          <div style={{ color: '#7A7A85', fontSize: 13 }}>© 2025 Symphony Consulting. All rights reserved.</div>
          <div style={{ display: 'flex', gap: 28 }}>
            {['Privacy', 'Terms', 'ridima@symphonyconsultancy.in'].map(item => (
              <span key={item} style={{ fontSize: 12, color: '#7A7A85', letterSpacing: '0.04em', cursor: 'pointer', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#F0EDE8')}
                onMouseLeave={e => (e.currentTarget.style.color = '#7A7A85')}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

        /* ── Nav ── */
        @media (max-width: 900px) {
          .nav-links { display: none !important; }
          .hamburger { display: flex !important; }
        }

        /* ── Hero ── */
        .hero-section {
          padding: 0 32px 80px;
          min-height: 100vh;
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          max-width: 900px;
          align-items: flex-end;
        }
        @media (max-width: 768px) {
          .hero-section { padding: 0 20px 60px; }
          .hero-grid { grid-template-columns: 1fr; gap: 24px; }
        }

        /* ── Stats ── */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: 1fr; }
          .stats-grid > div { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.07); }
        }

        /* ── Services ── */
        .services-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: rgba(255,255,255,0.07);
        }
        @media (max-width: 768px) {
          .services-grid { grid-template-columns: 1fr; }
        }

        /* ── Section padding ── */
        .section-pad {
          padding: 120px 32px;
        }
        @media (max-width: 768px) {
          .section-pad { padding: 72px 20px; }
        }

        /* ── Section heading grid ── */
        .section-header-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: flex-end;
          margin-bottom: 72px;
        }
        @media (max-width: 768px) {
          .section-header-grid { grid-template-columns: 1fr; gap: 16px; margin-bottom: 40px; }
          .section-header-grid p { display: none; }
        }

        /* ── Process ── */
        .process-section { padding: 120px 32px; }
        .process-header-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: flex-end;
          margin-bottom: 80px;
        }
        .process-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: rgba(255,255,255,0.06);
        }
        @media (max-width: 1024px) {
          .process-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .process-section { padding: 72px 20px; }
          .process-header-grid { grid-template-columns: 1fr; gap: 16px; margin-bottom: 40px; }
          .process-header-grid p { display: none; }
          .process-grid { grid-template-columns: 1fr; }
        }

        /* ── Sectors ── */
        .sectors-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1px;
          background: rgba(255,255,255,0.07);
        }
        @media (max-width: 1024px) {
          .sectors-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 640px) {
          .sectors-grid { grid-template-columns: repeat(2, 1fr); }
        }

        /* ── Founder ── */
        .founder-grid {
          display: grid;
          grid-template-columns: 400px 1fr;
          background: rgba(255,255,255,0.07);
          gap: 1px;
          align-items: stretch;
        }
        .founder-photo {
          overflow: hidden;
          background: #0E0E11;
          min-height: 520px;
        }
        .founder-bio {
          background: #0E0E11;
          padding: 64px 56px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        @media (max-width: 900px) {
          .founder-grid { grid-template-columns: 1fr; }
          .founder-photo { min-height: 360px; }
          .founder-bio { padding: 40px 28px; }
        }

        /* ── Contact info row ── */
        .contact-info-row {
          margin-top: 48px;
          display: flex;
          justify-content: center;
          gap: 40px;
          flex-wrap: wrap;
        }
        @media (max-width: 640px) {
          .contact-info-row { flex-direction: column; align-items: center; gap: 16px; }
        }

        /* ── Form rows ── */
        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        @media (max-width: 640px) {
          .form-row-2 { grid-template-columns: 1fr; }
        }

        /* ── Footer ── */
        .footer-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 24px;
        }
        @media (max-width: 640px) {
          .footer-inner { flex-direction: column; align-items: flex-start; gap: 16px; }
        }

        /* ── CTA section ── */
        .cta-tagline {
          border-left: 3px solid #F5A623;
          padding-left: 16px;
          margin-bottom: 40px;
          font-style: italic;
          font-size: 18px;
          color: #F5A623;
          text-align: left;
          max-width: 420px;
          margin-left: auto;
          margin-right: auto;
        }
        @media (max-width: 640px) {
          .cta-tagline { font-size: 15px; }
        }
      `}</style>
      <Analytics />
    </div>
  )
}

function ContactForm() {
  const [form, setForm] = useState({
    name: '', company: '', email: '', mobile: '', challenge: '',
  })
  const [fileName, setFileName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    setFileName(f ? f.name : '')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const body = [
      `Name: ${form.name}`,
      `Company: ${form.company}`,
      `Email: ${form.email}`,
      `Mobile: ${form.mobile}`,
      `Challenge: ${form.challenge}`,
      fileName ? `Attached File: ${fileName} (please attach manually)` : '',
    ].filter(Boolean).join('\n')

    const mailto = `mailto:ridima@symphonyconsultancy.in?subject=New Startup Application — ${encodeURIComponent(form.company)}&body=${encodeURIComponent(body)}`
    window.location.href = mailto
    setSubmitted(true)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', background: '#131316', border: '1px solid rgba(255,255,255,0.1)',
    color: '#F0EDE8', padding: '14px 16px', fontSize: 15, fontFamily: "'Barlow', sans-serif",
    outline: 'none', transition: 'border-color 0.2s',
  }
  const focusBorder = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    (e.currentTarget.style.borderColor = 'rgba(212,245,60,0.5)')
  const blurBorder = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')

  const labelStyle: React.CSSProperties = {
    fontSize: 10, fontWeight: 600, letterSpacing: '0.1em',
    textTransform: 'uppercase', color: '#7A7A85', display: 'block', marginBottom: 6,
  }

  if (submitted) {
    return (
      <div style={{ border: '1px solid rgba(212,245,60,0.3)', padding: '52px 40px', textAlign: 'center', background: 'rgba(212,245,60,0.04)' }}>
        <div style={{ fontSize: 36, marginBottom: 16, color: '#D4F53C' }}>✓</div>
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 26, textTransform: 'uppercase', marginBottom: 12 }}>
          You're in the Flow
        </div>
        <p style={{ color: '#7A7A85', fontSize: 15, fontWeight: 300 }}>
          Your application is on its way to Ridima. Expect a personal reply within 48 hours.
          {fileName && <><br /><span style={{ color: '#9A9A9F', fontSize: 13, marginTop: 8, display: 'block' }}>Don't forget to attach <strong>{fileName}</strong> to the email that just opened.</span></>}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12, textAlign: 'left' }}>
      {/* Row 1 */}
      <div className="form-row-2">
        <div>
          <label style={labelStyle}>Full Name</label>
          <input style={inputStyle} placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required onFocus={focusBorder} onBlur={blurBorder} />
        </div>
        <div>
          <label style={labelStyle}>Company</label>
          <input style={inputStyle} placeholder="Your startup" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} required onFocus={focusBorder} onBlur={blurBorder} />
        </div>
      </div>

      {/* Row 2 */}
      <div className="form-row-2">
        <div>
          <label style={labelStyle}>Email</label>
          <input type="email" style={inputStyle} placeholder="you@startup.io" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required onFocus={focusBorder} onBlur={blurBorder} />
        </div>
        <div>
          <label style={labelStyle}>Mobile Number</label>
          <input type="tel" style={inputStyle} placeholder="+91 98765 43210" value={form.mobile} onChange={e => setForm({ ...form, mobile: e.target.value })} required onFocus={focusBorder} onBlur={blurBorder} />
        </div>
      </div>

      {/* Challenge */}
      <div>
        <label style={labelStyle}>What is your biggest challenge right now?</label>
        <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: 100 }}
          placeholder="Fundraising? Market entry? Growth stalling? Tell us where you're stuck..."
          value={form.challenge} onChange={e => setForm({ ...form, challenge: e.target.value })} required
          onFocus={e => (e.currentTarget.style.borderColor = 'rgba(212,245,60,0.5)')}
          onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
        />
      </div>

      {/* File Upload */}
      <div>
        <label style={labelStyle}>Attach Your Pitch Deck or Business Plan (PDF / PPT)</label>
        <div
          onClick={() => fileRef.current?.click()}
          style={{
            background: '#131316', border: '1px dashed rgba(212,245,60,0.25)',
            padding: '20px 24px', cursor: 'pointer', transition: 'border-color 0.2s',
            display: 'flex', alignItems: 'center', gap: 14,
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(212,245,60,0.55)')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(212,245,60,0.25)')}
        >
          <div style={{ width: 36, height: 36, border: '1px solid rgba(212,245,60,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="18" height="18" fill="none" stroke="#D4F53C" strokeWidth={1.5} viewBox="0 0 24 24">
              <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12V4m0 0L8 8m4-4l4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            {fileName
              ? <span style={{ fontSize: 14, color: '#D4F53C', fontWeight: 500 }}>{fileName}</span>
              : <><span style={{ fontSize: 14, color: '#9A9A9F' }}>Click to upload your pitch deck or business plan</span><br /><span style={{ fontSize: 11, color: '#6A6A75', letterSpacing: '0.04em' }}>PDF, PPT, PPTX — max 20MB</span></>
            }
          </div>
        </div>
        <input ref={fileRef} type="file" accept=".pdf,.ppt,.pptx" onChange={handleFile} style={{ display: 'none' }} />
      </div>

      <button type="submit"
        style={{ marginTop: 8, background: '#D4F53C', color: '#0C0C0E', border: 'none', padding: '18px 40px', fontSize: 14, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s', fontFamily: "'Barlow Condensed', sans-serif" }}
        onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-2px)' }}
        onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}>
        Join Symphony — Submit Application →
      </button>
    </form>
  )
}
