import type { Meta, StoryObj } from '@storybook/react-vite'
import { MyReviews } from './MyReviews'

const meta: Meta<typeof MyReviews> = { title: 'User/05 Reviews/My Reviews', component: MyReviews }
export default meta
type Story = StoryObj<typeof MyReviews>

/** One answered, one queued, one in review. */
export const Default: Story = {}
export const Empty: Story = { args: { isEmpty: true } }
