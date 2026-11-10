import type { Decorator, Preview } from '@storybook/react-vite'
import '../src/styles/global.css'
import { DirectionProvider } from '../src/brand/DirectionContext'
import type { DirectionId } from '../src/brand/directions'

/**
 * parameters.frame:
 *   'phone' (default) — 390 × 844 device, for every user-app screen
 *   'desktop'         — 1280-wide browser window, for Professional and Admin
 *   'none'            — plain padded canvas (components)
 *   'raw'             — no wrapper (comparison pages that render all directions)
 */
const withDirection: Decorator = (Story, ctx) => {
  const id = (ctx.globals.direction ?? 'clay') as DirectionId
  const frame = ctx.parameters.frame ?? 'phone'
  if (frame === 'raw') return <Story />
  if (frame === 'none')
    return (
      <DirectionProvider id={id}>
        <div style={{ minHeight: '100vh', padding: 24, background: 'var(--color-background-body)' }}>
          <Story />
        </div>
      </DirectionProvider>
    )
  if (frame === 'desktop')
    return (
      <div style={{ minHeight: '100vh', padding: 24, background: '#ECEAF0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', borderRadius: 12, overflow: 'hidden', boxShadow: '0 20px 60px rgb(0 0 0 / 0.18)', background: '#fff' }}>
          <div style={{ height: 36, background: '#F4F3F6', display: 'flex', alignItems: 'center', gap: 6, padding: '0 14px', borderBottom: '1px solid #E4E2E8' }}>
            {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => <span key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />)}
            <span style={{ marginLeft: 16, fontSize: 12, color: '#6B6875', fontFamily: 'system-ui' }}>pro.sayo.health (sample)</span>
          </div>
          <div style={{ height: 820 }}>
            <DirectionProvider id={id}>
              <Story />
            </DirectionProvider>
          </div>
        </div>
      </div>
    )
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24, background: '#EFEAF0' }}>
      <div
        style={{
          width: 390, height: 844, borderRadius: 52, overflow: 'hidden', position: 'relative',
          boxShadow: '0 0 0 10px #1d1b22, 0 0 0 11px #3a3742, 0 30px 80px rgb(40 10 40 / 0.35)',
          transform: 'translateZ(0)',
        }}
      >
        <DirectionProvider id={id}>
          <Story />
        </DirectionProvider>
        <div style={{ position: 'absolute', top: 11, left: '50%', translate: '-50% 0', width: 120, height: 34, borderRadius: 20, background: '#000', zIndex: 60 }} />
        <div style={{ position: 'absolute', bottom: 8, left: '50%', translate: '-50% 0', width: 134, height: 5, borderRadius: 3, background: 'rgb(0 0 0 / 0.55)', zIndex: 60 }} />
      </div>
    </div>
  )
}

const preview: Preview = {
  decorators: [withDirection],
  globalTypes: {
    direction: {
      description: 'Brand direction',
      toolbar: {
        title: 'Direction',
        icon: 'paintbrush',
        items: [
          { value: 'ink', title: 'D · Ink (ink + coral)' },
          { value: 'clay', title: 'E · Clay (clay + marigold)' },
          { value: 'quiet', title: 'F · Quiet (neutral)' },
          { value: 'grove', title: 'G · Grove (Hers-inspired)' },
          { value: 'sister', title: 'A · Big Sister (round 1, pink)' },
          { value: 'clear', title: 'B · Clear Care (round 1, pink)' },
          { value: 'unmuted', title: 'C · Unmuted (round 1, pink)' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { direction: 'clay' },
  parameters: {
    layout: 'fullscreen',
    controls: { expanded: true },
    options: {
      storySort: {
        order: [
          'Start Here',
          'Prototype',
          ['Click-through', 'Flow maps'],
          'Brand',
          ['Logo', 'Round 2 (current)', ['About this round', 'Directions & tokens', 'Imagery', 'Landing page'], 'Round 1 (pink)', ['About this round', 'Directions & tokens', 'Imagery 1 (first pass)', 'Imagery 2 (six approaches)']],
          'Components',
          'User',
          ['01 Onboarding', '02 Home', '03 Ask SAYO', '04 Safety', '05 Reviews', '06 Find Care', '07 Circle', '08 Me & Privacy'],
          'Professional',
          'Admin',
          'Research',
          'Planning',
        ],
      },
    },
  },
}
export default preview
