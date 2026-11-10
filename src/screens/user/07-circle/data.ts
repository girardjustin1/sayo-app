/**
 * SAMPLE DATA ONLY for the Circle. Every nickname, post and reply is fictional.
 * Peer posts are written to show tone and layout; any health wording in a professional
 * reply is placeholder copy that the SAYO clinical lead must review before real use.
 */
import { CIRCLE_POSTS, USER } from '../../../data/fixtures'
import type { CircleReply, Topic } from '../../../data/types'

export type CircleTopic = 'sexual_health' | 'hiv_sti' | 'contraception' | 'relationships' | 'consent' | 'substance' | 'mental' | 'gbv'

export const CIRCLE_TOPICS: { id: CircleTopic; label: string }[] = [
  { id: 'sexual_health', label: 'Sexual health' },
  { id: 'hiv_sti', label: 'HIV & STIs' },
  { id: 'contraception', label: 'Contraception' },
  { id: 'relationships', label: 'Relationships' },
  { id: 'consent', label: 'Consent' },
  { id: 'substance', label: 'Substance use' },
  { id: 'mental', label: 'Mental wellbeing' },
  { id: 'gbv', label: 'GBV & safety' },
]
export const topicLabel = (t: CircleTopic) => CIRCLE_TOPICS.find((x) => x.id === t)!.label

export interface FeedPost {
  id: string
  author: string
  topic: CircleTopic
  title: string
  body: string
  ago: string
  replies: CircleReply[]
  /** Removed by moderators: the feed shows a placeholder instead. */
  removed?: boolean
}

const FROM_FIXTURE: Record<Topic, CircleTopic> = {
  sexual_health: 'sexual_health', hiv_sti: 'hiv_sti', prep_pep: 'relationships', contraception: 'contraception', pregnancy: 'sexual_health',
  substance: 'substance', gbv: 'gbv', consent: 'consent', mental: 'mental', general: 'sexual_health',
}

const fixturePosts: FeedPost[] = CIRCLE_POSTS.map((p) => ({ id: p.id, author: p.author, topic: FROM_FIXTURE[p.topic], title: p.title, body: p.body, ago: p.ago, replies: p.replies }))

/** The p1 thread (posted by someone else here), with more peer replies so it reads peer-led, plus one professional. */
export const THREAD: FeedPost = {
  ...fixturePosts[0],
  author: 'mango_seed',
  replies: [
    fixturePosts[0].replies[0],
    { id: 'r3', author: 'kente_heart', body: 'Same fear here. What helped me was saying “I’m doing it for me too”, so it wasn’t about him at all.', ago: '1h' },
    fixturePosts[0].replies[1],
    { id: 'r4', author: 'ama.blue', body: 'If he gets upset about it, that tells you something too. You deserve someone who cares about your health.', ago: '30m' },
    { id: 'r5', author: USER.circleName, body: 'We tested on a Saturday at a youth clinic. Took 30 minutes. Proud of you for thinking about it 💛', ago: '12m' },
  ],
}

export const REMOVED_REPLY: CircleReply = { id: 'r-removed', author: '', body: '', ago: '20m' }

export const FEED: FeedPost[] = [
  THREAD,
  fixturePosts[1],
  {
    id: 'p4', author: 'akosua_sky', topic: 'consent', title: 'Is it okay to change your mind halfway?',
    body: 'Something happened last weekend and I keep thinking I “owed” him because I said yes at first. Did I?', ago: '3h',
    replies: [
      { id: 'r6', author: 'quietstorm', body: 'You never owe anyone. A yes can become a no at any point.', ago: '2h' },
    ],
  },
  { id: 'p-removed', author: '', topic: 'relationships', title: '', body: '', ago: '4h', replies: [], removed: true },
  fixturePosts[2],
  {
    id: 'p5', author: 'nightowl_99', topic: 'substance', title: 'Trying to drink less at parties',
    body: 'Everyone in my hostel drinks a lot on weekends. Any tips for saying no without being the boring one?', ago: '1d',
    replies: [],
  },
]

/** The signed-in user's Circle identity. Never linked to Ask SAYO or reviews. */
export const ME = { nickname: USER.circleName, suggestions: ['quiet_mango', 'river_sunbird', 'kente_bloom'] }

/** Report reasons. "Someone may be in danger" goes to the safety team, not only moderation. */
export const REPORT_REASONS = [
  { id: 'victim_blaming', label: 'Victim blaming', help: 'Blaming someone for harm that was done to them.' },
  { id: 'identifies', label: 'Identifies someone', help: 'A real name, photo, school, workplace, phone number or location that could identify a person.' },
  { id: 'names_perpetrator', label: 'Names an alleged perpetrator', help: 'Naming or describing someone as an abuser. This can put survivors at risk; support services can help instead.' },
  { id: 'threats', label: 'Threats or harassment', help: 'Threatening, bullying or targeting someone.' },
  { id: 'graphic', label: 'Graphic or disturbing', help: 'Graphic descriptions of violence, self-harm or sexual content.' },
  { id: 'unsafe_advice', label: 'Wrong or harmful health info', help: 'Unsafe medical or legal advice, or myths that could hurt someone.' },
  { id: 'danger', label: 'Someone may be in danger', help: 'Goes straight to the SAYO safety team as well as moderators.' },
  { id: 'spam', label: 'Spam or selling', help: 'Adverts, links, or trying to move people to another app.' },
] as const
export type ReportReason = (typeof REPORT_REASONS)[number]['id']

/**
 * Looks for details that could identify someone: phone numbers, social handles,
 * "my name is…" style phrases. A prototype heuristic, not a real classifier.
 */
export function findIdentifyingDetails(text: string): string[] {
  const found: string[] = []
  if (/(\+?\d[\d\s-]{7,}\d)/.test(text)) found.push('a phone number')
  if (/(^|\s)@[a-z0-9_.]{3,}/i.test(text)) found.push('a social media handle')
  if (/\b([Mm]y|[Hh]is|[Hh]er|[Tt]heir) name is\s+[A-Z][a-z]+|\b(called|named)\s+[A-Z][a-z]+/.test(text)) found.push('what looks like a real name')
  return found
}
