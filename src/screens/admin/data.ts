/**
 * SAMPLE DATA ONLY for the admin console. Every report, post, person and number is
 * fictional. Metrics are de-identified pilot counts for layout.
 */
import type { Topic } from '../../data/types'

export type ReportReason =
  | 'danger'
  | 'victim_blaming'
  | 'identifies_survivor'
  | 'names_perpetrator'
  | 'threat'
  | 'harmful_health'
  | 'personal_info'
  | 'harassment'
  | 'spam'

export const REASON_LABEL: Record<ReportReason, string> = {
  danger: 'Someone may be in danger',
  victim_blaming: 'Victim blaming',
  identifies_survivor: 'Could identify a survivor',
  names_perpetrator: 'Names an alleged perpetrator',
  threat: 'Threat or intimidation',
  harmful_health: 'Wrong or harmful health info',
  personal_info: 'Shares contact or personal details',
  harassment: 'Harassment or bullying',
  spam: 'Spam or advertising',
}

/** GBV-sensitive reasons: reviewed first, by trained moderators, with the safety lead copied. */
export const GBV_SENSITIVE: ReportReason[] = ['danger', 'victim_blaming', 'identifies_survivor', 'names_perpetrator', 'threat']

export interface Report extends Record<string, unknown> {
  id: string
  postAuthor: string
  topic: Topic
  kind: 'post' | 'reply'
  excerpt: string
  /** One entry per reporter (reporters are never shown by name). */
  reasons: ReportReason[]
  firstReported: string
  ageMinutes: number
  /** Auto-hidden pending review (applies to "Someone may be in danger"). */
  hidden?: boolean
  priorStrikes: number
}

export const REPORTS: Report[] = [
  {
    id: 'MR-118', postAuthor: 'nightowl_77', topic: 'gbv', kind: 'reply',
    excerpt: 'Why were you even at his place that late? Girls need to be more careful, then this wouldn’t happen.',
    reasons: ['victim_blaming', 'victim_blaming', 'harassment'], firstReported: 'Today, 10:42 am', ageMinutes: 48, priorStrikes: 1,
  },
  {
    id: 'MR-119', postAuthor: 'quiet_rain', topic: 'gbv', kind: 'post',
    excerpt: 'He said if I tell anyone he will come to my hostel again. I don’t feel safe tonight and I don’t know who to call.',
    reasons: ['danger'], firstReported: 'Today, 11:05 am', ageMinutes: 25, hidden: true, priorStrikes: 0,
  },
  {
    id: 'MR-117', postAuthor: 'kwame_fan_01', topic: 'consent', kind: 'reply',
    excerpt: 'Everyone at [school name] knows it was [full name] who did it to her. Somebody should expose him.',
    reasons: ['names_perpetrator', 'identifies_survivor'], firstReported: 'Today, 8:15 am', ageMinutes: 195, priorStrikes: 0,
  },
  {
    id: 'MR-116', postAuthor: 'naturalcure.gh', topic: 'hiv_sti', kind: 'reply',
    excerpt: 'You don’t need PEP, just drink this herbal mix for 3 days and it flushes everything out. DM me to order.',
    reasons: ['harmful_health', 'harmful_health', 'spam', 'harmful_health'], firstReported: 'Yesterday, 9:30 pm', ageMinutes: 14 * 60 + 20, priorStrikes: 2,
  },
  {
    id: 'MR-115', postAuthor: 'sunny_side', topic: 'contraception', kind: 'post',
    excerpt: 'Add me on WhatsApp 024 000 0000 if you want to talk about the implant privately',
    reasons: ['personal_info'], firstReported: 'Yesterday, 4:02 pm', ageMinutes: 19 * 60 + 40, priorStrikes: 0,
  },
]

export interface ModLogEntry {
  at: string
  who: string
  action: string
  target: string
}

export const MOD_LOG: ModLogEntry[] = [
  { at: 'Today, 9:12 am', who: 'Akosua B.', action: 'Removed content', target: 'MR-114 · Harassment or bullying' },
  { at: 'Yesterday, 6:40 pm', who: 'Akosua B.', action: 'Kept · no rule broken', target: 'MR-113 · Wrong or harmful health info' },
  { at: 'Yesterday, 2:05 pm', who: 'Yaw T.', action: 'Suspended user for 7 days', target: 'MR-111 · Threat or intimidation' },
]

/** Cases in the professional queue, as the admin monitor sees them. No case content. */
export interface WaitingCase extends Record<string, unknown> {
  id: string
  topic: Topic
  waitingMinutes: number
  redFlag: boolean
  assignee?: string
  releasedCount: number
}

export const WAITING: WaitingCase[] = [
  { id: 'R-2079', topic: 'gbv', waitingMinutes: 41 * 60 + 15, redFlag: true, releasedCount: 2 },
  { id: 'R-2087', topic: 'substance', waitingMinutes: 33 * 60 + 40, redFlag: false, releasedCount: 0 },
  { id: 'R-2086', topic: 'gbv', waitingMinutes: 26 * 60 + 10, redFlag: true, releasedCount: 1 },
  { id: 'R-2085', topic: 'pregnancy', waitingMinutes: 17 * 60 + 5, redFlag: false, releasedCount: 0 },
  { id: 'R-2083', topic: 'mental', waitingMinutes: 14 * 60, redFlag: false, assignee: 'Nurse Abena K.', releasedCount: 0 },
  { id: 'R-2084', topic: 'contraception', waitingMinutes: 190, redFlag: false, assignee: 'Dr. Efua M.', releasedCount: 0 },
  { id: 'R-2081', topic: 'sexual_health', waitingMinutes: 105, redFlag: false, releasedCount: 0 },
  { id: 'R-2089', topic: 'hiv_sti', waitingMinutes: 95, redFlag: true, releasedCount: 0 },
  { id: 'R-2082', topic: 'prep_pep', waitingMinutes: 25, redFlag: true, releasedCount: 0 },
]

/** Draft thresholds: to be agreed with the clinical lead. */
export const THRESHOLDS = { redFlagMinutes: 2 * 60, warnMinutes: 12 * 60, overdueMinutes: 24 * 60 }

/** Rows for the analytics/export page. Values for the selected period (sample). */
export const METRIC_ROWS = [
  { key: 'users', label: 'Total users', value: '214', definition: 'Accounts that completed onboarding (18+ confirmed).' },
  { key: 'concerns', label: 'Concerns submitted', value: '386', definition: 'Ask SAYO conversations that reached a summary.' },
  { key: 'requested', label: 'Professional reviews requested', value: '141', definition: 'Users who said yes to a professional review.' },
  { key: 'completed', label: 'Professional reviews completed', value: '118', definition: 'Reviews sent to the user.' },
  { key: 'response', label: 'Average response time', value: '5.2 h', definition: 'Sent for review → completed. Median shown in the CSV.' },
  { key: 'urgent', label: 'Urgent assessment share', value: '14%', definition: 'Completed reviews marked "Yes, urgent assessment".' },
  { key: 'referrals', label: 'Referrals recommended', value: '47', definition: 'Reviews with a service category.' },
  { key: 'circle', label: 'Circle activity', value: '263 posts', definition: 'New posts. Replies and reactions are in the CSV.' },
  { key: 'features', label: 'Feature usage', value: '4 features', definition: 'Users opening Ask, Reviews, Find Care and the Circle.' },
  { key: 'satisfaction', label: 'Satisfaction', value: '4.4 / 5', definition: 'Optional rating after a review (n = 63).' },
] as const
