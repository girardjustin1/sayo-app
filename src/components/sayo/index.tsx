import type { ReactNode } from 'react'
import { BadgeCheck, Building2, Check, Clock, Info, MapPin, Phone, ShieldAlert } from 'lucide-react'
import { HStack } from '@astryxdesign/core/HStack'
import { VStack } from '@astryxdesign/core/VStack'
import { Text } from '@astryxdesign/core/Text'
import { Badge } from '@astryxdesign/core/Badge'
import { Icon } from '@astryxdesign/core/Icon'
import { Card } from '@astryxdesign/core/Card'
import { LOCKED_COPY } from '../../brand/directions'
import { useDirection } from '../../brand/DirectionContext'
import type { CareDecision, CaseStatus, Service, ServiceCategory } from '../../data/types'

/* ------------------------------------------------------------------ type */

/** Brand display headline. Uses the direction's display face (Fraunces in Unmuted). */
export function Display({ children, size = 'lg', as: As = 'h1', gradient = false }: { children: ReactNode; size?: 'xl' | 'lg' | 'md' | 'sm'; as?: 'h1' | 'h2' | 'h3' | 'p'; gradient?: boolean }) {
  const { direction } = useDirection()
  return <As className={`sayo-display sayo-display--${size}${gradient ? ' sayo-gradient-text' : ''}`}>{emphasise(children, direction.emphasize)}</As>
}

/** Wraps the first phrase from the direction's `emphasize` list in <em> (styled per direction). */
function emphasise(children: ReactNode, phrases?: string[]): ReactNode {
  if (typeof children !== 'string' || !phrases) return children
  for (const p of phrases) {
    const i = children.toLowerCase().indexOf(p.toLowerCase())
    if (i >= 0) return <>{children.slice(0, i)}<em>{children.slice(i, i + p.length)}</em>{children.slice(i + p.length)}</>
  }
  return children
}

/* ----------------------------------------------- AI / pro / peer labels */

/** Every AI answer carries this. Wording is locked. */
export function AiNote({ children = LOCKED_COPY.notDiagnosis }: { children?: ReactNode }) {
  return (
    <HStack gap={1.5} vAlign="start" role="note">
      <Icon icon={Info} size="sm" color="secondary" />
      <Text type="supporting">{children}</Text>
    </HStack>
  )
}

/**
 * SAYO's AI marker: the "o" of the wordmark with its coral dot. Replaces a robot icon:
 * SAYO is the speaker, and the word "AI" always sits next to it, so it stays transparent.
 */
export function AiMark({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden style={{ flex: 'none', display: 'block' }}>
      <circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="8" cy="8" r="2.4" fill="#FF5A48" />
    </svg>
  )
}

/** Marks AI-written content in chat and summaries. */
export function AiLabel({ label }: { label: string }) {
  return (
    <HStack gap={1} vAlign="center">
      <AiMark size={14} />
      <Text type="supporting" size="xsm" weight="semibold">{label}</Text>
    </HStack>
  )
}

/** "Verified Professional ✓": the only place this green badge appears. */
export function ProBadge({ profession }: { profession?: string }) {
  return <Badge variant="green" icon={<BadgeCheck size={12} />} label={profession ? `${LOCKED_COPY.proBadge} · ${profession}` : LOCKED_COPY.proBadge} />
}

/** Professional-written content block (left rule + green tint). */
export function ProBlock({ children, title }: { children: ReactNode; title?: string }) {
  return (
    <Card variant="green" padding={4}>
      <VStack gap={1.5}>
        {title && <Text weight="bold">{title}</Text>}
        <Text as="div">{children}</Text>
      </VStack>
    </Card>
  )
}

/* -------------------------------------------------------- review outcome */

const DECISION_TONE: Record<CareDecision, 'success' | 'warning' | 'error'> = { none: 'success', routine: 'warning', urgent: 'error' }

/** The professional's in-person care decision. Labels are locked. */
export function CareDecisionTag({ decision }: { decision: CareDecision }) {
  return <Badge variant={DECISION_TONE[decision]} label={LOCKED_COPY.careDecisions[decision]} />
}

