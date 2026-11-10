import { Bell, ChevronRight, Database, Eye, LifeBuoy, Lock, LogOut, Pencil, ShieldCheck } from 'lucide-react'
import { VStack } from '@astryxdesign/core/VStack'
import { HStack } from '@astryxdesign/core/HStack'
import { Text } from '@astryxdesign/core/Text'
import { Button } from '@astryxdesign/core/Button'
import { Card } from '@astryxdesign/core/Card'
import { Icon } from '@astryxdesign/core/Icon'
import { List, ListItem } from '@astryxdesign/core/List'
import { Screen } from '../../../components/phone/chrome'
import { Display, SayoAvatar } from '../../../components/sayo'
import { USER } from '../../../data/fixtures'
import { useDirection } from '../../../brand/DirectionContext'
import '../../../styles/onboarding.css'

export interface MeHomeProps {
  /** Private first name. Shown only here, inside the PIN lock. Empty = not set. */
  firstName?: string
  /** Circle nickname (public, pseudonymous). */
  circleName?: string
}

const chevron = <Icon icon={ChevronRight} color="secondary" />

const LINKS = [
  { icon: ShieldCheck, label: 'Privacy & security', description: 'PIN, auto-lock, app switcher' },
  { icon: Bell, label: 'Notifications', description: 'Always discreet' },
  { icon: Database, label: 'Your data', description: 'What we keep, download, delete' },
  { icon: LifeBuoy, label: 'Help & about SAYO', description: 'Not an emergency service' },
]

/** Me tab: the private name (only here), the Circle identity, and links to privacy settings. */
export function MeHome({ firstName = USER.firstName, circleName = USER.circleName }: MeHomeProps) {
  const { direction } = useDirection()
  const bold = direction.hero.dark
  return (
    <Screen tab="me" overlayStatus lightStatus={bold}>
      <VStack className="sayo-hero sayo-hero-top" gap={4} paddingInline={5} paddingBlockEnd={6}>
        <Display size="md" as="h1">Me</Display>
        <HStack gap={3} vAlign="center">
          <SayoAvatar seed={circleName} size={64} />
          <VStack gap={0.5} width="100%">
            <Text type="supporting" color="inherit" weight="semibold">Your Circle name</Text>
            <Text color="inherit" size="lg" weight="bold">{circleName}</Text>
          </VStack>
          <Button label="Edit Circle name and avatar" isIconOnly icon={<Icon icon={Pencil} size="sm" />} variant="secondary" size="sm" />
        </HStack>
      </VStack>

      <VStack gap={5} padding={5}>
        <Card>
          <VStack gap={3}>
            <HStack gap={1} vAlign="center">
              <Icon icon={Lock} color="secondary" size="sm" />
              <Text type="supporting" weight="semibold">Private · only you see this</Text>
            </HStack>
            <HStack hAlign="between" vAlign="center" gap={3}>
              <VStack gap={0}>
                <Text type="supporting">What SAYO calls you</Text>
                <Text weight="bold" size="lg">{firstName || 'Not set'}</Text>
              </VStack>
              <Button label={firstName ? 'Change' : 'Add'} variant="secondary" size="sm" />
            </HStack>
            <Text type="supporting">
              Never shown in the Circle. Your Circle name is never linked to your Ask SAYO conversations.
            </Text>
          </VStack>
        </Card>

        <Card>
          <List hasDividers edge="outset">
            {LINKS.map((l) => (
              <ListItem
                key={l.label}
                label={l.label}
                description={l.description}
                startContent={<Icon icon={l.icon} color="accent" />}
                endContent={chevron}
                onClick={() => {}}
              />
            ))}
          </List>
        </Card>

        <VStack gap={2}>
          <Button label="Lock SAYO now" variant="secondary" width="100%" icon={<Icon icon={Eye} size="sm" />} />
          <Button label="Log out" variant="ghost" width="100%" icon={<Icon icon={LogOut} size="sm" />} />
        </VStack>
      </VStack>
    </Screen>
  )
}
