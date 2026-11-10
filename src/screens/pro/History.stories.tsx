import type { Meta, StoryObj } from '@storybook/react-vite'
import { History } from './History'

const meta: Meta<typeof History> = { title: 'Professional/Completed reviews', component: History, parameters: { frame: 'desktop' } }
export default meta
type Story = StoryObj<typeof History>

export const Default: Story = {}
/** One completed case with its audit note: accepted by … at …, completed by … at … */
export const AuditNote: Story = { args: { openId: 'R-2081' } }
export const Empty: Story = { args: { empty: true } }
