/* ═══════════════════════════════════════
   NISSI PORTFOLIO — script.js
   Aurora BG · Cursor · Terminal · Roles
   Projects · Skills · Labs · AI Chat
═══════════════════════════════════════ */
const $  = (s,c=document) => c.querySelector(s);
const $$ = (s,c=document) => [...c.querySelectorAll(s)];

/* ════════════════════════════════════
   AURORA BACKGROUND
   Smooth flowing gradient orbs —
   feels like northern lights / Linear.app
════════════════════════════════════ */
(function meshBG(){
  const cv = document.getElementById('bgCanvas');
  if(!cv) return;
  const ctx = cv.getContext('2d');
  let W, H;

  function resize(){ W = cv.width = window.innerWidth; H = cv.height = window.innerHeight; }
  resize(); window.addEventListener('resize', () => { resize(); init(); });

  let mouse = { x: W/2, y: H/2 };
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

  // Data stream lines — subtle, like Srujit's grid but moving
  const LINES = [];
  const LINE_COUNT = 18;

  function mkLine(){
    return {
      y:     Math.random() * H,
      x:    -200,
      len:   60 + Math.random() * 160,
      speed: 0.3 + Math.random() * 0.8,
      op:    0.03 + Math.random() * 0.09,
      w:     0.4 + Math.random() * 0.8,
      color: Math.random() > 0.5 ? '59,130,246' : Math.random() > 0.5 ? '139,92,246' : '20,184,166',
      pulse: Math.random(), // 0-1 position
      pSpeed: 0.005 + Math.random() * 0.01,
      nodes: Math.floor(1 + Math.random() * 3),
    };
  }

  function init(){
    LINES.length = 0;
    for(let i = 0; i < LINE_COUNT; i++){
      const l = mkLine();
      l.x = Math.random() * W; // spread on start
      LINES.push(l);
    }
  }
  init();

  // Subtle grid overlay
  function drawGrid(){
    const gs = 72;
    ctx.strokeStyle = 'rgba(255,255,255,0.018)';
    ctx.lineWidth = 0.5;
    for(let x = 0; x < W; x += gs){
      ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke();
    }
    for(let y = 0; y < H; y += gs){
      ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke();
    }
  }

  function tick(){
    ctx.clearRect(0,0,W,H);
    drawGrid();

    LINES.forEach(l => {
      // Main line
      ctx.beginPath();
      ctx.moveTo(l.x, l.y);
      ctx.lineTo(l.x + l.len, l.y);
      ctx.strokeStyle = `rgba(${l.color},${l.op})`;
      ctx.lineWidth = l.w;
      ctx.stroke();

      // Nodes
      for(let n = 1; n <= l.nodes; n++){
        const nx = l.x + (n / (l.nodes + 1)) * l.len;
        ctx.beginPath();
        ctx.arc(nx, l.y, l.w * 2.5, 0, Math.PI*2);
        ctx.fillStyle = `rgba(${l.color},${l.op * 2.5})`;
        ctx.fill();
      }

      // Moving pulse
      const pp = l.x + l.pulse * l.len;
      const pg = ctx.createRadialGradient(pp, l.y, 0, pp, l.y, 8);
      pg.addColorStop(0, `rgba(${l.color},${Math.min(0.8, l.op * 7)})`);
      pg.addColorStop(1, `rgba(${l.color},0)`);
      ctx.beginPath(); ctx.arc(pp, l.y, 8, 0, Math.PI*2);
      ctx.fillStyle = pg; ctx.fill();

      // Advance
      l.x += l.speed;
      l.pulse += l.pSpeed;
      if(l.pulse > 1) l.pulse = 0;
      if(l.x > W + 100){
        const nl = mkLine();
        nl.x = -nl.len - 10;
        Object.assign(l, nl);
      }
    });

    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();/* ════════════════════════════════════
   CUSTOM CURSOR — visible, smooth, glowing
════════════════════════════════════ */
(function(){
  const cur = document.getElementById('cur');
  const ring = document.getElementById('curR');
  if(!cur || !ring) return;

  let mx = window.innerWidth/2, my = window.innerHeight/2;
  let rx = mx, ry = my;

  // Move dot instantly on mouse move
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cur.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
  });

  // Ring follows with smooth lerp
  (function animRing(){
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(animRing);
  })();

  // Expand on interactive elements
  const targets = 'a,button,select,.role-pill,.pf,.rtab,.proj-card,.dash-card,.lab-card,.tl-card,.bp-btn';
  document.querySelectorAll(targets).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cB'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cB'));
  });
})();

