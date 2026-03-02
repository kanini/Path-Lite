# Task - TASK_002

## Requirement Reference
- User Story: us_018
- Story Location: .propel/context/tasks/us_018/us_018.md
- Acceptance Criteria:  
    - AC-1: System displays the AI voice icon in a prominent location with clear visibility against the background
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
| **Design Tokens** | designsystem.md - Layout spacing, Component positioning |

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
| Library | React Navigation | 6.1.18 |

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
Integrate the AIVoiceIcon component into the Patient Details Form (SCR-006) with proper positioning, state synchronization with STT/TTS services, and audio input visualization. The icon must be prominently placed with clear visibility, automatically activate when the form loads, and synchronize state transitions with the AI conversational flow. This task connects the visual component to the underlying voice services and ensures proper lifecycle management.

## Dependent Tasks
- TASK_001: AI Voice Icon Component (AIVoiceIcon component must be implemented)
- US_016: Speech-to-Text Integration (STT service integration required)
- US_017: Text-to-Speech Integration (TTS service integration required)

## Impacted Components
- **NEW**: `src/screens/patient/PatientDetailsFormScreen.tsx` - Patient Details Form screen (if not exists)
- **MODIFY**: `src/screens/dashboard/PatientDashboardScreen.tsx` - Add navigation to Patient Details Form
- **NEW**: `src/context/AIVoiceContext.tsx` - Context provider for AI voice state management
- **NEW**: `src/services/AIVoiceService.ts` - Service layer for coordinating STT/TTS with voice icon state
- **NEW**: `src/hooks/useAIVoiceSync.ts` - Hook for synchronizing voice icon with audio services
- **MODIFY**: `src/components/index.ts` - Export AIVoiceContext

## Implementation Plan
1. **Create AIVoiceContext** for global voice state management across screens
2. **Implement AIVoiceService** to coordinate STT/TTS services with voice icon state
3. **Create useAIVoiceSync hook** to manage state synchronization and audio input visualization
4. **Create PatientDetailsFormScreen** (if not exists) with split-panel layout (left nav + form)
5. **Position AIVoiceIcon** in prominent location (top-right of form panel or floating action button)
6. **Integrate voice icon with STT service** to trigger listening state when audio input is detected
7. **Integrate voice icon with TTS service** to block taps during speech playback
8. **Implement auto-activation** of voice mode when form loads (per UC-004 requirements)
9. **Add audio input visualization** by passing audio level data to WaveformAnimation
10. **Handle state lifecycle** (mount, unmount, background, foreground) properly
11. **Add integration tests** for voice icon state synchronization with services
12. **Test end-to-end flow** from form load → voice activation → STT listening → TTS playback → deactivation

## Current Project State
```
src/
├── components/
│   ├── ai/
│   │   ├── AIVoiceIcon.tsx (from TASK_001)
│   │   └── animations/
│   │       ├── PulsingAnimation.tsx
│   │       └── WaveformAnimation.tsx
│   └── (other components)
├── screens/
│   ├── auth/
│   │   └── LoginScreen.tsx
│   ├── dashboard/
│   │   └── PatientDashboardScreen.tsx
│   └── hospital/
│       └── HospitalSelectionScreen.tsx
├── context/
│   ├── AuthContext.tsx
│   └── HospitalContext.tsx
├── services/
│   └── (existing services)
├── hooks/
│   └── useAIVoiceIcon.ts (from TASK_001)
└── (other directories)
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | src/context/AIVoiceContext.tsx | Context provider for global AI voice state management |
| CREATE | src/services/AIVoiceService.ts | Service layer coordinating STT/TTS with voice icon state |
| CREATE | src/hooks/useAIVoiceSync.ts | Hook for synchronizing voice icon state with audio services |
| CREATE | src/screens/patient/PatientDetailsFormScreen.tsx | Patient Details Form screen with integrated AIVoiceIcon |
| CREATE | __tests__/integration/AIVoiceIntegration.test.tsx | Integration tests for voice icon with STT/TTS services |
| MODIFY | src/screens/dashboard/PatientDashboardScreen.tsx | Add navigation to Patient Details Form |
| MODIFY | src/components/index.ts | Export AIVoiceContext |
| MODIFY | App.tsx | Wrap app with AIVoiceContext provider |

> Only list concrete, verifiable file operations. No speculative directory trees.

## External References
- React Context API: https://react.dev/reference/react/useContext
- React Native Navigation: https://reactnavigation.org/docs/getting-started
- React Native App State: https://reactnative.dev/docs/appstate
- Service Layer Pattern: https://khalilstemmler.com/articles/software-design-architecture/organizing-app-logic/
- React Native Audio Visualization: https://github.com/react-native-audio-toolkit/react-native-audio-toolkit

## Build Commands
```bash
# Run on iOS
npm run ios

