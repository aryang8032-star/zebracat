'use client'

import React, { useState } from 'react'
import { Icon, TopBar, ProgressBar } from '../shared'
import { IndiaMap, type City } from '../IndiaMap'

const TIME_SLOTS = ['06:00–08:00','08:00–10:00','10:00–12:00','12:00–14:00','14:00–16:00','16:00–18:00','18:00–20:00','20:00–22:00','22:00–00:00']
const SLOT_PRICES: Record<string,number> = { '06:00–08:00':800,'08:00–10:00':1400,'10:00–12:00':1100,'12:00–14:00':950,'14:00–16:00':900,'16:00–18:00':1300,'18:00–20:00':1800,'20:00–22:00':2100,'22:00–00:00':1500 }
const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']

const SCREEN_TYPES = [
  { id:'billboard', label:'Digital Billboards',  icon:'screen' as const, count:842, cpm:'₹18–28', desc:'High-impact roadside, 6×4m format' },
  { id:'mall',      label:'Mall Atrium',          icon:'layers' as const, count:315, cpm:'₹24–42', desc:'Indoor premium environments' },
  { id:'transit',   label:'Transit Hubs',         icon:'pin' as const,    count:428, cpm:'₹20–35', desc:'Metro, railway, airport screens' },
  { id:'gym',       label:'Premium Gyms & Clubs', icon:'target' as const, count:204, cpm:'₹32–56', desc:'Affluent audience concentration' },
]

const CITY_LIST = [
  { id:'del', name:'Delhi NCR',  screens:428, cpm:'₹22', available:344 },
  { id:'mum', name:'Bhopal',     screens:385, cpm:'₹25', available:298 },
  { id:'blr', name:'Bengaluru',  screens:312, cpm:'₹20', available:265 },
  { id:'chn', name:'Chennai',    screens:245, cpm:'₹18', available:191 },
  { id:'hyd', name:'Hyderabad',  screens:218, cpm:'₹19', available:179 },
  { id:'kol', name:'Kolkata',    screens:196, cpm:'₹17', available:145 },
  { id:'pun', name:'Pune',       screens:178, cpm:'₹18', available:142 },
  { id:'ahm', name:'Ahmedabad',  screens:162, cpm:'₹16', available:124 },
]

const StepIndicator = ({ steps, current }: { steps: { label: string; sub: string }[]; current: number }) => (
  <>
    <style>{`
      .s2-step-label { display: block; }
      .s2-step-sub   { display: block; }
      @media (max-width: 767px) {
        .s2-step-label { display: none; }
        .s2-step-sub   { display: none; }
        .s2-step-connector { min-width: 12px !important; margin: 0 6px !important; }
      }
    `}</style>
    <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
      {steps.map((step, i) => {
        const done = i < current, active = i === current
        return (
          <React.Fragment key={i}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: done ? 'var(--mint)' : active ? 'var(--purple)' : 'var(--b1)', border: `2px solid ${done ? 'var(--mint)' : active ? 'var(--purple)' : 'var(--b2)'}`, fontSize: 11, fontWeight: 700, color: done || active ? 'white' : 'var(--t3)', transition: 'all 0.3s var(--ease)', boxShadow: active ? 'var(--glow-p)' : done ? 'var(--glow-m)' : 'none', flexShrink: 0 }}>
                {done ? <Icon name="check" size={13} /> : i + 1}
              </div>
              <div>
                <div className="s2-step-label" style={{ fontSize: 11, fontWeight: 600, color: active ? 'var(--t1)' : done ? 'var(--mint)' : 'var(--t3)' }}>{step.label}</div>
                <div className="s2-step-sub" style={{ fontSize: 10, color: 'var(--t3)' }}>{step.sub}</div>
              </div>
            </div>
            {i < steps.length - 1 && <div className="s2-step-connector" style={{ flex: 1, height: 1, background: i < current ? 'var(--mint)' : 'var(--b2)', margin: '0 12px', minWidth: 24, transition: 'background 0.4s' }} />}
          </React.Fragment>
        )
      })}
    </div>
  </>
)

type SelectedCity = { id: string; name: string; available: number }

