import type { DirectionId } from '../directions'

export type ImageUse = 'hero' | 'wide' | 'topic' | 'empty'
export type Score = 1 | 2 | 3 | 4 | 5

export interface ApproachImage {
  /** Served from public/, e.g. /imagery/approaches/candid/hero-sister.jpg */
  src: string
  alt: string
  ratio: string
  use: ImageUse
  /** For heroes: which direction it was art-directed for. */
  direction?: DirectionId
  /** For topic images: the Learn card it illustrates. */
  topic?: string
  /** Exact prompt sent to the model, so it can be regenerated. */
  prompt: string
  model?: string
}

export interface Approach {
  slug: 'candid' | 'faceless' | 'editorial' | 'illustrated' | 'objects' | 'abstract'
  number: 1 | 2 | 3 | 4 | 5 | 6
  name: string
  /** One sentence: what the pictures are of. */
  idea: string
  why: string[]
  risks: string[]
  scores: { privacy: Score; warmth: Score; distinct: Score; scalable: Score }
  bestFor: string[]
  avoidFor: string[]
  images: ApproachImage[]
  /** Honest notes from generating the images: what worked, what didn't. */
  notes?: string[]
}
