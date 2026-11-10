import {
  ArrowRight, Baby, BadgeCheck, Check, CircleCheck, CircleSlash, Clock, Heart, HeartHandshake, Info, Lock, MapPin,
  MessageCircle, MessageCircleQuestion, Phone, Pill, Quote, RotateCcw, Shield, ShieldCheck, Sparkles, WifiOff, Wine, X,
} from 'lucide-react'
import { Fragment, type ComponentType } from 'react'
import { VStack } from '@astryxdesign/core/VStack'
import { HStack } from '@astryxdesign/core/HStack'
import { Text } from '@astryxdesign/core/Text'
import { Heading } from '@astryxdesign/core/Heading'
import { Button } from '@astryxdesign/core/Button'
import { Banner } from '@astryxdesign/core/Banner'
import { Card } from '@astryxdesign/core/Card'
import { ClickableCard } from '@astryxdesign/core/ClickableCard'
import { Grid, GridSpan } from '@astryxdesign/core/Grid'
import { Icon } from '@astryxdesign/core/Icon'
import { Blockquote } from '@astryxdesign/core/Blockquote'
import { TextArea } from '@astryxdesign/core/TextArea'
import { ChatSystemMessage } from '@astryxdesign/core/Chat'
import { Screen } from '../../../components/phone/chrome'
import { AiLabel, AiNote, Display, EmergencyNote, ReviewTimeline, ServiceCard } from '../../../components/sayo'
import { LogoMark } from '../../../brand/Logo'
import { useDirection } from '../../../brand/DirectionContext'
import { AI_INFO_DISCHARGE, CONCERN_DISCHARGE, INTAKE_CHAT } from '../../../data/fixtures'
import type { Topic } from '../../../data/types'
import {
  ASK_COPY, CHAT_BEFORE_FREE_TEXT, CHAT_MID, CHAT_PEP, OFFLINE_BODY, PEP_RED_FLAG, PEP_SERVICES,
  REVIEW_NOT_SEES, REVIEW_SEES, SUMMARY_PARTS, ALWAYS_REPLIES, STARTERS, STREAMING_PARTIAL, SUMMARY_EDITED, TOPIC_STARTS,
} from './data'
import { AiBlock, AiTag, AiTurn, AskBar, Composer, NoteList, ScrollToEnd, SignOffFlag, Thread, Turns, TypingBubble, UserTurn } from './parts'

const noop = () => {}

const TOPIC_ICON: Record<Topic, ComponentType> = {
  hiv_sti: ShieldCheck,
  prep_pep: Pill,
  contraception: CircleSlash,
  pregnancy: Baby,
  sexual_health: Heart,
  mental: Sparkles,
  substance: Wine,
  consent: HeartHandshake,
  gbv: Shield,
  general: MessageCircleQuestion,
}

function OfflineNotice() {
  const { direction } = useDirection()
  return <Banner status="warning" title={ASK_COPY[direction.id].offlineTitle} description={OFFLINE_BODY} icon={<Icon icon={WifiOff} />} />
}

/** Small icon + supporting text under a bubble ("Kept word for word", "Waiting to send"). */
function BubbleNote({ icon, children }: { icon: ComponentType; children: string }) {
  return (
    <HStack gap={1} vAlign="center" hAlign="end">
      <Icon icon={icon} size="xsm" color="secondary" />
      <Text type="supporting">{children}</Text>
    </HStack>
  )
}

/* ================================================================ Opener */

export interface AskOpenerProps {
  /** No connection: topics still show, sending waits. */
  offline?: boolean
}

