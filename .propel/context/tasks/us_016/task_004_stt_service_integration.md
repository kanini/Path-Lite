# Task - TASK_004

## Requirement Reference
- User Story: US_016
- Story Location: .propel/context/tasks/us_016/us_016.md
- Acceptance Criteria:  
    - AC-4: System converts speech to text in under 1 second and displays the captured text for verification
    - AC-5: System stops listening, removes listening indicator, and passes the transcribed text to LLM cleaning pipeline
- Edge Case:
    - Display warning "Background noise detected. Please speak clearly." if confidence is low
    - Configure noise suppression to handle background noise interference

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
| Library | @react-native-voice/voice | 3.2+ |
| Backend | FastAPI | 0.115+ |
| Backend | Python | 3.11+ |
| Mobile | React Native | 0.73.0 |

**Note**: All code, and libraries, MUST be compatible with versions above.

## AI References (AI Tasks Only)
| Reference Type | Value |
|----------------|-------|
| **AI Impact** | Yes |
| **AIR Requirements** | AIR-004 |
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
Implement Speech-to-Text (STT) service integration using @react-native-voice/voice library with native iOS Speech Framework and Android SpeechRecognizer. This task handles audio capture, real-time transcription, confidence scoring, noise suppression configuration, and integration with LLM cleaning pipeline. The service must convert speech to text in under 1 second per AC-4 and handle low-confidence scenarios with user warnings.

## Dependent Tasks
- TASK_001 (Voice Library Integration) - @react-native-voice/voice must be installed
- TASK_002 (Microphone Permission Handling) - Permission service must be available
- TASK_003 (Voice Input UI Component) - AIVoiceIcon component must exist

## Impacted Components
- **NEW**: `src/services/voice/VoiceService.ts` - Core STT service with transcription logic
- **NEW**: `src/services/voice/NoiseSuppressionConfig.ts` - Noise suppression configuration
- **NEW**: `src/types/transcription.ts` - Transcription result type definitions
- **NEW**: `src/utils/confidenceValidator.ts` - Confidence score validation utility
- **MODIFY**: `src/hooks/useVoiceInput.ts` - Integrate VoiceService
- **NEW**: `Server/app/routers/voice.py` - Backend API endpoint for LLM cleaning pipeline (future)

## Implementation Plan
1. **Create Transcription Type Definitions**
   - Define TranscriptionResult interface with text, confidence, timestamp, language
   - Define VoiceError enum: PERMISSION_DENIED, NO_SPEECH, NETWORK_ERROR, TIMEOUT
   - Define NoiseSuppressionLevel enum: LOW, MEDIUM, HIGH
   - Export types for use across voice services

2. **Implement NoiseSuppressionConfig**
   - Configure iOS Speech Framework noise suppression settings
   - Configure Android SpeechRecognizer noise suppression parameters
   - Set default noise suppression level to MEDIUM
   - Provide platform-specific configuration methods

3. **Implement VoiceService**
   - Create startRecording() method to initiate audio capture
   - Create stopRecording() method to end audio capture
   - Configure @react-native-voice/voice with noise suppression enabled
   - Handle onSpeechStart event to update UI state
   - Handle onSpeechResults event to capture transcription
   - Handle onSpeechError event for error handling
   - Implement confidence score extraction from native APIs
   - Add timeout mechanism (5 seconds max recording duration)

4. **Implement Confidence Validation**
   - Create validateConfidence() utility function
   - Set confidence threshold: 0.7 (70%) for acceptance
   - Return warning flag if confidence < 0.7
   - Generate user-friendly warning message: "Background noise detected. Please speak clearly."

5. **Integrate with useVoiceInput Hook**
   - Import VoiceService into useVoiceInput hook
   - Call VoiceService.startRecording() when startListening() is invoked
   - Call VoiceService.stopRecording() when stopListening() is invoked
   - Update voice state based on VoiceService events
   - Handle transcription results and confidence scores
   - Display low-confidence warning to user

6. **Implement Performance Optimization**
   - Ensure transcription completes in under 1 second (AC-4)
   - Use native speech recognition APIs for optimal performance
   - Avoid unnecessary re-renders during transcription
   - Implement debouncing for rapid tap events

7. **Prepare LLM Cleaning Pipeline Integration**
   - Define API contract for backend LLM cleaning endpoint
   - Create placeholder method sendToLLMPipeline() in VoiceService
   - Document expected request/response format
   - Add TODO comment for future backend integration

8. **Implement Error Handling**
   - Handle permission denied errors with user-friendly messages
   - Handle no speech detected errors (silent recording)
   - Handle network errors for future backend integration
   - Handle timeout errors (recording exceeds 5 seconds)
   - Log all errors for debugging (redact PII)