export const SERVICE_CATEGORY_LABEL: Record<ServiceCategory, string> = {
  sexual_health: 'Sexual health / STI service',
  hiv: 'HIV / PrEP / PEP',
  general: 'General clinic / hospital',
  mental_health: 'Mental health',
  substance: 'Substance-use support',
  gbv: 'GBV / sexual assault support',
  other: 'Other service',
}

export function ServiceCategoryTag({ category }: { category: ServiceCategory }) {
  return <Badge variant="purple" label={SERVICE_CATEGORY_LABEL[category]} icon={<Building2 size={12} />} />
}

const STATUS_LABEL: Record<CaseStatus, string> = {
  draft: 'Draft',
  queued: 'Waiting for a professional',
  in_review: 'Being reviewed',
  answered: 'Response ready',
  closed: 'Closed',
}
const STATUS_TONE: Record<CaseStatus, 'neutral' | 'info' | 'warning' | 'green'> = {
  draft: 'neutral',
  queued: 'warning',
  in_review: 'info',
  answered: 'green',
  closed: 'neutral',
}
export function CaseStatusBadge({ status }: { status: CaseStatus }) {
  return <Badge variant={STATUS_TONE[status]} label={STATUS_LABEL[status]} />
}

/** Vertical progress for a review: sent → picked up → answered. */
export function ReviewTimeline({ status, sentAt, acceptedAt, answeredAt }: { status: CaseStatus; sentAt: string; acceptedAt?: string; answeredAt?: string }) {
  const steps = [
    { label: 'Sent for review', at: sentAt, done: true },
    { label: 'A professional picked it up', at: acceptedAt, done: status === 'in_review' || status === 'answered' || status === 'closed' },
    { label: 'Response ready', at: answeredAt, done: status === 'answered' || status === 'closed' },
  ]
  return (
    <VStack gap={0}>
      {steps.map((s, i) => (
        <HStack key={s.label} gap={3} vAlign="start">
          <VStack hAlign="center" gap={0}>
            <span
              style={{
                width: 22, height: 22, borderRadius: '50%', display: 'grid', placeItems: 'center',
                background: s.done ? 'var(--color-accent)' : 'var(--color-background-surface)',
                border: s.done ? 'none' : '2px solid var(--color-border-emphasized)',
                color: 'var(--color-on-accent)',
              }}
            >
              {s.done ? <Check size={13} /> : null}
            </span>
            {i < steps.length - 1 && <span style={{ width: 2, height: 26, background: s.done ? 'var(--color-accent)' : 'var(--color-border)' }} />}
          </VStack>
          <VStack gap={0}>
            <Text weight={s.done ? 'semibold' : 'normal'} color={s.done ? 'primary' : 'secondary'}>{s.label}</Text>
            {s.at && <Text type="supporting" size="xsm">{s.at}</Text>}
          </VStack>
        </HStack>
      ))}
    </VStack>
  )
}

/* -------------------------------------------------------------- services */

export function ServiceCard({ service, compact = false }: { service: Service; compact?: boolean }) {
  return (
    <Card padding={4}>
      <VStack gap={2}>
        <VStack gap={0.5}>
          <Text weight="bold">{service.name}</Text>
          <HStack gap={1.5} vAlign="center" wrap="wrap">
            <Text type="supporting">{service.type}</Text>
            {service.verified && (
              <Badge variant="green" icon={<BadgeCheck size={12} />} label="Verified by SAYO" />
            )}
          </HStack>
        </VStack>
        {!compact && <Text type="supporting">{service.categories.map((c) => SERVICE_CATEGORY_LABEL[c]).join(' · ')}</Text>}
        <HStack gap={3} wrap="wrap">
          <HStack gap={1} vAlign="center"><MapPin size={14} /><Text type="supporting">{service.area} · {service.distanceKm} km</Text></HStack>
          <HStack gap={1} vAlign="center"><Clock size={14} /><Text type="supporting">{service.hours}</Text></HStack>
        </HStack>
        {!compact && <HStack gap={1} vAlign="center"><Phone size={14} /><Text type="supporting">{service.phone}</Text></HStack>}
      </VStack>
    </Card>
  )
}

/* ---------------------------------------------------------------- safety */

