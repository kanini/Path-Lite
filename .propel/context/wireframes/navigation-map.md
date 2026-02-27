# Navigation Map - PATH Lite

## Cross-Screen Navigation Index

| From Screen | Action/Trigger | To Screen | Transition Type | Notes |
|---|---|---|---|---|
| SCR-001 Login | Valid credentials → Login | SCR-002 Hospital Selection | Full screen push | Forward navigation |
| SCR-001 Login | Invalid credentials | SCR-001 Login / Error | In-place state | Username retained; password cleared |
| SCR-002 Hospital Selection | Tap hospital row | SCR-003 Patient Dashboard | Full screen push | Hospital context set |
| SCR-002 Hospital Selection | Tap nurse name → Logout | SCR-001 Login | Full screen replace | Session cleared |
| SCR-003 Patient Dashboard | Tap nurse name → Hospital Selection | SCR-002 Hospital Selection | Full screen push | Change hospital context |
| SCR-003 Patient Dashboard | Tap "Add New" | SCR-005 Treatment Type (ActionSheet) | Bottom sheet slide-up | Overlay on SCR-003 |
| SCR-003 Patient Dashboard | Select Hemodialysis (SCR-005) | SCR-004 Patient Recall Search | Modal overlay | Overlay on SCR-003 |
| SCR-003 Patient Dashboard | Tap active patient row | SCR-006 Patient Details Form | Full screen push | Opens existing/incomplete form |
| SCR-003 Patient Dashboard | Three-dot → Hemodialysis | SCR-006 Patient Details Form | Full screen push | Opens treatment form |
| SCR-003 Patient Dashboard | Three-dot → Amend (online) | SCR-006 Patient Details Form | Full screen push | Opens amend mode |
| SCR-003 Patient Dashboard | Three-dot → Amend (offline) | Not Connected Dialog | Dialog overlay | Error; no navigation |
| SCR-003 Patient Dashboard | Tap completed treatment | Treatment Reuse Warning Dialog | Dialog overlay | Warning; no navigation unless dismissed |
| SCR-004 Recall Search | Search returns match | SCR-006 Patient Details Form (prefilled) | Modal dismiss → push | Patient data prefilled |
| SCR-004 Recall Search | Search returns no match | SCR-004 Empty State | In-place state | "Create New Treatment" visible |
| SCR-004 Recall Search | Tap "Create New Treatment" | SCR-006 Patient Details Form (empty) | Modal dismiss → push | Empty form; MRN prefilled |
| SCR-004 Recall Search | Tap Cancel | SCR-003 Patient Dashboard | Modal dismiss | Returns to dashboard |
| SCR-004 Recall Search (loading) | Tap Cancel (in progress overlay) | SCR-004 Recall Search | Overlay dismiss | Returns to recall search form |
| SCR-006 Patient Details | All fields completed → Done/Save | SCR-009 Review and Submit | Left nav push | Forward flow |
| SCR-006 Patient Details | Tap left nav → Review and Submit | SCR-009 Review and Submit | Left nav push | Direct nav |
| SCR-006 Patient Details | Tap Treatment Location field | SCR-006a Treatment Location Picker | Full screen push | Drill-down |
| SCR-006 Patient Details | Tap HBsAg field | SCR-006b HBsAg Picker | Full screen push | Drill-down |
| SCR-006 Patient Details | Tap Source field (HBsAg/HBsAb) | SCR-006c Source Picker | Full screen push | Drill-down |
| SCR-006 Patient Details | Tap history icon (HBsAg/HBsAb) | SCR-006d Hep B History Popover | Popover overlay | Inline overlay |
| SCR-006 Patient Details | Tap hospital name in left panel | Change Hospital Dialog | Dialog overlay | Warns about data clear |
| SCR-006 Patient Details | Change Hospital Dialog → Change | SCR-011 Change Hospital | Full screen push | Procedure data cleared |
| SCR-006 Patient Details | Open with incomplete session | SCR-010 Session Resume Prompt | Modal overlay | Non-dismissable |
| SCR-006a/b/c Pickers | Select option | SCR-006 Patient Details | Full screen pop | Returns with selection |
| SCR-006a/b/c Pickers | Tap back arrow | SCR-006 Patient Details | Full screen pop | No selection change |
| SCR-010 Session Resume | Tap Resume | SCR-006 Patient Details (AI Active) | Modal dismiss | Loads partial data; AI resumes |
| SCR-010 Session Resume | Tap Start Over | SCR-006 Patient Details (empty) | Modal dismiss | Clears partial data |
| SCR-011 Change Hospital | Tap hospital row + Confirm Hospital Change | SCR-006 Patient Details | Full screen pop | Hospital updated; procedure data cleared |
| SCR-011 Change Hospital | Tap Cancel | SCR-006 Patient Details | Full screen pop | No change |
| SCR-007 Patient Details Edit | Tap Confirm Change | SCR-009 Review and Submit | Full screen pop | After validation pass |
| SCR-007 Patient Details Edit | Tap Cancel | SCR-009 Review and Submit | Full screen pop | No changes applied |
| SCR-008 Treatment Report | Tap back arrow | SCR-009 Review and Submit | Full screen pop | Return to review |
| SCR-008 Treatment Report | Tap Full Screen | Full Screen Modal | Modal overlay | Report expanded |
| SCR-009 Review and Submit | Tap View Report | SCR-008 Treatment Report Preview | Full screen push | Report displayed |
| SCR-009 Review and Submit | Validation fails → Edit | SCR-007 Patient Details Edit | Full screen push | Auto-focus on first error |
| SCR-009 Review and Submit | Tap Submit | Submit Confirmation Dialog | Dialog overlay | Confirm before submit |
| SCR-009 Review and Submit | Submit Confirmed → Yes | Submission Progress Overlay → SCR-003 | Full screen replace | Progress 0→100% → dashboard |
| SCR-009 Review and Submit | Submit Dialog → No | SCR-009 Review and Submit | Dialog dismiss | Remains on review |

