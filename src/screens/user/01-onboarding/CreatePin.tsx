import { Lock } from 'lucide-react'
import { VStack } from '@astryxdesign/core/VStack'
import { HStack } from '@astryxdesign/core/HStack'
import { Text } from '@astryxdesign/core/Text'
import { Icon } from '@astryxdesign/core/Icon'
import { AppBar, Screen } from '../../../components/phone/chrome'
import { Display, Keypad, PinDots } from '../../../components/sayo'
import { useDirection } from '../../../brand/DirectionContext'

export interface CreatePinProps {
  /** create: first entry · confirm: type it again · mismatch: the two did not match. */
  stage?: 'create' | 'confirm' | 'mismatch'
  /** Digits entered so far (0–4). */
  filled?: number
}

/** Create a 4-digit PIN, then confirm it. The PIN cannot be switched off later. */
export function CreatePin({ stage = 'create', filled = 2 }: CreatePinProps) {
  const { copy } = useDirection()
  const title = stage === 'create' ? copy.pinTitle : stage === 'confirm' ? 'Enter it once more' : 'Those PINs didn’t match'
  const body =
    stage === 'create'
      ? copy.pinBody
      : stage === 'confirm'
        ? 'Type the same 4 digits again to confirm.'
        : 'No problem. Choose your 4 digits again, then confirm them.'
  return (
    <Screen header={<AppBar onBack={() => {}} />}>
      <VStack gap={6} paddingInline={5} paddingBlockStart={2} paddingBlockEnd={6}>
        <VStack gap={2} hAlign="center">
          <Display size="md" as="h1">{title}</Display>
          <Text color="secondary" justify="center" textWrap="balance">{body}</Text>
        </VStack>
        <VStack gap={3} hAlign="center">
          <PinDots filled={stage === 'mismatch' ? 4 : filled} error={stage === 'mismatch'} />
          {stage === 'mismatch' ? (
            <HStack gap={1} vAlign="center" role="alert">
              <Icon icon="error" color="error" size="sm" />
              <Text weight="semibold">Try again</Text>
            </HStack>
          ) : (
            <Text type="supporting">Step {stage === 'create' ? 1 : 2} of 2</Text>
          )}
        </VStack>
        <Keypad />
        <HStack gap={2} vAlign="start" hAlign="center">
          <Icon icon={Lock} color="secondary" size="sm" />
          <Text type="supporting" textWrap="balance">
            Avoid a birthday or 1234. If you forget your PIN, resetting it clears conversations on this phone.
          </Text>
        </HStack>
      </VStack>
    </Screen>
  )
}
