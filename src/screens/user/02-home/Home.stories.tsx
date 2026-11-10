import type { Meta, StoryObj } from '@storybook/react-vite'
import { Home } from './Home'

const meta: Meta<typeof Home> = { title: 'User/02 Home/Home', component: Home }
export default meta
type Story = StoryObj<typeof Home>

export const Default: Story = {}
export const ResponseReady: Story = { args: { hasReadyReview: true } }
export const FirstVisit: Story = { args: { isNew: true } }
