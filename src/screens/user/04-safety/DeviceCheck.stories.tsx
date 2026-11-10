import type { Meta, StoryObj } from '@storybook/react-vite'
import { SafetyDeviceCheck } from './SafetyScreens'

const meta: Meta<typeof SafetyDeviceCheck> = {
  title: 'User/04 Safety/Device safety check',
  component: SafetyDeviceCheck,
  parameters: { docs: { description: { component: 'Locked deviceQuestion, asked second. "Not safe" gives short, practical tips instead of more questions.' } } },
}
export default meta
type Story = StoryObj<typeof SafetyDeviceCheck>

export const Default: Story = {}
export const NotSafe: Story = { args: { notSafe: true } }
