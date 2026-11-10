import type { Meta, StoryObj } from '@storybook/react-vite'
import type { DirectionId } from '../../brand/directions'
import { FlowMap } from '../FlowMap'
import { flowById, type FlowId } from '../flows'

const meta: Meta = { title: 'Prototype/Flow maps', parameters: { frame: 'raw' } }
export default meta
type Story = StoryObj

const map = (id: FlowId): Story['render'] => (_, { globals }) => <FlowMap flow={flowById(id)} direction={(globals.direction ?? 'clay') as DirectionId} />

export const AskSayo: Story = { name: '1 · Ask SAYO, start to finish', render: map('ask') }
export const Circle: Story = { name: '2 · The Circle', render: map('circle') }
export const Safety: Story = { name: '3 · Safety flow', render: map('safety') }
export const Professional: Story = { name: '4 · Professional review', render: map('pro') }
export const Admin: Story = { name: '5 · Admin console', render: map('admin') }
