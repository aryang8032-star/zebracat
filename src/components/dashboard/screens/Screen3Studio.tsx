'use client'

import React, { useState } from 'react'
import { Icon, TopBar, StatusBadge } from '../shared'

const TEMPLATES = [
  { id:'t1', name:'Product Launch',  aspect:'16:9', cat:'Retail',   thumb:'linear-gradient(135deg,#7C3AED,#3B82F6)' },
  { id:'t2', name:'Flash Sale',      aspect:'16:9', cat:'Retail',   thumb:'linear-gradient(135deg,#EF4444,#F59E0B)' },
  { id:'t3', name:'Brand Awareness', aspect:'16:9', cat:'Brand',    thumb:'linear-gradient(135deg,#0F172A,#1E3A5F)' },
  { id:'t4', name:'Event Promo',     aspect:'9:16', cat:'Events',   thumb:'linear-gradient(135deg,#10B981,#06B6D4)' },
  { id:'t5', name:'IPL Special',     aspect:'16:9', cat:'Sports',   thumb:'linear-gradient(135deg,#F59E0B,#EF4444)' },
  { id:'t6', name:'Real Estate',     aspect:'16:9', cat:'Property', thumb:'linear-gradient(135deg,#1D4ED8,#0F172A)' },
  { id:'t7', name:'Auto Showcase',   aspect:'16:9', cat:'Auto',     thumb:'linear-gradient(135deg,#334155,#0F172A)' },
  { id:'t8', name:'FMCG Summer',     aspect:'1:1',  cat:'FMCG',    thumb:'linear-gradient(135deg,#10B981,#F59E0B)' },
]

const ASSETS = [
  { name:'brand_hero_v3.mp4',   type:'video', size:'84MB',  dur:'30s', status:'approved' },
  { name:'product_shot_4k.jpg', type:'image', size:'12MB',  dur:'—',   status:'approved' },
  { name:'logo_white.png',      type:'image', size:'0.4MB', dur:'—',   status:'approved' },
  { name:'summer_reel.mp4',     type:'video', size:'128MB', dur:'45s', status:'pending'  },
  { name:'tagline_v2.mp4',      type:'video', size:'22MB',  dur:'15s', status:'approved' },
  { name:'outdoor_bg.jpg',      type:'image', size:'8MB',   dur:'—',   status:'rejected' },
]

const SPECS = [
  { label:'Max File Size', value:'200 MB' },
  { label:'Video Formats', value:'MP4, MOV, WebM' },
  { label:'Image Formats', value:'JPG, PNG, WebP' },
  { label:'Min Resolution', value:'1280×720' },
  { label:'Recommended', value:'1920×1080 / 3840×2160' },
  { label:'Frame Rate', value:'24, 25, 30 fps' },
  { label:'Max Duration', value:'60 seconds' },
  { label:'Audio', value:'AAC, max –14 LUFS' },
]

