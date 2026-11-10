/**
 * SAMPLE DATA ONLY for the Professional dashboard. Every case, person and time is
 * fictional. Health wording is placeholder copy for layout and has not been
 * clinically reviewed.
 */
import { CASES, CONCERN_DISCHARGE, CONCERN_LOW_MOOD, CONCERN_PEP, PROFESSIONALS } from '../../data/fixtures'
import type { CareDecision, Concern, ReviewCase, ServiceCategory, Topic } from '../../data/types'

export const TOPIC_LABEL: Record<Topic, string> = {
  sexual_health: 'Sexual health',
  hiv_sti: 'HIV & STIs',
  prep_pep: 'PrEP & PEP',
  contraception: 'Contraception',
  pregnancy: 'Pregnancy',
  substance: 'Substance use',
  gbv: 'GBV & sexual violence',
  consent: 'Consent & relationships',
  mental: 'Mental wellbeing',
  general: 'General health',
}

/** A case as the queue sees it. `waitingMinutes` drives sorting and thresholds. */
export interface QueueCase extends Record<string, unknown> {
  id: string
  concern: Concern
  topic: Topic
  ageBand: ReviewCase['ageBand']
  waitingMinutes: number
  status: ReviewCase['status']
  /** Fictional training case: the only kind a foreign-licensed reviewer may open. */
  training?: boolean
  acceptedBy?: string
}

const CONCERN_PILL: Concern = {
  id: 'c-1047',
  topic: 'contraception',
  originalMessage: 'i forgot 2 of my pills this week and we had sex on saturday. am i ok or do i need something',
  followUps: [
    { q: 'Which type of pill do you take, if you know?', a: 'The one with 21 pills then a break' },
    { q: 'Which days did you miss?', a: 'Wednesday and Thursday' },
  ],
  summary: 'Missed two combined pills mid-pack (Wednesday and Thursday). Sex on Saturday. Asking whether she needs emergency contraception.',
  redFlags: [],
  createdAt: 'Today, 7:50 am',
}

const CONCERN_LATE_PERIOD: Concern = {
  id: 'c-1048',
  topic: 'pregnancy',
  originalMessage: 'my period is 9 days late and the test said negative. should i test again',
  followUps: [
    { q: 'When did you take the test?', a: '3 days ago, in the evening' },
    { q: 'Any pain or bleeding?', a: 'No' },
  ],
  summary: 'Period 9 days late. One negative home pregnancy test 3 days ago, taken in the evening. No pain or bleeding.',
  redFlags: [],
  createdAt: 'Yesterday, 6:15 pm',
}

const CONCERN_GBV_HISTORY: Concern = {
  id: 'c-1049',
  topic: 'gbv',
  originalMessage: 'something happened at a party last month and i never told anyone. i keep thinking about whether i should get tested',
  followUps: [
    { q: 'Are you in immediate danger right now?', a: 'No' },
    { q: 'Is it safe for you to continue using this device?', a: 'Yes' },
    { q: 'Have you been tested for HIV or other STIs since then?', a: 'No' },
  ],
  summary: 'Disclosure of a sexual-violence experience about one month ago. Not in immediate danger and the device is safe. Not tested since. Asking about testing.',
  redFlags: ['Sexual-violence disclosure: follow the GBV referral pathway', 'Not tested since the incident'],
  createdAt: 'Yesterday, 10:02 am',
}

const CONCERN_ALCOHOL: Concern = {
  id: 'c-1050',
  topic: 'substance',
  originalMessage: 'i drink most nights now to sleep. is that bad',
  followUps: [{ q: 'About how much do you drink on those nights?', a: 'Maybe half a bottle of wine' }],
  summary: 'Drinking about half a bottle of wine most nights to help her sleep. Asking whether this is harmful.',
  redFlags: [],
  createdAt: '2 days ago, 11:30 pm',
}

const CONCERN_TEST_RESULT: Concern = {
  id: 'c-1051',
  topic: 'hiv_sti',
  originalMessage: 'got a reactive result on a self test. what happens now',
  followUps: [
    { q: 'When did you take the self-test?', a: 'This morning' },
    { q: 'Do you have someone you trust with you?', a: 'My sister knows' },
  ],
  summary: 'Reactive result on an HIV self-test this morning. Her sister knows. Asking about next steps.',
  redFlags: ['Reactive HIV self-test: needs confirmatory testing and linkage to care'],
  createdAt: 'Today, 11:12 am',
}

/** The queue a Ghana-licensed reviewer sees. Real-case data is still fictional here. */
export const QUEUE: QueueCase[] = [
  { id: 'R-2082', concern: CONCERN_PEP, topic: 'prep_pep', ageBand: '21–24', waitingMinutes: 25, status: 'queued' },
  { id: 'R-2089', concern: CONCERN_TEST_RESULT, topic: 'hiv_sti', ageBand: '25–29', waitingMinutes: 95, status: 'queued' },
  { id: 'R-2084', concern: CONCERN_PILL, topic: 'contraception', ageBand: '18–20', waitingMinutes: 190, status: 'queued' },
  { id: 'R-2086', concern: CONCERN_GBV_HISTORY, topic: 'gbv', ageBand: '21–24', waitingMinutes: 26 * 60 + 10, status: 'queued' },
  { id: 'R-2085', concern: CONCERN_LATE_PERIOD, topic: 'pregnancy', ageBand: '18–20', waitingMinutes: 17 * 60 + 5, status: 'queued' },
  { id: 'R-2087', concern: CONCERN_ALCOHOL, topic: 'substance', ageBand: '25–29', waitingMinutes: 33 * 60 + 40, status: 'queued' },
  { id: 'R-2083', concern: CONCERN_LOW_MOOD, topic: 'mental', ageBand: '21–24', waitingMinutes: 14 * 60, status: 'in_review', acceptedBy: 'Nurse Abena K.' },
  { id: 'R-2088', concern: { ...CONCERN_DISCHARGE, id: 'c-1052' }, topic: 'sexual_health', ageBand: '18–20', waitingMinutes: 2 * 60 + 20, status: 'in_review', acceptedBy: 'Dr. Efua M.' },
]

