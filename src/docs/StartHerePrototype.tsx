import type { ReactNode } from 'react'
import { DirectionProvider } from '../brand/DirectionContext'
import { DIRECTIONS, DIRECTION_IDS } from '../brand/directions'
import { R2Img, type R2Slot } from '../brand/rounds/round2/imagery'
import { ProtoCtx, type ProtoApi } from '../prototype/ProtoContext'
import { FLOWS, type Flow } from '../prototype/flows'
import { renderStep } from '../prototype/flows/render'
import '../prototype/prototype.css'
import { PrivacyPromise } from '../screens/user/01-onboarding/PrivacyPromise'
import { AskFollowUp, AskReviewOffer, AskSummary } from '../screens/user/03-ask/AskScreens'
import { SafetyDangerCheck, SafetyRecentCare } from '../screens/user/04-safety/SafetyScreens'
import { LockScreen } from '../screens/user/05-reviews/LockScreen'
import { ReviewResponse } from '../screens/user/05-reviews/ReviewResponse'
import { FindCare } from '../screens/user/06-care/FindCare'
import { ServiceDetail } from '../screens/user/06-care/ServiceDetail'
import { CircleFeed } from '../screens/user/07-circle/CircleFeed'
import { PostDetail } from '../screens/user/07-circle/PostDetail'
import { CaseQueue } from '../screens/pro/CaseQueue'
import { Overview } from '../screens/admin/Overview'
import { protoUrl, setDocsDirection, useDocsDirection } from './docsDirection'
import { MiniBrowser, MiniPhone } from './kit'

/**
 * Start Here blocks about the clickable prototype and what was built. Screens are
 * live components in the direction picked with <DirectionSwitch />, never screenshots,
 * so the page always shows the current build.
 */

const ink = '#1F1D24'
const muted = '#6B6875'
const line = '#E7E3EA'
const pink = '#C4007F'
const font = "'DM Sans Variable', system-ui, sans-serif"
const story = (id: string) => `./?path=/story/${id}`

/** Previews must not glow, navigate or count taps. */
const STILL: ProtoApi = { go: () => {}, back: () => {}, startFlow: () => {}, menu: () => {}, restart: () => {}, tap: () => {}, finish: () => {}, toast: () => {}, hints: false, prefill: true }

function Live({ children }: { children: ReactNode }) {
  const dir = useDocsDirection()
  return (
    <ProtoCtx.Provider value={STILL}>
      <DirectionProvider id={dir}>
        <div style={{ height: '100%', pointerEvents: 'none' }} aria-hidden>{children}</div>
      </DirectionProvider>
    </ProtoCtx.Provider>
  )
}

/** Pick the brand direction for every live screen on the page. */
export function DirectionSwitch({ label = 'Showing the screens in' }: { label?: string }) {
  const dir = useDocsDirection()
  return (
    <div className="sb-unstyled" style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', margin: '14px 0', fontFamily: font }}>
      <span style={{ fontSize: 13, color: muted }}>{label}</span>
      {DIRECTION_IDS.map((id) => (
        <button key={id} type="button" className="proto-pill" aria-pressed={id === dir} onClick={() => setDocsDirection(id)}>
          {DIRECTIONS[id].letter} · {DIRECTIONS[id].name}
        </button>
      ))}
    </div>
  )
}

function FlowCard({ flow, n }: { flow: Flow; n: number }) {
  const preview = <Live>{renderStep(flow, flow.cover ?? flow.start)}</Live>
  const desktop = flow.device === 'desktop'
  return (
    <a
      href={protoUrl(`#/${flow.id}`)}
      target="_blank"
      rel="noreferrer"
      style={{ display: 'flex', flexDirection: 'column', gap: 12, textDecoration: 'none', color: ink, background: '#fff', border: `1px solid ${line}`, borderRadius: 16, padding: 16, gridColumn: desktop ? 'span 3' : 'span 2' }}
    >
      <div style={{ display: 'grid', placeItems: 'center', background: '#F6F3F8', borderRadius: 12, padding: 16 }}>
        {desktop ? <MiniBrowser scale={0.33}>{preview}</MiniBrowser> : <MiniPhone scale={0.4}>{preview}</MiniPhone>}
      </div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', color: pink, textTransform: 'uppercase' }}>{n} · {flow.who} · {desktop ? 'laptop' : 'phone'}</div>
        <div style={{ fontSize: 17, fontWeight: 800, marginTop: 2 }}>{flow.title}</div>
        <p style={{ fontSize: 13, lineHeight: 1.5, margin: '6px 0 0', color: ink }}>{flow.blurb}</p>
        {flow.tests.length > 0 && <p style={{ fontSize: 12.5, lineHeight: 1.5, margin: '8px 0 0', color: muted }}><b>Tests:</b> {flow.tests.join(' ')}</p>}
      </div>
      <span style={{ marginTop: 'auto', fontSize: 13, fontWeight: 700, color: pink }}>Open the prototype ↗</span>
    </a>
  )
}

