/**
 * GBV / sexual-violence safety flow. One calm voice in every brand direction:
 * no gradients, no display serif, no jokes, no emoji. Quick exit on every screen.
 *
 * Safety wording is fixed (scripted), not AI-generated. Clinical and legal content
 * is DRAFT and needs sign-off before real use (see SignOffFlag).
 */
import type { ComponentType, ReactNode } from 'react'
import {
  Bandage, ChevronRight, CircleSlash, FileText, HeartHandshake, MapPin, MessageCircle, Phone, Pill,
  Shield, ShieldCheck, Stethoscope, Users,
} from 'lucide-react'
import { VStack } from '@astryxdesign/core/VStack'
import { HStack } from '@astryxdesign/core/HStack'
import { Text } from '@astryxdesign/core/Text'
import { Heading } from '@astryxdesign/core/Heading'
import { Button } from '@astryxdesign/core/Button'
import { Card } from '@astryxdesign/core/Card'
import { ClickableCard } from '@astryxdesign/core/ClickableCard'
import { Icon } from '@astryxdesign/core/Icon'
import { Link } from '@astryxdesign/core/Link'
import { List, ListItem } from '@astryxdesign/core/List'
import { ChatMessage, ChatMessageBubble } from '@astryxdesign/core/Chat'
import { AppBar, Screen } from '../../../components/phone/chrome'
import { EmergencyNote, ServiceCard } from '../../../components/sayo'
import { useDirection } from '../../../brand/DirectionContext'
import { COUNSELLING, DISCLOSURE, ER_24H, GBV_SERVICES, SAFETY, SUPPORT_LINE } from '../03-ask/data'
import { ScrollToEnd, SignOffFlag, Thread, UserTurn } from '../03-ask/parts'
import '../../../styles/ask.css'

const noop = () => {}

/* ---------------------------------------------------------------- parts */

/** Back only: the top right belongs to Quick exit. */
function SafetyBar() {
  return <AppBar onBack={noop} />
}

/** `safety-calm` swaps the heading face for the body face in every direction (ask.css). */
function SafetyScreen({ children, footer }: { children: ReactNode; footer?: ReactNode }) {
  return (
    <Screen quickExit header={<SafetyBar />} footer={footer} className="safety-calm">
      {children}
    </Screen>
  )
}

/** Quiet label: who is speaking (in chat) or what this page is (above a heading). */
function SafetyLabel({ icon = Shield, children }: { icon?: ComponentType; children: string }) {
  return (
    <HStack gap={1} vAlign="center">
      <Icon icon={icon} size="xsm" color="secondary" />
      <Text type="supporting" weight="semibold">{children}</Text>
    </HStack>
  )
}

/** Scripted safety message in the chat. Labelled as SAYO's safety check, not AI. */
function SafetyTurn({ children }: { children: ReactNode }) {
  return (
    <ChatMessage sender="assistant" avatar={null} name={<SafetyLabel>{SAFETY.label}</SafetyLabel>}>
      <ChatMessageBubble>{children}</ChatMessageBubble>
    </ChatMessage>
  )
}

/** A full-width, one-tap choice with an optional line of detail and a chevron. */
function OptionCard({ label, hint, icon }: { label: string; hint?: string; icon?: ComponentType }) {
  return (
    <ClickableCard label={hint ? `${label}. ${hint}` : label} onClick={noop}>
      <HStack gap={3} vAlign="center">
        {icon && <Icon icon={icon} color="secondary" />}
        <VStack gap={0.5} width="100%">
          <Text weight="semibold">{label}</Text>
          {hint && <Text type="supporting">{hint}</Text>}
        </VStack>
        <Icon icon={ChevronRight} size="sm" color="secondary" />
      </HStack>
    </ClickableCard>
  )
}

/** One-tap answers in place of the keyboard (research: Lemonade, Lyft). */
function AnswerBars({ options }: { options: { id: string; label: string; hint?: string }[] }) {
  return (
    <VStack gap={2}>
      {options.map((o) => <OptionCard key={o.id} label={o.label} hint={o.hint} />)}
      <Text type="supporting" justify="center">{SAFETY.privacyLine}</Text>
    </VStack>
  )
}

function Steps({ done }: { done: number }) {
  return <Text type="supporting" weight="semibold">Question {done} of 2</Text>
}

/* ================================================================ Entry */

/** Someone discloses in Ask SAYO. Believe, no judgement, she stays in control. */
export function SafetyEntry() {
  const e = SAFETY.entry
  return (
    <SafetyScreen
      footer={
        <VStack gap={2}>
          <Button label="Okay" variant="primary" width="100%" />
          <Button label="Just show me support services" variant="ghost" width="100%" />
        </VStack>
      }
    >
      <Thread>
        <UserTurn>{DISCLOSURE}</UserTurn>
        <SafetyTurn>
          <VStack gap={2}>
            <Text weight="bold">{e.title}</Text>
            {e.body.map((b) => <Text key={b} as="p">{b}</Text>)}
          </VStack>
        </SafetyTurn>
        <SafetyTurn>{e.quickExitHint}</SafetyTurn>
        <SafetyTurn>{e.next}</SafetyTurn>
      </Thread>
      <ScrollToEnd />
    </SafetyScreen>
  )
}

