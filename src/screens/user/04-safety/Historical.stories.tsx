import type { Meta, StoryObj } from '@storybook/react-vite'
import { SafetyHistorical } from './SafetyScreens'

const meta: Meta<typeof SafetyHistorical> = {
  title: 'User/04 Safety/Historical disclosure',
  component: SafetyHistorical,
  parameters: { docs: { description: { component: 'It happened a while ago and she is safe now. Gentle, at her pace: support service, professional review, a health check, the Circle. A way back to urgent help if that changes.' } } },
}
export default meta
type Story = StoryObj<typeof SafetyHistorical>

export const Default: Story = {}
