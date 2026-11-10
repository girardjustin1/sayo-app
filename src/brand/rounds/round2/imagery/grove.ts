import type { R2Image } from './types'

const SOUL = 'Higgsfield Soul 2.0 (soul_2, 2k)'
const GPT = 'GPT Image 2.6 (gpt_image_2_6, medium)'
const GPT_REF = 'GPT Image 2.6 (gpt_image_2_6, medium, tile-care as style reference)'

/** Round-2 imagery for the grove direction. Filled in by the imagery agent. */
export const GROVE_IMAGES: R2Image[] = [
  {
    slot: 'hero',
    src: '/imagery/round2/grove/hero.jpg',
    alt: 'A young woman with cornrows, eyes closed and face lifted to the light, against open sky and soft green leaves.',
    ratio: '3:4',
    prompt:
      'Natural-light portrait photograph of a young Ghanaian woman in her mid-twenties with neat cornrow braids, seen in three-quarter profile from the shoulders up, chin slightly lifted, eyes softly closed, a calm confident half-smile. She wears a simple sage-green crew-neck cotton top and one small coral earring. Behind her is open pale blue sky with soft thin clouds and a blur of soft green leaves at the edges. Her head and shoulders sit in the upper two thirds of the frame; the lower third is only her plain top and soft out-of-focus greenery. Soft morning daylight, serene, dignified, fully clothed. Plain background with nothing written on it, no text, no letters, no logos.',
    model: SOUL,
  },
  {
    slot: 'wide',
    src: '/imagery/round2/grove/wide.jpg',
    alt: 'Three young women standing close together outdoors, relaxed and smiling, with trees and pale sky behind them.',
    ratio: '16:9',
    prompt:
      'Candid natural-light photograph of three young Ghanaian women in their twenties standing close together outdoors, with tall green trees and soft foliage behind them and a strip of pale open sky above. They are relaxed and quietly confident, looking at each other and towards the horizon, not at the camera, with gentle closed-mouth smiles. One has long braids, one a short afro, one cornrows. Each wears a loose-fitting, relaxed short-sleeved cotton shirt with a high round neckline, shoulders and chest fully covered: one white, one sage green, one soft coral. All three women are completely inside the right half of the frame, seen from the waist up, none cut off by the edge. The left half and the bottom-left of the frame are calm, empty, softly blurred green foliage with nothing in it. Soft late-afternoon daylight, shallow depth of field, serene mood. Nothing written anywhere, no text, no letters, no logos.',
    model: SOUL,
  },
  {
    slot: 'tile-ask',
    src: '/imagery/round2/grove/tile-ask.jpg',
    alt: 'A hand holding a phone with a softly glowing blank screen, against a deep green background crossed by a beam of light.',
    ratio: '4:3',
    prompt:
      "Photorealistic studio photograph. Use the reference image only for its background: the same deep forest-green gradient with one wide soft diagonal beam of olive-green light. In front of it, a young Black woman's hand with dark brown skin and short natural nails holds a modern smartphone upright at a slight angle; her wrist enters from the bottom right and the cuff of a sage-green long sleeve is visible. The phone screen glows softly with a blank pale lime-white light, completely empty, no interface, nothing on it. Five natural fingers, correct anatomy. No text, no letters, no numbers, no icons, no logos anywhere.",
    model: GPT_REF,
  },
  {
    slot: 'tile-review',
    src: '/imagery/round2/grove/tile-review.jpg',
    alt: 'A soft white speech bubble with a lime shield and check mark, floating on a deep green background.',
    ratio: '4:3',
    prompt:
      'Soft 3D render in exactly the same style, materials, lighting and background as the reference image. A rounded white speech bubble floating in the centre, and overlapping its lower right corner a small rounded shield-shaped seal in lime green with a simple embossed white check mark on it. Soft shadow beneath. Deep forest-green gradient background with one wide soft diagonal beam of olive-green light. Objects centred with generous empty space. No text, no letters, no numbers, no logos, no stethoscope, no cross symbol, no people.',
    model: GPT_REF,
  },
  {
    slot: 'tile-care',
    src: '/imagery/round2/grove/tile-care.jpg',
    alt: 'A rounded lime map pin with a small coral heart beside it, floating on a deep green background.',
    ratio: '4:3',
    prompt:
      'Soft 3D render, smooth matte clay-like materials with gentle glossy highlights. A rounded map location pin in lime green (#C5ED82) with a white circular centre, and a small rounded coral-pink heart floating beside it, both hovering with soft shadows. Background: a deep forest-green gradient (#2B3524 to #2F4A34) crossed by one wide soft diagonal beam of olive-green light (#86A65C) from the top right to the bottom left. Objects centred, generous empty space around them. Calm, modern, premium. No text, no letters, no numbers, no logos, no map, no people.',
    model: GPT,
  },
  {
    slot: 'tile-circle',
    src: '/imagery/round2/grove/tile-circle.jpg',
    alt: 'Four soft rounded figures in lime, sage, white and coral standing together on a deep green background.',
    ratio: '4:3',
    prompt:
      'Soft 3D render in exactly the same style, materials, lighting and background as the reference image. Four soft rounded abstract person tokens standing close together in a gentle arc, each a simple smooth sphere head above a rounded pill-shaped body, with no faces and no features: one lime green, one sage green, one white and one coral pink. Soft shadows beneath. Deep forest-green gradient background with one wide soft diagonal beam of olive-green light. Group centred with generous empty space. No text, no letters, no numbers, no logos.',
    model: GPT_REF,
  },
  {
    slot: 'topic-prep',
    src: '/imagery/round2/grove/topic-prep.jpg',
    alt: 'A plain unlabelled pill bottle, a single pill and a lime shield, floating on a deep green background.',
    ratio: '3:2',
    prompt:
      'Soft 3D render in exactly the same style, materials, lighting and background as the reference image. A generic plain white rounded pill bottle with a lime-green cap, completely blank with no label, a single small oval white pill floating beside it, and a soft rounded shield shape in lime green floating just behind them. All objects grouped tightly in the centre of the frame, small enough that there is wide empty background above, below, left and right (the image will be cropped to a wide strip). Deep forest-green gradient background with one wide soft diagonal beam of olive-green light. No label, no text, no letters, no numbers, no logos, no cross symbol.',
    model: GPT_REF,
  },
  {
    slot: 'topic-contraception',
    src: '/imagery/round2/grove/topic-contraception.jpg',
    alt: 'A plain blister pack of coral and white pills beside a small lime calendar tile, on a sage-to-green background.',
    ratio: '3:2',
    prompt:
      'Soft 3D render in the same style, materials and lighting as the reference image. A generic blister pack of pills floating at a slight tilt: a rounded rectangular white card with three rows of seven small round dome pills in soft coral and white, completely blank with no print. Beside it a small rounded-square calendar-like tile in lime green with two small binder rings on top and a blank grid of soft embossed dots, with no numbers. Both objects grouped tightly in the centre of the frame with wide empty background above, below, left and right (the image will be cropped to a wide strip). Background: a smooth gradient from pale sage (#EEF3EA) at the top left to forest green (#2F4A34) at the bottom right, with one soft diagonal beam of light. Tasteful, plainly informational. No text, no letters, no numbers, no logos.',
    model: GPT_REF,
  },
  {
    slot: 'topic-mood',
    src: '/imagery/round2/grove/topic-mood.jpg',
    alt: 'A soft white cloud with a lime crescent moon and a small coral heart, on a calm teal background.',
    ratio: '3:2',
    prompt:
      'Soft 3D render in the same style, materials and lighting as the reference image. A soft puffy white cloud with a pale lime crescent moon tucked behind its upper right and a small coral-pink heart floating in front at the lower left. Objects grouped tightly in the centre of the frame with wide empty background above, below, left and right (the image will be cropped to a wide strip). Background: a calm teal-sage gradient, deep teal (#1F6F78) softening to muted sage green, with one faint soft diagonal beam of light. Quiet, restful mood. No text, no letters, no numbers, no logos, no faces.',
    model: GPT_REF,
  },
  {
    slot: 'empty',
    src: '/imagery/round2/grove/empty.jpg',
    alt: 'An open, empty lime envelope with a small coral dot above it.',
    ratio: '1:1',
    prompt:
      'Soft 3D render in the same smooth matte clay-like style as the objects in the reference image, but on a plain flat pale sage mist background (#EEF3EA) with no light beam. One single object: an open, empty rounded envelope in lime green with a white inner lining, flap open, nothing inside, with one tiny coral-pink dot floating above it. The envelope is large and centred with a very soft shadow beneath. Simple bold silhouette that reads clearly at very small size. No text, no letters, no numbers, no logos.',
    model: GPT_REF,
  },
]

/** Honest notes from generating these: what works, what is weak. */
export const GROVE_NOTES: string[] = [
  'The 3D set is consistent because tile-care was generated first and passed as a style reference to the other seven. All are free of text, labels and clinical props.',
  'The rendered lime is more saturated than the palette lime (#C5ED82), and the forest gradient is a cooler green than deep moss (#2B3524). Close enough to sit on Grove panels, but not an exact match.',
  'The wide photo took three attempts. The first had a low-cut tank top and the second looked like stock; the third is used. Its women fill the right two thirds, so a bottom-left overlay card will cover part of one arm, and a few pixels were trimmed off every edge to remove a thin line artefact at the top.',
  'The 3D images are small at source (1168×880 for tiles, 1024×688 for topic cards, 1024×1024 for empty). Fine for tiles and cards on a phone; too soft for a full-width desktop band.',
  'Topic-card objects are deliberately small and centred so they survive the 2.5:1 crop; shown uncropped at 3:2 they look a little lost. In wide, one woman smiles at the camera although the prompt asked for none to.',
]
