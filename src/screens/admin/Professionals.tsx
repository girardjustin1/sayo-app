import { useState } from 'react'
import { Globe2, ShieldAlert } from 'lucide-react'
import { Layout, LayoutContent, LayoutFooter, LayoutHeader } from '@astryxdesign/core/Layout'
import { Table, pixel, proportional, type TableColumn } from '@astryxdesign/core/Table'
import { Heading } from '@astryxdesign/core/Heading'
import { Text } from '@astryxdesign/core/Text'
import { HStack } from '@astryxdesign/core/HStack'
import { VStack } from '@astryxdesign/core/VStack'
import { Badge } from '@astryxdesign/core/Badge'
import { Button } from '@astryxdesign/core/Button'
import { Banner } from '@astryxdesign/core/Banner'
import { Divider } from '@astryxdesign/core/Divider'
import { Switch } from '@astryxdesign/core/Switch'
import { CheckboxInput } from '@astryxdesign/core/CheckboxInput'
import { AlertDialog } from '@astryxdesign/core/AlertDialog'
import { Tab, TabList } from '@astryxdesign/core/TabList'
import { Drawer, DrawerHeader } from '@astryxdesign/core/Drawer'
import { MetadataList, MetadataListItem } from '@astryxdesign/core/MetadataList'
import { PROFESSIONALS } from '../../data/fixtures'
import type { Professional } from '../../data/types'
import { AdminShell } from '../pro/ConsoleShell'

type Row = Professional & Record<string, unknown>

const STATUS: Record<Professional['status'], { label: string; variant: 'warning' | 'success' | 'error' | 'neutral' }> = {
  pending: { label: 'Pending', variant: 'warning' },
  approved: { label: 'Approved', variant: 'success' },
  suspended: { label: 'Suspended', variant: 'error' },
  rejected: { label: 'Rejected', variant: 'neutral' },
}

/** Which body issues the licence. Sample mapping, to be confirmed by legal advice. */
function regulator(p: Professional) {
  if (p.jurisdiction === 'Ghana') {
    if (p.profession.includes('nurse')) return 'Nursing and Midwifery Council of Ghana'
    if (p.profession.includes('psycholog')) return 'Ghana Psychology Council'
    return 'Medical and Dental Council, Ghana'
  }
  if (p.jurisdiction === 'United Kingdom') return 'General Medical Council (UK)'
  if (p.jurisdiction === 'Nigeria') return 'Medical and Dental Council of Nigeria'
  return 'Licensing body in ' + p.jurisdiction
}

const CHECKS = [
  'Licence number found on the official register',
  'Name on the register matches the applicant',
  'Licence is current, with no restrictions listed',
  'Topics fit the profession',
  'Reviewer agreement and confidentiality terms signed',
]

export interface ProfessionalsProps {
  /** Open a professional's record in the drawer. */
  openId?: string
  /** Open the suspend confirmation for the open record. */
  suspendOpen?: boolean
}

/** Verify credentials and manage access. One professional at a time; no bulk approve. */
export function Professionals({ openId, suspendOpen = false }: ProfessionalsProps) {
  const [tab, setTab] = useState('all')
  const [open, setOpen] = useState<string | undefined>(openId)
  const [isSuspendOpen, setSuspendOpen] = useState(suspendOpen)
  const p = PROFESSIONALS.find((x) => x.id === open)

  const data = PROFESSIONALS.filter((x) => tab === 'all' || x.status === tab) as Row[]
  const count = (s: Professional['status']) => PROFESSIONALS.filter((x) => x.status === s).length

  const columns: TableColumn<Row>[] = [
    { key: 'name', header: 'Name', width: proportional(1, { minWidth: 140 }), renderCell: (r) => <Text weight="semibold">{r.name}</Text> },
    { key: 'profession', header: 'Profession', width: proportional(1, { minWidth: 150 }), renderCell: (r) => <Text maxLines={1}>{r.profession}</Text> },
    {
      key: 'jurisdiction', header: 'Licensing jurisdiction', width: pixel(170),
      renderCell: (r) => <HStack gap={1} vAlign="center">{r.jurisdiction !== 'Ghana' && <Globe2 size={14} />}<Text>{r.jurisdiction}</Text></HStack>,
    },
    { key: 'licence', header: 'Licence', width: pixel(140), renderCell: (r) => <Text size="sm" hasTabularNumbers color={r.licence.startsWith('Pending') ? 'secondary' : 'primary'}>{r.licence}</Text> },
    { key: 'status', header: 'Status', width: pixel(100), renderCell: (r) => <Badge variant={STATUS[r.status].variant} label={STATUS[r.status].label} /> },
    {
      key: 'canReviewRealCases', header: 'Case access', width: pixel(130),
      renderCell: (r) => <Text size="sm" color={r.canReviewRealCases ? 'primary' : 'secondary'}>{r.canReviewRealCases ? 'Real Ghana cases' : r.status === 'approved' ? 'Training only' : 'None yet'}</Text>,
    },
    { key: 'view', header: '', width: pixel(80), align: 'end', renderCell: (r) => <Button label={r.status === 'pending' ? 'Verify' : 'View'} size="sm" variant={r.status === 'pending' ? 'primary' : 'ghost'} onClick={() => setOpen(r.id)} /> },
  ]

  return (
    <AdminShell active="professionals">
      <Layout
        header={
          <LayoutHeader hasDivider>
            <VStack gap={3}>
              <VStack gap={0.5}>
                <Heading level={1}>Professionals</Heading>
                <Text type="supporting">Verify credentials and manage access. Each approval is logged with your name.</Text>
              </VStack>
              <TabList value={tab} onChange={setTab} size="sm">
                <Tab value="all" label="All" endContent={<Badge label={String(PROFESSIONALS.length)} />} />
                <Tab value="pending" label="Pending" endContent={<Badge variant="warning" label={String(count('pending'))} />} />
                <Tab value="approved" label="Approved" endContent={<Badge label={String(count('approved'))} />} />
                <Tab value="suspended" label="Suspended" endContent={<Badge label={String(count('suspended'))} />} />
              </TabList>
            </VStack>
          </LayoutHeader>
        }
        content={
          <LayoutContent>
            <Table<Row> data={data} columns={columns} idKey="id" density="compact" hasHover />
          </LayoutContent>
        }
      />

      <Drawer isOpen={!!p} onOpenChange={(o) => !o && setOpen(undefined)} label="Professional record" width={500} purpose="form">
        {p && <ProRecord key={p.id} p={p} onClose={() => setOpen(undefined)} onSuspend={() => setSuspendOpen(true)} />}
      </Drawer>

      <AlertDialog
        isOpen={isSuspendOpen}
        onOpenChange={setSuspendOpen}
        title={`Suspend ${p?.name ?? 'this professional'}?`}
        description="They are signed out straight away and cannot open any case. Cases they accepted go back to the queue. Their completed reviews stay visible to users. This is logged with your name."
        actionLabel="Suspend access"
        onAction={() => setSuspendOpen(false)}
      />
    </AdminShell>
  )
}

