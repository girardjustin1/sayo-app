import { AlertTriangle, Bell } from 'lucide-react'
import { Layout, LayoutContent, LayoutHeader } from '@astryxdesign/core/Layout'
import { Table, pixel, proportional, useTableRowStatus, type TableColumn } from '@astryxdesign/core/Table'
import { Heading } from '@astryxdesign/core/Heading'
import { Text } from '@astryxdesign/core/Text'
import { HStack } from '@astryxdesign/core/HStack'
import { VStack } from '@astryxdesign/core/VStack'
import { Grid } from '@astryxdesign/core/Grid'
import { Card } from '@astryxdesign/core/Card'
import { Badge } from '@astryxdesign/core/Badge'
import { Button } from '@astryxdesign/core/Button'
import { StatusDot } from '@astryxdesign/core/StatusDot'
import { EmptyState } from '@astryxdesign/core/EmptyState'
import { AdminShell } from '../pro/ConsoleShell'
import { TOPIC_LABEL, formatWait } from '../pro/data'
import { THRESHOLDS, WAITING, type WaitingCase } from './data'

type Level = 'overdue' | 'flag' | 'warn' | 'ok'
function level(w: WaitingCase): Level {
  if (w.waitingMinutes >= THRESHOLDS.overdueMinutes) return 'overdue'
  if (w.redFlag && w.waitingMinutes >= THRESHOLDS.redFlagMinutes) return 'flag'
  if (w.waitingMinutes >= THRESHOLDS.warnMinutes) return 'warn'
  return 'ok'
}
const LEVEL: Record<Level, { label: string; variant: 'error' | 'warning' | 'success' }> = {
  overdue: { label: 'Over 24 h', variant: 'error' },
  flag: { label: 'Red flag over 2 h', variant: 'error' },
  warn: { label: 'Over 12 h', variant: 'warning' },
  ok: { label: 'Within target', variant: 'success' },
}

export interface WaitingCasesProps {
  allClear?: boolean
}

/** Every case in the professional queue by time waited. Metadata only: no case content. */
export function WaitingCases({ allClear = false }: WaitingCasesProps) {
  const data = allClear ? WAITING.filter((w) => level(w) === 'ok') : WAITING
  const unassigned = data.filter((w) => !w.assignee)
  const oldest = unassigned.length ? Math.max(...unassigned.map((w) => w.waitingMinutes)) : 0
  const overdue = data.filter((w) => level(w) === 'overdue' && !w.assignee)
  const status = useTableRowStatus<WaitingCase>({ getStatus: (w) => (level(w) === 'overdue' || level(w) === 'flag' ? { status: 'error', label: LEVEL[level(w)].label } : level(w) === 'warn' ? { status: 'warning', label: 'Over 12 h' } : null) })

  const columns: TableColumn<WaitingCase>[] = [
    { key: 'id', header: 'Case', width: pixel(96), renderCell: (w) => <Text weight="semibold" hasTabularNumbers>{w.id}</Text> },
    { key: 'topic', header: 'Topic', width: proportional(1, { minWidth: 160 }), renderCell: (w) => <Text maxLines={1}>{TOPIC_LABEL[w.topic]}</Text> },
    { key: 'waitingMinutes', header: 'Waiting', width: pixel(110), renderCell: (w) => <Text hasTabularNumbers weight={level(w) === 'ok' ? 'normal' : 'semibold'}>{formatWait(w.waitingMinutes)}</Text> },
    { key: 'level', header: 'Threshold', width: pixel(160), renderCell: (w) => <HStack gap={1.5} vAlign="center"><StatusDot variant={LEVEL[level(w)].variant} label={LEVEL[level(w)].label} /><Text size="sm">{LEVEL[level(w)].label}</Text></HStack> },
    { key: 'redFlag', header: 'Red flag', width: pixel(96), renderCell: (w) => (w.redFlag ? <HStack gap={1} vAlign="center"><AlertTriangle size={14} style={{ color: 'var(--color-error)' }} /><Text size="sm">Yes</Text></HStack> : <Text type="supporting" size="sm">No</Text>) },
    { key: 'assignee', header: 'With', width: proportional(1, { minWidth: 140 }), renderCell: (w) => <Text size="sm" color={w.assignee ? 'primary' : 'secondary'}>{w.assignee ?? 'Unassigned'}{w.releasedCount ? ` · released ${w.releasedCount}×` : ''}</Text> },
    { key: 'act', header: '', width: pixel(120), align: 'end', renderCell: (w) => (!w.assignee && level(w) !== 'ok' ? <Button label="Nudge" size="sm" icon={<Bell size={14} />} tooltip="Send a discreet alert to reviewers in this topic" /> : null) },
  ]

  return (
    <AdminShell active="waiting" counts={{ reports: 5, waiting: overdue.length, pending: 2 }}>
      <Layout
        header={
          <LayoutHeader hasDivider>
            <VStack gap={0.5}>
              <Heading level={1}>Waiting cases</Heading>
              <Text type="supporting">Case ID, topic and time only. Admins never see the user's message.</Text>
            </VStack>
          </LayoutHeader>
        }
        content={
          <LayoutContent>
            <VStack gap={4}>
              <Grid columns={4} gap={3}>
                <Card padding={4}><VStack gap={1}><Text type="supporting" size="sm">In the queue</Text><Text className="sayo-stat">{data.length}</Text></VStack></Card>
                <Card padding={4}><VStack gap={1}><Text type="supporting" size="sm">Unassigned</Text><Text className="sayo-stat">{unassigned.length}</Text></VStack></Card>
                <Card padding={4}><VStack gap={1}><Text type="supporting" size="sm">Oldest unassigned</Text><Text className="sayo-stat">{unassigned.length ? formatWait(oldest) : '—'}</Text></VStack></Card>
                <Card padding={4}><VStack gap={1}><HStack gap={1} vAlign="center"><Text type="supporting" size="sm">Over 24 hours</Text>{overdue.length > 0 && <Badge variant="error" label="Act" />}</HStack><Text className="sayo-stat">{overdue.length}</Text></VStack></Card>
              </Grid>
              <HStack gap={4} wrap="wrap">
                <Text type="supporting" size="sm">Draft thresholds:</Text>
                <HStack gap={1.5} vAlign="center"><StatusDot variant="error" label="Red" /><Text size="sm">Red flag waiting over 2 h, or any case over 24 h</Text></HStack>
                <HStack gap={1.5} vAlign="center"><StatusDot variant="warning" label="Amber" /><Text size="sm">Over 12 h</Text></HStack>
                <HStack gap={1.5} vAlign="center"><StatusDot variant="success" label="Green" /><Text size="sm">Within target</Text></HStack>
              </HStack>
              {data.length === 0 ? (
                <EmptyState title="The queue is empty" description="No cases are waiting for a professional." />
              ) : (
                <Table<WaitingCase> data={data} columns={columns} idKey="id" density="compact" hasHover plugins={{ status }} />
              )}
            </VStack>
          </LayoutContent>
        }
      />
    </AdminShell>
  )
}
