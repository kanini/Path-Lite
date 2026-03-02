# Task - TASK_005

## Requirement Reference
- User Story: US_014
- Story Location: .propel/context/tasks/us_014/us_014.md
- Acceptance Criteria:  
    - AC-1: Display two tabs "My Patients" and "All Patients" with patient list
    - AC-2: Navigate to treatment page when tapping patient entry
    - AC-3: Display treatment type selection and Patient Recall Search popup
    - AC-4: Filter patient list when switching between tabs
    - AC-5: Reload patient data from MMKV storage on pull-to-refresh
- Edge Case:
    - Display empty state when no patients exist
    - Handle status badge colors consistently

## Design References (Frontend Tasks Only)
| Reference Type | Value |
|----------------|-------|
| **UI Impact** | No |
| **Figma URL** | N/A |
| **Wireframe Status** | N/A |
| **Wireframe Type** | N/A |
| **Wireframe Path/URL** | N/A |
| **Screen Spec** | N/A |
| **UXR Requirements** | N/A |
| **Design Tokens** | N/A |

> **Wireframe Status Legend:**
> - **AVAILABLE**: Local file exists at specified path
> - **PENDING**: UI-impacting task awaiting wireframe (provide file or URL)
> - **EXTERNAL**: Wireframe provided via external URL
> - **N/A**: Task has no UI impact
>
> If UI Impact = No, all design references should be N/A

## Applicable Technology Stack
| Layer | Technology | Version |
|-------|------------|---------|
| Frontend | React Native | 0.73.0 |
| Frontend | React | 18.2.0 |
| Frontend | TypeScript | 5.0.4 |
| Library | Jest | 29.6.3 |
| Library | React Test Renderer | 18.2.0 |
| Library | React Native Testing Library | (to be added) |
| Mobile | React Native | 0.73.0 |

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
Implement comprehensive unit and integration tests for the Patient Dashboard functionality including component tests, state management tests, and integration tests for the complete user flows. This task ensures code quality, reliability, and maintainability of the Patient Dashboard feature.

## Dependent Tasks
- TASK_001 (Patient Dashboard UI Components) - Components to be tested
- TASK_002 (Patient List State Management) - State management to be tested
- TASK_003 (Add New Patient Flow Integration) - Flow to be tested
- TASK_004 (Pull-to-Refresh Implementation) - Refresh functionality to be tested

## Impacted Components
- **NEW**: `src/components/patient/__tests__/PatientCard.test.tsx` - PatientCard component tests
- **NEW**: `src/components/patient/__tests__/StatusBadge.test.tsx` - StatusBadge component tests
- **NEW**: `src/components/patient/__tests__/PatientListTabs.test.tsx` - Tab component tests
- **NEW**: `src/components/patient/__tests__/EmptyPatientState.test.tsx` - Empty state tests
- **NEW**: `src/components/patient/__tests__/AddNewPatientButton.test.tsx` - Add New button tests
- **NEW**: `src/hooks/__tests__/usePatientList.test.ts` - usePatientList hook tests
- **NEW**: `src/services/__tests__/patientService.test.ts` - Patient service tests
- **NEW**: `src/screens/dashboard/__tests__/PatientDashboardScreen.test.tsx` - Dashboard integration tests

## Implementation Plan
1. **Setup Testing Infrastructure**
   - Install @testing-library/react-native if not present
   - Configure Jest for React Native testing
   - Setup test utilities and mock helpers
   - Create mock data fixtures for patients

2. **Component Unit Tests**
   - Test PatientCard rendering with patient data
   - Test StatusBadge with all five status variants
   - Test PatientListTabs tab switching
   - Test EmptyPatientState rendering
   - Test AddNewPatientButton tap handling
   - Test TreatmentTypeSelector modal behavior

3. **Hook Unit Tests**
   - Test usePatientList filtering logic (My Patients/All Patients)
   - Test patient list sorting by timestamp
   - Test refresh functionality
   - Test loading and error states
   - Test empty state handling

4. **Service Unit Tests**
   - Test patientService filtering methods
   - Test patient grouping (Active/Completed)
   - Test patient status determination
   - Test sorting algorithms

5. **Storage Unit Tests**
   - Test MMKV patient storage operations
   - Test data serialization/deserialization
   - Test error handling for invalid JSON
   - Test concurrent access scenarios

6. **Integration Tests**
   - Test complete patient dashboard rendering
   - Test tab switching with data filtering
   - Test patient card tap navigation
   - Test Add New flow navigation
   - Test pull-to-refresh data reload
   - Test empty state display

7. **Snapshot Tests**
   - Create snapshots for all components
   - Verify UI consistency across changes

