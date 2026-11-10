import type { ReactNode } from 'react'
import { BellOff, ChevronRight, KeyRound } from 'lucide-react'
import { VStack } from '@astryxdesign/core/VStack'
import { Heading } from '@astryxdesign/core/Heading'
import { Switch } from '@astryxdesign/core/Switch'
import { Banner } from '@astryxdesign/core/Banner'
import { Card } from '@astryxdesign/core/Card'
import { Divider } from '@astryxdesign/core/Divider'
import { Icon } from '@astryxdesign/core/Icon'
import { List, ListItem } from '@astryxdesign/core/List'
import { RadioList, RadioListItem } from '@astryxdesign/core/RadioList'
import { AppBar, Screen } from '../../../components/phone/chrome'

export type AutoLock = 'immediately' | '1min' | '5min'

export interface PrivacySecurityProps {
  /** When SAYO locks itself after leaving the app. */
  autoLock?: AutoLock
  /** Hide SAYO's content in the phone's app switcher. */
  hideInSwitcher?: boolean
  /** She tried to switch the PIN off: show why it stays on. */
  triedPinOff?: boolean
}

const chevron = <Icon icon={ChevronRight} color="secondary" />

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <VStack gap={3}>
      <Heading level={3}>{title}</Heading>
      <Card>{children}</Card>
    </VStack>
  )
}

/** Privacy & security: the PIN (always on), change PIN, auto-lock, discreet notifications, app switcher. */
export function PrivacySecurity({ autoLock = 'immediately', hideInSwitcher = true, triedPinOff = false }: PrivacySecurityProps) {
  return (
    <Screen header={<AppBar onBack={() => {}} title="Privacy & security" />}>
      <VStack gap={5} padding={5} paddingBlockEnd={10}>
        {triedPinOff && (
          <Banner
            status="info"
            title="Your PIN can’t be turned off"
            description="Your Ask SAYO conversations and reviews are private health information. The PIN keeps them safe if someone else picks up your phone."
            isDismissable
          />
        )}

        <Section title="PIN lock">
          <VStack gap={3}>
            <Switch
              label="PIN lock"
              value
              isDisabled
              disabledMessage="The PIN always stays on"
              description="Always on. It protects your private conversations and reviews, so it can’t be switched off."
              labelPosition="start"
              labelSpacing="spread"
              width="100%"
            />
            <Divider />
            <List edge="outset">
              <ListItem
                label="Change PIN"
                description="You’ll enter your current PIN first"
                startContent={<Icon icon={KeyRound} color="accent" />}
                endContent={chevron}
                onClick={() => {}}
              />
            </List>
          </VStack>
        </Section>

        <Section title="Auto-lock">
          <RadioList label="Lock SAYO when I leave the app" value={autoLock} onChange={() => {}}>
            <RadioListItem value="immediately" label="Immediately" description="Safest on a shared phone" />
            <RadioListItem value="1min" label="After 1 minute" />
            <RadioListItem value="5min" label="After 5 minutes" />
          </RadioList>
        </Section>

        <Section title="On your screen">
          <VStack gap={3}>
            <Switch
              label="Hide SAYO in the app switcher"
              description="Shows a blank screen instead of your conversation when you switch apps."
              value={hideInSwitcher}
              onChange={() => {}}
              labelPosition="start"
              labelSpacing="spread"
              width="100%"
            />
            <Divider />
            <List edge="outset">
              <ListItem
                label="Discreet notifications"
                description={<>Always on. Lock-screen messages never mention a health topic.</>}
                startContent={<Icon icon={BellOff} color="accent" />}
                endContent={chevron}
                align="first-line"
                onClick={() => {}}
              />
            </List>
          </VStack>
        </Section>
      </VStack>
    </Screen>
  )
}
