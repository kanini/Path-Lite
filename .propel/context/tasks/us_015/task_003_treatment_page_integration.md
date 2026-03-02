# Task - TASK_003

## Requirement Reference
- User Story: US_015
- Story Location: .propel/context/tasks/us_015/us_015.md
- Acceptance Criteria:  
    - AC-1: When "Add New" is tapped and Hemodialysis is selected, Patient Recall Search popup opens
    - AC-4: When matching patient is found, close popup, redirect to treatment page, and prefill form fields with mock patient data (name, MRN, DOB, gender, admission details)
    - AC-5: When no matching patient is found, display "No matching patients found. Create new treatment" message with "Create New Treatment" button that redirects to empty treatment form
- Edge Case:
    - None specific to this integration task

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
Integrate Patient Recall Search Modal into the treatment creation flow, connecting the "Add New" button trigger with the search modal, and implementing navigation to the treatment form page with optional patient data prefilling. This task completes the end-to-end user journey from patient search to treatment form.

## Dependent Tasks
- TASK_001 (Patient Search Modal UI) - Provides the search modal component
- TASK_002 (Patient Search Logic) - Provides search execution and result handling
- US_014 (Patient Dashboard Implementation) - Provides the "Add New" button context

## Impacted Components
- **NEW**: `src/screens/TreatmentFormScreen.tsx` - Treatment form screen with optional prefill
- **UPDATED**: `src/screens/PatientDashboardScreen.tsx` - Add modal trigger and navigation logic
- **UPDATED**: `src/navigation/AppNavigator.tsx` - Add TreatmentForm screen route
- **NEW**: `src/types/navigation.ts` - Define navigation params with optional patient data

## Implementation Plan
1. **Define Navigation Types**
   - Create `src/types/navigation.ts` with navigation param types
   - Define `TreatmentFormParams` interface with optional `patient?: Patient` parameter
   - Export RootStackParamList with all screen routes

2. **Create TreatmentFormScreen**
   - Build treatment form screen component with React Navigation
   - Accept route params with optional patient data
   - Create form fields: First Name, Last Name, MRN, DOB, Gender, Admission Number, Room Number, Treatment Location
   - Implement prefill logic: if patient data exists in route params, populate form fields
   - If no patient data, render empty form
   - Use existing Input component for form fields

3. **Update PatientDashboardScreen**
   - Add state for PatientSearchModal visibility
   - Implement "Add New" button onPress handler to show modal
   - Integrate PatientSearchModal component with callbacks:
     - `onPatientSelected`: Navigate to TreatmentForm with patient data
     - `onCreateNew`: Navigate to TreatmentForm without patient data
     - `onClose`: Hide modal
   - Handle modal visibility state management

4. **Update AppNavigator**
   - Add TreatmentForm screen to stack navigator
   - Configure screen options (title, header style)
   - Ensure proper navigation flow from PatientDashboard → TreatmentForm

5. **Implement Form Prefill Logic**
   - In TreatmentFormScreen, check for route.params.patient
   - If patient exists, use useEffect to populate form state with patient data:
     - firstName: patient.firstName
     - lastName: patient.lastName
     - mrn: patient.mrn
     - dob: patient.dob (formatted)
     - gender: patient.gender
     - admissionNumber: patient.admissionNumber
     - roomNumber: patient.roomNumber
     - treatmentLocation: patient.treatmentLocation
   - If no patient, initialize form with empty values

6. **Add Form Submission Handler**
   - Implement "Save Treatment" button
   - Validate required fields before submission
   - Show success message on save (placeholder for future backend integration)
   - Navigate back to PatientDashboard on successful save

## Current Project State
```
src/
├── screens/
│   ├── PatientDashboardScreen.tsx (from US_014 - needs update)
│   └── (will add TreatmentFormScreen.tsx)
├── navigation/
│   └── AppNavigator.tsx (existing - needs route addition)
├── components/
│   └── patient/
│       ├── PatientSearchModal.tsx (from TASK_001)
│       ├── PatientSearchProgress.tsx (from TASK_002)
│       └── PatientSearchResults.tsx (from TASK_002)
├── types/
│   └── (will add navigation.ts)
└── models/
    └── Patient.ts (existing)
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | d:\Path_Lite\src\types\navigation.ts | Navigation parameter types with TreatmentFormParams |
| CREATE | d:\Path_Lite\src\screens\TreatmentFormScreen.tsx | Treatment form screen with optional patient prefill |
| MODIFY | d:\Path_Lite\src\screens\PatientDashboardScreen.tsx | Add PatientSearchModal integration and navigation handlers |
| MODIFY | d:\Path_Lite\src\navigation\AppNavigator.tsx | Add TreatmentForm screen route |

> Only list concrete, verifiable file operations. No speculative directory trees.

## External References
- React Navigation Stack Navigator: https://reactnavigation.org/docs/stack-navigator
- React Navigation Params: https://reactnavigation.org/docs/params
- React Navigation TypeScript: https://reactnavigation.org/docs/typescript
- React Hook Form: https://react-hook-form.com/get-started#ReactNative

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
- [ ] Create navigation.ts with TreatmentFormParams interface
- [ ] Define RootStackParamList with all screen routes
- [ ] Create TreatmentFormScreen component with navigation typing
- [ ] Add form fields: First Name, Last Name, MRN, DOB, Gender, Admission Number, Room Number, Treatment Location
- [ ] Implement prefill logic using route.params.patient
- [ ] Handle empty form state when no patient data provided
- [ ] Update PatientDashboardScreen with modal state management
- [ ] Add "Add New" button handler to show PatientSearchModal
- [ ] Implement onPatientSelected callback with navigation to TreatmentForm
- [ ] Implement onCreateNew callback with navigation to empty TreatmentForm
- [ ] Implement onClose callback to hide modal
- [ ] Update AppNavigator with TreatmentForm screen route
- [ ] Configure screen options (title, header)
- [ ] Add "Save Treatment" button with validation
- [ ] Implement form submission handler (placeholder)
- [ ] Test complete flow: Add New → Search → Prefill → Save
- [ ] Test complete flow: Add New → Search → No Match → Create New → Empty Form
- [ ] Test complete flow: Add New → Search → Multiple Matches → Select → Prefill
- [ ] Verify navigation back to PatientDashboard after save
- [ ] Test on iOS and Android devices
- [ ] Verify form prefill with all patient data fields
- **[UI Tasks - MANDATORY]** Reference wireframe from Design References table during implementation
- **[UI Tasks - MANDATORY]** Validate UI matches wireframe before marking task complete
- **[Mobile Tasks - MANDATORY]** Reference Mobile References table during implementation
- **[Mobile Tasks - MANDATORY]** Run headless platform builds before marking task complete
- **[Mobile Tasks - MANDATORY]** Validate permission manifests against task requirements
