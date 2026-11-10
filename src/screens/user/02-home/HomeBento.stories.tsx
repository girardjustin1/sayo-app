import type { Meta, StoryObj } from '@storybook/react-vite'
import { HomeBento } from './HomeBento'

const meta: Meta<typeof HomeBento> = {
  title: 'User/02 Home/Home (bento)',
  component: HomeBento,
  parameters: {
    docs: {
      description: {
        component:
          'Home as a bento, after the Hers home: a short two-tone headline, then large rounded tiles (one image, one line, one arrow) for Ask SAYO, Professional review, Find Care and the Circle, a quiet "Start here" row into the guided start, and who reviews questions. Image slots fall back to a brand panel until the imagery lands.',
      },
    },
  },
}
export default meta
type Story = StoryObj<typeof HomeBento>

export const Default: Story = {}
export const ResponseReady: Story = { args: { hasReadyReview: true } }
export const FirstVisit: Story = { args: { isNew: true } }
