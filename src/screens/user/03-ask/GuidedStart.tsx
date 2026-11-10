import type { ComponentType } from 'react'
import { BadgeCheck, CircleSlash, Heart, MessageCircleHeart, MessageCircleQuestion, Pencil, PenLine, Shield, ShieldCheck, Sparkles, Wine } from 'lucide-react'
import { VStack } from '@astryxdesign/core/VStack'
import { HStack } from '@astryxdesign/core/HStack'
import { Text } from '@astryxdesign/core/Text'
import { Button } from '@astryxdesign/core/Button'
import { ClickableCard } from '@astryxdesign/core/ClickableCard'
import { ProgressBar } from '@astryxdesign/core/ProgressBar'
import { Icon } from '@astryxdesign/core/Icon'
import { Card } from '@astryxdesign/core/Card'
import { Heading } from '@astryxdesign/core/Heading'
import { List, ListItem } from '@astryxdesign/core/List'
import { Screen } from '../../../components/phone/chrome'
import { Display } from '../../../components/sayo'
import { useDirection } from '../../../brand/DirectionContext'
import { STARTERS } from './data'
import { AiTurn, AskBar, Composer, ScrollToEnd, Thread, UserTurn } from './parts'

const noop = () => {}
const STEPS = 3

interface Option {
  label: string
  icon?: ComponentType
  /** One calm line under the label. */
  note?: string
  /** Opens the safety flow (User/04 Safety) instead of the next step. */
  safety?: boolean
}

/**
 * Step 1 options. Topics stay explicit (SAYO names things plainly). Nothing here asks
 * who she is: no name, place, school or partner.
 */
const TOPICS: Option[] = [
  { label: 'Sex and my body', icon: Heart },
  { label: 'HIV, PrEP or PEP', icon: ShieldCheck },
  { label: 'Contraception or pregnancy', icon: CircleSlash },
  { label: 'How I’m feeling', icon: Sparkles },
  { label: 'Alcohol or drugs', icon: Wine },
  { label: 'Something happened to me', icon: Shield, note: 'We’ll go gently, and check you’re safe first.', safety: true },
  { label: 'Something else', icon: MessageCircleQuestion },
]

/** Step 2 options: rough timing only, ending with human opt-outs. DRAFT wording; the buckets need clinical sign-off. */
const TIMINGS: Option[] = [
  { label: 'Today or yesterday' },
  { label: 'In the last 3 days' },
  { label: 'This week' },
  { label: 'More than a week ago' },
  { label: 'I just have a question' },
  { label: 'Not sure, it’s been on and off' },
]
const TIMING_QUESTION = 'When did this start?'

/** The sample path the stories show: step 1 and step 2 answers carried forward. */
const PICKED = { topic: TOPICS[0].label, timing: TIMINGS[2].label }

/**
 * Slim progress under the Ask bar. A bar only, no "2 of 3" counter: the Hers research found
 * counters make a conversation feel like a form. Screen readers still get "Step 2 of 3".
 */
function GuidedHeader({ step }: { step: number }) {
  return (
    <VStack gap={0}>
      <AskBar />
      <VStack paddingInline={5} paddingBlockEnd={2}>
        <ProgressBar label={`Step ${step} of ${STEPS}`} isLabelHidden value={step} max={STEPS} />
      </VStack>
    </VStack>
  )
}

/**
 * What happens next, said once at the hand-off (Hers's process card). Times are honest and
 * unhurried: no hours are promised, because review is async and depends on who is available.
 */
const NEXT_STEPS: { icon: ComponentType; label: string; when: string }[] = [
  { icon: PenLine, label: 'You explain it in your own words', when: 'Now. Take as long as you need.' },
  { icon: MessageCircleHeart, label: 'SAYO asks a few questions and shares information', when: 'Straight after, a few minutes.' },
  { icon: BadgeCheck, label: 'A verified professional can review it', when: 'Only if you choose, when one is available.' },
]

