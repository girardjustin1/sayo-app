import type { Meta, StoryObj } from '@storybook/react-vite'
import { ROUND1_IDS } from '../../directions'
import { DirectionsPage, MarkRow } from '../../stories/DirectionBoard'
import { VoicePage } from '../../stories/VoicePage'
import { TokensPage } from '../../../docs/TokensPage'

const meta: Meta = { title: 'Brand/Round 1 (pink)/Directions & tokens', parameters: { frame: 'raw' } }
export default meta
type Story = StoryObj

export const Directions: Story = {
  render: () => (
    <DirectionsPage
      ids={ROUND1_IDS}
      kicker="Round 1 · pink"
      title="Round 1: the pink set"
      intro="All three took their main colour from inside the logo (rose, plum, magenta), so they differ in temperature but not in colour family. Kept for comparison."
    />
  ),
}
export const VoiceAndCopy: Story = { name: 'Voice & copy', render: () => <VoicePage ids={ROUND1_IDS} kicker="Round 1 · pink · Voice & copy" /> }
export const Tokens: Story = { name: 'Tokens (colour, type, shape)', render: () => <TokensPage ids={ROUND1_IDS} kicker="Round 1 · pink · Tokens" /> }
export const Marks: Story = { name: 'Logo on each ground', render: () => <MarkRow ids={ROUND1_IDS} /> }
