// The core journey, wired start to finish from the real Storybook screens:
// onboarding → Ask SAYO → summary → professional review → discreet notification → Find Care.
// Every step renders one screen in a prefilled state; taps are routed by the screen's own
// button labels (see ../hotspots.tsx). The first rule of each step is the main path.
import { DIRECTIONS } from '../../brand/directions'
import { Splash } from '../../screens/user/01-onboarding/Splash'
import { Intro } from '../../screens/user/01-onboarding/Intro'
import { PrivacyPromise } from '../../screens/user/01-onboarding/PrivacyPromise'
import { AgeGate } from '../../screens/user/01-onboarding/AgeGate'
import { CreateAccount } from '../../screens/user/01-onboarding/CreateAccount'
import { CreatePin } from '../../screens/user/01-onboarding/CreatePin'
import { NotificationPriming } from '../../screens/user/01-onboarding/NotificationPriming'
import { UnlockPin } from '../../screens/user/01-onboarding/UnlockPin'
import { HomeBento } from '../../screens/user/02-home/HomeBento'
import { GuidedStart } from '../../screens/user/03-ask/GuidedStart'
import { AskBasicInfo, AskChatState, AskFollowUp, AskFreeText, AskOpener, AskRedFlag, AskReviewOffer, AskSent, AskSummary } from '../../screens/user/03-ask/AskScreens'
import { LockScreen } from '../../screens/user/05-reviews/LockScreen'
import { MyReviews } from '../../screens/user/05-reviews/MyReviews'
import { ReviewResponse } from '../../screens/user/05-reviews/ReviewResponse'
import { ReviewWaiting } from '../../screens/user/05-reviews/ReviewWaiting'
import { FindCare } from '../../screens/user/06-care/FindCare'
import { ServiceDetail } from '../../screens/user/06-care/ServiceDetail'
import { AutoAdvance, BACK, Finish, Proto, SkipAhead, Tappable, flowTo, toastTo, type AppRule } from '../helpers'
import type { Flow, FlowStep } from './types'

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
/** A label that differs by brand direction (e.g. "Get started" / "Let’s begin"), matched exactly. */
const perDirection = (pick: (c: (typeof DIRECTIONS)[keyof typeof DIRECTIONS]['copy']) => string) =>
  new RegExp(`^(${[...new Set(Object.values(DIRECTIONS).map((d) => esc(pick(d.copy))))].join('|')})$`)

const CTA = perDirection((c) => c.ctaPrimary)
const SUMMARY_OK = perDirection((c) => c.summaryConfirm)
const DIGIT = /^[0-9]$/
const CALL = toastTo('Would start a phone call')
const MAPS = toastTo('Would open your maps app')
const SKIP = 'Skip ahead: a professional replies'
const FROM_REVIEW = { professional: 'Dr. Efua M.', profession: 'Medical doctor', decision: 'routine', category: 'sexual_health' } as const

/** The bottom tabs, wherever they show. Quiet: the main path never runs through them. */
const tabs = (home: string): AppRule[] => [
  { match: /^Home$/, to: home, quiet: true },
  { match: /^Circle$/, to: flowTo('circle'), quiet: true },
  { match: /^Ask$/, to: 'ask-opener', quiet: true },
  { match: /^Find Care$/, to: 'care-all', quiet: true },
  { match: /^Me$/, to: toastTo('Me & Privacy is in Storybook: User → 08'), quiet: true },
]

