---
description: Generates project plan from spec.md and design.md with executive summary, scope, objectives, milestones, AI-adjusted cost baseline, auto-derived team composition, risk register, and sprint planning bridge. Creates project_plan.md with MS-XXX milestones and RK-XXX risks.
auto_execution_mode: 1
---

# Project Plan Generator

As an expert Project Manager and Delivery Lead, generate a comprehensive project plan that covers executive governance, scope definition, cost baseline, risk management, and strategic team composition. This workflow creates project_plan.md by analyzing requirements, architecture, and technical complexity from discovery phase outputs. Adhere to three non-negotiable principles: (1) **Scope Clarity** — every in-scope deliverable traces to requirements, out-of-scope is explicit; (2) **Realistic Estimation** — effort derived from requirement count and complexity with AI-adjustment factors, not optimism; (3) **Risk Transparency** — every [UNCLEAR] requirement, hard dependency, and complexity signal becomes a risk.

## Configuration

### Defaults (all auto-derived — zero user prompts)
| Parameter | Default | Source | Override |
|-----------|---------|--------|----------|
| `START_DATE` | Today's date | System clock | `--start-date=YYYY-MM-DD` |
| `BUFFER_PCT` | 20 | Industry standard | `--buffer=N` |
| `TEAM_SIZE` | Auto-derived | Calculated in Step 5 from total effort and target duration | — |

**Design Decision:** `--team-size` flag is intentionally removed. Team size is an OUTPUT of scope analysis, not an input. The workflow derives optimal team composition from effort estimates and tech stack analysis.

**Additional Context:** If `$ARGUMENTS` contains a file path (.pdf, .txt, .md, .docx), read it as supplementary context for scope definition.

**Usage Examples:**
- `/create-project-plan` — Default: uses spec.md, design.md, derives everything
- `/create-project-plan --start-date=2025-03-01 --buffer=25`
- `/create-project-plan additional_context.md`

### Prerequisites
1. **spec.md** (REQUIRED): `.propel/context/docs/spec.md` — FR, UC requirements, business context
   - If missing: STOP. Recommend running `/discovery-agent` first.
2. **design.md** (REQUIRED): `.propel/context/docs/design.md` — NFR, TR, DR, tech stack, architecture
   - If missing: Proceed with FR-only analysis. Log warning. Add RK-XXX for missing technical requirements in risk register.
3. **models.md** (OPTIONAL): `.propel/context/docs/models.md` — diagram count, entity count, sequence complexity
4. **figma_spec.md** (OPTIONAL): `.propel/context/docs/figma_spec.md` — UXR, screen count for UI scope

### MCP Fallback Protocol
All steps annotated with "(use Sequential-Thinking MCP)" will automatically fall back to structured step-by-step analysis with explicit validation checkpoints if the MCP tool is unavailable. No degradation in analysis quality is acceptable. If fallback is used, document: "Fallback: Manual structured analysis (MCP unavailable)."

## Context Sources
| Source | Path | Purpose |
|--------|------|---------|
| spec.md | `.propel/context/docs/spec.md` | FR, UC requirements, business context, scope definition |
| design.md | `.propel/context/docs/design.md` | NFR, TR, DR, tech stack, architecture decisions |
| models.md | `.propel/context/docs/models.md` | Architectural complexity signals — diagram count, entity count, sequence flow complexity |
| figma_spec.md | `.propel/context/docs/figma_spec.md` | UI scope assessment — screen count, UXR count (if exists) |

*** Accurate scope definition and risk identification are non-negotiable ***

## Output
- Artifact generation: `.propel/context/docs/project_plan.md`
- Print the following:
  - List of rules used by the workflow in bulleted format
  - Project plan summary (milestones count, risk count, estimated duration, recommended team size)
  - **4-tier Evaluation Report** (MUST use `evaluate-output.md` workflow — see `Quality Evaluation` section)
  **Do not save as file.** (console output only)

**Note:**
- **File Handling**: IF file exists → UPDATE changed sections only (delta mode). IF file does not exist → CREATE complete file.
- Always create the output file in manageable smaller chunks to manage memory and processing constraints.
- Always generate a single unified document.
- Generate the output using the `.propel/templates/project-plan-template.md` template.

## Execution Flow

### 1. Context Gathering (use Sequential-Thinking MCP)

