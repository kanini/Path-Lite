# Task - TASK_005

## Requirement Reference
- User Story: US_017
- Story Location: .propel/context/tasks/us_017/us_017.md
- Acceptance Criteria:  
    - All AC-1 through AC-5 must be validated through automated tests
- Edge Case:
    - All edge cases must be covered by test scenarios

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
| Library | expo-speech | 11.7+ |
| Library | @react-native-voice/voice | 3.2+ |
| Testing | Jest | 29.6.3 |
| Testing | React Test Renderer | 18.2.0 |
| Testing | @testing-library/react-native | Latest |
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
Implement comprehensive unit and integration tests for Text-to-Speech functionality covering TTSService, voice configuration, TTS-STT integration, and UI components. Tests must validate all acceptance criteria, edge cases, performance requirements (<500ms synthesis), and error handling scenarios to ensure production-ready quality.

## Dependent Tasks
- TASK_001 (TTS Library Integration) - expo-speech must be installed
- TASK_002 (TTS Service Implementation) - TTSService must be available
- TASK_003 (TTS UI Controls) - Voice configuration components must exist
- TASK_004 (TTS-STT Integration) - Conversational flow must be implemented

## Impacted Components
- **NEW**: `__tests__/services/speech/TTSService.test.ts` - TTSService unit tests
- **NEW**: `__tests__/services/speech/VoiceConfig.test.ts` - VoiceConfig unit tests
- **NEW**: `__tests__/hooks/useVoiceConfig.test.ts` - useVoiceConfig hook tests
- **NEW**: `__tests__/hooks/useConversationalFlow.test.ts` - useConversationalFlow hook tests
- **NEW**: `__tests__/components/speech/VoiceConfigPanel.test.tsx` - VoiceConfigPanel component tests
- **NEW**: `__tests__/components/speech/SpeechRateSlider.test.tsx` - SpeechRateSlider component tests
- **NEW**: `__tests__/components/speech/VoiceTypeSelector.test.tsx` - VoiceTypeSelector component tests
- **NEW**: `__tests__/components/conversation/ConversationIndicator.test.tsx` - ConversationIndicator component tests
- **NEW**: `__tests__/integration/TTSSTTIntegration.test.ts` - TTS-STT integration tests
- **NEW**: `__tests__/utils/audioStateDetector.test.ts` - Audio state detector tests

## Implementation Plan
1. **Setup Test Infrastructure**
   - Install @testing-library/react-native if not present
   - Configure Jest to mock expo-speech module
   - Configure Jest to mock @react-native-voice/voice module
   - Create mock implementations for native TTS/STT APIs
   - Setup test utilities for async operations

2. **Implement TTSService Unit Tests**
   - Test speak() method with valid text input
   - Test speak() method with empty text (should throw error)
   - Test speak() method with special characters and emojis
   - Test speech rate configuration (0.5x to 2.0x)
   - Test voice type selection (MALE vs FEMALE)
   - Test pitch adjustment (0.5 to 2.0)
   - Test synthesis performance (<500ms requirement)
   - Test onStart callback invocation
   - Test onDone callback invocation
   - Test onError callback invocation
   - Test pause() method during active speech
   - Test resume() method after pause
   - Test stop() method to cancel speech
   - Test multiple speak() calls (queueing behavior)

3. **Implement VoiceConfig Unit Tests**
   - Test default configuration (rate=1.0, pitch=1.0, voice=FEMALE)
   - Test getVoiceIdentifier() for iOS MALE voice
   - Test getVoiceIdentifier() for iOS FEMALE voice
   - Test getVoiceIdentifier() for Android MALE voice
   - Test getVoiceIdentifier() for Android FEMALE voice
   - Test validateSpeechRate() with valid rates (0.5, 1.0, 2.0)
   - Test validateSpeechRate() with invalid rates (0.3, 2.5)
   - Test configuration update methods
   - Test configuration persistence to MMKV

4. **Implement useVoiceConfig Hook Tests**
   - Test initial state loads from MMKV storage
   - Test updateSpeechRate() with valid rate
   - Test updateSpeechRate() with invalid rate (should reject)
   - Test updateVoiceType() switches between MALE/FEMALE
   - Test configuration persistence after updates
   - Test audit logging for configuration changes
   - Test integration with TTSService

5. **Implement useConversationalFlow Hook Tests**
   - Test startConversation() initiates TTS
   - Test speakQuestion() synthesizes current question
   - Test onSpeechComplete() triggers STT activation
   - Test state transitions: IDLE → SPEAKING → LISTENING
   - Test onTranscriptionComplete() processes answer
   - Test multi-question flow progression
   - Test stopConversation() halts flow
   - Test error handling for TTS failures
   - Test error handling for STT failures
   - Test permission denied scenario

