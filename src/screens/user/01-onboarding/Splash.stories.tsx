import type { Meta, StoryObj } from '@storybook/react-vite'
import { Splash } from './Splash'

const meta: Meta<typeof Splash> = { title: 'User/01 Onboarding/Splash', component: Splash }
export default meta
type Story = StoryObj<typeof Splash>

export const Default: Story = {}
export const LaunchMoment: Story = { args: { showActions: false } }
