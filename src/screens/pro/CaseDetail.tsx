import { useState } from 'react'
import { ChevronLeft, PenLine } from 'lucide-react'
import { Layout, LayoutContent, LayoutHeader, LayoutPanel } from '@astryxdesign/core/Layout'
import { Heading } from '@astryxdesign/core/Heading'
import { Text } from '@astryxdesign/core/Text'
import { HStack } from '@astryxdesign/core/HStack'
import { VStack } from '@astryxdesign/core/VStack'
import { Button } from '@astryxdesign/core/Button'
import { Badge } from '@astryxdesign/core/Badge'
import { Divider } from '@astryxdesign/core/Divider'
import { Link } from '@astryxdesign/core/Link'
import { Dialog, DialogHeader } from '@astryxdesign/core/Dialog'
import { RadioList, RadioListItem } from '@astryxdesign/core/RadioList'
import { TextArea } from '@astryxdesign/core/TextArea'
import { MetadataList, MetadataListItem } from '@astryxdesign/core/MetadataList'
import { ProShell } from './ConsoleShell'
import { AuditNote, CaseContent, WithheldNote, type AuditEvent } from './CaseParts'
import { ME, QUEUE, RELEASE_REASONS, TOPIC_LABEL, formatWait } from './data'

export interface CaseDetailProps {
  caseId?: string
  /** Accepted by the signed-in reviewer: shows "Write response". */
  accepted?: boolean
  /** Open the release dialog straight away (for review). */
  releaseOpen?: boolean
}

/** One case, minimum necessary information only. Accept, or release with a reason. */
export function CaseDetail({ caseId = 'R-2082', accepted: initialAccepted = false, releaseOpen = false }: CaseDetailProps) {
  const c = QUEUE.find((q) => q.id === caseId) ?? QUEUE[0]
  const [accepted, setAccepted] = useState(initialAccepted)
  const [isReleaseOpen, setReleaseOpen] = useState(releaseOpen)
  const [reason, setReason] = useState<string>(releaseOpen ? 'competence' : '')
  const [note, setNote] = useState('')

  const audit: AuditEvent[] = [
    { kind: 'sent', at: c.concern.createdAt },
    ...(accepted ? [{ kind: 'accepted' as const, who: `${ME.name} (you)`, at: 'Today, 9:31 am' }] : []),
  ]

  return (
    <ProShell active={accepted ? 'mine' : 'queue'} person={{ name: ME.name, role: `${ME.profession} · ${ME.jurisdiction}` }}>
      <Layout
        header={
          <LayoutHeader hasDivider>
            <VStack gap={2}>
              <Link href="#" size="sm"><HStack gap={0.5} vAlign="center"><ChevronLeft size={14} />{accepted ? 'My open cases' : 'Case queue'}</HStack></Link>
              <HStack hAlign="between" vAlign="center" gap={4}>
                <VStack gap={0.5}>
                  <HStack gap={2} vAlign="center">
                    <Heading level={1}>{c.id}</Heading>
                    <Text type="large" color="secondary">{TOPIC_LABEL[c.topic]}</Text>
                    {accepted ? <Badge variant="info" label="Accepted by you" /> : <Badge label="Available" />}
                  </HStack>
                  <Text type="supporting">Age band {c.ageBand} · Sent {c.concern.createdAt} · Waiting {formatWait(c.waitingMinutes)}</Text>
                </VStack>
                <HStack gap={2}>
                  <Button label={accepted ? 'Release case' : 'Release or decline'} variant="secondary" onClick={() => setReleaseOpen(true)} />
                  {accepted
                    ? <Button label="Write response" variant="primary" icon={<PenLine size={16} />} />
                    : <Button label="Accept case" variant="primary" onClick={() => setAccepted(true)} />}
                </HStack>
              </HStack>
            </VStack>
          </LayoutHeader>
        }
        end={
          <LayoutPanel hasDivider width={300} label="Case information">
            <VStack gap={4}>
              <MetadataList label={{ position: 'start', width: 92 }}>
                <MetadataListItem label="Case"><Text hasTabularNumbers>{c.id}</Text></MetadataListItem>
                <MetadataListItem label="Topic"><Text>{TOPIC_LABEL[c.topic]}</Text></MetadataListItem>
                <MetadataListItem label="Age band"><Text>{c.ageBand}</Text></MetadataListItem>
                <MetadataListItem label="Waiting"><Text>{formatWait(c.waitingMinutes)}</Text></MetadataListItem>
              </MetadataList>
              <Divider />
              <WithheldNote />
              <Divider />
              <VStack gap={1}>
                <Text weight="semibold">Your scope</Text>
                <Text type="supporting" size="sm">Async review, not emergency care. No diagnosis at a distance. Refer when in doubt.</Text>
                <Link href="#" size="sm">Scope & guidance</Link>
              </VStack>
              <Divider />
              <AuditNote events={audit} />
            </VStack>
          </LayoutPanel>
        }
        content={
          <LayoutContent>
            <CaseContent concern={c.concern} />
          </LayoutContent>
        }
      />

      <Dialog isOpen={isReleaseOpen} onOpenChange={setReleaseOpen} width={520} purpose="form">
        <Layout
          header={<DialogHeader title={`Release ${c.id}?`} subtitle="It goes back to the queue for another reviewer. Nothing is sent to the user." onOpenChange={setReleaseOpen} />}
          content={
            <LayoutContent>
              <VStack gap={4}>
                <RadioList label="Reason" value={reason} onChange={setReason} isRequired size="sm">
                  {RELEASE_REASONS.map((r) => <RadioListItem key={r.value} value={r.value} label={r.label} description={r.description} />)}
                </RadioList>
                <TextArea
                  label="Note for the SAYO team"
                  isOptional={reason !== 'other'}
                  isRequired={reason === 'other'}
                  description="Seen by admins only. Do not copy the user's words here."
                  value={note}
                  onChange={setNote}
                  rows={2}
                  maxLength={280}
                />
              </VStack>
            </LayoutContent>
          }
          footer={
            <HStack hAlign="end" gap={2} padding={4}>
              <Button label="Cancel" variant="secondary" onClick={() => setReleaseOpen(false)} />
              <Button label="Release case" variant="primary" isDisabled={!reason || (reason === 'other' && !note)} onClick={() => setReleaseOpen(false)} />
            </HStack>
          }
        />
      </Dialog>
    </ProShell>
  )
}