/** "What's up?": the first thing Ask SAYO says, plus explicit topic starters. */
export function AskOpener({ offline = false }: AskOpenerProps) {
  const { locked, copy, direction } = useDirection()
  const voice = ASK_COPY[direction.id]
  return (
    <Screen header={<AskBar />} footer={<Composer disabled={offline} notice={offline ? <OfflineNotice /> : undefined} />}>
      <VStack gap={5} paddingInline={5} paddingBlock={3}>
        <VStack gap={3}>
          <HStack gap={2} vAlign="center">
            <LogoMark size={28} />
            <AiLabel label={copy.aiLabel} />
          </HStack>
          <Display size="xl">{locked.askOpener}</Display>
          <Text type="large" color="secondary">{voice.openerHint}</Text>
        </VStack>
        <VStack gap={3}>
          <Text type="label" color="secondary">Start with a topic</Text>
          <Grid columns={2} gap={2}>
            {TOPIC_STARTS.map((t) => {
              const card = (
                <ClickableCard label={t.label} onClick={noop} height="100%">
                  <HStack gap={2} vAlign="center" height="100%">
                    <Icon icon={TOPIC_ICON[t.topic]} size="sm" color="accent" />
                    <Text weight="semibold">{t.label}</Text>
                  </HStack>
                </ClickableCard>
              )
              return t.safety || t.topic === 'general'
                ? <GridSpan key={t.topic} columns="full">{card}</GridSpan>
                : <Fragment key={t.topic}>{card}</Fragment>
            })}
          </Grid>
        </VStack>
        <VStack gap={3}>
          <NoteList items={[{ icon: Lock, text: <Text type="supporting">Only you can see this. It’s locked with your PIN, and SAYO never shows it in the Circle.</Text> }]} />
          <EmergencyNote />
        </VStack>
      </VStack>
    </Screen>
  )
}

/* ============================================================= Free text */

export interface AskFreeTextProps {
  /** 'empty' = blank box with sentence starters · 'writing' = her long message typed · 'sent' = kept verbatim in the thread. */
  stage?: 'empty' | 'writing' | 'sent'
}

/** "In your own words…": long free text, kept word for word. */
export function AskFreeText({ stage = 'writing' }: AskFreeTextProps) {
  const sent = stage === 'sent'
  const { direction } = useDirection()
  const voice = ASK_COPY[direction.id]
  const msg = CONCERN_DISCHARGE.originalMessage
  return (
    <Screen header={<AskBar />} footer={<Composer value={stage === 'writing' ? msg : ''} disabled={sent} starters={stage === 'empty' ? STARTERS : undefined} />}>
      <Thread streaming={sent}>
        <Turns turns={CHAT_BEFORE_FREE_TEXT} />
        {!sent && <ChatSystemMessage icon={<Icon icon={Quote} size="xsm" />}>{voice.freeTextHint}</ChatSystemMessage>}
        {sent && (
          <>
            <UserTurn metadata={<BubbleNote icon={Quote}>Kept word for word</BubbleNote>}>{msg}</UserTurn>
            <TypingBubble />
          </>
        )}
      </Thread>
      <ScrollToEnd />
    </Screen>
  )
}

/* ============================================================== Follow-up */

/** Mid-conversation: a follow-up with quick replies (from INTAKE_CHAT). */
export function AskFollowUp() {
  return (
    <Screen header={<AskBar />} footer={<Composer />}>
      <Thread>
        <ChatSystemMessage variant="divider">Today, 2:14 pm</ChatSystemMessage>
        <Turns turns={CHAT_MID.slice(0, 5)} />
        <ChatSystemMessage icon={<Icon icon={Info} size="xsm" />}>A few quick questions. You can skip any of them.</ChatSystemMessage>
        <Turns turns={CHAT_MID.slice(5)} extraOptions={ALWAYS_REPLIES} />
      </Thread>
      <ScrollToEnd />
    </Screen>
  )
}

/* ========================================================== Chat states */

export type ChatState = 'typing' | 'streaming' | 'error' | 'offline'

