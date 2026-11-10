import type { Meta, StoryObj } from '@storybook/react-vite'
import { ReviewResponse } from './ReviewResponse'

const meta: Meta<typeof ReviewResponse> = { title: 'User/05 Reviews/Response', component: ReviewResponse }
export default meta
type Story = StoryObj<typeof ReviewResponse>

export const RoutineAssessment: Story = { args: { decision: 'routine' } }
export const NoInPersonCare: Story = { args: { decision: 'none' } }
/** Urgent decision: shown first, solid band, calm wording, 24-hour service. */
export const UrgentAssessment: Story = { args: { decision: 'urgent' } }
export const FeedbackHelpful: Story = { args: { decision: 'routine', feedback: 'helpful' } }
export const FeedbackNotHelpful: Story = { args: { decision: 'routine', feedback: 'not_helpful' } }
