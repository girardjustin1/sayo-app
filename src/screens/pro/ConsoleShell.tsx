import type { ReactNode } from 'react'
import {
  BarChart3, BookOpenCheck, Building2, Clock, History, Inbox, LayoutDashboard, LogOut, MessagesSquare, Stethoscope, UserCheck,
} from 'lucide-react'
import { AppShell } from '@astryxdesign/core/AppShell'
import { SideNav, SideNavHeading, SideNavItem, SideNavSection } from '@astryxdesign/core/SideNav'
import { Badge } from '@astryxdesign/core/Badge'
import { HStack } from '@astryxdesign/core/HStack'
import { VStack } from '@astryxdesign/core/VStack'
import { Text } from '@astryxdesign/core/Text'
import { IconButton } from '@astryxdesign/core/IconButton'
import { LogoMark } from '../../brand/Logo'
import '../../styles/console.css'

export type ProNav = 'queue' | 'mine' | 'history' | 'scope'
export type AdminNav = 'overview' | 'professionals' | 'services' | 'moderation' | 'waiting' | 'analytics'

interface Person {
  name: string
  role: string
}

function Footer({ person }: { person: Person }) {
  return (
    <HStack gap={2} vAlign="center" hAlign="between" paddingInline={1}>
      <VStack gap={0}>
        <Text size="sm" weight="semibold" maxLines={1}>{person.name}</Text>
        <Text type="supporting" size="xsm" maxLines={1}>{person.role}</Text>
      </VStack>
      <IconButton label="Sign out" variant="ghost" size="sm" icon={<LogOut size={16} />} />
    </HStack>
  )
}

/** Shared frame for the professional dashboard and the admin console. */
export function ProShell({
  active, children, person, queueCount = 6, banner,
}: { active: ProNav; children: ReactNode; person: Person; queueCount?: number; banner?: ReactNode }) {
  return (
    <VStack className="sayo-console">
      <AppShell
        variant="section"
        banner={banner}
        sideNav={
          <SideNav
            header={<SideNavHeading icon={<LogoMark size={22} />} heading="SAYO Professional" subheading="Pilot · sample data" />}
            footer={<Footer person={person} />}
          >
            <SideNavSection title="Reviews">
              <SideNavItem label="Case queue" icon={Inbox} isSelected={active === 'queue'} endContent={<Badge label={String(queueCount)} />} />
              <SideNavItem label="My open cases" icon={Stethoscope} isSelected={active === 'mine'} />
              <SideNavItem label="Completed" icon={History} isSelected={active === 'history'} />
            </SideNavSection>
            <SideNavSection title="Guidance">
              <SideNavItem label="Scope & guidance" icon={BookOpenCheck} isSelected={active === 'scope'} />
            </SideNavSection>
          </SideNav>
        }
      >
        {children}
      </AppShell>
    </VStack>
  )
}

export function AdminShell({
  active, children, counts = { reports: 5, waiting: 3, pending: 2 },
}: { active: AdminNav; children: ReactNode; counts?: { reports: number; waiting: number; pending: number } }) {
  return (
    <VStack className="sayo-console">
      <AppShell
        variant="section"
        sideNav={
          <SideNav
            header={<SideNavHeading icon={<LogoMark size={22} />} heading="SAYO Admin" subheading="Pilot · sample data" />}
            footer={<Footer person={{ name: 'Akosua B.', role: 'Pilot admin' }} />}
          >
            <SideNavSection title="Pilot">
              <SideNavItem label="Overview" icon={LayoutDashboard} isSelected={active === 'overview'} />
              <SideNavItem label="Waiting cases" icon={Clock} isSelected={active === 'waiting'} endContent={counts.waiting ? <Badge variant="error" label={String(counts.waiting)} /> : undefined} />
              <SideNavItem label="Analytics & export" icon={BarChart3} isSelected={active === 'analytics'} />
            </SideNavSection>
            <SideNavSection title="Manage">
              <SideNavItem label="Professionals" icon={UserCheck} isSelected={active === 'professionals'} endContent={counts.pending ? <Badge variant="warning" label={String(counts.pending)} /> : undefined} />
              <SideNavItem label="Care services" icon={Building2} isSelected={active === 'services'} />
              <SideNavItem label="Circle moderation" icon={MessagesSquare} isSelected={active === 'moderation'} endContent={counts.reports ? <Badge variant="warning" label={String(counts.reports)} /> : undefined} />
            </SideNavSection>
          </SideNav>
        }
      >
        {children}
      </AppShell>
    </VStack>
  )
}
