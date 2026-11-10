import type { Meta, StoryObj } from '@storybook/react-vite'
import { ResponseComposer } from './ResponseComposer'

const meta: Meta<typeof ResponseComposer> = { title: 'Professional/Response composer', component: ResponseComposer, parameters: { frame: 'desktop' } }
export default meta
type Story = StoryObj<typeof ResponseComposer>

/** Empty form: "Complete case" stays disabled until the required fields are filled. */
export const Empty: Story = {}
/** Draft with the live preview of what she will see. */
export const Drafted: Story = { args: { drafted: true } }
export const ConfirmComplete: Story = { args: { drafted: true, confirmOpen: true } }
/** Sent: read-only, with the accountability log. */
export const Completed: Story = { args: { completed: true } }
