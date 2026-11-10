import type { ReactNode } from 'react'

export type FlowId = 'ask' | 'circle' | 'safety' | 'pro' | 'admin'

export interface FlowStep {
  id: string
  /** Shown in the "Jump to" list. */
  title: string
  render: () => ReactNode
}

export interface Flow {
  id: FlowId
  title: string
  /** One line for cards. */
  short: string
  blurb: string
  who: 'Young woman' | 'Verified professional' | 'Admin'
  device: 'phone' | 'desktop'
  start: string
  steps: FlowStep[]
  /** What this prototype is meant to test with real people. */
  tests: string[]
}
