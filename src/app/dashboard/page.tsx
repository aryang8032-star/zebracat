'use client'

import React, { useState } from 'react'
import { Sidebar, MenuContext } from '@/components/dashboard/shared'
import Screen1Dashboard from '@/components/dashboard/screens/Screen1Dashboard'
import Screen2Booking from '@/components/dashboard/screens/Screen2Booking'
import Screen3Studio from '@/components/dashboard/screens/Screen3Studio'
import Screen4Analytics from '@/components/dashboard/screens/Screen4Analytics'
import Screen5Campaigns from '@/components/dashboard/screens/Screen5Campaigns'
import Screen6Admin from '@/components/dashboard/screens/Screen6Admin'
import '@/components/dashboard/tokens.css'

type ScreenId = 'dashboard' | 'map' | 'booking' | 'studio' | 'analytics' | 'campaigns' | 'admin' | 'users'

export default function DashboardPage() {
  const [screen, setScreen] = useState<ScreenId>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const nav = (s: string) => setScreen(s as ScreenId)
  const openMenu = () => setSidebarOpen(true)
  const closeMenu = () => setSidebarOpen(false)

  const renderScreen = () => {
    switch (screen) {
      case 'dashboard':
      case 'map':
        return <Screen1Dashboard onNavigate={nav} />
      case 'booking':
        return <Screen2Booking onNavigate={nav} />
      case 'studio':
        return <Screen3Studio onNavigate={nav} />
      case 'analytics':
        return <Screen4Analytics onNavigate={nav} />
      case 'campaigns':
        return <Screen5Campaigns onNavigate={nav} />
      case 'admin':
      case 'users':
        return <Screen6Admin onNavigate={nav} />
      default:
        return <Screen1Dashboard onNavigate={nav} />
    }
  }

  return (
    <MenuContext.Provider value={openMenu}>
      <div className="zc-dashboard">
        {/* Ambient background */}
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, background: 'radial-gradient(ellipse at 20% 20%, rgba(139,92,246,0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(6,182,212,0.05) 0%, transparent 50%), radial-gradient(ellipse at 60% 20%, rgba(59,130,246,0.04) 0%, transparent 40%)' }} />

        <Sidebar active={screen} onNavigate={nav} isOpen={sidebarOpen} onClose={closeMenu} />

        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden', position: 'relative', zIndex: 1 }}>
          {renderScreen()}
        </main>
      </div>
    </MenuContext.Provider>
  )
}
