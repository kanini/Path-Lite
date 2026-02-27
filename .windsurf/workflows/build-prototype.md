---
description: Transform business hypotheses into working validation prototypes using priority-based scoping. First run builds ALL P0/P1 features with complete functionality. Reruns build P2/P3 features as ideation blueprints for stakeholder feedback.
auto_execution_mode: 1
---

# Build Prototype Workflow
As a Solution architect, build a prototype that validates a given business hypothesis using priority-based scoping. First run builds ALL P0 (Critical) and P1 (High) features with full working code. Reruns build P2 (Medium) and P3 (Low) features as ideation blueprints. The prototype includes source code, documentation, and automated validation evidence.

## Input Parameters
**Accepts:** Business hypothesis | Feature idea | Problem statement | User need description

**Run Mode Detection (Automatic):**
- **First Run**: No `mvp/` folder exists → Build ALL P0 (Critical) and P1 (High) features with full functionality
- **Rerun**: `mvp/` folder exists with completed P0/P1 features → Build next priority tier (P2 or P3) as ideation blueprints

**Example Inputs:**
- "Test if small business owners will pay for automated invoice tracking"
- "Validate market demand for markdown-to-slides conversion"
- "Build prototype for real-time collaboration on documents"

## Output
**Deliverables in mvp/ folder:**
- `mvp-scope-and-journeys.md` - Validation plan with hypothesis and user journeys
- `src/` - Complete working source code (platform-appropriate structure per Platform Profile)
- `README.md` - Setup and launch instructions
- `deployment-guide.md` - Deployment procedures
- `test-results/` - Automated validation evidence with screenshots
- Print the following: 
  - List of rules used by the workflow in bulleted format
  - **4-tier Evaluation Report** (MUST use `evaluate-output.md` workflow - see `Quality Evaluation` section)
  **Do not save as file.**

## Execution Flow

### Core Principles
- **Code-first delivery**: Working source code is primary output
- **Validation-focused**: Every feature enables hypothesis testing
- **Priority-driven scoping**: P0/P1 get full functionality; P2/P3 get ideation blueprints
- **Run-aware execution**: First run builds core features; reruns expand with conceptual features
- **Launch-ready**: Stakeholders can test immediately (P0/P1) or provide feedback on concepts (P2/P3)
- **Modern design**: Clean, accessible, contemporary interface
- **Platform-agnostic**: Resolves target platform from hypothesis; all technology decisions flow from the Platform Profile
- **80-hour advisory**: Time estimates are for planning visibility only, NOT a hard gate

### Hypothesis Definition (4 hours)

**Create mvp/ folder structure**
```bash
# Create platform-appropriate folder structure from resolved Platform Profile
mkdir -p mvp/src                        # Source code (all platforms)
mkdir -p mvp/test-results/screenshots   # Validation evidence (all platforms)
# Additional platform-specific directories as needed (e.g., mvp/src/ios/, mvp/src/android/)
```

**Analyze business hypothesis** (use sequential-thinking MCP)
- Extract core business assumption from input
- Identify validation success criteria
- Define primary and secondary user personas for testing
- Map validation user journeys

**Resolve Platform Profile**
Infer the target delivery platform from the business hypothesis, user personas, and validation journeys:

| Signal in Hypothesis | Inferred Platform |
|---|---|
| "web app", "dashboard", "portal", "SaaS" | `web` |
| "mobile-friendly", "works on phone and desktop", "responsive" | `responsive-web` |
| "mobile app", "app store", "iOS and Android", "on-the-go" | `cross-platform-app` |
| "iPhone app", "iOS only", "Apple Watch" | `native-mobile` (iOS) |
| "Android app", "Play Store only" | `native-mobile` (Android) |
| "desktop application", "offline-first desktop" | `desktop-app` |
| No explicit platform signal | Default: `web` |

Resolve the Platform Profile fields based on inferred platform:

