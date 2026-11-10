import { Fragment } from 'react'
import type { Flow } from './types'

/** Renders one step of a flow (falls back to the first step for an unknown id). */
export const renderStep = (flow: Flow, id: string) => {
  const step = flow.steps.find((s) => s.id === id) ?? flow.steps[0]
  return <Fragment key={step.id}>{step.render()}</Fragment>
}
