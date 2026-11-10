// The professional's side of a review, wired from the real dashboard screens:
// sign in → scope notice → case queue → preview → accept → case detail → response → completed.
// Every step renders one screen; taps are routed by the screen's own labels (see ../hotspots.tsx).
// The first rule of each step is the main path. Fields start empty and fill when tapped (`Fill`);
// the checkbox, the care decision and the service category are the screen's own controls.
//
// The main path follows R-2081, the question sent in the Ask SAYO flow. ResponseComposer always
// shows that case, so the red-flag and GBV side paths switch to it at "Write response".
import { useEffect } from 'react'
import { SERVICE_CATEGORY_LABEL } from '../../components/sayo'
import { CaseDetail } from '../../screens/pro/CaseDetail'
import { CaseQueue } from '../../screens/pro/CaseQueue'
import { ANSWERED_CASE } from '../../screens/pro/data'
import { History } from '../../screens/pro/History'
import { PendingVerification } from '../../screens/pro/PendingVerification'
import { ResponseComposer } from '../../screens/pro/ResponseComposer'
import { ScopeNotice } from '../../screens/pro/ScopeNotice'
import { SignIn } from '../../screens/pro/SignIn'
import { Fill, Finish, Proto, SkipAhead, Tappable, run, toastTo, type AppRule } from '../helpers'
import { useProto } from '../ProtoContext'
import { Labels, clean, rowButton, rowOf, useScreen } from './pro-helpers'
import type { Flow, FlowStep } from './types'

/* ───────────── Prototype-only labels ───────────── */
const SKIP_LOCKED = 'Skip ahead: five wrong tries'
const SKIP_UNLOCKED = 'Skip ahead: 15 minutes later'
const SKIP_MORE_INFO = 'Skip ahead: the team asks for a clearer licence'
const SKIP_EMPTY = 'Skip ahead: every case is answered'
const CONFIRM_RELEASE = 'Release case back to the queue'

/* ───────────── Side navigation, wherever the console frame shows ───────────── */
const NAV: AppRule[] = [
  // Also the "‹ Case queue" / "‹ My open cases" links above a case.
  { match: /^Case queue( \d+)?$/, to: 'queue', quiet: true },
  { match: /^My open cases$/, to: 'my-cases', quiet: true },
  { match: /^Completed$/, to: 'completed-list', quiet: true },
  { match: /^Scope & guidance$/, to: 'scope-guide', quiet: true },
  { match: /^Sign out$/, to: 'sign-in', quiet: true },
]
/** First sign-in: nothing opens until the scope is acknowledged. */
const GATE_NAV: AppRule[] = [
  { match: /^(Case queue( \d+)?|My open cases|Completed|Scope & guidance)$/, to: toastTo('Acknowledge your scope to open the queue'), quiet: true },
  { match: /^Sign out$/, to: 'sign-in', quiet: true },
]
/** Foreign-licensed reviewer: only the training queue and the scope. */
const TRAINING_NAV: AppRule[] = [
  { match: /^Case queue( \d+)?$/, to: 'training-queue', quiet: true },
  { match: /^(My open cases|Completed)$/, to: toastTo('Training mode: only the training queue is in this prototype'), quiet: true },
  { match: /^Scope & guidance$/, to: 'training-scope', quiet: true },
  { match: /^Sign out$/, to: 'sign-in', quiet: true },
]
const SIGN_IN_LINKS: AppRule[] = [
  { match: 'Forgot password?', to: toastTo('Would email a reset link'), quiet: true },
  // Applying is not designed yet; the link lands on what an applicant sees next.
  { match: 'Apply to review', to: 'pending', quiet: true },
]
const PENDING_LINKS: AppRule[] = [
  { match: /^Sign out$/, to: 'sign-in', quiet: true },
  { match: /^Read$/, to: toastTo('Would open the scope page, without the queue'), quiet: true },
  { match: /^Edit$/, to: toastTo('Would open your topics'), quiet: true },
]

/* ───────────── Steps with the screen's own controls ───────────── */

/** Sign in. Sent with a field still empty, it comes back as "wrong details". */
function Credentials() {
  const { go } = useProto()
  const { root, anchor } = useScreen(() => true, true)
  const submit = run(() => go([...(root()?.querySelectorAll('input') ?? [])].every((i) => i.value) ? 'sign-in-code' : 'sign-in-error'))
  return (
    <Fill
      values={[
        { match: /^Work email$/, value: 'efua.m@example.com' },
        { match: /^Password$/, value: 'correct-horse-battery' },
      ]}
      rules={[{ match: /^Sign in$/, to: submit }, ...SIGN_IN_LINKS]}
    >
      <SignIn />
      {anchor}
    </Fill>
  )
}

