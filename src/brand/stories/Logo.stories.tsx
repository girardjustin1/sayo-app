import type { Meta, StoryObj } from '@storybook/react-vite'
import { assetUrl } from '../../lib/asset'
import type { ReactNode } from 'react'
import { Logo, LogoMark, Wordmark } from '../Logo'
import { Bullets, DocPage, DocSection, DocTitle, Grid, Label, Panel, docMuted } from '../../docs/kit'

const meta: Meta = { title: 'Brand/Logo', parameters: { frame: 'raw' } }
export default meta

const GRADIENT = 'linear-gradient(135deg,#D4009E 0%,#F0346A 55%,#FF5A48 100%)'

function Tile({ bg, children, label, h = 200, dark = false }: { bg: string; children: ReactNode; label: string; h?: number; dark?: boolean }) {
  return (
    <div>
      <div style={{ height: h, borderRadius: 16, background: bg, display: 'grid', placeItems: 'center', border: '1px solid rgb(0 0 0 / 0.06)', color: dark ? '#fff' : '#2A2D32' }}>{children}</div>
      <div style={{ fontSize: 13, marginTop: 8, color: docMuted }}>{label}</div>
    </div>
  )
}

function AppIcon({ bg, variant, label, note }: { bg: string; variant: 'color' | 'reverse'; label: string; note: string }) {
  return (
    <div style={{ display: 'grid', justifyItems: 'center', gap: 8, textAlign: 'center' }}>
      <div style={{ width: 120, height: 120, borderRadius: 27, background: bg, display: 'grid', placeItems: 'center', boxShadow: '0 8px 24px rgb(60 10 50 / 0.18), inset 0 0 0 1px rgb(0 0 0 / 0.05)' }}>
        <LogoMark size={66} variant={variant} />
      </div>
      <div style={{ fontWeight: 700, fontSize: 14 }}>{label}</div>
      <div style={{ fontSize: 12, color: docMuted, maxWidth: 200 }}>{note}</div>
    </div>
  )
}

const FILES = ['sayo-lockup.svg', 'sayo-lockup-reverse.svg', 'sayo-lockup-mono.svg', 'sayo-mark.svg', 'sayo-mark-mono.svg', 'sayo-wordmark.svg']

