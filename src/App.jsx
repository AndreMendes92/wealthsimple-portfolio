import { useState, useEffect } from 'react'

/* ── STYLE TOKENS ── */
const t = {
  dune:'#32302F', duneMid:'#5a5856', duneLight:'#8a8785',
  cream:'#f5f0eb', creamDark:'#ede7df', sand:'#d4cbc0',
  white:'#ffffff', black:'#0d0b0a', accent:'#c8763a',
  border:'#e8e3dd', bg:'#faf8f5',
}

/* ── DATA ── */
const metrics = [
  { n:'10+',    l:'Years WFM architecture & operations' },
  { n:'2 yrs',  l:'Production AI — LLM agents, GPT-4 Vision, Claude Sonnet 4.6 & Opus 4.8 with MCP connectors' },
  { n:'5+ yrs', l:'Scripting & process automation — PowerShell, OCR, Power Automate, bot pipelines' },
  { n:'10K+',   l:'Call centre agents on WFM platforms I deployed & managed' },
  { n:'$175K+', l:'Annual savings from automation I built ($100K Concentrix · $75K Coast Capital)' },
  { n:'Vibe',   l:'Solo-built live B2B WFM SaaS using vibe coding — paying customers, production infrastructure' },
  { n:'MBA',    l:'University Canada West · 2024' },
]

const aiCards = [
  {
    title:'RTA Bot — Autonomous Queue Monitoring Agent',
    tags:'GPT-4 Vision · PowerShell · M365 · Historical Logging · $75K Saved',
    body:<>
      <b>Coast Capital Savings.</b> Built a <b>GPT-4 Vision autonomous agent</b> that captures call centre dashboard screenshots via PowerShell Task Scheduler, converts to Base64, sends to the Vision API, extracts calls-waiting and wait-time data per LOB, applies custom threshold logic, tracks alert state (ongoing vs. resolved), and escalates via Microsoft 365 if a breach persists 30+ minutes. Beyond alerting, the bot <b>logs every interval to a historical dataset</b> — enabling trend analysis, pattern detection, and proactive staffing decisions. Prior to this, real-time queue monitoring was a dedicated full-time manual role. The bot eliminated that entirely, delivering an estimated <b>$75K in annual savings</b> while producing richer, more consistent data than the manual process ever could.
    </>,
  },
  {
    title:'Shedula.io — AI Forecasting Engine',
    tags:'Holt-Winters · ARIMA · Erlang C · FastAPI · Python',
    body:<>
      Built a <b>smart method detection pipeline</b> that analyses historical interval data for trend (linear regression slope), weekly seasonality (autocorrelation lag 7), and variance (coefficient of variation) — automatically recommends Moving Average, ARIMA, Seasonal Decomposition, or <b>Holt-Winters.</b> Generates plain-English reasoning, applies Erlang C to produce per-interval staffing requirements. Horizons of 3, 6, or 12 months.
    </>,
  },
  {
    title:'WFM Assistant Bot — Context-Aware AI Agent (Shedula.io)',
    tags:'Claude API · LLM · Live Org Context · Action Execution · React',
    body:<>
      Built a <b>floating AI chat agent</b> powered by a Large Language Model (LLM) — the AI understands natural language and generates intelligent, context-aware responses, not scripted rule-based replies. Before every message, the bot is injected with <b>live org data:</b> active agents, per-interval coverage gaps, schedule status, and pending time-off. Proposes and executes real actions (<code style={{background:t.cream,padding:'1px 5px',borderRadius:2,fontSize:'.82em'}}>create_agent</code>, <code style={{background:t.cream,padding:'1px 5px',borderRadius:2,fontSize:'.82em'}}>approve_timeoff</code>, <code style={{background:t.cream,padding:'1px 5px',borderRadius:2,fontSize:'.82em'}}>deny_timeoff</code>) via structured <b>ACTION_PROPOSAL blocks</b> with manager confirmation UI before anything fires.
    </>,
  },
  {
    title:'Hootsuite WFM Intelligence Bot — Claude + Salesforce + Slack',
    tags:'Claude Opus 4.8 · Salesforce MCP · Slack MCP · Workflow Automation · Hootsuite',
    body:<>
      <b>Hootsuite (current).</b> Built an internal WFM intelligence bot using <b>Claude Opus 4.8 with Salesforce and Slack MCP (Model Context Protocol)</b> connectors — linking live CRM data, ticket volumes, and team communications into a single intelligent workflow. The bot surfaces real-time WFM staffing visibility: identifying coverage gaps, flagging demand spikes from Salesforce ticket data, and pushing actionable recommendations directly into Slack. Built using <b>Claude's skills and workflow automation layer</b> to orchestrate multi-source context without manual data pulls. Result: the WFM team operates with significantly higher situational awareness — <b>optimizing current headcount efficiency without adding analysts.</b>
    </>,
  },
  {
    title:'Coverage-First Scheduling Engine',
    tags:'Python · FastAPI · Constraint Logic · Erlang C',
    body:<>
      Built a <b>greedy gap-first auto-scheduler</b> from scratch: ingests coverage requirements, agent skills, availability, preferred days off, max hours (FT/PT), consecutive day limits — assigns shifts to close staffing gaps before honouring preferences. Live coverage heatmap (Erlang C per 30-min interval). Weekly Gantt with real-time coverage bars. Production at Shedula.io.
    </>,
  },
  {
    title:'REST API + Webhook Integration Layer',
    tags:'REST API · HMAC Webhooks · FastAPI · Supabase',
    body:<>
      Designed and built Shedula.io's <b>full API integration layer:</b> SHA-256 API key auth, outbound HMAC-SHA256-signed webhooks (<code style={{background:t.cream,padding:'1px 5px',borderRadius:2,fontSize:'.82em'}}>schedule.published</code>, <code style={{background:t.cream,padding:'1px 5px',borderRadius:2,fontSize:'.82em'}}>timeoff.approved</code>), inbound receivers for Zendesk / Five9 / Genesys volume data, and a public REST API. Delivery logs, retry logic, signing secrets — production-grade.
    </>,
  },
  {
    title:'Power BI Automation — 2h → 10min Reporting',
    tags:'Power BI · Power Query · M Language · Enterprise Scale',
    body:<>
      At Concentrix, rebuilt the Net Staffing reporting pipeline with <b>Power Query + M Language</b> — replaced a 2-hour manual Excel process with a refresh-on-demand Power BI dashboard. Scaled to serve <b>50+ analysts across 20+ accounts.</b> Delivered real-time adherence, shrinkage, and performance metrics directly to executive leadership.
    </>,
  },
]

