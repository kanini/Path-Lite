# Task - TASK_001

## Requirement Reference
- User Story: us_001
- Story Location: .propel/context/tasks/us_001/us_001.md
- Acceptance Criteria:  
    - **AC1**: Given I need to initialize the project, When I run the React Native CLI initialization command, Then the system creates a React Native 0.73+ project with iOS and Android folders, package.json, and app.json configuration files.
- Edge Case:
    - What happens when React Native CLI version is incompatible? (Validate CLI version ≥0.73 before initialization; display error with upgrade instructions)
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
| Package Manager | npm | 9.x |
| Node.js | Node.js | 18.x |
| iOS | Xcode | 15.x |
| Android | Android Studio | 2023.x |

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
Initialize a React Native 0.73+ project using React Native CLI with proper iOS and Android platform configurations. This task establishes the foundational project structure including native folders, configuration files (package.json, app.json), and validates development environment prerequisites (Node.js 18+, Xcode 15+, Android Studio). Implements pre-flight checks to ensure CLI version compatibility and required development tools are installed before project initialization.

## Dependent Tasks
- None (First task in project foundation)

## Impacted Components
- **NEW**: Project root directory structure
- **NEW**: package.json (dependency manifest)
- **NEW**: app.json (React Native configuration)
- **NEW**: ios/ folder (iOS native code)
- **NEW**: android/ folder (Android native code)
- **NEW**: metro.config.js (Metro bundler configuration)
- **NEW**: babel.config.js (Babel transpiler configuration)
- **NEW**: tsconfig.json (TypeScript configuration)

## Implementation Plan
1. **Environment Validation**:
   - Verify Node.js version ≥18.0.0 using `node --version`
   - Verify React Native CLI version ≥0.73.0 using `npx react-native --version`
   - Check Xcode installation (macOS only) using `xcode-select -p`
   - Check Android Studio installation by verifying ANDROID_HOME environment variable
   - Display actionable error messages with installation links if prerequisites missing

2. **React Native Project Initialization**:
   - Run `npx react-native@latest init PathLite --version 0.73` to create project
   - Verify project structure includes ios/, android/, package.json, app.json
   - Confirm React Native version in package.json is 0.73.x or higher

3. **TypeScript Configuration**:
   - Ensure TypeScript is configured (React Native 0.73+ includes TypeScript by default)
   - Verify tsconfig.json has strict mode enabled and proper path mappings
   - Update tsconfig.json to include src/ folder in paths

4. **Metro Bundler Configuration**:
   - Review metro.config.js for default configuration
   - Add support for absolute imports using metro-react-native-babel-preset

5. **Package.json Validation**:
   - Verify scripts section includes: start, android, ios, test, lint
   - Confirm dependencies include react-native 0.73+, react 18.2+
   - Confirm devDependencies include @babel/core, @babel/preset-env, @babel/runtime, metro-react-native-babel-preset

6. **App.json Configuration**:
   - Verify app.json contains displayName and name fields
   - Set displayName to "PATH Lite"
   - Set name to "PathLite"

7. **Git Initialization**:
   - Initialize git repository with `git init`
   - Verify .gitignore includes node_modules/, ios/Pods/, android/.gradle/, .env

8. **Dependency Installation**:
   - Run `npm install` to install all dependencies
   - Verify node_modules/ folder is created with all packages

9. **iOS Pod Installation** (macOS only):
   - Navigate to ios/ folder
   - Run `pod install` to install iOS native dependencies
   - Verify ios/Pods/ folder is created

10. **Validation**:
    - Run `npx react-native doctor` to validate environment setup
    - Verify all checks pass (Node, Ruby, Xcode, Android SDK, JDK)
    - Document any warnings or errors for resolution in subsequent tasks

## Current Project State
```
[PLACEHOLDER - Will be updated after task execution]
Empty directory - green-field project initialization
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | /package.json | React Native project dependency manifest with scripts and dependencies |
| CREATE | /app.json | React Native app configuration with displayName and name |
| CREATE | /metro.config.js | Metro bundler configuration for JavaScript bundling |
| CREATE | /babel.config.js | Babel transpiler configuration with React Native preset |
| CREATE | /tsconfig.json | TypeScript compiler configuration with strict mode |
| CREATE | /ios/ | iOS native code folder with Xcode project and Podfile |
| CREATE | /android/ | Android native code folder with Gradle build scripts |
| CREATE | /.gitignore | Git ignore patterns for node_modules, build artifacts |
| CREATE | /App.tsx | Default React Native entry component |
| CREATE | /index.js | React Native app entry point |

## External References
- [React Native Environment Setup](https://reactnative.dev/docs/environment-setup)
- [React Native CLI Documentation](https://github.com/react-native-community/cli)
- [React Native 0.73 Release Notes](https://github.com/facebook/react-native/releases/tag/v0.73.0)
- [Node.js 18 LTS Documentation](https://nodejs.org/en/blog/release/v18.0.0)
- [Xcode 15 Release Notes](https://developer.apple.com/documentation/xcode-release-notes/xcode-15-release-notes)
- [Android Studio Installation Guide](https://developer.android.com/studio/install)

## Build Commands
```bash
# Validate environment
node --version  # Should be ≥18.0.0
npx react-native --version  # Should be ≥0.73.0

# Initialize React Native project
npx react-native@latest init PathLite --version 0.73

# Navigate to project directory
cd PathLite

# Install dependencies
npm install

# Install iOS pods (macOS only)
cd ios && pod install && cd ..

# Validate setup
npx react-native doctor

# Run on iOS (macOS only)
npx react-native run-ios

# Run on Android
npx react-native run-android
```

## Implementation Validation Strategy
- [ ] Unit tests pass (N/A - infrastructure task)
- [ ] Integration tests pass (N/A - infrastructure task)
- [ ] **[Mobile Tasks]** Headless platform compilation succeeds
- [ ] **[Mobile Tasks]** Native dependency linking verified
- [ ] **[Mobile Tasks]** Permission manifests validated against task requirements
- [ ] React Native CLI version ≥0.73.0 verified
- [ ] Node.js version ≥18.0.0 verified
- [ ] package.json contains react-native 0.73+
- [ ] ios/ and android/ folders created
- [ ] `npx react-native doctor` passes all checks
- [ ] iOS build succeeds with `npx react-native run-ios` (macOS only)
- [ ] Android build succeeds with `npx react-native run-android`

## Implementation Checklist
- [x] Verify Node.js version ≥18.0.0
- [x] Verify React Native CLI version ≥0.73.0
- [x] Check Xcode installation (macOS only)
- [x] Check Android Studio and ANDROID_HOME environment variable
- [x] Run `npx react-native@latest init PathLite --version 0.73`
- [x] Verify project structure (ios/, android/, package.json, app.json)
- [x] Update app.json displayName to "PATH Lite"
- [x] Review and validate tsconfig.json configuration
- [x] Run `npm install` to install dependencies
- [ ] Run `pod install` in ios/ folder (macOS only)
- [x] Initialize git repository with `git init`
- [x] Verify .gitignore includes node_modules/, ios/Pods/, android/.gradle/
- [ ] Run `npx react-native doctor` and resolve any issues
- [ ] Test iOS build with `npx react-native run-ios` (macOS only)
- [x] Test Android build with `npx react-native run-android`
- [x] **[Mobile Tasks - MANDATORY]** Reference Mobile References table during implementation
- [x] **[Mobile Tasks - MANDATORY]** Run headless platform builds before marking task complete
- [x] **[Mobile Tasks - MANDATORY]** Validate permission manifests against task requirements
- [x] Document project structure in README.md
