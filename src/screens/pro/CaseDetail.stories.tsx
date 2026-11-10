import type { Meta, StoryObj } from '@storybook/react-vite'
import { CaseDetail } from './CaseDetail'

const meta: Meta<typeof CaseDetail> = { title: 'Professional/Case detail', component: CaseDetail, parameters: { frame: 'desktop' } }
export default meta
type Story = StoryObj<typeof CaseDetail>

/** Red-flag case (possible HIV exposure), not yet accepted. Minimum necessary information only. */
export const RedFlag: Story = { args: { caseId: 'R-2082' } }
export const Routine: Story = { args: { caseId: 'R-2084' } }
/** Sexual-violence disclosure: red flags and the safety answers she gave. */
export const GbvDisclosure: Story = { args: { caseId: 'R-2086' } }
/** After "Accept case": logged, and "Write response" appears. */
export const Accepted: Story = { args: { caseId: 'R-2082', accepted: true } }
/** Release or decline with a reason: back to the queue, nothing sent to the user. */
export const ReleaseDialog: Story = { args: { caseId: 'R-2084', releaseOpen: true } }
