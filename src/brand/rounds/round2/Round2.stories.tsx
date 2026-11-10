import type { Meta, StoryObj } from '@storybook/react-vite'
import { DIRECTION_IDS } from '../../directions'
import { DirectionsPage, MarkRow } from '../../stories/DirectionBoard'
import { VoicePage } from '../../stories/VoicePage'
import { TokensPage } from '../../../docs/TokensPage'

const meta: Meta = { title: 'Brand/Round 2 (current)/Directions & tokens', parameters: { frame: 'raw' } }
export default meta
type Story = StoryObj

export const Directions: Story = {
  render: () => (
    <DirectionsPage
      ids={DIRECTION_IDS}
      kicker="Round 2 · current"
      title="Round 2: Ink, Clay, Quiet, Grove"
      intro="All four keep the pink logo and move the rest of the system off pink. Ink, Clay and Quiet follow AskTia (calm grounds, coral only on the main action, a light serif). Grove follows Hers (forest panels, lime buttons, one tight sans, two-tone headlines)."
    />
  ),
}
export const VoiceAndCopy: Story = { name: 'Voice & copy', render: () => <VoicePage ids={DIRECTION_IDS} kicker="Round 2 · current · Voice & copy" /> }
export const Tokens: Story = { name: 'Tokens (colour, type, shape)', render: () => <TokensPage ids={DIRECTION_IDS} kicker="Round 2 · current · Tokens" /> }
export const Marks: Story = { name: 'Logo on each ground', render: () => <MarkRow ids={DIRECTION_IDS} /> }
