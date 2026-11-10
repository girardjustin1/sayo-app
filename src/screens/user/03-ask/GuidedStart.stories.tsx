import type { Meta, StoryObj } from '@storybook/react-vite'
import { GuidedStart } from './GuidedStart'

const meta: Meta<typeof GuidedStart> = {
  title: 'User/03 Ask SAYO/Guided start',
  component: GuidedStart,
  parameters: {
    docs: {
      description: {
        component:
          'The "Start here" door from Home (bento), after the Hers guided entry: one question per screen, large single-tap answers, a slim progress bar and "I\'d rather just type it" on every step. Step 1 keeps the locked opener "What\'s up?" with explicit topics; "Something happened to me" opens User/04 Safety. Step 3 hands off into the normal Ask SAYO chat with the locked follow-up. Nothing identifying is asked. Timing buckets are draft wording.',
      },
    },
  },
}
export default meta
type Story = StoryObj<typeof GuidedStart>

export const Step1Topic: Story = { name: 'Step 1 topic', args: { step: 1 } }
export const Step2Timing: Story = { name: 'Step 2 timing', args: { step: 2 } }
export const Step3HandOff: Story = { name: 'Step 3 hand-off', args: { step: 3 } }
