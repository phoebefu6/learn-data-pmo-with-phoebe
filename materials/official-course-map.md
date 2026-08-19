# Data PMO - official course map

Course: **learn-data-pmo-with-phoebe** · hub bucket `lead` · diff 3 · two-track (Leader 6 + Practitioner 10)
Palette: slate steel-blue (#22364A / #3E5C76 / #5C7A94 / #A3B8C9, tint #EDF2F6) + signal orange (#E2590A, ink #4A2005, tint #FDEEE3). Ink #1C242E, muted #626D79, faint #C3CCD5, hairline #E3E8ED.

## Positioning vs siblings

- **learn-tech-project-pmo-with-phoebe**: ONE technical project (Northwind case), single track. This course is the PORTFOLIO level - a whole data office's year, many projects at once, plus the money and people disciplines (budget, cost, headcount) that course does not touch.
- **learn-ai-project-management-with-phoebe**: running ONE programme with AI drafting beside you. This course is about running the PORTFOLIO - AI is one domain inside it, not the method.
- State this positioning on the landing page and in L1/P1.

## The running case - Northgate (canon, do not drift)

- Northgate: mid-size retailer. 120 stores + ecommerce, ~4,000 staff.
- Year one: Northgate stands up a data office and hires the learner as **Data PMO lead**.
- Data office: 14 FTE - Head of Data (1), PMO lead (1, you), Platform engineer (1), Data engineers (4), Analytics engineers / BI (3), Data scientists (2), ML engineer (1), Governance lead (1).
- Money: **change budget $2,700k** across 10 projects (matches the simulator exactly), run budget $1,100k (platform, licences, managed services) - run vs change is taught in L3/P9.
- The 30-service catalog (below) rolls up into **10 portfolio projects** - the same 10 the simulator scores.

## Service catalog -> project -> primary sessions (all 30 services must appear)

| # | Service | Domain | Portfolio project | Primary sessions |
|---|---------|--------|-------------------|------------------|
| 1 | Cloud Infra | Infrastructure | P1 Cloud landing zone | a2, b2 |
| 2 | Application Development | Infrastructure | P1 Cloud landing zone | b3 |
| 3 | App Performance Monitoring | Infrastructure | P1 Cloud landing zone | b5 |
| 4 | Data Schema Design | Infrastructure | P2 Lakehouse build | b2, b4 |
| 5 | Data Dictionary | Infrastructure | P2 Lakehouse build | b4 |
| 6 | Data Dump | Infrastructure | P2 Lakehouse build | b2 |
| 7 | Data Lake | Infrastructure | P2 Lakehouse build | a2, b2 |
| 8 | Data Warehouse | Infrastructure | P2 Lakehouse build | a2, b2 |
| 9 | Data Validation | Data Analytics | P3 Reporting + dashboards | b4, b5 |
| 10 | Smart Reporting | Data Analytics | P3 Reporting + dashboards | b3 |
| 11 | Dashboarding | Data Analytics | P3 Reporting + dashboards | b3 |
| 12 | Executive Scorecard | Data Analytics | P4 Exec scorecard + KPI | a5, b6 |
| 13 | Self-Serve BI Enablement | Data Analytics | P5 Self-serve BI | b6, b8 |
| 14 | Metric Development | Data Analytics | P4 Exec scorecard + KPI | b4 |
| 15 | KPI System Design | Data Analytics | P4 Exec scorecard + KPI | a5, b6 |
| 16 | Ad-hoc Thematic Analysis | Data Analytics | P5 Self-serve BI | b7, b8 |
| 17 | Biz Performance Monitoring | Data Analytics | P5 Self-serve BI | a6, b6 |
| 18 | Regular Insights Sharing | Data Analytics | P5 Self-serve BI | b6, b7 |
| 19 | Data Dictionary Scorecard | Data Analytics | P4 Exec scorecard + KPI | b4 |
| 20 | Data Literacy Training | Data Science | P6 Customer segmentation | a4, b10 |
| 21 | Customer Segmentation | Data Science | P6 Customer segmentation | b3, b8 |
| 22 | Sales Forecasting | Data Science | P7 Sales forecasting model | b3, b5 |
| 23 | Machine Learning | Data Science | P7 Sales forecasting model | a2, b3 |
| 24 | Data Product | Data Science | P8 Data product v1 | b4, b9 |
| 25 | Data Governance | Gen AI (as listed) | P9 Governance + DQ scorecard | a2, b4 |
| 26 | Data Quality Scorecard | Gen AI (as listed) | P9 Governance + DQ scorecard | b5 |
| 27 | AI Literacy Training | Gen AI | P10 Agentic workflow pilot | a4, b10 |
| 28 | AI Use Case Discovery Workshop | Gen AI | P10 Agentic workflow pilot | a2, b6 |
| 29 | Workflow Automation | Gen AI | P10 Agentic workflow pilot | b9 |
| 30 | Agentic AI | Gen AI | P10 Agentic workflow pilot | b9 |
| 31 | Agentic AI Eval Framework | Gen AI | P10 Agentic workflow pilot | b9 |

Note: Phoebe's catalog files Data Governance + Data Quality Scorecard under Gen AI - keep her grouping, and let b4/b5 note that governance underpins everything.

## Verified framework facts (use these, do not invent numbers)

- **Scrum Guide 2020** (Schwaber + Sutherland, scrumguides.org): 3 accountabilities (Product Owner, Scrum Master, Developers), 5 events (the Sprint, Sprint Planning, Daily Scrum, Sprint Review, Sprint Retrospective), 3 artifacts (Product Backlog, Sprint Backlog, Increment) each with a commitment (Product Goal, Sprint Goal, Definition of Done). Sprints are 1 month or less.
- **PMBOK Guide 7th edition** (PMI, 2021): moved from 49 processes to 12 principles + **8 performance domains**: Stakeholders, Team, Development Approach and Life Cycle, Planning, Project Work, Delivery, Measurement, Uncertainty.
- **RACI**: Responsible (does the work), Accountable (one and only one per deliverable, owns the outcome), Consulted (two-way), Informed (one-way).
- **Earned value (EVM)**: PV planned value, EV earned value, AC actual cost. SV = EV - PV, CV = EV - AC, SPI = EV / PV, CPI = EV / AC, EAC = BAC / CPI (typical case), VAC = BAC - EAC. SPI or CPI below 1.0 = behind / over.
- **Brooks's law** (Fred Brooks, The Mythical Man-Month, 1975): "adding manpower to a late software project makes it later" - ramp-up time plus communication paths growing as n(n-1)/2.
- **Thomas-Kilmann conflict modes** (TKI, 1974): five modes on two axes (assertiveness x cooperativeness): competing, collaborating, compromising, avoiding, accommodating. No mode is "best" - fit mode to stakes + relationship.
- **Tuckman stages** (1965): forming, storming, norming, performing.
- **Prioritization**: MoSCoW (must/should/could/won't); RICE = Reach x Impact x Confidence / Effort (popularized by Intercom); WSJF = cost of delay / job size (SAFe).
- **Maker's schedule, manager's schedule** (Paul Graham essay, 2009): makers need half-day blocks; one meeting can ruin an afternoon.
- **Eisenhower matrix**: urgent x important quadrants; **Parkinson's law** (1955): work expands to fill the time available; **planning fallacy** (Kahneman + Tversky, 1979): people systematically underestimate their own task durations - fix with reference-class (outside-view) estimates.
- **Critical path method** (CPM, developed at DuPont late 1950s): the longest dependent chain sets the earliest finish; activities off the path have float/slack.
- **CRISP-DM** (1999): 6 phases - business understanding, data understanding, data preparation, modeling, evaluation, deployment - the loop is iterative, which is WHY DS work does not estimate like app dev.
- **Data-work reality** (teach as craft, not citation): data projects carry discovery risk ("the data is not there / not usable") that application projects do not; ML projects carry model risk (accuracy may never reach the bar) - plan spikes, timeboxes, and honest re-baselines, not padded certainty.
- **FinOps basics**: tag everything, rightsize, commit discounts, watch unit costs; GenAI adds token/inference metering.

## Simulator canon - pmo-live.js (verified in-browser before fan-out)

10 projects, $2,700k budget. Levers in recommended order: RACI -> sprint cadence -> stakeholder steering -> capacity plan -> budget buffer. Anti-lever: "Crash it: add headcount to late projects" (Brooks) - never improves on-time, adds ~1 month + 15% cost to every late project.

| Levers on | On time | Budget variance |
|-----------|---------|-----------------|
| none | 1 / 10 | +38% |
| + RACI | 2 / 10 | +28% |
| + sprint cadence | 4 / 10 | +22% |
| + stakeholder steering | 6 / 10 | +17% |
| + capacity plan | 9 / 10 | +12% |
| + budget buffer | 9 / 10 | +1% |
| none + CRASH | 1 / 10 | +61% |

Honesty rails (must appear near the sim): it is a teaching simulation with scripted failure patterns; the arithmetic is computed live; one project (sales forecasting) carries irreducible model risk no lever removes - with sprint + steering on it becomes an honest re-baseline (amber), never a green. 10/10 is not the goal; seen-early is.

## Session outlines

Chips per page: Leader pages "Leader track · 45 min"; Practitioner pages "Practitioner track · 45 min". Crumbs: "Leader session N of 6" / "Practitioner session N of 10" (app.js journey regex depends on these exact words).

### Leader track (a1-a6)

**a1 - The Data PMO** (a1-the-data-pmo.html)
- Part 1: project vs program vs portfolio - and why a data office needs portfolio thinking (30 services, finite team). Diagram: 3-level pyramid.
- Part 2: the 4-domain service catalog as a portfolio (Infra / Analytics / DS / Gen AI) - the dependency reality: infra feeds analytics feeds DS feeds Gen AI. Diagram: 4-lane catalog with arrows.
- Part 3: the PMO operating model - what the PMO does (cadence, visibility, escalation, money) and does NOT do (build things, own products). PMBOK 7's 8 performance domains as the leader's checklist.
- Demo: sort the 30 services into the 10 Northgate projects.
- Quiz: portfolio vs project; one-A rule preview; what a PMO does not own.

**a2 - Annual Roadmap** (a2-annual-roadmap.html)
- Part 1: sequencing by dependency - lake before warehouse before BI before ML before agents. The "AI Hierarchy of Needs" logic (Rogati) without naming vendors. Diagram: dependency ladder.
- Part 2: quarter-by-quarter roadmap for Northgate year one; what runs parallel, what cannot.
- Part 3: roadmap as a communication contract - version it, date it, show trade-offs. MoSCoW + WSJF at portfolio level.
- Demo: break a dependency on purpose (dashboards before validation) - trace the blast radius.
- Quiz: critical dependency; WSJF numerator; roadmap versioning.

**a3 - Budget and Cost** (a3-budget-and-cost.html)
- Part 1: run vs change - Northgate's $1,100k run vs $2,700k change; why mixing them hides overruns. Diagram: two-pot budget.
- Part 2: costing a data project - people (FTE months x loaded rate), platform (cloud, licences), variable (cloud compute, GenAI tokens). FinOps basics.
- Part 3: the buffer argument - 10% contingency + monthly variance review beats padded line items; EVM lite for execs (CPI/SPI as traffic lights).
- Demo: read a variance report - spot the project heading over before it is over.
- Quiz: run vs change; CPI below 1 means; buffer vs padding.

**a4 - Headcount and R&R** (a4-headcount-and-rr.html)
- Part 1: shape of a data office - the 14-FTE Northgate org, role by role; hire vs contract vs upskill (literacy/AI-literacy training as capacity building). Diagram: org chart.
- Part 2: R&R at team level - who owns pipelines vs models vs dashboards vs governance; the one-A rule at org scale.
- Part 3: capacity math - FTE x focus factor (~70%), why 3 projects per ML engineer is a plan to fail; Brooks's law as a hiring caution.
- Demo: allocate the 14 FTE across the 10 projects - find the overallocation.
- Quiz: focus factor; Brooks's law; hire vs contract signal.

**a5 - Stakeholders and Steering** (a5-stakeholders-and-steering.html)
- Part 1: stakeholder map - power x interest grid for Northgate (CFO, CMO, store ops, IT, legal). Diagram: 2x2 grid.
- Part 2: the steering cadence - monthly steering, weekly PMO review, quarterly board; the executive scorecard as the steering artifact (KPI system design meets governance).
- Part 3: escalation paths + saying no with data - the PMO as honest broker; Goldsmith-style managing up without the name-dropping.
- Demo: run a 20-minute steering agenda on the live portfolio.
- Quiz: power-interest placement; steering vs status; escalation trigger.

**a6 - Portfolio Health** (a6-portfolio-health.html)
- Part 1: the health scorecard - on-time %, budget variance, benefit realization, risk burn-down; leading vs lagging. Diagram: scorecard anatomy.
- Part 2: stage gates + kill/pivot decisions - sunk cost is not a reason; the forecasting project re-baseline as the worked example (biz performance monitoring in action).
- Part 3: THE SIMULATOR (embedded, exec view) - read the board like a leader: which lever is missing, what to ask for. Links to b5 for the full mechanics.
- Demo: pull levers live; watch on-time and variance; press CRASH and read why it backfires.
- Quiz: leading indicator; kill vs re-baseline; what crashing does.
- This page EMBEDS pmo-live.js (`<div id="pmo-live"></div>` + script tag) - same sim as b5, framed for leaders.

### Practitioner track (b1-b10)

**b1 - Portfolio Intake** (b1-portfolio-intake.html) - HAND-AUTHORED TEMPLATE
- Part 1: from service catalog to portfolio - intake, one-page charters, the 30-into-10 rollup.
- Part 2: prioritization that survives contact - MoSCoW, RICE, WSJF worked on Northgate items.
- Part 3: the portfolio kanban + who decides - intake board states, decision rights.
- Demo: charter one project (lakehouse) in one page.
- Quiz + covered rows + cheat sheet.

**b2 - Roadmap to Timeline** (b2-roadmap-to-timeline.html)
- Part 1: milestones + dependencies - decompose lakehouse into milestones; internal + cross-project dependencies (schema design blocks dictionary blocks validation). Diagram: dependency graph.
- Part 2: critical path - find it, protect it, float on everything else. CPM basics.
- Part 3: estimating data work - planning fallacy, reference class, spikes for discovery risk (the data dump that turned out unusable).
- Demo: build the 12-month Northgate timeline from the a2 roadmap.
- Quiz: critical path; float; reference-class estimate.

**b3 - Sprint Planning for Data** (b3-sprint-planning-for-data.html)
- Part 1: Scrum Guide 2020 essentials - accountabilities, events, artifacts + commitments; what survives contact with data work.
- Part 2: why data sprints differ - pipeline work is estimable, DS/ML work is CRISP-DM-iterative; timebox research, define "done" per work type (dashboard done vs model done).
- Part 3: one backlog, four domains - sprint goals for app dev, smart reporting, forecasting, segmentation work in the same team.
- Demo: plan sprint 1 for the reporting project - pull from backlog, size, commit.
- Quiz: sprint commitment; timebox purpose; DoD for a model.

**b4 - RACI and R&R** (b4-raci-and-rr.html)
- Part 1: RACI mechanics - one A per deliverable, R does the work, C is two-way, I is one-way; smells (two As, ten Cs, empty A).
- Part 2: worked RACI x4 - one per domain: schema design + dictionary (Infra), metric development + dictionary scorecard (Analytics), data product (DS), data governance (Gen AI as filed).
- Part 3: R&R beyond the grid - decision rights, escalation, the governance lead vs stewards.
- Demo: fix a broken RACI (the p9 governance stall from the simulator).
- Quiz: one-A rule; C vs I; RACI smell.

**b5 - Timeline Management ★ THE SIMULATOR** (b5-timeline-management.html) - HAND-AUTHORED
- Part 1: tracking without theater - status that predicts (SPI-style thinking), not describes; slip early vs slip late; app performance monitoring + data validation as early-warning services.
- Part 2: THE SIMULATOR (full mechanics) - pmo-live.js embedded; the lever ladder walked rung by rung with the canon numbers; the crash anti-lever + Brooks.
- Part 3: re-baselining honestly - when to re-plan, how to say it (the forecasting example), sales forecasting + DQ scorecard as the monitoring pair.
- Demo: the lever ladder end to end + crash.
- Quiz: what crashing does; the one project no lever fixes; slip-early value.

**b6 - Stakeholder Management** (b6-stakeholder-management.html)
- Part 1: map + plan - power x interest, comms plan per quadrant; exec scorecard + KPI system as stakeholder artifacts.
- Part 2: cadences that build trust - steering, demos, regular insights sharing as a product; self-serve BI as stakeholder enablement (fewer ad-hoc fire drills).
- Part 3: discovery workshops - the AI use case discovery workshop as stakeholder alignment (pick problems worth automating).
- Demo: write the comms plan row for the CFO and store ops.
- Quiz: quadrant strategy; demo vs status; discovery output.

**b7 - Time Management** (b7-time-management.html)
- Part 1: maker vs manager schedule - protect the team's deep-work blocks; the PM absorbs interrupts.
- Part 2: your own week - Eisenhower, timeboxing, Parkinson's law; meeting hygiene (agenda or decline); ad-hoc analysis requests routed through intake, not DMs.
- Part 3: the PMO calendar - the recurring skeleton (steering, sprint events, variance review, insights share) laid on one week.
- Demo: rebuild a broken week - 14 meetings to 7.
- Quiz: maker block; Parkinson counter; ad-hoc routing.

**b8 - Conflict Management** (b8-conflict-management.html)
- Part 1: Thomas-Kilmann five modes - map to real portfolio conflicts (priority fights, resource contention, credit disputes).
- Part 2: structural conflicts - two execs both want Q1 (segmentation vs self-serve BI): resolve with WSJF + steering, not volume; Tuckman for the new team's storming.
- Part 3: disagree-and-commit + escalation etiquette - when to compete (safety/quality), when to accommodate (reversible, low stakes).
- Demo: script the conversation - the CMO wants the dashboard before validation is done.
- Quiz: mode fit; structural vs interpersonal; escalation timing.

**b9 - Budget and Cost Management** (b9-budget-and-cost-management.html)
- Part 1: EVM working session - PV/EV/AC on the lakehouse, compute SPI/CPI/EAC by hand; traffic-light reporting.
- Part 2: cloud + GenAI cost control - tagging, rightsizing, token metering (the agentic pilot's 20% overrun from the sim); workflow automation ROI math.
- Part 3: forecast at completion + the buffer drawdown log - variance review agenda; when to release buffer.
- Demo: month-6 variance review on the live portfolio numbers.
- Quiz: CPI computation; EAC formula; token overrun control.

**b10 - Headcount and Capacity (capstone)** (b10-headcount-and-capacity.html)
- Part 1: capacity model - 14 FTE x focus factor, allocation matrix people x projects; find + fix overallocation.
- Part 2: hire vs contract vs train - literacy + AI-literacy training as capacity multipliers; ramp-up cost (Brooks again).
- Part 3: CAPSTONE - assemble the year-one PMO pack: roadmap (b2), RACI (b4), budget (b9), capacity (b10), steering deck (b6), health scorecard (a6/b5) - the six artifacts on one checklist.
- Demo: fill the allocation matrix; run the pack past the a6 health lens.
- Quiz: focus factor math; ramp-up cost; pack completeness.

## Coverage discipline

- Every session ends: homework -> 3-question quiz -> covered rows -> cheat sheet.
- Covered rows name the SERVICE(S) from the catalog table each session advances (✓ full, ◐ partial).
- Not covered by design (say so honestly on the landing page): PMP/PRINCE2 certification prep, tool tutorials (Jira, MS Project, Asana), HR performance management, procurement + vendor contracting depth, SAFe ceremony mechanics, earned-schedule extensions, org design beyond the data office.

## Sources appendix

Stable, verifiable primary sources this course teaches from: Scrum Guide 2020 (scrumguides.org), PMBOK Guide 7th ed (PMI 2021), The Mythical Man-Month (Brooks 1975), Thomas-Kilmann Conflict Mode Instrument (1974), Tuckman 1965, Paul Graham "Maker's Schedule, Manager's Schedule" (2009), CRISP-DM 1.0 (1999), Kahneman + Tversky planning fallacy (1979), standard EVM formulas (PMI). No fabricated statistics - the simulator's numbers are its own scripted canon, labeled as such.
