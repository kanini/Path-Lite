---
description: Generates sprint plan from project_plan.md, epics.md, and user stories with dependency maps (epic-level and story-level), topological story ordering, capacity planning, critical path identification, and sprint-to-story allocation. Creates sprint_plan.md with SP-XXX sprints and SG-XXX goals.
auto_execution_mode: 1
---

# Sprint Plan Generator

As an expert Scrum Master and Agile Coach, generate a comprehensive sprint plan that allocates user stories into sprints based on dependency ordering, capacity constraints, and business value. This workflow creates sprint_plan.md by analyzing epic dependencies, user story dependencies, story point sizing, and team capacity. Adhere to four non-negotiable principles: (1) **Dependency-First Allocation** — never schedule a story before its dependencies resolve; (2) **Capacity Discipline** — no sprint exceeds capacity with buffer; (3) **Goal Coherence** — each sprint has one clear business outcome tied to epic progress; (4) **No Story Splitting** — a story is fully allocated to one sprint (INVEST — Independent).

## Configuration

### Defaults (all auto-derived — zero user prompts)
| Parameter | Default | Source | Override |
|-----------|---------|--------|----------|
| `SPRINT_DURATION` | 2 weeks | From project_plan.md Sprint Planning Bridge; override with `--sprint-duration=Nw` (1w/2w/3w/4w) |
| `TEAM_SIZE` | From project_plan.md | Sprint Planning Bridge → Recommended Team Size | — |
| `VELOCITY` | From project_plan.md | Sprint Planning Bridge → Recommended Velocity; fallback = 8 SP/person/sprint | `--velocity=N` |
| `BUFFER_PCT` | 20 | Industry standard | `--buffer=N` |

**Design Decision:** The workflow NEVER prompts for any parameter. If project_plan.md is missing, defaults are used: velocity=8, team_size=3, sprint_duration=2w. A warning is logged but execution continues.

**Epic Scope Filter:** If `$ARGUMENTS` contains an EP-XXX pattern, filter stories to that epic only.

**Usage Examples:**
- `/create-sprint-plan` — Default: reads all parameters from project_plan.md
- `/create-sprint-plan --sprint-duration=3w --velocity=10`
- `/create-sprint-plan EP-001` — Plan sprints for a specific epic's stories only

### Prerequisites
1. **epics.md** (REQUIRED): `.propel/context/docs/epics.md` — epic definitions with Dependent EPICs field
   - If missing: STOP. Recommend running `/backlog-agent` first.
2. **us_*.md** (REQUIRED): `.propel/context/tasks/us_*/us_*.md` — user stories with points and dependencies
   - If missing: STOP. Recommend running `/create-user-stories` first.
3. **project_plan.md** (RECOMMENDED): `.propel/context/docs/project_plan.md` — Sprint Planning Bridge, milestones, team structure
   - If missing: Use defaults (velocity=8, team_size=3, sprint_duration=2w). Log: "Warning: No project plan found. Using default configuration."
4. **spec.md** (OPTIONAL): `.propel/context/docs/spec.md` — business context for sprint goal alignment

### MCP Fallback Protocol
All steps annotated with "(use Sequential-Thinking MCP)" will automatically fall back to structured step-by-step analysis with explicit validation checkpoints if the MCP tool is unavailable. No degradation in analysis quality is acceptable. If fallback is used, document: "Fallback: Manual structured analysis (MCP unavailable)."

## Context Sources
| Source | Path | Purpose | Required |
|--------|------|---------|----------|
| epics.md | `.propel/context/docs/epics.md` | Epic definitions, Dependent EPICs field for dependency mapping | Yes |
| us_*.md | `.propel/context/tasks/us_*/us_*.md` | User stories with points, dependencies, parent epic | Yes |
| project_plan.md | `.propel/context/docs/project_plan.md` | Sprint Planning Bridge, milestones, team structure, start date | Recommended |
| spec.md | `.propel/context/docs/spec.md` | Business context for sprint goal alignment | No |

*** Dependency-respecting story allocation is non-negotiable ***

