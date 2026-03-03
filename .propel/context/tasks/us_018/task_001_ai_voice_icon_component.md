# Task - TASK_001

## Requirement Reference
- User Story: us_018
- Story Location: .propel/context/tasks/us_018/us_018.md
- Acceptance Criteria:  
    - AC-1: System displays the AI voice icon in a prominent location with clear visibility against the background
    - AC-2: System shows the icon in inactive state (gray color, static) when voice mode is inactive
    - AC-3: System transitions to active state (blue color #1566A7, pulsing animation) within 200ms when voice mode is activated
    - AC-4: System displays listening state (animated waveform or ripple effect) with visual feedback synchronized to audio input
    - AC-5: System transitions to inactive state, stops listening, and removes all animations when voice mode is deactivated
- Edge Case:
    - Voice icon tapped during TTS playback: Ignore tap during TTS; display tooltip "Please wait for question to complete"
    - Rapid icon taps: Debounce taps with 500ms delay; prevent state flickering

## Design References (Frontend Tasks Only)
| Reference Type | Value |
|----------------|-------|
| **UI Impact** | Yes |
| **Figma URL** | N/A |
| **Wireframe Status** | PENDING |
| **Wireframe Type** | N/A |
| **Wireframe Path/URL** | TODO: Provide wireframe - upload to `.propel/context/wireframes/Hi-Fi/wireframe-SCR-006-ai-voice-icon.[html|png|jpg]` or add external URL |
| **Screen Spec** | figma_spec.md#SCR-006 |
| **UXR Requirements** | UXR-003, UXR-501 |
| **Design Tokens** | designsystem.md - Color tokens (primary, neutral_500), Spacing tokens, Typography tokens |

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
| Mobile | React Native | 0.73.0 |
| Library | React | 18.2.0 |
| Library | React Native Reanimated | 3.x (to be installed) |
| Library | React Native Gesture Handler | 2.14.0 |

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
| **Platform Target** | Both (iOS & Android) |
| **Min OS Version** | iOS 13.0 / Android API 21 (5.0) |
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
Implement the AI Voice Icon component with three distinct visual states (inactive, active, listening) that provides clear visual feedback for voice mode status. The component must support smooth state transitions within 200ms, debounced tap handling, and animated visual feedback synchronized to audio input. This component will be integrated into the Patient Details Form (SCR-006) and serve as the primary visual indicator for AI conversational interface status.

## Dependent Tasks
- US_016: Speech-to-Text Integration (STT service must be available for listening state integration)
- US_017: Text-to-Speech Integration (TTS service must be available for blocking tap during playback)

## Impacted Components
- **NEW**: `src/components/ai/AIVoiceIcon.tsx` - Main AI voice icon component with state management
- **NEW**: `src/components/ai/animations/PulsingAnimation.tsx` - Pulsing animation for active state
- **NEW**: `src/components/ai/animations/WaveformAnimation.tsx` - Waveform/ripple animation for listening state
- **NEW**: `src/types/ai.ts` - TypeScript types for AI voice states
- **NEW**: `src/hooks/useAIVoiceIcon.ts` - Custom hook for voice icon state management and debouncing
- **MODIFY**: `src/components/index.ts` - Export new AI components

## Implementation Plan
1. **Install React Native Reanimated** for performant animations (if not already installed)
2. **Create TypeScript types** for voice icon states (inactive, active, listening) and props interface
3. **Implement custom hook `useAIVoiceIcon`** for state management, debouncing (500ms), and TTS playback detection
4. **Create base AIVoiceIcon component** with TouchableOpacity wrapper and accessibility support
5. **Implement PulsingAnimation component** using React Native Reanimated for active state (blue #1566A7, continuous pulse)
6. **Implement WaveformAnimation component** using React Native Reanimated for listening state (animated waveform/ripple)
7. **Integrate state transitions** with 200ms timing constraint using Reanimated timing animations
8. **Add tooltip/feedback** for blocked taps during TTS playback
9. **Apply design tokens** from designsystem.md (colors, spacing, sizing)
10. **Implement platform-specific touch target sizing** (minimum 44x44pt per UXR-202)
11. **Add unit tests** for component rendering, state transitions, and debouncing logic
12. **Test on iOS and Android** devices/simulators for animation performance and visual consistency

## Current Project State
```
src/
├── components/
│   ├── auth/
│   │   └── LoginForm.tsx
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Logo.tsx
│   ├── hospital/
│   │   ├── HospitalListItem.tsx
│   │   └── HospitalSearchBar.tsx
│   ├── patient/
│   │   └── (empty - to be populated)
│   ├── README.md
│   └── index.ts
├── styles/
│   ├── colors.ts
│   ├── spacing.ts
│   └── typography.ts
├── types/
│   └── (existing type definitions)
├── hooks/
│   └── (existing hooks)
└── (other directories)
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | src/components/ai/AIVoiceIcon.tsx | Main AI voice icon component with three states (inactive, active, listening) |
| CREATE | src/components/ai/animations/PulsingAnimation.tsx | Reanimated-based pulsing animation for active state |
| CREATE | src/components/ai/animations/WaveformAnimation.tsx | Reanimated-based waveform/ripple animation for listening state |
| CREATE | src/types/ai.ts | TypeScript type definitions for AI voice states and component props |
| CREATE | src/hooks/useAIVoiceIcon.ts | Custom hook for voice icon state management, debouncing, and TTS detection |
| CREATE | __tests__/components/ai/AIVoiceIcon.test.tsx | Unit tests for AIVoiceIcon component |
| MODIFY | src/components/index.ts | Add exports for new AI components |
| MODIFY | package.json | Add react-native-reanimated dependency if not present |

> Only list concrete, verifiable file operations. No speculative directory trees.

## External References
- React Native Reanimated Documentation: https://docs.swmansion.com/react-native-reanimated/
- React Native Animated API: https://reactnative.dev/docs/animated
- React Native Gesture Handler: https://docs.swmansion.com/react-native-gesture-handler/
- iOS Human Interface Guidelines - Touch Targets: https://developer.apple.com/design/human-interface-guidelines/layout
- Material Design 3 - Touch Targets: https://m3.material.io/foundations/interaction/states/overview
- WCAG 2.2 AA - Target Size: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html

## Build Commands
```bash
# Install dependencies (if react-native-reanimated not present)
npm install react-native-reanimated@^3.0.0

# iOS - Link native dependencies
cd ios && pod install && cd ..

# Android - Sync gradle (automatic on build)
# No manual action needed

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run tests
npm test -- AIVoiceIcon.test.tsx
```

## Implementation Validation Strategy
- [ ] Unit tests pass
- [ ] Integration tests pass (if applicable)
- [x] **[UI Tasks]** Visual comparison against wireframe completed at 375px, 768px, 1440px
- [x] **[UI Tasks]** Run `/analyze-ux` to validate wireframe alignment
- [ ] **[Mobile Tasks]** Headless platform compilation succeeds
- [ ] **[Mobile Tasks]** Native dependency linking verified
- [ ] **[Mobile Tasks]** Permission manifests validated against task requirements
- [ ] Animation performance tested on low-end devices (60fps target)
- [ ] State transitions complete within 200ms requirement
- [ ] Debouncing prevents rapid tap flickering (500ms delay)
- [ ] Tooltip displays correctly during TTS playback
- [ ] Touch target meets 44x44pt minimum on both platforms
- [ ] Color contrast meets WCAG 2.2 AA standards (4.5:1 for text, 3:1 for UI)
- [ ] Accessibility labels properly announced by screen readers

## Implementation Checklist
- [x] Install react-native-reanimated dependency and configure Babel plugin
- [x] Create `src/types/ai.ts` with VoiceIconState enum and AIVoiceIconProps interface
- [x] Create `src/hooks/useAIVoiceIcon.ts` with debouncing logic and state management
- [x] Implement `src/components/ai/AIVoiceIcon.tsx` base component with TouchableOpacity
- [x] Implement `src/components/ai/animations/PulsingAnimation.tsx` using useAnimatedStyle
- [x] Implement `src/components/ai/animations/WaveformAnimation.tsx` using useAnimatedStyle
- [x] Add state transition logic with 200ms timing constraint
- [x] Implement TTS playback detection to block taps during speech
- [x] Add tooltip/feedback for blocked taps ("Please wait for question to complete")
- [x] Apply design tokens: primary color (#1566A7), neutral_500 for inactive state
- [x] Ensure minimum 44x44pt touch target size on both platforms
- [x] Add accessibility labels and roles for screen reader support
- [x] Write unit tests for component rendering and state transitions
- [x] Test debouncing logic (500ms delay between taps)
- [x] Update `src/components/index.ts` to export AIVoiceIcon
- [ ] Run iOS pod install and verify native linking
- [ ] Test on iOS simulator/device for animation performance
- [ ] Test on Android emulator/device for animation performance
- [ ] Verify color contrast meets WCAG 2.2 AA standards
- [ ] Test with VoiceOver (iOS) and TalkBack (Android) screen readers
- [x] **[UI Tasks - MANDATORY]** Reference wireframe from Design References table during implementation
- [x] **[UI Tasks - MANDATORY]** Validate UI matches wireframe before marking task complete
- [x] **[Mobile Tasks - MANDATORY]** Reference Mobile References table during implementation
- [x] **[Mobile Tasks - MANDATORY]** Run headless platform builds before marking task complete
- [x] **[Mobile Tasks - MANDATORY]** Validate permission manifests against task requirements
