import type { Meta, StoryObj } from '@storybook/react-vite'
import { SignIn } from './SignIn'

const meta: Meta<typeof SignIn> = { title: 'Professional/Sign in', component: SignIn, parameters: { frame: 'desktop' } }
export default meta
type Story = StoryObj<typeof SignIn>

export const Default: Story = {}
/** Second step: one-time code by email. */
export const VerificationCode: Story = { args: { step: 'code' } }
export const WrongDetails: Story = { args: { step: 'error' } }
export const TooManyAttempts: Story = { args: { step: 'locked' } }
