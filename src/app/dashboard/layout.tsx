import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ZebraCat AI Publicity — DOOH Dashboard',
  description: 'Manage DOOH campaigns, screen inventory, and analytics',
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999 }}>
      {children}
    </div>
  )
}
