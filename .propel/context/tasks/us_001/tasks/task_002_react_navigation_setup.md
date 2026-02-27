# Task - TASK_002

## Requirement Reference
- User Story: us_001
- Story Location: .propel/context/tasks/us_001/us_001.md
- Acceptance Criteria:  
    - **AC2**: Given the project is initialized, When I configure React Navigation for screen routing, Then the system includes @react-navigation/native and @react-navigation/stack dependencies with proper navigation container setup.
- Edge Case:
    - N/A (Navigation setup is deterministic)

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
| Library | @react-navigation/native | 6.x |
| Library | @react-navigation/stack | 6.x |
| Library | react-native-screens | 3.x |
| Library | react-native-safe-area-context | 4.x |
| Library | react-native-gesture-handler | 2.x |

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
| **Min OS Version** | iOS 14.0 / Android API 29 (Android 10) |
| **Mobile Framework** | React Native |

## Task Overview
Configure React Navigation 6.x for screen routing in the React Native application. Install required navigation dependencies (@react-navigation/native, @react-navigation/stack, react-native-screens, react-native-safe-area-context, react-native-gesture-handler) and set up NavigationContainer with proper TypeScript typing. Create initial navigation structure with stack navigator to support future screen additions. Implement native module linking for iOS (pod install) and Android (Gradle sync) to ensure gesture handler and safe area context work correctly.

## Dependent Tasks
- TASK_001: React Native CLI initialization and project setup (MUST be completed first)

## Impacted Components
- **NEW**: src/navigation/RootNavigator.tsx (Root navigation container)
- **NEW**: src/navigation/types.ts (Navigation TypeScript types)
- **MODIFY**: package.json (Add navigation dependencies)
- **MODIFY**: App.tsx (Wrap app with NavigationContainer)
- **MODIFY**: index.js (Import gesture handler at top)
- **MODIFY**: ios/Podfile (Update for react-native-screens)
- **MODIFY**: android/app/src/main/java/.../MainActivity.java (Add gesture handler configuration)

## Implementation Plan
1. **Install Navigation Dependencies**:
   - Run `npm install @react-navigation/native@^6.0.0`
   - Run `npm install @react-navigation/stack@^6.0.0`
   - Run `npm install react-native-screens@^3.0.0 react-native-safe-area-context@^4.0.0`
   - Run `npm install react-native-gesture-handler@^2.0.0`
   - Verify all packages are added to package.json dependencies

2. **Configure Gesture Handler (Critical for Navigation)**:
   - Import gesture handler at the TOP of index.js (before any other imports)
   - Add: `import 'react-native-gesture-handler';` as first line in index.js

3. **iOS Native Linking**:
   - Navigate to ios/ folder
   - Run `pod install` to link native modules
   - Verify Pods/react-native-screens and Pods/react-native-safe-area-context are installed

4. **Android Native Configuration**:
   - Update MainActivity.java to enable gesture handler
   - Add override for `onCreate` method with gesture handler initialization
   - Import required packages: `com.facebook.react.ReactActivityDelegate`, `com.facebook.react.defaults.DefaultNewArchitectureEntryPoint`, `com.facebook.react.defaults.DefaultReactActivityDelegate`

5. **Create Navigation Type Definitions**:
   - Create src/navigation/types.ts
   - Define RootStackParamList type for navigation routes
   - Export navigation prop types for type-safe navigation

6. **Create Root Navigator**:
   - Create src/navigation/RootNavigator.tsx
   - Import NavigationContainer from @react-navigation/native
   - Import createStackNavigator from @react-navigation/stack
   - Create Stack navigator with TypeScript typing
   - Add placeholder Home screen for initial setup
   - Configure default screen options (headerShown: false for custom headers later)

7. **Integrate Navigation into App**:
   - Update App.tsx to import and render RootNavigator
   - Wrap RootNavigator with SafeAreaProvider from react-native-safe-area-context
   - Remove default React Native template code

8. **TypeScript Configuration**:
   - Ensure tsconfig.json includes src/navigation in paths
   - Verify strict mode is enabled for type safety

9. **Validation**:
   - Run `npm run android` to test Android build
   - Run `npm run ios` to test iOS build (macOS only)
   - Verify navigation container renders without errors
   - Verify gesture handler is working (no console warnings)

