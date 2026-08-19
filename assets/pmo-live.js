/* pmo-live.js - Northgate portfolio-health simulator
   Deterministic teaching simulation for learn-data-pmo-with-phoebe.
   Renders into #pmo-live. Toggle PMO levers -> watch on-time delivery and
   budget variance move across a 10-project, 12-month data portfolio.
   The delays are scripted to real failure patterns; the arithmetic
   (burn rates, variance, Brooks communication overhead) is computed live. */

(function () {
  "use strict";

  var mount = document.getElementById("pmo-live");
  if (!mount) return;

  /* ---------- data: the Northgate year-one portfolio ----------
     plan  = planned duration in months (all start staggered inside the year)
     budget = $k for the year
     sens  = extra months of slip while that lever is OFF
     bufferPct = cost surprise (as fraction of budget) while `buffer` is OFF
     irreducible = slip no lever removes (real delivery risk)
     fixNote = what the levers visibly fix; failNote keyed to FIRST missing lever */
  var PROJECTS = [
    { id: "p1", name: "Cloud landing zone", domain: "Infrastructure",
      services: "Cloud Infra, App Development, App Performance Monitoring",
      plan: 3, budget: 260, sens: {}, bufferPct: 0.30,
      notes: { buffer: "Egress + oversized clusters bill 30% over - nobody was watching the meter.", ok: "Shipped on plan. Variance review kept the cloud bill inside the buffer." } },
    { id: "p2", name: "Lakehouse build", domain: "Infrastructure",
      services: "Data Lake, Data Warehouse, Schema Design, Data Dictionary, Data Dump",
      plan: 6, budget: 480, sens: { raci: 2, plan: 1 }, bufferPct: 0.25,
      notes: { raci: "No named owner for source extracts - 2 months lost chasing 6 system owners.",
               plan: "Shared platform engineers double-booked - ingestion waits a month.",
               buffer: "Storage + compute for backfills lands 25% over the estimate.",
               ok: "Owners named, capacity reserved - the lakehouse lands on plan." } },
    { id: "p3", name: "Reporting + dashboards", domain: "Data Analytics",
      services: "Smart Reporting, Dashboarding, Data Validation",
      plan: 4, budget: 220, sens: { raci: 1, sprint: 1 },
      notes: { raci: "Who signs off validation? Report ships, numbers challenged, month of rework.",
               sprint: "No backlog - every stakeholder request lands mid-build. Scope churn, +1 month.",
               ok: "Validated once, built once. Dashboards land inside the quarter." } },
    { id: "p4", name: "Executive scorecard + KPI system", domain: "Data Analytics",
      services: "Executive Scorecard, KPI System Design, Metric Development, Data Dictionary Scorecard",
      plan: 5, budget: 180, sens: { raci: 1, stake: 2 },
      notes: { stake: "No steering cadence - execs see the scorecard at month 4 and reject the KPI definitions.",
               raci: "Metric ownership unassigned - two teams publish two different margins.",
               ok: "Definitions agreed in steering before build. Scorecard adopted first showing." } },
    { id: "p5", name: "Self-serve BI enablement", domain: "Data Analytics",
      services: "Self-Serve BI, Biz Performance Monitoring, Regular Insights Sharing, Ad-hoc Thematic Analysis",
      plan: 6, budget: 240, sens: { sprint: 1, stake: 1 },
      notes: { sprint: "Training content rebuilt twice - no sprint reviews to catch drift early.",
               stake: "Business units not consulted - the semantic layer models the wrong grain.",
               ok: "Piloted with two units per sprint - adoption compounding by month 6." } },
    { id: "p6", name: "Customer segmentation", domain: "Data Science",
      services: "Customer Segmentation, Data Literacy Training",
      plan: 4, budget: 200, sens: { sprint: 2 },
      notes: { sprint: "Research spiral - 9 clustering variants, no timebox. +2 months, same answer as v2.",
               ok: "Timeboxed to 2 sprints - v2 segments shipped to the CRM." } },
    { id: "p7", name: "Sales forecasting model", domain: "Data Science",
      services: "Sales Forecasting, Machine Learning",
      plan: 5, budget: 260, sens: { sprint: 1, stake: 1 }, irreducible: 1,
      notes: { sprint: "Model iteration unbounded - accuracy chases decimal points for a month.",
               stake: "Sales leadership never agreed what accuracy is 'good enough to plan with'.",
               managed: "Model risk surfaced early - re-baselined honestly: v1 ships 2 SKU families, v2 on the roadmap.",
               ok: "" } },
    { id: "p8", name: "Data product v1", domain: "Data Science",
      services: "Data Product",
      plan: 7, budget: 400, sens: { raci: 2, sprint: 1, plan: 1 }, bufferPct: 0.10,
      notes: { raci: "Domain team vs data team - nobody owns the product backlog for 2 months.",
               sprint: "Feature creep - 'while you're in there' requests add a month.",
               plan: "The one ML engineer is on three projects - a month queuing.",
               buffer: "Serving infra costs 10% over - no one priced the real-time tier.",
               ok: "One accountable owner, one backlog, reserved capacity - v1 ships month 7." } },
    { id: "p9", name: "Data governance + quality scorecard", domain: "Gen AI",
      services: "Data Governance, Data Quality Scorecard",
      plan: 6, budget: 160, sens: { raci: 2 },
      notes: { raci: "Stewardship undefined - every quality issue escalates to 'whose data is this?'. +2 months.",
               ok: "Stewards named per domain - the scorecard publishes monthly, disputes route to owners." } },
    { id: "p10", name: "Agentic workflow pilot", domain: "Gen AI",
      services: "AI Use Case Discovery, Workflow Automation, Agentic AI, Eval Framework, AI Literacy Training",
      plan: 5, budget: 300, sens: { stake: 1, plan: 1 }, bufferPct: 0.20,
      notes: { stake: "Use-case discovery skipped - the pilot automates a workflow nobody asked to fix.",
               plan: "No capacity plan - the eval framework waits on borrowed engineers.",
               buffer: "Token + inference spend runs 20% over - unmetered agent loops.",
               ok: "Discovery workshop picked the right workflow - eval gate passed, pilot promoted." } }
  ];

  var LEVERS = [
    { key: "raci",   label: "RACI + R&R defined",             tip: "Every project has one Accountable owner; Responsible, Consulted, Informed named per deliverable." },
    { key: "sprint", label: "Sprint cadence + backlog",       tip: "2-week sprints, one prioritized backlog, timeboxed research spikes." },
    { key: "stake",  label: "Stakeholder steering cadence",   tip: "Monthly steering, definitions agreed before build, no month-4 surprises." },
    { key: "plan",   label: "Capacity-based headcount plan",  tip: "FTE allocation matrix - shared people reserved, not double-booked." },
    { key: "buffer", label: "Budget buffer + variance review", tip: "10% contingency held, monthly EVM-style variance review catches overruns early." }
  ];
  var ORDER = ["raci", "sprint", "stake", "plan", "buffer"];

  var state = { raci: false, sprint: false, stake: false, plan: false, buffer: false, crash: false };

  /* ---------- compute ---------- */
  function evalProject(p) {
    var slip = 0, causes = [];
    ORDER.forEach(function (k) {
      if (p.sens && p.sens[k] && !state[k]) { slip += p.sens[k]; causes.push(k); }
    });
    var managed = false;
    if (p.irreducible) {
      slip += p.irreducible;
      if (state.sprint && state.stake) managed = true; /* risk seen early -> honest re-baseline */
    }
    var burn = p.budget / p.plan;
    var over = slip * burn * 0.6; /* late months burn at 60% - team partly reassigned */
    if (p.bufferPct && !state.buffer) over += p.budget * p.bufferPct;
    /* Brooks anti-lever: crashing every late project makes it later and dearer */
    var crashed = false;
    if (state.crash && slip > 0) {
      crashed = true;
      slip += 1;                    /* ramp-up + n(n-1)/2 comm paths eat the gain */
      over += p.budget * 0.15 + burn * 0.6;
    }
    return { slip: slip, over: over, actual: p.plan + slip, causes: causes, managed: managed, crashed: crashed,
             onTime: slip === 0, cost: p.budget + over };
  }

  function evalAll() {
    var rows = PROJECTS.map(function (p) { return { p: p, r: evalProject(p) }; });
    var onTime = rows.filter(function (x) { return x.r.onTime; }).length;
    var budget = PROJECTS.reduce(function (s, p) { return s + p.budget; }, 0);
    var cost = rows.reduce(function (s, x) { return s + x.r.cost; }, 0);
    return { rows: rows, onTime: onTime, budget: budget, cost: cost,
             variance: (cost - budget) / budget };
  }

  function noteFor(p, r) {
    if (r.crashed) return "Crashed with extra people - ramp-up and n(n-1)/2 comm paths made it LATER (Brooks, 1975).";
    if (r.managed) return p.notes.managed;
    if (r.onTime) return p.notes.ok || "On plan.";
    for (var i = 0; i < ORDER.length; i++) {
      var k = ORDER[i];
      if (r.causes.indexOf(k) >= 0 && p.notes[k]) return p.notes[k];
    }
    if (p.irreducible && p.notes.managed) return "Model risk bites unseen - slip discovered at the deadline.";
    return "Slipped.";
  }

  /* ---------- render ---------- */
  var css = "" +
    "#pmo-live{font-family:inherit}" +
    ".pml-levers{display:flex;flex-wrap:wrap;gap:10px;margin:14px 0}" +
    ".pml-lever{border:1.5px solid var(--hairline,#E3E8ED);background:#fff;border-radius:999px;padding:9px 16px;font-size:14px;font-weight:600;color:var(--muted,#626D79);cursor:pointer;transition:all .15s}" +
    ".pml-lever.on{background:var(--indigo,#3E5C76);border-color:var(--indigo,#3E5C76);color:#fff}" +
    ".pml-lever.anti{border-style:dashed;border-color:var(--amber,#E2590A);color:var(--amber,#E2590A)}" +
    ".pml-lever.anti.on{background:var(--amber,#E2590A);color:#fff;border-style:solid}" +
    ".pml-score{display:flex;flex-wrap:wrap;gap:14px;margin:16px 0}" +
    ".pml-stat{flex:1;min-width:150px;background:var(--indigo-50,#EDF2F6);border-radius:14px;padding:14px 18px}" +
    ".pml-stat b{display:block;font-size:30px;line-height:1.2;color:var(--indigo-deep,#22364A)}" +
    ".pml-stat.bad b{color:#991B1B}" +
    ".pml-stat.good b{color:#0E7C43}" +
    ".pml-stat span{font-size:12.5px;color:var(--muted,#626D79);font-weight:600;text-transform:uppercase;letter-spacing:.04em}" +
    ".pml-row{display:grid;grid-template-columns:190px 1fr 118px;gap:12px;align-items:center;padding:9px 0;border-top:1px solid var(--hairline,#E3E8ED)}" +
    ".pml-row .nm{font-weight:700;font-size:13.5px;color:var(--ink,#1C242E)}" +
    ".pml-row .nm small{display:block;font-weight:600;color:var(--muted,#626D79);font-size:11px}" +
    ".pml-bars{position:relative;height:30px}" +
    ".pml-bar{position:absolute;left:0;height:12px;border-radius:6px}" +
    ".pml-bar.plan{top:1px;background:var(--faint,#C3CCD5)}" +
    ".pml-bar.act{top:16px;background:var(--indigo,#3E5C76)}" +
    ".pml-bar.act.late{background:#C2410C}" +
    ".pml-bar.act.mng{background:#B45309}" +
    ".pml-chip{font-size:11.5px;font-weight:700;padding:4px 10px;border-radius:999px;text-align:center}" +
    ".pml-chip.ok{background:#E7F6EC;color:#0E7C43}" +
    ".pml-chip.late{background:#FEF2F2;color:#991B1B}" +
    ".pml-chip.mng{background:#FEF3C7;color:#78350F}" +
    ".pml-note{grid-column:1/-1;font-size:12.5px;color:var(--muted,#626D79);margin:-4px 0 2px;padding-left:2px}" +
    ".pml-note.crash{color:#991B1B;font-weight:600}" +
    ".pml-rail{font-size:12px;color:var(--muted,#626D79);margin-top:14px;border-top:1px dashed var(--hairline,#E3E8ED);padding-top:10px}" +
    "@media(max-width:700px){.pml-row{grid-template-columns:1fr 90px}.pml-bars{grid-column:1/-1}}";
  var styleEl = document.createElement("style");
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  function fmtPct(v) { return (v >= 0 ? "+" : "") + Math.round(v * 100) + "%"; }
  function fmtK(v) { return "$" + (Math.round(v / 10) * 10).toLocaleString() + "k"; }

  function render() {
    var res = evalAll();
    var maxMo = 12;
    var html = "";

    html += '<div class="pml-levers">';
    LEVERS.forEach(function (l) {
      html += '<button type="button" class="pml-lever' + (state[l.key] ? " on" : "") + '" data-k="' + l.key + '" title="' + l.tip + '">' + (state[l.key] ? "✓ " : "") + l.label + "</button>";
    });
    html += '<button type="button" class="pml-lever anti' + (state.crash ? " on" : "") + '" data-k="crash" title="Brooks: adding manpower to a late software project makes it later.">⚠ Crash it: add headcount to late projects</button>';
    html += "</div>";

    var varCls = res.variance > 0.10 ? "bad" : (res.variance <= 0.05 ? "good" : "");
    var otCls = res.onTime >= 8 ? "good" : (res.onTime <= 3 ? "bad" : "");
    html += '<div class="pml-score">' +
      '<div class="pml-stat ' + otCls + '"><b>' + res.onTime + ' / 10</b><span>projects on time</span></div>' +
      '<div class="pml-stat ' + varCls + '"><b>' + fmtPct(res.variance) + '</b><span>budget variance</span></div>' +
      '<div class="pml-stat"><b>' + fmtK(res.cost) + '</b><span>portfolio spend (budget ' + fmtK(res.budget) + ')</span></div>' +
      "</div>";

    res.rows.forEach(function (x) {
      var p = x.p, r = x.r;
      var chip = r.onTime ? '<span class="pml-chip ok">on time</span>'
        : r.managed ? '<span class="pml-chip mng">re-baselined</span>'
        : '<span class="pml-chip late">late +' + r.slip + " mo</span>";
      var actCls = r.onTime ? "" : (r.managed ? " mng" : " late");
      html += '<div class="pml-row">' +
        '<div class="nm">' + p.name + "<small>" + p.domain + " · " + fmtK(p.budget) + "</small></div>" +
        '<div class="pml-bars">' +
        '<div class="pml-bar plan" style="width:' + (p.plan / maxMo * 100) + '%"></div>' +
        '<div class="pml-bar act' + actCls + '" style="width:' + (Math.min(r.actual, maxMo + 2) / maxMo * 100) + '%"></div>' +
        "</div>" + chip +
        '<div class="pml-note' + (r.crashed ? " crash" : "") + '">' + noteFor(p, r) + "</div>" +
        "</div>";
    });

    html += '<div class="pml-rail">Teaching simulation - each slip is scripted to a real failure pattern for its missing lever; the arithmetic (burn rates, variance, Brooks ramp-up and n(n-1)/2 communication-path overhead) is computed live in your browser. Grey bar = plan, colored bar = actual. One project carries irreducible model risk no lever removes - good PMO turns it into an honest re-baseline, not a surprise.</div>';

    mount.innerHTML = html;
    mount.querySelectorAll(".pml-lever").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var k = btn.getAttribute("data-k");
        state[k] = !state[k];
        render();
      });
    });
  }

  render();

  /* expose for verification */
  window.__pmoEval = function (levers) {
    var saved = {}; Object.keys(state).forEach(function (k) { saved[k] = state[k]; });
    Object.keys(state).forEach(function (k) { state[k] = false; });
    (levers || []).forEach(function (k) { state[k] = true; });
    var res = evalAll();
    var out = { onTime: res.onTime, variancePct: Math.round(res.variance * 1000) / 10, cost: Math.round(res.cost) };
    Object.keys(saved).forEach(function (k) { state[k] = saved[k]; });
    return out;
  };
})();
