# Task - TASK_002

## Requirement Reference
- User Story: US_016
- Story Location: .propel/context/tasks/us_016/us_016.md
- Acceptance Criteria:  
    - AC-2: System prompts for microphone permission on first use and handles granted/denied states appropriately
- Edge Case:
    - Display error "Microphone access required for voice input. Enable in Settings." when permission is denied
    - Provide fallback to manual text entry when microphone permission is denied

## Design References (Frontend Tasks Only)
| Reference Type | Value |
|----------------|-------|
| **UI Impact** | Yes |
| **Figma URL** | N/A |
| **Wireframe Status** | PENDING |
| **Wireframe Type** | N/A |
| **Wireframe Path/URL** | TODO: Provide wireframe - upload to `.propel/context/wireframes/Hi-Fi/wireframe-permission-dialog.[html|png|jpg]` or add external URL |
| **Screen Spec** | N/A |
| **UXR Requirements** | N/A |
| **Design Tokens** | designsystem.md sections: Color Tokens, Typography, Spacing |

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
| Library | react-native-permissions | 4.1+ |
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
Implement runtime microphone permission handling for iOS and Android platforms with proper permission request flows, state management, and user-friendly error messaging. This task ensures the app requests microphone access on first use, handles granted/denied states gracefully, and provides fallback to manual text entry when permission is denied. Includes permission manifest validation and platform-specific permission dialogs.

## Dependent Tasks
- TASK_001 (Voice Library Integration) - @react-native-voice/voice must be installed

## Impacted Components
- **NEW**: `src/services/permissions/PermissionService.ts` - Permission handling service
- **NEW**: `src/hooks/usePermissions.ts` - React hook for permission management
- **NEW**: `src/components/common/PermissionDeniedDialog.tsx` - Permission denied error dialog
- **MODIFY**: `ios/PathLite/Info.plist` - Verify NSMicrophoneUsageDescription exists
- **MODIFY**: `android/app/src/main/AndroidManifest.xml` - Verify RECORD_AUDIO permission exists
- **NEW**: `src/types/permissions.ts` - Permission state type definitions

## Implementation Plan
1. **Verify Permission Manifests**
   - Confirm iOS Info.plist has NSMicrophoneUsageDescription with clear usage text
   - Confirm Android AndroidManifest.xml has RECORD_AUDIO permission
   - Validate usage descriptions are user-friendly and HIPAA-compliant

2. **Install react-native-permissions Library**
   - Add react-native-permissions to package.json (version 4.1+)
   - Configure iOS Podfile with required permission pods
   - Link native dependencies for both platforms

3. **Create Permission Type Definitions**
   - Define PermissionStatus enum: GRANTED, DENIED, BLOCKED, UNAVAILABLE
   - Define PermissionResult interface with status and canOpenSettings
   - Export types for use across the application

4. **Implement PermissionService**
   - Create checkMicrophonePermission() method to check current permission state
   - Create requestMicrophonePermission() method to request permission
   - Create openAppSettings() method to navigate to system settings
   - Handle platform-specific permission APIs (iOS vs Android)
   - Implement error handling for permission check failures

5. **Create usePermissions Hook**
   - Implement React hook wrapping PermissionService
   - Manage permission state with useState
   - Provide checkPermission, requestPermission, openSettings methods
   - Handle loading states during permission requests

6. **Create PermissionDeniedDialog Component**
   - Display error message: "Microphone access required for voice input. Enable in Settings."
   - Provide "Open Settings" button to navigate to system settings
   - Provide "Use Manual Entry" button as fallback
   - Follow design tokens for colors, typography, spacing
   - Ensure 44×44pt minimum touch targets

7. **Test Permission Flows**
   - Test first-time permission request on fresh install
   - Test permission granted flow
   - Test permission denied flow with dialog display
   - Test permission blocked flow (denied + "Don't ask again")
   - Test "Open Settings" navigation on both platforms

