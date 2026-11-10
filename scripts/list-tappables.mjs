/**
 * Lists the tappable elements (label + tag/role) of Storybook stories, in DOM order.
 * Prototype flows route taps by these labels (see src/prototype/hotspots.tsx).
 * Usage: node scripts/list-tappables.mjs <story-id> [<story-id> …] [--dir=clay] [--port=6030]
 * Needs playwright-core and a local Chrome; Storybook must be running.
 */
import { chromium } from 'playwright-core'

const args = process.argv.slice(2)
const opt = (k, d) => (args.find((a) => a.startsWith(`--${k}=`)) ?? `--${k}=${d}`).split('=')[1]
const ids = args.filter((a) => !a.startsWith('--'))
const dir = opt('dir', 'clay'), port = opt('port', '6030')
const TAPPABLE = 'button, a, [role="button"], [role="tab"], [role="switch"], [role="radio"], [role="checkbox"], [role="link"], [role="option"], [role="menuitem"], label, summary'
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' })
const page = await browser.newPage({ viewport: { width: 1340, height: 900 } })
for (const id of ids) {
  await page.goto(`http://localhost:${port}/iframe.html?id=${id}&viewMode=story&globals=direction:${dir}`)
  await page.waitForTimeout(1200)
  const rows = await page.evaluate((sel) => {
    const root = document.querySelector('#storybook-root') ?? document.body
    return [...root.querySelectorAll(sel)].map((el) => {
      const label = (el.getAttribute('aria-label') || el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim()
      return `${(el.getAttribute('role') ?? el.tagName.toLowerCase()).padEnd(8)} ${el.disabled || el.getAttribute('aria-disabled') === 'true' ? '(disabled) ' : ''}${label.slice(0, 90)}`
    })
  }, TAPPABLE)
  console.log(`\n== ${id} (${rows.length})\n` + rows.map((r) => '  ' + r).join('\n'))
}
await browser.close()
