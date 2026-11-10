import { askFlow } from './ask'
import { circleFlow } from './circle'
import { safetyFlow } from './safety'
import { proFlow } from './pro'
import { adminFlow } from './admin'
import type { Flow, FlowId } from './types'

/** Every clickable flow, in menu order. */
export const FLOWS: Flow[] = [askFlow, circleFlow, safetyFlow, proFlow, adminFlow]
export const flowById = (id: FlowId) => FLOWS.find((f) => f.id === id)!
export type { Flow, FlowId, FlowStep } from './types'
