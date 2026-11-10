import type { Meta, StoryObj } from '@storybook/react-vite'
import { AskFollowUp } from './AskScreens'

const meta: Meta<typeof AskFollowUp> = {
  title: 'User/03 Ask SAYO/Follow-up questions',
  component: AskFollowUp,
  parameters: { docs: { description: { component: 'Mid-conversation (INTAKE_CHAT). Quick replies plus "Prefer not to say": SAYO only collects what it needs.' } } },
}
export default meta
type Story = StoryObj<typeof AskFollowUp>

export const MidConversation: Story = {}
