import { useEffect, useLayoutEffect, useRef, type ReactNode } from 'react'
import { useProto } from './ProtoContext'

/**
 * Click-through layer over the real Storybook screens.
 *
 * Screens stay exactly as designed (no prototype props): a rule matches a tappable
 * element by its visible text or aria-label and says where it goes. Matching elements
 * get a soft pulsing ring (`data-hot-auto`) so the next step is obvious; the first
 * rule's element is also marked `data-hot-primary` (the main path, used by
 * scripts/check-prototype.mjs). Everything else on the screen keeps working normally.
 */
export type Rule = {
  /** Text or aria-label of the control. Strings match case-insensitively by "includes". */
  match: string | RegExp
  to: string | (() => void)
  /** No hint ring (a secondary route). */
  quiet?: boolean
  /** A calm, still outline instead of the pulsing ring (fields waiting to be filled). */
  soft?: boolean
}

export const TAPPABLE =
  'button, a, [role="button"], [role="tab"], [role="switch"], [role="radio"], [role="checkbox"], [role="link"], [role="option"], [role="menuitem"], label, summary, input, textarea, select'

const clean = (s: string | null | undefined) => (s ?? '').replace(/\s+/g, ' ').trim()

/** The name a rule matches: aria-label, else visible text; form fields use their label, then placeholder. */
export const labelOf = (el: Element) => {
  const aria = clean(el.getAttribute('aria-label'))
  if (aria) return aria
  if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement) {
    const by = el.getAttribute('aria-labelledby')
    const named = by ? clean(by.split(' ').map((id) => document.getElementById(id)?.textContent ?? '').join(' ')) : ''
    return named || clean(el.labels?.[0]?.textContent) || clean(el.getAttribute('placeholder')) || clean(el.getAttribute('name'))
  }
  return clean((el as HTMLElement).innerText || el.textContent)
}

const hit = (m: string | RegExp, label: string) => (typeof m === 'string' ? label.toLowerCase().includes(m.toLowerCase()) : m.test(label))

function useHighlight(ref: React.RefObject<HTMLElement | null>, rules: Rule[], enabled: boolean) {
  const key = rules.map((r) => `${r.match}${r.quiet ? '~' : ''}${r.soft ? '+' : ''}`).join('|')
  useLayoutEffect(() => {
    const root = ref.current
    if (!root) return
    const paint = () => {
      root.querySelectorAll('[data-hot-auto]').forEach((el) => el.removeAttribute('data-hot-auto'))
      root.querySelectorAll('[data-hot-primary]').forEach((el) => el.removeAttribute('data-hot-primary'))
      root.querySelectorAll('[data-hot-soft]').forEach((el) => el.removeAttribute('data-hot-soft'))
      const all = [...root.querySelectorAll(TAPPABLE)]
      const off = (el: Element) => (el as HTMLButtonElement).disabled || el.getAttribute('aria-disabled') === 'true'
      const unmatched: string[] = []
      rules.forEach((rule, i) => {
        // The innermost matching element, first in the document. A disabled match still counts as
        // "exists" (e.g. Continue before the form is filled) but never glows.
        const matches = all.filter((t) => {
          const label = labelOf(t)
          if (!hit(rule.match, label)) return false
          return ![...t.querySelectorAll(TAPPABLE)].some((c) => labelOf(c) === label)
        })
        if (!matches.length) return void unmatched.push(String(rule.match))
        // Ring the field itself, not its label text.
        const live = matches.filter((m) => !off(m))
        const el = live.find((m) => m.matches('input, textarea, select')) ?? live[0]
        if (!el) return
        if (i === 0) el.setAttribute('data-hot-primary', '')
        if (!rule.quiet && enabled) el.setAttribute(rule.soft ? 'data-hot-soft' : 'data-hot-auto', '')
      })
      // Read by scripts/check-prototype.mjs: a rule that matches nothing is a dead end.
      if (unmatched.length) root.setAttribute('data-proto-unmatched', unmatched.join(' | '))
      else root.removeAttribute('data-proto-unmatched')
    }
    paint()
    const mo = new MutationObserver(() => requestAnimationFrame(paint))
    mo.observe(root, { childList: true, subtree: true, characterData: true })
    return () => mo.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, key, enabled])
}

/** Wraps one real screen and routes taps according to `rules`. */
export function ProtoScreen({ rules, children }: { rules: Rule[]; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const { go, back, hints, tap, toast } = useProto()
  useHighlight(ref, rules, hints)
  useEffect(() => {
    ref.current?.querySelector('.sayo-screen__body')?.scrollTo({ top: 0 })
  }, [children])

  return (
    <div
      ref={ref}
      className="proto-screen"
      onClickCapture={(e) => {
        const el = (e.target as Element).closest(TAPPABLE)
        if (!el || !ref.current?.contains(el)) return
        tap()
        // Innermost first: a row may contain its own buttons.
        let node: Element | null = el
        while (node && ref.current.contains(node)) {
          const label = labelOf(node)
          const rule = rules.find((r) => hit(r.match, label))
          if (rule) {
            e.preventDefault()
            e.stopPropagation()
            if (typeof rule.to === 'function') rule.to()
            else go(rule.to)
            return
          }
          node = node.parentElement?.closest(TAPPABLE) ?? null
        }
        const label = labelOf(el)
        if (/^(back|close)$/i.test(label)) {
          e.preventDefault()
          e.stopPropagation()
          back()
          return
        }
        if (el instanceof HTMLAnchorElement && el.getAttribute('href')) {
          e.preventDefault()
          toast('Not part of this prototype')
        }
      }}
    >
      {children}
    </div>
  )
}
