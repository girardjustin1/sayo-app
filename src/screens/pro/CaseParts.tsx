import { AlertTriangle, CheckCircle2, EyeOff, Inbox, LogIn, Undo2 } from 'lucide-react'
import { AiMark } from '../../components/sayo'
import { VStack } from '@astryxdesign/core/VStack'
import { HStack } from '@astryxdesign/core/HStack'
import { Text } from '@astryxdesign/core/Text'
import { Heading } from '@astryxdesign/core/Heading'
import { Banner } from '@astryxdesign/core/Banner'
import { List, ListItem } from '@astryxdesign/core/List'
import { MetadataList, MetadataListItem } from '@astryxdesign/core/MetadataList'
import type { Concern } from '../../data/types'

/** Red flags from intake. Always first, never collapsed. */
export function RedFlags({ flags }: { flags: string[] }) {
  if (!flags.length) return null
  return (
    <Banner
      status="error"
      icon={<AlertTriangle size={18} />}
      title={flags.length === 1 ? 'Red flag' : `${flags.length} red flags`}
      description={flags.join(' · ')}
      collapsible={false}
    />
  )
}

/** Her first message, exactly as she typed it. */
export function Verbatim({ text }: { text: string }) {
  return (
    <VStack gap={1.5}>
      <HStack gap={2} vAlign="center" hAlign="between">
        <Heading level={3}>Her words</Heading>
        <Text type="supporting" size="sm">Verbatim · not edited</Text>
      </HStack>
      <Text as="p" className="sayo-verbatim">“{text}”</Text>
    </VStack>
  )
}

export function FollowUps({ items, stacked = false }: { items: Concern['followUps']; stacked?: boolean }) {
  return (
    <VStack gap={1.5}>
      <Heading level={3}>Follow-up answers</Heading>
      <MetadataList label={stacked ? { position: 'top' } : { position: 'start', width: 260 }}>
        {items.map((f) => (
          <MetadataListItem key={f.q} label={f.q}>
            <Text>{f.a}</Text>
          </MetadataListItem>
        ))}
      </MetadataList>
    </VStack>
  )
}

/** SAYO's AI summary: labelled so it is never mistaken for her words or a clinical finding. */
export function AiSummary({ text }: { text: string }) {
  return (
    <VStack gap={1.5} className="sayo-ai-block">
      <HStack gap={1.5} vAlign="center">
        <span style={{ flex: 'none' }}><AiMark size={16} /></span>
        <Text weight="semibold">AI-generated summary</Text>
      </HStack>
      <Text type="supporting" size="sm">Written by SAYO's assistant. It may contain mistakes: check it against her words.</Text>
      <Text>{text}</Text>
      <Text type="supporting" size="sm">She read this summary and confirmed it before sending. Where they differ, her own words take priority.</Text>
    </VStack>
  )
}

/** Everything a reviewer may see, in reading order. */
export function CaseContent({ concern, compact = false }: { concern: Concern; compact?: boolean }) {
  return (
    <VStack gap={compact ? 4 : 5}>
      <RedFlags flags={concern.redFlags} />
      <AiSummary text={concern.summary} />
      <Verbatim text={concern.originalMessage} />
      <FollowUps items={concern.followUps} />
    </VStack>
  )
}

/** What is deliberately withheld from the reviewer. */
export function WithheldNote() {
  return (
    <VStack gap={1.5}>
      <HStack gap={1.5} vAlign="center">
        <EyeOff size={16} />
        <Text weight="semibold">Not shown to you</Text>
      </HStack>
      <Text type="supporting" size="sm">
        Her name, phone number, email, location, Circle username and any other SAYO conversations. You only see what you need to review
        this concern.
      </Text>
    </VStack>
  )
}

export interface AuditEvent {
  kind: 'sent' | 'accepted' | 'released' | 'completed' | 'signed_in'
  who?: string
  at: string
  note?: string
}

const AUDIT_ICON = { sent: Inbox, accepted: LogIn, released: Undo2, completed: CheckCircle2, signed_in: LogIn }
const AUDIT_LABEL = { sent: 'Sent for review', accepted: 'Accepted by', released: 'Released by', completed: 'Completed by', signed_in: 'Opened by' }

/** Accountability log: who accepted and completed the review, and when. */
export function AuditNote({ events }: { events: AuditEvent[] }) {
  return (
    <VStack gap={1}>
      <Text weight="semibold">Audit trail</Text>
      <List density="compact" edge="flush">
        {events.map((e, i) => {
          const Icon = AUDIT_ICON[e.kind]
          return (
            <ListItem
              key={i}
              align="start"
              startContent={<Icon size={16} />}
              label={<Text size="sm">{AUDIT_LABEL[e.kind]}{e.who ? <Text size="sm" weight="semibold"> {e.who}</Text> : null}</Text>}
              description={<Text type="supporting" size="sm">{e.at}{e.note ? ` · ${e.note}` : ''}</Text>}
            />
          )
        })}
      </List>
      <Text type="supporting" size="xsm">Logged for accountability. Visible to you and SAYO admins. Never shown to the user.</Text>
    </VStack>
  )
}
