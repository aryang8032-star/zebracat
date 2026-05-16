'use client'

import React, { useState, useEffect, useRef } from 'react'

/* ── Icon ── */
type IconName = keyof typeof PATHS
const PATHS = {
  grid:     [<rect key="a" x="3" y="3" width="7" height="7" rx="1.5"/>,<rect key="b" x="14" y="3" width="7" height="7" rx="1.5"/>,<rect key="c" x="3" y="14" width="7" height="7" rx="1.5"/>,<rect key="d" x="14" y="14" width="7" height="7" rx="1.5"/>],
  map:      [<polygon key="a" points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>,<line key="b" x1="8" y1="2" x2="8" y2="18"/>,<line key="c" x1="16" y1="6" x2="16" y2="22"/>],
  calendar: [<rect key="a" x="3" y="4" width="18" height="18" rx="2"/>,<line key="b" x1="16" y1="2" x2="16" y2="6"/>,<line key="c" x1="8" y1="2" x2="8" y2="6"/>,<line key="d" x1="3" y1="10" x2="21" y2="10"/>],
  film:     [<rect key="a" x="2" y="2" width="20" height="20" rx="2"/>,<line key="b" x1="7" y1="2" x2="7" y2="22"/>,<line key="c" x1="17" y1="2" x2="17" y2="22"/>,<line key="d" x1="2" y1="12" x2="22" y2="12"/>,<line key="e" x1="2" y1="7" x2="7" y2="7"/>,<line key="f" x1="17" y1="7" x2="22" y2="7"/>],
  bar:      [<line key="a" x1="18" y1="20" x2="18" y2="10"/>,<line key="b" x1="12" y1="20" x2="12" y2="4"/>,<line key="c" x1="6" y1="20" x2="6" y2="14"/>],
  settings: [<circle key="a" cx="12" cy="12" r="3"/>,<path key="b" d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>],
  bell:     [<path key="a" d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>,<path key="b" d="M13.73 21a2 2 0 01-3.46 0"/>],
  search:   [<circle key="a" cx="11" cy="11" r="8"/>,<line key="b" x1="21" y1="21" x2="16.65" y2="16.65"/>],
  upload:   [<polyline key="a" points="16 16 12 12 8 16"/>,<line key="b" x1="12" y1="12" x2="12" y2="21"/>,<path key="c" d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/>],
  trending: [<polyline key="a" points="22 7 13.5 15.5 8.5 10.5 2 17"/>,<polyline key="b" points="16 7 22 7 22 13"/>],
  zap:      [<polygon key="a" points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>],
  screen:   [<rect key="a" x="2" y="3" width="20" height="14" rx="2"/>,<line key="b" x1="8" y1="21" x2="16" y2="21"/>,<line key="c" x1="12" y1="17" x2="12" y2="21"/>],
  eye:      [<path key="a" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>,<circle key="b" cx="12" cy="12" r="3"/>],
  check:    [<polyline key="a" points="20 6 9 17 4 12"/>],
  x:        [<line key="a" x1="18" y1="6" x2="6" y2="18"/>,<line key="b" x1="6" y1="6" x2="18" y2="18"/>],
  plus:     [<line key="a" x1="12" y1="5" x2="12" y2="19"/>,<line key="b" x1="5" y1="12" x2="19" y2="12"/>],
  arrow_r:  [<line key="a" x1="5" y1="12" x2="19" y2="12"/>,<polyline key="b" points="12 5 19 12 12 19"/>],
  arrow_up: [<line key="a" x1="12" y1="19" x2="12" y2="5"/>,<polyline key="b" points="5 12 12 5 19 12"/>],
  layers:   [<polygon key="a" points="12 2 2 7 12 12 22 7 12 2"/>,<polyline key="b" points="2 17 12 22 22 17"/>,<polyline key="c" points="2 12 12 17 22 12"/>],
  target:   [<circle key="a" cx="12" cy="12" r="10"/>,<circle key="b" cx="12" cy="12" r="6"/>,<circle key="c" cx="12" cy="12" r="2"/>],
  users:    [<path key="a" d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>,<circle key="b" cx="9" cy="7" r="4"/>,<path key="c" d="M23 21v-2a4 4 0 00-3-3.87"/>,<path key="d" d="M16 3.13a4 4 0 010 7.75"/>],
  chevron_r:[<polyline key="a" points="9 18 15 12 9 6"/>],
  chevron_d:[<polyline key="a" points="6 9 12 15 18 9"/>],
  pin:      [<path key="a" d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>,<circle key="b" cx="12" cy="10" r="3"/>],
  tag:      [<path key="a" d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>,<line key="b" x1="7" y1="7" x2="7.01" y2="7"/>],
  download: [<polyline key="a" points="8 17 12 21 16 17"/>,<line key="b" x1="12" y1="12" x2="12" y2="21"/>,<path key="c" d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29"/>],
  pause:    [<rect key="a" x="6" y="4" width="4" height="16"/>,<rect key="b" x="14" y="4" width="4" height="16"/>],
  play:     [<polygon key="a" points="5 3 19 12 5 21 5 3"/>],
  info:     [<circle key="a" cx="12" cy="12" r="10"/>,<line key="b" x1="12" y1="16" x2="12" y2="12"/>,<line key="c" x1="12" y1="8" x2="12.01" y2="8"/>],
  sort:     [<line key="a" x1="8" y1="6" x2="21" y2="6"/>,<line key="b" x1="8" y1="12" x2="21" y2="12"/>,<line key="c" x1="8" y1="18" x2="21" y2="18"/>,<line key="d" x1="3" y1="6" x2="3.01" y2="6"/>],
}

export const Icon = ({ name, size = 16, color = 'currentColor', strokeWidth = 1.8 }: { name: IconName; size?: number; color?: string; strokeWidth?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    {PATHS[name] || null}
  </svg>
)

/* ── StatusBadge ── */
type StatusKey = 'live' | 'active' | 'pending' | 'approved' | 'rejected' | 'paused' | 'draft' | 'scheduled' | 'maintenance' | 'offline'
const STATUS_CFG: Record<string, { color: string; bg: string; label: string }> = {
  live:        { color: 'var(--mint)',   bg: 'var(--mint-d)',   label: 'Live' },
  active:      { color: 'var(--blue)',   bg: 'var(--blue-d)',   label: 'Active' },
  pending:     { color: 'var(--amber)',  bg: 'var(--amber-d)',  label: 'Pending' },
  approved:    { color: 'var(--mint)',   bg: 'var(--mint-d)',   label: 'Approved' },
  rejected:    { color: 'var(--red)',    bg: 'var(--red-d)',    label: 'Rejected' },
  paused:      { color: 'var(--t3)',     bg: 'var(--b1)',       label: 'Paused' },
  draft:       { color: 'var(--purple)', bg: 'var(--purple-d)', label: 'Draft' },
  scheduled:   { color: 'var(--cyan)',   bg: 'var(--cyan-d)',   label: 'Scheduled' },
  maintenance: { color: 'var(--amber)',  bg: 'var(--amber-d)',  label: 'Maintenance' },
  offline:     { color: 'var(--red)',    bg: 'var(--red-d)',    label: 'Offline' },
}

export const StatusBadge = ({ status, label, pulse = false }: { status: string; label?: string; pulse?: boolean }) => {
  const cfg = STATUS_CFG[status] || STATUS_CFG.draft
  const txt = label || cfg.label
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '2px 9px', borderRadius: 99,
      fontSize: 11, fontWeight: 600, letterSpacing: '0.03em',
      color: cfg.color, background: cfg.bg,
      border: `1px solid ${cfg.color}30`,
    }}>
      <span style={{
        width: 5, height: 5, borderRadius: '50%', background: cfg.color, flexShrink: 0,
        ...(pulse ? { animation: 'zc-pulse-dot 2s ease-in-out infinite' } : {}),
      }} />
      {txt}
    </span>
  )
}

