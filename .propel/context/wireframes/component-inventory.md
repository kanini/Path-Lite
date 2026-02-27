# Component Inventory - PATH Lite

## Component Specification

**Fidelity Level**: High
**Screen Type**: Tablet (iOS & Android, 7–12.9 inch)
**Viewport**: 768px × 1024px (portrait baseline)

---

## Component Summary

| Component Name | Type | Screens Used | Priority | Implementation Status |
|---|---|---|---|---|
| PathLiteLogo | Branding | SCR-001, Loading overlays | High | Pending |
| Header | Layout/Navigation | SCR-002, SCR-003, SCR-006, SCR-007, SCR-008, SCR-009, SCR-011 | High | Pending |
| LeftNavPanel | Navigation | SCR-006, SCR-007, SCR-008, SCR-009 | High | Pending |
| PatientSummaryCard | Content | SCR-006, SCR-007, SCR-008, SCR-009 | High | Pending |
| TextField | Interactive/Input | SCR-001, SCR-004, SCR-006, SCR-007 | High | Pending |
| SearchBar | Interactive/Input | SCR-002, SCR-003, SCR-004, SCR-011 | High | Pending |
| Button | Interactive | All screens | High | Pending |
| StatusBadge | Content | SCR-003 | High | Pending |
| PatientCard | Content | SCR-003 | High | Pending |
| Modal | Feedback | SCR-004, SCR-010 | High | Pending |
| Dialog | Feedback | SCR-003, SCR-006, SCR-009 | High | Pending |
| SelectField | Interactive/Input | SCR-006, SCR-007 | High | Pending |
| Toggle | Interactive/Input | SCR-006, SCR-007 | High | Pending |
| FormSection | Layout | SCR-006, SCR-007 | High | Pending |
| AIVoiceIcon | Feedback/Interactive | SCR-006 | High | Pending |
| ProgressOverlay | Feedback | SCR-004, SCR-009 | High | Pending |
| InlineError | Feedback | SCR-007 | High | Pending |
| WarningAlert | Feedback | SCR-009 | High | Pending |
| HepBHistoryPopover | Feedback | SCR-006 | Medium | Pending |
| Tabs | Navigation | SCR-003 | High | Pending |
| ContextMenu | Interactive | SCR-003 | High | Pending |
| ActionSheet | Feedback | SCR-003, SCR-005 | High | Pending |
| ReportViewer | Content | SCR-008 | High | Pending |
| SectionList | Layout | SCR-002, SCR-003 | High | Pending |
| RadioList | Interactive | SCR-006a, SCR-006b, SCR-006c, SCR-011 | High | Pending |

---

## Detailed Component Specifications

### Layout Components

#### Header (Navigation Bar)
- **Type**: Layout/Navigation
- **Used In Screens**: SCR-002, SCR-003, SCR-006, SCR-007, SCR-008, SCR-009, SCR-011
- **Wireframe References**: All Hi-Fi wireframe files
- **Description**: Fixed top navigation bar with three zones — left (nurse name tappable, user menu), center (screen title), right (primary action or back)
- **Variants**:
  - Default: Nurse name left / Title center / Add New right (SCR-003)
  - Form View: Done left / Title center / Save right (SCR-006)
  - Edit Mode: Cancel left / Title center / Confirm Change right (SCR-007)
  - Report: Back arrow + "Treatment Report" left / Title center / Full Screen right (SCR-008)
  - Review: Done left / Title center / — right (SCR-009)
- **Interactive States**: Default; User menu open (dropdown visible); Back button press
- **Responsive Behavior**:
  - Tablet portrait (768px): Full three-zone layout; height 56px
  - Tablet landscape (1024px+): Same; hospital name may truncate with ellipsis
- **Implementation Notes**: Bottom shadow `0px 2px 4px rgba(0,0,0,0.08)`; background #FFFFFF; title uses heading_lg (20px/600); nurse name tappable — opens UserMenuDropdown

