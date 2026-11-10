import type { Approach } from './types'

const MODEL = 'gpt_image_2_6 (medium)'
const KEY = 'Match the illustration style of the reference exactly (gouache brush texture, risograph grain, hand-cut flat shapes, no outlines, natural adult proportions, warm faces) but a new scene'
const RECIPE = 'Flat editorial illustration, contemporary West African picture-book style'

/** Approach 4. Images and notes are filled in by the imagery agent; concept text can be refined. */
export const ILLUSTRATED: Approach = {
  slug: 'illustrated',
  number: 4,
  name: 'Illustrated women',
  idea: 'Warm, specific illustrated young Ghanaian women in everyday Accra scenes: flat gouache shapes with grain, drawn in the brand palette.',
  why: [
    'Can show sensitive moments (a clinic visit, talking to a partner) without tying them to a real person',
    'Consistent and cheap to extend to every topic: one style key image keeps every new scene on-model',
    'Feels friendly, youthful and local: hairstyles, fabrics, louvred windows, bougainvillea, rooftops',
    'Re-colours cleanly per direction (blush for Big Sister, lavender for Clear, magenta for Unmuted)',
  ],
  risks: [
    'Easy to look generic (the "corporate Memphis" trap). This set avoids it only because the style is locked in every prompt',
    'Can feel less premium or less credible than photography',
    'Generated figures are not a real illustrator: final assets should be commissioned from a Ghanaian illustrator using this as the brief',
  ],
  scores: { privacy: 4, warmth: 5, distinct: 4, scalable: 5 },
  bestFor: [
    'Learn cards, empty states, onboarding steps',
    'Splash in every direction',
    'Explaining what happens next (review, clinic visit)',
  ],
  avoidFor: [
    'Funding decks that need proof of real users',
  ],
  images: [
    {
      src: '/imagery/approaches/illustrated/hero-sister.jpg',
      alt: 'Illustration: two young Ghanaian women laughing over one phone on a painted wall under bougainvillea at golden hour',
      ratio: '3:4',
      use: 'hero',
      direction: 'sister',
      prompt: `${RECIPE}: hand-cut organic shapes with visible gouache brush texture and fine risograph grain, no outlines, natural adult proportions (real head-to-body ratio, no tiny heads, no giant limbs), expressive faces with simple features and warm smiles, rich deep-brown skin tones. Scene: two young Ghanaian women in their early twenties sitting on a low painted wall in an Accra neighbourhood at golden hour, sharing one phone and laughing together. One has long knotless braids and a rose-and-coral patterned wrap top; the other has a short natural afro, gold hoop earrings and a peach shirt. Behind them: a bougainvillea spilling over a wall, a painted blue kiosk shutter, a frangipani tree. Palette: blush #FFF7F3, peach #FFD9C7, rose #D62B63, coral #FF5A48 with touches of teal-blue and deep brown. Figures in the upper two thirds of the portrait frame; calm blush ground in the lower third. Fully clothed, adults. No text, no letters, no signs with writing, no logos.`,
      model: `${MODEL}; this is the style key image the other seven reference`,
    },
    {
      src: '/imagery/approaches/illustrated/hero-clear.jpg',
      alt: 'Illustration: a young woman in a lavender headwrap curled up on a sofa reading her phone, tea beside her, louvred window at dusk',
      ratio: '3:4',
      use: 'hero',
      direction: 'clear',
      prompt: `${KEY} with a different woman. ${RECIPE}. Calm palette: mist #FAF8FC, lavender #EDE4F7, plum #6D2E9E, soft peach light, deep-brown skin tones. Scene: a young Ghanaian woman in her early twenties wearing a lavender-and-plum headwrap and small stud earrings, curled up on a sofa beside an open wooden louvred window in the evening, reading on her phone, a mug of tea on a side table, a potted snake plant, a sheer curtain moving. Quiet, private, safe. Figure in the upper two thirds of the portrait frame; lower third calm lavender floor. Fully clothed adult. No text, no letters, no logos.`,
      model: `${MODEL} + style key reference`,
    },
    {
      src: '/imagery/approaches/illustrated/hero-unmuted.jpg',
      alt: 'Illustration: a confident young woman in a bold magenta geometric two-piece striding along an Accra street under a magenta sky',
      ratio: '3:4',
      use: 'hero',
      direction: 'unmuted',
      prompt: `${KEY} with a different woman. ${RECIPE}. Bold saturated palette: magenta #D4009E, coral #FF5A48, petal pink #FFC2DD, deep plum shadows, deep-brown skin tones. Scene: a confident young Ghanaian woman with a high puff of natural hair and headphones around her neck, wearing a magenta two-piece with a bold geometric print, walking mid-stride with a canvas tote bag along an Accra street toward a doorway with a coral-painted frame, smiling, sky a magenta-to-coral gradient, palm silhouettes. Figure fills the upper two thirds of the portrait frame. Fully clothed adult. No text, no letters, no signs with writing, no logos.`,
      model: `${MODEL} + style key reference`,
    },
    {
      src: '/imagery/approaches/illustrated/wide.jpg',
      alt: 'Illustration: three young women laughing on floor cushions on an Accra rooftop at dusk, string lights overhead',
      ratio: '16:9',
      use: 'wide',
      prompt: `${KEY} with different women. ${RECIPE}. Palette: blush #FFF7F3, peach #FFD9C7, rose #D62B63, coral #FF5A48, touches of plum, deep-brown skin tones. Scene: three young Ghanaian women in their twenties on a rooftop at dusk, sitting on floor cushions under a string of warm lights, talking and laughing; one in a patterned headwrap, one with braids in a bun, one with short twists; potted plants, Accra rooftops and water tanks beyond. Place the group in the right half of the frame. The bottom-left third must be calm, plain blush ground with no detail, leaving clean space for a text card. Fully clothed adults. No text, no letters, no logos.`,
      model: `${MODEL} + style key reference`,
    },
    {
      src: '/imagery/approaches/illustrated/topic-prep.jpg',
      alt: 'Illustration: a young woman with locs stretching on her balcony at sunrise, holding a glass of water',
      ratio: '4:3',
      use: 'topic',
      topic: 'PrEP is prevention',
      prompt: `${KEY} with a different woman. ${RECIPE}. Palette: blush, peach, rose, coral, deep-brown skin tones. Scene: a young Ghanaian woman with locs tied up, wearing a coral sleep shirt and wide trousers, standing on her small balcony in the early morning, holding a glass of water and stretching one arm up, sunrise behind her, potted plants and a hanging fern; a calm, confident everyday routine. Fully clothed adult. No pills, no medicine, no medical objects. No text, no letters, no logos.`,
      model: `${MODEL} + style key reference`,
    },
    {
      src: '/imagery/approaches/illustrated/topic-contraception.jpg',
      alt: 'Illustration: two friends at a café table in Osu pointing at a notebook page of coloured circles, iced drinks beside them',
      ratio: '4:3',
      use: 'topic',
      topic: 'Your contraception options',
      prompt: `${KEY} with different women. ${RECIPE}. Palette: peach, rose, coral, lavender, deep-brown skin tones. Scene: two young Ghanaian women friends at a small café table in Osu, Accra, leaning in and chatting over an open notebook; one points at a page showing a row of simple coloured round shapes (no writing); iced drinks with straws, a potted palm; relaxed and curious, comparing choices. Fully clothed adults. No medical objects. No text, no letters, no logos.`,
      model: `${MODEL} + style key reference`,
    },
    {
      src: '/imagery/approaches/illustrated/topic-mood.jpg',
      alt: 'Illustration: a young woman wrapped in a lavender blanket on her bed at night, holding tea and looking calmly at a crescent moon',
      ratio: '4:3',
      use: 'topic',
      topic: 'When your mood feels heavy',
      prompt: `${KEY} with a different woman. ${RECIPE}. Palette: lavender #EDE4F7, plum #6D2E9E, soft peach lamp light, deep-brown skin tones. Scene: a young Ghanaian woman with short natural hair wrapped in a soft lavender blanket, sitting on her bed by a window at night holding a warm mug of tea, gazing calmly at a crescent moon, a small warm lamp glowing beside her. Quiet and reflective, peaceful, gently hopeful, not sad, not crying. Fully clothed adult. No text, no letters, no logos.`,
      model: `${MODEL} + style key reference`,
    },
    {
      src: '/imagery/approaches/illustrated/empty.jpg',
      alt: 'Illustration: a young woman with braids sitting cross-legged on a coral cushion, smiling at her phone, a small plant beside her',
      ratio: '1:1',
      use: 'empty',
      prompt: `${KEY}, a very simple vignette. Small centered vignette on a plain flat blush #FFF7F3 background: a young Ghanaian woman with braids in a rose top sitting cross-legged on a big coral floor cushion, reading on her phone, a small potted plant beside her. Simple bold shapes that read clearly at a tiny size, wide empty space all around, no scenery. Fully clothed adult. No text, no letters, no logos.`,
      model: `${MODEL} + style key reference`,
    },
  ],
  notes: [
    'The stronger of my two approaches, and clearly better than the ChatGPT references: specific women (braids, afro, locs, headwrap, twists), real Accra texture (louvred shutters, bougainvillea, rooftop water tanks, a yellow taxi) and natural proportions, not corporate Memphis.',
    'Consistency came from one trick: generate hero-sister first, then pass it as a style reference to the other seven. All 8 were keepers on the first try, with no rerolls.',
    'It re-colours well per direction: the Clear hero really is calm lavender and the Unmuted hero really is loud magenta. The same scene system serves all three directions.',
    'Watch-outs: the reference passed on a tic. Independence Arch (Black Star Gate) appears in most backgrounds, so prompt it out from now on. The scenes are also busy for a 150px Learn card, so topic art should be cropped tighter or simplified.',
    'Treat these as a brief, not final art. Commission a Ghanaian illustrator to own the style, so faces, fabrics and hands are drawn rather than generated and the work credits a real artist.',
  ],
}
