import { useState, useEffect, useRef } from 'react'

const t = {
  dune:'#32302F', duneMid:'#5a5856', duneLight:'#8a8785',
  cream:'#f5f0eb', creamDark:'#ede7df', sand:'#d4cbc0',
  white:'#ffffff', accent:'#c8763a', border:'#e8e3dd', bg:'#faf8f5',
  green:'#2ea052', blue:'#2563eb', purple:'#7c3aed', red:'#dc2626',
}

const TABS = [
  { id:'rta',       label:'🤖 RTA Bot' },
  { id:'forecast',  label:'📈 Forecast Tool' },
  { id:'powerbi',   label:'📊 Power BI' },
  { id:'shedula',   label:'🚀 Shedula.io' },
  { id:'hootsuite', label:'💬 Hootsuite Bot' },
]

/* ── shared sub-components ── */
const SectionLabel = ({ children }) => (
  <p style={{ fontSize:'.65rem', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase',
    color:t.duneLight, margin:'28px 0 12px' }}>{children}</p>
)

const Rule = () => <div style={{ width:32, height:3, background:t.accent, borderRadius:1, margin:'12px 0 28px' }} />

const MetricsRow = ({ items }) => (
  <div style={{ display:'flex', gap:14, flexWrap:'wrap', margin:'24px 0' }}>
    {items.map(([n,l]) => (
      <div key={n} style={{ background:t.dune, borderRadius:6, padding:'18px 22px',
        textAlign:'center', flex:1, minWidth:110 }}>
        <div style={{ fontSize:'1.4rem', fontWeight:800, color:t.white, lineHeight:1.2 }}>{n}</div>
        <div style={{ fontSize:'.68rem', color:'rgba(255,255,255,.45)', marginTop:4, lineHeight:1.4 }}>{l}</div>
      </div>
    ))}
  </div>
)

const FlowNode = ({ icon, label, sub, color, pulse, delay=0 }) => (
  <div style={{ background:t.white, border:`1px solid ${t.border}`, borderTop:`3px solid ${color}`,
    borderRadius:6, padding:'14px 16px', textAlign:'center', minWidth:100,
    animation:`fadeUp 0.5s ease ${delay}s both`,
    boxShadow: pulse ? `0 0 0 3px ${color}22` : 'none' }}>
    <div style={{ fontSize:'1.3rem', marginBottom:6 }}>{icon}</div>
    <div style={{ fontSize:'.72rem', fontWeight:800, color:t.dune, letterSpacing:'.2px' }}>{label}</div>
    {sub && <div style={{ fontSize:'.63rem', color:t.duneLight, marginTop:3, lineHeight:1.4 }}>{sub}</div>}
  </div>
)

const Arrow = () => <span style={{ color:t.sand, fontSize:'1.1rem', margin:'0 4px', flexShrink:0 }}>→</span>

const Flow = ({ nodes }) => (
  <div style={{ display:'flex', alignItems:'center', flexWrap:'wrap', gap:2, margin:'24px 0' }}>
    {nodes.map((n, i) => [
      <FlowNode key={i} {...n} delay={i * 0.1} />,
      i < nodes.length - 1 && <Arrow key={`a${i}`} />
    ])}
  </div>
)

