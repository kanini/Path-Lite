# Task - TASK_002

## Requirement Reference
- User Story: US_015
- Story Location: .propel/context/tasks/us_015/us_015.md
- Acceptance Criteria:  
    - AC3: Given I tap Search, When the search executes, Then the system displays branded progress overlay "PATH is retrieving data for matching patient" with percentage progress bar and queries hardcoded mock patient records.
    - AC4: Given a matching patient is found, When search completes, Then the system closes the popup, redirects to treatment page, and prefills form fields with mock patient data (name, MRN, DOB, gender, admission details).
    - AC5: Given no matching patient is found, When search completes, Then the system displays "No matching patients found. Create new treatment" message with "Create New Treatment" button that redirects to empty treatment form.
- Edge Case:
    - What happens when multiple patients match the search criteria? (Display list of matching patients with name, MRN, DOB; allow nurse to select correct patient)

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
| Mobile | React Native | 0.73.0 |
| Library | React Navigation Stack | 6.4.1 |
| Library | React Native MMKV | 2.12.2 |

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
| **Min OS Version** | iOS 16.0 / Android API 26 (8.0) |
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
Implement patient search logic that queries mock patient data, displays branded progress overlay with percentage progress bar, handles search results (single match, multiple matches, no matches), and navigates to treatment page with prefilled data or displays appropriate messages.

## Dependent Tasks
- TASK_001 (Patient Recall Search UI) - Popup UI must be implemented first
- US_007 (Mock Data Models Definition) - Patient model and mock data must be available
- US_014 TASK_002 (Patient Navigation) - Treatment page navigation must be available

## Impacted Components
- **MODIFY**: `src/components/PatientRecallSearchPopup.tsx` - Add search logic and result handling
- **NEW**: `src/components/ProgressOverlay.tsx` - Branded progress overlay component
- **NEW**: `src/components/PatientSelectionList.tsx` - Component for multiple patient matches
- **NEW**: `src/hooks/usePatientSearch.ts` - Custom hook for patient search logic
- **MODIFY**: `src/data/mockPatients.ts` - Use existing searchPatients function
- **MODIFY**: `src/components/index.ts` - Export new components

## Implementation Plan
1. **Create ProgressOverlay component** with branded "PATH is retrieving data" message and percentage progress bar
2. **Create PatientSelectionList component** for displaying multiple matching patients
3. **Create usePatientSearch hook** to manage search execution and state
4. **Implement search logic** using searchPatients function from mockPatients
5. **Add progress simulation** with percentage updates (0% → 100%)
6. **Handle single match result** - close popup, navigate to treatment page with prefilled data
7. **Handle multiple matches result** - display PatientSelectionList for user selection
8. **Handle no matches result** - display message with "Create New Treatment" button
9. **Implement navigation** to treatment page with patient data
10. **Test all search scenarios** on both platforms

## Current Project State
```
src/
├── components/
│   ├── PatientRecallSearchPopup.tsx (from TASK_001)
│   ├── ProgressOverlay.tsx (to be created)
│   ├── PatientSelectionList.tsx (to be created)
│   └── index.ts
├── hooks/
│   ├── usePatientSearchValidation.ts (from TASK_001)
│   ├── usePatientSearch.ts (to be created)
│   └── index.ts
├── data/
│   └── mockPatients.ts (existing with searchPatients function)
├── models/
│   └── Patient.ts (existing)
└── navigation/
    └── types.ts (existing)
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | src/components/ProgressOverlay.tsx | Branded progress overlay with percentage progress bar |
| CREATE | src/components/PatientSelectionList.tsx | List component for multiple patient match selection |
| CREATE | src/hooks/usePatientSearch.ts | Custom hook for patient search execution and state management |
| MODIFY | src/components/PatientRecallSearchPopup.tsx | Integrate search logic and result handling |
| MODIFY | src/components/index.ts | Export ProgressOverlay and PatientSelectionList |
| MODIFY | src/hooks/index.ts | Export usePatientSearch |

> Only list concrete, verifiable file operations. No speculative directory trees.

## External References
- React Native ActivityIndicator: https://reactnative.dev/docs/activityindicator
- React Native ProgressBarAndroid: https://reactnative.dev/docs/progressbarandroid
- React Native ProgressViewIOS: https://reactnative.dev/docs/progressviewios
- React Navigation Navigate: https://reactnavigation.org/docs/navigation-prop/#navigate
- Async/Await Best Practices: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

## Build Commands
```bash
# iOS
cd ios && pod install && cd ..
npx react-native run-ios

