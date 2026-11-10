import { ArrowRight, Lock } from 'lucide-react'
import { VStack } from '@astryxdesign/core/VStack'
import { HStack } from '@astryxdesign/core/HStack'
import { Text } from '@astryxdesign/core/Text'
import { Heading } from '@astryxdesign/core/Heading'
import { Button } from '@astryxdesign/core/Button'
import { Card } from '@astryxdesign/core/Card'
import { Badge } from '@astryxdesign/core/Badge'
import { Grid } from '@astryxdesign/core/Grid'
import { Icon } from '@astryxdesign/core/Icon'
import { Screen } from '../../../components/phone/chrome'
import { CaseStatusBadge, Display, ProBadge } from '../../../components/sayo'
import { LogoMark } from '../../../brand/Logo'
import { useDirection } from '../../../brand/DirectionContext'
import { CASES, USER } from '../../../data/fixtures'
import { CoverTile, SideTile, StartHereRow, VerifiedProfessionals } from './parts'

export interface HomeBentoProps {
  /** A professional has replied: the reply card leads (in the professional tint), and the review tile says so. */
  hasReadyReview?: boolean
  /** First visit: no reviews yet, and the guided start moves up under Ask SAYO. */
  isNew?: boolean
}

/**
 * Home as a bento (the Hers home pattern): a short two-tone headline, then large rounded
 * tiles, each one image, one line and an arrow. Ask SAYO is the biggest door; the guided
 * start is the quiet one for anyone who doesn't know how to begin.
 */
export function HomeBento({ hasReadyReview = false, isNew = false }: HomeBentoProps) {
  const { copy } = useDirection()
  const ready = CASES.find((c) => c.status === 'answered')
  // The full queue label is too long for a half-width tile, so the waiting state gets a short one.
  const reviewStatus = isNew ? undefined : hasReadyReview ? <CaseStatusBadge status="answered" /> : <Badge variant="warning" label="In the queue" />
  return (
    <Screen tab="home">
      <VStack gap={5} paddingInline={5} paddingBlockStart={2} paddingBlockEnd={6}>
        <VStack gap={3}>
          <HStack hAlign="between" vAlign="center">
            <LogoMark size={30} />
            <HStack gap={1} vAlign="center">
              <Icon icon={Lock} size="sm" color="secondary" />
              <Text type="supporting" weight="semibold">Private</Text>
            </HStack>
          </HStack>
          <VStack gap={1}>
            <Text color="secondary" weight="semibold">{isNew ? `Welcome, ${USER.firstName}` : copy.homeGreeting(USER.firstName)}</Text>
            <Display size="lg">{copy.homePrompt}</Display>
          </VStack>
        </VStack>

        {hasReadyReview && ready && (
          <Card variant="green">
            <VStack gap={3}>
              <VStack gap={1} hAlign="start">
                <ProBadge />
                <Heading level={3}>{copy.reviewReadyTitle}</Heading>
                <Text color="secondary">A verified professional replied to your question from {ready.concern.createdAt.toLowerCase()}.</Text>
              </VStack>
              <HStack><Button label="Read response" variant="primary" size="sm" endContent={<Icon icon={ArrowRight} size="sm" />} /></HStack>
            </VStack>
          </Card>
        )}

        <VStack gap={2}>
          <CoverTile slot="tile-ask" title="Ask SAYO" line={copy.askPlaceholder} height={hasReadyReview ? 168 : 200} level={2} />
          {isNew && <StartHereRow />}
          <Grid columns={2} gap={2}>
            <CoverTile slot="tile-review" title="Professional review" height={156} status={reviewStatus} />
            <CoverTile slot="tile-care" title="Find Care" height={156} />
          </Grid>
          <SideTile slot="tile-circle" title="The Circle" line={copy.circleIntro} />
          {!isNew && <StartHereRow />}
        </VStack>

        <VerifiedProfessionals />
      </VStack>
    </Screen>
  )
}
