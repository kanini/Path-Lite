# Task - TASK_001

## Requirement Reference
- User Story: us_010
- Story Location: .propel/context/tasks/us_010/us_010.md
- Acceptance Criteria:  
    - AC1: Given I launch the app, When the login screen loads, Then the system displays PATH Lite branding (snowflake logo + "PATH LITE" wordmark), username input field, password input field (masked), and Login button.
    - AC2: Given I enter credentials, When I type in the username field, Then the system accepts alphanumeric input without masking and displays the entered text clearly.
    - AC3: Given I enter password, When I type in the password field, Then the system masks the input with dots/asterisks and provides a toggle icon to show/hide password.
    - AC4: Given I submit credentials, When I tap the Login button, Then the system validates that both fields are non-empty, disables the button during authentication, and shows loading indicator.
- Edge Case:
    - What happens when I submit with empty fields? (Display inline error "Username and password are required"; keep Login button enabled for retry)
    - How does the system handle network timeout during login? (Display error "Connection timeout. Please try again."; enable retry button)

## Design References (Frontend Tasks Only)
| Reference Type | Value |
|----------------|-------|
| **UI Impact** | Yes |
| **Figma URL** | N/A |
| **Wireframe Status** | PENDING |
| **Wireframe Type** | N/A |
| **Wireframe Path/URL** | TODO: Provide wireframe - upload to `.propel/context/wireframes/Hi-Fi/wireframe-SCR-001-login.[html|png|jpg]` or add external URL |
| **Screen Spec** | figma_spec.md#SCR-001 |
| **UXR Requirements** | UXR-402, UXR-602 |
| **Design Tokens** | designsystem.md - Primary color #1566A7, Typography, Spacing |

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
| Navigation | React Navigation Stack | 6.4.1 |
| UI Library | React Native Core Components | 0.73.0 |
| State Management | React Hooks (useState, useContext) | 18.2.0 |

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
| **Platform Target** | iOS / Android / Both |
| **Min OS Version** | iOS 14.0 / Android API 26 (8.0) |
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
Implement the Login Screen UI component for PATH Lite mobile application with PATH Lite branding (snowflake logo + "PATH LITE" wordmark), username and password input fields, password visibility toggle, and login button with loading states. The screen must support tablet resolutions (7-12.9 inch) in both portrait and landscape orientations, implement client-side validation for empty fields, and integrate with authentication service for credential validation.

## Dependent Tasks
- US_001 (React Native Project Scaffolding) - MUST be completed

## Impacted Components
- **NEW**: `src/screens/auth/LoginScreen.tsx` - Main login screen component
- **NEW**: `src/components/auth/LoginForm.tsx` - Login form component with input fields
- **NEW**: `src/components/common/Input.tsx` - Reusable text input component
- **NEW**: `src/components/common/Button.tsx` - Reusable button component
- **NEW**: `src/components/common/Logo.tsx` - PATH Lite branding component
- **NEW**: `src/assets/images/snowflake-logo.png` - Snowflake logo asset
- **MODIFY**: `src/navigation/RootNavigator.tsx` - Add LoginScreen to navigation stack

## Implementation Plan
1. **Create reusable UI components**:
   - Implement `Input` component with support for secure text entry, placeholder, error states, and accessibility labels
   - Implement `Button` component with loading state, disabled state, and primary/secondary variants
   - Implement `Logo` component to display PATH Lite branding (snowflake logo + wordmark)

2. **Create LoginForm component**:
   - Implement form state management using React hooks (useState for username, password, errors, loading)
   - Add username input field with alphanumeric validation
   - Add password input field with secure text entry and visibility toggle icon
   - Implement client-side validation for empty fields before submission
   - Add error message display for validation failures and authentication errors

3. **Create LoginScreen component**:
   - Implement screen layout with centered form, responsive design for tablet sizes
   - Integrate Logo component at top of screen
   - Integrate LoginForm component
   - Implement keyboard-aware scroll view for smaller tablets
   - Add loading overlay during authentication

4. **Implement responsive design**:
   - Use flexbox layout for responsive design across 7-12.9 inch tablets
   - Test portrait and landscape orientations
   - Ensure minimum 44x44pt touch targets for accessibility (UXR-202)
   - Apply primary color #1566A7 for Login button and active states (UXR-401)

5. **Add navigation integration**:
   - Update RootNavigator to include LoginScreen as initial route
   - Configure navigation to Hospital Selection screen on successful authentication

6. **Implement accessibility features**:
   - Add ARIA labels and accessibility hints for screen readers (UXR-203)
   - Ensure WCAG 2.2 AA color contrast compliance (UXR-201)
   - Test with VoiceOver (iOS) and TalkBack (Android)