/* ════════════════════════════════════
   NAV
════════════════════════════════════ */
window.addEventListener('scroll', () => {
  $('#navBar')?.classList.toggle('scrolled', scrollY > 50);
});
$('#menuBtn')?.addEventListener('click', () => $('#navLinks')?.classList.toggle('open'));
$$('#navLinks a').forEach(a => a.addEventListener('click', () => $('#navLinks')?.classList.remove('open')));
$('#themeBtn')?.addEventListener('click', () => {
  const t = document.documentElement.dataset.theme;
  document.documentElement.dataset.theme = t === 'light' ? '' : 'light';
});
$('#yr') && ($('#yr').textContent = new Date().getFullYear());

/* ════════════════════════════════════
   HERO CODE TERMINAL — types line by line
════════════════════════════════════ */
const CODE = [
  `<span class="cc"># M.S. Computer Science · NJIT 2024</span>`,
  `<span class="cc"># TCS Performance Excellence Award 🏆</span>`,
  ``,
  `<span class="ck">engineer</span> <span class="co">= {</span>`,
  `  <span class="cs">"name"</span><span class="co">:</span>     <span class="cs">"Prabhatha Nissi Guntur"</span><span class="co">,</span>`,
  `  <span class="cs">"exp"</span><span class="co">:</span>      <span class="cs">"4+ years"</span><span class="co">,</span>`,
  `  <span class="cs">"location"</span><span class="co">:</span> <span class="cs">"United States"</span><span class="co">,</span>`,
  `  <span class="cs">"visa"</span><span class="co">:</span>     <span class="cs">"F-1 STEM OPT"</span><span class="co">,</span>`,
  `  <span class="cs">"stack"</span><span class="co">: [</span>`,
  `    <span class="cs">"Python"</span><span class="co">,</span> <span class="cs">"Snowflake"</span><span class="co">,</span>`,
  `    <span class="cs">"LangChain"</span><span class="co">,</span> <span class="cs">"Airflow"</span><span class="co">,</span>`,
  `    <span class="cs">"Kafka"</span><span class="co">,</span> <span class="cs">"Spark"</span><span class="co">,</span>`,
  `    <span class="cs">"dbt"</span><span class="co">,</span> <span class="cs">"AWS"</span><span class="co">,</span> <span class="cs">"GCP"</span>`,
  `  <span class="co">],</span>`,
  `  <span class="cs">"impact"</span><span class="co">:</span>  <span class="cn">10_000_000</span> <span class="cc"># txn/day</span>`,
  `<span class="co">}</span>`,
  ``,
  `<span class="cc"># open to new roles ↓</span>`,
  `<span class="ck">print</span><span class="co">(</span><span class="cs">"Let's build something great."</span><span class="co">)</span> <span class="t-cur"></span>`,
];
(function(){
  const tb = $('#termBody'); if(!tb) return;
  let i = 0;
  function next(){
    if(i >= CODE.length) return;
    const d = document.createElement('div');
    d.innerHTML = CODE[i] || '&nbsp;';
    tb.appendChild(d); i++;
    setTimeout(next, i < 4 ? 70 : i < 9 ? 95 : 85);
  }
  setTimeout(next, 900);
})();

/* ════════════════════════════════════
   SCROLL REVEAL
════════════════════════════════════ */
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); revObs.unobserve(e.target); }});
}, { threshold: .08 });
$$('.reveal').forEach(el => revObs.observe(el));

/* ════════════════════════════════════
   ANIMATED COUNTERS (dashboard)
════════════════════════════════════ */
const cntObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(!e.isIntersecting) return;
    const el = e.target;
    const target = +el.dataset.target;
    const suffix = el.dataset.suffix || '';
    if(!target){ cntObs.unobserve(el); return; }
    let cur = 0;
    const step = Math.max(1, Math.ceil(target/60));
    const timer = setInterval(() => {
      cur += step;
      if(cur >= target){ cur = target; clearInterval(timer); }
      el.textContent = cur + suffix;
    }, 22);
    cntObs.unobserve(el);
  });
}, { threshold: .3 });
$$('.dc-num[data-target]').forEach(el => cntObs.observe(el));

