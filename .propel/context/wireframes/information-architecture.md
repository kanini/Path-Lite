# Information Architecture - PATH Lite

## 1. Wireframe Specification

**Fidelity Level**: High
**Screen Type**: Tablet (iOS & Android, 7–12.9 inch)
**Viewport**: 768px × 1024px (portrait baseline), 1024px × 768px (landscape)

---

## 2. System Overview

PATH Lite is a mobile-first healthcare documentation application for nurses performing Hemodialysis patient data entry. It replaces manual form-based workflows with an AI-driven conversational voice interface. Nurses complete patient demographic, admission, and clinical intake data through guided TTS/STT interactions. The system validates responses in real-time, handles session interruption/resume, generates treatment reports, and submits final records. The prototype targets iOS and Android tablets (7–12.9 inch) in both portrait and landscape orientations.

---

## 3. Wireframe References

### Generated Wireframes

**HTML Wireframes (Hi-Fi)**:

| Screen/Feature | File Path | Description | Fidelity | Date Created |
|----------------|-----------|-------------|----------|--------------|
| SCR-001 Login | `./Hi-Fi/wireframe-SCR-001-login.html` | Login screen with PATH Lite branding | High | 2026-02-27 |
| SCR-002 Hospital Selection | `./Hi-Fi/wireframe-SCR-002-hospital-selection.html` | Searchable hospital list with alphabetical index | High | 2026-02-27 |
| SCR-003 Patient Dashboard | `./Hi-Fi/wireframe-SCR-003-patient-dashboard.html` | Patient list with status badges, context menus, and tabs | High | 2026-02-27 |
| SCR-004 Patient Recall Search | `./Hi-Fi/wireframe-SCR-004-recall-search.html` | Patient recall modal with search gate logic | High | 2026-02-27 |
| SCR-006 Patient Details Form | `./Hi-Fi/wireframe-SCR-006-patient-details-form.html` | Split-panel form with AI voice icon | High | 2026-02-27 |
| SCR-007 Patient Details Edit Mode | `./Hi-Fi/wireframe-SCR-007-patient-details-edit.html` | Edit mode with inline validation errors | High | 2026-02-27 |
| SCR-008 Treatment Report Preview | `./Hi-Fi/wireframe-SCR-008-treatment-report.html` | Full HD Billing Report split-panel view | High | 2026-02-27 |
| SCR-009 Review and Submit | `./Hi-Fi/wireframe-SCR-009-review-submit.html` | Review screen with submit confirmation dialog | High | 2026-02-27 |

### Component Inventory
**Reference**: See [Component Inventory](./component-inventory.md) for detailed component documentation including:
- Complete component specifications with design token mapping
- Component states and variants
- Responsive behavior details (7-inch portrait, 12.9-inch landscape)
- Reusability analysis
- Implementation priorities

---

## 4. User Personas & Flows

### Persona 1: Nurse (Mounisha Tanadars)
- **Role**: Primary — Healthcare professional entering Hemodialysis patient data
- **Goals**: Complete patient documentation quickly and accurately using voice; minimize time spent on manual entry
- **Key Screens**: SCR-001, SCR-002, SCR-003, SCR-004, SCR-005, SCR-006, SCR-007, SCR-008, SCR-009, SCR-010
- **Primary Flow**: Login → Hospital Selection → Patient Dashboard → Recall Search → Patient Details Form → Review & Submit → Dashboard
- **Wireframe References**: All Hi-Fi wireframe files
- **Decision Points**: Hospital selection, patient found/not found in recall search, form review pass/fail, submit confirmation

### User Flow Diagrams

- **FL-001 Authentication Flow**: SCR-001 Login → SCR-002 Hospital Selection
- **FL-002 Hospital & Dashboard**: SCR-002 → SCR-003 Patient Dashboard
- **FL-003 New Patient Entry**: SCR-003 → SCR-005 Treatment Type → SCR-004 Recall Search → SCR-006 Patient Details Form
- **FL-004 AI Data Entry**: SCR-006 Patient Details Form (AI voice-driven sequential field completion)
- **FL-005 Form Review & Error Correction**: SCR-009 Review → SCR-007 Edit Mode → SCR-009 Review
- **FL-006 Report Generation & Submission**: SCR-009 → SCR-008 Report Preview → SCR-009 Submit → SCR-003 Dashboard
- **FL-007 Session Resume**: SCR-003 → SCR-010 Session Resume Prompt → SCR-006 Patient Details Form