---

## Flow Entry Points

| Flow ID | Entry Screen | Entry Trigger |
|---|---|---|
| FL-001 | SCR-001 Login | App launch |
| FL-002 | SCR-002 Hospital Selection | Successful login |
| FL-003 | SCR-003 Patient Dashboard | Tap "Add New" |
| FL-004 | SCR-006 Patient Details Form | Patient identified (recall match or new) |
| FL-005 | SCR-009 Review and Submit | Form completion or "Review" trigger |
| FL-006 | SCR-009 Review and Submit | Validation pass + Continue |
| FL-007 | SCR-003 Patient Dashboard | Tap patient with incomplete session |

---

## Back Navigation Summary

| Screen | Back Target | Back Type |
|---|---|---|
| SCR-002 Hospital Selection | SCR-001 Login | Header back / Session logout |
| SCR-003 Patient Dashboard | SCR-002 Hospital Selection | User menu → Hospital Selection |
| SCR-006 Patient Details | SCR-003 Patient Dashboard | Header "Done" or system back |
| SCR-006a/b/c Pickers | SCR-006 Patient Details | Header back arrow |
| SCR-007 Edit Mode | SCR-009 Review and Submit | Header Cancel |
| SCR-008 Report Preview | SCR-009 Review and Submit | Header back arrow |
| SCR-009 Review and Submit | SCR-006 Patient Details | Left nav → Patient Details |
| SCR-011 Change Hospital | SCR-006 Patient Details | Header Cancel |

---

## Deep Link Map

| Deep Link Path | Target Screen | State |
|---|---|---|
| `/login` | SCR-001 | Default |
| `/hospital-selection` | SCR-002 | Default (requires auth) |
| `/dashboard` | SCR-003 | My Patients tab default |
| `/treatment/:patientId` | SCR-006 | Populated (requires patient context) |
| `/review/:patientId` | SCR-009 | Default (requires complete form) |
