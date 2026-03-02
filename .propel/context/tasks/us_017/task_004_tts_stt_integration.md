# Task - TASK_004

## Requirement Reference
- User Story: US_017
- Story Location: .propel/context/tasks/us_017/us_017.md
- Acceptance Criteria:  
    - AC-2: System speaks the first question "Please provide the Medical Record Number" with clear audio quality and natural voice when form opens
    - AC-5: System automatically activates STT listening mode and displays listening indicator when TTS completes a question
- Edge Case:
    - N/A

## Design References (Frontend Tasks Only)
| Reference Type | Value |
|----------------|-------|
| **UI Impact** | Yes |
| **Figma URL** | N/A |
| **Wireframe Status** | PENDING |
| **Wireframe Type** | N/A |
| **Wireframe Path/URL** | TODO: Provide wireframe - upload to `.propel/context/wireframes/Hi-Fi/wireframe-SCR-006-tts-stt-flow.[html|png|jpg]` or add external URL |
| **Screen Spec** | figma_spec.md#SCR-006 |
| **UXR Requirements** | UXR-003, UXR-501 |
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
| Frontend | TypeScript | 5.0.4 |
| Library | expo-speech | 11.7+ |
| Library | @react-native-voice/voice | 3.2+ |
| Mobile | React Native | 0.73.0 |

**Note**: All code, and libraries, MUST be compatible with versions above.

## AI References (AI Tasks Only)
| Reference Type | Value |
|----------------|-------|
| **AI Impact** | Yes |
| **AIR Requirements** | AIR-003, AIR-004 |
| **AI Pattern** | N/A |
| **Prompt Template Path** | N/A |
| **Guardrails Config** | N/A |
| **Model Provider** | N/A |

> **AI Impact Legend:**
> - **Yes**: Task involves LLM integration, RAG pipeline, prompt engineering, or AI infrastructure
> - **No**: Task is deterministic (FE/BE/DB only)
>
> If AI Impact = No, all AI references should be N/A

### **CRITICAL: AI Implementation Requirement (AI Tasks Only)**
**IF AI Impact = Yes:**
- **MUST** reference prompt templates from Prompt Template Path during implementation
- **MUST** implement guardrails for input sanitization and output validation
- **MUST** enforce token budget limits per AIR-O01 requirements
- **MUST** implement fallback logic for low-confidence responses
- **MUST** log all prompts/responses for audit (redact PII)
- **MUST** handle model failures gracefully (timeout, rate limit, 5xx errors)

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
Implement seamless integration between Text-to-Speech (TTS) and Speech-to-Text (STT) services to create a conversational flow. When a form opens, TTS automatically speaks the first question, and upon completion, STT listening mode activates automatically with visual indicator. This task orchestrates the TTS→STT handoff to enable hands-free form completion for nurses.

## Dependent Tasks
- TASK_001 (TTS Library Integration) - expo-speech must be installed
- TASK_002 (TTS Service Implementation) - TTSService must be available
- US_016 TASK_001 (Voice Library Integration) - @react-native-voice/voice must be installed
- US_016 TASK_004 (STT Service Integration) - VoiceService must be available

## Impacted Components
- **NEW**: `src/hooks/useConversationalFlow.ts` - TTS-STT orchestration hook
- **NEW**: `src/components/conversation/ConversationIndicator.tsx` - Visual state indicator (speaking/listening)
- **NEW**: `src/types/conversation.ts` - Conversation flow type definitions
- **MODIFY**: `src/screens/patient/PatientFormScreen.tsx` - Integrate conversational flow
- **MODIFY**: `src/components/index.ts` - Export ConversationIndicator

## Implementation Plan
1. **Create Conversation Type Definitions**
   - Define ConversationState enum: IDLE, SPEAKING, LISTENING, PROCESSING
   - Define ConversationConfig interface with autoActivateSTT, firstQuestion
   - Define ConversationEvent type for state transitions
   - Export types for use across conversation components

2. **Implement useConversationalFlow Hook**
   - Accept form questions array as input parameter
   - Manage conversation state (IDLE → SPEAKING → LISTENING → PROCESSING)
   - Initialize TTSService and VoiceService on mount
   - Implement startConversation() method to begin TTS-STT flow
   - Implement speakQuestion() method to synthesize current question
   - Implement onSpeechComplete() callback to trigger STT activation
   - Implement onTranscriptionComplete() callback to process answer
   - Implement stopConversation() method to halt flow
   - Track current question index for multi-question forms

