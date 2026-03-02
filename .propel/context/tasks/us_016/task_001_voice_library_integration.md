# Task - TASK_001

## Requirement Reference
- User Story: US_016
- Story Location: .propel/context/tasks/us_016/us_016.md
- Acceptance Criteria:  
    - AC-1: System has @react-native-voice/voice version 3.2+ installed with iOS and Android native speech recognition configured
- Edge Case:
    - N/A (Library integration task)

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
Install and configure @react-native-voice/voice library (version 3.2+) with native iOS and Android speech recognition capabilities. This task establishes the foundational voice infrastructure required for Speech-to-Text conversion in the PATH Lite application. The library provides cross-platform access to native speech recognition APIs (iOS Speech Framework and Android SpeechRecognizer).

## Dependent Tasks
- US_001 (React Native Project Scaffolding) - Base React Native project must exist

## Impacted Components
- **MODIFY**: `package.json` - Add @react-native-voice/voice dependency
- **MODIFY**: `ios/Podfile` - Ensure iOS native dependencies are linked
- **MODIFY**: `android/app/build.gradle` - Verify Android native module configuration
- **NEW**: `ios/Pods/` - Native iOS dependencies (auto-generated via pod install)
- **NEW**: `android/app/build/` - Native Android dependencies (auto-generated via gradle sync)

## Implementation Plan
1. **Install @react-native-voice/voice Library**
   - Add @react-native-voice/voice version 3.2+ to package.json dependencies
   - Run npm install to download the library
   - Verify package-lock.json reflects correct version

2. **Configure iOS Native Linking**
   - Navigate to ios/ directory
   - Run `pod install` to link native iOS Speech Framework dependencies
   - Verify Podfile.lock includes RNVoice pod
   - Ensure iOS deployment target is set to 16.0+ in Podfile

3. **Configure Android Native Linking**
   - Verify android/app/build.gradle includes proper minSdkVersion (26+)
   - Run `./gradlew clean` in android/ directory
   - Run `./gradlew build` to verify native module linking
   - Confirm no build errors related to speech recognition

4. **Verify Native Module Auto-Linking**
   - React Native 0.60+ uses auto-linking for native modules
   - Confirm react-native.config.js does not exclude @react-native-voice/voice
   - Verify native module is properly registered in both platforms

5. **Test Headless Compilation**
   - Run iOS headless build: `npx react-native run-ios --configuration Release`
   - Run Android headless build: `npx react-native run-android --variant=release`
   - Verify no compilation errors related to voice library

## Current Project State
```
Path_Lite/
├── package.json                    # TO BE MODIFIED (add voice library)
├── package-lock.json               # TO BE UPDATED (auto-generated)
├── ios/
│   ├── Podfile                     # TO BE VERIFIED (iOS 16.0+ target)
│   ├── Podfile.lock                # TO BE UPDATED (pod install)
│   └── Pods/                       # TO BE GENERATED (native dependencies)
├── android/
│   ├── app/
│   │   └── build.gradle            # TO BE VERIFIED (minSdk 26+)
│   ├── build.gradle                # Root gradle config
│   └── gradle.properties           # Gradle properties
├── react-native.config.js          # TO BE VERIFIED (no exclusions)
└── src/
    └── services/                   # Future: VoiceService will be added here
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| MODIFY | package.json | Add @react-native-voice/voice: ^3.2.0 to dependencies |
| MODIFY | package-lock.json | Auto-updated with voice library dependencies |
| MODIFY | ios/Podfile.lock | Auto-updated after pod install with RNVoice pod |
| CREATE | ios/Pods/RNVoice/ | Native iOS voice module (auto-generated) |
| MODIFY | android/app/build/intermediates/ | Native Android voice module (auto-generated) |

> Only list concrete, verifiable file operations. No speculative directory trees.

## External References
- @react-native-voice/voice Documentation: https://github.com/react-native-voice/voice
- React Native Linking Documentation: https://reactnative.dev/docs/linking-libraries-ios
- iOS Speech Framework: https://developer.apple.com/documentation/speech
- Android SpeechRecognizer: https://developer.android.com/reference/android/speech/SpeechRecognizer
- React Native Auto-Linking: https://github.com/react-native-community/cli/blob/main/docs/autolinking.md

## Build Commands
```bash
# Install dependencies
npm install

# iOS: Link native dependencies
cd ios && pod install && cd ..

# Android: Clean and verify build
cd android && ./gradlew clean && ./gradlew build && cd ..

# iOS: Headless compilation test
npx react-native run-ios --configuration Release

# Android: Headless compilation test
npx react-native run-android --variant=release

# Type check
npx tsc --noEmit

# Verify native module linking
npx react-native info
```

## Implementation Validation Strategy
- [ ] Unit tests pass (N/A for library integration)
- [ ] Integration tests pass (N/A for library integration)
- [ ] **[Mobile Tasks]** Headless platform compilation succeeds
- [ ] **[Mobile Tasks]** Native dependency linking verified
- [ ] **[Mobile Tasks]** Permission manifests validated against task requirements

## Implementation Checklist
- [ ] Add @react-native-voice/voice ^3.2.0 to package.json dependencies
- [ ] Run `npm install` and verify package-lock.json updated
- [ ] Navigate to ios/ and run `pod install`
- [ ] Verify Podfile.lock includes RNVoice pod entry
- [ ] Check ios/Podfile has platform :ios, '16.0' or higher
- [ ] Navigate to android/ and run `./gradlew clean`
- [ ] Run `./gradlew build` and verify no voice-related errors
- [ ] Verify android/app/build.gradle has minSdkVersion 26 or higher
- [ ] Confirm react-native.config.js does not exclude voice library
- [ ] Run `npx react-native info` to verify native module registration
- [ ] Test iOS headless build with `npx react-native run-ios --configuration Release`
- [ ] Test Android headless build with `npx react-native run-android --variant=release`
- [ ] Verify no compilation errors on both platforms
- [ ] Document library version in package.json (3.2+)
- [ ] **[Mobile Tasks - MANDATORY]** Reference Mobile References table during implementation
- [ ] **[Mobile Tasks - MANDATORY]** Run headless platform builds before marking task complete
- [ ] **[Mobile Tasks - MANDATORY]** Validate permission manifests against task requirements
