# Task - TASK_002

## Requirement Reference
- User Story: US_017
- Story Location: .propel/context/tasks/us_017/us_017.md
- Acceptance Criteria:  
    - AC-2: System speaks the first question "Please provide the Medical Record Number" with clear audio quality and natural voice
    - AC-3: System provides options for speech rate (0.5x to 2.0x) and voice selection (male/female) with default settings optimized for clarity
    - AC-4: System completes synthesis in under 500ms and plays audio through device speakers with adequate volume
- Edge Case:
    - Detect muted state; display visual alert "Please unmute device to hear questions" with volume icon
    - Pause TTS on interruption; resume from last question when call ends

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
| Mobile | React Native | 0.73.0 |

**Note**: All code, and libraries, MUST be compatible with versions above.

## AI References (AI Tasks Only)
| Reference Type | Value |
|----------------|-------|
| **AI Impact** | Yes |
| **AIR Requirements** | AIR-003 |
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
Implement Text-to-Speech (TTS) service using expo-speech library with native iOS AVSpeechSynthesizer and Android TextToSpeech. This task handles speech synthesis, voice configuration (rate, pitch, voice selection), audio interruption handling, and volume state detection. The service must complete synthesis in under 500ms per AC-4 and provide natural voice quality with configurable settings.

## Dependent Tasks
- TASK_001 (TTS Library Integration) - expo-speech must be installed

## Impacted Components
- **NEW**: `src/services/speech/TTSService.ts` - Core TTS service with speech synthesis logic
- **NEW**: `src/services/speech/VoiceConfig.ts` - Voice configuration management
- **NEW**: `src/types/speech.ts` - Speech-related type definitions
- **NEW**: `src/utils/audioStateDetector.ts` - Audio state and volume detection utility
- **MODIFY**: `src/services/index.ts` - Export TTSService

## Implementation Plan
1. **Create Speech Type Definitions**
   - Define SpeechConfig interface with rate, pitch, voice, language
   - Define VoiceType enum: MALE, FEMALE
   - Define SpeechRate type: 0.5 to 2.0 range
   - Define TTSError enum: SYNTHESIS_FAILED, INTERRUPTED, MUTED_DEVICE
   - Define SpeechStatus enum: IDLE, SPEAKING, PAUSED, COMPLETED
   - Export types for use across speech services

2. **Implement VoiceConfig**
   - Create default voice configuration: rate=1.0, pitch=1.0, voice=FEMALE
   - Implement getVoiceIdentifier() for platform-specific voice selection
   - iOS: Map MALE to "com.apple.ttsbundle.Daniel-compact", FEMALE to "com.apple.ttsbundle.Samantha-compact"
   - Android: Map MALE to "en-us-x-sfg#male_1-local", FEMALE to "en-us-x-sfg#female_1-local"
   - Implement validateSpeechRate() to ensure rate is between 0.5 and 2.0
   - Provide methods to update configuration dynamically

3. **Implement AudioStateDetector**
   - Create checkVolumeState() method to detect muted device
   - Use platform-specific APIs to check system volume level
   - Return isMuted boolean and currentVolume number
   - Implement getVolumeWarningMessage() to generate user-friendly alert

4. **Implement TTSService Core Methods**
   - Create speak() method to synthesize and play speech
   - Accept text string and optional SpeechConfig override
   - Use expo-speech Speech.speak() API with configuration
   - Implement onStart callback to update speech status
   - Implement onDone callback to trigger STT activation
   - Implement onError callback for error handling
   - Add performance tracking to ensure <500ms synthesis time

5. **Implement Voice Configuration Methods**
   - Create setVoiceType() to switch between MALE/FEMALE voices
   - Create setSpeechRate() to adjust speed (0.5x to 2.0x)
   - Create setPitch() to adjust voice pitch (0.5 to 2.0)
   - Validate all configuration changes before applying
   - Persist voice preferences to MMKV storage for user consistency

6. **Implement Interruption Handling**
   - Create pause() method to pause current speech
   - Create resume() method to resume paused speech
   - Implement audio interruption listeners for incoming calls
   - Store current speech position on interruption
   - Resume from last position when interruption ends
   - Handle multiple interruption scenarios (calls, alarms, notifications)

7. **Implement Volume State Detection**
   - Check volume state before speaking
   - If muted, return error with MUTED_DEVICE status
   - Generate visual alert message for UI display
   - Provide retry mechanism after user unmutes device

8. **Implement Performance Optimization**
   - Ensure synthesis completes in under 500ms (AC-4)
   - Use native speech synthesis APIs for optimal performance
   - Pre-load voice resources on service initialization
   - Implement speech queue for multiple questions
   - Add telemetry to track synthesis performance

9. **Implement Error Handling**
   - Handle synthesis failures with user-friendly messages
   - Handle device muted errors with visual alerts
   - Handle interruption errors gracefully
   - Log all errors for debugging (redact PII)
   - Provide fallback to text display if TTS fails

