/**
 * SAMPLE DATA ONLY for Ask SAYO (03) and Safety (04). Fictional.
 *
 * Health and safety wording here is DRAFT. Anything marked `signOff` must be
 * reviewed by the SAYO clinical lead (and, for legal points, the lawyer) before
 * real use. Timings, phone numbers and pathways must be checked for Ghana.
 */
import type { DirectionId } from '../../../brand/directions'
import type { ChatTurn, Topic } from '../../../data/types'
import { CONCERN_PEP, INTAKE_CHAT, SERVICES } from '../../../data/fixtures'

/* ------------------------------------------------------------ voice copy */

/** Extra Ask SAYO voice copy per direction (not locked; tone only). */
export const ASK_COPY: Record<DirectionId, {
  openerHint: string
  freeTextHint: string
  thanks: string
  basicInfoNext: string
  notNowTitle: string
  notNowBody: string
  sentTitle: string
  offlineTitle: string
}> = {
  sister: {
    openerHint: 'Say it however it comes out, or pick a topic to start.',
    freeTextHint: 'Take your time. I keep your exact words.',
    thanks: 'Thank you for telling me.',
    basicInfoNext: 'Next, let’s check I got your story right.',
    notNowTitle: 'That’s completely okay',
    notNowBody: 'You’re in charge here. Your conversation stays private behind your PIN.',
    sentTitle: 'Sent. You did the hard part.',
    offlineTitle: 'You’re offline right now',
  },
  clear: {
    openerHint: 'Describe it in your own words, or choose a topic.',
    freeTextHint: 'SAYO keeps your exact words. Write as much or as little as you like.',
    thanks: 'Thank you for explaining.',
    basicInfoNext: 'Next, please check the summary of what you told SAYO.',
    notNowTitle: 'No professional review',
    notNowBody: 'Your conversation stays private and locked with your PIN.',
    sentTitle: 'Sent for review',
    offlineTitle: 'No internet connection',
  },
  unmuted: {
    openerHint: 'Say it straight, or tap a topic.',
    freeTextHint: 'No filter needed. Your exact words stay as they are.',
    thanks: 'Thanks for saying it.',
    basicInfoNext: 'Now check I got it right.',
    notNowTitle: 'Your call. Always.',
    notNowBody: 'Your conversation stays private, locked behind your PIN.',
    sentTitle: 'Sent. A pro will look.',
    offlineTitle: 'You’re offline',
  },
  ink: {
    openerHint: 'Write it the way it comes out, or choose a topic.',
    freeTextHint: 'Take your time. SAYO keeps your exact words.',
    thanks: 'Thank you for telling me.',
    basicInfoNext: 'Next, check that I understood you correctly.',
    notNowTitle: 'That’s fine',
    notNowBody: 'You decide what happens next. This conversation stays private behind your PIN.',
    sentTitle: 'Sent for review',
    offlineTitle: 'You’re offline',
  },
  clay: {
    openerHint: 'Say it however it comes out, or pick a topic.',
    freeTextHint: 'No rush. I keep your exact words.',
    thanks: 'Thank you for sharing this with me.',
    basicInfoNext: 'Next, let’s make sure I understood you.',
    notNowTitle: 'That’s completely okay',
    notNowBody: 'It’s your choice. Your conversation stays private behind your PIN.',
    sentTitle: 'Sent. You did the hard part.',
    offlineTitle: 'You’re offline right now',
  },
  quiet: {
    openerHint: 'Describe it in your own words, or choose a topic.',
    freeTextHint: 'Your exact words are kept.',
    thanks: 'Thank you.',
    basicInfoNext: 'Next, check the summary.',
    notNowTitle: 'No review requested',
    notNowBody: 'You can ask for a review later. This conversation is locked behind your PIN.',
    sentTitle: 'Sent for review',
    offlineTitle: 'Offline',
  },
  grove: {
    openerHint: 'Ask it your way, or pick what’s top of mind.',
    freeTextHint: 'Take your time. SAYO keeps your exact words.',
    thanks: 'Thank you for telling me.',
    basicInfoNext: 'Next, let’s check I understood you.',
    notNowTitle: 'That’s your call',
    notNowBody: 'You can ask for a review any time. This conversation stays behind your PIN.',
    sentTitle: 'It’s with a professional now',
    offlineTitle: 'You’re offline',
  },
}

/* ---------------------------------------------------------- topic starts */

export interface TopicStart {
  topic: Topic
  label: string
  /** Opens the safety flow instead of the normal intake. */
  safety?: boolean
}