**From spec.md:**
- Count all FR-XXX (Functional Requirements)
- Count all UC-XXX (Use Cases)
- Extract business context / problem statement for Executive Summary
- Identify [UNCLEAR] tagged requirements (these become risks)
- Identify external system dependencies mentioned in use cases

**From design.md:**
- Count all NFR-XXX (Non-Functional Requirements)
- Count all TR-XXX (Technical Requirements)
- Count all DR-XXX (Data Requirements)
- Extract Technology Stack section (for cost baseline — licensing, infrastructure)
- Count AIR-XXX if present (AI requirements add complexity)
- Identify [UNCLEAR] tagged requirements

**From models.md (if exists):**
- Count diagrams (context, component, deployment, ERD, sequence)
- Count entities in ERD (data complexity signal)
- Count sequence diagrams (integration complexity signal)

**From figma_spec.md (if exists):**
- Count UXR-XXX (UX Requirements)
- Count SCR-XXX (Screens) for UI scope

**Project Type Detection:**
- **Green-field**: No existing codebase, no codeanalysis.md → higher risk, EP-TECH needed
- **Brown-field**: Existing codebase, codeanalysis.md exists → integration risk, backward compatibility

### 2. Executive Summary Generation
- Extract project name from spec.md title or business context
- Derive problem statement from spec.md business context
- Summarize solution from spec.md scope and design.md architecture
- Identify key stakeholders from spec.md actors/personas
- Set project type (green-field / brown-field)

### 3. Scope Definition
- Map each major functional area (grouped by UC-XXX) to in-scope deliverables
- Cross-reference with design.md for technical scope boundaries
- Explicitly list out-of-scope items (requirements marked deferred, future phases)

### 4. Objectives and Goals
- Derive business objectives from spec.md business context and goals
- Create SMART project goals aligned to requirement categories
- Map each objective to specific requirement IDs (FR-XXX, NFR-XXX)

### 5. Team Composition Analysis (use Sequential-Thinking MCP)

This step derives team size and role allocation from scope — it is never prompted from the user.

#### Derive Roles from Tech Stack
Analyze design.md technology stack to identify required specializations:
- Frontend framework detected (React, Angular, Vue, etc.) → Frontend Developer
- Backend framework detected (.NET, Node.js, Java, Python, etc.) → Backend Developer
- Database technology detected → Database Engineer (or Backend with DB skills for teams ≤ 4)
- Cloud/DevOps technologies detected (AWS, Azure, GCP, Docker, K8s, etc.) → DevOps Engineer
- figma_spec.md exists → UI/UX Designer
- AIR-XXX requirements present → AI/ML Engineer
- Always include: 1 QA Engineer per 3-4 developers (minimum 1)

#### Derive Team Size from Scope
1. Calculate total AI-adjusted effort from Step 6 effort heuristic (forward reference — compute effort first, then derive team)
2. Determine target project duration using industry norms:
   - <100 AI-adjusted person-days → target 12 weeks
   - 100-300 AI-adjusted person-days → target 16-20 weeks
   - 300+ AI-adjusted person-days → target 24+ weeks
3. Calculate: `TEAM_SIZE = ceil(total_ai_adjusted_effort / (target_weeks x 5))`
4. Clamp: minimum 2 (pair programming baseline), maximum 12 (Scrum team limit per Scrum Guide)
5. Validate: TEAM_SIZE must accommodate all identified roles (if 5 roles identified, team ≥ 5)

#### Sprint Duration Recommendation
Based on derived project duration:
- Project < 3 months → recommend 1-week sprints
- Project 3-6 months → recommend 2-week sprints
- Project > 6 months → recommend 2-week sprints with quarterly planning cadence

#### Output
Generate the Recommended Team Structure table and populate the Sprint Planning Bridge section in the template.

### 6. Timeline and Milestone Generation (use Sequential-Thinking MCP)