---

## 5. Screen Hierarchy

### Level 1: Authentication
- **SCR-001 Login Screen** (P0 - Critical) — [Wireframe: wireframe-SCR-001-login.html]
  - Description: Full-screen centered layout with PATH Lite branding, username/password fields, Login button
  - User Entry Point: Yes (app launch)
  - Key Components: PathLiteLogo, TextField (x2), Button (Primary), Link (Ghost)

### Level 2: Hospital Management
- **SCR-002 Hospital Selection** (P0 - Critical) — [Wireframe: wireframe-SCR-002-hospital-selection.html]
  - Description: Searchable alphabetical hospital list with section index; user menu dropdown
  - Parent Screen: SCR-001
  - Key Components: Header, SearchBar, SectionList, ListRow, SectionIndexList, UserMenuDropdown

### Level 3: Patient Management
- **SCR-003 Patient Dashboard** (P0 - Critical) — [Wireframe: wireframe-SCR-003-patient-dashboard.html]
  - Description: My Patients / All Patients tabs; Active and Completed patient sections; three-dot context menu per row
  - Parent Screen: SCR-002
  - Key Components: Header, SearchBar, Tabs, PatientCard, StatusBadge, ContextMenu, SectionHeader

- **SCR-004 Patient Recall Search** (P0 - Critical) — [Wireframe: wireframe-SCR-004-recall-search.html]
  - Description: Modal overlay on Patient Dashboard; search gate (MRN + 1 field required); loading/empty states
  - Parent Screen: SCR-003 (modal overlay)
  - Key Components: Modal, TextField (x5), Button (Primary/Disabled), ProgressOverlay, InlineError

- **SCR-005 Treatment Type Selection** (P0 - Critical)
  - Description: Dropdown overlay from Add New button; Hemodialysis option in Phase 1
  - Parent Screen: SCR-003 (dropdown overlay)
  - Key Components: ActionSheet/Dropdown

### Level 4: Hemodialysis Data Entry
- **SCR-006 Patient Details Form** (P0 - Critical) — [Wireframe: wireframe-SCR-006-patient-details-form.html]
  - Description: Split-panel layout; LeftNavPanel with patient summary and HD Billing nav; Demographics & Admission + Clinical Intake form sections; AI voice icon
  - Parent Screen: SCR-004 (after recall search)
  - Key Components: SplitPanel, LeftNavPanel, PatientSummaryCard, FormSection (x2), TextField (x9), SelectField (x5), Toggle, DatePicker (x3), AIVoiceIcon, HepBHistoryPopover

  - **SCR-006a Treatment Location Picker** (P0) — Full-screen drill-down; RadioList for OR/Bedside/ICU-CCU/ER/Multi-Tx Room
  - **SCR-006b HBsAg Picker** (P0) — Full-screen drill-down; RadioList for Negative/Positive/Unknown
  - **SCR-006c Source Picker** (P0) — Full-screen drill-down; RadioList for Hospital/DaVita Patient Portal/Non-DaVita Source
  - **SCR-006d Hep B Change History Popover** (P1) — Scrollable popover; date/value/nurse name entries

### Level 5: Review & Submission
- **SCR-007 Patient Details Edit Mode** (P0 - Critical) — [Wireframe: wireframe-SCR-007-patient-details-edit.html]
  - Description: Same split-panel as SCR-006; Cancel/Confirm Change header; inline amber validation errors; auto-focus on first error field
  - Parent Screen: SCR-009 (via validation failure)
  - Key Components: Same as SCR-006 + InlineValidationError, WarningIcon, ConfirmChangeDialog

- **SCR-008 Treatment Report Preview** (P0 - Critical) — [Wireframe: wireframe-SCR-008-treatment-report.html]
  - Description: Full DaVita HD Billing Report in split-panel; Full Screen toggle; DaVita wordmark
  - Parent Screen: SCR-009 (View Report)
  - Key Components: SplitPanel, LeftNavPanel, ReportViewer, FullScreenToggle, NavigationHeader

