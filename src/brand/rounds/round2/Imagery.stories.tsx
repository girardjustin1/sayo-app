import type { Meta, StoryObj } from '@storybook/react-vite'
import { DirectionProvider } from '../../DirectionContext'
import { DIRECTIONS, DIRECTION_IDS } from '../../directions'
import { Logo } from '../../Logo'
import { Display } from '../../../components/sayo'
import { Bullets, DocPage, DocSection, DocTitle, Grid, Label, MiniPhone, Panel, docMuted } from '../../../docs/kit'
import { R2Img, R2_IMAGERY, R2_NOTES, R2_SLOTS, r2image, type R2Direction, type R2Slot } from './imagery'

const meta: Meta = { title: 'Brand/Round 2 (current)/Imagery', parameters: { frame: 'raw' } }
export default meta
type Story = StoryObj

const R2_IDS = DIRECTION_IDS as R2Direction[]
const TILES: { slot: R2Slot; label: string }[] = [
  { slot: 'tile-ask', label: 'Ask SAYO' },
  { slot: 'tile-review', label: 'Professional review' },
  { slot: 'tile-care', label: 'Find Care' },
  { slot: 'tile-circle', label: 'The Circle' },
]
const TOPICS: { slot: R2Slot; title: string }[] = [
  { slot: 'topic-prep', title: 'PrEP is prevention' },
  { slot: 'topic-contraception', title: 'Your contraception options' },
  { slot: 'topic-mood', title: 'When your mood feels heavy' },
]

/** Splash with the direction's hero image. */
function Splash({ id, scale = 0.5 }: { id: R2Direction; scale?: number }) {
  const d = DIRECTIONS[id]
  return (
    <MiniPhone scale={scale}>
      <DirectionProvider id={id}>
        <div style={{ height: '100%', position: 'relative', background: 'var(--color-background-body)' }}>
          <div style={{ position: 'absolute', inset: '0 0 auto 0', height: '60%' }}><R2Img direction={id} slot="hero" height="100%" /></div>
          <div className="sayo-hero" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '46%', borderRadius: '28px 28px 0 0', padding: '30px 28px' }}>
            <Logo height={34} variant={d.hero.logo} />
            <div style={{ marginTop: 22 }}><Display size="xl">{d.copy.tagline}</Display></div>
            <p style={{ fontSize: 18, lineHeight: 1.45, marginTop: 12, opacity: 0.85, color: 'inherit' }}>{d.copy.splashLine}</p>
          </div>
        </div>
      </DirectionProvider>
    </MiniPhone>
  )
}

function Tile({ id, slot, label }: { id: R2Direction; slot: R2Slot; label: string }) {
  return (
    <DirectionProvider id={id}>
      <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden' }}>
        <R2Img direction={id} slot={slot} height={150} />
        <div style={{ position: 'absolute', inset: 'auto 0 0 0', padding: '28px 12px 10px', background: 'linear-gradient(180deg, transparent, rgb(0 0 0 / 0.62))', color: '#fff', fontWeight: 700, fontSize: 14 }}>{label} →</div>
      </div>
    </DirectionProvider>
  )
}

function LearnCard({ id, slot, title }: { id: R2Direction; slot: R2Slot; title: string }) {
  return (
    <DirectionProvider id={id}>
      <div className="sayo-card" style={{ overflow: 'hidden', background: 'var(--color-background-surface)', height: 'auto' }}>
        <R2Img direction={id} slot={slot} height={130} />
        <div style={{ padding: 14 }}>
          <Display size="sm" as="p">{title}</Display>
          <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 4 }}>3 min read · checked by a professional</div>
        </div>
      </div>
    </DirectionProvider>
  )
}

