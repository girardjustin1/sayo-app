import { defineTheme } from '@astryxdesign/core/theme'
import { neutralTheme } from '@astryxdesign/theme-neutral'
import type { DirectionId } from './directions'

/**
 * One Astryx theme per brand direction. Runtime themes are fine in Storybook
 * (client-only). For the production app, run `pnpm astryx theme build` on the
 * chosen one.
 *
 * `--sayo-*` local tokens carry brand values Astryx has no slot for.
 *
 * Astryx-first: spacing, radius and the type scale are Astryx's own (inherited from the
 * neutral theme). A direction only sets colour, font families, the page background and
 * a few --sayo-* brand tokens. Do not re-tune metrics here.
 */

/** Messaging-app bubbles: modest radius, a small "tail" corner on the speaker's side, tight type. */
const chatBubbles = {
  'chat-message-bubble': {
    base: { borderRadius: '20px', padding: '10px 14px', fontSize: '15px', lineHeight: '22px' },
    'sender:assistant': { borderEndStartRadius: '6px' },
    'sender:user': { borderEndEndRadius: '6px' },
  },
  // Professional content: a soft tint, not Astryx's saturated green card.
  card: {
    'variant:green': { backgroundColor: 'var(--sayo-pro-soft)', color: 'var(--color-text-primary)' },
  },
  // Unpressed toggles (Circle filters, reactions) get a visible outline so they read as buttons.
  'toggle-button': {
    base: { boxShadow: 'inset 0 0 0 1px var(--color-border-emphasized)' },
    isPressed: { boxShadow: 'none' },
  },
}

const sister = defineTheme({
  name: 'sayo-sister',
  extends: neutralTheme,
  color: { accent: '#D62B63', neutralStyle: 'warm' },
  typography: {
    body: { family: 'Plus Jakarta Sans Variable', fallbacks: 'system-ui, sans-serif' },
    heading: { family: 'Plus Jakarta Sans Variable', fallbacks: 'system-ui, sans-serif', weight: '750' },
  },
  components: chatBubbles,
  tokens: {
    '--color-background-body': '#FFF7F3',
  },
  localTokens: {
    '--sayo-gradient': 'linear-gradient(120deg, #D4009E 0%, #F0346A 55%, #FF5A48 100%)',
    '--sayo-hero': 'linear-gradient(180deg, #FFE6DA 0%, #FFF7F3 100%)',
    '--sayo-soft': '#FFE9DF',
    '--sayo-soft-ink': '#8A2340',
    '--sayo-highlight': '#FFB547',
    '--sayo-pro': '#2F8F6B',
    '--sayo-pro-soft': '#E3F4EC',
    '--sayo-ai-soft': '#FFF0EA',
    '--sayo-display-font': "'Plus Jakarta Sans Variable', system-ui, sans-serif",
    '--sayo-display-weight': '800',
    '--sayo-display-style': 'normal',
    '--sayo-display-tracking': '-0.02em',
    '--sayo-card-radius': '12px',
    '--sayo-button-radius': '999px',
  },
})

const clear = defineTheme({
  name: 'sayo-clear',
  extends: neutralTheme,
  color: { accent: '#6D2E9E', neutralStyle: 'cool', contrast: 'standard' },
  typography: {
    body: { family: 'DM Sans Variable', fallbacks: 'system-ui, sans-serif' },
    heading: { family: 'DM Sans Variable', fallbacks: 'system-ui, sans-serif', weight: '650' },
  },
  components: chatBubbles,
  tokens: {
    '--color-background-body': '#FAF8FC',
  },
  localTokens: {
    '--sayo-gradient': 'linear-gradient(120deg, #D4009E 0%, #F0346A 55%, #FF5A48 100%)',
    '--sayo-hero': 'linear-gradient(180deg, #F1EAF8 0%, #FAF8FC 100%)',
    '--sayo-soft': '#EDE4F7',
    '--sayo-soft-ink': '#4B1F70',
    '--sayo-highlight': '#FF5A48',
    '--sayo-pro': '#2F8F6B',
    '--sayo-pro-soft': '#E4F3EC',
    '--sayo-ai-soft': '#F3EEF9',
    '--sayo-display-font': "'DM Sans Variable', system-ui, sans-serif",
    '--sayo-display-weight': '650',
    '--sayo-display-style': 'normal',
    '--sayo-display-tracking': '-0.015em',
    '--sayo-card-radius': '12px',
    '--sayo-button-radius': '12px',
  },
})

