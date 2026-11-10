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
})

export const useProto = () => useContext(ProtoCtx)
