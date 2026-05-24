'use client'

import React, { useState } from 'react'
import { Icon, TopBar, KPICard, StatusBadge, ProgressBar } from '../shared'

const SCREEN_INVENTORY = [
  { id:'SCR-0421', city:'Delhi NCR', loc:'Connaught Place',     type:'Billboard', status:'active',      size:'6×4m',   cpm:'₹28', occupancy:94, revenue:'₹82K' },
  { id:'SCR-0422', city:'Delhi NCR', loc:'Aerocity Mall',       type:'Mall',      status:'active',      size:'3×2m',   cpm:'₹42', occupancy:88, revenue:'₹64K' },
  { id:'SCR-0423', city:'Mumbai',    loc:'Bandra-Kurla Complex', type:'Billboard', status:'active',      size:'8×5m',   cpm:'₹32', occupancy:96, revenue:'₹98K' },
  { id:'SCR-0424', city:'Mumbai',    loc:'Andheri Metro',       type:'Transit',   status:'active',      size:'2×1.5m', cpm:'₹24', occupancy:82, revenue:'₹38K' },
  { id:'SCR-0425', city:'Bengaluru', loc:'UB City Mall',        type:'Mall',      status:'maintenance', size:'4×3m',   cpm:'₹38', occupancy:0,  revenue:'₹0'   },
  { id:'SCR-0426', city:'Chennai',   loc:'Anna Salai',          type:'Billboard', status:'active',      size:'6×4m',   cpm:'₹22', occupancy:76, revenue:'₹54K' },
  { id:'SCR-0427', city:'Hyderabad', loc:'HITEC City',          type:'Billboard', status:'active',      size:'5×3m',   cpm:'₹24', occupancy:84, revenue:'₹58K' },
  { id:'SCR-0428', city:'Kolkata',   loc:'Park Street',         type:'Billboard', status:'offline',     size:'4×3m',   cpm:'₹18', occupancy:0,  revenue:'₹0'   },
]

const REVENUE_DATA = [
  { month:'Jan', revenue:55.4, target:50 },
  { month:'Feb', revenue:58.2, target:55 },
  { month:'Mar', revenue:62.8, target:60 },
  { month:'Apr', revenue:61.4, target:62 },
  { month:'May', revenue:68.4, target:65 },
]

const SYSTEM_HEALTH = [
  { label:'API Uptime',        value:'99.98%',      status:'ok',   detail:'14ms avg latency' },
  { label:'Screen Network',    value:'2,658/2,693',  status:'warn', detail:'35 offline/maintenance' },
  { label:'Playback Engine',   value:'Healthy',     status:'ok',   detail:'All nodes operational' },
  { label:'Creative CDN',      value:'Healthy',     status:'ok',   detail:'4 edge locations · 99.9%' },
  { label:'Payment Gateway',   value:'Healthy',     status:'ok',   detail:'₹0 failed today' },
  { label:'AI Optimization',   value:'Running',     status:'ok',   detail:'Models v2.4 · Last sync 4m' },
]

const PENDING_APPROVALS = [
  { brand:'Maruti Suzuki',   campaign:'Festive Auto Offer',  type:'Creative Review',   time:'2h ago',  priority:'high'   },
  { brand:'SBI Mutual Fund', campaign:'SIP Awareness Q2',   type:'Content Policy',    time:'4h ago',  priority:'medium' },
  { brand:'Tata Motors',     campaign:'Nexon EV Launch',    type:'Creative Review',   time:'6h ago',  priority:'high'   },
  { brand:'Flipkart',        campaign:'Big Billion Preview', type:'Schedule Approval', time:'1d ago',  priority:'low'    },
  { brand:'Godrej Consumer', campaign:'HIT Mosquito Summer', type:'Creative Review',  time:'1d ago',  priority:'medium' },
]

const StatusDot = ({ status }: { status: string }) => {
  const colors: Record<string,string> = { ok:'var(--mint)', warn:'var(--amber)', error:'var(--red)', offline:'var(--red)', active:'var(--mint)', maintenance:'var(--amber)' }
  const col = colors[status] || 'var(--t3)'
  return <div style={{ width: 8, height: 8, borderRadius: '50%', background: col, flexShrink: 0, boxShadow: `0 0 6px ${col}`, animation: 'zc-pulse-dot 2s ease-in-out infinite' }} />
}

