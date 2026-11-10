import { useState } from 'react'
import { BadgeCheck, Plus } from 'lucide-react'
import { Layout, LayoutContent, LayoutFooter, LayoutHeader } from '@astryxdesign/core/Layout'
import { Table, pixel, proportional, type TableColumn } from '@astryxdesign/core/Table'
import { Heading } from '@astryxdesign/core/Heading'
import { Text } from '@astryxdesign/core/Text'
import { HStack } from '@astryxdesign/core/HStack'
import { VStack } from '@astryxdesign/core/VStack'
import { Badge } from '@astryxdesign/core/Badge'
import { Button } from '@astryxdesign/core/Button'
import { Divider } from '@astryxdesign/core/Divider'
import { Switch } from '@astryxdesign/core/Switch'
import { TextInput } from '@astryxdesign/core/TextInput'
import { TextArea } from '@astryxdesign/core/TextArea'
import { CheckboxInput } from '@astryxdesign/core/CheckboxInput'
import { FormLayout } from '@astryxdesign/core/FormLayout'
import { Drawer, DrawerHeader } from '@astryxdesign/core/Drawer'
import { SERVICE_CATEGORY_LABEL } from '../../components/sayo'
import { SERVICES } from '../../data/fixtures'
import type { Service, ServiceCategory } from '../../data/types'
import { AdminShell } from '../pro/ConsoleShell'

type Row = Service & Record<string, unknown>
const SHORT: Record<ServiceCategory, string> = {
  sexual_health: 'Sexual health', hiv: 'HIV/PrEP/PEP', general: 'General', mental_health: 'Mental health', substance: 'Substance use', gbv: 'GBV support', other: 'Other',
}

export interface CareServicesProps {
  /** 'new' opens an empty form; an id opens that service for editing. */
  editId?: string
}

/** Verified care services shown in Find Care. Listing only: no booking, no partnership required. */
export function CareServices({ editId }: CareServicesProps) {
  const [edit, setEdit] = useState<string | undefined>(editId)
  const service = edit === 'new' ? undefined : SERVICES.find((s) => s.id === edit)

  const columns: TableColumn<Row>[] = [
    {
      key: 'name', header: 'Service', width: proportional(1.6, { minWidth: 220 }),
      renderCell: (r) => (
        <VStack gap={0}>
          <Text weight="semibold" maxLines={1}>{r.name}</Text>
          <Text type="supporting" size="sm" maxLines={1}>{r.type}</Text>
        </VStack>
      ),
    },
    { key: 'categories', header: 'Categories', width: proportional(1.4, { minWidth: 200 }), renderCell: (r) => <Text size="sm">{r.categories.map((c) => SHORT[c]).join(' · ')}</Text> },
    { key: 'area', header: 'Area', width: proportional(1, { minWidth: 130 }), renderCell: (r) => <Text size="sm" maxLines={1}>{r.area}</Text> },
    {
      key: 'verified', header: 'Verified', width: pixel(110),
      renderCell: (r) => (r.verified ? <Badge variant="green" label="Verified" icon={<BadgeCheck size={12} />} /> : <Badge variant="warning" label="Not yet" />),
    },
    { key: 'youthFriendly', header: 'Youth-friendly', width: pixel(140), renderCell: (r) => <Text size="sm" color={r.youthFriendly ? 'primary' : 'secondary'}>{r.youthFriendly ? 'Yes' : '—'}</Text> },
    { key: 'edit', header: '', width: pixel(96), align: 'end', renderCell: (r) => <Button label="Edit" size="sm" variant="ghost" onClick={() => setEdit(r.id)} /> },
  ]

  return (
    <AdminShell active="services">
      <Layout
        header={
          <LayoutHeader hasDivider>
            <HStack hAlign="between" vAlign="center">
              <VStack gap={0.5}>
                <Heading level={1}>Care services</Heading>
                <Text type="supporting">Shown to users in Find Care. Only verified services are shown. No booking: users call or visit.</Text>
              </VStack>
              <Button label="Add service" variant="primary" icon={<Plus size={16} />} onClick={() => setEdit('new')} />
            </HStack>
          </LayoutHeader>
        }
        content={
          <LayoutContent>
            <Table<Row> data={SERVICES as Row[]} columns={columns} idKey="id" density="compact" hasHover />
          </LayoutContent>
        }
      />
      <Drawer isOpen={!!edit} onOpenChange={(o) => !o && setEdit(undefined)} label="Service form" width={520} purpose="form">
        {edit && <ServiceForm key={edit} service={service} onClose={() => setEdit(undefined)} />}
      </Drawer>
    </AdminShell>
  )
}