6. **Implement VoiceConfigPanel Component Tests**
   - Test component renders with default configuration
   - Test SpeechRateSlider integration
   - Test VoiceTypeSelector integration
   - Test "Reset to Defaults" button functionality
   - Test "Test Voice" button plays sample phrase
   - Test collapsible panel behavior
   - Test accessibility labels and hints

7. **Implement SpeechRateSlider Component Tests**
   - Test slider renders with current rate value
   - Test onValueChange updates configuration
   - Test visual markers at 0.5x, 1.0x, 1.5x, 2.0x
   - Test haptic feedback on value change (mock)
   - Test accessibility labels for screen readers
   - Test minimum/maximum rate constraints

8. **Implement VoiceTypeSelector Component Tests**
   - Test selector renders with current voice type
   - Test onPress toggles between MALE/FEMALE
   - Test active state styling
   - Test voice preview button functionality
   - Test haptic feedback on selection (mock)
   - Test accessibility labels and hints

9. **Implement ConversationIndicator Component Tests**
   - Test SPEAKING state displays speaker icon with animation
   - Test LISTENING state displays microphone icon with animation
   - Test PROCESSING state displays loading spinner
   - Test IDLE state displays neutral icon
   - Test state label text updates correctly
   - Test smooth transitions between states

10. **Implement Audio State Detector Tests**
    - Test checkVolumeState() detects muted device
    - Test checkVolumeState() returns current volume level
    - Test getVolumeWarningMessage() generates alert text
    - Test platform-specific volume detection (iOS/Android)

11. **Implement TTS-STT Integration Tests**
    - Test complete flow: TTS speaks → STT activates
    - Test first question auto-speaks on form open
    - Test STT activates within 200ms of TTS completion
    - Test listening indicator displays after TTS completes
    - Test multi-question conversation flow
    - Test interruption handling (pause/resume)
    - Test muted device detection and alert
    - Test permission denied scenario
    - Test timeout scenarios

12. **Implement Performance Tests**
    - Test TTS synthesis completes in <500ms (AC-4)
    - Test TTS-STT handoff delay <200ms
    - Test memory usage during extended conversations
    - Test no memory leaks in TTS/STT services

13. **Implement Edge Case Tests**
    - Test muted device detection and visual alert (Edge Case 1)
    - Test TTS interruption by incoming call (Edge Case 2)
    - Test TTS resume after call ends (Edge Case 2)
    - Test background noise handling during STT
    - Test rapid start/stop operations
    - Test concurrent TTS requests

## Current Project State
```
__tests__/
├── services/
│   └── speech/                          # NEW FOLDER
│       ├── TTSService.test.ts           # NEW FILE
│       └── VoiceConfig.test.ts          # NEW FILE
├── hooks/
│   ├── useVoiceConfig.test.ts           # NEW FILE
│   └── useConversationalFlow.test.ts    # NEW FILE
├── components/
│   ├── speech/                          # NEW FOLDER
│   │   ├── VoiceConfigPanel.test.tsx    # NEW FILE
│   │   ├── SpeechRateSlider.test.tsx    # NEW FILE
│   │   └── VoiceTypeSelector.test.tsx   # NEW FILE
│   └── conversation/                    # NEW FOLDER
│       └── ConversationIndicator.test.tsx # NEW FILE
├── integration/                         # NEW FOLDER
│   └── TTSSTTIntegration.test.ts        # NEW FILE
├── utils/
│   └── audioStateDetector.test.ts       # NEW FILE
└── App.test.tsx
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | __tests__/services/speech/TTSService.test.ts | Unit tests for TTSService |
| CREATE | __tests__/services/speech/VoiceConfig.test.ts | Unit tests for VoiceConfig |
| CREATE | __tests__/hooks/useVoiceConfig.test.ts | Tests for useVoiceConfig hook |
| CREATE | __tests__/hooks/useConversationalFlow.test.ts | Tests for useConversationalFlow hook |
| CREATE | __tests__/components/speech/VoiceConfigPanel.test.tsx | Tests for VoiceConfigPanel component |
| CREATE | __tests__/components/speech/SpeechRateSlider.test.tsx | Tests for SpeechRateSlider component |
| CREATE | __tests__/components/speech/VoiceTypeSelector.test.tsx | Tests for VoiceTypeSelector component |
| CREATE | __tests__/components/conversation/ConversationIndicator.test.tsx | Tests for ConversationIndicator component |
| CREATE | __tests__/integration/TTSSTTIntegration.test.ts | Integration tests for TTS-STT flow |
| CREATE | __tests__/utils/audioStateDetector.test.ts | Tests for audio state detector |

> Only list concrete, verifiable file operations. No speculative directory trees.

## External References
- Jest Documentation: https://jestjs.io/docs/getting-started
- React Native Testing Library: https://callstack.github.io/react-native-testing-library/
- Testing React Hooks: https://react-hooks-testing-library.com/
- Mocking Native Modules: https://jestjs.io/docs/manual-mocks
- Testing Async Code: https://jestjs.io/docs/asynchronous
- React Native Testing Best Practices: https://reactnative.dev/docs/testing-overview

## Build Commands
```bash
# Install testing dependencies
npm install --save-dev @testing-library/react-native @testing-library/jest-native

# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- TTSService.test.ts

# Run integration tests only
npm test -- __tests__/integration/

# Type check
npx tsc --noEmit

# Lint
npm run lint
```

## Implementation Validation Strategy
- [x] Unit tests pass
- [x] Integration tests pass (if applicable)
- [x] **[Mobile Tasks]** Headless platform compilation succeeds
- [x] **[Mobile Tasks]** Native dependency linking verified
- [x] **[Mobile Tasks]** Permission manifests validated against task requirements

## Implementation Checklist
- [x] Install @testing-library/react-native and @testing-library/jest-native
- [x] Configure Jest to mock expo-speech module
- [x] Configure Jest to mock @react-native-voice/voice module
- [x] Create mock implementations for native TTS/STT APIs
- [x] Create __tests__/services/speech/TTSService.test.ts
- [x] Test speak() method with valid text input
- [x] Test speak() method with empty text (error case)
- [x] Test speech rate configuration (0.5x to 2.0x)
- [x] Test voice type selection (MALE vs FEMALE)
- [x] Test synthesis performance (<500ms)
- [x] Test onStart, onDone, onError callbacks
- [x] Test pause(), resume(), stop() methods
- [x] Create __tests__/services/speech/VoiceConfig.test.ts
- [x] Test default configuration values
- [x] Test getVoiceIdentifier() for iOS and Android
- [x] Test validateSpeechRate() with valid/invalid rates
- [x] Test configuration persistence to MMKV
- [x] Create __tests__/hooks/useVoiceConfig.test.ts
- [x] Test initial state loads from MMKV
- [x] Test updateSpeechRate() with valid/invalid rates
- [x] Test updateVoiceType() switches voices
- [x] Test audit logging for configuration changes
- [x] Create __tests__/hooks/useConversationalFlow.test.ts
- [x] Test startConversation() initiates TTS
- [x] Test state transitions: IDLE → SPEAKING → LISTENING
- [x] Test onSpeechComplete() triggers STT
- [x] Test multi-question flow progression
- [x] Test error handling for TTS/STT failures
- [x] Create __tests__/components/speech/VoiceConfigPanel.test.tsx
- [x] Test component renders with default configuration
- [x] Test "Reset to Defaults" button
- [x] Test "Test Voice" button plays sample
- [x] Test collapsible panel behavior
- [x] Create __tests__/components/speech/SpeechRateSlider.test.tsx
- [x] Test slider renders with current rate
- [x] Test onValueChange updates configuration
- [x] Test visual markers and constraints
- [x] Create __tests__/components/speech/VoiceTypeSelector.test.tsx
- [x] Test selector renders with current voice
- [x] Test onPress toggles MALE/FEMALE
- [x] Test voice preview button
- [x] Create __tests__/components/conversation/ConversationIndicator.test.tsx
- [x] Test SPEAKING, LISTENING, PROCESSING, IDLE states
- [x] Test state label text updates
- [x] Test smooth transitions between states
- [x] Create __tests__/utils/audioStateDetector.test.ts
- [x] Test checkVolumeState() detects muted device
- [x] Test getVolumeWarningMessage() generates alert
- [x] Create __tests__/integration/TTSSTTIntegration.test.ts
- [x] Test complete flow: TTS speaks → STT activates
- [x] Test first question auto-speaks on form open (AC-2)
- [x] Test STT activates after TTS completes (AC-5)
- [x] Test listening indicator displays (AC-5)
- [x] Test multi-question conversation flow
- [x] Test interruption handling (pause/resume)
- [x] Test muted device detection and alert (Edge Case 1)
- [x] Test TTS interruption by incoming call (Edge Case 2)
- [x] Test TTS resume after call ends (Edge Case 2)
- [x] Test synthesis performance <500ms (AC-4)
- [x] Test TTS-STT handoff delay <200ms
- [x] Verify all tests pass with npm test
- [x] Verify test coverage >80% for TTS components
- [x] Run tests on both iOS and Android platforms
- [x] **[Mobile Tasks - MANDATORY]** Reference Mobile References table during implementation
- [x] **[Mobile Tasks - MANDATORY]** Run headless platform builds before marking task complete
- [x] **[Mobile Tasks - MANDATORY]** Validate permission manifests against task requirements
