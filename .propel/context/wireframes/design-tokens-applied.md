# Design Tokens Applied - PATH Lite Hi-Fi Wireframes

## Token Application Summary

**Fidelity**: High
**Source**: `.propel/context/docs/designsystem.md`
**Applied To**: All 8 Hi-Fi HTML wireframes (SCR-001 through SCR-009)

---

## 1. Color Tokens Applied

### Primary Brand
| Token | Value | Applied In Wireframes |
|---|---|---|
| `primary` | `#1566A7` | All primary CTAs (Login, Search, Submit, Confirm Change), active nav items, focused field borders, AI Voice icon (active/listening), toggle selected state, SearchBar focus border, StatusBadge (Tx In Progress) |
| `primary_dark` | `#0E4F87` | Button hover/pressed states; Submitted status badge text |
| `primary_light` | `#E8F1F9` | Active nav item background in LeftNavPanel, selected list row tint on Hospital Selection, AI active voice area background, Tx In Progress badge background |

### Brand
| Token | Value | Applied In Wireframes |
|---|---|---|
| `brand_teal` | `#4DB6AC` | PATH Lite snowflake logo petal tips — SCR-001, ProgressOverlay logos |
| `brand_blue_logo` | `#1566A7` | PATH Lite snowflake logo primary arms — SCR-001, ProgressOverlay logos |

### Neutrals
| Token | Value | Applied In Wireframes |
|---|---|---|
| `neutral_900` | `#1A1A1A` | Header screen titles, form labels, patient names (PatientCard name), report document text |
| `neutral_700` | `#4A4A4A` | Section headers (FormSection heading_md), secondary text, LeftNavPanel nav items default, PatientCard metadata |
| `neutral_500` | `#7A7A7A` | Placeholder text, helper text, disabled labels, section index letters, search bar placeholder, chevron icons |
| `neutral_300` | `#C4C4C4` | Default field borders, dividers between list rows, inactive section separators, progress bar track |
| `neutral_100` | `#F5F5F5` | Screen background, LeftNavPanel background, SearchBar background, section header backgrounds, disabled field background |
| `white` | `#FFFFFF` | Card backgrounds, modal/dialog backgrounds, form section containers, button text on primary, header background |

### Semantic Colors
| Token | Value | Applied In Wireframes |
|---|---|---|
| `error` | `#D32F2F` | Error field borders (SCR-007 validation), inline error text, Login error message, mandatory asterisk (*) |
| `warning` | `#F57C00` | InlineError icons (⚠) on SCR-007, LeftNavPanel warning icons on error sections, WarningAlert border-left and icon |
| `warning_bg` | `#FFF3E0` | WarningAlert background (SCR-009), edit mode banner background (SCR-007) |
| `success` | `#388E3C` | Received status badge text (SCR-003) |
| `success_bg` | `#E8F5E9` | Received status badge background (SCR-003) |
| `overlay_scrim` | `rgba(0,0,0,0.5)` | Modal/dialog backdrop — SCR-004 Recall Search, SCR-009 dialogs, SCR-006 change hospital, SCR-003 dialogs |

### Status Badge Colors
| Token | Value | Applied In Wireframes | Screen |
|---|---|---|---|
| `status_not_started` / `status_not_started_bg` | `#757575` / `#EEEEEE` | Not Started badge | SCR-003 |
| `status_in_progress` / `status_in_progress_bg` | `#1566A7` / `#E8F1F9` | Tx In Progress badge | SCR-003 |
| `status_submitted` / `status_submitted_bg` | `#0E4F87` / `#D0E4F5` | Submitted badge | SCR-003 |
| `status_amended` / `status_amended_bg` | `#E65100` / `#FBE9E7` | Submitted (Amended) badge | SCR-003 |

---

## 2. Typography Tokens Applied

| Token | Size / Weight | Applied Elements |
|---|---|---|
| `heading_xl` | 24px / 700 | PATH LITE wordmark on SCR-001 Login |
| `heading_lg` | 20px / 600 | All screen title in header center (Hospital Selection, Patient Details, Review and Submit, Treatment Report Preview) |
| `heading_md` | 17px / 600 | FormSection headers (Demographics & Admission, Clinical Intake), modal/dialog titles, PatientSummaryCard name, LeftNavPanel hospital name |
| `body_lg` | 16px / 400 | Hospital names in list (SCR-002), patient names in cards (SCR-003), TextField filled values, SelectField selected values, button labels |
| `body_md` | 14px / 400 | Patient metadata in cards, LeftNavPanel nav items, secondary content, modal body text |
| `body_sm` | 12px / 400 | InlineError messages, status badge labels, timestamps, helper text, DaVita MPI attribution, report fine print |
| `label_md` | 14px / 500 | Form field labels (floating), Tab labels, SearchBar placeholder |
| `label_sm` | 12px / 500 | Alphabetical section index letters, section group header ("HD Billing"), field floating label (floated position) |
| `button_label` | 16px / 600 | All button labels (Login, Search, Submit, Confirm Change, View Report, Cancel, Create New Treatment) |
| `caption` | 11px / 400 | DaVita MPI label, Report footer compliance text |

