import { ArrowRight, Lock, MessageSquareOff, RotateCcw } from 'lucide-react'
import { VStack } from '@astryxdesign/core/VStack'
import { HStack } from '@astryxdesign/core/HStack'
import { Text } from '@astryxdesign/core/Text'
import { Button } from '@astryxdesign/core/Button'
import { Banner } from '@astryxdesign/core/Banner'
import { Card } from '@astryxdesign/core/Card'
import { Heading } from '@astryxdesign/core/Heading'
import { Icon } from '@astryxdesign/core/Icon'
import { AppBar, Screen } from '../../../components/phone/chrome'
import { CaseStatusBadge, Display, EmergencyNote, ReviewTimeline } from '../../../components/sayo'
import { useDirection } from '../../../brand/DirectionContext'
import { CASE_IN_REVIEW, CASE_QUEUED, CASE_RELEASED, TOPIC_TITLE } from './data'
import { WhatYouSent } from './parts'

export interface ReviewWaitingProps {
  /**
   * queued: nobody has picked it up yet · in_review: a professional is reading it ·
   * released: a professional passed it back (outside their area), so it is queued again.
   */
  state?: 'queued' | 'in_review' | 'released'
}

/** One review that has no answer yet. Honest about timing; never implies live chat. */
export function ReviewWaiting({ state = 'queued' }: ReviewWaitingProps) {
  const { locked, direction } = useDirection()
  const c = state === 'queued' ? CASE_QUEUED : state === 'in_review' ? CASE_IN_REVIEW : CASE_RELEASED
  const calm = direction.id === 'clear'
  const title =
    state === 'in_review'
      ? 'A professional is reading your question'
      : state === 'released'
        ? 'Your question is back in the queue'
        : 'Waiting for a professional'

  return (
    <Screen header={<AppBar title={TOPIC_TITLE[c.concern.topic]} onBack={() => {}} />}>
      <VStack gap={5} padding={5}>
        <VStack gap={3}>
          <HStack><CaseStatusBadge status={c.status} /></HStack>
          <Display size="md" as="h1">{title}</Display>
          {state !== 'released' && <Text type="supporting">{locked.queueMessage}</Text>}
        </VStack>

        {state === 'released' && (
          <Banner
            status="info"
            icon={<RotateCcw size={20} />}
            collapsible={false}
            title="Nothing is wrong. You don’t need to do anything."
            description="The professional who opened your question felt a colleague with different experience would answer it better, so they passed it back. The next available verified professional will pick it up, and we’ll notify you when your response is ready."
          />
        )}

        <Card>
          <VStack gap={4}>
            <Heading level={3}>What happens next</Heading>
            <ReviewTimeline status={c.status} sentAt={c.sentAt} acceptedAt={c.acceptedAt} answeredAt={c.answeredAt} />
            {state === 'released' && (
              <Text type="supporting">Passed back today, 9:10 am · your question and answers are unchanged</Text>
            )}
            <VStack gap={2}>
              <Text type="supporting">
                Typical time to a reply during the pilot: within a day. It can be longer at night and at weekends.
              </Text>
              <HStack gap={2} vAlign="start">
                <Icon icon={Lock} size="sm" color="secondary" />
                <Text type="supporting">One verified professional reads it. Your Circle name is never shared with them.</Text>
              </HStack>
            </VStack>
            <HStack><Button label="Who are SAYO’s professionals?" variant="secondary" size="sm" /></HStack>
          </VStack>
        </Card>

        <WhatYouSent concern={c.concern} />

        <Card variant="muted">
          <VStack gap={3}>
            <HStack gap={2} vAlign="start">
              <Icon icon={MessageSquareOff} size="sm" color="secondary" />
              <Text type="supporting">
                {calm
                  ? 'This is not live chat and not for emergencies. You can’t message the professional while you wait.'
                  : 'This isn’t live chat, and it’s not for emergencies. You can’t message the professional while you wait.'}
              </Text>
            </HStack>
            <EmergencyNote />
          </VStack>
        </Card>

        <HStack>
          <Button label="Find care now instead" variant="secondary" endContent={<Icon icon={ArrowRight} />} />
        </HStack>
      </VStack>
    </Screen>
  )
}
