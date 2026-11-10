import { createContext, useContext } from 'react'
import type { FlowId } from './flows/types'

export type ProtoApi = {
  /** Go to a step of the current flow. */
  go: (step: string) => void
  back: () => void
  /** Jump into another flow (e.g. a safety disclosure inside Ask SAYO). */
  startFlow: (id: FlowId, step?: string) => void
  menu: () => void
  restart: () => void
  /** Count a tap. */
  tap: () => void
  /** The flow reached its end. */
  finish: () => void
  toast: (msg: string) => void
  hints: boolean
  /** true: fields arrive filled. false: they start empty and fill when tapped. */
  prefill: boolean
  /** A step with empty fields hands the shell its "fill everything" action (null when there is nothing to fill). */
  offerFill: (fill: (() => void) | null) => void
  /** true: the shell shows the "Fill in for me" button in its panel, so the step shows no pill over the screen. */
  fillInPanel: boolean
}

export const ProtoCtx = createContext<ProtoApi>({
  go: () => {},
  back: () => {},
  startFlow: () => {},
  menu: () => {},
  restart: () => {},
  tap: () => {},
  finish: () => {},
  toast: () => {},
  hints: true,
  prefill: true,
  offerFill: () => {},
  fillInPanel: false,
})

export const useProto = () => useContext(ProtoCtx)
