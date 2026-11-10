import type { Meta, StoryObj } from '@storybook/react-vite'
import type { DirectionId } from '../../brand/directions'
import { Prototype } from '../Prototype'

const meta = {
  title: 'Prototype/Click-through',
  component: Prototype,
  parameters: {
    frame: 'raw',
    docs: {
      description: {
        component:
          'Clickable prototypes built from the real screens. Tap what glows. Fields start empty: tap a field to fill it, or use "Fill in for me"; switch on **Prefill fields** in the panel to have everything filled from the start. The panel also has Jump to, a tap counter and Restart. The brand follows the **Direction** toolbar. The same prototype runs full-screen with `pnpm dev` (http://localhost:5340) and on the hosted site under /prototype/.',
      },
    },
  },
  args: { mode: 'storybook' },
  argTypes: {
    mode: { table: { disable: true } },
    direction: { table: { disable: true } },
    initialFlow: { control: 'select', options: ['ask', 'circle', 'safety', 'pro', 'admin'] },
    initialStep: { control: 'text', description: 'A step id from the flow map, e.g. ask-summary' },
  },
  // The brand comes from the Direction toolbar.
  render: (args, { globals }) => <Prototype {...args} direction={(globals.direction ?? 'clay') as DirectionId} />,
} satisfies Meta<typeof Prototype>
export default meta
type Story = StoryObj<typeof meta>

export const Menu: Story = {}
export const AskSayo: Story = { name: '1 · Ask SAYO, start to finish', args: { initialFlow: 'ask' } }
export const Circle: Story = { name: '2 · The Circle', args: { initialFlow: 'circle' } }
export const Safety: Story = { name: '3 · Safety flow', args: { initialFlow: 'safety' } }
export const Professional: Story = { name: '4 · Professional review', args: { initialFlow: 'pro' } }
export const Admin: Story = { name: '5 · Admin console', args: { initialFlow: 'admin' } }