function WhatHappensNext() {
  return (
    <Card variant="muted">
      <VStack gap={2}>
        <Heading level={3}>What happens next</Heading>
        <List edge="flush" density="compact" listStyle="none">
          {NEXT_STEPS.map((n) => (
            <ListItem
              key={n.label}
              align="first-line"
              startContent={<Icon icon={n.icon} size="sm" color="accent" />}
              label={<Text weight="semibold">{n.label}</Text>}
              description={n.when}
            />
          ))}
        </List>
      </VStack>
    </Card>
  )
}

/**
 * One large single-tap answer. Tapping moves straight on; there is no separate Next.
 * The safety option looks like every other row (calm, never an alarm): only its note differs.
 */
function OptionRow({ option }: { option: Option }) {
  return (
    <ClickableCard label={option.label} onClick={noop}>
      <HStack gap={3} vAlign="center" minHeight={32}>
        {option.icon && <Icon icon={option.icon} color="accent" />}
        <VStack gap={0.5} style={{ flex: 1, minWidth: 0 }}>
          <Text weight="semibold">{option.label}</Text>
          {option.note && <Text type="supporting">{option.note}</Text>}
        </VStack>
        <Icon icon="chevronRight" size="sm" color="secondary" />
      </HStack>
    </ClickableCard>
  )
}

/** Always there: leave the taps and write it instead. */
function TypeItEscape() {
  return <Button label="I’d rather just type it" variant="ghost" size="lg" width="100%" icon={<Icon icon={Pencil} />} />
}

export interface GuidedStartProps {
  /** 1 = topic · 2 = timing · 3 = hand-off into the Ask SAYO chat. */
  step?: 1 | 2 | 3
}

/**
 * Guided start (the Hers "Start here" pattern, with nothing to sell at the end): one
 * question per screen, large single-tap answers, a slim progress bar, and a way out to
 * free typing on every step. Two taps, then SAYO's locked follow-up in the normal chat.
 */
export function GuidedStart({ step = 1 }: GuidedStartProps) {
  const { locked } = useDirection()

  if (step === 3) {
    return (
      <Screen header={<GuidedHeader step={3} />} footer={<Composer starters={STARTERS} />}>
        <Thread>
          <AiTurn>{locked.askOpener}</AiTurn>
          <UserTurn>{PICKED.topic}</UserTurn>
          <AiTurn>{TIMING_QUESTION}</AiTurn>
          <UserTurn>{PICKED.timing}</UserTurn>
        </Thread>
        <VStack paddingInline={5} paddingBlockEnd={2}>
          <WhatHappensNext />
        </VStack>
        <Thread>
          <AiTurn>{locked.askFollowUp}</AiTurn>
        </Thread>
        <ScrollToEnd />
      </Screen>
    )
  }

  const first = step === 1
  return (
    <Screen header={<GuidedHeader step={step} />} footer={<TypeItEscape />}>
      <VStack gap={5} paddingInline={5} paddingBlockStart={3} paddingBlockEnd={5}>
        <VStack gap={2}>
          <Display size="xl">{first ? locked.askOpener : TIMING_QUESTION}</Display>
          <Text type="large" color="secondary">
            {first ? 'Tap the closest one. You can explain in your own words next.' : 'A rough answer is fine.'}
          </Text>
          {!first && <Text type="supporting">Why we ask: how recent it is changes what SAYO asks you next.</Text>}
        </VStack>
        {!first && (
          <HStack gap={2} vAlign="center">
            <Text type="supporting">You chose: <Text type="inherit" weight="semibold" color="primary">{PICKED.topic}</Text></Text>
            <Button label="Change" variant="ghost" size="sm" />
          </HStack>
        )}
        <VStack gap={2} role="group" aria-label={first ? locked.askOpener : TIMING_QUESTION}>
          {(first ? TOPICS : TIMINGS).map((o) => <OptionRow key={o.label} option={o} />)}
        </VStack>
      </VStack>
    </Screen>
  )
}
