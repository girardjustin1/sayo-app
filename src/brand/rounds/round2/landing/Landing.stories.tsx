import type { Meta, StoryObj } from '@storybook/react-vite'
import { DirectionProvider } from '../../../DirectionContext'
import type { R2Direction } from '../imagery'
import { Landing } from './Landing'

/**
 * Each round-2 direction as a complete brand on one marketing page: imagery, copy and
 * elements together. Every story fixes its own direction (the toolbar does not apply).
 */
const meta: Meta = { title: 'Brand/Round 2 (current)/Landing page', parameters: { frame: 'raw' } }
export default meta
type Story = StoryObj

const page = (id: R2Direction) => () => <DirectionProvider id={id}><Landing /></DirectionProvider>

/** The same page in a centred 390px column. The layout responds to its own width, not the window's. */
const mobile = (id: R2Direction) => () => (
  <div className="ld-mobile-frame">
    <div className="ld-mobile-frame__column"><DirectionProvider id={id}><Landing /></DirectionProvider></div>
  </div>
)

export const Ink: Story = { render: page('ink') }
export const Clay: Story = { render: page('clay') }
export const Quiet: Story = { render: page('quiet') }
export const Grove: Story = { render: page('grove') }
export const MobileGrove: Story = { render: mobile('grove') }
export const MobileClay: Story = { render: mobile('clay') }
