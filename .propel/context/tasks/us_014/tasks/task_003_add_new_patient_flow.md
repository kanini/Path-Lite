# Task - TASK_003

## Requirement Reference
- User Story: US_014
- Story Location: .propel/context/tasks/us_014/us_014.md
- Acceptance Criteria:  
    - AC3: Given I need to add a new patient, When I tap the "Add New" button, Then the system displays treatment type selection dropdown with "Hemodialysis" option and opens Patient Recall Search popup after selection.
- Edge Case:
    - None specific to this task

## Design References (Frontend Tasks Only)
| Reference Type | Value |
|----------------|-------|
| **UI Impact** | Yes |
| **Figma URL** | N/A |
| **Wireframe Status** | PENDING |
| **Wireframe Type** | N/A |
| **Wireframe Path/URL** | TODO: Provide wireframe - upload to `.propel/context/wireframes/Hi-Fi/wireframe-SCR-003-patient-dashboard.[html|png|jpg]` or add external URL |
| **Screen Spec** | figma_spec.md#SCR-003 |
| **UXR Requirements** | UXR-405, UXR-506 |
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
Implement the "Add New" button functionality on the Patient Dashboard that displays a treatment type selection dropdown (initially with "Hemodialysis" option) and opens the Patient Recall Search popup after treatment type selection. This creates the entry point for adding new patients to the system.

## Dependent Tasks
- TASK_001 (Patient Dashboard UI) - Dashboard must be implemented first
- US_015 (Patient Recall Search Popup) - Popup component must be available

## Impacted Components
- **MODIFY**: `src/screens/PatientDashboardScreen.tsx` - Add "Add New" button and treatment type dropdown
- **NEW**: `src/components/TreatmentTypeDropdown.tsx` - Treatment type selection dropdown component
- **NEW**: `src/models/enums.ts` - Add TreatmentType enum (if not exists)
- **MODIFY**: `src/components/index.ts` - Export TreatmentTypeDropdown

## Implementation Plan
1. **Create TreatmentType enum** with "Hemodialysis" option in enums file
2. **Create TreatmentTypeDropdown component** with dropdown/picker functionality
3. **Add "Add New" button** to PatientDashboardScreen header or floating action button
4. **Implement button press handler** to show treatment type dropdown
5. **Handle treatment type selection** to trigger Patient Recall Search popup
6. **Add state management** for dropdown visibility and selected treatment type
7. **Integrate with Patient Recall Search popup** (from US_015)
8. **Test flow** on both iOS and Android platforms

## Current Project State
```
src/
├── components/
│   ├── PatientListItem.tsx (from TASK_001)
│   ├── TreatmentTypeDropdown.tsx (to be created)
│   └── index.ts
├── screens/
│   ├── PatientDashboardScreen.tsx (from TASK_001)
│   └── index.ts
├── models/
│   ├── enums.ts (existing)
│   └── index.ts
└── navigation/
    └── types.ts (existing)
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| MODIFY | src/screens/PatientDashboardScreen.tsx | Add "Add New" button and treatment type selection logic |
| CREATE | src/components/TreatmentTypeDropdown.tsx | Dropdown component for treatment type selection |
| MODIFY | src/models/enums.ts | Add TreatmentType enum with Hemodialysis option |
| MODIFY | src/components/index.ts | Export TreatmentTypeDropdown component |

> Only list concrete, verifiable file operations. No speculative directory trees.

## External References
- React Native Picker: https://github.com/react-native-picker/picker
- React Native Modal: https://reactnative.dev/docs/modal
- React Navigation Header Buttons: https://reactnavigation.org/docs/header-buttons/
- React Native Button: https://reactnative.dev/docs/button

## Build Commands
```bash
# Install picker dependency
npm install @react-native-picker/picker

# iOS
cd ios && pod install && cd ..
npx react-native run-ios

# Android
npx react-native run-android

# Run tests
npm test -- AddNewPatientFlow
```

## Implementation Validation Strategy
- [ ] Unit tests pass
- [ ] Integration tests pass (if applicable)
- [ ] **[UI Tasks]** Visual comparison against wireframe completed at 375px, 768px, 1440px
- [ ] **[UI Tasks]** Run `/analyze-ux` to validate wireframe alignment
- [ ] **[Mobile Tasks]** Headless platform compilation succeeds
- [ ] **[Mobile Tasks]** Native dependency linking verified
- [ ] **[Mobile Tasks]** Permission manifests validated against task requirements
- [ ] "Add New" button is visible and accessible
- [ ] Treatment type dropdown displays when button is pressed
- [ ] "Hemodialysis" option is available in dropdown
- [ ] Patient Recall Search popup opens after treatment type selection
- [ ] Flow works correctly on both iOS and Android

## Implementation Checklist
- [ ] Add TreatmentType enum to enums.ts with Hemodialysis value
- [ ] Create TreatmentTypeDropdown component with TypeScript interface
- [ ] Implement dropdown using @react-native-picker/picker or Modal with options
- [ ] Add "Add New" button to PatientDashboardScreen (header or FAB)
- [ ] Style "Add New" button prominently (primary color, accessible size)
- [ ] Add state for dropdown visibility (showTreatmentTypeDropdown)
- [ ] Add state for selected treatment type
- [ ] Implement handleAddNewPress to show treatment type dropdown
- [ ] Implement handleTreatmentTypeSelect to handle selection
- [ ] Trigger Patient Recall Search popup after treatment type selection
- [ ] Add proper TypeScript typing for all state and handlers
- [ ] Handle dropdown dismissal (cancel action)
- [ ] Test "Add New" button visibility in both tabs
- [ ] Test dropdown display on both iOS and Android
- [ ] Verify "Hemodialysis" option is selectable
- [ ] Test integration with Patient Recall Search popup
- [ ] Verify accessibility (button label, dropdown labels)
- [ ] Test with VoiceOver/TalkBack for screen reader support
- [ ] **[UI Tasks - MANDATORY]** Reference wireframe from Design References table during implementation
- [ ] **[UI Tasks - MANDATORY]** Validate UI matches wireframe before marking task complete
- [ ] **[Mobile Tasks - MANDATORY]** Reference Mobile References table during implementation
- [ ] **[Mobile Tasks - MANDATORY]** Run headless platform builds before marking task complete
- [ ] **[Mobile Tasks - MANDATORY]** Validate permission manifests against task requirements
