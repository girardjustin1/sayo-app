import { Ban, Lock, MessageSquareOff, ShieldCheck } from 'lucide-react'
import { VStack } from '@astryxdesign/core/VStack'
import { HStack } from '@astryxdesign/core/HStack'
import { Text } from '@astryxdesign/core/Text'
import { Button } from '@astryxdesign/core/Button'
import { Card } from '@astryxdesign/core/Card'
import { Heading } from '@astryxdesign/core/Heading'
import { Icon } from '@astryxdesign/core/Icon'
import { List, ListItem } from '@astryxdesign/core/List'
import { AppBar, Screen } from '../../../components/phone/chrome'
import { Display, EmergencyNote, ProBadge } from '../../../components/sayo'
import { useDirection } from '../../../brand/DirectionContext'

const PRINCIPLES = [
  {
    title: 'Stay anonymous',
    body: 'Never share real names, phone numbers, social media handles, schools, workplaces or locations: yours or anyone else’s.',
  },
  {
    title: 'Lead with kindness',
    body: 'No judgement and no victim blaming. Whatever happened, it was not their fault for sharing it.',
  },
  {
    title: 'Do no harm',
    body: 'No threats, harassment or graphic content. Don’t name or describe an alleged perpetrator; support services can help safely.',
  },
  {
    title: 'Experience, not diagnosis',
    body: 'Members share what happened to them. For health advice, look for',
    pro: true,
  },
]

const GOOD_TO_KNOW = [
  { icon: MessageSquareOff, text: 'There are no private messages. If someone asks you to move to another app, report it.' },
  { icon: Lock, text: 'Your Ask SAYO chats and reviews are never shown in the Circle.' },
  { icon: ShieldCheck, text: 'SAYO moderators read reports and remove posts that break these rules.' },
  { icon: Ban, text: 'Accounts that keep breaking them can be suspended.' },
]

export interface GuidelinesProps {
  /** Shown before someone's first post: ends with "I understand". */
  isFirstPostGate?: boolean
}

/** Circle guidelines: four principles, then the house rules. */
export function Guidelines({ isFirstPostGate = false }: GuidelinesProps) {
  const { direction } = useDirection()
  return (
    <Screen
      header={<AppBar title="Circle guidelines" onBack={() => {}} />}
      footer={isFirstPostGate ? <Button label="I understand" variant="primary" size="lg" width="100%" /> : undefined}
    >
      <VStack gap={5} padding={5}>
        <VStack gap={2}>
          <Display size="md" as="h1">{direction.id === 'clear' ? 'How the Circle works' : 'Keep the Circle safe'}</Display>
          <Text type="supporting">{isFirstPostGate ? 'Before your first post, four things that keep everyone here safe.' : 'Four things that keep everyone here safe.'}</Text>
        </VStack>

        <List listStyle="decimal" edge="flush" density="spacious">
          {PRINCIPLES.map((p) => (
            <ListItem
              key={p.title}
              align="start"
              label={<Text weight="bold">{p.title}</Text>}
              description={
                <VStack gap={2}>
                  <Text type="supporting">{p.body}</Text>
                  {p.pro && (
                    <HStack gap={1.5} vAlign="center" wrap="wrap">
                      <ProBadge />
                      <Text type="supporting">replies, or ask SAYO privately.</Text>
                    </HStack>
                  )}
                </VStack>
              }
            />
          ))}
        </List>

        <Card>
          <VStack gap={2}>
            <Heading level={3}>Good to know</Heading>
            <List edge="flush" density="compact">
              {GOOD_TO_KNOW.map((g) => (
                <ListItem key={g.text} align="first-line" startContent={<Icon icon={g.icon} size="sm" color="secondary" />} label={<Text>{g.text}</Text>} />
              ))}
            </List>
          </VStack>
        </Card>

        <EmergencyNote />
      </VStack>
    </Screen>
  )
}
