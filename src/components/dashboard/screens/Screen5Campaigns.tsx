'use client'

import React, { useState } from 'react'
import { Icon, TopBar, StatusBadge, ProgressBar } from '../shared'

const CAMPAIGNS = [
  { id:'c1', name:'IPL Season Launch',    brand:'Dream11',         cities:['Del','Mum','Blr','Chn','Hyd','Kol'], status:'live',      budget:'₹22.8L', spent:'₹18.4L', spentPct:81,  reach:'8.4Cr',  impressions:'24.2Cr', screens:512, start:'Apr 1',  end:'May 31', cpm:'₹21.2', completionRate:94,  color:'#8B5CF6' },
  { id:'c2', name:'Diwali 2026 Blitz',    brand:'Reliance Retail', cities:['Del','Mum','Blr'],                   status:'live',      budget:'₹8.4L',  spent:'₹5.2L',  spentPct:62,  reach:'2.1Cr',  impressions:'6.8Cr',  screens:284, start:'May 1',  end:'Jun 15', cpm:'₹18.8', completionRate:88,  color:'#3B82F6' },
  { id:'c3', name:'EV Summer Campaign',   brand:'Ather Energy',    cities:['Blr','Pun','Hyd'],                   status:'scheduled', budget:'₹4.2L',  spent:'₹0',     spentPct:0,   reach:'—',      impressions:'—',      screens:148, start:'May 20', end:'Jun 30', cpm:'₹22.4', completionRate:0,   color:'#06B6D4' },
  { id:'c4', name:'Back to School',       brand:"Allen's",         cities:['Jai','Lko','Chd'],                   status:'approved',  budget:'₹2.1L',  spent:'₹0.4L',  spentPct:19,  reach:'44L',    impressions:'1.2Cr',  screens:92,  start:'May 10', end:'Jun 20', cpm:'₹16.2', completionRate:78,  color:'#10B981' },
  { id:'c5', name:'Festive Auto Offer',   brand:'Maruti Suzuki',   cities:['Del','Mum'],                         status:'pending',   budget:'₹6.8L',  spent:'₹0',     spentPct:0,   reach:'—',      impressions:'—',      screens:168, start:'—',      end:'—',      cpm:'₹24.1', completionRate:0,   color:'#F59E0B' },
  { id:'c6', name:'BFSI Brand Refresh',   brand:'HDFC Securities', cities:['Del','Mum','Blr'],                   status:'draft',     budget:'₹5.5L',  spent:'₹0',     spentPct:0,   reach:'—',      impressions:'—',      screens:220, start:'—',      end:'—',      cpm:'₹22.8', completionRate:0,   color:'#A78BFA' },
  { id:'c7', name:'Monsoon Wear Launch',  brand:'FabIndia',        cities:['Del','Mum','Pun','Jai'],             status:'paused',    budget:'₹3.2L',  spent:'₹1.8L',  spentPct:56,  reach:'92L',    impressions:'2.4Cr',  screens:124, start:'Apr 20', end:'Jun 10', cpm:'₹17.6', completionRate:65,  color:'#EF4444' },
]

const APPROVAL_STEPS = [
  { label:'Creative Submitted',   done:true  },
  { label:'Tech Validation',      done:true  },
  { label:'Content Review',       done:true  },
  { label:'Media Owner Approval', done:false },
  { label:'Schedule Confirmed',   done:false },
]

type Campaign = typeof CAMPAIGNS[0]