export const Overview: StoryObj = {
  render: () => (
    <DocPage>
      <DocTitle
        kicker="Brand · Logo"
        title="The SAYO logo, vectorised"
        intro="Traced from the chosen logo into clean SVG: one gradient path for the heart-S mark, one charcoal path for the lowercase wordmark, and the coral dot in the “o”. Colours sampled from the original. Nothing was redesigned."
      />

      <DocSection title="Lockups">
        <Grid cols={2}>
          <Tile bg="#FFFFFF" label="Primary: full colour on white or a light tint" h={220}><Logo height={72} /></Tile>
          <Tile bg="#2A2D32" label="On dark (charcoal): gradient mark, white wordmark. For print and video only; the app is never dark." h={220} dark><Logo height={72} variant="onDark" /></Tile>
          <Tile bg={GRADIENT} label="Reverse on the gradient (Direction C hero moments)" h={220} dark><Logo height={72} variant="reverse" /></Tile>
          <Tile bg="#FAF8FC" label="Single colour (currentColor): discreet places, stamps, partner materials" h={220}><span style={{ color: '#6D2E9E' }}><Logo height={72} variant="mono" /></span></Tile>
        </Grid>
      </DocSection>

      <DocSection title="Mark and wordmark">
        <Grid cols={3}>
          <Tile bg="#FFF7F3" label="Mark"><LogoMark size={120} /></Tile>
          <Tile bg="#FFFFFF" label="Wordmark"><Wordmark height={64} /></Tile>
          <Tile bg="#FFFFFF" label="Mono mark"><span style={{ color: '#2A2D32' }}><LogoMark size={120} variant="mono" /></span></Tile>
        </Grid>
      </DocSection>

      <DocSection title="Clear space and minimum size" intro="Keep clear space equal to the height of the “o” on every side. Below 24 px the two inner strokes of the mark start to merge.">
        <Grid cols={2}>
          <Panel style={{ display: 'grid', placeItems: 'center', height: 240 }}>
            <div style={{ padding: 36, outline: '1.5px dashed #D4009E', outlineOffset: -1, background: 'repeating-linear-gradient(45deg, #FDE7F3 0 6px, #fff 6px 12px)' }}>
              <div style={{ background: '#fff' }}><Logo height={64} /></div>
            </div>
          </Panel>
          <Panel>
            <Label>Size ladder</Label>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 22 }}>
              {[16, 20, 24, 32, 48, 72].map((s) => (
                <div key={s} style={{ textAlign: 'center' }}>
                  <LogoMark size={s} />
                  <div style={{ fontSize: 11, color: s < 24 ? '#C4007F' : docMuted, marginTop: 6, fontWeight: s < 24 ? 700 : 400 }}>{s}px</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 18 }}>
              <Bullets
                items={[
                  'Minimum: mark 24 px, full lockup 96 px wide on screen.',
                  'Recommendation: draw a simplified small-size mark (heart + S, fewer strokes) for favicons, notification icons and 16–20 px uses.',
                ]}
              />
            </div>
          </Panel>
        </Grid>
      </DocSection>

      <DocSection title="App icon concepts" intro="One per direction. The icon sits on a shared phone, so how loudly it says “health” is a privacy choice as much as a brand one.">
        <Panel style={{ display: 'flex', justifyContent: 'space-around', padding: 32, background: 'linear-gradient(160deg,#E9E3F0,#F7EEF0)' }}>
          <AppIcon bg="#FFF7F3" variant="color" label="A · Big Sister" note="Gradient mark on blush. Friendly, clearly SAYO." />
          <AppIcon bg="#6D2E9E" variant="reverse" label="B · Clear Care" note="White mark on plum. Reads as “an app”, not “a health app”." />
          <AppIcon bg={GRADIENT} variant="reverse" label="C · Unmuted" note="White mark on the full gradient. Loud on purpose." />
        </Panel>
      </DocSection>

      <DocSection title="Files" intro="Served from brand/ in this Storybook and stored in src/brand/logo/ in the repo.">
        <Grid cols={3} gap={12}>
          {FILES.map((f) => (
            <a key={f} href={assetUrl(`/brand/${f}`)} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Panel pad={14} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <img src={assetUrl(`/brand/${f}`)} alt="" style={{ height: 28, maxWidth: 90, background: f.includes('reverse') ? '#2A2D32' : undefined, padding: f.includes('reverse') ? 4 : 0, borderRadius: 4 }} />
                <span style={{ fontSize: 13, fontFamily: 'ui-monospace, monospace' }}>{f}</span>
              </Panel>
            </a>
          ))}
        </Grid>
      </DocSection>

      <DocSection title="Don’t">
        <Grid cols={4} gap={14}>
          {[
            { label: 'Recolour the gradient', el: <span style={{ filter: 'hue-rotate(140deg)' }}><Logo height={34} /></span> },
            { label: 'Stretch or squash', el: <span style={{ display: 'inline-block', transform: 'scaleX(1.5)' }}><Logo height={30} /></span> },
            { label: 'Put it on busy photos', el: <div style={{ background: 'repeating-linear-gradient(60deg,#F0346A 0 10px,#FFD9C7 10px 20px,#6D2E9E 20px 30px)', padding: 18, borderRadius: 8 }}><Logo height={30} /></div> },
            { label: 'Use the old leaf logo from the early mock-ups', el: <span style={{ fontSize: 30, fontWeight: 800, color: '#1F4D3D' }}>❦ SAYO</span> },
          ].map((d) => (
            <Panel key={d.label} pad={14}>
              <div style={{ height: 90, display: 'grid', placeItems: 'center', position: 'relative' }}>
                {d.el}
                <span style={{ position: 'absolute', top: 0, right: 0, color: '#C4007F', fontWeight: 900 }}>✕</span>
              </div>
              <div style={{ fontSize: 13, marginTop: 8 }}>{d.label}</div>
            </Panel>
          ))}
        </Grid>
      </DocSection>
    </DocPage>
  ),
}