#### Effort Heuristic
```
Base effort estimation (pre-backlog — coarse grain):
- Simple requirement (CRUD, basic UI): ~2 person-days per FR
- Medium requirement (business logic, integrations): ~4 person-days per FR
- Complex requirement (AI, real-time, security): ~6 person-days per FR
- NFR implementation overhead: ~1.5 person-days per NFR
- TR implementation: ~2 person-days per TR
- DR implementation: ~1 person-day per DR
- UXR implementation: ~1.5 person-days per UXR (if figma_spec.md exists)
- AIR implementation: ~5 person-days per AIR (if AI-enabled)

AI-Assisted Development Factor:
Apply AI reduction factors to account for AI-paired development (Copilot, Windsurf, etc.):
- Simple requirements (CRUD, basic UI): x0.75 (25% reduction)
- Medium requirements (business logic, integrations): x0.75 (25% reduction)
- Complex requirements (AI, real-time, security): x0.85 (15% reduction)
- NFR, TR, DR, UXR, AIR: NOT AI-adjusted (specification/configuration tasks, not pure coding)

Complexity multiplier:
- Green-field: x1.3 (scaffolding overhead)
- Brown-field: x1.15 (integration overhead)
- >20 entities in ERD: x1.1 (data complexity)
- >10 sequence diagrams: x1.1 (integration complexity)

Total AI-adjusted person-days = SUM(ai_adjusted_requirement_efforts) x complexity_multiplier x (1 + BUFFER_PCT/100)
Estimated weeks = Total AI-adjusted person-days / (TEAM_SIZE x 5)
Project end date = START_DATE + Estimated weeks
```

#### Confidence Intervals
Present three-point estimation for stakeholder communication:
- **Optimistic**: AI-adjusted effort x 0.8
- **Likely**: AI-adjusted effort (base estimate)
- **Pessimistic**: AI-adjusted effort x 1.4

#### Story Point Projection
Per agile-methodology-guidelines.md: 1 SP = 1 person-day (8 hours).
- Projected Story Points = Total AI-adjusted person-days (rounded to nearest integer)
- This projection feeds directly into sprint plan velocity calculations
- Include in Cost Baseline and Sprint Planning Bridge output

#### Milestone Mapping
- Group milestones by major functional areas (derived from UC groupings in spec.md)
- MS-001: Project Kickoff (START_DATE)
- MS-002+: One milestone per major functional area or integration point
- Final MS: Project Delivery / Go-Live
- Calculate target dates: START_DATE + cumulative effort per milestone group

### 7. Roles and Responsibilities
- Use the Team Composition Analysis from Step 5 to populate the RACI matrix
- Map derived roles to standard project activities (requirements review, design, development, testing, deployment)
- Set allocation percentages based on team size and role count

### 8. Cost Baseline
- Calculate development cost from AI-adjusted effort estimate (person-days)
- Present confidence intervals: Optimistic | Likely | Pessimistic
- Include "Projected Story Points: [N]" (1 SP = 1 person-day, per agile-methodology-guidelines.md)
- Extract infrastructure costs from design.md tech stack (cloud services, databases, etc.)
- Identify third-party licensing from design.md dependencies
- Apply contingency buffer (BUFFER_PCT)
- Present total cost breakdown

### 9. Cost Control Plan
Populated from static template defaults in project-plan-template.md. No derivation required — this is standard project governance boilerplate.

### 10. Risk Management Plan (use Sequential-Thinking MCP)

#### Auto-Seeded Risks
**CRITICAL**: Automatically generate risks from the following sources:

**From [UNCLEAR] Requirements:**
- Each [UNCLEAR] tagged requirement in spec.md or design.md → RK-XXX
- Category: Scope
- Impact: Medium-High (blocks downstream story/task creation)
- Mitigation: Clarify with stakeholders before backlog creation

**From Green-field Detection:**
- IF green-field project detected → RK-XXX: Technology stack maturity risk
- Category: Technical
- Mitigation: Proof of concept / spike sprint

**From Technology Stack Complexity:**
- IF >3 distinct technologies in tech stack → RK-XXX: Integration complexity
- IF AI/ML components (AIR-XXX present) → RK-XXX: AI model uncertainty
- Category: Technical

**From External Dependencies:**
- Each external system referenced in UC-XXX → RK-XXX: External dependency risk
- Category: External
- Mitigation: Define API contracts early, mock external services

**From Team Size vs Scope:**
- IF estimated_weeks > 26 (6 months) → RK-XXX: Schedule risk
- Category: Schedule

**Minimum Risk Coverage:**
- Always include at minimum: 1 Technical, 1 Resource, 1 Schedule risk
- If fewer than 3 risks auto-seeded, add risks based on project context for the user to refine

### 11. Communication Plan
Derive ceremony schedule based on team size and sprint duration recommendation:

- **Team ≤ 5**: Daily standup (async), Sprint Review (every sprint), Sprint Retrospective (every sprint)
- **Team 6-9**: Daily standup (sync), Sprint Review, Sprint Retrospective, Weekly status report
- **Team 10+**: Daily standup (sync), Sprint Review, Sprint Retrospective, Weekly status report, Bi-weekly risk review, Monthly stakeholder update

Set frequency, audience, owner, and channel for each ceremony. Sprint duration recommendation (from Step 5) determines review cadence.

### 12. Success Metrics
- Derive success criteria from business objectives (Step 4)
- Map each criterion to a measurable metric with target threshold
- Include: on-time delivery, scope delivery, quality (defect density), budget variance

### 13. Sprint Planning Bridge
Populate the Sprint Planning Bridge section in the template with:
- Projected Story Points (from Step 6)
- Recommended Sprint Duration (from Step 5)
- Recommended Team Size (TEAM_SIZE from Step 5)
- Recommended Velocity = Projected Story Points / estimated sprint count / TEAM_SIZE

### 14. Traceability Table
- Aggregate all requirement counts by category (FR, NFR, TR, DR, UXR, AIR)
- Mark all as "In Scope" (100% coverage at project plan level)
- Flag any deferred requirements as out-of-scope with reason

### 15. Summary Presentation
- Present executive summary to user
- Display milestone timeline table
- Display risk summary matrix
- Highlight estimated duration (optimistic/likely/pessimistic) and cost baseline
- Display recommended team composition
- Present the Quality Assessment metrics

### Quality Assurance Framework

#### Pre-Delivery Checklist
- [ ] **Executive Summary**: Business context and solution overview populated from spec.md
- [ ] **Scope Definition**: All FR/UC mapped to in-scope deliverables, out-of-scope explicitly listed
- [ ] **Objectives**: SMART goals with requirement traceability
- [ ] **Team Composition**: Derived from scope analysis and tech stack, not prompted
- [ ] **Milestones**: MS-XXX IDs with target dates based on AI-adjusted effort heuristic
- [ ] **AI Factor**: Applied to effort estimates with factor documented (0.75 simple/medium, 0.85 complex)
- [ ] **Confidence Intervals**: Optimistic/Likely/Pessimistic estimates presented
- [ ] **Story Point Projection**: Included in Cost Baseline and Sprint Planning Bridge
- [ ] **Cost Baseline**: AI-adjusted effort estimate, infrastructure from design.md
- [ ] **Risk Register**: Minimum 3 risks, all [UNCLEAR] items captured, auto-seeded from context
- [ ] **Communication Plan**: Ceremony schedule derived from team size
- [ ] **Success Metrics**: Measurable criteria mapped to objectives
- [ ] **Sprint Planning Bridge**: All 4 parameters populated for downstream sprint plan consumption
- [ ] **Traceability**: All requirement categories counted and coverage confirmed
- [ ] **Sprint Duration Recommendation**: Included based on project duration
- [ ] **Template Adherence**: Output follows project-plan-template.md structure

## Guardrails
- `rules/agile-methodology-guidelines.md`: Project planning standards **[CRITICAL]**
- `rules/iterative-development-guide.md`: Strict phased workflow **[CRITICAL]**
- `rules/markdown-styleguide.md`: Front matter, heading hierarchy, code fences **[CRITICAL]**
- `rules/dry-principle-guidelines.md`: Single source of truth; delta updates
- `rules/security-standards-owasp.md`: Security risk identification in risk register

## Quality Evaluation

**ALWAYS** Execute `.windsurf/workflows/evaluate-output.md` with these parameters:
- `$OUTPUT_FILE`: `.propel/context/docs/project_plan.md`
- `$SCOPE_FILES`: Input source(s) provided to this workflow
- `--workflow-type`: `project-plan`

**Required Output:**
- Print 4-tier evaluation report to console in tabular format
- Always Use format defined in evaluate-output.md
- Include weighted Overall Score

**Prohibited:**
- Custom evaluation metrics (use evaluate-output.md only)
- Summarizing instead of full report

**Workflow Status:** Incomplete until evaluation report is printed.

---

*This project plan generator ensures comprehensive governance documentation with AI-adjusted effort estimation, auto-derived team composition, transparent risk identification, and full requirement traceability. Produces executive-level planning artifact with sprint planning bridge for downstream sprint plan consumption.*