function RevenueBarChart({ data }: { data: { month: string; revenue: number; target: number }[] }) {
  const maxRev = Math.max(...data.map(d => Math.max(d.revenue, d.target)))
  const W = 280, H = 90, barW = 28, gap = (W - data.length * barW) / (data.length + 1)
  return (
    <svg width={W} height={H + 20} style={{ overflow: 'visible' }}>
      {data.map((d, i) => {
        const x = gap + i * (barW + gap)
        const revH = (d.revenue / maxRev) * H
        const tgtH = (d.target / maxRev) * H
        return (
          <g key={i}>
            <rect x={x} y={H - tgtH} width={barW} height={tgtH} rx={3} fill="rgba(148,163,184,0.08)" />
            <rect x={x + 2} y={H - revH} width={barW - 4} height={revH} rx={3} fill="var(--purple)" opacity={0.7 + (i / data.length) * 0.3} />
            <text x={x + barW / 2} y={H + 14} textAnchor="middle" fontSize={9} fill="rgba(148,163,184,0.5)" fontFamily="DM Sans, sans-serif">{d.month}</text>
            <text x={x + barW / 2} y={H - revH - 4} textAnchor="middle" fontSize={8} fill="rgba(139,92,246,0.8)" fontFamily="JetBrains Mono, monospace">₹{d.revenue}L</text>
          </g>
        )
      })}
    </svg>
  )
}