const timeline = [
  {
    org:'Hootsuite · Vancouver, BC',
    role:'Team Lead, Workforce Management',
    date:'September 2025 – Present',
    tag:'Current · Team Lead · AI Strategy',
    bullets:[
      <>Leading a global team of <b>5 WFM analysts</b> — setting technical direction, building AI-augmented procedures, raising the automation bar.</>,
      <>Driving WFM platform evaluation with focus on <b>API-based customization and scalability.</b></>,
      <>Building governance frameworks that let the team operate at higher leverage without adding headcount.</>,
    ],
  },
  {
    org:'Coast Capital Savings · Surrey, BC',
    role:'Workforce Planning Analyst',
    date:'January 2024 – October 2025',
    tag:'AI Agent · Forecasting · Merger Scenario Modelling',
    bullets:[
      <>Built and deployed the <b>RTA Bot</b> — PowerShell + GPT-4 Vision autonomous agent replacing manual queue monitoring. <b>$75K annual savings.</b></>,
      <>Rebuilt forecasting methodology from <b>~60% to 90%+ accuracy in 90 days.</b></>,
      <>Led <b>what-if scenario modelling during a 3-credit-union merger</b> — resource optimization across the combined org.</>,
      <>Sole WFM owner for the entire BC call centre and branch network.</>,
    ],
  },
  {
    org:'Concentrix · São Paulo, Brazil',
    role:'WFM Specialist → Senior Analyst → Analyst',
    date:'April 2020 – September 2023 · 3 yrs 6 mos',
    tag:'Platform Deployment · Automation · Enterprise Scale',
    bullets:[
      <>Led <b>NICE IEX WFM v7.1 deployment</b> across all Brazil operations — 10,000+ employees. Understand platform schemas, API limits, and integration architecture, not just the UI.</>,
      <>Built RTA bot POC saving <b>$100,000 annually;</b> rebuilt Net Staffing reporting from 2h → 10min via Power BI automation.</>,
      <>Owned <b>enterprise capacity planning across 22+ portfolios.</b> Implemented IBM Cognos for centralized visibility.</>,
      <>Directed and mentored <b>50+ WFM analysts;</b> acted as WFM Governance Lead building SOP and CI frameworks.</>,
    ],
  },
  {
    org:'Conduent · São Paulo, Brazil',
    role:'WFM Supervisor → WFM Analyst',
    date:'May 2016 – April 2020 · 4 yrs',
    tag:'First Leadership Role · Scheduling Optimization',
    bullets:[
      <>Promoted to WFM Lead — supervised 5 analysts, built first capacity planning and intraday frameworks from scratch.</>,
      <>Drove <b>30% productivity improvement</b> through algorithmic scheduling optimization.</>,
    ],
  },
]

