import type { ComponentType, SVGProps } from 'react'
import {
  ArrowRight, BadgeCheck, BellOff, CirclePlus, CloudSun, Heart, KeyRound, LifeBuoy, Lock, MapPin,
  MessageCircleHeart, Pill, ShieldAlert, ShieldCheck, ShieldPlus, UsersRound,
} from 'lucide-react'
import { VStack } from '@astryxdesign/core/VStack'
import { HStack } from '@astryxdesign/core/HStack'
import { Text } from '@astryxdesign/core/Text'
import { Heading } from '@astryxdesign/core/Heading'
import { Button } from '@astryxdesign/core/Button'
import { Card } from '@astryxdesign/core/Card'
import { ClickableCard } from '@astryxdesign/core/ClickableCard'
import { Avatar } from '@astryxdesign/core/Avatar'
import { Badge } from '@astryxdesign/core/Badge'
import { Icon } from '@astryxdesign/core/Icon'
import { useDirection } from '../../../DirectionContext'
import { Logo } from '../../../Logo'
import { Display, ProBadge } from '../../../../components/sayo'
import { MiniPhone } from '../../../../docs/kit'
import { PROFESSIONALS } from '../../../../data/fixtures'
import { AskSummary } from '../../../../screens/user/03-ask/AskScreens'
import { ReviewResponse } from '../../../../screens/user/05-reviews/ReviewResponse'
import { R2Img, type R2Direction, type R2Slot } from '../imagery'
import { LANDING_COPY, LANDING_FIXED as FIXED } from './copy'
import '../../../../styles/landing.css'

type LucideIcon = ComponentType<SVGProps<SVGSVGElement>>

/**
 * How each direction lays out the same sections. Colour, type and radius come from the
 * direction's theme; this only switches structure (CSS keys off `data-direction` too).
 *  - overlay: Hers bento, text on the photo over a forest scrim
 *  - stacked: AskTia cards, photo above text
 *  - index:   editorial rows with a number and a small plate
 *  - plain:   no imagery at all
 */
const TILES: Record<R2Direction, 'overlay' | 'stacked' | 'index' | 'plain'> = { grove: 'overlay', clay: 'stacked', ink: 'index', quiet: 'plain' }

const TRUST_ICONS: LucideIcon[] = [Lock, BadgeCheck, MapPin]
const START_ICONS: LucideIcon[] = [ShieldPlus, Pill, Heart, CloudSun, LifeBuoy, CirclePlus]

/** Headline in the brand display face. `*phrase*` marks the emphasis; plain strings fall back to `direction.emphasize`. */
function Headline({ children, as = 'h2', size = 'xl' }: { children: string; as?: 'h1' | 'h2'; size?: 'xl' | 'lg' }) {
  const [before, phrase, after] = children.split('*')
  return <Display as={as} size={size}>{phrase === undefined ? children : <>{before}<em>{phrase}</em>{after}</>}</Display>
}

function SectionHead({ kicker, title, intro, inherit = false }: { kicker?: string; title: string; intro?: string; inherit?: boolean }) {
  return (
    <VStack gap={3} className="ld-head">
      {kicker && <Text type="label" color="secondary" className="ld-kicker">{kicker}</Text>}
      <Headline>{title}</Headline>
      {intro && <Text type="large" color={inherit ? 'inherit' : 'secondary'} textWrap="pretty">{intro}</Text>}
    </VStack>
  )
}

