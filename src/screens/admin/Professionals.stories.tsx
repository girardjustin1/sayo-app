import type { Meta, StoryObj } from '@storybook/react-vite'
import { Professionals } from './Professionals'

const meta: Meta<typeof Professionals> = { title: 'Admin/Professionals', component: Professionals, parameters: { frame: 'desktop' } }
export default meta
type Story = StoryObj<typeof Professionals>

export const Default: Story = {}
/** Pending, Ghana-licensed: tick each check, then approve. */
export const VerifyPending: Story = { args: { openId: 'pr4' } }
/** Approved but licensed in the UK: the real-cases switch is locked off, with the reason. */
export const ForeignLicensed: Story = { args: { openId: 'pr3' } }
export const ApprovedGhana: Story = { args: { openId: 'pr1' } }
export const SuspendConfirm: Story = { args: { openId: 'pr2', suspendOpen: true } }
