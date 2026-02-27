# Design System Reference - PATH Lite

## UI Impact Assessment
**Has UI Changes**: [x] Yes
**Platform**: iOS & Android (React Native) — Tablet-optimized (7–12.9 inch)
**UI Impact Type**: New UI

---

## 1. Design Token Definitions

### 1.1 Color Tokens

```yaml
colors:
  # Primary Brand
  primary:
    value: "#1566A7"
    usage: "Primary CTA buttons, active nav items, links, AI voice icon active state, toggle active, header accents"
    affected_components: ["Button (Primary)", "LeftNavPanel (active)", "AIVoiceIcon", "Toggle", "SearchBar focus", "StatusBadge (Tx In Progress)"]

  primary_dark:
    value: "#0E4F87"
    usage: "Primary button pressed/hover state"
    affected_components: ["Button (Primary - pressed)"]

  primary_light:
    value: "#E8F1F9"
    usage: "Active nav item background highlight, selected list row tint"
    affected_components: ["LeftNavPanel (active bg)", "ListRow (selected)"]

  # Brand / Logo
  brand_teal:
    value: "#4DB6AC"
    usage: "PATH Lite snowflake logo accent petals — branding only"
    affected_components: ["PathLiteLogo"]

  brand_blue_logo:
    value: "#1566A7"
    usage: "PATH Lite snowflake logo primary petals — branding only"
    affected_components: ["PathLiteLogo"]

  # Neutrals
  neutral_900:
    value: "#1A1A1A"
    usage: "Primary body text, form labels, patient names"
    affected_components: ["Typography/Body", "FormLabel", "PatientCard name"]

  neutral_700:
    value: "#4A4A4A"
    usage: "Secondary text, section headers, placeholder-filled values"
    affected_components: ["Typography/Secondary", "FormSection header"]

  neutral_500:
    value: "#7A7A7A"
    usage: "Placeholder text, helper text, disabled labels"
    affected_components: ["TextField placeholder", "HelperText"]

  neutral_300:
    value: "#C4C4C4"
    usage: "Borders, dividers, inactive toggle, disabled button outline"
    affected_components: ["TextField border (default)", "Divider", "Toggle (inactive)"]

  neutral_100:
    value: "#F5F5F5"
    usage: "Screen background, left panel background"
    affected_components: ["Screen bg", "LeftNavPanel bg"]

  white:
    value: "#FFFFFF"
    usage: "Card backgrounds, modal backgrounds, form panel background, button text on primary"
    affected_components: ["Card", "Modal", "Button (Primary) text", "Dialog bg"]

  # Semantic Colors
  error:
    value: "#D32F2F"
    usage: "Inline validation error text, error border on invalid field"
    affected_components: ["InlineError text", "TextField border (error)"]

  warning:
    value: "#F57C00"
    usage: "Warning alert icons, validation warning triangle on edit mode, amber date error icon"
    affected_components: ["WarningIcon", "InlineError (date range)", "WarningAlert"]

  warning_bg:
    value: "#FFF3E0"
    usage: "Warning alert background on Review and Submit screen"
    affected_components: ["WarningAlert bg"]

  success:
    value: "#388E3C"
    usage: "Received status badge, submission success indicator"
    affected_components: ["StatusBadge (Received)"]

  success_bg:
    value: "#E8F5E9"
    usage: "Received status badge background"
    affected_components: ["StatusBadge (Received) bg"]

  # Status Badge Colors
  status_not_started:
    value: "#757575"
    usage: "Not Started status badge text"
    affected_components: ["StatusBadge (Not Started)"]

  status_not_started_bg:
    value: "#EEEEEE"
    usage: "Not Started status badge background"
    affected_components: ["StatusBadge (Not Started) bg"]

  status_in_progress:
    value: "#1566A7"
    usage: "Tx In Progress status badge text"
    affected_components: ["StatusBadge (Tx In Progress)"]

  status_in_progress_bg:
    value: "#E8F1F9"
    usage: "Tx In Progress status badge background"
    affected_components: ["StatusBadge (Tx In Progress) bg"]

  status_submitted:
    value: "#0E4F87"
    usage: "Submitted status badge text"
    affected_components: ["StatusBadge (Submitted)"]

  status_submitted_bg:
    value: "#D0E4F5"
    usage: "Submitted status badge background"
    affected_components: ["StatusBadge (Submitted) bg"]

  status_amended:
    value: "#E65100"
    usage: "Submitted (Amended) status badge text"
    affected_components: ["StatusBadge (Submitted Amended)"]

  status_amended_bg:
    value: "#FBE9E7"
    usage: "Submitted (Amended) status badge background"
    affected_components: ["StatusBadge (Submitted Amended) bg"]

  overlay_scrim:
    value: "rgba(0,0,0,0.5)"
    usage: "Modal/dialog backdrop scrim"
    affected_components: ["Modal scrim", "Dialog scrim", "ProgressOverlay bg"]
```

