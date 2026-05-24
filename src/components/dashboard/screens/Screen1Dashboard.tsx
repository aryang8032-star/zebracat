'use client'

import React, { useState } from 'react'
import { Icon, TopBar, KPICard, ProgressBar, StatusBadge } from '../shared'
import { IndiaMap, type City } from '../IndiaMap'

const SPARK_REVENUE = [42,55,48,62,58,71,66,78,82,75,88,92]
const SPARK_SCREENS = [180,210,195,230,218,245,238,260,272,255,280,288]
const SPARK_IMPRESS = [8,12,10,14,13,16,15,18,20,17,22,24]
const SPARK_CAMPS   = [3,5,4,6,5,7,6,8,7,9,8,11]

const RECENT_CAMPAIGNS = [
  { name:'Diwali 2026 Blitz',  brand:'Reliance Retail',  cities:'Del, Mum, Blr', screens:284, status:'live',      spend:'₹8.4L',  reach:'2.1Cr' },
  { name:'IPL Season Launch',  brand:'Dream11',           cities:'All Metros',    screens:512, status:'live',      spend:'₹22.8L', reach:'8.4Cr' },
  { name:'EV Summer Campaign', brand:'Ather Energy',      cities:'Blr, Pun, Hyd', screens:148, status:'scheduled', spend:'₹4.2L',  reach:'89L' },
  { name:'Back to School',     brand:"Allen's",           cities:'Jai, Lko, Cha', screens:92,  status:'approved',  spend:'₹2.1L',  reach:'44L' },
  { name:'Festive Auto Offer', brand:'Maruti Suzuki',     cities:'Del, Mum',      screens:168, status:'pending',   spend:'₹6.8L',  reach:'1.8Cr' },
  { name:'BFSI Brand Refresh', brand:'HDFC Securities',   cities:'Del, Mum, Blr', screens:220, status:'draft',     spend:'₹5.5L',  reach:'—' },
]

const CITY_INVENTORY = [
  { city:'Delhi NCR',       screens:428, active:381, occupancy:89, revenue:'₹12.4L' },
  { city:'Madhya Pradesh',  screens:385, active:354, occupancy:92, revenue:'₹11.2L' },
  { city:'Bengaluru',       screens:312, active:265, occupancy:85, revenue:'₹8.9L'  },
  { city:'Chennai',         screens:245, active:191, occupancy:78, revenue:'₹7.1L'  },
  { city:'Hyderabad',       screens:218, active:179, occupancy:82, revenue:'₹6.4L'  },
  { city:'Kolkata',         screens:196, active:145, occupancy:74, revenue:'₹5.8L'  },
]

