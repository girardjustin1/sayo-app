import { BadgeCheck, Clock, HeartHandshake, MapPin, Navigation, Phone, Sparkles } from 'lucide-react'
import { VStack } from '@astryxdesign/core/VStack'
import { HStack } from '@astryxdesign/core/HStack'
import { Text } from '@astryxdesign/core/Text'
import { Button } from '@astryxdesign/core/Button'
import { Badge } from '@astryxdesign/core/Badge'
import { Banner } from '@astryxdesign/core/Banner'
import { Icon } from '@astryxdesign/core/Icon'
import { ClickableCard } from '@astryxdesign/core/ClickableCard'
import { careService, type CareService } from './data'

/**
 * "Verified by SAYO": same tick icon and green as the Verified Professional badge,
 * so trust reads the same everywhere.
 */
export function VerifiedMark({ short = false }: { short?: boolean }) {
  return <Badge variant="green" icon={<BadgeCheck size={12} />} label={short ? 'Verified' : 'Verified by SAYO'} />
}

/** Youth-friendly services carry this next to the verified mark. */
export function YouthFriendlyMark() {
  return <Badge variant="pink" icon={<Sparkles size={12} />} label="Youth-friendly" />
}

/** "Open now · closes 6 pm" with a success clock, or closed with a neutral one. */
export function OpenLine({ service }: { service: CareService }) {
  return (
    <HStack gap={1.5} vAlign="center">
      <Icon icon={Clock} size="sm" color={service.isOpen ? 'success' : 'secondary'} />
      <Text type="supporting" weight={service.isOpen ? 'semibold' : 'normal'}>{service.openNow}</Text>
    </HStack>
  )
}

/** One service in a list. Leads with Call and Directions. Never Book. */
export function CareServiceRow({ service, showDistance = true }: { service: CareService; showDistance?: boolean }) {
  const where = service.phoneOnly ? 'Phone & referral' : showDistance ? `${service.area} · ${service.distanceKm} km` : service.area
  return (
    <ClickableCard label={`${service.name} details`}>
      <VStack gap={3}>
        <VStack gap={2}>
          <VStack gap={0.5}>
            <Text weight="bold" type="large">{service.name}</Text>
            <Text type="supporting">{service.type}</Text>
          </VStack>
          {(service.verified || service.youthFriendly) && (
            <HStack gap={1.5} wrap="wrap" vAlign="center">
              {service.verified && <VerifiedMark />}
              {service.youthFriendly && <YouthFriendlyMark />}
            </HStack>
          )}
          <HStack gap={3} wrap="wrap" vAlign="center">
            <HStack gap={1.5} vAlign="center">
              <Icon icon={MapPin} size="sm" color="secondary" />
              <Text type="supporting">{where}</Text>
            </HStack>
            <OpenLine service={service} />
          </HStack>
        </VStack>
        <HStack gap={2}>
          <Button label="Call" variant="primary" icon={<Phone size={16} />} width={service.phoneOnly ? '100%' : '50%'} />
          {!service.phoneOnly && <Button label="Directions" variant="secondary" icon={<Navigation size={16} />} width="50%" />}
        </HStack>
      </VStack>
    </ClickableCard>
  )
}

/** Shown with "GBV support" and "Mental health": help now, before the list. */
export function CrisisCard({ kind }: { kind: 'gbv' | 'mental_health' }) {
  const line = careService('s4')
  return (
    <Banner
      status="info"
      icon={<HeartHandshake size={20} />}
      collapsible={false}
      title={kind === 'gbv' ? 'Need support after violence?' : 'Need help right now?'}
      description={
        kind === 'gbv'
          ? `${line.name} is free, confidential and open 24 hours. You don’t have to give your name. If you are in danger, call 112.`
          : 'If you feel unsafe or are thinking about hurting yourself, call 112 or go to the nearest emergency department now.'
      }
    >
      <Button label={kind === 'gbv' ? 'Call the support line' : 'Call 112'} variant="primary" width="100%" icon={<Phone size={16} />} />
    </Banner>
  )
}
