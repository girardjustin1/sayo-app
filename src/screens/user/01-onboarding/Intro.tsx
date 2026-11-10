import { BadgeCheck, Heart, MapPin, MessageCircleHeart } from 'lucide-react'
import { VStack } from '@astryxdesign/core/VStack'
import { HStack } from '@astryxdesign/core/HStack'
import { Text } from '@astryxdesign/core/Text'
import { Button } from '@astryxdesign/core/Button'
import { Pagination } from '@astryxdesign/core/Pagination'
import { Screen } from '../../../components/phone/chrome'
import { Display } from '../../../components/sayo'
import { useDirection } from '../../../brand/DirectionContext'
import { R2Img, type R2Slot } from '../../../brand/rounds/round2/imagery'
import '../../../styles/onboarding.css'

export interface IntroProps {
  /** Which of the three intro steps is showing (0, 1 or 2). */
  step?: 0 | 1 | 2
}

/** Intro carousel: three short steps from the direction's onboarding copy. */
export function Intro({ step = 0 }: IntroProps) {
  const { copy, direction } = useDirection()
  const slides = copy.onboarding
  const slide = slides[step]
  const last = step === slides.length - 1
  // Step 3 is the Circle in Big Sister / Unmuted and Find Care in Clear Care.
  const icons = [
    <MessageCircleHeart key="ask" size={52} />,
    <BadgeCheck key="pro" size={52} />,
    direction.id === 'clear' ? <MapPin key="care" size={52} /> : <Heart key="circle" size={52} />,
  ]
  // Round 2: each step shows the bento image for the pillar it introduces. Step 3 is the
  // Circle in Clay and Find Care in the other round-2 directions (it follows the copy).
  const slots: R2Slot[] = ['tile-ask', 'tile-review', direction.id === 'clay' ? 'tile-circle' : 'tile-care']
  return (
    <Screen
      header={
        <HStack hAlign="end" paddingInline={3} height={40} vAlign="center">
          {!last && <Button label="Skip" variant="ghost" size="sm" />}
        </HStack>
      }
      footer={
        <VStack gap={4} hAlign="center">
          <Pagination variant="dots" size="sm" page={step + 1} totalPages={slides.length} onChange={() => {}} label="Intro steps" />
          <Button label={last ? copy.ctaPrimary : 'Next'} variant="primary" size="lg" width="100%" />
        </VStack>
      }
    >
      <VStack gap={6} paddingInline={5} paddingBlockStart={2}>
        {direction.round === 2 ? (
          <R2Img direction={direction.id} slot={slots[step]} height={280} radius="var(--radius-page)" />
        ) : (
          <VStack className="sayo-onb-art" height={280} hAlign="center" vAlign="center" aria-hidden>
            <span className="sayo-onb-art__ring" style={{ width: 220, height: 220 }} />
            <span className="sayo-onb-art__ring" style={{ width: 320, height: 320 }} />
            <VStack className="sayo-onb-art__icon" width={112} height={112} hAlign="center" vAlign="center">{icons[step]}</VStack>
          </VStack>
        )}
        <VStack gap={3}>
          <Text type="supporting" weight="semibold">{step + 1} of {slides.length}</Text>
          <Display size="lg">{slide.title}</Display>
          <Text size="lg" color="secondary">{slide.body}</Text>
        </VStack>
      </VStack>
    </Screen>
  )
}