### 1.2 Typography Tokens

```yaml
typography:
  # iOS: SF Pro / Android: Roboto — React Native system font

  heading_xl:
    family: "System (SF Pro Display / Roboto)"
    size: "24px"
    weight: "700"
    line_height: "32px"
    usage: "Screen main titles (rarely used in this app)"
    used_in: ["LoginScreen brand title"]

  heading_lg:
    family: "System"
    size: "20px"
    weight: "600"
    line_height: "28px"
    usage: "Header screen title (center of header bar)"
    used_in: ["Header title: 'Hospital Selection', 'Patient Details', 'Treatment Report'"]

  heading_md:
    family: "System"
    size: "17px"
    weight: "600"
    line_height: "24px"
    usage: "Section headers within forms (Demographics & Admission, Clinical Intake)"
    used_in: ["FormSection header", "Modal title", "Dialog title"]

  body_lg:
    family: "System"
    size: "16px"
    weight: "400"
    line_height: "24px"
    usage: "Patient name in card, hospital name in list, form field values"
    used_in: ["PatientCard name", "ListRow primary text", "TextField value"]

  body_md:
    family: "System"
    size: "14px"
    weight: "400"
    line_height: "20px"
    usage: "Secondary text, patient list metadata (treatment type, created date, nurse name)"
    used_in: ["PatientCard metadata", "ListRow secondary text", "LeftNavPanel items"]

  body_sm:
    family: "System"
    size: "12px"
    weight: "400"
    line_height: "16px"
    usage: "Helper text, timestamps, inline error messages, status badge labels"
    used_in: ["InlineError", "HelperText", "StatusBadge", "Timestamp"]

  label_md:
    family: "System"
    size: "14px"
    weight: "500"
    line_height: "20px"
    usage: "Form field labels, nav panel section item labels"
    used_in: ["FormLabel", "LeftNavPanel item", "Tab label"]

  label_sm:
    family: "System"
    size: "12px"
    weight: "500"
    line_height: "16px"
    usage: "Input placeholder format hints, section index letters"
    used_in: ["TextField placeholder", "SectionIndex letter"]

  button_label:
    family: "System"
    size: "16px"
    weight: "600"
    line_height: "24px"
    usage: "All button labels"
    used_in: ["Button (all variants)"]

  caption:
    family: "System"
    size: "11px"
    weight: "400"
    line_height: "14px"
    usage: "DaVita MPI attribution label, fine print in report"
    used_in: ["DaVita MPI label", "Report footer"]
```

### 1.3 Spacing Tokens

