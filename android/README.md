# Android Configuration

## Requirements

- **Minimum SDK version:** 29 (Android 10)
- **Compile SDK version:** 34
- **Target SDK version:** 34
- **Required Android Studio version:** 2023.x
- **Required JDK version:** 17.x
- **Gradle version:** 8.x

## Permissions

| Permission | Name | Required | Purpose |
|---|---|---|---|
| Microphone | RECORD_AUDIO | Mandatory | Voice-based patient data entry |
| Camera | CAMERA | Optional | Future document scanning features |

## Environment Setup

Ensure the following environment variables are set:

```bash
ANDROID_HOME=/path/to/android/sdk
PATH=$PATH:$ANDROID_HOME/emulator
PATH=$PATH:$ANDROID_HOME/platform-tools
```

## Build & Run

```bash
# Clean build artifacts
cd android && ./gradlew clean && cd ..

# Build debug APK
cd android && ./gradlew assembleDebug && cd ..

# Build and run on emulator/device
npx react-native run-android

# Run on specific device
adb devices
npx react-native run-android --deviceId=<device_id>
```

## Troubleshooting

- **ANDROID_HOME not set:** Export `ANDROID_HOME` in your shell profile pointing to the Android SDK directory.
- **Gradle sync fails:** Verify JDK 17 is installed (`java -version`) and `JAVA_HOME` is set correctly.
- **minSdkVersion conflict:** Ensure all third-party libraries support API 29+.
- **Build fails after adding permissions:** Sync Gradle in Android Studio or run `./gradlew clean`.