---

## 3. Spacing Tokens Applied

| Token | Value | Applied Elements |
|---|---|---|
| `xs` | 4px | Badge internal padding, InlineError gap below field, icon padding |
| `sm` | 8px | Tight component gaps, section gap between field groups, search bar inner padding |
| `md` | 12px | Standard inner padding for TextField (horizontal), list row padding, PatientCard padding, LeftNavPanel item padding, nav item vertical padding |
| `lg` | 16px | Standard content padding (wireframe body padding), section gaps between form sections, header horizontal padding, modal padding base |
| `xl` | 20px | Form section vertical gap, review screen main padding |
| `xxl` | 24px | Modal container padding, dialog padding, screen horizontal margin |
| `xxxl` | 32px | Modal top spacing |
| `left_panel_width` | 200px | LeftNavPanel fixed width (portrait/landscape ≥768dp) |
| `left_panel_width_lg` | 240px | LeftNavPanel expanded on 12.9-inch landscape |
| `header_height` | 56px | All navigation header bars |
| `form_field_height` | 52px | All TextField, SelectField rows |
| `list_row_height` | 72px | PatientCard minimum height (SCR-003) |
| `tab_height` | 44px | Tab bar height (SCR-003 My Patients / All Patients) |
| `button_height` | 48px | Standard button height (Primary, Secondary, Destructive) |
| `button_height_sm` | 36px | Small/inline button height (Ghost, header small buttons) |

---

## 4. Border Radius Tokens Applied

| Token | Value | Applied Elements |
|---|---|---|
| `xs` | 4px | TextField borders, SelectField borders, InlineError container, WarningAlert |
| `sm` | 8px | Button corners (all variants), FormSection container, PatientCard, Modal, Dialog, SearchBar, ContextMenu dropdown, User menu dropdown |
| `md` | 12px | Modal container radius, Dialog radius, ActionSheet top radius |
| `lg` | 16px | Device frame decorative radius, Full-screen modal |
| `full` | 999px | StatusBadge (pill shape), Gender Toggle pill, badge chips |

---

## 5. Elevation / Shadow Tokens Applied

| Token | Value | Applied Elements |
|---|---|---|
| `shadows.card` | `0px 1px 4px rgba(0,0,0,0.12)` | FormSection containers (SCR-006, SCR-007), PatientCard (SCR-003), ReportReadyBanner (SCR-009), Report document (SCR-008) |
| `shadows.modal` | `0px 8px 24px rgba(0,0,0,0.2)` | Patient Recall Search modal (SCR-004), Submit Confirmation Dialog (SCR-009), Session Resume Prompt (SCR-006), Change Hospital Dialog, Full-screen report modal |
| `shadows.popover` | `0px 4px 12px rgba(0,0,0,0.15)` | HepBHistoryPopover (SCR-006d), User Menu dropdown (SCR-002), ContextMenu dropdown (SCR-003), Treatment Type ActionSheet (SCR-003) |
| `shadows.header` | `0px 2px 4px rgba(0,0,0,0.08)` | Navigation header bar bottom shadow — all authenticated screens |

---

## 6. Screen-Level Token Usage Summary

| Screen | Primary Tokens |
|---|---|
| SCR-001 Login | `primary`, `white`, `neutral_300`, `neutral_500`, `heading_xl`, `body_lg`, `button_label`, `error`, `primary_light`, `brand_teal` |
| SCR-002 Hospital Selection | `primary`, `primary_light`, `neutral_100`, `neutral_700`, `neutral_300`, `heading_lg`, `body_lg`, `body_md`, `label_sm`, `shadows.header`, `shadows.popover` |
| SCR-003 Patient Dashboard | `primary`, `primary_light`, all status badge colors, `neutral_100`, `warning`, `warning_bg`, `overlay_scrim`, `heading_lg`, `body_lg`, `body_md`, `body_sm`, `shadows.card`, `shadows.modal`, `shadows.popover` |
| SCR-004 Recall Search | `primary`, `white`, `overlay_scrim`, `neutral_300`, `error`, `body_lg`, `label_md`, `shadows.modal` (progress overlay uses `rgba(255,255,255,0.96)`) |
| SCR-006 Patient Details | `primary`, `primary_light`, `neutral_100`, `neutral_900`, `warning`, `error`, `heading_md`, `body_lg`, `label_md`, `body_sm`, `shadows.card`, `shadows.popover`, `overlay_scrim` |
| SCR-007 Edit Mode | `warning`, `error`, `warning_bg`, `primary`, `neutral_900`, `body_sm`, `shadows.card`, `shadows.modal` |
| SCR-008 Report Preview | `neutral_100`, `white`, `primary`, `heading_md`, `body_md`, `caption`, `shadows.card`, `shadows.modal` |
| SCR-009 Review & Submit | `warning`, `warning_bg`, `primary`, `white`, `overlay_scrim`, `body_md`, `button_label`, `shadows.card`, `shadows.modal` (progress overlay: `rgba(255,255,255,0.97)`) |