const steps: FlowStep[] = [
  /* ───────────── 1. Onboarding ───────────── */
  {
    id: 'splash',
    title: 'Welcome',
    render: () => (
      <Proto rules={[{ match: CTA, to: 'intro-1' }, { match: 'I already have an account', to: 'unlock-returning', quiet: true }]}>
        <Splash />
      </Proto>
    ),
  },
  {
    id: 'intro-1',
    title: 'Intro 1: ask',
    render: () => (
      <Proto rules={[{ match: /^Next$/, to: 'intro-2' }, { match: /^Skip$/, to: 'privacy', quiet: true }]}>
        <Intro step={0} />
      </Proto>
    ),
  },
  {
    id: 'intro-2',
    title: 'Intro 2: professional review',
    render: () => (
      <Proto rules={[{ match: /^Next$/, to: 'intro-3' }, { match: /^Skip$/, to: 'privacy', quiet: true }]}>
        <Intro step={1} />
      </Proto>
    ),
  },
  {
    id: 'intro-3',
    title: 'Intro 3',
    render: () => (
      <Proto rules={[{ match: CTA, to: 'privacy' }]}>
        <Intro step={2} />
      </Proto>
    ),
  },
  {
    id: 'privacy',
    title: 'Privacy promise + 18+',
    render: () => (
      <Proto rules={[{ match: /^Continue$/, to: 'account' }, { match: 'I’m under 18', to: 'under-18', quiet: true }]}>
        <PrivacyPromise confirmed />
      </Proto>
    ),
  },
  {
    id: 'under-18',
    title: 'Under 18 (side path)',
    render: () => (
      <Proto rules={[{ match: 'Close SAYO', to: 'splash', quiet: true }]}>
        <AgeGate underage />
      </Proto>
    ),
  },
  {
    id: 'account',
    title: 'Create account',
    render: () => (
      <Proto rules={[{ match: /^Create account$/, to: 'pin' }]}>
        <CreateAccount filled method="phone" />
      </Proto>
    ),
  },
  {
    id: 'pin',
    title: 'Create PIN',
    render: () => (
      <Proto rules={[{ match: DIGIT, to: 'pin-confirm' }]}>
        <CreatePin stage="create" filled={3} />
      </Proto>
    ),
  },
  {
    id: 'pin-confirm',
    title: 'Confirm PIN',
    render: () => (
      <Proto rules={[{ match: DIGIT, to: 'notifications' }]}>
        <CreatePin stage="confirm" filled={3} />
      </Proto>
    ),
  },
  {
    id: 'notifications',
    title: 'Discreet notifications',
    render: () => (
      <Proto rules={[{ match: 'Turn on notifications', to: 'home-first' }, { match: /^Not now$/, to: 'home-first', quiet: true }]}>
        <NotificationPriming />
      </Proto>
    ),
  },

  /* ───────────── 2. Home and Ask SAYO ───────────── */
  {
    id: 'home-first',
    title: 'Home (first visit)',
    render: () => (
      <Proto
        rules={[
          { match: /^Ask SAYO$/, to: 'ask-opener' },
          { match: 'Not sure where to begin', to: 'guided-1' },
          { match: /^Professional review$/, to: toastTo('Nothing sent for review yet'), quiet: true },
          { match: /^The Circle$/, to: flowTo('circle'), quiet: true },
          ...tabs('home-first'),
        ]}
      >
        <HomeBento isNew />
      </Proto>
    ),
  },
  {
    id: 'guided-1',
    title: 'Guided start: topic (side path)',
    render: () => (
      <Proto
        rules={[
          { match: 'Sex and my body', to: 'guided-2' },
          { match: 'Something happened to me', to: flowTo('safety'), quiet: true },
          { match: 'HIV, PrEP or PEP', to: 'red-flag', quiet: true },
          { match: /^(Contraception or pregnancy|How I’m feeling|Alcohol or drugs|Something else)$/, to: 'guided-2', quiet: true },
          { match: 'I’d rather just type it', to: 'ask-opener', quiet: true },
        ]}
      >
        <GuidedStart step={1} />
      </Proto>
    ),
  },
  {
    id: 'guided-2',
    title: 'Guided start: timing (side path)',
    render: () => (
      <Proto
        rules={[
          { match: 'This week', to: 'guided-3' },
          { match: /^(Today or yesterday|In the last 3 days|More than a week ago|I just have a question|Not sure, it’s been on and off)$/, to: 'guided-3', quiet: true },
          { match: /^Change$/, to: 'guided-1', quiet: true },
          { match: 'I’d rather just type it', to: 'ask-opener', quiet: true },
        ]}
      >
        <GuidedStart step={2} />
      </Proto>
    ),
  },
  {
    id: 'guided-3',
    title: 'Guided start: in her words (side path)',
    render: () => (
      <Proto rules={[{ match: /^Send$/, to: 'ask-words' }]}>
        <GuidedStart step={3} />
      </Proto>
    ),
  },
  {
    id: 'ask-opener',
    title: 'Ask SAYO: “What’s up?”',
    render: () => (
      <Proto
        rules={[
          { match: 'Sex & my body', to: 'ask-words' },
          { match: 'PrEP & PEP', to: 'red-flag' },
          { match: 'Violence, abuse or sexual assault', to: flowTo('safety'), quiet: true },
          { match: /^(HIV & STIs|Contraception|Pregnancy|Mood & feelings|Alcohol & drugs|Consent & relationships|Something else|Send)$/, to: 'ask-words', quiet: true },
        ]}
      >
        <AskOpener />
      </Proto>
    ),
  },
  {
    id: 'ask-words',
    title: 'In her own words',
    render: () => (
      <Proto rules={[{ match: /^Send$/, to: 'ask-sent-words' }]}>
        <AskFreeText stage="writing" />
      </Proto>
    ),
  },
  {
    id: 'ask-sent-words',
    title: 'Sent, kept word for word',
    render: () => (
      <Proto rules={[]}>
        <AskFreeText stage="sent" />
        <AutoAdvance to="ask-typing" ms={1400} />
      </Proto>
    ),
  },
  {
    id: 'ask-typing',
    title: 'SAYO is typing',
    render: () => (
      <Proto rules={[]}>
        <AskChatState state="typing" />
        <AutoAdvance to="ask-follow-up" ms={1600} />
      </Proto>
    ),
  },
  {
    id: 'ask-follow-up',
    title: 'Follow-up questions',
    render: () => (
      <Proto
        rules={[
          { match: /^Yes$/, to: 'ask-streaming' },
          { match: /^(No|Not sure|I don’t know|I’d rather not say)$/, to: 'ask-streaming', quiet: true },
        ]}
      >
        <AskFollowUp />
      </Proto>
    ),
  },
  {
    id: 'ask-streaming',
    title: 'SAYO answers',
    render: () => (
      <Proto rules={[{ match: /^Stop$/, to: 'ask-info', quiet: true }]}>
        <AskChatState state="streaming" />
        <AutoAdvance to="ask-info" ms={2200} />
      </Proto>
    ),
  },
  {
    id: 'ask-info',
    title: 'General information (not a diagnosis)',
    render: () => (
      <Proto rules={[{ match: 'Check my summary', to: 'ask-summary' }, { match: 'I have another question', to: 'ask-opener', quiet: true }]}>
        <AskBasicInfo />
      </Proto>
    ),
  },
  {
    id: 'red-flag',
    title: 'Red flag: PEP is time-sensitive (side path)',
    render: () => (
      <Proto
        rules={[
          { match: 'Find PEP near me', to: 'care-pep' },
          { match: 'Also send for review', to: 'ask-queued' },
          { match: 'Continue questions', to: 'ask-follow-up', quiet: true },
        ]}
      >
        <AskRedFlag signOff={false} />
      </Proto>
    ),
  },
  {
    id: 'ask-summary',
    title: 'Check the summary',
    render: () => (
      <Proto
        rules={[
          { match: SUMMARY_OK, to: 'ask-offer' },
          { match: /^Edit summary$/, to: 'ask-summary-edit', quiet: true },
          { match: /^Change:/, to: 'ask-summary-edit', quiet: true },
        ]}
      >
        <AskSummary />
      </Proto>
    ),
  },
  {
    id: 'ask-summary-edit',
    title: 'Correct the summary (side path)',
    render: () => (
      <Proto rules={[{ match: 'Save changes', to: 'ask-summary' }, { match: /^Cancel$/, to: BACK, quiet: true }]}>
        <AskSummary editing />
      </Proto>
    ),
  },
  {
    id: 'ask-offer',
    title: 'Offer: professional review',
    render: () => (
      <Proto rules={[{ match: 'Yes, send for review', to: 'ask-queued' }, { match: /^Not now$/, to: 'ask-not-now', quiet: true }]}>
        <AskReviewOffer />
      </Proto>
    ),
  },
  {
    id: 'ask-not-now',
    title: '“Not now” is fine (side path)',
    render: () => (
      <Proto rules={[{ match: 'Back to home', to: 'home-first' }, { match: 'Find Care near me', to: 'care-all', quiet: true }]}>
        <AskReviewOffer declined />
      </Proto>
    ),
  },
  {
    id: 'ask-queued',
    title: 'Sent for review',
    render: () => (
      <Proto rules={[{ match: 'Back to home', to: 'home-waiting' }, { match: 'Find Care near me', to: 'care-all', quiet: true }]}>
        <AskSent />
      </Proto>
    ),
  },

  /* ───────────── 3. Waiting, the reply, and care ───────────── */
  {
    id: 'home-waiting',
    title: 'Home (review in the queue)',
    render: () => (
      <Proto
        rules={[
          { match: /^Professional review$/, to: 'waiting' },
          { match: /^Ask SAYO$/, to: 'ask-opener', quiet: true },
          { match: /^The Circle$/, to: flowTo('circle'), quiet: true },
          { match: 'Not sure where to begin', to: 'guided-1', quiet: true },
          ...tabs('home-waiting'),
        ]}
      >
        <HomeBento />
      </Proto>
    ),
  },
  {
    id: 'waiting',
    title: 'Waiting: what happens next',
    render: () => (
      <Proto rules={[{ match: SKIP, to: 'lock-screen' }, { match: 'Find care now instead', to: 'care-all', quiet: true }]}>
        <ReviewWaiting state="queued" />
        <SkipAhead label={SKIP} />
      </Proto>
    ),
  },
  {
    id: 'lock-screen',
    title: 'Discreet notification',
    render: () => (
      <Proto rules={[{ match: 'Open the notification', to: 'unlock' }]}>
        <LockScreen />
        <Tappable find={(root) => root.querySelector('.sayo-lock-notification')} label="Open the notification" />
      </Proto>
    ),
  },
  {
    id: 'unlock',
    title: 'Unlock with PIN',
    render: () => (
      <Proto rules={[{ match: DIGIT, to: 'home-ready' }, { match: 'Forgot PIN', to: toastTo('See User → 01 Onboarding → Unlock with PIN'), quiet: true }]}>
        <UnlockPin filled={3} />
      </Proto>
    ),
  },
  {
    id: 'unlock-returning',
    title: 'Returning user: unlock (side path)',
    render: () => (
      <Proto rules={[{ match: DIGIT, to: 'home-waiting' }]}>
        <UnlockPin filled={3} />
      </Proto>
    ),
  },
  {
    id: 'home-ready',
    title: 'Home (reply is ready)',
    render: () => (
      <Proto
        rules={[
          { match: 'Read response', to: 'response' },
          { match: /^Professional review$/, to: 'my-reviews', quiet: true },
          { match: /^Ask SAYO$/, to: 'ask-opener', quiet: true },
          { match: /^The Circle$/, to: flowTo('circle'), quiet: true },
          ...tabs('home-ready'),
        ]}
      >
        <HomeBento hasReadyReview />
      </Proto>
    ),
  },
  {
    id: 'my-reviews',
    title: 'My Reviews (side path)',
    render: () => (
      <Proto
        rules={[
          { match: 'Sexual health question', to: 'response' },
          { match: 'HIV / PEP question', to: 'waiting', quiet: true },
          { match: 'Mood and sleep', to: toastTo('Being reviewed: see User → 05 Reviews → Waiting'), quiet: true },
          ...tabs('home-ready'),
        ]}
      >
        <MyReviews />
      </Proto>
    ),
  },
  {
    id: 'response',
    title: 'The professional’s response',
    render: () => (
      <Proto
        rules={[
          { match: 'See all matching services', to: 'care' },
          { match: 'Asante Youth Wellness Centre details', to: 'service' },
          { match: /^Yes$/, to: 'response-helpful', quiet: true },
          { match: /^Call$/, to: CALL, quiet: true },
          { match: /^Directions$/, to: MAPS, quiet: true },
          { match: 'Start a new question', to: 'ask-opener', quiet: true },
        ]}
      >
        <ReviewResponse decision="routine" />
      </Proto>
    ),
  },
  {
    id: 'response-helpful',
    title: 'Feedback: helpful (side path)',
    render: () => (
      <Proto rules={[{ match: 'See all matching services', to: 'care' }, { match: 'Asante Youth Wellness Centre details', to: 'service', quiet: true }]}>
        <ReviewResponse decision="routine" feedback="helpful" />
      </Proto>
    ),
  },
  {
    id: 'care',
    title: 'Find Care, filtered from the review',
    render: () => (
      <Proto
        rules={[
          { match: 'Asante Youth Wellness Centre details', to: 'service' },
          { match: /^Call$/, to: CALL, quiet: true },
          { match: /^Directions$/, to: MAPS, quiet: true },
          ...tabs('home-ready'),
        ]}
      >
        <FindCare fromReview={FROM_REVIEW} />
      </Proto>
    ),
  },
  {
    id: 'care-all',
    title: 'Find Care, all services (side path)',
    render: () => (
      <Proto
        rules={[
          { match: 'Asante Youth Wellness Centre details', to: 'service' },
          { match: /^Call$/, to: CALL, quiet: true },
          { match: /^Directions$/, to: MAPS, quiet: true },
          ...tabs('home-first'),
        ]}
      >
        <FindCare />
      </Proto>
    ),
  },
  {
    id: 'care-pep',
    title: 'Find Care: HIV / PrEP / PEP (side path)',
    render: () => (
      <Proto rules={[{ match: /details$/, to: 'service' }, { match: /^Call$/, to: CALL, quiet: true }, { match: /^Directions$/, to: MAPS, quiet: true }, ...tabs('home-first')]}>
        <FindCare category="hiv" />
      </Proto>
    ),
  },
  {
    id: 'service',
    title: 'The right care: service details',
    render: () => (
      <Proto rules={[{ match: /^Call$/, to: CALL }, { match: /^Directions$/, to: MAPS }, { match: 'Report wrong information', to: toastTo('Would open a short report form'), quiet: true }]}>
        <ServiceDetail serviceId="s1" />
        <Finish />
      </Proto>
    ),
  },
]

export const askFlow: Flow = {
  id: 'ask',
  title: 'Ask SAYO, start to finish',
  short: 'From first launch to the right care',
  blurb:
    'The core journey: welcome, 18+ and PIN, then one question in her own words, follow-ups, a summary she checks, an optional professional review, a discreet notification and the right place to go.',
  who: 'Young woman',
  device: 'phone',
  start: 'splash',
  cover: 'ask-summary',
  steps,
  tests: ['Does she understand what is AI and what is a professional?', 'Would she send it for review?', 'Is the next step clear at the end?'],
}
