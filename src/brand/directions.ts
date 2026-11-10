/**
 * Brand directions. Round 1 (A–C) explored the logo's pink family. Round 2 (D–F), the
 * current default, pairs the pink logo with a non-pink system, guided by AskTia
 * (cream/sand grounds, coral only on the main action, a light editorial serif). Each keeps the chosen logo (heart-S mark, lowercase
 * "sayo", coral dot) and changes how it is used: palette, type, shape, imagery, voice.
 *
 * LOCKED_COPY is wording the master context fixes, or that safety depends on.
 * It is the same in every direction. Only `copy` (voice copy) changes.
 */

export type DirectionId = 'sister' | 'clear' | 'unmuted' | 'ink' | 'clay' | 'quiet' | 'grove'

export interface Swatch {
  name: string
  hex: string
  role: string
}

export interface DirectionCopy {
  tagline: string
  splashLine: string
  onboarding: { title: string; body: string }[]
  ageGateTitle: string
  ageGateBody: string
  pinTitle: string
  pinBody: string
  homeGreeting: (name: string) => string
  homePrompt: string
  askPlaceholder: string
  aiLabel: string
  summaryIntro: string
  summaryConfirm: string
  reviewReadyTitle: string
  notificationLock: string
  circleIntro: string
  circleEmpty: string
  findCareIntro: string
  myReviewsEmpty: string
  errorGeneric: string
  ctaPrimary: string
}

export interface Direction {
  id: DirectionId
  letter: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
  round: 1 | 2
  /** Hero surfaces (splash, home header): dark heroes get light text; `logo` is the Logo variant to use there. */
  hero: { dark: boolean; logo: 'color' | 'onDark' | 'reverse'; whiteCta?: boolean }
  /** Phrases the Display headline picks out (italic in serif directions, colour in Grove). First match wins. */
  emphasize?: string[]
  name: string
  persona: string
  oneLiner: string
  traits: [string, string, string]
  fonts: { display: string; body: string; note: string }
  palette: Swatch[]
  logoUse: string[]
  imagery: string[]
  voice: { do: string[]; dont: string[] }
  copy: DirectionCopy
  risks: string[]
}

/** Copy every direction shares, word for word. */
export const LOCKED_COPY = {
  askOpener: "What's up?",
  askFollowUp: 'Okay. In your own words, explain exactly how you feel.',
  reviewOffer: 'Would you like a verified health professional to review this?',
  queueMessage:
    'Your question has been sent for review. A verified health professional will take a look when available and SAYO will notify you when your response is ready.',
  dangerQuestion: 'Are you in immediate danger right now?',
  deviceQuestion: 'Is it safe for you to continue using this device?',
  quickExit: 'Quick exit',
  notDiagnosis: 'This is general health information, not a diagnosis.',
  proBadge: 'Verified Professional',
  emergency: 'If you are in danger or badly hurt, go to the nearest emergency department or call 112.',
  careDecisions: {
    none: 'No in-person care currently indicated',
    routine: 'Yes, routine assessment',
    urgent: 'Yes, urgent assessment',
  },
} as const