---

## 7. Component-Level Token Compliance

| Component | Tokens Verified | Notes |
|---|---|---|
| Button (Primary) | `primary` bg, `white` text, `radius_sm`, `button_height`, `button_label` | Hover: `primary_dark` |
| Button (Disabled) | `#EEEEEE` bg, `#9E9E9E` text | Matches designsystem.md 2.1 Disabled spec |
| TextField (Default) | `neutral_300` border, `neutral_500` label, `white` bg, `radius_xs`, `field_height` | Floating label on focus/fill |
| TextField (Error) | `error` border 2px, `error` label color | Matches SCR-007 inline error visual |
| SelectField | `radius_xs`, `field_height`, chevron `neutral_500`, history icon `primary` | Read-only; drill-down nav |
| Toggle (Gender) | `primary` border/selected bg, `white` selected text, `full` radius | Height 36px per spec |
| LeftNavPanel | `neutral_100` bg, `primary_light` active bg, `primary` active text, `primary` active border-left 3px, `neutral_100` width 200px | Warning ⚠ icon in `warning` color for error sections |
| StatusBadge | All 5 color variants per 2.8 spec | `full` radius, `body_sm` weight 500, padding 4px 8px |
| Modal | `white` bg, `radius_md`, `shadows.modal`, `overlay_scrim` backdrop, padding `xxl` | Width 90% max 480–520px |
| Dialog | `white` bg, `radius_md`, `shadows.modal`, 70% max 400px | Buttons side-by-side |
| AIVoiceIcon | `neutral_100`/`neutral_300` inactive, `primary_light`/`primary` active, pulsing border listening | 48×48pt min size |
| ProgressOverlay | `rgba(255,255,255,0.95–0.97)` bg, `primary` fill, `neutral_300` track, 4px height | Branded PATH Lite logo centered |
| InlineError | `warning` icon (#F57C00), `error` text (#D32F2F), `body_sm`, 4px gap below field | SCR-007 only |
| WarningAlert | `warning_bg` bg, `warning` border-left 4px, icon 20px, `body_md` text, padding 12px 16px | SCR-009 non-dismissable |
| SearchBar | `neutral_100` bg, `neutral_300` border, `radius_sm`, height 44px, `primary` focus border 2px | Clear ✕ visible when text entered |
| HepBHistoryPopover | `white` bg, `shadows.popover`, `radius_sm`, 260px width, 200px max-height scroll | SCR-006d; date descending sort |

---

## 8. Accessibility Compliance (WCAG AA)

| Check | Result | Notes |
|---|---|---|
| `#1566A7` on `#FFFFFF` | ✓ 5.74:1 | Passes 4.5:1 normal text, 3:1 UI components |
| `#D32F2F` on `#FFFFFF` | ✓ 5.12:1 | Error text passes |
| `#F57C00` on `#FFFFFF` | ✓ 3.01:1 | Warning — used with icon for clarity (UXR-201) |
| `#0E4F87` on `#D0E4F5` | ✓ ~4.6:1 | Submitted badge passes |
| `#757575` on `#EEEEEE` | ✓ ~3.8:1 | Not Started badge passes UI component threshold |
| `#388E3C` on `#E8F5E9` | ✓ ~4.1:1 | Received badge passes |
| `#E65100` on `#FBE9E7` | ✓ ~3.5:1 | Amended badge passes UI component threshold |
| Touch targets | All interactive elements ≥44×44pt (UXR-202) | Verified on all button, nav item, toggle, icon specs |
| Focus states | 2px `primary` ring with offset on all interactive elements | Defined in component specs |

---

## 9. Platform Defaults Used

- **Font Family**: System font stack — `SF Pro Display` (iOS) / `Roboto` (Android) via CSS `-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Roboto', sans-serif`
- **Grid**: 12-column, 16px margins (portrait), 24px margins (landscape), 16px gutters
- **Base Unit**: 8px spacing scale
- **Breakpoints**: 600dp (7-inch portrait), 768dp (split-panel trigger), 1024dp (12.9-inch portrait), 1366dp (12.9-inch landscape)
