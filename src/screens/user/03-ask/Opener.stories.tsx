import type { Meta, StoryObj } from '@storybook/react-vite'
import { AskOpener } from './AskScreens'

const meta: Meta<typeof AskOpener> = {
  title: 'User/03 Ask SAYO/Opener',
  component: AskOpener,
  parameters: { docs: { description: { component: '"What\'s up?" (locked) with explicit topic starters. The GBV starter opens User/04 Safety, not the normal intake.' } } },
}
export default meta
type Story = StoryObj<typeof AskOpener>

export const Default: Story = {}
export const Offline: Story = { args: { offline: true } }
