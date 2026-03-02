# Task - TASK_001

## Requirement Reference
- User Story: US_013
- Story Location: .propel/context/tasks/us_013/us_013.md
- Acceptance Criteria:  
    - AC1: Given I successfully log in, When the Hospital Selection screen loads, Then the system displays a searchable list of hardcoded mock hospitals with hospital name, code, and address visible for each entry.
    - AC2: Given I need to find a hospital, When I type in the search field, Then the system filters the hospital list in real-time with minimum 1-character trigger and displays matching results within 300ms.
    - AC3: Given I find my hospital, When I tap on a hospital entry, Then the system sets the hospital context for the session, stores hospitalId in session state, and redirects to Patient Dashboard.
    - AC4: Given the list is long, When I scroll through hospitals, Then the system displays hospitals in alphabetical order by name with smooth scrolling performance.
    - AC5: Given no hospitals match search, When I enter a search term with no results, Then the system displays "No hospitals found" message with option to clear search.
- Edge Case:
    - What happens when hardcoded hospital list is empty? (Display error message "No hospitals available. Contact administrator."; disable hospital selection)
    - How does the system handle special characters in search? (Sanitize search input; support alphanumeric and space characters only)

## Design References (Frontend Tasks Only)
| Reference Type | Value |
|----------------|-------|
| **UI Impact** | Yes |
| **Figma URL** | N/A |
| **Wireframe Status** | PENDING |
| **Wireframe Type** | N/A |
| **Wireframe Path/URL** | TODO: Provide wireframe - upload to `.propel/context/wireframes/Hi-Fi/wireframe-SCR-002-hospital-selection.[html|png|jpg]` or add external URL |
| **Screen Spec** | figma_spec.md#SCR-002 |
| **UXR Requirements** | UXR-101, UXR-403 |
| **Design Tokens** | designsystem.md (colors, typography, spacing) |

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
| Backend | N/A | N/A |
| Database | N/A | N/A |
| Library | React | 18.2.0 |
| Library | React Navigation Stack | 6.4.1 |
| Library | TypeScript | 5.0.4 |
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
Implement the Hospital Selection screen (SCR-002) as a searchable list interface that allows nurses to select their hospital context after successful login. The screen displays hardcoded mock hospitals from `MOCK_HOSPITALS` data source with real-time search filtering (minimum 1-character trigger, <300ms response), alphabetical sorting, and smooth scrolling performance. Upon hospital selection, the system stores `hospitalId` in session state and navigates to Patient Dashboard. The implementation includes empty state handling, search input sanitization, and responsive design for tablet devices (7-12.9 inch).

## Dependent Tasks
- US_010: Login Screen Implementation (completed - provides navigation entry point)
- US_011: JWT Authentication Service (completed - provides authentication token)

## Impacted Components
- **NEW**: `src/screens/hospital/HospitalSelectionScreen.tsx` - Main screen component
- **NEW**: `src/components/hospital/HospitalListItem.tsx` - Individual hospital list item
- **NEW**: `src/components/hospital/HospitalSearchBar.tsx` - Search input component
- **NEW**: `src/hooks/useHospitalSearch.ts` - Custom hook for search logic
- **NEW**: `src/context/HospitalContext.tsx` - Hospital session context provider
- **MODIFY**: `src/navigation/types.ts` - Add HospitalSelection and PatientDashboard routes
- **MODIFY**: `src/navigation/RootNavigator.tsx` - Add HospitalSelection screen to navigation stack
- **MODIFY**: `src/screens/auth/LoginScreen.tsx` - Enable navigation to HospitalSelection on success

## Implementation Plan
1. **Create Hospital Context Provider**
   - Create `HospitalContext.tsx` with state management for selected hospital
   - Implement `setHospital` function to store hospitalId in session state
   - Provide `selectedHospital` and `clearHospital` functions
   - Use React Context API for global hospital state

2. **Implement Search Hook**
   - Create `useHospitalSearch.ts` custom hook
   - Implement debounced search with 300ms delay for performance
   - Filter hospitals by name, code, and address (case-insensitive)
   - Sanitize search input (alphanumeric and space only)
   - Return filtered hospitals sorted alphabetically by name

3. **Build Search Bar Component**
   - Create `HospitalSearchBar.tsx` with TextInput
   - Implement real-time search with 1-character minimum trigger
   - Add clear button when search text exists
   - Apply proper styling with focus states
   - Ensure 44×44pt touch target for accessibility

4. **Build Hospital List Item Component**
   - Create `HospitalListItem.tsx` as pressable component
   - Display hospital name (bold), code, and address
   - Implement press handler to trigger hospital selection
   - Add visual feedback on press (opacity/background change)
   - Ensure proper spacing and typography per design system

5. **Implement Main Screen Component**
   - Create `HospitalSelectionScreen.tsx` with FlatList
   - Load MOCK_HOSPITALS from data source
   - Integrate search bar and list items
   - Implement empty state: "No hospitals found" with clear search option
   - Handle edge case: empty hospital list with error message
   - Add loading state during initial render
   - Implement alphabetical sorting by hospital name

6. **Integrate Navigation**
   - Update `types.ts` to add HospitalSelection and PatientDashboard routes
   - Add HospitalSelection screen to RootNavigator
   - Modify LoginScreen to navigate to HospitalSelection on successful login
   - Implement navigation to PatientDashboard on hospital selection

