import type { Meta, StoryObj } from '@storybook/react-vite'
import { CircleFeed } from './CircleFeed'

const meta: Meta<typeof CircleFeed> = { title: 'User/07 Circle/Feed', component: CircleFeed }
export default meta
type Story = StoryObj<typeof CircleFeed>

/** All topics. Includes one moderator-removed post placeholder. */
export const Default: Story = {}
export const TopicConsent: Story = { args: { topic: 'consent' } }
/** A topic with no posts: the direction's `circleEmpty` copy. */
export const EmptyTopic: Story = { args: { topic: 'hiv_sti' } }
