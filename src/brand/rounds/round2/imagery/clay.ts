import type { R2Image } from './types'

const PHOTO_MODEL = 'soul_2 (2k)'
const ILLO_MODEL = 'gpt_image_2_6 (medium, 1k)'
const ILLO_REF = `${ILLO_MODEL} + tile-ask as style reference`

/** The style recipe, word for word the same in every illustration prompt. */
const STYLE =
  'Gouache illustration in a contemporary West African picture-book style: flat hand-painted gouache shapes with subtle paper grain, no outlines, warm limited palette of terracotta #A8452F, wine #6E1F3F, marigold #F2A93B, cream #FCF6EE, sand #EFE3D3 and plant green'
const FIGURES =
  'rich deep-brown skin tones. Characterful and specific (hairstyles, fabrics), natural adult proportions with a real head-to-body ratio, not generic corporate-Memphis, no tiny heads or giant limbs.'
const OBJECTS = 'Characterful and specific, not generic corporate-Memphis.'
const NO_TEXT = 'No text, no letters, no numbers, no signage, no logos.'

/** Round-2 imagery for the clay direction. Filled in by the imagery agent. */
export const CLAY_IMAGES: R2Image[] = [
  {
    slot: 'hero',
    src: '/imagery/round2/clay/hero.jpg',
    alt: 'Photograph: two young Ghanaian women sitting close on a low terracotta wall in a home courtyard, laughing mid-conversation, leafy potted plants either side',
    ratio: '3:4',
    prompt:
      "Warm natural-light photograph taken in the late afternoon. Two young Ghanaian sisters in their mid-twenties sit close together on a low terracotta-plastered wall in the courtyard of a family home in Accra, one resting her arm on the other's shoulder, both smiling and mid-conversation, relaxed and unposed. One has long braids tied back and wears a terracotta wrap skirt with a cream top; the other has a short natural afro and wears a mustard-yellow shirt dress, with a small coral-pink headband. Behind them a cream wall, a wooden shutter and big leafy potted plants. Photographed full-length from across the courtyard in a vertical composition: their whole bodies fit in the top half of the picture, and the swept sandy courtyard ground stretches out in front of them across the bottom of the picture, sunlit and empty. Warm, true-to-life colour, soft shadows. Fully clothed in modest everyday clothes. No text, no lettering, no signs, no logos.",
    model: `${PHOTO_MODEL}; fourth attempt`,
  },
  {
    slot: 'wide',
    src: '/imagery/round2/clay/wide.jpg',
    alt: 'Photograph: a calm room with a terracotta wall, a mustard armchair, plants and a tea table; a young woman in profile reads her phone and smiles',
    ratio: '16:9',
    prompt:
      'Warm 35mm film photograph of a calm living-room corner in a home in Accra, late afternoon sun through a window. A mustard-yellow armchair, a hand-plastered terracotta wall, leafy potted plants, a small wooden side table with a teapot and two cups of tea. On the right side of the frame a young Ghanaian woman in her twenties with her hair in a neat low bun, wearing a cream blouse, sits in the armchair seen in profile from the side, reading her phone with a small smile. The bottom-left of the frame is a calm empty area of plain cream wall and sand-coloured floor with no objects. Soft film grain, natural colour, quiet and unposed. No text, no lettering, no signs, no logos.',
    model: `${PHOTO_MODEL}; first attempt`,
  },
  {
    slot: 'tile-ask',
    src: '/imagery/round2/clay/tile-ask.jpg',
    alt: 'Illustration: a young woman with long braids curled up in a terracotta armchair typing on her phone, an empty speech bubble beside her',
    ratio: '4:3',
    prompt: `${STYLE}, ${FIGURES} Scene: a young Ghanaian woman in her twenties with long box braids tied half-up, wearing a marigold top and wine-coloured wide trousers, sitting comfortably with her legs tucked up in a terracotta armchair, typing on her phone with a relaxed small smile. Beside her head floats one small, empty, rounded speech-bubble shape in cream with a terracotta edge. A potted plant on the floor and a single small coral-pink flower in a vase on a side table. Plain cream wall behind her. One clear subject, centred. Fully clothed adult, dignified. ${NO_TEXT}`,
    model: `${ILLO_MODEL}; this is the style key image the other seven reference`,
  },
  {
    slot: 'tile-review',
    src: '/imagery/round2/clay/tile-review.jpg',
    alt: 'Illustration: a health professional in a patterned headwrap and terracotta blouse reading a note at a wooden desk, with a plant and a cup of tea',
    ratio: '4:3',
    prompt: `Match the illustration style of the reference image exactly (flat gouache brushwork, paper grain, no outlines, same palette, same way of painting faces and hands) but paint a new scene with a different woman. ${STYLE}, ${FIGURES} Scene: a friendly Ghanaian health professional, clearly an adult woman in her late twenties, wearing a wine-and-marigold patterned headwrap and a simple terracotta blouse, sitting at a wooden desk and reading a sheet of note paper held in her hands with a warm, attentive expression; the paper is angled away so its face is not visible. A leafy potted plant and a cup of tea on the desk. Plain cream wall behind her. No white coat, no stethoscope, no medical equipment. One clear subject, centred. Fully clothed adult, dignified. ${NO_TEXT}`,
    model: ILLO_REF,
  },
  {
    slot: 'tile-care',
    src: '/imagery/round2/clay/tile-care.jpg',
    alt: 'Illustration: an open terracotta door in a cream wall with warm light inside, a bench and a plant visible, a large potted plant by the steps',
    ratio: '4:3',
    prompt: `Match the illustration style of the reference image exactly (flat gouache brushwork, paper grain, no outlines, same palette) but paint a new scene with no people. ${STYLE}. ${OBJECTS} Scene: the welcoming doorway of a small neighbourhood clinic in Accra: a single-storey cream-plastered building with a terracotta-painted wooden door standing wide open, warm marigold light glowing from inside, two low steps up to the door, a large potted plant beside it, a small plain awning above, and one bougainvillea branch with a few coral-pink flowers at one edge. Through the open door only a simple waiting area is visible: a wooden bench with a wine-coloured cushion and a small side table with a plant; no bed, no medical furniture, no equipment. No people. The walls are blank: no signboard, no cross symbol, no notices. One clear subject, centred. ${NO_TEXT}`,
    model: `${ILLO_REF}; second attempt`,
  },
  {
    slot: 'tile-circle',
    src: '/imagery/round2/clay/tile-circle.jpg',
    alt: 'Illustration: four young women with different hairstyles sitting on low stools around a woven mat, talking and laughing',
    ratio: '4:3',
    prompt: `Match the illustration style of the reference image exactly (flat gouache brushwork, paper grain, no outlines, same palette, same way of painting faces and hands) but paint a new scene with different women. ${STYLE}, ${FIGURES} Scene: four young Ghanaian women, clearly adults in their twenties, sitting in a loose circle on low wooden stools and a woven mat in a shaded courtyard, talking and laughing together. Varied hairstyles: one with a short natural afro, one with long braids, one with a patterned headwrap, one with locs tied in a bun. Clothes in terracotta, wine, marigold and cream prints, one with a small coral-pink detail. A plain terracotta wall and one potted plant behind them. The group is centred with a simple, uncluttered background. Fully clothed adults, dignified. ${NO_TEXT}`,
    model: ILLO_REF,
  },
  {
    slot: 'topic-prep',
    src: '/imagery/round2/clay/topic-prep.jpg',
    alt: 'Illustration: a hand holding one small pill beside a glass of water and a plain pill bottle, a soft marigold shield shape behind',
    ratio: '3:2',
    prompt: `Match the illustration style of the reference image exactly (flat gouache brushwork, paper grain, no outlines, same palette, same way of painting hands) but paint a new scene. ${STYLE}, rich deep-brown skin tones. ${OBJECTS} Scene: a close-up still life on a wooden table. A woman's deep-brown hand with a thin gold bangle enters from the left, holding one single small coral-pink oval pill between thumb and forefinger (a natural hand with five fingers). Beside the hand stand a glass of water and a small plain unlabelled pill bottle. On the cream wall behind them is one large, soft, rounded shield shape in pale marigold. No face and no person beyond the hand. Everything sits in a centred horizontal band across the middle of the picture, with plain cream above and plain table below, so the picture can be cropped to a wide strip. The bottle has no label. ${NO_TEXT}`,
    model: ILLO_REF,
  },
  {
    slot: 'topic-contraception',
    src: '/imagery/round2/clay/topic-contraception.jpg',
    alt: 'Illustration: a ring, a pack of pills, a wrapped condom and a small implant rod laid in a row on a sand cloth with a marigold border',
    ratio: '3:2',
    prompt: `Match the illustration style of the reference image exactly (flat gouache brushwork, paper grain, no outlines, same palette) but paint a new scene with no people. ${STYLE}. ${OBJECTS} Scene: a neat, plainly informational still life seen from above on a sand-coloured cloth with a simple marigold woven border: four contraception options laid out in one tidy row with even spacing, each painted as a simple flat shape. From left to right: a soft flexible ring in marigold; a plain unbranded wine-coloured blister pack of small round pills; a small square wrapped condom packet in plain terracotta foil with no markings; and a small thin flexible rod the size of a matchstick (a contraceptive implant) in cream, lying at a slant. The rod and the ring are not next to each other, so the row cannot be read as letters or numbers. One small green leaf sprig rests on the cloth at one end. No hands, no people. The four objects sit in a centred horizontal band so the picture can be cropped to a wide strip. No labels, no brand marks. ${NO_TEXT}`,
    model: `${ILLO_REF}; second attempt`,
  },
  {
    slot: 'topic-mood',
    position: 'center top',
    src: '/imagery/round2/clay/topic-mood.jpg',
    alt: 'Illustration: a young woman with a short afro resting on a sofa under a patterned blanket with a cup of tea, lamp lit, a crescent moon in the window',
    ratio: '3:2',
    prompt: `Match the illustration style of the reference image exactly (flat gouache brushwork, paper grain, no outlines, same palette, same way of painting faces and hands) but paint a new scene with a different woman. ${STYLE}, ${FIGURES} Scene: a young Ghanaian woman, clearly an adult in her mid-twenties, with a short natural afro, resting on a sofa under a soft marigold-and-terracotta patterned blanket, holding a cup of tea in both hands, calm and content with a small peaceful smile. Warm evening lamp light. Behind her a simple window shows a deep wine-coloured dusk sky with a crescent moon and nothing else; one potted plant beside the sofa. Gentle and restful, not sad. She is centred, with a simple uncluttered background, composed so the picture can be cropped to a wide strip around her face, shoulders and cup. Fully clothed adult, dignified. ${NO_TEXT}`,
    model: ILLO_REF,
  },
  {
    slot: 'empty',
    src: '/imagery/round2/clay/empty.jpg',
    alt: 'Illustration: an open sand-coloured envelope with a terracotta lining and a single coral flower peeking out',
    ratio: '1:1',
    prompt: `Match the illustration style of the reference image exactly (flat gouache brushwork, paper grain, no outlines, same palette) but paint a single object with no people. ${STYLE}. Scene: one open envelope painted in sand with a terracotta lining, and one small coral-pink flower on a short green stem peeking out of it, centred on a plain cream #FCF6EE background with a soft small shadow under it. Bold, simple, large shapes and nothing else in the picture; generous empty cream space around the envelope. It must read clearly at a very small size. No text, no letters, no numbers, no stamps, no postmarks, no signage, no logos.`,
    model: ILLO_REF,
  },
]

