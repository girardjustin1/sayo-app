import type { Meta, StoryObj } from '@storybook/react-vite'
import { Prototype } from '../Prototype'

const meta = {
  title: 'Prototype/Click-through',
  component: Prototype,
  parameters: {
    docs: {
      description: {
        component:
          'Clickable prototypes built from the real screens: everything is prefilled and fictional, so tap what glows. The Direction toolbar applies here too. For the full version with the side panel (Jump to, tap counter, brand switcher), run `pnpm dev` and open http://localhost:5340, or open the hosted prototype.',
      },
    },
  },
  args: { embedded: true },
} satisfies Meta<typeof Prototype>
export default meta
type Story = StoryObj<typeof meta>

export const Menu: Story = {}
export const AskSayo: Story = { name: '1 · Ask SAYO, start to finish', args: { initialFlow: 'ask' } }
export const Circle: Story = { name: '2 · The Circle', args: { initialFlow: 'circle' } }
export const Safety: Story = { name: '3 · Safety flow', args: { initialFlow: 'safety' } }
export const Professional: Story = { name: '4 · Professional review', args: { initialFlow: 'pro' }, parameters: { frame: 'desktop' } }
export const Admin: Story = { name: '5 · Admin console', args: { initialFlow: 'admin' }, parameters: { frame: 'desktop' } }