#### FormSection
- **Type**: Layout
- **Used In Screens**: SCR-006, SCR-007
- **Wireframe References**: wireframe-SCR-006-patient-details-form.html, wireframe-SCR-007-patient-details-edit.html
- **Description**: Grouped container for related form fields with a labeled section header
- **Variants**: Demographics & Admission; Clinical Intake
- **Interactive States**: Default; Scroll (when content exceeds viewport)
- **Responsive Behavior**:
  - Tablet portrait: Full width of right content panel; 16px padding
  - Tablet landscape: Same; more fields visible without scroll
- **Implementation Notes**: Background #FFFFFF; shadow `0px 1px 4px rgba(0,0,0,0.12)`; radius 8px; padding 16px; field gap 12px; section gap 20px; header uses heading_md (17px/600), neutral_700, border-bottom 1px #C4C4C4

#### SplitPanel
- **Type**: Layout
- **Used In Screens**: SCR-006, SCR-007, SCR-008, SCR-009
- **Wireframe References**: wireframe-SCR-006-patient-details-form.html, wireframe-SCR-007-patient-details-edit.html, wireframe-SCR-008-treatment-report.html, wireframe-SCR-009-review-submit.html
- **Description**: Two-panel layout: fixed-width LeftNavPanel (200–240px) + flexible main content area
- **Variants**: Portrait (200px left); Landscape (240px left)
- **Responsive Behavior**:
  - < 768dp: Single panel; LeftNavPanel collapsible
  - ≥ 768dp: Persistent split-panel
  - ≥ 1366dp: LeftNavPanel expands to 240px (landscape 12.9-inch)

---

### Navigation Components

#### LeftNavPanel
- **Type**: Navigation
- **Used In Screens**: SCR-006, SCR-007, SCR-008, SCR-009
- **Wireframe References**: wireframe-SCR-006-patient-details-form.html, wireframe-SCR-007-patient-details-edit.html, wireframe-SCR-008-treatment-report.html, wireframe-SCR-009-review-submit.html
- **Description**: Persistent left sidebar showing hospital context, treatment type, patient summary, and HD Billing section navigation
- **Variants**: Default (view mode); Edit mode (warning icons on error sections)
- **Interactive States**: Nav item default; Nav item active (blue highlight + left border); Nav item with validation warning (⚠ amber icon)
- **Responsive Behavior**:
  - 7-inch portrait (600dp): Collapsible — slide-out or hamburger trigger
  - ≥ 768dp: Persistent; 200px width
  - 12.9-inch landscape (1366dp): 240px width
- **Implementation Notes**: Background #F5F5F5; hospital name heading_md/neutral_900; active item — background #E8F1F9, text #1566A7, left border 3px #1566A7; nav items 44px tap target; HD Billing section items: Patient Details, Primary Care Nurse Report (Pre and Post), Order, Wait Time (Pre and Post), Treatment, ACOI Questions, Cancel Billing, Review and Submit