/** One card per clickable flow, each opening the prototype at that flow. */
export function Prototypes() {
  return (
    <div className="sb-unstyled" style={{ margin: '20px 0', fontFamily: font }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 14 }}>
        {FLOWS.map((f, i) => <FlowCard key={f.id} flow={f} n={i + 1} />)}
      </div>
      <p style={{ textAlign: 'center', fontSize: 13, color: muted, margin: '14px 0 0' }}>
        All flows use the same fictional people and cases, so the question a young woman asks on her phone is the case the professional answers.{' '}
        <a href={protoUrl()} target="_blank" rel="noreferrer" style={{ color: pink, fontWeight: 700, textDecoration: 'none' }}>Open the menu of all flows ↗</a>
      </p>
    </div>
  )
}

interface Feature {
  kicker: string
  title: string
  banner: R2Slot
  what: string
  point: string
  proto?: { hash: string; label: string }
  links: { id: string; label: string }[]
  screens: ReactNode[]
  desktop?: boolean
}

const FROM_REVIEW = { professional: 'Dr. Efua M.', profession: 'Medical doctor', decision: 'routine', category: 'sexual_health' } as const

const FEATURES: Feature[] = [
  {
    kicker: 'Ask SAYO',
    title: 'Say it in your own words',
    banner: 'tile-ask',
    what: 'A private, AI-supported intake. It opens with “What’s up?”, keeps her exact words, asks only what is needed, one question at a time, and gives clear general information.',
    point: 'It never diagnoses. Every AI message is labelled, a red flag (such as a possible HIV exposure) interrupts the questions with time-sensitive guidance, and she checks the summary before anything is sent.',
    proto: { hash: '#/ask/ask-opener', label: 'Try it from “What’s up?”' },
    links: [
      { id: 'user-03-ask-sayo-opener--default', label: 'Opener' },
      { id: 'user-03-ask-sayo-guided-start--step-1-topic', label: 'Guided start' },
      { id: 'user-03-ask-sayo-red-flag-detected--pep-today', label: 'Red flag' },
      { id: 'user-03-ask-sayo-summary-check--check', label: 'Summary check' },
    ],
    screens: [<AskFollowUp />, <AskSummary />],
  },
  {
    kicker: 'Verified professional review',
    title: 'A real professional, when she wants one',
    banner: 'tile-review',
    what: 'Optional and asynchronous. If she says yes, a verified health professional reads her words and the summary, then replies with their thoughts, an in-person care decision and the kind of service to go to.',
    point: 'It is not live chat and not emergency care, and the app is honest about waiting. “Not now” is always a fine answer. Professional content looks unmistakably different from AI and from peers.',
    proto: { hash: '#/ask/ask-offer', label: 'Try it from the offer' },
    links: [
      { id: 'user-03-ask-sayo-review-offer--offer', label: 'The offer' },
      { id: 'user-05-reviews-waiting--queued', label: 'Waiting' },
      { id: 'user-05-reviews-response--routine-assessment', label: 'Response' },
      { id: 'user-05-reviews-response--urgent-assessment', label: 'Urgent response' },
    ],
    screens: [<AskReviewOffer />, <ReviewResponse decision="routine" />],
  },
  {
    kicker: 'Find Care',
    title: 'Where to go next',
    banner: 'tile-care',
    what: 'Verified clinics, hospitals and support services, by category and distance, with opening hours, a call button and directions.',
    point: 'SAYO does not book appointments in the MVP. It makes the next step concrete: after a review, the list is already filtered to what the professional recommended.',
    proto: { hash: '#/ask/care', label: 'Try it after a review' },
    links: [
      { id: 'user-06-find-care-find-care--default', label: 'List' },
      { id: 'user-06-find-care-find-care--recommended-from-review', label: 'From a review' },
      { id: 'user-06-find-care-service-detail--youth-friendly-clinic', label: 'Service detail' },
    ],
    screens: [<FindCare fromReview={FROM_REVIEW} />, <ServiceDetail serviceId="s1" />],
  },
  {
    kicker: 'The Circle',
    title: 'Not the only one',
    banner: 'tile-circle',
    what: 'A pseudonymous peer community: a nickname and a generated avatar, topics from contraception to consent, posts, replies and reactions without counts.',
    point: 'Peer-led, not clinician-led. Verified Professional replies carry a badge and their own tint. No photos, no direct messages, and nothing from her private Ask SAYO history ever shows here.',
    proto: { hash: '#/circle', label: 'Try the Circle' },
    links: [
      { id: 'user-07-circle-feed--default', label: 'Feed' },
      { id: 'user-07-circle-post-detail--default', label: 'Post' },
      { id: 'user-07-circle-compose-post--identifying-details-warning', label: 'Compose warning' },
      { id: 'user-07-circle-report--choose-reason', label: 'Report' },
    ],
    screens: [<CircleFeed />, <PostDetail />],
  },
  {
    kicker: 'Safety',
    title: 'Safety before the questionnaire',
    banner: 'wide',
    what: 'When someone discloses violence or abuse, SAYO first asks whether she is in immediate danger and whether this device is safe, then shows urgent or time-sensitive options before anything else.',
    point: 'Quick exit is one tap away on every safety screen and lands on a neutral page. The wording is calm in every brand direction, and the time-sensitive content is marked as needing clinical and legal sign-off.',
    proto: { hash: '#/safety', label: 'Try the safety flow' },
    links: [
      { id: 'user-04-safety-entry--default', label: 'Entry' },
      { id: 'user-04-safety-immediate-danger-check--default', label: 'Danger check' },
      { id: 'user-04-safety-in-danger-now--default', label: 'In danger now' },
      { id: 'user-04-safety-quick-exit-landing--default', label: 'Quick exit' },
    ],
    screens: [<SafetyDangerCheck />, <SafetyRecentCare signOff={false} />],
  },
  {
    kicker: 'Privacy',
    title: 'Private by design',
    banner: 'hero',
    what: 'One plain privacy promise with a one-line 18+ confirmation, a 4-digit PIN on private conversations, and notifications whose lock-screen text never names a health topic.',
    point: 'On a shared phone, discretion is a safety feature. SAYO asks for a nickname and a way to log in, never a real name, photo or ID.',
    proto: { hash: '#/ask/privacy', label: 'Try onboarding' },
    links: [
      { id: 'user-01-onboarding-privacy-promise-18--default', label: 'Privacy promise' },
      { id: 'user-01-onboarding-create-pin--create', label: 'PIN' },
      { id: 'user-05-reviews-lock-screen--response-ready', label: 'Lock screen' },
      { id: 'user-08-me-privacy-privacy-security--default', label: 'Privacy settings' },
    ],
    screens: [<PrivacyPromise confirmed />, <LockScreen />],
  },
  {
    kicker: 'Behind the scenes',
    title: 'For professionals and the pilot team',
    banner: 'tile-review',
    what: 'A professional dashboard (queue, case, response, audit trail) and an admin console (approve professionals, moderate the Circle, watch waiting cases, export de-identified pilot metrics).',
    point: 'Professionals see only what they need to answer: her words, the follow-ups and the AI summary, never her name or Circle identity. Every accept and completion is logged.',
    proto: { hash: '#/pro', label: 'Try the professional flow' },
    links: [
      { id: 'professional-case-queue--default', label: 'Case queue' },
      { id: 'professional-response-composer--drafted', label: 'Response composer' },
      { id: 'admin-overview--default', label: 'Admin overview' },
      { id: 'admin-circle-moderation--victim-blaming', label: 'Moderation' },
    ],
    screens: [<CaseQueue />, <Overview />],
    desktop: true,
  },
]

