import { ChevronRight, Flag, MessageSquareText } from 'lucide-react'
import { VStack } from '@astryxdesign/core/VStack'
import { HStack } from '@astryxdesign/core/HStack'
import { Text } from '@astryxdesign/core/Text'
import { Heading } from '@astryxdesign/core/Heading'
import { Banner } from '@astryxdesign/core/Banner'
import { Card } from '@astryxdesign/core/Card'
import { Icon } from '@astryxdesign/core/Icon'
import { Link } from '@astryxdesign/core/Link'
import { List, ListItem } from '@astryxdesign/core/List'
import { AppBar, Screen } from '../../../components/phone/chrome'
import { Logo } from '../../../brand/Logo'
import { useDirection } from '../../../brand/DirectionContext'
import { LOCKED_COPY } from '../../../brand/directions'

const chevron = <Icon icon={ChevronRight} color="secondary" />

const FAQ = [
  'How does a professional review work?',
  'Who can see my Circle posts?',
  'What happens if I forget my PIN?',
  'What does SAYO keep about me?',
]

/** Help & about: safety first (not an emergency service, does not diagnose), then FAQs and feedback. */
export function HelpAbout() {
  const { copy } = useDirection()
  return (
    <Screen header={<AppBar onBack={() => {}} title="Help & about" />}>
      <VStack gap={5} padding={5} paddingBlockEnd={10}>
        <Banner
          status="warning"
          title="SAYO is not an emergency service"
          description={
            <VStack gap={2}>
              <Text color="inherit">{LOCKED_COPY.emergency}</Text>
              <Text color="inherit">
                SAYO gives general health information and does not diagnose. Professional reviews are not live and can take time.
              </Text>
            </VStack>
          }
        />

        <VStack gap={3}>
          <Heading level={3}>Common questions</Heading>
          <Card>
            <List hasDividers edge="outset">
              {FAQ.map((q) => <ListItem key={q} label={<>{q}</>} endContent={chevron} onClick={() => {}} />)}
            </List>
          </Card>
        </VStack>

        <VStack gap={3}>
          <Heading level={3}>Talk to us</Heading>
          <Card>
            <List hasDividers edge="outset">
              <ListItem label="Send feedback" description="Tell the SAYO team what to improve" startContent={<Icon icon={MessageSquareText} color="accent" />} endContent={chevron} onClick={() => {}} />
              <ListItem label="Report a problem" description="Something broken or unsafe" startContent={<Icon icon={Flag} color="accent" />} endContent={chevron} onClick={() => {}} />
            </List>
          </Card>
        </VStack>

        <VStack gap={3} hAlign="center">
          <Logo height={26} />
          <Text type="supporting" justify="center">{copy.tagline}</Text>
          <HStack gap={4} vAlign="center">
            <Link href="#terms" size="sm">Terms</Link>
            <Link href="#privacy" size="sm">Privacy notice</Link>
            <Text type="supporting">Prototype · sample data</Text>
          </HStack>
        </VStack>
      </VStack>
    </Screen>
  )
}
