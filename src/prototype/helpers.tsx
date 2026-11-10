import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { ProtoScreen, labelOf, type Rule } from './hotspots'
import { useProto } from './ProtoContext'
import type { FlowId } from './flows/types'

/**
 * Prototype-only helpers. They sit next to a real screen inside `Proto`;
 * the screens themselves are never edited.
 */

/** Where a tap goes: a step id, back, a toast, another flow, or a function. */
export type Target = string | { back: true } | { toast: string } | { flow: FlowId; step?: string } | { run: () => void }
export type AppRule = { match: string | RegExp; to: Target; quiet?: boolean; soft?: boolean }

export const BACK: Target = { back: true }
export const toastTo = (msg: string): Target => ({ toast: msg })
export const flowTo = (flow: FlowId, step?: string): Target => ({ flow, step })
export const run = (fn: () => void): Target => ({ run: fn })

/** One real screen with its tap rules. The first rule is the main path. */
export function Proto({ rules, children }: { rules: AppRule[]; children: ReactNode }) {
  const { back, toast, startFlow } = useProto()
  const mapped: Rule[] = rules.map((r) => {
    const t = r.to
    const to = typeof t === 'string' ? t : 'back' in t ? () => back() : 'toast' in t ? () => toast(t.toast) : 'run' in t ? t.run : () => startFlow(t.flow, t.step)
    return { match: r.match, quiet: r.quiet, soft: r.soft, to }
  })
  return <ProtoScreen rules={mapped}>{children}</ProtoScreen>
}

/**
 * Turns part of a real screen that has no button of its own (a notification, a card)
 * into a tap target, at runtime only: it gets role="button" and an aria-label,
 * which is what the step's rules match.
 */