## Current Project State
```
src/
├── services/
│   ├── auth/
│   ├── permissions/                # NEW FOLDER
│   │   └── PermissionService.ts    # NEW FILE
│   ├── DataExportService.ts
│   └── index.ts
├── hooks/
│   └── usePermissions.ts           # NEW FILE
├── components/
│   ├── common/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Logo.tsx
│   │   └── PermissionDeniedDialog.tsx  # NEW FILE
│   └── patient/
├── types/
│   └── permissions.ts              # NEW FILE
├── ios/
│   └── PathLite/
│       └── Info.plist              # TO BE VERIFIED
└── android/
    └── app/
        └── src/
            └── main/
                └── AndroidManifest.xml  # TO BE VERIFIED
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | src/services/permissions/PermissionService.ts | Permission handling service with check, request, and settings methods |
| CREATE | src/hooks/usePermissions.ts | React hook for permission state management |
| CREATE | src/components/common/PermissionDeniedDialog.tsx | Error dialog for denied microphone permission |
| CREATE | src/types/permissions.ts | Permission state type definitions |
| MODIFY | package.json | Add react-native-permissions ^4.1.0 dependency |
| MODIFY | ios/Podfile | Add permissions_path configuration for microphone |
| VERIFY | ios/PathLite/Info.plist | Confirm NSMicrophoneUsageDescription exists |
| VERIFY | android/app/src/main/AndroidManifest.xml | Confirm RECORD_AUDIO permission exists |
| MODIFY | src/services/index.ts | Export PermissionService |

> Only list concrete, verifiable file operations. No speculative directory trees.

## External References
- react-native-permissions Documentation: https://github.com/zoontek/react-native-permissions
- iOS Permission Best Practices: https://developer.apple.com/documentation/uikit/protecting_the_user_s_privacy/requesting_access_to_protected_resources
- Android Runtime Permissions: https://developer.android.com/training/permissions/requesting
- React Native PermissionsAndroid: https://reactnative.dev/docs/permissionsandroid
- HIPAA Privacy Guidelines: https://www.hhs.gov/hipaa/for-professionals/privacy/index.html

## Build Commands
```bash
# Install dependencies
npm install

# iOS: Link native dependencies
cd ios && pod install && cd ..

# Android: Sync gradle
cd android && ./gradlew clean && cd ..

# Run on iOS
npm run ios

# Run on Android
npm run android

# Type check
npx tsc --noEmit

# Lint
npm run lint

# Test permission flow on iOS simulator
npx react-native run-ios
# Reset permissions: Device > Erase All Content and Settings

# Test permission flow on Android emulator
npx react-native run-android
# Reset permissions: Settings > Apps > PathLite > Permissions > Microphone > Deny
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
- [ ] Verify ios/PathLite/Info.plist contains NSMicrophoneUsageDescription
- [ ] Verify android/app/src/main/AndroidManifest.xml contains RECORD_AUDIO permission
- [ ] Add react-native-permissions ^4.1.0 to package.json
- [ ] Configure ios/Podfile with permissions_path for microphone
- [ ] Run `pod install` in ios/ directory
- [ ] Create src/types/permissions.ts with PermissionStatus enum and interfaces
- [ ] Implement src/services/permissions/PermissionService.ts with check, request, openSettings methods
- [ ] Create src/hooks/usePermissions.ts React hook
- [ ] Implement src/components/common/PermissionDeniedDialog.tsx with error message and CTAs
- [ ] Apply design tokens for dialog styling (colors, typography, spacing)
- [ ] Ensure 44×44pt minimum touch targets for dialog buttons
- [ ] Export PermissionService from src/services/index.ts
- [ ] Test first-time permission request on fresh iOS install
- [ ] Test first-time permission request on fresh Android install
- [ ] Test permission granted flow on both platforms
- [ ] Test permission denied flow with dialog display
- [ ] Test permission blocked flow (denied + "Don't ask again" on Android)
- [ ] Test "Open Settings" button navigation on iOS
- [ ] Test "Open Settings" button navigation on Android
- [ ] Test "Use Manual Entry" fallback button
- [ ] Verify permission state persists across app restarts
- [ ] Verify no crashes when permission is denied
- [ ] **[UI Tasks - MANDATORY]** Reference wireframe from Design References table during implementation
- [ ] **[UI Tasks - MANDATORY]** Validate UI matches wireframe before marking task complete
- [ ] **[Mobile Tasks - MANDATORY]** Reference Mobile References table during implementation
- [ ] **[Mobile Tasks - MANDATORY]** Run headless platform builds before marking task complete
- [ ] **[Mobile Tasks - MANDATORY]** Validate permission manifests against task requirements
