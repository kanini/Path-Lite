---
trigger: glob
globs: "**/docs/*.md, **/tasks/*.md"
---

# Agile Best Practices

## Story Breakdown
- Max 5 SP per story (1 SP = 8 hours); INVEST-compliant
- Independent, testable, deliverable as standalone units with business value

## Task Creation
- Max 8 hours per task; clear acceptance criteria
- Separate tasks per layer: UI, API, DB, DevOps, QA

## Project Planning
- Required sections: Executive Summary, Scope, Objectives, Timeline/Milestones (MS-XXX), Roles (RACI), Cost Baseline, Cost Control, Risk Management (RK-XXX), Communication Plan, Success Metrics
- Risk register: minimum technical + resource + schedule; all [UNCLEAR] → scope risks
- Cost baseline: requirement count × complexity heuristic + licensing; 15-25% buffer
- Full traceability: every deliverable maps to FR/NFR/TR/DR/UXR/AIR

## Sprint Planning
- Sprint 0 (SP-000): foundation sprint for EP-TECH/EP-DATA stories (infra + data layer); must complete before feature sprints
- Feature sprints start from SP-001; duration 1-4 weeks, consistent
- Capacity = team_size × velocity × (1 - buffer%); utilization ≤ 80-85% of raw capacity
- Max 5 SP per story; one sprint goal (SG-XXX) per sprint tied to epic progress
- Ordering: dependency resolution first (epic-level + story-level), then business value
- No story scheduled before dependencies resolve; no story split across sprints
- [UNCLEAR]-blocked stories → unallocated list with reason; carry-overs flagged and re-prioritized