function Step1Cities({ selected, setSelected, screenTypes, setScreenTypes }: { selected: SelectedCity[]; setSelected: React.Dispatch<React.SetStateAction<SelectedCity[]>>; screenTypes: string[]; setScreenTypes: React.Dispatch<React.SetStateAction<string[]>> }) {
  return (
    <div className="s2-step-body" style={{ display: 'flex', gap: 20, flex: 1, minHeight: 0 }}>
      <div className="zc-glass-card" style={{ flex: '0 0 50%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--b1)', fontSize: 12, fontWeight: 600 }}>Select Cities on Map</div>
        <div style={{ flex: 1, padding: 8, position: 'relative' }}>
          <IndiaMap selectedCities={selected.map(c => c.id)} onCitySelect={(city: City) => {
            setSelected(prev => prev.find(c => c.id === city.id) ? prev.filter(c => c.id !== city.id) : [...prev, { id: city.id, name: city.name, available: Math.floor(city.screens * 0.8) }])
          }} compact />
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>
        <div className="zc-glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--b1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 12, fontWeight: 600 }}>Cities</span>
            {selected.length > 0 && <span style={{ fontSize: 11, color: 'var(--purple-l)', fontWeight: 600 }}>{selected.length} selected</span>}
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {CITY_LIST.map(city => {
              const isSel = !!selected.find(c => c.id === city.id)
              return (
                <div key={city.id} onClick={() => setSelected(prev => prev.find(c => c.id === city.id) ? prev.filter(c => c.id !== city.id) : [...prev, city])}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 14px', borderBottom: '1px solid var(--b0)', cursor: 'pointer', background: isSel ? 'var(--purple-g)' : 'transparent', transition: 'background 0.15s' }}>
                  <div style={{ width: 18, height: 18, borderRadius: 5, border: `2px solid ${isSel ? 'var(--purple)' : 'var(--b3)'}`, background: isSel ? 'var(--purple)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.15s' }}>
                    {isSel && <Icon name="check" size={11} color="white" />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--t1)' }}>{city.name}</div>
                    <div style={{ fontSize: 10, color: 'var(--t3)' }}>{city.available} available / {city.screens} total</div>
                  </div>
                  <div className="zc-mono" style={{ fontSize: 11, color: 'var(--t2)', flexShrink: 0 }}>{city.cpm} CPM</div>
                </div>
              )
            })}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--t2)', marginBottom: 8 }}>Screen Formats</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {SCREEN_TYPES.map(t => {
              const isSel = screenTypes.includes(t.id)
              return (
                <button key={t.id} onClick={() => setScreenTypes(prev => isSel ? prev.filter(x => x !== t.id) : [...prev, t.id])}
                  style={{ textAlign: 'left', padding: '10px 12px', borderRadius: 10, cursor: 'pointer', background: isSel ? 'var(--purple-d)' : 'var(--b0)', border: `1px solid ${isSel ? 'var(--bglow)' : 'var(--b2)'}`, transition: 'all 0.18s' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <Icon name={t.icon} size={13} color={isSel ? 'var(--purple-l)' : 'var(--t3)'} />
                    <span style={{ fontSize: 11, fontWeight: 600, color: isSel ? 'var(--t1)' : 'var(--t2)' }}>{t.label}</span>
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--t3)' }}>{t.count} screens · {t.cpm} CPM</div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

function Step2Slots({ selectedSlots, setSelectedSlots }: { selectedSlots: string[]; setSelectedSlots: React.Dispatch<React.SetStateAction<string[]>> }) {
  const toggle = (day: string, slot: string) => {
    const key = `${day}|${slot}`
    setSelectedSlots(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key])
  }
  return (
    <div className="s2-step-body" style={{ display: 'flex', gap: 20, flex: 1, minHeight: 0 }}>
      <div className="zc-glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden' }}>
        <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--b1)', fontSize: 12, fontWeight: 600 }}>Weekly Playback Schedule — Click slots to select</div>
        <div style={{ flex: 1, overflowY: 'auto', padding: 14 }}>
          <div className="zc-scroll-x" style={{ minWidth: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '100px repeat(7,1fr)', gap: 4, minWidth: 560 }}>
            <div />
            {DAYS.map(d => <div key={d} style={{ textAlign: 'center', fontSize: 10, fontWeight: 700, color: 'var(--t3)', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '4px 0' }}>{d}</div>)}
            {TIME_SLOTS.map(slot => (
              <React.Fragment key={slot}>
                <div style={{ fontSize: 10, color: 'var(--t3)', padding: '6px 0', alignSelf: 'center' }}>{slot}</div>
                {DAYS.map(day => {
                  const key = `${day}|${slot}`, isSel = selectedSlots.includes(key)
                  const isPrime = slot.includes('18:00') || slot.includes('20:00') || slot.includes('08:00')
                  return (
                    <button key={day} onClick={() => toggle(day, slot)} style={{ height: 32, borderRadius: 6, cursor: 'pointer', background: isSel ? 'var(--purple)' : isPrime ? 'rgba(245,158,11,0.08)' : 'var(--b0)', border: `1px solid ${isSel ? 'var(--purple)' : isPrime ? 'rgba(245,158,11,0.2)' : 'var(--b1)'}`, transition: 'all 0.15s', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title={`₹${SLOT_PRICES[slot]}/screen`}>
                      {isSel && <Icon name="check" size={11} color="white" />}
                      {isPrime && !isSel && <span style={{ fontSize: 8, color: 'var(--amber)', fontWeight: 700 }}>★</span>}
                    </button>
                  )
                })}
              </React.Fragment>
            ))}
          </div>
          </div>{/* end zc-scroll-x */}
          <div style={{ display: 'flex', gap: 16, marginTop: 12, padding: '8px 0', borderTop: '1px solid var(--b1)' }}>
            {[{col:'var(--purple)',label:'Selected'},{col:'rgba(245,158,11,0.4)',label:'★ Prime time'},{col:'var(--b2)',label:'Standard'}].map(({col,label}) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, color: 'var(--t3)' }}>
                <div style={{ width: 12, height: 12, borderRadius: 3, background: col }} />{label}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="s2-slot-summary" style={{ flex: '0 0 220px' }}>
        <div className="zc-glass-card" style={{ padding: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--t2)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Slot Summary</div>
          <div className="zc-mono" style={{ fontSize: 28, fontWeight: 700, lineHeight: 1, background: 'linear-gradient(135deg, var(--purple-l), var(--cyan-l))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: 4 }}>{selectedSlots.length}</div>
          <div style={{ fontSize: 11, color: 'var(--t3)', marginBottom: 14 }}>slots selected</div>
          {[{label:'Avg CPM',value:'₹21.4',color:'var(--t1)'},{label:'Est. Impressions',value:'42L/day',color:'var(--cyan-l)'},{label:'Est. Daily Reach',value:'12.8L',color:'var(--mint-l)'}].map(({label,value,color}) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--b1)', fontSize: 12 }}>
              <span style={{ color: 'var(--t3)' }}>{label}</span>
              <span className="zc-mono" style={{ fontWeight: 600, color }}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Step3Creative() {
  const [dragging, setDragging] = useState(false)
  const [uploaded, setUploaded] = useState<string|null>(null)
  return (
    <div className="s2-step-body" style={{ display: 'flex', gap: 20, flex: 1, minHeight: 0 }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="zc-glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden' }}>
          <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--b1)', fontSize: 12, fontWeight: 600 }}>Upload Creative</div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
            <div onDragOver={e => { e.preventDefault(); setDragging(true) }} onDragLeave={() => setDragging(false)} onDrop={e => { e.preventDefault(); setDragging(false); setUploaded('creative_video.mp4') }}
              style={{ width: '100%', borderRadius: 12, border: `2px dashed ${dragging ? 'var(--purple)' : uploaded ? 'var(--mint)' : 'var(--b3)'}`, background: dragging ? 'var(--purple-g)' : uploaded ? 'var(--mint-d)' : 'var(--b0)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, gap: 12, cursor: 'pointer', transition: 'all 0.2s', minHeight: 180 }}
              onClick={() => setUploaded('brand_video_30s.mp4')}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: uploaded ? 'var(--mint-d)' : 'var(--purple-d)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={uploaded ? 'check' : 'upload'} size={22} color={uploaded ? 'var(--mint-l)' : 'var(--purple-l)'} />
              </div>
              <div style={{ textAlign: 'center' }}>
                {uploaded
                  ? <><div style={{ fontSize: 14, fontWeight: 600, color: 'var(--mint-l)', marginBottom: 4 }}>{uploaded}</div><div style={{ fontSize: 11, color: 'var(--t3)' }}>30s · 1920×1080 · H.264 · 42MB ✓</div></>
                  : <><div style={{ fontSize: 14, fontWeight: 600, color: 'var(--t1)', marginBottom: 4 }}>Drop your creative here</div><div style={{ fontSize: 11, color: 'var(--t3)' }}>MP4, MOV, JPG, PNG · Max 200MB</div></>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="zc-glass-card" style={{ flex: '0 0 220px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--b1)', fontSize: 12, fontWeight: 600 }}>Screen Preview</div>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div style={{ width: '100%', aspectRatio: '16/9', background: uploaded ? 'linear-gradient(135deg, var(--s2), var(--s4))' : 'var(--b0)', borderRadius: 8, border: '1px solid var(--b2)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            {uploaded
              ? <><div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(6,182,212,0.2))' }} /><div style={{ position: 'relative', textAlign: 'center' }}><Icon name="play" size={28} color="rgba(255,255,255,0.8)" /><div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 6 }}>Preview Ready</div></div></>
              : <div style={{ textAlign: 'center', color: 'var(--t3)', fontSize: 11 }}>Upload to preview</div>
            }
          </div>
        </div>
        <div style={{ padding: '0 14px 14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[{label:'Duration',value:uploaded?'30s':'—'},{label:'Resolution',value:uploaded?'1920×1080':'—'},{label:'Format',value:uploaded?'H.264 MP4':'—'}].map(({label,value}) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
              <span style={{ color: 'var(--t3)' }}>{label}</span>
              <span className="zc-mono" style={{ color: 'var(--t1)', fontWeight: 500 }}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Step4Review({ selectedCities, selectedSlots }: { selectedCities: SelectedCity[]; selectedSlots: string[] }) {
  const screenCount = selectedCities.reduce((a, c) => a + (c.available || 150), 0)
  const estimatedBudget = screenCount * selectedSlots.length * 1400 / 100
  return (
    <div className="s2-step-body" style={{ display: 'flex', gap: 20, flex: 1, minHeight: 0 }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {[
          { title:'Cities & Screens', items: selectedCities.length ? selectedCities.map(c => ({k:c.name, v:`${c.available} screens`})) : [{k:'Delhi NCR',v:'344 screens'},{k:'Mumbai',v:'298 screens'}] },
          { title:'Schedule', items: [{k:'Time slots',v:`${selectedSlots.length || 14} slots/week`},{k:'Duration',v:'4 weeks'},{k:'Start date',v:'20 May 2026'}] },
          { title:'Creative', items: [{k:'File',v:'brand_video_30s.mp4'},{k:'Duration',v:'30 seconds'},{k:'Approval',v:'Auto-approve enabled'}] },
        ].map(({title,items}) => (
          <div key={title} className="zc-glass-card" style={{ padding: '12px 16px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--t2)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>{title}</div>
            {items.map(({k,v}) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: 12 }}>
                <span style={{ color: 'var(--t3)' }}>{k}</span>
                <span style={{ color: 'var(--t1)', fontWeight: 500 }}>{v}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ flex: '0 0 240px' }}>
        <div className="zc-glass-card" style={{ padding: 18 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--t2)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14 }}>Estimated Budget</div>
          <div className="zc-mono" style={{ fontSize: 32, fontWeight: 700, lineHeight: 1, background: 'linear-gradient(135deg, var(--mint-l), var(--cyan-l))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>₹{(estimatedBudget || 6.4).toFixed(1)}L</div>
          <div style={{ fontSize: 11, color: 'var(--t3)', marginBottom: 16, marginTop: 4 }}>for 4-week campaign</div>
          {[{label:'Screens × Slots',value:`${screenCount||642} × ${selectedSlots.length||14}`},{label:'Avg CPM',value:'₹21.4'},{label:'Est. Impressions',value:'4.8Cr'},{label:'Est. Reach',value:'1.2Cr people'}].map(({label,value}) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--b1)', fontSize: 12 }}>
              <span style={{ color: 'var(--t3)' }}>{label}</span>
              <span className="zc-mono" style={{ color: 'var(--t1)', fontWeight: 600 }}>{value}</span>
            </div>
          ))}
          <button style={{ marginTop: 18, width: '100%', padding: '11px', borderRadius: 10, cursor: 'pointer', background: 'linear-gradient(135deg, var(--mint), var(--cyan))', border: 'none', color: 'white', fontSize: 13, fontWeight: 700, boxShadow: 'var(--glow-m)' }}>Confirm & Launch Campaign</button>
          <div style={{ fontSize: 10, color: 'var(--t3)', textAlign: 'center', marginTop: 8 }}>Wallet balance: ₹4,28,500</div>
        </div>
      </div>
    </div>
  )
}

export default function Screen2Booking({ onNavigate }: { onNavigate: (s: string) => void }) {
  const [step, setStep] = useState(0)
  const [selectedCities, setSelectedCities] = useState<SelectedCity[]>([])
  const [selectedSlots, setSelectedSlots] = useState<string[]>([])
  const [screenTypes, setScreenTypes] = useState(['billboard'])

  const STEPS = [
    { label:'Locations', sub:'Cities & screens' },
    { label:'Schedule',  sub:'Days & time slots' },
    { label:'Creative',  sub:'Upload assets' },
    { label:'Review',    sub:'Confirm & pay' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <style>{`
        .s2-step-body { display: flex; gap: 20px; flex: 1; min-height: 0; overflow: hidden; }
        .s2-slot-summary { flex: 0 0 220px; }
        @media (max-width: 767px) {
          .s2-step-body { flex-direction: column; overflow-y: auto; min-height: 0; }
          .s2-slot-summary { flex: 0 0 auto !important; }
        }
      `}</style>
      <TopBar title="Book Screens" subtitle="New Campaign · Step-by-step booking" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px 20px', gap: 16, overflow: 'hidden', minHeight: 0 }}>
        <div className="zc-glass-card" style={{ padding: '14px 20px', flexShrink: 0 }}>
          <StepIndicator steps={STEPS} current={step} />
        </div>
        <div style={{ flex: 1, minHeight: 0 }}>
          {step === 0 && <Step1Cities selected={selectedCities} setSelected={setSelectedCities} screenTypes={screenTypes} setScreenTypes={setScreenTypes} />}
          {step === 1 && <Step2Slots selectedSlots={selectedSlots} setSelectedSlots={setSelectedSlots} />}
          {step === 2 && <Step3Creative />}
          {step === 3 && <Step4Review selectedCities={selectedCities} selectedSlots={selectedSlots} />}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <button onClick={() => step > 0 ? setStep(s => s - 1) : onNavigate('dashboard')} style={{ padding: '9px 18px', borderRadius: 8, border: '1px solid var(--b3)', background: 'transparent', color: 'var(--t2)', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
            ← {step === 0 ? 'Back to Dashboard' : 'Previous'}
          </button>
          <div style={{ fontSize: 12, color: 'var(--t3)' }}>Step {step + 1} of {STEPS.length}</div>
          {step < 3
            ? <button onClick={() => setStep(s => s + 1)} style={{ padding: '9px 20px', borderRadius: 8, background: 'linear-gradient(135deg, var(--purple), var(--blue))', border: 'none', color: 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer', boxShadow: 'var(--glow-p)' }}>Continue →</button>
            : <button onClick={() => onNavigate('campaigns')} style={{ padding: '9px 20px', borderRadius: 8, background: 'linear-gradient(135deg, var(--mint), var(--cyan))', border: 'none', color: 'white', fontSize: 13, fontWeight: 700, cursor: 'pointer', boxShadow: 'var(--glow-m)' }}>Launch Campaign</button>
          }
        </div>
      </div>
    </div>
  )
}
