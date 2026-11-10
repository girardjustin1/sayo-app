import type { Meta, StoryObj } from '@storybook/react-vite'
import { Guidelines } from './Guidelines'

const meta: Meta<typeof Guidelines> = { title: 'User/07 Circle/Guidelines', component: Guidelines }
export default meta
type Story = StoryObj<typeof Guidelines>

export const Default: Story = {}
/** Shown once, before someone's first post. */
export const FirstPostGate: Story = { args: { isFirstPostGate: true } }
