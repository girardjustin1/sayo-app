import type { Meta, StoryObj } from '@storybook/react-vite'
import { CareServices } from './CareServices'

const meta: Meta<typeof CareServices> = { title: 'Admin/Care services', component: CareServices, parameters: { frame: 'desktop' } }
export default meta
type Story = StoryObj<typeof CareServices>

export const Default: Story = {}
export const EditService: Story = { args: { editId: 's1' } }
/** An unverified service: not shown to users until someone checks it. */
export const EditUnverified: Story = { args: { editId: 's5' } }
export const AddService: Story = { args: { editId: 'new' } }
