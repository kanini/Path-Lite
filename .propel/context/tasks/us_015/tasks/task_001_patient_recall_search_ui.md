# Task - TASK_001

## Requirement Reference
- User Story: US_015
- Story Location: .propel/context/tasks/us_015/us_015.md
- Acceptance Criteria:  
    - AC1: Given I tap "Add New" and select Hemodialysis, When the Patient Recall Search popup opens, Then the system displays input fields for First Name, Last Name, MRN (marked as required), DOB, and Admission/Encounter Number with Search button initially disabled.
    - AC2: Given I enter search criteria, When I fill in MRN and one additional field, Then the system enables the Search button and displays tooltip "Minimum 2 fields including MRN required" when criteria not met.
- Edge Case:
    - How does the system handle MRN format validation? (Enforce numeric-only input with regex; display error "MRN must be numeric" for invalid input)

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
| Library | React Native | 0.73.0 |
| Library | Yup | 1.3.0 |

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
Implement the Patient Recall Search popup UI with input fields for patient search criteria (First Name, Last Name, MRN, DOB, Admission/Encounter Number), dynamic Search button enabling based on validation rules, MRN format validation, and tooltip display for validation feedback.

## Dependent Tasks
- US_014 TASK_003 (Add New Patient Flow) - Must trigger this popup
- US_007 (Mock Data Models Definition) - Patient model must be available

## Impacted Components
- **NEW**: `src/components/PatientRecallSearchPopup.tsx` - Main popup component
- **NEW**: `src/components/FormInput.tsx` - Reusable form input component with validation
- **NEW**: `src/components/Tooltip.tsx` - Tooltip component for validation messages
- **NEW**: `src/hooks/usePatientSearchValidation.ts` - Custom hook for search validation logic
- **NEW**: `src/validation/PatientSearchValidation.ts` - Validation schema for patient search
- **MODIFY**: `src/components/index.ts` - Export new components

## Implementation Plan
1. **Create FormInput component** with label, placeholder, required indicator, error state, and validation support
2. **Create Tooltip component** for displaying validation messages
3. **Create PatientSearchValidation schema** using Yup for MRN format and field requirements
4. **Create usePatientSearchValidation hook** to manage form state and validation logic
5. **Implement PatientRecallSearchPopup component** with Modal wrapper and form fields
6. **Add MRN numeric validation** with regex pattern and error display
7. **Implement dynamic Search button enabling** based on "MRN + 1 additional field" rule
8. **Add tooltip display logic** for validation feedback
9. **Style popup** with proper spacing, typography, and accessibility
10. **Test on both iOS and Android** for consistent behavior

## Current Project State
```
src/
├── components/
│   ├── PatientListItem.tsx (existing)
│   ├── StatusBadge.tsx (existing)
│   ├── FormInput.tsx (to be created)
│   ├── Tooltip.tsx (to be created)
│   ├── PatientRecallSearchPopup.tsx (to be created)
│   └── index.ts
├── hooks/
│   ├── usePatientData.ts (existing)
│   ├── usePatientSearchValidation.ts (to be created)
│   └── index.ts
├── validation/
│   ├── PatientSearchValidation.ts (to be created)
│   └── index.ts
└── models/
    └── Patient.ts (existing)
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | src/components/FormInput.tsx | Reusable form input component with validation support |
| CREATE | src/components/Tooltip.tsx | Tooltip component for validation messages |
| CREATE | src/components/PatientRecallSearchPopup.tsx | Patient recall search popup modal component |
| CREATE | src/hooks/usePatientSearchValidation.ts | Custom hook for patient search form validation |
| CREATE | src/validation/PatientSearchValidation.ts | Yup validation schema for patient search |
| MODIFY | src/components/index.ts | Export FormInput, Tooltip, PatientRecallSearchPopup |
| MODIFY | src/hooks/index.ts | Export usePatientSearchValidation |
| CREATE | src/validation/index.ts | Export PatientSearchValidation |

> Only list concrete, verifiable file operations. No speculative directory trees.

## External References
- React Native Modal: https://reactnative.dev/docs/modal
- React Native TextInput: https://reactnative.dev/docs/textinput
- Yup Validation: https://github.com/jquense/yup
- React Hooks Form Validation: https://react.dev/reference/react/useState
- React Native DateTimePicker: https://github.com/react-native-datetimepicker/datetimepicker

## Build Commands
```bash
# Install date picker dependency
npm install @react-native-community/datetimepicker

