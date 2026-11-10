import type { R2Direction } from '../imagery'

/**
 * Landing-page copy that `direction.copy` and LOCKED_COPY do not already cover, written in
 * each round-2 direction's voice. Plain words, short sentences.
 *
 * Headlines may mark one phrase with *asterisks*: it becomes the direction's emphasis
 * (italic in Ink and Clay, the second tone in Grove). Quiet uses none.
 *
 * Never in here: prices, plans, statistics, outcome promises, testimonials about health
 * results, medication brand names, booking, or anything SAYO does not do.
 */
export interface LandingCopy {
  pillarsTitle: string
  pillarsIntro: string
  /** What each pillar is NOT, where that matters. Ask SAYO uses LOCKED_COPY.notDiagnosis. */
  reviewNot: string
  careNot: string
  circleNot: string
  startKicker: string
  startBody: string
  howTitle: string
  howIntro: string
  /** ask in your own words → check the summary → optional professional review → find the right care */
  steps: [Step, Step, Step, Step]
  learnTitle: string
  learnIntro: string
  topics: { prep: string; contraception: string; mood: string }
  prosTitle: string
  prosBody: string
  privacyTitle: string
  privacyCircle: string
  closeTitle: string
}
interface Step { title: string; body: string }

export const LANDING_COPY: Record<R2Direction, LandingCopy> = {
  ink: {
    pillarsTitle: 'Four things SAYO does. *Nothing more.*',
    pillarsIntro: 'Each one is clear about what it is, and what it is not.',
    reviewNot: 'Not live chat. The reply comes when a professional is available.',
    careNot: 'SAYO does not book appointments. You contact the service yourself.',
    circleNot: 'Nicknames and avatars only. No private messages.',
    startKicker: 'Not sure where to begin?',
    startBody: 'Pick a topic. SAYO asks one question at a time.',
    howTitle: 'From your question to your *next step*',
    howIntro: 'Four steps. You decide how far to go.',
    steps: [
      { title: 'Ask in your own words', body: 'Write it the way you’d say it. SAYO asks a few short questions.' },
      { title: 'Check the summary', body: 'SAYO writes back what it understood. You correct anything that’s wrong.' },
      { title: 'Choose a professional review', body: 'Optional. A verified health professional reads your question and replies in the app.' },
      { title: 'Find the right care', body: 'If you need to be seen, SAYO shows verified services near you.' },
    ],
    learnTitle: 'Plain facts, *named plainly*',
    learnIntro: 'HIV, PrEP, PEP, contraception, mood. No euphemisms.',
    topics: {
      prep: 'What PrEP is, how it is taken, and where to ask about it.',
      contraception: 'Pills, injections, implants, IUDs, condoms and emergency contraception, explained plainly.',
      mood: 'Low mood, worry and poor sleep. What can help, and when to talk to someone.',
    },
    prosTitle: 'Reviewed by people *you can check*',
    prosBody: 'The SAYO team checks each professional’s registration and licensing jurisdiction before they can review a question.',
    privacyTitle: 'Yours, and *only yours*',
    privacyCircle: 'You post under a nickname and an avatar. Your private questions never appear there.',
    closeTitle: 'Start when you’re *ready*.',
  },
  clay: {
    pillarsTitle: 'Four ways SAYO *walks with you*',
    pillarsIntro: 'Ask, hear from a professional, find a place to go, and talk with women like you.',
    reviewNot: 'It isn’t live chat. A reply comes when a professional is free.',
    careNot: 'SAYO doesn’t book for you. We show you where to go and how to reach them.',
    circleNot: 'Nicknames only. No photos, no private messages.',
    startKicker: 'Not sure where to start? Start here.',
    startBody: 'Choose what’s closest. You can change it, and you can stop any time.',
    howTitle: 'How SAYO works, *step by step*',
    howIntro: 'No forms to fight with. Just a conversation, at your pace.',
    steps: [
      { title: 'Say it your way', body: 'Tell SAYO what’s going on, in your own words. It asks a few gentle questions so it understands.' },
      { title: 'Check we heard you right', body: 'SAYO shows you a short summary. Fix anything that isn’t right before it goes anywhere.' },
      { title: 'Ask a professional, if you want', body: 'A verified health professional can take a look. You choose; nothing is sent without you.' },
      { title: 'Find the right care', body: 'If you should be seen, SAYO shows places near you that we’ve checked.' },
    ],
    learnTitle: 'Learn at *your own pace*',
    learnIntro: 'Short reads in plain words, for when you just want to understand.',
    topics: {
      prep: 'PrEP is medicine that helps prevent HIV. Here’s what it is and how to ask for it.',
      contraception: 'Pills, injections, implants, IUDs, condoms. What each one is like, in plain words.',
      mood: 'Some days sit heavy. Small things that can help, and when to reach for support.',
    },
    prosTitle: 'The people who *take a look*',
    prosBody: 'Doctors and nurses whose licences we’ve checked. You always see their profession and where they’re licensed.',
    privacyTitle: 'What you say stays behind *your PIN*',
    privacyCircle: 'In the Circle you’re a nickname and an avatar. Nothing you ask SAYO privately shows up there.',
    closeTitle: 'Come in. SAYO *is ready* when you are.',
  },
  quiet: {
    pillarsTitle: 'What SAYO does',
    pillarsIntro: 'Four tools. Each says what it is and what it is not.',
    reviewNot: 'Not live chat. Replies are not immediate.',
    careNot: 'No booking. You contact the service.',
    circleNot: 'Nickname only. No photos. No direct messages.',
    startKicker: 'Start here',
    startBody: 'Choose a topic. One question at a time.',
    howTitle: 'How it works',
    howIntro: 'Four steps. Stop at any point.',
    steps: [
      { title: 'Ask in your own words', body: 'Describe what’s happening. SAYO asks a few questions.' },
      { title: 'Check the summary', body: 'Read what SAYO understood. Change anything.' },
      { title: 'Professional review, if you choose', body: 'A verified health professional reviews your question and replies in the app.' },
      { title: 'Find the right care', body: 'See verified services near you.' },
    ],
    learnTitle: 'Learn',
    learnIntro: 'Short, plain articles.',
    topics: {
      prep: 'What it is. How it’s taken. Where to ask.',
      contraception: 'The main methods, compared plainly.',
      mood: 'What can help. When to talk to someone.',
    },
    prosTitle: 'Verified professionals',
    prosBody: 'Each professional’s licence is checked before they can review a question.',
    privacyTitle: 'Private by design',
    privacyCircle: 'Nickname and avatar only. Your private questions are never shown.',
    closeTitle: 'Start when you’re ready.',
  },
  grove: {
    pillarsTitle: 'Private health support, *all in one place*',
    pillarsIntro: 'Start with a question. Add a professional. Find care. Find your people.',
    reviewNot: 'Not live chat: your reply arrives when a professional is available.',
    careNot: 'No booking through SAYO: you choose a service and reach out yourself.',
    circleNot: 'Nicknames and avatars only. No photos, no DMs.',
    startKicker: 'Not sure where to begin? Start here.',
    startBody: 'Pick what fits. SAYO takes it one question at a time.',
    howTitle: 'It starts with *one question*',
    howIntro: 'You set the pace, and you choose every next step.',
    steps: [
      { title: 'Ask it your way', body: 'Start with one question, in your own words. SAYO asks a few follow-ups to understand.' },
      { title: 'Check the summary', body: 'See what SAYO heard and change anything that’s off.' },
      { title: 'Add a professional review', body: 'Optional. A verified health professional reviews your question and replies to you in the app.' },
      { title: 'Find the right care', body: 'When you need to be seen, SAYO points you to verified services nearby.' },
    ],
    learnTitle: 'Plain facts for what’s *top of mind*',
    learnIntro: 'Short reads on the things people really ask about.',
    topics: {
      prep: 'PrEP helps prevent HIV. Learn what it is, how it’s taken and where to ask for it.',
      contraception: 'From pills to implants to emergency contraception: your options, side by side.',
      mood: 'Low days are real. See what can help and when it’s time to talk to someone.',
    },
    prosTitle: 'Real professionals. *Real answers.*',
    prosBody: 'Every reviewer is a licensed health professional. SAYO checks their registration and where they’re licensed before they see a single question.',
    privacyTitle: 'Private by design. This is *your space*.',
    privacyCircle: 'Share under a nickname and an avatar. What you ask SAYO privately stays private.',
    closeTitle: 'Your next step is *close to you*.',
  },
}

