/**
 * Preliminary brand imagery, one set per direction. Generated with Higgsfield
 * (Soul 2.0 for photography, Recraft V4.1 vector for the line illustration).
 * Files live in public/imagery/<direction>/ and are served from /imagery/...
 *
 * `prompt` is the exact prompt sent to the model, kept so images can be
 * regenerated or iterated. Where a file is a crop or recolour of the output,
 * `use` says so.
 */
import type { DirectionId } from './directions'

export type ImageryItem = {
  src: string
  alt: string
  ratio: string
  use: string
  prompt: string
}

export type ImageryRecord = Record<Extract<DirectionId, 'sister' | 'clear' | 'unmuted'>, ImageryItem[]>

export const IMAGERY: ImageryRecord = {
  sister: [
    {
      src: '/imagery/sister/hero.jpg',
      alt: 'Two young women laughing on a rooftop at sunset, one resting her head on the other’s shoulder.',
      ratio: '3:4',
      use: 'Onboarding / splash hero. Film border cropped off the generated frame.',
      prompt:
        "Candid 35mm film photograph, two Ghanaian women friends in their mid-twenties sitting close together on a low concrete wall on a rooftop in Accra at golden hour, one leaning her head on the other's shoulder mid-laugh, the other smiling with eyes closed. One has short natural coily hair, the other long box braids tied up. Soft peach and coral cotton tops, small gold hoop earrings. Warm low sun backlighting their hair, gentle lens flare, blush and apricot tones, shallow depth of field, soft blurred city rooftops behind. Intimate, unposed, real skin texture, documentary warmth like a Kinfolk editorial. Vertical composition with calm open sky in the upper third. No text, no logos.",
    },
    {
      src: '/imagery/sister/wide.jpg',
      alt: 'Four young women laughing together on a shaded veranda with a bowl of mango and pink bougainvillea behind.',
      ratio: '16:9',
      use: 'Start Here / brand docs wide image.',
      prompt:
        'Wide candid lifestyle photograph, four young Ghanaian women in their twenties relaxing together on a shaded veranda in late afternoon, sitting on a woven mat and low wooden stools, sharing a bowl of sliced mango and bottles of chilled sobolo, one telling a story with her hands while the others laugh. Varied dark-to-medium brown skin tones, different natural hairstyles: cornrows, a short afro, a head wrap, long braids. Everyday clothing in peach, rose, cream and mustard. Warm golden light through a bougainvillea trellis casting soft dappled shadows, pink bougainvillea flowers. Shot on Portra 400, natural and unposed, genuine closeness. No text, no logos, no phones.',
    },
    {
      src: '/imagery/sister/detail.jpg',
      alt: 'Close-up of two friends cheek to cheek, eyes closed, laughing in warm evening light.',
      ratio: '1:1',
      use: 'Square detail for cards and avatars. Square crop of the hero image (the dedicated detail generations were rejected).',
      prompt:
        "Candid 35mm film photograph, two Ghanaian women friends in their mid-twenties sitting close together on a low concrete wall on a rooftop in Accra at golden hour, one leaning her head on the other's shoulder mid-laugh, the other smiling with eyes closed. One has short natural coily hair, the other long box braids tied up. Soft peach and coral cotton tops, small gold hoop earrings. Warm low sun backlighting their hair, gentle lens flare, blush and apricot tones, shallow depth of field, soft blurred city rooftops behind. Intimate, unposed, real skin texture, documentary warmth like a Kinfolk editorial. Vertical composition with calm open sky in the upper third. No text, no logos.",
    },
  ],
  clear: [
    {
      src: '/imagery/clear/hero.jpg',
      alt: 'A woman’s hands holding a phone with a blank screen, sitting on lavender bed linen by a sheer curtain.',
      ratio: '3:4',
      use: 'Onboarding / splash hero. Face out of frame for privacy.',
      prompt:
        "Quiet editorial photograph, over-the-shoulder close crop of a young Black woman's hands holding a smartphone at chest height while she sits on a bed with soft lavender linen, the screen shows only a blank soft white glow, her face out of frame. Natural short nails, a simple silver ring, oversized cream knit cardigan sleeve. Early morning window light filtered through sheer lilac curtains, calm muted plum and lavender tones, lots of soft negative space at the top of the frame. Minimal, private, serene, modern health-tech mood, not clinical. No text on screen, no logos.",
    },
    {
      src: '/imagery/clear/wide.jpg',
      alt: 'Still life on a lilac surface: a cup of hibiscus tea, mint, a pebble, a folded napkin, a plum notebook and a phone.',
      ratio: '16:9',
      use: 'Start Here / brand docs wide image.',
      prompt:
        'Wide calm still-life photograph on a pale lavender plaster surface against a soft lilac wall: a ceramic cup of hibiscus tea, a small sprig of fresh mint, a smooth pebble, a folded cream linen napkin, a closed notebook with a plum cover, and a smartphone lying face down. Long soft shadows from a window to the left, morning light, muted plum, lavender and mist white palette, generous empty space on the right side for layout. Minimal Scandinavian art direction, serene and private. No text, no logos, no medical objects.',
    },
    {
      src: '/imagery/clear/detail.jpg',
      alt: 'A single purple flower stem in a white bud vase beside a grey stone and a lavender cloth.',
      ratio: '1:1',
      use: 'Square detail / calm still life for cards.',
      prompt:
        'Square minimal still-life photograph: a single stem of purple bougainvillea in a small matte white ceramic bud vase, beside a smooth lilac stone and a soft folded lavender cloth, on a pale mist-white surface, against a gradient lilac wall. Soft diffused window light from the side, gentle shadow, calm and quiet, muted plum and lavender tones with one tiny coral accent from a bead. Lots of negative space. No text, no logos.',
    },
    {
      src: '/imagery/clear/empty.svg',
      alt: 'Line illustration of two hands gently holding a speech bubble, with a small coral dot.',
      ratio: '1:1',
      use: 'Empty-state illustration (vector). Stroke recoloured to Plum #6D2E9E after generation.',
      prompt:
        'Simple single-weight continuous line illustration in plum, two hands gently cupping a small glowing speech bubble shape, with one small coral dot accent and a soft lavender circle behind. Minimal, calm, friendly, generous white space, flat, no shading, for an app empty state. No text, no letters.',
    },
  ],
  unmuted: [
    {
      src: '/imagery/unmuted/hero.jpg',
      alt: 'A young woman with short bleached hair in a magenta blazer looks into the camera against a magenta and coral wall.',
      ratio: '3:4',
      use: 'Onboarding / splash hero.',
      prompt:
        'Studio portrait photograph, plain wall background with no lettering anywhere. A confident young Ghanaian woman in her mid-twenties stands against a backdrop painted in two flat colour blocks, saturated magenta on the left and warm coral on the right, meeting in a vertical line behind her. She looks straight into the lens with a slight knowing smile, chin lifted, short bleached-blonde natural coily hair, dark brown skin with real texture. She wears a structured hot magenta blazer buttoned over a coral high-neck top, fully covered. Hard key light with a magenta gel from the left and a coral rim light from the right give a duotone glow. Framed from mid-chest up with calm empty backdrop above her head. Clean photograph only, no typography, no words, no logos, no magazine layout.',
    },
    {
      src: '/imagery/unmuted/wide.jpg',
      alt: 'Three young women in colour-blocked magenta and coral outfits stand together against a coral backdrop.',
      ratio: '16:9',
      use: 'Start Here / brand docs wide image.',
      prompt:
        'Wide editorial fashion photograph of three young West African women in their twenties standing shoulder to shoulder against a seamless backdrop with a smooth magenta to coral gradient, all looking directly at the camera with confident relaxed expressions, one laughing. Different skin tones from deep brown to medium brown, varied hair: long knotless braids, a sleek low bun, a voluminous afro. Monochrome outfits in magenta, coral and white, colour-blocked styling. Crisp studio lighting with coloured gels, slight duotone feel, bold and celebratory. Leave space on the left third. No text, no logos.',
    },
    {
      src: '/imagery/unmuted/detail.jpg',
      alt: 'A smiling woman with eyes closed in a coral turtleneck and gold earring against a magenta background.',
      ratio: '1:1',
      use: 'Square detail / poster-style crop.',
      prompt:
        'Square tight editorial close-up portrait, three-quarter view of a young Black woman in her twenties with a calm proud smile, eyes closed, wearing a high-neck ribbed coral turtleneck sweater, fully clothed, one large gold sculptural earring, short natural hair. Bathed in a magenta and coral duotone gel light against a flat solid magenta background. Graphic, high contrast, poster-like fashion beauty photography, hands out of frame. No text, no logos.',
    },
  ],
}