/** Honest notes from generating these: what works, what is weak. */
export const CLAY_NOTES: string[] = [
  'The eight illustrations are the strong part. One style key (tile-ask) passed as a reference kept every later image in the same gouache hand and inside the clay palette, with one coral flower as the only pink. No landmarks, no text artefacts.',
  'The hero took four tries. Asking Soul 2.0 for "35mm film" or for an empty lower third made it draw film-strip borders and a pasted-on floor panel. The kept version is one clean picture, but it looks phone-filtered and a little posed rather than like film, there is a teal pot at the left edge, and the legs run down to about 70% of the height, so the text panel will cover them.',
  'Two illustrations were rejected and redone: the first clinic doorway showed an examination couch and screen inside (replaced by a waiting bench), and the first contraception row put the implant rod beside the ring so it read as "IO" or "10" (reordered, rod at a slant).',
  'Weak spots: the illustrated women share one face type and the same pot and plant appear in almost every scene; the moon in topic-mood sits at the very top and is lost in a centred 2.5:1 crop (anchor that card to the top); the implant is only a small stick and the ring could pass for a bangle, so the contraception card needs its caption. Illustrations are about 1,000 to 1,170px wide, enough for cards but not for print.',
  'The wide photo is calm and usable, but its quiet bottom-left corner is cream wall over a dark floor, so an overlay card needs its own solid surface. These are generated people, not SAYO users: the final hero should be commissioned photography in Accra, with this set as the brief.',
]