export function EmergencyNote() {
  return (
    <HStack gap={2} vAlign="start">
      <ShieldAlert size={18} style={{ flex: 'none', color: 'var(--color-error)' }} />
      <Text type="supporting">{LOCKED_COPY.emergency}</Text>
    </HStack>
  )
}

/* ---------------------------------------------------------------- avatars */

const AVATAR_PALETTES = [
  ['#FFD9C7', '#D62B63'],
  ['#EDE4F7', '#6D2E9E'],
  ['#FDE7F3', '#C4007F'],
  ['#E3F4EC', '#2F8F6B'],
  ['#FFF1D6', '#C77700'],
  ['#E2EEFB', '#2C5EA8'],
]
const SHAPES = ['circle', 'flower', 'sun', 'wave', 'drop', 'star'] as const

/**
 * Circle avatars: abstract, generated from the username. No photos, ever.
 * Users pick a shape + colour; this is the default.
 */
export function SayoAvatar({ seed, size = 36 }: { seed: string; size?: number }) {
  let h = 0
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  const [bg, fg] = AVATAR_PALETTES[h % AVATAR_PALETTES.length]
  const shape = SHAPES[(h >>> 3) % SHAPES.length]
  const g = {
    circle: <circle cx="20" cy="20" r="8" fill={fg} />,
    flower: <g fill={fg}>{[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx="20" cy="13" rx="4.5" ry="7" transform={`rotate(${a} 20 20)`} />)}<circle cx="20" cy="20" r="3.5" fill={bg} /></g>,
    sun: <g fill={fg}><circle cx="20" cy="20" r="6" />{[0, 45, 90, 135, 180, 225, 270, 315].map((a) => <rect key={a} x="19" y="7" width="2" height="5" rx="1" transform={`rotate(${a} 20 20)`} />)}</g>,
    wave: <path d="M8 22c4-6 8-6 12 0s8 6 12 0" stroke={fg} strokeWidth="4" fill="none" strokeLinecap="round" />,
    drop: <path d="M20 9c5 7 8 11 8 15a8 8 0 0 1-16 0c0-4 3-8 8-15z" fill={fg} />,
    star: <path d="M20 9l3.2 7 7.6.8-5.7 5.1 1.6 7.5L20 25.6l-6.7 3.8 1.6-7.5-5.7-5.1 7.6-.8z" fill={fg} />,
  }[shape]
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" role="img" aria-label={`${seed} avatar`} style={{ flex: 'none', display: 'block' }}>
      <circle cx="20" cy="20" r="20" fill={bg} />
      {g}
    </svg>
  )
}

/* ------------------------------------------------------------------- PIN */

export function PinDots({ filled, error = false }: { filled: number; error?: boolean }) {
  return (
    <div className="sayo-pin-dots" aria-label={`${filled} of 4 digits entered`}>
      {[0, 1, 2, 3].map((i) => <span key={i} className="sayo-pin-dot" data-filled={i < filled} data-error={error} />)}
    </div>
  )
}

export function Keypad({ onKey, extra }: { onKey?: (k: string) => void; extra?: ReactNode }) {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
  return (
    <div className="sayo-keypad">
      {keys.map((k) => <button key={k} className="sayo-key" type="button" onClick={() => onKey?.(k)}>{k}</button>)}
      <span>{extra}</span>
      <button className="sayo-key" type="button" onClick={() => onKey?.('0')}>0</button>
      <button className="sayo-key sayo-key--ghost" type="button" onClick={() => onKey?.('del')}>Delete</button>
    </div>
  )
}

/* ---------------------------------------------------------------- layout */

/** Section heading inside a scrolling screen. */
export function SectionTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <HStack hAlign="between" vAlign="center">
      <Text weight="bold" size="lg">{children}</Text>
      {action}
    </HStack>
  )
}

/** Placeholder for an image slot until Higgsfield/brand photography lands. */
export function ImageSlot({ src, alt, height = 180, radius = 'var(--radius-container)' }: { src?: string; alt: string; height?: number; radius?: string }) {
  if (src) return <img className="sayo-img" src={src} alt={alt} style={{ height, borderRadius: radius }} />
  return <div role="img" aria-label={alt} className="sayo-hero" style={{ height, borderRadius: radius }} />
}