3. **Implement TTS Completion Handler**
   - Register onDone callback with TTSService
   - Transition state from SPEAKING to LISTENING
   - Trigger STT activation via VoiceService.startRecording()
   - Update UI to show listening indicator
   - Add 200ms delay between TTS completion and STT activation for smooth transition

4. **Implement STT Activation Logic**
   - Call VoiceService.startRecording() when TTS completes
   - Check microphone permissions before activation
   - Handle permission denied scenario with user prompt
   - Display listening indicator (pulsing microphone icon)
   - Set 5-second timeout for STT listening

5. **Implement ConversationIndicator Component**
   - Create visual indicator for conversation state
   - SPEAKING state: Show speaker icon with sound waves animation
   - LISTENING state: Show microphone icon with pulsing animation
   - PROCESSING state: Show loading spinner
   - IDLE state: Show neutral icon
   - Add state label text below icon (e.g., "Speaking...", "Listening...")
   - Implement smooth transitions between states
   - Style according to Material Design 3 and HIG

6. **Implement Auto-Start on Form Open**
   - Integrate useConversationalFlow in PatientFormScreen
   - Call startConversation() in useEffect on component mount
   - Pass first question: "Please provide the Medical Record Number"
   - Ensure TTS activates only once per form session
   - Handle navigation away from form (cleanup listeners)

7. **Implement Multi-Question Flow**
   - Track current question index in state
   - After STT captures answer, move to next question
   - Speak next question automatically after answer processing
   - Continue TTS→STT cycle until all questions answered
   - Provide manual skip option for each question

8. **Implement Error Handling**
   - Handle TTS synthesis failures (fallback to text display)
   - Handle STT activation failures (show manual input option)
   - Handle permission denied errors (prompt user to enable)
   - Handle timeout errors (allow retry or manual input)
   - Log all errors for debugging (redact PII)

9. **Implement Accessibility Features**
   - Provide visual indicators for deaf/hard-of-hearing users
   - Add haptic feedback for state transitions
   - Support manual override to skip TTS and use STT only
   - Ensure screen reader announces state changes
   - Test with VoiceOver and TalkBack

10. **Implement Performance Optimization**
    - Pre-load TTS voices on app startup
    - Pre-warm STT engine before activation
    - Minimize delay between TTS completion and STT activation (<200ms)
    - Avoid unnecessary re-renders during state transitions
    - Implement debouncing for rapid state changes

## Current Project State
```
src/
├── hooks/
│   ├── usePermissions.ts
│   ├── useVoiceInput.ts
│   ├── useVoiceConfig.ts
│   └── useConversationalFlow.ts      # NEW FILE
├── components/
│   ├── conversation/                 # NEW FOLDER
│   │   └── ConversationIndicator.tsx # NEW FILE
│   ├── speech/
│   │   └── VoiceConfigPanel.tsx
│   ├── voice/
│   │   └── AIVoiceIcon.tsx
│   └── index.ts                      # TO BE MODIFIED
├── screens/
│   └── patient/
│       └── PatientFormScreen.tsx     # TO BE MODIFIED
├── services/
│   ├── speech/
│   │   └── TTSService.ts
│   └── voice/
│       └── VoiceService.ts
└── types/
    ├── speech.ts
    ├── transcription.ts
    └── conversation.ts               # NEW FILE
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | src/types/conversation.ts | Conversation flow type definitions |
| CREATE | src/hooks/useConversationalFlow.ts | TTS-STT orchestration hook |
| CREATE | src/components/conversation/ConversationIndicator.tsx | Visual state indicator component |
| MODIFY | src/screens/patient/PatientFormScreen.tsx | Integrate conversational flow on form open |
| MODIFY | src/components/index.ts | Export ConversationIndicator |

> Only list concrete, verifiable file operations. No speculative directory trees.

## External References
- expo-speech Documentation: https://docs.expo.dev/versions/latest/sdk/speech/
- @react-native-voice/voice Documentation: https://github.com/react-native-voice/voice
- React Native Animated API: https://reactnative.dev/docs/animated
- iOS Human Interface Guidelines - Audio: https://developer.apple.com/design/human-interface-guidelines/playing-audio
- Material Design 3 - Motion: https://m3.material.io/styles/motion/overview
- WCAG 2.1 - Audio Control: https://www.w3.org/WAI/WCAG21/Understanding/audio-control.html

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

# Run tests
npm test
```