const unmuted = defineTheme({
  name: 'sayo-unmuted',
  extends: neutralTheme,
  color: { accent: '#C4007F', neutralStyle: 'neutral' },
  typography: {
    body: { family: 'DM Sans Variable', fallbacks: 'system-ui, sans-serif' },
    heading: { family: 'Fraunces Variable', fallbacks: 'Georgia, serif', weight: '650' },
  },
  components: chatBubbles,
  tokens: {
    '--color-background-body': '#FFFFFF',
  },
  localTokens: {
    '--sayo-gradient': 'linear-gradient(120deg, #D4009E 0%, #F0346A 55%, #FF5A48 100%)',
    '--sayo-hero': 'linear-gradient(135deg, #D4009E 0%, #F0346A 55%, #FF5A48 100%)',
    '--sayo-soft': '#FDE7F3',
    '--sayo-soft-ink': '#8E005C',
    '--sayo-highlight': '#FF5A48',
    '--sayo-pro': '#1F7A5A',
    '--sayo-pro-soft': '#E2F3EB',
    '--sayo-ai-soft': '#FFF0F7',
    '--sayo-display-font': "'Fraunces Variable', Georgia, serif",
    '--sayo-display-weight': '650',
    '--sayo-display-style': 'normal',
    '--sayo-display-tracking': '-0.025em',
    '--sayo-card-radius': '12px',
    '--sayo-button-radius': '999px',
  },
})

const ink = defineTheme({
  name: 'sayo-ink',
  extends: neutralTheme,
  color: { accent: '#1F2A44', neutralStyle: 'cool' },
  typography: {
    body: { family: 'Manrope Variable', fallbacks: 'system-ui, sans-serif' },
    heading: { family: 'Newsreader Variable', fallbacks: 'Georgia, serif', weight: '450' },
  },
  components: chatBubbles,
  tokens: {
    '--color-background-body': '#FAF8F5',
    // Pinned: the palette generator brightens dark seeds into blue.
    '--color-accent': '#1F2A44',
    '--color-on-accent': '#FFFFFF',
  },
  localTokens: {
    '--sayo-gradient': 'linear-gradient(120deg, #D4009E 0%, #F0346A 55%, #FF5A48 100%)',
    '--sayo-hero': 'linear-gradient(180deg, #EEF1F6 0%, #FAF8F5 100%)',
    '--sayo-soft': '#EEF1F6',
    '--sayo-soft-ink': '#1F2A44',
    '--sayo-highlight': '#F6544A',
    '--sayo-pro': '#2F7D62',
    '--sayo-pro-soft': '#E3F1EA',
    '--sayo-ai-soft': '#F1F3F7',
    '--sayo-display-font': "'Newsreader Variable', Georgia, serif",
    '--sayo-display-weight': '400',
    '--sayo-display-style': 'normal',
    '--sayo-display-tracking': '-0.01em',
    '--sayo-card-radius': '12px',
    '--sayo-button-radius': '999px',
  },
})

const clay = defineTheme({
  name: 'sayo-clay',
  extends: neutralTheme,
  color: { accent: '#A8452F', neutralStyle: 'warm' },
  typography: {
    body: { family: 'DM Sans Variable', fallbacks: 'system-ui, sans-serif' },
    heading: { family: 'Newsreader Variable', fallbacks: 'Georgia, serif', weight: '450' },
  },
  components: chatBubbles,
  tokens: {
    '--color-background-body': '#FCF6EE',
    '--color-accent': '#A8452F',
    '--color-on-accent': '#FFFFFF',
  },
  localTokens: {
    '--sayo-gradient': 'linear-gradient(120deg, #D4009E 0%, #F0346A 55%, #FF5A48 100%)',
    '--sayo-hero': 'linear-gradient(180deg, #EFE3D3 0%, #FCF6EE 100%)',
    '--sayo-soft': '#EFE3D3',
    '--sayo-soft-ink': '#6E1F3F',
    '--sayo-highlight': '#F2A93B',
    '--sayo-pro': '#2F7D62',
    '--sayo-pro-soft': '#E3F1EA',
    '--sayo-ai-soft': '#F6EEE4',
    '--sayo-display-font': "'Newsreader Variable', Georgia, serif",
    '--sayo-display-weight': '400',
    '--sayo-display-style': 'normal',
    '--sayo-display-tracking': '-0.01em',
    '--sayo-card-radius': '12px',
    '--sayo-button-radius': '999px',
  },
})

