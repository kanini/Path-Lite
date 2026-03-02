# Task - TASK_002

## Requirement Reference
- User Story: US_013
- Story Location: .propel/context/tasks/us_013/us_013.md
- Acceptance Criteria:  
    - AC3: Given I find my hospital, When I tap on a hospital entry, Then the system sets the hospital context for the session, stores hospitalId in session state, and redirects to Patient Dashboard.
- Edge Case:
    - N/A

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
| Library | react-native-mmkv | 2.12.2 |
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
Implement hospital session context management using React Context API and MMKV storage for persistent session state. Create `HospitalContext` provider that manages selected hospital state, provides functions to set/clear hospital context, and persists hospitalId across app sessions using react-native-mmkv. The context will be consumed by screens requiring hospital context (Patient Dashboard, Treatment Forms) and will integrate with the existing AuthContext for session lifecycle management.

## Dependent Tasks
- US_011: JWT Authentication Service (completed - provides authentication context pattern)

## Impacted Components
- **NEW**: `src/context/HospitalContext.tsx` - Hospital context provider
- **NEW**: `src/types/hospital.ts` - Hospital context type definitions
- **NEW**: `src/storage/HospitalStorage.ts` - MMKV storage wrapper for hospital data
- **MODIFY**: `App.tsx` - Wrap app with HospitalProvider

## Implementation Plan
1. **Create Type Definitions**
   - Define `HospitalContextType` interface with selectedHospital, setHospital, clearHospital
   - Define `HospitalState` interface with hospital and loading states
   - Export types from `src/types/hospital.ts`

2. **Implement MMKV Storage Wrapper**
   - Create `HospitalStorage.ts` using react-native-mmkv
   - Implement `saveHospitalId(hospitalId: string)` function
   - Implement `getHospitalId(): string | undefined` function
   - Implement `clearHospitalId()` function
   - Use MMKV instance with encryption for secure storage

3. **Create Hospital Context Provider**
   - Create `HospitalContext.tsx` with React.createContext
   - Implement `HospitalProvider` component with state management
   - Create `useHospital` custom hook for context consumption
   - Implement `setHospital(hospital: Hospital)` function that:
     - Updates context state
     - Persists hospitalId to MMKV storage
     - Validates hospital object structure
   - Implement `clearHospital()` function that:
     - Clears context state
     - Removes hospitalId from MMKV storage
   - Load persisted hospitalId on provider mount
   - Fetch full hospital details from MOCK_HOSPITALS if hospitalId exists

4. **Integrate with App Root**
   - Wrap App.tsx with HospitalProvider
   - Position HospitalProvider inside AuthProvider (hospital context requires auth)
   - Ensure proper provider hierarchy

5. **Error Handling**
   - Handle MMKV storage errors gracefully
   - Validate hospital data before setting context
   - Clear invalid hospital data from storage
   - Log errors for debugging

6. **Session Lifecycle Management**
   - Clear hospital context on user logout
   - Restore hospital context on app relaunch if session valid
   - Handle hospital context expiration

## Current Project State
```
src/
├── context/
│   ├── AuthContext.tsx (EXISTS)
│   └── HospitalContext.tsx (NEW)
├── storage/
│   ├── AuditStorageService.ts (EXISTS)
│   ├── MMKVStorage.ts (EXISTS)
│   ├── PHIStorageService.ts (EXISTS)
│   └── HospitalStorage.ts (NEW)
├── types/
│   ├── auth.ts (EXISTS)
│   └── hospital.ts (NEW)
├── data/
│   └── mockHospitals.ts (EXISTS)
└── models/
    └── Hospital.ts (EXISTS)
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | src/types/hospital.ts | Type definitions for HospitalContextType and HospitalState |
| CREATE | src/storage/HospitalStorage.ts | MMKV storage wrapper for hospital session data |
| CREATE | src/context/HospitalContext.tsx | Hospital context provider with setHospital, clearHospital, useHospital hook |
| MODIFY | App.tsx | Wrap app with HospitalProvider inside AuthProvider |

> Only list concrete, verifiable file operations. No speculative directory trees.

## External References
- React Context API: https://react.dev/reference/react/useContext
- React Native MMKV: https://github.com/mrousavy/react-native-mmkv
- React Context Best Practices: https://react.dev/learn/passing-data-deeply-with-context
- TypeScript Context Patterns: https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context

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
- [ ] **[Mobile Tasks]** Headless platform compilation succeeds
- [ ] **[Mobile Tasks]** Native dependency linking verified
- [ ] **[Mobile Tasks]** Permission manifests validated against task requirements
- [ ] Hospital context persists across app restarts
- [ ] Hospital context clears on logout
- [ ] Invalid hospital data handled gracefully
- [ ] MMKV storage operations succeed
- [ ] useHospital hook throws error when used outside provider
- [ ] Hospital context loads correctly on app mount

## Implementation Checklist
- [ ] Create hospital.ts type definitions
- [ ] Implement HospitalStorage with MMKV wrapper
- [ ] Create HospitalContext with React.createContext
- [ ] Implement HospitalProvider component
- [ ] Create useHospital custom hook with error handling
- [ ] Implement setHospital function with validation
- [ ] Implement clearHospital function
- [ ] Add hospital persistence to MMKV storage
- [ ] Load persisted hospital on provider mount
- [ ] Integrate HospitalProvider in App.tsx
- [ ] Test hospital context persistence across app restarts
- [ ] Test hospital context clearing on logout
- [ ] Test error handling for invalid hospital data
- [ ] Verify MMKV storage encryption
- [ ] Test useHospital hook outside provider throws error
- [ ] **[Mobile Tasks - MANDATORY]** Reference Mobile References table during implementation
- [ ] **[Mobile Tasks - MANDATORY]** Run headless platform builds before marking task complete
- [ ] **[Mobile Tasks - MANDATORY]** Validate permission manifests against task requirements
