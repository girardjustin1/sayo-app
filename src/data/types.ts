export type CareDecision = 'none' | 'routine' | 'urgent'
export type ServiceCategory = 'sexual_health' | 'hiv' | 'general' | 'mental_health' | 'substance' | 'gbv' | 'other'
export type CaseStatus = 'draft' | 'queued' | 'in_review' | 'answered' | 'closed'
export type Topic = 'sexual_health' | 'hiv_sti' | 'prep_pep' | 'contraception' | 'pregnancy' | 'substance' | 'gbv' | 'consent' | 'mental' | 'general'

export interface ChatTurn {
  from: 'user' | 'ai' | 'system'
  text: string
  /** Quick-reply chips offered after an AI turn. */
  options?: string[]
}

export interface Concern {
  id: string
  topic: Topic
  /** The user's first message, verbatim. */
  originalMessage: string
  followUps: { q: string; a: string }[]
  summary: string
  redFlags: string[]
  createdAt: string
}

export interface ReviewCase {
  id: string
  concern: Concern
  status: CaseStatus
  ageBand: '18–20' | '21–24' | '25–29'
  sentAt: string
  waitingFor: string
  acceptedBy?: string
  acceptedAt?: string
  answeredAt?: string
  response?: {
    thoughts: string
    decision: CareDecision
    category?: ServiceCategory
    professional: string
    profession: string
  }
}

export interface Service {
  id: string
  name: string
  type: string
  categories: ServiceCategory[]
  area: string
  distanceKm: number
  hours: string
  phone: string
  verified: boolean
  youthFriendly?: boolean
}

export interface CirclePost {
  id: string
  author: string
  topic: Topic
  title: string
  body: string
  ago: string
  reactions: { support: number; same: number; thanks: number }
  replies: CircleReply[]
  reported?: boolean
}

export interface CircleReply {
  id: string
  author: string
  body: string
  ago: string
  professional?: { profession: string }
}

export interface Professional {
  id: string
  name: string
  profession: string
  jurisdiction: string
  licence: string
  expertise: string[]
  status: 'pending' | 'approved' | 'suspended' | 'rejected'
  canReviewRealCases: boolean
  reviewsDone: number
}