/** Transient chat states: AI typing, AI streaming, send error, offline. */
export function AskChatState({ state }: { state: ChatState }) {
  const { copy } = useDirection()
  const answered = INTAKE_CHAT.slice(0, 8)
  const pending = 'A bit of burning'
  return (
    <Screen
      header={<AskBar />}
      footer={
        <Composer
          disabled={state === 'typing'}
          stop={state === 'streaming'}
          notice={
            state === 'error' ? <Banner status="error" title="Not sent" description={copy.errorGeneric} /> :
            state === 'offline' ? <OfflineNotice /> : undefined
          }
        />
      }
    >
      <Thread streaming={state === 'streaming'}>
        {state === 'typing' && (
          <>
            <Turns turns={answered} showLastOptions={false} />
            <TypingBubble />
          </>
        )}
        {state === 'streaming' && (
          <>
            <Turns turns={answered} showLastOptions={false} />
            <AiTurn>
              {STREAMING_PARTIAL}<span className="ask-caret" aria-hidden />
            </AiTurn>
          </>
        )}
        {(state === 'error' || state === 'offline') && (
          <>
            <Turns turns={INTAKE_CHAT.slice(0, 7)} showLastOptions={false} />
            <UserTurn
              metadata={
                state === 'error' ? (
                  <HStack gap={2} vAlign="center" hAlign="end">
                    <Text type="supporting">Not sent</Text>
                    <Button label="Try again" size="sm" variant="ghost" icon={<Icon icon={RotateCcw} />} />
                  </HStack>
                ) : (
                  <BubbleNote icon={Clock}>Waiting to send</BubbleNote>
                )
              }
            >
              {pending}
            </UserTurn>
          </>
        )}
      </Thread>
      <ScrollToEnd />
    </Screen>
  )
}

/* ============================================================== Red flag */

export interface AskRedFlagProps {
  /** Show the draft-wording marker (on for review, off for user testing). */
  signOff?: boolean
}

/** Red flag: possible HIV exposure < 72 h. Interrupts the questions. */
export function AskRedFlag({ signOff = true }: AskRedFlagProps) {
  const er = PEP_SERVICES.find((s) => s.hours.includes('24'))
  const rest = PEP_SERVICES.filter((s) => s !== er)
  return (
    <Screen header={<AskBar />}>
      <Thread>
        <Turns turns={CHAT_PEP} />
        <span id="red-flag" />
        <ChatSystemMessage icon={<Icon icon={Clock} size="xsm" />}>Questions paused</ChatSystemMessage>
        <AiBlock>
          <Banner
            role="alert"
            status="warning"
            icon={<Icon icon={Clock} />}
            title={PEP_RED_FLAG.title}
            collapsible={false}
          >
            <VStack gap={2}>
              {PEP_RED_FLAG.body.map((p) => <Text key={p} as="p">{p}</Text>)}
            </VStack>
          </Banner>
          <AiNote />
        </AiBlock>
      </Thread>
      <VStack gap={5} paddingInline={5} paddingBlockEnd={6}>
        <VStack gap={3}>
          <Heading level={3}>{PEP_RED_FLAG.whereTitle}</Heading>
          {er && <ServiceCard service={er} />}
          <Button label="Find PEP near me" variant="primary" width="100%" icon={<Icon icon={MapPin} />} />
          {rest.map((s) => <ServiceCard key={s.id} service={s} compact />)}
        </VStack>
        <Card>
          <VStack gap={3}>
            <VStack gap={1}>
              <HStack gap={2} vAlign="center">
                <Icon icon={BadgeCheck} color="success" />
                <Text weight="bold">Still want a professional review?</Text>
              </HStack>
              <Text type="supporting">{PEP_RED_FLAG.reviewNote}</Text>
            </VStack>
            <HStack gap={2} wrap="wrap">
              <Button label="Also send for review" size="sm" />
              <Button label="Continue questions" size="sm" variant="ghost" />
            </HStack>
          </VStack>
        </Card>
        <EmergencyNote />
        {signOff && <SignOffFlag who="clinical" />}
      </VStack>
      <ScrollToEnd anchor="#red-flag" />
    </Screen>
  )
}

/* ============================================================ Basic info */

