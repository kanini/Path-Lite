# Task - TASK_002

## Requirement Reference
- User Story: US_014
- Story Location: .propel/context/tasks/us_014/us_014.md
- Acceptance Criteria:  
    - AC-1: Display patient list with name, MRN, status badge, and last updated timestamp
    - AC-4: Filter patient list to show only patients assigned to me or all patients for the hospital
    - AC-5: Reload patient data from MMKV storage and update list with latest status information
- Edge Case:
    - Display empty state when no patients exist for the hospital
    - Handle patient status badge colors consistently

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
| Library | React Native MMKV | 2.12.2 |
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
Implement state management for the Patient Dashboard including patient data retrieval from MMKV storage, filtering logic for My Patients/All Patients tabs, and data refresh functionality. This task creates the data layer and business logic using React hooks and context patterns.

## Dependent Tasks
- US_007 (Mock Data Models Definition) - Patient and TreatmentSession models required
- TASK_001 (Patient Dashboard UI Components) - UI components must be created first

## Impacted Components
- **NEW**: `src/context/PatientContext.tsx` - Patient data context provider
- **NEW**: `src/hooks/usePatientList.ts` - Custom hook for patient list logic
- **NEW**: `src/services/patientService.ts` - Patient data service layer
- **NEW**: `src/storage/patientStorage.ts` - MMKV patient storage operations
- **MODIFY**: `src/screens/dashboard/PatientDashboardScreen.tsx` - Integrate state management

## Implementation Plan
1. **Create Patient Storage Layer**
   - Implement MMKV storage operations for patient data
   - Create methods: getAllPatients, getPatientsByHospital, getPatientByMRN, savePatient, updatePatient
   - Add error handling and data validation
   - Implement JSON serialization/deserialization

2. **Create Patient Service Layer**
   - Implement business logic for patient filtering (My Patients vs All Patients)
   - Create methods for sorting patients by last updated timestamp
   - Implement grouping logic for Active/Completed sections
   - Add patient status determination logic

3. **Create PatientContext**
   - Define context interface with patient list state, loading state, error state
   - Implement context provider with MMKV integration
   - Add methods: loadPatients, refreshPatients, filterPatients
   - Handle hospital context integration

4. **Create usePatientList Hook**
   - Implement custom hook for patient list operations
   - Add filtering logic for My Patients/All Patients tabs
   - Implement pull-to-refresh functionality
   - Handle loading and error states

5. **Integrate State Management**
   - Update PatientDashboardScreen to use PatientContext
   - Connect usePatientList hook to UI components
   - Implement tab switching logic
   - Add pull-to-refresh handler

6. **Add Mock Data Generation**
   - Create mock patient data for testing
   - Populate MMKV storage with sample patients
   - Include various status types and timestamps

## Current Project State
```
src/
├── context/
│   ├── AuthContext.tsx
│   ├── HospitalContext.tsx
│   └── PatientContext.tsx        # NEW
├── hooks/
│   └── usePatientList.ts          # NEW
├── services/
│   ├── authService.ts
│   ├── hospitalService.ts
│   └── patientService.ts          # NEW
├── storage/
│   ├── mmkvStorage.ts
│   ├── authStorage.ts
│   ├── hospitalStorage.ts
│   └── patientStorage.ts          # NEW
├── models/
│   ├── Patient.ts
│   ├── TreatmentSession.ts
│   └── enums.ts
└── screens/
    └── dashboard/
        └── PatientDashboardScreen.tsx
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | src/context/PatientContext.tsx | Patient data context with state management |
| CREATE | src/hooks/usePatientList.ts | Custom hook for patient list operations |
| CREATE | src/services/patientService.ts | Business logic for patient filtering and sorting |
| CREATE | src/storage/patientStorage.ts | MMKV storage operations for patient data |
| MODIFY | src/screens/dashboard/PatientDashboardScreen.tsx | Integrate state management hooks |
| CREATE | src/data/mockPatients.ts | Mock patient data for testing |

## External References
- React Context API: https://react.dev/reference/react/useContext
- React Hooks: https://react.dev/reference/react
- React Native MMKV: https://github.com/mrousavy/react-native-mmkv
- TypeScript Generics: https://www.typescriptlang.org/docs/handbook/2/generics.html

## Build Commands
```bash
# Install dependencies
npm install

# Run on iOS
npm run ios

# Run on Android
npm run android

# Type check
npx tsc --noEmit

# Lint
npm run lint

# Test
npm test
```

## Implementation Validation Strategy
- [ ] Unit tests pass
- [ ] Integration tests pass (if applicable)
- [ ] **[Mobile Tasks]** Headless platform compilation succeeds
- [ ] **[Mobile Tasks]** Native dependency linking verified
- [ ] **[Mobile Tasks]** Permission manifests validated against task requirements

## Implementation Checklist
- [ ] Create patientStorage.ts with MMKV operations
- [ ] Implement getAllPatients, getPatientsByHospital, savePatient methods
- [ ] Add JSON serialization/deserialization with error handling
- [ ] Create patientService.ts with filtering and sorting logic
- [ ] Implement patient status determination logic
- [ ] Create PatientContext with provider and consumer hooks
- [ ] Implement loadPatients and refreshPatients methods
- [ ] Create usePatientList custom hook
- [ ] Add tab filtering logic (My Patients/All Patients)
- [ ] Implement pull-to-refresh functionality
- [ ] Update PatientDashboardScreen to use context and hooks
- [ ] Create mock patient data for testing
- [ ] Test patient list filtering on both tabs
- [ ] Test pull-to-refresh functionality
- [ ] Verify data persistence in MMKV storage
- [ ] Test empty state handling
- [ ] Write unit tests for patientService
- [ ] Write unit tests for usePatientList hook
- [ ] **[Mobile Tasks - MANDATORY]** Reference Mobile References table during implementation
- [ ] **[Mobile Tasks - MANDATORY]** Run headless platform builds before marking task complete
- [ ] **[Mobile Tasks - MANDATORY]** Validate permission manifests against task requirements
