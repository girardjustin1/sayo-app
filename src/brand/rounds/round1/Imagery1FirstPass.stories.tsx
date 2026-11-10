import type { Meta, StoryObj } from '@storybook/react-vite'
import { DIRECTIONS } from '../../directions'
import { IMAGERY } from '../../imagery'
import { Logo } from '../../Logo'
import { Bullets, DocPage, DocSection, DocTitle, Grid, MiniPhone, Panel, docMuted } from '../../../docs/kit'
import { DirectionProvider } from '../../DirectionContext'

const meta: Meta = { title: 'Brand/Round 1 (pink)/Imagery 1 (first pass)', parameters: { frame: 'raw' } }
export default meta

/** A splash screen mock using the direction's hero image. */
function Splash({ id }: { id: 'sister' | 'clear' | 'unmuted' }) {
  const d = DIRECTIONS[id]
  const hero = IMAGERY[id].find((i) => i.src.includes('hero'))
  return (
    <MiniPhone scale={0.5}>
      <DirectionProvider id={id}>
        <div style={{ height: '100%', position: 'relative', background: 'var(--color-background-body)' }}>
          {hero && <img src={hero.src} alt={hero.alt} style={{ position: 'absolute', inset: 0, width: '100%', height: '62%', objectFit: 'cover' }} />}
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '48%', background: id === 'unmuted' ? 'var(--sayo-hero)' : 'var(--color-background-body)', borderRadius: '32px 32px 0 0', padding: '32px 28px', color: id === 'unmuted' ? '#fff' : undefined }}>
            <Logo height={34} variant={id === 'unmuted' ? 'reverse' : 'color'} />
            <p className="sayo-display sayo-display--xl" style={{ marginTop: 24, textAlign: "left" }}>{d.copy.tagline}</p>
            <p style={{ fontSize: 19, lineHeight: 1.45, marginTop: 14, opacity: 0.85, textAlign: "left" }}>{d.copy.splashLine}</p>
          </div>
        </div>
      </DirectionProvider>
    </MiniPhone>
  )
}

export const Preliminary: StoryObj = {
  name: 'Preliminary imagery',
  render: () => (
    <DocPage width={1320}>
      <DocTitle
        kicker="Brand · Imagery"
        title="Preliminary imagery, round 1 (pink directions)"
        intro="First-pass art direction made with Higgsfield (Soul 2.0 photography, Recraft vector). These are mood and placement tests, not final assets: before launch, replace them with commissioned photography of real (consenting) young Ghanaian women, or keep illustration only."
      />

      <DocSection title="In context: the splash screen">
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          {(['sister', 'clear', 'unmuted'] as const).map((id) => (
            <div key={id} style={{ textAlign: 'center' }}>
              <Splash id={id} />
              <div style={{ fontWeight: 700, marginTop: 12 }}>{DIRECTIONS[id].letter} · {DIRECTIONS[id].name}</div>
            </div>
          ))}
        </div>
      </DocSection>

      {(['sister', 'clear', 'unmuted'] as const).map((id) => (
        <DocSection key={id} title={`${DIRECTIONS[id].letter} · ${DIRECTIONS[id].name}`} intro={<Bullets items={DIRECTIONS[id].imagery} />}>
          <Grid cols={IMAGERY[id].length} gap={14}>
            {IMAGERY[id].map((img) => (
              <Panel key={img.src} pad={0} style={{ overflow: 'hidden' }}>
                <img src={img.src} alt={img.alt} style={{ display: 'block', width: '100%', height: 260, objectFit: img.src.endsWith('.svg') ? 'contain' : 'cover', background: '#F6F3F8' }} />
                <div style={{ padding: 12 }}>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{img.use}</div>
                  <div style={{ fontSize: 12, color: docMuted, marginTop: 4 }}>{img.ratio} · {img.alt}</div>
                  <details style={{ marginTop: 6 }}>
                    <summary style={{ fontSize: 12, color: '#C4007F', cursor: 'pointer' }}>Prompt</summary>
                    <div style={{ fontSize: 11, color: docMuted, marginTop: 4, lineHeight: 1.45 }}>{img.prompt}</div>
                  </details>
                </div>
              </Panel>
            ))}
          </Grid>
        </DocSection>
      ))}

      <DocSection title="Rules for any SAYO image">
        <Grid cols={2}>
          <Panel><Bullets items={['Adult women in their 20s, clearly; dignified, joyful or calm', 'Everyone fully clothed; nobody visibly ill, injured or distressed', 'Light, warm settings; never hospitals, gloves or stethoscopes']} /></Panel>
          <Panel><Bullets items={['No Africa-map clichés, no animals, no text baked into images', 'Never pair a face with a specific condition (stigma by association)', 'Data-light: compress, lazy-load, and keep illustration fallbacks for slow networks']} /></Panel>
        </Grid>
      </DocSection>
    </DocPage>
  ),
}
