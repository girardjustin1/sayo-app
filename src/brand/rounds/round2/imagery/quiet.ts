import type { R2Image } from './types'

const DIR = '/imagery/round2/quiet'
/** Hero: the cropped logo mark (no wordmark) passed as a shape reference. */
const MODEL_MARK = 'gpt_image_2_6 (medium) + logo mark reference'
/** Everything after the hero: the hero passed as a material and light reference. */
const MODEL_REF = 'gpt_image_2_6 (medium) + hero as style reference'

/** Round-2 imagery for the quiet direction. Filled in by the imagery agent. */
export const QUIET_IMAGES: R2Image[] = [
  {
    slot: 'hero',
    src: `${DIR}/hero.jpg`,
    alt: 'The looping heart-S mark as a matte white paper ribbon sculpture with charcoal inner faces and a thin coral edge, on linen',
    ratio: '3:4',
    model: MODEL_MARK,
    prompt:
      'Abstract brand still-life photograph built from the reference mark: one continuous looping band that forms a heart flowing into an S. Re-make that exact looping form as a sculpture of thick matte paper-and-plaster ribbon standing on a seamless linen-coloured surface, placed in the upper 60% of a portrait frame, its turns casting soft daylight shadows. Colours: background linen #F6F5F2, ribbon faces in matte white and stone #E9E7E2, the inner faces of the folds in charcoal #2A2D32, and exactly one thin edge of the ribbon in coral #F6544A as the only colour accent. Do not use the pink or magenta of the reference; take only its shape. Soft diffused window daylight from the left, gentle long shadows, fine paper fibre and plaster texture, calm, discreet, minimal. The lower 40% is calm empty linen surface. No text, no letters, no wordmark, no logo lockup, no people, no animals.',
  },
  {
    slot: 'wide',
    src: `${DIR}/wide.jpg`,
    alt: 'A long white paper ribbon with charcoal inner faces sweeping in heart-and-S loops across the top right, leaving the bottom left plain linen',
    ratio: '16:9',
    model: 'gpt_image_2_6 (medium) + hero and logo mark references',
    prompt:
      'Wide abstract brand still-life in exactly the same material, palette and light as the reference sculpture: thick matte paper-and-plaster ribbon in white and stone #E9E7E2 with charcoal #2A2D32 inner faces and one thin coral #F6544A edge, on a seamless linen #F6F5F2 surface. Here the ribbon is one long continuous band that sweeps in slow generous loops, echoing the heart-and-S curves of the mark, across the top and right side of the frame, partly cropped by the edges. Soft diffused daylight from the left, long gentle shadows. The left half and especially the bottom-left of the frame is calm empty linen surface with only a faint shadow, for an overlay card. Discreet, minimal, calm. No text, no letters, no wordmark, no logo lockup, no people, no animals, no pink, no magenta.',
  },
  {
    slot: 'tile-ask',
    src: `${DIR}/tile-ask.jpg`,
    alt: 'A single white paper ribbon curled into an open loop with a small tail, like a speech bubble, with a thin coral edge',
    ratio: '4:3',
    model: MODEL_REF,
    prompt:
      'Abstract still-life in exactly the same material, palette and light as the reference sculpture (thick matte white and stone #E9E7E2 ribbon, charcoal #2A2D32 inner faces, one thin coral #F6544A edge, seamless linen #F6F5F2 background): a single ribbon curled into one open rounded loop with a small tail at the bottom, reading as a soft speech bubble, standing centred with a gentle daylight shadow. One clear subject, generous calm space around it. An invitation to speak. No text, no letters, no punctuation, no wordmark, no people, no animals, no pink, no magenta.',
  },
  {
    slot: 'tile-review',
    src: `${DIR}/tile-review.jpg`,
    alt: 'A small charcoal ribbon loop with a coral edge resting inside a larger white ribbon loop',
    ratio: '4:3',
    model: MODEL_REF,
    prompt:
      'Abstract still-life in exactly the same material, palette and light as the reference sculpture (thick matte paper-and-plaster ribbon, seamless linen #F6F5F2 background, soft daylight shadows): two ribbon loops standing centred, a larger one in matte white and stone #E9E7E2 and a smaller one in charcoal #2A2D32, the smaller loop resting inside and overlapping the larger like a careful second look. One thin coral #F6544A edge on the smaller loop is the only colour accent. One clear subject, generous calm space around it. Checked, confirmed, trustworthy. No text, no letters, no tick marks, no wordmark, no people, no animals, no pink, no magenta.',
  },
  {
    slot: 'tile-care',
    src: `${DIR}/tile-care.jpg`,
    alt: 'A white paper ribbon bent into a small open archway with a patch of light falling through it, one edge in coral',
    ratio: '4:3',
    model: MODEL_REF,
    prompt:
      'Abstract still-life in exactly the same material, palette and light as the reference sculpture (thick matte white and stone #E9E7E2 ribbon, charcoal #2A2D32 inner face, one thin coral #F6544A edge, seamless linen #F6F5F2 background): a single wide ribbon bent into a simple open archway, like a small doorway, standing centred; soft daylight passes through the arch and falls as a bright patch on the linen surface in front of it. One clear subject, generous calm space around it. Welcoming, a way in. No text, no letters, no wordmark, no people, no animals, no pink, no magenta.',
  },
  {
    slot: 'tile-circle',
    src: `${DIR}/tile-circle.jpg`,
    alt: 'Five white ribbon loops with charcoal inner faces standing in a loose circle, leaning towards each other; one has a coral edge',
    ratio: '4:3',
    model: MODEL_REF,
    prompt:
      'Abstract still-life in exactly the same material, palette and light as the reference sculpture (thick matte paper-and-plaster ribbon, seamless linen #F6F5F2 background, soft daylight shadows): five small ribbon loops of slightly different heights standing upright in a loose circle, leaning gently towards one another like friends in conversation; four in matte white and stone #E9E7E2 with charcoal #2A2D32 inner faces, and exactly one with a thin coral #F6544A edge. Seen from slightly above, the group centred with calm space around it. Company, belonging. No text, no letters, no wordmark, no people, no animals, no pink, no magenta.',
  },
  {
    slot: 'topic-prep',
    src: `${DIR}/topic-prep.jpg`,
    alt: 'A white ribbon loop with a coral top edge curving protectively around a smooth matte sphere',
    ratio: '3:2',
    model: MODEL_REF,
    prompt:
      'Abstract still-life in exactly the same material, palette and light as the reference sculpture (thick matte white and stone #E9E7E2 ribbon, charcoal #2A2D32 inner face, seamless linen #F6F5F2 background, soft daylight shadows): one ribbon loop curving protectively around a soft, smooth matte stone-coloured sphere, sheltering it without touching; a thin coral #F6544A edge runs along the top of the loop as the only colour accent. Centred, with calm space left and right. Protection and calm confidence. No pills, no medical objects, no text, no letters, no wordmark, no people, no animals, no pink, no magenta.',
  },
  {
    slot: 'topic-contraception',
    src: `${DIR}/topic-contraception.jpg`,
    alt: 'An evenly spaced row of five rounded forms on linen: three smooth pebbles and two low ribbon loops, one loop with a coral edge',
    ratio: '3:2',
    model: MODEL_REF,
    prompt:
      'Abstract still-life in exactly the same material, palette and light as the reference sculpture (matte paper-and-plaster, seamless linen #F6F5F2 background, soft daylight shadows): an even, steady rhythm of five soft rounded forms resting in a centred horizontal row, evenly spaced like beats, seen from slightly above: three smooth flattish oval river pebbles lying on their sides and two low closed ribbon loops, alternating pebble, loop, pebble, loop, pebble, each a slightly different size, in matte white, stone #E9E7E2 and charcoal #2A2D32; exactly one loop has a thin coral #F6544A edge, the only colour accent. Organic sculptural shapes only; nothing that resembles a letter, a number, an arch or a body. Calm space above and below the row. Choice, regularity, ease. No pills, no medical objects, no text, no letters, no numbers, no wordmark, no people, no animals, no pink, no magenta.',
  },
  {
    slot: 'topic-mood',
    src: `${DIR}/topic-mood.jpg`,
    alt: 'A low, gentle white ribbon loop with a coral edge resting in front of a pale plaster disc, like a daytime moon',
    ratio: '3:2',
    model: MODEL_REF,
    prompt:
      'Abstract still-life in exactly the same material, palette and light as the reference sculpture (thick matte white and stone #E9E7E2 ribbon, charcoal #2A2D32 inner face, one thin coral #F6544A edge, seamless linen #F6F5F2 background): a single low, gentle ribbon loop resting on the linen surface like a soft wave, and above and behind it a pale matte white plaster disc like a daytime moon leaning against the linen wall, casting a faint soft shadow. Centred, with calm space left and right. Quiet, restful, unhurried; a heavy mood held gently. No text, no letters, no wordmark, no people, no faces, no animals, no pink, no magenta.',
  },
  {
    slot: 'empty',
    src: `${DIR}/empty.jpg`,
    alt: 'A single charcoal paper ribbon folded into a heart-shaped loop with a thin coral edge',
    ratio: '1:1',
    model: MODEL_REF,
    prompt:
      'Very simple, icon-like abstract still-life in the same material and light as the reference sculpture: one single small closed ribbon loop, a simplified soft heart-like loop made of a thick band of matte charcoal #2A2D32 paper with one thin coral #F6544A edge, centred on a plain seamless linen #F6F5F2 background with a short soft shadow. Bold and high-contrast, one shape only, readable at 120 pixels, generous empty margin all round. No text, no letters, no wordmark, no people, no animals, no pink, no magenta.',
  },
]

/** Honest notes from generating these: what works, what is weak. */
export const QUIET_NOTES: string[] = [
  'The cropped logo mark (no wordmark) was the shape reference for the hero; the hero was then the material and light reference for the other nine. The set holds together well: same matte white ribbon, charcoal inner faces, linen ground, one thin coral edge, no people anywhere.',
  'The hero is a 3D reinterpretation of the mark, not the mark: the loop geometry is close but not exact, and it is recoloured. Use it as imagery, never in place of the logo, and expect it to feel repetitive if it appears on more than splash and marketing.',
  'topic-contraception took three tries. The first row (ring, arch, disc, oval, loop) read as the letters "on"; the second used domes that could be misread as body forms; the third (pebbles and loops) is safe but the vaguest image in the set. All three topic images need their card title to carry the meaning.',
  'Single forms can still read as letters: tile-ask (the speech-bubble loop) can look like a "Q" and tile-care (the arch) like an "n". Worth a designer redrawing these as vector forms if the direction is chosen.',
  'empty is a charcoal heart loop: bold enough at 120px, but its ground came out nearer white than Linen, and a heart may be warmer than this direction wants for an empty state. The coral edge is thicker here than in the rest of the set.',
]
