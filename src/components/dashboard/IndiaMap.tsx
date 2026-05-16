'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Icon } from './shared'

const X = (lon: number) => ((lon - 67) * 15.625)
const Y = (lat: number) => ((37.5 - lat) * 18.67)
const pt = ([lon, lat]: [number, number]) => `${X(lon).toFixed(1)},${Y(lat).toFixed(1)}`

const IND_BORDER: [number, number][] = [
  [73.9,36.9],[74.5,36.7],[75.5,36.5],[76.0,36.2],[77.0,35.8],[78.0,35.5],
  [78.5,35.2],[79.0,34.8],[79.5,34.5],[80.0,34.0],[80.5,33.7],[81.0,33.2],
  [81.5,32.8],[82.0,32.5],[80.2,30.5],[80.5,30.2],[81.5,30.0],[82.5,29.5],
  [84.0,27.5],[86.5,27.5],[87.0,27.2],[88.0,27.5],[89.0,27.5],[90.0,27.5],
  [91.5,27.5],[92.5,27.5],[94.0,28.0],[95.5,28.0],[97.0,28.5],
  [97.5,27.5],[96.5,27.0],[96.0,26.0],[95.5,25.8],[95.0,25.5],
  [94.5,25.0],[94.0,24.5],[93.5,24.0],[93.2,23.5],[92.8,23.0],
  [92.5,22.8],[92.0,22.5],[91.5,22.0],[90.0,22.0],[89.0,22.0],
  [88.5,22.0],[88.0,21.7],[87.5,21.5],[87.0,21.0],[86.5,20.5],
  [86.0,20.0],[85.5,19.8],[85.0,19.2],[84.5,18.5],[84.0,18.0],
  [83.5,17.5],[83.0,17.5],[82.5,17.0],[82.0,16.5],[81.5,16.2],
  [81.0,16.0],[80.5,15.5],[80.2,14.8],[80.3,13.5],[80.2,13.0],
  [80.0,12.0],[79.8,11.5],[79.5,11.0],[79.5,10.5],[79.0,9.5],
  [78.5,9.0],[78.0,8.5],[77.5,8.1],
  [77.0,8.3],[76.8,9.0],[76.5,9.5],[76.2,10.0],[76.0,10.5],
  [76.0,11.5],[75.8,12.0],[75.5,12.5],[75.2,13.0],
  [74.8,13.5],[74.5,14.0],[74.2,14.5],[74.0,15.0],[73.8,15.5],
  [73.5,16.0],[73.2,16.5],[73.0,17.0],
  [72.8,17.5],[72.8,18.0],[72.8,19.0],[72.8,19.5],[72.5,20.0],
  [72.5,20.5],[72.5,21.0],[72.2,21.5],[72.0,21.8],[72.0,22.0],
  [71.5,21.5],[71.0,21.0],[70.5,21.0],[70.0,21.0],[69.5,21.0],
  [69.2,21.3],[69.0,21.8],[69.0,22.3],[69.5,22.8],[70.0,23.0],
  [70.5,23.0],[71.0,23.0],[70.5,23.3],[70.0,23.5],[69.5,23.5],
  [69.0,23.5],[68.5,23.5],[68.0,23.5],[68.0,24.0],
  [68.5,24.5],[69.5,24.5],[70.0,24.5],[70.5,25.0],
  [71.0,26.0],[71.0,27.0],[71.0,28.0],[71.5,29.0],[71.5,30.0],
  [72.0,31.0],[72.5,32.0],[73.0,33.0],[73.5,34.0],
  [73.0,35.0],[73.5,36.0],[73.9,36.9],
]
const INDIA_PATH = 'M ' + IND_BORDER.map(pt).join(' L ') + ' Z'

const RIVERS = [
  { name:'Ganga',       pts:[[78.0,30.0],[80.5,29.0],[82.0,27.5],[84.5,26.0],[86.5,25.5],[88.2,22.0]] as [number,number][], col:'rgba(99,179,237,0.45)' },
  { name:'Yamuna',      pts:[[77.5,30.5],[77.5,28.5],[79.0,27.0],[81.0,25.5]] as [number,number][], col:'rgba(99,179,237,0.35)' },
  { name:'Brahmaputra', pts:[[95.0,27.5],[93.0,27.2],[91.5,27.0],[90.0,26.5],[89.5,25.0]] as [number,number][], col:'rgba(99,179,237,0.40)' },
  { name:'Godavari',    pts:[[73.5,20.0],[76.5,19.5],[79.5,18.5],[81.5,17.0],[82.0,16.5]] as [number,number][], col:'rgba(99,179,237,0.30)' },
  { name:'Narmada',     pts:[[79.5,22.5],[77.5,22.5],[75.5,22.0],[73.5,21.7],[73.0,21.7]] as [number,number][], col:'rgba(99,179,237,0.30)' },
  { name:'Cauvery',     pts:[[75.5,12.5],[77.0,12.0],[78.5,11.5],[79.5,11.0]] as [number,number][], col:'rgba(99,179,237,0.22)' },
]
const riverPath = (pts: [number,number][]) => 'M ' + pts.map(pt).join(' L ')