# Android
npx react-native run-android

# Run tests
npm test -- PatientSearchLogic
```

## Implementation Validation Strategy
- [ ] Unit tests pass
- [ ] Integration tests pass (if applicable)
- [ ] **[UI Tasks]** Visual comparison against wireframe completed at 375px, 768px, 1440px
- [ ] **[UI Tasks]** Run `/analyze-ux` to validate wireframe alignment
- [ ] **[Mobile Tasks]** Headless platform compilation succeeds
- [ ] **[Mobile Tasks]** Native dependency linking verified
- [ ] **[Mobile Tasks]** Permission manifests validated against task requirements
- [ ] Progress overlay displays during search
- [ ] Progress bar animates from 0% to 100%
- [ ] Single match navigates to treatment page with prefilled data
- [ ] Multiple matches display selection list
- [ ] No matches display message with "Create New Treatment" button
- [ ] All scenarios work on both iOS and Android

## Implementation Checklist
- [ ] Create ProgressOverlay component with TypeScript interface
- [ ] Add visible prop to control overlay display
- [ ] Add progress prop (0-100) for progress bar
- [ ] Display branded message "PATH is retrieving data for matching patient"
- [ ] Implement platform-specific progress bar (ProgressViewIOS / ProgressBarAndroid)
- [ ] Create PatientSelectionList component with TypeScript interface
- [ ] Add patients prop (array of Patient objects)
- [ ] Add onSelectPatient callback prop
- [ ] Display patient name, MRN, DOB for each match
- [ ] Add TouchableOpacity for each patient item
- [ ] Create usePatientSearch custom hook
- [ ] Add state for search loading, progress, results, error
- [ ] Implement executeSearch function with search criteria parameter
- [ ] Call searchPatients function from mockPatients
- [ ] Simulate progress updates (0%, 25%, 50%, 75%, 100%) with setTimeout
- [ ] Return search results with match count
- [ ] Modify PatientRecallSearchPopup to use usePatientSearch hook
- [ ] Add ProgressOverlay to popup (show during search)
- [ ] Handle single match result - navigate to TreatmentScreen with patient data
- [ ] Handle multiple matches result - display PatientSelectionList
- [ ] Handle no matches result - display message and "Create New Treatment" button
- [ ] Implement "Create New Treatment" button handler - navigate to empty TreatmentScreen
- [ ] Add patient selection handler for multiple matches
- [ ] Close popup after successful navigation
- [ ] Test search with single match (e.g., MRN001)
- [ ] Test search with multiple matches (e.g., lastName "Smith")
- [ ] Test search with no matches (e.g., MRN999)
- [ ] Verify progress overlay displays and animates correctly
- [ ] Verify navigation to TreatmentScreen with correct patient data
- [ ] Test patient selection from multiple matches list
- [ ] Verify "Create New Treatment" button functionality
- [ ] Test on both iOS and Android platforms
- [ ] **[UI Tasks - MANDATORY]** Reference wireframe from Design References table during implementation
- [ ] **[UI Tasks - MANDATORY]** Validate UI matches wireframe before marking task complete
- [ ] **[Mobile Tasks - MANDATORY]** Reference Mobile References table during implementation
- [ ] **[Mobile Tasks - MANDATORY]** Run headless platform builds before marking task complete
- [ ] **[Mobile Tasks - MANDATORY]** Validate permission manifests against task requirements