function Label({ children }: { children: ReactNode }) {
  return <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: muted }}>{children}</div>
}

function FeaturePanel({ f }: { f: Feature }) {
  const dir = useDocsDirection()
  return (
    <div className="sb-unstyled" style={{ border: `1px solid ${line}`, borderRadius: 20, overflow: 'hidden', margin: '24px 0', background: '#fff', color: ink, fontFamily: font }}>
      <div style={{ position: 'relative', height: 150 }}>
        <DirectionProvider id={dir}><R2Img direction={dir} slot={f.banner} height={150} /></DirectionProvider>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, #fff 4%, rgb(255 255 255 / 0.55) 55%, rgb(255 255 255 / 0) 100%)' }} />
        <div style={{ position: 'absolute', left: 24, bottom: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: pink }}>{f.kicker}</div>
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.01em' }}>{f.title}</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: f.desktop ? '1fr' : '1fr auto', gap: 24, padding: '8px 24px 24px' }}>
        <div>
          <Label>What it is</Label>
          <p style={{ fontSize: 14, lineHeight: 1.6, margin: '4px 0 0' }}>{f.what}</p>
          <div style={{ height: 14 }} />
          <Label>The point</Label>
          <p style={{ fontSize: 14, lineHeight: 1.6, margin: '4px 0 0', color: '#4B4855' }}>{f.point}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 16px', marginTop: 16, fontSize: 13 }}>
            {f.proto && <a href={protoUrl(f.proto.hash)} target="_blank" rel="noreferrer" style={{ color: '#fff', background: ink, fontWeight: 700, textDecoration: 'none', padding: '6px 12px', borderRadius: 999 }}>{f.proto.label} ↗</a>}
            {f.links.map((l) => <a key={l.id} href={story(l.id)} target="_top" style={{ color: pink, fontWeight: 700, textDecoration: 'none', alignSelf: 'center' }}>{l.label} →</a>)}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 14, justifyContent: f.desktop ? 'flex-start' : undefined }}>
          {f.screens.map((s, i) => (f.desktop ? <MiniBrowser key={i} scale={0.34}><Live>{s}</Live></MiniBrowser> : <MiniPhone key={i} scale={0.36}><Live>{s}</Live></MiniPhone>))}
        </div>
      </div>
    </div>
  )
}

/** "What we made, and why": one panel per part of the product. */
export function Features() {
  return <>{FEATURES.map((f) => <FeaturePanel key={f.kicker} f={f} />)}</>
}
