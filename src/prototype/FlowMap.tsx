import type { ReactNode } from 'react'
import { DirectionProvider } from '../brand/DirectionContext'
import type { DirectionId } from '../brand/directions'
import { Bullets, DocPage, DocSection, DocTitle, MiniBrowser, MiniPhone, Panel, docLine, docMuted } from '../docs/kit'
import { ProtoCtx, type ProtoApi } from './ProtoContext'
import type { Flow, FlowStep } from './flows'
import { renderStep } from './flows/render'
import './prototype.css'

/** Story export name of each flow in Prototype/Click-through (for deep links). */
const STORY: Record<Flow['id'], string> = { ask: 'ask-sayo', circle: 'circle', safety: 'safety', pro: 'professional', admin: 'admin' }

/** Tiles show the filled state and mark the control a tester taps next, but do nothing. */
const STILL: ProtoApi = { go: () => {}, back: () => {}, startFlow: () => {}, menu: () => {}, restart: () => {}, tap: () => {}, finish: () => {}, toast: () => {}, hints: true, prefill: true }

const isSide = (s: FlowStep) => /\(side path\)/i.test(s.title)

function Tile({ flow, step, n, direction }: { flow: Flow; step: FlowStep; n?: number; direction: DirectionId }) {
  const desktop = flow.device === 'desktop'
  const live = (
    <ProtoCtx.Provider value={STILL}>
      <DirectionProvider id={direction}>
        <div style={{ height: '100%', pointerEvents: 'none' }} aria-hidden>{renderStep(flow, step.id)}</div>
      </DirectionProvider>
    </ProtoCtx.Provider>
  )
  return (
    <a
      href={`./?path=/story/prototype-click-through--${STORY[flow.id]}&args=initialStep:${step.id}`}
      target="_top"
      style={{ textDecoration: 'none', color: 'inherit', display: 'grid', gap: 10, alignContent: 'start', justifyItems: 'start' }}
    >
      {desktop ? <MiniBrowser scale={0.3}>{live}</MiniBrowser> : <MiniPhone scale={0.42}>{live}</MiniPhone>}
      <div style={{ maxWidth: desktop ? 384 : 164 }}>
        {n !== undefined && <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', color: '#C4007F' }}>STEP {n}</div>}
        <div style={{ fontSize: 13.5, fontWeight: 700, lineHeight: 1.3 }}>{step.title.replace(/\s*\(side path\)/i, '')}</div>
        <div style={{ fontSize: 11, color: docMuted, fontFamily: 'ui-monospace, monospace' }}>{step.id}</div>
      </div>
    </a>
  )
}

function Row({ children }: { children: ReactNode }) {
  return <div className="proto-map" style={{ display: 'flex', flexWrap: 'wrap', gap: '28px 22px' }}>{children}</div>
}

/** Every step of a flow laid out in order: the main path, then the side paths. */
export function FlowMap({ flow, direction }: { flow: Flow; direction: DirectionId }) {
  const main = flow.steps.filter((s) => !isSide(s))
  const side = flow.steps.filter(isSide)
  return (
    <DocPage width={flow.device === 'desktop' ? 1320 : 1240}>
      <DocTitle kicker={`Flow map · ${flow.who} · ${flow.device === 'phone' ? 'phone' : 'laptop'}`} title={flow.title} intro={flow.blurb} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Panel>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: docMuted, marginBottom: 8 }}>What this tests</div>
          {flow.tests.length ? <Bullets items={flow.tests} /> : <span style={{ color: docMuted }}>Not written yet.</span>}
        </Panel>
        <Panel>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: docMuted, marginBottom: 8 }}>How to read this</div>
          <Bullets
            items={[
              `${main.length} steps on the main path, ${side.length} side paths. Fields are shown filled.`,
              'The blue ring marks what a tester taps next. Tap any tile to open the click-through at that step.',
              <>Play it from the start in <a href={`./?path=/story/prototype-click-through--${STORY[flow.id]}`} target="_top" style={{ color: '#C4007F', fontWeight: 700 }}>Prototype → Click-through</a>.</>,
            ]}
          />
        </Panel>
      </div>
      <DocSection title="Main path">
        <Row>{main.map((s, i) => <Tile key={s.id} flow={flow} step={s} n={i + 1} direction={direction} />)}</Row>
      </DocSection>
      {side.length > 0 && (
        <DocSection title="Side paths" intro="Branches off the main path: errors, other choices, and the routes that matter for safety.">
          <div style={{ borderTop: `1px dashed ${docLine}`, paddingTop: 20 }}>
            <Row>{side.map((s) => <Tile key={s.id} flow={flow} step={s} direction={direction} />)}</Row>
          </div>
        </DocSection>
      )}
    </DocPage>
  )
}
