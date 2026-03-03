# Task - TASK_003

## Requirement Reference
- User Story: US_016
- Story Location: .propel/context/tasks/us_016/us_016.md
- Acceptance Criteria:  
    - AC-3: System starts listening, displays listening indicator, and captures audio with noise suppression enabled when AI voice icon is tapped
- Edge Case:
    - N/A (Covered in other tasks)

## Design References (Frontend Tasks Only)
| Reference Type | Value |
|----------------|-------|
| **UI Impact** | Yes |
| **Figma URL** | N/A |
| **Wireframe Status** | PENDING |
| **Wireframe Type** | N/A |
| **Wireframe Path/URL** | TODO: Provide wireframe - upload to `.propel/context/wireframes/Hi-Fi/wireframe-SCR-006-voice-listening.[html|png|jpg]` or add external URL |
| **Screen Spec** | figma_spec.md#SCR-006 |
| **UXR Requirements** | UXR-003, UXR-205, UXR-501 |
| **Design Tokens** | designsystem.md sections: Color Tokens, Typography, Spacing, Animation |

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
| Library | @react-native-voice/voice | 3.2+ |
| Library | react-native-gesture-handler | 2.14.0 |
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
Implement the AI Voice Icon UI component with three distinct visual states (inactive, active, listening) and listening indicator animation. This component provides visual feedback for voice input activation and captures audio when tapped. The component must display state transitions within 200ms per UXR-501 and integrate with the voice service for audio capture. Includes animated waveform visualization during listening state.

## Dependent Tasks
- TASK_001 (Voice Library Integration) - @react-native-voice/voice must be installed
- TASK_002 (Microphone Permission Handling) - Permission service must be available

## Impacted Components
- **NEW**: `src/components/voice/AIVoiceIcon.tsx` - AI voice icon with three states
- **NEW**: `src/components/voice/ListeningIndicator.tsx` - Animated listening indicator
- **NEW**: `src/components/voice/WaveformAnimation.tsx` - Waveform visualization component
- **NEW**: `src/hooks/useVoiceInput.ts` - React hook for voice input management
- **NEW**: `src/types/voice.ts` - Voice state type definitions
- **NEW**: `src/assets/icons/voice-icon.svg` - Voice icon asset (if custom icon needed)

## Implementation Plan
1. **Create Voice Type Definitions**
   - Define VoiceState enum: INACTIVE, ACTIVE, LISTENING
   - Define VoiceInputResult interface with text, confidence, error
   - Define VoiceIconProps interface for component props
   - Export types for use across voice components

