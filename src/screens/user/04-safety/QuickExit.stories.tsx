import type { Meta, StoryObj } from '@storybook/react-vite'
import { QuickExitLanding } from './SafetyScreens'

const meta: Meta<typeof QuickExitLanding> = {
  title: 'User/04 Safety/Quick exit landing',
  component: QuickExitLanding,
  parameters: { docs: { description: { component: 'What one tap on Quick exit shows: a neutral weather page with no SAYO name, colour, logo or font. Real app: clears the screen and back stack, opens this page, and asks for the PIN to return.' } } },
}
export default meta
type Story = StoryObj<typeof QuickExitLanding>

export const Default: Story = {}