- **SCR-009 Review and Submit** (P0 - Critical) — [Wireframe: wireframe-SCR-009-review-submit.html]
  - Description: Treatment Report ready banner; WarningAlert; View Report + Submit buttons; submit confirmation dialog; submission progress overlay
  - Parent Screen: SCR-006 (form completion)
  - Key Components: SplitPanel, LeftNavPanel, ReportReadyBanner, WarningAlert, Button (x2), Dialog, ProgressOverlay

### Level 6: Session Management
- **SCR-010 Session Resume Prompt** (P0 - Critical)
  - Description: Non-dismissable modal; Resume or Start Over options
  - Parent Screen: SCR-003 (tap patient with incomplete session)
  - Key Components: Modal, Text, Button (x2)

- **SCR-011 Change Hospital Screen** (P1 - High Priority)
  - Description: Full-screen hospital list; checkmark on current selection; Confirm Hospital Change CTA in header
  - Parent Screen: SCR-006 (tap hospital name in left panel)
  - Key Components: NavigationHeader, PatientSummary, SearchBar, RadioList

### Screen Priority Legend
- **P0**: Critical path screens (must-have for prototype)
- **P1**: High-priority screens (core functionality)
- **P2**: Medium-priority screens (important features)
- **P3**: Low-priority screens (nice-to-have)

### Modal/Dialog/Overlay Inventory

| Modal/Dialog Name | Type | Trigger Context | Parent Screen | Wireframe Reference | Priority |
|---|---|---|---|---|---|
| Patient Recall Search | Modal | Tap "Add New" → select Hemodialysis | SCR-003 | wireframe-SCR-004-recall-search.html | P0 |
| Patient Recall Loading | Progress Overlay | Tap Search in recall modal | SCR-004 | wireframe-SCR-004-recall-search.html (loading state) | P0 |
| No Match Found | Modal state | Search returns 0 results | SCR-004 | wireframe-SCR-004-recall-search.html (empty state) | P0 |
| Treatment Type Selection | Dropdown/ActionSheet | Tap "Add New" button | SCR-003 | Embedded in SCR-003 wireframe | P0 |
| Session Resume Prompt | Modal | Open treatment with incomplete session | SCR-006 | Embedded in SCR-006 wireframe | P0 |
| Change Hospital Confirmation | Dialog | Tap hospital name in left panel | SCR-006 | Embedded in SCR-006 wireframe | P0 |
| Hep B Change History | Popover | Tap history icon on HBsAg/HBsAb | SCR-006 | Embedded in SCR-006 wireframe | P1 |
| Treatment Reuse Warning | Dialog | Tap completed-section treatment | SCR-003 | Embedded in SCR-003 wireframe | P0 |
| Amend Reason Picker | Action Sheet | Tap Amend from context menu | SCR-003 | Embedded in SCR-003 wireframe | P1 |
| Submit Confirmation Dialog | Dialog | Tap Submit button | SCR-009 | wireframe-SCR-009-review-submit.html | P0 |
| Submission Progress Overlay | Full-screen overlay | Confirm submission | SCR-009 | wireframe-SCR-009-review-submit.html (loading state) | P0 |
| Not Connected Error Dialog | Dialog | Tap Amend without network | SCR-003 | Embedded in SCR-003 wireframe | P1 |

**Modal Behavior Notes:**
- **Dismissal Actions**: Patient Recall Search — Cancel button only; Session Resume Prompt — non-dismissable (must choose); Confirmation dialogs — Cancel/No/Yes buttons
- **Focus Management**: Focus trapped within all modals; return to trigger element on close
- **Accessibility**: `role="dialog"`, `aria-labelledby`, `aria-describedby`, `aria-modal="true"` on all modals

---

## 6. Navigation Architecture

