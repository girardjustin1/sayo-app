import type { Meta, StoryObj } from '@storybook/react-vite'
import { PrivacyPromise } from './PrivacyPromise'

const meta: Meta<typeof PrivacyPromise> = { title: 'User/01 Onboarding/Privacy Promise (18+)', component: PrivacyPromise }
export default meta
type Story = StoryObj<typeof PrivacyPromise>

export const Default: Story = {}
export const Confirmed: Story = { args: { confirmed: true } }
