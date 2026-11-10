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

/** Link into the clickable prototype: the local dev server, or /prototype/ next to the hosted Storybook. */
export const protoUrl = (hash = '#/') => (['localhost', '127.0.0.1'].includes(window.location.hostname) ? `http://localhost:5340/${hash}` : `./prototype/${hash}`)