/* ======================================================== Danger check */

/** Question 1 of 2. Locked wording. One tap: Yes / No / Not sure. */
export function SafetyDangerCheck() {
  const { locked } = useDirection()
  return (
    <SafetyScreen footer={<AnswerBars options={SAFETY.danger.options} />}>
      <Thread>
        <SafetyTurn>{SAFETY.entry.next}</SafetyTurn>
        <SafetyTurn>
          <VStack gap={1}>
            <Steps done={1} />
            <Text weight="bold" type="large">{locked.dangerQuestion}</Text>
          </VStack>
        </SafetyTurn>
      </Thread>
      <ScrollToEnd />
    </SafetyScreen>
  )
}

/* ======================================================== Device check */

export interface SafetyDeviceCheckProps {
  /** She answered that this device is not safe. */
  notSafe?: boolean
}

/** Question 2 of 2. Locked wording. */
export function SafetyDeviceCheck({ notSafe = false }: SafetyDeviceCheckProps) {
  const { locked } = useDirection()
  const d = SAFETY.device
  return (
    <SafetyScreen
      footer={
        notSafe ? (
          <VStack gap={2}>
            <Button label="Show me support services" variant="primary" width="100%" />
            <Button label="Continue carefully" variant="ghost" width="100%" />
          </VStack>
        ) : (
          <AnswerBars options={d.options} />
        )
      }
    >
      <Thread>
        <SafetyTurn>{locked.dangerQuestion}</SafetyTurn>
        <UserTurn>No</UserTurn>
        <SafetyTurn>
          <VStack gap={1}>
            <Steps done={2} />
            <Text weight="bold" type="large">{locked.deviceQuestion}</Text>
            <Text type="supporting">{d.help}</Text>
          </VStack>
        </SafetyTurn>
        {notSafe && (
          <>
            <UserTurn>No, it’s not safe</UserTurn>
            <SafetyTurn>
              <VStack gap={2}>
                <Text weight="bold">{d.notSafeTitle}</Text>
                {d.notSafeTips.map((t) => <Text key={t} as="p">{t}</Text>)}
              </VStack>
            </SafetyTurn>
          </>
        )}
      </Thread>
      <ScrollToEnd />
    </SafetyScreen>
  )
}

/* ========================================================= Danger now */

/** "Yes" or "Not sure" to danger: emergency first, short, no questionnaire. */
export function SafetyDangerNow() {
  const { locked } = useDirection()
  const n = SAFETY.danger_now
  return (
    <SafetyScreen>
      <VStack gap={5} paddingInline={5} paddingBlockStart={5} paddingBlockEnd={6}>
        <VStack gap={3}>
          <SafetyLabel>Help now</SafetyLabel>
          <Heading level={1}>{n.title}</Heading>
          <Text type="large">{locked.emergency}</Text>
        </VStack>

        <VStack gap={2}>
          <Button label="Call 112 · Emergency services" variant="primary" size="lg" width="100%" href="tel:112" icon={<Icon icon={Phone} />} />
          <ClickableCard label={`Call ${SUPPORT_LINE.name}`} href={`tel:${SUPPORT_LINE.phone.replace(/\s/g, '')}`}>
            <HStack gap={3} vAlign="center">
              <Icon icon={HeartHandshake} color="accent" />
              <VStack gap={0.5} width="100%">
                <Text weight="semibold">Call {SUPPORT_LINE.name}</Text>
                <Text type="supporting">{SUPPORT_LINE.hours} · {SUPPORT_LINE.phone}</Text>
              </VStack>
              <Icon icon={ChevronRight} size="sm" color="secondary" />
            </HStack>
          </ClickableCard>
        </VStack>

        <VStack gap={3}>
          <Heading level={3}>Can’t make a call safely?</Heading>
          <Text>{n.goTo}</Text>
          <ServiceCard service={ER_24H} compact />
        </VStack>

        <Text type="supporting">{n.after}</Text>
        <SignOffFlag who="clinical & legal (Ghana numbers)" />
      </VStack>
    </SafetyScreen>
  )
}

/* ======================================================= Recent assault */

const CARE_ICON: Record<string, ComponentType> = {
  pep: Pill,
  ec: CircleSlash,
  sti: ShieldCheck,
  injury: Bandage,
  forensic: FileText,
}

export interface SafetyRecentCareProps {
  /** Show the draft-wording marker (on for review, off for user testing). */
  signOff?: boolean
}

