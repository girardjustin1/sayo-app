import { useState } from 'react'
import { CheckCircle2, ShieldAlert } from 'lucide-react'
import { VStack } from '@astryxdesign/core/VStack'
import { HStack } from '@astryxdesign/core/HStack'
import { Text } from '@astryxdesign/core/Text'
import { Button } from '@astryxdesign/core/Button'
import { Card } from '@astryxdesign/core/Card'
import { Icon } from '@astryxdesign/core/Icon'
import { Heading } from '@astryxdesign/core/Heading'
import { Banner } from '@astryxdesign/core/Banner'
import { EmptyState } from '@astryxdesign/core/EmptyState'
import { RadioList, RadioListItem } from '@astryxdesign/core/RadioList'
import { TextArea } from '@astryxdesign/core/TextArea'
import { AppBar, Screen } from '../../../components/phone/chrome'
import { EmergencyNote, SayoAvatar } from '../../../components/sayo'
import { REPORT_REASONS, type ReportReason } from './data'

/** The reply being reported (fictional, victim-blaming example). */
const REPORTED = { author: 'cool_breeze_x', body: 'She shouldn’t have gone to his place if she didn’t want anything to happen.' }

export interface ReportFlowProps {
  reason?: ReportReason | null
  submitted?: boolean
}

/** Report: one reason (each with its definition), optional detail, then the reply is hidden for the reporter at once. */
export function ReportFlow({ reason: initialReason = null, submitted: initialSubmitted = false }: ReportFlowProps) {
  const [reason, setReason] = useState<ReportReason | null>(initialReason)
  const [submitted, setSubmitted] = useState(initialSubmitted)
  const [detail, setDetail] = useState('')
  const picked = REPORT_REASONS.find((r) => r.id === reason)
  const danger = reason === 'danger'

  if (submitted) {
    return (
      <Screen header={<AppBar title="Report sent" />} footer={<Button label="Back to the post" variant="primary" size="lg" width="100%" />}>
        <VStack gap={5} padding={5}>
          <EmptyState
            icon={<Icon icon={CheckCircle2} size="lg" color="success" />}
            title="Thanks. This helps keep the Circle safe."
            description="We’ve hidden the reply for you. A SAYO moderator will check it against the guidelines. The person won’t know who reported it."
            headingLevel={1}
          />
          {danger && (
            <Banner status="error" icon={<ShieldAlert size={20} />} collapsible={false} title="Sent to the SAYO safety team" description="Our safety team will look at this as a priority.">
              <EmergencyNote />
            </Banner>
          )}
          <Card variant="muted">
            <Text type="supporting">You reported: {picked?.label ?? 'Victim blaming'}</Text>
          </Card>
        </VStack>
      </Screen>
    )
  }

  return (
    <Screen
      header={<AppBar title="Report reply" onBack={() => {}} />}
      footer={<Button label={danger ? 'Send to the safety team' : 'Send report'} variant="primary" size="lg" width="100%" isDisabled={!reason} onClick={() => setSubmitted(true)} />}
    >
      <VStack gap={5} padding={5}>
        <Card variant="muted">
          <HStack gap={3} vAlign="start">
            <SayoAvatar seed={REPORTED.author} size={32} />
            <VStack gap={0.5}>
              <Text weight="semibold">{REPORTED.author}</Text>
              <Text type="supporting">{REPORTED.body}</Text>
            </VStack>
          </HStack>
        </Card>

        <VStack gap={3}>
          <VStack gap={1}>
            <Heading level={2}>What’s wrong with it?</Heading>
            <Text type="supporting">Pick the closest one. Your report is anonymous.</Text>
          </VStack>
          <RadioList label="What’s wrong with it?" isLabelHidden value={reason ?? ''} onChange={(v) => setReason(v as ReportReason)}>
            {REPORT_REASONS.map((r) => <RadioListItem key={r.id} value={r.id} label={r.label} description={r.help} align="first-line" />)}
          </RadioList>
        </VStack>

        {danger && (
          <Banner status="warning" collapsible={false} title="This goes to the safety team" description="They act on reports where someone may be at risk, as well as moderators.">
            <EmergencyNote />
          </Banner>
        )}

        {picked && (
          <TextArea label="Anything else we should know?" isOptional value={detail} onChange={setDetail} rows={3} placeholder="Please don’t include anyone’s real name." />
        )}
      </VStack>
    </Screen>
  )
}
