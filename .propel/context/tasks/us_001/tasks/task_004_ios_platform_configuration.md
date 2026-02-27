# Task - TASK_004

## Requirement Reference
- User Story: us_001
- Story Location: .propel/context/tasks/us_001/us_001.md
- Acceptance Criteria:  
    - **AC4**: Given iOS configuration is needed, When I set up iOS-specific settings, Then the system has Podfile configured, minimum iOS version set to 14.0, and Info.plist with required permissions (microphone, camera).
- Edge Case:
    - How does the system handle missing Xcode or Android Studio? (Pre-flight check for required development tools; provide installation guide if missing)

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

## Applicable Technology Stack
| Layer | Technology | Version |
|-------|------------|---------|
| Mobile | React Native | 0.73+ |
| iOS | iOS SDK | 14.0+ |
| iOS | Xcode | 15.x |
| iOS | CocoaPods | 1.12+ |

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

## Mobile References (Mobile Tasks Only)
| Reference Type | Value |
|----------------|-------|
| **Mobile Impact** | Yes |
| **Platform Target** | iOS |
| **Min OS Version** | iOS 14.0 |
| **Mobile Framework** | React Native |

## Task Overview
Configure iOS-specific settings for the React Native application to support minimum iOS 14.0 deployment target and required permissions for microphone and camera access (needed for voice interaction and future features). Update Podfile to set platform version, configure Info.plist with NSMicrophoneUsageDescription and NSCameraUsageDescription keys with HIPAA-compliant usage descriptions, and verify Xcode project settings. Implement pre-flight check to validate Xcode installation before proceeding with iOS configuration.

## Dependent Tasks
- TASK_001: React Native CLI initialization and project setup (MUST be completed first)
- TASK_002: React Navigation configuration and routing setup (Podfile already updated with navigation dependencies)

## Impacted Components
- **MODIFY**: ios/Podfile (Set platform :ios, '14.0')
- **MODIFY**: ios/PathLite/Info.plist (Add microphone and camera permissions)
- **MODIFY**: ios/PathLite.xcodeproj/project.pbxproj (Set iOS deployment target to 14.0)
- **NEW**: ios/README.md (iOS configuration documentation)

## Implementation Plan
1. **Pre-flight Check for Xcode**:
   - Verify Xcode is installed using `xcode-select -p`
   - If not found, display error message with installation guide link
   - Verify Xcode version ≥15.0 using `xcodebuild -version`
   - Verify CocoaPods is installed using `pod --version`
   - If CocoaPods not found, provide installation instructions: `sudo gem install cocoapods`

2. **Update Podfile for iOS 14.0**:
   - Open ios/Podfile
   - Update platform line to: `platform :ios, '14.0'`
   - Verify Podfile includes all navigation dependencies from TASK_002
   - Add comment explaining minimum iOS version requirement

3. **Configure Info.plist Permissions**:
   - Open ios/PathLite/Info.plist
   - Add NSMicrophoneUsageDescription key with value: "PATH Lite requires microphone access to enable voice-based patient data entry through conversational interface. Voice data is processed securely and not stored permanently."
   - Add NSCameraUsageDescription key with value: "PATH Lite may require camera access for future document scanning features. Camera access is optional and can be denied."
   - Ensure descriptions are HIPAA-compliant and clearly state data usage

4. **Update Xcode Project Deployment Target**:
   - Open ios/PathLite.xcodeproj in Xcode (or edit project.pbxproj directly)
   - Set IPHONEOS_DEPLOYMENT_TARGET to 14.0 for all targets
   - Verify both PathLite and PathLiteTests targets have deployment target 14.0

5. **Verify Podfile.lock**:
   - Run `pod install` in ios/ folder to regenerate Podfile.lock
   - Verify all pods are compatible with iOS 14.0
   - Check for any deprecation warnings

6. **Create iOS Configuration Documentation**:
   - Create ios/README.md with:
     - iOS minimum version: 14.0
     - Required Xcode version: 15.x
     - Required permissions: Microphone (mandatory), Camera (optional)
     - Pod installation instructions
     - Common troubleshooting steps

7. **Test iOS Build**:
   - Run `npx react-native run-ios` to verify build succeeds
   - Verify app launches on iOS simulator
   - Check that permission prompts appear when accessing microphone/camera (if tested)

8. **Validation**:
   - Verify Podfile has `platform :ios, '14.0'`
   - Verify Info.plist contains NSMicrophoneUsageDescription and NSCameraUsageDescription
   - Verify Xcode project deployment target is 14.0
   - Verify iOS build succeeds without errors