```yaml
Platform Profile:
  platform_type: [inferred from signals above]
  framework: [select proven framework for rapid prototyping on this platform]
  ui_library: [select component library matching framework]
  entry_point: [main entry file for the platform]
  build_command: [platform-specific build command]
  launch_command: [platform-specific launch/run command]
  launch_verification: [how to verify the prototype is running — URL check, simulator screenshot, or app launch confirmation]
  test_tool: Playwright MCP (default for all platforms; fallback to simulator screenshots for native-only mobile)
  test_strategy: [web: direct URL | responsive: device emulation | cross-platform: web export + emulation | Electron: _electron.launch | native-mobile: simulator fallback]
  required_files: [minimum files that must exist after build]
  folder_structure: [directories to create under mvp/]
  platform_standards: [applicable rules/ files from Extended Standards section]
```

**Platform Profile Resolution Examples** (guidance for dynamic resolution, not hardcoded):

| Platform Type | Typical Framework | Typical UI Library | Entry Point | Build | Launch Verification |
|---|---|---|---|---|---|
| web | Next.js / vanilla JS | shadcn/ui | index.html | `npm run build` | curl localhost:PORT → 200 |
| responsive-web | Next.js + PWA | shadcn/ui (mobile-first) | index.html | `npm run build` | Playwright with mobile viewports |
| cross-platform-app | React Native + Expo | React Native Paper / NativeBase | App.tsx | `npx expo export:web` | Playwright device emulation on web export |
| native-mobile (iOS) | SwiftUI | Native UIKit/SwiftUI | ContentView.swift | `xcodebuild` | Simulator screenshot |
| native-mobile (Android) | Jetpack Compose | Material 3 | MainActivity.kt | `./gradlew assembleDebug` | Emulator screenshot |
| desktop-app | Electron / Tauri | shadcn/ui or native | main.ts | framework-specific | Playwright via _electron.launch or browser |

**Selection Guidance:**
- For prototyping speed, prefer cross-platform frameworks (Expo, Flutter) over native unless hypothesis explicitly requires platform-specific features (ARKit, HealthKit, Wear OS)
- For web, prefer Next.js + shadcn/ui for rich UIs, vanilla JS for simple validations
- For responsive-web, use same web stack with mobile-first CSS and PWA manifest
- For desktop, prefer Electron (has Playwright support) over Tauri (limited Playwright support)
- **Testing strategy**: Always prefer frameworks with web export support (Expo, Flutter web) so Playwright MCP can validate via device emulation — avoids needing separate mobile testing tools
- Use `context7 MCP` to resolve framework-specific guidance during implementation

**Document in mvp-scope-and-journeys.md**: Include the resolved Platform Profile as a dedicated section so all subsequent phases reference it.

**Generate validation plan**

**Run Mode Detection (Automatic):**
```bash
# Automatic detection on workflow invocation
if [ -d "mvp/" ] && [ -f "mvp/mvp-scope-and-journeys.md" ]; then
  # Parse mvp-scope-and-journeys.md for P0/P1 completion status
  # If P0/P1 marked complete → RERUN MODE (build P2/P3 as blueprints)
  # If P0/P1 incomplete → FIRST RUN MODE (continue P0/P1 builds)
else
  # No mvp/ folder → FIRST RUN MODE
fi
```

**Before writing MVP scope, list all features to build using priority tiers:**
| Priority | Feature | Purpose | Est. Hours | Validates Hypothesis? | Build Mode |
|----------|---------|---------|------------|----------------------|------------|
| P0 (Critical) | ... | ... | [X] | Yes | Full Implementation |
| P0 (Critical) | ... | ... | [X] | Yes | Full Implementation |
| P1 (High) | ... | ... | [X] | Yes | Full Implementation |
| P1 (High) | ... | ... | [X] | Yes | Full Implementation |
| P2 (Medium) | ... | ... | [X] | Partial | Ideation Blueprint |
| P3 (Low) | ... | ... | [X] | No | Ideation Blueprint |

