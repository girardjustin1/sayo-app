import type { Meta, StoryObj } from '@storybook/react-vite'
import { ReviewWaiting } from './ReviewWaiting'

const meta: Meta<typeof ReviewWaiting> = { title: 'User/05 Reviews/Waiting', component: ReviewWaiting }
export default meta
type Story = StoryObj<typeof ReviewWaiting>

export const Queued: Story = { args: { state: 'queued' } }
export const InReview: Story = { args: { state: 'in_review' } }
/** A professional released the case (outside their competence); it is back in the queue. */
export const ReturnedToQueue: Story = { args: { state: 'released' } }
