import { useState, type ReactNode } from 'react'
import { DirectionProvider } from '../brand/DirectionContext'
import { DIRECTIONS, DIRECTION_IDS, type DirectionId } from '../brand/directions'
import { MiniPhone } from './kit'
import { Splash } from '../screens/user/01-onboarding/Splash'
import { PrivacyPromise } from '../screens/user/01-onboarding/PrivacyPromise'
import { CreatePin } from '../screens/user/01-onboarding/CreatePin'
import { Home } from '../screens/user/02-home/Home'
import { AskFollowUp, AskFreeText, AskOpener, AskRedFlag, AskReviewOffer, AskSent, AskSummary } from '../screens/user/03-ask/AskScreens'
import { LockScreen } from '../screens/user/05-reviews/LockScreen'
import { ReviewResponse } from '../screens/user/05-reviews/ReviewResponse'
import { FindCare } from '../screens/user/06-care/FindCare'

interface Step {
  n: number
  label: string
  note: string
  story: string
  screen: ReactNode
}

const STEPS: Step[] = [
  { n: 1, label: 'Welcome', note: 'Tagline in the direction’s voice', story: 'user-01-onboarding-splash--default', screen: <Splash /> },
  { n: 2, label: 'Privacy + 18+', note: 'One promise, one-line age confirm', story: 'user-01-onboarding-privacy-promise-18--confirmed', screen: <PrivacyPromise confirmed /> },
  { n: 3, label: 'PIN', note: 'Locks private conversations', story: 'user-01-onboarding-create-pin--create', screen: <CreatePin /> },
  { n: 4, label: 'Home', note: 'One big door into Ask SAYO', story: 'user-02-home-home--default', screen: <Home /> },
  { n: 5, label: '“What’s up?”', note: 'Locked opener + topic starters', story: 'user-03-ask-sayo-opener--default', screen: <AskOpener /> },
  { n: 6, label: 'In her own words', note: 'Kept verbatim, always', story: 'user-03-ask-sayo-free-text--writing', screen: <AskFreeText stage="writing" /> },
  { n: 7, label: 'Follow-ups', note: 'One at a time, “I don’t know” allowed', story: 'user-03-ask-sayo-follow-up-questions--mid-conversation', screen: <AskFollowUp /> },
  { n: 8, label: 'Red-flag check', note: 'Time-sensitive info interrupts', story: 'user-03-ask-sayo-red-flag-detected--pep-today', screen: <AskRedFlag signOff={false} /> },
  { n: 9, label: 'Check the summary', note: 'Tap any fact to correct it', story: 'user-03-ask-sayo-summary-check--check', screen: <AskSummary /> },
  { n: 10, label: 'Review offer', note: 'Optional; “Not now” is fine', story: 'user-03-ask-sayo-review-offer--offer', screen: <AskReviewOffer /> },
  { n: 11, label: 'Sent for review', note: 'Locked queue wording', story: 'user-03-ask-sayo-sent-to-queue--default', screen: <AskSent /> },
  { n: 12, label: 'Discreet notification', note: 'Never names a topic', story: 'user-05-reviews-lock-screen--response-ready', screen: <LockScreen /> },
  { n: 13, label: 'Professional response', note: 'My thoughts · care decision · where to go', story: 'user-05-reviews-response--routine-assessment', screen: <ReviewResponse decision="routine" /> },
  {
    n: 14, label: 'Find Care', note: 'Pre-filtered from the review', story: 'user-06-find-care-find-care--recommended-from-review',
    screen: <FindCare fromReview={{ professional: 'Dr. Efua M.', profession: 'Medical doctor', decision: 'routine', category: 'sexual_health' }} />,
  },
]

/** The core MVP journey as live screens, in any direction. */
export function Journey() {
  const [dir, setDir] = useState<DirectionId>('clay')
  return (
    <div className="sb-unstyled" style={{ margin: '20px 0', fontFamily: "'DM Sans Variable', system-ui, sans-serif" }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
        {DIRECTION_IDS.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setDir(id)}
            style={{
              padding: '6px 14px', borderRadius: 999, cursor: 'pointer', fontWeight: 700, fontSize: 13,
              border: '1px solid #E7E3EA', background: dir === id ? '#1F1D24' : '#fff', color: dir === id ? '#fff' : '#1F1D24',
            }}
          >
            {DIRECTIONS[id].letter} · {DIRECTIONS[id].name}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 22, overflowX: 'auto', padding: '6px 4px 22px' }}>
        {STEPS.map((s) => (
          <a key={s.n} href={`./?path=/story/${s.story}`} target="_top" style={{ textDecoration: 'none', color: '#1F1D24', flex: 'none', width: 390 * 0.46 }}>
            <MiniPhone scale={0.46}>
              <DirectionProvider id={dir}>{s.screen}</DirectionProvider>
            </MiniPhone>
            <div style={{ marginTop: 12, fontSize: 11, fontWeight: 800, color: '#C4007F', letterSpacing: '0.08em' }}>STEP {s.n}</div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{s.label}</div>
            <div style={{ fontSize: 12, color: '#6B6875', lineHeight: 1.4 }}>{s.note}</div>
          </a>
        ))}
      </div>
    </div>
  )
}