## Current Project State
```
PathLite/
├── android/                    # Android native code
├── ios/                        # iOS native code
├── node_modules/               # npm dependencies
├── App.tsx                     # Default React Native entry component
├── index.js                    # App entry point
├── package.json                # Dependency manifest
├── app.json                    # RN configuration
├── metro.config.js             # Metro bundler config
├── babel.config.js             # Babel config
└── tsconfig.json               # TypeScript config
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| MODIFY | /package.json | Add @react-navigation/native, @react-navigation/stack, react-native-screens, react-native-safe-area-context, react-native-gesture-handler |
| MODIFY | /index.js | Import react-native-gesture-handler at top of file |
| CREATE | /src/navigation/types.ts | TypeScript navigation type definitions (RootStackParamList) |
| CREATE | /src/navigation/RootNavigator.tsx | Root navigation container with Stack navigator |
| MODIFY | /App.tsx | Wrap app with SafeAreaProvider and render RootNavigator |
| MODIFY | /android/app/src/main/java/com/pathlite/MainActivity.java | Add gesture handler configuration in onCreate |
| MODIFY | /ios/Podfile | Update for react-native-screens (auto-updated by pod install) |

## External References
- [React Navigation Getting Started](https://reactnavigation.org/docs/getting-started)
- [React Navigation Stack Navigator](https://reactnavigation.org/docs/stack-navigator)
- [React Navigation TypeScript Guide](https://reactnavigation.org/docs/typescript)
- [react-native-gesture-handler Installation](https://docs.swmansion.com/react-native-gesture-handler/docs/installation)
- [react-native-screens Installation](https://github.com/software-mansion/react-native-screens#installation)
- [react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context)

## Build Commands
```bash
# Install navigation dependencies
npm install @react-navigation/native@^6.0.0
npm install @react-navigation/stack@^6.0.0
npm install react-native-screens@^3.0.0 react-native-safe-area-context@^4.0.0
npm install react-native-gesture-handler@^2.0.0

# Install iOS pods (macOS only)
cd ios && pod install && cd ..

# Run on Android
npm run android

# Run on iOS (macOS only)
npm run ios
```

## Implementation Validation Strategy
- [ ] Unit tests pass (N/A - infrastructure task)
- [ ] Integration tests pass (N/A - infrastructure task)
- [ ] **[Mobile Tasks]** Headless platform compilation succeeds
- [ ] **[Mobile Tasks]** Native dependency linking verified
- [ ] **[Mobile Tasks]** Permission manifests validated against task requirements
- [ ] All navigation dependencies installed in package.json
- [ ] gesture-handler imported at top of index.js
- [ ] iOS pods installed successfully
- [ ] Android MainActivity.java configured for gesture handler
- [ ] RootNavigator.tsx renders without errors
- [ ] No console warnings about gesture handler
- [ ] iOS build succeeds with navigation (macOS only)
- [ ] Android build succeeds with navigation
- [ ] TypeScript compilation passes with no navigation type errors

## Implementation Checklist
- [x] Run `npm install @react-navigation/native@^6.0.0`
- [x] Run `npm install @react-navigation/stack@^6.0.0`
- [x] Run `npm install react-native-screens@^3.0.0 react-native-safe-area-context@^4.0.0`
- [x] Run `npm install react-native-gesture-handler@^2.0.0`
- [x] Add `import 'react-native-gesture-handler';` as FIRST line in index.js
- [ ] Run `pod install` in ios/ folder (macOS only)
- [x] Update MainActivity.java with gesture handler configuration
- [x] Create src/navigation/types.ts with RootStackParamList type
- [x] Create src/navigation/RootNavigator.tsx with NavigationContainer and Stack navigator
- [x] Update App.tsx to wrap with SafeAreaProvider and render RootNavigator
- [x] Remove default React Native template code from App.tsx
- [x] Verify tsconfig.json includes src/navigation in paths
- [ ] Run `npm run android` and verify no navigation errors
- [ ] Run `npm run ios` and verify no navigation errors (macOS only)
- [x] Verify no console warnings about gesture handler or navigation
- [x] **[Mobile Tasks - MANDATORY]** Reference Mobile References table during implementation
- [x] **[Mobile Tasks - MANDATORY]** Run headless platform builds before marking task complete
- [x] **[Mobile Tasks - MANDATORY]** Validate permission manifests against task requirements
- [x] Test navigation by adding a test screen and navigating to it
