# Task - TASK_004

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
| **UI Impact** | No |
| **Figma URL** | N/A |
| **Wireframe Status** | N/A |
| **Wireframe Type** | N/A |
| **Wireframe Path/URL** | N/A |
| **Screen Spec** | N/A |
| **UXR Requirements** | N/A |
| **Design Tokens** | N/A |

> If UI Impact = No, all design references should be N/A

## Applicable Technology Stack
| Layer | Technology | Version |
|-------|------------|---------|
| Frontend | React Native | 0.73.0 |
| Backend | N/A | N/A |
| Database | N/A | N/A |
| Library | React | 18.2.0 |
| Library | TypeScript | 5.0.4 |
| Library | Jest | 29.6.3 |
| Library | React Test Renderer | 18.2.0 |
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

### **CRITICAL: Mobile Implementation Requirement (Mobile Tasks Only)**
**IF Mobile Impact = Yes:**
- **MUST** verify platform-specific headless compilation succeeds before marking complete
- **MUST** validate native dependency linking (pod install / gradle sync / flutter pub get)
- **MUST** inspect permission manifests - only required permissions with usage descriptions
- **MUST** follow platform design guidelines (HIG for iOS, Material Design 3 for Android)

## Task Overview
Create comprehensive unit and integration tests for Hospital Selection feature covering HospitalContext, useHospitalSearch hook, search utilities, HospitalSelectionScreen component, and navigation flows. Tests validate all acceptance criteria including search performance (<300ms), alphabetical sorting, empty states, special character sanitization, and session state persistence. Achieve minimum 85% code coverage for hospital selection module.

## Dependent Tasks
- TASK_001: Hospital Selection UI (provides components to test)
- TASK_002: Hospital Context State (provides context to test)
- TASK_003: Search Performance Optimization (provides optimized search logic to test)

## Impacted Components
- **NEW**: `__tests__/context/HospitalContext.test.tsx` - Hospital context tests
- **NEW**: `__tests__/hooks/useHospitalSearch.test.ts` - Search hook tests
- **NEW**: `__tests__/utils/searchUtils.test.ts` - Search utility tests
- **NEW**: `__tests__/screens/hospital/HospitalSelectionScreen.test.tsx` - Screen component tests
- **NEW**: `__tests__/integration/HospitalSelection.integration.test.tsx` - Integration tests
- **MODIFY**: `jest.config.js` - Add coverage thresholds for hospital module

## Implementation Plan
1. **Setup Test Infrastructure**
   - Configure Jest for React Native testing
   - Setup React Testing Library
   - Create test utilities and mocks
   - Mock MMKV storage
   - Mock navigation

2. **Unit Tests - Search Utilities**
   - Test `sanitizeSearchInput` with various inputs
   - Test special character removal
   - Test whitespace trimming
   - Test case conversion
   - Test empty string handling
   - Test alphanumeric + space pattern validation

3. **Unit Tests - useHospitalSearch Hook**
   - Test search filtering by name, code, address
   - Test case-insensitive search
   - Test alphabetical sorting
   - Test debouncing (300ms delay)
   - Test empty query returns full list
   - Test no results scenario
   - Test special character sanitization integration
   - Test performance (<300ms execution time)

4. **Unit Tests - HospitalContext**
   - Test context provider initialization
   - Test setHospital updates state and storage
   - Test clearHospital clears state and storage
   - Test useHospital hook throws error outside provider
   - Test hospital persistence on mount
   - Test invalid hospital data handling
   - Test storage error handling

5. **Component Tests - HospitalSearchBar**
   - Test input value updates
   - Test clear button appears when text exists
   - Test clear button clears input
   - Test onChange callback invoked
   - Test placeholder text
   - Test accessibility labels

6. **Component Tests - HospitalListItem**
   - Test hospital name, code, address display
   - Test onPress callback invoked
   - Test press visual feedback
   - Test accessibility labels
   - Test touch target size (≥44×44pt)

7. **Component Tests - HospitalSelectionScreen**
   - Test hospital list renders correctly
   - Test search bar integration
   - Test hospital selection triggers navigation
   - Test empty state displays "No hospitals found"
   - Test empty list edge case displays error
   - Test alphabetical sorting
   - Test loading state
   - Test FlatList optimization props

