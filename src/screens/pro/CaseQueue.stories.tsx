import type { Meta, StoryObj } from '@storybook/react-vite'
import { CaseQueue } from './CaseQueue'

const meta: Meta<typeof CaseQueue> = { title: 'Professional/Case queue', component: CaseQueue, parameters: { frame: 'desktop' } }
export default meta
type Story = StoryObj<typeof CaseQueue>

/** Red-flag cases first, then longest waiting. */
export const Default: Story = {}
export const RedFlagsOnly: Story = { args: { redFlagsOnly: true } }
/** Foreign-licensed reviewer: fictional training cases only. */
export const ForeignLicensed: Story = { args: { foreignLicensed: true } }
export const Empty: Story = { args: { empty: true } }
/** Preview a case in a drawer before accepting it. */
export const PreviewBeforeAccept: Story = { args: { previewId: 'R-2082' } }
/** Cases you accepted and have not completed yet. */
export const AcceptedByMe: Story = { args: { view: 'mine' } }
