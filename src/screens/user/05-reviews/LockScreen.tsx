import { Camera, Flashlight } from 'lucide-react'
import { HStack } from '@astryxdesign/core/HStack'
import { VStack } from '@astryxdesign/core/VStack'
import { Text } from '@astryxdesign/core/Text'
import { StatusBar } from '../../../components/phone/chrome'
import { LogoMark } from '../../../brand/Logo'
import { useDirection } from '../../../brand/DirectionContext'
import '../../../styles/community.css'

export interface LockScreenProps {
  /** How many SAYO updates are waiting. Each uses the same generic line. */
  count?: number
}

function Notification({ body, when }: { body: string; when: string }) {
  return (
    <div className="sayo-lock-notification">
      <HStack gap={3} vAlign="center">
        <span className="cm-lock__app"><LogoMark size={22} /></span>
        <VStack gap={0} width="100%">
          <HStack hAlign="between" vAlign="center">
            <Text weight="semibold" size="sm" color="inherit">SAYO</Text>
            <Text size="xsm" color="inherit">{when}</Text>
          </HStack>
          <Text size="sm" color="inherit">{body}</Text>
        </VStack>
      </HStack>
    </div>
  )
}

/**
 * The phone's lock screen when a review is ready. The wording is the direction's
 * generic `notificationLock` line only: never a topic, a name, or "your review".
 */
export function LockScreen({ count = 1 }: LockScreenProps) {
  const { copy } = useDirection()
  return (
    <div className="cm-lock">
      <span className="cm-lock__wall" aria-hidden />
      <span style={{ position: 'relative', zIndex: 2 }}><StatusBar light /></span>
      <div className="cm-lock__content">
        <span className="cm-lock__date">Tuesday 10 November</span>
        <span className="cm-lock__time">9:41</span>
        <div className="cm-lock__stack" aria-label="Notifications">
          {count > 1 && <Notification body={copy.notificationLock} when="1h ago" />}
          <Notification body={copy.notificationLock} when="now" />
        </div>
      </div>
      <div className="cm-lock__bottom" aria-hidden>
        <span className="cm-lock__btn"><Flashlight size={20} /></span>
        <span className="cm-lock__btn"><Camera size={20} /></span>
      </div>
    </div>
  )
}
