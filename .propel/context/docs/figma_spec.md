# Figma Design Specification - PATH Lite

## 1. Figma Specification
**Platform**: iOS & Android (React Native) - Tablet-optimized (7-12.9 inch)

---

## 2. Source References

### Primary Source
| Document | Path | Purpose |
|----------|------|---------|
| Requirements | `.propel/context/docs/spec.md` | Personas, use cases, FR-XXX with UI impact flags |
| Screenshots | `Screenshots/` | Existing UI design reference (34 screens captured) |

### Optional Sources
| Document | Path | Purpose |
|----------|------|---------|
| Architecture Design | `.propel/context/docs/design.md` | NFR, TR, technology stack context |

### Related Documents
| Document | Path | Purpose |
|----------|------|---------|
| Design System | `.propel/context/docs/designsystem.md` | Tokens, branding, component specifications |

---

## 3. UX Requirements

*Generated based on use cases UC-001 through UC-007 with confirmed UI impact. All UCs involve a Nurse actor interacting visually with the mobile application.*

### UXR Requirements Table

| UXR-ID | Category | Requirement | Acceptance Criteria | Screens Affected |
|--------|----------|-------------|---------------------|------------------|
| UXR-001 | Usability | System MUST allow nurse to reach any core feature in maximum 3 taps from the Patient Dashboard | Tap-count audit: all features reachable within 3 taps | All screens |
| UXR-002 | Usability | System MUST provide persistent left-panel navigation showing current section and available form sections during data entry | Left nav panel visible and current item highlighted on all treatment form screens | SCR-006, SCR-007, SCR-008, SCR-009 |
| UXR-003 | Usability | System MUST provide a visible AI voice icon with distinct states (active/inactive/listening) so nurse can identify voice mode status at a glance | Voice icon state transitions visible within 200ms; three visual states distinguishable | SCR-006 |
| UXR-004 | Usability | System MUST display patient summary (name, MRN, age, gender) in the left panel at all times during data entry so nurse maintains patient context | Patient summary visible in left panel throughout SCR-006 through SCR-009 | SCR-006, SCR-007, SCR-008, SCR-009 |
| UXR-101 | Usability | System MUST provide inline search with real-time filtering on Hospital Selection screen with minimum 1-character trigger | Search results filter visibly within 300ms of keystroke | SCR-002 |
| UXR-102 | Usability | System MUST display search button in disabled state until MRN plus one additional field is entered in Patient Recall Search | Button disabled state visible; tooltip "MRN is required for search" shown when MRN absent | SCR-004 |
| UXR-103 | Usability | System MUST provide clear empty state with actionable CTA when no matching patient is found in recall search | "No matching patients found. Create new treatment" message with "Create New Treatment" button visible | SCR-004 |
| UXR-104 | Usability | System MUST group form fields into labeled sections (Demographics & Admission, Clinical Intake) with visible section headers | Section headers rendered with consistent visual weight; correct grouping matches FR-085, FR-086 | SCR-006 |
| UXR-105 | Usability | System MUST display mandatory field indicator (asterisk) on all required fields throughout data entry | All 9 mandatory fields (MRN, First Name, Last Name, DOB, Gender, Treatment Location, Room Number, HBsAg, HBsAb) show asterisk | SCR-006 |
| UXR-106 | Usability | System MUST provide single-tap selection for enum fields (Gender, Treatment Location, HBsAg, HBsAb Source) via inline toggle or drill-down picker | Enum selections complete in 1 tap; selected value visible in parent field immediately after selection | SCR-006, SCR-007 |
| UXR-107 | Usability | System MUST show Hep B Change History popover on tap of history icon beside HBsAg/HBsAb fields | History popover appears within 200ms; shows date, value, nurse name entries | SCR-006 |
| UXR-108 | Usability | System MUST navigate directly to first erroneous field during error correction without nurse manual navigation | Auto-focus on first error field; field scroll-into-view completed before AI question is spoken | SCR-007 |
| UXR-201 | Accessibility | System MUST comply with WCAG 2.2 AA color contrast standards: minimum 4.5:1 for normal text, 3:1 for large text and UI components | axe/WAVE audit passes; primary blue #1566A7 on white verified ≥ 4.5:1 | All screens |
| UXR-202 | Accessibility | System MUST provide minimum 44×44pt touch targets for all interactive elements per iOS/Android accessibility guidelines | Touch target audit: all tappable elements ≥ 44×44pt | All screens |
| UXR-203 | Accessibility | System MUST provide ARIA labels and semantic roles for all interactive elements to support screen reader assistive technology | VoiceOver/TalkBack navigation works for all interactive elements | All screens |
| UXR-204 | Accessibility | System MUST maintain readable text in clinical lighting conditions using sufficient font size (minimum 14pt body) and adequate contrast | Text legibility verified in bright ambient light simulation (>500 lux) | All screens |
| UXR-205 | Accessibility | System MUST provide visual confirmation of voice-captured text before field population so nurses can verify STT accuracy | Captured STT text displayed in field visually prior to LLM processing confirmation | SCR-006, SCR-007 |
| UXR-301 | Responsiveness | System MUST adapt layout for 7-inch tablets (portrait: 600dp width) with appropriately scaled touch targets and typography | Layout renders correctly on 7-inch viewport; no horizontal scroll; touch targets remain ≥ 44pt | All screens |
| UXR-302 | Responsiveness | System MUST adapt layout for 12.9-inch tablets (landscape: 1366dp width) with optimized use of expanded screen real estate | Left nav panel and main content panel use split-pane layout on 12.9-inch landscape | SCR-006, SCR-007, SCR-008, SCR-009 |
| UXR-303 | Responsiveness | System MUST support seamless orientation switch (portrait ↔ landscape) without data loss or layout breakage | Orientation rotation preserves all entered field values; layout reflows within 300ms | All screens |
| UXR-401 | Visual Design | System MUST use primary color #1566A7 (DaVita Blue) consistently for all primary actions, active states, and key interactive elements | Design token audit: all primary CTAs and active indicators use #1566A7; no deviation | All screens |
| UXR-402 | Visual Design | System MUST use PATH Lite branding (snowflake logo + "PATH LITE" wordmark) on the Login screen and loading overlays | Logo and wordmark rendered at correct scale; matches reference Screenshots/Screenshot 2026-02-27 112333.png | SCR-001, SCR-005 (loading) |
| UXR-403 | Visual Design | System MUST apply consistent visual hierarchy: screen title in header center, user context in header left, action in header right | Header pattern consistent across all authenticated screens | SCR-002, SCR-003, SCR-006, SCR-007, SCR-008, SCR-009 |
| UXR-404 | Visual Design | System MUST use warning triangle icon (⚠) in amber/orange for validation errors inline with field labels | Validation error icon and message visible inline; color contrast ≥ 3:1 | SCR-007 (edit mode) |
| UXR-405 | Visual Design | System MUST display patient status badges (Not Started, Tx In Progress, Received, Submitted, Submitted (Amended)) with distinct color coding | Status badges use consistent color set; legend provided or self-evident from context | SCR-003 |
| UXR-501 | Interaction | System MUST provide visual and audio feedback within 200ms of nurse voice activation | AI icon animates to listening state within 200ms; audio tone within 200ms | SCR-006 |
| UXR-502 | Interaction | System MUST display a branded progress overlay ("PATH is retrieving data for matching patient") with percentage progress bar during patient recall search | Progress overlay appears immediately on search initiation; percentage increments visible | SCR-004 (loading state) |
| UXR-503 | Interaction | System MUST display a branded submission progress overlay ("Submitting this treatment - Please wait") with percentage progress during form submission | Submission overlay appears immediately; percentage increments to 100% before redirect | SCR-009 (submit loading) |
| UXR-504 | Interaction | System MUST animate left-panel navigation to highlight active section as nurse progresses through form sections | Active nav item highlighted within 100ms of section change | SCR-006, SCR-007 |
| UXR-505 | Interaction | System MUST provide confirmation dialog before hospital change during active patient data entry, warning that procedure code data will be cleared | Dialog renders with Cancel/Change options; "Change Hospital?" title and warning text visible | SCR-006 |
| UXR-506 | Interaction | System MUST provide confirmation dialog before initiating a treatment from a completed section, warning it cannot be reused | Dialog renders with No/Yes options and clear warning text | SCR-003 |
| UXR-507 | Interaction | System MUST show amend reason selection (Entered in Error / Omitted in Error) when nurse selects Amend action on a submitted treatment | Bottom sheet or inline picker with two amend reason options | SCR-003 |
| UXR-601 | Error Handling | System MUST display inline error message below invalid field with specific actionable text (e.g., "Date must be between MM/DD/YYYY - MM/DD/YYYY") | Error message appears inline below field; text is field-specific and actionable | SCR-007 |
| UXR-602 | Error Handling | System MUST display "Invalid username or password" error on Login screen without clearing the username field | Error message visible; username field retains value; password field cleared | SCR-001 |
| UXR-603 | Error Handling | System MUST display "Not Connected - You need to be online to amend. Try again when you are connected." dialog for offline amend attempts | Error dialog renders with Ok button; matches reference screenshot | SCR-003 |
| UXR-604 | Error Handling | System MUST display session closure notification via TTS and on-screen visual when AI auto-closes after 3 failed response attempts | Visual notification visible; TTS announcement completed; partial data preserved | SCR-006 |

