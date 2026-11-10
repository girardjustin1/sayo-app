import { useState } from 'react'
import { ArrowRight, CalendarClock, CheckCircle2, Clock, MapPin, MessageCircleHeart, ThumbsDown, ThumbsUp } from 'lucide-react'
import { VStack } from '@astryxdesign/core/VStack'
import { HStack } from '@astryxdesign/core/HStack'
import { Text } from '@astryxdesign/core/Text'
import { Button } from '@astryxdesign/core/Button'
import { Avatar } from '@astryxdesign/core/Avatar'
import { Banner } from '@astryxdesign/core/Banner'
import { Card } from '@astryxdesign/core/Card'
import { CheckboxList, CheckboxListItem } from '@astryxdesign/core/CheckboxList'
import { Heading } from '@astryxdesign/core/Heading'
import { Icon } from '@astryxdesign/core/Icon'
import { AppBar, Screen } from '../../../components/phone/chrome'
import {
  CareDecisionTag, CaseStatusBadge, Display, EmergencyNote, ProBadge, ProBlock, ServiceCategoryTag,
} from '../../../components/sayo'
import { LOCKED_COPY } from '../../../brand/directions'
import { useDirection } from '../../../brand/DirectionContext'
import type { CareDecision, ReviewCase } from '../../../data/types'
import { servicesFor } from '../06-care/data'
import { CareServiceRow } from '../06-care/parts'
import { CASE_NONE, CASE_ROUTINE, CASE_URGENT } from './data'
import { WhatYouSent } from './parts'

export type Feedback = 'ask' | 'helpful' | 'not_helpful'

export interface ReviewResponseProps {
  /** The professional's in-person care decision (picks the sample case). */
  decision?: CareDecision
  /** "Was this helpful?" state. */
  feedback?: Feedback
}

const CASE_BY_DECISION: Record<CareDecision, ReviewCase> = { none: CASE_NONE, routine: CASE_ROUTINE, urgent: CASE_URGENT }

const DECISION_BODY: Record<CareDecision, string> = {
  none: 'Based on what you shared, you don’t need to be seen in person right now. If anything changes or gets worse, ask again or find care.',
  routine: 'Plan a visit in the next few days. It isn’t an emergency. SAYO doesn’t book appointments, so call ahead to confirm opening hours.',
  urgent: 'Please go to a clinic or hospital today. Don’t wait for a weekday appointment. Places open now are listed below.',
}

const NOT_HELPFUL_REASONS = ['Hard to understand', 'Didn’t answer my question', 'I still have questions', 'Too slow']

/** The in-person care decision. Urgent is calm but unmistakable: an error-toned banner, no flashing, no capitals. */
function DecisionPanel({ decision }: { decision: CareDecision }) {
  if (decision === 'urgent') {
    return (
      <Banner status="error" icon={<Clock size={20} />} collapsible={false} title={LOCKED_COPY.careDecisions.urgent} description={DECISION_BODY.urgent}>
        <EmergencyNote />
      </Banner>
    )
  }
  return (
    <Card aria-label="In-person care decision">
      <VStack gap={2}>
        <HStack gap={2} vAlign="center">
          <Icon icon={decision === 'none' ? CheckCircle2 : CalendarClock} color={decision === 'none' ? 'success' : 'warning'} />
          <CareDecisionTag decision={decision} />
        </HStack>
        <Text>{DECISION_BODY[decision]}</Text>
      </VStack>
    </Card>
  )
}

