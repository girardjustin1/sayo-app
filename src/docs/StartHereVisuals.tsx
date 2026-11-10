import { useEffect, useState, type ReactNode } from 'react'
import { DirectionProvider } from '../brand/DirectionContext'
import { DIRECTIONS, DIRECTION_IDS, type DirectionId } from '../brand/directions'
import { Logo } from '../brand/Logo'
import { Home } from '../screens/user/02-home/Home'
import { MiniPhone } from './kit'

/**
 * Visual blocks for the Start Here page. Screens are live components (not
 * screenshots), so this page always shows the current build.
 */

const story = (id: string) => `./?path=/story/${id}`
const ink = '#1F1D24'
const muted = '#6B6875'
const line = '#E7E3EA'

function Box({ children, style }: { children: ReactNode; style?: React.CSSProperties }) {
  return <div className="sb-unstyled" style={{ border: `1px solid ${line}`, borderRadius: 20, overflow: 'hidden', margin: '24px 0', background: '#fff', color: ink, fontFamily: "'DM Sans Variable', system-ui, sans-serif", ...style }}>{children}</div>
}

function Pill({ children }: { children: ReactNode }) {
  return <span style={{ display: 'inline-flex', padding: '3px 10px', borderRadius: 999, border: `1px solid ${line}`, background: '#fff', fontSize: 12, fontWeight: 600, color: muted }}>{children}</span>
}

export function A({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} target="_top" style={{ color: '#C4007F', fontWeight: 700, textDecoration: 'none' }}>{children}</a>
}

