import type { Meta, StoryObj } from '@storybook/react-vite'
import { PostDetail } from './PostDetail'

const meta: Meta<typeof PostDetail> = { title: 'User/07 Circle/Post Detail', component: PostDetail }
export default meta
type Story = StoryObj<typeof PostDetail>

/** Peer replies plus one Verified Professional reply (badge, role line, tinted card). */
export const Default: Story = {}
export const ReactedSupport: Story = { args: { reaction: 'support' } }
/** "Professional" filter: jump straight to the verified answer. */
export const ProfessionalRepliesOnly: Story = { args: { filter: 'pro' } }
export const WithRemovedReply: Story = { args: { withRemovedReply: true } }
/** Right after reporting a reply: hidden for the reporter, with "Show anyway". */
export const AfterReporting: Story = { args: { reportedReplyId: 'r4' } }