# Run on Android
npm run android

# Run integration tests
npm test -- AIVoiceIntegration.test.tsx

# Run all tests
npm test
```

## Implementation Validation Strategy
- [ ] Unit tests pass
- [ ] Integration tests pass (if applicable)
- [x] **[UI Tasks]** Visual comparison against wireframe completed at 375px, 768px, 1440px
- [x] **[UI Tasks]** Run `/analyze-ux` to validate wireframe alignment
- [ ] **[Mobile Tasks]** Headless platform compilation succeeds
- [ ] **[Mobile Tasks]** Native dependency linking verified
- [ ] **[Mobile Tasks]** Permission manifests validated against task requirements
- [ ] Voice icon appears in prominent location on Patient Details Form
- [ ] Voice icon auto-activates when form loads (per UC-004)
- [ ] State synchronization works correctly: inactive → active → listening → inactive
- [ ] Audio input visualization reflects real-time audio levels
- [ ] Taps blocked during TTS playback with tooltip displayed
- [ ] Voice icon state persists correctly during app backgrounding/foregrounding
- [ ] No memory leaks in state management or service connections
- [ ] End-to-end flow tested on both iOS and Android

## Implementation Checklist
- [ ] Create `src/context/AIVoiceContext.tsx` with state management for voice mode
- [ ] Implement `src/services/AIVoiceService.ts` to coordinate STT/TTS services
- [ ] Create `src/hooks/useAIVoiceSync.ts` for state synchronization logic
- [ ] Create `src/screens/patient/PatientDetailsFormScreen.tsx` with split-panel layout
- [ ] Position AIVoiceIcon in top-right corner of form panel (or as floating action button)
- [ ] Integrate AIVoiceContext provider in App.tsx root
- [ ] Connect voice icon to STT service for listening state activation
- [ ] Connect voice icon to TTS service for playback detection
- [ ] Implement auto-activation of voice mode on form mount
- [ ] Pass audio level data from STT service to WaveformAnimation component
- [ ] Handle app state changes (background/foreground) properly
- [ ] Add cleanup logic in useEffect to prevent memory leaks
- [ ] Update PatientDashboardScreen to navigate to PatientDetailsFormScreen
- [ ] Write integration tests for voice icon state synchronization
- [ ] Test end-to-end flow: form load → auto-activate → listen → speak → deactivate
- [ ] Test on iOS device/simulator for proper positioning and visibility
- [ ] Test on Android device/emulator for proper positioning and visibility
- [ ] Verify voice icon remains visible during keyboard display
- [ ] Test state persistence during app backgrounding/foregrounding
- [ ] Verify no console warnings or errors during state transitions
- [x] **[UI Tasks - MANDATORY]** Reference wireframe from Design References table during implementation
- [x] **[UI Tasks - MANDATORY]** Validate UI matches wireframe before marking task complete
- [x] **[Mobile Tasks - MANDATORY]** Reference Mobile References table during implementation
- [x] **[Mobile Tasks - MANDATORY]** Run headless platform builds before marking task complete
- [x] **[Mobile Tasks - MANDATORY]** Validate permission manifests against task requirements
