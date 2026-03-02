# Task - TASK_005

## Requirement Reference
- User Story: US_016
- Story Location: .propel/context/tasks/us_016/us_016.md
- Acceptance Criteria:  
    - All AC-1 through AC-5: Comprehensive test coverage for voice library integration, permission handling, UI components, and STT service
- Edge Case:
    - Test microphone permission denied scenario
    - Test background noise detection and low-confidence warnings
    - Test timeout scenarios and error handling

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
| Library | Jest | 29.6.3 |
| Library | @testing-library/react-native | 12.4+ |
| Library | @react-native-voice/voice | 3.2+ |
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
Implement comprehensive unit and integration tests for Speech-to-Text integration covering voice library integration, permission handling, UI components, STT service, and error scenarios. This task ensures all acceptance criteria are validated through automated tests with proper mocking of native modules and edge case coverage. Tests must achieve minimum 80% code coverage for voice-related modules.

## Dependent Tasks
- TASK_001 (Voice Library Integration) - Voice library must be installed
- TASK_002 (Microphone Permission Handling) - Permission service must exist
- TASK_003 (Voice Input UI Component) - UI components must exist
- TASK_004 (STT Service Integration) - VoiceService must exist

## Impacted Components
- **NEW**: `__tests__/services/voice/VoiceService.test.ts` - VoiceService unit tests
- **NEW**: `__tests__/services/permissions/PermissionService.test.ts` - PermissionService unit tests
- **NEW**: `__tests__/components/voice/AIVoiceIcon.test.tsx` - AIVoiceIcon component tests
- **NEW**: `__tests__/components/voice/ListeningIndicator.test.tsx` - ListeningIndicator tests
- **NEW**: `__tests__/hooks/useVoiceInput.test.ts` - useVoiceInput hook tests
- **NEW**: `__tests__/utils/confidenceValidator.test.ts` - Confidence validator tests
- **NEW**: `__tests__/integration/VoiceInputFlow.test.tsx` - Integration tests
- **MODIFY**: `jest.config.js` - Add voice module mocks configuration

## Implementation Plan
1. **Configure Jest for Native Module Mocking**
   - Add @react-native-voice/voice mock in jest.config.js
   - Add react-native-permissions mock in jest.config.js
   - Configure transformIgnorePatterns for voice modules
   - Set up test environment with React Native preset

2. **Create Mock Implementations**
   - Mock @react-native-voice/voice with start, stop, destroy methods
   - Mock react-native-permissions with check, request methods
   - Mock native events (onSpeechStart, onSpeechResults, onSpeechError)
   - Create test fixtures for transcription results

3. **Implement VoiceService Unit Tests**
   - Test startRecording() initializes voice recognition
   - Test stopRecording() ends voice recognition
   - Test onSpeechResults event handling with valid transcription
   - Test onSpeechError event handling with various error types
   - Test confidence score extraction and validation
   - Test timeout mechanism (5 seconds)
   - Test noise suppression configuration

4. **Implement PermissionService Unit Tests**
   - Test checkMicrophonePermission() returns correct status
   - Test requestMicrophonePermission() prompts user
   - Test permission granted flow
   - Test permission denied flow
   - Test permission blocked flow (Android "Don't ask again")
   - Test openAppSettings() navigation

5. **Implement AIVoiceIcon Component Tests**
   - Test component renders in INACTIVE state
   - Test component renders in ACTIVE state with pulsing animation
   - Test component renders in LISTENING state with waveform
   - Test tap gesture triggers startListening()
   - Test state transitions occur within 200ms
   - Test disabled state when permission is denied
   - Test accessibility labels and hints

6. **Implement useVoiceInput Hook Tests**
   - Test hook initializes with INACTIVE state
   - Test startListening() checks permission first
   - Test startListening() calls VoiceService.startRecording()
   - Test stopListening() calls VoiceService.stopRecording()
   - Test state updates on transcription results
   - Test error handling for permission denied
   - Test error handling for no speech detected

7. **Implement Confidence Validator Tests**
   - Test validateConfidence() returns true for confidence >= 0.7
   - Test validateConfidence() returns false for confidence < 0.7
   - Test warning message generation for low confidence
   - Test edge cases (confidence = 0, confidence = 1)

8. **Implement Integration Tests**
   - Test complete voice input flow: tap icon → permission check → recording → transcription → display
   - Test permission denied flow: tap icon → permission denied → error dialog → fallback
   - Test low-confidence flow: recording → low confidence → warning display
   - Test timeout flow: recording exceeds 5 seconds → timeout error
   - Test rapid tap events with debouncing

9. **Verify Test Coverage**
   - Run jest with --coverage flag
   - Ensure minimum 80% coverage for voice modules
   - Identify uncovered branches and add tests
   - Generate coverage report