## Output
- Artifact generation: `.propel/context/docs/sprint_plan.md`
- Print the following:
  - List of rules used by the workflow in bulleted format
  - Sprint plan summary (sprint count, total points allocated, coverage %, critical path duration)
  - **4-tier Evaluation Report** (MUST use `evaluate-output.md` workflow — see `Quality Evaluation` section)
  **Do not save as file.** (console output only)

**Note:**
- **File Handling**: IF file exists → UPDATE changed sections only (delta mode). IF file does not exist → CREATE complete file.
- Always create the output file in manageable smaller chunks to manage memory and processing constraints.
- Always generate a single unified document.
- Generate the output using the `.propel/templates/sprint-plan-template.md` template.

## Execution Flow

### 1. Story Inventory Collection

#### Read All User Stories
```
1. Glob: .propel/context/tasks/us_*/us_*.md
2. For each user story file:
   a. Extract US ID (us_XXX)
   b. Extract Story Title
   c. Extract Parent Epic (EP-XXX) from Traceability > Parent Epic
   d. Extract Story Points from effort estimation
   e. Extract Dependencies from Traceability > Dependencies section
   f. Extract [UNCLEAR] requirement dependencies (these block allocation)
3. Build story inventory table:
   | US ID | Title | Epic | Points | Dependencies | Blocked? |
```

**Dependency Extraction Rules:**
- Parse the Dependencies section of each us_XXX.md
- Extract US_XXX IDs listed as dependencies
- If dependency says "N/A" or "none" or is empty: mark as no dependencies
- If dependency references an [UNCLEAR] requirement: mark story as BLOCKED
- If dependency references a story not in inventory: flag as EXTERNAL dependency

#### Validate Story Inventory
- Total story count per epic
- Total story points (sum)
- Stories with dependencies count
- Stories marked BLOCKED count
- Stories with no dependencies count (candidates for early sprints)

### 2. Epic Dependency Map Construction (use Sequential-Thinking MCP)

#### Read Epic Dependencies
```
1. Read .propel/context/docs/epics.md
2. For each EP-XXX, extract "Dependent EPICs" field
3. Build epic adjacency list:
   EP-001 → [] (no dependencies)
   EP-002 → [EP-001] (depends on EP-001)
   EP-003 → [EP-001, EP-002] (depends on both)
4. Topological sort epics → EPIC_ORDER[]
5. Validate: no circular dependencies (if found, flag as error and stop)
```

**Epic Execution Order Logic:**
- Epics with no dependencies come first
- EP-TECH always first (if exists — green-field project foundation)
- EP-DATA after EP-TECH but before feature epics (if exists)
- Feature epics ordered by: dependency resolution, then business value from epics.md priority ordering

**Sprint 0 (Foundation Sprint) Rule:**
- IF EP-TECH or EP-DATA epics exist: allocate ALL their non-BLOCKED stories to SP-000 (Sprint 0)
- SP-000 is a dedicated foundation sprint for infrastructure scaffolding and data layer setup
- SP-000 uses SG-000 as its sprint goal: infrastructure and data foundation
- SP-000 must complete before any feature sprint (SP-001+) begins
- IF neither EP-TECH nor EP-DATA exists: skip SP-000, start directly at SP-001

### 3. Story Dependency Resolution (use Sequential-Thinking MCP)

#### Dependency Rules (3 types, evaluated in order)
1. **Explicit story dependency**: US_005 depends on US_003 (from us_005.md Dependencies section) — hard constraint, must be in earlier sprint
2. **Epic-level constraint**: IF EP-002 depends on EP-001 (from epics.md), THEN all stories from EP-001 must be allocated to earlier sprints before any EP-002 story begins. This is ONE constraint per epic pair, not N x M story-to-story edges.
3. **BLOCKED**: Story depends on [UNCLEAR] requirement — goes to Unallocated list

#### Topological Sort
Sort all stories respecting:
- **Primary**: Epic dependency order (EPIC_ORDER from Step 2)
- **Secondary**: Explicit story dependencies within same epic
- **Tertiary**: Story points ascending (smaller stories first for early value delivery)

Validate: no circular dependencies. If found, flag as error and stop.

Output: `STORY_ORDER[]` — the definitive allocation sequence.

### 4. Capacity Calculation

