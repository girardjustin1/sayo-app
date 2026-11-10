import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode } from 'react'
import { VStack } from '@astryxdesign/core/VStack'
import { HStack } from '@astryxdesign/core/HStack'
import { Text } from '@astryxdesign/core/Text'
import {
  AiLabel, AiNote, CareDecisionTag, CaseStatusBadge, Display, EmergencyNote, Keypad, PinDots, ProBadge, ProBlock,
  ReviewTimeline, SayoAvatar, ServiceCard, ServiceCategoryTag,
} from '.'
import { SERVICES } from '../../data/fixtures'
import { TabBar } from '../phone/chrome'

const meta: Meta = { title: 'Components/SAYO building blocks', parameters: { frame: 'none' } }
export default meta
type Story = StoryObj

function Row({ name, note, children }: { name: string; note: string; children: ReactNode }) {
  return (
    <div className="sayo-card" style={{ padding: 20 }}>
      <VStack gap={3}>
        <VStack gap={0.5}>
          <Text weight="bold">{name}</Text>
          <Text type="supporting">{note}</Text>
        </VStack>
        {children}
      </VStack>
    </div>
  )
}

export const TrustSignals: Story = {
  name: 'AI · peer · professional',
  render: () => (
    <VStack gap={4} maxWidth={560}>
      <Row name="AiLabel + AiNote" note="On every AI-written answer. The note wording is locked.">
        <AiLabel label="SAYO (AI)" />
        <AiNote />
      </Row>
      <Row name="Peer" note="Circle members: generated shape avatar + nickname. No badge, no photo.">
        <HStack gap={2} vAlign="center"><SayoAvatar seed="quietstorm" /><Text weight="semibold">quietstorm</Text></HStack>
      </Row>
      <Row name="ProBadge + ProBlock" note="The only green badge in the product. Used on professional replies and review responses.">
        <HStack><ProBadge profession="Registered nurse" /></HStack>
        <ProBlock title="My thoughts">What you describe is common and usually very treatable. A routine check and an STI test are a good idea.</ProBlock>
      </Row>
    </VStack>
  ),
}

export const ReviewOutcome: Story = {
  name: 'Review outcome',
  render: () => (
    <VStack gap={4} maxWidth={560}>
      <Row name="CareDecisionTag" note="The three locked in-person care decisions.">
        <HStack gap={2} wrap="wrap"><CareDecisionTag decision="none" /><CareDecisionTag decision="routine" /><CareDecisionTag decision="urgent" /></HStack>
      </Row>
      <Row name="ServiceCategoryTag" note="Where the professional points the user.">
        <HStack gap={2} wrap="wrap">
          {(['sexual_health', 'hiv', 'general', 'mental_health', 'substance', 'gbv', 'other'] as const).map((c) => <ServiceCategoryTag key={c} category={c} />)}
        </HStack>
      </Row>
      <Row name="CaseStatusBadge" note="Status of a review, in the user’s words.">
        <HStack gap={2} wrap="wrap">
          {(['queued', 'in_review', 'answered', 'closed'] as const).map((s) => <CaseStatusBadge key={s} status={s} />)}
        </HStack>
      </Row>
      <Row name="ReviewTimeline" note="Async, so the user always sees where her question is.">
        <ReviewTimeline status="in_review" sentAt="Today, 9:05 am" acceptedAt="Today, 11:20 am" />
      </Row>
    </VStack>
  ),
}

export const Care: Story = {
  name: 'Find Care + safety',
  render: () => (
    <VStack gap={4} maxWidth={560}>
      <ServiceCard service={SERVICES[0]} />
      <ServiceCard service={SERVICES[1]} compact />
      <Row name="EmergencyNote" note="Locked wording; shown wherever review might be mistaken for urgent care.">
        <EmergencyNote />
      </Row>
    </VStack>
  ),
}

export const Identity: Story = {
  name: 'Avatars, PIN, type, tab bar',
  render: () => (
    <VStack gap={4} maxWidth={560}>
      <Row name="SayoAvatar" note="Generated from the nickname. Six shapes × six colours. No photos, ever.">
        <HStack gap={2} wrap="wrap">
          {['sunflower_22', 'quietstorm', 'moonchild.gh', 'adwoa_reads', 'kente_dreams', 'nightowl', 'akosua.b', 'river_song', 'yaa_writes', 'blessing_x'].map((s) => <SayoAvatar key={s} seed={s} size={44} />)}
        </HStack>
      </Row>
      <Row name="PinDots + Keypad" note="4-digit PIN lock for private conversations.">
        <PinDots filled={2} />
        <Keypad />
      </Row>
      <Row name="Display" note="Brand headline face; changes per direction.">
        <Display size="xl">What’s up?</Display>
        <Display size="md" gradient>No shame. Just say it.</Display>
      </Row>
      <Row name="TabBar" note="Ask sits in the middle and is always emphasised.">
        <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid var(--color-border)' }}><TabBar active="home" /></div>
      </Row>
    </VStack>
  ),
}
