'use client'

import React, { useState } from 'react'
import { TopBar, KPICard, ProgressBar } from '../shared'

const MONTHS = ['Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May']
const REVENUE = [38.2,42.5,40.8,45.2,51.4,68.8,72.1,55.4,58.2,62.8,61.4,68.4]
const PREV_REV = [28.1,32.2,30.5,34.8,40.2,52.1,54.8,42.3,44.1,48.6,47.2,52.1]

const CITY_PERF = [
  { city:'Delhi NCR', revenue:12.4, impressions:8.2, screens:428, cpm:22.4, color:'#8B5CF6' },
  { city:'Mumbai',    revenue:11.2, impressions:7.1, screens:385, cpm:24.8, color:'#3B82F6' },
  { city:'Bengaluru', revenue:8.9,  impressions:5.8, screens:312, cpm:20.2, color:'#06B6D4' },
  { city:'Chennai',   revenue:7.1,  impressions:4.4, screens:245, cpm:18.6, color:'#10B981' },
  { city:'Hyderabad', revenue:6.4,  impressions:4.1, screens:218, cpm:19.4, color:'#F59E0B' },
  { city:'Kolkata',   revenue:5.8,  impressions:3.5, screens:196, cpm:17.2, color:'#A78BFA' },
  { city:'Pune',      revenue:5.1,  impressions:3.1, screens:178, cpm:18.0, color:'#60A5FA' },
  { city:'Ahmedabad', revenue:4.7,  impressions:2.8, screens:162, cpm:16.4, color:'#22D3EE' },
]

const CATEGORIES = [
  { cat:'Retail & FMCG',  pct:32, color:'#8B5CF6' },
  { cat:'Auto',           pct:18, color:'#3B82F6' },
  { cat:'Banking & BFSI', pct:15, color:'#06B6D4' },
  { cat:'Real Estate',    pct:12, color:'#10B981' },
  { cat:'Entertainment',  pct:11, color:'#F59E0B' },
  { cat:'Others',         pct:12, color:'#4E627C' },
]

function LineChart({ data, prevData, labels, width = 520, height = 160 }: { data: number[]; prevData: number[]; labels: string[]; width?: number; height?: number }) {
  const [hovered, setHovered] = useState<number|null>(null)
  const pad = { t: 16, r: 20, b: 28, l: 44 }
  const W = width - pad.l - pad.r, H = height - pad.t - pad.b
  const max = Math.max(...data, ...prevData) * 1.1, min = 0, range = max - min
  const toX = (i: number) => pad.l + (i / (data.length - 1)) * W
  const toY = (v: number) => pad.t + H - ((v - min) / range) * H
  const points = data.map((v, i) => [toX(i), toY(v)])
  const prevPoints = prevData.map((v, i) => [toX(i), toY(v)])
  const polyStr = points.map(([x, y]) => `${x},${y}`).join(' ')
  const areaStr = `${pad.l},${pad.t + H} ${polyStr} ${pad.l + W},${pad.t + H}`
  const prevStr = prevPoints.map(([x, y]) => `${x},${y}`).join(' ')
  const gridLines = [0,0.25,0.5,0.75,1].map(f => ({ y: pad.t + H - f * H, val: (min + f * range).toFixed(0) }))

  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet" style={{ overflow: 'visible' }}
      onMouseMove={e => {
        const rect = e.currentTarget.getBoundingClientRect()
        const mx = (e.clientX - rect.left) * (width / rect.width)
        let closest = 0, minDist = Infinity
        points.forEach(([x], i) => { const d = Math.abs(x - mx); if (d < minDist) { minDist = d; closest = i } })
        setHovered(closest)
      }}
      onMouseLeave={() => setHovered(null)}>
      <defs>
        <linearGradient id="zcLineArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
        </linearGradient>
      </defs>
      {gridLines.map(({ y, val }) => (
        <g key={y}>
          <line x1={pad.l} x2={pad.l + W} y1={y} y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
          <text x={pad.l - 6} y={y + 3.5} fontSize={9} fill="rgba(148,163,184,0.5)" textAnchor="end" fontFamily="JetBrains Mono, monospace">₹{val}L</text>
        </g>
      ))}
      <polyline points={prevStr} fill="none" stroke="rgba(148,163,184,0.18)" strokeWidth={1.2} strokeDasharray="4 3" />
      <polygon points={areaStr} fill="url(#zcLineArea)" />
      <polyline points={polyStr} fill="none" stroke="#8B5CF6" strokeWidth={2.2} strokeLinejoin="round" strokeLinecap="round" />
      {points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={hovered === i ? 5 : 3} fill={hovered === i ? '#8B5CF6' : '#0B1C32'} stroke="#8B5CF6" strokeWidth={1.8} />
      ))}
      {hovered !== null && (
        <g>
          <line x1={points[hovered][0]} x2={points[hovered][0]} y1={pad.t} y2={pad.t + H} stroke="rgba(139,92,246,0.3)" strokeWidth={1} strokeDasharray="3 2" />
          <rect x={points[hovered][0] - 34} y={pad.t} width={68} height={34} rx={6} fill="rgba(7,21,40,0.95)" stroke="rgba(139,92,246,0.3)" strokeWidth={1} />
          <text x={points[hovered][0]} y={pad.t + 13} fontSize={9} fill="#A78BFA" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontWeight="700">₹{data[hovered]}L</text>
          <text x={points[hovered][0]} y={pad.t + 26} fontSize={8.5} fill="rgba(148,163,184,0.7)" textAnchor="middle" fontFamily="DM Sans, sans-serif">{labels[hovered]}</text>
        </g>
      )}
      {labels.map((l, i) => (
        <text key={i} x={toX(i)} y={height - 4} fontSize={9} fill="rgba(148,163,184,0.45)" textAnchor="middle" fontFamily="DM Sans, sans-serif">{l}</text>
      ))}
    </svg>
  )
}