/** Topics stay explicit: HIV, PrEP/PEP, contraception, pregnancy and GBV are named plainly. */
export const TOPIC_STARTS: TopicStart[] = [
  { topic: 'hiv_sti', label: 'HIV & STIs' },
  { topic: 'prep_pep', label: 'PrEP & PEP' },
  { topic: 'contraception', label: 'Contraception' },
  { topic: 'pregnancy', label: 'Pregnancy' },
  { topic: 'sexual_health', label: 'Sex & my body' },
  { topic: 'mental', label: 'Mood & feelings' },
  { topic: 'substance', label: 'Alcohol & drugs' },
  { topic: 'consent', label: 'Consent & relationships' },
  { topic: 'general', label: 'Something else' },
  { topic: 'gbv', label: 'Violence, abuse or sexual assault', safety: true },
]

/** Sentence starters for the big free-text step (research: Bloom). */
export const STARTERS = ['I’m worried about…', 'It started when…', 'Since…', 'I don’t know how to say this, but…']

/* ------------------------------------------------------- conversations */

/** Discharge intake, mid-way: AI has just asked a follow-up with quick replies. */
export const CHAT_MID: ChatTurn[] = INTAKE_CHAT.slice(0, 7)

/** Discharge intake, before the user sends her long free-text message. */
export const CHAT_BEFORE_FREE_TEXT: ChatTurn[] = INTAKE_CHAT.slice(0, 3)

/** Offered on every structured question (research: Ada). Only collect what is needed. */
export const ALWAYS_REPLIES = ['I don’t know', 'I’d rather not say']

/**
 * The AI summary as plain sentences with her facts tappable to correct (research: Hers).
 * `check` = SAYO is unsure; shown with a soft amber "Please check" flag.
 */
export type SummaryPart = string | { fact: string; check?: boolean }
export const SUMMARY_PARTS: SummaryPart[] = [
  'You’ve had ', { fact: 'itchy, unusual discharge' }, ' for ', { fact: 'about 4 days' }, ', with ',
  { fact: 'some burning when you pee' }, ' and ', { fact: 'a mild ache in your lower belly now and then', check: true }, '. ',
  'You don’t have a fever. ',
  'You had ', { fact: 'sex without a condom 2 weeks ago' }, ', your ', { fact: 'period came last week' }, ', and you’ve ',
  { fact: 'never had an HIV or STI test' }, '. ',
  'You’re worried about privacy at your local clinic.',
]

/** Summary after she corrected it (Edit summary state): the burning detail added. */
export const SUMMARY_EDITED = `${SUMMARY_PARTS.map((p) => (typeof p === 'string' ? p : p.fact)).join('')} The burning started about 2 days ago.`

/** PEP red-flag conversation (CONCERN_PEP), up to the moment the red flag interrupts. */
export const CHAT_PEP: ChatTurn[] = [
  { from: 'ai', text: "What's up?" },
  { from: 'user', text: CONCERN_PEP.originalMessage },
  { from: 'ai', text: `Thank you for telling me. ${CONCERN_PEP.followUps[0].q}`, options: ['Last night', 'Today', '1–3 days ago', 'More than 3 days ago'] },
  { from: 'user', text: CONCERN_PEP.followUps[0].a },
]

/** Red flag: possible HIV exposure < 72 h. signOff: clinical. */
export const PEP_RED_FLAG = {
  signOff: true,
  title: 'This is time-sensitive. Please read this first.',
  body: [
    'PEP is medicine that can lower the chance of getting HIV after a possible exposure, like a condom breaking.',
    'It works best the sooner it is started, and it has to be started within 72 hours. You still have time, but please try to go today.',
    'You can also ask about emergency contraception at the same visit if you don’t want to get pregnant.',
  ],
  whereTitle: 'Open now and offer PEP',
  reviewNote: 'You can still send this to a verified professional, but please don’t wait for their reply to get PEP.',
}

export const PEP_SERVICES = SERVICES.filter((s) => s.categories.includes('hiv'))

/** Streaming state: the AI answer half-written. */
export const STREAMING_PARTIAL = 'Thanks. Burning when you pee, together with itching and a change in discharge, is something a lot of women'


/** What the professional does and does not see. signOff: product + legal (data minimisation). */
export const REVIEW_SEES = [
  'Your words, exactly as you wrote them',
  'Your answers to SAYO’s questions',
  'The summary you checked',
  'Your age band (for example 18–20)',
]
export const REVIEW_NOT_SEES = ['Your name, phone number or email', 'Your Circle nickname or posts']

