# Task - TASK_003

## Requirement Reference
- User Story: US_014
- Story Location: .propel/context/tasks/us_014/us_014.md
- Acceptance Criteria:  
    - AC-3: Display treatment type selection dropdown with "Hemodialysis" option and open Patient Recall Search popup after selection when tapping "Add New" button
- Edge Case:
    - Handle treatment type selection flow properly
    - Ensure proper navigation to Patient Recall Search modal

## Design References (Frontend Tasks Only)
| Reference Type | Value |
|----------------|-------|
| **UI Impact** | Yes |
| **Figma URL** | N/A |
| **Wireframe Status** | PENDING |
| **Wireframe Type** | N/A |
| **Wireframe Path/URL** | TODO: Provide wireframe - upload to `.propel/context/wireframes/Hi-Fi/wireframe-SCR-005-treatment-type-selection.[html|png|jpg]` or add external URL |
| **Screen Spec** | figma_spec.md#SCR-005 |
| **UXR Requirements** | UXR-001 |
| **Design Tokens** | designsystem.md sections: Color Tokens, Typography, Spacing |

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
Implement the "Add New" patient flow including the treatment type selection dropdown and navigation to Patient Recall Search modal. This task creates the UI components and navigation logic for initiating new patient entries from the Patient Dashboard.

## Dependent Tasks
- TASK_001 (Patient Dashboard UI Components) - Dashboard UI must be implemented
- US_013 (Hospital Selection Screen) - Hospital context required

## Impacted Components
- **NEW**: `src/components/patient/TreatmentTypeSelector.tsx` - Treatment type dropdown component
- **NEW**: `src/components/patient/AddNewPatientButton.tsx` - Add New button component
- **MODIFY**: `src/screens/dashboard/PatientDashboardScreen.tsx` - Integrate Add New flow
- **MODIFY**: `src/navigation/RootNavigator.tsx` - Add modal navigation for Patient Recall Search

## Implementation Plan
1. **Create AddNewPatientButton Component**
   - Implement button with "Add New" label
   - Apply design tokens for primary button styling
   - Handle tap gesture to show treatment type selector
   - Position in dashboard header or floating action button

2. **Create TreatmentTypeSelector Component**
   - Implement dropdown/action sheet with treatment type options
   - Include "Hemodialysis" option (Phase 1 only)
   - Apply design tokens for modal/dropdown styling
   - Handle selection and dismiss actions

3. **Implement Navigation Flow**
   - Add modal navigation for treatment type selector
   - Configure navigation to Patient Recall Search modal
   - Pass treatment type parameter to next screen
   - Handle back/cancel navigation

4. **Integrate with Dashboard**
   - Add AddNewPatientButton to PatientDashboardScreen header
   - Connect button tap to treatment type selector
   - Handle treatment type selection to navigate to Patient Recall Search
   - Ensure proper modal presentation and dismissal

5. **Add State Management**
   - Track selected treatment type in component state
   - Handle modal visibility state
   - Manage navigation parameters

## Current Project State
```
src/
├── components/
│   ├── patient/
│   │   ├── PatientCard.tsx
│   │   ├── StatusBadge.tsx
│   │   ├── PatientListTabs.tsx
│   │   ├── EmptyPatientState.tsx
│   │   ├── AddNewPatientButton.tsx      # NEW
│   │   └── TreatmentTypeSelector.tsx    # NEW
├── screens/
│   ├── dashboard/
│   │   └── PatientDashboardScreen.tsx
│   └── patient/
│       └── PatientRecallSearchScreen.tsx  # To be created in future task
└── navigation/
    └── RootNavigator.tsx
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | src/components/patient/AddNewPatientButton.tsx | Add New button component with tap handler |
| CREATE | src/components/patient/TreatmentTypeSelector.tsx | Treatment type dropdown/action sheet component |
| MODIFY | src/screens/dashboard/PatientDashboardScreen.tsx | Integrate Add New button and treatment type selector |
| MODIFY | src/navigation/RootNavigator.tsx | Add modal navigation configuration |
| MODIFY | src/components/patient/index.ts | Export new components |

## External References
- React Native Modal: https://reactnative.dev/docs/modal
- React Navigation Modal: https://reactnavigation.org/docs/modal
- React Native Action Sheet: https://github.com/beefe/react-native-actionsheet
- iOS Action Sheet: https://developer.apple.com/design/human-interface-guidelines/action-sheets
- Android Bottom Sheet: https://m3.material.io/components/bottom-sheets/overview

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
- [ ] Create AddNewPatientButton component with TypeScript interface
- [ ] Apply design tokens for button styling (primary color, typography, spacing)
- [ ] Create TreatmentTypeSelector component with dropdown/action sheet
- [ ] Implement treatment type options list (Hemodialysis for Phase 1)
- [ ] Add modal visibility state management
- [ ] Implement tap handler for Add New button
- [ ] Configure modal navigation in RootNavigator
- [ ] Add navigation to Patient Recall Search modal (placeholder for now)
- [ ] Integrate AddNewPatientButton in PatientDashboardScreen header
- [ ] Connect treatment type selection to navigation flow
- [ ] Test Add New button tap on iOS
- [ ] Test Add New button tap on Android
- [ ] Verify treatment type selector displays correctly
- [ ] Test treatment type selection and navigation
- [ ] Verify modal dismissal on cancel/back
- [ ] Ensure 44×44pt minimum touch target for button (UXR-202)
- [ ] Validate color contrast for button (UXR-201)
- [ ] **[UI Tasks - MANDATORY]** Reference wireframe from Design References table during implementation
- [ ] **[UI Tasks - MANDATORY]** Validate UI matches wireframe before marking task complete
- [ ] **[Mobile Tasks - MANDATORY]** Reference Mobile References table during implementation
- [ ] **[Mobile Tasks - MANDATORY]** Run headless platform builds before marking task complete
- [ ] **[Mobile Tasks - MANDATORY]** Validate permission manifests against task requirements
