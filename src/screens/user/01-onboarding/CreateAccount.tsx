import { Shuffle } from 'lucide-react'
import { VStack } from '@astryxdesign/core/VStack'
import { HStack } from '@astryxdesign/core/HStack'
import { Text } from '@astryxdesign/core/Text'
import { Heading } from '@astryxdesign/core/Heading'
import { Button } from '@astryxdesign/core/Button'
import { Banner } from '@astryxdesign/core/Banner'
import { TextInput } from '@astryxdesign/core/TextInput'
import { CheckboxInput } from '@astryxdesign/core/CheckboxInput'
import { SegmentedControl, SegmentedControlItem } from '@astryxdesign/core/SegmentedControl'
import { Link } from '@astryxdesign/core/Link'
import { Icon } from '@astryxdesign/core/Icon'
import { StackItem } from '@astryxdesign/core/Stack'
import { AppBar, Screen } from '../../../components/phone/chrome'
import { Display, SayoAvatar } from '../../../components/sayo'
import { USER } from '../../../data/fixtures'
import { LOCKED_COPY } from '../../../brand/directions'

export interface CreateAccountProps {
  /** How she will log in. Only one is needed. */
  method?: 'phone' | 'email'
  /** Fields filled in and all boxes ticked: the button is enabled. */
  filled?: boolean
  /** Show validation errors (nickname taken, acknowledgement not ticked). */
  showErrors?: boolean
}

const CONTACT_NOTE = 'Never shown publicly. Only used to log in and to recover your account. Nobody in the Circle can see it.'

/**
 * Create account. Minimum data only: a Circle nickname, and a phone number OR an
 * email for login. Plus consent to the terms and privacy notice, and an explicit
 * acknowledgement that SAYO is not an emergency service and does not diagnose.
 */
export function CreateAccount({ method = 'phone', filled = false, showErrors = false }: CreateAccountProps) {
  const nickname = filled || showErrors ? USER.circleName : ''
  const contact = filled ? (method === 'phone' ? '20 000 0000' : 'name@example.com') : ''
  const ticked = filled
  return (
    <Screen
      header={<AppBar onBack={() => {}} title="Create account" />}
      footer={<Button label="Create account" variant="primary" size="lg" width="100%" isDisabled={!filled} />}
    >
      <VStack gap={6} paddingInline={5} paddingBlockStart={2} paddingBlockEnd={6}>
        <VStack gap={2}>
          <Display size="md">Just two things</Display>
          <Text color="secondary">A nickname for the Circle and a way to log in. No real name, no photo.</Text>
        </VStack>

        {/* Circle nickname */}
        <VStack gap={3}>
          <TextInput
            label="Circle nickname"
            value={nickname}
            placeholder="e.g. quiet_river"
            description="Shown in the Circle. Don’t use your real name."
            status={showErrors ? { type: 'error', message: 'That nickname is taken. Try another.' } : undefined}
            statusVariant="detached"
            isRequired
          />
          <HStack gap={2} vAlign="center">
            <SayoAvatar seed={nickname || 'new-member'} size={32} />
            <StackItem size="fill">
              <Text type="supporting">How you’ll appear in the Circle</Text>
            </StackItem>
            <StackItem>
              <Button label="Suggest one" variant="ghost" size="sm" icon={<Icon icon={Shuffle} size="sm" />} />
            </StackItem>
          </HStack>
        </VStack>

        {/* Login */}
        <VStack gap={3}>
          <Heading level={3}>Log in with</Heading>
          <SegmentedControl label="Log in with" value={method} onChange={() => {}} layout="fill">
            <SegmentedControlItem value="phone" label="Phone number" />
            <SegmentedControlItem value="email" label="Email" />
          </SegmentedControl>
          {method === 'phone' ? (
            <TextInput type="tel" label="Phone number" value={contact} placeholder="+233 …" description={CONTACT_NOTE} isRequired />
          ) : (
            <TextInput type="email" label="Email" value={contact} placeholder="you@example.com" description={CONTACT_NOTE} isRequired />
          )}
        </VStack>

        {/* Consent */}
        <VStack gap={3}>
          <Heading level={3}>Before you start</Heading>
          <CheckboxInput label="I agree to the Terms of use" value={ticked} isRequired />
          <CheckboxInput label="I have read the Privacy notice" description="What SAYO keeps, why, and how to delete it." value={ticked} isRequired />
          <Banner status="warning" title="Please read" collapsible={false}>
            <CheckboxInput
              label="I understand SAYO is not an emergency service and does not diagnose."
              description={LOCKED_COPY.emergency}
              value={ticked}
              isRequired
              status={showErrors ? { type: 'error', message: 'Please tick this box to continue.' } : undefined}
            />
          </Banner>
          <HStack gap={4}>
            <Link href="#terms" isStandalone>Read the Terms</Link>
            <Link href="#privacy" isStandalone>Read the Privacy notice</Link>
          </HStack>
        </VStack>
      </VStack>
    </Screen>
  )
}
