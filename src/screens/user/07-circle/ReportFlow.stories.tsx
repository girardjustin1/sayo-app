import type { Meta, StoryObj } from '@storybook/react-vite'
import { ReportFlow } from './ReportFlow'

const meta: Meta<typeof ReportFlow> = { title: 'User/07 Circle/Report', component: ReportFlow }
export default meta
type Story = StoryObj<typeof ReportFlow>

export const ChooseReason: Story = {}
export const ReasonSelected: Story = { args: { reason: 'victim_blaming' } }
/** "Someone may be in danger" routes to the safety team, not only moderation. */
export const SomeoneMayBeInDanger: Story = { args: { reason: 'danger' } }
export const Submitted: Story = { args: { reason: 'victim_blaming', submitted: true } }
export const SubmittedToSafetyTeam: Story = { args: { reason: 'danger', submitted: true } }
