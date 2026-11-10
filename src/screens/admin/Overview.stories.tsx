import type { Meta, StoryObj } from '@storybook/react-vite'
import { Overview } from './Overview'

const meta: Meta<typeof Overview> = { title: 'Admin/Overview', component: Overview, parameters: { frame: 'desktop' } }
export default meta
type Story = StoryObj<typeof Overview>

/** Action items above the de-identified metrics. */
export const Default: Story = {}
export const AllClear: Story = { args: { allClear: true } }
