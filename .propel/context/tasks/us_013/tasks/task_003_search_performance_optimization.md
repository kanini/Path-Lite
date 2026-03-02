# Task - TASK_003

## Requirement Reference
- User Story: US_013
- Story Location: .propel/context/tasks/us_013/us_013.md
- Acceptance Criteria:  
    - AC2: Given I need to find a hospital, When I type in the search field, Then the system filters the hospital list in real-time with minimum 1-character trigger and displays matching results within 300ms.
    - AC4: Given the list is long, When I scroll through hospitals, Then the system displays hospitals in alphabetical order by name with smooth scrolling performance.
- Edge Case:
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
Optimize hospital search and list rendering performance to meet <300ms search response time and smooth scrolling requirements. Implement debounced search with 300ms delay, input sanitization for special characters, memoized filter function, and FlatList optimization techniques (getItemLayout, keyExtractor, removeClippedSubviews). Add performance monitoring to validate search response time and scrolling frame rate meet acceptance criteria.

## Dependent Tasks
- TASK_001: Hospital Selection UI (provides base screen and search components)

## Impacted Components
- **MODIFY**: `src/hooks/useHospitalSearch.ts` - Add debouncing and performance optimization
- **MODIFY**: `src/screens/hospital/HospitalSelectionScreen.tsx` - Optimize FlatList rendering
- **NEW**: `src/utils/searchUtils.ts` - Search input sanitization utilities
- **NEW**: `src/utils/performanceMonitor.ts` - Performance measurement utilities

## Implementation Plan
1. **Implement Search Input Sanitization**
   - Create `searchUtils.ts` with `sanitizeSearchInput(input: string)` function
   - Remove special characters, keep only alphanumeric and spaces
   - Trim whitespace from start and end
   - Convert to lowercase for case-insensitive search
   - Export regex pattern for validation

2. **Add Debounced Search**
   - Modify `useHospitalSearch.ts` to implement debouncing
   - Use `useCallback` and `useRef` for debounce implementation
   - Set 300ms debounce delay
   - Cancel pending debounce on component unmount
   - Trigger search immediately on empty input (clear search)

3. **Optimize Filter Function**
   - Use `useMemo` to memoize filtered hospital list
   - Implement efficient string matching (indexOf instead of regex)
   - Search across hospital name, code, and address fields
   - Return early if search query is empty
   - Sort results alphabetically by name using localeCompare

4. **Optimize FlatList Rendering**
   - Implement `getItemLayout` for fixed-height list items
   - Add `keyExtractor` using hospitalId
   - Enable `removeClippedSubviews` for large lists
   - Set `maxToRenderPerBatch` to 10
   - Set `updateCellsBatchingPeriod` to 50ms
   - Set `windowSize` to 10 for optimal memory usage
   - Use `initialNumToRender` of 15 items

5. **Add Performance Monitoring**
   - Create `performanceMonitor.ts` with timing utilities
   - Measure search execution time
   - Log warning if search exceeds 300ms
   - Track FlatList scroll performance
   - Add development-only performance logs

6. **Implement Alphabetical Sorting**
   - Sort hospitals by name using `String.localeCompare()`
   - Apply sorting to both full list and filtered results
   - Ensure consistent sort order across renders
   - Use memoization to prevent unnecessary re-sorting

7. **Edge Case Handling**
   - Handle empty search query (return full sorted list)
   - Handle special characters in input (sanitize before search)
   - Handle very long hospital names (truncate in UI, full text in search)
   - Handle rapid typing (debounce prevents excessive renders)

## Current Project State
```
src/
├── hooks/
│   └── useHospitalSearch.ts (EXISTS - needs optimization)
├── screens/
│   └── hospital/
│       └── HospitalSelectionScreen.tsx (EXISTS - needs FlatList optimization)
├── utils/ (NEW)
│   ├── searchUtils.ts (NEW)
│   └── performanceMonitor.ts (NEW)
└── data/
    └── mockHospitals.ts (EXISTS)
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | src/utils/searchUtils.ts | Search input sanitization utilities with regex pattern |
| CREATE | src/utils/performanceMonitor.ts | Performance measurement and logging utilities |
| MODIFY | src/hooks/useHospitalSearch.ts | Add debouncing, memoization, and sanitization |
| MODIFY | src/screens/hospital/HospitalSelectionScreen.tsx | Optimize FlatList with getItemLayout, keyExtractor, performance props |

> Only list concrete, verifiable file operations. No speculative directory trees.

## External References
- React useMemo: https://react.dev/reference/react/useMemo
- React useCallback: https://react.dev/reference/react/useCallback
- FlatList Performance: https://reactnative.dev/docs/optimizing-flatlist-configuration
- Debouncing in React: https://www.developerway.com/posts/debouncing-in-react
- String.localeCompare: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare

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

# Performance profiling
npm run ios -- --configuration Release
```

## Implementation Validation Strategy
- [ ] Unit tests pass
- [ ] Integration tests pass (if applicable)
- [ ] **[Mobile Tasks]** Headless platform compilation succeeds
- [ ] **[Mobile Tasks]** Native dependency linking verified
- [ ] **[Mobile Tasks]** Permission manifests validated against task requirements
- [ ] Search response time consistently <300ms (measured with performanceMonitor)
- [ ] Smooth scrolling at 60fps on target devices
- [ ] Special characters sanitized correctly
- [ ] Debounce prevents excessive re-renders
- [ ] Alphabetical sorting works correctly
- [ ] Empty search returns full sorted list
- [ ] FlatList optimization props applied correctly

## Implementation Checklist
- [ ] Create searchUtils.ts with sanitizeSearchInput function
- [ ] Implement regex pattern for alphanumeric + space validation
- [ ] Create performanceMonitor.ts with timing utilities
- [ ] Add debouncing to useHospitalSearch hook (300ms delay)
- [ ] Implement search input sanitization in hook
- [ ] Add useMemo for filtered hospital list
- [ ] Implement efficient string matching with indexOf
- [ ] Add alphabetical sorting with localeCompare
- [ ] Optimize FlatList with getItemLayout
- [ ] Add keyExtractor using hospitalId
- [ ] Enable removeClippedSubviews
- [ ] Set maxToRenderPerBatch to 10
- [ ] Set updateCellsBatchingPeriod to 50ms
- [ ] Set windowSize to 10
- [ ] Set initialNumToRender to 15
- [ ] Add performance monitoring for search timing
- [ ] Test search response time <300ms
- [ ] Test scrolling performance at 60fps
- [ ] Test special character sanitization
- [ ] Test rapid typing with debounce
- [ ] **[Mobile Tasks - MANDATORY]** Reference Mobile References table during implementation
- [ ] **[Mobile Tasks - MANDATORY]** Run headless platform builds before marking task complete
- [ ] **[Mobile Tasks - MANDATORY]** Validate permission manifests against task requirements
