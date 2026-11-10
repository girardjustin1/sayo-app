import type { Meta, StoryObj } from '@storybook/react-vite'
import { CreateAccount } from './CreateAccount'

const meta: Meta<typeof CreateAccount> = { title: 'User/01 Onboarding/Create Account', component: CreateAccount }
export default meta
type Story = StoryObj<typeof CreateAccount>

export const Empty: Story = {}
export const ReadyWithPhone: Story = { args: { filled: true, method: 'phone' } }
export const ReadyWithEmail: Story = { args: { filled: true, method: 'email' } }
export const Errors: Story = { args: { showErrors: true } }
