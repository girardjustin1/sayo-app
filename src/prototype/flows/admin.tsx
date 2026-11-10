// A morning in the admin console, wired from the real Storybook screens:
// overview → cases waiting too long → the two pending professionals → a Circle report →
// a care service → export the pilot metrics.
// Every step renders one screen in a prefilled state; taps are routed by the screen's own
// button labels (see ../hotspots.tsx). The first rule of each step is the main path.
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { Analytics } from '../../screens/admin/Analytics'
import { CareServices } from '../../screens/admin/CareServices'
import { CircleModeration } from '../../screens/admin/CircleModeration'
import { Overview } from '../../screens/admin/Overview'
import { Professionals } from '../../screens/admin/Professionals'
import { WaitingCases } from '../../screens/admin/WaitingCases'
import { Fill, Finish, Proto, run, toastTo, type AppRule, type FieldValue, type Target } from '../helpers'
import { useProto } from '../ProtoContext'
import type { Flow, FlowStep } from './types'

/* ───────────── prototype-only helpers (the screens are never edited) ───────────── */

type Named = [el: Element | null | undefined, label: string, role?: string]

/**
 * Gives controls that share a label ("Verify", "Edit", "Review") a label of their own, which is
 * what the step's rules match. Like Tappable it only sets attributes at runtime; unlike Tappable
 * it names many elements at once and names them again when the screen re-renders (tabs).
 */
function Labels({ find }: { find: (root: HTMLElement) => Named[] }) {
  const anchor = useRef<HTMLSpanElement>(null)
  const findRef = useRef(find)
  findRef.current = find
  useLayoutEffect(() => {
    const root = anchor.current?.parentElement
    if (!root) return
    const named = new Map<Element, string | undefined>()
    const apply = () => {
      for (const [el, label, role] of findRef.current(root)) {
        if (!el || el.getAttribute('aria-label') === label) continue
        el.setAttribute('aria-label', label)
        if (role) el.setAttribute('role', role)
        named.set(el, role)
      }
    }
    apply()
    const mo = new MutationObserver(apply)
    mo.observe(root, { childList: true, subtree: true })
    return () => {
      mo.disconnect()
      named.forEach((role, el) => {
        el.removeAttribute('aria-label')
        if (role) el.removeAttribute('role')
      })
    }
  }, [])
  return <span ref={anchor} hidden />
}

/** Every button in a table row, named after the row: "Verify Kofi A.", "Nudge R-2079". */
const rowButtons = (root: HTMLElement): Named[] =>
  [...root.querySelectorAll('tr')].flatMap((tr) => {
    const name = [...tr.children].map((cell) => (cell as HTMLElement).innerText.trim().split('\n')[0]).find(Boolean)
    return name ? [...tr.querySelectorAll('button')].map((b): Named => [b, `${b.textContent?.trim()} ${name}`]) : []
  })
const RowLabels = () => <Labels find={rowButtons} />

/** A button in a dialog that has a twin on the page behind it ("Suspend user"). */
const confirmButton = (text: string, label: string) => (root: HTMLElement): Named[] => [
  [[...root.querySelectorAll('dialog button')].filter((b) => b.textContent?.trim() === text).at(-1), label],
]

const CHECKS = 'dialog input[type="checkbox"]:not([role="switch"])'
const textOf = (box: HTMLInputElement) => box.labels?.[0]?.textContent?.trim() ?? ''
const escape = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const exactly = (label: string) => new RegExp(`^${escape(label)}$`)

/**
 * For a form whose main button waits for checkboxes the screen keeps in its own state.
 * The boxes stay the screen's own: the tester ticks them and the screen reacts.
 * `pick` gets the form's checkboxes and returns the next one the admin still has to tick, if any.
 * `next` is the rule for that one: it holds the hint ring (on the label) and ticks the real box,
 * so the main path never stalls on a disabled button. List it first in the step's rules.
 * With "Prefill fields" on, the boxes arrive ticked.
 */