/** Same in every direction: names of things, safety wording and the pilot disclaimer. */
export const LANDING_FIXED = {
  kicker: 'Private health app · Ghana pilot · 18+',
  nav: [
    { label: 'How it works', href: '#how' },
    { label: 'Learn', href: '#learn' },
    { label: 'Professionals', href: '#professionals' },
    { label: 'Privacy', href: '#privacy' },
  ],
  navCta: 'Get started',
  secondaryCta: 'How it works',
  trust: ['Private by design', 'Verified professionals', 'Care near you'],
  pillars: { ask: 'Ask SAYO', review: 'Verified professional review', care: 'Find Care', circle: 'The Circle' },
  /** Always show who is speaking: AI and professional are never mixed up. */
  sourceAi: (aiLabel: string) => `From ${aiLabel}`,
  sourcePro: 'From a verified professional',
  sourceCare: 'Verified by SAYO',
  sourcePeers: 'From peers, under nicknames',
  /** Honest timing for each step. No numbers we cannot keep. */
  stepWhen: ['Now', 'Before anything is sent', 'When a professional is available', 'Only if you need it'],
  /** Topics stay explicit: never diluted into "wellness". */
  startOptions: ['HIV, PrEP or PEP', 'Contraception or pregnancy', 'Sex and my body', 'How I’m feeling', 'Something happened to me', 'Something else'],
  startSafety: (quickExit: string) => `“Something happened to me” opens a safer path. SAYO first asks if you are safe, and ${quickExit} is always on screen.`,
  topics: { prep: 'PrEP is prevention', contraception: 'Your contraception options', mood: 'When your mood feels heavy' },
  read: 'Read',
  prosSample: 'Sample profiles. Initials only: SAYO shows no profile photos.',
  prosScope: { cases: 'Reviews questions in the pilot', info: 'Reviews health information' },
  licensedIn: (jurisdiction: string) => `Licensed in ${jurisdiction === 'United Kingdom' ? 'the United Kingdom' : jurisdiction}`,
  privacy: {
    intro: 'SAYO asks for as little as it can. Your phone number and email are never shown in public, and there are no profile photos.',
    pin: 'A 4-digit PIN',
    circle: 'Nickname only in the Circle',
    notifications: 'Discreet notifications',
    notificationsBody: (lock: string) => `Your lock screen only says “${lock}”. It never names a health topic.`,
    emergency: 'SAYO is not an emergency service',
  },
  footer: 'Pilot: sample content. SAYO does not diagnose.',
  footerFiction: 'Every person, professional and service shown here is fictional.',
}