/** One professional's record. Decision at the top of the footer, evidence above it. */
function ProRecord({ p, onClose, onSuspend }: { p: Professional; onClose: () => void; onSuspend: () => void }) {
  const isGhana = p.jurisdiction === 'Ghana'
  const [checks, setChecks] = useState<boolean[]>(CHECKS.map((_, i) => p.status === 'approved' || i < 2))
  const [realCases, setRealCases] = useState(p.canReviewRealCases)
  return (
      <Layout
        header={<DrawerHeader title={p.name} subtitle={`${p.profession} · ${p.jurisdiction}`} endContent={<Badge variant={STATUS[p.status].variant} label={STATUS[p.status].label} />} onOpenChange={onClose} />}
        content={
          <LayoutContent>
            <VStack gap={4}>
              {p.status === 'pending' && (
                <Banner
                  status="info"
                  title="Waiting for verification"
                  description="Tick every check before approving. If something doesn't match, ask for more information or reject."
                  collapsible={false}
                />
              )}
              <MetadataList label={{ position: 'start', width: 140 }} title={<Text weight="semibold">Credentials</Text>}>
                <MetadataListItem label="Profession"><Text>{p.profession}</Text></MetadataListItem>
                <MetadataListItem label="Jurisdiction"><Text>{p.jurisdiction}</Text></MetadataListItem>
                <MetadataListItem label="Licence"><Text hasTabularNumbers>{p.licence}</Text></MetadataListItem>
                <MetadataListItem label="Regulator"><Text>{regulator(p)}</Text></MetadataListItem>
                <MetadataListItem label="Expertise"><Text>{p.expertise.join(', ')}</Text></MetadataListItem>
                <MetadataListItem label="Reviews done"><Text>{p.reviewsDone}</Text></MetadataListItem>
              </MetadataList>
              <Divider />
              <VStack gap={1.5}>
                <Text weight="semibold">Verification checks</Text>
                {CHECKS.map((c, i) => (
                  <CheckboxInput key={c} size="sm" label={c} value={checks[i]} isReadOnly={p.status === 'approved'} onChange={(v) => setChecks(checks.map((x, j) => (j === i ? v : x)))} />
                ))}
              </VStack>
              <Divider />
              <VStack gap={1.5}>
                <Switch
                  label="Can review real Ghana cases"
                  labelSpacing="spread"
                  labelPosition="start"
                  width="100%"
                  value={isGhana && realCases}
                  onChange={setRealCases}
                  isDisabled={!isGhana || p.status !== 'approved'}
                  disabledMessage={!isGhana ? 'Only Ghana-licensed professionals can review real Ghana cases during the pilot.' : 'Approve the account first.'}
                />
                <Text type="supporting" size="sm">
                  {isGhana && p.status !== 'approved' ? 'Available once the account is approved. ' : ''}
                  {isGhana
                    ? 'Ghana-licensed professionals are the clearest group for real Ghana user reviews. Turn this off to limit them to training cases.'
                    : `Licensed in ${p.jurisdiction}, so this stays off. Until SAYO's legal advice is final, professionals licensed outside Ghana are not assumed to be allowed to manage real Ghana cases. They can review fictional and de-identified cases and give clinical-logic and product feedback.`}
                </Text>
              </VStack>
            </VStack>
          </LayoutContent>
        }
        footer={
          <LayoutFooter hasDivider>
            {p.status === 'pending' ? (
              <HStack hAlign="between" gap={2}>
                <Button label="Reject" variant="destructive" />
                <HStack gap={2}>
                  <Button label="Ask for more info" variant="secondary" />
                  <Button label="Approve" variant="primary" isDisabled={!checks.every(Boolean)} tooltip={checks.every(Boolean) ? undefined : 'Complete every check first'} />
                </HStack>
              </HStack>
            ) : p.status === 'approved' ? (
              <HStack hAlign="between" gap={2}>
                <Button label="Suspend access" variant="destructive" icon={<ShieldAlert size={16} />} onClick={onSuspend} />
                <Button label="Save changes" variant="primary" />
              </HStack>
            ) : (
              <HStack hAlign="end"><Button label="Restore access" variant="secondary" /></HStack>
            )}
          </LayoutFooter>
        }
      />
  )
}