---

## 4. Personas Summary

*Derived from spec.md use cases and actor definitions.*

| Persona | Role | Primary Goals | Key Screens |
|---------|------|---------------|-------------|
| Nurse (Mounisha Tanadars) | Primary - Healthcare professional entering patient data | Complete Hemodialysis patient documentation quickly and accurately using voice; minimize documentation time | SCR-001, SCR-002, SCR-003, SCR-004, SCR-005, SCR-006, SCR-007, SCR-008, SCR-009 |
| System Administrator | Secondary - Manages users and hospital configuration | Not directly involved in patient data entry; administrative oversight | Out of scope for Phase 1 UI |

---

## 5. Information Architecture

### Site Map
```
PATH Lite
+-- Authentication
|   +-- SCR-001: Login Screen
+-- Hospital Management
|   +-- SCR-002: Hospital Selection
+-- Patient Management
|   +-- SCR-003: Patient Dashboard (My Patients / All Patients)
|   +-- SCR-004: Patient Recall Search (Modal overlay)
|   +-- SCR-005: Treatment Type Selection (Dropdown overlay)
+-- Hemodialysis Data Entry
|   +-- SCR-006: Patient Details Form (Demographics & Admission + Clinical Intake)
|   |   +-- SCR-006a: Treatment Location Picker (Drill-down)
|   |   +-- SCR-006b: HBsAg Picker (Drill-down)
|   |   +-- SCR-006c: HBsAb Source Picker (Drill-down)
|   |   +-- SCR-006d: Hep B Change History Popover
+-- Review & Submission
|   +-- SCR-007: Patient Details Edit Mode (Confirm Change)
|   +-- SCR-008: Treatment Report Preview (Full Screen)
|   +-- SCR-009: Review and Submit Screen
+-- Session Management
    +-- SCR-010: Session Resume Prompt (Modal overlay)
```