```
SPRINT_WEEKS = parse(SPRINT_DURATION) → integer weeks
RAW_CAPACITY = TEAM_SIZE x VELOCITY
SPRINT_CAPACITY = RAW_CAPACITY x (1 - BUFFER_PCT / 100)

TOTAL_POINTS = sum of all non-BLOCKED story points from inventory
ESTIMATED_SPRINTS = ceil(TOTAL_POINTS / SPRINT_CAPACITY)

Log: "Capacity: [RAW_CAPACITY] raw, [SPRINT_CAPACITY] after [BUFFER_PCT]% buffer"
Log: "Projection: [TOTAL_POINTS] points across [ESTIMATED_SPRINTS] sprints"
```

### 5. Sprint Allocation (use Sequential-Thinking MCP)

#### Allocation Rules
1. **Sprint 0 (Foundation)**: IF EP-TECH or EP-DATA epics exist, allocate ALL their non-BLOCKED stories to SP-000. SP-000 must complete before SP-001.
2. **Feature Sprint Fill**: Walk `STORY_ORDER[]` (topologically sorted). For each story:
   - Skip if BLOCKED → add to Unallocated list with reason
   - Skip if dependencies unresolved in current or earlier sprints → defer to next pass
   - If current sprint has capacity (`allocated_points + story.points ≤ SPRINT_CAPACITY`): allocate to current sprint
   - If current sprint is full: finalize current sprint, start next sprint (SP-XXX + 1)
3. **Deferred Story Pass**: After initial allocation, attempt to place each deferred story in the earliest sprint where its dependencies are resolved AND capacity allows.
4. **Remaining BLOCKED stories**: All go to Unallocated list with reason and action required.

#### Sprint Goal Generation
For each sprint, identify the primary epic being progressed (epic with most stories allocated in that sprint). Derive sprint goal from that epic's Business Value field in epics.md.
- Format: `SG-XXX: [One-sentence business outcome]`
- Each sprint gets exactly one SG-XXX

### 6. Sprint Date Calculation

```
IF project_plan.md exists:
    START_DATE = project kickoff date from project_plan.md Key Dates
ELSE:
    START_DATE = today's date

FOR each sprint SP-XXX:
    sprint.start_date = START_DATE + ((sprint_index) x SPRINT_WEEKS x 7 days)
    sprint.end_date = sprint.start_date + (SPRINT_WEEKS x 7 days) - 1 day
```

Note: Sprint dates are calculated as continuous weeks. Adjust manually for organizational holidays, team PTO, or other planned downtime.

### 7. Critical Path Identification

- Trace the longest chain of dependent stories from the first sprint to the last
- A story is on the critical path if delaying it would delay the entire project
- Flag schedule-critical stories with "CRITICAL" tag in the Sprint Backlog table (Critical Path column = Yes)
- Calculate critical path duration: count of sprints containing critical-path stories x SPRINT_WEEKS
- Populate the Critical Path section in the template

### 8. Sprint Load Balancing Check

After initial allocation, verify load distribution across feature sprints (exclude SP-000):
- Calculate mean allocated points across all feature sprints
- For each sprint, calculate `% of Mean = (sprint_points / mean_points) x 100`
- **Imbalance flag**: If max sprint points > 1.5x min sprint points → flag imbalance
- **Rebalancing suggestion**: If imbalanced, suggest moving the smallest story from the overloaded sprint to the underloaded sprint (respecting dependency constraints)
- Log: "Load balance: [min pts] - [max pts] range, [variance]% variance"

### 9. Sprint Confidence Scoring

Assign confidence level to each sprint:
- **High**: All story dependencies resolved in earlier sprints AND no BLOCKED stories AND no external dependencies
- **Medium**: Some stories were deferred from earlier sprints OR sprint contains stories with external dependencies
- **Low (Tentative)**: Sprint contains stories originally BLOCKED by [UNCLEAR] items that were subsequently unblocked, or sprint depends heavily on late-resolving dependencies

Include confidence level in Sprint Summary table and per-sprint block.

### 10. Project Plan Consistency Check

