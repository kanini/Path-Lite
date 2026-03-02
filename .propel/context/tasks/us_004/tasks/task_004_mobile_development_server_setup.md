# Task - TASK_004

## Requirement Reference
- User Story: US_004
- Story Location: `.propel/context/tasks/us_004/us_004.md`
- Acceptance Criteria:  
    - **AC4**: Given the mobile app needs to run, When I start the development server, Then the system runs Metro bundler for React Native and provides commands to launch iOS simulator (npm run ios) and Android emulator (npm run android).
- Edge Case:
    - N/A (Covered by existing React Native CLI configuration)

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
| Frontend | React Native | 0.73.0 |
| Backend | N/A | N/A |
| Database | N/A | N/A |
| Library | Metro Bundler | 0.73.x |
| AI/ML | N/A | N/A |
| Vector Store | N/A | N/A |
| AI Gateway | N/A | N/A |
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

## Mobile References (Mobile Tasks Only)
| Reference Type | Value |
|----------------|-------|
| **Mobile Impact** | Yes |
| **Platform Target** | Both |
| **Min OS Version** | iOS 13.4 / Android API 26 (8.0) |
| **Mobile Framework** | React Native |

## Task Overview
Document and validate Metro bundler configuration for React Native development server, ensure npm run ios and npm run android commands work correctly, and create helper scripts for common development workflows including device selection and cache clearing.

## Dependent Tasks
- TASK_001 (Comprehensive README Documentation) - IN PROGRESS
- TASK_003 (Dependency Installation Automation) - IN PROGRESS

## Impacted Components
- **MODIFY**: `/package.json` - Add additional development scripts
- **MODIFY**: `/metro.config.js` - Validate and document Metro configuration
- **CREATE**: `/scripts/start-dev.js` - Enhanced development server starter
- **CREATE**: `/docs/MOBILE_DEVELOPMENT.md` - Mobile development guide

## Implementation Plan
1. **Validate Metro Configuration**: Review metro.config.js for optimal settings
2. **Test Existing Scripts**: Verify npm run ios and npm run android work
3. **Create Enhanced Dev Scripts**: Add scripts for common development tasks
4. **Document Device Selection**: Guide for running on specific simulators/emulators
5. **Add Cache Clearing Scripts**: Help resolve common Metro bundler issues
6. **Create Mobile Dev Guide**: Comprehensive mobile development documentation
7. **Add Troubleshooting**: Common Metro bundler and build issues
8. **Test on Both Platforms**: Validate iOS and Android workflows

## Current Project State
```
Path-Lite/
├── package.json (has ios, android, start scripts)
├── metro.config.js (default configuration)
├── ios/ (iOS project configuration)
├── android/ (Android project configuration)
└── index.js (React Native entry point)
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| MODIFY | `/package.json` | Add dev:ios, dev:android, dev:clean scripts for enhanced workflows |
| MODIFY | `/metro.config.js` | Add comments documenting configuration options |
| CREATE | `/scripts/start-dev.js` | Interactive development server starter with platform selection |
| CREATE | `/scripts/clear-cache.js` | Script to clear Metro bundler and build caches |
| CREATE | `/docs/MOBILE_DEVELOPMENT.md` | Comprehensive mobile development guide with simulator/emulator setup |
| MODIFY | `/README.md` | Add "Running the Mobile App" section with quick start commands |

## External References
- [Metro Bundler Configuration](https://metrobundler.dev/docs/configuration)
- [React Native Running on Device](https://reactnative.dev/docs/running-on-device)
- [iOS Simulator Guide](https://developer.apple.com/documentation/xcode/running-your-app-in-simulator-or-on-a-device)
- [Android Emulator Guide](https://developer.android.com/studio/run/emulator)
- [React Native Debugging](https://reactnative.dev/docs/debugging)
- [Metro Bundler Troubleshooting](https://reactnative.dev/docs/troubleshooting#metro-bundler-issues)

## Build Commands
```bash
# Start Metro bundler
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Clean build and restart
npm run dev:clean
```

## Implementation Validation Strategy
- [x] Metro bundler starts successfully with npm start
- [x] npm run ios launches iOS simulator and app
- [x] npm run android launches Android emulator and app
- [ ] Cache clearing script resolves common bundler issues
- [ ] Development guide includes device selection instructions
- [ ] Troubleshooting section addresses common Metro errors
- [x] Scripts work on macOS (iOS + Android) and Windows/Linux (Android only)
- [ ] **[Mobile Tasks]** iOS simulator launches successfully on macOS
- [ ] **[Mobile Tasks]** Android emulator launches successfully on all platforms
- [x] **[Mobile Tasks]** Metro bundler configuration is optimized

## Implementation Checklist
- [x] Review and validate `/metro.config.js` configuration
- [x] Add inline comments to metro.config.js explaining options
- [x] Test `npm start` command - verify Metro bundler starts
- [x] Test `npm run ios` command - verify iOS build and launch
- [x] Test `npm run android` command - verify Android build and launch
- [ ] Create `/scripts/clear-cache.js` script
- [ ] Add Metro bundler cache clearing (--reset-cache)
- [ ] Add Watchman cache clearing (watchman watch-del-all)
- [ ] Add iOS build cache clearing (rm -rf ios/build)
- [ ] Add Android build cache clearing (cd android && ./gradlew clean)
- [ ] Add node_modules cleanup option
- [ ] Create `/scripts/start-dev.js` interactive script
- [ ] Add platform selection prompt (iOS/Android/Both)
- [ ] Add device selection for iOS simulators
- [ ] Add device selection for Android emulators
- [ ] Add option to clear cache before starting
- [ ] Update `/package.json` with new scripts
- [ ] Add "dev:clean" script to clear cache and restart
- [ ] Add "dev:ios" script for iOS-specific development
- [ ] Add "dev:android" script for Android-specific development
- [ ] Create `/docs/MOBILE_DEVELOPMENT.md` guide
- [ ] Document Metro bundler overview and purpose
- [ ] Document how to start development server
- [ ] Document how to select specific iOS simulator
- [ ] Document how to select specific Android emulator
- [ ] Document how to run on physical devices
- [ ] Document common Metro bundler errors and solutions
- [ ] Document build cache issues and resolution
- [ ] Update `/README.md` with mobile development section
- [ ] Add quick start commands for running mobile app
- [ ] Link to detailed mobile development guide
- [ ] **[Mobile Tasks - MANDATORY]** Verify iOS simulator selection works
- [ ] **[Mobile Tasks - MANDATORY]** Verify Android emulator selection works
- [ ] **[Mobile Tasks - MANDATORY]** Test on both platforms (if possible)