### Navigation Patterns
| Pattern | Type | Platform Behavior |
|---------|------|-------------------|
| Primary Nav | Left Panel (Sidebar) | Persistent left panel on all treatment form screens; collapsible on 7-inch portrait |
| Secondary Nav | Header Tabs | "My Patients" / "All Patients" tabs on Patient Dashboard |
| Utility Nav | User Menu Dropdown | Tap nurse name in header → dropdown with Hospital Selection + Logout |
| Breadcrumb | Header Back Arrow + Title | Drill-down pickers use back arrow + parent screen title in header |
| Form Nav | Left Panel Section List | HD Billing section with Patient Details, Primary Care Nurse Report, Order, Wait Time, Treatment, ACOI Questions, Cancel Billing, Review and Submit |

---

## 6. Screen Inventory

*All screens derived from use cases UC-001 through UC-007 in spec.md, validated against 34 reference screenshots.*

### Screen List
| Screen ID | Screen Name | Derived From | Personas Covered | Priority | States Required |
|-----------|-------------|--------------|------------------|----------|-----------------|
| SCR-001 | Login Screen | UC-001 | Nurse | P0 | Default, Error, Loading |
| SCR-002 | Hospital Selection | UC-002 | Nurse | P0 | Default, Loading, Empty, Search Active |
| SCR-003 | Patient Dashboard | UC-002, UC-003, UC-006 | Nurse | P0 | Default, Loading, Empty, Error (offline), My Patients / All Patients tabs |
| SCR-004 | Patient Recall Search | UC-003 | Nurse | P0 | Default, Loading (search progress), Empty (no match), Results (match found), Validation |
| SCR-005 | Treatment Type Selection | UC-003 | Nurse | P0 | Default (dropdown overlay) |
| SCR-006 | Patient Details Form | UC-004, UC-007 | Nurse | P0 | Default, Loading, AI Active (listening), Validation Error, Session Resume Prompt |
| SCR-006a | Treatment Location Picker | UC-004 | Nurse | P0 | Default |
| SCR-006b | HBsAg Picker | UC-004 | Nurse | P0 | Default |
| SCR-006c | Source Picker (HBsAg/HBsAb) | UC-004 | Nurse | P0 | Default |
| SCR-006d | Hep B Change History Popover | UC-004 | Nurse | P1 | Default |
| SCR-007 | Patient Details Edit Mode | UC-005 | Nurse | P0 | Default (edit mode), Validation Error, Confirm Change Dialog |
| SCR-008 | Treatment Report Preview | UC-006 | Nurse | P0 | Default, Loading (full screen) |
| SCR-009 | Review and Submit Screen | UC-006 | Nurse | P0 | Default, Submission Loading, Submission Confirmation Dialog |
| SCR-010 | Session Resume Prompt | UC-007 | Nurse | P0 | Default (modal overlay) |
| SCR-011 | Change Hospital Screen | UC-002, UC-004 | Nurse | P1 | Default, Change Confirmation Dialog |

### Priority Legend
- **P0**: Critical path (must-have for prototype)
- **P1**: Core functionality (high priority)
- **P2**: Important features (medium priority)
- **P3**: Nice-to-have (low priority)

### Screen-to-Persona Coverage Matrix
| Screen | Nurse | Notes |
|--------|-------|-------|
| SCR-001 Login | Primary | Entry point; full screen centered layout |
| SCR-002 Hospital Selection | Primary | Searchable list; alphabetical sections |
| SCR-003 Patient Dashboard | Primary | Active/Completed sections; three-dot context menu per patient |
| SCR-004 Patient Recall Search | Primary | Modal overlay on Patient Dashboard |
| SCR-005 Treatment Type Selection | Primary | Dropdown overlay from Add New button |
| SCR-006 Patient Details Form | Primary | Split panel (left nav + right form); AI voice icon |
| SCR-007 Patient Details Edit Mode | Primary | Edit mode with inline validation errors; amber warning icons |
| SCR-008 Treatment Report Preview | Primary | Full-screen DaVita branded HD Billing report |
| SCR-009 Review and Submit | Primary | Confirmation dialog + submission progress overlay |
| SCR-010 Session Resume Prompt | Primary | Modal overlay on returning to incomplete session |
| SCR-011 Change Hospital | Primary | Full-screen hospital list with checkmark on current selection |

### Modal/Overlay Inventory
| Name | Type | Trigger | Parent Screen(s) | Priority |
|------|------|---------|-----------------|----------|
| Patient Recall Search | Modal | Tap "Add New" button | SCR-003 | P0 |
| Patient Recall Loading | Progress Overlay | Tap Search in recall modal | SCR-004 | P0 |
| No Match Found | Modal state | Search returns 0 results | SCR-004 | P0 |
| Treatment Type Selection | Dropdown | Tap Hemodialysis/other from Add New | SCR-003 | P0 |
| Session Resume Prompt | Modal | Open treatment with incomplete session | SCR-006 | P0 |
| Change Hospital Confirmation | Dialog | Tap hospital name in left panel | SCR-006 | P0 |
| Hep B Change History | Popover | Tap history icon on HBsAg/HBsAb | SCR-006 | P1 |
| Treatment Reuse Warning | Dialog | Tap completed-section treatment | SCR-003 | P0 |
| Amend Reason Picker | Action Sheet | Tap Amend from context menu | SCR-003 | P1 |
| Submit Confirmation Dialog | Dialog | Tap Submit button | SCR-009 | P0 |
| Submission Progress Overlay | Full-screen overlay | Confirm submission dialog | SCR-009 | P0 |
| Not Connected Error Dialog | Dialog | Tap Amend without network | SCR-003 | P1 |

