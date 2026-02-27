# Task - TASK_005

## Requirement Reference
- User Story: us_001
- Story Location: .propel/context/tasks/us_001/us_001.md
- Acceptance Criteria:  
    - **AC5**: Given Android configuration is needed, When I set up Android-specific settings, Then the system has build.gradle configured with minimum SDK version 29 (Android 10), and AndroidManifest.xml with required permissions.
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
| Android | Android SDK | API 29+ (Android 10) |
| Android | Android Studio | 2023.x |
| Android | Gradle | 8.x |
| Android | JDK | 17.x |

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
| **Platform Target** | Android |
| **Min OS Version** | Android API 29 (Android 10) |
| **Mobile Framework** | React Native |

## Task Overview
Configure Android-specific settings for the React Native application to support minimum SDK version 29 (Android 10) and required permissions for microphone and camera access (needed for voice interaction and future features). Update build.gradle files to set minSdkVersion, compileSdkVersion, and targetSdkVersion, configure AndroidManifest.xml with RECORD_AUDIO and CAMERA permissions with HIPAA-compliant usage descriptions, and verify Android Studio project settings. Implement pre-flight check to validate Android Studio and ANDROID_HOME environment variable before proceeding with Android configuration.

## Dependent Tasks
- TASK_001: React Native CLI initialization and project setup (MUST be completed first)
- TASK_002: React Navigation configuration and routing setup (Gradle already updated with navigation dependencies)

## Impacted Components
- **MODIFY**: android/build.gradle (Project-level Gradle configuration)
- **MODIFY**: android/app/build.gradle (App-level Gradle configuration - set minSdkVersion to 29)
- **MODIFY**: android/app/src/main/AndroidManifest.xml (Add microphone and camera permissions)
- **NEW**: android/README.md (Android configuration documentation)

## Implementation Plan
1. **Pre-flight Check for Android Studio**:
   - Verify ANDROID_HOME environment variable is set
   - If not set, display error message with setup instructions
   - Verify Android SDK is installed at $ANDROID_HOME location
   - Verify JDK 17 is installed using `java -version`
   - Verify Gradle wrapper is present in android/gradlew

2. **Update App-level build.gradle (android/app/build.gradle)**:
   - Open android/app/build.gradle
   - Update `minSdkVersion` to 29 (Android 10)
   - Verify `compileSdkVersion` is 34 or higher (React Native 0.73 default)
   - Verify `targetSdkVersion` is 34 or higher
   - Add comment explaining minimum SDK version requirement

3. **Configure AndroidManifest.xml Permissions**:
   - Open android/app/src/main/AndroidManifest.xml
   - Add `<uses-permission android:name="android.permission.RECORD_AUDIO" />` before `<application>` tag
   - Add `<uses-permission android:name="android.permission.CAMERA" />` before `<application>` tag
   - Add comment explaining permissions are for voice-based data entry and future features

4. **Verify Project-level build.gradle**:
   - Open android/build.gradle
   - Verify buildscript dependencies include Android Gradle Plugin 8.x
   - Verify Google Maven repository is included
   - No changes needed unless version conflicts

5. **Update gradle.properties (Optional)**:
   - Verify android/gradle.properties has proper memory settings
   - Add `org.gradle.jvmargs=-Xmx2048m -XX:MaxMetaspaceSize=512m` if not present
   - Add `android.useAndroidX=true` if not present
   - Add `android.enableJetifier=true` if not present

6. **Create Android Configuration Documentation**:
   - Create android/README.md with:
     - Android minimum SDK version: 29 (Android 10)
     - Required Android Studio version: 2023.x
     - Required JDK version: 17.x
     - Required permissions: RECORD_AUDIO (mandatory), CAMERA (optional)
     - Gradle sync instructions
     - Common troubleshooting steps

7. **Test Android Build**:
   - Run `cd android && ./gradlew clean` to clean build artifacts
   - Run `cd android && ./gradlew assembleDebug` to build APK
   - Run `npx react-native run-android` to verify build succeeds
   - Verify app launches on Android emulator or device
   - Check that permission prompts appear when accessing microphone/camera (if tested)

8. **Validation**:
   - Verify android/app/build.gradle has `minSdkVersion 29`
   - Verify AndroidManifest.xml contains RECORD_AUDIO and CAMERA permissions
   - Verify Android build succeeds without errors
   - Verify app runs on Android emulator/device

