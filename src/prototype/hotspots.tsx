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
}

export const TAPPABLE =
  'button, a, [role="button"], [role="tab"], [role="switch"], [role="radio"], [role="checkbox"], [role="link"], [role="option"], [role="menuitem"], label, summary'

export const labelOf = (el: Element) => (el.getAttribute('aria-label') || (el as HTMLElement).innerText || el.textContent || '').replace(/\s+/g, ' ').trim()

const hit = (m: string | RegExp, label: string) => (typeof m === 'string' ? label.toLowerCase().includes(m.toLowerCase()) : m.test(label))

function useHighlight(ref: React.RefObject<HTMLElement | null>, rules: Rule[], enabled: boolean) {
  const key = rules.map((r) => `${r.match}${r.quiet ? '~' : ''}`).join('|')
  useLayoutEffect(() => {
    const root = ref.current
    if (!root) return
    const paint = () => {
      root.querySelectorAll('[data-hot-auto]').forEach((el) => el.removeAttribute('data-hot-auto'))
      root.querySelectorAll('[data-hot-primary]').forEach((el) => el.removeAttribute('data-hot-primary'))
      const tappables = [...root.querySelectorAll(TAPPABLE)].filter((el) => !(el as HTMLButtonElement).disabled && el.getAttribute('aria-disabled') !== 'true')
      const unmatched: string[] = []
      rules.forEach((rule, i) => {
        // The innermost matching element, first in the document.
        const el = tappables.find((t) => {
          const label = labelOf(t)
          if (!hit(rule.match, label)) return false
          return ![...t.querySelectorAll(TAPPABLE)].some((c) => labelOf(c) === label)
        })
        if (!el) return void unmatched.push(String(rule.match))
        if (i === 0) el.setAttribute('data-hot-primary', '')
        if (!rule.quiet && enabled) el.setAttribute('data-hot-auto', '')
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
