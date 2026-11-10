import type { Meta, StoryObj } from '@storybook/react-vite'
import { UnlockPin } from './UnlockPin'

const meta: Meta<typeof UnlockPin> = {
  title: 'User/01 Onboarding/Unlock with PIN',
  component: UnlockPin,
  argTypes: { filled: { control: { type: 'range', min: 0, max: 4 } } },
}
export default meta
type Story = StoryObj<typeof UnlockPin>

export const Default: Story = { args: { filled: 1 } }
export const WrongPin: Story = { args: { state: 'wrong' } }
export const ForgotPin: Story = { args: { state: 'forgot' } }