function DirectionImagery({ id }: { id: R2Direction }) {
  const d = DIRECTIONS[id]
  const images = R2_IMAGERY[id]
  return (
    <DocPage width={1320}>
      <DocTitle kicker={`Round 2 · Imagery · ${d.letter}`} title={`${d.name}: imagery`} intro={<Bullets items={d.imagery} />} />
      <Grid cols={3} gap={24} style={{ alignItems: 'start' }}>
        <Panel style={{ display: 'grid', justifyItems: 'center', gap: 12 }}>
          <Label>Splash</Label>
          <Splash id={id} scale={0.6} />
        </Panel>
        <Panel>
          <Label>Bento tiles (four pillars)</Label>
          <Grid cols={2} gap={10}>{TILES.map((t) => <Tile key={t.slot} id={id} {...t} />)}</Grid>
          <div style={{ height: 18 }} />
          <Label>Empty state</Label>
          <DirectionProvider id={id}>
            <div className="sayo-card" style={{ padding: 16, textAlign: 'center', background: 'var(--color-background-surface)', height: 'auto' }}>
              <div style={{ width: 120, margin: '0 auto' }}><R2Img direction={id} slot="empty" height={120} radius={12} position="center" /></div>
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 10 }}>{d.copy.myReviewsEmpty}</div>
            </div>
          </DirectionProvider>
        </Panel>
        <Panel>
          <Label>Learn cards</Label>
          <div style={{ display: 'grid', gap: 12 }}>{TOPICS.map((t) => <LearnCard key={t.slot} id={id} {...t} />)}</div>
        </Panel>
      </Grid>

      <DocSection title="Wide: web, deck and campaign use">
        <Panel pad={0} style={{ overflow: 'hidden', position: 'relative' }}>
          <DirectionProvider id={id}><R2Img direction={id} slot="wide" height={420} position="center" /></DirectionProvider>
          <DirectionProvider id={id}>
            <div style={{ position: 'absolute', left: 32, bottom: 32, background: 'var(--color-background-surface)', borderRadius: 16, padding: '18px 22px', maxWidth: 440 }}>
              <Logo height={26} />
              <div style={{ marginTop: 10 }}><Display size="md" as="p">{d.copy.tagline}</Display></div>
            </div>
          </DirectionProvider>
        </Panel>
      </DocSection>

      <DocSection title="All images and prompts">
        {images.length === 0 ? (
          <Panel><span style={{ color: docMuted }}>Images are being generated. Slots show a brand panel until they land.</span></Panel>
        ) : (
          <Grid cols={5} gap={12}>
            {R2_SLOTS.map((slot) => {
              const img = r2image(id, slot)
              return (
                <Panel key={slot} pad={0} style={{ overflow: 'hidden' }}>
                  <DirectionProvider id={id}><R2Img direction={id} slot={slot} height={170} position="center" /></DirectionProvider>
                  <div style={{ padding: 10 }}>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{slot}</div>
                    <div style={{ fontSize: 11, color: docMuted }}>{img ? `${img.ratio}${img.model ? ` · ${img.model}` : ''}` : 'pending'}</div>
                    {img && (
                      <details style={{ marginTop: 4 }}>
                        <summary style={{ fontSize: 12, color: '#C4007F', cursor: 'pointer' }}>Prompt</summary>
                        <div style={{ fontSize: 11, color: docMuted, marginTop: 4, lineHeight: 1.45 }}>{img.prompt}</div>
                      </details>
                    )}
                  </div>
                </Panel>
              )
            })}
          </Grid>
        )}
      </DocSection>

      {R2_NOTES[id].length > 0 && (
        <DocSection title="Notes from generating these"><Panel><Bullets items={R2_NOTES[id]} /></Panel></DocSection>
      )}
    </DocPage>
  )
}

export const Overview: Story = {
  render: () => (
    <DocPage width={1640}>
      <DocTitle
        kicker="Round 2 · Imagery"
        title="Imagery for Ink, Clay, Quiet and Grove"
        intro="Each direction gets the same ten image slots (splash hero, wide banner, four pillar tiles, three Learn topics, an empty state), art-directed to its own brief and generated with Higgsfield. The same slots feed the app screens and the landing pages."
      />
      <Grid cols={4} gap={18} style={{ alignItems: 'start' }}>
        {R2_IDS.map((id) => (
          <Panel key={id} style={{ display: 'grid', gap: 14 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', color: '#C4007F' }}>DIRECTION {DIRECTIONS[id].letter}</div>
              <div style={{ fontSize: 20, fontWeight: 800 }}>{DIRECTIONS[id].name}</div>
              <div style={{ fontSize: 13, color: docMuted, marginTop: 4 }}>{DIRECTIONS[id].imagery[0]}</div>
            </div>
            <div style={{ display: 'grid', justifyItems: 'center' }}><Splash id={id} scale={0.56} /></div>
            <Grid cols={2} gap={8}>{TILES.map((t) => <Tile key={t.slot} id={id} {...t} />)}</Grid>
            <LearnCard id={id} slot="topic-prep" title="PrEP is prevention" />
          </Panel>
        ))}
      </Grid>
    </DocPage>
  ),
}
export const Ink: Story = { name: 'D · Ink', render: () => <DirectionImagery id="ink" /> }
export const Clay: Story = { name: 'E · Clay', render: () => <DirectionImagery id="clay" /> }
export const Quiet: Story = { name: 'F · Quiet', render: () => <DirectionImagery id="quiet" /> }
export const Grove: Story = { name: 'G · Grove', render: () => <DirectionImagery id="grove" /> }