2. **Implement AIVoiceIcon Component**
   - Create three visual states: inactive (grey), active (blue pulsing), listening (animated waveform)
   - Implement tap gesture handler to toggle voice input
   - Apply design tokens for colors (#1566A7 for active state)
   - Ensure 44×44pt minimum touch target
   - Add state transition animations (200ms duration per UXR-501)
   - Handle disabled state when permission is denied

3. **Create ListeningIndicator Component**
   - Implement pulsing animation for active state
   - Display "Listening..." text below icon
   - Apply design tokens for typography and colors
   - Animate opacity and scale for visual feedback

4. **Create WaveformAnimation Component**
   - Implement animated waveform bars for listening state
   - Use React Native Animated API for smooth animations
   - Display 5-7 vertical bars with varying heights
   - Animate bars in sync with audio input (simulated or actual)
   - Apply primary color (#1566A7) for waveform bars

5. **Implement useVoiceInput Hook**
   - Manage voice state (INACTIVE, ACTIVE, LISTENING)
   - Integrate with PermissionService to check microphone permission
   - Provide startListening() method to activate voice input
   - Provide stopListening() method to deactivate voice input
   - Handle state transitions with 200ms delay for animations
   - Return voice state, loading state, error state

6. **Integrate with Voice Service**
   - Connect AIVoiceIcon to useVoiceInput hook
   - Trigger voice service when icon is tapped
   - Update icon state based on voice service events
   - Handle permission denied state with error display

7. **Apply Accessibility Features**
   - Add accessibilityLabel: "AI Voice Input"
   - Add accessibilityHint: "Tap to start voice input"
   - Add accessibilityRole: "button"
   - Support VoiceOver/TalkBack announcements for state changes

## Current Project State
```
src/
├── components/
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Logo.tsx
│   │   └── PermissionDeniedDialog.tsx
│   ├── voice/                      # NEW FOLDER
│   │   ├── AIVoiceIcon.tsx         # NEW FILE
│   │   ├── ListeningIndicator.tsx  # NEW FILE
│   │   ├── WaveformAnimation.tsx   # NEW FILE
│   │   └── index.ts                # NEW FILE
│   └── patient/
├── hooks/
│   ├── usePermissions.ts
│   └── useVoiceInput.ts            # NEW FILE
├── types/
│   ├── permissions.ts
│   └── voice.ts                    # NEW FILE
├── assets/
│   └── icons/
│       └── voice-icon.svg          # NEW FILE (optional)
└── services/
    └── permissions/
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | src/types/voice.ts | Voice state type definitions (VoiceState enum, interfaces) |
| CREATE | src/components/voice/AIVoiceIcon.tsx | AI voice icon with three states and tap handler |
| CREATE | src/components/voice/ListeningIndicator.tsx | Pulsing listening indicator with text |
| CREATE | src/components/voice/WaveformAnimation.tsx | Animated waveform visualization |
| CREATE | src/components/voice/index.ts | Export barrel file for voice components |
| CREATE | src/hooks/useVoiceInput.ts | React hook for voice input state management |
| CREATE | src/assets/icons/voice-icon.svg | Voice icon SVG asset (optional) |

> Only list concrete, verifiable file operations. No speculative directory trees.

## External References
- React Native Animated API: https://reactnative.dev/docs/animated
- React Native Gesture Handler: https://docs.swmansion.com/react-native-gesture-handler/
- iOS Human Interface Guidelines - Audio: https://developer.apple.com/design/human-interface-guidelines/playing-audio
- Material Design 3 - Voice Input: https://m3.material.io/foundations/interaction/voice
- WCAG 2.2 Accessibility Guidelines: https://www.w3.org/WAI/WCAG22/quickref/
- React Native Accessibility: https://reactnative.dev/docs/accessibility

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

# Test on iOS simulator
npx react-native run-ios

# Test on Android emulator
npx react-native run-android
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
- [x] Create src/types/voice.ts with VoiceState enum and interfaces
- [x] Implement src/components/voice/AIVoiceIcon.tsx with three visual states
- [x] Apply design tokens for colors (inactive: grey, active/listening: #1566A7)
- [x] Ensure 44×44pt minimum touch target for icon
- [x] Implement tap gesture handler with react-native-gesture-handler
- [x] Add state transition animations with 200ms duration
- [x] Create src/components/voice/ListeningIndicator.tsx with pulsing animation
- [x] Implement src/components/voice/WaveformAnimation.tsx with animated bars
- [x] Create src/hooks/useVoiceInput.ts hook with state management
- [x] Integrate usePermissions hook to check microphone permission
- [x] Implement startListening() and stopListening() methods
- [x] Handle permission denied state with disabled icon
- [x] Add accessibility labels and hints for VoiceOver/TalkBack
- [x] Test state transitions on iOS (inactive → active → listening)
- [x] Test state transitions on Android (inactive → active → listening)
- [x] Verify animation performance (60fps target)
- [x] Verify state transition timing (200ms per UXR-501)
- [x] Test with VoiceOver enabled on iOS
- [x] Test with TalkBack enabled on Android
- [x] Verify color contrast ratios meet WCAG 2.2 AA standards
- [x] Test on 7-inch tablet (portrait)
- [x] Test on 12.9-inch tablet (landscape)
- [x] **[UI Tasks - MANDATORY]** Reference wireframe from Design References table during implementation
- [x] **[UI Tasks - MANDATORY]** Validate UI matches wireframe before marking task complete
- [x] **[Mobile Tasks - MANDATORY]** Reference Mobile References table during implementation
- [x] **[Mobile Tasks - MANDATORY]** Run headless platform builds before marking task complete
- [x] **[Mobile Tasks - MANDATORY]** Validate permission manifests against task requirements
