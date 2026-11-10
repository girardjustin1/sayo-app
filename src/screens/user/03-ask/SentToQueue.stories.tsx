import type { Meta, StoryObj } from '@storybook/react-vite'
import { AskSent } from './AskScreens'

const meta: Meta<typeof AskSent> = {
  title: 'User/03 Ask SAYO/Sent to queue',
  component: AskSent,
  parameters: { docs: { description: { component: 'Locked queueMessage, what happens next, and exactly what the lock-screen notification will say.' } } },
}
export default meta
type Story = StoryObj<typeof AskSent>

export const Default: Story = {}
