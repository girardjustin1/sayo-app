import { useState } from 'react'
import { ChevronLeft, Eye, Lock } from 'lucide-react'
import { Layout, LayoutContent, LayoutHeader, LayoutPanel } from '@astryxdesign/core/Layout'
import { Heading } from '@astryxdesign/core/Heading'
import { Text } from '@astryxdesign/core/Text'
import { HStack } from '@astryxdesign/core/HStack'
import { VStack } from '@astryxdesign/core/VStack'
import { Button } from '@astryxdesign/core/Button'
import { Banner } from '@astryxdesign/core/Banner'
import { Link } from '@astryxdesign/core/Link'
import { Divider } from '@astryxdesign/core/Divider'
import { TextArea } from '@astryxdesign/core/TextArea'
import { RadioList, RadioListItem } from '@astryxdesign/core/RadioList'
import { Selector } from '@astryxdesign/core/Selector'
import { Dialog, DialogHeader } from '@astryxdesign/core/Dialog'
import { MetadataList, MetadataListItem } from '@astryxdesign/core/MetadataList'
import { CareDecisionTag, EmergencyNote, ProBadge, ProBlock, SERVICE_CATEGORY_LABEL, ServiceCategoryTag } from '../../components/sayo'
import { useDirection } from '../../brand/DirectionContext'
import type { CareDecision, ServiceCategory } from '../../data/types'
import { ProShell } from './ConsoleShell'
import { AiSummary, AuditNote, FollowUps, RedFlags, Verbatim } from './CaseParts'
import { ANSWERED_CASE, ME, TOPIC_LABEL } from './data'

const MAX = 1200
const DECISION_HELP: Record<CareDecision, string> = {
  none: 'Self-care and information are enough for now. Tell her what would change that.',
  routine: 'She should be seen, but not today. For example within the next few days.',
  urgent: 'She should be seen today. SAYO adds the emergency line to your response.',
}

export interface ResponseComposerProps {
  /** Pre-fill with a finished draft. */
  drafted?: boolean
  /** Open the "complete case" confirmation. */
  confirmOpen?: boolean
  /** Show the sent state with the accountability log. */
  completed?: boolean
}