```yaml
spacing:
  base_unit: "8px"

  xs:    "4px"   # Internal component padding (badge, icon)
  sm:    "8px"   # Tight component gaps
  md:    "12px"  # Standard inner padding for inputs, list rows
  lg:    "16px"  # Standard content padding, section gap
  xl:    "20px"  # Form section vertical gap
  xxl:   "24px"  # Screen horizontal margin (left/right content padding)
  xxxl:  "32px"  # Top spacing for modals, dialogs
  huge:  "48px"  # Screen vertical padding top/bottom safe area

  # Layout-specific
  left_panel_width:    "200px"   # LeftNavPanel fixed width (portrait tablet)
  left_panel_width_lg: "240px"   # LeftNavPanel fixed width (landscape / large tablet)
  header_height:       "56px"    # Navigation header bar height
  form_field_height:   "52px"    # Standard text input row height
  list_row_height:     "72px"    # Patient list row minimum height
  tab_height:          "44px"    # Tab bar height
  button_height:       "48px"    # Standard button height
  button_height_sm:    "36px"    # Small/inline button height
```

### 1.4 Border Radius Tokens

```yaml
border_radius:
  none:   "0px"
  xs:     "4px"   # Input fields, small chips
  sm:     "8px"   # Cards, modals, dialogs, section containers
  md:     "12px"  # Bottom sheets, action sheets
  lg:     "16px"  # Large modal/overlay containers
  full:   "999px" # Pills (status badges, toggle buttons)
```

### 1.5 Elevation / Shadow Tokens

```yaml
shadows:
  card:
    value: "0px 1px 4px rgba(0,0,0,0.12)"
    usage: "Patient cards, form section containers"
    affected_components: ["PatientCard", "FormSection"]

  modal:
    value: "0px 8px 24px rgba(0,0,0,0.2)"
    usage: "Modals, dialogs, overlays"
    affected_components: ["Modal", "Dialog", "ProgressOverlay"]

  popover:
    value: "0px 4px 12px rgba(0,0,0,0.15)"
    usage: "Hep B Change History popover, dropdown overlays"
    affected_components: ["HepBHistoryPopover", "TreatmentTypeDropdown"]

  header:
    value: "0px 2px 4px rgba(0,0,0,0.08)"
    usage: "Navigation header bottom shadow"
    affected_components: ["Header"]
```

### 1.6 Grid & Breakpoints

```yaml
grid:
  columns: 12
  gutter:  "16px"
  margin:  "16px"   # Portrait tablet margin
  margin_lg: "24px" # Landscape tablet margin

breakpoints:
  tablet_sm_portrait:   "600dp"   # 7-inch tablet portrait
  tablet_sm_landscape:  "960dp"   # 7-inch tablet landscape
  tablet_lg_portrait:   "1024dp"  # 12.9-inch tablet portrait
  tablet_lg_landscape:  "1366dp"  # 12.9-inch tablet landscape

layout_patterns:
  single_panel: "< 768dp — full-width content, collapsible left nav"
  split_panel:  ">= 768dp — persistent left nav (200-240dp) + main content panel"
```

---

## 2. Component Specifications

### 2.1 Button

| Variant | Background | Text Color | Border | Height | Usage |
|---------|-----------|------------|--------|--------|-------|
| Primary | #1566A7 | #FFFFFF | None | 48px | Login, Search, Submit, Confirm actions |
| Secondary | #FFFFFF | #1566A7 | 1.5px #1566A7 | 48px | Cancel, secondary actions |
| Destructive | #D32F2F | #FFFFFF | None | 48px | Delete/clear actions |
| Ghost | Transparent | #1566A7 | None | 36px | Inline actions (Need Help?, Clear, Import) |
| Disabled (any) | #EEEEEE | #9E9E9E | None | 48px | Search button before gate condition met |

**States**: Default, Pressed (darken 10%), Disabled, Loading (spinner replaces label)
**Min touch target**: 44×44pt (UXR-202)
**Corner radius**: 8px (xs–sm)
**Label**: `button_label` typography token

---

### 2.2 TextField

