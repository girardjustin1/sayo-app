import type { Meta, StoryObj } from '@storybook/react-vite'
import { PendingVerification } from './PendingVerification'

const meta: Meta<typeof PendingVerification> = { title: 'Professional/Pending verification', component: PendingVerification, parameters: { frame: 'desktop' } }
export default meta
type Story = StoryObj<typeof PendingVerification>

/** Signed in but not approved: no queue and no case data yet. */
export const UnderReview: Story = {}
export const MoreInfoNeeded: Story = { args: { needsInfo: true } }
