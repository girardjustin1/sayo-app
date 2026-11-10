import { Building2, CalendarDays, Check, DoorOpen, Flag, Lock, MapPin, Navigation, Phone, PhoneCall } from 'lucide-react'
import { VStack } from '@astryxdesign/core/VStack'
import { HStack } from '@astryxdesign/core/HStack'
import { Text } from '@astryxdesign/core/Text'
import { Button } from '@astryxdesign/core/Button'
import { Card } from '@astryxdesign/core/Card'
import { Heading } from '@astryxdesign/core/Heading'
import { Icon } from '@astryxdesign/core/Icon'
import { List, ListItem } from '@astryxdesign/core/List'
import { AppBar, Screen } from '../../../components/phone/chrome'
import { Display, ServiceCategoryTag } from '../../../components/sayo'
import { careService } from './data'
import { OpenLine, VerifiedMark, YouthFriendlyMark } from './parts'

export interface ServiceDetailProps {
  /** Service id from the Find Care sample data (s1, s2, s3, s4, s6, s7). */
  serviceId?: string
}

/** One verified service: what they offer, how private it is, and how to reach them. */
export function ServiceDetail({ serviceId = 's1' }: ServiceDetailProps) {
  const s = careService(serviceId)
  return (
    <Screen
      header={<AppBar title="Service" onBack={() => {}} />}
      footer={
        <HStack gap={2}>
          <Button label={s.phoneOnly ? 'Call now' : 'Call'} variant="primary" size="lg" width={s.phoneOnly ? '100%' : '50%'} icon={<Phone size={18} />} />
          {!s.phoneOnly && <Button label="Directions" variant="secondary" size="lg" width="50%" icon={<Navigation size={18} />} />}
        </HStack>
      }
    >
      <VStack gap={5} padding={5}>
        <VStack gap={3}>
          <HStack gap={2} vAlign="center">
            <Icon icon={s.phoneOnly ? PhoneCall : Building2} color="accent" />
            <Text type="supporting">{s.type}</Text>
          </HStack>
          <Display size="sm" as="h1">{s.name}</Display>
          <HStack gap={1.5} wrap="wrap" vAlign="center">
            <VerifiedMark />
            {s.youthFriendly && <YouthFriendlyMark />}
          </HStack>
        </VStack>

        <List edge="flush" hasDividers>
          <ListItem
            align="start"
            startContent={<Icon icon={MapPin} color="secondary" />}
            label={<Text weight="semibold">{s.phoneOnly ? 'Phone and referral service' : `${s.area} · ${s.distanceKm} km away`}</Text>}
            description={<Text type="supporting">{s.landmark}</Text>}
          />
          <ListItem
            align="start"
            startContent={<Icon icon={CalendarDays} color="secondary" />}
            label={<Text weight="semibold">{s.hours}</Text>}
            description={
              <VStack gap={1}>
                <OpenLine service={s} />
                <Text type="supporting">Hours can change. Call ahead to confirm.</Text>
              </VStack>
            }
          />
          <ListItem align="start" startContent={<Icon icon={Phone} color="secondary" />} label={<Text weight="semibold">{s.phone}</Text>} />
          {!s.phoneOnly && (
            <ListItem
              align="start"
              startContent={<Icon icon={DoorOpen} color="secondary" />}
              label={<Text weight="semibold">{s.walkIn ? 'Walk-ins welcome' : 'Call first to arrange a visit'}</Text>}
            />
          )}
        </List>

        <VStack gap={3}>
          <Heading level={2}>What they offer</Heading>
          <List edge="flush" density="compact">
            {s.offers.map((o) => (
              <ListItem key={o} align="first-line" startContent={<Icon icon={Check} size="sm" color="success" />} label={<Text>{o}</Text>} />
            ))}
          </List>
          <HStack gap={1.5} wrap="wrap">
            {s.categories.map((c) => <ServiceCategoryTag key={c} category={c} />)}
          </HStack>
        </VStack>

        <Card variant="muted">
          <VStack gap={2}>
            <HStack gap={2} vAlign="center">
              <Icon icon={Lock} size="sm" color="secondary" />
              <Text weight="bold">Privacy</Text>
            </HStack>
            <Text>{s.confidentiality}</Text>
            <Text type="supporting">SAYO doesn’t tell the service you looked them up, and doesn’t book appointments or share your questions with them.</Text>
          </VStack>
        </Card>

        <VStack gap={2}>
          <HStack gap={2} vAlign="center" wrap="wrap">
            <VerifiedMark short />
            <Text type="supporting">Details checked {s.verifiedOn}</Text>
          </HStack>
          <HStack><Button label="Report wrong information" variant="ghost" size="sm" icon={<Flag size={16} />} /></HStack>
        </VStack>
      </VStack>
    </Screen>
  )
}
