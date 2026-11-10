import type { Approach } from './types'

const MODEL = 'Higgsfield Soul 2.0 (soul_2, 2k)'
const P = '/imagery/approaches/candid'

/** Approach 1. Images and notes are filled in by the imagery agent; concept text can be refined. */
export const CANDID: Approach = {
  slug: 'candid',
  number: 1,
  name: 'Candid photography',
  idea: 'Real-feeling moments between young Ghanaian women: friends, sisters, laughter, closeness, in natural light with a film-photo feel.',
  why: [
    'Most human and relatable; says "people like you use this"',
    'Strong for marketing, splash and Circle',
    'Pairs naturally with Big Sister warmth; golden film light is the strongest match for the sister palette',
  ],
  risks: [
    'Ties a recognisable face to stigmatised topics if used near them',
    'Generated people can drift toward stock; final assets need real, consenting models',
    'Generated settings drift away from Accra (US bedrooms, generic streets) unless every prompt anchors the place',
  ],
  scores: { privacy: 2, warmth: 5, distinct: 3, scalable: 3 },
  bestFor: [
    'Splash and onboarding',
    'Marketing and funding decks',
    'Circle welcome',
  ],
  avoidFor: [
    'Anything next to a specific condition (HIV, GBV, pregnancy)',
  ],
  images: [
    {
      src: `${P}/hero-sister.jpg`,
      alt: 'Two young women laughing in a sunlit compound courtyard while one braids the other’s hair',
      ratio: '3:4',
      use: 'hero',
      direction: 'sister',
      prompt:
        'Candid 35mm film photograph of two Ghanaian sisters in their mid-20s with deep brown skin, in a family compound courtyard in Accra, one sitting on a low wooden stool while the other braids her natural hair into cornrows, both laughing, golden late-afternoon sunlight, peach-painted wall, rose and blush cotton dresses, warm and intimate, Kodak Portra 400 colour, full-bleed frame with no border, no film rebate, no letters',
      model: `${MODEL}; cropped locally to remove a fake film-rebate border with garbled lettering`,
    },
    {
      src: `${P}/hero-clear.jpg`,
      alt: 'Two young women in lavender and white talking quietly on a campus bench on a misty morning',
      ratio: '3:4',
      use: 'hero',
      direction: 'clear',
      prompt:
        'Candid 35mm film photograph of two Ghanaian women friends in their 20s sitting side by side on a university campus bench in the shade of a tree, early morning, quiet conversation, one smiling gently while the other listens, soft diffused overcast light, pale lavender and mist-grey tones, lilac and white cotton clothes, fully clothed, calm and private mood, subtle film grain, no text, no logos',
      model: MODEL,
    },
    {
      src: `${P}/hero-unmuted.jpg`,
      alt: 'Two friends in hot pink dancing and laughing on a street at dusk, arms in the air',
      ratio: '3:4',
      use: 'hero',
      direction: 'unmuted',
      prompt:
        'Candid flash film photograph of three Ghanaian women friends in their 20s dancing and laughing on an Accra street at dusk, wearing loose long-sleeve shirts and wide-leg trousers in magenta, hot pink and coral, vivid saturated colour, slight motion blur, high energy and joy, braids, afro and short crop, direct on-camera flash, 35mm grain, full-bleed frame, no signage, no letters',
      model: `${MODEL}; cropped locally to the two left figures (the third outfit had a plunging neckline)`,
    },
    {
      src: `${P}/wide.jpg`,
      alt: 'Four friends sitting on a low wall at golden hour, sharing snacks, with open sky and wall to the left',
      ratio: '16:9',
      use: 'wide',
      prompt:
        'Wide candid 35mm film photograph, four Ghanaian women friends in their 20s sitting together on a low painted wall at the quiet edge of a neighbourhood street in Accra in late afternoon, sharing snacks and laughing, the group placed on the right third of the frame, calm open soft-focus space of warm wall and pale sky on the left and bottom-left, golden peach light, fully clothed, Kodak Portra grain, no text, no logos, no signage',
      model: MODEL,
    },
    {
      src: `${P}/topic-prep.jpg`,
      alt: 'A young woman in a denim jacket smiling at her phone at a shaded café table',
      ratio: '4:3',
      use: 'topic',
      topic: 'PrEP is prevention',
      prompt:
        'Candid 35mm film photograph of a Ghanaian woman in her 20s wearing a denim jacket over a yellow t-shirt, sitting at a small table on a shaded cafe veranda in Accra, looking at her phone with a calm easy half-smile, phone screen facing away from camera, warm natural daylight, everyday moment, box braids tied up, soft bokeh background, film grain, no text, no logos, no signage',
      model: MODEL,
    },
    {
      src: `${P}/topic-contraception.jpg`,
      alt: 'Two friends sitting cross-legged on a bed, talking and laughing',
      ratio: '4:3',
      use: 'topic',
      topic: 'Your contraception options',
      prompt:
        'Candid 35mm film photograph of two Ghanaian women friends in their 20s sitting cross-legged on a bed in a bright simple bedroom, talking openly and smiling, one gesturing as she explains something, the other listening with interest, natural window light, relaxed and comfortable, coral and blush clothes, fully clothed, film grain, no text, no logos',
      model: MODEL,
    },
    {
      src: `${P}/topic-mood.jpg`,
      alt: 'A young woman sitting on steps at dusk with a friend’s arm around her shoulders',
      ratio: '4:3',
      use: 'topic',
      topic: 'When your mood feels heavy',
      prompt:
        'Candid 35mm film photograph of a young Ghanaian woman in her 20s sitting on rooftop steps at dusk with her friend’s arm around her shoulders, quiet reflective moment, calm soft expression, supportive closeness, muted dusky pink and lilac evening light, fully clothed, gentle and tender, not crying, film grain, no text, no logos',
      model: MODEL,
    },
    {
      src: `${P}/empty.jpg`,
      alt: 'Two cups of tea side by side on a sunlit concrete ledge',
      ratio: '1:1',
      use: 'empty',
      prompt:
        'Candid 35mm film still life, two enamel cups of tea resting on a sunlit concrete rooftop ledge with a soft leaf shadow, warm peach late-afternoon light, simple and minimal, lots of plain space around the object, gentle film grain, no people, no text, no logos',
      model: MODEL,
    },
  ],
  notes: [
    'Strongest in warm light. The sister hero (hair-braiding in a courtyard) and the golden-hour wall banner feel real and specific; the clear hero (misty campus bench) shows the approach can go calm too. Unmuted needed flash and night, and drifted toward party and nightlife.',
    'Topic cards were the uncomfortable part, as expected. "Mood feels heavy" is the most honest image (a friend’s arm around her) but it is also the one where a recognisable face sits right next to a mental-health label. PrEP and contraception only work because the images say nothing about the topic: a woman on her phone, two friends talking. That is fine for Learn, but the photo adds warmth, not meaning.',
    'Model drift to watch: rejects for clothing (crop tops and bare midriffs, a plunging neckline) whenever the prompt said "dancing" or "night"; a fake film border with garbled letters (twice, cropped off locally); one harmless prompt (woman reading on a minibus) blocked by the safety filter; settings that slide to US bedrooms and generic streets. Final assets need a real shoot in Accra with consenting models.',
    'The empty state (two cups of tea on a ledge) works tiny and quietly says "a friend is here" without a face. Object stills like this could carry the private screens while faces stay on splash and marketing.',
    '11 generations for 8 kept (Soul 2.0, about 0.12 credits each). Recommend for splash/onboarding (sister or clear), marketing and Circle welcome. Not next to HIV, GBV or pregnancy content.',
  ],
}
