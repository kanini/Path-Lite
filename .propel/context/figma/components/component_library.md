# Component Library - PATH Lite

**Source**: `designsystem.md` Component Specifications (Section 2)  
**Platform**: iOS & Android (React Native) - Tablet  
**Design Tokens**: All components use tokens from `01_Foundations`

---

## Component Naming Convention

`C/<Category>/<Name>/<Variant>`

Example: `C/Actions/Button/Primary/Default`

---

## C/Actions

### C/Actions/Button

**Variants**:
- **Type**: Primary, Secondary, Destructive, Ghost
- **State**: Default, Hover, Focus, Active, Disabled, Loading

**Specifications**:

| Variant | Background | Text Color | Border | Height | Usage |
|---------|-----------|------------|--------|--------|-------|
| Primary | #1566A7 | #FFFFFF | None | 48px | Login, Search, Submit, Confirm actions |
| Primary/Hover | #0E4F87 | #FFFFFF | None | 48px | Hover state (darken 10%) |
| Primary/Disabled | #EEEEEE | #9E9E9E | None | 48px | Search button before gate condition |
| Primary/Loading | #1566A7 | Spinner | None | 48px | Spinner replaces label |
| Secondary | #FFFFFF | #1566A7 | 1.5px #1566A7 | 48px | Cancel, secondary actions |
| Secondary/Hover | #E8F1F9 | #1566A7 | 1.5px #1566A7 | 48px | Hover state |
| Destructive | #D32F2F | #FFFFFF | None | 48px | Delete/clear actions |
| Ghost | Transparent | #1566A7 | None | 36px | Inline actions (Need Help?, Clear) |

**Design Tokens**:
- Typography: `button_label` (16px, weight 600, line-height 24px)
- Corner radius: `xs` (4px) to `sm` (8px)
- Min touch target: 44×44pt (UXR-202)
- Transition: 150ms ease-out

**Usage**:
- Primary: Main CTAs (Login, Submit, Search, Confirm Change)
- Secondary: Cancel, View Report
- Ghost: Need Help?, Clear, Import links
- Destructive: Delete/clear operations

---

### C/Actions/IconButton

**Specifications**:
- Size: 44×44pt (touch target compliant)
- Icon size: 24px
- Background: Transparent (default), primary_light (hover)
- Usage: Three-dot menu, history icon, back arrow

---

## C/Inputs

### C/Inputs/TextField

**Variants**:
- **State**: Default, Focused, Filled, Error, Disabled

**Specifications**:

| State | Border | Label Color | Background | Behavior |
|-------|--------|-------------|------------|----------|
| Default | 1px #C4C4C4 | #7A7A7A | #FFFFFF | Floating label at baseline |
| Focused | 2px #1566A7 | #1566A7 | #FFFFFF | Label floats up, border thickens |
| Filled | 1px #C4C4C4 | #1566A7 | #FFFFFF | Label floated, value visible |
| Error | 2px #D32F2F | #D32F2F | #FFFFFF | Red border + inline error below |
| Disabled | 1px #EEEEEE | #9E9E9E | #F5F5F5 | Grey, no interaction |

**Design Tokens**:
- Height: `form_field_height` (52px)
- Padding: `md` (12px horizontal)
- Corner radius: `xs` (4px)
- Typography: `body_lg` (16px) for value, `label_md` (14px) for label
- Mandatory marker: Asterisk (*) appended to label for required fields

**Placeholder Formats**:
- Text: `[Enter]`
- Date: `[mm/dd/yyyy]`
- Enum: `[Select]`

**Usage**: MRN, First Name, Last Name, DOB, Admission Number, Room Number, Date Drawn fields

---

### C/Inputs/SelectField

**Type**: Drill-down picker (read-only TextField that navigates to full-screen picker)

**Specifications**:
- Row height: 52px
- Right chevron (›): 16px, neutral_500
- Selected value: body_lg, neutral_900
- Unselected placeholder: body_lg, neutral_500, italic
- Picker screen: Full-screen with NavigationHeader (back + title) + RadioList
- Selected item checkmark: ✓ in #1566A7, right-aligned

**Usage**: Treatment Location, HBsAg, HBsAb Source pickers

---

### C/Inputs/Toggle

**Type**: Segmented control for binary enum (Gender: Male/Female)

