import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Every page renders its own <Seo>; drop the index.html fallbacks so <head> never has two descriptions.
document.querySelectorAll('[data-static]').forEach((el) => el.remove())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
