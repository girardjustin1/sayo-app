import type { Meta, StoryObj } from '@storybook/react-vite'
import { AskReviewOffer } from './AskScreens'

const meta: Meta<typeof AskReviewOffer> = {
  title: 'User/03 Ask SAYO/Review offer',
  component: AskReviewOffer,
  parameters: { docs: { description: { component: 'Locked reviewOffer wording. Yes and "Not now" carry equal weight (user autonomy). Explains what a professional sees and that review is async, not live chat.' } } },
}
export default meta
type Story = StoryObj<typeof AskReviewOffer>

export const Offer: Story = {}
export const NotNow: Story = { args: { declined: true } }
