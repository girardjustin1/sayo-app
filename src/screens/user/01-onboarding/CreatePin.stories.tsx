import type { Meta, StoryObj } from '@storybook/react-vite'
import { CreatePin } from './CreatePin'

const meta: Meta<typeof CreatePin> = {
  title: 'User/01 Onboarding/Create PIN',
  component: CreatePin,
  argTypes: { filled: { control: { type: 'range', min: 0, max: 4 } } },
}
export default meta
type Story = StoryObj<typeof CreatePin>

export const Create: Story = { args: { stage: 'create', filled: 2 } }
export const Confirm: Story = { args: { stage: 'confirm', filled: 1 } }
export const Mismatch: Story = { args: { stage: 'mismatch' } }
