/**
 * Tap hints (the blue rings) must be paint-only. On every step, in the prototype app, the
 * Storybook click-through and the flow maps, this checks that:
 *  1. no hint sits on a control a person cannot see (Astryx keeps a 1px button inside clickable cards);
 *  2. taking the hint away moves nothing on the screen.
 * Usage: node scripts/check-hints.mjs [app|sb|maps]
 * Needs playwright-core and a local Chrome; `pnpm dev` and `pnpm storybook` must be running.
 */
import { chromium } from 'playwright-core'

const APP = 'http://localhost:5340/', SB = 'http://localhost:6030/'
const STORY = { ask: 'ask-sayo', circle: 'circle', safety: 'safety', pro: 'professional', admin: 'admin' }
const only = process.argv[2]
const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' })
const p = await (await b.newContext({ viewport: { width: 1440, height: 950 } })).newPage()
await p.goto(APP + '#/'); await p.waitForTimeout(1000)
const flows = await p.evaluate(async () => (await import('/src/prototype/flows/index.ts')).FLOWS.map((f) => [f.id, f.steps.map((s) => s.id)]))
const check = (scope) => p.evaluate((scope) => {
  const root = document.querySelector(scope); if (!root) return { missing: true }
  const name = (el) => `${el.tagName.toLowerCase()} "${(el.getAttribute('aria-label') || el.innerText || '').trim().slice(0, 24)}"`
  const hot = [...root.querySelectorAll('[data-hot-auto],[data-hot-soft]')]
  const tiny = hot.filter((el) => el.offsetWidth <= 4 || el.offsetHeight <= 4).map((el) => `${name(el)} ${el.offsetWidth}x${el.offsetHeight}`)
  const els = [...root.querySelectorAll('*')]
  const snap = () => els.map((el) => { const q = el.getBoundingClientRect(); return [q.x, q.y, q.width, q.height] })
  const a = snap()
  const kept = hot.map((el) => [el, el.hasAttribute('data-hot-auto'), el.hasAttribute('data-hot-soft')])
  hot.forEach((el) => { el.removeAttribute('data-hot-auto'); el.removeAttribute('data-hot-soft') })
  const c = snap()
  kept.forEach(([el, au, so]) => { if (au) el.setAttribute('data-hot-auto', ''); if (so) el.setAttribute('data-hot-soft', '') })
  const moved = els.filter((el, i) => a[i].some((v, k) => Math.abs(v - c[i][k]) > 0.5)).map(name)
  return { hot: hot.length, tiny, moved: moved.slice(0, 4), movedN: moved.length }
}, scope)
let bad = 0, n = 0, rings = 0
const report = (where, r) => { n++; if (r.missing) { bad++; return console.log(`${where}: nothing rendered`) } rings += r.hot; if (r.tiny.length || r.movedN) { bad++; console.log(`${where}:${r.tiny.length ? ' ON A HIDDEN CONTROL ' + r.tiny.join(' ; ') : ''}${r.movedN ? ` MOVES ${r.movedN} elements: ` + r.moved.join(' ; ') : ''}`) } }
if (!only || only === 'app') { for (const [flow, steps] of flows) for (const step of steps) { await p.goto(`${APP}#/${flow}/${step}`); await p.waitForTimeout(380); report(`app ${flow}/${step}`, await check('.proto-device')) } console.log(`prototype app: ${n} steps, ${rings} hints, ${bad} problems`) }
if (!only || only === 'sb') { const n0 = n, b0 = bad, r0 = rings
  for (const [flow, steps] of flows) for (const step of steps) { await p.goto(`${SB}iframe.html?id=prototype-click-through--${STORY[flow]}&args=initialStep:${step}&viewMode=story`); await p.waitForSelector('.proto-device', { timeout: 15000 }).catch(() => {}); await p.waitForTimeout(450); report(`storybook ${flow}/${step}`, await check('.proto-device')) }
  console.log(`storybook click-through: ${n - n0} steps, ${rings - r0} hints, ${bad - b0} problems`) }
if (!only || only === 'maps') { const n0 = n, b0 = bad, r0 = rings
  for (const [flow] of flows) { await p.goto(`${SB}iframe.html?id=prototype-flow-maps--${STORY[flow]}&viewMode=story`); await p.waitForSelector('.proto-map', { timeout: 20000 }).catch(() => {}); await p.waitForTimeout(2500); report(`flow map ${flow}`, await check('#storybook-root')) }
  console.log(`flow maps: ${n - n0} pages, ${rings - r0} hints, ${bad - b0} problems`) }
console.log(bad ? `RESULT: ${bad} problems` : 'RESULT: no hint moves or misplaces anything')
await b.close()