const alignCards = [
  { icon:'🤖', title:'Build AI Agents for WFM Automation', match:'✓ Production Shipped',
    body:'Two production AI agents shipped: RTA Bot (GPT-4 Vision autonomous monitoring) and Shedula WFM Assistant Bot (Claude API LLM with live org context + action execution). Hootsuite bot with Claude Opus 4.8 + Salesforce & Slack MCP. All live, real users.' },
  { icon:'📈', title:'Forecasting Models & Real-Time Engines', match:'✓ Built & In Production',
    body:'Built AI forecasting engine in Shedula (Holt-Winters, ARIMA, Seasonal Decomp, smart method detection). Rebuilt Coast Capital\'s methodology 60→90% in 90 days. Erlang C calculator integrated into live staffing pipeline.' },
  { icon:'🔧', title:'WFM Platform Technical Co-Ownership', match:'✓ Deep Vendor Experience',
    body:'Deployed NICE IEX v7.1 at 10,000+ employee scale — understand underlying schemas, API limits, and integration boundaries. Currently leading platform tooling assessment at Hootsuite focused on API-customizable systems.' },
  { icon:'🔗', title:'REST APIs, Webhooks & Middleware', match:'✓ Production Code Shipped',
    body:'Built Shedula\'s full API layer: SHA-256 auth, HMAC-signed webhooks, inbound receivers for Zendesk/Five9/Genesys, public REST API. Wrote production code against APIs end to end — no intermediary.' },
  { icon:'📐', title:'Decouple Headcount from Growth', match:'✓ Core Operating Principle',
    body:'This is my operating principle. Every system I\'ve built — RTA bot, scheduling engine, forecasting pipeline, API layer — exists to absorb operational scale without proportional headcount increases.' },
  { icon:'👥', title:'Set Technical Direction & Mentor', match:'✓ Direct Match',
    body:'Setting WFM technical direction at Hootsuite (5 global analysts). Previously mentored 50+ analysts at Concentrix through platform deployments, governance frameworks, and documentation.' },
  { icon:'🏦', title:'Regulated Financial Services', match:'✓ Fintech-Adjacent Background',
    body:'Coast Capital Savings (Canadian financial institution, strict SLA compliance). Shedula.io built PIPEDA/GDPR-compliant with full security audit — regulated-environment thinking is embedded in how I build.' },
  { icon:'🧩', title:'WFM Vendor Architecture Depth', match:'✓ Deep Vendor Knowledge',
    body:'NICE IEX v7.1 at enterprise scale — understand data schemas, API capabilities, and integration limits beyond UI navigation. IBM Cognos, IEX Forecasting, Avaya CMS, Genesys CMS all used in production.' },
]

