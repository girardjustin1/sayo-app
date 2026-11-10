import type { ReactNode } from 'react'
import { ChevronLeft, Heart, Home, LogOut, MapPin, MessageCircleHeart, User } from 'lucide-react'
import { IconButton } from '@astryxdesign/core/IconButton'
import { LOCKED_COPY } from '../../brand/directions'

/** iOS-style status bar. `light` for use on dark/gradient headers. */
export function StatusBar({ light = false }: { light?: boolean }) {
  return (
    <div className={`sayo-statusbar${light ? ' sayo-statusbar--light' : ''}`} aria-hidden>
      <span>9:41</span>
      <span style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 12 }}>
        <svg width="18" height="11" viewBox="0 0 18 11"><g fill="currentColor"><rect x="0" y="7" width="3" height="4" rx="1" /><rect x="5" y="5" width="3" height="6" rx="1" /><rect x="10" y="2.5" width="3" height="8.5" rx="1" /><rect x="15" y="0" width="3" height="11" rx="1" /></g></svg>
        <svg width="26" height="12" viewBox="0 0 26 12"><rect x="0.5" y="0.5" width="22" height="11" rx="3.5" fill="none" stroke="currentColor" opacity="0.4" /><rect x="2" y="2" width="16" height="8" rx="2" fill="currentColor" /><rect x="23.5" y="4" width="2" height="4" rx="1" fill="currentColor" opacity="0.4" /></svg>
      </span>
    </div>
  )
}

/** Top bar with optional back button, centred title and trailing action. */
export function AppBar({ title, onBack, end }: { title?: ReactNode; onBack?: () => void; end?: ReactNode }) {
  return (
    <div className="sayo-appbar">
      <span style={{ width: 40 }}>
        {onBack !== undefined && <IconButton label="Back" variant="ghost" icon={<ChevronLeft size={22} />} onClick={onBack} />}
      </span>
      <span className="sayo-appbar__title">{title}</span>
      <span style={{ minWidth: 40, display: 'flex', justifyContent: 'flex-end' }}>{end}</span>
    </div>
  )
}

export type TabId = 'home' | 'circle' | 'ask' | 'care' | 'me'
const TABS: { id: TabId; label: string; icon: ReactNode }[] = [
  { id: 'home', label: 'Home', icon: <Home size={20} /> },
  { id: 'circle', label: 'Circle', icon: <Heart size={20} /> },
  { id: 'ask', label: 'Ask', icon: <MessageCircleHeart size={20} /> },
  { id: 'care', label: 'Find Care', icon: <MapPin size={20} /> },
  { id: 'me', label: 'Me', icon: <User size={20} /> },
]

/** The user app's bottom navigation. Ask sits in the middle, always emphasised. */
export function TabBar({ active }: { active?: TabId }) {
  return (
    <nav className="sayo-tabbar" aria-label="Main">
      {TABS.map((t) => (
        <button key={t.id} className={`sayo-tab${t.id === 'ask' ? ' sayo-tab--ask' : ''}`} aria-current={active === t.id ? 'page' : undefined}>
          <span className="sayo-tab__pill">{t.icon}</span>
          {t.label}
        </button>
      ))}
    </nav>
  )
}

/** Always-visible escape hatch in sensitive flows. Real app: wipes the view and opens a neutral site. */
export function QuickExit() {
  return (
    <button className="sayo-quickexit" type="button">
      <LogOut size={14} /> {LOCKED_COPY.quickExit}
    </button>
  )
}

/**
 * A phone screen: status bar, optional header, scrolling body, optional footer
 * (sticky actions) and tab bar. Fills the 390×844 story frame.
 */
export function Screen({
  header,
  children,
  footer,
  tab,
  quickExit = false,
  lightStatus = false,
  overlayStatus = false,
  background,
  className,
}: {
  header?: ReactNode
  children: ReactNode
  footer?: ReactNode
  tab?: TabId
  quickExit?: boolean
  lightStatus?: boolean
  /** Transparent status bar floating over the body, so a hero can run to the top edge. Body content must start with 50px top padding. */
  overlayStatus?: boolean
  background?: string
  className?: string
}) {
  return (
    <div className={`sayo-screen ${className ?? ''}`} style={background ? { background } : undefined}>
      {overlayStatus ? (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20 }}><StatusBar light={lightStatus} /></div>
      ) : (
        <StatusBar light={lightStatus} />
      )}
      {header}
      {quickExit && <QuickExit />}
      <div className="sayo-screen__body">{children}</div>
      {footer && <div style={{ flex: 'none', padding: '12px 20px 28px', background: 'var(--color-background-body)' }}>{footer}</div>}
      {tab && <TabBar active={tab} />}
    </div>
  )
}