/* ── Sparkline ── */
export const Sparkline = ({ data = [], color = 'var(--purple)', width = 80, height = 32, fill = true }: { data?: number[]; color?: string; width?: number; height?: number; fill?: boolean }) => {
  if (!data.length) return null
  const max = Math.max(...data), min = Math.min(...data)
  const range = max - min || 1
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((v - min) / range) * (height - 4) - 2
    return `${x},${y}`
  })
  const polyline = pts.join(' ')
  const area = `${pts[0].split(',')[0]},${height} ${polyline} ${pts[pts.length-1].split(',')[0]},${height}`
  return (
    <svg width={width} height={height} style={{ overflow: 'visible' }}>
      {fill && <polygon points={area} fill={color} opacity={0.12} />}
      <polyline points={polyline} fill="none" stroke={color} strokeWidth={1.8} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  )
}

/* ── MiniBar ── */
export const MiniBar = ({ data = [], color = 'var(--blue)', width = 80, height = 32 }: { data?: number[]; color?: string; width?: number; height?: number }) => {
  const max = Math.max(...data) || 1
  const bw = (width / data.length) * 0.65
  const gap = (width / data.length) * 0.35
  return (
    <svg width={width} height={height}>
      {data.map((v, i) => {
        const bh = (v / max) * (height - 2)
        const x = i * (bw + gap)
        return <rect key={i} x={x} y={height - bh} width={bw} height={bh} rx={2} fill={color} opacity={0.7 + (i / data.length) * 0.3} />
      })}
    </svg>
  )
}