export default function Screen3Studio({ onNavigate }: { onNavigate: (s: string) => void }) {
  const [activeTab, setActiveTab] = useState('upload')
  const [selectedTemplate, setSelectedTemplate] = useState('t3')
  const [catFilter, setCatFilter] = useState('All')
  const [dragging, setDragging] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<string|null>(null)

  const cats = ['All','Retail','Brand','Events','Sports','Property','Auto','FMCG']
  const filteredTemplates = TEMPLATES.filter(t => catFilter === 'All' || t.cat === catFilter)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <style>{`
        .s3-body    { flex: 1; display: flex; gap: 16px; padding: 16px 20px; overflow: hidden; min-height: 0; }
        .s3-left    { flex: 1; display: flex; flex-direction: column; gap: 12px; min-height: 0; overflow-y: auto; }
        .s3-preview { flex: 0 0 300px; display: flex; flex-direction: column; gap: 12px; }
        @media (max-width: 767px) {
          .s3-body    { flex-direction: column; overflow-y: auto; padding: 12px 12px; }
          .s3-left    { overflow-y: visible; min-height: 0; }
          .s3-preview { flex: 0 0 auto !important; }
        }
      `}</style>
      <TopBar title="Creative Studio" subtitle="Manage, preview and submit ad creatives"
        actions={
          <div style={{ display: 'flex', gap: 8 }}>
            {['upload','templates','assets'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '6px 14px', borderRadius: 8, cursor: 'pointer', fontSize: 12, fontWeight: 500, background: activeTab === tab ? 'var(--purple-d)' : 'var(--b0)', border: `1px solid ${activeTab === tab ? 'var(--bglow)' : 'var(--b2)'}`, color: activeTab === tab ? 'var(--purple-l)' : 'var(--t2)', textTransform: 'capitalize', transition: 'all 0.15s' }}>{tab}</button>
            ))}
          </div>
        }
      />

      <div className="s3-body">
        {/* Left */}
        <div className="s3-left">

          {activeTab === 'upload' && <>
            <div className="zc-glass-card" style={{ overflow: 'hidden' }}>
              <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--b1)', fontSize: 12, fontWeight: 600 }}>Upload Creative Asset</div>
              <div style={{ padding: 20 }}>
                <div onDragOver={e => { e.preventDefault(); setDragging(true) }} onDragLeave={() => setDragging(false)} onDrop={e => { e.preventDefault(); setDragging(false); setUploadedFile('brand_hero_v4.mp4') }} onClick={() => setUploadedFile('brand_hero_v4.mp4')}
                  style={{ borderRadius: 12, border: `2px dashed ${dragging ? 'var(--purple)' : uploadedFile ? 'var(--mint)' : 'var(--b3)'}`, background: dragging ? 'var(--purple-g)' : uploadedFile ? 'var(--mint-g)' : 'transparent', padding: '36px 24px', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, textAlign: 'center' }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: uploadedFile ? 'var(--mint-d)' : 'var(--purple-d)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={uploadedFile ? 'check' : 'upload'} size={24} color={uploadedFile ? 'var(--mint-l)' : 'var(--purple-l)'} />
                  </div>
                  {uploadedFile
                    ? <><div style={{ fontSize: 14, fontWeight: 600, color: 'var(--mint-l)' }}>{uploadedFile}</div><div style={{ fontSize: 11, color: 'var(--t3)' }}>30s · 1920×1080 · H.264 · 84MB · Upload complete</div></>
                    : <><div style={{ fontSize: 14, fontWeight: 600, color: 'var(--t1)' }}>Drag & drop your creative</div><div style={{ fontSize: 11, color: 'var(--t3)' }}>MP4, MOV, JPG, PNG, WebP · up to 200MB</div></>
                  }
                </div>
              </div>
            </div>
            <div className="zc-glass-card" style={{ overflow: 'hidden' }}>
              <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--b1)', fontSize: 12, fontWeight: 600 }}>Technical Specifications</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '8px 0' }}>
                {SPECS.map(({ label, value }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 14px', borderBottom: '1px solid var(--b0)', gap: 10 }}>
                    <span style={{ fontSize: 11, color: 'var(--t3)' }}>{label}</span>
                    <span className="zc-mono" style={{ fontSize: 11, color: 'var(--t1)', fontWeight: 500 }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </>}

          {activeTab === 'templates' && (
            <div className="zc-glass-card" style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--b1)', display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontSize: 12, fontWeight: 600, marginRight: 4 }}>Templates</span>
                {cats.map(c => (
                  <button key={c} onClick={() => setCatFilter(c)} style={{ fontSize: 10, fontWeight: 600, padding: '3px 9px', borderRadius: 99, cursor: 'pointer', background: catFilter === c ? 'var(--purple-d)' : 'transparent', border: `1px solid ${catFilter === c ? 'var(--bglow)' : 'var(--b2)'}`, color: catFilter === c ? 'var(--purple-l)' : 'var(--t3)', transition: 'all 0.15s' }}>{c}</button>
                ))}
              </div>
              <div style={{ flex: 1, overflowY: 'auto', padding: 14 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 10 }}>
                  {filteredTemplates.map(t => (
                    <div key={t.id} onClick={() => setSelectedTemplate(t.id)} style={{ borderRadius: 10, overflow: 'hidden', cursor: 'pointer', border: `2px solid ${selectedTemplate === t.id ? 'var(--purple)' : 'var(--b2)'}`, transition: 'all 0.18s', boxShadow: selectedTemplate === t.id ? 'var(--glow-p)' : 'none' }}>
                      <div style={{ aspectRatio: '16/9', background: t.thumb, position: 'relative' }}>
                        <div style={{ position: 'absolute', top: 4, right: 4, fontSize: 9, fontWeight: 700, background: 'rgba(0,0,0,0.6)', color: 'white', padding: '2px 5px', borderRadius: 99 }}>{t.aspect}</div>
                      </div>
                      <div style={{ padding: '7px 8px', background: 'var(--s2)' }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--t1)', marginBottom: 1 }}>{t.name}</div>
                        <div style={{ fontSize: 9, color: 'var(--t3)' }}>{t.cat}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'assets' && (
            <div className="zc-glass-card" style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--b1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, fontWeight: 600 }}>Asset Library</span>
                <button style={{ fontSize: 11, color: 'var(--purple-l)', background: 'var(--purple-d)', border: '1px solid var(--bglow)', borderRadius: 7, padding: '4px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Icon name="plus" size={11} /> Upload
                </button>
              </div>
              <div style={{ flex: 1, overflowY: 'auto' }}>
                {ASSETS.map((asset, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderBottom: '1px solid var(--b0)', cursor: 'pointer' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(139,92,246,0.04)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: asset.type === 'video' ? 'var(--purple-d)' : 'var(--blue-d)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon name={asset.type === 'video' ? 'play' : 'eye'} size={16} color={asset.type === 'video' ? 'var(--purple-l)' : 'var(--blue-l)'} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--t1)', marginBottom: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{asset.name}</div>
                      <div style={{ fontSize: 10, color: 'var(--t3)' }}>{asset.type} · {asset.size}{asset.dur !== '—' ? ` · ${asset.dur}` : ''}</div>
                    </div>
                    <StatusBadge status={asset.status} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Preview */}
        <div className="s3-preview">
          <div className="zc-glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--b1)', fontSize: 12, fontWeight: 600 }}>Live Preview</div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
              <div style={{ width: '100%', aspectRatio: '16/9', background: uploadedFile ? 'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(6,182,212,0.2))' : 'var(--b0)', borderRadius: 8, border: '1px solid var(--b2)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                {uploadedFile
                  ? <><div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(6,182,212,0.2))' }} /><div style={{ position: 'relative', textAlign: 'center' }}><Icon name="play" size={32} color="rgba(255,255,255,0.8)" /><div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 6 }}>Preview Ready</div></div></>
                  : <div style={{ textAlign: 'center', color: 'var(--t3)', fontSize: 11 }}>Upload to preview</div>
                }
              </div>
            </div>
            <div style={{ padding: '0 14px 14px' }}>
              <div style={{ padding: '10px 0', borderTop: '1px solid var(--b1)' }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--t3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Pre-flight Checks</div>
                {[
                  { label:'File size ≤ 200MB', ok: true },
                  { label:'Resolution ≥ 1280×720', ok: true },
                  { label:'Duration ≤ 60s', ok: !!uploadedFile },
                  { label:'Audio normalised', ok: !!uploadedFile },
                  { label:'No prohibited content', ok: true },
                ].map(({ label, ok }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <div style={{ width: 16, height: 16, borderRadius: '50%', background: ok ? 'var(--mint-d)' : 'var(--b1)', border: `1px solid ${ok ? 'var(--mint)' : 'var(--b3)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {ok && <Icon name="check" size={9} color="var(--mint-l)" />}
                    </div>
                    <span style={{ fontSize: 11, color: ok ? 'var(--t2)' : 'var(--t3)' }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button onClick={() => onNavigate('booking')} style={{ padding: '11px', borderRadius: 10, cursor: 'pointer', background: 'linear-gradient(135deg, var(--purple), var(--blue))', border: 'none', color: 'white', fontSize: 13, fontWeight: 600, boxShadow: 'var(--glow-p)' }}>
            Submit for Review
          </button>
        </div>
      </div>
    </div>
  )
}
