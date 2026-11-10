import type { Approach } from './types'

const MODEL = 'gpt_image_2_6 (medium)'
const DIR = '/imagery/approaches/faceless'

/** Approach 2. Images and notes are filled in by the imagery agent; concept text can be refined. */
export const FACELESS: Approach = {
  slug: 'faceless',
  number: 2,
  name: 'Faceless photography',
  idea: 'Privacy made visible: hands, phones, backs, crops, silhouettes, everyday objects in soft light. Never a full face.',
  why: [
    'Expresses the privacy promise without saying it',
    'Safe next to any topic, including HIV and GBV',
    'Feels premium and calm',
    'Light carries the brand: golden for Big Sister, lilac haze for Clear, coloured gel for Unmuted',
  ],
  risks: [
    'Can feel cold or anonymous to 18–24s',
    'Hands-and-phone shots are common in health-tech; needs a distinct light and colour',
    'Back-to-camera, looking out of a window, becomes a cliché fast; it already repeats in this set',
    'Models drift to bare shoulders and nude-looking silhouettes; every prompt needs explicit wardrobe',
  ],
  scores: { privacy: 5, warmth: 4, distinct: 3, scalable: 4 },
  bestFor: [
    'Ask SAYO, reviews, privacy and PIN screens',
    'Sensitive-topic Learn cards',
  ],
  avoidFor: [
    'Big joyful brand moments',
  ],
  images: [
    {
      src: `${DIR}/hero-sister.jpg`,
      alt: 'A young woman in a peach headwrap, seen from behind, looking out through a sheer peach curtain in golden light',
      ratio: '3:4',
      use: 'hero',
      direction: 'sister',
      model: MODEL,
      prompt:
        'Editorial lifestyle photograph, seen from behind: a young West African woman in her twenties with long braids tied up in a soft peach headwrap, standing at a window, her back and one bare shoulder in frame, face completely turned away and not visible. Warm late-afternoon golden-hour light pours through a sheer peach-blush linen curtain, painting soft dappled warm light and long shadows across her shoulder and the wall. Palette of blush #FFF7F3, peach #FFD9C7 and a touch of rose. Calm, dignified, private, hopeful mood. Shot on 50mm film, shallow depth of field, gentle grain. No face, no text, no letters, no logos, no animals.',
    },
    {
      src: `${DIR}/hero-clear.jpg`,
      alt: 'A young woman in a cream sweater holding a mug on a window seat, softly veiled by a sheer lavender curtain',
      ratio: '3:4',
      use: 'hero',
      direction: 'clear',
      model: MODEL,
      prompt:
        'Fine-art photograph: a young woman seen from behind, wearing an oversized cream knit sweater and wide linen trousers, hair in a high puff, sitting relaxed on a window seat holding a ceramic mug in both hands. She is seen softly through a floor-length sheer lavender voile curtain in the foreground that partly veils her; her face is turned away and not visible. Cool, quiet early-morning lilac light, mist-white walls, plum shadows. Palette mist #FAF8FC, lavender #EDE4F7, plum #6D2E9E. Serene, private, calm, modest. Soft focus, airy negative space at the top. No text, no letters, no logos, no animals.',
    },
    {
      src: `${DIR}/hero-unmuted.jpg`,
      alt: 'A young woman in a coral shirt, seen from behind, dancing with one arm raised against a magenta-to-coral wall',
      ratio: '3:4',
      use: 'hero',
      direction: 'unmuted',
      model: MODEL,
      prompt:
        'Joyful editorial photograph seen fully from behind: a young West African woman in a loose bright coral-red shirt, mid-movement, one arm raised high with gold bangles, long box braids swinging, as if dancing to music. Face turned completely away from the camera and not visible. Seamless studio backdrop lit with saturated magenta-to-coral gel light (#D4009E to #FF5A48), crisp graphic shadow on the wall. Energetic, free, confident, celebratory. Fully clothed, tasteful. Sharp, high contrast, clean. No text, no letters, no logos, no animals.',
    },
    {
      src: `${DIR}/wide.jpg`,
      alt: 'A sunlit blush bedroom; a young woman sits on the edge of the bed on the right, looking out over the city',
      ratio: '16:9',
      use: 'wide',
      model: MODEL,
      prompt:
        'Wide calm interior photograph of a sunlit bedroom corner in Accra: a young woman seen from behind sits on the edge of a bed on the far right third of the frame, her back and braided hair visible, face turned away toward a window. A sheer blush curtain glows with soft warm morning light; a small potted plant on the windowsill. The left half and especially the bottom-left of the frame is calm empty space: soft blush wall and smooth linen bedspread, uncluttered. Palette blush, peach, warm white, hint of rose. Quiet, private, safe. No face, no text, no letters, no logos, no animals.',
    },
    {
      src: `${DIR}/topic-prep.jpg`,
      alt: 'A hand holding a small white tablet above a glass of water, next to a plain pill bottle with a lavender cap',
      ratio: '4:3',
      use: 'topic',
      topic: 'PrEP is prevention',
      model: MODEL,
      prompt:
        "Close-up still-life photograph of a morning routine: a young West African woman's hand (dark skin, short natural nails, thin gold ring) holding one small plain white oval tablet between her fingers, above a clear glass of water on a light wooden bedside table. Beside the glass, a small plain unlabelled white pill bottle with a lavender cap. Soft diffused window light, lilac and warm white tones, calm and matter-of-fact. Hand only, no face. No text, no labels, no letters, no logos, no brand names.",
    },
    {
      src: `${DIR}/topic-contraception.jpg`,
      alt: 'Overhead: two hands on a peach bedspread around a pill blister pack, an open notebook and a cup of tea',
      ratio: '4:3',
      use: 'topic',
      topic: 'Your contraception options',
      model: MODEL,
      prompt:
        "Overhead lifestyle photograph on a soft peach linen bedspread: a young woman's hands (dark brown skin, neat nails) resting beside a contraceptive pill blister pack (plain foil, a neat grid of small round tablets, no printing), an open blank notebook with a pencil, and a small ceramic cup of tea. Warm, gentle morning light, blush and peach palette, organised and calm, empowering. Hands only, no face. No text, no letters, no numbers, no logos, no brand names.",
    },
    {
      src: `${DIR}/topic-mood.jpg`,
      alt: 'A young woman in a hoodie and satin bonnet, seen from behind with a warm mug, watching rain at dusk by lamplight',
      ratio: '4:3',
      use: 'topic',
      topic: 'When your mood feels heavy',
      model: MODEL,
      prompt:
        'Quiet photograph from behind: a young woman in a soft long-sleeved oatmeal hoodie, a knit blanket over her lap, sitting on a cushioned window seat, only her back, shoulders and the back of her head with a plum satin bonnet visible, looking out at a soft rainy evening, holding a warm mug. Rain droplets on the glass, a small warm lamp glow inside mixing with dusky lilac light outside. Reflective and gentle, a pause, not sad or distressed; comforting and safe. No face visible. Palette lilac, plum, warm amber. No text, no letters, no logos, no animals.',
    },
    {
      src: `${DIR}/empty.jpg`,
      alt: 'A single blush ceramic cup on a sunlit windowsill',
      ratio: '1:1',
      use: 'empty',
      model: MODEL,
      prompt:
        'Minimal still-life photograph: a single small blush-pink ceramic cup sitting alone on a white windowsill, softly lit by warm diffused light through a sheer curtain, a gentle soft shadow. Huge amount of clean empty space around it, the cup small and centred. Pale blush background. Simple, calm, quiet. No people, no text, no letters, no logos.',
    },
  ],
  notes: [
    'Light did the branding: golden-hour peach for Big Sister, lilac haze behind voile for Clear, magenta-to-coral gel for Unmuted. That gives the approach the distinct signature a stock hand-and-phone shot lacks.',
    'The model kept drifting sensual. The first Clear hero was a nude-looking silhouette behind the curtain (rejected); the first mood image had a bare shoulder (redone in a hoodie); the first Unmuted hero, a chest-and-collarbone crop, was blocked by the safety filter. Every prompt needs explicit, modest clothing.',
    'Half the set is "woman from behind at a window". That is a real cliché risk. The hands-and-objects shots (PrEP, contraception) were the most useful; a full library should lean on those.',
    'Place drifts: the rain-on-glass houses and misty trees in the Clear and mood images read northern-hemisphere, not Accra, and skin tone lightened where "West African" was left out (Clear hero). The wide shot does show Accra, but its landmark is a little on-the-nose.',
    'The empty-state cup was cropped tighter after generation so it reads in the 120px box. Verdict: recommend for sensitive screens with Big Sister or Clear; Unmuted only works as a staged colour-gel studio look, which feels less private.',
  ],
}
