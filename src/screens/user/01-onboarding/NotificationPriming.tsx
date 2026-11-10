import { BellRing, EyeOff, Settings } from 'lucide-react'
import { VStack } from '@astryxdesign/core/VStack'
import { Text } from '@astryxdesign/core/Text'
import { Button } from '@astryxdesign/core/Button'
import { Icon } from '@astryxdesign/core/Icon'
import { List, ListItem } from '@astryxdesign/core/List'
import { Screen } from '../../../components/phone/chrome'
import { Display } from '../../../components/sayo'
import { LockScreenPreview } from './parts'

const POINTS = [
  { icon: EyeOff, label: 'Nothing personal on your lock screen', description: 'This is all anyone will see. Never a health topic, never your question.' },
  { icon: BellRing, label: 'Only what matters', description: 'Review responses and replies to your Circle posts. No marketing.' },
  { icon: Settings, label: 'Change it anytime', description: 'Me › Notifications.' },
]

/**
 * Notification priming, shown before the phone's own permission prompt.
 * Explains that notifications are discreet and previews exactly what the lock screen shows.
 */
export function NotificationPriming() {
  return (
    <Screen
      footer={
        <VStack gap={2}>
          <Button label="Turn on notifications" variant="primary" size="lg" width="100%" />
          <Button label="Not now" variant="ghost" size="lg" width="100%" />
        </VStack>
      }
    >
      <VStack gap={5} paddingInline={5} paddingBlockStart={4} paddingBlockEnd={4}>
        <VStack gap={2}>
          <Display size="md">Know when your answer is ready</Display>
          <Text color="secondary">We’ll let you know when a professional replies. Discreetly.</Text>
        </VStack>
        <LockScreenPreview />
        <List edge="flush" density="balanced">
          {POINTS.map((p) => (
            <ListItem
              key={p.label}
              label={<Text weight="semibold">{p.label}</Text>}
              description={<>{p.description}</>}
              startContent={<Icon icon={p.icon} color="accent" />}
              align="first-line"
            />
          ))}
        </List>
      </VStack>
    </Screen>
  )
}
