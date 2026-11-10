import type { Meta, StoryObj } from '@storybook/react-vite'
import { AskFreeText } from './AskScreens'

const meta: Meta<typeof AskFreeText> = {
  title: 'User/03 Ask SAYO/Free text',
  component: AskFreeText,
  parameters: { docs: { description: { component: '"Okay. In your own words, explain exactly how you feel." (locked). Her long message is kept verbatim: no auto-correct, no rewording.' } } },
}
export default meta
type Story = StoryObj<typeof AskFreeText>

export const BlankWithStarters: Story = { args: { stage: 'empty' } }
export const Writing: Story = { args: { stage: 'writing' } }
export const Sent: Story = { args: { stage: 'sent' } }