## Current Project State
```
src/
├── services/
│   ├── permissions/
│   │   └── PermissionService.ts
│   ├── voice/                      # NEW FOLDER
│   │   ├── VoiceService.ts         # NEW FILE
│   │   └── NoiseSuppressionConfig.ts  # NEW FILE
│   ├── DataExportService.ts
│   └── index.ts
├── hooks/
│   ├── usePermissions.ts
│   └── useVoiceInput.ts            # TO BE MODIFIED
├── types/
│   ├── permissions.ts
│   ├── voice.ts
│   └── transcription.ts            # NEW FILE
├── utils/
│   └── confidenceValidator.ts      # NEW FILE
└── components/
    └── voice/
        └── AIVoiceIcon.tsx

Server/
├── app/
│   ├── routers/
│   │   └── voice.py                # NEW FILE (placeholder)
│   └── core/
└── main.py
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | src/types/transcription.ts | Transcription result type definitions |
| CREATE | src/services/voice/NoiseSuppressionConfig.ts | Noise suppression configuration for iOS/Android |
| CREATE | src/services/voice/VoiceService.ts | Core STT service with recording and transcription |
| CREATE | src/utils/confidenceValidator.ts | Confidence score validation utility |
| MODIFY | src/hooks/useVoiceInput.ts | Integrate VoiceService for transcription |
| MODIFY | src/services/index.ts | Export VoiceService |
| CREATE | Server/app/routers/voice.py | Backend API endpoint placeholder for LLM pipeline |

> Only list concrete, verifiable file operations. No speculative directory trees.

## External References
- @react-native-voice/voice API Documentation: https://github.com/react-native-voice/voice#api
- iOS Speech Framework: https://developer.apple.com/documentation/speech
- Android SpeechRecognizer: https://developer.android.com/reference/android/speech/SpeechRecognizer
- Speech Recognition Best Practices: https://developer.android.com/guide/topics/voice/speech-recognition
- FastAPI Documentation: https://fastapi.tiangolo.com/
- HIPAA PHI Handling Guidelines: https://www.hhs.gov/hipaa/for-professionals/privacy/laws-regulations/index.html

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

# Test STT on iOS simulator
npx react-native run-ios
# Note: iOS simulator does not support microphone input; test on physical device

# Test STT on Android emulator
npx react-native run-android
# Note: Android emulator supports microphone input via host computer

# Backend server (for future LLM integration)
cd Server && python -m uvicorn main:app --reload
```

## Implementation Validation Strategy
- [ ] Unit tests pass
- [ ] Integration tests pass (if applicable)
- [ ] **[AI Tasks]** Prompt templates validated with test inputs
- [ ] **[AI Tasks]** Guardrails tested for input sanitization and output validation
- [ ] **[AI Tasks]** Fallback logic tested with low-confidence/error scenarios
- [ ] **[AI Tasks]** Token budget enforcement verified
- [ ] **[AI Tasks]** Audit logging verified (no PII in logs)
- [ ] **[Mobile Tasks]** Headless platform compilation succeeds
- [ ] **[Mobile Tasks]** Native dependency linking verified
- [ ] **[Mobile Tasks]** Permission manifests validated against task requirements

## Implementation Checklist
- [ ] Create src/types/transcription.ts with TranscriptionResult interface and enums
- [ ] Implement src/services/voice/NoiseSuppressionConfig.ts with platform-specific settings
- [ ] Set default noise suppression level to MEDIUM
- [ ] Implement src/services/voice/VoiceService.ts with startRecording() and stopRecording()
- [ ] Configure @react-native-voice/voice with noise suppression enabled
- [ ] Handle onSpeechStart event to update UI state
- [ ] Handle onSpeechResults event to capture transcription text
- [ ] Handle onSpeechError event for error handling
- [ ] Extract confidence score from native API results
- [ ] Implement 5-second timeout for recording duration
- [ ] Create src/utils/confidenceValidator.ts with validateConfidence() function
- [ ] Set confidence threshold to 0.7 (70%)
- [ ] Generate warning message for low-confidence results
- [ ] Modify src/hooks/useVoiceInput.ts to integrate VoiceService
- [ ] Call VoiceService.startRecording() in startListening() method
- [ ] Call VoiceService.stopRecording() in stopListening() method
- [ ] Handle transcription results and update state
- [ ] Display low-confidence warning to user
- [ ] Verify transcription completes in under 1 second (AC-4)
- [ ] Test with clear speech on iOS physical device
- [ ] Test with clear speech on Android device/emulator
- [ ] Test with background noise to trigger low-confidence warning
- [ ] Test with no speech (silent recording) to trigger error
- [ ] Test with rapid tap events (debouncing)
- [ ] Test timeout scenario (recording exceeds 5 seconds)
- [ ] Verify permission denied error handling
- [ ] Create Server/app/routers/voice.py placeholder for LLM pipeline
- [ ] Document API contract for LLM cleaning endpoint
- [ ] Add TODO comment for future backend integration
- [ ] Export VoiceService from src/services/index.ts
- [ ] **[AI Tasks - MANDATORY]** Implement guardrails for input sanitization
- [ ] **[AI Tasks - MANDATORY]** Implement fallback logic for low-confidence scenarios
- [ ] **[AI Tasks - MANDATORY]** Log transcription events for audit (redact PII)
- [ ] **[Mobile Tasks - MANDATORY]** Reference Mobile References table during implementation
- [ ] **[Mobile Tasks - MANDATORY]** Run headless platform builds before marking task complete
- [ ] **[Mobile Tasks - MANDATORY]** Validate permission manifests against task requirements