function DonutChart({ data, size = 120 }: { data: { cat: string; pct: number; color: string }[]; size?: number }) {
  const [hovered, setHovered] = useState<number|null>(null)
  const cx = size / 2, cy = size / 2, r = size * 0.36, stroke = size * 0.12
  const circ = 2 * Math.PI * r
  let offset = 0
  const segments = data.map((d) => {
    const dash = (d.pct / 100) * circ
    const seg = { ...d, dash, offset }
    offset += dash
    return seg
  })
  return (
    <svg width={size} height={size}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={stroke} />
      {segments.map((seg, i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={seg.color} strokeWidth={hovered === i ? stroke + 2 : stroke} strokeDasharray={`${seg.dash - 1.5} ${circ - seg.dash + 1.5}`} strokeDashoffset={-seg.offset} strokeLinecap="butt"
          style={{ transform: 'rotate(-90deg)', transformOrigin: `${cx}px ${cy}px`, transition: 'stroke-width 0.15s', cursor: 'pointer' }}
          onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} />
      ))}
      <text x={cx} y={cy - 4} textAnchor="middle" fontSize={hovered !== null ? 14 : 18} fontWeight="700" fill={hovered !== null ? data[hovered]?.color : 'white'} fontFamily="JetBrains Mono, monospace">
        {hovered !== null ? `${data[hovered].pct}%` : '₹68.4L'}
      </text>
      <text x={cx} y={cy + 12} textAnchor="middle" fontSize={8} fill="rgba(148,163,184,0.5)" fontFamily="DM Sans, sans-serif">
        {hovered !== null ? data[hovered].cat : 'Total Rev'}
      </text>
    </svg>
  )
}