/** Basic evidence-based information: obviously AI, never a diagnosis. */
export function AskBasicInfo() {
  const { direction } = useDirection()
  const voice = ASK_COPY[direction.id]
  return (
    <Screen
      header={<AskBar />}
      footer={
        <VStack gap={2}>
          <Button label="Check my summary" variant="primary" width="100%" endContent={<Icon icon={ArrowRight} />} />
          <Button label="I have another question" variant="ghost" width="100%" />
        </VStack>
      }
    >
      <Thread>
        <Turns turns={INTAKE_CHAT.slice(8)} showLastOptions={false} />
        <AiBlock>
          <Card>
            <VStack gap={3}>
              <HStack hAlign="between" vAlign="center" gap={2}>
                <Text weight="bold">Some general information</Text>
                <AiTag />
              </HStack>
              <VStack gap={2}>
                {AI_INFO_DISCHARGE.map((p) => <Text key={p} as="p">{p}</Text>)}
              </VStack>
            </VStack>
          </Card>
          <AiNote />
        </AiBlock>
        <AiTurn>{voice.basicInfoNext}</AiTurn>
      </Thread>
      <ScrollToEnd />
    </Screen>
  )
}

/* =============================================================== Summary */

export interface AskSummaryProps {
  /** The user is correcting the AI summary. */
  editing?: boolean
}

/** Summary check: concise AI summary, her original words always visible. */
export function AskSummary({ editing = false }: AskSummaryProps) {
  const { copy } = useDirection()
  const c = CONCERN_DISCHARGE
  return (
    <Screen
      header={<AskBar title="Check your summary" />}
      footer={
        editing ? (
          <HStack gap={2}>
            <Button label="Cancel" variant="ghost" width="35%" />
            <Button label="Save changes" variant="primary" width="65%" />
          </HStack>
        ) : (
          <VStack gap={2}>
            <Button label={copy.summaryConfirm} variant="primary" width="100%" icon={<Icon icon={Check} />} />
            <Button label="Edit summary" variant="secondary" width="100%" />
          </VStack>
        )
      }
    >
      <VStack gap={5} paddingInline={5} paddingBlock={3}>
        <Display size="sm">{copy.summaryIntro}</Display>

        {editing ? (
          <TextArea
            label="Summary"
            description="Change anything that isn’t right. Your original words below stay exactly as you wrote them."
            value={SUMMARY_EDITED}
            rows={8}
            width="100%"
          />
        ) : (
          <Card>
            <VStack gap={3}>
              <HStack hAlign="between" vAlign="center" gap={2}>
                <AiLabel label={copy.aiLabel} />
                <AiTag>AI summary</AiTag>
              </HStack>
              <Text as="p" type="large">
                {SUMMARY_PARTS.map((p, i) =>
                  typeof p === 'string' ? p : (
                    <span key={i} role="button" tabIndex={0} className={`ask-fact${p.check ? ' ask-fact--check' : ''}`} aria-label={`Change: ${p.fact}`}>
                      {p.fact}
                    </span>
                  ),
                )}
              </Text>
              <Text type="supporting">Tap any highlighted part to change it.</Text>
              {SUMMARY_PARTS.some((p) => typeof p !== 'string' && p.check) && (
                <Banner status="warning" title="Please check the part marked in amber" description="SAYO wasn’t sure about it." />
              )}
            </VStack>
          </Card>
        )}

        <VStack gap={3}>
          <VStack gap={1}>
            <HStack gap={2} vAlign="center">
              <Icon icon={Quote} size="sm" color="secondary" />
              <Heading level={3}>Your words</Heading>
            </HStack>
            <Text type="supporting">Always sent exactly as you wrote them.</Text>
          </VStack>
          <Blockquote>{c.originalMessage}</Blockquote>
        </VStack>

        {!editing && (
          <VStack gap={3}>
            <Heading level={3}>Your answers</Heading>
            {c.followUps.map((f) => (
              <VStack key={f.q} gap={0.5}>
                <Text type="supporting">{f.q}</Text>
                <Text>{f.a}</Text>
              </VStack>
            ))}
          </VStack>
        )}
      </VStack>
    </Screen>
  )
}

/* ========================================================== Review offer */

export interface AskReviewOfferProps {
  /** She chose "Not now". */
  declined?: boolean
}

