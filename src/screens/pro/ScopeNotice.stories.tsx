import type { Meta, StoryObj } from '@storybook/react-vite'
import { ScopeNotice } from './ScopeNotice'

const meta: Meta<typeof ScopeNotice> = { title: 'Professional/Scope notice', component: ScopeNotice, parameters: { frame: 'desktop' } }
export default meta
type Story = StoryObj<typeof ScopeNotice>

/** First sign-in: acknowledge the scope before the queue opens. */
export const FirstSignIn: Story = { args: { acknowledge: true } }
export const GhanaLicensed: Story = {}
/** Licensed outside Ghana: training-mode banner, fictional and de-identified cases only. */
export const ForeignLicensed: Story = { args: { foreignLicensed: true, acknowledge: true } }
