import type { Meta, StoryObj } from '@storybook/react-vite'
import { SafetyEntry } from './SafetyScreens'

const meta: Meta<typeof SafetyEntry> = {
  title: 'User/04 Safety/Entry',
  component: SafetyEntry,
  parameters: { docs: { description: { component: 'A disclosure inside Ask SAYO switches to the safety flow: believing, no judgement, she stays in control. Fixed wording, labelled "SAYO safety check" (not AI). Calm in every direction; Quick exit always visible.' } } },
}
export default meta
type Story = StoryObj<typeof SafetyEntry>

export const Default: Story = {}
