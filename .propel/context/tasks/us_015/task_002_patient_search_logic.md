# Task - TASK_002

## Requirement Reference
- User Story: US_015
- Story Location: .propel/context/tasks/us_015/us_015.md
- Acceptance Criteria:  
    - AC-3: Display branded progress overlay "PATH is retrieving data for matching patient" with percentage progress bar and queries hardcoded mock patient records
    - AC-4: When matching patient is found, close popup, redirect to treatment page, and prefill form fields with mock patient data (name, MRN, DOB, gender, admission details)
    - AC-5: When no matching patient is found, display "No matching patients found. Create new treatment" message with "Create New Treatment" button that redirects to empty treatment form
- Edge Case:
    - Multiple patients match search criteria: Display list of matching patients with name, MRN, DOB; allow nurse to select correct patient

## Design References (Frontend Tasks Only)
| Reference Type | Value |
|----------------|-------|
| **UI Impact** | Yes |
| **Figma URL** | N/A |
| **Wireframe Status** | PENDING |
| **Wireframe Type** | N/A |
| **Wireframe Path/URL** | TODO: Provide wireframe - upload to `.propel/context/wireframes/Hi-Fi/wireframe-SCR-004-patient-recall-search.[html|png|jpg]` or add external URL |
| **Screen Spec** | figma_spec.md#SCR-004 |
| **UXR Requirements** | UXR-102, UXR-103, UXR-502 |
| **Design Tokens** | N/A |

> **Wireframe Status Legend:**
> - **AVAILABLE**: Local file exists at specified path
> - **PENDING**: UI-impacting task awaiting wireframe (provide file or URL)
> - **EXTERNAL**: Wireframe provided via external URL
> - **N/A**: Task has no UI impact
>
> If UI Impact = No, all design references should be N/A

### **CRITICAL: Wireframe Implementation Requirement (UI Tasks Only)**
**IF Wireframe Status = AVAILABLE or EXTERNAL:**
- **MUST** open and reference the wireframe file/URL during UI implementation
- **MUST** match layout, spacing, typography, and colors from the wireframe
- **MUST** implement all states shown in wireframe (default, hover, focus, error, loading)
- **MUST** validate implementation against wireframe at breakpoints: 375px, 768px, 1440px
- Run `/analyze-ux` after implementation to verify pixel-perfect alignment

## Applicable Technology Stack
| Layer | Technology | Version |
|-------|------------|---------|
| Frontend | React Native | 0.73.0 |
| Frontend | React | 18.2.0 |
| Library | React Navigation | 6.1.18 |
| Mobile | React Native | 0.73.x |

**Note**: All code, and libraries, MUST be compatible with versions above.

## AI References (AI Tasks Only)
| Reference Type | Value |
|----------------|-------|
| **AI Impact** | No |
| **AIR Requirements** | N/A |
| **AI Pattern** | N/A |
| **Prompt Template Path** | N/A |
| **Guardrails Config** | N/A |
| **Model Provider** | N/A |

> **AI Impact Legend:**
> - **Yes**: Task involves LLM integration, RAG pipeline, prompt engineering, or AI infrastructure
> - **No**: Task is deterministic (FE/BE/DB only)
>
> If AI Impact = No, all AI references should be N/A

## Mobile References (Mobile Tasks Only)
| Reference Type | Value |
|----------------|-------|
| **Mobile Impact** | Yes |
| **Platform Target** | Both |
| **Min OS Version** | iOS 13.0 / Android API 21 (5.0) |
| **Mobile Framework** | React Native |

> **Mobile Impact Legend:**
> - **Yes**: Task involves mobile app development (native or cross-platform)
> - **No**: Task is web, backend, or infrastructure only
>
> If Mobile Impact = No, all Mobile references should be N/A

### **CRITICAL: Mobile Implementation Requirement (Mobile Tasks Only)**
**IF Mobile Impact = Yes:**
- **MUST** verify platform-specific headless compilation succeeds before marking complete
- **MUST** validate native dependency linking (pod install / gradle sync / flutter pub get)
- **MUST** inspect permission manifests - only required permissions with usage descriptions
- **MUST** follow platform design guidelines (HIG for iOS, Material Design 3 for Android)

## Task Overview
Implement patient search logic and result handling components including branded progress overlay, search results display for multiple matches, and navigation flow for found/not-found scenarios. This task integrates with existing mock patient data and handles all search result states (single match, multiple matches, no matches).

## Dependent Tasks
- TASK_001 (Patient Search Modal UI) - Provides the search form interface

## Impacted Components
- **NEW**: `src/components/patient/PatientSearchProgress.tsx` - Branded progress overlay component
- **NEW**: `src/components/patient/PatientSearchResults.tsx` - Multiple results selection component
- **NEW**: `src/services/PatientSearchService.ts` - Search logic service
- **UPDATED**: `src/components/patient/PatientSearchModal.tsx` - Add search execution and result handling
- **UPDATED**: `src/components/patient/index.ts` - Export new components
- **UPDATED**: `src/data/mockPatients.ts` - Ensure searchPatients function is exported

## Implementation Plan
1. **Create PatientSearchService**
   - Import existing `searchPatients` function from `src/data/mockPatients.ts`
   - Create wrapper service with async search method to simulate API delay (500ms)
   - Implement progress tracking (0% → 25% → 50% → 75% → 100%)
   - Return search results with match count

