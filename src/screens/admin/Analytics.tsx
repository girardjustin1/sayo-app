import { useState } from 'react'
import { Download, Lock } from 'lucide-react'
import { Layout, LayoutContent, LayoutHeader } from '@astryxdesign/core/Layout'
import { Table, pixel, proportional, type TableColumn } from '@astryxdesign/core/Table'
import { Heading } from '@astryxdesign/core/Heading'
import { Text } from '@astryxdesign/core/Text'
import { HStack } from '@astryxdesign/core/HStack'
import { VStack } from '@astryxdesign/core/VStack'
import { Button } from '@astryxdesign/core/Button'
import { Banner } from '@astryxdesign/core/Banner'
import { CheckboxInput } from '@astryxdesign/core/CheckboxInput'
import { Selector } from '@astryxdesign/core/Selector'
import { DateRangeInput, type DateRange } from '@astryxdesign/core/DateRangeInput'
import { AdminShell } from '../pro/ConsoleShell'
import { METRIC_ROWS } from './data'

type Row = (typeof METRIC_ROWS)[number] & Record<string, unknown>

export interface AnalyticsProps {
  /** Show the "export ready" confirmation. */
  exported?: boolean
}

/** De-identified pilot metrics: pick a period and metrics, export a CSV. */
export function Analytics({ exported = false }: AnalyticsProps) {
  const [range, setRange] = useState<DateRange | null>({ start: '2026-10-11', end: '2026-11-09' })
  const [group, setGroup] = useState('week')
  const [picked, setPicked] = useState<string[]>(METRIC_ROWS.map((m) => m.key))
  const [done, setDone] = useState(exported)
  const toggle = (k: string, on: boolean) => setPicked(on ? [...picked, k] : picked.filter((x) => x !== k))

  const columns: TableColumn<Row>[] = [
    { key: 'pick', header: '', width: pixel(48), renderCell: (r) => <CheckboxInput label={`Include ${r.label}`} isLabelHidden size="sm" value={picked.includes(r.key)} onChange={(v) => toggle(r.key, v)} /> },
    { key: 'label', header: 'Metric', width: proportional(1, { minWidth: 220 }), renderCell: (r) => <Text weight="semibold">{r.label}</Text> },
    { key: 'value', header: 'This period', width: pixel(120), align: 'end', renderCell: (r) => <Text hasTabularNumbers>{r.value}</Text> },
    { key: 'definition', header: 'How it is counted', width: proportional(2, { minWidth: 260 }), renderCell: (r) => <Text type="supporting" size="sm">{r.definition}</Text> },
  ]

  return (
    <AdminShell active="analytics">
      <Layout
        header={
          <LayoutHeader hasDivider>
            <HStack hAlign="between" vAlign="end" gap={4}>
              <VStack gap={0.5}>
                <Heading level={1}>Analytics & export</Heading>
                <Text type="supporting">Basic pilot metrics for reports and funders. Counts only.</Text>
              </VStack>
              <HStack gap={2} vAlign="end">
                <DateRangeInput label="Period" size="sm" value={range} onChange={setRange} width={260} />
                <Selector label="Group by" size="sm" width={130} value={group} onChange={setGroup} options={[{ value: 'day', label: 'Day' }, { value: 'week', label: 'Week' }, { value: 'month', label: 'Month' }]} />
                <Button label={`Export CSV (${picked.length})`} variant="primary" icon={<Download size={16} />} isDisabled={!picked.length || !range} onClick={() => setDone(true)} />
              </HStack>
            </HStack>
          </LayoutHeader>
        }
        content={
          <LayoutContent>
            <VStack gap={4}>
              {done && (
                <Banner
                  status="success"
                  title="sayo-pilot-metrics_2026-10-11_2026-11-09.csv is ready"
                  description="Logged with your name. Share it only through the team drive."
                  isDismissable
                  onDismiss={() => setDone(false)}
                  collapsible={false}
                />
              )}
              <Table<Row> data={METRIC_ROWS as unknown as Row[]} columns={columns} idKey="key" density="compact" />
              <HStack gap={1.5} vAlign="start">
                <Lock size={14} style={{ flex: 'none', marginTop: 3 }} />
                <Text type="supporting" size="sm">
                  Exports contain counts, rates and averages only: no message text, names, contact details, case IDs or Circle usernames. Any group
                  smaller than 5 is shown as "&lt;5". Age is reported in bands.
                </Text>
              </HStack>
            </VStack>
          </LayoutContent>
        }
      />
    </AdminShell>
  )
}
