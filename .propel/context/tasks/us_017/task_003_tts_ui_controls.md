# Task - TASK_003

## Requirement Reference
- User Story: US_017
- Story Location: .propel/context/tasks/us_017/us_017.md
- Acceptance Criteria:  
    - AC-3: System provides options for speech rate (0.5x to 2.0x) and voice selection (male/female) with default settings optimized for clarity
- Edge Case:
    - N/A

## Design References (Frontend Tasks Only)
| Reference Type | Value |
|----------------|-------|
| **UI Impact** | Yes |
| **Figma URL** | N/A |
| **Wireframe Status** | PENDING |
| **Wireframe Type** | N/A |
| **Wireframe Path/URL** | TODO: Provide wireframe - upload to `.propel/context/wireframes/Hi-Fi/wireframe-SCR-006-tts-controls.[html|png|jpg]` or add external URL |
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
Implement voice configuration UI controls for Text-to-Speech settings including speech rate slider (0.5x to 2.0x), voice type selector (male/female), and visual feedback for current settings. This task provides nurses with intuitive controls to customize TTS output for optimal clarity and personal preference while maintaining HIPAA-compliant audit logging of configuration changes.

## Dependent Tasks
- TASK_001 (TTS Library Integration) - expo-speech must be installed
- TASK_002 (TTS Service Implementation) - TTSService must be available

## Impacted Components
- **NEW**: `src/components/speech/VoiceConfigPanel.tsx` - Voice configuration UI panel
- **NEW**: `src/components/speech/SpeechRateSlider.tsx` - Speech rate adjustment slider
- **NEW**: `src/components/speech/VoiceTypeSelector.tsx` - Male/Female voice selector
- **NEW**: `src/hooks/useVoiceConfig.ts` - Voice configuration state management hook
- **MODIFY**: `src/components/index.ts` - Export new speech components

## Implementation Plan
1. **Create useVoiceConfig Hook**
   - Manage voice configuration state (rate, voice type)
   - Load saved preferences from MMKV storage on mount
   - Provide updateSpeechRate() method with validation (0.5-2.0 range)
   - Provide updateVoiceType() method to switch MALE/FEMALE
   - Persist configuration changes to MMKV storage
   - Integrate with TTSService to apply configuration
   - Add audit logging for configuration changes (HIPAA compliance)

2. **Implement SpeechRateSlider Component**
   - Create slider component with range 0.5 to 2.0
   - Display current rate value (e.g., "1.0x", "1.5x", "2.0x")
   - Implement step increments of 0.1 for smooth adjustment
   - Add visual markers at 0.5x, 1.0x, 1.5x, 2.0x positions
   - Highlight default rate (1.0x) with distinct color
   - Handle onValueChange to update configuration
   - Implement haptic feedback on value change (iOS/Android)
   - Add accessibility labels for screen readers

3. **Implement VoiceTypeSelector Component**
   - Create segmented control with MALE and FEMALE options
   - Display current selection with active state styling
   - Implement toggle behavior between voice types
   - Add voice preview button to test selected voice
   - Handle onPress to update voice type configuration
   - Implement haptic feedback on selection change
   - Add accessibility labels and hints

4. **Implement VoiceConfigPanel Component**
   - Create container panel for voice configuration controls
   - Integrate SpeechRateSlider component
   - Integrate VoiceTypeSelector component
   - Add section headers: "Speech Rate" and "Voice Type"
   - Display current configuration summary at top
   - Add "Reset to Defaults" button (rate=1.0, voice=FEMALE)
   - Implement collapsible panel behavior (expand/collapse)
   - Add settings icon to trigger panel display
   - Style according to Material Design 3 (Android) and HIG (iOS)

5. **Implement Configuration Persistence**
   - Save voice configuration to MMKV storage on change
   - Key: "voice_config" with JSON serialized data
   - Load configuration on app startup
   - Provide migration logic for configuration schema changes
   - Handle storage errors gracefully with fallback to defaults

6. **Implement Voice Preview**
   - Add "Test Voice" button in VoiceConfigPanel
   - Play sample phrase: "This is how I will sound" with current settings
   - Disable other controls during preview playback
   - Show playback indicator during preview
   - Allow cancellation of preview

7. **Implement Accessibility Features**
   - Add ARIA labels for all interactive controls
   - Support keyboard navigation for slider and selector
   - Implement screen reader announcements for value changes
   - Ensure minimum touch target size (44x44 points iOS, 48x48dp Android)
   - Test with VoiceOver (iOS) and TalkBack (Android)

8. **Implement Audit Logging**
   - Log configuration changes to audit trail
   - Include: timestamp, user ID, old value, new value, setting type
   - Redact PII from logs
   - Store audit logs in secure MMKV storage
   - Provide export capability for compliance audits