/* ── DonutRing ── */
export const DonutRing = ({ pct = 75, color = 'var(--purple)', size = 48, stroke = 5 }: { pct?: number; color?: string; size?: number; stroke?: number }) => {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const dash = (pct / 100) * circ
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        style={{ transition: 'stroke-dasharray 0.8s var(--ease)' }} />
    </svg>
  )
}

/* ── ProgressBar ── */
export const ProgressBar = ({ pct = 0, color = 'var(--purple)', height = 4, bg = 'var(--b2)', radius = 9 }: { pct?: number; color?: string; height?: number; bg?: string; radius?: number }) => (
  <div style={{ width: '100%', height, background: bg, borderRadius: radius, overflow: 'hidden' }}>
    <div style={{ height: '100%', width: `${Math.min(100, pct)}%`, background: color, borderRadius: radius, transition: 'width 0.8s var(--ease)' }} />
  </div>
)

/* ── KPICard ── */
export const KPICard = ({ icon, label, value, change, changeDir = 'up', sub, color = 'var(--purple)', sparkData, delay = 0 }: {
  icon: IconName; label: string; value: string; change?: string; changeDir?: 'up' | 'down'
  sub?: string; color?: string; sparkData?: number[]; delay?: number
}) => {
  const [displayed, setDisplayed] = useState('0')
  const isPositive = changeDir === 'up'
  useEffect(() => {
    const timer = setTimeout(() => setDisplayed(value), 100 + delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return (
    <div className="zc-glass-card" style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1, minWidth: 0, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, right: 0, width: 80, height: 80, background: `radial-gradient(circle at 80% 20%, ${color}18 0%, transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: `${color}1A`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>
            <Icon name={icon} size={15} />
          </div>
          <span style={{ fontSize: 12, color: 'var(--t2)', fontWeight: 500 }}>{label}</span>
        </div>
        {change && (
          <span style={{ fontSize: 11, fontWeight: 600, color: isPositive ? 'var(--mint)' : 'var(--red)', display: 'flex', alignItems: 'center', gap: 2 }}>
            <Icon name="arrow_up" size={10} color={isPositive ? 'var(--mint)' : 'var(--red)'} />
            {change}
          </span>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 8 }}>
        <div>
          <div className="zc-mono" style={{ fontSize: 24, fontWeight: 600, lineHeight: 1.1, background: `linear-gradient(135deg, var(--t1) 50%, ${color} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            {displayed}
          </div>
          {sub && <div style={{ fontSize: 11, color: 'var(--t3)', marginTop: 2 }}>{sub}</div>}
        </div>
        {sparkData && <Sparkline data={sparkData} color={color} />}
      </div>
    </div>
  )
}

/* ── TopBar ── */
export const TopBar = ({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: React.ReactNode }) => {
  const [searchVal, setSearchVal] = useState('')
  return (
    <header style={{
      height: 'var(--topbar-h)', flexShrink: 0, display: 'flex', alignItems: 'center', gap: 16, padding: '0 24px',
      background: 'linear-gradient(180deg, rgba(8,22,44,0.99) 0%, rgba(6,18,36,0.98) 100%)',
      backdropFilter: 'blur(14px)', borderBottom: '1px solid rgba(148,163,200,0.12)', position: 'relative', zIndex: 9,
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--t1)', letterSpacing: '-0.01em' }}>{title}</div>
        {subtitle && <div style={{ fontSize: 11, color: 'var(--t3)', marginTop: 1 }}>{subtitle}</div>}
      </div>
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--t3)' }}>
          <Icon name="search" size={13} />
        </div>
        <input value={searchVal} onChange={e => setSearchVal(e.target.value)} placeholder="Search campaigns, cities…"
          style={{ width: 220, height: 34, paddingLeft: 30, paddingRight: 12, background: 'var(--b0)', border: '1px solid var(--b2)', borderRadius: 8, color: 'var(--t1)', fontSize: 12 }}
          onFocus={e => e.target.style.borderColor = 'var(--purple)'}
          onBlur={e => e.target.style.borderColor = 'var(--b2)'} />
      </div>
      {actions}
      <button style={{ width: 34, height: 34, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--b0)', border: '1px solid var(--b2)', color: 'var(--t2)', position: 'relative' }}>
        <Icon name="bell" size={15} />
        <span style={{ position: 'absolute', top: 6, right: 6, width: 7, height: 7, background: 'var(--red)', borderRadius: '50%', border: '1.5px solid var(--base)' }} />
      </button>
      <div style={{ width: 34, height: 34, borderRadius: 10, background: 'linear-gradient(135deg, var(--purple) 0%, var(--blue) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: 'white', cursor: 'pointer', boxShadow: 'var(--glow-p)', flexShrink: 0 }}>A</div>
    </header>
  )
}

/* ── Sidebar ── */
const NAV_ITEMS = [
  { id: 'dashboard', icon: 'grid' as IconName,     label: 'Dashboard' },
  { id: 'map',       icon: 'map' as IconName,      label: 'Live Map' },
  { id: 'booking',   icon: 'calendar' as IconName, label: 'Book Screens' },
  { id: 'campaigns', icon: 'zap' as IconName,      label: 'Campaigns' },
  { id: 'studio',    icon: 'film' as IconName,     label: 'Creative Studio' },
  { id: 'analytics', icon: 'bar' as IconName,      label: 'Analytics' },
]
const BOTTOM_ITEMS = [
  { id: 'admin', icon: 'settings' as IconName, label: 'Operations' },
  { id: 'users', icon: 'users' as IconName,    label: 'Team' },
]

export const Sidebar = ({ active, onNavigate }: { active: string; onNavigate: (screen: string) => void }) => (
  <aside style={{ width: 'var(--sidebar-w)', height: '100%', flexShrink: 0, background: 'linear-gradient(180deg, #050F1E 0%, #081628 100%)', borderRight: '1px solid var(--b1)', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 10 }}>
    <div style={{ padding: '18px 16px 16px', borderBottom: '1px solid var(--b1)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, overflow: 'hidden', flexShrink: 0, boxShadow: '0 0 18px rgba(139,92,246,0.35), 0 0 6px rgba(59,130,246,0.25)', background: 'linear-gradient(135deg, #4c1d95, #1e3a8a)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 18, fontWeight: 900, color: 'white' }}>Z</span>
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.01em', color: 'var(--t1)' }}>ZebraCat</div>
          <div style={{ fontSize: 10, color: 'var(--t3)', fontWeight: 500, letterSpacing: '0.05em' }}>AI PUBLICITY</div>
        </div>
      </div>
    </div>
    <nav style={{ padding: '10px 8px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 1 }}>
      <div style={{ fontSize: 9, color: 'var(--t4)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 8px 6px' }}>Main</div>
      {NAV_ITEMS.map(item => {
        const isActive = active === item.id
        return (
          <button key={item.id} onClick={() => onNavigate(item.id)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 8, cursor: 'pointer', background: isActive ? 'linear-gradient(90deg, var(--purple-d), var(--blue-g))' : 'transparent', border: `1px solid ${isActive ? 'var(--b2)' : 'transparent'}`, color: isActive ? 'var(--t1)' : 'var(--t3)', fontSize: 13, fontWeight: isActive ? 600 : 400, transition: 'all 0.18s var(--ease)', textAlign: 'left', position: 'relative' }}>
            {isActive && <div style={{ position: 'absolute', left: 0, top: '20%', height: '60%', width: 3, background: 'var(--purple)', borderRadius: '0 3px 3px 0' }} />}
            <Icon name={item.icon} size={15} color={isActive ? 'var(--purple-l)' : 'currentColor'} />
            {item.label}
            {item.id === 'campaigns' && <span style={{ marginLeft: 'auto', fontSize: 10, fontWeight: 700, color: 'var(--mint)', background: 'var(--mint-d)', padding: '1px 6px', borderRadius: 9 }}>4</span>}
          </button>
        )
      })}
      <div style={{ height: 1, background: 'var(--b1)', margin: '8px 4px' }} />
      <div style={{ fontSize: 9, color: 'var(--t4)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 8px 6px' }}>Operations</div>
      {BOTTOM_ITEMS.map(item => {
        const isActive = active === item.id
        return (
          <button key={item.id} onClick={() => onNavigate(item.id)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 8, cursor: 'pointer', background: isActive ? 'linear-gradient(90deg, var(--purple-d), var(--blue-g))' : 'transparent', border: `1px solid ${isActive ? 'var(--b2)' : 'transparent'}`, color: isActive ? 'var(--t1)' : 'var(--t3)', fontSize: 13, fontWeight: isActive ? 600 : 400, transition: 'all 0.18s var(--ease)', textAlign: 'left' }}>
            <Icon name={item.icon} size={15} color={isActive ? 'var(--purple-l)' : 'currentColor'} />
            {item.label}
          </button>
        )
      })}
    </nav>
    <div style={{ borderTop: '1px solid var(--b1)', padding: '12px 12px' }}>
      <div style={{ marginBottom: 8 }}>
        <div style={{ background: 'var(--b0)', border: '1px solid var(--b1)', borderRadius: 8, padding: '7px 10px' }}>
          <div style={{ fontSize: 9, color: 'var(--t3)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 2 }}>Wallet</div>
          <div className="zc-mono" style={{ fontSize: 14, fontWeight: 600, color: 'var(--mint-l)' }}>₹4,28,500</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg, var(--purple) 0%, var(--blue) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 12, fontWeight: 700, color: 'white' }}>A</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--t1)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Arjun Mehta</div>
          <div style={{ fontSize: 10, color: 'var(--t3)' }}>Brand Manager</div>
        </div>
        <Icon name="settings" size={14} color="var(--t3)" />
      </div>
    </div>
  </aside>
)
