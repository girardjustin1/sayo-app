import type { Meta, StoryObj } from '@storybook/react-vite'
import { ServiceDetail } from './ServiceDetail'

const meta: Meta<typeof ServiceDetail> = { title: 'User/06 Find Care/Service Detail', component: ServiceDetail }
export default meta
type Story = StoryObj<typeof ServiceDetail>

export const YouthFriendlyClinic: Story = { args: { serviceId: 's1' } }
export const Hospital24Hours: Story = { args: { serviceId: 's2' } }
/** Phone and referral only: no address, no Directions button. */
export const SupportLine: Story = { args: { serviceId: 's4' } }
