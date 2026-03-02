# Task - TASK_001

## Requirement Reference
- User Story: US_014
- Story Location: .propel/context/tasks/us_014/us_014.md
- Acceptance Criteria:  
    - AC-1: Display two tabs "My Patients" and "All Patients" with patient list showing name, MRN, status badge, and last updated timestamp
    - AC-2: Navigate to treatment page when tapping patient entry with prefilled data
    - AC-4: Filter patient list when switching between tabs
- Edge Case:
    - Display empty state "No patients found. Tap 'Add New' to create a patient." when no patients exist
    - Use consistent status badge color coding

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
| **Design Tokens** | designsystem.md sections: Color Tokens, Typography, Spacing, Status Badge Colors |

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
| Frontend | TypeScript | 5.0.4 |
| Library | React Navigation | 6.1.18 |
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
Implement the Patient Dashboard screen UI components including tab navigation (My Patients/All Patients), patient list with cards, status badges, empty states, and navigation to treatment page. This task focuses on the presentational layer and component structure following React Native best practices with TypeScript.

## Dependent Tasks
- US_007 (Mock Data Models Definition) - Patient model must be defined
- US_013 (Hospital Selection Screen) - Hospital context must be available

## Impacted Components
- **NEW**: `src/screens/dashboard/PatientDashboardScreen.tsx` - Main dashboard screen
- **NEW**: `src/components/patient/PatientCard.tsx` - Patient list item component
- **NEW**: `src/components/patient/StatusBadge.tsx` - Status badge component
- **NEW**: `src/components/patient/PatientListTabs.tsx` - Tab navigation component
- **NEW**: `src/components/patient/EmptyPatientState.tsx` - Empty state component
- **MODIFY**: `src/navigation/RootNavigator.tsx` - Add dashboard navigation

## Implementation Plan
1. **Create PatientCard Component**
   - Display patient name (firstName + lastName), MRN, status badge, last updated timestamp
   - Handle tap gesture to navigate to treatment page
   - Apply design tokens for spacing, typography, colors
   - Support tablet-optimized layout (7-12.9 inch)

2. **Create StatusBadge Component**
   - Implement five status variants: Not Started, Tx In Progress, Received, Submitted, Submitted (Amended)
   - Apply consistent color coding per UXR-405
   - Use design tokens from designsystem.md

3. **Create PatientListTabs Component**
   - Implement tab navigation with "My Patients" and "All Patients" tabs
   - Apply active/inactive states with design tokens
   - Follow UXR-403 header pattern

4. **Create EmptyPatientState Component**
   - Display empty state message and Add New button
   - Follow UXR guidelines for empty states

5. **Update PatientDashboardScreen**
   - Integrate tab navigation, patient list, empty state
   - Implement section headers (Active/Completed)
   - Add header with hospital name and user context
   - Handle navigation to treatment page on patient tap

6. **Update Navigation**
   - Add PatientDashboard route to RootNavigator
   - Configure navigation from Hospital Selection to Dashboard

## Current Project State
```
src/
├── components/
│   ├── auth/
│   │   └── LoginForm.tsx
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Logo.tsx
│   ├── hospital/
│   │   ├── HospitalListItem.tsx
│   │   └── HospitalSearchBar.tsx
│   └── patient/          # NEW FOLDER
│       ├── PatientCard.tsx
│       ├── StatusBadge.tsx
│       ├── PatientListTabs.tsx
│       └── EmptyPatientState.tsx
├── screens/
│   ├── auth/
│   │   └── LoginScreen.tsx
│   ├── dashboard/
│   │   └── PatientDashboardScreen.tsx  # TO BE UPDATED
│   └── hospital/
│       └── HospitalSelectionScreen.tsx
├── models/
│   ├── Patient.ts
│   ├── TreatmentSession.ts
│   └── enums.ts
├── styles/
│   ├── colors.ts
│   ├── spacing.ts
│   └── typography.ts
└── navigation/
    └── RootNavigator.tsx
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | src/components/patient/PatientCard.tsx | Patient list item component with name, MRN, status, timestamp |
| CREATE | src/components/patient/StatusBadge.tsx | Status badge with five variants and color coding |
| CREATE | src/components/patient/PatientListTabs.tsx | Tab navigation for My Patients/All Patients |
| CREATE | src/components/patient/EmptyPatientState.tsx | Empty state with message and CTA |
| MODIFY | src/screens/dashboard/PatientDashboardScreen.tsx | Complete dashboard implementation with tabs, list, navigation |
| MODIFY | src/navigation/RootNavigator.tsx | Add dashboard route and navigation configuration |
| CREATE | src/components/patient/index.ts | Export barrel file for patient components |

## External References
- React Native Documentation: https://reactnative.dev/docs/getting-started
- React Navigation: https://reactnavigation.org/docs/getting-started
- TypeScript React Native: https://reactnative.dev/docs/typescript
- React Native Gesture Handler: https://docs.swmansion.com/react-native-gesture-handler/

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
```

## Implementation Validation Strategy
- [ ] Unit tests pass
- [ ] Integration tests pass (if applicable)
- [ ] **[UI Tasks]** Visual comparison against wireframe completed at 375px, 768px, 1440px
- [ ] **[UI Tasks]** Run `/analyze-ux` to validate wireframe alignment
- [ ] **[Mobile Tasks]** Headless platform compilation succeeds
- [ ] **[Mobile Tasks]** Native dependency linking verified
- [ ] **[Mobile Tasks]** Permission manifests validated against task requirements

## Implementation Checklist
- [ ] Create PatientCard component with proper TypeScript interfaces
- [ ] Implement StatusBadge component with five status variants
- [ ] Create PatientListTabs component with active/inactive states
- [ ] Implement EmptyPatientState component
- [ ] Update PatientDashboardScreen with tab navigation and patient list
- [ ] Add navigation handling for patient tap gesture
- [ ] Apply design tokens for colors, typography, spacing
- [ ] Implement responsive layout for 7-12.9 inch tablets
- [ ] Add section headers for Active/Completed patients
- [ ] Configure navigation routes in RootNavigator
- [ ] Test on iOS simulator/device
- [ ] Test on Android emulator/device
- [ ] Verify 44×44pt minimum touch targets (UXR-202)
- [ ] Validate color contrast ratios (UXR-201)
- [ ] **[UI Tasks - MANDATORY]** Reference wireframe from Design References table during implementation
- [ ] **[UI Tasks - MANDATORY]** Validate UI matches wireframe before marking task complete
- [ ] **[Mobile Tasks - MANDATORY]** Reference Mobile References table during implementation
- [ ] **[Mobile Tasks - MANDATORY]** Run headless platform builds before marking task complete
- [ ] **[Mobile Tasks - MANDATORY]** Validate permission manifests against task requirements