---

## 7. Content & Tone

### Voice & Tone
- **Overall Tone**: Professional, clinical, instructional — reflects healthcare environment
- **Error Messages**: Specific, non-blaming, actionable (e.g., "Date must be between 02/24/2025 - 02/26/2026" not "Invalid date")
- **Empty States**: Guiding with clear CTA (e.g., "No matching patients found. Create new treatment")
- **Success Messages**: Concise and confirmatory (e.g., "Form submitted successfully. Patient record has been saved.")
- **AI TTS Prompts**: Conversational, directive, first-person AI voice

### Content Guidelines
- **Headings**: Title Case for screen titles and section headers
- **CTAs**: Action-oriented verbs (Search, Login, Submit, Save, Cancel, Confirm Change, Create New Treatment)
- **Labels**: Concise with required indicator asterisk (*) on mandatory fields
- **Placeholder Text**: Format hints in brackets, e.g., `[Enter]`, `[mm/dd/yyyy]`, `[Select]`
- **Field Help**: Tooltip format for MRN: "MRN is required for search"

---

## 8. Data & Edge Cases

### Data Scenarios
| Scenario | Description | Handling |
|----------|-------------|----------|
| No Patients (Active) | Hospital has no active patients | "All Patients" tab shows empty list with no patients message |
| Patient Not Found (Recall) | MRN + fields return no match | "No matching patients found. Create new treatment" empty state with Create New Treatment action |
| Multiple Matches | Multiple patients match recall criteria | List of matching patients shown for nurse selection |
| Existing Patient (Prefill) | Patient found in mock data store | Treatment form prefilled with demographic data |
| New Patient (Empty Form) | No match confirmed, new entry | Treatment form opens with empty fields; only MRN prefilled |
| Session Interrupted | App backgrounded mid-entry | Resume prompt on reopen: "You have an incomplete session. Would you like to resume?" |
| Session Expired (>24h) | Stale session detected | "Session expired. Starting new entry." — clears data, starts fresh |
| Submitted Treatment | Attempting to reuse completed treatment | Warning dialog: "Treatments from the completed section can only be initiated once." |
| Offline + Amend | Network unavailable during amend | "Not Connected" error dialog: "You need to be online to amend." |
| Validation Failure (Date) | Date outside valid range | Inline error: "Date must be between [start] - [end]" with amber warning icon |

### Edge Cases
| Case | Screen(s) Affected | Solution |
|------|-------------------|----------|
| Long hospital name | SCR-002, SCR-011, header | Truncate with ellipsis; full name in list row |
| Long patient name | SCR-003, left panel | Truncate in list; full name in form header |
| HBsAg history with multiple entries | SCR-006d | Scrollable popover list sorted by date descending |
| MRN-only search (no second field) | SCR-004 | Search button disabled; no tooltip needed (instructions visible above form) |
| AI session auto-close (3 retries) | SCR-006 | Partial data saved; on-screen notification + TTS announcement |
| Report generation for incomplete fields | SCR-008 | Report shows dashes or "N/A" for unpopulated optional fields |
| Hospital change mid-entry | SCR-006 | "Change Hospital?" dialog warns procedure code data cleared |

---

## 9. Branding & Visual Direction

*See `designsystem.md` for all design tokens (colors, typography, spacing, shadows, etc.)*

### Branding Assets
- **Logo**: PATH Lite snowflake icon (teal/blue multi-petal) + "PATH LITE" bold wordmark — used on Login screen header and branded loading overlays
- **DaVita Branding**: "Davita" wordmark appears on Treatment Report Preview (SCR-008) top-right — matches existing PATH Lite / DaVita relationship
- **Icon Style**: System icons (iOS SF Symbols / Android Material Icons) for navigation; custom snowflake for branding
- **Illustration Style**: None — clinical application uses no decorative illustrations
- **Photography Style**: Not applicable

