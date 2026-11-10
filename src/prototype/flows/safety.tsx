// The GBV / sexual-violence safety flow, wired from the real Storybook screens:
// disclosure → immediate danger? → is this device safe? → time-sensitive care → support services.
// Side paths: in danger now, device not safe, a historical disclosure, professional review,
// and Quick exit from every safety screen. Safety wording is the screens' own; nothing is reworded here.
// Every step renders one screen in a prefilled state; taps are routed by the screen's own
// labels (see ../hotspots.tsx). The first rule of each step is the main path.
import { AskReviewOffer } from '../../screens/user/03-ask/AskScreens'
import {
  QuickExitLanding, SafetyDangerCheck, SafetyDangerNow, SafetyDeviceCheck, SafetyEntry, SafetyHistorical, SafetyRecentCare,
} from '../../screens/user/04-safety/SafetyScreens'
import { FindCare } from '../../screens/user/06-care/FindCare'
import { ServiceDetail } from '../../screens/user/06-care/ServiceDetail'
import { BACK, Finish, Proto, SkipAhead, flowTo, toastTo, type AppRule } from '../helpers'
import { CardRings, Lift } from './shared'
import type { Flow, FlowStep } from './types'

const CALL = toastTo('Would start a phone call')
const MAPS = toastTo('Would open your maps app')
const SKIP_HISTORICAL = 'Side path: it happened a while ago'
const RETURN = 'Prototype: back to the last screen'

/** On every safety screen. Quiet: it is always in the same place and never the main path. */
const QUICK_EXIT: AppRule = { match: /^Quick exit$/, to: 'quick-exit', quiet: true }

