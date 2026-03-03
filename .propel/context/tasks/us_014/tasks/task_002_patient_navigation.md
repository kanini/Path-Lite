# Task - TASK_002

## Requirement Reference
- User Story: US_014
- Story Location: .propel/context/tasks/us_014/us_014.md
- Acceptance Criteria:  
    - AC2: Given I view the patient list, When I tap on a patient entry, Then the system navigates to the treatment page with patient data prefilled from hardcoded mock data.
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
| **UXR Requirements** | UXR-001, UXR-403 |
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
Implement navigation from patient list items to the treatment page with patient data prefilled from mock data. This includes handling touch events on patient list items, passing patient data through navigation params, and ensuring the treatment page receives and displays the prefilled data correctly.

## Dependent Tasks
- TASK_001 (Patient Dashboard UI) - Patient list must be implemented first
- US_007 (Mock Data Models Definition) - Patient model must be available

## Impacted Components
- **MODIFY**: `src/components/PatientListItem.tsx` - Add onPress handler for navigation
- **MODIFY**: `src/screens/PatientDashboardScreen.tsx` - Add navigation logic to treatment page
- **MODIFY**: `src/navigation/types.ts` - Add TreatmentPage route with patient params
- **NEW**: `src/screens/TreatmentScreen.tsx` - Treatment page screen (if not exists)

## Implementation Plan
1. **Add TouchableOpacity wrapper** to PatientListItem component for tap handling
2. **Define navigation params** in navigation types for TreatmentPage route with patient data
3. **Implement onPress handler** in PatientDashboardScreen to navigate with patient data
4. **Pass patient object** through navigation params to TreatmentScreen
5. **Retrieve patient data** in TreatmentScreen from route params
6. **Prefill form fields** in TreatmentScreen with patient data from mock data
7. **Add visual feedback** (press state) to PatientListItem for better UX
8. **Test navigation flow** on both iOS and Android platforms

## Current Project State
```
src/
├── components/
│   ├── PatientListItem.tsx (from TASK_001)
│   └── index.ts
├── screens/
│   ├── PatientDashboardScreen.tsx (from TASK_001)
│   ├── TreatmentScreen.tsx (to be created/modified)
│   └── index.ts
├── navigation/
│   └── types.ts (existing)
├── models/
│   └── Patient.ts (existing)
└── data/
    └── mockPatients.ts (existing)
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| MODIFY | src/components/PatientListItem.tsx | Add TouchableOpacity wrapper and onPress prop |
| MODIFY | src/screens/PatientDashboardScreen.tsx | Implement navigation handler to TreatmentScreen |
| MODIFY | src/navigation/types.ts | Add TreatmentScreen route params with Patient type |
| CREATE | src/screens/TreatmentScreen.tsx | Create treatment screen with prefilled patient data (if not exists) |
| MODIFY | src/screens/index.ts | Export TreatmentScreen |

> Only list concrete, verifiable file operations. No speculative directory trees.

## External References
- React Navigation Passing Parameters: https://reactnavigation.org/docs/params/
- React Native TouchableOpacity: https://reactnative.dev/docs/touchableopacity
- TypeScript Navigation Typing: https://reactnavigation.org/docs/typescript/
- React Navigation Stack Navigator: https://reactnavigation.org/docs/stack-navigator/

## Build Commands
```bash
# iOS
cd ios && pod install && cd ..
npx react-native run-ios

# Android
npx react-native run-android

# Run tests
npm test -- PatientNavigation
```

## Implementation Validation Strategy
- [ ] Unit tests pass
- [ ] Integration tests pass (if applicable)
- [ ] **[UI Tasks]** Visual comparison against wireframe completed at 375px, 768px, 1440px
- [ ] **[UI Tasks]** Run `/analyze-ux` to validate wireframe alignment
- [ ] **[Mobile Tasks]** Headless platform compilation succeeds
- [ ] **[Mobile Tasks]** Native dependency linking verified
- [ ] **[Mobile Tasks]** Permission manifests validated against task requirements
- [ ] Tapping patient item navigates to TreatmentScreen
- [ ] Patient data is correctly passed through navigation params
- [ ] TreatmentScreen displays prefilled patient data
- [ ] Visual press feedback works on both platforms
- [ ] Navigation works for all patients in the list

## Implementation Checklist
- [ ] Add onPress prop to PatientListItem component interface
- [ ] Wrap PatientListItem content in TouchableOpacity
- [ ] Add activeOpacity prop for visual feedback (0.7)
- [ ] Define TreatmentScreen route params type with Patient object
- [ ] Update navigation types with TreatmentScreen route definition
- [ ] Implement handlePatientPress function in PatientDashboardScreen
- [ ] Pass patient object through navigation.navigate params
- [ ] Retrieve route params in TreatmentScreen using useRoute hook
- [ ] Extract patient data from route params
- [ ] Prefill form fields with patient data (name, MRN, DOB, gender, admission details)
- [ ] Handle case where patient data is undefined (navigation guard)
- [ ] Add TypeScript typing for route params in TreatmentScreen
- [ ] Test navigation with different patient records
- [ ] Verify all patient fields are correctly prefilled
- [ ] Test press feedback on both iOS and Android
- [ ] Verify navigation stack behavior (back button works correctly)
- [ ] Test with patient data containing null/undefined fields
- [ ] **[UI Tasks - MANDATORY]** Reference wireframe from Design References table during implementation
- [ ] **[UI Tasks - MANDATORY]** Validate UI matches wireframe before marking task complete
- [ ] **[Mobile Tasks - MANDATORY]** Reference Mobile References table during implementation
- [ ] **[Mobile Tasks - MANDATORY]** Run headless platform builds before marking task complete
- [ ] **[Mobile Tasks - MANDATORY]** Validate permission manifests against task requirements