/* ════════════════════════════════════
   SKILL BARS
════════════════════════════════════ */
const skObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(!e.isIntersecting) return;
    e.target.querySelectorAll('.skb-fill').forEach(b => b.style.width = b.dataset.w + '%');
    skObs.unobserve(e.target);
  });
}, { threshold: .25 });
$$('.skills-grid').forEach(el => skObs.observe(el));

/* ════════════════════════════════════
   RECRUITER MODE ROLE SWITCHER
════════════════════════════════════ */
const ROLES = {
  de: {
    title: 'Data Engineer roles needing Snowflake, Airflow, Spark, Python and SQL.',
    story: 'I build reliable pipelines, transform raw data into trusted assets, and design systems that cut manual work while improving freshness and accuracy. 4+ years of real DE at Apple Music scale.',
    stack: ['Python','SQL','Snowflake','Airflow','Spark','Kafka','dbt','ETL','AWS','Data Quality']
  },
  ds: {
    title: 'Data Scientist roles needing statistical modeling, ML, and business storytelling.',
    story: 'I turn messy data into decisions using EDA, hypothesis testing, feature engineering, ML models, and clear stakeholder narratives — built on Apple-scale analytics experience.',
    stack: ['Python','R','A/B Testing','XGBoost','Scikit-learn','EDA','Tableau','Statistics','Forecasting']
  },
  ai: {
    title: 'AI/ML Engineer roles needing LLM workflows, RAG pipelines, and production thinking.',
    story: 'I design AI-assisted workflows with LangChain, RAG, NLP, and model evaluation for real users — not just notebooks. Built production RAG systems at JerseySTEM over Snowflake data.',
    stack: ['LangChain','RAG','LLM Integration','NLP','TensorFlow','PyTorch','Vector Search','FastAPI','MLOps','OpenAI API']
  },
  swe: {
    title: 'Software Engineer roles needing backend systems, APIs, cloud and scalable architecture.',
    story: 'I build backend services, APIs, databases, cloud deployments and automation systems — from ETL frameworks to FastAPI microservices — with strong debugging and clean engineering habits.',
    stack: ['Python','FastAPI','Flask','JavaScript','React','PostgreSQL','Docker','Kubernetes','REST APIs','CI/CD']
  },
  da: {
    title: 'Data Analyst roles needing SQL, dashboards, storytelling and stakeholder clarity.',
    story: 'I translate complex datasets into dashboards, metrics, and recommendations that non-technical stakeholders can act on immediately — with Apple revenue analytics as my production benchmark.',
    stack: ['SQL','Tableau','Power BI','ThoughtSpot','Excel','EDA','Storytelling','Metrics','Visualization','Python']
  }
};

function setRole(key){
  const r = ROLES[key];
  $('#roleTitle').textContent = r.title;
  $('#roleStory').textContent = r.story;
  $('#roleStack').innerHTML = r.stack.map(s => `<span>${s}</span>`).join('');
  $$('.rtab').forEach(b => b.classList.toggle('active', b.dataset.role === key));
}
$$('.rtab').forEach(b => b.addEventListener('click', () => setRole(b.dataset.role)));
setRole('de');