export default function Screen1Dashboard({ onNavigate }: { onNavigate: (s: string) => void }) {
  const [selectedCities, setSelectedCities] = useState<string[]>([])
  const [mapFilter, setMapFilter] = useState('all')

  const toggleCity = (city: City) => {
    setSelectedCities(prev => prev.includes(city.id) ? prev.filter(c => c !== city.id) : [...prev, city.id])
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 0, overflow: 'hidden' }}>
      <style>{`
        .s1-kpi-row { display: flex; gap: 12px; flex-shrink: 0; }
        .s1-body    { flex: 1; display: flex; gap: 16px; min-height: 0; }
        .s1-map     { flex: 0 0 58%; display: flex; flex-direction: column; overflow: hidden; }
        .s1-right   { flex: 1; display: flex; flex-direction: column; gap: 12px; min-width: 0; }
        @media (max-width: 767px) {
          .s1-scroll-wrap { overflow-y: auto !important; }
          .s1-kpi-row { flex-wrap: wrap; }
          .s1-kpi-row > * { flex: 1 1 45%; min-width: 0; }
          .s1-body { flex-direction: column; overflow: visible !important; min-height: 0; }
          .s1-map  { flex: 0 0 auto !important; min-height: 280px; }
          .s1-right { flex: 0 0 auto; }
        }
      `}</style>
      <TopBar title="Dashboard" subtitle="ZebraCat AI Publicity · May 2026"
        actions={
          <button onClick={() => onNavigate('booking')} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 8, cursor: 'pointer', background: 'linear-gradient(135deg, var(--purple), var(--blue))', border: 'none', color: 'white', fontSize: 12, fontWeight: 600, boxShadow: 'var(--glow-p)' }}>
            <Icon name="plus" size={13} />Book Screens
          </button>
        }
      />
      <div className="s1-scroll-wrap" style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '16px 20px', gap: 16 }}>
        {/* KPI Row */}
        <div className="s1-kpi-row">
          <KPICard icon="screen"  label="Active Screens"    value="2,693"  change="+12.4%" color="var(--purple)" sparkData={SPARK_SCREENS} delay={0} />
          <KPICard icon="zap"     label="Live Campaigns"    value="47"     change="+8"     color="var(--blue)"   sparkData={SPARK_CAMPS}   delay={60} />
          <KPICard icon="trending" label="Monthly Revenue"  value="₹68.4L" change="+23.1%" color="var(--mint)"   sparkData={SPARK_REVENUE} delay={120} sub="vs ₹55.6L last month" />
          <KPICard icon="eye"     label="Impressions Today" value="4.2Cr"  change="+18.7%" color="var(--cyan)"   sparkData={SPARK_IMPRESS} delay={180} />
        </div>

        <div className="s1-body">
          {/* India Map */}
          <div className="zc-glass-card s1-map">
            <div style={{ padding: '12px 16px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--b1)', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--mint)', animation: 'zc-pulse-dot 1.5s ease-in-out infinite' }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--t1)' }}>Live Network</span>
                <span style={{ fontSize: 10, color: 'var(--t3)', background: 'var(--b1)', padding: '2px 7px', borderRadius: 99 }}>India · 16 cities</span>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                {['all','active','available'].map(f => (
                  <button key={f} onClick={() => setMapFilter(f)} style={{ fontSize: 10, fontWeight: 600, padding: '3px 9px', borderRadius: 99, cursor: 'pointer', background: mapFilter === f ? 'var(--purple-d)' : 'transparent', border: `1px solid ${mapFilter === f ? 'var(--bglow)' : 'var(--b2)'}`, color: mapFilter === f ? 'var(--purple-l)' : 'var(--t3)', transition: 'all 0.15s', textTransform: 'capitalize' }}>{f}</button>
                ))}
              </div>
            </div>
            <div style={{ flex: 1, padding: '8px', position: 'relative', minHeight: 0 }}>
              <IndiaMap selectedCities={selectedCities} onCitySelect={toggleCity} />
            </div>
          </div>

          {/* Right panel */}
          <div className="s1-right">
            {/* City Inventory */}
            <div className="zc-glass-card" style={{ flex: '0 0 auto' }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--b1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>City Inventory</span>
                <button style={{ fontSize: 11, color: 'var(--purple-l)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                  All cities <Icon name="chevron_r" size={11} color="var(--purple-l)" />
                </button>
              </div>
              <div style={{ padding: '0 0 4px' }}>
                {CITY_INVENTORY.map((row, i) => (
                  <div key={row.city} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 16px', borderBottom: i < CITY_INVENTORY.length - 1 ? '1px solid var(--b0)' : 'none', cursor: 'pointer' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(139,92,246,0.04)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
                    <div style={{ flex: '0 0 96px', fontSize: 12, fontWeight: 600, color: 'var(--t1)' }}>{row.city}</div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 10, color: 'var(--t3)' }}>{row.active}/{row.screens} active</span>
                        <span style={{ fontSize: 10, color: row.occupancy > 85 ? 'var(--mint)' : 'var(--amber)', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{row.occupancy}%</span>
                      </div>
                      <ProgressBar pct={row.occupancy} color={row.occupancy > 85 ? 'var(--mint)' : 'var(--amber)'} height={3} />
                    </div>
                    <div className="zc-mono" style={{ fontSize: 12, fontWeight: 600, color: 'var(--mint-l)', flexShrink: 0, width: 52, textAlign: 'right' }}>{row.revenue}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Campaigns */}
            <div className="zc-glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--b1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>Campaign Activity</span>
                <button onClick={() => onNavigate('campaigns')} style={{ fontSize: 11, color: 'var(--purple-l)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                  View all <Icon name="chevron_r" size={11} color="var(--purple-l)" />
                </button>
              </div>
              <div style={{ flex: 1, overflowY: 'auto', padding: '4px 0' }}>
                {RECENT_CAMPAIGNS.map((c, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 16px', borderBottom: '1px solid var(--b0)', cursor: 'pointer' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(139,92,246,0.04)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--t1)', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--t3)' }}>{c.brand} · {c.cities}</div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div className="zc-mono" style={{ fontSize: 11, fontWeight: 600, color: 'var(--t2)', marginBottom: 3 }}>{c.spend}</div>
                      <StatusBadge status={c.status} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
