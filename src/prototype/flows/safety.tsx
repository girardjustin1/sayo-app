import type { Flow } from './types'

/** Placeholder until this flow is wired. */
export const safetyFlow: Flow = {
  id: 'safety',
  title: 'Safety flow',
  short: 'Coming next',
  blurb: 'This flow is being wired.',
  who: 'Young woman',
  device: 'phone',
  start: 'soon',
  steps: [{ id: 'soon', title: 'Coming next', render: () => <div style={{ display: 'grid', placeItems: 'center', height: '100%', padding: 24, textAlign: 'center' }}>This flow is being wired.</div> }],
  tests: [],
}