export function Hero() {
  return (
    <Box style={{ background: 'linear-gradient(120deg,#FFF1EB 0%,#FBEFF7 50%,#F3EEFA 100%)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, alignItems: 'center', padding: '36px 36px 28px' }}>
        <div style={{ maxWidth: 420 }}>
          <Logo height={40} />
          <h1 style={{ fontFamily: 'inherit', fontSize: 34, lineHeight: 1.08, letterSpacing: '-0.02em', margin: '22px 0 0', color: ink, border: 0 }}>
            A private, stigma-free place to ask, understand, and find care.
          </h1>
          <p style={{ fontSize: 15, lineHeight: 1.55, color: muted, margin: '12px 0 16px' }}>
            For young women, starting with an 18+ pilot in Ghana: sexual and reproductive health, HIV, PrEP and PEP, contraception, mental wellbeing and GBV
            support. AI-supported intake, verified professional review, safe referral and a protected peer Circle.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            <Pill>{DIRECTION_IDS.length} brand directions</Pill>
            <Pill>5 clickable flows</Pill>
            <Pill>User app · Professional · Admin</Pill>
            <Pill>Built on Astryx</Pill>
            <Pill>Sample data only</Pill>
          </div>
        </div>
        <div style={{ display: 'flex', gap: DIRECTION_IDS.length > 3 ? 10 : 14, alignItems: 'flex-start' }}>
          {DIRECTION_IDS.map((id, i) => (
            <div key={id} style={{ marginTop: i % 2 === 1 ? 0 : 28, textAlign: 'center' }}>
              <MiniPhone scale={DIRECTION_IDS.length > 3 ? 0.33 : 0.42}>
                <DirectionProvider id={id}><Home hasReadyReview /></DirectionProvider>
              </MiniPhone>
              <div style={{ fontSize: 11, fontWeight: 700, color: muted, marginTop: 10 }}>{DIRECTIONS[id].letter} · {DIRECTIONS[id].name}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ borderTop: `1px solid ${line}`, padding: '8px 36px', fontSize: 11, color: muted, background: 'rgb(255 255 255 / 0.6)' }}>
        Live screens from this Storybook, one per brand direction. Every person, clinic and case is fictional.
      </div>
    </Box>
  )
}

const BRIDGE = [
  { from: 'Silence & confusion', body: '“Something is happening to me and I’m scared, embarrassed, confused.”' },
  { from: 'Trusted information', body: 'Ask SAYO in your own words. Follow-up questions, red-flag checks, clear evidence-based information. Never a diagnosis.' },
  { from: 'Professional review', body: 'Optional. A verified health professional reviews it asynchronously and replies with their thoughts and a care decision.' },
  { from: 'Appropriate care', body: 'Find Care shows verified services for the right category, near you. No booking: just where to go and how to reach them.' },
]

export function Bridge() {
  return (
    <Box>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {BRIDGE.map((b, i) => (
          <div key={b.from} style={{ padding: 20, borderLeft: i ? `1px solid ${line}` : 0, background: i === 0 ? '#FAF8FC' : '#fff' }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', color: '#C4007F' }}>STEP {i + 1}</div>
            <div style={{ fontSize: 17, fontWeight: 700, margin: '6px 0' }}>{b.from}</div>
            <div style={{ fontSize: 13, lineHeight: 1.5, color: muted }}>{b.body}</div>
          </div>
        ))}
      </div>
    </Box>
  )
}

export function DirectionCards() {
  const bg: Record<DirectionId, string> = {
    sister: 'linear-gradient(180deg,#FFE6DA,#FFF7F3)',
    clear: 'linear-gradient(180deg,#F1EAF8,#FAF8FC)',
    unmuted: 'linear-gradient(135deg,#D4009E,#F0346A 55%,#FF5A48)',
    ink: 'linear-gradient(180deg,#EEF1F6,#FAF8F5)',
    clay: 'linear-gradient(180deg,#EFE3D3,#FCF6EE)',
    quiet: 'linear-gradient(180deg,#EFEDE8,#F6F5F2)',
    grove: 'radial-gradient(130% 90% at 85% -10%, #86A65C 0%, #4A5F38 38%, #2B3524 78%)',
  }
  return (
    <div className="sb-unstyled" style={{ display: 'grid', gridTemplateColumns: `repeat(${DIRECTION_IDS.length > 3 ? 2 : 3},1fr)`, gap: 14, margin: '20px 0' }}>
      {DIRECTION_IDS.map((id) => {
        const d = DIRECTIONS[id]
        const loud = d.hero.dark
        return (
          <a key={id} href={story('brand-round-2-current-directions-tokens--directions')} target="_top" style={{ textDecoration: 'none', color: loud ? '#fff' : ink, background: bg[id], borderRadius: 18, padding: 20, border: `1px solid ${line}`, display: 'block' }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', opacity: 0.8 }}>DIRECTION {d.letter}</div>
            <div style={{ fontSize: 22, fontWeight: 800, margin: '4px 0 10px', fontFamily: loud ? "'Fraunces Variable', serif" : undefined }}>{d.name}</div>
            <div style={{ fontSize: 16, fontWeight: 700, fontFamily: loud ? "'Fraunces Variable', serif" : undefined }}>“{d.copy.tagline}”</div>
            <div style={{ fontSize: 13, lineHeight: 1.5, marginTop: 10, opacity: 0.85 }}>{d.oneLiner}</div>
          </a>
        )
      })}
    </div>
  )
}

const PILLARS = [
  { name: 'Ask SAYO', what: 'Private AI-supported intake. Starts with “What’s up?”, keeps the user’s own words, asks only what is needed, checks red flags, summarises, and lets her correct the summary.', link: 'user-03-ask-sayo' },
  { name: 'Verified Professional Review', what: 'Optional and asynchronous. A verified professional accepts the case, writes “My thoughts”, an in-person care decision and a service category. Discreet notification when ready.', link: 'user-05-reviews' },
  { name: 'Find Care', what: 'Verified clinics, hospitals and support services by category and distance, with contact details. No booking in the MVP.', link: 'user-06-find-care' },
  { name: 'The Circle', what: 'Pseudonymous peer community: nicknames and generated avatars, no photos, no DMs. Verified Professional ✓ replies look unmistakably different from peers.', link: 'user-07-circle' },
]

export function Pillars() {
  return (
    <div className="sb-unstyled" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14, margin: '20px 0' }}>
      {PILLARS.map((p, i) => (
        <div key={p.name} style={{ border: `1px solid ${line}`, borderRadius: 16, padding: 18, background: '#fff' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{ width: 28, height: 28, borderRadius: 8, display: 'grid', placeItems: 'center', background: 'linear-gradient(135deg,#D4009E,#FF5A48)', color: '#fff', fontWeight: 800, fontSize: 13 }}>{String.fromCharCode(65 + i)}</span>
            <span style={{ fontWeight: 800, fontSize: 16 }}>{p.name}</span>
          </div>
          <div style={{ fontSize: 13.5, lineHeight: 1.5, color: muted, marginTop: 8 }}>{p.what}</div>
        </div>
      ))}
    </div>
  )
}

const IN = ['Onboarding, 18+ check, account, PIN', 'Ask SAYO intake with red flags and summary check', 'Async professional review + care decision', 'Discreet notifications + My Reviews', 'Find Care (verified list, call, directions)', 'The Circle with reporting and moderation', 'Professional dashboard', 'Admin console with pilot metrics']
const OUT = ['Appointment booking', 'Payments', 'Prescriptions', 'Video or live doctor chat', 'Clinic / hospital dashboards', 'EMR or insurance integration', 'Profile photos or real names', 'Direct messages in the Circle', 'Dark UI']

export function InOut() {
  const col = (title: string, items: string[], tone: string) => (
    <div style={{ padding: 20 }}>
      <div style={{ fontWeight: 800, marginBottom: 10, color: tone }}>{title}</div>
      <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13.5, lineHeight: 1.7 }}>{items.map((t) => <li key={t}>{t}</li>)}</ul>
    </div>
  )
  return (
    <Box>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {col('In the MVP', IN, '#1F7A5A')}
        <div style={{ borderLeft: `1px solid ${line}`, background: '#FCFAFB' }}>{col('Deliberately not in the MVP', OUT, '#B0003A')}</div>
      </div>
    </Box>
  )
}

interface IndexEntry { id: string; title: string; name: string; type: 'story' | 'docs' }

/** Built from Storybook's own index, so it never goes stale. */
export function StoryMap() {
  const [entries, setEntries] = useState<IndexEntry[] | null>(null)
  useEffect(() => {
    fetch('./index.json')
      .then((r) => r.json())
      .then((j: { entries: Record<string, IndexEntry> }) => setEntries(Object.values(j.entries).filter((e) => e.type === 'story')))
      .catch(() => setEntries([]))
  }, [])
  if (!entries) return <p>Loading the story map…</p>
  const groups = new Map<string, Map<string, IndexEntry[]>>()
  for (const e of entries) {
    const parts = e.title.split('/')
    const top = parts.length > 2 ? `${parts[0]} / ${parts[1]}` : parts[0]
    const screen = parts[parts.length - 1]
    if (!groups.has(top)) groups.set(top, new Map())
    const g = groups.get(top)!
    if (!g.has(screen)) g.set(screen, [])
    g.get(screen)!.push(e)
  }
  return (
    <div className="sb-unstyled" style={{ columns: 3, columnGap: 18, margin: '20px 0' }}>
      {[...groups.entries()].map(([top, screens]) => (
        <div key={top} style={{ breakInside: 'avoid', border: `1px solid ${line}`, borderRadius: 14, padding: 14, marginBottom: 14, background: '#fff' }}>
          <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 6 }}>{top}</div>
          {[...screens.entries()].map(([screen, list]) => (
            <div key={screen} style={{ fontSize: 13, lineHeight: 1.6 }}>
              <a href={story(list[0].id)} target="_top" style={{ color: ink, fontWeight: 600, textDecoration: 'none' }}>{screen}</a>
              {list.length > 1 && <span style={{ color: muted }}> · {list.length} states</span>}
            </div>
          ))}
        </div>
      ))}
      <div style={{ breakInside: 'avoid', fontSize: 12, color: muted }}>{entries.length} stories in total.</div>
    </div>
  )
}
