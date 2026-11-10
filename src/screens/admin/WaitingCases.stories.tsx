import type { Meta, StoryObj } from '@storybook/react-vite'
import { WaitingCases } from './WaitingCases'

const meta: Meta<typeof WaitingCases> = { title: 'Admin/Waiting cases', component: WaitingCases, parameters: { frame: 'desktop' } }
export default meta
type Story = StoryObj<typeof WaitingCases>

export const Default: Story = {}
export const AllWithinTarget: Story = { args: { allClear: true } }
