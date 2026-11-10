/**
 * SAMPLE DATA ONLY for the My Reviews screens. Fictional people and cases.
 * Professional wording is placeholder copy for layout and has not been clinically
 * reviewed; the SAYO clinical lead must review it before any real use.
 */
import { CASES } from '../../../data/fixtures'
import type { ReviewCase } from '../../../data/types'

export const CASE_ROUTINE: ReviewCase = CASES.find((c) => c.id === 'R-2081')!
export const CASE_QUEUED: ReviewCase = CASES.find((c) => c.id === 'R-2082')!
export const CASE_IN_REVIEW: ReviewCase = CASES.find((c) => c.id === 'R-2083')!

/** Same PEP concern, answered with an urgent in-person decision. */
export const CASE_URGENT: ReviewCase = {
  ...CASE_QUEUED,
  id: 'R-2082',
  status: 'answered',
  waitingFor: '—',
  acceptedBy: 'Dr. Efua M.',
  acceptedAt: 'Today, 9:18 am',
  answeredAt: 'Today, 9:31 am',
  response: {
    thoughts:
      'Thank you for asking straight away. That was the right thing to do. Because the condom broke and his status is unknown, I recommend you go to a clinic or hospital today and ask about PEP (medicine that can lower the chance of HIV after an exposure). PEP works best the sooner it is started and needs to be started within 72 hours, so please do not wait for a weekday clinic. The hospital below is open 24 hours. You can also ask about emergency contraception and an STI check at the same visit.',
    decision: 'urgent',
    category: 'hiv',
    professional: 'Dr. Efua M.',
    profession: 'Medical doctor',
  },
}

/** Low-mood concern, answered with no in-person care indicated and optional counselling. */
export const CASE_NONE: ReviewCase = {
  ...CASE_IN_REVIEW,
  status: 'answered',
  waitingFor: '—',
  answeredAt: 'Today, 10:12 am',
  response: {
    thoughts:
      'I am glad you wrote this down. Feeling heavy, crying and sleeping badly before exams is very common, and it makes sense that you feel worn out. From what you shared, you do not need to be seen in person right now. A few things that often help: a regular bedtime, short breaks between study blocks, and telling one person you trust how you feel. If it lasts more than two more weeks, gets worse, or you ever have thoughts of hurting yourself, please reach out to a counsellor. One is listed below if you would like to talk to someone.',
    decision: 'none',
    category: 'mental_health',
    professional: 'Nurse Abena K.',
    profession: 'Registered nurse',
  },
}

/** A case a professional released (outside their competence). It is back in the queue. */
export const CASE_RELEASED: ReviewCase = {
  ...CASE_IN_REVIEW,
  status: 'queued',
  acceptedBy: undefined,
  acceptedAt: undefined,
  waitingFor: '15 h',
}

/** Rows for the My Reviews list, newest first. */
export const MY_REVIEWS: ReviewCase[] = [CASE_ROUTINE, CASE_QUEUED, CASE_IN_REVIEW]

/** A plain-language title for a case, from the concern topic. Never shown outside the PIN. */
export const TOPIC_TITLE: Record<string, string> = {
  sexual_health: 'Sexual health question',
  prep_pep: 'HIV / PEP question',
  mental: 'Mood and sleep',
  hiv_sti: 'HIV / STI question',
  contraception: 'Contraception question',
  pregnancy: 'Pregnancy question',
  substance: 'Substance use question',
  gbv: 'Safety and support',
  consent: 'Consent question',
  general: 'Health question',
}