const STATE_BORDERS: [number,number][][] = [
  [[72.5,24.0],[73.5,24.5],[74.5,25.5],[75.0,26.5],[75.5,27.5]],
  [[77.5,27.5],[78.0,26.0],[79.0,25.0],[80.0,24.5]],
  [[74.0,22.5],[76.0,21.5],[78.5,21.5],[80.0,21.5],[81.5,21.0]],
  [[79.5,13.5],[79.0,12.5],[78.5,12.0],[78.0,11.0]],
  [[77.5,31.5],[78.5,31.5],[79.5,31.0],[80.5,30.5]],
]

export interface City {
  id: string; name: string; state: string; lon: number; lat: number
  screens: number; occupancy: number; revenue: string; revNum: number
  color: string; tier: number; x: number; y: number
}

export const CITIES: City[] = [
  { id:'del', name:'Delhi',        state:'Delhi NCR',      lon:77.2, lat:28.6, screens:428, occupancy:89, revenue:'₹12.4L', revNum:12.4, color:'#8B5CF6', tier:1, x:0, y:0 },
  { id:'mum', name:'Mumbai',       state:'Maharashtra',    lon:72.8, lat:18.9, screens:385, occupancy:92, revenue:'₹11.2L', revNum:11.2, color:'#3B82F6', tier:1, x:0, y:0 },
  { id:'blr', name:'Bengaluru',    state:'Karnataka',      lon:77.6, lat:12.97,screens:312, occupancy:85, revenue:'₹8.9L',  revNum:8.9,  color:'#06B6D4', tier:1, x:0, y:0 },
  { id:'chn', name:'Chennai',      state:'Tamil Nadu',     lon:80.3, lat:13.1, screens:245, occupancy:78, revenue:'₹7.1L',  revNum:7.1,  color:'#10B981', tier:1, x:0, y:0 },
  { id:'hyd', name:'Hyderabad',    state:'Telangana',      lon:78.5, lat:17.4, screens:218, occupancy:82, revenue:'₹6.4L',  revNum:6.4,  color:'#F59E0B', tier:1, x:0, y:0 },
  { id:'kol', name:'Kolkata',      state:'West Bengal',    lon:88.4, lat:22.6, screens:196, occupancy:74, revenue:'₹5.8L',  revNum:5.8,  color:'#A78BFA', tier:2, x:0, y:0 },
  { id:'pun', name:'Pune',         state:'Maharashtra',    lon:73.9, lat:18.5, screens:178, occupancy:80, revenue:'₹5.1L',  revNum:5.1,  color:'#60A5FA', tier:2, x:0, y:0 },
  { id:'ahm', name:'Ahmedabad',    state:'Gujarat',        lon:72.6, lat:23.0, screens:162, occupancy:76, revenue:'₹4.7L',  revNum:4.7,  color:'#22D3EE', tier:2, x:0, y:0 },
  { id:'jai', name:'Jaipur',       state:'Rajasthan',      lon:75.8, lat:26.9, screens:134, occupancy:70, revenue:'₹3.9L',  revNum:3.9,  color:'#34D399', tier:2, x:0, y:0 },
  { id:'lko', name:'Lucknow',      state:'Uttar Pradesh',  lon:80.9, lat:26.8, screens:128, occupancy:68, revenue:'₹3.6L',  revNum:3.6,  color:'#FCD34D', tier:2, x:0, y:0 },
  { id:'chd', name:'Chandigarh',   state:'Punjab/Haryana', lon:76.8, lat:30.7, screens:98,  occupancy:72, revenue:'₹2.8L',  revNum:2.8,  color:'#8B5CF6', tier:3, x:0, y:0 },
  { id:'srt', name:'Surat',        state:'Gujarat',        lon:72.8, lat:21.2, screens:92,  occupancy:67, revenue:'₹2.6L',  revNum:2.6,  color:'#3B82F6', tier:3, x:0, y:0 },
  { id:'nag', name:'Nagpur',       state:'Maharashtra',    lon:79.1, lat:21.1, screens:88,  occupancy:64, revenue:'₹2.5L',  revNum:2.5,  color:'#06B6D4', tier:3, x:0, y:0 },
  { id:'ind', name:'Indore',       state:'Madhya Pradesh', lon:75.9, lat:22.7, screens:82,  occupancy:62, revenue:'₹2.3L',  revNum:2.3,  color:'#10B981', tier:3, x:0, y:0 },
  { id:'koc', name:'Kochi',        state:'Kerala',         lon:76.3, lat:9.9,  screens:75,  occupancy:71, revenue:'₹2.1L',  revNum:2.1,  color:'#F59E0B', tier:3, x:0, y:0 },
  { id:'vis', name:'Visakhapatnam',state:'Andhra Pradesh', lon:83.3, lat:17.7, screens:68,  occupancy:65, revenue:'₹1.9L',  revNum:1.9,  color:'#A78BFA', tier:3, x:0, y:0 },
].map(c => ({ ...c, x: X(c.lon), y: Y(c.lat) }))