/** Fictional training cases, the only cases a foreign-licensed reviewer can open. */
export const TRAINING_QUEUE: QueueCase[] = [
  { id: 'T-0012', concern: { ...CONCERN_DISCHARGE, id: 't-12' }, topic: 'sexual_health', ageBand: '18–20', waitingMinutes: 0, status: 'queued', training: true },
  { id: 'T-0013', concern: { ...CONCERN_PEP, id: 't-13' }, topic: 'prep_pep', ageBand: '21–24', waitingMinutes: 0, status: 'queued', training: true },
  { id: 'T-0014', concern: { ...CONCERN_PILL, id: 't-14' }, topic: 'contraception', ageBand: '18–20', waitingMinutes: 0, status: 'queued', training: true },
  { id: 'T-0015', concern: { ...CONCERN_LOW_MOOD, id: 't-15' }, topic: 'mental', ageBand: '25–29', waitingMinutes: 0, status: 'queued', training: true },
]

export const ME = PROFESSIONALS[0] // Dr. Efua M., Ghana-licensed
export const FOREIGN_ME = PROFESSIONALS[2] // Dr. Grace O., UK-licensed

/** Minutes → "25 min", "3 h 10 min", "1 d 9 h". */
export function formatWait(min: number): string {
  if (min < 60) return `${min} min`
  if (min < 24 * 60) {
    const h = Math.floor(min / 60)
    const m = min % 60
    return m ? `${h} h ${m} min` : `${h} h`
  }
  const d = Math.floor(min / (24 * 60))
  const h = Math.floor((min % (24 * 60)) / 60)
  return h ? `${d} d ${h} h` : `${d} d`
}

/** One row of the completed-reviews history. */
export interface CompletedCase extends Record<string, unknown> {
  id: string
  topic: Topic
  ageBand: ReviewCase['ageBand']
  decision: CareDecision
  category?: ServiceCategory
  sentAt: string
  acceptedAt: string
  completedAt: string
  responseMinutes: number
}

export const HISTORY: CompletedCase[] = [
  { id: 'R-2081', sentAt: 'Today, 2:20 pm', topic: 'sexual_health', ageBand: '18–20', decision: 'routine', category: 'sexual_health', acceptedAt: 'Today, 4:05 pm', completedAt: 'Today, 4:31 pm', responseMinutes: 131 },
  { id: 'R-2074', sentAt: 'Yesterday, 7:48 am', topic: 'prep_pep', ageBand: '21–24', decision: 'urgent', category: 'hiv', acceptedAt: 'Yesterday, 8:12 am', completedAt: 'Yesterday, 8:40 am', responseMinutes: 52 },
  { id: 'R-2069', sentAt: '7 Nov, 12:19 pm', topic: 'contraception', ageBand: '18–20', decision: 'none', acceptedAt: '7 Nov, 3:20 pm', completedAt: '7 Nov, 3:44 pm', responseMinutes: 205 },
  { id: 'R-2061', sentAt: '6 Nov, 4:15 am', topic: 'mental', ageBand: '25–29', decision: 'routine', category: 'mental_health', acceptedAt: '6 Nov, 10:02 am', completedAt: '6 Nov, 10:35 am', responseMinutes: 380 },
  { id: 'R-2057', sentAt: '5 Nov, 8:44 pm', topic: 'gbv', ageBand: '21–24', decision: 'urgent', category: 'gbv', acceptedAt: '5 Nov, 9:15 pm', completedAt: '5 Nov, 9:58 pm', responseMinutes: 74 },
  { id: 'R-2049', sentAt: '4 Nov, 9:09 am', topic: 'hiv_sti', ageBand: '21–24', decision: 'routine', category: 'sexual_health', acceptedAt: '4 Nov, 1:10 pm', completedAt: '4 Nov, 1:29 pm', responseMinutes: 260 },
]

/** The answered fixture case, used for the audit and completed-case views. */
export const ANSWERED_CASE = CASES[0]

/** Reasons a reviewer can give for releasing a case. Wording to be confirmed with the clinical lead. */
export const RELEASE_REASONS = [
  { value: 'competence', label: 'Outside my area of competence', description: 'Another reviewer with the right expertise should take it.' },
  { value: 'conflict', label: 'Possible conflict of interest', description: 'For example, details suggest I may know this person.' },
  { value: 'capacity', label: 'I cannot respond in good time', description: 'Release it so it does not keep waiting.' },
  { value: 'in_person', label: 'Needs in-person care, not a written review', description: 'Flag for an admin to follow up with safe referral information.' },
  { value: 'other', label: 'Other reason', description: 'Please add a short note.' },
] as const
