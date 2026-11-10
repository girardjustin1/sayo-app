import type { Meta, StoryObj } from '@storybook/react-vite'
import { AskBasicInfo } from './AskScreens'

const meta: Meta<typeof AskBasicInfo> = {
  title: 'User/03 Ask SAYO/Basic information',
  component: AskBasicInfo,
  parameters: { docs: { description: { component: 'AI_INFO_DISCHARGE. Labelled as AI twice (sender label + "Written by AI" tag) and closed with the locked not-a-diagnosis note.' } } },
}
export default meta
type Story = StoryObj<typeof AskBasicInfo>

export const Default: Story = {}