| State | Border | Label Color | Background |
|-------|--------|-------------|------------|
| Default | 1px #C4C4C4 | #7A7A7A | #FFFFFF |
| Focused | 2px #1566A7 | #1566A7 | #FFFFFF |
| Filled | 1px #C4C4C4 | #1566A7 (float) | #FFFFFF |
| Error | 2px #D32F2F | #D32F2F | #FFFFFF |
| Disabled | 1px #EEEEEE | #9E9E9E | #F5F5F5 |

**Height**: 52px
**Padding**: 12px horizontal
**Floating label**: Yes — label animates up on focus/fill
**Mandatory marker**: Asterisk (*) appended to label for required fields (UXR-105)
**Placeholder format**: `[Enter]` for text, `[mm/dd/yyyy]` for dates, `[Select]` for enum fields
**Corner radius**: 4px

---

### 2.3 SelectField (Drill-down Picker)

A read-only TextField-style row that navigates to a full-screen picker on tap.

| Element | Spec |
|---------|------|
| Row height | 52px |
| Right chevron (›) | 16px, neutral_500 |
| Selected value | body_lg, neutral_900 |
| Unselected placeholder | body_lg, neutral_500, italic |
| Picker screen | Full-screen with NavigationHeader (back + title) + RadioList |
| Selected item checkmark | ✓ in #1566A7, right-aligned |

---

### 2.4 Toggle (Gender)

Segmented control for binary enum selection (Male / Female).

| Element | Spec |
|---------|------|
| Container | Rounded pill, border 1px #1566A7 |
| Selected segment | Background #1566A7, text #FFFFFF |
| Unselected segment | Background #FFFFFF, text #1566A7 |
| Height | 36px |
| Corner radius | full (999px) |

---

### 2.5 Header (Navigation Bar)

| Element | Spec |
|---------|------|
| Height | 56px |
| Background | #FFFFFF |
| Bottom shadow | `shadows.header` |
| Left zone | User context (nurse name as tappable — opens user menu dropdown) |
| Center zone | Screen title, `heading_lg`, neutral_900 |
| Right zone | Primary action button (e.g., "Add New", "Save") or back action |
| User menu | Dropdown with "Hospital Selection" + "Logout" items; appears on tap of nurse name |

---

### 2.6 LeftNavPanel

| Element | Spec |
|---------|------|
| Width | 200px (portrait), 240px (landscape) |
| Background | #F5F5F5 |
| Hospital name | heading_md, neutral_900, top of panel |
| Treatment type label | label_md, neutral_700, below hospital |
| Patient summary | PatientSummaryCard sub-component (name, gender/age, MRN, HBsAg, HBsAb) |
| Section group header | label_sm, neutral_500, uppercase, e.g., "HD Billing" |
| Nav items | body_md, neutral_700, 44px tap target |
| Active item | body_md, #1566A7, background primary_light, left border 3px #1566A7 |
| Warning icon | ⚠ amber on nav items with validation errors (Edit mode) |

---

### 2.7 PatientCard (Patient Dashboard List Row)

| Element | Spec |
|---------|------|
| Layout | Vertical stack: patient name (bold) → MRN + treatment summary → created/start date → nurse name |
| Patient name | body_lg, neutral_900, weight 600 |
| Status badge | Right-aligned, see StatusBadge spec |
| Three-dot menu | Right edge, 44×44pt tap target; shows context actions |
| Height | min 72px |
| Divider | 1px neutral_300 between rows |
| Active section label | "Active" / "Completed" SectionHeader above groups |

---

### 2.8 StatusBadge

| Status | Text Color | Background | Label |
|--------|-----------|------------|-------|
| Not Started | #757575 | #EEEEEE | "Not Started" |
| Tx In Progress | #1566A7 | #E8F1F9 | "Tx In Progress" |
| Received | #388E3C | #E8F5E9 | "Received" |
| Submitted | #0E4F87 | #D0E4F5 | "Submitted" |
| Submitted (Amended) | #E65100 | #FBE9E7 | "Submitted (Amended)" |