function useChecks(pick: (boxes: HTMLInputElement[]) => HTMLInputElement | undefined): { anchor: ReactNode; next: AppRule[] } {
  const { prefill } = useProto()
  const anchor = useRef<HTMLSpanElement>(null)
  const pickRef = useRef(pick)
  pickRef.current = pick
  const [next, setNext] = useState<string | null>(null)
  const boxes = () => [...(anchor.current?.parentElement?.querySelectorAll<HTMLInputElement>(CHECKS) ?? [])].filter((box) => !box.disabled)
  useLayoutEffect(() => {
    const root = anchor.current?.parentElement
    if (!root) return
    const look = () => {
      const all = boxes()
      // The box is an invisible layer over the drawn one: named apart from its label, the ring lands on the label.
      all.forEach((box) => box.setAttribute('aria-label', `Tick: ${textOf(box)}`))
      const box = pickRef.current(all)
      setNext(box ? textOf(box) : null)
    }
    look()
    // After a real click React puts the box back until its next render: look once that has happened.
    const later = () => window.setTimeout(look, 0)
    root.addEventListener('change', later)
    const mo = new MutationObserver(look)
    mo.observe(root, { childList: true, subtree: true })
    // Real clicks on the real boxes, in a turn of their own so the screen's state keeps up.
    const timer = prefill
      ? window.setTimeout(() => {
          for (let box, n = 0; (box = pickRef.current(boxes())) && n < 20; n++) box.click()
        }, 0)
      : 0
    return () => {
      root.removeEventListener('change', later)
      mo.disconnect()
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // The hint layer can repaint once more with the rules it had before `next` changed (a frame it
  // had already asked for). A late change in this hidden span makes it look again with today's rules.
  useEffect(() => {
    const timer = window.setTimeout(() => anchor.current && (anchor.current.textContent = next ?? ''), 80)
    return () => clearTimeout(timer)
  }, [next])
  return {
    anchor: <span ref={anchor} hidden />,
    next: next ? [{ match: exactly(next), to: run(() => window.setTimeout(() => pickRef.current(boxes())?.click(), 0)) }] : [],
  }
}

/** Says what the last tap did, where the sample screen has no "after" state of its own. */
function Say({ msg }: { msg: string }) {
  const { toast } = useProto()
  const say = useRef(toast)
  say.current = toast
  useEffect(() => say.current(msg), [msg])
  return null
}

/* ───────────── shared rules ───────────── */

const NAV = {
  overview: /^Overview$/,
  waiting: /^Waiting cases( \d+)?$/,
  analytics: /^Analytics & export$/,
  pros: /^Professionals( \d+)?$/,
  services: /^Care services$/,
  mod: /^Circle moderation( \d+)?$/,
}
type NavKey = keyof typeof NAV
const NAV_HOME: Record<NavKey, string> = { overview: 'overview', waiting: 'waiting', analytics: 'analytics', pros: 'pros', services: 'services', mod: 'mod' }
/** After the morning's work: nothing overdue, nothing reported. */
const CLEARED: Partial<Record<NavKey, string>> = { overview: 'overview-clear', waiting: 'waiting-clear', mod: 'mod-empty' }

/** The side navigation, on every screen. Quiet: a step that continues through it lists that item first. */
const nav = (to: Partial<Record<NavKey, string>> = {}): AppRule[] => [
  ...(Object.keys(NAV) as NavKey[]).map((k): AppRule => ({ match: NAV[k], to: to[k] ?? NAV_HOME[k], quiet: true })),
  { match: /^Sign out$/, to: toastTo('Signing out is not part of this prototype'), quiet: true },
]

type RowRule = [match: string | RegExp, to: Target]
/** One rule per table row (see RowLabels). `main` goes first and glows; the rest are quiet. */
const rows = (table: RowRule[], main?: string): AppRule[] =>
  [...table].sort((a, b) => Number(b[0] === main) - Number(a[0] === main)).map(([match, to]): AppRule => ({ match, to, quiet: match !== main }))

const VERIFY_KOFI = 'Verify Kofi A.'
const VERIFY_NAA = 'Verify Dr. Naa D.'
const PRO_ROWS: RowRule[] = [
  ['View Dr. Efua M.', 'pro-approved'],
  ['View Nurse Abena K.', 'pro-approved-2'],
  ['View Dr. Grace O.', 'pro-foreign'],
  [VERIFY_KOFI, 'pro-verify'],
  [VERIFY_NAA, 'pro-abroad'],
]
const EDIT_ASANTE = 'Edit Asante Youth Wellness Centre'
const SERVICE_ROWS: RowRule[] = [
  [EDIT_ASANTE, 'service-edit'],
  ['Edit Kaneshie Family Health Clinic', 'service-unverified'],
  [/^Edit /, toastTo('Try Asante (verified) or Kaneshie (not yet verified)')],
]
const OTHER_REPORT = toastTo('Try the victim-blaming, danger or health-information report')
const REPORT_ROWS: RowRule[] = [
  ['Review Victim blaming', 'mod'],
  ['Review Someone may be in danger', 'mod-danger'],
  ['Review Wrong or harmful health info', 'mod-health'],
  ['Review Names an alleged perpetrator', OTHER_REPORT],
  ['Review Shares contact or personal details', OTHER_REPORT],
]
/** The other reports in the queue (the open one keeps its own button). */
const otherReports = (self: string) => rows(REPORT_ROWS.filter(([, to]) => to !== self))

const NUDGE = 'Nudge R-2079'
const OPEN_ITEMS: AppRule[] = [
  { match: /^Open monitor$/, to: 'waiting', quiet: true },
  { match: /^Review$/, to: 'pros', quiet: true },
  { match: /^Review reports$/, to: 'mod', quiet: true },
  { match: /^Export CSV$/, to: 'analytics', quiet: true },
]
const DECLINE: AppRule[] = [
  { match: /^Reject$/, to: toastTo('Would reject the application, with a reason'), quiet: true },
  { match: /^Ask for more info$/, to: toastTo('Would email the applicant for more information'), quiet: true },
]
const TO_LIST: AppRule = { match: /^Close$/, to: 'pros', quiet: true }
const KEEP: AppRule = { match: /^Keep$/, to: toastTo('Would keep it and thank the reporters'), quiet: true }
const TO_LOG: AppRule = { match: /^Moderation log$/, to: 'mod-log', quiet: true }
const LEAVE_FORM: AppRule[] = [
  { match: /^Cancel$/, to: 'services', quiet: true },
  { match: /^Close$/, to: 'services', quiet: true },
]
const HIDE_SERVICE: AppRule = { match: /^Remove from Find Care$/, to: toastTo('Would hide it from Find Care'), quiet: true }
const ADD_SERVICE: AppRule = { match: /^Add service$/, to: 'service-add', quiet: true }
const CONFIRM_SUSPEND_USER = 'Confirm: suspend user'
const CONFIRM_SUSPEND_PRO = 'Confirm: suspend access'

/** The suspend dialog: the reason shown to the user starts empty and is typed in when tapped. */
const suspendUser = (id: string, title: string, reportId: string, from: string, reason: string): FlowStep => ({
  id,
  title,
  render: () => (
    <Fill
      values={[{ match: /^Reason shown to them/, value: reason }]}
      rules={[
        { match: CONFIRM_SUSPEND_USER, to: 'mod-log' },
        { match: /^Cancel$/, to: from, quiet: true },
        { match: /^Close$/, to: from, quiet: true },
      ]}
    >
      <CircleModeration selectedId={reportId} suspendOpen />
      <Labels find={confirmButton('Suspend user', CONFIRM_SUSPEND_USER)} />
    </Fill>
  ),
})

/** A pending record: the admin ticks each check (the screen's own checkboxes), then Approve unlocks. */
function Verify() {
  const checks = useChecks((boxes) => boxes.find((box) => !box.checked))
  return (
    <Proto rules={[...checks.next, { match: /^Approve$/, to: 'pros-approved' }, ...DECLINE, TO_LIST]}>
      {checks.anchor}
      <Professionals openId="pr4" />
    </Proto>
  )
}

const NEW_SERVICE: FieldValue[] = [
  { match: /^Name/, value: 'Labadi Community Clinic (sample)' },
  { match: /^Type of care/, value: 'Community clinic' },
  { match: /^Area/, value: 'Labadi (sample)' },
  { match: /^Opening hours/, value: 'Mon–Fri, 8 am–5 pm' },
  { match: /^Phone/, value: '+233 20 000 0606' },
]
const ADD_THIS_SERVICE = 'Add this service'

/** The empty form: fields are typed in when tapped, then one category, then the form's own button unlocks. */
function AddService() {
  const checks = useChecks((boxes) => (boxes.some((box) => box.checked) ? undefined : (boxes.find((box) => textOf(box).startsWith('General clinic')) ?? boxes[0])))
  return (
    <Fill values={NEW_SERVICE} rules={[...checks.next, { match: ADD_THIS_SERVICE, to: 'services-saved' }, ...LEAVE_FORM]}>
      {checks.anchor}
      <CareServices editId="new" />
      <Labels find={confirmButton('Add service', ADD_THIS_SERVICE)} />
    </Fill>
  )
}

const steps: FlowStep[] = [
  /* ───────────── 1. What needs attention: cases waiting too long ───────────── */
  {
    id: 'overview',
    title: 'Overview: what needs attention',
    render: () => (
      <Proto rules={[{ match: /^Open monitor$/, to: 'waiting' }, ...OPEN_ITEMS, ...nav()]}>
        <Overview />
      </Proto>
    ),
  },
  {
    id: 'waiting',
    title: 'Cases waiting over 24 hours',
    render: () => (
      <Proto rules={[{ match: NUDGE, to: 'waiting-nudged' }, { match: /^Nudge /, to: 'waiting-nudged', quiet: true }, ...nav()]}>
        <WaitingCases />
        <RowLabels />
      </Proto>
    ),
  },
  {
    id: 'waiting-nudged',
    title: 'Reviewers nudged',
    render: () => (
      <Proto rules={[{ match: NAV.overview, to: 'overview-2' }, { match: /^Nudge /, to: toastTo('Would alert reviewers in that topic'), quiet: true }, ...nav()]}>
        <WaitingCases />
        <RowLabels />
        <Say msg="Would alert reviewers in that topic, discreetly" />
      </Proto>
    ),
  },

  /* ───────────── 2. Professionals waiting for approval ───────────── */
  {
    id: 'overview-2',
    title: 'Overview: professionals waiting',
    render: () => (
      <Proto rules={[{ match: /^Review$/, to: 'pros' }, ...OPEN_ITEMS, ...nav()]}>
        <Overview />
      </Proto>
    ),
  },
  {
    id: 'pros',
    title: 'Professionals',
    render: () => (
      <Proto rules={[...rows(PRO_ROWS, VERIFY_KOFI), ...nav()]}>
        <Professionals />
        <RowLabels />
      </Proto>
    ),
  },
  { id: 'pro-verify', title: 'Verify credentials (Ghana-licensed)', render: () => <Verify /> },
  {
    id: 'pros-approved',
    title: 'Approved: one more is waiting',
    render: () => (
      <Proto rules={[...rows(PRO_ROWS, VERIFY_NAA), ...nav()]}>
        <Professionals />
        <RowLabels />
        <Say msg="Approved and logged with your name (the sample list stays as it was)" />
      </Proto>
    ),
  },
  {
    id: 'pro-abroad',
    title: 'Licensed outside Ghana: real cases locked',
    render: () => (
      <Proto rules={[{ match: /^Close$/, to: 'pros-done' }, ...DECLINE]}>
        <Professionals openId="pr5" />
      </Proto>
    ),
  },
  {
    id: 'pros-done',
    title: 'Professionals: on to the Circle',
    render: () => (
      <Proto rules={[{ match: NAV.mod, to: 'mod' }, ...rows(PRO_ROWS), ...nav()]}>
        <Professionals />
        <RowLabels />
      </Proto>
    ),
  },
  {
    id: 'pro-approved',
    title: 'Approved, Ghana-licensed: real cases on (side path)',
    render: () => (
      <Proto rules={[{ match: /^Suspend access$/, to: 'pro-suspend', quiet: true }, { match: /^Save changes$/, to: 'pros', quiet: true }, TO_LIST]}>
        <Professionals openId="pr1" />
      </Proto>
    ),
  },
  {
    id: 'pro-suspend',
    title: 'Suspend a professional (side path)',
    render: () => (
      <Proto rules={[{ match: CONFIRM_SUSPEND_PRO, to: 'pros' }, { match: /^Cancel$/, to: 'pro-approved', quiet: true }]}>
        <Professionals openId="pr1" suspendOpen />
        <Labels find={confirmButton('Suspend access', CONFIRM_SUSPEND_PRO)} />
      </Proto>
    ),
  },
  {
    id: 'pro-approved-2',
    title: 'Another approved record (side path)',
    render: () => (
      // "Suspend access" is left to the screen here: its own confirmation opens in place.
      <Proto rules={[{ match: /^Save changes$/, to: 'pros', quiet: true }, TO_LIST]}>
        <Professionals openId="pr2" />
      </Proto>
    ),
  },
  {
    id: 'pro-foreign',
    title: 'Approved, licensed in the UK: training only (side path)',
    render: () => (
      <Proto rules={[{ match: /^Save changes$/, to: 'pros', quiet: true }, TO_LIST]}>
        <Professionals openId="pr3" />
      </Proto>
    ),
  },

  /* ───────────── 3. Circle reports ───────────── */
  {
    id: 'mod',
    title: 'Circle report: victim blaming',
    render: () => (
      <Proto rules={[{ match: /^Remove content$/, to: 'mod-log' }, { match: /^Suspend user$/, to: 'mod-suspend', quiet: true }, KEEP, ...otherReports('mod'), TO_LOG, ...nav()]}>
        <CircleModeration selectedId="MR-118" />
        <RowLabels />
      </Proto>
    ),
  },
  {
    id: 'mod-log',
    title: 'Moderation log',
    render: () => (
      <Proto rules={[{ match: NAV.services, to: 'services' }, { match: /^Needs review/, to: 'mod', quiet: true }, ...nav()]}>
        <CircleModeration tab="log" />
        <Say msg="Done and logged with your name (the sample log shows earlier actions)" />
      </Proto>
    ),
  },
  suspendUser('mod-suspend', 'Suspend a user (side path)', 'MR-118', 'mod', 'Blaming a survivor breaks the Circle guidelines.'),
  {
    id: 'mod-danger',
    title: 'Report: someone may be in danger (side path)',
    render: () => (
      <Proto
        rules={[
          { match: /^Send safety information$/, to: toastTo('Would send safety information to the author first') },
          { match: /^Remove content$/, to: 'mod-log', quiet: true },
          { match: /^Suspend user$/, to: toastTo('Not part of this prototype'), quiet: true },
          KEEP,
          ...otherReports('mod-danger'),
          TO_LOG,
          ...nav(),
        ]}
      >
        <CircleModeration selectedId="MR-119" />
        <RowLabels />
      </Proto>
    ),
  },
  {
    id: 'mod-health',
    title: 'Report: harmful health information (side path)',
    render: () => (
      <Proto rules={[{ match: /^Remove content$/, to: 'mod-log' }, { match: /^Suspend user$/, to: 'mod-health-suspend', quiet: true }, KEEP, ...otherReports('mod-health'), TO_LOG, ...nav()]}>
        <CircleModeration selectedId="MR-116" />
        <RowLabels />
      </Proto>
    ),
  },
  suspendUser('mod-health-suspend', 'Suspend a repeat poster (side path)', 'MR-116', 'mod-health', 'Unsafe health advice and selling break the Circle guidelines.'),
  {
    id: 'mod-empty',
    title: 'Empty moderation queue (side path)',
    render: () => (
      <Proto rules={nav(CLEARED)}>
        <CircleModeration empty />
      </Proto>
    ),
  },

  /* ───────────── 4. Care services ───────────── */
  {
    id: 'services',
    title: 'Care services',
    render: () => (
      <Proto rules={[...rows(SERVICE_ROWS, EDIT_ASANTE), ADD_SERVICE, ...nav()]}>
        <CareServices />
        <RowLabels />
      </Proto>
    ),
  },
  {
    id: 'service-edit',
    title: 'Edit a service',
    render: () => (
      <Proto rules={[{ match: /^Save changes$/, to: 'services-saved' }, HIDE_SERVICE, ...LEAVE_FORM]}>
        <CareServices editId="s1" />
      </Proto>
    ),
  },
  {
    id: 'services-saved',
    title: 'Saved: on to the metrics',
    render: () => (
      <Proto rules={[{ match: NAV.analytics, to: 'analytics' }, ...rows(SERVICE_ROWS), ADD_SERVICE, ...nav()]}>
        <CareServices />
        <RowLabels />
        <Say msg="Saved (the sample list stays as it was)" />
      </Proto>
    ),
  },
  {
    id: 'service-unverified',
    title: 'An unverified service (side path)',
    render: () => (
      <Proto rules={[{ match: /^Save changes$/, to: 'services-saved' }, HIDE_SERVICE, ...LEAVE_FORM]}>
        <CareServices editId="s5" />
      </Proto>
    ),
  },
  { id: 'service-add', title: 'Add a service (side path)', render: () => <AddService /> },

  /* ───────────── 5. Pilot metrics ───────────── */
  {
    id: 'analytics',
    title: 'Analytics & export',
    render: () => (
      <Proto rules={[{ match: /^Export CSV/, to: 'analytics-exported' }, ...nav()]}>
        <Analytics />
      </Proto>
    ),
  },
  {
    id: 'analytics-exported',
    title: 'Export ready',
    render: () => (
      <Proto rules={nav(CLEARED)}>
        <Analytics exported />
        <Finish />
      </Proto>
    ),
  },
  {
    id: 'overview-clear',
    title: 'Overview: all clear (side path)',
    render: () => (
      <Proto rules={[...nav(CLEARED), { match: /^Export CSV$/, to: 'analytics', quiet: true }]}>
        <Overview allClear />
      </Proto>
    ),
  },
  {
    id: 'waiting-clear',
    title: 'Waiting cases: all within target (side path)',
    render: () => (
      <Proto rules={nav(CLEARED)}>
        <WaitingCases allClear />
      </Proto>
    ),
  },
]

export const adminFlow: Flow = {
  id: 'admin',
  title: 'A morning in the admin console',
  short: 'Clear what needs attention, then export',
  blurb:
    'The pilot admin works through what needs attention: cases waiting too long, two professionals to verify, a reported Circle reply and a care service to update. She ends by exporting the de-identified pilot metrics.',
  who: 'Admin',
  device: 'desktop',
  start: 'overview',
  cover: 'overview',
  steps,
  tests: [
    'Can an admin clear the morning’s queue without leaving this console?',
    'Is it clear who may review real Ghana cases, and why a professional licensed elsewhere cannot?',
    'Does a moderator know what to do first with a GBV-sensitive report?',
  ],
}
