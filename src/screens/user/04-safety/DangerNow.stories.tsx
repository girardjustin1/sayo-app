import type { Meta, StoryObj } from '@storybook/react-vite'
import { SafetyDangerNow } from './SafetyScreens'

const meta: Meta<typeof SafetyDangerNow> = {
  title: 'User/04 Safety/In danger now',
  component: SafetyDangerNow,
  parameters: { docs: { description: { component: 'Emergency first and short: call, where to go, and a no-call option. No questionnaire. Ghana numbers and services must be verified (sample data).' } } },
}
export default meta
type Story = StoryObj<typeof SafetyDangerNow>

export const Default: Story = {}
