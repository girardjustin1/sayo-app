import { ChevronRight, Inbox, Lock, MessageCircleHeart } from 'lucide-react'
import { VStack } from '@astryxdesign/core/VStack'
import { HStack } from '@astryxdesign/core/HStack'
import { Text } from '@astryxdesign/core/Text'
import { Button } from '@astryxdesign/core/Button'
import { Heading } from '@astryxdesign/core/Heading'
import { Icon } from '@astryxdesign/core/Icon'
import { EmptyState } from '@astryxdesign/core/EmptyState'
import { List, ListItem } from '@astryxdesign/core/List'
import { AppBar, Screen } from '../../../components/phone/chrome'
import { CaseStatusBadge } from '../../../components/sayo'
import { useDirection } from '../../../brand/DirectionContext'
import type { ReviewCase } from '../../../data/types'
import { MY_REVIEWS, TOPIC_TITLE } from './data'

export interface MyReviewsProps {
  /** No reviews yet: shows the direction's empty-state copy. */
  isEmpty?: boolean
}

function ReviewRow({ c }: { c: ReviewCase }) {
  const sub =
    c.status === 'answered'
      ? `Answered by ${c.response?.professional ?? 'a professional'} · ${c.answeredAt}`
      : c.status === 'in_review'
        ? `A professional is reading it · sent ${c.sentAt.toLowerCase()}`
        : `Waiting for a professional · sent ${c.sentAt.toLowerCase()}`
  return (
    <ListItem
      align="start"
      onClick={() => {}}
      label={<Text weight="bold">{TOPIC_TITLE[c.concern.topic]}</Text>}
      description={
        <VStack gap={2} paddingBlockStart={1}>
          <Text type="supporting" maxLines={2}>“{c.concern.originalMessage}”</Text>
          <HStack><CaseStatusBadge status={c.status} /></HStack>
          <Text type="supporting">{sub}</Text>
        </VStack>
      }
      endContent={<Icon icon={ChevronRight} color="secondary" />}
    />
  )
}

/** My Reviews: every question sent to a professional, grouped by what needs attention. */
export function MyReviews({ isEmpty = false }: MyReviewsProps) {
  const { copy } = useDirection()
  const ready = MY_REVIEWS.filter((c) => c.status === 'answered')
  const waiting = MY_REVIEWS.filter((c) => c.status === 'queued' || c.status === 'in_review')
  return (
    <Screen header={<AppBar title="My reviews" onBack={() => {}} />} tab="me">
      <VStack gap={5} padding={5}>
        <HStack gap={2} vAlign="center">
          <Icon icon={Lock} size="sm" color="secondary" />
          <Text type="supporting">Only you can see these. They stay behind your PIN.</Text>
        </HStack>

        {isEmpty ? (
          <EmptyState
            icon={<Icon icon={Inbox} size="lg" color="accent" />}
            title={copy.myReviewsEmpty}
            description="After you ask SAYO, you can send your question to a verified health professional. Their reply arrives here."
            headingLevel={2}
            actions={<Button label="Ask SAYO" variant="primary" icon={<MessageCircleHeart size={16} />} />}
          />
        ) : (
          <>
            {ready.length > 0 && (
              <VStack gap={1}>
                <Heading level={2}>Ready to read</Heading>
                <List edge="flush" hasDividers density="spacious">{ready.map((c) => <ReviewRow key={c.id} c={c} />)}</List>
              </VStack>
            )}
            {waiting.length > 0 && (
              <VStack gap={1}>
                <Heading level={2}>In progress</Heading>
                <List edge="flush" hasDividers density="spacious">{waiting.map((c) => <ReviewRow key={c.id} c={c} />)}</List>
              </VStack>
            )}
            <Text type="supporting" justify="center">
              Reviews are not live chat and not for emergencies. You’ll get a discreet notification when a reply is ready.
            </Text>
          </>
        )}
      </VStack>
    </Screen>
  )
}
