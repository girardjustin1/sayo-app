import { BookOpenCheck, Check, Circle, Clock, FileUp, Mail, Tags } from 'lucide-react'
import { VStack } from '@astryxdesign/core/VStack'
import { HStack } from '@astryxdesign/core/HStack'
import { Card } from '@astryxdesign/core/Card'
import { Heading } from '@astryxdesign/core/Heading'
import { Text } from '@astryxdesign/core/Text'
import { Button } from '@astryxdesign/core/Button'
import { Banner } from '@astryxdesign/core/Banner'
import { Divider } from '@astryxdesign/core/Divider'
import { List, ListItem } from '@astryxdesign/core/List'
import { MetadataList, MetadataListItem } from '@astryxdesign/core/MetadataList'
import { Logo } from '../../brand/Logo'
import { PROFESSIONALS } from '../../data/fixtures'
import '../../styles/console.css'

export interface PendingVerificationProps {
  /** The admin asked for a clearer licence document. */
  needsInfo?: boolean
}

/** Signed in, not yet approved: no queue, no case data. Shows progress and what to do meanwhile. */
export function PendingVerification({ needsInfo = false }: PendingVerificationProps) {
  const p = PROFESSIONALS[3] // Kofi A., pending
  const steps = [
    { label: 'Application received', at: '3 Nov', state: 'done' as const },
    { label: needsInfo ? 'Licence check: we need one more document' : 'Licence check with the registering body', at: needsInfo ? 'Action needed' : 'Usually 3 to 5 working days', state: 'current' as const },
    { label: 'Approval by the SAYO team', at: 'After the licence check', state: 'todo' as const },
    { label: 'Scope briefing, then your first case', at: 'After approval', state: 'todo' as const },
  ]
  return (
    <VStack className="sayo-auth-page">
      <VStack hAlign="center" padding={6}>
        <VStack gap={4} width={640}>
          <HStack hAlign="between" vAlign="center">
            <Logo height={28} />
            <Button label="Sign out" variant="ghost" size="sm" />
          </HStack>
          <Card padding={6} width="100%">
            <VStack gap={5}>
              <VStack gap={1}>
                <Heading level={1}>Your account is being reviewed</Heading>
                <Text type="supporting">
                  Thanks, {p.name.split(' ')[0]}. Before you can see any cases, SAYO checks your licence and approves your account. We'll email you
                  when it's done.
                </Text>
              </VStack>
              {needsInfo && (
                <Banner
                  status="warning"
                  title="Please upload a clearer copy of your licence"
                  description="The registration number on the document you sent can't be read. A photo or scan of the full certificate is fine."
                  endContent={<Button label="Upload document" size="sm" icon={<FileUp size={14} />} />}
                  collapsible={false}
                />
              )}
              <List density="compact" edge="flush">
                {steps.map((s) => (
                  <ListItem
                    key={s.label}
                    startContent={
                      s.state === 'done' ? <Check size={18} style={{ color: 'var(--sayo-pro)' }} />
                        : s.state === 'current' ? <Clock size={18} style={{ color: needsInfo ? 'var(--color-warning)' : 'var(--color-accent)' }} />
                          : <Circle size={18} style={{ color: 'var(--color-border-emphasized)' }} />
                    }
                    label={<Text weight={s.state === 'current' ? 'semibold' : 'normal'} color={s.state === 'todo' ? 'secondary' : 'primary'}>{s.label}</Text>}
                    endContent={<Text type="supporting" size="sm">{s.at}</Text>}
                  />
                ))}
              </List>
              <Divider />
              <MetadataList columns={2} title={<Text weight="semibold">What you sent</Text>}>
                <MetadataListItem label="Profession"><Text>{p.profession}</Text></MetadataListItem>
                <MetadataListItem label="Licensing jurisdiction"><Text>{p.jurisdiction}</Text></MetadataListItem>
                <MetadataListItem label="Licence"><Text>{needsInfo ? 'Unreadable, please re-upload' : 'Being checked'}</Text></MetadataListItem>
                <MetadataListItem label="Topics"><Text>{p.expertise.join(', ')}</Text></MetadataListItem>
              </MetadataList>
            </VStack>
          </Card>
          <Card padding={6} width="100%">
            <VStack gap={2}>
              <Heading level={2}>While you wait</Heading>
              <List density="compact" edge="flush">
                <ListItem startContent={<BookOpenCheck size={18} />} label="Read your scope as a reviewer" description="What SAYO review is, and what it is not." endContent={<Button label="Read" size="sm" />} />
                <ListItem startContent={<Tags size={18} />} label="Check the topics you'll review" description="You'll only be offered cases in these topics." endContent={<Button label="Edit" size="sm" />} />
                <ListItem startContent={<Mail size={18} />} label="Questions about your application" description="pilot-team@sayo.example (sample)" />
              </List>
            </VStack>
          </Card>
        </VStack>
      </VStack>
    </VStack>
  )
}
