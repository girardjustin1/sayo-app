import { useEffect, useRef, useState } from 'react'
import { Heading } from '@astryxdesign/core/Heading'
import { Text } from '@astryxdesign/core/Text'
import { VStack } from '@astryxdesign/core/VStack'
import { DirectionProvider } from '../brand/DirectionContext'
import { DIRECTIONS, type DirectionId } from '../brand/directions'
import { DocPage, DocSection, DocTitle, Grid, Label, Panel, docMuted } from './kit'


const COLOR_TOKENS = [
  ['--color-accent', 'Primary action'],
  ['--color-on-accent', 'Text on primary'],
  ['--color-background-body', 'Page'],
  ['--color-background-surface', 'Surface'],
  ['--color-text-primary', 'Text'],
  ['--color-text-secondary', 'Secondary text'],
  ['--color-border', 'Border'],
  ['--color-success', 'Success'],
  ['--color-warning', 'Warning'],
  ['--color-error', 'Error'],
  ['--sayo-soft', 'Soft panel'],
  ['--sayo-ai-soft', 'AI note'],
  ['--sayo-pro', 'Verified Professional'],
  ['--sayo-pro-soft', 'Professional tint'],
] as const

/** Shows a token's resolved value, read from the rendered DOM (not a hand-typed hex). */
function Resolved({ token }: { token: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [v, setV] = useState('')
  useEffect(() => {
    const t = setTimeout(() => ref.current && setV(getComputedStyle(ref.current).getPropertyValue(token).trim().replace(/^light-dark\(([^,]+),.*$/, '$1')), 300)
    return () => clearTimeout(t)
  }, [token])
  return <span ref={ref} style={{ fontSize: 11, color: docMuted, fontFamily: 'ui-monospace, monospace' }}>{v || '…'}</span>
}

function ColorColumn({ id }: { id: DirectionId }) {
  return (
    <Panel>
      <Label>{DIRECTIONS[id].letter} · {DIRECTIONS[id].name}</Label>
      <DirectionProvider id={id}>
        <div style={{ display: 'grid', gap: 8 }}>
          {COLOR_TOKENS.map(([t, role]) => (
            <div key={t} style={{ display: 'grid', gridTemplateColumns: '40px 1fr', gap: 10, alignItems: 'center' }}>
              <span style={{ width: 40, height: 28, borderRadius: 8, background: `var(${t})`, border: '1px solid rgb(0 0 0 / 0.08)' }} />
              <span style={{ display: 'grid' }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#1F1D24' }}>{role}</span>
                <span style={{ fontSize: 11, color: docMuted, fontFamily: 'ui-monospace, monospace' }}>{t} · <Resolved token={t} /></span>
              </span>
            </div>
          ))}
        </div>
      </DirectionProvider>
    </Panel>
  )
}

function TypeColumn({ id }: { id: DirectionId }) {
  return (
    <Panel>
      <Label>{DIRECTIONS[id].letter} · {DIRECTIONS[id].name}</Label>
      <DirectionProvider id={id}>
        <VStack gap={3}>
          <span className="sayo-display sayo-display--xl">What’s up?</span>
          <span className="sayo-display sayo-display--md">Brand display · 26</span>
          <Heading level={1}>Heading 1</Heading>
          <Heading level={2}>Heading 2</Heading>
          <Heading level={3}>Heading 3</Heading>
          <Text type="large">Large body for key sentences.</Text>
          <Text>Body text. Short sentences, plain words, read on a phone in a hurry.</Text>
          <Text type="supporting">Supporting text for metadata and hints.</Text>
          <Text type="label">Label</Text>
        </VStack>
      </DirectionProvider>
    </Panel>
  )
}

function ShapeColumn({ id }: { id: DirectionId }) {
  return (
    <Panel>
      <Label>{DIRECTIONS[id].letter} · {DIRECTIONS[id].name}</Label>
      <DirectionProvider id={id}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          {['--radius-inner', '--radius-element', '--radius-container', '--sayo-card-radius', '--sayo-button-radius'].map((r) => (
            <div key={r} style={{ textAlign: 'center' }}>
              <div style={{ width: 64, height: 64, background: 'var(--sayo-soft)', border: '2px solid var(--color-accent)', borderRadius: `var(${r})` }} />
              <div style={{ fontSize: 10, color: docMuted, marginTop: 4, fontFamily: 'ui-monospace, monospace' }}>{r.replace('--', '')}</div>
            </div>
          ))}
        </div>
      </DirectionProvider>
    </Panel>
  )
}

/** Live Astryx tokens for each direction in a round. */
export function TokensPage({ ids, kicker }: { ids: DirectionId[]; kicker: string }) {
  return (
    <DocPage width={ids.length > 3 ? 1640 : 1320}>
      <DocTitle
        kicker={kicker}
        title="Design tokens, per direction"
        intro={
          <>
            SAYO runs on Astryx. Each direction is an Astryx theme built with <code>defineTheme</code>, extending the
            neutral theme: an accent seed (Astryx generates contrast-safe neutrals, text and borders from it), a type
            scale, a radius scale and a few <code>--sayo-*</code> brand tokens. Values below are read live from the
            rendered theme.
          </>
        }
      />
      <DocSection
        title="Colour"
        intro="Note: Astryx tunes the accent seed so text on it passes contrast. The brand hexes in Brand → Directions are the seeds; the values here are what ships. Light mode only: SAYO has no dark UI."
      >
        <Grid cols={ids.length}>{ids.map((id) => <ColorColumn key={id} id={id} />)}</Grid>
      </DocSection>
      <DocSection title="Type">
        <Grid cols={ids.length}>{ids.map((id) => <TypeColumn key={id} id={id} />)}</Grid>
      </DocSection>
      <DocSection title="Shape">
        <Grid cols={ids.length}>{ids.map((id) => <ShapeColumn key={id} id={id} />)}</Grid>
      </DocSection>
      <DocSection title="Three meanings that must never blur" intro="AI, peers and professionals each get their own visual signal, in every direction.">
        <Grid cols={3}>
          <Panel><b>AI (SAYO)</b><p style={{ fontSize: 14, color: docMuted }}>The SAYO “o-dot” mark + the word “AI”, AI-note tint, and the locked line “This is general health information, not a diagnosis.”</p></Panel>
          <Panel><b>Peer (Circle)</b><p style={{ fontSize: 14, color: docMuted }}>Generated shape avatar + nickname. No badge, no photo. Plain card.</p></Panel>
          <Panel><b>Verified Professional ✓</b><p style={{ fontSize: 14, color: docMuted }}>Green badge + green left rule. Green is reserved for this (and verified services) in every direction.</p></Panel>
        </Grid>
      </DocSection>
    </DocPage>
  )
}
