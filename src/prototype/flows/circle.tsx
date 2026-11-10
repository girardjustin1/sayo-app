// The Circle, wired from the real Storybook screens:
// feed → a post with peer and Verified Professional replies → react → write a first post →
// guidelines gate → posted. Side paths: topic filters, professional replies only, the
// identifying-details warning, reporting a reply, removed content and the guidelines.
// Every step renders one real screen; taps are routed by the screen's own labels
// (see ../hotspots.tsx). The first rule of each step is the main path. Text fields start
// empty and fill when tapped (`Fill`); choices the screens handle themselves stay live.
import { useEffect, useRef } from 'react'
import { CircleFeed } from '../../screens/user/07-circle/CircleFeed'
import { ComposePost } from '../../screens/user/07-circle/ComposePost'
import { Guidelines } from '../../screens/user/07-circle/Guidelines'
import { PostDetail } from '../../screens/user/07-circle/PostDetail'
import { ReportFlow } from '../../screens/user/07-circle/ReportFlow'
import { REPORT_REASONS, type ReportReason } from '../../screens/user/07-circle/data'
import { BACK, Fill, Finish, Proto, SkipAhead, Tappable, flowTo, run, toastTo, type AppRule } from '../helpers'
import { useProto } from '../ProtoContext'
import { CardRings, Lift } from './shared'
import type { Flow, FlowStep } from './types'

const FIRST_POST = 'Is it weird to ask a guy to test before we sleep together?'
const OTHER_POSTS = /^(Exam stress is making me feel numb|Is it okay to change your mind halfway\?|Implant vs injection: what was your experience\?|Trying to drink less at parties)$/
/** The floating "Post" button, or "Start a post" when a topic is empty. */
const NEW_POST = /^(Post|Start a post)$/
const ONE_THREAD = toastTo('This prototype opens the first post')
const NOT_HERE = toastTo('Not part of this prototype')
const SKIP_MODERATION = 'Skip ahead: moderators remove a reply'

/** Bottom tabs: the other tabs live in the Ask SAYO flow. Quiet: the main path never runs through them. */
const tabs: AppRule[] = [
  { match: /^Home$/, to: flowTo('ask', 'home-ready'), quiet: true },
  { match: /^Ask$/, to: flowTo('ask', 'ask-opener'), quiet: true },
  { match: /^Find Care$/, to: flowTo('ask', 'care-all'), quiet: true },
  { match: /^Me$/, to: toastTo('Me & Privacy is in Storybook: User → 08'), quiet: true },
]

/** Shared by every feed step that shows all topics. The other topic chips filter in place. */
const feedExtras: AppRule[] = [
  { match: OTHER_POSTS, to: ONE_THREAD, quiet: true },
  { match: /^Consent$/, to: 'feed-consent', quiet: true },
  { match: /^HIV & STIs$/, to: 'feed-empty', quiet: true },
  { match: 'Circle guidelines', to: 'guidelines', quiet: true },
  ...tabs,
]

/** Shared by every state of the thread. Reactions and "Show anyway" stay live on the screen. */
const threadExtras: AppRule[] = [
  { match: 'Post options', to: NOT_HERE, quiet: true },
  // The screen's reply box is display-only (it cannot hold text), so it says so instead of looking broken.
  { match: /^Reply as /, to: toastTo('Replying is not part of this prototype'), quiet: true },
]
const REPORT: AppRule = { match: /^Report reply from /, to: 'report-choose', quiet: true }
const composeExtras: AppRule[] = [
  { match: 'Read the guidelines', to: 'guidelines', quiet: true },
  { match: /^Change$/, to: NOT_HERE, quiet: true },
]

/* ───────────── prototype-only helpers (the screens are never edited) ───────────── */

/** Compose: a topic card (its checkbox is 1px) becomes a tap target, only where a tap has to route. */
const topicCard = (label: string) => (root: HTMLElement) =>
  [...root.querySelectorAll('[role="radiogroup"] input')].find((i) => i.getAttribute('aria-label') === label)?.parentElement ?? null

/** Every step opens at the top; this brings one part of a long thread into view instead. */
function Reveal({ find }: { find: (root: HTMLElement) => Element | null }) {
  const anchor = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const root = anchor.current?.parentElement
    const t = setTimeout(() => {
      const el = root && find(root)
      const body = el?.closest('.sayo-screen__body')
      if (el && body) body.scrollTop += el.getBoundingClientRect().top - body.getBoundingClientRect().top - 96
    }, 80)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <span ref={anchor} hidden />
}
const placeholder = (root: HTMLElement) => root.querySelector('.sayo-screen__body [role="note"]')

