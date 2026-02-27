# iOS Configuration

## Requirements

- **Minimum iOS version:** 14.0
- **Required Xcode version:** 15.x
- **CocoaPods version:** 1.12+

## Permissions

| Permission | Key | Required | Purpose |
|---|---|---|---|
| Microphone | NSMicrophoneUsageDescription | Mandatory | Voice-based patient data entry |
| Camera | NSCameraUsageDescription | Optional | Future document scanning features |

## Pod Installation

```bash
cd ios
pod install
cd ..
```

## Build & Run

```bash
# Run on iOS simulator
npx react-native run-ios

# Run on specific simulator
npx react-native run-ios --simulator="iPhone 14"
```

## Troubleshooting

- **Pod install fails:** Ensure CocoaPods is installed (`sudo gem install cocoapods`) and Ruby version is compatible.
- **Xcode build fails:** Verify Xcode 15.x is installed via `xcodebuild -version`.
- **Deployment target errors:** Confirm `platform :ios, '14.0'` is set in Podfile.