### Screenshots Reference Mapping
| Screenshot File | Screen Mapped |
|-----------------|---------------|
| Screenshot 2026-02-27 112333.png | SCR-001: Login Screen |
| Screenshot 2026-02-27 112426.png | SCR-002: Hospital Selection (default) |
| Screenshot 2026-02-27 112500.png | SCR-002: Hospital Selection (user menu open) |
| Screenshot 2026-02-27 112522.png | SCR-002: Hospital Selection (search active) |
| Screenshot 2026-02-27 112543.png | SCR-003: Patient Dashboard (all patients) |
| Screenshot 2026-02-27 112602.png | SCR-005: Treatment Type Selection (dropdown) |
| Screenshot 2026-02-27 112624.png | SCR-004: Patient Recall Search (default) |
| Screenshot 2026-02-27 112652.png | SCR-004: Patient Recall Search (fields entered) |
| Screenshot 2026-02-27 112708.png | SCR-004: Patient Recall Loading overlay |
| Screenshot 2026-02-27 112728.png | SCR-004: No match found empty state |
| Screenshot 2026-02-27 112748.png | SCR-006: Patient Details Form (left panel only) |
| Screenshot 2026-02-27 112802.png | SCR-006: Patient Details Form (full - empty state) |
| Screenshot 2026-02-27 112838.png | SCR-006: Change Hospital confirmation dialog |
| Screenshot 2026-02-27 112854.png | SCR-011: Change Hospital screen |
| Screenshot 2026-02-27 113014.png | SCR-006: Patient Details Form (populated) |
| Screenshot 2026-02-27 113105.png | SCR-006a: Treatment Location Picker |
| Screenshot 2026-02-27 113123.png | SCR-006a: Treatment Location Picker (OR selected) |
| Screenshot 2026-02-27 113144.png | SCR-006b: HBsAg Picker |
| Screenshot 2026-02-27 113157.png | SCR-006d: Hep B Change History popover |
| Screenshot 2026-02-27 113213.png | SCR-006d: Hep B Change History (expanded) |
| Screenshot 2026-02-27 113228.png | SCR-006c: Source Picker |
| Screenshot 2026-02-27 113444.png | SCR-007: Patient Details Edit Mode (validation error) |
| Screenshot 2026-02-27 113519.png | SCR-008: Treatment Report Preview |
| Screenshot 2026-02-27 113537.png | SCR-009: Review and Submit (submit confirmation dialog) |
| Screenshot 2026-02-27 113554.png | SCR-009: Submission Progress overlay (90%) |
| Screenshot 2026-02-27 113618.png | SCR-003: Patient Dashboard (post-submit) |
| Screenshot 2026-02-27 113635.png | SCR-003: Context menu (Hemodialysis / Amend) |
| Screenshot 2026-02-27 113658.png | SCR-003: Treatment reuse warning dialog |
| Screenshot 2026-02-27 113729.png | SCR-003: Context menu active (Hemodialysis/Amend) |
| Screenshot 2026-02-27 113823.png | SCR-003: Amend reason picker (Entered in Error / Omitted in Error) |
| Screenshot 2026-02-27 113836.png | SCR-006: Patient Details Form (all fields populated, review ready) |
| Screenshot 2026-02-27 113853.png | SCR-003: Not Connected error dialog |
| Screenshot 2026-02-27 113906.png | SCR-009: Submission Progress overlay (80%) |
| Screenshot 2026-02-27 113915.png | SCR-003: Dashboard post-amend (Submitted (Amended) status) |

---

## 10. Component Specifications

*Component specifications defined in designsystem.md.*

### Required Components per Screen
| Screen ID | Components Required | Notes |
|-----------|---------------------|-------|
| SCR-001 | Logo, TextField (2), Button (1 Primary), Link (1) | "Need Help?" link; Login button |
| SCR-002 | Header, SearchBar, SectionList (alphabetical), ListRow (hospital + address) | Real-time filter; alphabetical section index |
| SCR-003 | Header, SearchBar, Tabs (My/All), SectionList (Active/Completed), PatientCard, StatusBadge, ContextMenu, Dialog (2), ActionSheet | Three-dot context menu per patient row |
| SCR-004 | Modal, TextField (5), Button (Search disabled/enabled, Cancel, Create New Treatment) | MRN mandatory marker; search gate logic |
| SCR-005 | Dropdown/ActionSheet with treatment type options | Hemodialysis only in Phase 1 |
| SCR-006 | SplitPanel, LeftNavPanel, PatientSummaryCard, FormSection (2), TextField (9), SelectField (5), Toggle (Gender), DatePicker (3), HistoryIcon, AIVoiceIcon, HepBHistoryPopover | Left nav + right form; AI voice icon prominent |
| SCR-006a | NavigationHeader (back), RadioList (Treatment Location options) | OR, Bedside, ICU/CCU, ER, Multi-Tx Room |
| SCR-006b | NavigationHeader (back), RadioList (HBsAg options) | Negative, Positive, Unknown |
| SCR-006c | NavigationHeader (back), RadioList (Source options) | Hospital, DaVita Patient Portal, Non-DaVita Source |
| SCR-006d | Popover, HistoryList (date + value + nurse name entries) | Scrollable; sorted by date descending |
| SCR-007 | Same as SCR-006 + InlineValidationError, WarningIcon (amber), Dialog (Confirm Change), EditModeHeader | Cancel / Confirm Change in header |
| SCR-008 | SplitPanel, LeftNavPanel, NavigationHeader (back), ReportViewer, FullScreenToggle | DaVita HD Billing Report formatted PDF-style view |
| SCR-009 | SplitPanel, LeftNavPanel, ReportReadyBanner, WarningAlert, Button (View Report, Submit), Dialog (Submit Confirmation), ProgressOverlay | Warning text re: no changes after submit |
| SCR-010 | Modal, Text (resume prompt), Button (Resume, Start Over) | Non-dismissable without choice |
| SCR-011 | NavigationHeader (Cancel, Confirm Hospital Change), PatientSummary, SearchBar, RadioList with checkmark on current hospital | Confirm Hospital Change CTA in header |