#### Tabs
- **Type**: Navigation
- **Used In Screens**: SCR-003
- **Wireframe References**: wireframe-SCR-003-patient-dashboard.html
- **Description**: Segmented tab control for My Patients / All Patients toggle
- **Variants**: My Patients active; All Patients active
- **Interactive States**: Active tab (underline #1566A7, bold text); Inactive tab (neutral_700)
- **Responsive Behavior**: Full width of screen below search bar; 44px height
- **Implementation Notes**: Height 44px; active indicator 2px #1566A7 underline; label_md typography

#### SectionIndexList
- **Type**: Navigation
- **Used In Screens**: SCR-002, SCR-011
- **Wireframe References**: wireframe-SCR-002-hospital-selection.html
- **Description**: Right-edge alphabetical fast-scroll index
- **Variants**: Default; Letter active (tapped)
- **Interactive States**: Letter tap scrolls list to that alphabetical section
- **Responsive Behavior**: Right edge of screen; 12px letter height; visible on tablet only

---

### Content Components

#### PatientCard
- **Type**: Content
- **Used In Screens**: SCR-003
- **Wireframe References**: wireframe-SCR-003-patient-dashboard.html
- **Description**: List row displaying patient information with status badge and three-dot context menu
- **Variants**: Active section row; Completed section row
- **Interactive States**: Default; Tap (opens patient form or context menu)
- **Layout**: Patient name (bold, body_lg) → MRN + treatment type → created date / tx start date → nurse name | StatusBadge right-aligned | Three-dot menu far right
- **Responsive Behavior**: Min height 72px; full screen width; divider between rows
- **Implementation Notes**: Divider 1px #C4C4C4; three-dot menu 44×44pt tap target; truncate long names with ellipsis

#### PatientSummaryCard
- **Type**: Content
- **Used In Screens**: SCR-006, SCR-007, SCR-008, SCR-009 (within LeftNavPanel)
- **Wireframe References**: wireframe-SCR-006-patient-details-form.html
- **Description**: Compact patient context display in left panel: name, gender/age, DOB, MRN, HBsAg, HBsAb
- **Variants**: Empty (new patient, minimal data); Populated (recalled patient)
- **Implementation Notes**: Patient name heading_md/neutral_900; gender+age body_sm/neutral_700; DOB+MRN body_sm/neutral_500; HBsAg/HBsAb body_sm; padding 12px; separator line below

#### StatusBadge
- **Type**: Content
- **Used In Screens**: SCR-003
- **Wireframe References**: wireframe-SCR-003-patient-dashboard.html
- **Description**: Pill-shaped status indicator showing treatment workflow stage
- **Variants**:
  - Not Started: text #757575 / bg #EEEEEE
  - Tx In Progress: text #1566A7 / bg #E8F1F9
  - Received: text #388E3C / bg #E8F5E9
  - Submitted: text #0E4F87 / bg #D0E4F5
  - Submitted (Amended): text #E65100 / bg #FBE9E7
- **Implementation Notes**: body_sm weight 500; padding 4px 8px; radius 999px (pill)

#### ListRow (Hospital)
- **Type**: Content
- **Used In Screens**: SCR-002, SCR-011
- **Wireframe References**: wireframe-SCR-002-hospital-selection.html
- **Description**: Hospital name (bold, body_lg) + address (body_md, neutral_500) in a single row
- **Variants**: Default; Selected (checkmark, SCR-011 only)
- **Interactive States**: Default; Pressed; Selected
- **Implementation Notes**: Min height 52px; horizontal padding 16px; divider 1px neutral_300

#### ReportViewer
- **Type**: Content
- **Used In Screens**: SCR-008
- **Wireframe References**: wireframe-SCR-008-treatment-report.html
- **Description**: Rendered DaVita HD Billing Report in document-viewer format; DaVita wordmark top-right; full width of right panel
- **Variants**: Default (scrollable); Full Screen (modal)
- **Implementation Notes**: Report title "HD Billing Report [date/time]"; sections: Patient Info, For Billing Purpose Only, Wait Times, HD Treatment Type, Additional Services, Initials, Compliance Footer; DaVita wordmark top-right of report

---

### Interactive Components

#### Button
- **Type**: Interactive
- **Used In Screens**: All screens
- **Wireframe References**: All Hi-Fi wireframe files
- **Description**: Standard action button used for primary, secondary, destructive, and ghost actions
- **Variants**:
  - Primary: bg #1566A7, text #FFFFFF — Login, Search, Submit, Confirm Change
  - Secondary: bg #FFFFFF, border 1.5px #1566A7, text #1566A7 — Cancel, View Report
  - Destructive: bg #D32F2F, text #FFFFFF — destructive/delete actions
  - Ghost: transparent, text #1566A7 — Need Help?, Clear, inline actions
  - Disabled: bg #EEEEEE, text #9E9E9E — Search before gate condition met
- **Interactive States**: Default; Pressed (darken 10%); Disabled; Loading (spinner)
- **Responsive Behavior**: Height 48px (standard), 36px (ghost/inline); full width in modals; auto width in headers
- **Implementation Notes**: Min tap target 44×44pt; radius 8px; label button_label (16px/600)

#### TextField
- **Type**: Interactive/Input
- **Used In Screens**: SCR-001, SCR-004, SCR-006, SCR-007
- **Wireframe References**: wireframe-SCR-001-login.html, wireframe-SCR-004-recall-search.html, wireframe-SCR-006-patient-details-form.html, wireframe-SCR-007-patient-details-edit.html
- **Description**: Standard text input with floating label; supports text, password, and date format hints
- **Variants**: Username, Password (masked + show/hide), MRN (numeric hint), DOB (date format), Name fields, Room Number
- **Interactive States**: Default (border #C4C4C4); Focused (border 2px #1566A7, label floats blue); Filled (label floated, border #C4C4C4); Error (border 2px #D32F2F, label red); Disabled (bg #F5F5F5)
- **Responsive Behavior**: Full width of container; height 52px; horizontal padding 12px
- **Implementation Notes**: Floating label animates up on focus/fill; mandatory fields show asterisk (*); placeholder format hints in brackets: `[Enter]`, `[mm/dd/yyyy]`; radius 4px

#### SelectField (Drill-down Picker)
- **Type**: Interactive/Input
- **Used In Screens**: SCR-006, SCR-007
- **Wireframe References**: wireframe-SCR-006-patient-details-form.html, wireframe-SCR-007-patient-details-edit.html
- **Description**: Read-only TextField-style row that navigates to full-screen picker on tap; chevron (›) right-aligned
- **Variants**: Treatment Location, HBsAg, HBsAb, Source (HBsAg), Source (HBsAb)
- **Interactive States**: Default (unselected, placeholder italic neutral_500); Filled (value body_lg neutral_900); Error (border red)
- **Implementation Notes**: Row height 52px; right chevron 16px neutral_500; opens SCR-006a/b/c full-screen picker; selected item shows checkmark ✓ in #1566A7

#### Toggle (Gender)
- **Type**: Interactive/Input
- **Used In Screens**: SCR-006, SCR-007
- **Wireframe References**: wireframe-SCR-006-patient-details-form.html, wireframe-SCR-007-patient-details-edit.html
- **Description**: Segmented pill control for Male / Female binary selection
- **Variants**: Male selected; Female selected; Unselected (neither)
- **Interactive States**: Selected segment (bg #1566A7, text #FFFFFF); Unselected (bg #FFFFFF, text #1566A7); Container border 1px #1566A7
- **Implementation Notes**: Height 36px; radius 999px; full pill border; one-tap selection (UXR-106)

#### SearchBar
- **Type**: Interactive/Input
- **Used In Screens**: SCR-002, SCR-003, SCR-004, SCR-011
- **Wireframe References**: wireframe-SCR-002-hospital-selection.html, wireframe-SCR-003-patient-dashboard.html, wireframe-SCR-004-recall-search.html
- **Description**: Inline search field with search icon left, clear button right, real-time filtering
- **Variants**: Default; Active/focused; Filled (with text + clear button); Empty result
- **Interactive States**: Default (border #C4C4C4); Focused (border 2px #1566A7); Filled (clear ✕ visible)
- **Implementation Notes**: Height 44px; bg neutral_100 (#F5F5F5); radius 8px; search icon 18px neutral_500; placeholder label_md neutral_500; real-time filter on keystroke (min 1 char per UXR-101)

#### RadioList
- **Type**: Interactive
- **Used In Screens**: SCR-006a, SCR-006b, SCR-006c, SCR-011
- **Description**: Full-screen selectable list with radio buttons; selected item shows ✓ in #1566A7
- **Variants**: Single selection; with current checkmark
- **Interactive States**: Unselected; Selected (checkmark blue); Pressed
- **Implementation Notes**: Row height 52px; tap selects and navigates back; checkmark right-aligned

#### ContextMenu (Three-dot)
- **Type**: Interactive
- **Used In Screens**: SCR-003
- **Wireframe References**: wireframe-SCR-003-patient-dashboard.html
- **Description**: Per-row three-dot (⋮) trigger revealing action options for patient record
- **Variants**: Active patient options: Hemodialysis; Submitted patient options: Amend
- **Interactive States**: Closed; Open (dropdown visible)
- **Implementation Notes**: Tap target 44×44pt; dropdown appears below trigger; dismiss on outside tap

---

### Feedback Components

#### AIVoiceIcon
- **Type**: Feedback/Interactive
- **Used In Screens**: SCR-006
- **Wireframe References**: wireframe-SCR-006-patient-details-form.html
- **Description**: Prominent voice mode control with three distinct visual states for AI conversational interface
- **Variants**:
  - Inactive: Snowflake/mic icon, neutral_500, static — AI voice off
  - Active: Snowflake/mic icon, #1566A7, static with blue ring — AI on, waiting
  - Listening: Animated waveform or pulsing ring, #1566A7 — STT capturing voice
- **Interactive States**: Tap to toggle inactive ↔ active; auto-transitions to listening when STT starts
- **Implementation Notes**: Size 48×48pt minimum; position prominent in form header area; state change ≤ 200ms (UXR-501); aria-label announces state; pulsing animation for listening state

#### Modal
- **Type**: Feedback
- **Used In Screens**: SCR-004, SCR-010
- **Wireframe References**: wireframe-SCR-004-recall-search.html
- **Description**: Centered overlay with scrim; used for Patient Recall Search and Session Resume Prompt
- **Variants**: Recall Search (large, form content); Session Resume (small, confirmation text)
- **Interactive States**: Open; Closed
- **Implementation Notes**: Backdrop rgba(0,0,0,0.5); container #FFFFFF, radius 12px, shadow `0px 8px 24px rgba(0,0,0,0.2)`; width 90% max 480px; padding 24px; non-dismissable for Session Resume (must choose); aria-modal="true"

#### Dialog (Confirmation)
- **Type**: Feedback
- **Used In Screens**: SCR-003, SCR-006, SCR-009
- **Wireframe References**: wireframe-SCR-003-patient-dashboard.html, wireframe-SCR-009-review-submit.html
- **Description**: Lightweight confirmation dialog; title + body + two side-by-side action buttons
- **Variants**: Submit Confirmation; Change Hospital; Treatment Reuse Warning; Not Connected Error
- **Interactive States**: Open; Button hover; Dismissed
- **Implementation Notes**: Width 70% max 400px; radius 12px; title heading_md center; body body_md center; buttons side-by-side: No/Cancel (Secondary) + Yes/Ok (Primary)

#### ProgressOverlay (Branded Loading)
- **Type**: Feedback
- **Used In Screens**: SCR-004, SCR-009
- **Wireframe References**: wireframe-SCR-004-recall-search.html, wireframe-SCR-009-review-submit.html
- **Description**: Full-screen near-opaque overlay with PATH Lite branding, progress bar, status message
- **Variants**: Patient Recall Loading ("PATH is retrieving data for matching patient" + Cancel); Submission Loading ("Submitting this treatment - Please wait" — no cancel)
- **Interactive States**: Open with progress incrementing; Dismissed on 100%
- **Implementation Notes**: Background rgba(255,255,255,0.95); logo centered; message body_lg neutral_700; progress bar #1566A7 fill on #C4C4C4 track, 4px height 60% width max; percentage body_sm below bar

#### InlineError
- **Type**: Feedback
- **Used In Screens**: SCR-007
- **Wireframe References**: wireframe-SCR-007-patient-details-edit.html
- **Description**: Inline validation message displayed below invalid field with amber warning icon
- **Variants**: Warning (date range, format — amber); Error (required field — red)
- **Implementation Notes**: Icon ⚠ 14px #F57C00; text body_sm #D32F2F or #F57C00; 4px gap below field; layout horizontal icon + text; example: "Date must be between 02/24/2025 - 02/26/2026"

#### WarningAlert
- **Type**: Feedback
- **Used In Screens**: SCR-009
- **Wireframe References**: wireframe-SCR-009-review-submit.html
- **Description**: Non-dismissable amber warning banner for critical submission notice
- **Variants**: Submission warning (review and submit screen only)
- **Implementation Notes**: Background #FFF3E0; border-left 4px #F57C00; icon ⚠ 20px #F57C00; text body_md neutral_900; padding 12px 16px; radius 4px; message: "Please ensure the treatment report is reviewed, complete and correct before submitting. Once the treatment has been submitted, changes cannot be made."

#### HepBHistoryPopover
- **Type**: Feedback
- **Used In Screens**: SCR-006
- **Wireframe References**: wireframe-SCR-006-patient-details-form.html
- **Description**: Scrollable popover triggered by history icon beside HBsAg/HBsAb fields; shows date-sorted change history
- **Variants**: HBsAg history; HBsAb history
- **Implementation Notes**: Width 260px; bg #FFFFFF; shadow `0px 4px 12px rgba(0,0,0,0.15)`; radius 8px; title heading_md; entry row: date body_sm/neutral_700 + value body_md/neutral_900 + nurse name body_sm/neutral_500; max height 200px with scroll; sorted date descending

#### ActionSheet
- **Type**: Feedback
- **Used In Screens**: SCR-003, SCR-005
- **Wireframe References**: wireframe-SCR-003-patient-dashboard.html
- **Description**: Bottom sheet for treatment type selection and amend reason picker
- **Variants**: Treatment Type (Hemodialysis, CRRT, Apheresis, Peritoneal Dialysis, Non-Treatment Services); Amend Reason (Entered in Error / Omitted in Error)
- **Implementation Notes**: Slides from bottom; radius 12px top corners; option rows 52px height; Cancel at bottom

---

## Component Relationships

```
SplitPanel
+-- LeftNavPanel
|   +-- Hospital Name (heading_md)
|   +-- Treatment Type Label
|   +-- PatientSummaryCard
|   |   +-- Patient Name
|   |   +-- Gender + Age
|   |   +-- DOB + MRN
|   |   +-- HBsAg / HBsAb status
|   +-- SectionGroupHeader ("HD Billing")
|   +-- NavItems (8 items)
|       +-- [Active] PatientDetails
|       +-- Primary Care Nurse Report
|       +-- Order / Wait Time / Treatment
|       +-- ACOI Questions / Cancel Billing
|       +-- Review and Submit
+-- MainContentPanel
    +-- FormSection (Demographics & Admission)
    |   +-- TextField (MRN*, First Name*, Middle, Last Name*, DOB*, Admission#, Room#)
    |   +-- Toggle (Gender*)
    |   +-- SelectField (Treatment Location*)
    +-- FormSection (Clinical Intake)
        +-- Link (Import Hep B from CWOW)
        +-- SelectField (HBsAg*) + HistoryIcon
        +-- TextField (Date Drawn)
        +-- SelectField (Source)
        +-- SelectField (HBsAb*) + HistoryIcon
        +-- TextField (Date Drawn)
        +-- SelectField (Source)
        +-- ReadOnlyField (DaVita MPI)
```

---

## Component States Matrix

| Component | Default | Pressed/Hover | Active/Focused | Disabled | Error | Loading | Empty |
|---|---|---|---|---|---|---|---|
| Button (Primary) | x | x | x | x | — | x | — |
| Button (Secondary) | x | x | x | x | — | — | — |
| TextField | x | — | x | x | x | — | x |
| SelectField | x | x | x | — | x | — | x |
| Toggle (Gender) | x | x | x | — | — | — | — |
| SearchBar | x | — | x | — | — | — | x |
| StatusBadge | x | — | — | — | — | — | — |
| PatientCard | x | x | — | — | — | x | — |
| Modal | x | — | — | — | — | — | — |
| Dialog | x | x | — | — | — | — | — |
| AIVoiceIcon | x (inactive) | — | x (active) | — | — | x (listening) | — |
| ProgressOverlay | — | — | — | — | — | x | — |
| InlineError | — | — | — | — | x | — | — |
| LeftNavPanel item | x | x | x (active) | — | x (warning) | — | — |

---

## Reusability Analysis

| Component | Reuse Count | Screens | Recommendation |
|---|---|---|---|
| Header | 7 screens | SCR-002, 003, 006, 007, 008, 009, 011 | Shared component with variant props |
| TextField | 4 screens | SCR-001, 004, 006, 007 | Shared component with floating label |
| Button | All screens | SCR-001–009, 011 | Shared component; Primary/Secondary/Ghost/Disabled variants |
| LeftNavPanel | 4 screens | SCR-006, 007, 008, 009 | Shared component with active state prop |
| PatientSummaryCard | 4 screens | SCR-006, 007, 008, 009 (inside LeftNavPanel) | Sub-component of LeftNavPanel |
| SearchBar | 4 screens | SCR-002, 003, 004, 011 | Shared component |
| FormSection | 2 screens | SCR-006, 007 | Shared component |
| SelectField | 2 screens | SCR-006, 007 | Shared component |
| Dialog | 3 screens | SCR-003, 006, 009 | Shared component with content slots |
| ProgressOverlay | 2 screens | SCR-004, 009 | Shared component with message/cancel variants |

---

## Responsive Breakpoints Summary

| Breakpoint | Width | Components Affected | Key Adaptations |
|---|---|---|---|
| 7-inch Portrait | 600dp | LeftNavPanel, SplitPanel, PatientCard | LeftNavPanel collapses; single-panel layout; full-width form |
| 7-inch Landscape | 960dp | SplitPanel | Split-panel activates; LeftNavPanel 200px |
| 12.9-inch Portrait | 1024dp | All | Split-panel; comfortable spacing; all form fields visible |
| 12.9-inch Landscape | 1366dp | LeftNavPanel, FormSection | LeftNavPanel expands to 240px; optimized real estate |

---

## Implementation Priority Matrix

### High Priority (Core Components)
- [ ] Header — Used on all authenticated screens; drives navigation pattern
- [ ] TextField — Core input for all data entry screens
- [ ] Button — Primary action driver across entire app
- [ ] LeftNavPanel — Critical for split-panel form pattern
- [ ] PatientCard — Primary content unit on Patient Dashboard
- [ ] StatusBadge — Required for patient workflow status communication
- [ ] Modal — Required for Patient Recall Search overlay
- [ ] AIVoiceIcon — Core differentiator of AI-driven UX
- [ ] FormSection — Structures all data entry

### Medium Priority (Feature Components)
- [ ] SelectField — Required for drill-down pickers
- [ ] Toggle — Gender field selection
- [ ] ProgressOverlay — Recall search and submission loading
- [ ] InlineError — Edit mode validation feedback
- [ ] WarningAlert — Review and Submit screen
- [ ] Dialog — Confirmation flows
- [ ] ActionSheet — Treatment type and amend reason selection

### Low Priority (Enhancement Components)
- [ ] HepBHistoryPopover — P1 feature; can ship after core flow
- [ ] SectionIndexList — Fast-scroll enhancement for hospital list
- [ ] ContextMenu — Three-dot menu; critical for amend flow

---

## Framework-Specific Notes
**Detected Framework**: React Native (iOS & Android)
**Component Library**: Custom (design tokens from designsystem.md)

### Framework Patterns Applied
- **Auto Layout / Flexbox**: React Native flexbox for all layout containers
- **Drill-down Navigation**: React Navigation stack navigator for picker screens
- **Modal**: React Native Modal component with transparent backdrop
- **Floating Label TextField**: Custom animated component (Animated API for label transition)
- **Voice Integration**: expo-speech (TTS) + @react-native-voice/voice (STT)

### Component Library Mappings
| Wireframe Component | React Native Approach | Customization Required |
|---|---|---|
| Button | TouchableOpacity + StyleSheet | All design token variants |
| TextField | TextInput + Animated (floating label) | Floating label animation, error state |
| Toggle (Gender) | Custom segmented control | Pill shape, #1566A7 tokens |
| SearchBar | TextInput with icon | Styled with SearchBar spec |
| Modal | Modal (React Native core) | Backdrop, radius, shadow |
| StatusBadge | View + Text | All 5 color variants |
| ProgressOverlay | Modal (full-screen) | PATH Lite branding, progress bar |

---

## Accessibility Considerations

| Component | ARIA Attributes | Keyboard Navigation | Screen Reader Notes |
|---|---|---|---|
| TextField | accessibilityLabel, accessibilityRequired, accessibilityHint | Tab to focus; input | Floating label announced; error announced via accessibilityLiveRegion |
| Button | accessibilityLabel, accessibilityRole="button", accessibilityState={disabled} | Enter/Space to activate | State changes announced |
| AIVoiceIcon | accessibilityLabel="AI Voice [state]", accessibilityRole="button" | Tap to toggle | State change announced: "AI voice active", "AI voice listening" |
| Modal | accessibilityViewIsModal="true" | Focus trapped within | Title announced on open |
| StatusBadge | accessibilityLabel="Status: [value]", accessibilityRole="text" | Non-interactive | Full status label announced |
| InlineError | accessibilityLiveRegion="polite" | Non-interactive | Error message announced when rendered |
| LeftNavPanel item | accessibilityRole="menuitem", accessibilityState={selected} | Tab navigation | Active item announced as selected |
| Toggle | accessibilityRole="switch", accessibilityState={checked} | Tap to toggle | Selected value announced |

---

## Design System Integration

**Design System Reference**: `.propel/context/docs/designsystem.md`

### Components Matching Design System
- [x] Button — Primary/Secondary/Ghost/Disabled variants match 2.1 Button spec
- [x] TextField — All states match 2.2 TextField spec
- [x] SelectField — Spec matches 2.3 SelectField (Drill-down Picker)
- [x] Toggle — Gender segmented control matches 2.4 Toggle spec
- [x] Header — Matches 2.5 Header spec
- [x] LeftNavPanel — Matches 2.6 LeftNavPanel spec
- [x] PatientCard — Matches 2.7 PatientCard spec
- [x] StatusBadge — All 5 variants match 2.8 StatusBadge spec
- [x] Modal — Matches 2.9 Modal spec
- [x] Dialog — Matches 2.10 Dialog spec
- [x] AIVoiceIcon — 3-state design matches 2.11 AIVoiceIcon spec
- [x] ProgressOverlay — Matches 2.12 ProgressOverlay spec
- [x] InlineError — Matches 2.13 InlineError spec
- [x] SearchBar — Matches 2.14 SearchBar spec
- [x] HepBHistoryPopover — Matches 2.15 HepBHistoryPopover spec
- [x] FormSection — Matches 2.16 FormSection spec
- [x] WarningAlert — Matches 2.17 WarningAlert spec

### New Components to Add to Design System
- [ ] SplitPanel — Layout pattern; needs token for panel widths (200px/240px breakpoints)
- [ ] PatientSummaryCard — Sub-component of LeftNavPanel; needs its own spec entry
- [ ] ReportViewer — Report document display; DaVita brand integration spec needed
- [ ] SectionGroupHeader — "HD Billing" label style in LeftNavPanel; needs label_sm/uppercase spec
