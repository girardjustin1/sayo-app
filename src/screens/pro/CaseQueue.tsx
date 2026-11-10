import { useMemo, useState } from 'react'
import { AlertTriangle, Inbox } from 'lucide-react'
import { Layout, LayoutContent, LayoutFooter, LayoutHeader } from '@astryxdesign/core/Layout'
import { Drawer, DrawerHeader } from '@astryxdesign/core/Drawer'
import { Tab, TabList } from '@astryxdesign/core/TabList'
import { Table, useTableRowStatus, useTableSortable, useTableSortableState, pixel, proportional, type TableColumn } from '@astryxdesign/core/Table'
import { Heading } from '@astryxdesign/core/Heading'
import { Text } from '@astryxdesign/core/Text'
import { HStack } from '@astryxdesign/core/HStack'
import { VStack } from '@astryxdesign/core/VStack'
import { Badge } from '@astryxdesign/core/Badge'
import { Button } from '@astryxdesign/core/Button'
import { Banner } from '@astryxdesign/core/Banner'
import { Selector } from '@astryxdesign/core/Selector'
import { SegmentedControl, SegmentedControlItem } from '@astryxdesign/core/SegmentedControl'
import { EmptyState } from '@astryxdesign/core/EmptyState'
import type { Topic } from '../../data/types'
import { ProShell } from './ConsoleShell'
import { FOREIGN_ME, ME, QUEUE, TOPIC_LABEL, TRAINING_QUEUE, formatWait, type QueueCase } from './data'
import { TrainingBanner } from './ScopeNotice'
import { CaseContent, WithheldNote } from './CaseParts'

interface Row extends QueueCase {
  redFlagCount: number
}

export interface CaseQueueProps {
  /** Foreign-licensed reviewer: only fictional training cases. */
  foreignLicensed?: boolean
  /** Nothing waiting. */
  empty?: boolean
  /** Start with the red-flag filter on. */
  redFlagsOnly?: boolean
  /** Which view: the shared unassigned queue, or cases you accepted. */
  view?: 'waiting' | 'mine'
  /** Open the preview drawer for this case (for review). */
  previewId?: string
  onOpen?: (id: string) => void
}