## Current Project State
```
__tests__/
├── services/
│   ├── voice/
│   │   └── VoiceService.test.ts        # NEW FILE
│   └── permissions/
│       └── PermissionService.test.ts   # NEW FILE
├── components/
│   └── voice/
│       ├── AIVoiceIcon.test.tsx        # NEW FILE
│       └── ListeningIndicator.test.tsx # NEW FILE
├── hooks/
│   └── useVoiceInput.test.ts           # NEW FILE
├── utils/
│   └── confidenceValidator.test.ts     # NEW FILE
├── integration/
│   └── VoiceInputFlow.test.tsx         # NEW FILE
└── App.test.tsx

jest.config.js                          # TO BE MODIFIED
package.json                            # TO BE MODIFIED (add test scripts)
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | __tests__/services/voice/VoiceService.test.ts | Unit tests for VoiceService |
| CREATE | __tests__/services/permissions/PermissionService.test.ts | Unit tests for PermissionService |
| CREATE | __tests__/components/voice/AIVoiceIcon.test.tsx | Component tests for AIVoiceIcon |
| CREATE | __tests__/components/voice/ListeningIndicator.test.tsx | Component tests for ListeningIndicator |
| CREATE | __tests__/hooks/useVoiceInput.test.ts | Hook tests for useVoiceInput |
| CREATE | __tests__/utils/confidenceValidator.test.ts | Unit tests for confidence validator |
| CREATE | __tests__/integration/VoiceInputFlow.test.tsx | Integration tests for complete flow |
| MODIFY | jest.config.js | Add voice module mocks and configuration |
| MODIFY | package.json | Add test:coverage script |

> Only list concrete, verifiable file operations. No speculative directory trees.

## External References
- Jest Documentation: https://jestjs.io/docs/getting-started
- React Native Testing Library: https://callstack.github.io/react-native-testing-library/
- Testing React Hooks: https://react-hooks-testing-library.com/
- Mocking Native Modules: https://jestjs.io/docs/manual-mocks
- Jest Coverage: https://jestjs.io/docs/configuration#collectcoverage-boolean
- React Native Testing Best Practices: https://reactnative.dev/docs/testing-overview

## Build Commands
```bash
# Install test dependencies
npm install --save-dev @testing-library/react-native @testing-library/jest-native

# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- VoiceService.test.ts

# Run integration tests only
npm test -- --testPathPattern=integration

# Generate coverage report
npm test -- --coverage --coverageDirectory=coverage

# View coverage report
open coverage/lcov-report/index.html
```

## Implementation Validation Strategy
- [ ] Unit tests pass
- [ ] Integration tests pass (if applicable)
- [ ] **[Mobile Tasks]** Headless platform compilation succeeds
- [ ] **[Mobile Tasks]** Native dependency linking verified
- [ ] **[Mobile Tasks]** Permission manifests validated against task requirements

## Implementation Checklist
- [ ] Add @testing-library/react-native to devDependencies
- [ ] Add @testing-library/jest-native to devDependencies
- [ ] Modify jest.config.js to add voice module mocks
- [ ] Configure transformIgnorePatterns for @react-native-voice/voice
- [ ] Create mock for @react-native-voice/voice in __mocks__ directory
- [ ] Create mock for react-native-permissions in __mocks__ directory
- [ ] Implement __tests__/services/voice/VoiceService.test.ts with 10+ test cases
- [ ] Test startRecording(), stopRecording(), event handlers, timeout
- [ ] Implement __tests__/services/permissions/PermissionService.test.ts with 8+ test cases
- [ ] Test checkPermission(), requestPermission(), granted/denied/blocked flows
- [ ] Implement __tests__/components/voice/AIVoiceIcon.test.tsx with 8+ test cases
- [ ] Test three states, tap gesture, animations, accessibility
- [ ] Implement __tests__/components/voice/ListeningIndicator.test.tsx with 5+ test cases
- [ ] Test pulsing animation, text display, state transitions
- [ ] Implement __tests__/hooks/useVoiceInput.test.ts with 10+ test cases
- [ ] Test hook initialization, startListening(), stopListening(), state updates
- [ ] Implement __tests__/utils/confidenceValidator.test.ts with 6+ test cases
- [ ] Test confidence threshold validation and warning generation
- [ ] Implement __tests__/integration/VoiceInputFlow.test.tsx with 5+ test cases
- [ ] Test complete flow, permission denied, low-confidence, timeout scenarios
- [ ] Add test:coverage script to package.json
- [ ] Run `npm test` and verify all tests pass
- [ ] Run `npm test -- --coverage` and verify 80%+ coverage for voice modules
- [ ] Review coverage report and add tests for uncovered branches
- [ ] Test on CI/CD pipeline (if available)
- [ ] Document test patterns in README or test documentation
- [ ] **[Mobile Tasks - MANDATORY]** Reference Mobile References table during implementation
- [ ] **[Mobile Tasks - MANDATORY]** Run headless platform builds before marking task complete
- [ ] **[Mobile Tasks - MANDATORY]** Validate permission manifests against task requirements
