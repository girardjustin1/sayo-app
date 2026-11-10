import { useState } from 'react'
import { EyeOff, ShieldAlert, Siren } from 'lucide-react'
import { Layout, LayoutContent, LayoutHeader, LayoutPanel } from '@astryxdesign/core/Layout'
import { Table, pixel, proportional, useTableRowStatus, type TableColumn } from '@astryxdesign/core/Table'
import { Heading } from '@astryxdesign/core/Heading'
import { Text } from '@astryxdesign/core/Text'
import { HStack } from '@astryxdesign/core/HStack'
import { VStack } from '@astryxdesign/core/VStack'
import { Badge } from '@astryxdesign/core/Badge'
import { Button } from '@astryxdesign/core/Button'
import { Banner } from '@astryxdesign/core/Banner'
import { Divider } from '@astryxdesign/core/Divider'
import { EmptyState } from '@astryxdesign/core/EmptyState'
import { Tab, TabList } from '@astryxdesign/core/TabList'
import { List, ListItem } from '@astryxdesign/core/List'
import { Dialog, DialogHeader } from '@astryxdesign/core/Dialog'
import { RadioList, RadioListItem } from '@astryxdesign/core/RadioList'
import { TextArea } from '@astryxdesign/core/TextArea'
import { SayoAvatar } from '../../components/sayo'
import { AdminShell } from '../pro/ConsoleShell'
import { TOPIC_LABEL, formatWait } from '../pro/data'
import { GBV_SENSITIVE, MOD_LOG, REASON_LABEL, REPORTS, type ModLogEntry, type Report, type ReportReason } from './data'

const isSensitive = (r: Report) => r.reasons.some((x) => GBV_SENSITIVE.includes(x))

function groupReasons(reasons: ReportReason[]) {
  const counts = new Map<ReportReason, number>()
  reasons.forEach((r) => counts.set(r, (counts.get(r) ?? 0) + 1))
  return [...counts.entries()].sort((a, b) => Number(GBV_SENSITIVE.includes(b[0])) - Number(GBV_SENSITIVE.includes(a[0])) || b[1] - a[1])
}

export interface CircleModerationProps {
  /** Selected report in the side panel. */
  selectedId?: string
  /** Open the suspend-user dialog. */
  suspendOpen?: boolean
  tab?: 'queue' | 'log'
  empty?: boolean
}

/** Report queue: reports grouped per post, every reason visible, GBV-sensitive first. */
export function CircleModeration({ selectedId = 'MR-118', suspendOpen = false, tab: initialTab = 'queue', empty = false }: CircleModerationProps) {
  const [tab, setTab] = useState(initialTab)
  const [selected, setSelected] = useState(selectedId)
  const [isSuspendOpen, setSuspendOpen] = useState(suspendOpen)
  const [duration, setDuration] = useState('7d')
  const [note, setNote] = useState('')
  const reports = empty ? [] : [...REPORTS].sort((a, b) => Number(isSensitive(b)) - Number(isSensitive(a)) || Number(b.reasons.includes('danger')) - Number(a.reasons.includes('danger')))
  const r = reports.find((x) => x.id === selected)
  const status = useTableRowStatus<Report>({ getStatus: (x) => (isSensitive(x) ? { status: 'error', label: 'GBV-sensitive' } : null) })

  const columns: TableColumn<Report>[] = [
    {
      key: 'reasons', header: 'Reason', width: proportional(1.1, { minWidth: 170 }),
      renderCell: (x) => {
        const [top, n] = groupReasons(x.reasons)[0]
        return (
          <VStack gap={0.5}>
            <Text size="sm" weight="semibold" maxLines={1}>{REASON_LABEL[top]}{n > 1 ? ` ×${n}` : ''}</Text>
            <HStack gap={1.5} vAlign="center">
              {isSensitive(x) && <Badge variant="error" label="GBV" />}
              <Text type="supporting" size="xsm" maxLines={1}>{x.reasons.length} {x.reasons.length === 1 ? 'report' : 'reports'} · {formatWait(x.ageMinutes)}</Text>
            </HStack>
          </VStack>
        )
      },
    },
    { key: 'excerpt', header: 'Excerpt', width: proportional(2, { minWidth: 180 }), renderCell: (x) => <Text size="sm" maxLines={2}>{x.hidden ? '(hidden) ' : ''}“{x.excerpt}”</Text> },
    { key: 'open', header: '', width: pixel(104), align: 'end', renderCell: (x) => <Button label="Review" size="sm" variant={x.id === selected ? 'primary' : 'ghost'} onClick={() => setSelected(x.id)} /> },
  ]
  const logColumns: TableColumn<ModLogEntry & Record<string, unknown>>[] = [
    { key: 'at', header: 'When', width: pixel(170) },
    { key: 'who', header: 'Moderator', width: pixel(140) },
    { key: 'action', header: 'Action', width: proportional(1) },
    { key: 'target', header: 'Report', width: proportional(1.2) },
  ]

  return (
    <AdminShell active="moderation" counts={{ reports: reports.length, waiting: 3, pending: 2 }}>
      <Layout
        header={
          <LayoutHeader hasDivider>
            <VStack gap={3}>
              <VStack gap={0.5}>
                <Heading level={1}>Circle moderation</Heading>
                <Text type="supporting">Reporters are never shown. Authors are shown by Circle name only, never linked to their private SAYO history.</Text>
              </VStack>
              <TabList value={tab} onChange={(v) => setTab(v as 'queue' | 'log')} size="sm">
                <Tab value="queue" label="Needs review" endContent={<Badge label={String(reports.length)} />} />
                <Tab value="log" label="Moderation log" />
              </TabList>
            </VStack>
          </LayoutHeader>
        }
        end={
          tab === 'queue' && r ? (
            <LayoutPanel hasDivider width={350} label="Report detail">
              <ReportDetail r={r} onSuspend={() => setSuspendOpen(true)} />
            </LayoutPanel>
          ) : undefined
        }
        content={
          <LayoutContent>
            {tab === 'log' ? (
              <Table data={MOD_LOG as (ModLogEntry & Record<string, unknown>)[]} columns={logColumns} density="compact" />
            ) : reports.length === 0 ? (
              <EmptyState title="No open reports" description="Thank you. New reports appear here, GBV-sensitive ones first." />
            ) : (
              <Table<Report> data={reports} columns={columns} idKey="id" density="compact" hasHover verticalAlign="top" plugins={{ status }} />
            )}
          </LayoutContent>
        }
      />
      <Dialog isOpen={isSuspendOpen} onOpenChange={setSuspendOpen} width={460} purpose="form">
        <Layout
          header={<DialogHeader title={`Suspend ${r?.postAuthor ?? 'user'}?`} subtitle="They can still read the Circle and use Ask SAYO privately, but cannot post, reply or react." onOpenChange={setSuspendOpen} />}
          content={
            <LayoutContent>
              <VStack gap={4}>
                <RadioList label="How long" value={duration} onChange={setDuration} size="sm" orientation="horizontal">
                  <RadioListItem value="7d" label="7 days" />
                  <RadioListItem value="30d" label="30 days" />
                  <RadioListItem value="perm" label="Until reviewed" />
                </RadioList>
                <TextArea label="Reason shown to them" value={note} onChange={setNote} rows={2} placeholder="For example: blaming a survivor breaks the Circle guidelines." />
              </VStack>
            </LayoutContent>
          }
          footer={
            <HStack hAlign="end" gap={2} padding={4}>
              <Button label="Cancel" variant="secondary" onClick={() => setSuspendOpen(false)} />
              <Button label="Suspend user" variant="destructive" onClick={() => setSuspendOpen(false)} />
            </HStack>
          }
        />
      </Dialog>
    </AdminShell>
  )
}

