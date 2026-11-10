import { BarChart3, Download, MessagesSquare, Stethoscope, Trash2, User, Users } from 'lucide-react'
import { VStack } from '@astryxdesign/core/VStack'
import { HStack } from '@astryxdesign/core/HStack'
import { Text } from '@astryxdesign/core/Text'
import { Heading } from '@astryxdesign/core/Heading'
import { Button } from '@astryxdesign/core/Button'
import { Banner } from '@astryxdesign/core/Banner'
import { Card } from '@astryxdesign/core/Card'
import { Icon } from '@astryxdesign/core/Icon'
import { List, ListItem } from '@astryxdesign/core/List'
import { AppBar, Screen } from '../../../components/phone/chrome'
import { PhoneAlert } from '../01-onboarding/parts'

export interface YourDataProps {
  /** default · downloadRequested: a copy is being prepared · confirmDelete: the delete AlertDialog is open. */
  state?: 'default' | 'downloadRequested' | 'confirmDelete'
}

const STORED = [
  { icon: User, label: 'Your account', description: 'Circle nickname, avatar, and the phone number or email you log in with. Your first name, if you added one.' },
  { icon: MessagesSquare, label: 'Ask SAYO conversations', description: 'Your questions, SAYO’s answers and summaries. Locked behind your PIN.' },
  { icon: Stethoscope, label: 'Professional reviews', description: 'Only questions you chose to send, and the replies. A reviewer sees only what the review needs.' },
  { icon: Users, label: 'Circle posts and replies', description: 'Shown under your nickname. Never linked to your private conversations.' },
  { icon: BarChart3, label: 'Pilot statistics', description: 'Counts like “questions asked this week”, with names and details removed.' },
]

/** Your data: what SAYO stores, download a copy, delete the account. */
export function YourData({ state = 'default' }: YourDataProps) {
  return (
    <Screen header={<AppBar onBack={() => {}} title="Your data" />}>
      <VStack gap={5} padding={5} paddingBlockEnd={10}>
        {state === 'downloadRequested' && (
          <Banner
            status="success"
            title="We’re preparing your copy"
            description="We’ll send a discreet notification when it’s ready to download here, behind your PIN."
            isDismissable
          />
        )}

        <VStack gap={3}>
          <Heading level={3}>What SAYO keeps</Heading>
          <Card>
            <List hasDividers edge="outset">
              {STORED.map((s) => (
                <ListItem
                  key={s.label}
                  label={s.label}
                  description={<>{s.description}</>}
                  startContent={<Icon icon={s.icon} color="accent" />}
                  align="first-line"
                />
              ))}
            </List>
          </Card>
          <Text type="supporting">
            SAYO doesn’t ask for photos of you, your contacts or your location history.
          </Text>
        </VStack>

        <VStack gap={3}>
          <Heading level={3}>Your choices</Heading>
          <Card>
            <VStack gap={3}>
              <HStack gap={2} vAlign="start">
                <Icon icon={Download} color="accent" />
                <VStack gap={0.5}>
                  <Text weight="semibold">Download a copy</Text>
                  <Text type="supporting">Everything listed above, in one file.</Text>
                </VStack>
              </HStack>
              <Button label="Request my data" variant="secondary" width="100%" isDisabled={state === 'downloadRequested'} />
            </VStack>
          </Card>
          <Card>
            <VStack gap={3}>
              <HStack gap={2} vAlign="start">
                <Icon icon={Trash2} color="error" />
                <VStack gap={0.5}>
                  <Text weight="semibold">Delete my account</Text>
                  <Text type="supporting">Removes your account, conversations, reviews and Circle posts.</Text>
                </VStack>
              </HStack>
              <Button label="Delete account" variant="destructive" width="100%" />
            </VStack>
          </Card>
        </VStack>
      </VStack>

      {state === 'confirmDelete' && (
        <PhoneAlert
          title="Delete your SAYO account?"
          description="This permanently deletes your account, your Ask SAYO conversations, your professional reviews and your Circle posts. It can’t be undone. Download a copy first if you want to keep anything."
          actionLabel="Delete everything"
          cancelLabel="Keep my account"
        />
      )}
    </Screen>
  )
}