const DetailGrid = ({ cards }) => (
  <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:16, margin:'16px 0' }}>
    {cards.map(({ title, items }) => (
      <div key={title} style={{ background:t.white, border:`1px solid ${t.border}`, borderRadius:6, padding:20 }}>
        <h4 style={{ fontSize:'.8rem', fontWeight:800, color:t.dune, marginBottom:10 }}>{title}</h4>
        <ul style={{ listStyle:'none', padding:0 }}>
          {items.map((item,i) => (
            <li key={i} style={{ fontSize:'.77rem', color:t.duneMid, padding:'4px 0 4px 14px',
              position:'relative', borderBottom:`1px solid ${t.bg}`, lineHeight:1.5 }}>
              <span style={{ position:'absolute', left:0, color:t.sand }}>–</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
)

/* ── RTA BOT TICKER ── */
const LOGS = [
  '[08:32:01] Task Scheduler fired — capturing screen...',
  '[08:32:02] Screenshot saved → latest.png (1920x1080)',
  '[08:32:02] Encoding image to Base64 (2.3MB)...',
  '[08:32:03] Sending to GPT-4 Vision API...',
  '[08:32:05] GPT response received — validating format...',
  '[08:32:05] ✓ Format valid. Parsing LOB data...',
  '[08:32:05] LOB1: 8 calls | 6.2 min wait → OK',
  '[08:32:05] LOB3: 7 calls | 22.4 min wait → ⚠ BREACH',
  '[08:32:06] State: NEW alert — writing to alert.txt',
  '[08:32:06] ✓ M365 Teams alert sent for LOB3',
  '[08:32:06] Logging interval to history.csv...',
  '[08:47:02] LOB3: 2 calls | 3.1 min wait → RESOLVED',
  '[08:47:02] ✓ Normalization message sent. Next run in 5 min...',
]

function Ticker({ active }) {
  const [lines, setLines] = useState([])
  const idx = useRef(0)
  useEffect(() => {
    if (!active) { setLines([]); idx.current = 0; return }
    const iv = setInterval(() => {
      if (idx.current < LOGS.length) {
        setLines(prev => [...prev, LOGS[idx.current++]])
      } else clearInterval(iv)
    }, 480)
    return () => clearInterval(iv)
  }, [active])
  return (
    <div style={{ background:t.dune, borderRadius:6, padding:'16px 20px', fontFamily:'monospace',
      fontSize:'.76rem', color:'#7dd87d', lineHeight:1.9, position:'relative', overflow:'hidden',
      minHeight:120, margin:'16px 0' }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:2,
        background:`linear-gradient(90deg,${t.accent},${t.green})`,
        animation:'scan 3s linear infinite' }} />
      {lines.map((l,i) => <div key={i}>{l}</div>)}
      <span style={{ animation:'blink 1s step-end infinite' }}>_</span>
    </div>
  )
}

/* ── PANELS ── */
function RtaPanel({ active }) {
  return (
    <div>
      <p style={{ fontSize:'.88rem', color:t.duneMid, lineHeight:1.7, maxWidth:700 }}>
        Coast Capital Savings · 2025 · PowerShell + GPT-4 Vision API + Microsoft 365
      </p>
      <Rule />
      <SectionLabel>End-to-End Workflow</SectionLabel>
      <Flow nodes={[
        { icon:'⏱️', label:'Task Scheduler', sub:'Fires every X min\nWindows cron', color:t.accent, pulse:true },
        { icon:'📸', label:'Screenshot', sub:'.NET Forms+Drawing\nFull-screen PNG', color:t.accent },
        { icon:'🔢', label:'Base64 Encode', sub:'Image → string\nfor API payload', color:t.blue },
        { icon:'🧠', label:'GPT-4 Vision', sub:'Extracts per-LOB\ncalls + wait time', color:t.blue, pulse:true },
        { icon:'✅', label:'Regex Validate', sub:'Format check\nbefore processing', color:t.blue },
        { icon:'⚖️', label:'Threshold Logic', sub:'Per-LOB rules\nongoing vs resolved', color:t.green },
        { icon:'📋', label:'State Tracker', sub:'alert.txt\n>30min → escalate', color:t.green },
        { icon:'📣', label:'M365 Alert', sub:'Teams message\n+ log rotation', color:t.purple, pulse:true },
      ]} />
      <SectionLabel>Live Log Simulation</SectionLabel>
      <Ticker active={active} />
      <DetailGrid cards={[
        { title:'🎯 Per-LOB Thresholds', items:['LOB 1 → >10 calls OR >10 min wait','LOB 2 → >5 calls OR >20 min wait','LOB 3 → >5 calls OR >20 min wait','LOB 4 → >3 calls OR >20 min wait'] },
        { title:'⚙️ Engine Details', items:['Loaded .NET Forms + Drawing assemblies','Timestamp + latest.png overwrite pattern','Regex validates GPT output format before logging','Alert state persisted in alert.txt','Escalation if breach persists >30 min'] },
        { title:'📦 Historical Layer', items:['Every GPT response logged with timestamp','Log rotation for historical trend analysis','Centralized shareable output for team','Replaced dedicated full-time monitor role'] },
      ]} />
      <MetricsRow items={[['$75K','Annual savings\nCoast Capital'],['0','Manual interventions\nin monitoring loop'],['4 LOBs','Monitored\nsimultaneously'],['30 min','Max escalation\nresponse time']]} />
    </div>
  )
}

function ForecastPanel() {
  return (
    <div>
      <p style={{ fontSize:'.88rem', color:t.duneMid, lineHeight:1.7, maxWidth:700 }}>
        Shedula.io + Standalone Streamlit App · Python + StatCan API + Holt-Winters / ARIMA / Seasonal Decomp
      </p>
      <Rule />
      <SectionLabel>Forecasting Pipeline</SectionLabel>
      <Flow nodes={[
        { icon:'📂', label:'Data Ingestion', sub:'CSV / StatCan API\nor dummy data', color:t.accent, pulse:true },
        { icon:'🔍', label:'Analysis Engine', sub:'Linear regression\nAutocorr lag 7\nCoeff. of variation', color:t.accent },
        { icon:'🧠', label:'Smart Detection', sub:'Picks best method\nplain-English reason', color:t.blue, pulse:true },
        { icon:'📐', label:'Model Runs', sub:'Holt-Winters\nARIMA / Seasonal\nMoving Average', color:t.blue },
        { icon:'📅', label:'Erlang C', sub:'Volume → agents\nper 30-min interval', color:t.green },
        { icon:'📊', label:'Staffing Output', sub:'3/6/12 month\nwritten to DB', color:t.purple, pulse:true },
      ]} />
      <DetailGrid cards={[
        { title:'📈 Holt-Winters', items:['Trend detected (slope > threshold)','AND weekly seasonality confirmed (autocorr lag 7)','Best fit for most contact centres','Handles both trend + cyclical patterns'] },
        { title:'📉 ARIMA', items:['Clear trend present','No significant weekly seasonality','Statistical time series model','Used for monotonic growth/decline'] },
        { title:'🌊 Seasonal Decomp', items:['Strong weekly pattern detected','No significant trend slope','Separates seasonal from residual','Best for stable, cyclical volumes'] },
        { title:'📏 Moving Average', items:['Stable volume — low variance (CV)','No trend, no seasonality','Simple flat-projection baseline','Last 4 periods average projected forward'] },
      ]} />
      <MetricsRow items={[['60→90%','Forecast accuracy\nCoast Capital · 90 days'],['4','Methods compared\nsimultaneously'],['12mo','Max forecast\nhorizon'],['Live','StatCan API pull\nreal-time data']]} />
    </div>
  )
}

const PipeStep = ({ title, body, color, delay=0 }) => (
  <div style={{ background:t.white, border:`1px solid ${t.border}`, borderTop:`3px solid ${color}`,
    borderRadius:4, padding:'14px 16px', flex:1, animation:`fadeUp 0.4s ease ${delay}s both` }}>
    <h5 style={{ fontSize:'.78rem', fontWeight:800, color:t.dune, marginBottom:4 }}>{title}</h5>
    <p style={{ fontSize:'.73rem', color:t.duneMid, lineHeight:1.55 }}>{body}</p>
  </div>
)

function PowerBIPanel() {
  return (
    <div>
      <p style={{ fontSize:'.88rem', color:t.duneMid, lineHeight:1.7, maxWidth:700 }}>
        Concentrix · 2022 · Power Query + M Language + Power BI Service · 50+ analysts · 20+ accounts
      </p>
      <Rule />
      <SectionLabel>Before — Manual Process (2 hours)</SectionLabel>
      <div style={{ display:'flex', alignItems:'stretch', gap:8, flexWrap:'wrap', marginBottom:20 }}>
        <PipeStep title="📥 Raw Data Export" body="Manual NICE IEX exports per LOB. Multiple files, no standard format. Analyst-dependent." color={t.red} delay={0} />
        <Arrow />
        <PipeStep title="🔨 Excel Manipulation" body="VLOOKUP chains, manual pivot tables, copy-paste across sheets. Error-prone." color={t.red} delay={0.1} />
        <Arrow />
        <PipeStep title="📊 Static Report" body="PowerPoint / static Excel deck. Stale within hours. No drill-down capability." color={t.red} delay={0.2} />
      </div>
      <SectionLabel>After — Automated Pipeline (10 minutes)</SectionLabel>
      <div style={{ display:'flex', alignItems:'stretch', gap:8, flexWrap:'wrap', marginBottom:8 }}>
        <PipeStep title="🔗 Data Connectors" body="Power Query connects to IEX exports + SharePoint. Parameterized sources — no manual file handling." color={t.green} delay={0} />
        <Arrow />
        <PipeStep title="⚙️ M Language ETL" body="Custom M functions: column normalization, shrinkage calc, multi-LOB merge, date spine generation." color={t.green} delay={0.1} />
        <Arrow />
        <PipeStep title="📐 Data Model" body="Star schema: fact_adherence, dim_agent, dim_queue, dim_date. Net staffing + gap analysis columns." color={t.green} delay={0.2} />
        <Arrow />
        <PipeStep title="📊 Live Dashboard" body="Refresh-on-demand. Exec KPI cards, intraday heatmap, drill-through per agent/LOB via Power BI Service." color={t.green} delay={0.3} />
      </div>
      <DetailGrid cards={[
        { title:'🔧 Power Query / M', items:['Custom M functions for reusable transforms','Dynamic parameter tables for LOB config','H:MM normalization (Excel strips leading zeros)','Bulk interval merge across 20+ accounts'] },
        { title:'📐 Data Model', items:['Star schema — fact + dimension tables','Net staffing = scheduled − required','Shrinkage % applied per 30-min interval','Rolling 4-week average baselines'] },
        { title:'📊 Dashboards', items:['Real-time adherence by agent + LOB','Intraday coverage heatmap (red/green)','Attrition + absenteeism trend lines','Executive Net Staffing summary cards'] },
      ]} />
      <MetricsRow items={[['2h→10min','Report production\ntime reduction'],['50+','Analysts using\nthe dashboard'],['20+','Client accounts\non one model'],['Live','Refresh-on-demand\nPower BI Service']]} />
    </div>
  )
}

const ArchDot = ({ color }) => <div style={{ width:7, height:7, borderRadius:'50%', background:color, flexShrink:0 }} />

function ShedulaPanel() {
  const cols = [
    { label:'Frontend · React', color:t.blue, items:[
      'Weekly Gantt (drag + resize blocks)','Coverage heatmap (Erlang C live)',
      'AI Forecasting UI + history pills','WFM Assistant Bot (Claude API)',
      'BroadcastChannel real-time sync','Stripe Checkout embed','Publish/unpublish gate',
    ]},
    { label:'Backend · FastAPI', color:t.accent, items:[
      'Scheduling engine (greedy gap-first)','Erlang C calculator (per 30-min interval)',
      'Forecasting pipeline (4 methods)','LLM orchestration (Claude API)',
      'REST API + HMAC-SHA256 webhooks','Rate limiting (slowapi middleware)',
      'Resend transactional email',
    ]},
    { label:'Infra & Data', color:t.green, items:[
      'PostgreSQL · 27 RLS-secured tables','Supabase Auth (JWT rotation + OAuth)',
      'Stripe subscriptions (3 tiers)','Vercel (frontend CDN)',
      'Render (backend, no cold starts)','Dependabot security alerts',
      'PIPEDA / GDPR compliant',
    ]},
  ]
  return (
    <div>
      <p style={{ fontSize:'.88rem', color:t.duneMid, lineHeight:1.7, maxWidth:700 }}>
        Solo-built · React + FastAPI + PostgreSQL/Supabase + Stripe · Live with paying customers
      </p>
      <Rule />
      <SectionLabel>System Architecture</SectionLabel>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:14, margin:'8px 0 24px' }}>
        {cols.map(({ label, color, items }) => (
          <div key={label} style={{ background:t.white, border:`1px solid ${t.border}`, borderRadius:6, padding:18 }}>
            <p style={{ fontSize:'.68rem', fontWeight:700, letterSpacing:'1px', textTransform:'uppercase',
              color, marginBottom:12, paddingBottom:8, borderBottom:`2px solid ${color}` }}>{label}</p>
            {items.map(item => (
              <div key={item} style={{ display:'flex', alignItems:'center', gap:8, padding:'5px 0',
                borderBottom:`1px solid ${t.bg}`, fontSize:'.76rem', color:t.duneMid }}>
                <ArchDot color={color} />{item}
              </div>
            ))}
          </div>
        ))}
      </div>
      <SectionLabel>Scheduling Engine Flow</SectionLabel>
      <Flow nodes={[
        { icon:'📋', label:'Coverage Reqs', sub:'Erlang C output\nper 30-min interval', color:t.accent, pulse:true },
        { icon:'🚫', label:'Time-Off Check', sub:'Skip approved\noff dates', color:t.accent },
        { icon:'⚖️', label:'Gap Analysis', sub:'Required −\nscheduled HC', color:t.blue },
        { icon:'🎯', label:'Greedy Assign', sub:'Gaps first,\nthen preferences', color:t.blue, pulse:true },
        { icon:'🔐', label:'Publish Gate', sub:'Draft → Published\nmanager controls', color:t.green },
        { icon:'📅', label:'Weekly Gantt', sub:'Live heatmap\n+ Excel export', color:t.purple, pulse:true },
      ]} />
      <MetricsRow items={[['27','RLS-secured\nDB tables'],['3','Billing tiers\nStarter/Growth/Pro'],['Live','Paying customers\nin production'],['6+','Trial orgs\nsigned up organically']]} />
    </div>
  )
}

function HootsuitePanel() {
  return (
    <div>
      <p style={{ fontSize:'.88rem', color:t.duneMid, lineHeight:1.7, maxWidth:700 }}>
        Hootsuite · 2025–Present · Claude Opus 4.8 + Salesforce MCP + Slack MCP + Workflow Automation
      </p>
      <Rule />
      <SectionLabel>Multi-Source Intelligence Workflow</SectionLabel>
      <Flow nodes={[
        { icon:'📊', label:'Salesforce CRM', sub:'Ticket volumes\ncase types\ndemand signals', color:t.blue, pulse:true },
        { icon:'🔌', label:'Salesforce MCP', sub:'Live data bridge\nto Claude context', color:t.blue },
        { icon:'🧠', label:'Claude Opus 4.8', sub:'Fuses CRM +\nWFM context', color:t.accent, pulse:true },
        { icon:'⚙️', label:'Skills + Workflows', sub:'Multi-step logic\norchestration layer', color:t.accent },
        { icon:'🔌', label:'Slack MCP', sub:'Pushes recs\nwhere team works', color:t.green },
        { icon:'✅', label:'WFM Action', sub:'Coverage gaps\nflagged + decisions', color:t.green, pulse:true },
      ]} />
      <DetailGrid cards={[
        { title:'🔗 Salesforce MCP', items:['Live ticket volume by queue/channel','Case type breakdown for demand classification','AHT signals from case complexity data','No manual data pulls — context injected per query'] },
        { title:'🤖 Claude Opus 4.8', items:['Fuses CRM demand with WFM staffing data','Identifies coverage gaps per interval','Flags demand spikes before they hit SLAs','Plain-language recommendations for team leads'] },
        { title:'💬 Slack MCP Output', items:['Recommendations pushed to team Slack channels','Actionable alerts — not just raw data','Team operates without switching tools','Async-friendly for global team (5 analysts)'] },
        { title:'📐 Business Impact', items:['WFM team operates at higher situational awareness','Faster, more confident staffing decisions','Optimizes headcount without adding analysts','Decouples team growth from operational complexity'] },
      ]} />
      <MetricsRow items={[['Claude\nOpus 4.8','LLM powering\nthe agent'],['2 MCPs','Salesforce +\nSlack connected'],['5','Global analysts\nusing it daily'],['0','Manual data\npulls needed']]} />
    </div>
  )
}

/* ── MAIN COMPONENT ── */
export default function Showcase() {
  const [active, setActive] = useState('rta')

  const panels = { rta:<RtaPanel active={active==='rta'} />, forecast:<ForecastPanel />, powerbi:<PowerBIPanel />, shedula:<ShedulaPanel />, hootsuite:<HootsuitePanel /> }

  return (
    <section style={{ background:t.bg, borderTop:`1px solid ${t.border}` }}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes scan   { from{transform:translateX(-100%)} to{transform:translateX(100%)} }
        @keyframes blink  { 50%{opacity:0} }
      `}</style>

      {/* section header */}
      <div style={{ padding:'52px 7% 0' }}>
        <p style={{ fontSize:'.68rem', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:t.duneLight, marginBottom:8 }}>
          Technical Showcase
        </p>
        <h2 style={{ fontSize:'clamp(1.4rem,2.8vw,2rem)', fontWeight:800, color:t.dune, letterSpacing:'-.3px', marginBottom:8 }}>
          Projects — Frameworks & Workflows
        </h2>
        <div style={{ width:32, height:3, background:t.accent, borderRadius:1, margin:'12px 0 0' }} />
      </div>

      {/* tabs */}
      <div style={{ display:'flex', gap:0, borderBottom:`2px solid ${t.border}`, background:t.white,
        padding:'0 7%', overflowX:'auto', marginTop:24 }}>
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => setActive(tab.id)}
            style={{ padding:'14px 22px', fontSize:'.78rem', fontWeight:700, letterSpacing:'.4px',
              textTransform:'uppercase', cursor:'pointer', background:'none', border:'none',
              borderBottom: active===tab.id ? `3px solid ${t.accent}` : '3px solid transparent',
              marginBottom:-2, color: active===tab.id ? t.dune : t.duneLight,
              whiteSpace:'nowrap', transition:'all .2s' }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* panel content */}
      <div style={{ padding:'36px 7% 52px' }}>
        <div style={{ maxWidth:1060, margin:'0 auto' }}>
          {panels[active]}
        </div>
      </div>
    </section>
  )
}
