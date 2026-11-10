import { Button } from '@astryxdesign/core/Button'
import { Badge } from '@astryxdesign/core/Badge'
import { VStack } from '@astryxdesign/core/VStack'
import { HStack } from '@astryxdesign/core/HStack'
import { Text } from '@astryxdesign/core/Text'
import { DirectionProvider } from '../DirectionContext'
import type { ReactNode } from 'react'
import { DIRECTIONS, LOCKED_COPY, type Direction, type DirectionId } from '../directions'
import { Logo, LogoMark } from '../Logo'
import { AiNote, Display, ProBadge } from '../../components/sayo'
import { Home } from '../../screens/user/02-home/Home'
import { Bullets, DocPage, DocSection, DocTitle, Grid, Label, MiniPhone, Panel, docMuted } from '../../docs/kit'


function Swatches({ d }: { d: Direction }) {
  return (
    <Grid cols={3} gap={8}>
      {d.palette.map((s) => (
        <div key={s.name}>
          <div style={{ height: 44, borderRadius: 10, background: s.hex, border: '1px solid rgb(0 0 0 / 0.06)' }} />
          <div style={{ fontSize: 12, fontWeight: 700, marginTop: 4 }}>{s.name}</div>
          <div style={{ fontSize: 11, color: docMuted }}>{s.hex.startsWith('#') ? s.hex : 'gradient'}</div>
        </div>
      ))}
    </Grid>
  )
}

/** A strip of real Astryx components rendered under the direction's theme. */
function UiSample({ d }: { d: Direction }) {
  return (
    <DirectionProvider id={d.id}>
      <div style={{ background: 'var(--color-background-body)', padding: 16, borderRadius: 14 }}>
        <VStack gap={3}>
          <Display size="md">{LOCKED_COPY.askOpener}</Display>
          <div className="sayo-card" style={{ padding: 12 }}>
            <VStack gap={2}>
              <Text type="supporting">{d.copy.aiLabel}</Text>
              <Text>{LOCKED_COPY.askFollowUp}</Text>
              <AiNote />
            </VStack>
          </div>
          <HStack gap={2} wrap="wrap" vAlign="center">
            <Button label={d.copy.ctaPrimary} variant="primary" />
            <Button label="Not now" variant="secondary" />
          </HStack>
          <HStack gap={2} wrap="wrap" vAlign="center">
            <ProBadge />
            <Badge label="Waiting for a professional" variant="warning" />
          </HStack>
        </VStack>
      </div>
    </DirectionProvider>
  )
}

const HEADER_BG: Record<DirectionId, string> = {
  sister: 'linear-gradient(180deg,#FFE6DA,#FFF7F3)',
  clear: 'linear-gradient(180deg,#F1EAF8,#FAF8FC)',
  unmuted: 'linear-gradient(135deg,#D4009E,#F0346A 55%,#FF5A48)',
  ink: 'linear-gradient(180deg,#EEF1F6,#FAF8F5)',
  clay: 'linear-gradient(180deg,#EFE3D3,#FCF6EE)',
  quiet: 'linear-gradient(180deg,#EFEDE8,#F6F5F2)',
  grove: 'radial-gradient(130% 90% at 85% -10%, #86A65C 0%, #4A5F38 38%, #2B3524 78%)',
}
const DISPLAY_FONT: Record<DirectionId, string> = {
  sister: "'Plus Jakarta Sans Variable'",
  clear: "'DM Sans Variable'",
  unmuted: "'Fraunces Variable', serif",
  ink: "'Newsreader Variable', serif",
  clay: "'Newsreader Variable', serif",
  quiet: "'Manrope Variable'",
  grove: "'Hanken Grotesk Variable'",
}
const DISPLAY_WEIGHT: Record<DirectionId, number> = { sister: 800, clear: 650, unmuted: 650, ink: 400, clay: 400, quiet: 650, grove: 500 }
const BODY_FONT: Record<DirectionId, string> = {
  sister: "'Plus Jakarta Sans Variable'",
  clear: "'DM Sans Variable'",
  unmuted: "'DM Sans Variable'",
  ink: "'Manrope Variable'",
  clay: "'DM Sans Variable'",
  quiet: "'Manrope Variable'",
  grove: "'Hanken Grotesk Variable'",
}

