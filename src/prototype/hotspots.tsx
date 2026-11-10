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

/**
 * Astryx clickable cards keep their real <button> at 1 × 1px inside a
 * [data-pressable-container]; what a person sees and taps is the card around it.
 */
const PRESSABLE = '[data-pressable-container]'
const pressableControl = (card: Element) => card.querySelector(':scope > button, :scope > a')
/** The thing a person actually sees for a control: the card, if the control is its hidden button. */
const surface = (el: Element | undefined) => {
  if (!el) return el
  const card = el.parentElement
  if (!card) return el
  if (card.matches(PRESSABLE) && pressableControl(card) === el) return card
  // Astryx adds the container attribute after mount, so also go by what is on screen:
  // a control about a pixel in size is never what a person sees.
  const { offsetWidth: w, offsetHeight: h } = el as HTMLElement
  return w > 0 && h > 0 && w <= 2 && h <= 2 ? card : el
}
/** Every control a tap at `target` could mean, innermost first. */
function controlsAt(target: Element, root: Element) {
  const out: Element[] = []
  for (let node: Element | null = target; node && root.contains(node); node = node.parentElement) {
    if (node.matches(TAPPABLE)) out.push(node)
    else if (node.matches(PRESSABLE)) {
      const control = pressableControl(node)
      if (control) out.push(control)
    }
  }
  return out
}

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
        // Ring the field itself, not its label text; and the whole card when the real control
        // is the 1px button Astryx keeps inside a clickable card.
        const live = matches.filter((m) => !off(m))
        const el = surface(live.find((m) => m.matches('input, textarea, select')) ?? live[0])
        if (!el) return
        if (i === 0) el.setAttribute('data-hot-primary', '')
        if (!rule.quiet && enabled) el.setAttribute(rule.soft ? 'data-hot-soft' : 'data-hot-auto', '')
      })
      // Read by scripts/check-prototype.mjs: a rule that matches nothing is a dead end.
      if (unmatched.length) root.setAttribute('data-proto-unmatched', unmatched.join(' | '))
      else root.removeAttribute('data-proto-unmatched')
    }
    paint()
    // One pending repaint at most, cancelled on cleanup: a frame requested under the old
    // rules must not run after the rules change, or it would ring the previous control.
    let frame = 0
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(paint)
    })
    // Attributes too, but only the ones that change which control gets the ring (never our own).
    mo.observe(root, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['data-pressable-container', 'disabled', 'aria-disabled'] })
    return () => {
      mo.disconnect()
      cancelAnimationFrame(frame)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, key, enabled])
}

/** Wraps one real screen and routes taps according to `rules`. */
export function ProtoScreen({ rules, children }: { rules: Rule[]; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const lastTap = useRef(0)
  const { go, back, hints, tap, toast } = useProto()
  useHighlight(ref, rules, hints)
  // A new step starts at the top. (Not on every render: a tap that ticks a box must not scroll the screen.)
  useEffect(() => {
    ref.current?.querySelector('.sayo-screen__body')?.scrollTo({ top: 0 })
  }, [])

  return (
    <div
      ref={ref}
      className="proto-screen"
      onClickCapture={(e) => {
        const root = ref.current
        if (!root) return
        const controls = controlsAt(e.target as Element, root)
        if (!controls.length) return
        // Count the tap after this click has finished. Updating state now would re-render in the
        // middle of the click and undo a checkbox, switch or radio before its own handler runs.
        // A tap on a label also clicks its input: count that once.
        if (e.timeStamp - lastTap.current > 40) setTimeout(tap, 0)
        lastTap.current = e.timeStamp
        // Innermost first: a row may contain its own buttons.
        for (const node of controls) {
          const label = labelOf(node)
          const rule = rules.find((r) => hit(r.match, label))
          if (!rule) continue
          e.preventDefault()
          e.stopPropagation()
          if (typeof rule.to === 'function') rule.to()
          else go(rule.to)
          return
        }
        const el = controls[0]
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