8. **Integration Tests**
   - Test full user flow: login → hospital selection → patient dashboard
   - Test search → select → context update → navigation
   - Test hospital persistence across app restart
   - Test logout clears hospital context
   - Test navigation back from patient dashboard
   - Test search performance end-to-end

9. **Coverage Analysis**
   - Ensure ≥85% coverage for hospital module
   - Identify untested edge cases
   - Add missing test cases
   - Generate coverage report

## Current Project State
```
__tests__/
├── context/ (NEW)
│   └── HospitalContext.test.tsx
├── hooks/ (NEW)
│   └── useHospitalSearch.test.ts
├── utils/ (NEW)
│   └── searchUtils.test.ts
├── screens/
│   └── hospital/ (NEW)
│       └── HospitalSelectionScreen.test.tsx
├── integration/ (NEW)
│   └── HospitalSelection.integration.test.tsx
└── App.test.tsx (EXISTS)
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | __tests__/context/HospitalContext.test.tsx | Unit tests for HospitalContext provider and hook |
| CREATE | __tests__/hooks/useHospitalSearch.test.ts | Unit tests for search hook with debouncing and filtering |
| CREATE | __tests__/utils/searchUtils.test.ts | Unit tests for search input sanitization |
| CREATE | __tests__/screens/hospital/HospitalSelectionScreen.test.tsx | Component tests for main screen |
| CREATE | __tests__/integration/HospitalSelection.integration.test.tsx | End-to-end integration tests |
| MODIFY | jest.config.js | Add coverage thresholds for hospital module (≥85%) |

> Only list concrete, verifiable file operations. No speculative directory trees.

## External References
- React Testing Library: https://testing-library.com/docs/react-testing-library/intro
- Jest Documentation: https://jestjs.io/docs/getting-started
- React Native Testing: https://reactnative.dev/docs/testing-overview
- Testing Hooks: https://react-hooks-testing-library.com/
- Jest Coverage: https://jestjs.io/docs/configuration#collectcoverage-boolean

## Build Commands
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- HospitalContext.test.tsx

# Run integration tests only
npm test -- integration

# Type checking
npx tsc --noEmit
```

## Implementation Validation Strategy
- [ ] Unit tests pass
- [ ] Integration tests pass (if applicable)
- [ ] **[Mobile Tasks]** Headless platform compilation succeeds
- [ ] **[Mobile Tasks]** Native dependency linking verified
- [ ] **[Mobile Tasks]** Permission manifests validated against task requirements
- [ ] Code coverage ≥85% for hospital module
- [ ] All acceptance criteria covered by tests
- [ ] All edge cases covered by tests
- [ ] Search performance tests validate <300ms requirement
- [ ] Navigation flow tests pass
- [ ] Context persistence tests pass

## Implementation Checklist
- [ ] Setup Jest configuration for React Native
- [ ] Create test utilities and mocks
- [ ] Mock MMKV storage
- [ ] Mock navigation
- [ ] Write searchUtils.test.ts (sanitization tests)
- [ ] Write useHospitalSearch.test.ts (hook tests)
- [ ] Write HospitalContext.test.tsx (context tests)
- [ ] Write HospitalSearchBar.test.tsx (component tests)
- [ ] Write HospitalListItem.test.tsx (component tests)
- [ ] Write HospitalSelectionScreen.test.tsx (screen tests)
- [ ] Write HospitalSelection.integration.test.tsx (integration tests)
- [ ] Test search performance <300ms
- [ ] Test alphabetical sorting
- [ ] Test empty state handling
- [ ] Test special character sanitization
- [ ] Test hospital context persistence
- [ ] Test navigation flows
- [ ] Add coverage thresholds to jest.config.js
- [ ] Run coverage report and verify ≥85%
- [ ] Fix any failing tests
- [ ] Document test patterns for future reference
- [ ] **[Mobile Tasks - MANDATORY]** Reference Mobile References table during implementation
- [ ] **[Mobile Tasks - MANDATORY]** Run headless platform builds before marking task complete
- [ ] **[Mobile Tasks - MANDATORY]** Validate permission manifests against task requirements