**Priority Tier Inclusion Rules:**

**FIRST RUN MODE (no `mvp/` folder exists OR P0/P1 incomplete):**
- **Include**: ALL P0 (Critical) and P1 (High) features
- **Build Strategy**: Complete working code, functional UI, proper validation
- **Scope**: May exceed 80 hours — this is acceptable for enterprise-scale hypotheses
- **Exclusion**: P2 (Medium) and P3 (Low) features deferred to reruns

**RERUN MODE (`mvp/` folder exists AND P0/P1 complete):**
- **Detect Completed Tiers**: Read `mvp/mvp-scope-and-journeys.md` to identify which priority tiers are marked complete
- **Next Tier Logic**:
  - If P0/P1 complete and P2 not started → Build P2 features as ideation blueprints
  - If P0/P1/P2 complete → Build P3 features as ideation blueprints
- **Build Strategy for P2/P3 (Ideation Blueprints)**:
  - UI shells with placeholder content (no full business logic)
  - Mock interactions (simulated workflows, not real data processing)
  - Skeleton components (demonstrate intended structure)
  - Static sample data (hardcoded responses, not DB-driven)
  - Purpose: Stakeholder feedback on UX/concept, NOT production-ready code

**Now expand each feature listed above (within scope for current run mode).**

- Create or UPDATE `mvp/mvp-scope-and-journeys.md` with:
  - Business hypothesis statement
  - Validation success criteria
  - Primary and secondary user personas
  - Validation user journeys
  - **Priority-Tiered Feature List** with status tracking:
    - **P0 (Critical)**: [List with status: Planned | In Progress | Complete]
    - **P1 (High)**: [List with status: Planned | In Progress | Complete]
    - **P2 (Medium)**: [List with status: Planned | In Progress | Complete | Deferred]
    - **P3 (Low)**: [List with status: Planned | In Progress | Complete | Deferred]
  - **Platform Profile**: Resolved platform_type, framework, ui_library, build/launch commands, test tool, required files
  - 80-hour timeline breakdown **(advisory — for planning visibility only)**
  - **Run Mode Indicator**: "FIRST RUN - Building P0/P1" OR "RERUN - Building P2 Blueprints" OR "RERUN - Building P3 Blueprints"

**Request user approval**
- Present mvp-scope-and-journeys.md to user with clear run mode indication
- Present Platform Profile summary (platform_type, framework, UI library, test tool)
- Display priority tiers included in current run (P0/P1 for first run, P2 or P3 for reruns)
- Show estimated hours as advisory information (not a gate)
- Clarify build strategy: Full implementation (P0/P1) vs ideation blueprints (P2/P3)
- Wait for explicit approval before proceeding
- **STOP HERE until user confirms approval**

### Prototype Build (Variable Duration)

**Pre-implementation verification**
- Read approved mvp-scope-and-journeys.md file
- Identify run mode: FIRST RUN (P0/P1) or RERUN (P2/P3)
- Read existing `mvp/src/` to understand current state (if rerun)
- Create TodoWrite plan with all source files for current priority tier
- Verify folder structure exists

**Technology selection** (use sequential-thinking MCP for rapid decisions)
- **FIRST RUN**: Use the resolved Platform Profile to select framework, UI library, and determine if backend is needed. Use `context7 MCP` for framework-specific guidance.
- **RERUN**: Reuse existing tech stack from P0/P1 implementation per Platform Profile; maintain consistency with established patterns
- Plan minimal tech stack for validation — prefer platform defaults and managed toolchains (e.g., Expo for React Native, Vite for web)
- **AI Component Selection** [CONDITIONAL: If hypothesis involves AI/LLM features]:
  - Determine if AI features are needed for validation (chatbot, Q&A, content generation)
  - If AI needed:
    - Use mock LLM responses for prototype (avoid API costs during validation)
    - Pre-configure 5-10 sample responses that demonstrate intended behavior
    - Include fallback UI for "AI is thinking" and error states
    - Document real AI integration path for post-validation phase
  - If RAG needed for validation:
    - Use static sample documents with predetermined answers
    - Mock retrieval results to demonstrate intended UX
    - Skip actual embedding/indexing (defer to production implementation)
  - **Cost Estimation**: Estimate API costs if real AI will be used in validation
    - Prefer mocked responses over real API calls for prototype phase