```
PATH Lite App
+-- SCR-001: Login Screen (wireframe-SCR-001-login.html)
    |
    v (successful login)
+-- SCR-002: Hospital Selection (wireframe-SCR-002-hospital-selection.html)
    |   +-- [User Menu Dropdown]: Hospital Selection | Logout
    |
    v (tap hospital)
+-- SCR-003: Patient Dashboard (wireframe-SCR-003-patient-dashboard.html)
    |   +-- [Tab]: My Patients / All Patients
    |   +-- [Add New Button] → SCR-005 Treatment Type Selection
    |   |       +-- Hemodialysis → SCR-004 Patient Recall Search
    |   +-- [Three-dot Menu] → Hemodialysis (active) | Amend (submitted)
    |   +-- [Amend] → SCR-006 Patient Details Form (amend mode)
    |
    +-- SCR-004: Patient Recall Search (modal) (wireframe-SCR-004-recall-search.html)
    |   +-- [Search] → Loading Overlay → SCR-006 (prefilled) or Empty State
    |   +-- [Create New Treatment] → SCR-006 (empty)
    |   +-- [Cancel] → SCR-003
    |
    v (patient selected)
+-- SCR-006: Patient Details Form (wireframe-SCR-006-patient-details-form.html)
    |   +-- [Left Nav Panel]: HD Billing section list
    |   +-- [AI Voice Icon]: inactive | active | listening
    |   +-- SCR-006a: Treatment Location Picker (drill-down)
    |   +-- SCR-006b: HBsAg Picker (drill-down)
    |   +-- SCR-006c: Source Picker (drill-down)
    |   +-- SCR-006d: Hep B Change History Popover
    |   +-- [Hospital Name in Panel] → Change Hospital Confirmation Dialog → SCR-011
    |   +-- [Done/Save] → SCR-009 Review and Submit
    |
    +-- SCR-010: Session Resume Prompt (modal on SCR-006 open)
    |
+-- SCR-007: Patient Details Edit Mode (wireframe-SCR-007-patient-details-edit.html)
    |   +-- [Cancel] → SCR-009 Review and Submit
    |   +-- [Confirm Change] → validates → SCR-009 or re-validate
    |
+-- SCR-008: Treatment Report Preview (wireframe-SCR-008-treatment-report.html)
    |   +-- [Back Arrow] → SCR-009 Review and Submit
    |   +-- [Full Screen] → Full-screen modal
    |
+-- SCR-009: Review and Submit (wireframe-SCR-009-review-submit.html)
    |   +-- [View Report] → SCR-008 Treatment Report Preview
    |   +-- [Submit] → Submit Confirmation Dialog → Submission Progress → SCR-003
    |
+-- SCR-011: Change Hospital Screen
    +-- [Cancel] → SCR-006
    +-- [Confirm Hospital Change] → SCR-006 (updated hospital, procedure data cleared)
```

### Navigation Patterns
- **Primary Navigation**: Left Panel Sidebar — persistent on all treatment form screens (SCR-006, 007, 008, 009); collapsible on 7-inch portrait
- **Secondary Navigation**: Header Tabs — "My Patients" / "All Patients" on SCR-003
- **Utility Navigation**: User Menu Dropdown — tap nurse name in header → Hospital Selection + Logout
- **Breadcrumb Navigation**: Header Back Arrow + Title — drill-down pickers (SCR-006a/b/c) and SCR-008
- **Form Navigation**: Left Panel Section List — HD Billing section with 8 items; active item highlighted

---

## 7. Interaction Patterns

### Pattern 1: AI Voice-Driven Data Entry
- **Trigger**: Form opens (SCR-006); AI activates automatically
- **Flow**: AIVoiceIcon → listening state → nurse speaks → STT → LLM → field populated → next question
- **Screens Involved**: SCR-006 (wireframe-SCR-006-patient-details-form.html)
- **Feedback**: AIVoiceIcon state change within 200ms (UXR-501); STT text visible in field before confirmation (UXR-205)
- **Components Used**: AIVoiceIcon (3 states), TextField, SelectField, Toggle

### Pattern 2: Search Gate (Patient Recall Search)
- **Trigger**: Nurse enters fields in SCR-004
- **Flow**: Fields monitored → if MRN + 1 field entered → Search button enabled; else disabled with tooltip
- **Screens Involved**: SCR-004 (wireframe-SCR-004-recall-search.html)
- **Feedback**: Button visual state changes (disabled → enabled); tooltip "MRN is required for search"
- **Components Used**: Button (Primary/Disabled), TextField, InlineError