const checkbox = (root: HTMLElement | null) => root?.querySelector<HTMLInputElement>('input[type="checkbox"]') ?? null

/**
 * The scope notice with its acknowledgement. She ticks the box herself (the screen's own
 * checkbox); "Fill in for me" ticks it for her. "Continue" is the main path once it is ticked.
 */
function Acknowledge({ foreign = false }: { foreign?: boolean }) {
  const { prefill } = useProto()
  const { state: agreed, root, anchor } = useScreen((r) => !!checkbox(r)?.checked, false)
  const tick = () => {
    const box = checkbox(root())
    if (box && !box.checked) box.click()
  }
  useEffect(() => {
    if (prefill) tick()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const next: AppRule = { match: foreign ? 'Continue to training cases' : 'Continue to case queue', to: foreign ? 'training-queue' : 'queue' }
  return (
    <Fill extra={{ pending: !agreed, fill: tick }} rules={[next, ...(foreign ? TRAINING_NAV : GATE_NAV)]}>
      <ScopeNotice acknowledge foreignLicensed={foreign} />
      {anchor}
    </Fill>
  )
}

const SAMPLE = ANSWERED_CASE.response!
const SAMPLE_SERVICE = SERVICE_CATEGORY_LABEL[SAMPLE.category!]
const NO_SERVICE = 'Choose a type of service'
/** choose: a decision or service is still missing · sample: exactly the sample response · own: her own · sent */
type Draft = 'choose' | 'sample' | 'own' | 'sent'
const decisionOf = (root: HTMLElement) => root.querySelector<HTMLInputElement>('input[type="radio"]:checked')?.value
const serviceOf = (root: HTMLElement) => clean(root.querySelector('[role="combobox"]')?.textContent)
const readDraft = (root: HTMLElement): Draft => {
  const thoughts = root.querySelector('textarea')
  if (!thoughts) return 'sent'
  const decision = decisionOf(root)
  const service = serviceOf(root)
  if (!decision || (decision !== 'none' && service === NO_SERVICE)) return 'choose'
  return decision === SAMPLE.decision && service === SAMPLE_SERVICE && thoughts.value === SAMPLE.thoughts ? 'sample' : 'own'
}

/**
 * The response form. "My thoughts" fills with the sample text when tapped; the care decision
 * and the service category are chosen on the real controls ("Fill in for me" picks the sample
 * ones). With exactly the sample response, "Complete case" moves on to the confirm step; with
 * anything else the screen's own dialog and sent state take over, so she sees what she wrote.
 */
function Compose({ drafted = false }: { drafted?: boolean }) {
  const { prefill, finish } = useProto()
  const filled = drafted || prefill
  const { state: draft, root, anchor } = useScreen(readDraft, filled ? 'sample' : 'choose')
  useEffect(() => {
    if (draft === 'sent') finish()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draft])
  const chooseSample = () => {
    const r = root()
    if (!r) return
    if (!decisionOf(r)) r.querySelector<HTMLInputElement>(`input[type="radio"][value="${SAMPLE.decision}"]`)?.click()
    if (serviceOf(r) === NO_SERVICE) [...r.querySelectorAll<HTMLElement>('[role="option"]')].find((o) => clean(o.textContent) === SAMPLE_SERVICE)?.click()
  }
  // The dialog's ✕ would otherwise be read as "back one step" and lose what she wrote.
  const keepEditing = () => [...(root()?.querySelectorAll('button') ?? [])].find((b) => clean(b.textContent) === 'Keep editing')?.click()
  const rules: AppRule[] = [
    ...(draft === 'sample' ? [{ match: /^Complete case$/, to: 'compose-confirm' }] : []),
    ...(draft !== 'sent' ? [{ match: /^Save draft$/, to: toastTo('Draft saved'), quiet: true }] : []),
    { match: /^Close$/, to: run(keepEditing), quiet: true },
    ...NAV,
  ]
  const screen = (
    <>
      <ResponseComposer drafted={filled} />
      {anchor}
    </>
  )
  return (
    <Fill values={drafted ? [] : [{ match: /^My thoughts/, value: SAMPLE.thoughts }]} extra={{ pending: draft === 'choose', fill: chooseSample }} rules={rules}>
      {screen}
    </Fill>
  )
}

/* ───────────── The three cases that open from the queue ───────────── */
interface WiredCase {
  id: string
  /** Step ids for each state of this case. */
  preview: string
  open: string
  decline: string
  accepted: string
  release: string
  titles: { preview: string; open: string; decline: string; accepted: string; release: string }
}

const sideTitles = (name: string): WiredCase['titles'] => ({
  preview: `${name}: preview (side path)`,
  open: `${name}: the full case (side path)`,
  decline: `${name}: decline (side path)`,
  accepted: `${name}: accepted (side path)`,
  release: `${name}: release after accepting (side path)`,
})

/** The main path: the question the young woman sends in the Ask SAYO flow (R-2081), so the two prototypes are one story. */
const ROUTINE: WiredCase = {
  id: 'R-2081', preview: 'preview', open: 'case-open', decline: 'case-decline', accepted: 'case', release: 'case-release',
  titles: { ...sideTitles('Routine case'), preview: 'Preview before accepting', accepted: 'Case detail (accepted)' },
}
const RED_FLAG: WiredCase = {
  id: 'R-2082', preview: 'red-flag-preview', open: 'red-flag-open', decline: 'red-flag-decline', accepted: 'red-flag-accepted', release: 'red-flag-release',
  titles: sideTitles('Red-flag case'),
}
const GBV: WiredCase = {
  id: 'R-2086', preview: 'gbv-preview', open: 'gbv-open', decline: 'gbv-decline', accepted: 'gbv-accepted', release: 'gbv-release',
  titles: sideTitles('GBV disclosure'),
}

/** Every row says "Preview": name the wired ones, and make their rows open the full case. */
const queueLabels = (cases: WiredCase[]) =>
  cases.flatMap((c) => [
    { find: rowOf(c.id), label: `Open case ${c.id}` },
    { find: rowButton(c.id), label: `Preview ${c.id}` },
  ])
/** The first case is the one that glows. */
const queueRules = (cases: WiredCase[]): AppRule[] => [
  ...cases.map((c, i) => ({ match: new RegExp(`^Preview ${c.id}$`), to: c.preview, quiet: i > 0 })),
  ...cases.map((c) => ({ match: new RegExp(`^Open case ${c.id}$`), to: c.open, quiet: true })),
  { match: /^Preview$/, to: toastTo('This prototype opens R-2081, R-2082 and R-2086'), quiet: true },
]

const caseSteps = (c: WiredCase): FlowStep[] => [
  {
    id: c.preview,
    title: c.titles.preview,
    render: () => (
      <Proto
        rules={[
          { match: /^Accept case$/, to: c.accepted },
          { match: /^Close$/, to: 'queue', quiet: true },
          // Only reachable if the drawer was dismissed with Esc: start again from the queue.
          { match: /^Preview$/, to: 'queue', quiet: true },
          { match: /^Accepted by me/, to: 'my-cases', quiet: true },
          ...NAV,
        ]}
      >
        <CaseQueue previewId={c.id} />
      </Proto>
    ),
  },
  {
    id: c.open,
    title: c.titles.open,
    render: () => (
      <Proto rules={[{ match: /^Accept case$/, to: c.accepted }, { match: /^Release or decline$/, to: c.decline }, ...NAV]}>
        <CaseDetail caseId={c.id} />
      </Proto>
    ),
  },
  {
    id: c.decline,
    title: c.titles.decline,
    render: () => (
      <Proto
        rules={[
          { match: /^Release case$/, to: 'queue' },
          { match: /^(Cancel|Close)$/, to: c.open, quiet: true },
          { match: /^Accept case$/, to: c.accepted, quiet: true },
          ...NAV,
        ]}
      >
        <CaseDetail caseId={c.id} releaseOpen />
      </Proto>
    ),
  },
  {
    id: c.accepted,
    title: c.titles.accepted,
    render: () => (
      <Proto rules={[{ match: /^Write response$/, to: 'compose' }, { match: /^Release case$/, to: c.release, quiet: true }, ...NAV]}>
        <CaseDetail caseId={c.id} accepted />
      </Proto>
    ),
  },
  {
    id: c.release,
    title: c.titles.release,
    render: () => (
      <Proto
        rules={[
          { match: CONFIRM_RELEASE, to: 'queue' },
          { match: /^(Cancel|Close)$/, to: c.accepted, quiet: true },
          { match: /^Write response$/, to: 'compose', quiet: true },
          ...NAV,
        ]}
      >
        <CaseDetail caseId={c.id} accepted releaseOpen />
        {/* The header behind the dialog has a "Release case" button too: name the dialog's one. */}
        <Tappable
          find={(root) => [...root.querySelectorAll('dialog button')].find((b) => clean(b.textContent) === 'Release case') ?? null}
          label={CONFIRM_RELEASE}
        />
      </Proto>
    ),
  },
]
const [routinePreview, routineOpen, routineDecline, routineAccepted, routineRelease] = caseSteps(ROUTINE)

const steps: FlowStep[] = [
  /* ───────────── 1. Sign in ───────────── */
  { id: 'sign-in', title: 'Sign in', render: () => <Credentials /> },
  {
    id: 'sign-in-error',
    title: 'Wrong sign-in details (side path)',
    render: () => (
      <Proto rules={[{ match: /^Sign in$/, to: 'sign-in-code' }, { match: SKIP_LOCKED, to: 'sign-in-locked', quiet: true }, ...SIGN_IN_LINKS]}>
        <SignIn step="error" />
        <SkipAhead label={SKIP_LOCKED} />
      </Proto>
    ),
  },
  {
    id: 'sign-in-locked',
    title: 'Too many attempts (side path)',
    render: () => (
      <Proto rules={[{ match: SKIP_UNLOCKED, to: 'sign-in' }, ...SIGN_IN_LINKS]}>
        <SignIn step="locked" />
        <SkipAhead label={SKIP_UNLOCKED} />
      </Proto>
    ),
  },
  {
    id: 'sign-in-code',
    title: 'Verification code',
    render: () => (
      <Fill
        values={[{ match: /^Verification code$/, value: '482913' }]}
        rules={[
          { match: 'Verify and continue', to: 'scope' },
          { match: 'Send a new code', to: toastTo('Would email a new code'), quiet: true },
          // The other sample account is licensed outside Ghana.
          { match: 'Use a different account', to: 'training-scope', quiet: true },
        ]}
      >
        <SignIn step="code" />
      </Fill>
    ),
  },
  {
    id: 'pending',
    title: 'Pending verification (side path)',
    render: () => (
      <Proto rules={[{ match: SKIP_MORE_INFO, to: 'pending-more-info' }, ...PENDING_LINKS]}>
        <PendingVerification />
        <SkipAhead label={SKIP_MORE_INFO} />
      </Proto>
    ),
  },
  {
    id: 'pending-more-info',
    title: 'Pending: clearer licence needed (side path)',
    render: () => (
      <Proto rules={[{ match: 'Upload document', to: 'pending' }, ...PENDING_LINKS]}>
        <PendingVerification needsInfo />
      </Proto>
    ),
  },

  /* ───────────── 2. Scope ───────────── */
  { id: 'scope', title: 'Scope notice (first sign-in)', render: () => <Acknowledge /> },
  {
    id: 'scope-guide',
    title: 'Scope & guidance (side path)',
    render: () => (
      <Proto rules={NAV}>
        <ScopeNotice />
      </Proto>
    ),
  },

  /* ───────────── 3. The queue ───────────── */
  {
    id: 'queue',
    title: 'Case queue',
    render: () => (
      <Proto
        rules={[
          ...queueRules([ROUTINE, RED_FLAG, GBV]),
          { match: /^Red flags \(\d+\)$/, to: 'queue-red-flags', quiet: true },
          { match: /^Accepted by me/, to: 'my-cases', quiet: true },
          { match: SKIP_EMPTY, to: 'queue-empty', quiet: true },
          ...NAV,
        ]}
      >
        <CaseQueue />
        <Labels items={queueLabels([ROUTINE, RED_FLAG, GBV])} />
        <SkipAhead label={SKIP_EMPTY} />
      </Proto>
    ),
  },
  {
    id: 'queue-red-flags',
    title: 'Queue: red flags only (side path)',
    render: () => (
      <Proto
        rules={[
          ...queueRules([RED_FLAG, GBV]),
          { match: /^All cases$/, to: 'queue', quiet: true },
          { match: /^Accepted by me/, to: 'my-cases', quiet: true },
          ...NAV,
        ]}
      >
        <CaseQueue redFlagsOnly />
        <Labels items={queueLabels([RED_FLAG, GBV])} />
      </Proto>
    ),
  },
  {
    id: 'queue-empty',
    title: 'Queue: nothing waiting (side path)',
    render: () => (
      <Proto rules={NAV}>
        <CaseQueue empty />
      </Proto>
    ),
  },
  {
    id: 'my-cases',
    title: 'My open cases (side path)',
    render: () => (
      <Proto rules={[{ match: /^Respond$/, to: 'compose' }, { match: /^Waiting, unassigned/, to: 'queue', quiet: true }, ...NAV]}>
        <CaseQueue view="mine" />
      </Proto>
    ),
  },

  /* ───────────── 4. One case: preview, accept, read ───────────── */
  routinePreview,
  routineAccepted,
  routineOpen,
  routineDecline,
  routineRelease,
  ...caseSteps(RED_FLAG),
  ...caseSteps(GBV),

  /* ───────────── 5. The response ───────────── */
  { id: 'compose', title: 'Write the response', render: () => <Compose /> },
  {
    id: 'compose-confirm',
    title: 'Confirm and send',
    render: () => (
      <Proto rules={[{ match: /^Complete and send$/, to: 'completed' }, { match: /^(Keep editing|Close)$/, to: 'compose-drafted', quiet: true }, ...NAV]}>
        <ResponseComposer drafted confirmOpen />
      </Proto>
    ),
  },
  { id: 'compose-drafted', title: 'Back to the draft (side path)', render: () => <Compose drafted /> },
  {
    id: 'completed',
    title: 'Completed, with the audit trail',
    render: () => (
      <Proto rules={NAV}>
        <ResponseComposer completed />
        <Finish />
      </Proto>
    ),
  },

  /* ───────────── 6. Completed reviews ───────────── */
  {
    id: 'completed-list',
    title: 'Completed reviews (side path)',
    render: () => (
      <Proto
        rules={[
          { match: /^View R-2081$/, to: 'record' },
          { match: /^View$/, to: toastTo('This prototype opens the record of R-2081'), quiet: true },
          ...NAV,
        ]}
      >
        <History />
        <Labels items={[{ find: rowButton('R-2081'), label: 'View R-2081' }]} />
      </Proto>
    ),
  },
  {
    id: 'record',
    title: 'A case record and its audit trail (side path)',
    render: () => (
      <Proto rules={[{ match: /^Close$/, to: 'completed-list', quiet: true }, ...NAV]}>
        <History openId="R-2081" />
      </Proto>
    ),
  },

  /* ───────────── 7. Licensed outside Ghana: training mode ───────────── */
  { id: 'training-scope', title: 'Foreign licence: scope and training mode (side path)', render: () => <Acknowledge foreign /> },
  {
    id: 'training-queue',
    title: 'Foreign licence: training queue (side path)',
    render: () => (
      <Proto
        rules={[
          { match: /^Preview T-0012$/, to: 'training-preview' },
          { match: /^Preview$/, to: toastTo('This prototype opens T-0012'), quiet: true },
          ...TRAINING_NAV,
        ]}
      >
        <CaseQueue foreignLicensed />
        <Labels items={[{ find: rowButton('T-0012'), label: 'Preview T-0012' }]} />
      </Proto>
    ),
  },
  {
    id: 'training-preview',
    title: 'Foreign licence: a training case (side path)',
    render: () => (
      <Proto
        rules={[
          { match: /^Close$/, to: 'training-queue' },
          { match: /^Accept case$/, to: toastTo('Training cases use the same case view and response form'), quiet: true },
          { match: /^Preview$/, to: 'training-queue', quiet: true },
          ...TRAINING_NAV,
        ]}
      >
        <CaseQueue foreignLicensed previewId="T-0012" />
      </Proto>
    ),
  },
]

export const proFlow: Flow = {
  id: 'pro',
  title: 'Professional review',
  short: 'From sign-in to a completed review',
  blurb:
    'A verified professional signs in, acknowledges the scope, previews and accepts a case, then writes a structured response and completes it. Side paths cover red flags, declining a case and training mode for licences from outside Ghana.',
  who: 'Verified professional',
  device: 'desktop',
  start: 'sign-in',
  cover: 'case',
  steps,
  tests: [
    'Is the case information enough to respond without asking for more?',
    'Is it clear what the AI wrote and what is in her own words?',
    'Do professionals know when to accept a case and when to release or decline it?',
  ],
}
