import { EyeOff, Lock, ShieldCheck, Trash2 } from 'lucide-react'
import { VStack } from '@astryxdesign/core/VStack'
import { HStack } from '@astryxdesign/core/HStack'
import { Text } from '@astryxdesign/core/Text'
import { Button } from '@astryxdesign/core/Button'
import { CheckboxInput } from '@astryxdesign/core/CheckboxInput'
import { NavIcon } from '@astryxdesign/core/NavIcon'
import { Icon } from '@astryxdesign/core/Icon'
import { List, ListItem } from '@astryxdesign/core/List'
import { AppBar, Screen } from '../../../components/phone/chrome'
import { Display } from '../../../components/sayo'
import { useDirection } from '../../../brand/DirectionContext'

export interface PrivacyPromiseProps {
  /** The one-line 18+ confirmation is ticked, so Continue is enabled. */
  confirmed?: boolean
}

const PROMISES = [
  { icon: Lock, title: 'Your conversations are locked', body: 'Behind a 4-digit PIN only you know.' },
  { icon: EyeOff, title: 'Nobody can link you', body: 'The Circle only sees a nickname. Never your questions.' },
  { icon: Trash2, title: 'You stay in control', body: 'See, download or delete your data any time in Me.' },
]

/**
 * One light privacy promise, with the 18+ confirmation folded in as a single line
 * (Mobbin research: Wysa / Bevel pattern). "I'm under 18" leads to the Age Gate's
 * not-yet-eligible state.
 */
export function PrivacyPromise({ confirmed = false }: PrivacyPromiseProps) {
  const { copy } = useDirection()
  return (
    <Screen
      header={<AppBar onBack={() => {}} />}
      footer={
        <VStack gap={3}>
          <CheckboxInput label="I confirm I am 18 or older" description={copy.ageGateBody} value={confirmed} />
          <Button label="Continue" variant="primary" size="lg" width="100%" isDisabled={!confirmed} />
          <HStack hAlign="center">
            <Button label="I’m under 18" variant="ghost" size="sm" />
          </HStack>
        </VStack>
      }
    >
      <VStack gap={5} paddingInline={5} paddingBlockStart={2} paddingBlockEnd={4}>
        <NavIcon icon={<Icon icon={ShieldCheck} />} />
        <VStack gap={3}>
          <Display size="lg">Private by design</Display>
          <Text size="lg" color="secondary">What you tell SAYO stays between you and SAYO. We never ask for your real name, a photo or ID.</Text>
        </VStack>
        <List edge="flush" density="balanced">
          {PROMISES.map((p) => (
            <ListItem
              key={p.title}
              label={<Text weight="semibold">{p.title}</Text>}
              description={<>{p.body}</>}
              startContent={<Icon icon={p.icon} color="accent" />}
              align="first-line"
            />
          ))}
        </List>
      </VStack>
    </Screen>
  )
}