### Pattern 3: Form Review & Error Correction
- **Trigger**: Nurse taps Review or says "Please review the form"
- **Flow**: Validation runs → errors found → TTS summary → auto-navigate to first error field (SCR-007) → nurse corrects → return to SCR-009
- **Screens Involved**: SCR-009 → SCR-007 → SCR-009
- **Feedback**: InlineError with amber ⚠ icon; left nav items show ⚠ for sections with errors; auto-scroll to error field
- **Components Used**: InlineValidationError, WarningIcon, LeftNavPanel (error state)

### Pattern 4: Drill-Down Picker Selection
- **Trigger**: Tap SelectField (Treatment Location, HBsAg, HBsAb, Source)
- **Flow**: Tap row → full-screen picker opens → nurse selects radio option → checkmark applied → back → parent field updated
- **Screens Involved**: SCR-006 → SCR-006a/b/c → SCR-006
- **Feedback**: Selected value visible in parent SelectField immediately (UXR-106)
- **Components Used**: SelectField, NavigationHeader, RadioList

### Pattern 5: Submit with Confirmation
- **Trigger**: Nurse taps Submit on SCR-009
- **Flow**: Submit Confirmation Dialog → Yes → Submission Progress Overlay (0→100%) → SCR-003 (status = Submitted)
- **Screens Involved**: SCR-009 (wireframe-SCR-009-review-submit.html)
- **Feedback**: Dialog with patient name + hospital; progress bar increment; status badge updated on dashboard
- **Components Used**: Dialog, ProgressOverlay, StatusBadge

---

## 8. Error Handling

### Error Scenario 1: Invalid Login Credentials
- **Trigger**: Nurse submits incorrect username or password
- **Error Screen/State**: SCR-001 / Error — inline message "Invalid username or password"
- **User Action**: Correct username and/or password; retry
- **Recovery Flow**: Username field retains value; password field cleared; nurse re-enters password and taps Login

### Error Scenario 2: Patient Not Found in Recall Search
- **Trigger**: Search returns 0 results
- **Error Screen/State**: SCR-004 / Empty — "No matching patients found. Create new treatment"
- **User Action**: Tap "Create New Treatment" to proceed with empty form
- **Recovery Flow**: SCR-006 opens with empty form; only MRN prefilled from search criteria

### Error Scenario 3: Form Validation Failure
- **Trigger**: AI review detects invalid field values (date range, required field missing, format error)
- **Error Screen/State**: SCR-007 / Validation Error — inline ⚠ amber icon + error message below field
- **User Action**: Provide corrected value via voice or manual input; tap Confirm Change
- **Recovery Flow**: STT → LLM → validation pipeline; if valid, returns to SCR-009; if invalid, re-asks

### Error Scenario 4: Offline Amend Attempt
- **Trigger**: Nurse taps Amend from context menu without network connectivity
- **Error Screen/State**: SCR-003 / Not Connected Dialog — "You need to be online to amend. Try again when you are connected."
- **User Action**: Tap Ok; restore network connectivity; retry
- **Recovery Flow**: Dialog dismissed; nurse ensures connectivity; retries Amend action

### Error Scenario 5: AI Session Auto-Close (3 Failed Retries)
- **Trigger**: No voice response after 3 retry attempts per field
- **Error Screen/State**: SCR-006 / Session Closed Notification — on-screen visual + TTS announcement
- **User Action**: Partial data preserved; nurse can reopen treatment to resume
- **Recovery Flow**: SCR-010 Session Resume Prompt on reopen; nurse taps Resume; AI restarts from first unanswered field

---

## 9. Responsive Strategy

| Breakpoint | Width | Layout Changes | Navigation Changes | Component Adaptations |
|---|---|---|---|---|
| 7-inch Portrait | 600dp | Single or narrow split-panel; form content full-width | LeftNavPanel collapsible (hamburger or slide-out) | Touch targets ≥44pt maintained; text scales to min 14pt |
| 7-inch Landscape | 960dp | Split-panel active (200px left + remaining content) | LeftNavPanel persistent | Form fields full width in content area |
| 12.9-inch Portrait | 1024dp | Split-panel active (200px left + content) | LeftNavPanel persistent | Comfortable spacing; all form sections visible |
| 12.9-inch Landscape | 1366dp | Expanded split-panel (240px left + content) | LeftNavPanel 240px width | Optimized real estate use per UXR-302 |