const quiet = defineTheme({
  name: 'sayo-quiet',
  extends: neutralTheme,
  color: { accent: '#2A2D32', neutralStyle: 'neutral' },
  typography: {
    body: { family: 'Manrope Variable', fallbacks: 'system-ui, sans-serif' },
    heading: { family: 'Manrope Variable', fallbacks: 'system-ui, sans-serif', weight: '650' },
  },
  components: chatBubbles,
  tokens: {
    '--color-background-body': '#F6F5F2',
    '--color-accent': '#2A2D32',
    '--color-on-accent': '#FFFFFF',
  },
  localTokens: {
    '--sayo-gradient': 'linear-gradient(120deg, #D4009E 0%, #F0346A 55%, #FF5A48 100%)',
    '--sayo-hero': 'linear-gradient(180deg, #EFEDE8 0%, #F6F5F2 100%)',
    '--sayo-soft': '#E9E7E2',
    '--sayo-soft-ink': '#2A2D32',
    '--sayo-highlight': '#F6544A',
    '--sayo-pro': '#2F7D62',
    '--sayo-pro-soft': '#E3F1EA',
    '--sayo-ai-soft': '#F0EFEB',
    '--sayo-display-font': "'Manrope Variable', system-ui, sans-serif",
    '--sayo-display-weight': '650',
    '--sayo-display-style': 'normal',
    '--sayo-display-tracking': '-0.02em',
    '--sayo-card-radius': '12px',
    '--sayo-button-radius': '999px',
  },
})

// G · Grove: built on Hers's system. Forest accents and pills on white, lime on forest panels, bento radius.
const grove = defineTheme({
  name: 'sayo-grove',
  extends: neutralTheme,
  color: { accent: '#2F4A34', neutralStyle: 'neutral' },
  typography: {
    body: { family: 'Hanken Grotesk Variable', fallbacks: 'system-ui, sans-serif' },
    heading: { family: 'Hanken Grotesk Variable', fallbacks: 'system-ui, sans-serif', weight: '550' },
  },
  components: {
    ...chatBubbles,
    // Primary = forest pill on white. Lime is reserved for dark forest panels (see sayo.css).
    button: { base: { borderRadius: '999px' } },
    card: {
      base: { borderRadius: '20px' },
      'variant:green': { backgroundColor: 'var(--sayo-pro-soft)', color: 'var(--color-text-primary)' },
    },
    // Green is the brand in Grove, so "verified" moves to teal.
    badge: { 'variant:green': { backgroundColor: '#D8ECEE', color: '#1A5560' } },
  },
  tokens: {
    '--color-background-body': '#FFFFFF',
    '--color-accent': '#2F4A34',
    '--color-on-accent': '#FFFFFF',
  },
  localTokens: {
    '--sayo-gradient': 'linear-gradient(120deg, #D4009E 0%, #F0346A 55%, #FF5A48 100%)',
    '--sayo-hero': 'radial-gradient(130% 90% at 85% -10%, #86A65C 0%, #4A5F38 38%, #2B3524 78%)',
    '--sayo-soft': '#EEF3EA',
    '--sayo-soft-ink': '#2F4A34',
    '--sayo-highlight': '#C5ED82',
    '--sayo-pro': '#1F6F78',
    '--sayo-pro-soft': '#E4F1F2',
    '--sayo-ai-soft': '#F3F6F0',
    '--sayo-display-font': "'Hanken Grotesk Variable', system-ui, sans-serif",
    '--sayo-display-weight': '500',
    '--sayo-display-style': 'normal',
    '--sayo-display-tracking': '-0.035em',
    '--sayo-card-radius': '20px',
    '--sayo-button-radius': '999px',
    '--sayo-emphasis': '#4E7F5B',
    '--sayo-emphasis-on-dark': '#C5ED82',
  },
})

export const THEMES = { sister, clear, unmuted, ink, clay, quiet, grove } satisfies Record<DirectionId, unknown>
