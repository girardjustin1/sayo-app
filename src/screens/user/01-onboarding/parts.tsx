import { HStack } from '@astryxdesign/core/HStack'
import { VStack } from '@astryxdesign/core/VStack'
import { Text } from '@astryxdesign/core/Text'
import { AlertDialog } from '@astryxdesign/core/AlertDialog'
import { LogoMark } from '../../../brand/Logo'
import { useDirection } from '../../../brand/DirectionContext'
import '../../../styles/onboarding.css'

/**
 * A mock phone lock screen with one SAYO notification.
 * The notification text is the direction's `notificationLock` copy, or "Notification"
 * when previews are hidden. It never names a health topic.
 * The wallpaper is custom (Astryx has no lock screen); everything on it is Astryx type.
 */
export function LockScreenPreview({ hidePreview = false, time = '9:41', date = 'Tuesday 10 November' }: { hidePreview?: boolean; time?: string; date?: string }) {
  const { copy } = useDirection()
  return (
    <VStack className="sayo-lockscreen" gap={4} padding={4} paddingBlockStart={6} role="img" aria-label="Lock-screen preview">
      <VStack gap={0} hAlign="center">
        <Text color="inherit" weight="semibold">{date}</Text>
        <Text type="display-1" color="inherit" weight="normal">{time}</Text>
      </VStack>
      <HStack className="sayo-lock-notification" gap={3} vAlign="center">
        <HStack className="sayo-lock-app" hAlign="center" vAlign="center"><LogoMark size={22} /></HStack>
        <VStack gap={0} width="100%">
          <HStack hAlign="between" vAlign="center">
            <Text color="inherit" weight="bold">SAYO</Text>
            <Text type="supporting" color="inherit">now</Text>
          </HStack>
          <Text color="inherit">{hidePreview ? 'Notification' : copy.notificationLock}</Text>
        </VStack>
      </HStack>
    </VStack>
  )
}

/**
 * A confirm dialog that stays inside the phone frame (Storybook state).
 * Astryx AlertDialog only opens in the browser's top layer (no container option), which
 * would cover the whole canvas, so the story renders its inline form over an in-phone scrim.
 */
export function PhoneAlert({
  title,
  description,
  actionLabel,
  cancelLabel,
  actionVariant,
}: {
  title: string
  description: string
  actionLabel: string
  cancelLabel?: string
  actionVariant?: 'primary' | 'destructive'
}) {
  return (
    <VStack className="sayo-phone-scrim" padding={5} vAlign="center">
      <AlertDialog
        isOpen
        isInline
        onOpenChange={() => {}}
        onAction={() => {}}
        title={title}
        description={description}
        actionLabel={actionLabel}
        cancelLabel={cancelLabel}
        actionVariant={actionVariant}
        width="100%"
      />
    </VStack>
  )
}
