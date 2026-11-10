import type { Meta, StoryObj } from '@storybook/react-vite'
import { AskChatState } from './AskScreens'

const meta: Meta<typeof AskChatState> = {
  title: 'User/03 Ask SAYO/Chat states',
  component: AskChatState,
  parameters: { docs: { description: { component: 'Transient states. Her words are never lost: errors and offline keep the message and offer a retry.' } } },
}
export default meta
type Story = StoryObj<typeof AskChatState>

export const AiTyping: Story = { args: { state: 'typing' } }
export const AiStreaming: Story = { args: { state: 'streaming' } }
export const SendFailed: Story = { args: { state: 'error' } }
export const Offline: Story = { args: { state: 'offline' } }