/** One prototype toast when a step opens (the feed has no state that shows her new post). */
function ToastOnce({ msg }: { msg: string }) {
  const { toast } = useProto()
  useEffect(() => {
    toast(msg)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return null
}

/* ───────────── report: any reason can be chosen, and the next screens show the same one ───────────── */

/** The reason she picked. Kept here because a step cannot take arguments; jumping straight to a step uses the default. */
let picked: ReportReason = 'victim_blaming'
const SEND = /^(Send report|Send to the safety team)$/
/** On the "Report sent" screens, in the empty space above the button: what the thread looks like once moderators have acted. */
const LATER: AppRule = { match: SKIP_MODERATION, to: 'post-removed', quiet: true }
const Later = () => (
  <Lift bottom={120}>
    <SkipAhead label={SKIP_MODERATION} />
  </Lift>
)
const reasonRow = (id: ReportReason) => (root: HTMLElement) => root.querySelector(`input[type="radio"][value="${id}"]`)?.closest('[data-pressable-container]') ?? null

/** Step 1: every reason row routes on, so the next step can offer its optional text field from the start. No glow: the hint must not pick the reason for her. */
function ReportChoose() {
  const { go } = useProto()
  const choose = (id: ReportReason) =>
    run(() => {
      picked = id
      go(id === 'danger' ? 'report-danger' : 'report-reason')
    })
  return (
    <Proto rules={REPORT_REASONS.map((r) => ({ match: `Reason: ${r.label}`, to: choose(r.id), quiet: true }))}>
      <ReportFlow />
      {REPORT_REASONS.map((r) => (
        <Tappable key={r.id} find={reasonRow(r.id)} label={`Reason: ${r.label}`} />
      ))}
    </Proto>
  )
}

/** Step 2: the reason is chosen (she can still change it on the screen); the optional detail starts empty. */
function ReportDetail({ danger = false }: { danger?: boolean }) {
  const { go } = useProto()
  const reason: ReportReason = danger ? 'danger' : picked === 'danger' ? 'victim_blaming' : picked
  const send = run(() => {
    const now = document.querySelector<HTMLInputElement>('.proto-screen input[type="radio"]:checked')?.value as ReportReason | undefined
    picked = now ?? reason
    go(picked === 'danger' ? 'report-sent-safety' : 'report-sent')
  })
  return (
    <Fill values={[{ match: /^Anything else we should know/, value: 'I think this could hurt someone who reads it.' }]} rules={[{ match: SEND, to: send }]}>
      <ReportFlow reason={reason} />
    </Fill>
  )
}

const steps: FlowStep[] = [
  /* ───────────── 1. Read and react ───────────── */
  {
    id: 'feed',
    title: 'Circle feed',
    render: () => (
      <Proto rules={[{ match: FIRST_POST, to: 'post' }, { match: NEW_POST, to: 'compose', quiet: true }, ...feedExtras]}>
        <CircleFeed />
        <CardRings />
      </Proto>
    ),
  },
  {
    id: 'feed-consent',
    title: 'Feed: one topic (side path)',
    render: () => (
      <Proto
        rules={[
          { match: NEW_POST, to: 'compose' },
          { match: OTHER_POSTS, to: ONE_THREAD, quiet: true },
          { match: /^All$/, to: 'feed', quiet: true },
          { match: /^HIV & STIs$/, to: 'feed-empty', quiet: true },
          { match: 'Circle guidelines', to: 'guidelines', quiet: true },
          ...tabs,
        ]}
      >
        <CircleFeed topic="consent" />
      </Proto>
    ),
  },
  {
    id: 'feed-empty',
    title: 'Feed: empty topic (side path)',
    render: () => (
      <Proto
        rules={[
          { match: NEW_POST, to: 'compose' },
          { match: /^All$/, to: 'feed', quiet: true },
          { match: /^Consent$/, to: 'feed-consent', quiet: true },
          { match: 'Circle guidelines', to: 'guidelines', quiet: true },
          ...tabs,
        ]}
      >
        <CircleFeed topic="hiv_sti" />
      </Proto>
    ),
  },
  {
    id: 'post',
    title: 'A post: peer and professional replies',
    render: () => (
      <Proto
        rules={[
          { match: /^Support$/, to: 'post-reacted' },
          { match: /^Professional$/, to: 'post-pro', quiet: true },
          REPORT,
          { match: /^Back$/, to: 'feed-post', quiet: true },
          ...threadExtras,
        ]}
      >
        <PostDetail />
      </Proto>
    ),
  },
  {
    id: 'post-pro',
    title: 'Professional replies only (side path)',
    render: () => (
      <Proto rules={[{ match: /^Support$/, to: 'post-reacted' }, { match: /^All$/, to: 'post', quiet: true }, { match: /^Back$/, to: 'feed-post', quiet: true }, ...threadExtras]}>
        <PostDetail filter="pro" />
      </Proto>
    ),
  },
  {
    id: 'post-reacted',
    title: 'React: Support',
    render: () => (
      <Proto rules={[{ match: /^Back$/, to: 'feed-post' }, REPORT, ...threadExtras]}>
        <PostDetail reaction="support" />
      </Proto>
    ),
  },

  /* ───────────── 2. Write a first post ───────────── */
  {
    id: 'feed-post',
    title: 'Back on the feed: start a post',
    render: () => (
      <Proto rules={[{ match: NEW_POST, to: 'compose' }, { match: FIRST_POST, to: 'post', quiet: true }, ...feedExtras]}>
        <CircleFeed />
        <CardRings />
      </Proto>
    ),
  },
  {
    id: 'compose',
    title: 'Write a post',
    render: () => (
      <Fill
        values={[
          { match: /^Title$/, value: 'Did the implant change your periods?' },
          { match: /^Say more$/, value: 'Thinking about getting one next month. How was the first few months for you?' },
        ]}
        rules={[{ match: 'Post to the Circle', to: 'guidelines-gate' }, { match: 'Topic: Relationships', to: 'compose-warning', quiet: true }, ...composeExtras]}
      >
        <ComposePost initialTopic="contraception" />
        <Tappable find={topicCard('Relationships')} label="Topic: Relationships" />
      </Fill>
    ),
  },
  {
    id: 'compose-warning',
    title: 'Identifying details warning (side path)',
    // Filling the fields trips the screen's own check. "Post" stays off until she edits the details out herself.
    render: () => (
      <Fill
        values={[
          { match: /^Title$/, value: 'Is this normal in a relationship?' },
          { match: /^Say more$/, value: 'His name is Kwame and he checks my phone every night. If anyone has been through this call me on 024 000 1234.' },
        ]}
        rules={[{ match: 'Post to the Circle', to: 'guidelines-gate' }, ...composeExtras]}
      >
        <ComposePost initialTopic="relationships" />
      </Fill>
    ),
  },
  {
    id: 'guidelines-gate',
    title: 'First post: the guidelines',
    render: () => (
      <Proto rules={[{ match: 'I understand', to: 'posted' }]}>
        <Guidelines isFirstPostGate />
      </Proto>
    ),
  },
  {
    id: 'posted',
    title: 'Posted, back on the feed',
    render: () => (
      <Proto rules={[{ match: FIRST_POST, to: 'post', quiet: true }, { match: NEW_POST, to: 'compose', quiet: true }, ...feedExtras]}>
        <CircleFeed />
        <CardRings />
        <ToastOnce msg="Posted. In the app, your post shows first." />
        <Finish />
      </Proto>
    ),
  },
  {
    id: 'guidelines',
    title: 'Circle guidelines (side path)',
    render: () => (
      <Proto rules={[{ match: /^Back$/, to: BACK }]}>
        <Guidelines />
      </Proto>
    ),
  },

  /* ───────────── 3. Report a reply, and what moderation leaves behind ───────────── */
  { id: 'report-choose', title: 'Report a reply: choose a reason (side path)', render: () => <ReportChoose /> },
  { id: 'report-reason', title: 'Report: add detail and send (side path)', render: () => <ReportDetail /> },
  {
    id: 'report-sent',
    title: 'Report sent (side path)',
    render: () => (
      <Proto rules={[{ match: 'Back to the post', to: 'post-reported' }, LATER]}>
        <ReportFlow reason={picked === 'danger' ? 'victim_blaming' : picked} submitted />
        <Later />
      </Proto>
    ),
  },
  { id: 'report-danger', title: 'Report: someone may be in danger (side path)', render: () => <ReportDetail danger /> },
  {
    id: 'report-sent-safety',
    title: 'Sent to the safety team (side path)',
    render: () => (
      <Proto rules={[{ match: 'Back to the post', to: 'post-reported' }, LATER]}>
        <ReportFlow reason="danger" submitted />
        <Later />
      </Proto>
    ),
  },
  {
    id: 'post-reported',
    title: 'Reported reply is hidden (side path)',
    render: () => (
      <Proto rules={[{ match: /^Back$/, to: 'feed-post' }, REPORT, ...threadExtras]}>
        <PostDetail reportedReplyId="r4" />
        <Reveal find={placeholder} />
      </Proto>
    ),
  },
  {
    id: 'post-removed',
    title: 'Reply removed by moderators (side path)',
    render: () => (
      <Proto rules={[{ match: /^Back$/, to: 'feed-post' }, REPORT, ...threadExtras]}>
        <PostDetail withRemovedReply />
        <Reveal find={placeholder} />
      </Proto>
    ),
  },
]

export const circleFlow: Flow = {
  id: 'circle',
  title: 'The Circle',
  short: 'Read, react, post and report',
  blurb:
    'The peer community: read a post with peer replies and one Verified Professional reply, react, then write a first post and pass the guidelines. Side paths: topic filters, the identifying-details warning and reporting a reply.',
  who: 'Young woman',
  device: 'phone',
  start: 'feed',
  cover: 'post',
  steps,
  tests: [
    'Can she tell a Verified Professional reply from a peer reply?',
    'Before posting, does she understand what others can and cannot see about her?',
    'Can she report a harmful reply, and does she know what happens next?',
  ],
}