export default function Screen6Admin({ onNavigate }: { onNavigate: (s: string) => void }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [screenSearch, setScreenSearch] = useState('')
  const [cityFilter, setCityFilter] = useState('All')

  const cities = ['All', ...Array.from(new Set(SCREEN_INVENTORY.map(s => s.city)))]
  const filteredScreens = SCREEN_INVENTORY.filter(s =>
    (cityFilter === 'All' || s.city === cityFilter) &&
    (s.id.toLowerCase().includes(screenSearch.toLowerCase()) || s.loc.toLowerCase().includes(screenSearch.toLowerCase()))
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <TopBar title="Operations" subtitle="Network management, approvals & system health"
        actions={
          <div style={{ display: 'flex', gap: 6 }}>
            {['overview','screens','approvals','revenue'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '6px 12px', borderRadius: 8, cursor: 'pointer', fontSize: 11, fontWeight: 500, background: activeTab === tab ? 'var(--purple-d)' : 'var(--b0)', border: `1px solid ${activeTab === tab ? 'var(--bglow)' : 'var(--b2)'}`, color: activeTab === tab ? 'var(--purple-l)' : 'var(--t2)', textTransform: 'capitalize', transition: 'all 0.15s' }}>{tab}</button>
            ))}
          </div>
        }
      />

      <div style={{ flex: 1, overflow: 'hidden', overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>

        {activeTab === 'overview' && <>
          <div style={{ display: 'flex', gap: 12 }}>
            <KPICard icon="screen"  label="Total Screens"      value="2,693"  sub="35 offline"          color="var(--purple)" delay={0} />
            <KPICard icon="zap"     label="Active Campaigns"   value="47"     sub="12 pending"          color="var(--blue)"   delay={60} />
            <KPICard icon="trending" label="MTD Revenue"       value="₹68.4L" sub="+23.1% MoM"          color="var(--mint)"   delay={120} />
            <KPICard icon="users"   label="Active Advertisers" value="284"    sub="12 new this month"   color="var(--cyan)"   delay={180} />
          </div>

          <div style={{ display: 'flex', gap: 16 }}>
            <div className="zc-glass-card" style={{ flex: 1 }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--b1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>System Health</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--mint)' }}><StatusDot status="ok" /> All systems operational</div>
              </div>
              {SYSTEM_HEALTH.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 16px', borderBottom: '1px solid var(--b0)' }}>
                  <StatusDot status={item.status} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--t1)' }}>{item.label}</div>
                    <div style={{ fontSize: 10, color: 'var(--t3)', marginTop: 1 }}>{item.detail}</div>
                  </div>
                  <div className="zc-mono" style={{ fontSize: 12, fontWeight: 600, color: item.status === 'ok' ? 'var(--mint)' : item.status === 'warn' ? 'var(--amber)' : 'var(--t2)' }}>{item.value}</div>
                </div>
              ))}
            </div>

            <div style={{ flex: '0 0 340px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div className="zc-glass-card" style={{ overflow: 'hidden' }}>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--b1)', fontSize: 13, fontWeight: 600 }}>Revenue vs Target</div>
                <div style={{ padding: '14px 16px' }}>
                  <RevenueBarChart data={REVENUE_DATA} />
                  <div style={{ display: 'flex', gap: 14, marginTop: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, color: 'var(--t3)' }}><div style={{ width: 10, height: 8, background: 'var(--purple)', borderRadius: 2, opacity: 0.8 }} /> Actual</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, color: 'var(--t3)' }}><div style={{ width: 10, height: 8, background: 'rgba(148,163,184,0.2)', borderRadius: 2 }} /> Target</div>
                  </div>
                </div>
              </div>

              <div className="zc-glass-card" style={{ flex: 1, overflow: 'hidden' }}>
                <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--b1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 12, fontWeight: 600 }}>Pending Approvals</span>
                  <span style={{ fontSize: 10, color: 'var(--amber)', fontWeight: 600, background: 'var(--amber-d)', padding: '2px 7px', borderRadius: 99 }}>{PENDING_APPROVALS.length}</span>
                </div>
                {PENDING_APPROVALS.map((a, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px', borderBottom: '1px solid var(--b0)', cursor: 'pointer' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(139,92,246,0.04)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--t1)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.brand}</div>
                      <div style={{ fontSize: 10, color: 'var(--t3)' }}>{a.type} · {a.time}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 5 }}>
                      <button style={{ padding: '3px 8px', borderRadius: 6, background: 'var(--mint-d)', border: '1px solid rgba(16,185,129,0.3)', color: 'var(--mint-l)', fontSize: 10, fontWeight: 600, cursor: 'pointer' }}>✓</button>
                      <button style={{ padding: '3px 8px', borderRadius: 6, background: 'var(--red-d)', border: '1px solid rgba(239,68,68,0.3)', color: 'var(--red-l)', fontSize: 10, fontWeight: 600, cursor: 'pointer' }}>✕</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>}

        {activeTab === 'screens' && (
          <div className="zc-glass-card" style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--b1)', display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', flexShrink: 0 }}>
              <div style={{ position: 'relative', flex: '0 0 200px' }}>
                <div style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', color: 'var(--t3)' }}><Icon name="search" size={12} /></div>
                <input value={screenSearch} onChange={e => setScreenSearch(e.target.value)} placeholder="Search screens…" style={{ width: '100%', height: 30, paddingLeft: 28, paddingRight: 10, background: 'var(--b0)', border: '1px solid var(--b2)', borderRadius: 7, color: 'var(--t1)', fontSize: 11 }} />
              </div>
              {cities.map(c => <button key={c} onClick={() => setCityFilter(c)} style={{ fontSize: 10, fontWeight: 600, padding: '3px 9px', borderRadius: 99, cursor: 'pointer', background: cityFilter === c ? 'var(--purple-d)' : 'transparent', border: `1px solid ${cityFilter === c ? 'var(--bglow)' : 'var(--b2)'}`, color: cityFilter === c ? 'var(--purple-l)' : 'var(--t3)', transition: 'all 0.15s' }}>{c}</button>)}
              <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--t3)' }}>{filteredScreens.length} screens</span>
            </div>
            <div style={{ flex: 1, overflowY: 'auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '90px 100px 1fr 90px 70px 60px 70px 70px', padding: '6px 16px', borderBottom: '1px solid var(--b1)', position: 'sticky', top: 0, background: 'var(--s1)', zIndex: 1 }}>
                {['Screen ID','City','Location','Type','Status','Size','CPM','Revenue'].map(h => <div key={h} style={{ fontSize: 9, color: 'var(--t3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</div>)}
              </div>
              {filteredScreens.map((s, i) => (
                <div key={s.id} style={{ display: 'grid', gridTemplateColumns: '90px 100px 1fr 90px 70px 60px 70px 70px', padding: '9px 16px', borderBottom: '1px solid var(--b0)', alignItems: 'center', cursor: 'pointer' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(139,92,246,0.04)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
                  <div className="zc-mono" style={{ fontSize: 11, color: 'var(--purple-l)', fontWeight: 600 }}>{s.id}</div>
                  <div style={{ fontSize: 11, color: 'var(--t2)' }}>{s.city}</div>
                  <div style={{ fontSize: 11, color: 'var(--t1)', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.loc}</div>
                  <div style={{ fontSize: 10, color: 'var(--t3)', background: 'var(--b1)', padding: '2px 7px', borderRadius: 99, width: 'fit-content' }}>{s.type}</div>
                  <div><StatusBadge status={s.status} /></div>
                  <div className="zc-mono" style={{ fontSize: 11, color: 'var(--t3)' }}>{s.size}</div>
                  <div className="zc-mono" style={{ fontSize: 11, color: 'var(--t1)' }}>{s.cpm}</div>
                  <div className="zc-mono" style={{ fontSize: 11, color: 'var(--mint-l)', fontWeight: 600 }}>{s.revenue}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'approvals' && (
          <div className="zc-glass-card" style={{ overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--b1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>Approval Queue</span>
              <button style={{ padding: '6px 12px', borderRadius: 8, background: 'var(--mint-d)', border: '1px solid rgba(16,185,129,0.3)', color: 'var(--mint-l)', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>Approve All</button>
            </div>
            {PENDING_APPROVALS.map((a, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', borderBottom: '1px solid var(--b0)' }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: a.priority === 'high' ? 'var(--red-d)' : a.priority === 'medium' ? 'var(--amber-d)' : 'var(--b1)', border: `1px solid ${a.priority === 'high' ? 'rgba(239,68,68,0.3)' : a.priority === 'medium' ? 'rgba(245,158,11,0.3)' : 'var(--b2)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name="tag" size={16} color={a.priority === 'high' ? 'var(--red)' : a.priority === 'medium' ? 'var(--amber)' : 'var(--t3)'} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 2 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--t1)' }}>{a.brand}</span>
                    <span style={{ fontSize: 10, color: 'var(--t3)', background: 'var(--b1)', padding: '1px 6px', borderRadius: 99 }}>{a.type}</span>
                    <span style={{ fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 99, background: a.priority === 'high' ? 'var(--red-d)' : a.priority === 'medium' ? 'var(--amber-d)' : 'var(--b1)', color: a.priority === 'high' ? 'var(--red)' : a.priority === 'medium' ? 'var(--amber)' : 'var(--t3)' }}>{a.priority}</span>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--t3)' }}>{a.campaign} · Submitted {a.time}</div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button style={{ padding: '7px 14px', borderRadius: 8, background: 'var(--mint-d)', border: '1px solid rgba(16,185,129,0.3)', color: 'var(--mint-l)', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Approve</button>
                  <button style={{ padding: '7px 14px', borderRadius: 8, background: 'var(--red-d)', border: '1px solid rgba(239,68,68,0.3)', color: 'var(--red)', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Reject</button>
                  <button style={{ padding: '7px 10px', borderRadius: 8, background: 'var(--b0)', border: '1px solid var(--b2)', color: 'var(--t2)', cursor: 'pointer' }}><Icon name="eye" size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'revenue' && (
          <div style={{ display: 'flex', gap: 16 }}>
            <div className="zc-glass-card" style={{ flex: 1, overflow: 'hidden' }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--b1)', fontSize: 13, fontWeight: 600 }}>Revenue Breakdown</div>
              <div style={{ padding: 16 }}>
                {[{label:'Screen Rental Revenue',value:'₹52.4L',pct:77,color:'var(--purple)'},{label:'Creative Services',value:'₹8.2L',pct:12,color:'var(--blue)'},{label:'Data & Analytics',value:'₹4.8L',pct:7,color:'var(--cyan)'},{label:'Platform & SaaS Fees',value:'₹3.0L',pct:4,color:'var(--mint)'}].map(({label,value,pct,color}) => (
                  <div key={label} style={{ marginBottom: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12 }}>
                      <span style={{ color: 'var(--t2)' }}>{label}</span>
                      <div style={{ display: 'flex', gap: 12 }}>
                        <span className="zc-mono" style={{ color: 'var(--t3)', fontSize: 11 }}>{pct}%</span>
                        <span className="zc-mono" style={{ color: 'var(--t1)', fontWeight: 600 }}>{value}</span>
                      </div>
                    </div>
                    <ProgressBar pct={pct} color={color} height={6} />
                  </div>
                ))}
              </div>
            </div>
            <div className="zc-glass-card" style={{ flex: '0 0 260px', padding: '14px 16px' }}>
              <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 14 }}>Payout Summary — May 2026</div>
              {[{label:'Gross Revenue',value:'₹68.4L',color:'var(--t1)'},{label:'Platform Fee (18%)',value:'–₹12.3L',color:'var(--red)'},{label:'GST (18%)',value:'–₹10.1L',color:'var(--amber)'},{label:'TDS (10%)',value:'–₹5.6L',color:'var(--amber)'},{label:'Net Payout',value:'₹40.4L',color:'var(--mint-l)'}].map(({label,value,color},i) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 4 ? '1px solid var(--b1)' : 'none', fontSize: 12 }}>
                  <span style={{ color: 'var(--t3)' }}>{label}</span>
                  <span className="zc-mono" style={{ fontWeight: i === 4 ? 700 : 600, color, fontSize: i === 4 ? 15 : 12 }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
