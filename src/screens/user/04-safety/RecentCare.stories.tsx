import type { Meta, StoryObj } from '@storybook/react-vite'
import { SafetyRecentCare } from './SafetyScreens'

const meta: Meta<typeof SafetyRecentCare> = {
  title: 'User/04 Safety/Recent assault: time-sensitive care',
  component: SafetyRecentCare,
  parameters: { docs: { description: { component: 'Safe now, assault in the last few days. Lists what may be time-sensitive (PEP, emergency contraception, STI care, injuries, forensic exam) "depending on local protocols". DRAFT: needs clinical and legal sign-off.' } } },
}
export default meta
type Story = StoryObj<typeof SafetyRecentCare>

export const Default: Story = {}
export const ForUserTesting: Story = { name: 'Default (no draft marker)', args: { signOff: false } }