const steps: FlowStep[] = [
  /* ───────────── 1. Believe her, then two safety questions ───────────── */
  {
    id: 'entry',
    title: 'Disclosure: she is believed',
    render: () => (
      <Proto
        rules={[
          { match: /^Okay$/, to: 'danger-check' },
          { match: 'Just show me support services', to: 'support', quiet: true },
          { match: /^Back$/, to: toastTo('Would go back to Ask SAYO'), quiet: true },
          QUICK_EXIT,
        ]}
      >
        <SafetyEntry />
      </Proto>
    ),
  },
  {
    id: 'danger-check',
    title: 'Question 1: in immediate danger?',
    // All three answers glow: the hint ring must not steer her answer to a safety question.
    render: () => (
      <Proto rules={[{ match: /^No\. /, to: 'device-check' }, { match: /^Yes\. /, to: 'danger-now' }, { match: /^Not sure\. /, to: 'danger-now' }, QUICK_EXIT]}>
        <SafetyDangerCheck />
        <CardRings />
      </Proto>
    ),
  },
  {
    id: 'danger-now',
    title: 'In danger now (side path)',
    render: () => (
      <Proto rules={[{ match: /^Call 112/, to: CALL }, { match: /^Call Safe Haven Support Line/, to: CALL }, QUICK_EXIT]}>
        <SafetyDangerNow />
        <CardRings />
      </Proto>
    ),
  },
  {
    id: 'device-check',
    title: 'Question 2: is this device safe?',
    render: () => (
      <Proto
        rules={[
          { match: /^Yes, it/, to: 'recent-care' },
          { match: /^No, it/, to: 'device-not-safe' },
          { match: /^Not sure/, to: 'device-not-safe' },
          { match: SKIP_HISTORICAL, to: 'historical', quiet: true },
          QUICK_EXIT,
        ]}
      >
        <SafetyDeviceCheck />
        <CardRings />
        {/* Above the answers, in the empty part of the chat. */}
        <Lift bottom={240}>
          <SkipAhead label={SKIP_HISTORICAL} />
        </Lift>
      </Proto>
    ),
  },
  {
    id: 'device-not-safe',
    title: 'Device not safe (side path)',
    render: () => (
      <Proto rules={[{ match: /^Show me support services$/, to: 'support' }, { match: /^Continue carefully$/, to: 'recent-care' }, QUICK_EXIT]}>
        <SafetyDeviceCheck notSafe />
      </Proto>
    ),
  },

  /* ───────────── 2. Care that cannot wait, then where to go ───────────── */
  {
    id: 'recent-care',
    title: 'Time-sensitive care',
    render: () => (
      <Proto
        rules={[
          { match: 'Find GBV & sexual assault support', to: 'support' },
          { match: /^Ask a verified professional$/, to: 'review' },
          QUICK_EXIT,
        ]}
      >
        <SafetyRecentCare signOff={false} />
      </Proto>
    ),
  },
  {
    id: 'support',
    title: 'Support services near her',
    render: () => (
      <Proto
        rules={[
          { match: 'Call the support line', to: CALL },
          { match: 'Safe Haven Support Line details', to: 'service-line', quiet: true },
          { match: 'Ridgeview Community Hospital details', to: 'service-hospital', quiet: true },
          { match: / details$/, to: toastTo('Not part of this prototype'), quiet: true },
          { match: /^Call$/, to: CALL, quiet: true },
          { match: /^Directions$/, to: MAPS, quiet: true },
          // Hand-offs to the other flows, only from this final step.
          { match: /^Home$/, to: flowTo('ask', 'home-first'), quiet: true },
          { match: /^Circle$/, to: flowTo('circle'), quiet: true },
          { match: /^Ask$/, to: flowTo('ask', 'ask-opener'), quiet: true },
          { match: /^Me$/, to: toastTo('Me & Privacy is in Storybook: User → 08'), quiet: true },
        ]}
      >
        <FindCare category="gbv" />
        <Finish />
      </Proto>
    ),
  },
  {
    id: 'service-line',
    title: 'Support line details (side path)',
    render: () => (
      <Proto rules={[{ match: /^Call now$/, to: CALL }, { match: 'Report wrong information', to: toastTo('Would open a short report form'), quiet: true }]}>
        <ServiceDetail serviceId="s4" />
      </Proto>
    ),
  },
  {
    id: 'service-hospital',
    title: '24-hour hospital details (side path)',
    render: () => (
      <Proto rules={[{ match: /^Call$/, to: CALL }, { match: /^Directions$/, to: MAPS }, { match: 'Report wrong information', to: toastTo('Would open a short report form'), quiet: true }]}>
        <ServiceDetail serviceId="s2" />
      </Proto>
    ),
  },
  {
    id: 'review',
    title: 'Ask a verified professional (side path)',
    render: () => (
      <Proto rules={[{ match: 'Yes, send for review', to: flowTo('ask', 'ask-queued') }, { match: /^Not now$/, to: BACK, quiet: true }]}>
        <AskReviewOffer />
        <Finish />
      </Proto>
    ),
  },

  /* ───────────── 3. It happened a while ago; and Quick exit ───────────── */
  {
    id: 'historical',
    title: 'It happened a while ago (side path)',
    render: () => (
      <Proto
        rules={[
          { match: /^Talk to a support service/, to: 'support' },
          { match: /^Ask a verified professional/, to: 'review' },
          { match: /^A health check, in your own time/, to: 'support', quiet: true },
          { match: /^Read others’ experiences/, to: flowTo('circle'), quiet: true },
          { match: /^If anything changes/, to: 'danger-now', quiet: true },
          QUICK_EXIT,
        ]}
      >
        <SafetyHistorical />
        <CardRings />
      </Proto>
    ),
  },
  {
    id: 'quick-exit',
    title: 'Quick exit: a neutral page (side path)',
    render: () => (
      <Proto rules={[{ match: RETURN, to: BACK, quiet: true }]}>
        <QuickExitLanding />
        {/* At the very bottom edge, below the last line of the page. */}
        <Lift bottom={4}>
          <SkipAhead label={RETURN} />
        </Lift>
      </Proto>
    ),
  },
]

export const safetyFlow: Flow = {
  id: 'safety',
  title: 'Safety flow',
  short: 'Disclosure, safety checks, urgent care',
  blurb:
    'After she discloses sexual violence: a believing reply, two safety questions (immediate danger, then this device), care that is time-sensitive and where to get support. Quick exit works on every safety screen.',
  who: 'Young woman',
  device: 'phone',
  start: 'entry',
  cover: 'danger-check',
  steps,
  tests: [
    'Does the first reply feel believing and calm, and does she feel in control?',
    'Does she notice Quick exit, and trust what it does?',
    'Is it clear which care is time-sensitive, and where to go for it?',
  ],
}