const CONNECTIONS: [string, string][] = [
  ['del','mum'],['del','blr'],['del','kol'],['mum','blr'],
  ['blr','chn'],['mum','hyd'],['del','hyd'],['blr','koc'],
  ['ahm','mum'],['del','chd'],['del','lko'],['kol','chn'],
]

const CityCard = ({ city, svgRect }: { city: City; svgRect: DOMRect }) => {
  const CARD_W = 220, CARD_H = 192
  const scaleX = svgRect.width / 500, scaleY = svgRect.height / 560
  let cx = city.x * scaleX + 24
  let cy = city.y * scaleY - 20
  if (cx + CARD_W > svgRect.width) cx = city.x * scaleX - CARD_W - 10
  if (cy + CARD_H > svgRect.height) cy = svgRect.height - CARD_H - 8
  if (cy < 0) cy = 8
  const col = city.color
  const bars = [65,80,72,88,75,91,84]
  return (
    <div style={{ position: 'absolute', left: cx, top: cy, width: CARD_W, zIndex: 20, pointerEvents: 'auto' }}>
      <div style={{ background: 'rgba(6,16,34,0.97)', border: `1px solid ${col}40`, borderRadius: 12, padding: '14px 16px', boxShadow: `0 8px 32px rgba(0,0,0,0.7), 0 0 20px ${col}20`, backdropFilter: 'blur(20px)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--t1)', letterSpacing: '-0.01em' }}>{city.name}</div>
            <div style={{ fontSize: 10, color: 'var(--t3)', marginTop: 1 }}>{city.state}</div>
          </div>
          <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 99, color: col, background: `${col}18`, border: `1px solid ${col}30` }}>T{city.tier}</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
          {[{label:'Screens',value:city.screens},{label:'Occupancy',value:`${city.occupancy}%`},{label:'Revenue/mo',value:city.revenue},{label:'Avg CPM',value:'₹18.4'}].map(({label,value}) => (
            <div key={label} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 7, padding: '6px 8px' }}>
              <div style={{ fontSize: 9, color: 'var(--t3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>{label}</div>
              <div className="zc-mono" style={{ fontSize: 13, fontWeight: 600, color: 'var(--t1)' }}>{value}</div>
            </div>
          ))}
        </div>
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 9, color: 'var(--t3)', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.06em' }}>7-Day Occupancy</div>
          <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 28 }}>
            {bars.map((h,i) => <div key={i} style={{ flex: 1, height: `${h}%`, background: col, opacity: 0.4+(i/bars.length)*0.6, borderRadius: 2 }} />)}
          </div>
        </div>
        <button style={{ width: '100%', padding: '8px', borderRadius: 8, cursor: 'pointer', background: `linear-gradient(90deg, ${col}CC, ${col}88)`, border: `1px solid ${col}50`, color: 'white', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          Book Screens in {city.name}
          <Icon name="arrow_r" size={12} />
        </button>
      </div>
    </div>
  )
}

