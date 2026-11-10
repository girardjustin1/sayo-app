import type { Meta, StoryObj } from '@storybook/react-vite'
import { Analytics } from './Analytics'

const meta: Meta<typeof Analytics> = { title: 'Admin/Analytics & export', component: Analytics, parameters: { frame: 'desktop' } }
export default meta
type Story = StoryObj<typeof Analytics>

export const Default: Story = {}
export const Exported: Story = { args: { exported: true } }
