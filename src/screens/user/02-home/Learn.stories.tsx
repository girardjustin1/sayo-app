import type { Meta, StoryObj } from '@storybook/react-vite'
import { Learn } from './Learn'

const meta: Meta<typeof Learn> = {
  title: 'User/02 Home/Learn',
  component: Learn,
  parameters: {
    docs: {
      description: {
        component:
          'Learn: editorial reads with an image, a two-tone title and "3 min read · checked by a professional". Written content, not AI, so no AI label. Article body text is a PLACEHOLDER that needs clinical review. Each article ends with "Ask SAYO about this".',
      },
    },
  },
}
export default meta
type Story = StoryObj<typeof Learn>

export const List: Story = {}
export const Article: Story = { args: { view: 'article', topic: 'prep' } }
export const ArticleMood: Story = { args: { view: 'article', topic: 'mood' } }
