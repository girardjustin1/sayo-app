import { useState, type ReactNode } from 'react'
import { Ban, Check, ClipboardCheck, FileText, Globe2, HeartHandshake, MessageSquareOff, Pill, Route, Siren, Stethoscope, UserX } from 'lucide-react'
import { Layout, LayoutContent, LayoutFooter, LayoutHeader } from '@astryxdesign/core/Layout'
import { Heading } from '@astryxdesign/core/Heading'
import { Text } from '@astryxdesign/core/Text'
import { HStack } from '@astryxdesign/core/HStack'
import { VStack } from '@astryxdesign/core/VStack'
import { Grid } from '@astryxdesign/core/Grid'
import { Banner } from '@astryxdesign/core/Banner'
import { Button } from '@astryxdesign/core/Button'
import { CheckboxInput } from '@astryxdesign/core/CheckboxInput'
import { List, ListItem } from '@astryxdesign/core/List'
import { Divider } from '@astryxdesign/core/Divider'
import { LOCKED_COPY } from '../../brand/directions'
import { ProShell } from './ConsoleShell'
import { FOREIGN_ME, ME } from './data'

/** Shown wherever a foreign-licensed professional works: queue, case, scope. */
export function TrainingBanner({ jurisdiction }: { jurisdiction: string }) {
  return (
    <Banner
      status="warning"
      icon={<Globe2 size={18} />}
      title="Training mode: fictional and de-identified cases only"
      description={`Your licence is from ${jurisdiction}. Until SAYO's legal advice on cross-border review is final, professionals licensed outside Ghana help with fictional and de-identified cases, clinical-logic testing and product feedback. You cannot open real Ghana user cases.`}
      collapsible={false}
    />
  )
}

const IN_SCOPE: { icon: ReactNode; title: string; body: string }[] = [
  { icon: <ClipboardCheck size={16} />, title: 'Asynchronous written review', body: 'Read what the user sent and reply in your own time. She has been told a professional will look "when available".' },
  { icon: <FileText size={16} />, title: 'Short, clear guidance', body: 'Plain language, no jargon. What it could be in general terms and what to do next.' },
  { icon: <Stethoscope size={16} />, title: 'An in-person care decision', body: 'None, routine or urgent assessment. Every response needs one.' },
  { icon: <Route size={16} />, title: 'A type of service, where useful', body: 'SAYO matches the category to verified local services in Find Care.' },
]

const OUT_OF_SCOPE: { icon: ReactNode; title: string; body: string }[] = [
  { icon: <Siren size={16} />, title: 'Not emergency care', body: 'SAYO is not monitored in real time. Cases can wait hours.' },
  { icon: <Ban size={16} />, title: 'No diagnosis at a distance', body: 'You can explain possibilities. You cannot confirm a diagnosis from a written message.' },
  { icon: <Pill size={16} />, title: 'No prescribing', body: 'Name the kind of care she needs, not a medicine or dose to take.' },
  { icon: <MessageSquareOff size={16} />, title: 'No contact outside SAYO', body: 'No calls, chat, social media or meeting in person through SAYO.' },
  { icon: <UserX size={16} />, title: 'No identifying questions', body: 'Do not ask for her name, phone number, school, workplace or Circle username.' },
]

function ScopeList({ items, tone }: { items: typeof IN_SCOPE; tone: 'yes' | 'no' }) {
  return (
    <List density="compact" edge="flush">
      {items.map((i) => (
        <ListItem
          key={i.title}
          align="start"
          startContent={<VStack className="sayo-icon-tile" data-tone={tone}>{i.icon}</VStack>}
          label={<Text weight="semibold">{i.title}</Text>}
          description={<Text type="supporting">{i.body}</Text>}
        />
      ))}
    </List>
  )
}

export interface ScopeNoticeProps {
  /** Licence held outside Ghana: shows the training-mode banner. */
  foreignLicensed?: boolean
  /** First sign-in: must acknowledge before seeing the queue. */
  acknowledge?: boolean
}

/** The professional scope, written down once and linked from every case. */
export function ScopeNotice({ foreignLicensed = false, acknowledge = false }: ScopeNoticeProps) {
  const [agreed, setAgreed] = useState(false)
  const person = foreignLicensed ? FOREIGN_ME : ME
  return (
    <ProShell active="scope" person={{ name: person.name, role: `${person.profession} · ${person.jurisdiction}` }}>
      <Layout
        contentWidth={880}
        header={
          <LayoutHeader hasDivider>
            <VStack gap={0.5}>
              <Heading level={1}>Your scope as a SAYO reviewer</Heading>
              <Text type="supporting">Read this before your first case. It is linked from every case you open.</Text>
            </VStack>
          </LayoutHeader>
        }
        footer={
          acknowledge ? (
            <LayoutFooter hasDivider>
              <HStack hAlign="between" vAlign="center" gap={4}>
                <CheckboxInput
                  label="I have read my scope and will refer or release when in doubt."
                  value={agreed}
                  onChange={setAgreed}
                />
                <Button label={foreignLicensed ? 'Continue to training cases' : 'Continue to case queue'} variant="primary" isDisabled={!agreed} />
              </HStack>
            </LayoutFooter>
          ) : undefined
        }
        content={
          <LayoutContent>
            <VStack gap={5}>
              {foreignLicensed ? (
                <TrainingBanner jurisdiction={FOREIGN_ME.jurisdiction} />
              ) : (
                <Banner
                  status="success"
                  icon={<Check size={18} />}
                  title={`Ghana licence verified · ${ME.licence}`}
                  description="You can review real Ghana pilot cases in the topics you listed: Sexual health, HIV/PrEP/PEP, Contraception."
                  collapsible={false}
                />
              )}
              <Grid columns={2} gap={6}>
                <VStack gap={2}>
                  <Heading level={2}>What you do</Heading>
                  <ScopeList items={IN_SCOPE} tone="yes" />
                </VStack>
                <VStack gap={2}>
                  <Heading level={2}>What SAYO review is not</Heading>
                  <ScopeList items={OUT_OF_SCOPE} tone="no" />
                </VStack>
              </Grid>
              <Divider />
              <Grid columns={2} gap={6}>
                <HStack gap={3} vAlign="start">
                  <VStack className="sayo-icon-tile"><HeartHandshake size={16} /></VStack>
                  <VStack gap={1}>
                    <Heading level={3}>When in doubt, refer</Heading>
                    <Text type="supporting">
                      If you are unsure, choose an in-person assessment. If the case is outside your competence, release it with a reason so
                      another reviewer can take it. Releasing is a safe, expected action, not a failure.
                    </Text>
                  </VStack>
                </HStack>
                <HStack gap={3} vAlign="start">
                  <VStack className="sayo-icon-tile"><Siren size={16} /></VStack>
                  <VStack gap={1}>
                    <Heading level={3}>If it reads like an emergency</Heading>
                    <Text type="supporting">
                      Choose "{LOCKED_COPY.careDecisions.urgent}", say so plainly in your first sentence, and SAYO adds: "{LOCKED_COPY.emergency}"
                    </Text>
                  </VStack>
                </HStack>
              </Grid>
              <Text type="supporting" size="sm">
                Every case you accept and complete is logged with your name and the time, for accountability. Draft scope: to be confirmed by
                SAYO's clinical lead and legal advice before real cases.
              </Text>
            </VStack>
          </LayoutContent>
        }
      />
    </ProShell>
  )
}
