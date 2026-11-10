import { useEffect, useRef, type ReactNode } from 'react'
import { HStack } from '@astryxdesign/core/HStack'
import { ToggleButton, ToggleButtonGroup } from '@astryxdesign/core/ToggleButton'

export interface FilterOption<T extends string> {
  id: T
  label: string
  icon?: ReactNode
}

/**
 * Single-choice filter row (Find Care categories, Circle topics). Scrolls sideways with the
 * screen's 20px inset and keeps the selected option in view, so a pre-selected filter is
 * never hidden off-screen. `sayo-chip-row` marks it as an intentional sideways scroller (layout audit).
 */
export function FilterRow<T extends string>({ label, value, options, onChange }: {
  label: string
  value: T
  options: FilterOption<T>[]
  onChange: (value: T) => void
}) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const row = ref.current
    const sel = row?.querySelector<HTMLElement>('[aria-pressed="true"]')
    if (!row || !sel) return
    const r = row.getBoundingClientRect()
    const s = sel.getBoundingClientRect()
    if (s.right > r.right || s.left < r.left) row.scrollLeft += s.left - r.left - (r.width - s.width) / 2
  }, [value])
  return (
    <HStack ref={ref} className="sayo-chip-row" isScrollable paddingInline={5} paddingBlock={1}>
      <ToggleButtonGroup label={label} type="single" value={value} onChange={(v) => v && onChange(v as T)}>
        {options.map((o) => <ToggleButton key={o.id} value={o.id} label={o.label} icon={o.icon} />)}
      </ToggleButtonGroup>
    </HStack>
  )
}
