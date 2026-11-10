import type { Meta, StoryObj } from '@storybook/react-vite'
import { FindCare } from './FindCare'

const meta: Meta<typeof FindCare> = { title: 'User/06 Find Care/Find Care', component: FindCare }
export default meta
type Story = StoryObj<typeof FindCare>

export const Default: Story = {}
export const FilteredHIV: Story = { args: { category: 'hiv' } }
/** "GBV support" filter: a crisis card comes before the list. */
export const FilteredGBVSupport: Story = { args: { category: 'gbv' } }
/** Opened from a professional's review: pre-filtered to the category they chose. */
export const RecommendedFromReview: Story = {
  args: { fromReview: { professional: 'Dr. Efua M.', profession: 'Medical doctor', decision: 'routine', category: 'sexual_health' } },
}
export const NoResults: Story = { args: { query: 'dermatology' } }
/** Location permission denied: choose an area by hand. Distances are hidden. */
export const LocationDenied: Story = { args: { location: 'denied' } }
export const AreaChosenManually: Story = { args: { location: 'manual' } }