### Component Summary
| Category | Components | Variants |
|----------|------------|----------|
| Actions | Button | Primary (#1566A7), Secondary (outlined), Destructive, Ghost x Enabled/Disabled/Loading |
| Inputs | TextField, DateField, Toggle (Gender), SelectField (drill-down), SearchBar | Default, Focused, Filled, Error, Disabled |
| Navigation | Header, LeftNavPanel, Tabs, SectionIndexList, BreadcrumbBack | Platform variants |
| Content | PatientCard, StatusBadge, ListRow, FormSection, HistoryList, ReportViewer | Content variants |
| Feedback | Modal, Dialog, ActionSheet, Toast, ProgressOverlay, InlineError, Popover, AIVoiceIcon | Types + States |
| Branding | Logo (PATH Lite), DaVita wordmark, SnowflakeIcon | Standalone + inline |

### Component Constraints
- All components must use design tokens from designsystem.md
- No hard-coded color values outside of design token usage
- All interactive elements must include minimum 44×44pt tap area (UXR-202)
- AIVoiceIcon component must support three distinct states: inactive (grey), active (blue pulsing), listening (animated waveform)
- StatusBadge must support five values: "Not Started" (grey), "Tx In Progress" (blue), "Received" (green), "Submitted" (blue/dark), "Submitted (Amended)" (amber)

---

## 11. Prototype Flows

### Flow: FL-001 - Nurse Authentication
**Flow ID**: FL-001
**Derived From**: UC-001
**Personas Covered**: Nurse
**Description**: Nurse launches app and authenticates to access hospital selection.

#### Flow Sequence
```
1. Entry: SCR-001 Login / Default
   - Trigger: App launch
   |
   v
2. Action: Nurse enters username and password
   - System enables Login button on valid input
   |
   v
3. Decision Point:
   +-- Valid credentials -> SCR-002 Hospital Selection / Default
   +-- Invalid credentials -> SCR-001 Login / Error ("Invalid username or password")
   +-- Network error -> SCR-001 Login / Error ("Unable to connect")
```

#### Required Interactions
- Username field: text input, no autocomplete for security
- Password field: masked input with show/hide toggle
- Login button: disabled until both fields have content; primary blue on enabled

---

### Flow: FL-002 - Hospital Selection and Patient Dashboard
**Flow ID**: FL-002
**Derived From**: UC-002
**Personas Covered**: Nurse
**Description**: Nurse selects hospital context and views patient list.

#### Flow Sequence
```
1. Entry: SCR-002 Hospital Selection / Default
   - Trigger: Successful login redirect
   |
   v
2. Optional: Nurse types in search bar
   - System filters list in real-time (UXR-101)
   |
   v
3. Action: Nurse taps hospital name
   |
   v
4. SCR-003 Patient Dashboard / Default
   - Hospital name shown in header
   - My Patients tab default active
   - Active/Completed patient sections visible
```

#### Required Interactions
- Alphabetical section index on right edge for fast scroll
- User menu (tap nurse name) → Hospital Selection + Logout options
- Tab toggle: My Patients / All Patients

---

### Flow: FL-003 - New Patient Entry via Recall Search
**Flow ID**: FL-003
**Derived From**: UC-003
**Personas Covered**: Nurse
**Description**: Nurse initiates patient recall search, either finds existing patient or creates new.

#### Flow Sequence
```
1. Entry: SCR-003 Patient Dashboard / Default
   - Trigger: Tap "Add New" button
   |
   v
2. SCR-005 Treatment Type Selection / Default
   - Nurse selects Hemodialysis
   |
   v
3. SCR-004 Patient Recall Search / Default
   - MRN field mandatory; Search disabled until MRN + 1 field entered
   |
   v
4. Action: Nurse enters fields and taps Search
   - SCR-004 / Loading (branded progress overlay)
   |
   v
5. Decision Point:
   +-- Patient found -> SCR-006 Patient Details Form / Default (prefilled)
   +-- No match -> SCR-004 / Empty ("No matching patients found")
       +-- Tap "Create New Treatment" -> SCR-006 / Default (empty form)
   +-- Multiple matches -> SCR-004 / Results (list; nurse selects one)
       -> SCR-006 / Default (prefilled)
```

#### Required Interactions
- Search button: disabled state until gate condition met (UXR-102)
- Cancel: dismisses modal; returns to SCR-003
- Loading overlay: branded PATH Lite logo + progress bar + Cancel option

---

### Flow: FL-004 - AI-Driven Patient Data Entry
**Flow ID**: FL-004
**Derived From**: UC-004
**Personas Covered**: Nurse
**Description**: Nurse completes patient data entry through voice conversational interface.

#### Flow Sequence
```
1. Entry: SCR-006 Patient Details Form / Default
   - Trigger: Treatment form opened (new or prefilled)
   - AI voice activates automatically; TTS asks first question
   |
   v
2. AI Active State: AIVoiceIcon → listening state
   - TTS: "Please provide Medical Record Number"
   - Nurse responds via voice
   |
   v
3. STT → LLM → Validation pipeline
   - Field populated with validated value
   - Next question triggered automatically
   |
   v
4. Decision Points per field:
   +-- Valid response -> Next field question
   +-- Invalid format -> TTS error + re-ask same field
   +-- Clarification request -> TTS rephrases question + re-ask
   +-- No response (3 retries) -> AI session auto-closes; SCR-006 / Session Closed notification
   +-- App interrupted -> Partial save; SCR-010 Session Resume Prompt on reopen
   |
   v
5. All mandatory fields complete:
   - Left nav highlights "Review and Submit"
   - TTS: completion announcement
   - -> SCR-009 Review and Submit / Default
```

#### Required Interactions
- AIVoiceIcon: tap to toggle AI mode on/off; clear three-state visual (UXR-003)
- Left nav: active section highlighted as nurse progresses (UXR-504)
- Field population: visual confirmation before AI moves to next field (UXR-205)

---

### Flow: FL-005 - Form Review and Error Correction
**Flow ID**: FL-005
**Derived From**: UC-005
**Personas Covered**: Nurse
**Description**: AI-guided review validates all fields and corrects errors.

#### Flow Sequence
```
1. Entry: SCR-009 Review and Submit / Default
   - Trigger: Nurse says "Please review the form" or taps Review
   |
   v
2. System runs full validation (schema + data type + regex + required fields)
   |
   v
3. Decision Point:
   +-- No errors -> TTS: "All fields are valid. Do you want to submit?"
       -> Submit button enabled
   +-- Errors found -> TTS: error summary with section + field details
       -> SCR-007 Patient Details Edit Mode / Validation Error
       |
       v
4. Auto-navigate to first error field (UXR-108)
   - Field highlighted with amber warning icon (UXR-404)
   - TTS re-asks question for erroneous field
   |
   v
5. Nurse provides corrected response
   - STT → LLM → validation pipeline
   |
   v
6. Decision Point:
   +-- Corrected value valid -> next error field or return to Review
   +-- Still invalid -> TTS specific error + re-ask
   |
   v
7. All errors corrected -> SCR-009 Review and Submit
   - Validation runs again; if pass -> Submit enabled
```

#### Required Interactions
- Edit mode header: Cancel / Confirm Change actions
- Inline error: amber warning icon + error message below field (UXR-601)
- Review button: always enabled when form has content (FR-058)

---

### Flow: FL-006 - Report Generation and Final Submission
**Flow ID**: FL-006
**Derived From**: UC-006
**Personas Covered**: Nurse
**Description**: Nurse views generated report and submits final patient data.

#### Flow Sequence
```
1. Entry: SCR-009 Review and Submit / Default
   - Trigger: Validation passed; Continue button enabled
   - Warning alert: "Please ensure the treatment report is reviewed..."
   |
   v
2. Nurse taps View Report
   - SCR-008 Treatment Report Preview / Default
   - Full DaVita HD Billing Report displayed
   |
   v
3. Nurse reviews report
   - Optional: tap Full Screen for expanded view
   |
   v
4. Nurse returns to SCR-009 or taps Submit directly
   |
   v
5. Submit Confirmation Dialog:
   "You are submitting a treatment for [Patient Name] at [Hospital]. Do you want to proceed?"
   |
   v
6. Decision Point:
   +-- Nurse taps No -> Dialog dismissed; remains on SCR-009
   +-- Nurse taps Yes -> Submission Progress Overlay (SCR-009 Loading)
       -> Progress bar 0→100%
       -> SCR-003 Patient Dashboard (status updated to "Submitted")
   +-- Network error -> Error dialog; data retained; retry prompt
```

#### Required Interactions
- Warning alert: amber/orange warning icon with non-dismissable text (UXR-404)
- Submit confirmation: modal dialog with patient name + hospital name for context
- Progress overlay: branded PATH Lite logo + "Submitting this treatment - Please wait" + %

---

### Flow: FL-007 - Session Resume After Interruption
**Flow ID**: FL-007
**Derived From**: UC-007
**Personas Covered**: Nurse
**Description**: Nurse resumes incomplete data entry session from point of interruption.

#### Flow Sequence
```
1. Entry: SCR-003 Patient Dashboard / Default
   - Trigger: Nurse taps patient with incomplete session
   |
   v
2. SCR-010 Session Resume Prompt / Default
   - "You have an incomplete session. Would you like to resume?"
   |
   v
3. Decision Point:
   +-- Resume -> SCR-006 Patient Details Form / AI Active
       - Loads partial data; AI asks from first unanswered field
   +-- Start Over -> SCR-006 / Default (empty or prefilled with recall data only)
   +-- Session expired (>24h) -> "Session expired. Starting new entry." -> SCR-006 / Default
```

#### Required Interactions
- Session Resume modal: non-dismissable (must choose Resume or Start Over)
- Partial data: all previously answered fields rendered with saved values

---

## 12. Export Requirements

### JPG Export Settings
| Setting | Value |
|---------|-------|
| Format | JPG |
| Quality | High (85%) |
| Scale - Tablet (7-inch) | 2x |
| Scale - Tablet (12.9-inch) | 2x |
| Color Profile | sRGB |
| Orientation | Portrait + Landscape per screen |

### Export Naming Convention
`PathLite__Tablet__<ScreenName>__<State>__v1.jpg`

### Export Manifest
| Screen | State | Filename |
|--------|-------|----------|
| SCR-001 Login | Default | PathLite__Tablet__Login__Default__v1.jpg |
| SCR-001 Login | Error | PathLite__Tablet__Login__Error__v1.jpg |
| SCR-002 Hospital Selection | Default | PathLite__Tablet__HospitalSelection__Default__v1.jpg |
| SCR-002 Hospital Selection | Search Active | PathLite__Tablet__HospitalSelection__SearchActive__v1.jpg |
| SCR-003 Patient Dashboard | Default | PathLite__Tablet__PatientDashboard__Default__v1.jpg |
| SCR-003 Patient Dashboard | Empty | PathLite__Tablet__PatientDashboard__Empty__v1.jpg |
| SCR-003 Patient Dashboard | Error (Offline) | PathLite__Tablet__PatientDashboard__ErrorOffline__v1.jpg |
| SCR-004 Patient Recall Search | Default | PathLite__Tablet__RecallSearch__Default__v1.jpg |
| SCR-004 Patient Recall Search | Loading | PathLite__Tablet__RecallSearch__Loading__v1.jpg |
| SCR-004 Patient Recall Search | Empty | PathLite__Tablet__RecallSearch__Empty__v1.jpg |
| SCR-004 Patient Recall Search | Results | PathLite__Tablet__RecallSearch__Results__v1.jpg |
| SCR-006 Patient Details Form | Default (empty) | PathLite__Tablet__PatientDetailsForm__Default__v1.jpg |
| SCR-006 Patient Details Form | Populated | PathLite__Tablet__PatientDetailsForm__Populated__v1.jpg |
| SCR-006 Patient Details Form | AI Listening | PathLite__Tablet__PatientDetailsForm__AIListening__v1.jpg |
| SCR-007 Patient Details Edit Mode | Validation Error | PathLite__Tablet__PatientDetailsEdit__ValidationError__v1.jpg |
| SCR-008 Treatment Report Preview | Default | PathLite__Tablet__TreatmentReport__Default__v1.jpg |
| SCR-009 Review and Submit | Default | PathLite__Tablet__ReviewSubmit__Default__v1.jpg |
| SCR-009 Review and Submit | Submit Confirm Dialog | PathLite__Tablet__ReviewSubmit__SubmitDialog__v1.jpg |
| SCR-009 Review and Submit | Submission Loading | PathLite__Tablet__ReviewSubmit__SubmissionLoading__v1.jpg |

### Total Export Count
- **Screens**: 15 (including sub-screens and states)
- **States per screen**: 2-5 depending on screen complexity
- **Total JPGs**: 19 (minimum; expand with landscape variants for each)

---

## 13. Figma File Structure

### Page Organization
```
PATH Lite Figma File
+-- 00_Cover
|   +-- Project info: PATH Lite v1.0, Phase 1 Prototype
|   +-- Platform: iOS & Android Tablet (7-12.9 inch)
|   +-- Primary color: #1566A7
+-- 01_Foundations
|   +-- Color tokens (Primary Blue, Greys, Status Colors, Error/Warning)
|   +-- Typography scale (SF Pro / Roboto)
|   +-- Spacing scale (8pt base grid)
|   +-- Radius tokens (8px cards, 4px inputs)
|   +-- Elevation/shadows
|   +-- Grid: 12-column, 16px margins, tablet breakpoints (600dp, 768dp, 1024dp, 1366dp)
+-- 02_Components
|   +-- C/Actions/[Button (Primary, Secondary, Ghost), IconButton, Link]
|   +-- C/Inputs/[TextField, DateField, SelectField, Toggle, SearchBar]
|   +-- C/Navigation/[Header, LeftNavPanel, Tabs, SectionIndexList, BreadcrumbBack]
|   +-- C/Content/[PatientCard, StatusBadge, ListRow, FormSection, HistoryList, ReportViewer]
|   +-- C/Feedback/[Modal, Dialog, ActionSheet, ProgressOverlay, InlineError, Popover, AIVoiceIcon]
|   +-- C/Branding/[PathLiteLogo, DaVitaWordmark, SnowflakeIcon]
+-- 03_Patterns
|   +-- Auth form pattern (SCR-001)
|   +-- Split-panel form pattern (SCR-006, 007, 008, 009)
|   +-- Search + list pattern (SCR-002, SCR-003, SCR-004)
|   +-- Drill-down picker pattern (SCR-006a, 006b, 006c)
|   +-- Error/Empty/Loading overlay patterns
+-- 04_Screens
|   +-- SCR-001/Default, SCR-001/Error
|   +-- SCR-002/Default, SCR-002/SearchActive, SCR-002/UserMenuOpen
|   +-- SCR-003/Default, SCR-003/Empty, SCR-003/ContextMenuOpen, SCR-003/ErrorOffline
|   +-- SCR-004/Default, SCR-004/Loading, SCR-004/Empty, SCR-004/Results
|   +-- SCR-005/Default (dropdown overlay)
|   +-- SCR-006/Default, SCR-006/Populated, SCR-006/AIListening, SCR-006/ChangeHospitalDialog, SCR-006/HepBHistory
|   +-- SCR-006a/Default, SCR-006b/Default, SCR-006c/Default
|   +-- SCR-007/Default, SCR-007/ValidationError, SCR-007/ConfirmChangeDialog
|   +-- SCR-008/Default, SCR-008/FullScreen
|   +-- SCR-009/Default, SCR-009/SubmitDialog, SCR-009/SubmissionLoading
|   +-- SCR-010/Default (session resume modal)
|   +-- SCR-011/Default, SCR-011/ConfirmChange
+-- 05_Prototype
|   +-- FL-001: Authentication Flow
|   +-- FL-002: Hospital Selection & Patient Dashboard Flow
|   +-- FL-003: New Patient Entry via Recall Search Flow
|   +-- FL-004: AI-Driven Patient Data Entry Flow
|   +-- FL-005: Form Review and Error Correction Flow
|   +-- FL-006: Report Generation and Final Submission Flow
|   +-- FL-007: Session Resume After Interruption Flow
+-- 06_Handoff
    +-- Token usage rules
    +-- Component guidelines
    +-- Responsive specs (7-inch portrait, 12.9-inch landscape)
    +-- Edge cases documentation
    +-- Accessibility notes (WCAG 2.2 AA, 44pt targets)
```

---

## 14. Quality Checklist

### Pre-Export Validation
- [ ] All screens have required states (Default/Loading/Empty/Error/Validation)
- [ ] All components use design tokens (no hard-coded values)
- [ ] Color contrast meets WCAG AA (≥4.5:1 text, ≥3:1 UI components) per UXR-201
- [ ] Focus states defined for all interactive elements
- [ ] Touch targets ≥ 44×44pt (tablet) per UXR-202
- [ ] Prototype flows FL-001 through FL-007 wired and functional
- [ ] Naming conventions followed (`PathLite__Tablet__<Screen>__<State>__v1.jpg`)
- [ ] Export manifest complete (19 minimum exports)
- [ ] AIVoiceIcon three-state design verified (inactive/active/listening)
- [ ] Mandatory field asterisks on all 9 required fields per FR-038
- [ ] StatusBadge five variants designed and labeled

### Post-Generation
- [ ] designsystem.md updated with Figma references and token definitions
- [ ] Export manifest generated
- [ ] JPG files named correctly per convention
- [ ] Handoff documentation complete
- [ ] Screenshot-to-screen mapping verified against 34 reference screenshots