**Priority-Tier Build Strategy:**

**IF FIRST RUN MODE (Building P0/P1):**
- **Scope**: ALL P0 (Critical) and P1 (High) features
- **Build Strategy**: Complete working code for each feature
  - Full business logic implementation
  - Functional UI with real interactions
  - Backend services with actual data processing (if needed)
  - Database integration (if needed)
  - Proper error handling and validation
  - Working authentication/authorization (if needed)
- **Hours**: May exceed 80 hours — acceptable for enterprise hypotheses
- **Quality Standard**: Production-ready code suitable for immediate hypothesis testing

**IF RERUN MODE (Building P2/P3 — Ideation Blueprints):**
- **Scope**: Next priority tier (P2 or P3) features only
- **Build Strategy**: Ideation blueprints (NOT full implementations)
  - **UI Shells**: Visual components with placeholder content; layout demonstrates intended design; interactive elements connected to mock data
  - **Mock Interactions**: Simulated workflows without real processing; button clicks show expected UI transitions; form submissions display success states (no backend processing)
  - **Placeholder Data**: Hardcoded JSON responses in frontend; sample data arrays (no database queries); pre-defined state objects
  - **Skeleton Components**: Component files with prop interfaces; render methods with basic JSX; event handlers with console.log placeholders
- **Purpose**: Enable stakeholder feedback on UX/concept before investing in full implementation
- **Quality Standard**: Sufficient to demonstrate intended experience, not production-ready
- **Annotations**: All blueprint code must include `// BLUEPRINT - Replace with real implementation` comments

**Generate working code** (use context7 MCP for framework guidance)

**FIRST RUN MODE (P0/P1 Features):**
- Build complete validation interface using the Platform Profile's UI library
- Implement ALL core hypothesis testing features with full functionality
- Create working feedback collection mechanisms with real data persistence
- Generate backend services with actual business logic (if Platform Profile requires backend)

**RERUN MODE (P2/P3 Features — Ideation Blueprints):**
- Build UI shell components using existing design system from P0/P1
- Create skeleton structures that demonstrate intended UX flow
- Wire up mock interactions (tap/click → log, not real processing)
- Use hardcoded sample data instead of backend calls
- Annotate components with `// BLUEPRINT` comments
- Maintain visual consistency with P0/P1 features

**File creation with path validation**
- Use `Write('mvp/src/filename')` for ALL files
- Verify each file after creation
- Track creation in TodoWrite
- Minimum required files: per Platform Profile's `required_files` field

**Modern UI implementation**
- Clean, contemporary interface design following platform conventions
- Neutral-first color system with purposeful accents
- Spacious layout with strong visual hierarchy
- Accessible contrast and responsive behavior
- Use Platform Profile's UI library components; follow platform-native interaction patterns (touch targets for mobile, hover states for web, keyboard shortcuts for desktop)

### Rerun Protocol for Incremental P2/P3 Builds

**When to Use Rerun Mode:**
- User invokes workflow again after initial P0/P1 prototype is complete
- Stakeholders want to visualize P2/P3 features for prioritization discussions
- Team needs conceptual mockups before committing to full implementation

**Rerun Detection Logic:**
```bash
# Automatic detection on workflow invocation
if [ -f "mvp/mvp-scope-and-journeys.md" ]; then
  # Parse scope document for feature completion status per tier
  # If P0/P1 complete and P2 not started → Build P2 blueprints
  # If P0/P1/P2 complete → Build P3 blueprints
  # If P0/P1 incomplete → Continue FIRST RUN
fi
```

