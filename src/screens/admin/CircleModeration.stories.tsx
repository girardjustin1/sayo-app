import type { Meta, StoryObj } from '@storybook/react-vite'
import { CircleModeration } from './CircleModeration'

const meta: Meta<typeof CircleModeration> = { title: 'Admin/Circle moderation', component: CircleModeration, parameters: { frame: 'desktop' } }
export default meta
type Story = StoryObj<typeof CircleModeration>

/** GBV-sensitive reports first; reports grouped per post with every reason. */
export const VictimBlaming: Story = { args: { selectedId: 'MR-118' } }
/** "Someone may be in danger": hidden automatically, safety information first. */
export const SomeoneInDanger: Story = { args: { selectedId: 'MR-119' } }
export const HarmfulHealthInfo: Story = { args: { selectedId: 'MR-116' } }
export const SuspendUser: Story = { args: { selectedId: 'MR-118', suspendOpen: true } }
export const ModerationLog: Story = { args: { tab: 'log' } }
export const Empty: Story = { args: { empty: true } }
