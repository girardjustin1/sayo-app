import type { Meta, StoryObj } from '@storybook/react-vite'
import { MeHome } from './MeHome'

const meta: Meta<typeof MeHome> = { title: 'User/08 Me & Privacy/Me', component: MeHome }
export default meta
type Story = StoryObj<typeof MeHome>

export const Default: Story = {}
export const NoFirstName: Story = { args: { firstName: '' } }