export const OFFLINE_BODY = 'Your message is saved on this phone and will send when you’re back online.'

/* --------------------------------------------------------------- safety */
/* One calm voice for every direction. No jokes, no emoji, no gradients. */

/** A disclosure typed into Ask SAYO that opens the safety flow. Fictional. */
export const DISCLOSURE = 'something happened at a party on saturday. he wouldnt stop when i said no. i dont know what to do'

export const SAFETY = {
  label: 'SAYO safety check',
  privacyLine: 'Your answer stays private. It only changes what SAYO shows you next.',
  scriptedNote: 'These steps use fixed wording written by the SAYO team, not AI.',
  entry: {
    title: 'Thank you for telling me.',
    body: [
      'I believe you. What happened is not your fault.',
      'You decide what happens next. You can stop at any time, and nothing is shared unless you choose.',
    ],
    quickExitHint: 'Quick exit, top right, closes SAYO straight away and opens a neutral page.',
    next: 'First, two quick questions about your safety.',
  },
  danger: {
    options: [
      { id: 'yes', label: 'Yes', hint: 'Show me how to get help now' },
      { id: 'no', label: 'No', hint: 'I’m safe at the moment' },
      { id: 'unsure', label: 'Not sure', hint: 'We’ll treat this as urgent' },
    ],
  },
  device: {
    help: 'For example, if someone else checks this phone, or knows your PIN.',
    options: [
      { id: 'yes', label: 'Yes, it’s safe' },
      { id: 'no', label: 'No, it’s not safe' },
      { id: 'unsure', label: 'Not sure' },
    ],
    notSafeTitle: 'Let’s keep you safe on this phone',
    notSafeTips: [
      'Use Quick exit at any moment. It closes SAYO and opens a neutral page.',
      'SAYO notifications never name a topic. They only say “You have a new message”.',
      'If you can, call a support line from a phone or place that feels safe.',
    ],
  },
  danger_now: {
    title: 'Your safety comes first.',
    goTo: 'If you can, go somewhere safer: a trusted neighbour or friend, a busy public place, or the nearest hospital emergency department.',
    after: 'When you are safe, you can come back. Nothing here will be lost.',
  },
  /** signOff: clinical + legal. Timings and pathways vary by country and local protocol. */
  recent: {
    signOff: true,
    title: 'Some care works best if you get it soon',
    intro: 'If this happened in the last few days, some care is time-sensitive. You choose what you want. A health worker can explain each option, depending on local protocols.',
    items: [
      { key: 'pep', title: 'HIV prevention (PEP)', body: 'Medicine that can lower the chance of HIV. Best started as soon as possible, and within 72 hours.' },
      { key: 'ec', title: 'Emergency contraception', body: 'Can lower the chance of pregnancy. The sooner the better; some types work for up to 5 days.' },
      { key: 'sti', title: 'STI tests and care', body: 'Tests, and sometimes medicine, to prevent or treat infections.' },
      { key: 'injury', title: 'Injuries', body: 'Any pain, bleeding or injury, including ones you can’t see, should be checked.' },
      { key: 'forensic', title: 'Forensic exam (if you might report)', body: 'Collects evidence, ideally soon and before washing if you can. Only if you want it; where and how depends on local protocols.' },
    ],
  },
  historical: {
    title: 'Thank you for trusting SAYO with this.',
    body: 'What happened to you matters, however long ago it was. There is no right way to feel about it, and you can go at your own pace.',
    options: [
      { key: 'talk', title: 'Talk to a support service', body: 'Trained, confidential support for people who have experienced violence or abuse.' },
      { key: 'review', title: 'Ask a verified professional', body: 'Share what you want, and a professional replies here. Not live chat.' },
      { key: 'health', title: 'A health check, in your own time', body: 'Even long after, HIV and STI tests or a talk about how you feel can help.' },
      { key: 'circle', title: 'Read others’ experiences', body: 'The Circle has a moderated, anonymous space. Reading only is fine.' },
    ],
    changed: 'If anything changes and you don’t feel safe now, tap here.',
  },
}

export const GBV_SERVICES = SERVICES.filter((s) => s.categories.includes('gbv'))
export const SUPPORT_LINE = SERVICES.find((s) => s.id === 's4')!
export const COUNSELLING = SERVICES.find((s) => s.id === 's3')!
export const ER_24H = SERVICES.find((s) => s.id === 's2')!