## Current Project State
```
PathLite/
├── android/
│   ├── app/
│   │   ├── build.gradle        # App-level Gradle (needs minSdkVersion 29)
│   │   └── src/main/
│   │       ├── AndroidManifest.xml  # Needs permissions
│   │       └── [other Android files]
│   ├── build.gradle            # Project-level Gradle
│   ├── gradle.properties       # Gradle properties
│   ├── gradlew                 # Gradle wrapper (Unix)
│   └── gradlew.bat             # Gradle wrapper (Windows)
├── ios/                        # iOS native code (configured in TASK_004)
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
| MODIFY | /android/app/build.gradle | Update minSdkVersion to 29, verify compileSdkVersion and targetSdkVersion |
| MODIFY | /android/app/src/main/AndroidManifest.xml | Add RECORD_AUDIO and CAMERA permissions |
| MODIFY | /android/gradle.properties | Verify/add memory settings and AndroidX flags |
| CREATE | /android/README.md | Android configuration documentation |

## External References
- [React Native Android Setup](https://reactnative.dev/docs/environment-setup?platform=android)
- [Android Manifest Permissions](https://developer.android.com/guide/topics/manifest/manifest-intro)
- [Android RECORD_AUDIO Permission](https://developer.android.com/reference/android/Manifest.permission#RECORD_AUDIO)
- [Android CAMERA Permission](https://developer.android.com/reference/android/Manifest.permission#CAMERA)
- [Android SDK Versions](https://developer.android.com/studio/releases/platforms)
- [Gradle Build Configuration](https://developer.android.com/build)
- [HIPAA Compliance for Mobile Apps](https://www.hhs.gov/hipaa/for-professionals/security/guidance/cybersecurity/index.html)

## Build Commands
```bash
# Pre-flight checks
echo $ANDROID_HOME  # Verify ANDROID_HOME is set
java -version  # Verify JDK 17 is installed

# Clean build artifacts
cd android
./gradlew clean
cd ..

# Build APK
cd android
./gradlew assembleDebug
cd ..

# Build and run on Android emulator/device
npx react-native run-android

# Run on specific device
adb devices  # List connected devices
npx react-native run-android --deviceId=<device_id>
```

## Implementation Validation Strategy
- [ ] Unit tests pass (N/A - infrastructure task)
- [ ] Integration tests pass (N/A - infrastructure task)
- [ ] **[Mobile Tasks]** Headless platform compilation succeeds
- [ ] **[Mobile Tasks]** Native dependency linking verified
- [ ] **[Mobile Tasks]** Permission manifests validated against task requirements
- [ ] ANDROID_HOME environment variable is set
- [ ] JDK 17 is installed
- [ ] android/app/build.gradle has `minSdkVersion 29`
- [ ] android/app/build.gradle has `compileSdkVersion 34` or higher
- [ ] android/app/build.gradle has `targetSdkVersion 34` or higher
- [ ] AndroidManifest.xml contains RECORD_AUDIO permission
- [ ] AndroidManifest.xml contains CAMERA permission
- [ ] `./gradlew assembleDebug` completes successfully
- [ ] Android build succeeds with `npx react-native run-android`
- [ ] App launches on Android emulator/device without errors
- [ ] android/README.md created with configuration documentation

## Implementation Checklist
- [ ] Verify ANDROID_HOME environment variable is set
- [ ] Run `java -version` to verify JDK 17 is installed
- [ ] Verify android/gradlew exists
- [ ] Open android/app/build.gradle
- [ ] Update `minSdkVersion` to 29
- [ ] Verify `compileSdkVersion` is 34 or higher
- [ ] Verify `targetSdkVersion` is 34 or higher
- [ ] Add comment explaining Android 10 minimum requirement
- [ ] Open android/app/src/main/AndroidManifest.xml
- [ ] Add `<uses-permission android:name="android.permission.RECORD_AUDIO" />` before `<application>` tag
- [ ] Add `<uses-permission android:name="android.permission.CAMERA" />` before `<application>` tag
- [ ] Add comment explaining permissions are for voice-based data entry
- [ ] Open android/gradle.properties
- [ ] Verify/add `org.gradle.jvmargs=-Xmx2048m -XX:MaxMetaspaceSize=512m`
- [ ] Verify/add `android.useAndroidX=true`
- [ ] Verify/add `android.enableJetifier=true`
- [ ] Create android/README.md with Android configuration documentation
- [ ] Run `cd android && ./gradlew clean && cd ..`
- [ ] Run `cd android && ./gradlew assembleDebug && cd ..`
- [ ] Verify build completes successfully
- [ ] Run `npx react-native run-android` to test build
- [ ] Verify app launches on Android emulator/device
- [ ] **[Mobile Tasks - MANDATORY]** Reference Mobile References table during implementation
- [ ] **[Mobile Tasks - MANDATORY]** Run headless platform builds before marking task complete
- [ ] **[Mobile Tasks - MANDATORY]** Validate permission manifests against task requirements
- [ ] Verify RECORD_AUDIO and CAMERA permissions are present in AndroidManifest.xml