export const IndiaMap = ({ selectedCities = [], onCitySelect, compact = false }: { selectedCities?: string[]; onCitySelect?: (city: City) => void; compact?: boolean }) => {
  const [hoveredCity, setHoveredCity] = useState<City | null>(null)
  const [animFrame, setAnimFrame] = useState(0)
  const [svgRect, setSvgRect] = useState<DOMRect | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const id = setInterval(() => setAnimFrame(f => (f + 1) % 100), 80)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const update = () => { if (svgRef.current) setSvgRect(svgRef.current.getBoundingClientRect()) }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const cityById = (id: string) => CITIES.find(c => c.id === id)

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: compact ? 280 : 400 }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', pointerEvents: 'none', background: 'radial-gradient(ellipse at 40% 60%, rgba(6,182,212,0.06) 0%, rgba(59,130,246,0.04) 40%, transparent 70%)' }} />
      <svg ref={svgRef} viewBox="0 0 500 560" style={{ width: '100%', height: '100%', overflow: 'visible' }} preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="zcIndiaFill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%"   stopColor="#0D2040" />
            <stop offset="35%"  stopColor="#0A1C38" />
            <stop offset="100%" stopColor="#071428" />
          </linearGradient>
          <linearGradient id="zcHimalaya" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1A3058" />
            <stop offset="100%" stopColor="#0D2040" />
          </linearGradient>
          <radialGradient id="zcAmbient" cx="45%" cy="50%" r="40%">
            <stop offset="0%" stopColor="rgba(139,92,246,0.07)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <filter id="zcCityGlow"><feGaussianBlur stdDeviation="2.5" result="blur"/><feComposite in="SourceGraphic" in2="blur" operator="over"/></filter>
          <filter id="zcRiverBlur"><feGaussianBlur stdDeviation="0.5"/></filter>
          <clipPath id="zcIndiaClip"><path d={INDIA_PATH} /></clipPath>
        </defs>

        <rect x="0" y="0" width="500" height="560" fill="rgba(6,182,212,0.015)" />
        <ellipse cx="220" cy="290" rx="180" ry="200" fill="url(#zcAmbient)" />
        <path d={INDIA_PATH} fill="url(#zcIndiaFill)" stroke="rgba(99,179,237,0.22)" strokeWidth="0.8" />
        <rect x="0" y="0" width="500" height={Y(30).toFixed(1)} fill="url(#zcHimalaya)" opacity="0.45" clipPath="url(#zcIndiaClip)" />

        {STATE_BORDERS.map((pts, i) => (
          <polyline key={i} points={pts.map(pt).join(' ')} fill="none" stroke="rgba(148,163,200,0.10)" strokeWidth="0.6" strokeDasharray="3 3" />
        ))}

        {RIVERS.map(r => (
          <path key={r.name} d={riverPath(r.pts)} fill="none" stroke={r.col} strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" filter="url(#zcRiverBlur)" />
        ))}

        {CONNECTIONS.map(([a, b], i) => {
          const ca = cityById(a), cb = cityById(b)
          if (!ca || !cb) return null
          const isActive = selectedCities.includes(a) || selectedCities.includes(b)
          const mx = (ca.x + cb.x) / 2, my = (ca.y + cb.y) / 2 - 22
          const pathD = `M ${ca.x},${ca.y} Q ${mx},${my} ${cb.x},${cb.y}`
          const dashOffset = -((animFrame * 0.8 + i * 10) % 40)
          return (
            <g key={`${a}-${b}`}>
              {isActive && <path d={pathD} fill="none" stroke="rgba(139,92,246,0.12)" strokeWidth={3} />}
              <path d={pathD} fill="none" stroke={isActive ? 'rgba(139,92,246,0.40)' : 'rgba(99,179,237,0.10)'} strokeWidth={isActive ? 1.3 : 0.7} strokeDasharray="6 5" strokeDashoffset={dashOffset} />
            </g>
          )
        })}

        {CITIES.map((city, i) => {
          const isHovered = hoveredCity?.id === city.id
          const isSelected = selectedCities.includes(city.id)
          const isActive = isHovered || isSelected
          const col = city.color
          const dotR = city.tier === 1 ? 6 : city.tier === 2 ? 5 : 4
          const ringR = city.tier === 1 ? 13 : city.tier === 2 ? 10 : 8
          const pulseDelay = `${(i * 0.4) % 2.5}s`
          return (
            <g key={city.id} style={{ cursor: 'pointer' }} onMouseEnter={() => setHoveredCity(city)} onMouseLeave={() => setHoveredCity(null)} onClick={() => onCitySelect && onCitySelect(city)}>
              <circle cx={city.x} cy={city.y} r={city.revNum * 3.5} fill={col} opacity={0.045} />
              {city.tier <= 2 && (
                <circle cx={city.x} cy={city.y} r={ringR} fill="none" stroke={col} strokeWidth={0.9} opacity={isActive ? 0.55 : 0.18}
                  style={{ animation: `zc-pulse-ring 2.5s ease-out ${pulseDelay} infinite`, transformOrigin: `${city.x}px ${city.y}px` }} />
              )}
              <circle cx={city.x} cy={city.y} r={isActive ? dotR+5 : dotR+2} fill={col} opacity={isActive ? 0.18 : 0.07} style={{ transition: 'all 0.2s' }} />
              <circle cx={city.x} cy={city.y} r={isActive ? dotR+1.5 : dotR} fill={col} filter="url(#zcCityGlow)"
                style={{ animation: `zc-pulse-dot 2s ease-in-out ${pulseDelay} infinite`, transformOrigin: `${city.x}px ${city.y}px`, transition: 'r 0.2s' }} />
              <circle cx={city.x} cy={city.y} r={dotR * 0.42} fill="white" opacity={0.92} />
              {(city.tier <= 2 || isActive) && (
                <g>
                  <text x={city.x + dotR + 5} y={city.y + 1} fontSize={city.tier===1 ? 8.5 : 7.5} fill={isActive ? col : 'rgba(200,220,255,0.68)'} fontFamily="'DM Sans',sans-serif" fontWeight={isActive ? 700 : 500}>{city.name}</text>
                  {(isActive || city.tier===1) && (
                    <text x={city.x + dotR + 5} y={city.y + 10} fontSize={6.5} fill="rgba(148,163,200,0.5)" fontFamily="'JetBrains Mono',monospace">{city.screens} screens</text>
                  )}
                </g>
              )}
            </g>
          )
        })}

        {!compact && <>
          <text x={80} y={400} fontSize={9} fill="rgba(99,179,237,0.25)" fontFamily="'DM Sans',sans-serif" fontStyle="italic" transform="rotate(-10,80,400)">Arabian Sea</text>
          <text x={340} y={380} fontSize={9} fill="rgba(99,179,237,0.25)" fontFamily="'DM Sans',sans-serif" fontStyle="italic">Bay of Bengal</text>
          <text x={185} y={540} fontSize={9} fill="rgba(99,179,237,0.22)" fontFamily="'DM Sans',sans-serif" fontStyle="italic">Indian Ocean</text>
          <text x={115} y={38} fontSize={8} fill="rgba(148,163,200,0.30)" fontFamily="'DM Sans',sans-serif" fontStyle="italic" letterSpacing="1">HIMALAYAS</text>
        </>}
      </svg>

      {hoveredCity && svgRect && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ pointerEvents: 'auto', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
            <CityCard city={hoveredCity} svgRect={svgRect} />
          </div>
        </div>
      )}

      {!compact && (
        <div style={{ position: 'absolute', bottom: 12, left: 12, background: 'rgba(4,14,28,0.92)', backdropFilter: 'blur(8px)', border: '1px solid var(--b1)', borderRadius: 8, padding: '8px 12px' }}>
          <div style={{ fontSize: 9, color: 'var(--t3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Inventory</div>
          {[{col:'#8B5CF6',label:'Tier 1 · 400+ screens'},{col:'#06B6D4',label:'Tier 2 · 100–400'},{col:'#94A3B8',label:'Tier 3 · < 100'}].map(({col,label}) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, color: 'var(--t2)', marginBottom: 2 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: col, boxShadow: `0 0 6px ${col}`, flexShrink: 0 }} />{label}
            </div>
          ))}
        </div>
      )}

      {!compact && (
        <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(4,14,28,0.92)', backdropFilter: 'blur(8px)', border: '1px solid var(--b1)', borderRadius: 8, padding: '8px 12px' }}>
          <div style={{ fontSize: 9, color: 'var(--t3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 5 }}>Live Network</div>
          <div className="zc-mono" style={{ fontSize: 18, fontWeight: 700, lineHeight: 1, background: 'linear-gradient(135deg, var(--purple-l), var(--cyan-l))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>2,693</div>
          <div style={{ fontSize: 10, color: 'var(--t2)', marginTop: 2 }}>screens · 16 cities</div>
          <div style={{ height: 1, background: 'var(--b1)', margin: '6px 0' }} />
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--mint)', animation: 'zc-pulse-dot 1.5s ease-in-out infinite' }} />
            <span style={{ fontSize: 10, color: 'var(--mint)' }}>89% avg occupancy</span>
          </div>
        </div>
      )}
    </div>
  )
}
