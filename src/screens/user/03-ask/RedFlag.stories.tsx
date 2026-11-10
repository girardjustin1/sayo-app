import type { Meta, StoryObj } from '@storybook/react-vite'
import { AskRedFlag } from './AskScreens'

const meta: Meta<typeof AskRedFlag> = {
  title: 'User/03 Ask SAYO/Red flag detected',
  component: AskRedFlag,
  parameters: {
    docs: {
      description: {
        component:
          'CONCERN_PEP: possible HIV exposure within 72 hours. The red flag interrupts the questions, says plainly that PEP is time-sensitive, shows open services, and still offers review without making her wait for it. DRAFT clinical wording: needs the clinical lead\'s sign-off.',
      },
    },
  },
}
export default meta
type Story = StoryObj<typeof AskRedFlag>

export const PepToday: Story = {}
export const ForUserTesting: Story = { name: 'PEP today (no draft marker)', args: { signOff: false } }
