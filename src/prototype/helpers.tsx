import { useEffect, useLayoutEffect, useRef, type ReactNode } from 'react'
import { ProtoScreen, type Rule } from './hotspots'
import { useProto } from './ProtoContext'
import type { FlowId } from './flows/types'

/**
 * Prototype-only helpers. They sit next to a real screen inside `Proto`;
 * the screens themselves are never edited.
 */

/** Where a tap goes: a step id, back, a toast, or another flow. */
export type Target = string | { back: true } | { toast: string } | { flow: FlowId; step?: string }
export type AppRule = { match: string | RegExp; to: Target; quiet?: boolean }

export const BACK: Target = { back: true }
export const toastTo = (msg: string): Target => ({ toast: msg })
export const flowTo = (flow: FlowId, step?: string): Target => ({ flow, step })

/** One real screen with its tap rules. The first rule is the main path. */
export function Proto({ rules, children }: { rules: AppRule[]; children: ReactNode }) {
  const { back, toast, startFlow } = useProto()
  const mapped: Rule[] = rules.map((r) => {
    const t = r.to
    const to = typeof t === 'string' ? t : 'back' in t ? () => back() : 'toast' in t ? () => toast(t.toast) : () => startFlow(t.flow, t.step)
    return { match: r.match, quiet: r.quiet, to }
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
