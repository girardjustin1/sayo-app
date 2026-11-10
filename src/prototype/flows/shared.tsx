import { useLayoutEffect, useRef, type ReactNode } from 'react'

/* Prototype-only helpers shared by the Circle and Safety flows. The screens are never edited. */

/**
 * The SkipAhead pill sits 28px from the bottom of the phone, which on some screens is on top
 * of a button or a line of text. This puts it `bottom` px from the bottom instead, where the
 * screen has empty space.
 */
export function Lift({ bottom, children }: { bottom: number; children: ReactNode }) {
  return <div style={{ position: 'absolute', left: 0, right: 0, bottom: bottom - 28, height: 0, zIndex: 40 }}>{children}</div>
}

/**
 * A card that is one big button
 * (a post in the feed, a Yes / No answer) keeps its real button at 1px, so the hint ring
 * would be a dot nobody sees. At runtime only, this names each card after its button,
 * "<label> (card)", so the ring surrounds the whole card. Taps route as before: rules that
 * match by "includes" or from the start of the label match the card as well as its button.
 */
export function CardRings() {
  const anchor = useRef<HTMLSpanElement>(null)
  useLayoutEffect(() => {
    const root = anchor.current?.parentElement
    if (!root) return
    const named: HTMLElement[] = []
    root.querySelectorAll<HTMLElement>('[data-pressable-container] > button[aria-label], [data-pressable-container] > a[aria-label]').forEach((button) => {
      const card = button.parentElement
      if (!card || card.hasAttribute('role') || card.hasAttribute('aria-label')) return
      card.setAttribute('role', 'button')
      card.setAttribute('aria-label', `${button.getAttribute('aria-label')} (card)`)
      named.push(card)
    })
    return () =>
      named.forEach((card) => {
        card.removeAttribute('role')
        card.removeAttribute('aria-label')
      })
  }, [])
  return <span ref={anchor} hidden />
}
