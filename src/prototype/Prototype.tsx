import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { DirectionProvider } from '../brand/DirectionContext'
import { DIRECTIONS, DIRECTION_IDS, type DirectionId } from '../brand/directions'
import { ProtoCtx, type ProtoApi } from './ProtoContext'
import { FLOWS, type Flow, type FlowId } from './flows'
import { renderStep } from './flows/render'
import { Launcher } from './Launcher'
import './modals'
import './prototype.css'

type Route = { flow: FlowId | null; step?: string }

const parseHash = (): Route => {
  const [, flow, step] = (window.location.hash.replace(/^#/, '') || '/').split('/')
  return FLOWS.some((f) => f.id === flow) ? { flow: flow as FlowId, step: step || undefined } : { flow: null }
}
const toHash = (r: Route) => (r.flow ? `#/${r.flow}${r.step ? `/${r.step}` : ''}` : '#/')

const savedDirection = (): DirectionId => {
  const d = localStorage.getItem('sayo-proto-direction') as DirectionId | null
  return d && DIRECTION_IDS.includes(d) ? d : 'clay'
}

export interface PrototypeProps {
  /**
   * app: the standalone prototype (hash links, remembers its settings).
   * storybook: the same shell inside a story; the brand comes from the Direction toolbar.
   * embedded: the device contents only, inside an existing frame.
   */
  mode?: 'app' | 'storybook' | 'embedded'
  initialFlow?: FlowId
  initialStep?: string
  /** storybook mode: the toolbar's direction. */
  direction?: DirectionId
}

/**
 * Clickable prototype: a menu of flows, each playable end to end with fictional data.
 * It brings its own device frame and a panel with Jump to, a tap counter, the brand
 * directions, tap hints and the "Prefill fields" switch.
 */
export function Prototype({ mode = 'app', initialFlow, initialStep, direction: fixedDirection }: PrototypeProps) {
  const embedded = mode === 'embedded'
  const app = mode === 'app'
  const [route, setRoute] = useState<Route>(() => (app ? parseHash() : { flow: initialFlow ?? null, step: initialStep }))
  const [history, setHistory] = useState<string[]>([])
  const [ownDirection, setDirection] = useState<DirectionId>(() => (app ? savedDirection() : 'clay'))
  const direction = fixedDirection ?? ownDirection
  const [hints, setHints] = useState(() => !app || localStorage.getItem('sayo-proto-hints') !== 'off')
  const [prefill, setPrefill] = useState(() => app && localStorage.getItem('sayo-proto-prefill') === 'on')
  const [run, setRun] = useState(0)
  const [taps, setTaps] = useState(0)
  const [startedAt, setStartedAt] = useState<number | null>(null)
  const [finishedAt, setFinishedAt] = useState<number | null>(null)
  const [toastMsg, setToastMsg] = useState<string | null>(null)
  const [panel, setPanel] = useState(false)
  const wide = useMedia('(min-width: 860px)') && !embedded

  useEffect(() => {
    if (app) localStorage.setItem('sayo-proto-direction', ownDirection)
  }, [ownDirection, app])
  useEffect(() => {
    if (app) localStorage.setItem('sayo-proto-hints', hints ? 'on' : 'off')
  }, [hints, app])
  useEffect(() => {
    if (app) localStorage.setItem('sayo-proto-prefill', prefill ? 'on' : 'off')
  }, [prefill, app])
  // Storybook: follow the story's args when they change (e.g. a deep link to a step).
  useEffect(() => {
    if (!app) setRoute({ flow: initialFlow ?? null, step: initialStep })
  }, [app, initialFlow, initialStep])
  useEffect(() => {
    if (!app) return
    const on = () => setRoute(parseHash())
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [app])
  // Deep links (e.g. #/ask/ask-summary) start the clock too.
  useEffect(() => {
    if (route.flow && startedAt === null) setStartedAt(Date.now())
  }, [route.flow, startedAt])

  const navigate = useCallback(
    (r: Route) => {
      setRoute(r)
      if (app) window.history.replaceState(null, '', toHash(r))
    },
    [app],
  )

  const flow = FLOWS.find((f) => f.id === route.flow)

  const start = useCallback(
    (id: FlowId, step?: string) => {
      const f = FLOWS.find((x) => x.id === id)!
      setHistory([])
      setTaps(0)
      setStartedAt(Date.now())
      setFinishedAt(null)
      setRun((n) => n + 1)
      setPanel(false)
      navigate({ flow: id, step: step ?? f.start })
    },
    [navigate],
  )

  const api: ProtoApi = useMemo(
    () => ({
      hints,
      prefill,
      go: (step) => {
        setHistory((h) => (route.step ? [...h, route.step] : h))
        navigate({ flow: route.flow, step })
      },
      back: () => {
        const prev = history.at(-1)
        if (!prev) return
        setHistory((h) => h.slice(0, -1))
        navigate({ flow: route.flow, step: prev })
      },
      startFlow: start,
      menu: () => {
        setPanel(false)
        navigate({ flow: null })
      },
      restart: () => {
        if (route.flow) start(route.flow)
      },
      tap: () => setTaps((t) => t + 1),
      finish: () => setFinishedAt((f) => f ?? Date.now()),
      toast: (m) => {
        setToastMsg(m)
        setTimeout(() => setToastMsg(null), 2200)
      },
    }),
    [hints, prefill, history, navigate, route, start],
  )

  const secs = startedAt ? Math.round(((finishedAt ?? Date.now()) - startedAt) / 1000) : 0
  const done = !!finishedAt
  const desktop = flow?.device === 'desktop'
  const controls = { direction, onDirection: fixedDirection ? undefined : setDirection, hints, onHints: setHints, prefill, onPrefill: setPrefill }

  const screen = flow ? (
    <div key={`${flow.id}-${run}-${prefill}`} className="proto-fill">{renderStep(flow, route.step ?? flow.start)}</div>
  ) : (
    <Launcher onStart={(id) => start(id)} controls={wide || embedded || !controls.onDirection ? undefined : { ...controls, onDirection: controls.onDirection }} />
  )

  const device = (
    <div className="proto-device" data-proto-step={route.step ?? flow?.start ?? ''} data-proto-flow={route.flow ?? ''} data-proto-done={done || undefined}>
      {screen}
      {flow && !wide && <MiniMenu open={panel} onToggle={() => setPanel((p) => !p)} taps={taps} secs={secs} done={done} hints={hints} onHints={setHints} prefill={prefill} onPrefill={setPrefill} corner={desktop} />}
      {toastMsg && (
        <div className="proto-toast" role="status">
          <span>{toastMsg}</span>
        </div>
      )}
    </div>
  )
  // Embedded: the story decorator already provides the direction.
  const themed = embedded ? device : <DirectionProvider id={direction}>{device}</DirectionProvider>
  const panelProps = { flow, taps, secs, done, step: route.step, onJump: (s: string) => navigate({ flow: route.flow, step: s }), onMenu: api.menu, onRestart: api.restart, ...controls }

  return (
    <ProtoCtx.Provider value={api}>
      {embedded ? (
        themed
      ) : desktop ? (
        <div className={`proto-page proto-page--desktop${app ? '' : ' proto-page--story'}`}>
          <TopBar {...panelProps} />
          <BrowserFrame>{themed}</BrowserFrame>
        </div>
      ) : wide ? (
        <div className={`proto-page${app ? '' : ' proto-page--story'}`}>
          <SidePanel {...panelProps} />
          <div className="proto-phone">{themed}</div>
        </div>
      ) : (
        <div className="proto-root">{themed}</div>
      )}
    </ProtoCtx.Provider>
  )
}

function useMedia(q: string) {
  const [on, setOn] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches)
  useEffect(() => {
    const m = window.matchMedia(q)
    const fn = () => setOn(m.matches)
    m.addEventListener('change', fn)
    return () => m.removeEventListener('change', fn)
  }, [q])
  return on
}

const clock = (secs: number) => `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`

/** Re-render once a second while a flow is running, so the timer ticks. */
function useTick(active: boolean) {
  const [, force] = useState(0)
  useEffect(() => {
    if (!active) return
    const t = setInterval(() => force((n) => n + 1), 1000)
    return () => clearInterval(t)
  }, [active])
}

interface PanelProps {
  flow?: Flow
  taps: number
  secs: number
  done: boolean
  step?: string
  onJump: (s: string) => void
  onMenu: () => void
  onRestart: () => void
  direction: DirectionId
  /** Absent in Storybook, where the Direction toolbar decides. */
  onDirection?: (d: DirectionId) => void
  hints: boolean
  onHints: (v: boolean) => void
  prefill: boolean
  onPrefill: (v: boolean) => void
}

/** The two switches every panel shows. */
function Switches({ hints, onHints, prefill, onPrefill, short = false }: Pick<PanelProps, 'hints' | 'onHints' | 'prefill' | 'onPrefill'> & { short?: boolean }) {
  return (
    <>
      <label className="proto-check" title="Off: fields start empty and fill when you tap them. On: everything arrives filled.">
        <input type="checkbox" checked={prefill} onChange={(e) => onPrefill(e.target.checked)} /> {short ? 'Prefill' : 'Prefill fields'}
        {!short && <span className="proto-check__hint">{prefill ? 'Fields arrive filled' : 'Tap a field to fill it'}</span>}
      </label>
      <label className="proto-check">
        <input type="checkbox" checked={hints} onChange={(e) => onHints(e.target.checked)} /> {short ? 'Hints' : 'Show tap hints'}
      </label>
    </>
  )
}

function DirectionPills({ direction, onDirection }: Pick<PanelProps, 'direction' | 'onDirection'>) {
  if (!onDirection) return <p className="proto-foot">{DIRECTIONS[direction].letter} · {DIRECTIONS[direction].name}. Change it with the Direction toolbar above.</p>
  return (
    <div className="proto-pills">
      {DIRECTION_IDS.map((id) => (
        <button key={id} type="button" className="proto-pill" aria-pressed={id === direction} onClick={() => onDirection(id)}>
          {DIRECTIONS[id].letter} · {DIRECTIONS[id].name}
        </button>
      ))}
    </div>
  )
}

function Stat({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="proto-stat">
      <div className="proto-label">{label}</div>
      <div className="proto-stat__value">{value}</div>
    </div>
  )
}

/** Beside the phone on wide screens. */
function SidePanel({ flow, taps, secs, done, step, onJump, onMenu, onRestart, direction, onDirection, hints, onHints, prefill, onPrefill }: PanelProps) {
  useTick(!!flow && !done)
  return (
    <aside className="proto-side">
      <div>
        <div className="proto-label">Prototype{flow ? ` · ${flow.who}` : ''}</div>
        <h1 className="proto-title">{flow ? flow.title : 'Pick a flow'}</h1>
        <p className="proto-text">{flow ? flow.blurb : 'Five flows across the user app, the professional dashboard and the admin console. Everything is prefilled and fictional: tap the glowing control to move on.'}</p>
      </div>
      {flow && (
        <>
          <div className="proto-stats">
            <Stat label="Taps" value={taps} />
            <Stat label={done ? 'Done in' : 'Time'} value={clock(secs)} />
          </div>
          {done && <div className="proto-done">End of this flow. Restart it, or go back to the menu.</div>}
          <div className="proto-actions">
            <button type="button" className="proto-btn proto-btn--solid" onClick={onMenu}>← Menu</button>
            <button type="button" className="proto-btn" onClick={onRestart}>Restart</button>
          </div>
          {flow.tests.length > 0 && (
            <div>
              <div className="proto-label">What this tests</div>
              <ul className="proto-list">{flow.tests.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
          )}
          <div>
            <div className="proto-label">Jump to</div>
            <div className="proto-jump">
              {flow.steps.map((s) => (
                <button key={s.id} type="button" aria-current={s.id === step ? 'step' : undefined} onClick={() => onJump(s.id)}>{s.title}</button>
              ))}
            </div>
          </div>
        </>
      )}
      <div>
        <div className="proto-label">Brand direction</div>
        <DirectionPills direction={direction} onDirection={onDirection} />
      </div>
      <div className="proto-switches">
        <Switches hints={hints} onHints={onHints} prefill={prefill} onPrefill={onPrefill} />
      </div>
      <p className="proto-foot">Sample data only. On a phone, open this page for the full-screen version.</p>
    </aside>
  )
}

/** Above the browser frame for the desktop flows. */
function TopBar({ flow, taps, secs, done, step, onJump, onMenu, onRestart, direction, onDirection, hints, onHints, prefill, onPrefill }: PanelProps) {
  useTick(!!flow && !done)
  if (!flow) return null
  return (
    <header className="proto-top">
      <button type="button" className="proto-btn proto-btn--solid" onClick={onMenu}>← Menu</button>
      <button type="button" className="proto-btn" onClick={onRestart}>Restart</button>
      <div className="proto-top__title">
        <div className="proto-label">Prototype · {flow.who}</div>
        <strong>{flow.title}</strong>
      </div>
      <span className="proto-top__stat">{taps} taps · {clock(secs)}{done ? ' · done' : ''}</span>
      <label className="proto-select">
        <span className="proto-label">Jump to</span>
        <select value={step ?? flow.start} onChange={(e) => onJump(e.target.value)}>
          {flow.steps.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
        </select>
      </label>
      {onDirection && <DirectionPills direction={direction} onDirection={onDirection} />}
      <Switches hints={hints} onHints={onHints} prefill={prefill} onPrefill={onPrefill} short />
    </header>
  )
}

/** A 1280 × 820 browser window, scaled down to fit narrower screens. */
function BrowserFrame({ children }: { children: ReactNode }) {
  const [scale, setScale] = useState(1)
  useEffect(() => {
    const fit = () => setScale(Math.min(1, (window.innerWidth - 32) / 1280))
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])
  return (
    <div className="proto-browser-wrap" style={{ height: 856 * scale }}>
      <div className="proto-browser" style={{ transform: `scale(${scale})` }}>
        <div className="proto-browser__bar">
          <span /><span /><span />
          <em>pro.sayo.health (sample)</em>
        </div>
        <div className="proto-browser__body">{children}</div>
      </div>
    </div>
  )
}

/** Phone-size control: a small pill that opens a menu. */
function MiniMenu({ open, onToggle, taps, secs, done, hints, onHints, prefill, onPrefill, corner }: { open: boolean; onToggle: () => void; taps: number; secs: number; done: boolean; hints: boolean; onHints: (v: boolean) => void; prefill: boolean; onPrefill: (v: boolean) => void; corner?: boolean }) {
  return (
    <ProtoCtx.Consumer>
      {(api) => (
        <>
          <button type="button" className={`proto-mini${corner ? ' proto-mini--corner' : ''}`} onClick={onToggle}>
            ☰ Menu · {taps} taps{done ? ' · done' : ''}
          </button>
          {open && (
            <div className="proto-sheet" onClick={onToggle}>
              <div className="proto-sheet__card" onClick={(e) => e.stopPropagation()}>
                <div className="proto-text">{taps} taps · {clock(secs)}{done ? ' · end of this flow' : ''}</div>
                <button type="button" className="proto-btn proto-btn--solid" onClick={api.menu}>Back to menu</button>
                <button type="button" className="proto-btn" onClick={api.restart}>Restart this flow</button>
                <Switches hints={hints} onHints={onHints} prefill={prefill} onPrefill={onPrefill} />
              </div>
            </div>
          )}
        </>
      )}
    </ProtoCtx.Consumer>
  )
}
