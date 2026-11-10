import type { Meta, StoryObj } from '@storybook/react-vite'
import { NotificationSettings } from './NotificationSettings'

const meta: Meta<typeof NotificationSettings> = { title: 'User/08 Me & Privacy/Notification Settings', component: NotificationSettings }
export default meta
type Story = StoryObj<typeof NotificationSettings>

export const Default: Story = {}
export const NoPreview: Story = { args: { preview: 'hidden' } }
export const BlockedByPhone: Story = { args: { blockedBySystem: true } }
