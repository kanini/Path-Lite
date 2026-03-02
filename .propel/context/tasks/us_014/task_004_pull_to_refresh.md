# Task - TASK_004

## Requirement Reference
- User Story: US_014
- Story Location: .propel/context/tasks/us_014/us_014.md
- Acceptance Criteria:  
    - AC-5: When I pull down on the patient list, the system reloads patient data from MMKV storage and updates the list with latest status information
- Edge Case:
    - Handle refresh while data is already loading
    - Ensure smooth refresh animation

## Design References (Frontend Tasks Only)
| Reference Type | Value |
|----------------|-------|
| **UI Impact** | Yes |
| **Figma URL** | N/A |
| **Wireframe Status** | N/A |
| **Wireframe Type** | N/A |
| **Wireframe Path/URL** | N/A |
| **Screen Spec** | figma_spec.md#SCR-003 |
| **UXR Requirements** | UXR-001 |
| **Design Tokens** | designsystem.md sections: Color Tokens (primary) |

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
Implement pull-to-refresh functionality for the Patient Dashboard to reload patient data from MMKV storage and update the list with the latest status information. This task adds the refresh control to the patient list with proper loading states and data synchronization.

## Dependent Tasks
- TASK_001 (Patient Dashboard UI Components) - UI components required
- TASK_002 (Patient List State Management) - State management and data loading logic required

## Impacted Components
- **MODIFY**: `src/screens/dashboard/PatientDashboardScreen.tsx` - Add RefreshControl to patient list
- **MODIFY**: `src/hooks/usePatientList.ts` - Add refresh functionality
- **MODIFY**: `src/context/PatientContext.tsx` - Add refresh method to context

## Implementation Plan
1. **Add Refresh Method to PatientContext**
   - Implement refreshPatients method to reload data from MMKV
   - Add refreshing state to context
   - Handle concurrent refresh requests
   - Update patient list state after successful refresh

2. **Update usePatientList Hook**
   - Add onRefresh callback function
   - Implement refresh logic using context method
   - Handle refreshing state
   - Add error handling for refresh failures

3. **Integrate RefreshControl**
   - Add RefreshControl to FlatList/SectionList in PatientDashboardScreen
   - Connect to onRefresh callback from usePatientList
   - Apply design tokens for refresh indicator color (primary blue)
   - Ensure smooth animation during refresh

4. **Handle Edge Cases**
   - Prevent multiple simultaneous refresh requests
   - Handle refresh during initial data load
   - Maintain scroll position after refresh
   - Show appropriate error messages on refresh failure

5. **Optimize Performance**
   - Debounce rapid refresh gestures
   - Minimize re-renders during refresh
   - Cache previous data during refresh
   - Implement optimistic UI updates

## Current Project State
```
src/
├── context/
│   └── PatientContext.tsx          # TO BE MODIFIED
├── hooks/
│   └── usePatientList.ts           # TO BE MODIFIED
├── screens/
│   └── dashboard/
│       └── PatientDashboardScreen.tsx  # TO BE MODIFIED
└── services/
    └── patientService.ts
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| MODIFY | src/context/PatientContext.tsx | Add refreshPatients method and refreshing state |
| MODIFY | src/hooks/usePatientList.ts | Add onRefresh callback and refresh logic |
| MODIFY | src/screens/dashboard/PatientDashboardScreen.tsx | Add RefreshControl to patient list |

## External References
- React Native RefreshControl: https://reactnative.dev/docs/refreshcontrol
- React Native FlatList: https://reactnative.dev/docs/flatlist
- React Native SectionList: https://reactnative.dev/docs/sectionlist
- Pull-to-Refresh Pattern: https://developer.apple.com/design/human-interface-guidelines/patterns/loading

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
- [x] Add refreshing state to PatientContext interface
- [x] Implement refreshPatients method in PatientContext
- [x] Add concurrent refresh request prevention logic
- [x] Update usePatientList hook with onRefresh callback
- [x] Implement refresh logic to reload from MMKV storage
- [x] Add error handling for refresh failures
- [x] Import RefreshControl from react-native
- [x] Add RefreshControl to FlatList/SectionList in PatientDashboardScreen
- [x] Connect refreshing prop to context state
- [x] Connect onRefresh prop to hook callback
- [x] Apply primary blue color to refresh indicator (design token)
- [x] Test pull-to-refresh on iOS device/simulator
- [x] Test pull-to-refresh on Android device/emulator
- [x] Verify data updates after refresh
- [x] Test refresh during initial load (should prevent duplicate requests)
- [x] Verify scroll position maintained after refresh
- [x] Test error handling during refresh failure
- [x] Verify smooth refresh animation
- [x] Test rapid pull gestures (debouncing)
- [x] Write unit tests for refreshPatients method
- [x] Write unit tests for onRefresh callback
- [x] **[Mobile Tasks - MANDATORY]** Reference Mobile References table during implementation
- [x] **[Mobile Tasks - MANDATORY]** Run headless platform builds before marking task complete
- [x] **[Mobile Tasks - MANDATORY]** Validate permission manifests against task requirements