## Current Project State
```
src/
├── components/
│   └── patient/
│       ├── __tests__/                    # NEW FOLDER
│       │   ├── PatientCard.test.tsx
│       │   ├── StatusBadge.test.tsx
│       │   ├── PatientListTabs.test.tsx
│       │   ├── EmptyPatientState.test.tsx
│       │   ├── AddNewPatientButton.test.tsx
│       │   └── TreatmentTypeSelector.test.tsx
│       ├── PatientCard.tsx
│       ├── StatusBadge.tsx
│       ├── PatientListTabs.tsx
│       ├── EmptyPatientState.tsx
│       ├── AddNewPatientButton.tsx
│       └── TreatmentTypeSelector.tsx
├── hooks/
│   ├── __tests__/                        # NEW FOLDER
│   │   └── usePatientList.test.ts
│   └── usePatientList.ts
├── services/
│   ├── __tests__/                        # NEW FOLDER
│   │   └── patientService.test.ts
│   └── patientService.ts
├── storage/
│   ├── __tests__/                        # NEW FOLDER
│   │   └── patientStorage.test.ts
│   └── patientStorage.ts
└── screens/
    └── dashboard/
        ├── __tests__/                    # NEW FOLDER
        │   └── PatientDashboardScreen.test.tsx
        └── PatientDashboardScreen.tsx
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | src/components/patient/__tests__/PatientCard.test.tsx | Unit tests for PatientCard component |
| CREATE | src/components/patient/__tests__/StatusBadge.test.tsx | Unit tests for StatusBadge component |
| CREATE | src/components/patient/__tests__/PatientListTabs.test.tsx | Unit tests for tab navigation |
| CREATE | src/components/patient/__tests__/EmptyPatientState.test.tsx | Unit tests for empty state |
| CREATE | src/components/patient/__tests__/AddNewPatientButton.test.tsx | Unit tests for Add New button |
| CREATE | src/components/patient/__tests__/TreatmentTypeSelector.test.tsx | Unit tests for treatment selector |
| CREATE | src/hooks/__tests__/usePatientList.test.ts | Unit tests for usePatientList hook |
| CREATE | src/services/__tests__/patientService.test.ts | Unit tests for patient service |
| CREATE | src/storage/__tests__/patientStorage.test.ts | Unit tests for patient storage |
| CREATE | src/screens/dashboard/__tests__/PatientDashboardScreen.test.tsx | Integration tests for dashboard |
| CREATE | src/__tests__/utils/mockPatients.ts | Mock patient data fixtures |
| CREATE | src/__tests__/utils/testHelpers.ts | Test utility functions |

## External References
- React Native Testing Library: https://callstack.github.io/react-native-testing-library/
- Jest Documentation: https://jestjs.io/docs/getting-started
- Testing React Hooks: https://react-hooks-testing-library.com/
- React Testing Best Practices: https://kentcdodds.com/blog/common-mistakes-with-react-testing-library

## Build Commands
```bash
# Install testing dependencies
npm install --save-dev @testing-library/react-native @testing-library/jest-native

# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test PatientCard.test.tsx

# Type check
npx tsc --noEmit
```

## Implementation Validation Strategy
- [ ] Unit tests pass
- [ ] Integration tests pass (if applicable)
- [ ] **[Mobile Tasks]** Headless platform compilation succeeds
- [ ] **[Mobile Tasks]** Native dependency linking verified
- [ ] **[Mobile Tasks]** Permission manifests validated against task requirements

## Implementation Checklist
- [x] Install @testing-library/react-native and @testing-library/jest-native
- [x] Configure Jest for React Native in jest.config.js
- [x] Create mock patient data fixtures
- [x] Create test helper utilities
- [x] Write PatientCard component tests (rendering, props, tap handling)
- [x] Write StatusBadge component tests (all five variants, colors)
- [x] Write PatientListTabs tests (tab switching, active state)
- [x] Write EmptyPatientState tests (rendering, button tap)
- [x] Write AddNewPatientButton tests (tap handling, modal trigger)
- [x] Write TreatmentTypeSelector tests (modal display, selection)
- [x] Write usePatientList hook tests (filtering, sorting, refresh)
- [x] Write patientService tests (filtering logic, grouping, status)
- [x] Write patientStorage tests (CRUD operations, error handling)
- [x] Write PatientDashboardScreen integration tests (full flow)
- [x] Create snapshot tests for all components
- [x] Test tab switching with data filtering
- [x] Test patient card navigation
- [x] Test Add New flow
- [x] Test pull-to-refresh
- [x] Test empty state display
- [x] Achieve minimum 80% code coverage
- [x] Verify all tests pass on CI/CD pipeline
- [x] Document test patterns and conventions
- [x] **[Mobile Tasks - MANDATORY]** Reference Mobile References table during implementation
- [x] **[Mobile Tasks - MANDATORY]** Run headless platform builds before marking task complete
- [x] **[Mobile Tasks - MANDATORY]** Validate permission manifests against task requirements
