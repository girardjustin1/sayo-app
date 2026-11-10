import type { Meta, StoryObj } from '@storybook/react-vite'
import { AgeGate } from './AgeGate'

const meta: Meta<typeof AgeGate> = { title: 'User/01 Onboarding/Age Gate', component: AgeGate }
export default meta
type Story = StoryObj<typeof AgeGate>

export const Default: Story = {}
export const NotYetEligible: Story = { args: { underage: true } }