function FeedbackCard({ initial }: { initial: Feedback }) {
  const [state, setState] = useState<Feedback>(initial)
  const [reasons, setReasons] = useState<string[]>([])
  return (
    <Card>
      {state === 'ask' && (
        <VStack gap={3}>
          <VStack gap={1}>
            <Heading level={3}>Was this helpful?</Heading>
            <Text type="supporting">Your answer helps us improve reviews. It isn’t shared with your name.</Text>
          </VStack>
          <HStack gap={2}>
            <Button label="Yes" icon={<ThumbsUp size={16} />} onClick={() => setState('helpful')} width="50%" />
            <Button label="Not really" icon={<ThumbsDown size={16} />} onClick={() => setState('not_helpful')} width="50%" />
          </HStack>
        </VStack>
      )}
      {state === 'helpful' && (
        <HStack gap={3} vAlign="start">
          <Icon icon={CheckCircle2} color="success" />
          <VStack gap={1}>
            <Heading level={3}>Thank you for telling us</Heading>
            <Text type="supporting">Glad it helped. You can come back to this review any time from My reviews.</Text>
          </VStack>
        </HStack>
      )}
      {state === 'not_helpful' && (
        <VStack gap={3}>
          <VStack gap={1}>
            <Heading level={3}>Sorry it didn’t help. What was missing?</Heading>
            <Text type="supporting">Pick any that fit. This goes to the SAYO team, not the professional.</Text>
          </VStack>
          <CheckboxList label="What was missing" isLabelHidden value={reasons} onChange={setReasons}>
            {NOT_HELPFUL_REASONS.map((r) => <CheckboxListItem key={r} value={r} label={r} />)}
          </CheckboxList>
          <HStack gap={2} wrap="wrap">
            <Button label="Send feedback" variant="primary" isDisabled={reasons.length === 0} />
            <Button label="Ask SAYO again" variant="ghost" />
          </HStack>
        </VStack>
      )}
    </Card>
  )
}

const initialsName = (name: string) => name.replace(/^(Dr\.|Nurse)\s+/, '')

/**
 * A professional's response in three fixed sections: My thoughts, Do you need in-person
 * care?, Where to go. An urgent decision is also flagged at the very top.
 */
export function ReviewResponse({ decision = 'routine', feedback = 'ask' }: ReviewResponseProps) {
  const { copy } = useDirection()
  const c = CASE_BY_DECISION[decision]
  const r = c.response!
  const urgent = decision === 'urgent'
  const services = r.category ? servicesFor(r.category, urgent).slice(0, urgent ? 1 : 2) : []

  return (
    <Screen header={<AppBar title="Your review" onBack={() => {}} />}>
      <VStack gap={5} padding={5}>
        <VStack gap={3}>
          <HStack><CaseStatusBadge status="answered" /></HStack>
          <Display size="md" as="h1">{copy.reviewReadyTitle}</Display>
          <Text type="supporting">Answered {c.answeredAt?.toLowerCase()}</Text>
        </VStack>

        {urgent && (
          <Banner
            status="error"
            icon={<Clock size={20} />}
            collapsible={false}
            title="Please get care today"
            description="The professional recommends you are seen today. Read their thoughts below, then go."
          >
            <Button label="See where to go now" variant="primary" width="100%" icon={<MapPin size={16} />} />
          </Banner>
        )}

        <WhatYouSent concern={c.concern} />

        <HStack gap={3} vAlign="center">
          <Avatar name={initialsName(r.professional)} size="lg" tooltip={false} />
          <VStack gap={1}>
            <Text weight="bold">{r.professional}</Text>
            <HStack><ProBadge profession={r.profession} /></HStack>
          </VStack>
        </HStack>

        <VStack gap={3}>
          <Heading level={2}>1. My thoughts</Heading>
          <ProBlock>{r.thoughts}</ProBlock>
        </VStack>

        <VStack gap={3}>
          <Heading level={2}>2. Do you need in-person care?</Heading>
          <DecisionPanel decision={decision} />
        </VStack>

        {r.category && (
          <VStack gap={3}>
            <Heading level={2}>{decision === 'none' ? '3. If you’d like to talk to someone' : '3. Where to go'}</Heading>
            <HStack gap={2} vAlign="center" wrap="wrap">
              <Text type="supporting">Type of service:</Text>
              <ServiceCategoryTag category={r.category} />
            </HStack>
            {services.map((s) => <CareServiceRow key={s.id} service={s} />)}
            <HStack>
              <Button label="See all matching services" variant="secondary" endContent={<Icon icon={ArrowRight} />} />
            </HStack>
          </VStack>
        )}

        <FeedbackCard initial={feedback} />

        <VStack gap={3}>
          <Text type="supporting">
            A review is guidance from a verified professional. It isn’t a diagnosis or a prescription.
          </Text>
          {!urgent && <EmergencyNote />}
          <HStack><Button label="Start a new question" variant="ghost" icon={<MessageCircleHeart size={16} />} /></HStack>
        </VStack>
      </VStack>
    </Screen>
  )
}
