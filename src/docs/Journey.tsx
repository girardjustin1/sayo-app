import type { ReactNode } from 'react'
import { DirectionProvider } from '../brand/DirectionContext'
import '../prototype/modals'
import { MiniPhone } from './kit'
import { protoUrl, useDocsDirection } from './docsDirection'
import { Splash } from '../screens/user/01-onboarding/Splash'
import { PrivacyPromise } from '../screens/user/01-onboarding/PrivacyPromise'
import { CreatePin } from '../screens/user/01-onboarding/CreatePin'
import { HomeBento } from '../screens/user/02-home/HomeBento'
import { AskFollowUp, AskFreeText, AskOpener, AskRedFlag, AskReviewOffer, AskSent, AskSummary } from '../screens/user/03-ask/AskScreens'
import { LockScreen } from '../screens/user/05-reviews/LockScreen'
import { ReviewResponse } from '../screens/user/05-reviews/ReviewResponse'
import { FindCare } from '../screens/user/06-care/FindCare'

interface Step {
  label: string
  note: string
  /** Step id in the "ask" prototype flow (src/prototype/flows/ask.tsx). */
  proto: string
  screen: ReactNode
}

const STEPS: Step[] = [
  { label: 'Welcome', note: 'The tagline, in the direction’s voice.', proto: 'splash', screen: <Splash /> },
  { label: 'Privacy + 18+', note: 'One promise and a one-line age confirmation.', proto: 'privacy', screen: <PrivacyPromise confirmed /> },
  { label: 'PIN', note: 'Four digits lock her private conversations.', proto: 'pin', screen: <CreatePin /> },
  { label: 'Home', note: 'One big door into Ask SAYO.', proto: 'home-first', screen: <HomeBento isNew /> },
  { label: '“What’s up?”', note: 'The fixed opener, with topics named plainly.', proto: 'ask-opener', screen: <AskOpener /> },
  { label: 'In her own words', note: 'Kept word for word, always.', proto: 'ask-words', screen: <AskFreeText stage="writing" /> },
  { label: 'Follow-ups', note: 'One at a time; “I don’t know” is allowed.', proto: 'ask-follow-up', screen: <AskFollowUp /> },
  { label: 'Red-flag check', note: 'Time-sensitive guidance interrupts the questions.', proto: 'red-flag', screen: <AskRedFlag signOff={false} /> },
  { label: 'Check the summary', note: 'She taps any fact to correct it.', proto: 'ask-summary', screen: <AskSummary /> },
  { label: 'Review offer', note: 'Optional. “Not now” is a fine answer.', proto: 'ask-offer', screen: <AskReviewOffer /> },
  { label: 'Sent for review', note: 'The fixed queue wording, and what happens next.', proto: 'ask-queued', screen: <AskSent /> },
  { label: 'Discreet notification', note: 'It never names a health topic.', proto: 'lock-screen', screen: <LockScreen /> },
  { label: 'Professional response', note: 'Their thoughts, a care decision, where to go.', proto: 'response', screen: <ReviewResponse decision="routine" /> },
  {
    label: 'Find Care', note: 'Already filtered to what the professional recommended.', proto: 'care',
    screen: <FindCare fromReview={{ professional: 'Dr. Efua M.', profession: 'Medical doctor', decision: 'routine', category: 'sexual_health' }} />,
  },
]

/** The core journey as live screens. Each step opens the clickable prototype at that point. */
export function Journey() {
  const dir = useDocsDirection()
  return (
    <div className="sb-unstyled" style={{ margin: '12px 0 20px', fontFamily: "'DM Sans Variable', system-ui, sans-serif" }}>
      <div style={{ display: 'flex', gap: 22, overflowX: 'auto', padding: '6px 4px 22px' }}>
        {STEPS.map((s, i) => (
          <a key={s.proto} href={protoUrl(`#/ask/${s.proto}`)} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: '#1F1D24', flex: 'none', width: 390 * 0.46 }}>
            <MiniPhone scale={0.46}>
              <DirectionProvider id={dir}><div data-proto-still inert style={{ height: '100%' }}>{s.screen}</div></DirectionProvider>
            </MiniPhone>
            <div style={{ marginTop: 12, fontSize: 11, fontWeight: 800, color: '#C4007F', letterSpacing: '0.08em' }}>STEP {i + 1}</div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{s.label}</div>
            <div style={{ fontSize: 12, color: '#6B6875', lineHeight: 1.4 }}>{s.note}</div>
          </a>
        ))}
      </div>
    </div>
  )
}
