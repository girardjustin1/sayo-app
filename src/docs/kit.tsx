import type { CSSProperties, ReactNode } from 'react'

/**
 * Layout kit for documentation pages (Start Here, Brand, Foundations). These pages
 * are presentation boards, not app UI, so they use their own neutral styling and
 * render each direction inside its own DirectionProvider where needed.
 */

export const docInk = '#1F1D24'
export const docMuted = '#6B6875'
export const docLine = '#E7E3EA'

export function DocPage({ children, width = 1240 }: { children: ReactNode; width?: number }) {
  return (
    <div style={{ background: '#FBFAFC', minHeight: '100vh', color: docInk, fontFamily: "'DM Sans Variable', system-ui, sans-serif" }}>
      <div style={{ maxWidth: width, margin: '0 auto', padding: '40px 32px 80px' }}>{children}</div>
    </div>
  )
}

export function DocTitle({ kicker, title, intro }: { kicker?: string; title: ReactNode; intro?: ReactNode }) {
  return (
    <header style={{ marginBottom: 36 }}>
      {kicker && <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C4007F', marginBottom: 10 }}>{kicker}</div>}
      <h1 style={{ fontFamily: 'inherit', fontSize: 40, lineHeight: 1.08, margin: 0, fontWeight: 700, letterSpacing: '-0.02em' }}>{title}</h1>
      {intro && <p style={{ fontSize: 17, lineHeight: 1.55, color: docMuted, maxWidth: 760, margin: '14px 0 0' }}>{intro}</p>}
    </header>
  )
}

export function DocSection({ title, intro, children }: { title: string; intro?: ReactNode; children: ReactNode }) {
  return (
    <section style={{ marginTop: 48 }}>
      <h2 style={{ fontFamily: 'inherit', fontSize: 24, margin: 0, fontWeight: 700, letterSpacing: '-0.01em' }}>{title}</h2>
      {intro && <p style={{ fontSize: 15, lineHeight: 1.55, color: docMuted, maxWidth: 760, margin: '8px 0 0' }}>{intro}</p>}
      <div style={{ marginTop: 20 }}>{children}</div>
    </section>
  )
}

export function Grid({ cols = 3, gap = 20, children, style }: { cols?: number; gap?: number; children: ReactNode; style?: CSSProperties }) {
  return <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap, ...style }}>{children}</div>
}

export function Panel({ children, style, pad = 20 }: { children: ReactNode; style?: CSSProperties; pad?: number }) {
  return <div style={{ background: '#fff', border: `1px solid ${docLine}`, borderRadius: 16, padding: pad, ...style }}>{children}</div>
}

export function Label({ children }: { children: ReactNode }) {
  return <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: docMuted, marginBottom: 8 }}>{children}</div>
}

export function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul style={{ margin: 0, paddingLeft: 18, display: 'grid', gap: 6, fontSize: 14, lineHeight: 1.5 }}>
      {items.map((t, i) => <li key={i}>{t}</li>)}
    </ul>
  )
}

/** Small static phone frame for embedding screens in doc pages. */
export function MiniPhone({ children, scale = 0.62 }: { children: ReactNode; scale?: number }) {
  return (
    <div style={{ width: 390 * scale, height: 844 * scale, flex: 'none' }}>
      <div
        style={{
          width: 390, height: 844, transform: `scale(${scale})`, transformOrigin: 'top left',
          borderRadius: 52, overflow: 'hidden', position: 'relative',
          boxShadow: '0 0 0 10px #1d1b22, 0 0 0 11px #3a3742, 0 24px 60px rgb(40 10 40 / 0.25)',
        }}
      >
        {children}
        <div style={{ position: 'absolute', top: 11, left: '50%', translate: '-50% 0', width: 120, height: 34, borderRadius: 20, background: '#000', zIndex: 60 }} />
      </div>
    </div>
  )
}