## Current Project State
```
src/
├── services/
│   ├── auth/
│   │   └── authService.ts
│   ├── speech/                      # NEW FOLDER
│   │   ├── TTSService.ts            # NEW FILE
│   │   └── VoiceConfig.ts           # NEW FILE
│   ├── DataExportService.ts
│   └── index.ts                     # TO BE MODIFIED
├── types/
│   ├── permissions.ts
│   ├── voice.ts
│   └── speech.ts                    # NEW FILE
├── utils/
│   └── audioStateDetector.ts        # NEW FILE
└── components/
    └── voice/
        └── AIVoiceIcon.tsx
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | src/types/speech.ts | Speech-related type definitions (SpeechConfig, VoiceType, etc.) |
| CREATE | src/services/speech/VoiceConfig.ts | Voice configuration management with platform-specific mappings |
| CREATE | src/services/speech/TTSService.ts | Core TTS service with synthesis and interruption handling |
| CREATE | src/utils/audioStateDetector.ts | Audio state and volume detection utility |
| MODIFY | src/services/index.ts | Export TTSService |

> Only list concrete, verifiable file operations. No speculative directory trees.

## External References
- expo-speech API Documentation: https://docs.expo.dev/versions/latest/sdk/speech/
- iOS AVSpeechSynthesizer: https://developer.apple.com/documentation/avfoundation/avspeechsynthesizer
- Android TextToSpeech: https://developer.android.com/reference/android/speech/tts/TextToSpeech
- Speech Synthesis Best Practices: https://developer.android.com/guide/topics/text/speech-synthesis
- Audio Interruption Handling: https://developer.apple.com/documentation/avfoundation/avaudiosession/responding_to_audio_session_interruptions
- MMKV Storage Documentation: https://github.com/mrousavy/react-native-mmkv

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

# Test TTS on iOS simulator
npx react-native run-ios
# Note: iOS simulator supports audio output

# Test TTS on Android emulator
npx react-native run-android
# Note: Android emulator supports audio output
```

## Implementation Validation Strategy
- [ ] Unit tests pass
- [ ] Integration tests pass (if applicable)
- [ ] **[AI Tasks]** Guardrails tested for input sanitization and output validation
- [ ] **[AI Tasks]** Fallback logic tested with error scenarios
- [ ] **[AI Tasks]** Audit logging verified (no PII in logs)
- [ ] **[Mobile Tasks]** Headless platform compilation succeeds
- [ ] **[Mobile Tasks]** Native dependency linking verified
- [ ] **[Mobile Tasks]** Permission manifests validated against task requirements

## Implementation Checklist
- [ ] Create src/types/speech.ts with SpeechConfig, VoiceType, SpeechRate, TTSError, SpeechStatus
- [ ] Implement src/services/speech/VoiceConfig.ts with default configuration
- [ ] Set default voice: rate=1.0, pitch=1.0, voice=FEMALE
- [ ] Implement getVoiceIdentifier() with platform-specific voice mappings
- [ ] Implement validateSpeechRate() to ensure 0.5-2.0 range
- [ ] Create src/utils/audioStateDetector.ts with checkVolumeState()
- [ ] Implement platform-specific volume detection APIs
- [ ] Implement getVolumeWarningMessage() for muted device alert
- [ ] Create src/services/speech/TTSService.ts with speak() method
- [ ] Configure expo-speech Speech.speak() with voice settings
- [ ] Implement onStart callback to update speech status
- [ ] Implement onDone callback to trigger STT activation
- [ ] Implement onError callback for error handling
- [ ] Add performance tracking to ensure <500ms synthesis (AC-4)
- [ ] Implement setVoiceType() to switch between MALE/FEMALE
- [ ] Implement setSpeechRate() to adjust speed (0.5x to 2.0x)
- [ ] Implement setPitch() to adjust voice pitch
- [ ] Persist voice preferences to MMKV storage
- [ ] Implement pause() method for speech interruption
- [ ] Implement resume() method to continue paused speech
- [ ] Add audio interruption listeners for incoming calls
- [ ] Store current speech position on interruption
- [ ] Resume from last position when interruption ends
- [ ] Check volume state before speaking
- [ ] Return MUTED_DEVICE error if device is muted
- [ ] Generate visual alert message for UI display
- [ ] Verify synthesis completes in under 500ms (AC-4)
- [ ] Test with first question: "Please provide the Medical Record Number" (AC-2)
- [ ] Test voice quality on iOS physical device
- [ ] Test voice quality on Android device/emulator
- [ ] Test speech rate adjustment (0.5x, 1.0x, 1.5x, 2.0x)
- [ ] Test voice selection (MALE vs FEMALE)
- [ ] Test with muted device to trigger alert
- [ ] Test interruption handling with incoming call simulation
- [ ] Test resume functionality after interruption
- [ ] Verify error handling for synthesis failures
- [ ] Export TTSService from src/services/index.ts
- [ ] **[AI Tasks - MANDATORY]** Implement guardrails for text sanitization before synthesis
- [ ] **[AI Tasks - MANDATORY]** Implement fallback to text display if TTS fails
- [ ] **[AI Tasks - MANDATORY]** Log speech events for audit (redact PII)
- [ ] **[Mobile Tasks - MANDATORY]** Reference Mobile References table during implementation
- [ ] **[Mobile Tasks - MANDATORY]** Run headless platform builds before marking task complete
- [ ] **[Mobile Tasks - MANDATORY]** Validate permission manifests against task requirements
