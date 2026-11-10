import type { Meta, StoryObj } from '@storybook/react-vite'
import { YourData } from './YourData'

const meta: Meta<typeof YourData> = { title: 'User/08 Me & Privacy/Your Data', component: YourData }
export default meta
type Story = StoryObj<typeof YourData>

export const Default: Story = {}
export const DownloadRequested: Story = { args: { state: 'downloadRequested' } }
export const ConfirmDelete: Story = { args: { state: 'confirmDelete' } }
