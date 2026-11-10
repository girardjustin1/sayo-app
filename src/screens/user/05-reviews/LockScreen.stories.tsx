import type { Meta, StoryObj } from '@storybook/react-vite'
import { LockScreen } from './LockScreen'

/** Discreet notification: the direction's generic `notificationLock` line only. Never a health topic. */
const meta: Meta<typeof LockScreen> = { title: 'User/05 Reviews/Lock Screen', component: LockScreen }
export default meta
type Story = StoryObj<typeof LockScreen>

export const ResponseReady: Story = {}
export const TwoUpdates: Story = { args: { count: 2 } }