**Rerun Build Rules:**
1. **Preserve Existing Work**: Never overwrite P0/P1 implementations
2. **Incremental Addition**: Add new files for P2/P3 features to `mvp/src/`
3. **Integration Points**: Update routing/navigation to link to new blueprint screens
4. **Visual Labeling**: Add "CONCEPT" or "BLUEPRINT" badges to P2/P3 UI screens
5. **Documentation**: Update `mvp/README.md` with section distinguishing complete features from blueprints

**Blueprint Implementation Checklist:**
- [ ] UI shell created with placeholder content
- [ ] Navigation paths added to existing app
- [ ] Mock data structures defined
- [ ] Component skeleton files created
- [ ] Comments added: `// BLUEPRINT - Not production-ready`
- [ ] Visual indicators added (e.g., "CONCEPT" banner in UI)
- [ ] `mvp/README.md` updated with blueprint feature list
- [ ] `mvp/mvp-scope-and-journeys.md` updated with feature status

**Stakeholder Communication:**
After rerun completion, provide clear guidance:
- "P0/P1 features are fully functional and ready for hypothesis testing"
- "P2/P3 features are conceptual mockups for feedback — they do NOT process real data"
- "Use P2/P3 blueprints to guide prioritization discussions for future development"

**Transition to Full Implementation:**
If stakeholders approve a P2/P3 feature for full development:
- Invoke `/build-agent` workflow (not `/build-prototype`) for production-quality implementation
- Reference the blueprint files as design specifications
- Replace blueprint code with proper implementation

### Documentation & Testing Setup (4 hours)

**Create documentation**
- `mvp/README.md` - Setup and launch guide
- `mvp/deployment-guide.md` - Deployment instructions
- Document validation procedures

**Prepare for testing**
- Define validation test scenarios
- Set up test environment configuration
- Document expected validation outcomes

### Automated Validation (4 hours)

**Playwright MCP is the primary test tool for all platforms.** Validation strategy adapts based on Platform Profile:

**Launch and capture prototype** (use Playwright MCP)

| Platform Type | Playwright Validation Strategy |
|---|---|
| `web` | Navigate to localhost URL, capture screenshots |
| `responsive-web` | Navigate + test at mobile (375px), tablet (768px), desktop (1440px) viewports using device emulation |
| `cross-platform-app` | Build web export (e.g., `npx expo export:web`), serve locally, validate with Playwright device emulation |
| `desktop-app` (Electron) | Launch via `_electron.launch` API, interact and capture window screenshots |
| `desktop-app` (Tauri) | Serve frontend in dev mode, validate with Playwright via browser |
| `native-mobile` (no web layer) | **Fallback**: Build and launch in simulator/emulator, capture screenshots via platform CLI (e.g., `xcrun simctl io screenshot`, `adb exec-out screencap`) |

```
1. Build: Execute Platform Profile's build_command
2. Launch: Execute Platform Profile's launch_command (or serve web export)
3. Navigate/Connect: Playwright MCP connects to the running prototype
4. Capture: mcp__playwright__browser_take_screenshot("mvp-launch.png")
5. For responsive-web / cross-platform: Emulate devices using Playwright device descriptors
```

**Test user journeys** (use Playwright MCP with platform-appropriate interaction)
```
For each persona:
1. Snapshot: mcp__playwright__browser_snapshot()
2. Interact: mcp__playwright__browser_click/fill_form/type (touch targets for mobile emulation)
3. Validate: mcp__playwright__browser_wait_for(expected_result)
4. Capture: mcp__playwright__browser_take_screenshot("journey-X.png")
```
Note: For native-mobile fallback, document user journeys with sequential simulator screenshots instead.

**Validate feedback mechanisms**
- Test feedback collection features
- Verify submission workflows
- Document functionality

