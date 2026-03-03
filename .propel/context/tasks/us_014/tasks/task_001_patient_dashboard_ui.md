# Task - TASK_001

## Requirement Reference
- User Story: US_014
- Story Location: .propel/context/tasks/us_014/us_014.md
- Acceptance Criteria:  
    - AC1: Given I select a hospital, When the Patient Dashboard loads, Then the system displays two tabs "My Patients" and "All Patients" with patient list showing name, MRN, status badge (Not Started, Tx In Progress, Received, Submitted, Submitted (Amended)), and last updated timestamp.
    - AC4: Given I filter patients, When I switch between "My Patients" and "All Patients" tabs, Then the system filters the patient list to show only patients assigned to me or all patients for the hospital respectively.
    - AC5: Given I need to refresh data, When I pull down on the patient list, Then the system reloads patient data from MMKV storage and updates the list with latest status information.
- Edge Case:
    - What happens when no patients exist for the hospital? (Display empty state "No patients found. Tap 'Add New' to create a patient."; show Add New button prominently)
    - How does the system handle patient status badge colors? (Use consistent color coding: Not Started (gray), Tx In Progress (blue), Received (orange), Submitted (green), Submitted (Amended) (purple))

## Design References (Frontend Tasks Only)
| Reference Type | Value |
|----------------|-------|
| **UI Impact** | Yes |
| **Figma URL** | N/A |
| **Wireframe Status** | PENDING |
| **Wireframe Type** | N/A |
| **Wireframe Path/URL** | TODO: Provide wireframe - upload to `.propel/context/wireframes/Hi-Fi/wireframe-SCR-003-patient-dashboard.[html|png|jpg]` or add external URL |
| **Screen Spec** | figma_spec.md#SCR-003 |
| **UXR Requirements** | UXR-001, UXR-403, UXR-405, UXR-506, UXR-507 |
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
| Library | React Native Gesture Handler | 2.14.0 |

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
Implement the Patient Dashboard screen with tabbed navigation ("My Patients" and "All Patients"), patient list display with status badges, pull-to-refresh functionality, and empty state handling. This screen serves as the main entry point for nurses to view and manage patients for their selected hospital.

## Dependent Tasks
- US_013 (Hospital Selection Screen) - Must be completed to provide hospital context
- US_007 (Mock Data Models Definition) - Patient model and mock data must be available

## Impacted Components
- **NEW**: `src/screens/PatientDashboardScreen.tsx` - Main dashboard screen component
- **NEW**: `src/components/PatientListItem.tsx` - Individual patient list item component
- **NEW**: `src/components/StatusBadge.tsx` - Reusable status badge component
- **NEW**: `src/components/EmptyState.tsx` - Empty state component for no patients
- **NEW**: `src/hooks/usePatientData.ts` - Custom hook for patient data management
- **MODIFY**: `src/navigation/types.ts` - Add PatientDashboard route type
- **MODIFY**: `src/screens/index.ts` - Export new screen component

## Implementation Plan
1. **Create StatusBadge component** with color-coded status display (gray, blue, orange, green, purple)
2. **Create PatientListItem component** displaying patient name, MRN, status badge, and last updated timestamp
3. **Create EmptyState component** for "No patients found" scenario with prominent Add New button
4. **Create usePatientData custom hook** to manage patient data fetching from MMKV storage with filtering logic
5. **Implement PatientDashboardScreen** with React Navigation Tab Navigator for "My Patients" and "All Patients" tabs
6. **Add pull-to-refresh functionality** using RefreshControl component
7. **Implement tab filtering logic** to show assigned patients vs all patients
8. **Add navigation types** for PatientDashboard route in navigation types file
9. **Test on both iOS and Android** to ensure consistent UI and functionality