/** The async review queue: oldest and red-flag cases first. Rows, not cards. */
export function CaseQueue({ foreignLicensed = false, empty = false, redFlagsOnly = false, view: initialView = 'waiting', previewId, onOpen }: CaseQueueProps) {
  const all = empty ? [] : foreignLicensed ? TRAINING_QUEUE : QUEUE
  const me = foreignLicensed ? FOREIGN_ME : ME
  const waiting = all.filter((c) => c.status === 'queued')
  const mine = all.filter((c) => c.status === 'in_review' && c.acceptedBy === me.name)
  const [view, setView] = useState(initialView)
  const source = view === 'mine' ? mine : waiting
  const [topic, setTopic] = useState<string>('all')
  const [flags, setFlags] = useState(redFlagsOnly ? 'flags' : 'all')
  const [preview, setPreview] = useState<string | undefined>(previewId)
  const previewCase = all.find((c) => c.id === preview)

  const rows: Row[] = useMemo(
    () =>
      source
        .map((c) => ({ ...c, redFlagCount: c.concern.redFlags.length }))
        .filter((c) => (topic === 'all' || c.topic === topic) && (flags === 'all' || c.redFlagCount > 0)),
    [source, topic, flags],
  )
  const redFlagged = waiting.filter((c) => c.concern.redFlags.length > 0 && c.status === 'queued')

  const { sortedData, sortConfig } = useTableSortableState<Row, 'redFlagCount' | 'waitingMinutes' | 'id'>({
    data: rows,
    defaultSort: [
      { sortKey: 'redFlagCount', direction: 'descending' },
      { sortKey: 'waitingMinutes', direction: 'descending' },
    ],
    isMultiSortEnabled: true,
  })
  const sortPlugin = useTableSortable<Row, 'redFlagCount' | 'waitingMinutes' | 'id'>(sortConfig)
  const statusPlugin = useTableRowStatus<Row>({
    getStatus: (r) => (r.redFlagCount > 0 ? { status: 'error', label: 'Red flag' } : null),
  })

  const columns: TableColumn<Row>[] = [
    {
      key: 'id', header: 'Case', width: pixel(96), sortable: true,
      renderCell: (r) => (
        <VStack gap={0}>
          <Text weight="semibold" hasTabularNumbers>{r.id}</Text>
          {r.training && <Text type="supporting" size="xsm">Training case</Text>}
        </VStack>
      ),
    },
    { key: 'topic', header: 'Topic', width: proportional(1, { minWidth: 170 }), renderCell: (r) => <Text maxLines={1}>{TOPIC_LABEL[r.topic]}</Text> },
    { key: 'ageBand', header: 'Age band', width: pixel(90), renderCell: (r) => <Text hasTabularNumbers>{r.ageBand}</Text> },
    {
      key: 'waitingMinutes', header: 'Waiting', width: pixel(116), sortable: true,
      renderCell: (r) =>
        r.training ? <Text type="supporting">Not timed</Text> : (
          <Text hasTabularNumbers weight={r.waitingMinutes >= 24 * 60 ? 'semibold' : 'normal'} color={r.waitingMinutes >= 24 * 60 ? 'primary' : 'secondary'}>
            {formatWait(r.waitingMinutes)}
          </Text>
        ),
    },
    {
      key: 'redFlagCount', header: 'Red flag', width: proportional(2, { minWidth: 180 }), sortable: true,
      renderCell: (r) =>
        r.redFlagCount > 0 ? (
          <HStack gap={1.5} vAlign="center">
            <AlertTriangle size={14} style={{ flex: 'none', color: 'var(--color-error)' }} aria-label="Red flag" />
            <Text size="sm" maxLines={1}>{r.concern.redFlags[0]}</Text>
          </HStack>
        ) : <Text type="supporting">None</Text>,
    },
    {
      key: 'open', header: '', width: pixel(110), align: 'end',
      renderCell: (r) =>
        view === 'mine'
          ? <Button label="Respond" size="sm" variant="primary" onClick={() => onOpen?.(r.id)} />
          : <Button label="Preview" size="sm" variant={r.redFlagCount > 0 ? 'primary' : 'secondary'} onClick={() => setPreview(r.id)} />,
    },
  ]

  const topics = Array.from(new Set(source.map((c) => c.topic)))
  return (
    <ProShell active={view === 'mine' ? 'mine' : 'queue'} person={{ name: me.name, role: `${me.profession} · ${me.jurisdiction}` }} queueCount={waiting.length}>
      <Layout
        header={
          <LayoutHeader hasDivider>
            <VStack gap={3}>
            <HStack hAlign="between" vAlign="center" gap={4}>
              <VStack gap={0.5}>
                <Heading level={1}>{foreignLicensed ? 'Training queue' : view === 'mine' ? 'My open cases' : 'Case queue'}</Heading>
                <Text type="supporting">
                  {foreignLicensed
                    ? 'Fictional cases for testing clinical logic and giving product feedback. No real user is waiting on these.'
                    : 'Asynchronous reviews waiting for a verified professional. Not live chat, not emergencies.'}
                </Text>
              </VStack>
              <HStack gap={2} vAlign="end">
                <Selector
                  label="Topic"
                  isLabelHidden
                  size="sm"
                  width={210}
                  value={topic}
                  onChange={setTopic}
                  options={[{ value: 'all', label: 'All topics' }, ...topics.map((t) => ({ value: t, label: TOPIC_LABEL[t as Topic] }))]}
                />
                <SegmentedControl label="Red flags" size="sm" value={flags} onChange={setFlags}>
                  <SegmentedControlItem value="all" label="All cases" />
                  <SegmentedControlItem value="flags" label={`Red flags (${redFlagged.length})`} />
                </SegmentedControl>
              </HStack>
            </HStack>
            <TabList value={view} onChange={(v) => setView(v as 'waiting' | 'mine')} size="sm">
              <Tab value="waiting" label="Waiting, unassigned" endContent={<Badge label={String(waiting.length)} />} />
              <Tab value="mine" label="Accepted by me" endContent={<Badge label={String(mine.length)} />} />
            </TabList>
            </VStack>
          </LayoutHeader>
        }
        content={
          <LayoutContent>
            <VStack gap={4}>
              {foreignLicensed && <TrainingBanner jurisdiction={FOREIGN_ME.jurisdiction} />}
              {!foreignLicensed && view === 'waiting' && redFlagged.length > 0 && (
                <Banner
                  status="error"
                  title={`${redFlagged.length} cases have a red flag. Review them first.`}
                  description="Red flags are time-sensitive (for example PEP within 72 hours). If a case reads like an emergency, follow the escalation steps in Scope & guidance rather than writing a routine reply."
                  collapsible={false}
                />
              )}
              {sortedData.length === 0 ? (
                <EmptyState
                  icon={<Inbox size={32} />}
                  title={empty ? 'No cases waiting' : view === 'mine' && !mine.length ? 'No accepted cases' : 'No cases match these filters'}
                  description={empty ? 'You will get a discreet notification when a new case arrives. Nothing here needs you right now.' : view === 'mine' && !mine.length ? 'Cases you accept appear here until you complete or release them.' : 'Try another topic, or show all cases.'}
                  actions={!empty && source.length ? <Button label="Clear filters" onClick={() => { setTopic('all'); setFlags('all') }} /> : undefined}
                />
              ) : (
                <VStack gap={2}>
                  <Table<Row>
                    data={sortedData}
                    columns={columns}
                    idKey="id"
                    density="compact"
                    hasHover
                    plugins={{ sort: sortPlugin, status: statusPlugin }}
                  />
                  <Text type="supporting" size="sm">
                    Sorted by red flag, then longest waiting. You see a case ID, topic and age band only; no names, phone numbers or Circle identities.
                  </Text>
                </VStack>
              )}
            </VStack>
          </LayoutContent>
        }
      />
      <Drawer isOpen={!!previewCase} onOpenChange={(o) => !o && setPreview(undefined)} label="Case preview" width={520}>
        {previewCase && (
          <Layout
            header={<DrawerHeader title={`${previewCase.id} · ${TOPIC_LABEL[previewCase.topic]}`} subtitle={`Age band ${previewCase.ageBand} · Waiting ${previewCase.training ? 'not timed' : formatWait(previewCase.waitingMinutes)}`} onOpenChange={() => setPreview(undefined)} />}
            content={
              <LayoutContent>
                <VStack gap={4}>
                  <CaseContent concern={previewCase.concern} compact />
                  <WithheldNote />
                </VStack>
              </LayoutContent>
            }
            footer={
              <LayoutFooter hasDivider>
                <HStack hAlign="between" gap={2}>
                  <Button label="Close" variant="ghost" onClick={() => setPreview(undefined)} />
                  <Button label="Accept case" variant="primary" onClick={() => onOpen?.(previewCase.id)} />
                </HStack>
              </LayoutFooter>
            }
          />
        )}
      </Drawer>
    </ProShell>
  )
}