## Implementation Validation Strategy
- [ ] Unit tests pass
- [ ] Integration tests pass (if applicable)
- [ ] **[UI Tasks]** Visual comparison against wireframe completed at 375px, 768px, 1440px
- [ ] **[UI Tasks]** Run `/analyze-ux` to validate wireframe alignment
- [ ] **[AI Tasks]** Guardrails tested for input sanitization and output validation
- [ ] **[AI Tasks]** Fallback logic tested with error scenarios
- [ ] **[AI Tasks]** Audit logging verified (no PII in logs)
- [ ] **[Mobile Tasks]** Headless platform compilation succeeds
- [ ] **[Mobile Tasks]** Native dependency linking verified
- [ ] **[Mobile Tasks]** Permission manifests validated against task requirements

## Implementation Checklist
- [ ] Create src/types/conversation.ts with ConversationState, ConversationConfig, ConversationEvent
- [ ] Create src/hooks/useConversationalFlow.ts with state management
- [ ] Accept form questions array as input parameter
- [ ] Initialize TTSService and VoiceService on mount
- [ ] Implement startConversation() method
- [ ] Implement speakQuestion() method to synthesize current question
- [ ] Register onDone callback with TTSService
- [ ] Implement onSpeechComplete() to transition SPEAKING → LISTENING
- [ ] Trigger VoiceService.startRecording() when TTS completes
- [ ] Add 200ms delay between TTS completion and STT activation
- [ ] Check microphone permissions before STT activation
- [ ] Handle permission denied scenario with user prompt
- [ ] Implement onTranscriptionComplete() callback to process answer
- [ ] Track current question index for multi-question forms
- [ ] Move to next question after answer captured
- [ ] Speak next question automatically after processing
- [ ] Implement stopConversation() method to halt flow
- [ ] Create src/components/conversation/ConversationIndicator.tsx
- [ ] Implement SPEAKING state: speaker icon with sound waves animation
- [ ] Implement LISTENING state: microphone icon with pulsing animation
- [ ] Implement PROCESSING state: loading spinner
- [ ] Implement IDLE state: neutral icon
- [ ] Add state label text below icon
- [ ] Implement smooth transitions between states
- [ ] Modify src/screens/patient/PatientFormScreen.tsx
- [ ] Integrate useConversationalFlow hook
- [ ] Call startConversation() in useEffect on mount
- [ ] Pass first question: "Please provide the Medical Record Number"
- [ ] Ensure TTS activates only once per form session
- [ ] Handle navigation away from form (cleanup listeners)
- [ ] Implement error handling for TTS synthesis failures
- [ ] Implement error handling for STT activation failures
- [ ] Implement error handling for permission denied
- [ ] Implement error handling for timeout errors
- [ ] Log all errors for debugging (redact PII)
- [ ] Add haptic feedback for state transitions
- [ ] Support manual override to skip TTS
- [ ] Ensure screen reader announces state changes
- [ ] Test with VoiceOver (iOS) screen reader
- [ ] Test with TalkBack (Android) screen reader
- [ ] Pre-load TTS voices on app startup
- [ ] Pre-warm STT engine before activation
- [ ] Minimize delay between TTS and STT (<200ms)
- [ ] Test complete flow: form open → TTS speaks → STT activates → answer captured
- [ ] Test with first question: "Please provide the Medical Record Number"
- [ ] Test multi-question flow with 3+ questions
- [ ] Test manual skip functionality
- [ ] Test error scenarios (TTS failure, STT failure, permission denied)
- [ ] Verify listening indicator displays correctly
- [ ] Verify smooth state transitions
- [ ] Export ConversationIndicator from src/components/index.ts
- [ ] **[UI Tasks - MANDATORY]** Reference wireframe from Design References table during implementation
- [ ] **[UI Tasks - MANDATORY]** Validate UI matches wireframe before marking task complete
- [ ] **[AI Tasks - MANDATORY]** Implement guardrails for text sanitization
- [ ] **[AI Tasks - MANDATORY]** Implement fallback logic for TTS/STT failures
- [ ] **[AI Tasks - MANDATORY]** Log conversation events for audit (redact PII)
- [ ] **[Mobile Tasks - MANDATORY]** Reference Mobile References table during implementation
- [ ] **[Mobile Tasks - MANDATORY]** Run headless platform builds before marking task complete
- [ ] **[Mobile Tasks - MANDATORY]** Validate permission manifests against task requirements
