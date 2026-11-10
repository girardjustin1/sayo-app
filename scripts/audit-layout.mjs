/**
 * Layout audit: opens every story in a running Storybook and reports
 *  - spill:  text extending outside the nearest box that has a background, border or radius
 *  - corner: text sitting inside a rounded corner's curve (radius bigger than its inset)
 *  - offscreen: elements wider than the phone / viewport
 *  - clipped: scrolling/hidden containers whose content is cut horizontally
 * Usage: node scripts/audit-layout.mjs [prefix=user-] [direction=sister] [port=6030]
 * Needs playwright-core and a local Chrome.
 */
import { chromium } from 'playwright-core'

const [prefix = 'user-', dir = 'sister', port = '6030'] = process.argv.slice(2)
const base = `http://localhost:${port}`
const index = await (await fetch(`${base}/index.json`)).json()
const ids = Object.values(index.entries).filter((e) => e.type === 'story' && e.id.startsWith(prefix)).map((e) => e.id)
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' })
const page = await browser.newPage({ viewport: { width: 1340, height: 900 } })
let total = 0
for (const id of ids) {
  await page.goto(`${base}/iframe.html?id=${id}&viewMode=story&globals=direction:${dir}`)
  await page.waitForTimeout(900)
  const issues = await page.evaluate(() => {
    const out = []
    const label = (el) => (el.className && typeof el.className === 'string' ? el.className.split(' ')[0] : el.tagName.toLowerCase())
    const boxed = (el) => {
      for (let a = el.parentElement; a; a = a.parentElement) {
        const s = getComputedStyle(a)
        const bg = s.backgroundColor !== 'rgba(0, 0, 0, 0)' || s.backgroundImage !== 'none'
        if ((bg || parseFloat(s.borderTopWidth) > 0 || s.boxShadow.includes('inset')) && a.getBoundingClientRect().width < 420) return a
      }
      return null
    }
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      if (!n.textContent.trim()) continue
      const el = n.parentElement
      if (!el || getComputedStyle(el).visibility === 'hidden') continue
      // ignore intentional horizontal scrollers and visually-hidden text
      let skip = false
      for (let a = el; a; a = a.parentElement) {
        const s = getComputedStyle(a)
        if (s.overflowX === 'auto' || s.overflowX === 'scroll') { skip = true; break }
        if (s.clip === 'rect(0px, 0px, 0px, 0px)' || s.clipPath === 'inset(50%)' || (a.getBoundingClientRect().width <= 1)) { skip = true; break }
      }
      if (skip) continue
      const r = document.createRange(); r.selectNodeContents(n)
      const rects = [...r.getClientRects()].filter((x) => x.width > 0)
      if (!rects.length) continue
      const box = boxed(el); if (!box) continue
      const b = box.getBoundingClientRect(); const s = getComputedStyle(box)
      const rad = Math.max(parseFloat(s.borderTopLeftRadius) || 0, parseFloat(s.borderBottomRightRadius) || 0)
      for (const t of rects) {
        if (t.left < b.left - 1 || t.right > b.right + 1 || t.top < b.top - 1 || t.bottom > b.bottom + 1) {
          out.push(`spill: "${n.textContent.trim().slice(0, 40)}" outside .${label(box)}`); break
        }
        const inset = Math.min(t.left - b.left, b.right - t.right)
        const vin = Math.min(t.top - b.top, b.bottom - t.bottom)
        if (rad >= 14 && inset < rad * 0.29 && vin < rad * 0.29) { out.push(`corner: "${n.textContent.trim().slice(0, 40)}" in ${rad}px corner of .${label(box)}`); break }
      }
    }
    for (const el of document.querySelectorAll('.sayo-screen *')) {
      const s = getComputedStyle(el)
      if ((s.overflowX === 'hidden' || s.overflowX === 'auto') && el.clientWidth > 4 && el.scrollWidth > el.clientWidth + 2 && !el.classList.contains('sayo-chip-row') && s.overflowX !== 'auto')
        out.push(`clipped: .${label(el)} ${el.scrollWidth}>${el.clientWidth}`)
    }
    const phone = document.querySelector('.sayo-screen')
    if (phone) {
      const pr = phone.getBoundingClientRect()
      for (const el of phone.querySelectorAll('*')) {
        const r = el.getBoundingClientRect()
        if (r.width && r.right > pr.right + 1 && getComputedStyle(el.parentElement).overflowX === 'visible' && ![...(function* () { for (let a = el.parentElement; a && a !== phone; a = a.parentElement) yield getComputedStyle(a).overflowX })()].some((o) => o === 'auto' || o === 'scroll')) { out.push(`offscreen: .${label(el)}`); break }
      }
    }
    return [...new Set(out)].slice(0, 8)
  })
  if (issues.length) { total += issues.length; console.log(`\n${id}\n  ` + issues.join('\n  ')) }
}
console.log(`\n${ids.length} stories checked (${prefix}*, ${dir}); ${total} issues`)
await browser.close()
