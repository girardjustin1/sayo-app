import type { Approach } from './types'

const MODEL = 'Higgsfield Soul 2.0 (soul_2, 2k)'
const P = '/imagery/approaches/editorial'

/** Approach 3. Images and notes are filled in by the imagery agent; concept text can be refined. */
export const EDITORIAL: Approach = {
  slug: 'editorial',
  number: 3,
  name: 'Editorial colour-block portraits',
  idea: 'Confident, joyful young women in colour-blocked outfits, looking at camera against seamless paper in the direction palette.',
  why: [
    'Most distinctive and shareable; stigma-breaking energy',
    'Gives SAYO a fashion-forward youth voice',
    'Perfect for campaigns and social',
    'The palette does the branding: the same pose reads as sister, clear or unmuted just by swapping paper and outfit',
  ],
  risks: [
    'Fashion styling can feel aspirational rather than relatable',
    'Same face-near-topic risk as candid photography',
    'Hardest to keep consistent across many images',
    'Generators read "editorial" and "magazine" as "make a magazine cover": fake mastheads that imitate a real title. Prompts must avoid those words',
  ],
  scores: { privacy: 2, warmth: 4, distinct: 5, scalable: 2 },
  bestFor: [
    'Campaigns, social, launch posters',
    'Unmuted direction hero moments',
  ],
  avoidFor: [
    'Inside the private app flows',
    'Mental-health and GBV content: a posed, styled face reads as an ad, not as care',
  ],
  images: [
    {
      src: `${P}/hero-sister.jpg`,
      alt: 'A smiling woman with a big afro in a rose suit against blush paper with a coral block behind her',
      ratio: '3:4',
      use: 'hero',
      direction: 'sister',
      prompt:
        'Studio portrait photograph of a joyful Ghanaian woman in her mid-20s with a voluminous natural afro, looking straight into the lens with a warm wide smile, wearing a rose-pink tailored blazer and matching wide-leg trousers over a soft peach blouse, standing in front of a plain seamless blush-peach paper backdrop with a solid rose colour block behind one shoulder, warm golden key light, crisp and clean, colour-blocked styling, plain backdrop with nothing written on it',
      model: MODEL,
    },
    {
      src: `${P}/hero-clear.jpg`,
      alt: 'A calm woman with cornrows, arms folded, in a plum top and lavender trousers against lavender paper',
      ratio: '3:4',
      use: 'hero',
      direction: 'clear',
      prompt:
        'Studio portrait photograph of a calm, confident Ghanaian woman in her 20s with neat cornrows, looking into the lens with a soft closed-mouth smile, wearing a deep plum high-neck long-sleeve top and lavender wide-leg trousers, standing in front of a plain seamless pale lavender paper backdrop, soft diffused lilac-tinted light, minimal and serene, plain backdrop with nothing written on it',
      model: MODEL,
    },
    {
      src: `${P}/hero-unmuted.jpg`,
      alt: 'A woman laughing with braids flying, in a coral shirt and pink trousers against magenta paper',
      ratio: '3:4',
      use: 'hero',
      direction: 'unmuted',
      prompt:
        'Studio portrait photograph of an exuberant Ghanaian woman in her 20s with long box braids swinging, laughing into the lens, wearing a bright coral oversized long shirt over magenta wide-leg trousers, standing in front of a plain saturated magenta seamless paper backdrop with a solid coral colour block, crisp hard flash, high energy, colour-blocked styling, plain backdrop with nothing written on it',
      model: MODEL,
    },
    {
      src: `${P}/wide.jpg`,
      alt: 'Three women in coral, pink and peach in front of a pink paper roll, with a dark studio wall to the left',
      ratio: '16:9',
      use: 'wide',
      prompt:
        'Wide editorial studio group portrait, three confident Ghanaian women in their 20s in colour-blocked outfits of rose, coral and peach, standing close together on the right third of the frame, looking at camera and smiling, diverse hair (afro, braids, short crop), against a seamless blush-pink paper backdrop, wide clean empty backdrop on the left and bottom-left, crisp even studio light, fully clothed, no text, no masthead, no logos',
      model: MODEL,
    },
    {
      src: `${P}/topic-prep.jpg`,
      alt: 'A smiling woman in a coral sweater and peach trousers on a stool, holding up her phone, against peach paper',
      ratio: '4:3',
      use: 'topic',
      topic: 'PrEP is prevention',
      prompt:
        'Studio portrait photograph of a Ghanaian woman in her 20s in a coral knit sweater and peach wide-leg trousers, seated on a wooden stool in front of a plain saturated peach seamless paper backdrop, looking at her phone with a confident easy smile, phone screen facing away from camera, crisp clean light, colour-blocked styling, plain backdrop with nothing written on it',
      model: MODEL,
    },
    {
      src: `${P}/topic-contraception.jpg`,
      alt: 'Two friends laughing in lavender and plum trouser suits against lilac paper',
      ratio: '4:3',
      use: 'topic',
      topic: 'Your contraception options',
      prompt:
        'Studio portrait photograph of two Ghanaian women friends in their 20s standing shoulder to shoulder and laughing together, one in a lavender trouser suit over a high-neck white knit top, the other in a deep plum trouser suit over a high-neck lilac knit top, modest styling, in front of a plain seamless lilac paper backdrop that fills the whole frame, both smiling into the lens, playful and confident, crisp soft studio light, colour-blocked styling, plain backdrop with nothing written on it',
      model: MODEL,
    },
    {
      src: `${P}/topic-mood.jpg`,
      alt: 'A woman with short natural hair in a lilac sweater, chin on her hand, looking calmly at the camera against mauve paper',
      ratio: '4:3',
      use: 'topic',
      topic: 'When your mood feels heavy',
      prompt:
        'Studio portrait photograph of a Ghanaian woman in her 20s wearing a soft lilac knit sweater and loose lavender trousers, seated on a low plum block, chin resting lightly on her hand, calm thoughtful expression, gently looking into the lens, in front of a plain dusty mauve seamless paper backdrop, soft diffused light, quiet and tender, composed, plain backdrop with nothing written on it',
      model: MODEL,
    },
    {
      src: `${P}/empty.jpg`,
      alt: 'A gold hoop and a rose satin ribbon on a pink cube against blush paper',
      ratio: '1:1',
      use: 'empty',
      prompt:
        'Still life photograph, a single gold hoop earring and a plain unpatterned rose-pink silk ribbon resting on a solid coral cube in front of a plain blush seamless paper backdrop, crisp studio light, soft shadow, minimal and graphic, plain solid colours with no pattern, no print, no words',
      model: MODEL,
    },
  ],
  notes: [
    'The first round was unusable: any prompt with "editorial", "magazine" or "masthead" (even "no masthead") came back as a fake magazine cover with an imitation of a real title, plus garbled cover lines. Swapping to "studio portrait photograph … plain backdrop with nothing written on it" fixed it every time. Keep that wording.',
    'Once fixed, this is the most on-brand set: the three heroes are the same idea in three palettes, and each reads instantly as sister, clear or unmuted. Unmuted (braids flying on magenta) is the strongest; clear (arms folded, plum on lavender) is calm but close to corporate headshot.',
    'Styling needs guarding: without explicit trousers and high necklines the model drifted to bare legs, a low-cut top and lace showing under a blazer (three rejects). Asking for "wide-leg trousers" and "high-neck" made every outfit modest without losing the fashion feel.',
    'Topic cards feel like ads. The PrEP card is a confident selfie, contraception is two friends in suits, mood is a calm direct gaze. Tasteful, but a styled model next to "When your mood feels heavy" reads as a campaign, not as someone who understands. The wide banner kept a dark studio wall (off-palette) instead of blush; usable, but it would need a re-shoot to match.',
    '17 generations for 8 kept (Soul 2.0, about 0.12 credits each), the most rework of either approach. Recommend for campaigns, social and the unmuted splash; keep it out of Learn and the private flows. The still-life empty state is good and could cross over to any approach.',
  ],
}
