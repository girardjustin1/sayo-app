import { useState } from 'react'
import { History as HistoryIcon } from 'lucide-react'
import { Layout, LayoutContent, LayoutHeader } from '@astryxdesign/core/Layout'
import { Table, pixel, proportional, type TableColumn } from '@astryxdesign/core/Table'
import { Heading } from '@astryxdesign/core/Heading'
import { Text } from '@astryxdesign/core/Text'
import { HStack } from '@astryxdesign/core/HStack'
import { VStack } from '@astryxdesign/core/VStack'
import { Button } from '@astryxdesign/core/Button'
import { Divider } from '@astryxdesign/core/Divider'
import { EmptyState } from '@astryxdesign/core/EmptyState'
import { Drawer, DrawerHeader } from '@astryxdesign/core/Drawer'
import { MetadataList, MetadataListItem } from '@astryxdesign/core/MetadataList'
import { CareDecisionTag, ProBlock, SERVICE_CATEGORY_LABEL } from '../../components/sayo'
import { ProShell } from './ConsoleShell'
import { AuditNote } from './CaseParts'
import { ANSWERED_CASE, HISTORY, ME, TOPIC_LABEL, formatWait, type CompletedCase } from './data'

export interface HistoryProps {
  empty?: boolean
  /** Open one completed case in the side drawer. */
  openId?: string
}

/** Completed reviews, with the record of who accepted and completed each one. */
export function History({ empty = false, openId }: HistoryProps) {
  const data = empty ? [] : HISTORY
  const [open, setOpen] = useState<string | undefined>(openId)
  const row = HISTORY.find((h) => h.id === open)
  const avg = Math.round(HISTORY.reduce((n, h) => n + h.responseMinutes, 0) / HISTORY.length)

  const columns: TableColumn<CompletedCase>[] = [
    { key: 'id', header: 'Case', width: pixel(96), renderCell: (r) => <Text weight="semibold" hasTabularNumbers>{r.id}</Text> },
    { key: 'topic', header: 'Topic', width: proportional(1, { minWidth: 150 }), renderCell: (r) => <Text maxLines={1}>{TOPIC_LABEL[r.topic]}</Text> },
    { key: 'decision', header: 'In-person care', width: proportional(1.2, { minWidth: 210 }), renderCell: (r) => <CareDecisionTag decision={r.decision} /> },
    { key: 'category', header: 'Service', width: proportional(1, { minWidth: 160 }), renderCell: (r) => <Text type="supporting" maxLines={1}>{r.category ? SERVICE_CATEGORY_LABEL[r.category] : 'None'}</Text> },
    { key: 'completedAt', header: 'Completed', width: pixel(130), renderCell: (r) => <Text size="sm">{r.completedAt}</Text> },
    { key: 'responseMinutes', header: 'Sent → done', width: pixel(110), renderCell: (r) => <Text size="sm" hasTabularNumbers>{formatWait(r.responseMinutes)}</Text> },
    { key: 'view', header: '', width: pixel(80), align: 'end', renderCell: (r) => <Button label="View" size="sm" variant="ghost" onClick={() => setOpen(r.id)} /> },
  ]

  return (
    <ProShell active="history" person={{ name: ME.name, role: `${ME.profession} · ${ME.jurisdiction}` }}>
      <Layout
        header={
          <LayoutHeader hasDivider>
            <HStack hAlign="between" vAlign="end">
              <VStack gap={0.5}>
                <Heading level={1}>Completed reviews</Heading>
                <Text type="supporting">Read-only. Completed reviews cannot be edited; contact the SAYO team if something needs correcting.</Text>
              </VStack>
              {!empty && (
                <HStack gap={6}>
                  <VStack gap={0}><Text type="supporting" size="sm">Completed</Text><Text className="sayo-stat">{HISTORY.length}</Text></VStack>
                  <VStack gap={0}><Text type="supporting" size="sm">Average sent → done</Text><Text className="sayo-stat">{formatWait(avg)}</Text></VStack>
                </HStack>
              )}
            </HStack>
          </LayoutHeader>
        }
        content={
          <LayoutContent>
            {data.length === 0 ? (
              <EmptyState icon={<HistoryIcon size={32} />} title="No completed reviews yet" description="Cases you complete appear here with their audit trail." />
            ) : (
              <Table<CompletedCase> data={data} columns={columns} idKey="id" density="compact" hasHover />
            )}
          </LayoutContent>
        }
      />
      <Drawer isOpen={!!row} onOpenChange={(o) => !o && setOpen(undefined)} label="Completed case" width={480}>
        {row && (
          <Layout
            header={<DrawerHeader title={`${row.id} · ${TOPIC_LABEL[row.topic]}`} subtitle={`Age band ${row.ageBand} · Completed ${row.completedAt}`} onOpenChange={() => setOpen(undefined)} />}
            content={
              <LayoutContent>
                <VStack gap={4}>
                  <MetadataList label={{ position: 'start', width: 130 }}>
                    <MetadataListItem label="In-person care"><HStack><CareDecisionTag decision={row.decision} /></HStack></MetadataListItem>
                    <MetadataListItem label="Service"><Text>{row.category ? SERVICE_CATEGORY_LABEL[row.category] : 'None'}</Text></MetadataListItem>
                  </MetadataList>
                  {row.id === ANSWERED_CASE.id && <ProBlock title="My thoughts (as sent)">{ANSWERED_CASE.response!.thoughts}</ProBlock>}
                  <Divider />
                  <AuditNote
                    events={[
                      { kind: 'sent', at: row.sentAt },
                      { kind: 'accepted', who: `${ME.name} (you)`, at: row.acceptedAt },
                      { kind: 'completed', who: `${ME.name} (you)`, at: row.completedAt },
                    ]}
                  />
                </VStack>
              </LayoutContent>
            }
          />
        )}
      </Drawer>
    </ProShell>
  )
}