**Generate validation report**
- Create `mvp/test-results/validation-report.md`
- Document test results with screenshot evidence
- Include Platform Profile summary (platform_type, framework, test_tool used)
- Assess hypothesis testing readiness

### Success Criteria

**FIRST RUN MODE (P0/P1 Features):**

**Technical Success:**
- Prototype builds and runs without errors
- ALL P0 (Critical) and P1 (High) validation features fully functional
- Professional UI suitable for immediate user testing
- Backend services operational (if applicable)

**Business Success:**
- Clear value proposition demonstration for core hypothesis
- Hypothesis testing enabled through complete P0/P1 features
- User feedback collection fully functional
- Stakeholders can conduct real validation tests immediately

**Process Success:**
- User approval obtained before implementation
- ALL P0/P1 features delivered regardless of hours (80-hour estimate advisory only)
- Complete documentation for stakeholder testing
- Priority tiers clearly documented in mvp-scope-and-journeys.md

**RERUN MODE (P2/P3 Features — Ideation Blueprints):**

**Technical Success:**
- Blueprint features render and navigate without errors
- UI shells demonstrate intended design and flow
- Mock interactions respond to user actions (even if not processing real data)
- Blueprints visually labeled to distinguish from full features

**Business Success:**
- Stakeholders can visualize P2/P3 concepts for prioritization
- Sufficient fidelity to gather meaningful feedback on UX direction
- Clear distinction between "ready to test" (P0/P1) and "concept only" (P2/P3)

**Process Success:**
- User approval obtained for blueprint scope before implementation
- Incremental addition preserves existing P0/P1 work
- Documentation clearly distinguishes complete features from blueprints
- README updated with feature status matrix (Complete vs Blueprint)

### Quality Assurance Framework

#### Completion Checklist

**Verify all deliverables exist:**
```bash
ls -d mvp/                              # MVP folder
ls mvp/mvp-scope-and-journeys.md        # Validation plan (includes Platform Profile)
ls -la mvp/src/                         # Source code folder
# Verify Platform Profile required_files exist:
# (e.g., index.html + app.js + style.css for web, App.tsx + app.json for Expo, etc.)
ls mvp/README.md                        # Setup guide
ls mvp/deployment-guide.md              # Deployment guide
ls -d mvp/test-results/                 # Test results folder
ls mvp/test-results/validation-report.md # Validation report
ls mvp/test-results/screenshots/        # Visual evidence
tree mvp/                               # Complete structure
```
## Guardrails
- `rules/ai-assistant-usage-policy.md`: Explicit commands; minimal output
- `rules/code-anti-patterns.md`: Avoid god objects, circular deps, magic constants
- `rules/dry-principle-guidelines.md`: Single source of truth; delta updates
- `rules/iterative-development-guide.md`: Strict phased workflow
- `rules/language-agnostic-standards.md`: KISS, YAGNI, size limits, clear naming
- `rules/markdown-styleguide.md`: Front matter, heading hierarchy, code fences
- `rules/performance-best-practices.md`: Optimize after measurement
- `rules/security-standards-owasp.md`: OWASP Top 10 alignment
- `rules/software-architecture-patterns.md`: Pattern selection, boundaries

### Extended Standards (apply based on task domain)
- `rules/code-documentation-standards.md`: Comment WHY, not WHAT
- `rules/react-development-standards.md`: React component patterns
- `rules/typescript-styleguide.md`: TypeScript typing & consistency
- `rules/web-accessibility-standards.md`: WCAG 2.2 AA validation
- `rules/backend-development-standards.md`: Service/controller patterns
- `rules/frontend-development-standards.md`: Frontend patterns
- `rules/ui-ux-design-standards.md`: Layout/interaction standards
- `rules/database-standards.md`: Schema/migration standards
- `rules/stored-procedure-standards.md`: Stored procedure patterns
- `rules/dotnet-architecture-standards.md`: .NET architecture patterns