/** The marketing landing page for one round-2 direction. Wrap it in a `DirectionProvider`. */
export function Landing() {
  const { direction, copy, locked } = useDirection()
  const id: R2Direction = direction.id in LANDING_COPY ? (direction.id as R2Direction) : 'clay'
  const c = LANDING_COPY[id]
  const dark = direction.hero.dark
  const tiles = TILES[id]
  /** Grove's forest panels: marks them dark so primary buttons turn lime there (rule in sayo.css). */
  const surface = dark ? { 'data-surface': 'dark' } : {}

  const pillars: { key: string; slot: R2Slot; icon: LucideIcon; title: string; line: string; not: string; source: string }[] = [
    { key: 'ask', slot: 'tile-ask', icon: MessageCircleHeart, title: FIXED.pillars.ask, line: copy.onboarding[0].body, not: locked.notDiagnosis, source: FIXED.sourceAi(copy.aiLabel) },
    { key: 'review', slot: 'tile-review', icon: BadgeCheck, title: FIXED.pillars.review, line: copy.onboarding[1].body, not: c.reviewNot, source: FIXED.sourcePro },
    { key: 'care', slot: 'tile-care', icon: MapPin, title: FIXED.pillars.care, line: copy.findCareIntro, not: c.careNot, source: FIXED.sourceCare },
    { key: 'circle', slot: 'tile-circle', icon: UsersRound, title: FIXED.pillars.circle, line: copy.circleIntro, not: c.circleNot, source: FIXED.sourcePeers },
  ]
  const topics: { slot: R2Slot; title: string; body: string }[] = [
    { slot: 'topic-prep', title: FIXED.topics.prep, body: c.topics.prep },
    { slot: 'topic-contraception', title: FIXED.topics.contraception, body: c.topics.contraception },
    { slot: 'topic-mood', title: FIXED.topics.mood, body: c.topics.mood },
  ]
  /** What SAYO says at steps 1 and 3. Locked wording. */
  const stepQuotes: (string | undefined)[] = [locked.askOpener, undefined, locked.reviewOffer, undefined]
  const privacy: { icon: LucideIcon; title: string; body: string }[] = [
    { icon: KeyRound, title: FIXED.privacy.pin, body: copy.pinBody },
    { icon: UsersRound, title: FIXED.privacy.circle, body: c.privacyCircle },
    { icon: BellOff, title: FIXED.privacy.notifications, body: FIXED.privacy.notificationsBody(copy.notificationLock) },
    { icon: ShieldAlert, title: FIXED.privacy.emergency, body: locked.emergency },
  ]
  const pros = PROFESSIONALS.filter((p) => p.status === 'approved').slice(0, 3)

  return (
    <div className="ld" data-tiles={tiles}>
      <div className="ld-page">
        {/* 1 + 2. Top bar and hero. In Grove both sit on one forest panel so the logo glows. */}
        <div className={`ld-top${dark ? ' sayo-hero' : ''}`} {...surface}>
          <header className="ld-bar">
            <HStack gap={8} vAlign="center">
              <Logo height={30} variant={dark ? direction.hero.logo : 'color'} />
              <nav className="ld-nav" aria-label="Sections">
                {FIXED.nav.map((n) => (
                  <a key={n.href} href={n.href} className="ld-nav__link"><Text weight="medium" color="inherit">{n.label}</Text></a>
                ))}
              </nav>
            </HStack>
            <Button label={FIXED.navCta} variant="primary" />
          </header>

          <section className="ld-hero" aria-labelledby="ld-hero-title">
            <VStack gap={6} className="ld-hero__copy">
              <VStack gap={4} className="ld-hero__text">
                <Text type="label" color="inherit" className="ld-kicker">{FIXED.kicker}</Text>
                <div id="ld-hero-title" className="ld-hero__title"><Headline as="h1">{copy.tagline}</Headline></div>
                <Text type="large" size="xl" color="inherit" textWrap="pretty" className="ld-hero__line">{copy.splashLine}</Text>
              </VStack>
              <HStack gap={3} wrap="wrap" className="ld-hero__cta">
                <Button label={copy.ctaPrimary} variant="primary" size="lg" />
                <Button label={FIXED.secondaryCta} variant="secondary" size="lg" href="#how" className={dark ? 'sayo-btn-on-gradient-ghost' : undefined} />
              </HStack>
              <ul className="ld-trust">
                {FIXED.trust.map((t, i) => (
                  <li key={t}>
                    <Icon icon={TRUST_ICONS[i]} size="sm" className="ld-trust__icon" />
                    <Text weight="semibold" color="inherit">{t}</Text>
                  </li>
                ))}
              </ul>
            </VStack>
            <div className="ld-hero__media">
              <R2Img direction={id} slot="hero" height="100%" />
            </div>
          </section>
        </div>

        {/* 3. The four pillars, each with what it is not. */}
        <section className="ld-band ld-pillars" id="pillars">
          <div className="ld-wrap">
            <SectionHead title={c.pillarsTitle} intro={c.pillarsIntro} />
            <div className="ld-tiles">
              {pillars.map((p, i) => (
                <ClickableCard key={p.key} label={p.title} padding={0} onClick={() => {}} className={`ld-tile ld-tile--${p.key}`}>
                  {tiles === 'index' && <span className="ld-tile__num"><Display as="p" size="md">{`0${i + 1}`}</Display></span>}
                  {tiles !== 'plain' && (
                    <div className="ld-tile__media">
                      <R2Img direction={id} slot={p.slot} height="100%" />
                    </div>
                  )}
                  <VStack gap={2} className="ld-tile__body">
                    <Text type="supporting" weight="semibold" color={tiles === 'overlay' ? 'inherit' : 'secondary'} className="ld-tile__source">{p.source}</Text>
                    <HStack gap={2} vAlign="center" className="ld-tile__title">
                      {tiles === 'plain' && <Icon icon={p.icon} color="accent" />}
                      {tiles === 'index' ? <Display as="h3" size="md">{p.title}</Display> : <Heading level={3} color="inherit">{p.title}</Heading>}
                    </HStack>
                    <Text color="inherit" textWrap="pretty" className="ld-tile__line">{p.line}</Text>
                    <Text type="supporting" color={tiles === 'overlay' ? 'inherit' : 'secondary'} textWrap="pretty" className="ld-tile__not">{p.not}</Text>
                  </VStack>
                  <span className="ld-tile__arrow"><Icon icon={ArrowRight} size="sm" /></span>
                </ClickableCard>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Guided entry: one question, six explicit topics. */}
        <section className="ld-band ld-start" id="start">
          <div className="ld-wrap">
            <div className="ld-start__panel">
              <VStack gap={4} className="ld-start__copy">
                <Text type="label" color="secondary" className="ld-kicker">{c.startKicker}</Text>
                <Headline>{copy.homePrompt}</Headline>
                <Text type="large" color="secondary" textWrap="pretty">{c.startBody}</Text>
                <HStack gap={2} vAlign="start" className="ld-start__safety">
                  <Icon icon={ShieldCheck} size="sm" color="secondary" />
                  <Text type="supporting" textWrap="pretty">{FIXED.startSafety(locked.quickExit)}</Text>
                </HStack>
              </VStack>
              <div className="ld-rows">
                {FIXED.startOptions.map((label, i) => (
                  <ClickableCard key={label} label={label} onClick={() => {}} className="ld-row">
                    <HStack gap={3} vAlign="center">
                      <Icon icon={START_ICONS[i]} color="accent" />
                      <Text weight="semibold" style={{ flex: 1 }}>{label}</Text>
                      <Icon icon={ArrowRight} size="sm" color="secondary" />
                    </HStack>
                  </ClickableCard>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. How it works, beside the real screens. */}
        <section className="ld-band ld-how" id="how">
          <div className="ld-wrap ld-how__grid">
            <VStack gap={8}>
              <SectionHead title={c.howTitle} intro={c.howIntro} />
              <ol className="ld-steps">
                {c.steps.map((s, i) => (
                  <li key={s.title} className="ld-step">
                    <span className="ld-step__num" aria-hidden><Display as="p" size="sm">{`0${i + 1}`}</Display></span>
                    <VStack gap={1}>
                      <HStack gap={2} vAlign="center" wrap="wrap">
                        <Heading level={3}>{s.title}</Heading>
                        <Badge label={FIXED.stepWhen[i]} />
                      </HStack>
                      <Text color="secondary" textWrap="pretty">{s.body}</Text>
                      {stepQuotes[i] && <Text type="supporting" weight="semibold" color="primary">SAYO asks: “{stepQuotes[i]}”</Text>}
                    </VStack>
                  </li>
                ))}
              </ol>
            </VStack>
            {/* Not a .sayo-hero: the hero text and button rules must not leak into the live screens. */}
            <div className="ld-stage">
              <div className="ld-stage__phone"><MiniPhone scale={0.62}><AskSummary /></MiniPhone></div>
              <div className="ld-stage__phone ld-stage__phone--second"><MiniPhone scale={0.62}><ReviewResponse /></MiniPhone></div>
            </div>
          </div>
        </section>

        {/* 6. Learn. */}
        <section className="ld-band ld-learn" id="learn">
          <div className="ld-wrap">
            <SectionHead title={c.learnTitle} intro={c.learnIntro} />
            <div className="ld-topics">
              {topics.map((t) => (
                <ClickableCard key={t.slot} label={t.title} padding={0} onClick={() => {}} className="ld-topic">
                  <div className="ld-topic__media"><R2Img direction={id} slot={t.slot} height="100%" /></div>
                  <VStack gap={2} className="ld-topic__body">
                    <Heading level={3}>{t.title}</Heading>
                    <Text color="secondary" textWrap="pretty">{t.body}</Text>
                    <HStack gap={1} vAlign="center" className="ld-topic__more">
                      <Text weight="semibold">{FIXED.read}</Text>
                      <Icon icon={ArrowRight} size="sm" />
                    </HStack>
                  </VStack>
                </ClickableCard>
              ))}
            </div>
            <Text type="supporting" className="ld-note">{locked.notDiagnosis}</Text>
          </div>
        </section>

        {/* 7. Verified professionals. Initials only, never photos. */}
        <section className="ld-band ld-pros" id="professionals">
          <div className="ld-wrap ld-pros__grid">
            <VStack gap={4}>
              <SectionHead title={c.prosTitle} intro={c.prosBody} />
              <Text type="supporting" className="ld-note">{FIXED.prosSample}</Text>
            </VStack>
            <Card padding={0}>
              <ul className="ld-pros__list">
                {pros.map((p) => (
                  <li key={p.id} className="ld-pro">
                    <HStack gap={4} vAlign="center">
                      <Avatar name={p.name.replace(/^(Dr\.|Nurse)\s+/, '')} size="lg" tooltip={false} />
                      <VStack gap={1} style={{ flex: 1, minWidth: 0 }}>
                        <HStack gap={2} vAlign="center" wrap="wrap">
                          <Text weight="bold" size="lg">{p.name}</Text>
                          <ProBadge />
                        </HStack>
                        <Text>{p.profession} · {FIXED.licensedIn(p.jurisdiction)}</Text>
                        <Text type="supporting">{p.expertise.join(' · ')} · {p.canReviewRealCases ? FIXED.prosScope.cases : FIXED.prosScope.info}</Text>
                      </VStack>
                    </HStack>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </section>

        {/* 8. Privacy band. Emergency wording is locked. */}
        <section className="ld-band ld-privacy" id="privacy">
          <div className="ld-wrap">
            <SectionHead title={c.privacyTitle} intro={FIXED.privacy.intro} inherit />
            <ul className="ld-privacy__grid">
              {privacy.map((item) => (
                <li key={item.title} className="ld-privacy__item">
                  <span className="ld-privacy__icon"><Icon icon={item.icon} /></span>
                  <Heading level={3} color="inherit">{item.title}</Heading>
                  <Text color="inherit" textWrap="pretty">{item.body}</Text>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 9. Closing call to action on the wide image, then the footer. */}
        <section className={`ld-close${dark ? ' sayo-hero' : ''}`} {...surface} aria-labelledby="ld-close-title">
          <div className="ld-close__media"><R2Img direction={id} slot="wide" height="100%" /></div>
          <div className="ld-close__inner">
            <VStack gap={5} hAlign="start" className="ld-close__panel">
              <div id="ld-close-title"><Headline>{c.closeTitle}</Headline></div>
              <Text type="large" color="inherit" textWrap="pretty">{copy.ageGateBody}</Text>
              <Button label={copy.ctaPrimary} variant="primary" size="lg" />
            </VStack>
          </div>
        </section>

        <footer className="ld-foot">
          <div className="ld-wrap">
            <div className="ld-foot__row">
              <Logo height={24} />
              <nav className="ld-nav ld-nav--foot" aria-label="Footer">
                {FIXED.nav.map((n) => (
                  <a key={n.href} href={n.href} className="ld-nav__link"><Text type="supporting" color="inherit">{n.label}</Text></a>
                ))}
              </nav>
            </div>
            <VStack gap={1} className="ld-foot__legal">
              <Text weight="semibold">{FIXED.footer}</Text>
              <Text type="supporting">{FIXED.footerFiction} {copy.ageGateBody}</Text>
            </VStack>
          </div>
        </footer>
      </div>
    </div>
  )
}