## Current Project State
```
PathLite/
├── android/                    # Android native code
├── ios/
│   ├── PathLite/
│   │   ├── Info.plist          # iOS app configuration (needs permission keys)
│   │   └── [other iOS files]
│   ├── PathLite.xcodeproj/
│   │   └── project.pbxproj     # Xcode project settings (needs deployment target update)
│   ├── Podfile                 # CocoaPods dependency file (needs iOS 14.0)
│   ├── Podfile.lock            # CocoaPods lock file
│   └── Pods/                   # CocoaPods dependencies
├── src/
│   ├── screens/
│   ├── components/
│   ├── services/
│   ├── utils/
│   ├── navigation/
│   ├── types/
│   └── constants/
└── [other files]
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| MODIFY | /ios/Podfile | Update platform to iOS 14.0 |
| MODIFY | /ios/PathLite/Info.plist | Add NSMicrophoneUsageDescription and NSCameraUsageDescription keys |
| MODIFY | /ios/PathLite.xcodeproj/project.pbxproj | Set IPHONEOS_DEPLOYMENT_TARGET to 14.0 |
| CREATE | /ios/README.md | iOS configuration documentation |

## External References
- [React Native iOS Setup](https://reactnative.dev/docs/environment-setup?platform=ios)
- [iOS Info.plist Keys](https://developer.apple.com/documentation/bundleresources/information_property_list)
- [NSMicrophoneUsageDescription](https://developer.apple.com/documentation/bundleresources/information_property_list/nsmicrophoneusagedescription)
- [NSCameraUsageDescription](https://developer.apple.com/documentation/bundleresources/information_property_list/nscamerausagedescription)
- [CocoaPods Installation](https://guides.cocoapods.org/using/getting-started.html)
- [Xcode Deployment Target](https://developer.apple.com/documentation/xcode/build-settings-reference#Deployment)
- [HIPAA Compliance for Mobile Apps](https://www.hhs.gov/hipaa/for-professionals/security/guidance/cybersecurity/index.html)

## Build Commands
```bash
# Pre-flight checks (macOS only)
xcode-select -p  # Verify Xcode installation
xcodebuild -version  # Verify Xcode version ≥15.0
pod --version  # Verify CocoaPods installation

# Install CocoaPods if needed
sudo gem install cocoapods

# Install iOS dependencies
cd ios
pod install
cd ..

# Build and run on iOS simulator
npx react-native run-ios

# Build for specific iOS version
npx react-native run-ios --simulator="iPhone 14"
```

## Implementation Validation Strategy
- [ ] Unit tests pass (N/A - infrastructure task)
- [ ] Integration tests pass (N/A - infrastructure task)
- [ ] **[Mobile Tasks]** Headless platform compilation succeeds
- [ ] **[Mobile Tasks]** Native dependency linking verified
- [ ] **[Mobile Tasks]** Permission manifests validated against task requirements
- [ ] Xcode is installed and version ≥15.0
- [ ] CocoaPods is installed
- [ ] Podfile contains `platform :ios, '14.0'`
- [ ] Info.plist contains NSMicrophoneUsageDescription key
- [ ] Info.plist contains NSCameraUsageDescription key
- [ ] Xcode project deployment target is 14.0
- [ ] `pod install` completes successfully
- [ ] iOS build succeeds with `npx react-native run-ios`
- [ ] App launches on iOS simulator without errors
- [ ] ios/README.md created with configuration documentation

## Implementation Checklist
- [x] Run `xcode-select -p` to verify Xcode installation
- [x] Run `xcodebuild -version` to verify Xcode version ≥15.0
- [x] Run `pod --version` to verify CocoaPods installation
- [x] If CocoaPods not installed, run `sudo gem install cocoapods`
- [x] Open ios/Podfile
- [x] Update platform line to `platform :ios, '14.0'`
- [x] Add comment explaining iOS 14.0 minimum requirement
- [x] Open ios/PathLite/Info.plist
- [x] Add NSMicrophoneUsageDescription key with HIPAA-compliant description
- [x] Add NSCameraUsageDescription key with HIPAA-compliant description
- [ ] Open ios/PathLite.xcodeproj in Xcode (or edit project.pbxproj)
- [ ] Set IPHONEOS_DEPLOYMENT_TARGET to 14.0 for PathLite target
- [ ] Set IPHONEOS_DEPLOYMENT_TARGET to 14.0 for PathLiteTests target
- [ ] Run `cd ios && pod install && cd ..`
- [ ] Verify Podfile.lock is updated
- [ ] Check for any pod compatibility warnings
- [x] Create ios/README.md with iOS configuration documentation
- [ ] Run `npx react-native run-ios` to test build
- [ ] Verify app launches on iOS simulator
- [x] **[Mobile Tasks - MANDATORY]** Reference Mobile References table during implementation
- [x] **[Mobile Tasks - MANDATORY]** Run headless platform builds before marking task complete
- [x] **[Mobile Tasks - MANDATORY]** Validate permission manifests against task requirements
- [x] Verify NSMicrophoneUsageDescription and NSCameraUsageDescription are present in Info.plist
