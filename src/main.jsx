import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import * as Sentry from '@sentry/react'
import './index.css'
import App from './App.jsx'

// Initialize Sentry for error tracking
Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN || "", // Replace with your Sentry DSN later
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0, 
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Analytics />
  </StrictMode>,
)
