import type { Meta, StoryObj } from '@storybook/react-vite'
import { Intro } from './Intro'

const meta: Meta<typeof Intro> = {
  title: 'User/01 Onboarding/Intro',
  component: Intro,
  argTypes: { step: { control: { type: 'inline-radio' }, options: [0, 1, 2] } },
}
export default meta
type Story = StoryObj<typeof Intro>

export const Step1Ask: Story = { args: { step: 0 } }
export const Step2Professional: Story = { args: { step: 1 } }
export const Step3: Story = { name: 'Step 3 (Circle / Find Care)', args: { step: 2 } }