/* ════════════════════════════════════
   PROJECT CARDS
════════════════════════════════════ */
const PROJECTS = [
  { cat:'data', type:'Data Engineering', name:'Apple Music Royalty Data Platform',
    desc:'Large-scale royalty and revenue analytics on Kafka + Spark + Snowflake. Real-time ingestion, zero-data-loss validation, and financial reporting for Apple GBI PX4.',
    tech:['Python','SQL','Snowflake','Spark','Airflow','Kafka'],
    challenge:'Maintaining pipeline reliability at 10M+ transactions/day without sacrificing data quality or adding operational toil.',
    impact:'10M+ txn/day · 80% cost reduction · TCS Performance Excellence Award' },
  { cat:'ai', type:'AI / LLM · RAG', name:'LLM-Powered Student Records Copilot',
    desc:'LangChain RAG pipeline over Snowflake student data, answering operational questions with source-grounded, cited responses. Production-deployed at JerseySTEM.',
    tech:['LangChain','RAG','Snowflake','Python','OpenAI API'],
    challenge:'Keeping retrieval grounded on sparse, inconsistent source data — solved with metadata filters and structured few-shot prompt templates.',
    impact:'40% less manual reporting · 500+ records automated' },
  { cat:'data', type:'Data Engineering', name:'Teradata → Snowflake Migration Engine',
    desc:'End-to-end migration framework converting BTEQ scripts to Snowflake SQL with Airflow orchestration, dbt models, and automated row-count validation.',
    tech:['Snowflake','Airflow','Python','dbt','AWS S3'],
    challenge:'BTEQ dialects don\'t map 1:1 to Snowflake — built a transpiler handling 90%+ of conversions automatically with a manual fallback queue.',
    impact:'70% of apps migrated · 80% cost cut · 50% faster' },
  { cat:'ai', type:'AI · Data Engineering', name:'LLM-Powered Data Quality Monitor',
    desc:'Ingests dbt test results and uses GPT-4 to generate human-readable root-cause summaries and actionable fix suggestions — proactive alerting for data engineers.',
    tech:['dbt','OpenAI API','LangChain','Python','Snowflake'],
    challenge:'Preventing hallucinated diagnostics — solved with strict few-shot templates and schema-constrained JSON output.',
    impact:'Proactive quality alerts · Reduced triage time' },
  { cat:'data', type:'Streaming · Cloud', name:'Real-Time Event Streaming Pipeline',
    desc:'Kafka + Spark Structured Streaming for high-volume event ingestion, deduplication, and aggregation into Snowflake — fully Dockerized with Airflow orchestration.',
    tech:['Kafka','Spark Streaming','Snowflake','Airflow','Docker'],
    challenge:'Exactly-once semantics at high throughput — solved with careful offset management and idempotent Snowflake sinks.',
    impact:'Real-time freshness · Production-grade reliability' },
  { cat:'ai', type:'ML · AI · Published Research', name:'Gesture Recognition System',
    desc:'CNN-based hand gesture classifier achieving real-time inference on standard webcam hardware. Research published in IJARESM 2021. 95%+ validation accuracy on test set.',
    tech:['Python','TensorFlow','OpenCV','CNN','Computer Vision'],
    challenge:'Real-time inference at 30fps on standard hardware — optimized model depth and quantized activations to hit the frame-rate target without accuracy loss.',
    impact:'📄 Published · IJARESM 2021 · 95%+ accuracy · Peer-reviewed' },
  { cat:'backend', type:'Full Stack · SWE', name:'Green Palate — Healthy Meal Finder',
    desc:'Full-stack web app for discovering healthy meals using external nutrition APIs. Flask backend, React frontend, PostgreSQL with smart API response caching.',
    tech:['React','Flask','PostgreSQL','REST API','Python'],
    challenge:'Intelligent caching to cut 3rd-party API calls while keeping recommendations dynamically fresh per user preferences.',
    impact:'Live demo · Full-stack SWE signal' },
  { cat:'analytics', type:'Analytics · BI', name:'Executive Revenue Dashboard',
    desc:'Interactive Snowflake-backed dashboard translating royalty pipeline outputs into executive-ready KPIs, anomaly flags, and trend narratives.',
    tech:['Tableau','SQL','ThoughtSpot','Python','Snowflake'],
    challenge:'Bridging raw royalty data and non-technical stakeholder decision-making without losing analytical depth.',
    impact:'Faster executive decisions · Reduced analyst back-and-forth' }
];

function renderProjects(filter='all'){
  const data = filter==='all' ? PROJECTS : PROJECTS.filter(p=>p.cat===filter);
  $('#projGrid').innerHTML = data.map(p => `
    <article class="proj-card">
      <div class="proj-type">${p.type}</div>
      <h3>${p.name}</h3>
      <p class="proj-desc">${p.desc}</p>
      <div class="proj-tech">${p.tech.map(t=>`<span>${t}</span>`).join('')}</div>
      <div class="proj-challenge"><b>Technical Challenge</b><p>${p.challenge}</p></div>
      <p style="font-size:.78rem;color:#14b8a6;font-family:var(--mono);margin-bottom:.6rem;">${p.impact}</p>
      <div class="proj-links">
        <a href="https://github.com/Nissi-Prabhatha" target="_blank">GitHub ↗</a>
        <a href="#labs">Demo ↗</a>
      </div>
    </article>`).join('');
}
renderProjects();
$$('.pf').forEach(b => b.addEventListener('click', () => {
  $$('.pf').forEach(x => x.classList.remove('active'));
  b.classList.add('active');
  renderProjects(b.dataset.f);
}));

