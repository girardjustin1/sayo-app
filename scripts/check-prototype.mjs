/**
 * Walks the clickable prototype the way a tester would and proves it has no dead ends.
 *  1. Every step of every flow: loads it directly and reports tap rules that match nothing.
 *  2. The main path of every flow: taps the primary glowing control (or waits for an
 *     auto-advance) from the start until the flow reports "done", and prints the path.
 * Usage: node scripts/check-prototype.mjs [flow …] [--url=http://localhost:5340] [--dir=clay]
 * Needs playwright-core and a local Chrome; `pnpm dev` must be running.
 */
import { chromium } from 'playwright-core'

const args = process.argv.slice(2)
const opt = (k, d) => (args.find((a) => a.startsWith(`--${k}=`)) ?? `--${k}=${d}`).split('=').slice(1).join('=')
const url = opt('url', 'http://localhost:5340').replace(/\/$/, '')
const dir = opt('dir', 'clay')
const only = args.filter((a) => !a.startsWith('--'))

const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' })
const ctx = await browser.newContext({ viewport: { width: 1440, height: 950 } })
await ctx.addInitScript((d) => { localStorage.setItem('sayo-proto-direction', d); localStorage.setItem('sayo-proto-hints', 'on') }, dir)
const page = await ctx.newPage()
const errors = []
page.on('pageerror', (e) => errors.push(String(e).slice(0, 200)))

// The flow list comes from the app itself (menu cards + each flow's Jump-to list).
await page.goto(`${url}/#/`); await page.waitForTimeout(1200)
const menu = await page.$$eval('[aria-label^="Start: "]', (els) => els.length)
const state = () => page.evaluate(() => { const d = document.querySelector('.proto-device'); return { flow: d?.dataset.protoFlow, step: d?.dataset.protoStep, done: d?.dataset.protoDone === 'true', unmatched: document.querySelector('[data-proto-unmatched]')?.getAttribute('data-proto-unmatched') ?? '', auto: !!document.querySelector('[data-proto-auto]'), primary: !!document.querySelector('[data-hot-primary]'), blank: (d?.innerText ?? '').trim().length < 20 } })
const stepsOf = async (flow) => {
  await page.goto(`${url}/#/${flow}`); await page.reload(); await page.waitForTimeout(900)
  return page.evaluate(() => { const side = [...document.querySelectorAll('.proto-jump button')].map((b) => b.textContent); const sel = [...document.querySelectorAll('.proto-select option')].map((o) => o.value); return { titles: side, ids: sel } })
}

let problems = 0
const flows = only.length ? only : ['ask', 'circle', 'safety', 'pro', 'admin']
console.log(`menu shows ${menu} flows; checking ${flows.join(', ')} in ${dir}\n`)

for (const flow of flows) {
  // 1. main path
  await page.goto(`${url}/#/${flow}`); await page.reload(); await page.waitForTimeout(1000)
  const path = []; const seen = new Set(); let end = 'stuck'
  for (let i = 0; i < 80; i++) {
    const s = await state()
    if (!path.length || path.at(-1) !== s.step) path.push(s.step)
    if (s.done) { end = 'done'; break }
    if (seen.has(s.step) && !s.auto) { end = `loop at ${s.step}`; break }
    seen.add(s.step)
    if (s.primary) { await page.click('[data-hot-primary]', { force: true }); await page.waitForTimeout(350) }
    else if (s.auto) await page.waitForTimeout(700)
    else { end = `dead end at ${s.step}`; break }
  }
  const ok = end === 'done'
  if (!ok) problems++
  console.log(`${ok ? 'OK ' : 'BAD'} ${flow}: main path ${path.length} steps → ${end}\n    ${path.join(' → ')}`)

  // 2. every step, loaded directly
  const ids = await page.evaluate(async () => (await import('/src/prototype/flows/index.ts')).FLOWS.map((f) => [f.id, f.steps.map((s) => s.id)])).catch(() => null)
  const stepIds = ids ? (ids.find(([id]) => id === flow)?.[1] ?? []) : (await stepsOf(flow)).ids
  const notOnPath = stepIds.filter((s) => !path.includes(s))
  for (const step of stepIds) {
    await page.goto(`${url}/#/${flow}/${step}`); await page.waitForTimeout(450)
    const s = await state()
    if (s.unmatched || s.blank) { problems++; console.log(`    BAD step ${step}: ${s.blank ? 'blank screen' : 'rules match nothing: ' + s.unmatched}`) }
  }
  console.log(`    ${stepIds.length} steps loaded directly${notOnPath.length ? `; side paths: ${notOnPath.join(', ')}` : ''}\n`)
}
if (errors.length) { problems += errors.length; console.log('page errors:\n  ' + [...new Set(errors)].join('\n  ')) }
console.log(problems ? `RESULT: ${problems} problem(s)` : 'RESULT: all clear')
await browser.close()
process.exit(problems ? 1 : 0)
