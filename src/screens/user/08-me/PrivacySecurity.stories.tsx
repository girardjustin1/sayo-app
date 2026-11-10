import type { Meta, StoryObj } from '@storybook/react-vite'
import { PrivacySecurity } from './PrivacySecurity'

const meta: Meta<typeof PrivacySecurity> = { title: 'User/08 Me & Privacy/Privacy & Security', component: PrivacySecurity }
export default meta
type Story = StoryObj<typeof PrivacySecurity>

export const Default: Story = {}
export const TriedToTurnOffPin: Story = { args: { triedPinOff: true } }
export const RelaxedAutoLock: Story = { args: { autoLock: '5min', hideInSwitcher: false } }
