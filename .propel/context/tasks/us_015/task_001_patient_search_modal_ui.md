# Task - TASK_001

## Requirement Reference
- User Story: US_015
- Story Location: .propel/context/tasks/us_015/us_015.md
- Acceptance Criteria:  
    - AC-1: Display input fields for First Name, Last Name, MRN (marked as required), DOB, and Admission/Encounter Number with Search button initially disabled
    - AC-2: Enable Search button when MRN and one additional field are filled; display tooltip "Minimum 2 fields including MRN required" when criteria not met
- Edge Case:
    - MRN format validation: Enforce numeric-only input with regex; display error "MRN must be numeric" for invalid input

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
Create a reusable Patient Recall Search Modal component that provides a form-based interface for searching existing patients by MRN and additional criteria. The modal implements conditional button enabling, real-time validation, and MRN format enforcement. This component serves as the entry point for patient lookup before creating new treatment records.

## Dependent Tasks
- None (foundational UI component)

## Impacted Components
- **NEW**: `src/components/patient/PatientSearchModal.tsx` - Main modal component
- **NEW**: `src/components/patient/index.ts` - Export barrel file
- **UPDATED**: `src/components/index.ts` - Add patient components export

## Implementation Plan
1. **Create PatientSearchModal Component Structure**
   - Set up functional component with TypeScript interfaces for props
   - Define state management for form fields (firstName, lastName, mrn, dob, admissionNumber)
   - Implement modal visibility control with onClose and onSearch callbacks

2. **Implement Form Input Fields**
   - Reuse existing `Input` component from `src/components/common/Input.tsx`
   - Create 5 input fields: First Name, Last Name, MRN (mandatory), DOB, Admission Number
   - Apply MRN numeric-only validation using regex pattern `/^\d*$/`
   - Display error message "MRN must be numeric" for invalid MRN input

3. **Implement Conditional Search Button Logic**
   - Track filled field count (excluding empty strings)
   - Enable Search button only when: MRN is filled AND at least one other field is filled
   - Disable button when criteria not met
   - Add tooltip/helper text: "Minimum 2 fields including MRN required"

4. **Apply Styling and Layout**
   - Use existing design tokens from `src/styles/colors.ts`, `typography.ts`, `spacing.ts`
   - Create modal overlay with centered content card
   - Apply proper spacing between form fields (spacing.lg)
   - Style Search button using existing Button component variants

5. **Implement Accessibility Features**
   - Add proper accessibilityLabel for all inputs
   - Mark MRN field as required with accessibilityHint
   - Ensure keyboard navigation works correctly
   - Add accessibilityRole="button" for Search button

6. **Add Modal Dismiss Functionality**
   - Implement backdrop press to close modal
   - Add close button (X icon) in modal header
   - Clear form state on modal close

## Current Project State
```
src/
├── components/
│   ├── common/
│   │   ├── Button.tsx (existing - reuse)
│   │   ├── Input.tsx (existing - reuse)
│   │   └── Logo.tsx
│   ├── patient/
│   │   └── (empty - will add PatientSearchModal.tsx)
│   └── index.ts
├── styles/
│   ├── colors.ts (existing design tokens)
│   ├── typography.ts (existing typography)
│   └── spacing.ts (existing spacing)
└── models/
    └── Patient.ts (existing Patient interface)
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | d:\Path_Lite\src\components\patient\PatientSearchModal.tsx | Patient search modal component with form inputs, validation, and conditional button logic |
| CREATE | d:\Path_Lite\src\components\patient\index.ts | Export barrel file for patient components |
| MODIFY | d:\Path_Lite\src\components\index.ts | Add export for patient components |

> Only list concrete, verifiable file operations. No speculative directory trees.

## External References
- React Native Modal: https://reactnative.dev/docs/modal
- React Native Keyboard Handling: https://reactnative.dev/docs/keyboard
- React Hook Form (if needed): https://react-hook-form.com/
- Date Picker Library: https://github.com/react-native-datetimepicker/datetimepicker

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
- [x] Create `PatientSearchModal.tsx` with TypeScript interfaces
- [x] Define state for form fields: firstName, lastName, mrn, dob, admissionNumber
- [x] Implement modal visibility control with Modal component
- [x] Add 5 Input fields using existing Input component
- [x] Implement MRN numeric validation with regex `/^\d*$/`
- [x] Display error "MRN must be numeric" for invalid MRN
- [x] Implement conditional button enabling logic (MRN + 1 other field)
- [x] Add helper text "Minimum 2 fields including MRN required"
- [x] Style modal with overlay, centered card, proper spacing
- [x] Add close button and backdrop dismiss functionality
- [x] Implement onSearch callback with form data
- [x] Add accessibility labels and hints for all inputs
- [x] Test keyboard navigation and focus management
- [x] Create patient component barrel export file
- [x] Update main components index.ts
- [x] Verify iOS and Android compilation succeeds
- [x] Test on both platforms with different screen sizes
- **[UI Tasks - MANDATORY]** Reference wireframe from Design References table during implementation
- **[UI Tasks - MANDATORY]** Validate UI matches wireframe before marking task complete
- **[Mobile Tasks - MANDATORY]** Reference Mobile References table during implementation
- **[Mobile Tasks - MANDATORY]** Run headless platform builds before marking task complete
- **[Mobile Tasks - MANDATORY]** Validate permission manifests against task requirements
