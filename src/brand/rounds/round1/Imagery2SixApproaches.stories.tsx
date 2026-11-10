import type { Meta, StoryObj } from '@storybook/react-vite'
import { ApproachOverview, ApproachPage } from '../../approaches/ApproachPage'
import { CANDID } from '../../approaches/candid'
import { FACELESS } from '../../approaches/faceless'
import { EDITORIAL } from '../../approaches/editorial'
import { ILLUSTRATED } from '../../approaches/illustrated'
import { OBJECTS } from '../../approaches/objects'
import { ABSTRACT } from '../../approaches/abstract'

const meta: Meta = { title: 'Brand/Round 1 (pink)/Imagery 2 (six approaches)', parameters: { frame: 'raw' } }
export default meta
type Story = StoryObj

export const Overview: Story = { render: () => <ApproachOverview /> }
export const Candid: Story = { name: '1 · Candid', render: () => <ApproachPage a={CANDID} /> }
export const Faceless: Story = { name: '2 · Faceless', render: () => <ApproachPage a={FACELESS} /> }
export const Editorial: Story = { name: '3 · Editorial', render: () => <ApproachPage a={EDITORIAL} /> }
export const Illustrated: Story = { name: '4 · Illustrated', render: () => <ApproachPage a={ILLUSTRATED} /> }
export const Objects: Story = { name: '5 · Objects', render: () => <ApproachPage a={OBJECTS} /> }
export const Abstract: Story = { name: '6 · Abstract', render: () => <ApproachPage a={ABSTRACT} /> }
