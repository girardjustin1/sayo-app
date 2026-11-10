import type { ReactNode } from 'react'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { VStack } from '@astryxdesign/core/VStack'
import { HStack } from '@astryxdesign/core/HStack'
import { Text } from '@astryxdesign/core/Text'
import { Heading } from '@astryxdesign/core/Heading'
import { Card } from '@astryxdesign/core/Card'
import { ClickableCard } from '@astryxdesign/core/ClickableCard'
import { Avatar } from '@astryxdesign/core/Avatar'
import { Icon } from '@astryxdesign/core/Icon'
import { NavIcon } from '@astryxdesign/core/NavIcon'
import { ProBadge } from '../../../components/sayo'
import { useDirection } from '../../../brand/DirectionContext'
import { R2Img, type R2Slot } from '../../../brand/rounds/round2/imagery'
import { PROFESSIONALS } from '../../../data/fixtures'
import '../../../styles/bento.css'

const noop = () => {}

/* ------------------------------------------------------------ bento tiles */

export interface CoverTileProps {
  slot: R2Slot
  title: string
  /** One supporting line under the title. Leave out on small tiles. */
  line?: string
  /** Image height in px (the tile takes its height from the image). */
  height: number
  /** Short status flag pinned to the top corner, over the image (keep it to two words). */
  status?: ReactNode
  /** 2 for the main tile, 3 for the smaller ones. */
  level?: 2 | 3
}

/**
 * Bento tile, Hers-style: one image, one line, one arrow. The words sit on a scrim made
 * from the direction's deepened accent (bento.css), so they stay readable on any photo.
 */
export function CoverTile({ slot, title, line, height, status, level = 3 }: CoverTileProps) {
  const { direction } = useDirection()
  return (
    <ClickableCard label={title} padding={0} className="bento-tile" onClick={noop}>
      <VStack className="bento-cover">
        <R2Img direction={direction.id} slot={slot} height={height} />
        {status && <HStack className="bento-flag">{status}</HStack>}
        <VStack className={`bento-scrim${level === 3 ? ' bento-scrim--sm' : ''}`}>
          <HStack hAlign="between" vAlign="end" gap={2}>
            <VStack gap={0.5}>
              <Heading level={level} color="inherit">{title}</Heading>
              {line && <Text color="inherit">{line}</Text>}
            </VStack>
            <Icon icon={ArrowRight} size={level === 2 ? 'lg' : 'md'} />
          </HStack>
        </VStack>
      </VStack>
    </ClickableCard>
  )
}

/** Horizontal bento tile on a soft panel: words on the left, image filling the right side. */
export function SideTile({ slot, title, line }: { slot: R2Slot; title: string; line: string }) {
  const { direction } = useDirection()
  return (
    <ClickableCard label={title} padding={0} className="bento-tile bento-soft" onClick={noop}>
      <HStack vAlign="stretch">
        <VStack gap={1} padding={4} vAlign="center" style={{ flex: 1, minWidth: 0 }}>
          <HStack gap={1.5} vAlign="center">
            <Heading level={3}>{title}</Heading>
            <Icon icon={ArrowRight} size="sm" />
          </HStack>
          <Text type="supporting">{line}</Text>
        </VStack>
        <VStack className="bento-side" width="38%">
          <R2Img direction={direction.id} slot={slot} height="100%" style={{ minHeight: 104 }} />
        </VStack>
      </HStack>
    </ClickableCard>
  )
}

/** The quiet guided entry (Hers: "Unsure where to begin? Start here"). Leads to Guided start. */
export function StartHereRow() {
  return (
    <ClickableCard label="Not sure where to begin? Start here" onClick={noop}>
      <HStack hAlign="between" vAlign="center" gap={3}>
        <VStack gap={0}>
          <Text type="supporting">Not sure where to begin?</Text>
          <Text weight="bold">Start here</Text>
        </VStack>
        <NavIcon icon={<Icon icon={ArrowRight} />} />
      </HStack>
    </ClickableCard>
  )
}

/* -------------------------------------------------- verified professionals */

/** "Dr. Efua M." → "Efua M.", so the avatar shows her initials, not the title's. */
const withoutTitle = (name: string) => name.replace(/^(Dr\.|Nurse)\s+/, '')

/**
 * Who reviews questions (Hers's "best in medicine" pattern, SAYO-safe): initials only,
 * profession and licensing jurisdiction, the Verified Professional badge, and one line on
 * how verification works. No photos, no outcome claims. Fictional sample professionals.
 */
export function VerifiedProfessionals() {
  const pros = PROFESSIONALS.filter((p) => p.status === 'approved').slice(0, 3)
  return (
    <VStack gap={3}>
      <VStack gap={1}>
        <Heading level={2}>Reviewed by verified professionals</Heading>
        <Text color="secondary">If you ask for a review, one of SAYO’s professionals reads your question and replies in the app.</Text>
      </VStack>
      <HStack gap={3} isScrollable vAlign="stretch" role="list" aria-label="Verified professionals">
        {pros.map((p) => (
          <Card key={p.id} width={216} role="listitem" style={{ flex: 'none' }}>
            <VStack gap={3} hAlign="start">
              <Avatar name={withoutTitle(p.name)} size="lg" tooltip={false} />
              <VStack gap={0.5}>
                <Text weight="bold">{p.name}</Text>
                <Text type="supporting">{p.profession}</Text>
                <Text type="supporting">Licensed in {p.jurisdiction}</Text>
              </VStack>
              <ProBadge />
            </VStack>
          </Card>
        ))}
      </HStack>
      <HStack gap={2} vAlign="start">
        <Icon icon={ShieldCheck} size="sm" color="secondary" />
        <Text type="supporting">Before anyone can review, SAYO checks their licence with the regulator that issued it. They see your question, never your name.</Text>
      </HStack>
    </VStack>
  )
}