export default function Screen4Analytics({ onNavigate }: { onNavigate: (s: string) => void }) {
  const [timeRange, setTimeRange] = useState('12m')
  const [metric, setMetric] = useState('revenue')
  const totalRevenue = REVENUE.reduce((a, b) => a + b, 0).toFixed(1)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <style>{`
        .s4-kpi-row   { display: flex; gap: 12px; flex-shrink: 0; }
        .s4-chart-row { display: flex; gap: 16px; flex-shrink: 0; }
        .s4-city-row  { display: flex; align-items: center; gap: 12px; padding: 10px 16px; border-bottom: 1px solid var(--b0); }
        @media (max-width: 767px) {
          .s4-kpi-row   { flex-wrap: wrap; }
          .s4-kpi-row > * { flex: 1 1 45%; min-width: 0; }
          .s4-chart-row { flex-direction: column; }
          .s4-city-row  { flex-wrap: wrap; gap: 6px; }
          .s4-city-bar  { flex: 1 1 100% !important; }
          .s4-city-pct  { display: none; }
        }
      `}</style>
      <TopBar title="Analytics" subtitle="Revenue, reach & performance intelligence"
        actions={
          <div style={{ display: 'flex', gap: 6 }}>
            {['7d','30d','3m','12m','YTD'].map(r => (
              <button key={r} onClick={() => setTimeRange(r)} style={{ padding: '5px 10px', borderRadius: 7, cursor: 'pointer', fontSize: 11, fontWeight: 600, background: timeRange === r ? 'var(--purple-d)' : 'var(--b0)', border: `1px solid ${timeRange === r ? 'var(--bglow)' : 'var(--b2)'}`, color: timeRange === r ? 'var(--purple-l)' : 'var(--t3)', transition: 'all 0.15s' }}>{r}</button>
            ))}
          </div>
        }
      />

      <div style={{ flex: 1, overflow: 'hidden', overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="s4-kpi-row">
          <KPICard icon="trending" label="Total Revenue"     value={`₹${totalRevenue}L`} change="+23.1%" color="var(--purple)" delay={0} />
          <KPICard icon="eye"      label="Total Impressions" value="4.28Cr"               change="+18.4%" color="var(--blue)"   delay={60} />
          <KPICard icon="target"   label="Avg CPM"           value="₹21.4"               change="+4.2%"  color="var(--cyan)"   delay={120} />
          <KPICard icon="screen"   label="Screen Utilisation" value="83%"                change="+6.8%"  color="var(--mint)"   delay={180} />
        </div>

        <div className="s4-chart-row">
          <div className="zc-glass-card" style={{ flex: 1, overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--b1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>Revenue Trend</div>
                <div style={{ fontSize: 10, color: 'var(--t3)', marginTop: 1 }}>Monthly · vs prior year</div>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                {[{col:'var(--purple)',dash:false,lbl:'FY 2026'},{col:'rgba(148,163,184,0.4)',dash:true,lbl:'FY 2025'}].map(({col,dash,lbl}) => (
                  <div key={lbl} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, color: 'var(--t3)' }}>
                    <div style={{ width: 20, height: 1.5, background: col, borderRadius: 1, ...(dash ? { borderTop: '1px dashed' } : {}) }} /> {lbl}
                  </div>
                ))}
              </div>
            </div>
            <div className="zc-scroll-x" style={{ padding: '14px 10px 10px', height: 185 }}>
              <LineChart data={REVENUE} prevData={PREV_REV} labels={MONTHS} width={520} height={160} />
            </div>
          </div>

          <div className="zc-glass-card" style={{ flex: '0 0 280px', overflow: 'hidden' }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--b1)', fontSize: 13, fontWeight: 600 }}>Revenue by Category</div>
            <div style={{ display: 'flex', gap: 16, padding: '16px', alignItems: 'center' }}>
              <DonutChart data={CATEGORIES} size={110} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {CATEGORIES.map(c => (
                  <div key={c.cat} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', flexShrink: 0, background: c.color }} />
                    <span style={{ flex: 1, fontSize: 10, color: 'var(--t2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.cat}</span>
                    <span className="zc-mono" style={{ fontSize: 10, color: 'var(--t1)', fontWeight: 600 }}>{c.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="zc-glass-card">
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--b1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>City Performance</span>
            <div style={{ display: 'flex', gap: 6 }}>
              {['revenue','impressions','cpm'].map(m => (
                <button key={m} onClick={() => setMetric(m)} style={{ fontSize: 10, fontWeight: 600, padding: '3px 9px', borderRadius: 99, cursor: 'pointer', background: metric === m ? 'var(--blue-d)' : 'transparent', border: `1px solid ${metric === m ? 'rgba(59,130,246,0.3)' : 'var(--b2)'}`, color: metric === m ? 'var(--blue-l)' : 'var(--t3)', textTransform: 'capitalize', transition: 'all 0.15s' }}>{m}</button>
              ))}
            </div>
          </div>
          <div style={{ padding: '0 0 4px' }}>
            {CITY_PERF.map((row, i) => {
              const maxVal = metric === 'revenue' ? 12.4 : metric === 'impressions' ? 8.2 : 24.8
              const val = metric === 'revenue' ? row.revenue : metric === 'impressions' ? row.impressions : row.cpm
              const pct = (val / maxVal) * 100
              const displayVal = metric === 'revenue' ? `₹${val}L` : metric === 'impressions' ? `${val}Cr` : `₹${val}`
              return (
                <div key={row.city} className="s4-city-row">
                  <div style={{ flex: '0 0 100px', fontSize: 12, fontWeight: 600, color: 'var(--t1)' }}>{row.city}</div>
                  <div className="s4-city-pct" style={{ flex: '0 0 42px', fontSize: 10, color: 'var(--t3)', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>{row.screens}</div>
                  <div className="s4-city-bar" style={{ flex: 1 }}>
                    <ProgressBar pct={pct} color={row.color} height={5} />
                  </div>
                  <div className="zc-mono" style={{ flex: '0 0 60px', fontSize: 13, fontWeight: 700, color: 'var(--t1)', textAlign: 'right' }}>{displayVal}</div>
                  <div className="s4-city-pct" style={{ flex: '0 0 52px', fontSize: 10, color: 'var(--mint)', textAlign: 'right', fontWeight: 600 }}>+{(8 + i * 1.5).toFixed(1)}%</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