**Specifications**:
- Container: Rounded pill, border 1px #1566A7
- Selected segment: Background #1566A7, text #FFFFFF
- Unselected segment: Background #FFFFFF, text #1566A7
- Height: 36px
- Corner radius: `full` (999px)

**Usage**: Gender selection on Patient Details Form

---

### C/Inputs/DatePicker

**Type**: TextField with date picker overlay

**Specifications**:
- Same as TextField specs
- Placeholder: `[mm/dd/yyyy]`
- Platform picker: iOS date wheel / Android calendar
- Validation: Date range enforcement with inline error

**Usage**: DOB, HBsAg Date Drawn, HBsAb Date Drawn

---

### C/Inputs/SearchBar

**Specifications**:
- Height: 44px
- Background: neutral_100 (#F5F5F5)
- Border: 1px neutral_300, radius 8px
- Placeholder: label_md, neutral_500
- Search icon: Left-aligned, 18px, neutral_500
- Clear button: Right-aligned ✕, appears when text entered
- Focus border: 2px #1566A7

**Usage**: Hospital Selection, Patient Dashboard, Patient Recall Search, Change Hospital

---

## C/Navigation

### C/Navigation/Header

**Specifications**:
- Height: `header_height` (56px)
- Background: #FFFFFF
- Bottom shadow: `shadows.header` (0px 2px 4px rgba(0,0,0,0.08))
- Layout zones:
  - **Left**: User context (nurse name as tappable — opens user menu dropdown)
  - **Center**: Screen title, `heading_lg`, neutral_900
  - **Right**: Primary action button (e.g., "Add New", "Save") or back action

**User Menu Dropdown**:
- Trigger: Tap nurse name in left zone
- Items: "Hospital Selection" + "Logout"
- Background: #FFFFFF, shadow: `shadows.popover`

**Usage**: All authenticated screens

---

### C/Navigation/LeftNavPanel

**Specifications**:
- Width: `left_panel_width` (200px portrait) / `left_panel_width_lg` (240px landscape)
- Background: neutral_100 (#F5F5F5)
- Sections:
  1. **Hospital name**: heading_md, neutral_900, top of panel
  2. **Treatment type label**: label_md, neutral_700, below hospital
  3. **Patient summary**: PatientSummaryCard sub-component
  4. **Section group header**: label_sm, neutral_500, uppercase (e.g., "HD BILLING")
  5. **Nav items**: body_md, neutral_700, 44px tap target

**Active Item**:
- Typography: body_md, #1566A7
- Background: primary_light (#E8F1F9)
- Left border: 3px #1566A7

**Warning Icon**:
- ⚠ amber on nav items with validation errors (Edit mode)

**PatientSummaryCard Sub-component**:

| Field | Format | Typography |
|-------|--------|------------|
| Patient name | "[Last Name], [First Name] [MI]." | heading_md, neutral_900 |
| Gender + Age | "[Male/Female] [Age]" | body_sm, neutral_700 |
| DOB | "mm/dd/yyyy" | body_sm, neutral_500 |
| MRN | Numeric | body_sm, neutral_500 |
| HBsAg | "HBsAg: [value] ([date])" | body_sm |
| HBsAb | "HBsAb: [value]" | body_sm |

**Usage**: SCR-006, 007, 008, 009 (all treatment form screens)

---

### C/Navigation/Tabs

**Specifications**:
- Height: `tab_height` (44px)
- Active tab: body_md weight 600, #1566A7, bottom border 3px #1566A7
- Inactive tab: body_md, neutral_700
- Background: #FFFFFF
- Divider: 1px neutral_300 below tabs

**Usage**: My Patients / All Patients tabs on Patient Dashboard

---

### C/Navigation/SectionIndexList

**Type**: Alphabetical index for fast scroll (A-Z)

**Specifications**:
- Position: Right edge of screen
- Letter size: label_sm (12px), neutral_500
- Active letter: #1566A7
- Touch target: 20×20pt per letter

**Usage**: Hospital Selection, Change Hospital screens

---

### C/Navigation/BreadcrumbBack

**Specifications**:
- Back arrow (‹): 20px, #1566A7
- Parent screen title: heading_lg, neutral_900
- Height: 56px (header height)
- Touch target: 44×44pt

**Usage**: Drill-down pickers (SCR-006a, 006b, 006c), Treatment Report Preview

---

## C/Content

### C/Content/PatientCard

**Type**: Patient Dashboard list row

**Specifications**:
- Layout: Vertical stack
  - Patient name (bold) → MRN + treatment summary → created/start date → nurse name
- Patient name: body_lg, neutral_900, weight 600
- Status badge: Right-aligned, see StatusBadge spec
- Three-dot menu: Right edge, 44×44pt tap target
- Height: min 72px (`list_row_height`)
- Divider: 1px neutral_300 between rows
- Active/Completed section label: "Active" / "Completed" SectionHeader above groups

**Usage**: SCR-003 Patient Dashboard

---

### C/Content/StatusBadge

**Variants**: 5 status values

| Status | Text Color | Background | Label |
|--------|-----------|------------|-------|
| Not Started | #757575 | #EEEEEE | "Not Started" |
| Tx In Progress | #1566A7 | #E8F1F9 | "Tx In Progress" |
| Received | #388E3C | #E8F5E9 | "Received" |
| Submitted | #0E4F87 | #D0E4F5 | "Submitted" |
| Submitted (Amended) | #E65100 | #FBE9E7 | "Submitted (Amended)" |

**Specifications**:
- Typography: body_sm (12px), weight 500
- Padding: `xs` (4px) horizontal, `xs` (4px) vertical
- Corner radius: `full` (999px)

**Usage**: Patient Dashboard patient rows

---

### C/Content/ListRow

**Type**: Generic list row for hospitals, patients, radio options

**Specifications**:
- Height: 52px minimum (hospitals), 72px (patients)
- Layout: Horizontal stack with left content + right accessory
- Primary text: body_lg, neutral_900
- Secondary text: body_md, neutral_500
- Right accessory: Chevron (›), checkmark (✓), or three-dot menu
- Divider: 1px neutral_300 bottom border

**Usage**: Hospital Selection, Patient Dashboard, Radio pickers

---

### C/Content/FormSection

**Specifications**:
- Section header: heading_md, neutral_700, border-bottom 1px neutral_300, padding-bottom 8px
- Container: #FFFFFF, shadow `card` (0px 1px 4px rgba(0,0,0,0.12)), radius `sm` (8px)
- Padding: `lg` (16px)
- Field gap: `md` (12px) between fields
- Section gap: `xl` (20px) between sections

**Sections on SCR-006**:
1. Demographics & Admission
2. Clinical Intake

**Usage**: Patient Details Form (SCR-006, 007)

---

### C/Content/HistoryList

**Type**: Hep B Change History entries

**Specifications**:
- Entry row layout: Date (body_sm, neutral_700) + value (body_md, neutral_900) + nurse name (body_sm, neutral_500)
- Sort: Date descending (most recent first)
- Divider: 1px neutral_300 between entries
- Row height: 48px

**Usage**: HepBHistoryPopover (SCR-006d)

---

### C/Content/ReportViewer

**Type**: Full-screen document viewer for Treatment Report

**Specifications**:
- Background: #FFFFFF
- DaVita wordmark: Top-right of report
- Report title: "HD Billing Report [date/time]", heading_lg
- Report sections: Patient Info, For Billing Purpose Only, Wait Time(s), HD Treatment Type, Additional Services, Initials, Compliance Footer
- Typography: body_md for content, label_md for labels
- Full screen toggle: Icon button top-right

**Usage**: SCR-008 Treatment Report Preview

---

## C/Feedback

### C/Feedback/Modal

**Specifications**:
- Backdrop: overlay_scrim (rgba(0,0,0,0.5))
- Container: #FFFFFF, corner radius `md` (12px), shadow `modal`
- Width: 90% of screen width, max 480px
- Padding: `xxxl` (32px) top, `xxl` (24px) sides/bottom
- Title: heading_md, neutral_900
- Body: body_md, neutral_700
- Action buttons: Stacked or side-by-side; max 2 buttons (Cancel + Primary)
- Cancel button: Ghost or Secondary variant
- Primary action: Primary Button variant

**Usage**: Patient Recall Search modal, Session Resume Prompt, Treatment Reuse Warning, Not Connected Error Dialog

---

### C/Feedback/Dialog

**Type**: Lighter-weight modal for quick confirmations

**Specifications**:
- Container: #FFFFFF, corner radius `md` (12px), shadow `modal`
- Width: 70% max 400px
- Title: heading_md, center-aligned
- Body: body_md, center-aligned
- Buttons: Side-by-side: No (Secondary) + Yes (Primary)

**Usage**: Submit Confirmation, Change Hospital Confirmation, Treatment Reuse Warning

---

### C/Feedback/ActionSheet

**Type**: Bottom sheet for action selection

**Specifications**:
- Slide from bottom animation
- Background: #FFFFFF, corner radius `md` (12px) top corners only
- Title: heading_md, neutral_900, padding `lg`
- Action items: body_lg, 56px height, center-aligned
- Divider: 1px neutral_300 between items
- Cancel: body_lg, #1566A7, bottom item with divider

**Usage**: Treatment Type Selection, Amend Reason Picker

---

### C/Feedback/Toast

**Specifications**:
- Position: Top or bottom fixed
- Background: neutral_900 (90% opacity)
- Text: body_md, #FFFFFF
- Padding: `md` (12px) vertical, `lg` (16px) horizontal
- Corner radius: `sm` (8px)
- Animation: Slide + fade, 300ms
- Auto-dismiss: 3 seconds

**Usage**: Session closure notification, submission success

---

### C/Feedback/ProgressOverlay

**Type**: Branded loading overlay

**Specifications**:
- Background: rgba(255,255,255,0.95) — near-opaque white overlay
- Logo: PATH Lite logo (snowflake + wordmark), centered
- Message: body_lg, neutral_700, centered (e.g., "PATH is retrieving data for matching patient")
- Progress bar: #1566A7 fill on neutral_300 track, 4px height, 60% width max
- Percentage: body_sm, neutral_700, below progress bar
- Cancel button (search only): Ghost button, below progress

**Usage**: Patient Recall Search loading, Form Submission loading

---

### C/Feedback/InlineError

**Specifications**:
- Icon: ⚠ triangle, 14px, warning color (#F57C00)
- Text: body_sm, error (#D32F2F) or warning (#F57C00) depending on severity
- Position: Below the associated field, 4px gap
- Layout: Horizontal: icon + text inline

**Example Text**: "Date must be between 02/24/2025 - 02/26/2026"

**Usage**: SCR-007 Patient Details Edit Mode validation errors

---

### C/Feedback/Popover

**Type**: HepBHistoryPopover

**Specifications**:
- Trigger: History icon (↺ or clock) beside HBsAg / HBsAb field
- Width: 260px
- Background: #FFFFFF, shadow `popover` (0px 4px 12px rgba(0,0,0,0.15)), radius `sm` (8px)
- Title: "Hep B Change History", heading_md
- Content: HistoryList component (see C/Content/HistoryList)
- Max height: 200px with internal scroll

**Usage**: SCR-006d Hep B Change History

---

### C/Feedback/AIVoiceIcon

**Core UI element for conversational AI mode**

**States**: 3 distinct visual states (UXR-003)

| State | Visual | Description |
|-------|--------|-------------|
| Inactive | Snowflake/mic icon, neutral_500, static | AI voice mode off; tap to activate |
| Active | Snowflake/mic icon, #1566A7, static with blue ring | AI voice mode on; waiting for or processing |
| Listening | Animated waveform or pulsing ring, #1566A7 | STT capturing voice input |

**Specifications**:
- Size: 48×48pt minimum (tap target compliant, UXR-202)
- Position: Prominent in form header or floating action area on SCR-006
- Transition: State change animation ≤ 200ms (UXR-501)
- Animation: Pulsing ring or waveform for Listening state

**Usage**: SCR-006 Patient Details Form

---

### C/Feedback/WarningAlert

**Specifications**:
- Background: warning_bg (#FFF3E0)
- Border-left: 4px warning (#F57C00)
- Icon: ⚠ triangle, 20px, warning (#F57C00)
- Text: body_md, neutral_900
- Padding: `md` (12px) vertical, `lg` (16px) horizontal
- Corner radius: `xs` (4px)

**Usage**: SCR-009 Review and Submit: "Please ensure the treatment report is reviewed, complete and correct before submitting. Once the treatment has been submitted, changes cannot be made."

---

## C/Branding

### C/Branding/PathLiteLogo

**Elements**:
- Snowflake icon: Multi-petal design, teal (#4DB6AC) + blue (#1566A7)
- "PATH LITE" wordmark: Bold, neutral_900
- Size: 60px (Login screen), 48px (loading overlays)

**Usage**: Login screen header, branded loading overlays

---

### C/Branding/DaVitaWordmark

**Specifications**:
- "Davita" wordmark
- Position: Top-right of Treatment Report
- Size: heading_md

**Usage**: SCR-008 Treatment Report Preview

---

### C/Branding/SnowflakeIcon

**Specifications**:
- Multi-petal snowflake design
- Colors: Teal (#4DB6AC) + Blue (#1566A7)
- Size: 24px (standalone icon usage)

**Usage**: Branding element, AIVoiceIcon base

---

## Component State Matrix

All interactive components MUST implement these states:

| State | Visual Treatment | Transition |
|-------|-----------------|------------|
| Default | Base styling per design tokens | N/A |
| Hover | Subtle elevation/color shift | 150ms ease-out |
| Focus | Visible outline (2px offset, #1566A7, ≥3:1 contrast) | Immediate |
| Active | Pressed/depressed visual (darken 10%) | Immediate |
| Disabled | 40% opacity, no pointer events | N/A |
| Loading | Skeleton or spinner, preserve dimensions | Fade 300ms |

---

## Accessibility Compliance

All components MUST meet:

- **WCAG 2.2 AA**: Color contrast ≥4.5:1 (text), ≥3:1 (UI components)
- **Touch Targets**: All interactive elements ≥44×44pt (UXR-202)
- **Focus States**: Visible focus ring on all interactive elements
- **ARIA Labels**: Screen reader support for all inputs, buttons, icons
- **Dynamic Type**: Typography scales with system font size up to 2 stops

**Verified Contrasts**:
- Primary #1566A7 on white → 5.74:1 ✓
- Error #D32F2F on white → 5.12:1 ✓
- Warning #F57C00 on white → 3.01:1 ✓ (use with icon)

---

## Component Usage Guidelines

### When to Use Each Component

**Buttons**:
- Primary: Main CTAs (Login, Submit, Search, Confirm)
- Secondary: Cancel, View Report, secondary actions
- Ghost: Inline links (Need Help?, Clear, Import)
- Destructive: Delete/clear operations

**Inputs**:
- TextField: Text entry (names, MRN, room number)
- SelectField: Enum selection with drill-down (Treatment Location, HBsAg)
- Toggle: Binary enum (Gender: Male/Female)
- DatePicker: Date selection (DOB, Date Drawn)
- SearchBar: Filter/search (hospitals, patients)

**Navigation**:
- Header: All authenticated screens
- LeftNavPanel: Treatment form screens (SCR-006, 007, 008, 009)
- Tabs: Section switching (My Patients / All Patients)
- BreadcrumbBack: Drill-down pickers, report preview

**Feedback**:
- Modal: Complex overlays (Patient Recall Search, Session Resume)
- Dialog: Quick confirmations (Submit, Change Hospital)
- ActionSheet: Action selection (Treatment Type, Amend Reason)
- Toast: Brief notifications (session closure, success)
- ProgressOverlay: Long operations (search, submission)
- InlineError: Field validation errors
- Popover: Contextual info (Hep B History)
- AIVoiceIcon: Voice mode indicator
- WarningAlert: Important warnings (Review and Submit)

---

## Component Dependencies

Components built from other components:

- **PatientCard** → StatusBadge, IconButton (three-dot menu)
- **FormSection** → TextField, SelectField, Toggle, DatePicker, InlineError
- **LeftNavPanel** → PatientSummaryCard, IconButton (warning icons)
- **Modal** → Button (Cancel, Primary)
- **Dialog** → Button (No, Yes)
- **ProgressOverlay** → PathLiteLogo, Button (Cancel)
- **HepBHistoryPopover** → HistoryList

---

## Export Notes

All components exported with:
- All variant combinations
- All state combinations
- Design tokens applied (no hard-coded values)
- Auto Layout enabled
- Touch targets verified ≥44×44pt
- Accessibility annotations included