/* ════════════════════════════════════
   ATS ROLE MATCHER
════════════════════════════════════ */
const ATS = {
  'Data Engineer':     [94,'Strong match: Python, SQL, Snowflake, Airflow, Spark, AWS, dbt, Kafka, ETL and data quality engineering.'],
  'Data Scientist':    [92,'Strong match: statistical modeling, EDA, A/B testing, feature engineering, XGBoost, Scikit-learn and business storytelling.'],
  'AI/ML Engineer':    [90,'Strong match: LangChain, RAG, NLP, TensorFlow, PyTorch, model validation and production AI workflow design.'],
  'Software Engineer': [88,'Strong match: Python, FastAPI, Flask, React, PostgreSQL, Docker, cloud, debugging and backend systems.'],
  'Data Analyst':      [91,'Strong match: SQL, Tableau, Power BI, ThoughtSpot, EDA, metrics definition and stakeholder storytelling.']
};
$('#atsSelect')?.addEventListener('change', e => {
  const [s,t] = ATS[e.target.value];
  $('#atsScore').textContent = s;
  $('#atsText').textContent = t;
});

/* ════════════════════════════════════
   COMMAND CENTER
════════════════════════════════════ */
const CMDS = {
  skills:     'Python · SQL · Snowflake · Airflow · Spark · Kafka · dbt · LangChain · RAG · AWS · GCP · Docker · FastAPI · Flask · React · TensorFlow · Tableau · Power BI',
  projects:   'Apple Music Data Platform · LLM Student Copilot · Teradata→Snowflake Engine · LLM Data Quality Monitor · Kafka Streaming Pipeline · Gesture Recognition (Published 2021)',
  impact:     '10M+ transactions/day at Apple · 80% cost reduction · 70% apps migrated · 40% manual work cut · TCS Performance Excellence Award · IJARESM 2021 publication',
  contact:    'Email: pnissiguntur@gmail.com · LinkedIn: linkedin.com/in/prabhatha-nissi-guntur · GitHub: github.com/Nissi-Prabhatha',
  experience: 'Techno Spark IT (Jul–Dec 2020) → TCS/Apple Data Engineer (Jan 2021–Dec 2022) → NJIT TA (Jun–Dec 2024) → JerseySTEM AI & Data (Feb 2025–present)',
  visa:       'F-1 STEM OPT · Active through 2028 · No H-1B or sponsorship needed · Open to all US states · Remote/hybrid/on-site',
  help:       'Commands: skills · projects · impact · contact · experience · visa · help'
};
$('#cmdIn')?.addEventListener('keydown', e => {
  if(e.key !== 'Enter') return;
  const v = e.target.value.trim().toLowerCase();
  const out = $('#cmdOut');
  const res = CMDS[v] || `Unknown command. Try: ${Object.keys(CMDS).join(' · ')}`;
  out.innerHTML += `\n<span style="color:#22c55e">$ ${v}</span>\n<span style="color:#cbd5e1">${res}</span>`;
  e.target.value = '';
  out.scrollTop = out.scrollHeight;
});

/* ════════════════════════════════════
   SYSTEM BLUEPRINT
════════════════════════════════════ */
const BP = {
  ingest:  'Ingest Layer: Kafka event streams, S3 file ingestion, REST API connectors, database CDC (Change Data Capture), and third-party feed integrations.',
  process: 'Process Layer: Airflow DAG orchestration, Spark transformations, dbt SQL models, data validation contracts, schema enforcement and quality gates.',
  model:   'Model Layer: Feature engineering, statistical testing, ML training (XGBoost/TensorFlow), anomaly detection, LLM fine-tuning and RAG pipeline design.',
  serve:   'Serve Layer: Snowflake analytics warehouse, FastAPI/REST microservices, RAG assistants, Tableau/Power BI dashboards, and monitored production workflows.'
};
$$('.bp-btn').forEach((b,i) => {
  if(i===0) b.classList.add('active');
  b.addEventListener('click', () => {
    $$('.bp-btn').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    $('#bpText').textContent = BP[b.dataset.bp];
  });
});