## Current Project State
```
src/
├── components/
│   ├── README.md
│   └── index.ts
├── screens/
│   ├── README.md
│   └── index.ts
├── models/
│   ├── Patient.ts (existing)
│   ├── enums.ts (existing)
│   └── index.ts
├── data/
│   ├── mockPatients.ts (existing)
│   └── index.ts
├── storage/
│   ├── MMKVStorage.ts (existing)
│   └── PHIStorage.ts (existing)
├── navigation/
│   └── types.ts (existing)
└── hooks/ (to be created)
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | src/components/StatusBadge.tsx | Reusable status badge component with color-coded status display |
| CREATE | src/components/PatientListItem.tsx | Patient list item component showing name, MRN, status, timestamp |
| CREATE | src/components/EmptyState.tsx | Empty state component for no patients scenario |
| CREATE | src/hooks/usePatientData.ts | Custom hook for patient data management and filtering |
| CREATE | src/screens/PatientDashboardScreen.tsx | Main patient dashboard screen with tabs and patient list |
| MODIFY | src/navigation/types.ts | Add PatientDashboard route type definition |
| MODIFY | src/components/index.ts | Export new components |
| MODIFY | src/screens/index.ts | Export PatientDashboardScreen |
| CREATE | src/hooks/index.ts | Export custom hooks |

> Only list concrete, verifiable file operations. No speculative directory trees.

## External References
- React Native FlatList: https://reactnative.dev/docs/flatlist
- React Native RefreshControl: https://reactnative.dev/docs/refreshcontrol
- React Navigation Tab Navigator: https://reactnavigation.org/docs/material-top-tab-navigator/
- React Native MMKV: https://github.com/mrousavy/react-native-mmkv
- React Hooks Best Practices: https://react.dev/reference/react

## Build Commands
```bash
# iOS
cd ios && pod install && cd ..
npx react-native run-ios

# Android
npx react-native run-android

# Run tests
npm test -- PatientDashboardScreen
```

## Implementation Validation Strategy
- [ ] Unit tests pass
- [ ] Integration tests pass (if applicable)
- [ ] **[UI Tasks]** Visual comparison against wireframe completed at 375px, 768px, 1440px
- [ ] **[UI Tasks]** Run `/analyze-ux` to validate wireframe alignment
- [ ] **[Mobile Tasks]** Headless platform compilation succeeds
- [ ] **[Mobile Tasks]** Native dependency linking verified
- [ ] **[Mobile Tasks]** Permission manifests validated against task requirements
- [ ] Pull-to-refresh functionality works on both platforms
- [ ] Tab switching filters patient list correctly
- [ ] Status badges display correct colors for all status types
- [ ] Empty state displays when no patients exist
- [ ] Patient list scrolls smoothly with 10+ patients

## Implementation Checklist
- [ ] Create StatusBadge component with TypeScript interface for status types
- [ ] Implement color mapping for all 5 status types (Not Started, Tx In Progress, Received, Submitted, Submitted (Amended))
- [ ] Create PatientListItem component with proper TypeScript props interface
- [ ] Display patient name (firstName + lastName), MRN, status badge, and timestamp in list item
- [ ] Create EmptyState component with message and Add New button
- [ ] Create usePatientData custom hook with MMKV storage integration
- [ ] Implement patient filtering logic for "My Patients" vs "All Patients"
- [ ] Create PatientDashboardScreen with Material Top Tab Navigator
- [ ] Add "My Patients" and "All Patients" tabs
- [ ] Implement FlatList with RefreshControl for pull-to-refresh
- [ ] Add loading state during data refresh
- [ ] Handle empty state when no patients exist for hospital
- [ ] Update navigation types with PatientDashboard route
- [ ] Export all new components and screen in index files
- [ ] Test tab switching functionality
- [ ] Test pull-to-refresh on both iOS and Android
- [ ] Verify status badge colors match specification
- [ ] Test with 0 patients, 1 patient, and 10+ patients
- [ ] Verify proper TypeScript typing for all components
- [ ] **[UI Tasks - MANDATORY]** Reference wireframe from Design References table during implementation
- [ ] **[UI Tasks - MANDATORY]** Validate UI matches wireframe before marking task complete
- [ ] **[Mobile Tasks - MANDATORY]** Reference Mobile References table during implementation
- [ ] **[Mobile Tasks - MANDATORY]** Run headless platform builds before marking task complete
- [ ] **[Mobile Tasks - MANDATORY]** Validate permission manifests against task requirements