### Responsive Wireframe Variants
- Tablet portrait (768px): Primary wireframe variant in all Hi-Fi files
- Tablet landscape: Layout adapts — LeftNavPanel expands to 240px; content reflows

---

## 10. Accessibility

### WCAG Compliance
- **Target Level**: AA (UXR-201)
- **Color Contrast**: Primary #1566A7 on white → 5.74:1 ✓; Error #D32F2F on white → 5.12:1 ✓; Warning #F57C00 on white → 3.01:1 ✓ (with icon)
- **Keyboard Navigation**: Sequential tab order; focus trap in modals; ESC to close dismissable overlays
- **Screen Reader Support**: ARIA labels on all inputs, buttons, icons; AIVoiceIcon announces state changes via aria-live

### Accessibility Considerations by Screen

| Screen | Key Accessibility Features | Wireframe Notes |
|---|---|---|
| SCR-001 Login | Focus order: Username → Password → Login; error message via aria-live | Autofocus on Username on load |
| SCR-002 Hospital Selection | SearchBar aria-label; SectionIndex keyboard accessible; row selection announced | Alphabetical section headers as landmarks |
| SCR-003 Patient Dashboard | StatusBadge roles; ContextMenu keyboard accessible; Dialog focus trap | Tab order: Header → Search → Tabs → Patient list |
| SCR-004 Recall Search | Modal aria-modal; MRN required field aria-required; Search button aria-disabled | Loading overlay aria-live="polite" |
| SCR-006 Patient Details | AIVoiceIcon aria-label with state; mandatory field aria-required; SelectField aria-haspopup | Left nav current item aria-current="page" |
| SCR-007 Edit Mode | Inline errors linked via aria-describedby; auto-focus first error field | Warning icon aria-label="Validation error" |
| SCR-009 Review & Submit | WarningAlert role="alert"; Submit Dialog aria-modal; ProgressOverlay aria-live | Progress bar aria-valuenow updates |

### Focus Order
- All screens: System status bar → Header (left → center → right) → Main content area (top to bottom) → Bottom action buttons
- Modals/Dialogs: Focus moves to modal on open; tab cycles within modal; returns to trigger on close
- LeftNavPanel: Section header → nav items top to bottom; active item announced as current

---

## 11. Content Strategy

### Content Hierarchy
- **H1 (heading_xl, 24px/700)**: PATH Lite branding on Login screen only
- **H2 (heading_lg, 20px/600)**: Screen titles in header center (Hospital Selection, Patient Details, Treatment Report, Review and Submit)
- **H3 (heading_md, 17px/600)**: Form section headers (Demographics & Admission, Clinical Intake), modal/dialog titles
- **Body Text (body_lg, 16px/400)**: Patient names, hospital names, field values
- **Secondary Text (body_md, 14px/400)**: Patient metadata, nav items, secondary content
- **Placeholder Content**: Format hints — `[Enter]` for text fields, `[mm/dd/yyyy]` for date fields, `[Select]` for drill-down pickers

### Content Types by Screen

| Screen | Content Types | Wireframe Reference |
|---|---|---|
| SCR-001 Login | Branding, form fields, links | wireframe-SCR-001-login.html |
| SCR-002 Hospital Selection | Search input, alphabetical list data | wireframe-SCR-002-hospital-selection.html |
| SCR-003 Patient Dashboard | Patient cards, status badges, metadata | wireframe-SCR-003-patient-dashboard.html |
| SCR-004 Recall Search | Form fields, loading overlay, empty state | wireframe-SCR-004-recall-search.html |
| SCR-006 Patient Details | Form fields, patient summary, AI icon, navigation | wireframe-SCR-006-patient-details-form.html |
| SCR-007 Edit Mode | Form fields, inline error messages, warning icons | wireframe-SCR-007-patient-details-edit.html |
| SCR-008 Report Preview | DaVita HD Billing Report document content | wireframe-SCR-008-treatment-report.html |
| SCR-009 Review & Submit | Warning alert text, confirmation dialog, progress overlay | wireframe-SCR-009-review-submit.html |