7. **Session State Management**
   - Store selected hospitalId in HospitalContext
   - Persist hospital selection for session duration
   - Clear hospital context on logout

8. **Responsive Design**
   - Implement tablet-optimized layout (7-12.9 inch)
   - Test on 600dp (7-inch portrait) and 1366dp (12.9-inch landscape)
   - Ensure smooth scrolling with FlatList optimization
   - Apply proper touch targets (≥44×44pt)

## Current Project State
```
src/
├── components/
│   ├── auth/
│   │   └── LoginForm.tsx
│   ├── common/
│   │   └── Logo.tsx
│   └── hospital/ (NEW)
│       ├── HospitalListItem.tsx
│       └── HospitalSearchBar.tsx
├── context/
│   ├── AuthContext.tsx
│   └── HospitalContext.tsx (NEW)
├── data/
│   └── mockHospitals.ts (EXISTS)
├── hooks/ (NEW)
│   └── useHospitalSearch.ts
├── models/
│   └── Hospital.ts (EXISTS)
├── navigation/
│   ├── RootNavigator.tsx
│   └── types.ts
├── screens/
│   ├── auth/
│   │   └── LoginScreen.tsx
│   └── hospital/ (NEW)
│       └── HospitalSelectionScreen.tsx
└── styles/
    ├── colors.ts
    └── spacing.ts
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | src/context/HospitalContext.tsx | Hospital session context provider with setHospital, selectedHospital, clearHospital |
| CREATE | src/hooks/useHospitalSearch.ts | Custom hook for debounced search with input sanitization and alphabetical sorting |
| CREATE | src/components/hospital/HospitalSearchBar.tsx | Search input component with clear button and 1-character trigger |
| CREATE | src/components/hospital/HospitalListItem.tsx | Pressable hospital list item displaying name, code, address |
| CREATE | src/screens/hospital/HospitalSelectionScreen.tsx | Main screen with FlatList, search integration, empty states |
| MODIFY | src/navigation/types.ts | Add HospitalSelection and PatientDashboard to RootStackParamList |
| MODIFY | src/navigation/RootNavigator.tsx | Add HospitalSelection screen to navigation stack |
| MODIFY | src/screens/auth/LoginScreen.tsx | Uncomment navigation to HospitalSelection on login success |

> Only list concrete, verifiable file operations. No speculative directory trees.

## External References
- React Native FlatList Performance: https://reactnative.dev/docs/optimizing-flatlist-configuration
- React Navigation Stack: https://reactnavigation.org/docs/stack-navigator
- React Context API: https://react.dev/reference/react/useContext
- React Native TextInput: https://reactnative.dev/docs/textinput
- Debouncing in React: https://www.freecodecamp.org/news/debouncing-explained/

## Build Commands
```bash
# iOS
npm run ios

# Android
npm run android

# Start Metro bundler
npm start

# Run tests
npm test

# Type checking
npx tsc --noEmit
```

## Implementation Validation Strategy
- [ ] Unit tests pass
- [ ] Integration tests pass (if applicable)
- [ ] **[UI Tasks]** Visual comparison against wireframe completed at 375px, 768px, 1440px
- [ ] **[UI Tasks]** Run `/analyze-ux` to validate wireframe alignment
- [ ] **[Mobile Tasks]** Headless platform compilation succeeds
- [ ] **[Mobile Tasks]** Native dependency linking verified
- [ ] **[Mobile Tasks]** Permission manifests validated against task requirements
- [ ] Search filters hospitals in <300ms with 1-character minimum
- [ ] Hospitals displayed in alphabetical order by name
- [ ] Empty state displays correctly when no matches found
- [ ] Hospital selection stores hospitalId and navigates to PatientDashboard
- [ ] Touch targets meet 44×44pt minimum requirement
- [ ] Responsive layout works on 7-inch and 12.9-inch tablets

## Implementation Checklist
- [ ] Create HospitalContext with session state management
- [ ] Implement useHospitalSearch hook with debouncing and sanitization
- [ ] Build HospitalSearchBar component with clear functionality
- [ ] Build HospitalListItem component with proper styling
- [ ] Create HospitalSelectionScreen with FlatList and search integration
- [ ] Implement alphabetical sorting by hospital name
- [ ] Add empty state handling ("No hospitals found")
- [ ] Add edge case handling (empty hospital list error)
- [ ] Update navigation types with new routes
- [ ] Add HospitalSelection to RootNavigator
- [ ] Enable navigation from LoginScreen to HospitalSelection
- [ ] Implement navigation from HospitalSelection to PatientDashboard
- [ ] Test search performance (<300ms response time)
- [ ] Test on 7-inch tablet (600dp portrait)
- [ ] Test on 12.9-inch tablet (1366dp landscape)
- [ ] Verify smooth scrolling performance
- [ ] Validate touch target sizes (≥44×44pt)
- [ ] Test special character sanitization in search
- [ ] **[UI Tasks - MANDATORY]** Reference wireframe from Design References table during implementation
- [ ] **[UI Tasks - MANDATORY]** Validate UI matches wireframe before marking task complete
- [ ] **[Mobile Tasks - MANDATORY]** Reference Mobile References table during implementation
- [ ] **[Mobile Tasks - MANDATORY]** Run headless platform builds before marking task complete
- [ ] **[Mobile Tasks - MANDATORY]** Validate permission manifests against task requirements
