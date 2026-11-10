import { Lock } from 'lucide-react'
import { VStack } from '@astryxdesign/core/VStack'
import { HStack } from '@astryxdesign/core/HStack'
import { Text } from '@astryxdesign/core/Text'
import { Button } from '@astryxdesign/core/Button'
import { Icon } from '@astryxdesign/core/Icon'
import { Screen } from '../../../components/phone/chrome'
import { Display } from '../../../components/sayo'
import { Logo, LogoMark } from '../../../brand/Logo'
import { useDirection } from '../../../brand/DirectionContext'
import { R2Img } from '../../../brand/rounds/round2/imagery'
import '../../../styles/onboarding.css'
import '../../../styles/bento.css'

export interface SplashProps {
  /** Show the start buttons (false = the brief launch moment with logo only). */
  showActions?: boolean
}

/** Splash: the logo, the direction's tagline and a way in. Nothing personal on screen. */
export function Splash({ showActions = true }: SplashProps) {
  const { copy, direction } = useDirection()
  const bold = direction.hero.dark
  const align = bold ? 'start' : 'center'
  // Round 2: the hero image runs full-bleed from the top edge (white status bar over a soft
  // shade, see bento.css) and the words sit on a sheet below.
  if (direction.round === 2) {
    return (
      <Screen overlayStatus lightStatus>
        <VStack height="100%">
          <VStack className="bento-hero">
            <R2Img direction={direction.id} slot="hero" height="100%" position="center 20%" />
          </VStack>
          <VStack className={`bento-sheet${bold ? ' sayo-hero' : ''}`} gap={6} paddingInline={6} paddingBlockStart={6} paddingBlockEnd={8} vAlign={showActions ? 'start' : 'center'}>
            <VStack gap={4} hAlign="start">
              <Logo height={34} variant={direction.hero.logo} />
              <VStack gap={2}>
                <Display size={showActions ? 'lg' : 'xl'}>{copy.tagline}</Display>
                <Text color="inherit" size="lg" textWrap="balance">{copy.splashLine}</Text>
              </VStack>
            </VStack>
            {showActions && (
              <VStack gap={3}>
                <Button label={copy.ctaPrimary} variant="primary" size="lg" width="100%" />
                <Button label="I already have an account" variant={bold ? 'secondary' : 'ghost'} size="lg" width="100%" className={bold ? 'sayo-btn-on-gradient-ghost' : undefined} />
                <HStack gap={1} hAlign="center" vAlign="center">
                  <Icon icon={Lock} size="sm" />
                  <Text type="supporting" color="inherit" weight="semibold">Private by design. 18+ pilot.</Text>
                </HStack>
              </VStack>
            )}
          </VStack>
        </VStack>
      </Screen>
    )
  }
  return (
    <Screen className="sayo-hero" lightStatus={bold}>
      <VStack minHeight="100%" paddingInline={6} paddingBlockStart={4} paddingBlockEnd={8} gap={6} style={{ position: 'relative', overflow: 'clip' }}>
        {bold && (
          <span className="sayo-supergraphic" style={{ right: -90, top: 40, color: '#fff', overflow: 'clip' }}>
            <LogoMark size={420} variant="reverse" />
          </span>
        )}
        <VStack gap={6} vAlign="center" hAlign={align} style={{ flex: 1, position: 'relative' }}>
          <Logo height={bold ? 56 : 52} variant={direction.hero.logo} />
          <VStack gap={3} hAlign={align} style={{ textAlign: align }}>
            <Display size={bold ? 'xl' : 'lg'}>{copy.tagline}</Display>
            <Text color="inherit" justify={align} size="lg" textWrap="balance">{copy.splashLine}</Text>
          </VStack>
        </VStack>
        {showActions && (
          <VStack gap={3} style={{ position: 'relative' }}>
            <Button label={copy.ctaPrimary} variant="primary" size="lg" width="100%" className={direction.hero.whiteCta ? 'sayo-btn-on-gradient' : undefined} />
            <Button label="I already have an account" variant={bold ? 'secondary' : 'ghost'} size="lg" width="100%" className={bold ? 'sayo-btn-on-gradient-ghost' : undefined} />
            <HStack gap={1} hAlign="center" vAlign="center">
              <Icon icon={Lock} size="sm" />
              <Text type="supporting" color="inherit" weight="semibold">Private by design. 18+ pilot.</Text>
            </HStack>
          </VStack>
        )}
      </VStack>
    </Screen>
  )
}