/* ════════════════════════════════════
   AI CHATBOT
════════════════════════════════════ */
const KB = {
  'apple':         '**At Apple (via TCS)**, Nissi was a Data Engineer on the GBI PX4 team. She built Kafka + Spark real-time pipelines for Apple Music processing **10M+ transactions/day**, led Teradata → Snowflake migration cutting costs **80%**, and designed Airflow DAGs for music royalty and revenue reporting. She won the **TCS Performance Excellence Award**.',
  'strongest':     'Nissi\'s strongest skill is **production data pipeline engineering** — Kafka + Spark at Apple scale and Snowflake ETL with Airflow. Her LangChain/RAG skills for production AI systems are also top-tier — she\'s shipped both in production.',
  'visa':          'Nissi is on **F-1 STEM OPT**, valid through ~2028. She can work in the US for up to 3 years without employer H-1B sponsorship. **Available immediately**, open to all US states.',
  'senior':        'Nissi is a **senior-level contributor** — 4+ years of independent production ownership, Apple-scale data systems, NJIT TA mentorship, and end-to-end delivery from schema design to deployed APIs. She operates without hand-holding.',
  'relocate':      'Yes — **open to relocation anywhere in the US**. Remote, hybrid, or on-site all work.',
  'experience':    '**4+ years total**: Techno Spark IT (2020) → TCS / Apple Data Engineer (2021–2022) → NJIT Graduate TA (2024) → JerseySTEM AI & Data Engineer (2025–present).',
  'skills':        'Python, SQL, Snowflake, Kafka, Spark, Airflow, dbt, LangChain, RAG, AWS, GCP, Docker, Kubernetes, FastAPI, Flask, React, TensorFlow, PyTorch, Tableau, Power BI, and more.',
  'contact':       'Email **pnissiguntur@gmail.com** · LinkedIn **linkedin.com/in/prabhatha-nissi-guntur** · GitHub **github.com/Nissi-Prabhatha**. Open to Data Engineer, SWE, and AI/ML roles.',
  'projects':      'LLM Student Copilot · Teradata→Snowflake Migration Engine · Apple Music Data Platform · LLM Data Quality Monitor · Kafka/Spark Streaming Pipeline · Gesture Recognition (IJARESM 2021) · Green Palate full-stack app.',
  'default':       'Nissi is a **Data & AI Engineer with 4+ years** of production experience — Apple-scale Kafka/Snowflake pipelines and production LangChain/RAG systems. Email **pnissiguntur@gmail.com** for specifics.'
};

function getAIReply(q){
  const ql = q.toLowerCase();
  for(const [k,v] of Object.entries(KB)){ if(ql.includes(k)) return v; }
  return KB.default;
}

let chatOpen = false;
window.toggleChat = function(){
  chatOpen = !chatOpen;
  $('#aiModal')?.classList.toggle('open', chatOpen);
  if(chatOpen && $('#aiMsgs').children.length === 0)
    setTimeout(() => addMsg('bot', 'Hi! 👋 I know everything about Nissi — her experience, skills, projects, and availability. Ask me anything or pick a quick question below!'), 400);
};

function addMsg(role, text){
  const msgs = $('#aiMsgs');
  const d = document.createElement('div');
  d.className = 'msg ' + role;
  d.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  msgs.appendChild(d);
  msgs.scrollTop = msgs.scrollHeight;
}
function showTyping(){
  const d = document.createElement('div');
  d.className = 'typing'; d.id = 'tdot';
  d.innerHTML = '<div class="dotT"></div><div class="dotT"></div><div class="dotT"></div>';
  $('#aiMsgs').appendChild(d); $('#aiMsgs').scrollTop = 99999;
}
function hideTyping(){ document.getElementById('tdot')?.remove(); }

window.askAI = function(q){
  addMsg('user', q); showTyping();
  setTimeout(() => { hideTyping(); addMsg('bot', getAIReply(q)); }, 800 + Math.random()*500);
};
window.sendAI = function(){
  const inp = $('#aiIn'); const q = inp.value.trim(); if(!q) return;
  inp.value = ''; askAI(q);
};