export const DIRECTIONS: Record<DirectionId, Direction> = {
  sister: {
    id: 'sister',
    round: 1,
    hero: { dark: false, logo: 'color' },
    letter: 'A',
    name: 'Big Sister',
    persona: 'The older sister who has been there and will not judge.',
    oneLiner: 'Warm, close and a little playful. SAYO feels like a person on your side.',
    traits: ['Warm', 'Reassuring', 'Familiar'],
    fonts: {
      display: 'Plus Jakarta Sans',
      body: 'Plus Jakarta Sans',
      note: 'One rounded geometric family. Friendly at display sizes, very readable small.',
    },
    palette: [
      { name: 'Rose', hex: '#D62B63', role: 'Primary actions, links' },
      { name: 'Coral', hex: '#FF5A48', role: 'Logo dot, highlights' },
      { name: 'Peach', hex: '#FFD9C7', role: 'Soft cards, chips' },
      { name: 'Blush', hex: '#FFF7F3', role: 'Page background' },
      { name: 'Sunshine', hex: '#FFB547', role: 'Small moments of joy' },
      { name: 'Ink', hex: '#2A2D32', role: 'Text (from the wordmark)' },
    ],
    logoUse: [
      'Full-colour gradient lockup on Blush. This is the hero use.',
      'The mark appears inside soft peach "speech" shapes, linking SAYO to saying it out loud.',
      'App icon: gradient mark on a Blush tile.',
    ],
    imagery: [
      'Warm, candid photography of friends and sisters in golden light. Laughter, closeness.',
      'Always clothed, never clinical, never someone visibly unwell.',
      'Hand-drawn doodles (sparkles, underlines) in Coral as accents.',
    ],
    voice: {
      do: ['Talk like a trusted older sister', 'Use "you" and "we"', 'Short sentences, with warmth', 'Name the topic plainly'],
      dont: ['Baby talk or too many emoji', 'Medical jargon without a plain version', 'Pretend to be a doctor'],
    },
    copy: {
      tagline: "Say it. We've got you.",
      splashLine: 'Your private space for the questions you can’t ask anyone else.',
      onboarding: [
        { title: 'Ask anything. Really.', body: 'Sex, periods, HIV, PrEP, feelings: say it in your own words. No judgement here.' },
        { title: 'A real professional can look', body: 'Want a second opinion? A verified health professional can review your question.' },
        { title: 'You’re not the only one', body: 'The Circle is where young women share and support each other, under a nickname.' },
      ],
      ageGateTitle: 'Quick check: are you 18 or older?',
      ageGateBody: 'Our first pilot is for women aged 18+. Younger sisters, we’re coming for you soon.',
      pinTitle: 'Set your secret PIN',
      pinBody: 'Your conversations stay locked behind 4 digits only you know.',
      homeGreeting: (name) => `Hey ${name} 👋`,
      homePrompt: 'What’s on your mind today?',
      askPlaceholder: 'Type it how you’d say it…',
      aiLabel: 'SAYO (AI)',
      summaryIntro: 'Here’s what I heard. Did I get it right?',
      summaryConfirm: 'Yes, that’s it',
      reviewReadyTitle: 'Your answer is ready 💌',
      notificationLock: 'You have a new message',
      circleIntro: 'Real talk from women like you. Be kind, stay anonymous.',
      circleEmpty: 'Quiet in here today. Want to start the conversation?',
      findCareIntro: 'Places near you that we have checked.',
      myReviewsEmpty: 'No reviews yet. When you ask a professional, you’ll find it here.',
      errorGeneric: 'Something went wrong on our side. Your words are saved; try again in a moment.',
      ctaPrimary: 'Let’s talk',
    },
    risks: [
      'Can tip into "cute" and lose clinical trust on serious topics (GBV, HIV results).',
      'Emoji in notifications could hint at sensitive content. Keep them out of lock-screen copy.',
    ],
  },
  clear: {
    id: 'clear',
    round: 1,
    hero: { dark: false, logo: 'color' },
    letter: 'B',
    name: 'Clear Care',
    persona: 'The calm, knowledgeable friend who happens to work in health.',
    oneLiner: 'Calm, private and trustworthy. Health-tech, not hospital. Lets the content lead.',
    traits: ['Calm', 'Trustworthy', 'Discreet'],
    fonts: {
      display: 'DM Sans',
      body: 'DM Sans',
      note: 'Closest in shape to the wordmark. Quiet and precise; disappears behind the content.',
    },
    palette: [
      { name: 'Plum', hex: '#6D2E9E', role: 'Primary actions, links' },
      { name: 'Lavender', hex: '#EDE4F7', role: 'Soft surfaces, selected states' },
      { name: 'Coral', hex: '#FF5A48', role: 'Logo dot only, plus tiny accents' },
      { name: 'Mist', hex: '#FAF8FC', role: 'Page background' },
      { name: 'Sage', hex: '#2F8F6B', role: 'Verified and positive states' },
      { name: 'Ink', hex: '#23212B', role: 'Text' },
    ],
    logoUse: [
      'Charcoal wordmark with a small gradient mark: the logo is the only gradient in the product.',
      'A single-colour plum version for discreet places (notifications, login).',
      'App icon: a white mark on a plum tile, so it reads as "an app", not "a health app".',
    ],
    imagery: [
      'Privacy-first. Few faces: hands, phones, calm still life, soft lilac light.',
      'Simple line illustrations for empty states and explainers.',
      'Never clinical stock (stethoscopes, gloves, hospital corridors).',
    ],
    voice: {
      do: ['Calm, clear, factual', 'Explain why a question is asked', 'Say what happens next and when', 'Plain words, short paragraphs'],
      dont: ['Hype or slang', 'Exclamation marks', 'Vague reassurance ("don’t worry!")'],
    },
    copy: {
      tagline: 'Private questions. Trusted answers.',
      splashLine: 'Health information, professional review and care near you. All private.',
      onboarding: [
        { title: 'Ask privately', body: 'Describe what is happening in your own words. SAYO asks a few questions and gives you clear, evidence-based information.' },
        { title: 'Get a professional review', body: 'If you want, a verified health professional reviews your question and replies here.' },
        { title: 'Find the right care', body: 'When you need to be seen, SAYO shows verified services near you.' },
      ],
      ageGateTitle: 'Please confirm you are 18 or older',
      ageGateBody: 'The SAYO pilot is currently for women aged 18 and over.',
      pinTitle: 'Create a 4-digit PIN',
      pinBody: 'Your PIN locks your private conversations and reviews on this device.',
      homeGreeting: (name) => `Good afternoon, ${name}`,
      homePrompt: 'How can SAYO help today?',
      askPlaceholder: 'Describe what’s happening…',
      aiLabel: 'SAYO assistant (AI)',
      summaryIntro: 'Please check this summary. You can correct anything.',
      summaryConfirm: 'This is correct',
      reviewReadyTitle: 'Your review is ready',
      notificationLock: 'You have a new update',
      circleIntro: 'A moderated community. Use a nickname; never share identifying details.',
      circleEmpty: 'No posts in this topic yet.',
      findCareIntro: 'Verified services. Call ahead to confirm opening hours.',
      myReviewsEmpty: 'You have no professional reviews yet.',
      errorGeneric: 'We could not complete that. Your message has been kept. Please try again.',
      ctaPrimary: 'Get started',
    },
    risks: [
      'Can feel cold or corporate to an 18–24 audience; may not get shared.',
      'Plum is close to other women’s-health brands; the logo has to carry the distinctiveness.',
    ],
  },
  unmuted: {
    id: 'unmuted',
    round: 1,
    hero: { dark: true, logo: 'reverse', whiteCta: true },
    letter: 'C',
    name: 'Unmuted',
    persona: 'The friend who says the thing everyone else whispers.',
    oneLiner: 'Bold, proud and stigma-breaking. Big type and the full gradient; shame has no place.',
    traits: ['Bold', 'Unashamed', 'Expressive'],
    fonts: {
      display: 'Fraunces',
      body: 'DM Sans',
      note: 'A soft, characterful serif for headlines (editorial, a bit cheeky) over a clean sans.',
    },
    palette: [
      { name: 'Magenta', hex: '#C4007F', role: 'Primary actions' },
      { name: 'Gradient', hex: 'linear-gradient(120deg,#D4009E,#FF5A48)', role: 'Hero panels, highlights' },
      { name: 'Coral', hex: '#FF5A48', role: 'Accents, logo dot' },
      { name: 'Petal', hex: '#FDE7F3', role: 'Soft surfaces' },
      { name: 'Paper', hex: '#FFFFFF', role: 'Page background' },
      { name: 'Ink', hex: '#1F1A24', role: 'Text' },
    ],
    logoUse: [
      'Reverse lockup (white wordmark) on gradient panels for big brand moments.',
      'The looping mark is cropped huge as a supergraphic behind headlines.',
      'App icon: a white mark on the full gradient. Loud on purpose.',
    ],
    imagery: [
      'Editorial portraits with colour-blocking and gradient duotones.',
      'Type-led posters: plain statements ("PrEP is prevention.") in big serif.',
      'Confident, joyful, looking at the camera. Never shame or fear imagery.',
    ],
    voice: {
      do: ['Say it straight: "HIV", "sex", "PEP"', 'Challenge stigma, not people', 'Confident, short, quotable', 'Use questions people really ask'],
      dont: ['Shock tactics on serious topics', 'Bold voice inside safety and GBV flows (go calm there)', 'Slang that will date fast'],
    },
    copy: {
      tagline: 'No shame. Just say it.',
      splashLine: 'The questions you were taught to whisper deserve real answers.',
      onboarding: [
        { title: 'Say the thing', body: 'Sex, STIs, HIV, PrEP, PEP, your mood: ask it exactly how it is. Nothing is too awkward.' },
        { title: 'Real experts, real answers', body: 'Want a pro to weigh in? A verified health professional can review your question.' },
        { title: 'Loud together, anonymous alone', body: 'Join the Circle under a nickname. Share, support, and break the silence.' },
      ],
      ageGateTitle: 'You’re 18+, right?',
      ageGateBody: 'Our first pilot is for women 18 and older.',
      pinTitle: 'Lock it down',
      pinBody: 'Pick 4 digits. Your conversations stay yours.',
      homeGreeting: (name) => `${name}, what’s up?`,
      homePrompt: 'Ask the thing you’ve been holding in.',
      askPlaceholder: 'Say it. No filter needed…',
      aiLabel: 'SAYO AI',
      summaryIntro: 'Here’s your story, in short. Fix anything I got wrong.',
      summaryConfirm: 'Yep, that’s right',
      reviewReadyTitle: 'A pro answered you',
      notificationLock: 'New message waiting',
      circleIntro: 'No names, no judgement. Just the real stuff.',
      circleEmpty: 'Be the first to say it.',
      findCareIntro: 'Verified places that won’t judge you.',
      myReviewsEmpty: 'Nothing here yet. Ask a pro when you’re ready.',
      errorGeneric: 'That didn’t go through. Your words are safe. Try again?',
      ctaPrimary: 'Say it',
    },
    risks: [
      'Too loud for someone in crisis or on a shared phone; safety flows must switch to a calm mode.',
      'Gradient-heavy screens cost contrast; body text never sits on the gradient.',
    ],
  },
  ink: {
    id: 'ink',
    round: 2,
    hero: { dark: false, logo: 'color' },
    emphasize: ['Privately', 'like to ask', 'own words', 'is ready'],
    letter: 'D',
    name: 'Ink',
    persona: 'The discreet, trusted friend who keeps things between you.',
    oneLiner: 'Deep ink and crisp paper; coral only where it matters. Private, premium, quietly confident.',
    traits: ['Private', 'Assured', 'Modern'],
    fonts: {
      display: 'Newsreader',
      body: 'Manrope',
      note: 'A light editorial serif (with one italic word for emphasis) over a precise, friendly sans.',
    },
    palette: [
      { name: 'Ink', hex: '#1F2A44', role: 'Primary actions, headings' },
      { name: 'Coral', hex: '#F6544A', role: 'Logo dot, one highlight per screen' },
      { name: 'Paper', hex: '#FAF8F5', role: 'Page background' },
      { name: 'Mist', hex: '#EEF1F6', role: 'Soft panels, selected states' },
      { name: 'Slate', hex: '#5B6478', role: 'Secondary text' },
      { name: 'Sage', hex: '#2F7D62', role: 'Verified Professional' },
    ],
    logoUse: [
      'Full-colour lockup on Paper: the gradient mark is the only pink on most screens, so it glows.',
      'Ink single-colour logo for discreet places (notifications, login, documents).',
      'App icon: the gradient mark on an Ink tile. Reads as a calm, premium app.',
    ],
    imagery: [
      'Faceless and still-life photography in cool, early-morning light.',
      'Line illustrations in Ink with a single coral detail.',
      'Never clinical stock; never a face next to a specific condition.',
    ],
    voice: {
      do: ['Calm and direct', 'Short sentences; say what happens next', 'Reassure with facts, not adjectives', 'Name topics plainly'],
      dont: ['Exclamation marks', 'Slang or emoji', 'Corporate hedging'],
    },
    copy: {
      tagline: 'Ask anything. Privately.',
      splashLine: 'Trusted health answers, a professional when you want one, and care near you.',
      onboarding: [
        { title: 'Ask in your own words', body: 'Sex, periods, HIV, PrEP, contraception, how you feel. SAYO listens first, then explains clearly.' },
        { title: 'A professional can review it', body: 'If you choose, a verified health professional reads your question and replies here.' },
        { title: 'Find the right care', body: 'When you need to be seen, SAYO shows verified services near you.' },
      ],
      ageGateTitle: 'Are you 18 or older?',
      ageGateBody: 'The SAYO pilot is for women aged 18 and over.',
      pinTitle: 'Choose a 4-digit PIN',
      pinBody: 'It keeps your conversations private on this phone.',
      homeGreeting: (name) => `Hello, ${name}`,
      homePrompt: 'What would you like to ask?',
      askPlaceholder: 'Write it the way you’d say it…',
      aiLabel: 'SAYO (AI)',
      summaryIntro: 'Here is what you told me. Correct anything that’s wrong.',
      summaryConfirm: 'That’s right',
      reviewReadyTitle: 'Your reply is ready',
      notificationLock: 'You have a new message',
      circleIntro: 'A moderated space to share under a nickname.',
      circleEmpty: 'Nothing here yet. Start the conversation.',
      findCareIntro: 'Verified services. Call ahead to check hours.',
      myReviewsEmpty: 'When you ask a professional, their reply will appear here.',
      errorGeneric: 'That didn’t go through. Your message is saved; please try again.',
      ctaPrimary: 'Get started',
    },
    risks: [
      'Can feel cool or corporate if the type and imagery aren’t warm.',
      'Navy is common in fintech and insurance; the serif and the coral detail must carry personality.',
    ],
  },
  clay: {
    id: 'clay',
    round: 2,
    hero: { dark: false, logo: 'color' },
    emphasize: ['own words', 'on your mind', 'your PIN', 'is ready'],
    letter: 'E',
    name: 'Clay',
    persona: 'The older cousin with a warm home and good advice.',
    oneLiner: 'Cream and sand, terracotta and a touch of marigold. Warm, grounded and West African without cliché.',
    traits: ['Warm', 'Grounded', 'Welcoming'],
    fonts: {
      display: 'Newsreader',
      body: 'DM Sans',
      note: 'Light serif headlines with an italic accent word (the AskTia move), over a clean, round sans.',
    },
    palette: [
      { name: 'Terracotta', hex: '#A8452F', role: 'Primary actions' },
      { name: 'Cream', hex: '#FCF6EE', role: 'Page background' },
      { name: 'Sand', hex: '#EFE3D3', role: 'Bands, soft panels' },
      { name: 'Wine', hex: '#6E1F3F', role: 'Headings accents, icons' },
      { name: 'Marigold', hex: '#F2A93B', role: 'Small highlights' },
      { name: 'Cocoa', hex: '#2B2522', role: 'Text' },
    ],
    logoUse: [
      'Full-colour lockup on Cream. The pink gradient reads as a flower against the earth tones.',
      'Sand bands alternate with Cream to separate sections, like AskTia.',
      'App icon: the gradient mark on a Sand tile.',
    ],
    imagery: [
      'Warm photography of real Accra interiors and courtyards: terracotta, mustard, plants.',
      'Gouache illustration in clay and marigold for Learn and empty states.',
      'Line icons in Wine; never stock clinic photos.',
    ],
    voice: {
      do: ['Warm and steady', 'Talk like family who knows health', 'Explain why, then what to do', 'Plain words'],
      dont: ['Baby talk', 'Too many emoji', 'Pretend to diagnose'],
    },
    copy: {
      tagline: 'Your health, in your own words.',
      splashLine: 'A private place to ask, understand, and find the right care.',
      onboarding: [
        { title: 'Say it your way', body: 'Ask about sex, HIV, PrEP, contraception, your mood, anything. No judgement here.' },
        { title: 'A professional can take a look', body: 'Want a second opinion? A verified health professional can review your question.' },
        { title: 'You’re not alone', body: 'Join the Circle under a nickname and hear from women like you.' },
      ],
      ageGateTitle: 'Quick check: are you 18 or older?',
      ageGateBody: 'Our first pilot is for women aged 18 and over.',
      pinTitle: 'Set your PIN',
      pinBody: 'Four digits only you know keep your conversations private.',
      homeGreeting: (name) => `Welcome back, ${name}`,
      homePrompt: 'What’s on your mind?',
      askPlaceholder: 'Tell me in your own words…',
      aiLabel: 'SAYO (AI)',
      summaryIntro: 'Here’s what I understood. Is it right?',
      summaryConfirm: 'Yes, that’s right',
      reviewReadyTitle: 'Your answer is ready',
      notificationLock: 'You have a new message',
      circleIntro: 'Real talk from women like you. Kind, anonymous, moderated.',
      circleEmpty: 'It’s quiet here today. Want to start?',
      findCareIntro: 'Places near you that we’ve checked.',
      myReviewsEmpty: 'No reviews yet. When you ask a professional, it will be here.',
      errorGeneric: 'Something went wrong on our side. Your words are saved; try again soon.',
      ctaPrimary: 'Let’s begin',
    },
    risks: [
      'Earth tones can go muddy: contrast must be checked on every surface.',
      'Close to AskTia’s look; the logo, imagery and Ghanaian specificity must make it SAYO’s own.',
    ],
  },
  quiet: {
    id: 'quiet',
    round: 2,
    hero: { dark: false, logo: 'color' },
    letter: 'F',
    name: 'Quiet',
    persona: 'Nothing on the screen gives you away.',
    oneLiner: 'Off-white and charcoal; the logo is almost the only colour. Maximum discretion on a shared phone.',
    traits: ['Discreet', 'Calm', 'Clear'],
    fonts: {
      display: 'Manrope',
      body: 'Manrope',
      note: 'One quiet sans for everything, like a banking or health-records app. Hierarchy comes from weight and space.',
    },
    palette: [
      { name: 'Charcoal', hex: '#2A2D32', role: 'Primary actions, text (from the wordmark)' },
      { name: 'Linen', hex: '#F6F5F2', role: 'Page background' },
      { name: 'White', hex: '#FFFFFF', role: 'Cards' },
      { name: 'Stone', hex: '#E9E7E2', role: 'Soft panels, dividers' },
      { name: 'Coral', hex: '#F6544A', role: 'Logo dot and focus only' },
      { name: 'Sage', hex: '#2F7D62', role: 'Verified Professional' },
    ],
    logoUse: [
      'Charcoal single-colour logo inside the app; the full-colour lockup only on splash and marketing.',
      'Optional neutral app icon and name for shared phones.',
      'Coral appears only as the dot and keyboard focus ring.',
    ],
    imagery: [
      'Very little imagery inside the app; warmth comes from words and small line illustrations.',
      'Brand-built abstraction (the loop) for splash and marketing.',
      'No faces inside private flows.',
    ],
    voice: {
      do: ['Plain, kind, brief', 'Say exactly what happens next', 'Respect her time and privacy', 'Name topics plainly when she opens them'],
      dont: ['Personality for its own sake', 'Emoji', 'Health words on screens she might show others'],
    },
    copy: {
      tagline: 'Say it here. It stays here.',
      splashLine: 'Private health questions, professional review and care near you.',
      onboarding: [
        { title: 'Ask privately', body: 'Describe what’s happening in your own words. SAYO asks a few questions and gives clear information.' },
        { title: 'Professional review', body: 'Choose to have a verified health professional review your question. They reply here.' },
        { title: 'Care near you', body: 'See verified services when you need to be seen.' },
      ],
      ageGateTitle: 'Confirm you are 18 or older',
      ageGateBody: 'The SAYO pilot is currently for women aged 18 and over.',
      pinTitle: 'Create a PIN',
      pinBody: 'Your PIN locks your conversations on this device.',
      homeGreeting: (name) => `Hi ${name}`,
      homePrompt: 'How can we help?',
      askPlaceholder: 'Describe what’s happening…',
      aiLabel: 'SAYO (AI)',
      summaryIntro: 'Check this summary. You can change anything.',
      summaryConfirm: 'Correct',
      reviewReadyTitle: 'Your review is ready',
      notificationLock: 'You have a new update',
      circleIntro: 'A moderated community. Use a nickname only.',
      circleEmpty: 'No posts yet.',
      findCareIntro: 'Verified services near you.',
      myReviewsEmpty: 'No reviews yet.',
      errorGeneric: 'That didn’t work. Your message is saved. Try again.',
      ctaPrimary: 'Get started',
    },
    risks: [
      'Can feel cold or generic to 18–24s; imagery and voice must carry warmth.',
      'Least memorable in marketing unless the splash and campaigns use the full brand.',
    ],
  },
  grove: {
    id: 'grove',
    round: 2,
    hero: { dark: true, logo: 'onDark' },
    emphasize: ['real answers', 'top of mind', 'one question', 'real professionals', 'is here', 'your space', 'close to you'],
    letter: 'G',
    name: 'Grove',
    persona: 'The friend who is also a clinician: modern, assured, on your side.',
    oneLiner: 'White space, deep forest panels and a lime spark on them. Confident, modern care, built on what works at Hers.',
    traits: ['Confident', 'Modern', 'Caring'],
    fonts: {
      display: 'Hanken Grotesk',
      body: 'Hanken Grotesk',
      note: 'One tight, confident grotesque (standing in for Hers’s Care Sans). Headlines are two-tone: the promise takes the colour.',
    },
    palette: [
      { name: 'Forest', hex: '#2F4A34', role: 'Primary buttons on white, accents, icons' },
      { name: 'Deep moss', hex: '#2B3524', role: 'Hero panels (with a light beam)' },
      { name: 'Lime', hex: '#C5ED82', role: 'Buttons and headline emphasis on forest panels only' },
      { name: 'Sage mist', hex: '#EEF3EA', role: 'Soft panels, tiles' },
      { name: 'White', hex: '#FFFFFF', role: 'Page background' },
      { name: 'Teal', hex: '#1F6F78', role: 'Verified Professional (green is the brand here)' },
    ],
    logoUse: [
      'Gradient mark with a white wordmark on forest panels: pink and green are complementary, so the mark glows.',
      'Full-colour lockup on white everywhere else.',
      'App icon: the gradient mark on a deep moss tile.',
    ],
    imagery: [
      'Serene portraits against sky and greenery, natural light, quiet confidence.',
      'Soft-3D objects floating on forest-green gradients with a beam of light.',
      'Large rounded “bento” tiles: one photo or object, one line of text.',
    ],
    voice: {
      do: ['Warm and assured: you deserve this', 'Lead with the promise, then the how', 'Guide people in: “Not sure where to begin? Start here”', 'Two-tone headlines that stress the promise'],
      dont: ['Outcome promises or statistics we cannot support', 'Testimonials or before/after claims about health results', 'Sales language: SAYO has nothing to sell'],
    },
    copy: {
      tagline: 'Your questions deserve real answers.',
      splashLine: 'Ask privately, hear from a verified professional, and find care close to you.',
      onboarding: [
        { title: 'Start with one question', body: 'Sex, HIV, PrEP, contraception, your mood. Ask it your way and get clear, evidence-based information.' },
        { title: 'Reviewed by real professionals', body: 'Choose to have a verified health professional review your question. Their reply comes to you here.' },
        { title: 'Care that’s close to you', body: 'When you need to be seen, SAYO points you to verified services nearby.' },
      ],
      ageGateTitle: 'First, are you 18 or older?',
      ageGateBody: 'The SAYO pilot is for women aged 18 and over.',
      pinTitle: 'Protect your space',
      pinBody: 'A 4-digit PIN keeps your conversations yours.',
      homeGreeting: (name) => `Hi ${name}`,
      homePrompt: 'What’s top of mind today?',
      askPlaceholder: 'Ask it your way…',
      aiLabel: 'SAYO (AI)',
      summaryIntro: 'Here’s what I heard. Change anything that’s off.',
      summaryConfirm: 'Looks right',
      reviewReadyTitle: 'Your reply is here',
      notificationLock: 'You have a new message',
      circleIntro: 'Women like you, sharing openly under nicknames.',
      circleEmpty: 'No posts yet. Be the first.',
      findCareIntro: 'Verified care, close to you.',
      myReviewsEmpty: 'Your professional replies will show up here.',
      errorGeneric: 'That didn’t go through. Your message is saved, so please try again.',
      ctaPrimary: 'Get started',
    },
    risks: [
      'Deep forest panels sit close to a dark UI, which the brief rules out: keep them to hero moments on white pages.',
      'Green is the brand here, so Verified Professional moves to teal. Test that it still reads as distinct.',
      'Hers sells treatments. SAYO must not borrow its outcome claims, pricing or sales patterns.',
    ],
  },
}

export const DIRECTION_IDS: DirectionId[] = ['ink', 'clay', 'quiet', 'grove']
export const ROUND1_IDS: DirectionId[] = ['sister', 'clear', 'unmuted']
export const ALL_DIRECTION_IDS: DirectionId[] = [...DIRECTION_IDS, ...ROUND1_IDS]
