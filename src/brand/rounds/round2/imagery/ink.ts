import type { R2Image } from './types'

const DIR = '/imagery/round2/ink'
const MODEL = 'gpt_image_2_6 (medium)'
/** Every photograph after the hero was generated with the hero passed as a style reference. */
const MODEL_REF = 'gpt_image_2_6 (medium) + hero as style reference'

/** Round-2 imagery for the ink direction. Filled in by the imagery agent. */
export const INK_IMAGES: R2Image[] = [
  {
    slot: 'hero',
    src: `${DIR}/hero.jpg`,
    alt: 'A woman in a navy shirt and off-white linen trousers, seen from the collar down, holding a phone in both hands beside a sheer curtain',
    ratio: '3:4',
    model: MODEL,
    prompt:
      'Editorial lifestyle photograph, faceless crop: a young adult West African woman with deep brown skin seated by a window, framed from the collarbone down to the lap so her head and face are entirely out of frame. She wears a loose, fully buttoned deep ink navy (#1F2A44) long-sleeved cotton shirt and wide off-white linen trousers, modest and relaxed. Both hands hold a smartphone at chest height in the upper half of the frame, screen turned away from the camera; natural hands with five fingers each, short natural nails, one thin coral (#F6544A) thread bracelet on her wrist as the only warm colour. Behind her a sheer white curtain glows with cool, soft early-morning daylight; paper-white wall (#FAF8F5), mist blue-grey shadows (#EEF1F6), slate tones. The lower third of the frame is calm and uncluttered: only the soft folds of the off-white linen trousers and a pale linen seat. Private, premium, calm, quietly confident. Shot on 50mm, shallow depth of field, fine grain, muted cool colour grade. No face, no text, no letters, no numbers, no logos, no animals.',
  },
  {
    slot: 'wide',
    src: `${DIR}/wide.jpg`,
    alt: 'A quiet room corner: a navy shirt over a chair, and a cup, navy notebook and face-down phone on a small table by a sheer curtain',
    ratio: '16:9',
    model: MODEL_REF,
    prompt:
      'Wide still-life interior photograph in the same cool early-morning light, colour grade and materials as the reference image. A quiet corner by a tall window with a floor-length sheer white curtain on the right half of the frame; on a small pale wooden side table in the upper right sit a plain off-white ceramic cup, a closed deep ink navy (#1F2A44) clothbound notebook and a smartphone lying face down; a deep ink navy linen shirt is folded over the back of a simple chair. One small coral (#F6544A) ribbon bookmark hanging from the notebook is the only warm colour. The left half and especially the bottom-left of the frame is calm empty space: plain paper-white wall (#FAF8F5) and a pale linen daybed surface in soft mist blue-grey shadow (#EEF1F6), uncluttered. Private, premium, calm. No people, no text, no letters, no numbers, no logos, no animals.',
  },
  {
    slot: 'tile-ask',
    src: `${DIR}/tile-ask.jpg`,
    alt: 'Two hands in navy shirt cuffs typing on a phone resting on pale linen, a thin coral bracelet on one wrist',
    ratio: '4:3',
    model: MODEL_REF,
    prompt:
      'Close-up photograph in the same cool early-morning light and colour grade as the reference image: seen from above at an angle, the two hands of a young adult West African woman with deep brown skin typing with her thumbs on a smartphone, resting on a pale off-white linen tablecloth. Only hands and forearms in frame, wearing the buttoned cuffs of a deep ink navy (#1F2A44) long-sleeved cotton shirt. The phone screen shows only a blank soft white glow, completely empty, nothing readable on it. Natural, relaxed hands with five fingers each, short natural nails, a thin coral (#F6544A) thread bracelet on one wrist as the only warm colour. Soft window light from the left, mist blue-grey shadows, shallow depth of field. Calm, private, dignified. No face, no text, no letters, no numbers, no icons, no logos, no animals.',
  },
  {
    slot: 'tile-review',
    src: `${DIR}/tile-review.jpg`,
    alt: 'A sealed white envelope with a small coral wax dot on linen, beside a folded note card and a navy fountain pen',
    ratio: '4:3',
    model: MODEL_REF,
    prompt:
      'Still-life photograph in the same cool early-morning light and colour grade as the reference image: a single sealed paper-white envelope lying centred on softly creased off-white linen, closed with one small round coral (#F6544A) wax seal dot, plain and unstamped with no emblem. Beside it a folded sheet of thick cream note paper and a deep ink navy (#1F2A44) fountain pen. Soft window light from the left with long mist blue-grey shadows, slate tones, shallow depth of field. Trusted, careful, private. No people, no hands, no text, no handwriting, no letters, no numbers, no stamps, no logos, no animals.',
  },
  {
    slot: 'tile-care',
    src: `${DIR}/tile-care.jpg`,
    alt: 'A navy door standing ajar in a white wall, morning light spilling through the gap, a coral tag hanging from the key',
    ratio: '4:3',
    model: MODEL_REF,
    prompt:
      'Still-life interior photograph in the same cool early-morning colour grade as the reference image: a plain panelled door painted deep ink navy (#1F2A44) standing ajar in a paper-white wall (#FAF8F5), soft early-morning light spilling through the gap in a clear band across a pale floor. A key sits in the door\'s lock with one small coral (#F6544A) leather key tag hanging from it, the only warm colour. Mist blue-grey shadows, calm and welcoming, the door centred. Minimal, premium, quiet. No people, no signs, no text, no letters, no numbers, no logos, no animals.',
  },
  {
    slot: 'tile-circle',
    src: `${DIR}/tile-circle.jpg`,
    alt: 'Six cups of tea in a loose circle on a linen-covered table, in white, grey and navy with one small coral cup',
    ratio: '4:3',
    model: MODEL_REF,
    prompt:
      'Still-life photograph in the same cool early-morning light and colour grade as the reference image, seen from above: six plain ceramic cups of tea arranged in a loose, friendly circle on a round pale wooden table covered with an off-white linen cloth. The cups are slightly different shapes in paper-white, mist blue-grey (#EEF1F6), slate and deep ink navy (#1F2A44); exactly one small cup is coral (#F6544A), the only warm colour. Soft window light from the left, gentle long shadows, a navy linen napkin at one edge. Warm company implied without anyone in frame. No people, no hands, no text, no letters, no numbers, no logos, no animals.',
  },
  {
    slot: 'topic-prep',
    src: `${DIR}/topic-prep.jpg`,
    alt: 'A bedside table with a glass of water, one small pale-blue tablet in a white dish, a navy notebook and a face-down phone',
    ratio: '3:2',
    model: MODEL_REF,
    prompt:
      'Still-life photograph of a calm morning routine in the same cool early-morning light and colour grade as the reference image: centred on a pale wooden bedside table, a clear glass of water and a small paper-white ceramic dish holding one small pale-blue oval tablet. Beside them a closed deep ink navy (#1F2A44) notebook with a thin coral (#F6544A) ribbon bookmark, the only warm colour, and a smartphone lying face down. A sheer curtain softly out of focus behind, mist blue-grey shadows. Matter-of-fact, everyday, confident; like taking a daily vitamin. Subject centred with calm space left and right. No people, no hands, no pill bottles, no labels, no text, no letters, no numbers, no logos, no animals.',
  },
  {
    slot: 'topic-contraception',
    src: `${DIR}/topic-contraception.jpg`,
    alt: 'A neat row on linen: a round pill pack with one coral tablet, a plain white sachet, a clear flexible ring and a navy zipped pouch',
    ratio: '3:2',
    model: MODEL_REF,
    prompt:
      'Still-life photograph in the same cool early-morning light and colour grade as the reference image, seen from above: a few small everyday objects laid out in a neat, evenly spaced, centred row on off-white linen, suggesting a calm choice between options: a round dial pack of small white tablets with exactly one coral (#F6544A) tablet, a small plain unprinted paper-white square sachet, a small flexible translucent ring, and a deep ink navy (#1F2A44) zipped fabric pouch. Everything plain and unprinted with no markings. Soft window light from the left, mist blue-grey shadows, slate tones. Matter-of-fact, tidy, unembarrassed. Calm space above and below the row. No people, no hands, no packaging print, no labels, no text, no letters, no numbers, no logos, no animals.',
  },
  {
    slot: 'topic-mood',
    src: `${DIR}/topic-mood.jpg`,
    alt: 'Two hands in cream knit sleeves wrapped around a white cup of tea, resting on a chunky navy blanket',
    ratio: '3:2',
    model: MODEL_REF,
    prompt:
      'Close-up photograph in the same cool early-morning light and colour grade as the reference image: the two hands of a young adult West African woman with deep brown skin wrapped gently around a plain paper-white ceramic cup of tea, resting on her lap on a chunky deep ink navy (#1F2A44) knitted blanket. She wears a soft oversized cream long-sleeved knit jumper with the sleeves pulled down to her knuckles; only hands, cup, sleeves and blanket are in frame, centred. A thin coral (#F6544A) thread bracelet just visible at one wrist is the only warm colour. Soft window light, mist blue-grey shadows, shallow depth of field. Restful, safe, unhurried; a quiet pause, not sadness. Natural hands with five fingers each. No face, no text, no letters, no numbers, no logos, no animals.',
  },
  {
    slot: 'empty',
    src: `${DIR}/empty.jpg`,
    alt: 'A speech bubble drawn in one navy line with a single coral dot inside',
    ratio: '1:1',
    model: MODEL,
    prompt:
      'Minimal line illustration for an app empty state: a single rounded speech bubble drawn in one continuous, even, medium-weight hand-drawn line in deep ink navy #1F2A44, centred on a flat plain paper-white #FAF8F5 background, with exactly one small solid coral #F6544A dot inside the bubble. Nothing else: no shading, no gradient, no texture, no second colour, generous empty margin all round. Bold and simple enough to read clearly at 120 pixels. No text, no letters, no numbers, no punctuation marks, no logo, no face.',
  },
]

/** Honest notes from generating these: what works, what is weak. */
export const INK_NOTES: string[] = [
  'All ten slots came from one pass (no rejects). Passing the hero as a style reference held the cool morning grade, linen and navy across the set, and the "one coral detail" rule survived in every frame (bracelet, bookmark, wax dot, key tag, one cup, one tablet).',
  'Three frames show hands (hero, tile-ask, topic-mood). They are anatomically clean and fully clothed, but tile-ask is the weakest: the hands read a little large and neutral, and the blank white phone screen looks like a mock-up waiting for UI. Composite a real screen or reshoot.',
  'tile-care (the navy door) is the most "rendered" image; next to the photographs it reads as CGI. Fine at tile size, not at hero size.',
  'topic-contraception names the topic plainly (pill pack, sachet, ring, pouch). That suits the Ink voice, but it is the least discreet image in the set; do not use it on a lock screen, notification or shared-phone surface. topic-prep shows a pale-blue tablet for the same reason and needs clinical sign-off before launch.',
  'The grade is cool and slightly blue; by eye the backgrounds sit nearer Mist than Paper (not measured), so check them against Paper before placing them edge to edge. The set is calm and premium but emotionally reserved; there is no joy in it, by design.',
]