function ServiceForm({ service, onClose }: { service?: Service; onClose: () => void }) {
  const [name, setName] = useState(service?.name ?? '')
  const [type, setType] = useState(service?.type ?? '')
  const [area, setArea] = useState(service?.area ?? '')
  const [hours, setHours] = useState(service?.hours ?? '')
  const [phone, setPhone] = useState(service?.phone ?? '')
  const [cats, setCats] = useState<ServiceCategory[]>(service?.categories ?? [])
  const [verified, setVerified] = useState(service?.verified ?? false)
  const [youth, setYouth] = useState(service?.youthFriendly ?? false)
  const [notes, setNotes] = useState(service ? 'Called reception 4 Nov (sample). Confirmed hours and that walk-ins are accepted.' : '')
  const toggle = (c: ServiceCategory, on: boolean) => setCats(on ? [...cats, c] : cats.filter((x) => x !== c))

  return (
    <Layout
      header={<DrawerHeader title={service ? 'Edit service' : 'Add a service'} subtitle={service?.name} onOpenChange={onClose} />}
      content={
        <LayoutContent>
          <VStack gap={4}>
            <FormLayout>
              <TextInput label="Name" isRequired value={name} onChange={setName} />
              <TextInput label="Type of care" isRequired placeholder="For example: Youth-friendly clinic" value={type} onChange={setType} />
              <TextInput label="Area" isRequired value={area} onChange={setArea} />
              <TextInput label="Opening hours" value={hours} onChange={setHours} />
              <TextInput label="Phone" type="tel" value={phone} onChange={setPhone} description="Public number only. Never a staff member's personal phone." />
            </FormLayout>
            <VStack gap={1.5}>
              <Text weight="semibold">Categories</Text>
              <Text type="supporting" size="sm">Matched to the service category a professional chooses in a review.</Text>
              {(Object.keys(SERVICE_CATEGORY_LABEL) as ServiceCategory[]).map((c) => (
                <CheckboxInput key={c} size="sm" label={SERVICE_CATEGORY_LABEL[c]} value={cats.includes(c)} onChange={(v) => toggle(c, v)} />
              ))}
            </VStack>
            <Divider />
            <Switch label="Youth-friendly" description="Staff trained to see young people without judgement or a parent." labelPosition="start" labelSpacing="spread" width="100%" value={youth} onChange={setYouth} />
            <Switch label="Verified" description="Someone from SAYO confirmed it exists, the hours, and the services offered. Unverified services are not shown to users." labelPosition="start" labelSpacing="spread" width="100%" value={verified} onChange={setVerified} />
            <TextArea label="Verification notes" isOptional value={notes} onChange={setNotes} rows={2} description="Admins only." />
          </VStack>
        </LayoutContent>
      }
      footer={
        <LayoutFooter hasDivider>
          <HStack hAlign="between">
            {service ? <Button label="Remove from Find Care" variant="ghost" /> : <Text> </Text>}
            <HStack gap={2}>
              <Button label="Cancel" variant="secondary" onClick={onClose} />
              <Button label={service ? 'Save changes' : 'Add service'} variant="primary" isDisabled={!name || !type || !area || cats.length === 0} />
            </HStack>
          </HStack>
        </LayoutFooter>
      }
    />
  )
}