/** Structured response: My thoughts · In-person care decision · Service category, sent together. */
export function ResponseComposer({ drafted = false, confirmOpen = false, completed = false }: ResponseComposerProps) {
  const c = ANSWERED_CASE
  const r = c.response!
  const { copy, locked } = useDirection()
  const [thoughts, setThoughts] = useState(drafted || completed ? r.thoughts : '')
  const [decision, setDecision] = useState<string>(drafted || completed ? r.decision : '')
  const [category, setCategory] = useState<string>(drafted || completed ? r.category ?? '' : '')
  const [note, setNote] = useState('')
  const [isConfirmOpen, setConfirmOpen] = useState(confirmOpen)
  const [sent, setSent] = useState(completed)

  const needsCategory = decision === 'routine' || decision === 'urgent'
  const ready = thoughts.trim().length > 0 && thoughts.length <= MAX && !!decision && (!needsCategory || !!category)
  const words = thoughts.trim() ? thoughts.trim().split(/\s+/).length : 0
  const missing = [!thoughts.trim() && 'My thoughts', !decision && 'an in-person care decision', needsCategory && !category && 'a service category'].filter(Boolean)

  return (
    <ProShell active="mine" person={{ name: ME.name, role: `${ME.profession} · ${ME.jurisdiction}` }}>
      <Layout
        header={
          <LayoutHeader hasDivider>
            <VStack gap={2}>
              <Link href="#" size="sm"><HStack gap={0.5} vAlign="center"><ChevronLeft size={14} />My open cases</HStack></Link>
              <HStack hAlign="between" vAlign="center" gap={4}>
                <VStack gap={0.5}>
                  <HStack gap={2} vAlign="center">
                    <Heading level={1}>{sent ? `${c.id} · completed` : `Respond to ${c.id}`}</Heading>
                    <Text type="large" color="secondary">{TOPIC_LABEL[c.concern.topic]}</Text>
                  </HStack>
                  <Text type="supporting">Age band {c.ageBand} · Accepted by you at {c.acceptedAt?.replace('Today, ', '')}</Text>
                </VStack>
                {!sent && (
                  <HStack gap={2}>
                    <Button label="Save draft" variant="secondary" />
                    <Button label="Complete case" variant="primary" isDisabled={!ready} tooltip={ready ? undefined : `Add ${missing.join(', ')}`} onClick={() => setConfirmOpen(true)} />
                  </HStack>
                )}
              </HStack>
            </VStack>
          </LayoutHeader>
        }
        start={
          <LayoutPanel hasDivider width={360} label="The case">
            <VStack gap={4}>
              <RedFlags flags={c.concern.redFlags} />
              <AiSummary text={c.concern.summary} />
              <Verbatim text={c.concern.originalMessage} />
              <FollowUps items={c.concern.followUps} stacked />
            </VStack>
          </LayoutPanel>
        }
        content={
          <LayoutContent>
            {sent ? (
              <VStack gap={5}>
                <Banner status="success" title="Review sent" description={`She gets a discreet notification ("${copy.notificationLock}"). The case is closed and can no longer be edited.`} collapsible={false} />
                <HStack gap={6} vAlign="start">
                  <Preview thoughts={thoughts} decision={decision as CareDecision} category={category as ServiceCategory} />
                  <AuditNote
                    events={[
                      { kind: 'sent', at: c.sentAt },
                      { kind: 'accepted', who: `${r.professional} (you)`, at: c.acceptedAt! },
                      { kind: 'completed', who: `${r.professional} (you)`, at: c.answeredAt! },
                    ]}
                  />
                </HStack>
              </VStack>
            ) : (
              <VStack gap={5}>
                <TextArea
                  label="My thoughts"
                  isRequired
                  description="Short, clear guidance in plain language: what this could be in general terms and what to do next. No diagnosis, no medicines or doses, no identifying questions."
                  placeholder="Thank you for explaining this…"
                  value={thoughts}
                  onChange={setThoughts}
                  rows={7}
                  maxLength={MAX}
                />
                <Text type="supporting" size="sm">{words} words · most clear replies are 80 to 200 words.</Text>
                <RadioList label="In-person care decision" isRequired value={decision} onChange={setDecision}>
                  {(['none', 'routine', 'urgent'] as const).map((d) => (
                    <RadioListItem key={d} value={d} label={locked.careDecisions[d]} description={DECISION_HELP[d]} />
                  ))}
                </RadioList>
                <Selector
                  label="Service category"
                  isRequired={needsCategory}
                  isOptional={!needsCategory}
                  description="SAYO shows her verified services of this type in Find Care. Required when you recommend in-person care."
                  placeholder="Choose a type of service"
                  width={420}
                  value={category}
                  onChange={setCategory}
                  options={(Object.keys(SERVICE_CATEGORY_LABEL) as ServiceCategory[]).map((k) => ({ value: k, label: SERVICE_CATEGORY_LABEL[k] }))}
                />
                <TextArea
                  label="Internal note"
                  isOptional
                  description="For other reviewers and SAYO admins only, for example a handover. Never shown to her."
                  value={note}
                  onChange={setNote}
                  rows={2}
                  maxLength={280}
                />
                <Divider />
                <Preview thoughts={thoughts} decision={decision as CareDecision} category={category as ServiceCategory} />
              </VStack>
            )}
          </LayoutContent>
        }
      />

      <Dialog isOpen={isConfirmOpen} onOpenChange={setConfirmOpen} width={480} purpose="form">
        <Layout
          header={<DialogHeader title="Complete and send this review?" subtitle="She will see it straight away. You cannot edit it after sending." onOpenChange={setConfirmOpen} />}
          content={
            <LayoutContent>
              <VStack gap={3}>
                <MetadataList label={{ position: 'start', width: 150 }}>
                  <MetadataListItem label="My thoughts"><Text>{words} words</Text></MetadataListItem>
                  <MetadataListItem label="In-person care">{decision ? <CareDecisionTag decision={decision as CareDecision} /> : <Text>—</Text>}</MetadataListItem>
                  <MetadataListItem label="Service category"><Text>{category ? SERVICE_CATEGORY_LABEL[category as ServiceCategory] : 'None'}</Text></MetadataListItem>
                  <MetadataListItem label="Logged as"><Text>Completed by {ME.name} · now</Text></MetadataListItem>
                </MetadataList>
                <Text type="supporting" size="sm">Her notification says only "{copy.notificationLock}". It never names the topic.</Text>
              </VStack>
            </LayoutContent>
          }
          footer={
            <HStack hAlign="end" gap={2} padding={4}>
              <Button label="Keep editing" variant="secondary" onClick={() => setConfirmOpen(false)} />
              <Button label="Complete and send" variant="primary" onClick={() => { setConfirmOpen(false); setSent(true) }} />
            </HStack>
          }
        />
      </Dialog>
    </ProShell>
  )
}

/** Exactly what she will see in "My reviews", in her app's style. */
function Preview({ thoughts, decision, category }: { thoughts: string; decision?: CareDecision; category?: ServiceCategory }) {
  const { copy } = useDirection()
  return (
    <VStack gap={2}>
      <HStack gap={1.5} vAlign="center">
        <Eye size={16} />
        <Text weight="semibold">Visible to her</Text>
        <Text type="supporting" size="sm">· preview of her review screen</Text>
      </HStack>
      <VStack gap={3} className="sayo-user-preview">
        <Text weight="bold" size="lg">{copy.reviewReadyTitle}</Text>
        <HStack gap={2} vAlign="center" wrap="wrap">
          <Text weight="semibold">{ME.name}</Text>
          <ProBadge profession={ME.profession} />
        </HStack>
        <ProBlock title="My thoughts">
          {thoughts.trim() ? thoughts : <Text type="supporting">Your guidance will appear here.</Text>}
        </ProBlock>
        <VStack gap={1}>
          <Text type="supporting" size="sm" weight="semibold">In-person care</Text>
          {decision ? <HStack><CareDecisionTag decision={decision} /></HStack> : <Text type="supporting">Not chosen yet</Text>}
        </VStack>
        {category && (
          <VStack gap={1}>
            <Text type="supporting" size="sm" weight="semibold">Where to go</Text>
            <HStack><ServiceCategoryTag category={category} /></HStack>
            <Text type="supporting" size="sm">Verified services nearby appear here in Find Care.</Text>
          </VStack>
        )}
        {decision === 'urgent' && <EmergencyNote />}
      </VStack>
      <HStack gap={1.5} vAlign="center">
        <Lock size={13} />
        <Text type="supporting" size="xsm">Your internal note and this case's audit trail are never shown to her.</Text>
      </HStack>
    </VStack>
  )
}