export function Tappable({ find, label }: { find: (root: HTMLElement) => Element | null; label: string }) {
  const anchor = useRef<HTMLSpanElement>(null)
  useLayoutEffect(() => {
    const root = anchor.current?.parentElement
    const el = root && (find(root) as HTMLElement | null)
    if (!el) return
    el.setAttribute('role', 'button')
    el.setAttribute('aria-label', label)
    el.tabIndex = 0
    el.style.cursor = 'pointer'
    return () => {
      el.removeAttribute('role')
      el.removeAttribute('aria-label')
      el.removeAttribute('tabindex')
      el.style.cursor = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [label])
  return <span ref={anchor} hidden />
}

/** Moves on by itself after `ms` (for "SAYO is typing" moments). */
export function AutoAdvance({ to, ms }: { to: string; ms: number }) {
  const { go } = useProto()
  const goRef = useRef(go)
  goRef.current = go
  useEffect(() => {
    const t = setTimeout(() => goRef.current(to), ms)
    return () => clearTimeout(t)
  }, [to, ms])
  return <span hidden data-proto-auto={to} />
}

/** Marks the end of a flow (stops the timer, shows "done"). */
export function Finish() {
  const { finish } = useProto()
  useEffect(() => {
    finish()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <span hidden data-proto-finish />
}

/**
 * A clearly-not-the-app pill for moments the product cannot show in one sitting,
 * e.g. "a few hours later, a professional replies". Match its label in the rules.
 */
export function SkipAhead({ label }: { label: string }) {
  return (
    <button type="button" className="proto-skip">
      {label}
    </button>
  )
}

/* ───────────────────────── fields ───────────────────────── */

const FILL_LABEL = 'Fill in for me'
const hit = (m: string | RegExp, label: string) => (typeof m === 'string' ? label.toLowerCase().includes(m.toLowerCase()) : m.test(label))

/** Types into a real (React-controlled) input the way a person would, so the screen's own state updates. */
function type(el: HTMLInputElement | HTMLTextAreaElement, value: string) {
  const proto = el instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype
  Object.getOwnPropertyDescriptor(proto, 'value')!.set!.call(el, value)
  el.dispatchEvent(new Event('input', { bubbles: true }))
}

const textFields = (root: HTMLElement) =>
  [...root.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input:not([type=checkbox]):not([type=radio]):not([type=hidden]), textarea')].filter((el) => !el.disabled && !el.readOnly)

export type FieldValue = { match: string | RegExp; value: string }

/**
 * A step with fields. What happens depends on the panel's "Prefill fields" switch:
 *  - off (default): the fields start empty. Tapping a field fills it with sample data,
 *    and the "Fill in for me" pill fills the whole screen. Then the main button glows.
 *  - on: everything arrives filled.
 *
 * Two kinds of screen:
 *  - prop-driven (no state of its own): pass `empty` and `filled` variants plus the
 *    `fields` whose tap swaps them, e.g. <CreateAccount /> and <CreateAccount filled />.
 *  - real inputs: pass the screen as children plus `values` (field label → sample text).
 *  - other controls (a checkbox to tick, a choice to make): pass `extra`, with `pending`
 *    while something is still to do and `fill` to do it. It can be combined with `values`.
 * `rules` are the step's normal rules (first = main path); they work in both states.
 * The "Fill in for me" action shows in the prototype's panel; on a real phone, with no
 * panel, it is a pill over the screen.
 */
export function Fill({
  rules,
  fields = [],
  empty,
  filled,
  values = [],
  extra,
  children,
}: {
  rules: AppRule[]
  fields?: (string | RegExp)[]
  empty?: ReactNode
  filled?: ReactNode
  values?: FieldValue[]
  extra?: { pending: boolean; fill: () => void }
  children?: ReactNode
}) {
  const { prefill, offerFill, fillInPanel } = useProto()
  const swap = empty !== undefined && filled !== undefined
  const [ready, setReady] = useState(swap ? prefill : values.length === 0)
  const anchor = useRef<HTMLSpanElement>(null)
  const root = () => anchor.current?.parentElement ?? null

  /** Fill the real inputs that match (all of them, or one label), then see whether any are left empty. */
  const fillValues = useCallback(
    (only?: string | RegExp) => {
      const r = root()
      if (!r) return
      for (const el of textFields(r)) {
        const v = values.find((x) => hit(x.match, labelOf(el)) && (!only || String(x.match) === String(only)))
        if (v && !el.value) type(el, v.value)
      }
      requestAnimationFrame(() => {
        const left = textFields(r).some((el) => !el.value && values.some((x) => hit(x.match, labelOf(el))))
        setReady(!left)
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [values.map((v) => String(v.match)).join('|')],
  )

  // Real inputs: with Prefill on they are typed in as soon as the screen mounts. Either way,
  // keep "is anything still empty?" up to date, including when she types for herself.
  useEffect(() => {
    if (swap || !values.length) return
    const r = root()
    if (!r) return
    const check = () => setReady(!textFields(r).some((el) => !el.value && values.some((x) => hit(x.match, labelOf(el)))))
    if (prefill) fillValues()
    else requestAnimationFrame(check)
    r.addEventListener('input', check)
    return () => r.removeEventListener('input', check)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const pending = !ready || !!extra?.pending
  const fillAll = () => {
    if (swap) setReady(true)
    else if (values.length) fillValues()
    extra?.fill()
  }
  // The shell's panel gets a "Fill in for me" button for this step while fields are empty.
  const fillRef = useRef(fillAll)
  fillRef.current = fillAll
  useEffect(() => {
    offerFill(pending ? () => fillRef.current() : null)
    return () => offerFill(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pending])
  const pill = pending && !fillInPanel
  const waiting: AppRule[] = !pending
    ? rules
    : [
        ...(pill ? [{ match: FILL_LABEL, to: run(fillAll) }] : []),
        ...(ready ? [] : fields.map((m) => ({ match: m, to: run(() => setReady(true)), soft: true }))),
        ...(swap || ready ? [] : values.map((v) => ({ match: v.match, to: run(() => fillValues(v.match)), soft: true }))),
        // The step's own rules still work, but the main button waits its turn to glow.
        ...rules.map((r, i) => (i === 0 ? { ...r, quiet: true } : r)),
      ]

  return (
    <Proto rules={waiting}>
      <span ref={anchor} hidden />
      {swap ? (ready ? filled : empty) : children}
      {pill && (
        <button type="button" className="proto-skip proto-skip--fill">
          {FILL_LABEL}
        </button>
      )}
    </Proto>
  )
}

/**
 * A PIN pad, entered one digit at a time. `screen(n)` renders the real screen with n
 * digits filled. With "Prefill fields" on, three digits are already in.
 */
export function Pin({ screen, next, rules = [] }: { screen: (filled: number) => ReactNode; next: string; rules?: AppRule[] }) {
  const { prefill, go } = useProto()
  const [n, setN] = useState(prefill ? 3 : 0)
  return (
    <Proto
      rules={[
        { match: /^[0-9]$/, to: run(() => (n >= 3 ? go(next) : setN(n + 1))) },
        { match: /^Delete$/, to: run(() => setN(Math.max(0, n - 1))), quiet: true },
        ...rules,
      ]}
    >
      {screen(n)}
    </Proto>
  )
}