function Column({ d }: { d: Direction }) {
  const hero = d.hero.dark
  return (
    <VStack gap={4}>
      <Panel pad={0} style={{ overflow: 'hidden' }}>
        <div style={{ padding: 24, background: HEADER_BG[d.id], color: hero ? '#fff' : undefined }}>
          <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.12em', opacity: 0.8 }}>DIRECTION {d.letter}</div>
          <div style={{ fontSize: 32, letterSpacing: '-0.02em', margin: '4px 0 14px', fontFamily: DISPLAY_FONT[d.id], fontWeight: DISPLAY_WEIGHT[d.id] }}>{d.name}</div>
          <Logo height={34} variant={d.hero.logo} />
          <div style={{ fontSize: 21, fontWeight: DISPLAY_WEIGHT[d.id] === 400 ? 400 : 700, marginTop: 18, fontFamily: DISPLAY_FONT[d.id] }}>“{d.copy.tagline}”</div>
        </div>
        <div style={{ padding: 20 }}>
          <div style={{ fontSize: 14, lineHeight: 1.5 }}>{d.oneLiner}</div>
          <div style={{ fontSize: 13, color: docMuted, marginTop: 8, fontStyle: 'italic' }}>{d.persona}</div>
          <HStack gap={1} wrap="wrap" style={{ marginTop: 12 }}>
            {d.traits.map((t) => <span key={t} style={{ fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999, background: '#F2EEF5' }}>{t}</span>)}
          </HStack>
        </div>
      </Panel>
      <Panel>
        <Label>Palette</Label>
        <Swatches d={d} />
      </Panel>
      <Panel>
        <Label>Type</Label>
        <div style={{ fontFamily: DISPLAY_FONT[d.id], fontSize: 32, fontWeight: DISPLAY_WEIGHT[d.id], letterSpacing: '-0.02em', lineHeight: 1.1 }}>
          PrEP is <em>prevention</em>.
        </div>
        <div style={{ fontFamily: BODY_FONT[d.id], fontSize: 15, lineHeight: 1.5, marginTop: 8 }}>
          Body: {d.fonts.body}. Display: {d.fonts.display}.
        </div>
        <div style={{ fontSize: 13, color: docMuted, marginTop: 6 }}>{d.fonts.note}</div>
      </Panel>
      <Panel>
        <Label>Real components, this theme</Label>
        <UiSample d={d} />
      </Panel>
      <Panel>
        <Label>How the logo is used</Label>
        <Bullets items={d.logoUse} />
      </Panel>
      <Panel>
        <Label>Imagery</Label>
        <Bullets items={d.imagery} />
      </Panel>
      <Panel>
        <Label>Voice: do</Label>
        <Bullets items={d.voice.do} />
        <div style={{ height: 12 }} />
        <Label>Voice: don’t</Label>
        <Bullets items={d.voice.dont} />
      </Panel>
      <Panel style={{ background: '#FFF8F1', borderColor: '#F4DCC6' }}>
        <Label>Risks to watch</Label>
        <Bullets items={d.risks} />
      </Panel>
      <Panel pad={16} style={{ display: 'grid', placeItems: 'center' }}>
        <Label>Home screen</Label>
        <MiniPhone scale={0.66}>
          <DirectionProvider id={d.id}><Home hasReadyReview /></DirectionProvider>
        </MiniPhone>
      </Panel>
    </VStack>
  )
}

/** One round's directions side by side, plus the locked copy. */
export function DirectionsPage({ ids, kicker, title, intro }: { ids: DirectionId[]; kicker: string; title: string; intro: ReactNode }) {
  return (
    <DocPage width={ids.length > 3 ? 1640 : 1320}>
      <DocTitle kicker={kicker} title={title} intro={intro} />
      <Grid cols={ids.length} gap={ids.length > 3 ? 18 : 24}>
        {ids.map((id) => <Column key={id} d={DIRECTIONS[id]} />)}
      </Grid>
      <DocSection title="What does not change" intro="Safety and clinical wording is locked. It reads the same in every direction, word for word.">
        <Grid cols={2} gap={12}>
          {Object.entries(LOCKED_COPY).filter(([, v]) => typeof v === 'string').map(([k, v]) => (
            <Panel key={k} pad={14}>
              <div style={{ fontSize: 11, color: docMuted, fontFamily: 'ui-monospace, monospace' }}>{k}</div>
              <div style={{ fontSize: 14, marginTop: 4 }}>{v as string}</div>
            </Panel>
          ))}
        </Grid>
      </DocSection>
    </DocPage>
  )
}

/** The logo mark on each direction's ground. */
export function MarkRow({ ids }: { ids: DirectionId[] }) {
  return (
    <DocPage>
      <Grid cols={ids.length}>
        {ids.map((id) => (
          <Panel key={id} style={{ display: 'grid', placeItems: 'center', height: 220, background: HEADER_BG[id] }}>
            <LogoMark size={110} variant={DIRECTIONS[id].hero.logo} />
          </Panel>
        ))}
      </Grid>
    </DocPage>
  )
}