/** Safe now, recent assault: what may be time-sensitive, plainly listed. */
export function SafetyRecentCare({ signOff = true }: SafetyRecentCareProps) {
  const r = SAFETY.recent
  return (
    <SafetyScreen>
      <VStack gap={5} paddingInline={5} paddingBlockStart={5} paddingBlockEnd={6}>
        <VStack gap={3}>
          <SafetyLabel icon={Stethoscope}>Care after sexual violence</SafetyLabel>
          <Heading level={1}>{r.title}</Heading>
          <Text>{r.intro}</Text>
        </VStack>

        <Card>
          <List hasDividers edge="flush">
            {r.items.map((i) => (
              <ListItem
                key={i.key}
                align="first-line"
                startContent={<Icon icon={CARE_ICON[i.key]} color="secondary" />}
                label={<Text weight="bold">{i.title}</Text>}
                description={<Text type="supporting">{i.body}</Text>}
              />
            ))}
          </List>
        </Card>

        <VStack gap={3}>
          <Heading level={3}>Where you can go</Heading>
          {GBV_SERVICES.map((s) => <ServiceCard key={s.id} service={s} compact />)}
        </VStack>

        <VStack gap={2}>
          <Button label="Find GBV & sexual assault support" variant="primary" width="100%" icon={<Icon icon={MapPin} />} />
          <Button label="Ask a verified professional" variant="secondary" width="100%" icon={<Icon icon={MessageCircle} />} />
          <Text type="supporting" justify="center">A professional review is not urgent care. Please don’t wait for it.</Text>
        </VStack>
        <EmergencyNote />
        {signOff && <SignOffFlag />}
      </VStack>
    </SafetyScreen>
  )
}

/* ================================================== Historical disclosure */

const HIST_ICON: Record<string, ComponentType> = {
  talk: HeartHandshake,
  review: MessageCircle,
  health: Stethoscope,
  circle: Users,
}

/** It happened a while ago and she is safe now. Gentle; options, not instructions. */
export function SafetyHistorical() {
  const h = SAFETY.historical
  return (
    <SafetyScreen>
      <VStack gap={5} paddingInline={5} paddingBlockStart={5} paddingBlockEnd={6}>
        <VStack gap={3}>
          <SafetyLabel>{SAFETY.label}</SafetyLabel>
          <Heading level={1}>{h.title}</Heading>
          <Text type="large" color="secondary">{h.body}</Text>
        </VStack>

        <VStack gap={3}>
          <Heading level={3}>If and when you want</Heading>
          <VStack gap={2}>
            {h.options.map((o) => <OptionCard key={o.key} label={o.title} hint={o.body} icon={HIST_ICON[o.key]} />)}
          </VStack>
        </VStack>

        <VStack gap={3}>
          <Heading level={3}>Support services</Heading>
          <ServiceCard service={SUPPORT_LINE} compact />
          <ServiceCard service={COUNSELLING} compact />
        </VStack>

        <Text justify="center"><Link href="#danger-now" weight="semibold">{h.changed}</Link></Text>
        <SignOffFlag who="clinical" />
      </VStack>
    </SafetyScreen>
  )
}

/* =================================================== Quick exit landing */

/**
 * Where Quick exit lands: a neutral weather page in the browser. No SAYO name,
 * colour, logo or font (so it deliberately does not use Astryx or the brand theme).
 * Real app: clears the screen and back stack, opens this, and asks for the PIN on return.
 */
export function QuickExitLanding() {
  const hours = [['Now', '31°'], ['3 pm', '31°'], ['4 pm', '30°'], ['5 pm', '29°'], ['6 pm', '28°']]
  const days = [['Today', '32° / 25°'], ['Wed', '31° / 25°'], ['Thu', '30° / 24°'], ['Fri', '31° / 25°']]
  const news = [
    ['Light showers possible along the coast this weekend', 'Weather · 1 h ago'],
    ['Five easy dinners for busy weeknights', 'Food · 3 h ago'],
    ['Local league final moves to Saturday', 'Sport · 5 h ago'],
  ]
  return (
    <div className="qx-page">
      <div className="qx-status" aria-hidden><span>9:41</span><span /></div>
      <div className="qx-urlbar">weather.example.com</div>
      <div className="qx-body">
        <div className="qx-hero">
          <div className="qx-city">Accra</div>
          <div className="qx-temp">31°</div>
          <div className="qx-cond">Partly cloudy · H 32° L 25°</div>
          <div className="qx-row">
            {hours.map(([t, v]) => <div key={t}><span>{t}</span><b>{v}</b></div>)}
          </div>
        </div>
        <div className="qx-card">
          <h3>This week</h3>
          {days.map(([d, v]) => <div key={d} className="qx-day"><span>{d}</span><span>{v}</span></div>)}
        </div>
        <div className="qx-card">
          <h3>Top stories</h3>
          {news.map(([t, m]) => <div key={t} className="qx-news">{t}<small>{m}</small></div>)}
        </div>
      </div>
    </div>
  )
}
