import { useSyncExternalStore } from 'react'
import type { DirectionId } from '../brand/directions'

/** One brand direction shared by every live screen on a docs page (MDX blocks are separate components). */
let current: DirectionId = 'clay'
const subs = new Set<() => void>()

export const setDocsDirection = (d: DirectionId) => {
  current = d
  subs.forEach((f) => f())
}
export const useDocsDirection = () =>
  useSyncExternalStore(
    (cb) => {
      subs.add(cb)
      return () => subs.delete(cb)
    },
    () => current,
  )

/**
 * Link into the clickable prototype: the prototype dev server (`pnpm dev`) while Storybook runs in
 * dev mode, otherwise /prototype/, which every Storybook build ships next to itself.
 */
export const protoUrl = (hash = '#/') => (import.meta.env.DEV ? `http://localhost:5340/${hash}` : `./prototype/${hash}`)
