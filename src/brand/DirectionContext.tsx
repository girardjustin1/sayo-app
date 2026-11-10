import { createContext, useContext, type ReactNode } from 'react'
import { Theme } from '@astryxdesign/core/theme'
import { DIRECTIONS, LOCKED_COPY, type Direction, type DirectionId } from './directions'
import { THEMES } from './themes'

interface DirectionValue {
  direction: Direction
  copy: Direction['copy']
  locked: typeof LOCKED_COPY
}

const Ctx = createContext<DirectionValue>({
  direction: DIRECTIONS.sister,
  copy: DIRECTIONS.sister.copy,
  locked: LOCKED_COPY,
})

/** Applies a brand direction: its Astryx theme, its copy, and `data-direction` for SAYO CSS. */
export function DirectionProvider({ id, children }: { id: DirectionId; children: ReactNode }) {
  const direction = DIRECTIONS[id]
  return (
    <Ctx.Provider value={{ direction, copy: direction.copy, locked: LOCKED_COPY }}>
      <Theme theme={THEMES[id]} mode="light">
        <div data-direction={id} data-hero={direction.hero.dark ? 'dark' : 'light'} className="sayo-root">
          {children}
        </div>
      </Theme>
    </Ctx.Provider>
  )
}

export const useDirection = () => useContext(Ctx)