**Typography**: body_sm, weight 500
**Padding**: 4px 8px
**Corner radius**: full (999px)

---

### 2.9 Modal

| Element | Spec |
|---------|------|
| Backdrop | overlay_scrim |
| Container | #FFFFFF, corner radius 12px, shadow modal |
| Width | 90% of screen width, max 480px |
| Padding | 24px |
| Title | heading_md, neutral_900 |
| Body | body_md, neutral_700 |
| Action buttons | Stacked or side-by-side; max 2 buttons (Cancel + Primary) |
| Cancel button | Ghost or Secondary variant |
| Primary action | Primary Button variant |

Applies to: Patient Recall Search modal, Session Resume Prompt, Treatment Reuse Warning, Not Connected Error Dialog.

---

### 2.10 Dialog (Confirmation)

Lighter-weight modal variant for quick confirmations.

| Element | Spec |
|---------|------|
| Container | #FFFFFF, corner radius 12px, shadow modal |
| Width | 70% max 400px |
| Title | heading_md, center-aligned |
| Body | body_md, center-aligned |
| Buttons | Side-by-side: No (Secondary) + Yes (Primary) |

Applies to: Submit Confirmation, Change Hospital Confirmation, Treatment Reuse Warning.

---

### 2.11 AIVoiceIcon

Core UI element for the conversational AI mode. Three distinct visual states required (UXR-003).

| State | Visual | Description |
|-------|--------|-------------|
| Inactive | Snowflake/mic icon, neutral_500, static | AI voice mode off; tap to activate |
| Active | Snowflake/mic icon, #1566A7, static with blue ring | AI voice mode on; waiting for or processing |
| Listening | Animated waveform or pulsing ring, #1566A7 | STT capturing voice input |

**Size**: 48×48pt minimum (tap target compliant, UXR-202)
**Position**: Prominent in form header or floating action area on SCR-006
**Transition**: State change animation ≤ 200ms (UXR-501)

---

### 2.12 ProgressOverlay (Branded Loading)

| Element | Spec |
|---------|------|
| Background | rgba(255,255,255,0.95) — near-opaque white overlay |
| Logo | PATH Lite logo (snowflake + wordmark), centered |
| Message | body_lg, neutral_700, centered (e.g., "PATH is retrieving data for matching patient") |
| Progress bar | #1566A7 fill on neutral_300 track, 4px height, 60% width max |
| Percentage | body_sm, neutral_700, below progress bar |
| Cancel button (search only) | Ghost button, below progress |

Applies to: Patient Recall Search loading, Form Submission loading.

---

### 2.13 InlineError

