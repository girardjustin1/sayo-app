import type { Meta, StoryObj } from '@storybook/react-vite'
import { VerifiedProfessionals } from './parts'

const meta: Meta<typeof VerifiedProfessionals> = {
  title: 'User/02 Home/Verified professionals',
  component: VerifiedProfessionals,
  parameters: {
    frame: 'none',
    docs: {
      description: {
        component:
          'Who reviews questions. Hers shows named clinicians with photos and specialties; SAYO shows initials, profession and licensing jurisdiction with the Verified Professional badge, and says how verification works. Fictional sample professionals. No photos, no outcome claims.',
      },
    },
  },
  decorators: [(Story) => <div style={{ maxWidth: 350 }}><Story /></div>],
}
export default meta
type Story = StoryObj<typeof VerifiedProfessionals>

export const Default: Story = {}
