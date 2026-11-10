import { VStack } from '@astryxdesign/core/VStack'
import { Text } from '@astryxdesign/core/Text'
import { Heading } from '@astryxdesign/core/Heading'
import { Button } from '@astryxdesign/core/Button'
import { Switch } from '@astryxdesign/core/Switch'
import { Banner } from '@astryxdesign/core/Banner'
import { Card } from '@astryxdesign/core/Card'
import { SegmentedControl, SegmentedControlItem } from '@astryxdesign/core/SegmentedControl'
import { AppBar, Screen } from '../../../components/phone/chrome'
import { LockScreenPreview } from '../01-onboarding/parts'

export interface NotificationSettingsProps {
  /** Lock-screen text: the direction's generic line, or no preview at all. */
  preview?: 'generic' | 'hidden'
  /** Notifications are blocked in the phone's settings. */
  blockedBySystem?: boolean
}

/** Notification settings with a live lock-screen preview. Wording is always generic. */
export function NotificationSettings({ preview = 'generic', blockedBySystem = false }: NotificationSettingsProps) {
  const on = !blockedBySystem
  return (
    <Screen header={<AppBar onBack={() => {}} title="Notifications" />}>
      <VStack gap={5} padding={5} paddingBlockEnd={10}>
        {blockedBySystem && (
          <Banner
            status="warning"
            title="Notifications are off for SAYO"
            description={
              <VStack gap={3} hAlign="start">
                <Text color="inherit">You won’t know when a review is ready. Turn them on in your phone’s settings.</Text>
                <Button label="Open settings" size="sm" />
              </VStack>
            }
          />
        )}

        <VStack gap={3}>
          <Heading level={3}>On your lock screen</Heading>
          <LockScreenPreview hidePreview={preview === 'hidden'} />
          <SegmentedControl label="Lock-screen text" value={preview} onChange={() => {}} layout="fill" isDisabled={!on}>
            <SegmentedControlItem value="generic" label="Generic message" />
            <SegmentedControlItem value="hidden" label="No preview" />
          </SegmentedControl>
          <Text type="supporting">
            Either way, SAYO never shows a health topic, your question or a professional’s reply on the lock screen.
          </Text>
        </VStack>

        <VStack gap={3}>
          <Heading level={3}>Tell me about</Heading>
          <Card>
            <VStack gap={4}>
              <Switch label="Review responses" description="When a verified professional replies" value={on} isDisabled={!on} onChange={() => {}} labelPosition="start" labelSpacing="spread" width="100%" />
              <Switch label="Replies to my Circle posts" value={on} isDisabled={!on} onChange={() => {}} labelPosition="start" labelSpacing="spread" width="100%" />
              <Switch label="SAYO news" description="Occasional updates about the pilot" value={false} isDisabled={!on} onChange={() => {}} labelPosition="start" labelSpacing="spread" width="100%" />
            </VStack>
          </Card>
        </VStack>
      </VStack>
    </Screen>
  )
}