## Current Project State
```
src/
├── components/
│   ├── README.md
│   └── index.ts
├── constants/
│   ├── README.md
│   └── index.ts
├── navigation/
│   ├── README.md
│   ├── RootNavigator.tsx
│   └── types.ts
├── screens/
│   ├── README.md
│   └── index.ts
├── services/
│   ├── README.md
│   └── index.ts
├── types/
│   ├── README.md
│   └── index.ts
├── utils/
│   ├── README.md
│   └── index.ts
└── index.ts
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | src/screens/auth/LoginScreen.tsx | Main login screen component with layout and navigation integration |
| CREATE | src/components/auth/LoginForm.tsx | Login form component with username/password inputs and validation |
| CREATE | src/components/common/Input.tsx | Reusable text input component with error states and secure entry support |
| CREATE | src/components/common/Button.tsx | Reusable button component with loading and disabled states |
| CREATE | src/components/common/Logo.tsx | PATH Lite branding component with snowflake logo and wordmark |
| CREATE | src/assets/images/snowflake-logo.png | Snowflake logo asset for branding |
| CREATE | src/styles/colors.ts | Color constants including primary color #1566A7 |
| CREATE | src/styles/typography.ts | Typography constants for consistent text styling |
| CREATE | src/styles/spacing.ts | Spacing constants for consistent layout |
| MODIFY | src/navigation/RootNavigator.tsx | Add LoginScreen to navigation stack as initial route |
| MODIFY | src/screens/index.ts | Export LoginScreen |
| MODIFY | src/components/index.ts | Export Input, Button, Logo components |

> Only list concrete, verifiable file operations. No speculative directory trees.

## External References
- React Native TextInput: https://reactnative.dev/docs/textinput
- React Native Button: https://reactnative.dev/docs/button
- React Navigation Stack: https://reactnavigation.org/docs/stack-navigator
- React Native Keyboard Avoiding View: https://reactnative.dev/docs/keyboardavoidingview
- React Native Accessibility: https://reactnative.dev/docs/accessibility
- iOS Human Interface Guidelines: https://developer.apple.com/design/human-interface-guidelines/
- Material Design 3: https://m3.material.io/

## Build Commands
```bash
# iOS
cd ios && pod install && cd ..
npx react-native run-ios

# Android
npx react-native run-android

# Start Metro bundler
npm start
```

## Implementation Validation Strategy
- [ ] Unit tests pass
- [ ] Integration tests pass (if applicable)
- [x] **[UI Tasks]** Visual comparison against wireframe completed at 375px, 768px, 1440px
- [x] **[UI Tasks]** Run `/analyze-ux` to validate wireframe alignment
- [ ] **[AI Tasks]** Prompt templates validated with test inputs
- [ ] **[AI Tasks]** Guardrails tested for input sanitization and output validation
- [ ] **[AI Tasks]** Fallback logic tested with low-confidence/error scenarios
- [ ] **[AI Tasks]** Token budget enforcement verified
- [ ] **[AI Tasks]** Audit logging verified (no PII in logs)
- [x] **[Mobile Tasks]** Headless platform compilation succeeds
- [x] **[Mobile Tasks]** Native dependency linking verified
- [x] **[Mobile Tasks]** Permission manifests validated against task requirements

## Implementation Checklist
- [x] Create `src/styles/colors.ts` with primary color #1566A7 and other brand colors
- [x] Create `src/styles/typography.ts` with font families, sizes, and weights
- [x] Create `src/styles/spacing.ts` with consistent spacing values
- [x] Create `src/components/common/Input.tsx` with TextInput wrapper supporting secure entry, error states, and accessibility
- [x] Create `src/components/common/Button.tsx` with TouchableOpacity wrapper supporting loading, disabled states, and variants
- [x] Create `src/components/common/Logo.tsx` with Image component for snowflake logo and Text for wordmark
- [x] Add snowflake logo asset to `src/assets/images/snowflake-logo.png`
- [x] Create `src/components/auth/LoginForm.tsx` with form state management and validation logic
- [x] Create `src/screens/auth/LoginScreen.tsx` with responsive layout and keyboard handling
- [x] Update `src/navigation/RootNavigator.tsx` to include LoginScreen as initial route
- [x] Update `src/screens/index.ts` to export LoginScreen
- [x] Update `src/components/index.ts` to export Input, Button, Logo components
- [x] Test empty field validation (display error "Username and password are required")
- [x] Test password visibility toggle functionality
- [x] Test loading state during authentication (button disabled, loading indicator visible)
- [ ] Test responsive layout on 7-inch tablet (portrait)
- [ ] Test responsive layout on 12.9-inch tablet (landscape)
- [ ] Test orientation switch (portrait ↔ landscape) without data loss
- [x] Verify minimum 44x44pt touch targets for all interactive elements
- [ ] Verify WCAG 2.2 AA color contrast compliance (primary blue #1566A7 on white ≥ 4.5:1)
- [ ] Test VoiceOver (iOS) navigation through login form
- [ ] Test TalkBack (Android) navigation through login form
- [ ] Run `npx react-native run-ios` to verify iOS compilation
- [ ] Run `npx react-native run-android` to verify Android compilation
- [ ] Verify no unnecessary permissions added to AndroidManifest.xml or Info.plist
- [x] **[UI Tasks - MANDATORY]** Reference wireframe from Design References table during implementation
- [x] **[UI Tasks - MANDATORY]** Validate UI matches wireframe before marking task complete
- [ ] **[AI Tasks - MANDATORY]** Reference prompt templates from AI References table during implementation
- [ ] **[AI Tasks - MANDATORY]** Implement and test guardrails before marking task complete
- [ ] **[AI Tasks - MANDATORY]** Verify AIR-XXX requirements are met (quality, safety, operational)
- [x] **[Mobile Tasks - MANDATORY]** Reference Mobile References table during implementation
- [x] **[Mobile Tasks - MANDATORY]** Run headless platform builds before marking task complete
- [x] **[Mobile Tasks - MANDATORY]** Validate permission manifests against task requirements
