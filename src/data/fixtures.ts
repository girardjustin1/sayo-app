/**
 * SAMPLE DATA ONLY. Every person, clinic, phone number and case here is fictional.
 * Health wording in these fixtures is placeholder copy for layout. It has not been
 * clinically reviewed and must be reviewed by the SAYO clinical lead before any real use.
 */
import type { ChatTurn, CirclePost, Concern, Professional, ReviewCase, Service } from './types'

/** Private first name, shown only inside the PIN-locked app. Never in the Circle. */
export const USER = { firstName: 'Ama', circleName: 'sunflower_22' }

export const CONCERN_DISCHARGE: Concern = {
  id: 'c-1042',
  topic: 'sexual_health',
  originalMessage:
    "there's been this weird discharge for like 4 days and it itches down there. i had sex with my boyfriend 2 weeks ago without a condom and im scared to go to the clinic near my house because my aunt works there",
  followUps: [
    { q: 'Do you have any pain in your lower belly, or a fever?', a: 'No fever. A little ache sometimes' },
    { q: 'Is there any chance you could be pregnant?', a: 'I don’t think so, my period came last week' },
    { q: 'Any pain when you pee?', a: 'A bit of burning' },
    { q: 'Have you had a test for HIV or other STIs before?', a: 'Never' },
  ],
  summary:
    'Itchy, unusual vaginal discharge for 4 days, with some burning when passing urine and occasional mild lower-belly ache. No fever. Unprotected sex with a partner 2 weeks ago. Period last week. Never tested for HIV or STIs. Worried about privacy at her local clinic.',
  redFlags: [],
  createdAt: 'Today, 2:14 pm',
}

export const CONCERN_PEP: Concern = {
  id: 'c-1043',
  topic: 'prep_pep',
  originalMessage: 'the condom broke last night and i dont know his status. what do i do',
  followUps: [
    { q: 'When did this happen? An approximate time is fine.', a: 'About 11pm last night' },
    { q: 'Are you safe right now?', a: 'Yes I am at home' },
  ],
  summary:
    'Condom broke during sex last night around 11 pm, partner’s HIV status unknown. She is safe at home. Asking about next steps.',
  redFlags: ['Possible HIV exposure within 72 hours: PEP is time-sensitive'],
  createdAt: 'Today, 9:02 am',
}

export const CONCERN_LOW_MOOD: Concern = {
  id: 'c-1044',
  topic: 'mental',
  originalMessage: 'i cant sleep and i feel heavy all the time. exams are coming and i just cry',
  followUps: [
    { q: 'How long have you been feeling like this?', a: 'Maybe a month' },
    { q: 'Have you had any thoughts of hurting yourself?', a: 'No' },
  ],
  summary: 'Low mood, poor sleep and frequent crying for about a month, worse with upcoming exams. No thoughts of self-harm.',
  redFlags: [],
  createdAt: 'Yesterday, 11:40 pm',
}

/** The Ask SAYO conversation for CONCERN_DISCHARGE, turn by turn. */
export const INTAKE_CHAT: ChatTurn[] = [
  { from: 'ai', text: "What's up?" },
  { from: 'user', text: 'i have a question about something down there' },
  { from: 'ai', text: 'Okay. In your own words, explain exactly how you feel.' },
  { from: 'user', text: CONCERN_DISCHARGE.originalMessage },
  { from: 'ai', text: 'Thank you for telling me. That sounds uncomfortable, and it’s really common to feel nervous about it. A few quick questions so I understand. Do you have any pain in your lower belly, or a fever?', options: ['No', 'Belly pain', 'Fever', 'Both'] },
  { from: 'user', text: 'No fever. A little ache sometimes' },
  { from: 'ai', text: 'Any pain or burning when you pee?', options: ['Yes', 'No', 'Not sure'] },
  { from: 'user', text: 'A bit of burning' },
  { from: 'ai', text: 'Is there any chance you could be pregnant?', options: ['Yes', 'No', 'Not sure'] },
  { from: 'user', text: 'I don’t think so, my period came last week' },
]

export const AI_INFO_DISCHARGE = [
  'Changes in discharge with itching or burning are common and are often caused by infections that are treatable, such as thrush, bacterial vaginosis or some STIs.',
  'Because you had sex without a condom, an STI test is a good idea, including an HIV test. Testing is quick and confidential.',
  'Some infections have no symptoms, so testing is the only way to know.',
]

export const SERVICES: Service[] = [
  { id: 's1', name: 'Asante Youth Wellness Centre', type: 'Youth-friendly clinic', categories: ['sexual_health', 'hiv'], area: 'Osu (sample)', distanceKm: 2.4, hours: 'Mon–Sat, 8 am–6 pm', phone: '+233 20 000 0101', verified: true, youthFriendly: true },
  { id: 's2', name: 'Ridgeview Community Hospital', type: 'General hospital', categories: ['general', 'hiv', 'gbv'], area: 'Ridge (sample)', distanceKm: 4.1, hours: 'Open 24 hours', phone: '+233 30 000 0202', verified: true },
  { id: 's3', name: 'Harmony Counselling Centre', type: 'Counselling service', categories: ['mental_health', 'substance'], area: 'East Legon (sample)', distanceKm: 6.8, hours: 'Mon–Fri, 9 am–5 pm', phone: '+233 24 000 0303', verified: true },
  { id: 's4', name: 'Safe Haven Support Line', type: 'GBV & sexual assault support', categories: ['gbv'], area: 'Phone & referral (sample)', distanceKm: 0, hours: 'Every day, 24 hours', phone: '+233 55 000 0404', verified: true },
  { id: 's5', name: 'Kaneshie Family Health Clinic', type: 'Family planning clinic', categories: ['sexual_health', 'general'], area: 'Kaneshie (sample)', distanceKm: 7.5, hours: 'Mon–Fri, 8 am–4 pm', phone: '+233 26 000 0505', verified: false },
]

