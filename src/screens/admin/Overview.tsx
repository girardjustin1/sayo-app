import { AlertTriangle, Clock, Download, MessagesSquare, ShieldCheck, UserCheck } from 'lucide-react'
import { Layout, LayoutContent, LayoutHeader } from '@astryxdesign/core/Layout'
import { Heading } from '@astryxdesign/core/Heading'
import { Text } from '@astryxdesign/core/Text'
import { HStack } from '@astryxdesign/core/HStack'
import { VStack } from '@astryxdesign/core/VStack'
import { Grid } from '@astryxdesign/core/Grid'
import { Card } from '@astryxdesign/core/Card'
import { Button } from '@astryxdesign/core/Button'
import { Badge } from '@astryxdesign/core/Badge'
import { List, ListItem } from '@astryxdesign/core/List'
import { ProgressBar } from '@astryxdesign/core/ProgressBar'
import { PILOT_METRICS } from '../../data/fixtures'
import { AdminShell } from '../pro/ConsoleShell'
import { formatWait } from '../pro/data'
import { GBV_SENSITIVE, REPORTS, THRESHOLDS, WAITING } from './data'

function Stat({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <Card padding={4}>
      <VStack gap={1}>
        <Text type="supporting" size="sm">{label}</Text>
        <Text className="sayo-stat">{value}</Text>
        {note && <Text type="supporting" size="xsm">{note}</Text>}
      </VStack>
    </Card>
  )
}

export interface OverviewProps {
  /** Nothing needs attention. */
  allClear?: boolean
}

/** Pilot overview: action items first, then de-identified metrics. */
export function Overview({ allClear = false }: OverviewProps) {
  const m = PILOT_METRICS
  const overdue = allClear ? [] : WAITING.filter((w) => !w.assignee && w.waitingMinutes >= THRESHOLDS.overdueMinutes)
  const oldest = Math.max(...WAITING.filter((w) => !w.assignee).map((w) => w.waitingMinutes))
  const reports = allClear ? [] : REPORTS
  const gbv = reports.filter((r) => r.reasons.some((x) => GBV_SENSITIVE.includes(x))).length
  const pending = allClear ? 0 : 2

  return (
    <AdminShell active="overview" counts={{ reports: reports.length, waiting: overdue.length, pending }}>
      <Layout
        header={
          <LayoutHeader hasDivider>
            <HStack hAlign="between" vAlign="center">
              <VStack gap={0.5}>
                <Heading level={1}>Pilot overview</Heading>
                <Text type="supporting">Ghana pilot · last 30 days · de-identified counts only</Text>
              </VStack>
              <Button label="Export CSV" icon={<Download size={16} />} />
            </HStack>
          </LayoutHeader>
        }
        content={
          <LayoutContent>
            <VStack gap={5}>
              <VStack gap={2}>
                <Heading level={2}>Needs attention</Heading>
                {allClear ? (
                  <Card padding={4}>
                    <HStack gap={2} vAlign="center">
                      <ShieldCheck size={18} style={{ color: 'var(--sayo-pro)' }} />
                      <Text>Nothing needs you right now. No overdue cases, open reports or pending professionals.</Text>
                    </HStack>
                  </Card>
                ) : (
                  <Card padding={0}>
                    <List hasDividers density="balanced">
                      <ListItem
                        startContent={<AlertTriangle size={18} style={{ color: 'var(--color-error)' }} />}
                        label={<Text weight="semibold">{overdue.length} cases waiting over 24 hours</Text>}
                        description={`Oldest unassigned: ${formatWait(oldest)}. ${overdue.filter((o) => o.redFlag).length} of them have a red flag.`}
                        endContent={<Button label="Open monitor" size="sm" variant="primary" />}
                      />
                      <ListItem
                        startContent={<MessagesSquare size={18} />}
                        label={<HStack gap={2} vAlign="center"><Text weight="semibold">{reports.length} open Circle reports</Text>{gbv > 0 && <Badge variant="error" label={`${gbv} GBV-sensitive`} />}</HStack>}
                        description="One post was hidden automatically because a reporter said someone may be in danger."
                        endContent={<Button label="Review reports" size="sm" />}
                      />
                      <ListItem
                        startContent={<UserCheck size={18} />}
                        label={<Text weight="semibold">{pending} professionals waiting for approval</Text>}
                        description="Check each licence before approving. One at a time; there is no bulk approve."
                        endContent={<Button label="Review" size="sm" />}
                      />
                    </List>
                  </Card>
                )}
              </VStack>

              <VStack gap={2}>
                <Heading level={2}>Pilot metrics</Heading>
                <Grid columns={4} gap={3}>
                  <Stat label="Total users" value={String(m.users)} note="18+ confirmed" />
                  <Stat label="Concerns submitted" value={String(m.concerns)} />
                  <Stat label="Reviews requested" value={String(m.reviewsRequested)} note={`${Math.round((m.reviewsRequested / m.concerns) * 100)}% of concerns`} />
                  <Stat label="Reviews completed" value={String(m.reviewsCompleted)} note={`${m.reviewsRequested - m.reviewsCompleted} open or waiting`} />
                  <Stat label="Average response time" value={`${m.avgResponseHours} h`} note="Sent → completed" />
                  <Stat label="Referrals recommended" value={String(m.referrals)} />
                  <Stat label="Circle posts" value={String(m.circlePosts)} note={`${reports.length} open reports`} />
                  <Stat label="Satisfaction" value={`${m.satisfaction} / 5`} note="Optional rating after a review" />
                </Grid>
              </VStack>

              <Card padding={4}>
                <VStack gap={2}>
                  <HStack hAlign="between">
                    <HStack gap={1.5} vAlign="center"><Clock size={16} /><Text weight="semibold">Review completion</Text></HStack>
                    <Text type="supporting" size="sm">{m.reviewsCompleted} of {m.reviewsRequested} requested</Text>
                  </HStack>
                  <ProgressBar label="Reviews completed" isLabelHidden value={m.reviewsCompleted} max={m.reviewsRequested} variant="success" />
                </VStack>
              </Card>
              <Text type="supporting" size="sm">
                Metrics never include message text, names or contact details. Groups smaller than 5 are hidden in exports to protect privacy.
              </Text>
            </VStack>
          </LayoutContent>
        }
      />
    </AdminShell>
  )
}