**Selection**: Apply standards matching the resolved Platform Profile's `platform_standards` field. Most specific overrides general.


## Quality Evaluation

### 4-Tier Prototype Assessment

| Tier | Dimension | Gate | Conditional |
|------|-----------|------|-------------|
| T1 | Build Success + Local Launch Ready | MUST PASS | No (always required) |
| T2 | Priority Tier Coverage | MUST=100% | No (always required) |
| T3 | Documentation Complete + Business Alignment | ≥80% | Yes (skip for <3 user journeys) |
| T4 | Build Strategy Adherence | ≥80% | Yes (skip for first-run-only prototypes with no P2/P3 defined) |

### Tier Definitions

**T1 - Build & Launch (REQUIRED)**
- Prototype must build without errors (Platform Profile's `build_command` exits 0)
- Prototype must launch and be accessible (Platform Profile's `launch_command` succeeds, `launch_verification` passes)
- Required source files exist (Platform Profile's `required_files`)
- Gate: MUST PASS (execution halts if build/launch fails)

**T2 - Priority Tier Coverage (REQUIRED)**

**FIRST RUN MODE:**
- ALL P0 (Critical) features from mvp-scope-and-journeys.md fully implemented
- ALL P1 (High) features from mvp-scope-and-journeys.md fully implemented
- P2/P3 features NOT included (deferred to reruns)
- Gate: MUST=100% (all P0/P1 features present and functional)

**RERUN MODE:**
- Current priority tier (P2 or P3) features implemented as ideation blueprints
- Blueprints include UI shells, mock interactions, placeholder data
- Previous tiers (P0/P1) remain intact and functional
- Gate: MUST=100% (all features in current priority tier have blueprint implementations)

**T3 - Documentation & Alignment (CONDITIONAL)**
- Skip Condition: <3 user journeys defined (simple prototypes need minimal docs)
- Documentation: README.md, deployment-guide.md, validation procedures
- Business alignment: Features map to hypothesis objectives
- Gate: ≥80% (or SKIPPED if condition met)

**T4 - Build Strategy Adherence (CONDITIONAL)**
- Skip Condition: First-run-only prototypes with no P2/P3 features defined

**FIRST RUN MODE Validation:**
- P0/P1 features have complete implementations (not blueprints)
- Full business logic present (verified by code inspection)
- Backend services operational if required
- No placeholder/mock data in P0/P1 features (real data flows)

**RERUN MODE Validation:**
- P2/P3 features are blueprints (NOT full implementations)
- Blueprint code contains mock data, placeholder logic
- `// BLUEPRINT` annotations present in code
- Visual labeling present ("CONCEPT" badges in UI)
- README distinguishes complete vs blueprint features

- Gate: ≥80% (or SKIPPED if condition met)

### Executable Verification

#### T1: Build & Launch
| Check | Command | Expected | Actual | Status |
|-------|---------|----------|--------|--------|
| Build | Platform Profile `build_command` | exit 0 | [result] | PASS/FAIL |
| Launch | Platform Profile `launch_command` | exit 0 | [result] | PASS/FAIL |
| Files | Verify Platform Profile `required_files` | all present | [result] | PASS/FAIL |
| Access | Platform Profile `launch_verification` | success | [result] | PASS/FAIL |

#### T2: Priority Tier Coverage
| Check | Threshold | Actual | Score |
|-------|-----------|--------|-------|
| P0 Features Implemented | = P0 count from scope | [N]/[M] | [X]% |
| P1 Features Implemented | = P1 count from scope | [N]/[M] | [X]% |
| P2 Features (Blueprints) | = P2 count if rerun | [N]/[M] | [X]% |
| P3 Features (Blueprints) | = P3 count if rerun | [N]/[M] | [X]% |

```
IF FIRST RUN:
  Priority Tier Coverage = (P0 implemented + P1 implemented) / (P0 defined + P1 defined) × 100%
IF RERUN:
  Priority Tier Coverage = (current tier implemented) / (current tier defined) × 100%
T2 Score = Priority Tier Coverage (MUST = 100%)
```

#### T3: Documentation & Alignment [CONDITIONAL]
Status: [EVALUATED / SKIPPED - <3 journeys]

| Check | Threshold | Actual | Score |
|-------|-----------|--------|-------|
| README.md | exists | [yes/no] | [computed] |
| deployment-guide.md | exists | [yes/no] | [computed] |
| validation-report.md | exists | [yes/no] | [computed] |
| Feature-Objective Mapping | 100% | [N]/[M] | [X]% |

```
Doc Score = (docs present / 3) × 100%
Alignment Score = (aligned features / total features) × 100%
T3 Score = Average(Doc Score, Alignment Score)
```

#### T4: Build Strategy Adherence [CONDITIONAL]
Status: [EVALUATED / SKIPPED - no P2/P3 features]

**Run Mode Detected**: [FIRST RUN / RERUN]

| Check | Threshold | Actual | Score |
|-------|-----------|--------|-------|
| P0/P1 Full Implementation | = 100% | [N]/[M] | [X]% |
| P2/P3 Blueprint Approach | = 100% if rerun | [N]/[M] | [X]% |
| Blueprint Annotations | Present if rerun | [yes/no] | PASS/FAIL |
| Feature Status Documentation | documented | [yes/no] | PASS/FAIL |
| Run Mode Indicator | present in scope doc | [yes/no] | PASS/FAIL |

```
IF FIRST RUN:
  Full Implementation Score = (P0/P1 with complete code / total P0/P1) × 100%
  T4 Score = Full Implementation Score

IF RERUN:
  Blueprint Score = (P2/P3 with blueprint approach / total P2/P3 in current tier) × 100%
  Annotation Score = Blueprint comments/labels present ? 100% : 0%
  T4 Score = Average(Blueprint Score, Annotation Score)
```

### Overall Assessment

**Run Mode**: [FIRST RUN - P0/P1 Full Implementation / RERUN - P2/P3 Ideation Blueprints]

| Tier | Dimension | Score | Gate | Result |
|------|-----------|-------|------|--------|
| T1 | Build & Launch | [PASS/FAIL] | MUST | [P/F] |
| T2 | Priority Tier Coverage | [X]% | 100% | [P/F] |
| T3 | Docs & Alignment | [X]% | ≥80% | [P/F/S] |
| T4 | Build Strategy Adherence | [X]% | ≥80% | [P/F/S] |

**Verdict**: [PASS / CONDITIONAL PASS / FAIL]

**Priority Tier Status:**
- P0 (Critical): [Complete / In Progress / Not Started]
- P1 (High): [Complete / In Progress / Not Started]
- P2 (Medium): [Blueprint / Deferred]
- P3 (Low): [Blueprint / Deferred]

**Top 3 Weaknesses:**
1. [Tier] - [Dimension] ([X]%): [Specific issue]
2. [Tier] - [Dimension] ([X]%): [Specific issue]
3. [Tier] - [Dimension] ([X]%): [Specific issue]

**Critical Failures**: [List MUST gates that failed, or "None"]

**Next Steps Recommendation:**
- IF FIRST RUN COMPLETE: "P0/P1 prototype ready for validation. Run workflow again to build P2/P3 blueprints if needed."
- IF RERUN COMPLETE: "P2/P3 blueprints ready for stakeholder feedback. Use `/build-agent` to fully implement approved features."

---

*This workflow creates platform-agnostic validation prototypes for hypothesis testing using priority-based scoping. It resolves a Platform Profile from the hypothesis to handle web, responsive, mobile, and desktop prototypes seamlessly. First run delivers complete P0/P1 features. Reruns add P2/P3 ideation blueprints. Playwright MCP serves as the unified test tool across all platforms.*