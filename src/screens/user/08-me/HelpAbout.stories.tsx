import type { Meta, StoryObj } from '@storybook/react-vite'
import { HelpAbout } from './HelpAbout'

const meta: Meta<typeof HelpAbout> = { title: 'User/08 Me & Privacy/Help & About', component: HelpAbout }
export default meta
type Story = StoryObj<typeof HelpAbout>

export const Default: Story = {}