function ReportDetail({ r, onSuspend }: { r: Report; onSuspend: () => void }) {
  const danger = r.reasons.includes('danger')
  return (
        <VStack gap={4}>
          <HStack hAlign="between" vAlign="center">
            <Text weight="semibold">{r.id} · {r.kind === 'post' ? 'Post' : 'Reply'}</Text>
            <Text type="supporting" size="sm">{r.firstReported}</Text>
          </HStack>
          {danger ? (
            <Banner status="error" icon={<Siren size={18} />} title="Someone may be in danger" description="Hidden automatically and sent to the safety lead. Reply with safety information first; do not just remove it." collapsible={false} />
          ) : isSensitive(r) ? (
            <Banner status="warning" icon={<ShieldAlert size={18} />} title="GBV-sensitive" description="Protect the survivor: remove anything that blames, identifies or names. Don't contact anyone named." collapsible={false} />
          ) : null}
          <HStack gap={2} vAlign="center">
            <SayoAvatar seed={r.postAuthor} size={28} />
            <VStack gap={0}>
              <Text size="sm" weight="semibold">{r.postAuthor}</Text>
              <Text type="supporting" size="xsm">{TOPIC_LABEL[r.topic]} · {r.priorStrikes ? `${r.priorStrikes} earlier ${r.priorStrikes === 1 ? 'action' : 'actions'}` : 'No earlier actions'}</Text>
            </VStack>
          </HStack>
          {r.hidden && <HStack gap={1.5} vAlign="center"><EyeOff size={14} /><Text type="supporting" size="sm">Hidden from the Circle while you review</Text></HStack>}
          <Text as="p" className="sayo-verbatim">“{r.excerpt}”</Text>
          <VStack gap={1}>
            <Text weight="semibold">Reports ({r.reasons.length})</Text>
            <List density="compact" edge="flush">
              {groupReasons(r.reasons).map(([reason, n]) => (
                <ListItem key={reason} label={<Text size="sm">{REASON_LABEL[reason]}</Text>} endContent={<HStack gap={1}>{GBV_SENSITIVE.includes(reason) && <Badge variant="error" label="GBV" />}<Badge label={`×${n}`} /></HStack>} />
              ))}
            </List>
          </VStack>
          <Divider />
          <VStack gap={2}>
            {danger && <Button label="Send safety information" variant="primary" width="100%" />}
            <Button label="Remove content" variant={danger ? 'secondary' : 'primary'} width="100%" />
            <HStack gap={2}>
              <Button label="Keep" variant="secondary" width="50%" tooltip="No rule broken. Reporters are thanked; nothing else changes." />
              <Button label="Suspend user" variant="destructive" width="50%" onClick={onSuspend} />
            </HStack>
          </VStack>
        </VStack>
  )
}