const stackGroups = [
  { title:'AI & LLM', items:[['GPT-4 Vision API',true],['Claude Sonnet 4.6',true],['Claude Opus 4.8',true],['MCP Connectors',true],['LLM Orchestration',false],['Prompt Engineering',false]] },
  { title:'Automation & Scripting', items:[['PowerShell',true],['Power Automate',true],['OCR (Tesseract)',false],['Task Scheduler',false],['Bot Automation',false]] },
  { title:'Backend & APIs', items:[['FastAPI (Python)',true],['REST APIs',true],['Webhooks (HMAC)',true],['PostgreSQL/Supabase',false],['Stripe API',false]] },
  { title:'Frontend', items:[['React',true],['Tailwind CSS',false],['Vercel',false],['Vite',false]] },
  { title:'Analytics & BI', items:[['Power BI',true],['Power Query / M',true],['Excel (Advanced)',true],['IBM Cognos',false]] },
  { title:'WFM Platforms', items:[['NICE IEX WFM',true],['IEX Forecasting',true],['Avaya CMS',false],['Genesys CMS',false],['IBM Cognos',false]] },
  { title:'Forecasting Methods', items:[['Erlang C',true],['Holt-Winters',true],['ARIMA',false],['Seasonal Decomp',false],['Linear Regression',false]] },
  { title:'Security & Infra', items:[['SHA-256 API Keys',false],['RLS (27 tables)',false],['JWT/Rate Limiting',false],['PIPEDA/GDPR',false],['Render · Vercel',false]] },
]

const smRows = [
  { jd:'6–8+ years WFM architecture & contact centre platform operations', me:'10+ years across Conduent, Concentrix, Coast Capital, Hootsuite — contact centre and financial services' },
  { jd:'5+ years designing end-to-end WFM solutions: forecasting, scheduling, real-time engines', me:'Built scheduling engine, Erlang C calculator, AI forecasting pipeline, and coverage heatmap in Shedula.io from scratch' },
  { jd:'3+ years production AI & automation: autonomous agents, LLM orchestration, Python', me:'GPT-4 Vision RTA agent + Claude API WFM bot + Shedula AI forecasting engine + Hootsuite Claude Opus 4.8 bot — all in production' },
  { jd:'Production REST APIs, webhooks, data warehouse middleware between WFM/CRM/ticketing', me:'Built Shedula REST API, HMAC-signed webhooks, inbound receivers for Zendesk / Five9 / Genesys volume' },
  { jd:'Business strategy → technical system design; mentor junior specialists', me:'Setting WFM tech direction at Hootsuite (5 analysts); mentored 50+ analysts at Concentrix through platform deployments' },
  { jd:'WFM vendor depth: schemas, APIs, integration limits (NICE, Verint, Assembled, Playvox)', me:'NICE IEX v7.1 deployed at enterprise scale — data schemas, API limits, integration architecture known in depth' },
  { jd:'BI tools for exec-level contact centre dashboards', me:'Power BI + Power Query → exec dashboards; 2h → 10min pipeline at Concentrix (50+ analysts, 20+ accounts)' },
  { jd:'Fintech / regulated financial services background', me:'Coast Capital (Canadian financial institution) + Shedula PIPEDA/GDPR-compliant, full RLS security audit' },
]

/* ── COMPONENTS ── */
const Eyebrow = ({ children, light }) => (
  <p style={{ fontSize:'.68rem', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase',
    color: light ? 'rgba(255,255,255,.4)' : t.duneLight, marginBottom:8 }}>{children}</p>
)

const H2 = ({ children, light }) => (
  <h2 style={{ fontSize:'clamp(1.4rem,2.8vw,2rem)', fontWeight:800, letterSpacing:'-.3px',
    color: light ? t.white : t.dune, marginBottom:8 }}>{children}</h2>
)

const Rule = () => (
  <div style={{ width:32, height:3, background:t.accent, borderRadius:1, marginBottom:32 }} />
)

const Tag = ({ children, dark }) => (
  <span style={{ display:'inline-block', background: dark ? 'rgba(255,255,255,.08)' : t.cream,
    color: dark ? 'rgba(255,255,255,.7)' : t.duneMid, fontSize:'.68rem', fontWeight:600,
    letterSpacing:'.4px', padding:'3px 10px', borderRadius:2, marginTop:12 }}>{children}</span>
)

