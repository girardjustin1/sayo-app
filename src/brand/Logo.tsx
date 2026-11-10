import { useId } from 'react'
import { BOUNDS, DOT, MARK, WORD } from './logo/paths'

/** color: on light · onDark: gradient mark + white word · reverse: all white (on the gradient) · mono: currentColor */
type Variant = 'color' | 'onDark' | 'reverse' | 'mono'

const PAD = 2
const box = ([x0, y0, x1, y1]: readonly number[]) => `${x0 - PAD} ${y0 - PAD} ${x1 - x0 + PAD * 2} ${y1 - y0 + PAD * 2}`
const lockupBox = [BOUNDS.mark[0], BOUNDS.mark[1], BOUNDS.word[2], BOUNDS.mark[3]] as const

function Gradient({ id }: { id: string }) {
  return (
    <linearGradient id={id} x1={BOUNDS.mark[0]} y1="0" x2={BOUNDS.mark[2]} y2="0" gradientUnits="userSpaceOnUse">
      <stop offset="0" stopColor="#D4009E" />
      <stop offset="0.55" stopColor="#F0346A" />
      <stop offset="1" stopColor="#FF5A48" />
    </linearGradient>
  )
}

/** The heart-S mark on its own. `mono` uses currentColor. */
export function LogoMark({ size = 32, variant = 'color' }: { size?: number; variant?: Variant }) {
  const id = useId()
  const isGradient = variant === 'color' || variant === 'onDark'
  const fill = isGradient ? `url(#${id})` : variant === 'reverse' ? '#FFFFFF' : 'currentColor'
  return (
    <svg viewBox={box(BOUNDS.mark)} height={size} role="img" aria-label="sayo" style={{ display: 'block' }}>
      {isGradient && <defs><Gradient id={id} /></defs>}
      <path fill={fill} fillRule="evenodd" d={MARK} />
    </svg>
  )
}

/** Mark + wordmark. `reverse` = white wordmark for dark or gradient backgrounds. */
export function Logo({ height = 32, variant = 'color' }: { height?: number; variant?: Variant }) {
  const id = useId()
  const markFill = variant === 'mono' ? 'currentColor' : variant === 'reverse' ? '#FFFFFF' : `url(#${id})`
  const wordFill = variant === 'color' ? '#2A2D32' : variant === 'mono' ? 'currentColor' : '#FFFFFF'
  const dotFill = variant === 'mono' ? 'currentColor' : variant === 'reverse' ? '#FFFFFF' : '#FF5A48'
  return (
    <svg viewBox={box(lockupBox)} height={height} role="img" aria-label="sayo" style={{ display: 'block' }}>
      {(variant === 'color' || variant === 'onDark') && <defs><Gradient id={id} /></defs>}
      <path fill={markFill} fillRule="evenodd" d={MARK} />
      <path fill={wordFill} fillRule="evenodd" d={WORD} />
      <path fill={dotFill} d={DOT} />
    </svg>
  )
}

/** Wordmark only ("sayo" with the coral dot). */
export function Wordmark({ height = 24, variant = 'color' }: { height?: number; variant?: Variant }) {
  const wordFill = variant === 'color' ? '#2A2D32' : variant === 'mono' ? 'currentColor' : '#FFFFFF'
  return (
    <svg viewBox={box(BOUNDS.word)} height={height} role="img" aria-label="sayo" style={{ display: 'block' }}>
      <path fill={wordFill} fillRule="evenodd" d={WORD} />
      <path fill={variant === 'mono' ? 'currentColor' : variant === 'reverse' ? '#FFFFFF' : '#FF5A48'} d={DOT} />
    </svg>
  )
}