2. **Create PatientSearchProgress Component**
   - Build modal overlay with branded "PATH" logo
   - Display message: "PATH is retrieving data for matching patient"
   - Implement animated percentage progress bar (0-100%)
   - Use brand colors from `colors.ts` (primary: #1566A7, brandTeal: #4DB6AC)
   - Add ActivityIndicator for visual feedback

3. **Create PatientSearchResults Component**
   - Display list of matching patients when multiple results found
   - Show patient card with: Full Name, MRN, DOB (formatted), Gender
   - Implement selectable list items with radio button or checkmark
   - Add "Select" button to confirm patient selection
   - Style with existing design tokens

4. **Implement Search Flow in PatientSearchModal**
   - On Search button press, show PatientSearchProgress overlay
   - Call PatientSearchService with form criteria
   - Handle three result scenarios:
     - **Single Match**: Close modal, trigger onPatientSelected callback with patient data
     - **Multiple Matches**: Show PatientSearchResults component for selection
     - **No Matches**: Display error message with "Create New Treatment" button
   - Implement error state UI with message and action button

5. **Add Navigation Callbacks**
   - Define `onPatientSelected` prop callback with Patient parameter
   - Define `onCreateNew` prop callback for no-match scenario
   - Parent component handles navigation to treatment page with/without prefilled data

6. **Implement Progress Animation**
   - Use React Native Animated API for smooth progress bar animation
   - Increment progress at intervals: 0% → 25% (100ms) → 50% (200ms) → 75% (300ms) → 100% (400ms)
   - Ensure progress completes before showing results

## Current Project State
```
src/
├── components/
│   ├── patient/
│   │   ├── PatientSearchModal.tsx (from TASK_001)
│   │   └── index.ts
│   └── common/
│       ├── Button.tsx
│       └── Input.tsx
├── services/
│   └── (empty - will add PatientSearchService.ts)
├── data/
│   ├── mockPatients.ts (existing - has searchPatients function)
│   └── index.ts
└── models/
    └── Patient.ts (existing Patient interface)
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | d:\Path_Lite\src\services\PatientSearchService.ts | Async search service with progress tracking |
| CREATE | d:\Path_Lite\src\components\patient\PatientSearchProgress.tsx | Branded progress overlay with percentage bar |
| CREATE | d:\Path_Lite\src\components\patient\PatientSearchResults.tsx | Multiple patient results selection component |
| MODIFY | d:\Path_Lite\src\components\patient\PatientSearchModal.tsx | Add search execution, progress display, and result handling logic |
| MODIFY | d:\Path_Lite\src\components\patient\index.ts | Export new components |

> Only list concrete, verifiable file operations. No speculative directory trees.

## External References
- React Native Animated API: https://reactnative.dev/docs/animated
- React Native ActivityIndicator: https://reactnative.dev/docs/activityindicator
- React Native FlatList: https://reactnative.dev/docs/flatlist
- Date Formatting: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString

## Build Commands
```bash
# Development
npm start

# iOS
npm run ios

# Android
npm run android

# Type checking
npx tsc --noEmit

# Linting
npm run lint
```

## Implementation Validation Strategy
- [ ] Unit tests pass
- [ ] Integration tests pass (if applicable)
- [x] **[UI Tasks]** Visual comparison against wireframe completed at 375px, 768px, 1440px
- [x] **[UI Tasks]** Run `/analyze-ux` to validate wireframe alignment
- [ ] **[AI Tasks]** Prompt templates validated with test inputs
- [ ] **[AI Tasks]** Guardrails tested for input sanitization and output validation
- [ ] **[AI Tasks]** Fallback logic tested with low-confidence/error scenarios
- [ ] **[AI Tasks]** Token budget enforcement verified
- [ ] **[AI Tasks]** Audit logging verified (no PII in logs)
- [x] **[Mobile Tasks]** Headless platform compilation succeeds
- [x] **[Mobile Tasks]** Native dependency linking verified
- [x] **[Mobile Tasks]** Permission manifests validated against task requirements

## Implementation Checklist
- [ ] Create PatientSearchService.ts with async search wrapper
- [ ] Implement progress tracking (0%, 25%, 50%, 75%, 100%) with 500ms total delay
- [ ] Create PatientSearchProgress component with branded overlay
- [ ] Add "PATH is retrieving data for matching patient" message
- [ ] Implement animated progress bar using Animated API
- [ ] Style progress overlay with brand colors (primary, brandTeal)
- [ ] Create PatientSearchResults component for multiple matches
- [ ] Display patient cards with Name, MRN, DOB, Gender
- [ ] Implement selectable list with radio/checkmark UI
- [ ] Add "Select" button to confirm patient choice
- [ ] Update PatientSearchModal to integrate search flow
- [ ] Show progress overlay on search button press
- [ ] Handle single match: close modal, call onPatientSelected
- [ ] Handle multiple matches: show PatientSearchResults
- [ ] Handle no matches: show error with "Create New Treatment" button
- [ ] Define onPatientSelected callback prop
- [ ] Define onCreateNew callback prop
- [ ] Test all three search result scenarios
- [ ] Verify progress animation timing and smoothness
- [ ] Test on iOS and Android devices
- [ ] Verify accessibility for result selection
- **[UI Tasks - MANDATORY]** Reference wireframe from Design References table during implementation
- **[UI Tasks - MANDATORY]** Validate UI matches wireframe before marking task complete
- **[Mobile Tasks - MANDATORY]** Reference Mobile References table during implementation
- **[Mobile Tasks - MANDATORY]** Run headless platform builds before marking task complete
- **[Mobile Tasks - MANDATORY]** Validate permission manifests against task requirements