/* ── NAV ── */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])
  return (
    <nav style={{ background:t.white, borderBottom:`1px solid ${t.border}`,
      padding:'0 7%', height:58, display:'flex', alignItems:'center',
      justifyContent:'space-between', position:'sticky', top:0, zIndex:100,
      boxShadow: scrolled ? '0 2px 12px rgba(0,0,0,.06)' : 'none', transition:'box-shadow .3s' }}>
      <div style={{ display:'flex', alignItems:'center', gap:14 }}>
        <span style={{ fontSize:'1.15rem', fontWeight:800, color:t.dune, letterSpacing:'-.4px' }}>Wealthsimple</span>
        <div style={{ width:1, height:20, background:t.border }} />
        <span style={{ fontSize:'.78rem', color:t.duneLight }}>Andre Mendes · Candidate Portfolio</span>
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:28 }}>
        {['#ai','#career','#alignment','#stack'].map((h,i) => (
          <a key={h} href={h} style={{ fontSize:'.8rem', color:t.duneMid, fontWeight:500,
            display: i > 1 ? 'none' : undefined }}
            onMouseEnter={e=>e.target.style.color=t.dune}
            onMouseLeave={e=>e.target.style.color=t.duneMid}>
            {['AI & Automation','Career','Alignment','Stack'][i]}
          </a>
        ))}
        <span style={{ background:t.dune, color:t.white, fontSize:'.72rem', fontWeight:700,
          padding:'5px 14px', borderRadius:2, letterSpacing:'.3px' }}>
          Lead, WFM Platform & Automation
        </span>
      </div>
    </nav>
  )
}

/* ── HERO ── */
function Hero() {
  return (
    <section style={{ background:t.dune, padding:'72px 7% 68px' }}>
      <div style={{ display:'flex', gap:56, alignItems:'center', flexWrap:'wrap' }}>
        <img src="photo.jpg" alt="Andre Mendes"
          style={{ width:108, height:108, borderRadius:'50%', objectFit:'cover',
            border:`2px solid rgba(255,255,255,.15)`, flexShrink:0 }} />
        <div style={{ flex:1, minWidth:260 }}>
          <p style={{ fontSize:'.72rem', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase',
            color:t.sand, marginBottom:16 }}>WFM Architect · AI Builder · Interview Portfolio</p>
          <h1 style={{ fontSize:'clamp(2rem,4vw,3rem)', fontWeight:800, color:t.white,
            lineHeight:1.05, letterSpacing:'-.5px', marginBottom:10 }}>Andre Mendes</h1>
          <p style={{ color:'rgba(255,255,255,.6)', fontSize:'.95rem', lineHeight:1.75,
            maxWidth:500, marginBottom:22 }}>
            10+ years turning workforce management from a manual discipline into a system-driven capability.
            I don't just run WFM — I build the infrastructure that makes it scale without adding headcount.
          </p>
          <div style={{ display:'flex', gap:20, flexWrap:'wrap' }}>
            {[['Vancouver, BC',null],['andremanentem@gmail.com','mailto:andremanentem@gmail.com'],
              ['778 255 0144','tel:+17782550144'],['LinkedIn','https://www.linkedin.com/in/andremendes-2610']
            ].map(([label, href]) => href
              ? <a key={label} href={href} target={href.startsWith('http')?'_blank':undefined}
                  style={{ color:'rgba(255,255,255,.45)', fontSize:'.8rem' }}
                  onMouseEnter={e=>e.target.style.color='rgba(255,255,255,.8)'}
                  onMouseLeave={e=>e.target.style.color='rgba(255,255,255,.45)'}>{label}</a>
              : <span key={label} style={{ color:'rgba(255,255,255,.45)', fontSize:'.8rem' }}>{label}</span>
            )}
          </div>
        </div>
        <div style={{ border:`1px solid rgba(255,255,255,.12)`, borderRadius:4, padding:'24px 28px', flexShrink:0 }}>
          <p style={{ fontSize:'.65rem', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase',
            color:'rgba(255,255,255,.35)', marginBottom:10 }}>Applying For</p>
          <p style={{ fontSize:'1rem', fontWeight:800, color:t.white, lineHeight:1.4 }}>
            Lead, WFM Platform<br/>&amp; Automation
          </p>
          <p style={{ fontSize:'.78rem', color:'rgba(255,255,255,.35)', marginTop:6 }}>
            Wealthsimple · Client Experience Ops
          </p>
        </div>
      </div>
    </section>
  )
}

