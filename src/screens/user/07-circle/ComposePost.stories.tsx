import type { Meta, StoryObj } from '@storybook/react-vite'
import { ComposePost } from './ComposePost'

const meta: Meta<typeof ComposePost> = { title: 'User/07 Circle/Compose Post', component: ComposePost }
export default meta
type Story = StoryObj<typeof ComposePost>

export const Blank: Story = {}
export const ReadyToPost: Story = {
  args: {
    initialTopic: 'contraception',
    initialTitle: 'Did the implant change your periods?',
    initialBody: 'Thinking about getting one next month. How was the first few months for you?',
  },
}
/** Text looks like it contains a phone number and a real name: warning, Post disabled. */
export const IdentifyingDetailsWarning: Story = {
  args: {
    initialTopic: 'relationships',
    initialTitle: 'Is this normal in a relationship?',
    initialBody: 'His name is Kwame and he checks my phone every night. If anyone has been through this call me on 024 000 1234.',
  },
}
