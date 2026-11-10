import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Prototype-only helpers for the professional flow. Like `Tappable`, they act on the
 * rendered screen at runtime; the screens themselves are never edited.
 */

type Find = (root: HTMLElement) => Element | null

export const clean = (s: string | null | undefined) => (s ?? '').replace(/\s+/g, ' ').trim()

/**
 * `Tappable` for several elements at once, re-applied whenever the screen re-creates them
 * (a table that filters or sorts its rows). Gives each one role="button" and an aria-label,
 * which is what the step's rules match: this is how rows that all say "Preview" get told apart.
 */
export function Labels({ items }: { items: { find: Find; label: string }[] }) {
  const anchor = useRef<HTMLSpanElement>(null)
  useLayoutEffect(() => {
    const root = anchor.current?.parentElement
    if (!root) return
    const apply = () =>
      items.forEach(({ find, label }) => {
        const el = find(root) as HTMLElement | null
        if (!el || el.getAttribute('aria-label') === label) return
        el.setAttribute('role', 'button')
        el.setAttribute('aria-label', label)
        el.tabIndex = 0
        el.style.cursor = 'pointer'
      })
    apply()
    const mo = new MutationObserver(apply)
    mo.observe(root, { childList: true, subtree: true })
    return () => mo.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <span ref={anchor} hidden />
}

/** The table row that shows this case id. */
export const rowOf = (id: string): Find => (root) => [...root.querySelectorAll('tr')].find((tr) => tr.textContent?.includes(id)) ?? null
/** The button at the end of that row ("Preview", "View"). */
export const rowButton = (id: string): Find => (root) => rowOf(id)(root)?.querySelector('button') ?? null

/**
 * Reads something off the rendered screen (is the box ticked? is a decision chosen?) and
 * re-reads it after anything the tester does there, so a step's rules can follow controls
 * the screen handles itself. Render `anchor` inside the step's `Proto` or `Fill`.
 */
export function useScreen<T extends string | boolean>(read: (root: HTMLElement) => T, initial: T): { state: T; root: () => HTMLElement | null; anchor: ReactNode } {
  const ref = useRef<HTMLSpanElement>(null)
  const [state, setState] = useState(initial)
  const root = () => ref.current?.closest<HTMLElement>('.proto-screen') ?? null
  useEffect(() => {
    const r = root()
    if (!r) return
    let frame = 0
    const update = () => setState(read(r))
    // Once per frame, after the screen has re-rendered with its new state.
    const later = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }
    // Typing changes no DOM; everything else the screen does (a radio, a selector, a dialog) does.
    const events = ['input', 'change']
    events.forEach((e) => r.addEventListener(e, later))
    const mo = new MutationObserver(later)
    mo.observe(r, { childList: true, subtree: true, attributes: true, characterData: true })
    update()
    return () => {
      cancelAnimationFrame(frame)
      mo.disconnect()
      events.forEach((e) => r.removeEventListener(e, later))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return { state, root, anchor: <span ref={ref} hidden /> }
}
