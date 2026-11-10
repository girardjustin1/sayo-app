/** One image slot per use, the same ten slots in every round-2 direction. */
export type R2Slot =
  | 'hero' // 3:4 portrait. Splash and landing hero.
  | 'wide' // 16:9. Landing band, decks.
  | 'tile-ask' // 4:3. Bento tile: Ask SAYO.
  | 'tile-review' // 4:3. Bento tile: verified professional review.
  | 'tile-care' // 4:3. Bento tile: Find Care.
  | 'tile-circle' // 4:3. Bento tile: the Circle.
  | 'topic-prep' // 3:2. Learn card "PrEP is prevention".
  | 'topic-contraception' // 3:2. Learn card "Your contraception options".
  | 'topic-mood' // 3:2. Learn card "When your mood feels heavy".
  | 'empty' // 1:1. Empty states; must read at 120px.

export type R2Direction = 'ink' | 'clay' | 'quiet' | 'grove'

export interface R2Image {
  slot: R2Slot
  /** Served from public/, e.g. /imagery/round2/grove/hero.jpg */
  src: string
  alt: string
  ratio: string
  /** CSS object-position for cropped uses (default 'center 30%'), e.g. 'center top'. */
  position?: string
  /** Exact prompt sent to the model. */
  prompt: string
  model?: string
}

export const R2_SLOTS: R2Slot[] = ['hero', 'wide', 'tile-ask', 'tile-review', 'tile-care', 'tile-circle', 'topic-prep', 'topic-contraception', 'topic-mood', 'empty']