IF project_plan.md exists:
- Compare sprint plan total duration (`sprint_count x SPRINT_WEEKS`) vs project_plan.md estimated duration (Likely)
- Compare team size used vs project_plan.md recommended team size
- Compare total allocated story points vs project_plan.md projected story points
- **Flag if duration discrepancy > 10%**: "Sprint plan duration ([N] weeks) differs from project plan estimate ([M] weeks) by [X%]. Likely causes: [story point variance / dependency overhead / capacity constraint]"
- Populate the Project Plan Consistency table in the template

### 11. Traceability and Coverage

#### Story Coverage Analysis
```
FOR each epic EP-XXX:
    total_stories = count of stories in epic
    allocated_stories = count of stories allocated to any sprint
    unallocated_stories = total - allocated
    coverage_pct = (allocated / total) x 100%
```

#### Unallocated Story Report
For each unallocated story, document:
- Story ID and Epic
- Story Points
- Reason: BLOCKED (by [UNCLEAR] requirement), Deferred (over capacity), or Dependency Unresolved
- Action Required: Clarify requirement, Add to next release, or Resolve dependency

### 12. Summary Presentation
- Present sprint plan summary to user
- Display sprint summary table (sprint count, points per sprint, epic coverage, confidence)
- Highlight any unallocated stories with reasons
- Display critical path summary (longest chain, duration, schedule-critical stories)
- Display load balance assessment
- Display project plan consistency check results (if applicable)
- Present the Quality Assessment metrics

### Quality Assurance Framework

#### Pre-Delivery Checklist
- [ ] **Sprint Configuration**: Duration, velocity, team size, buffer all documented with sources
- [ ] **Epic Dependency Map**: All epics from epics.md present with dependency relationships
- [ ] **Epic Execution Order**: Topologically sorted, no circular dependencies
- [ ] **Story Dependency Map**: All story dependencies extracted from us_XXX.md files
- [ ] **Story Execution Order**: Topologically sorted respecting both epic and story dependencies
- [ ] **Sprint Capacity**: No sprint exceeds SPRINT_CAPACITY (raw capacity minus buffer)
- [ ] **Dependency Integrity**: No story scheduled before its dependencies are resolved
- [ ] **No Story Splitting**: Each story allocated to exactly one sprint
- [ ] **Sprint Goals**: Each sprint has exactly one SG-XXX tied to primary epic
- [ ] **BLOCKED Handling**: Stories depending on [UNCLEAR] requirements in Unallocated list
- [ ] **Critical Path**: Longest dependency chain identified and schedule-critical stories flagged
- [ ] **Load Balance**: Sprint point variance checked, imbalances flagged if > 1.5x
- [ ] **Confidence Scores**: Each sprint has High/Medium/Low confidence level
- [ ] **Project Plan Consistency**: Duration and story point comparison logged (if project_plan.md exists)
- [ ] **Coverage**: All non-blocked stories allocated to a sprint
- [ ] **Template Adherence**: Output follows sprint-plan-template.md structure

## Guardrails
- `rules/agile-methodology-guidelines.md`: Sprint planning standards, story sizing, sprint capacity **[CRITICAL]**
- `rules/iterative-development-guide.md`: Strict phased workflow **[CRITICAL]**
- `rules/markdown-styleguide.md`: Front matter, heading hierarchy, code fences **[CRITICAL]**
- `rules/dry-principle-guidelines.md`: Single source of truth; delta updates

## Quality Evaluation

**ALWAYS** Execute `.windsurf/workflows/evaluate-output.md` with these parameters:
- `$OUTPUT_FILE`: `.propel/context/docs/sprint_plan.md`
- `$SCOPE_FILES`: Input source(s) provided to this workflow
- `--workflow-type`: `sprint-plan`

**Required Output:**
- Print 4-tier evaluation report to console in tabular format
- Always Use format defined in evaluate-output.md
- Include weighted Overall Score

**Prohibited:**
- Custom evaluation metrics (use evaluate-output.md only)
- Summarizing instead of full report

**Workflow Status:** Incomplete until evaluation report is printed.

---

*This sprint plan generator ensures dependency-aware story allocation with topological ordering at both epic and story levels. No story is scheduled before its dependencies are resolved. Includes critical path identification, load balancing, confidence scoring, and project plan consistency validation. Produces actionable sprint plans from backlog artifacts.*
