import type { Meta, StoryObj } from '@storybook/react-vite'
import { SafetyDangerCheck } from './SafetyScreens'

const meta: Meta<typeof SafetyDangerCheck> = {
  title: 'User/04 Safety/Immediate danger check',
  component: SafetyDangerCheck,
  parameters: { docs: { description: { component: 'Locked dangerQuestion, asked first. One-tap Yes / No / Not sure in place of the keyboard. Yes or Not sure → "In danger now".' } } },
}
export default meta
type Story = StoryObj<typeof SafetyDangerCheck>

export const Default: Story = {}