# iOS
cd ios && pod install && cd ..
npx react-native run-ios

# Android
npx react-native run-android

# Run tests
npm test -- PatientRecallSearchPopup
```

## Implementation Validation Strategy
- [ ] Unit tests pass
- [ ] Integration tests pass (if applicable)
- [ ] **[UI Tasks]** Visual comparison against wireframe completed at 375px, 768px, 1440px
- [ ] **[UI Tasks]** Run `/analyze-ux` to validate wireframe alignment
- [ ] **[Mobile Tasks]** Headless platform compilation succeeds
- [ ] **[Mobile Tasks]** Native dependency linking verified
- [ ] **[Mobile Tasks]** Permission manifests validated against task requirements
- [ ] Popup opens when triggered from Add New flow
- [ ] All input fields are displayed correctly
- [ ] MRN field is marked as required
- [ ] Search button is disabled initially
- [ ] Search button enables when MRN + 1 field are filled
- [ ] MRN numeric validation works correctly
- [ ] Tooltip displays validation messages
- [ ] Popup dismisses correctly

## Implementation Checklist
- [ ] Create FormInput component with TypeScript interface for props
- [ ] Add label, placeholder, value, onChangeText, error, required props
- [ ] Implement error state styling for FormInput
- [ ] Add required indicator (*) to FormInput label
- [ ] Create Tooltip component with message and position props
- [ ] Implement tooltip positioning logic (above/below input)
- [ ] Create PatientSearchValidation schema with Yup
- [ ] Add MRN numeric validation rule (regex: /^\d+$/)
- [ ] Add minimum 2 fields validation rule (MRN + 1 additional)
- [ ] Create usePatientSearchValidation hook
- [ ] Add state for all form fields (firstName, lastName, mrn, dob, admissionNumber)
- [ ] Add state for validation errors
- [ ] Implement field change handlers with validation
- [ ] Implement isSearchEnabled computed value based on validation
- [ ] Create PatientRecallSearchPopup component with Modal
- [ ] Add visible prop to control popup visibility
- [ ] Add onClose prop for dismissal
- [ ] Add onSearch prop for search action
- [ ] Render FormInput for First Name field
- [ ] Render FormInput for Last Name field
- [ ] Render FormInput for MRN field (marked required, numeric keyboard)
- [ ] Render FormInput for DOB field (with date picker)
- [ ] Render FormInput for Admission/Encounter Number field
- [ ] Add Search button with disabled state based on validation
- [ ] Add Cancel button to close popup
- [ ] Display tooltip "Minimum 2 fields including MRN required" when validation fails
- [ ] Add MRN format error message "MRN must be numeric"
- [ ] Style popup with proper padding, spacing, and layout
- [ ] Add keyboard avoidance for iOS
- [ ] Test popup opening and closing
- [ ] Test MRN numeric validation with invalid input
- [ ] Test Search button enabling with various field combinations
- [ ] Test tooltip display on validation failure
- [ ] Test date picker functionality for DOB field
- [ ] Verify accessibility (labels, hints, keyboard navigation)
- [ ] Test on both iOS and Android platforms
- [ ] **[UI Tasks - MANDATORY]** Reference wireframe from Design References table during implementation
- [ ] **[UI Tasks - MANDATORY]** Validate UI matches wireframe before marking task complete
- [ ] **[Mobile Tasks - MANDATORY]** Reference Mobile References table during implementation
- [ ] **[Mobile Tasks - MANDATORY]** Run headless platform builds before marking task complete
- [ ] **[Mobile Tasks - MANDATORY]** Validate permission manifests against task requirements
