import { VStack } from '@astryxdesign/core/VStack'
import { HStack } from '@astryxdesign/core/HStack'
import { Text } from '@astryxdesign/core/Text'
import { Button } from '@astryxdesign/core/Button'
import { Icon } from '@astryxdesign/core/Icon'
import { Screen } from '../../../components/phone/chrome'
import { Display, Keypad, PinDots } from '../../../components/sayo'
import { LogoMark } from '../../../brand/Logo'
import { PhoneAlert } from './parts'

export interface UnlockPinProps {
  /** default: waiting for the PIN · wrong: last attempt failed · forgot: the reset explainer is open. */
  state?: 'default' | 'wrong' | 'forgot'
  /** Digits entered so far (0–4). */
  filled?: number
}

/**
 * Unlock with PIN. Shows no name and no content: anyone glancing at the phone sees only
 * the SAYO mark and a keypad. "Forgot PIN?" explains that a reset clears local conversations.
 */
export function UnlockPin({ state = 'default', filled = 0 }: UnlockPinProps) {
  const wrong = state === 'wrong'
  return (
    <Screen>
      <VStack gap={6} paddingInline={5} paddingBlockStart={8} paddingBlockEnd={6} hAlign="center">
        <LogoMark size={44} />
        <VStack gap={2} hAlign="center">
          <Display size="sm" as="h1">Enter your PIN</Display>
          {wrong ? (
            <HStack gap={1} vAlign="center" role="alert">
              <Icon icon="error" color="error" size="sm" />
              <Text weight="semibold">That PIN isn’t right. Please try again.</Text>
            </HStack>
          ) : (
            <Text color="secondary" justify="center">Your conversations are locked.</Text>
          )}
        </VStack>
        <PinDots filled={wrong ? 4 : filled} error={wrong} />
        <Keypad />
        <Button label="Forgot PIN?" variant="ghost" />
      </VStack>
      {state === 'forgot' && (
        <PhoneAlert
          title="Reset your PIN?"
          description="To keep your privacy, a reset clears the Ask SAYO conversations saved on this phone. You will confirm your phone number or email, then choose a new PIN. Your Circle nickname stays the same."
          actionLabel="Clear and reset PIN"
          cancelLabel="Keep trying"
        />
      )}
    </Screen>
  )
}