## Current Project State
```
src/
├── components/
│   ├── speech/                      # NEW FOLDER
│   │   ├── VoiceConfigPanel.tsx     # NEW FILE
│   │   ├── SpeechRateSlider.tsx     # NEW FILE
│   │   └── VoiceTypeSelector.tsx    # NEW FILE
│   ├── voice/
│   │   └── AIVoiceIcon.tsx
│   └── index.ts                     # TO BE MODIFIED
├── hooks/
│   ├── usePermissions.ts
│   ├── useVoiceInput.ts
│   └── useVoiceConfig.ts            # NEW FILE
├── services/
│   └── speech/
│       ├── TTSService.ts
│       └── VoiceConfig.ts
└── types/
    └── speech.ts
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | src/hooks/useVoiceConfig.ts | Voice configuration state management hook |
| CREATE | src/components/speech/SpeechRateSlider.tsx | Speech rate adjustment slider (0.5x-2.0x) |
| CREATE | src/components/speech/VoiceTypeSelector.tsx | Male/Female voice type selector |
| CREATE | src/components/speech/VoiceConfigPanel.tsx | Container panel for voice configuration controls |
| MODIFY | src/components/index.ts | Export new speech components |

> Only list concrete, verifiable file operations. No speculative directory trees.

## External References
- React Native Slider: https://github.com/callstack/react-native-slider
- React Native Haptic Feedback: https://reactnative.dev/docs/vibration
- iOS Human Interface Guidelines - Sliders: https://developer.apple.com/design/human-interface-guidelines/sliders
- Material Design 3 - Sliders: https://m3.material.io/components/sliders/overview
- WCAG 2.1 Accessibility Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
- MMKV Storage: https://github.com/mrousavy/react-native-mmkv
- HIPAA Audit Trail Requirements: https://www.hhs.gov/hipaa/for-professionals/security/laws-regulations/index.html

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
- [ ] **[Mobile Tasks]** Headless platform compilation succeeds
- [ ] **[Mobile Tasks]** Native dependency linking verified
- [ ] **[Mobile Tasks]** Permission manifests validated against task requirements

## Implementation Checklist
- [ ] Create src/hooks/useVoiceConfig.ts with state management
- [ ] Implement updateSpeechRate() with 0.5-2.0 validation
- [ ] Implement updateVoiceType() to switch MALE/FEMALE
- [ ] Load saved preferences from MMKV on mount
- [ ] Persist configuration changes to MMKV storage
- [ ] Integrate with TTSService to apply configuration
- [ ] Add audit logging for configuration changes
- [ ] Create src/components/speech/SpeechRateSlider.tsx
- [ ] Implement slider with range 0.5 to 2.0, step 0.1
- [ ] Display current rate value (e.g., "1.0x")
- [ ] Add visual markers at 0.5x, 1.0x, 1.5x, 2.0x
- [ ] Highlight default rate (1.0x) with distinct color
- [ ] Implement haptic feedback on value change
- [ ] Add accessibility labels for screen readers
- [ ] Create src/components/speech/VoiceTypeSelector.tsx
- [ ] Implement segmented control with MALE/FEMALE options
- [ ] Display current selection with active state styling
- [ ] Add voice preview button to test selected voice
- [ ] Implement haptic feedback on selection change
- [ ] Add accessibility labels and hints
- [ ] Create src/components/speech/VoiceConfigPanel.tsx
- [ ] Integrate SpeechRateSlider component
- [ ] Integrate VoiceTypeSelector component
- [ ] Add section headers: "Speech Rate" and "Voice Type"
- [ ] Display current configuration summary
- [ ] Add "Reset to Defaults" button
- [ ] Implement collapsible panel behavior
- [ ] Add settings icon to trigger panel display
- [ ] Implement "Test Voice" button with sample phrase
- [ ] Play sample: "This is how I will sound" with current settings
- [ ] Disable controls during preview playback
- [ ] Show playback indicator during preview
- [ ] Allow cancellation of preview
- [ ] Ensure minimum touch target size (44x44 iOS, 48x48dp Android)
- [ ] Test with VoiceOver (iOS) screen reader
- [ ] Test with TalkBack (Android) screen reader
- [ ] Test keyboard navigation for slider and selector
- [ ] Verify audit logging captures configuration changes
- [ ] Test configuration persistence across app restarts
- [ ] Test "Reset to Defaults" functionality
- [ ] Verify haptic feedback on iOS and Android
- [ ] Export components from src/components/index.ts
- [ ] **[UI Tasks - MANDATORY]** Reference wireframe from Design References table during implementation
- [ ] **[UI Tasks - MANDATORY]** Validate UI matches wireframe before marking task complete
- [ ] **[Mobile Tasks - MANDATORY]** Reference Mobile References table during implementation
- [ ] **[Mobile Tasks - MANDATORY]** Run headless platform builds before marking task complete
- [ ] **[Mobile Tasks - MANDATORY]** Validate permission manifests against task requirements
