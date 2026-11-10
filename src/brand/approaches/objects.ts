import type { Approach } from './types'

const MODEL = 'gpt_image_2_6 (medium)'
const DIR = '/imagery/approaches/objects'

/** Approach 5. Images and notes are filled in by the imagery agent; concept text can be refined. */
export const OBJECTS: Approach = {
  slug: 'objects',
  number: 5,
  name: 'Soft 3D health objects',
  idea: 'Friendly, tactile 3D/clay renders of the actual things: a PrEP pill bottle, a pill pack, a condom, a phone, a heart.',
  why: [
    'Names the topic plainly without a person attached (de-stigmatising)',
    'Great for Learn content and topic chips',
    'Very ownable with brand colours',
    'Shows a condom or pill pack matter-of-factly; a photo of the same thing feels far more loaded',
  ],
  risks: [
    '3D can feel playful on serious topics',
    'Needs clinical review so objects are accurate (pill packs, kits)',
    'The soft-3D icon look is everywhere in apps right now; colour alone has to make it SAYO',
  ],
  scores: { privacy: 5, warmth: 3, distinct: 3, scalable: 5 },
  bestFor: [
    'Learn cards and topic icons',
    'Ask SAYO topic starters',
    'Find Care categories',
    'Empty states',
  ],
  avoidFor: [
    'GBV and crisis moments',
  ],
  images: [
    {
      src: `${DIR}/hero-sister.jpg`,
      alt: 'Soft 3D rose heart, a phone with a peach chat bubble and a small pill bottle in warm golden light',
      ratio: '3:4',
      use: 'hero',
      direction: 'sister',
      model: MODEL,
      prompt:
        'Soft 3D clay render, tactile matte finish, gentle rounded forms: a friendly still-life of a puffy rose-pink heart, a rounded smartphone showing a single empty peach chat bubble on its screen, and a small rounded pill bottle with a coral cap, grouped together on a soft blush (#FFF7F3) floor against a peach (#FFD9C7) backdrop. Warm golden studio light from the upper left, soft long shadows, subtle subsurface glow. Accurate, respectful, calm, premium; not cartoonish or jokey. Generous empty space at the top. No text, no letters, no labels, no logos, no faces.',
    },
    {
      src: `${DIR}/hero-clear.jpg`,
      alt: 'Soft 3D lavender crescent moon holding a small plum heart, resting on a cloud',
      ratio: '3:4',
      use: 'hero',
      direction: 'clear',
      model: MODEL,
      prompt:
        'Soft 3D clay render, smooth matte lavender and plum materials: a calm floating composition of a plump crescent moon, a soft rounded cloud and a small padded heart, gently stacked and balanced, on a pale mist (#FAF8FC) background fading to lavender (#EDE4F7). Diffused soft lilac light, very soft shadows, airy and serene, lots of negative space. Accurate, gentle, premium; not jokey. No text, no letters, no logos, no faces.',
    },
    {
      src: `${DIR}/hero-unmuted.jpg`,
      alt: 'Soft 3D chat bubble, heart, shield and pill bottle wrapped in a ribbon on a magenta-to-coral gradient',
      ratio: '3:4',
      use: 'hero',
      direction: 'unmuted',
      model: MODEL,
      prompt:
        'Bold soft 3D render, matte clay with a slight satin sheen: a dynamic floating arrangement of a large rounded chat bubble, a puffy heart, a rounded shield and a small pill bottle with a rounded cap, in white, petal pink and hot magenta, set against a vivid diagonal gradient background from magenta #D4009E to coral #FF5A48. Energetic, confident, celebratory, crisp lighting with soft shadows. Premium and respectful, not childish. No text, no letters, no labels, no logos, no faces.',
    },
    {
      src: `${DIR}/wide.jpg`,
      alt: 'Soft 3D heart, pill bottle, phone with chat bubble and cloud grouped on the right of a blush background',
      ratio: '16:9',
      use: 'wide',
      model: MODEL,
      prompt:
        'Wide soft 3D clay render on a seamless blush-pink (#FFF7F3) background: on the right third of the frame, a tidy group of tactile matte objects: a rose heart, a rounded smartphone with an empty chat bubble on screen, a small unlabelled pill bottle with a coral cap, and a soft peach cloud. The entire left half and bottom-left of the frame is clean empty blush space. Warm soft studio light, gentle shadows, premium, calm. No text, no letters, no labels, no logos, no faces.',
    },
    {
      src: `${DIR}/topic-prep.jpg`,
      alt: 'Soft 3D unlabelled white pill bottle with a plum cap, two lavender tablets and a small shield in a row',
      ratio: '3:2',
      use: 'topic',
      topic: 'PrEP is prevention',
      model: MODEL,
      prompt:
        'Soft 3D render, matte clay and soft plastic, wide minimal composition: a small generic rounded white medicine bottle with a closed plum-coloured screw cap, completely unlabelled, standing upright, with two smooth oval lavender tablets resting neatly beside it and a small rounded lavender shield standing next to them, arranged in a tidy horizontal row. The group is small and sits exactly in the vertical centre of the frame, occupying less than half the image height, with generous even lavender space above and below. Clean lavender (#EDE4F7) background, soft diffused studio light, gentle shadows. Accurate, calm, reassuring, premium; not cartoonish. No text, no letters, no labels, no logos, no brand names.',
    },
    {
      src: `${DIR}/topic-contraception.jpg`,
      alt: 'Soft 3D pill blister pack and a sealed rose-pink condom wrapper side by side on peach',
      ratio: '4:3',
      use: 'topic',
      topic: 'Your contraception options',
      model: MODEL,
      prompt:
        'Soft 3D render, tactile matte materials, tasteful product still-life: a contraceptive pill blister pack (rounded rectangle, pearlescent foil, neat rows of small round peach tablets, no printing) lying flat, and beside it a single sealed square condom wrapper in rose pink foil with a softly crimped edge, plain and unprinted. Clean peach (#FFD9C7) background, warm soft studio light, gentle shadows. Respectful, matter-of-fact, accurate, non-sexual, calm and premium. No text, no letters, no numbers, no labels, no logos.',
    },
    {
      src: `${DIR}/topic-mood.jpg`,
      alt: 'Soft 3D lilac cloud with a glowing crescent moon and two small stars on a dusky plum background',
      ratio: '4:3',
      use: 'topic',
      topic: 'When your mood feels heavy',
      model: MODEL,
      prompt:
        'Soft 3D clay render: a plump soft lilac cloud resting gently, with a small glowing pale-yellow crescent moon tucked behind it and two tiny soft stars, on a calm dusky lavender (#EDE4F7) to plum gradient background. Very soft, comforting, quiet light, cosy and reassuring mood, like a weighted blanket. Matte, tactile, premium, not jokey. No text, no letters, no logos, no faces.',
    },
    {
      src: `${DIR}/empty.jpg`,
      alt: 'Soft 3D rose speech bubble with a small pink heart inside',
      ratio: '1:1',
      use: 'empty',
      model: MODEL,
      prompt:
        'Minimal soft 3D clay render: a single small rounded speech bubble in matte rose pink (#D62B63) with a tiny puffy heart inside it, centred, floating with a soft shadow beneath, on a plain pale blush (#FFF7F3) background. Lots of empty space around it, simple bold silhouette that reads clearly at small icon size. No text, no letters, no logos.',
    },
  ],
  notes: [
    'All 8 were clean on the first try, with no text artefacts and no anatomy to go wrong, so this is the easiest approach to scale and keep consistent. One layout lesson: the Learn card crops to about 2.5:1, so a tall upright bottle became a blank white band. PrEP was redone small and centred in a row. A "pills spilling from the bottle" version was rejected: it was physically wrong and spilled pills read as overdose. Brief every topic object as a low, wide row.',
    'The contraception card works: a blister pack and a sealed condom wrapper, side by side, read as plain information, not innuendo. A photo of the same objects would feel more loaded. The pack is a generic 28-pill grid with no day markers; real packs vary, so clinical review is still needed before launch.',
    'Mood (cloud and moon) is gentle and right for "heavy" without showing a sad person. Clear is the best fit overall; Big Sister works; Unmuted gets louder and edges toward sticker-pack. The ribbon swirl added there is decoration with no meaning.',
    'Honest downside: this is the generic soft-3D icon style many apps already use. I lowered "distinctive" from 4 to 3. To own it, fix a small object set and a strict SAYO palette and lighting recipe, then add West African cues (wax-print textures, local pack shapes).',
    'Recommend for Learn cards, topic chips, Ask SAYO starters and empty states, paired with a people or faceless approach for brand moments. Do not use for GBV or crisis.',
  ],
}