export const CASES: ReviewCase[] = [
  {
    id: 'R-2081',
    concern: CONCERN_DISCHARGE,
    status: 'answered',
    ageBand: '18–20',
    sentAt: 'Today, 2:20 pm',
    waitingFor: '—',
    acceptedBy: 'Dr. Efua M.',
    acceptedAt: 'Today, 4:05 pm',
    answeredAt: 'Today, 4:31 pm',
    response: {
      thoughts:
        'Thank you for explaining this so clearly. What you describe is common and usually very treatable. Because the sex was unprotected, I would like you to have a check and an STI test, including HIV. It is a routine visit, not an emergency. If you would rather not go to your local clinic, the youth-friendly centre below is confidential and does not need a referral. If you develop a fever, strong belly pain, or feel very unwell before then, go the same day.',
      decision: 'routine',
      category: 'sexual_health',
      professional: 'Dr. Efua M.',
      profession: 'Medical doctor',
    },
  },
  { id: 'R-2082', concern: CONCERN_PEP, status: 'queued', ageBand: '21–24', sentAt: 'Today, 9:05 am', waitingFor: '25 min' },
  { id: 'R-2083', concern: CONCERN_LOW_MOOD, status: 'in_review', ageBand: '21–24', sentAt: 'Yesterday, 11:45 pm', waitingFor: '14 h', acceptedBy: 'Nurse Abena K.', acceptedAt: 'Today, 8:30 am' },
]

export const CIRCLE_POSTS: CirclePost[] = [
  {
    id: 'p1', author: 'sunflower_22', topic: 'prep_pep', title: 'Is it weird to ask a guy to test before we sleep together?',
    body: 'We’ve been talking for 2 months. I want us both to test first but I’m scared he’ll think I’m accusing him of something.', ago: '2h',
    reactions: { support: 48, same: 31, thanks: 6 },
    replies: [
      { id: 'r1', author: 'quietstorm', body: 'Not weird at all! I asked mine and we went together. Made it feel like a team thing.', ago: '1h' },
      { id: 'r2', author: 'Nurse Abena K.', body: 'Testing together is a great idea and very normal. Many clinics offer couples testing. You can frame it as looking after each other, not suspicion.', ago: '40m', professional: { profession: 'Registered nurse' } },
    ],
  },
  {
    id: 'p2', author: 'moonchild.gh', topic: 'mental', title: 'Exam stress is making me feel numb',
    body: 'Anyone else just… not feeling anything? I sleep 4 hours and just stare at my notes.', ago: '5h',
    reactions: { support: 72, same: 54, thanks: 3 }, replies: [],
  },
  {
    id: 'p3', author: 'adwoa_reads', topic: 'contraception', title: 'Implant vs injection: what was your experience?',
    body: 'Trying to decide. My friend says the injection made her periods stop. Is that normal?', ago: '1d',
    reactions: { support: 19, same: 12, thanks: 9 }, replies: [],
  },
]

export const PROFESSIONALS: Professional[] = [
  { id: 'pr1', name: 'Dr. Efua M.', profession: 'Medical doctor', jurisdiction: 'Ghana', licence: 'MDC/RN/0000-S', expertise: ['Sexual health', 'HIV/PrEP/PEP', 'Contraception'], status: 'approved', canReviewRealCases: true, reviewsDone: 38 },
  { id: 'pr2', name: 'Nurse Abena K.', profession: 'Registered nurse', jurisdiction: 'Ghana', licence: 'NMC/0000-S', expertise: ['Sexual health', 'Mental wellbeing'], status: 'approved', canReviewRealCases: true, reviewsDone: 21 },
  { id: 'pr3', name: 'Dr. Grace O.', profession: 'Medical doctor', jurisdiction: 'United Kingdom', licence: 'GMC 0000000-S', expertise: ['Reproductive health', 'GBV'], status: 'approved', canReviewRealCases: false, reviewsDone: 12 },
  { id: 'pr4', name: 'Kofi A.', profession: 'Clinical psychologist', jurisdiction: 'Ghana', licence: 'Pending check', expertise: ['Mental wellbeing', 'Substance use'], status: 'pending', canReviewRealCases: false, reviewsDone: 0 },
  { id: 'pr5', name: 'Dr. Naa D.', profession: 'Medical doctor', jurisdiction: 'Nigeria', licence: 'MDCN-0000-S', expertise: ['HIV/PrEP/PEP'], status: 'pending', canReviewRealCases: false, reviewsDone: 0 },
]

export const PILOT_METRICS = {
  users: 214,
  concerns: 386,
  reviewsRequested: 141,
  reviewsCompleted: 118,
  avgResponseHours: 5.2,
  referrals: 47,
  circlePosts: 263,
  openReports: 4,
  waitingOver24h: 3,
  satisfaction: 4.4,
}
