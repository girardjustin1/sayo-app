import type { CSSProperties } from 'react'
import { INK_IMAGES, INK_NOTES } from './ink'
import { CLAY_IMAGES, CLAY_NOTES } from './clay'
import { QUIET_IMAGES, QUIET_NOTES } from './quiet'
import { GROVE_IMAGES, GROVE_NOTES } from './grove'
import type { R2Direction, R2Image, R2Slot } from './types'
import type { DirectionId } from '../../../directions'

export const R2_IMAGERY: Record<R2Direction, R2Image[]> = { ink: INK_IMAGES, clay: CLAY_IMAGES, quiet: QUIET_IMAGES, grove: GROVE_IMAGES }
export const R2_NOTES: Record<R2Direction, string[]> = { ink: INK_NOTES, clay: CLAY_NOTES, quiet: QUIET_NOTES, grove: GROVE_NOTES }

const isR2 = (d: DirectionId): d is R2Direction => d in R2_IMAGERY

/** The image for a slot in a direction, if it exists yet (round-1 directions have none). */
export function r2image(direction: DirectionId, slot: R2Slot): R2Image | undefined {
  return isR2(direction) ? R2_IMAGERY[direction].find((i) => i.slot === slot) : undefined
}

/**
 * Renders a round-2 image slot, or a quiet brand panel when the image is not there yet,
 * so screens can be built before imagery lands and still look intentional.
 */
export function R2Img({ direction, slot, height, radius, style, position }: { direction: DirectionId; slot: R2Slot; height: number | string; radius?: number | string; style?: CSSProperties; position?: string }) {
  const img = r2image(direction, slot)
  const base: CSSProperties = { display: 'block', width: '100%', height, borderRadius: radius, ...style }
  if (!img) return <div role="img" aria-label="" style={{ ...base, background: 'var(--sayo-hero)' }} />
  return <img src={img.src} alt={img.alt} loading="lazy" style={{ ...base, objectFit: 'cover', objectPosition: position ?? img.position ?? 'center 30%' }} />
}

export type { R2Direction, R2Image, R2Slot } from './types'
export { R2_SLOTS } from './types'