function CampaignRow({ c, selected, onClick }: { c: Campaign; selected: boolean; onClick: (c: Campaign) => void }) {
  return (
    <div onClick={() => onClick(c)} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 100px 80px 80px 80px 80px 80px', alignItems: 'center', gap: 0, padding: '0 16px', background: selected ? 'rgba(139,92,246,0.08)' : 'transparent', borderBottom: '1px solid var(--b0)', cursor: 'pointer', borderLeft: selected ? '2px solid var(--purple)' : '2px solid transparent', transition: 'all 0.15s' }}
      onMouseEnter={e => !selected && ((e.currentTarget as HTMLElement).style.background = 'rgba(139,92,246,0.04)')}
      onMouseLeave={e => !selected && ((e.currentTarget as HTMLElement).style.background = 'transparent')}>
      <div style={{ padding: '11px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, flexShrink: 0, background: `${c.color}33`, border: `1px solid ${c.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="zap" size={14} color={c.color} />
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--t1)', marginBottom: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</div>
          <div style={{ fontSize: 10, color: 'var(--t3)' }}>{c.brand} · {c.cities.slice(0,3).join(', ')}{c.cities.length > 3 ? ` +${c.cities.length-3}` : ''}</div>
        </div>
      </div>
      <div style={{ padding: '11px 0' }}><StatusBadge status={c.status} pulse={c.status === 'live'} /></div>
      <div style={{ padding: '11px 0' }}>
        <div className="zc-mono" style={{ fontSize: 12, fontWeight: 600, color: 'var(--t1)' }}>{c.budget}</div>
        {c.spentPct > 0 && <div style={{ marginTop: 4 }}><ProgressBar pct={c.spentPct} color="var(--purple)" height={3} /></div>}
      </div>
      <div className="zc-mono" style={{ padding: '11px 0', fontSize: 12, color: 'var(--t2)' }}>{c.screens}</div>
      <div className="zc-mono" style={{ padding: '11px 0', fontSize: 12, color: 'var(--t2)' }}>{c.reach}</div>
      <div className="zc-mono" style={{ padding: '11px 0', fontSize: 12, color: 'var(--t2)' }}>{c.impressions}</div>
      <div className="zc-mono" style={{ padding: '11px 0', fontSize: 12, color: 'var(--t2)' }}>{c.cpm}</div>
      <div style={{ padding: '11px 0', fontSize: 10, color: 'var(--t3)' }}>
        <div>{c.start}</div>
        <div>→ {c.end}</div>
      </div>
    </div>
  )
}

function CampaignDetail({ c }: { c: Campaign | null }) {
  if (!c) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 12, color: 'var(--t3)', padding: 24 }}>
      <Icon name="zap" size={32} color="var(--b3)" />
      <div style={{ fontSize: 13, textAlign: 'center' }}>Select a campaign to view performance details</div>
    </div>
  )
  const spentNum = parseFloat(c.spent.replace('₹','').replace('L','')) || 0
  const budgetNum = parseFloat(c.budget.replace('₹','').replace('L','')) || 1
  const remaining = budgetNum - spentNum
  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: 14, height: '100%', overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--t1)', marginBottom: 3 }}>{c.name}</div>
          <div style={{ fontSize: 11, color: 'var(--t3)' }}>{c.brand} · {c.cities.join(', ')}</div>
        </div>
        <StatusBadge status={c.status} pulse={c.status === 'live'} />
      </div>

      <div style={{ background: 'var(--b0)', borderRadius: 10, padding: 12, border: '1px solid var(--b1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 11 }}>
          <span style={{ color: 'var(--t3)' }}>Budget Utilisation</span>
          <span className="zc-mono" style={{ color: 'var(--purple-l)', fontWeight: 600 }}>{c.spentPct}%</span>
        </div>
        <ProgressBar pct={c.spentPct} color="var(--purple)" height={6} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 10, color: 'var(--t3)' }}>
          <span className="zc-mono">{c.spent} spent</span>
          <span className="zc-mono">₹{remaining.toFixed(1)}L remaining</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {[{label:'Screens',value:c.screens,color:'var(--purple)'},{label:'CPM',value:c.cpm,color:'var(--blue)'},{label:'Reach',value:c.reach,color:'var(--cyan)'},{label:'Impressions',value:c.impressions,color:'var(--mint)'}].map(({label,value,color}) => (
          <div key={label} style={{ background: 'var(--b0)', border: '1px solid var(--b1)', borderRadius: 9, padding: '10px 12px' }}>
            <div style={{ fontSize: 9, color: 'var(--t3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{label}</div>
            <div className="zc-mono" style={{ fontSize: 16, fontWeight: 700, color }}>{value}</div>
          </div>
        ))}
      </div>

      {c.completionRate > 0 && (
        <div style={{ background: 'var(--b0)', borderRadius: 10, padding: 12, border: '1px solid var(--b1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 11 }}>
            <span style={{ color: 'var(--t3)' }}>Playback Completion Rate</span>
            <span className="zc-mono" style={{ color: 'var(--mint-l)', fontWeight: 600 }}>{c.completionRate}%</span>
          </div>
          <ProgressBar pct={c.completionRate} color="var(--mint)" height={5} />
        </div>
      )}

      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--t2)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Approval Pipeline</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, position: 'relative' }}>
          <div style={{ position: 'absolute', left: 10, top: 12, bottom: 12, width: 1.5, background: 'var(--b2)' }} />
          {APPROVAL_STEPS.map((step, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '7px 0', position: 'relative' }}>
              <div style={{ width: 21, height: 21, borderRadius: '50%', flexShrink: 0, zIndex: 1, background: step.done ? 'var(--mint)' : 'var(--s3)', border: `2px solid ${step.done ? 'var(--mint)' : 'var(--b3)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: step.done ? 'var(--glow-m)' : 'none' }}>
                {step.done ? <Icon name="check" size={11} color="white" /> : <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--b4)' }} />}
              </div>
              <span style={{ fontSize: 12, color: step.done ? 'var(--t1)' : 'var(--t3)', fontWeight: step.done ? 500 : 400 }}>{step.label}</span>
              {step.done && <span style={{ marginLeft: 'auto', fontSize: 9, color: 'var(--mint)', fontWeight: 600 }}>✓</span>}
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
        {c.status === 'live' && <button style={{ flex: 1, padding: '8px', borderRadius: 8, cursor: 'pointer', background: 'var(--red-d)', border: '1px solid rgba(239,68,68,0.3)', color: 'var(--red)', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}><Icon name="pause" size={12} /> Pause</button>}
        {c.status === 'pending' && <button style={{ flex: 1, padding: '8px', borderRadius: 8, cursor: 'pointer', background: 'var(--mint-d)', border: '1px solid rgba(16,185,129,0.3)', color: 'var(--mint-l)', fontSize: 12, fontWeight: 600 }}>Approve</button>}
        <button style={{ flex: 1, padding: '8px', borderRadius: 8, cursor: 'pointer', background: 'var(--purple-d)', border: '1px solid var(--bglow)', color: 'var(--purple-l)', fontSize: 12, fontWeight: 600 }}>Edit</button>
        <button style={{ padding: '8px 10px', borderRadius: 8, cursor: 'pointer', background: 'var(--b0)', border: '1px solid var(--b2)', color: 'var(--t2)' }}><Icon name="download" size={14} /></button>
      </div>
    </div>
  )
}

export default function Screen5Campaigns({ onNavigate }: { onNavigate: (s: string) => void }) {
  const [selected, setSelected] = useState<Campaign>(CAMPAIGNS[0])
  const [statusFilter, setStatusFilter] = useState('all')

  const filtered = statusFilter === 'all' ? CAMPAIGNS : CAMPAIGNS.filter(c => c.status === statusFilter)
  const counts = CAMPAIGNS.reduce((a: Record<string,number>, c) => { a[c.status] = (a[c.status] || 0) + 1; return a }, {})

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <TopBar title="Campaigns" subtitle="Manage and monitor all active campaigns"
        actions={
          <button onClick={() => onNavigate('booking')} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 8, cursor: 'pointer', background: 'linear-gradient(135deg, var(--purple), var(--blue))', border: 'none', color: 'white', fontSize: 12, fontWeight: 600, boxShadow: 'var(--glow-p)' }}>
            <Icon name="plus" size={13} /> New Campaign
          </button>
        }
      />
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, minWidth: 0, borderRight: '1px solid var(--b1)' }}>
          <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--b1)', display: 'flex', gap: 6, flexShrink: 0, flexWrap: 'wrap' }}>
            {[['all','All'],['live','Live'],['scheduled','Scheduled'],['approved','Approved'],['pending','Pending'],['paused','Paused'],['draft','Draft']].map(([val, label]) => (
              <button key={val} onClick={() => setStatusFilter(val)} style={{ fontSize: 10, fontWeight: 600, padding: '3px 9px', borderRadius: 99, cursor: 'pointer', background: statusFilter === val ? 'var(--purple-d)' : 'transparent', border: `1px solid ${statusFilter === val ? 'var(--bglow)' : 'var(--b2)'}`, color: statusFilter === val ? 'var(--purple-l)' : 'var(--t3)', transition: 'all 0.15s' }}>
                {label}{counts[val] ? <span style={{ marginLeft: 4, fontSize: 9, opacity: 0.7 }}>{counts[val]}</span> : null}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 100px 80px 80px 80px 80px 80px', padding: '6px 16px', borderBottom: '1px solid var(--b1)', flexShrink: 0 }}>
            {['Campaign','Status','Budget','Screens','Reach','Impressions','CPM','Dates'].map(h => (
              <div key={h} style={{ fontSize: 9, color: 'var(--t3)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '2px 0' }}>{h}</div>
            ))}
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {filtered.map(c => <CampaignRow key={c.id} c={c} selected={selected?.id === c.id} onClick={setSelected} />)}
          </div>
        </div>
        <div className="zc-glass-card" style={{ flex: '0 0 280px', borderRadius: 0, border: 'none', borderLeft: '1px solid var(--b1)' }}>
          <CampaignDetail c={selected} />
        </div>
      </div>
    </div>
  )
}
