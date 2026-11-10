import type { Meta, StoryObj } from '@storybook/react-vite'
import { AskSummary } from './AskScreens'

const meta: Meta<typeof AskSummary> = {
  title: 'User/03 Ask SAYO/Summary check',
  component: AskSummary,
  parameters: { docs: { description: { component: 'She checks and can correct the AI summary. Her original words are always visible and never edited.' } } },
}
export default meta
type Story = StoryObj<typeof AskSummary>

export const Check: Story = {}
export const EditSummary: Story = { args: { editing: true } }
