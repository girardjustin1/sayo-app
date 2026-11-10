import { ArrowRight, Lock, MapPin, MessageCircleHeart, Sparkles } from 'lucide-react'
import { VStack } from '@astryxdesign/core/VStack'
import { HStack } from '@astryxdesign/core/HStack'
import { Text } from '@astryxdesign/core/Text'
import { Heading } from '@astryxdesign/core/Heading'
import { Button } from '@astryxdesign/core/Button'
import { Card } from '@astryxdesign/core/Card'
import { ClickableCard } from '@astryxdesign/core/ClickableCard'
import { NavIcon } from '@astryxdesign/core/NavIcon'
import { Icon } from '@astryxdesign/core/Icon'
import { List, ListItem } from '@astryxdesign/core/List'
import { Screen } from '../../../components/phone/chrome'
import { CaseStatusBadge, Display, SayoAvatar } from '../../../components/sayo'
import { LogoMark } from '../../../brand/Logo'
import { useDirection } from '../../../brand/DirectionContext'
import { CASES, CIRCLE_POSTS, USER } from '../../../data/fixtures'
import '../../../styles/onboarding.css'

export interface HomeProps {
  /** Show the "your answer is ready" card at the top. */
  hasReadyReview?: boolean
  /** First visit: no reviews, no history. */
  isNew?: boolean
}

/** Home: one big door into Ask SAYO, then reviews, Find Care and the Circle. */
export function Home({ hasReadyReview = false, isNew = false }: HomeProps) {
  const { copy, direction } = useDirection()
  const ready = CASES.find((c) => c.status === 'answered')
  const bold = direction.hero.dark
  return (
    <Screen tab="home" lightStatus={bold} overlayStatus>
      <VStack className="sayo-hero sayo-hero-top" gap={4} paddingInline={5} paddingBlockEnd={bold ? 4 : 0}>
        <HStack hAlign="between" vAlign="center">
          <LogoMark size={30} variant={direction.hero.logo} />
          <HStack gap={1} vAlign="center">
            <Icon icon={Lock} size="sm" />
            <Text type="supporting" weight="semibold" color="inherit">Private</Text>
          </HStack>
        </HStack>
        <VStack gap={1}>
          <Text color="inherit" weight="semibold">{copy.homeGreeting(USER.firstName)}</Text>
          <Display size="lg">{copy.homePrompt}</Display>
        </VStack>
        <ClickableCard label="Ask SAYO" elevation="low">
          <HStack gap={3} vAlign="center">
            <NavIcon icon={<Icon icon={MessageCircleHeart} />} />
            <VStack gap={0}>
              <Text weight="bold">Ask SAYO</Text>
              <Text type="supporting">{copy.askPlaceholder}</Text>
            </VStack>
          </HStack>
        </ClickableCard>
      </VStack>

      <VStack gap={5} padding={5}>
        {hasReadyReview && ready && (
          <Card>
            <VStack gap={3}>
              <HStack hAlign="between" vAlign="center" gap={2}>
                <Heading level={3}>{copy.reviewReadyTitle}</Heading>
                <CaseStatusBadge status="answered" />
              </HStack>
              <Text color="secondary">A verified professional replied to your question from {ready.concern.createdAt.toLowerCase()}.</Text>
              <HStack><Button label="Read response" variant="primary" size="sm" endContent={<Icon icon={ArrowRight} size="sm" />} /></HStack>
            </VStack>
          </Card>
        )}

        {!isNew && !hasReadyReview && (
          <VStack gap={3}>
            <Heading level={2}>My reviews</Heading>
            <ClickableCard label="Question from today, 9:02 am">
              <VStack gap={2} hAlign="start">
                <CaseStatusBadge status="queued" />
                <VStack gap={0}>
                  <Text weight="semibold">Question from today, 9:02 am</Text>
                  <Text type="supporting">You’ll get a discreet notification</Text>
                </VStack>
              </VStack>
            </ClickableCard>
          </VStack>
        )}

        <HStack gap={3}>
          <ClickableCard label="Find Care" width="50%">
            <VStack gap={2}>
              <Icon icon={MapPin} color="accent" size="lg" />
              <Text weight="bold">Find Care</Text>
              <Text type="supporting">Verified clinics and support near you</Text>
            </VStack>
          </ClickableCard>
          <ClickableCard label="Topics" width="50%">
            <VStack gap={2}>
              <Icon icon={Sparkles} color="accent" size="lg" />
              <Text weight="bold">Learn</Text>
              <Text type="supporting">PrEP, PEP, contraception, consent…</Text>
            </VStack>
          </ClickableCard>
        </HStack>

        <VStack gap={3}>
          <HStack hAlign="between" vAlign="center">
            <Heading level={2}>From the Circle</Heading>
            <Button label="See all" variant="ghost" size="sm" />
          </HStack>
          <Card>
            <List hasDividers edge="outset">
              {CIRCLE_POSTS.slice(0, 2).map((p) => (
                <ListItem
                  key={p.id}
                  label={<Text weight="semibold">{p.title}</Text>}
                  description={`${p.replies.length} replies · ${p.reactions.support} support`}
                  startContent={<SayoAvatar seed={p.author} size={32} />}
                  align="first-line"
                  onClick={() => {}}
                />
              ))}
            </List>
          </Card>
        </VStack>
      </VStack>
    </Screen>
  )
}