/** Optional professional review. Yes and "Not now" are equally respected. */
export function AskReviewOffer({ declined = false }: AskReviewOfferProps) {
  const { locked, direction } = useDirection()
  const voice = ASK_COPY[direction.id]

  if (declined) {
    return (
      <Screen
        header={<AskBar />}
        footer={
          <VStack gap={2}>
            <Button label="Back to home" variant="primary" width="100%" />
            <Button label="Find Care near me" variant="secondary" width="100%" icon={<Icon icon={MapPin} />} />
          </VStack>
        }
      >
        <VStack gap={5} paddingInline={5} paddingBlock={6}>
          <VStack gap={3}>
            <Icon icon={Heart} size="lg" color="accent" />
            <Display size="md">{voice.notNowTitle}</Display>
            <Text type="large" color="secondary">{voice.notNowBody}</Text>
          </VStack>
          <Card variant="muted">
            <VStack gap={1}>
              <Text weight="bold">If you change your mind</Text>
              <Text type="supporting">You can ask for a professional review from this conversation at any time.</Text>
            </VStack>
          </Card>
          <EmergencyNote />
        </VStack>
      </Screen>
    )
  }

  return (
    <Screen
      header={<AskBar />}
      footer={
        <VStack gap={2}>
          <Button label="Yes, send for review" variant="primary" width="100%" icon={<Icon icon={BadgeCheck} />} />
          <Button label="Not now" variant="secondary" width="100%" />
        </VStack>
      }
    >
      <VStack gap={5} paddingInline={5} paddingBlock={3}>
        <VStack gap={3}>
          <Display size="md">{locked.reviewOffer}</Display>
          <Text color="secondary">It’s your choice. Saying no is fine, and you can still use everything else in SAYO.</Text>
          <Text weight="semibold">One verified professional will read this. Your Circle name is never shared.</Text>
        </VStack>

        <Card>
          <VStack gap={4}>
            <VStack gap={2}>
              <Text weight="bold">What the professional sees</Text>
              <NoteList items={REVIEW_SEES.map((s) => ({ key: s, icon: Check, color: 'success' as const, text: s }))} />
            </VStack>
            <VStack gap={2}>
              <Text weight="bold">What they don’t see</Text>
              <NoteList items={REVIEW_NOT_SEES.map((s) => ({ key: s, icon: X, text: s }))} />
            </VStack>
          </VStack>
        </Card>

        <NoteList
          items={[
            { icon: MessageCircle, text: 'This isn’t a live chat. A verified health professional reviews it when available and replies here.' },
            { icon: Lock, text: 'You’ll get a discreet notification that never names a health topic.' },
          ]}
        />
        <EmergencyNote />
      </VStack>
    </Screen>
  )
}

/* ============================================================ Sent to queue */

/** Sent to the professional queue: locked message, what happens next, discreet notification. */
export function AskSent() {
  const { locked, copy, direction } = useDirection()
  const voice = ASK_COPY[direction.id]
  return (
    <Screen
      header={<AskBar />}
      footer={
        <VStack gap={2}>
          <Button label="Back to home" variant="primary" width="100%" />
          <Button label="Find Care near me" variant="secondary" width="100%" icon={<Icon icon={MapPin} />} />
        </VStack>
      }
    >
      <VStack gap={5} paddingInline={5} paddingBlock={3}>
        <VStack gap={3}>
          <Icon icon={CircleCheck} size="lg" color="success" />
          <Display size="md">{voice.sentTitle}</Display>
          <Text type="large">{locked.queueMessage}</Text>
        </VStack>

        <VStack gap={3}>
          <Heading level={3}>What happens next</Heading>
          <ReviewTimeline status="queued" sentAt="Today, 2:20 pm" />
        </VStack>

        <VStack gap={3}>
          <Heading level={3}>Your notification will only say</Heading>
          <Card variant="muted">
            <HStack gap={3} vAlign="center">
              <LogoMark size={28} variant="mono" />
              <VStack gap={0}>
                <Text type="supporting" weight="semibold">SAYO · now</Text>
                <Text weight="semibold">{copy.notificationLock}</Text>
              </VStack>
            </HStack>
          </Card>
          <Text type="supporting">No health topic, ever. You open it with your PIN.</Text>
        </VStack>

        <NoteList
          items={[{ icon: Phone, color: 'error', text: <Text type="supporting">This is not for emergencies. If things get worse while you wait, don’t wait for a reply. {locked.emergency}</Text> }]}
        />
      </VStack>
    </Screen>
  )
}
