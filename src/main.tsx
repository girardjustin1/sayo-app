import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import { Prototype } from './prototype/Prototype'

// The clickable prototype. Storybook (pnpm storybook) holds every screen and state.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Prototype />
  </StrictMode>,
)