| Element | Spec |
|---------|------|
| Icon | ⚠ triangle, 14px, warning color (#F57C00) |
| Text | body_sm, error (#D32F2F) or warning (#F57C00) depending on severity |
| Position | Below the associated field, 4px gap |
| Layout | Horizontal: icon + text inline |

Example text: "Date must be between 02/24/2025 - 02/26/2026"

---

### 2.14 SearchBar

| Element | Spec |
|---------|------|
| Height | 44px |
| Background | neutral_100 |
| Border | 1px neutral_300, radius 8px |
| Placeholder | label_md, neutral_500 |
| Search icon | Left-aligned, 18px, neutral_500 |
| Clear button | Right-aligned ✕, appears when text entered |
| Focus border | 2px #1566A7 |

---

### 2.15 HepBHistoryPopover

| Element | Spec |
|---------|------|
| Trigger | History icon (↺ or clock) beside HBsAg / HBsAb field |
| Width | 260px |
| Background | #FFFFFF, shadow popover, radius 8px |
| Title | "Hep B Change History", heading_md |
| Entry row | Date (body_sm, neutral_700) + value (body_md, neutral_900) + nurse name (body_sm, neutral_500) |
| Sort | Date descending (most recent first) |
| Max height | 200px with internal scroll |

---

### 2.16 FormSection

| Element | Spec |
|---------|------|
| Section header | heading_md, neutral_700, border-bottom 1px neutral_300, padding-bottom 8px |
| Container | #FFFFFF, shadow card, radius 8px, padding 16px |
| Field gap | 12px between fields |
| Section gap | 20px between sections |

Sections: "Demographics & Admission" and "Clinical Intake" on SCR-006.

---

### 2.17 WarningAlert

| Element | Spec |
|---------|------|
| Background | warning_bg (#FFF3E0) |
| Border-left | 4px warning (#F57C00) |
| Icon | ⚠ triangle, 20px, warning (#F57C00) |
| Text | body_md, neutral_900 |
| Padding | 12px 16px |
| Corner radius | 4px |

Used on SCR-009 Review and Submit: "Please ensure the treatment report is reviewed, complete and correct before submitting. Once the treatment has been submitted, changes cannot be made."

---

## 3. Screen Design References

### 3.1 SCR-001: Login Screen
**Reference Screenshot**: `Screenshots/Screenshot 2026-02-27 112333.png`

| Element | Spec |
|---------|------|
| Layout | Vertically centered content on full screen |
| Background | #FFFFFF |
| Logo | PATH Lite snowflake (60px) + "PATH LITE" wordmark, centered |
| Username field | TextField, floating label "Username" |
| Password field | TextField, floating label "Password", masked |
| Need Help? | Ghost link, right-aligned below password |
| Login button | Primary Button, full-width, disabled until both fields filled |
| Keyboard | System keyboard appears on focus; layout scrolls up |

---

### 3.2 SCR-002: Hospital Selection
**Reference Screenshot**: `Screenshots/Screenshot 2026-02-27 112426.png`, `112500.png`, `112522.png`

| Element | Spec |
|---------|------|
| Header | Left: nurse name (tappable, user menu), Center: "Hospital Selection" |
| Search bar | Full-width below header; placeholder "Search Hospitals" |
| List columns | Hospital name (bold, body_lg) + Address (body_md, neutral_500) |
| Section headers | Alphabetical single letter (A, B, C…), label_sm, neutral_500 |
| Section index | Right edge alphabet index for fast scroll |
| Row height | 52px minimum |
| Empty search | "No hospitals found" centered message |
| User menu | Dropdown: nurse full name (header) + "Hospital Selection" + "Logout" |

---

### 3.3 SCR-003: Patient Dashboard
**Reference Screenshots**: `Screenshots/Screenshot 2026-02-27 112543.png`, `113618.png`, `113635.png`, `113729.png`, `113823.png`, `113853.png`, `113915.png`

| Element | Spec |
|---------|------|
| Header | Left: nurse name, Center: "Billing Only - [HOSPITAL NAME]", Right: "Add New" (primary button) |
| Search bar | "Search Patients by Last Name, First Name or MRN" |
| Tabs | "My Patients" (default) / "All Patients" — tabs below search |
| Active section | SectionHeader "Active" + patient rows |
| Completed section | SectionHeader "Completed" + patient rows |
| Patient row | Name (bold) + MRN + treatment info + date + nurse name + StatusBadge + 3-dot menu |
| Three-dot context menu | Per-row; options: "Hemodialysis" (for active), "Amend" (for submitted) |
| Amend reason picker | Action sheet: "Entered in Error" / "Omitted in Error" |
| Treatment reuse dialog | Warning dialog when tapping completed treatment |
| Not Connected dialog | Error dialog when offline amend attempted |

---

### 3.4 SCR-004: Patient Recall Search
**Reference Screenshots**: `Screenshots/Screenshot 2026-02-27 112624.png`, `112652.png`, `112708.png`, `112728.png`

| Element | Spec |
|---------|------|
| Type | Modal overlay on Patient Dashboard |
| Header | "Recall Patient Data" (center), Cancel (left), Create New Treatment (right, appears on empty result) |
| Instruction text | "Enter search criteria to recall patient data." |
| Fields | Patient First Name, Patient Last Name, Medical Record Number (MRN)* (required), DOB ([mm/dd/yyyy]), Admission / Encounter Number |
| MRN label | Asterisk (*) mandatory indicator |
| Search button | Primary; disabled until MRN + 1 additional field entered; enabled = #1566A7 |
| Clear button | Ghost/link; resets all fields |
| Loading state | Branded ProgressOverlay (PATH Lite logo + "PATH is retrieving data for matching patient" + progress bar + Cancel) |
| Empty state | "No matching patients found. Create new treatment" centered; "Create New Treatment" link/button in header |

---

### 3.5 SCR-006: Patient Details Form
**Reference Screenshots**: `Screenshots/Screenshot 2026-02-27 112748.png`, `112802.png`, `113014.png`, `113157.png`, `113213.png`, `113836.png`

| Element | Spec |
|---------|------|
| Layout | Split-panel: LeftNavPanel (200px) + Main form content |
| Header | "Patient Details", Done/Save buttons |
| Left panel | Hospital name → treatment type → PatientSummaryCard (name, gender/age, MRN, HBsAg status, HBsAb status) → HD Billing nav items |
| HD Billing nav items | Patient Details (active), Primary Care Nurse Report (Pre and Post), Order, Wait Time (Pre and Post), Treatment, ACOI Questions, Cancel Billing, Review and Submit |
| Demographics & Admission section | MRN*, First Name*, Middle Initial/Name, Last Name*, DOB*, Admission/Encounter Number, Gender* (Toggle), Treatment Location* (SelectField), Room Number* |
| Clinical Intake section | "Import Hepatitis B result from CWOW" link, HBsAg* (SelectField + history icon), Date Drawn, Source (SelectField), HBsAb* (SelectField + history icon), Date Drawn, Source (SelectField), DaVita MPI (read-only, attributed) |
| AI voice icon | Prominent, above or adjacent to form; shows current state |
| Session resume | Modal overlay on form open when incomplete session detected |

**Left Panel PatientSummaryCard:**
| Field | Format |
|-------|--------|
| Patient name | "[Last Name], [First Name] [MI]." — heading_md, neutral_900 |
| Gender + Age | "[Male/Female] [Age]" — body_sm, neutral_700 |
| DOB | "mm/dd/yyyy" — body_sm, neutral_500 |
| MRN | Numeric — body_sm, neutral_500 |
| HBsAg | "HBsAg: [value] ([date])" — body_sm |
| HBsAb | "HBsAb: [value]" — body_sm |

---

### 3.6 SCR-007: Patient Details Edit Mode
**Reference Screenshot**: `Screenshots/Screenshot 2026-02-27 113444.png`

| Element | Spec |
|---------|------|
| Header | "Patient Details", Cancel (left), "Confirm Change" (right, primary button) |
| Same split-panel layout as SCR-006 | LeftNavPanel shows ⚠ icon on items with errors |
| Inline errors | ⚠ amber icon + error message below field (e.g., "Date must be between 02/24/2025 - 02/26/2026") |
| Auto-focus | First erroneous field scrolled into view and focused |
| Confirm Change dialog | "Change Hospital?" style dialog if hospital changed |

---

### 3.7 SCR-008: Treatment Report Preview
**Reference Screenshot**: `Screenshots/Screenshot 2026-02-27 113519.png`

| Element | Spec |
|---------|------|
| Header | "Treatment Report" (left nav back), "Treatment Report Preview" (center), "Full Screen" icon (right) |
| Same split-panel layout | LeftNavPanel shows "Review and Submit" active |
| Report viewer | Full-width document view; DaVita wordmark top-right of report |
| Report title | "HD Billing Report [date/time]" |
| Report branding | DaVita logo top-right |
| Report content | Sections: Patient Info, For Billing Purpose Only fields, Wait Time(s), HD Treatment Type, Additional Services, Initials, Compliance Footer |
| Full screen | Expand button triggers full-screen modal of report |

---

### 3.8 SCR-009: Review and Submit
**Reference Screenshots**: `Screenshots/Screenshot 2026-02-27 113537.png`, `113554.png`, `113906.png`

| Element | Spec |
|---------|------|
| Header | "Review and Submit" |
| Same split-panel layout | LeftNavPanel shows "Review and Submit" active |
| Report ready banner | "Treatment Report is ready to view" with document icon |
| Warning alert | WarningAlert component: amber warning + submission-final warning text |
| Action buttons | "View Report" (Secondary) + "Submit" (Primary) — side by side, bottom of screen |
| Submit confirmation dialog | Dialog: "You are submitting a treatment for [Patient Name] at [Hospital]. Do you want to proceed?" + No + Yes |
| Submission progress overlay | Full-screen ProgressOverlay: PATH Lite logo + "Submitting this treatment - Please wait" + progress bar (0→100%) |

---

## 4. Design Token Reference: Screen-Level Usage

| Screen | Primary Tokens Used |
|--------|-------------------|
| SCR-001 Login | primary, white, neutral_300, neutral_500, heading_lg, body_lg, button_label |
| SCR-002 Hospital Selection | primary, neutral_100, neutral_700, neutral_300, heading_lg, body_lg, body_md |
| SCR-003 Patient Dashboard | primary, all status colors, neutral_100, warning, success, heading_lg, body_md, body_sm |
| SCR-004 Recall Search | primary, white, overlay_scrim, neutral_300, error, body_lg, label_md |
| SCR-006 Patient Details | primary, primary_light, neutral_100, neutral_900, warning, error, heading_md, body_lg, label_md, body_sm |
| SCR-007 Edit Mode | warning, error, warning_bg, primary, neutral_900, body_sm (inline errors) |
| SCR-008 Report Preview | neutral_100, white, primary, heading_md, body_md, caption |
| SCR-009 Review & Submit | warning, warning_bg, primary, white, overlay_scrim, body_md, button_label |

---

## 5. Accessibility Requirements

- **WCAG Level**: AA (UXR-201)
- **Color Contrast**: Primary #1566A7 on white → 5.74:1 (passes 4.5:1 normal text, 3:1 UI components)
- **Error #D32F2F on white** → 5.12:1 (passes)
- **Warning #F57C00 on white** → 3.01:1 (passes 3:1 UI minimum; use with icon for clarity)
- **Touch Targets**: All interactive elements ≥ 44×44pt (UXR-202)
- **Focus States**: Ring in primary #1566A7, 2px offset, for all interactive elements
- **Screen Reader**: ARIA labels for all inputs, buttons, icons; AIVoiceIcon announces state changes (UXR-203)
- **Dynamic Type**: Typography scales with system font size up to 2 stops without layout breakage (UXR-204)

---

## 6. Design Review Checklist

**Complete for all UI-impacting screens:**
- [ ] Figma frames reviewed for all screens SCR-001 through SCR-011
- [ ] Design tokens extracted and applied — no hard-coded color/spacing values
- [ ] Component specifications documented in Section 2
- [ ] Visual validation criteria defined (color accuracy, spacing, typography match)
- [ ] Responsive behavior specified for 7-inch portrait and 12.9-inch landscape
- [ ] Accessibility requirements met (contrast, touch targets, focus states, ARIA)
- [ ] Screenshot-to-spec mapping verified (34 reference screenshots → 15 screens)
- [ ] AIVoiceIcon three-state design approved
- [ ] StatusBadge five variants approved
- [ ] Mandatory field asterisks on all 9 required fields (FR-038)