/* ── METRICS ── */
function Metrics() {
  return (
    <section style={{ background:t.dune, borderTop:`1px solid rgba(255,255,255,.06)` }}>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(145px,1fr))',
        gap:1, background:'rgba(255,255,255,.08)' }}>
        {metrics.map(({n,l}) => (
          <div key={n} style={{ padding:'28px 16px', textAlign:'center',
            background:'rgba(20,18,18,.6)', display:'flex', flexDirection:'column',
            alignItems:'center', justifyContent:'center' }}>
            <div style={{ fontSize:'1.85rem', fontWeight:800, color:t.white, letterSpacing:'-.5px' }}>{n}</div>
            <div style={{ color:'rgba(255,255,255,.45)', fontSize:'.72rem', marginTop:5, lineHeight:1.4 }}>{l}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── AI SECTION ── */
function AiSection() {
  return (
    <section id="ai" style={{ padding:'64px 7%' }}>
      <Eyebrow>The Core Differentiator</Eyebrow>
      <H2>AI & Automation — What I've Actually Built</H2>
      <Rule />
      <div style={{ background:t.creamDark, borderLeft:`3px solid ${t.accent}`,
        padding:'28px 32px', borderRadius:'0 4px 4px 0', marginBottom:40 }}>
        <p style={{ fontSize:'1rem', color:t.dune, lineHeight:1.8 }}>
          Wealthsimple's brief is clear: <b>decouple team headcount growth from company growth.</b> That's been
          my operating principle for three years. I don't add analysts when volume grows — I build systems that
          absorb growth automatically. Every automation I've shipped exists to remove a human from a loop that
          shouldn't need one. I sit at the intersection of deep WFM domain knowledge and production
          engineering — knowing exactly what the business needs and being able to build it without an
          intermediary is what makes the systems I ship actually work.
        </p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',
        gap:1, background:t.border, border:`1px solid ${t.border}`, borderRadius:4, overflow:'hidden',
        marginBottom:32 }}>
        {aiCards.map(({title,tags,body}) => (
          <div key={title} style={{ background:t.white, padding:'28px 26px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
              <div style={{ width:8, height:8, borderRadius:'50%', background:t.accent, flexShrink:0 }} />
              <h4 style={{ fontSize:'.9rem', fontWeight:800, color:t.dune, letterSpacing:'-.1px' }}>{title}</h4>
            </div>
            <p style={{ fontSize:'.83rem', color:t.duneMid, lineHeight:1.7 }}>{body}</p>
            <Tag>{tags}</Tag>
          </div>
        ))}
      </div>

      {/* Shedula callout */}
      <div style={{ background:t.dune, borderRadius:4, padding:'36px 40px',
        display:'flex', gap:32, flexWrap:'wrap', alignItems:'flex-start' }}>
        <div style={{ flex:1, minWidth:240 }}>
          <p style={{ fontSize:'.65rem', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase',
            color:t.sand, marginBottom:10 }}>Proof of Concept at Production Scale</p>
          <p style={{ fontSize:'1.3rem', fontWeight:800, color:t.white, marginBottom:10 }}>Shedula.io</p>
          <p style={{ color:'rgba(255,255,255,.6)', fontSize:'.85rem', lineHeight:1.75 }}>
            I solo-built a live B2B SaaS WFM platform using <b style={{color:'rgba(255,255,255,.85)'}}>vibe coding</b> —
            React frontend, FastAPI backend, PostgreSQL/Supabase, Stripe billing,{' '}
            <b style={{color:'rgba(255,255,255,.85)'}}>27 RLS-secured tables</b>, full security audit
            (JWT rotation, rate limiting, PIPEDA/GDPR compliance). Real paying customers.
            This isn't a side project — it's a production system I architected, engineered, and shipped end to end.
          </p>
          <a href="https://shedula.io" target="_blank" rel="noreferrer"
            style={{ display:'inline-block', marginTop:16, border:`1px solid rgba(255,255,255,.25)`,
              color:t.white, fontSize:'.8rem', fontWeight:600, padding:'8px 20px', borderRadius:2 }}>
            Visit Shedula.io →
          </a>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, minWidth:200 }}>
          {[['Live','Paying customers'],['27','RLS-secured DB tables'],['3','Billing tiers (Stripe)'],['6+','Trial orgs signed up']]
            .map(([n,l]) => (
            <div key={n} style={{ border:`1px solid rgba(255,255,255,.1)`, borderRadius:3,
              padding:'14px 16px', textAlign:'center' }}>
              <div style={{ fontSize:'1.4rem', fontWeight:800, color:t.white }}>{n}</div>
              <div style={{ fontSize:'.72rem', color:'rgba(255,255,255,.4)', marginTop:3 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── CAREER ── */
function Career() {
  return (
    <section id="career" style={{ padding:'64px 7%', background:t.bg }}>
      <Eyebrow>Career Progression</Eyebrow>
      <H2>From WFM Practitioner to WFM Systems Architect</H2>
      <Rule />
      <div style={{ maxWidth:820 }}>
        {timeline.map(({org,role,date,tag,bullets}, i) => (
          <div key={org} style={{ display:'flex', gap:22, marginBottom: i < timeline.length-1 ? 40 : 0 }}>
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', minWidth:32 }}>
              <div style={{ width:10, height:10, borderRadius:'50%', background:t.dune,
                border:`2px solid ${t.white}`, boxShadow:`0 0 0 2px ${t.dune}`, flexShrink:0 }} />
              {i < timeline.length-1 &&
                <div style={{ flex:1, width:1, background:t.border, marginTop:5 }} />}
            </div>
            <div style={{ paddingBottom:8 }}>
              <p style={{ fontSize:'.7rem', fontWeight:700, letterSpacing:'1px', textTransform:'uppercase',
                color:t.duneLight, marginBottom:4 }}>{org}</p>
              <p style={{ fontSize:'.98rem', fontWeight:800, color:t.dune }}>{role}</p>
              <p style={{ fontSize:'.76rem', color:t.duneLight, margin:'3px 0 10px' }}>{date}</p>
              <ul style={{ listStyle:'none', padding:0 }}>
                {bullets.map((b,j) => (
                  <li key={j} style={{ fontSize:'.84rem', color:t.duneMid, lineHeight:1.7,
                    paddingLeft:14, position:'relative', marginBottom:5 }}>
                    <span style={{ position:'absolute', left:0, color:t.sand }}>–</span>
                    {b}
                  </li>
                ))}
              </ul>
              <Tag>{tag}</Tag>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── ALIGNMENT ── */
function Alignment() {
  const [hov, setHov] = useState(null)
  return (
    <section id="alignment" style={{ padding:'64px 7%' }}>
      <Eyebrow>Role Alignment</Eyebrow>
      <H2>What Wealthsimple Needs → What I Bring</H2>
      <Rule />
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:20 }}>
        {alignCards.map(({icon,title,match,body},i) => (
          <div key={title}
            onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}
            style={{ background:t.white, border:`1px solid ${t.border}`, borderRadius:4,
              padding:'24px 22px', borderTop:`4px solid ${t.accent}`, transition:'box-shadow .2s,transform .2s',
              boxShadow: hov===i ? '0 6px 24px rgba(50,48,47,.1)' : 'none',
              transform: hov===i ? 'translateY(-2px)' : 'none' }}>
            <div style={{ fontSize:'1.3rem', marginBottom:10 }}>{icon}</div>
            <h3 style={{ fontSize:'.87rem', fontWeight:800, color:t.dune, marginBottom:8, letterSpacing:'-.1px' }}>{title}</h3>
            <p style={{ fontSize:'.81rem', color:t.duneMid, lineHeight:1.65 }}>{body}</p>
            <p style={{ fontSize:'.65rem', fontWeight:700, letterSpacing:'1px', textTransform:'uppercase',
              color:t.accent, marginTop:12 }}>{match}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── STACK ── */
function Stack() {
  return (
    <section id="stack" style={{ padding:'64px 7%', background:t.cream }}>
      <Eyebrow>Technical Capability</Eyebrow>
      <H2>Stack & Tools</H2>
      <Rule />
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:16 }}>
        {stackGroups.map(({title,items}) => (
          <div key={title} style={{ background:t.white, border:`1px solid ${t.border}`,
            borderRadius:4, padding:20 }}>
            <p style={{ fontSize:'.68rem', fontWeight:700, letterSpacing:'1.2px', textTransform:'uppercase',
              color:t.duneLight, marginBottom:12, paddingBottom:8, borderBottom:`1px solid ${t.border}` }}>{title}</p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
              {items.map(([name, strong]) => (
                <span key={name} style={{ background: strong ? t.dune : t.bg,
                  color: strong ? t.white : t.duneMid, fontSize:'.75rem',
                  padding:'4px 10px', borderRadius:2 }}>{name}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── SKILLS MATCH ── */
function SkillsMatch() {
  return (
    <section style={{ padding:'64px 7%' }}>
      <Eyebrow>Skills Alignment</Eyebrow>
      <H2>JD Requirements vs. My Experience</H2>
      <Rule />
      <div style={{ border:`1px solid ${t.border}`, borderRadius:4, overflow:'hidden' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr' }}>
          <div style={{ padding:28, background:t.bg, borderRight:`1px solid ${t.border}` }}>
            <p style={{ fontSize:'.7rem', fontWeight:700, letterSpacing:'1.2px', textTransform:'uppercase',
              color:t.duneLight, marginBottom:16, paddingBottom:8, borderBottom:`2px solid ${t.border}` }}>
              Wealthsimple Is Looking For
            </p>
            {smRows.map(({jd},i) => (
              <div key={i} style={{ display:'flex', gap:10, padding:'9px 0',
                borderBottom: i < smRows.length-1 ? `1px solid ${t.border}` : 'none' }}>
                <span style={{ fontSize:'.78rem', fontWeight:700, color:t.duneLight, flexShrink:0, width:18 }}>→</span>
                <span style={{ fontSize:'.82rem', color:t.duneMid, lineHeight:1.55 }}>{jd}</span>
              </div>
            ))}
          </div>
          <div style={{ padding:28, background:t.white }}>
            <p style={{ fontSize:'.7rem', fontWeight:700, letterSpacing:'1.2px', textTransform:'uppercase',
              color:'#1a7a3c', marginBottom:16, paddingBottom:8, borderBottom:`2px solid #2ea052` }}>
              What I Bring
            </p>
            {smRows.map(({me},i) => (
              <div key={i} style={{ display:'flex', gap:10, padding:'9px 0',
                borderBottom: i < smRows.length-1 ? `1px solid ${t.bg}` : 'none' }}>
                <span style={{ fontSize:'.78rem', fontWeight:700, color:t.accent, flexShrink:0, width:18 }}>✓</span>
                <span style={{ fontSize:'.82rem', color:t.duneMid, lineHeight:1.55 }}>{me}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── FOOTER ── */
function Footer() {
  return (
    <footer style={{ background:t.dune, padding:'32px 7%', display:'flex',
      alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}>
      <div style={{ color:'rgba(255,255,255,.35)', fontSize:'.78rem', lineHeight:1.8 }}>
        Andre Mendes · Lead, WFM Platform & Automation · Wealthsimple Interview Portfolio<br/>
        <a href="mailto:andremanentem@gmail.com" style={{color:'rgba(255,255,255,.35)'}}>andremanentem@gmail.com</a>
        {' · '}
        <a href="tel:+17782550144" style={{color:'rgba(255,255,255,.35)'}}>778 255 0144</a>
      </div>
      <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
        {[['LinkedIn','https://www.linkedin.com/in/andremendes-2610'],
          ['Shedula.io','https://shedula.io'],
          ['Full Portfolio','https://andremendes92.github.io/andre-mendes-wfm']
        ].map(([label,href]) => (
          <a key={label} href={href} target="_blank" rel="noreferrer"
            style={{ border:`1px solid rgba(255,255,255,.2)`, color:'rgba(255,255,255,.7)',
              fontSize:'.78rem', fontWeight:600, padding:'7px 16px', borderRadius:2 }}>
            {label} →
          </a>
        ))}
      </div>
    </footer>
  )
}

/* ── APP ── */
export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <Metrics />
      <AiSection />
      <Career />
      <Alignment />
      <Stack />
      <SkillsMatch />
      <Footer />
    </>
  )
}
