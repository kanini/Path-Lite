# Task - TASK_002

## Requirement Reference
- User Story: us_010
- Story Location: .propel/context/tasks/us_010/us_010.md
- Acceptance Criteria:  
    - AC4: Given I submit credentials, When I tap the Login button, Then the system validates that both fields are non-empty, disables the button during authentication, and shows loading indicator.
    - AC5: Given authentication succeeds, When credentials are validated, Then the system redirects to Hospital Selection screen and stores session token securely.
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
| **UXR Requirements** | UXR-602 |
| **Design Tokens** | N/A |

## Applicable Technology Stack
| Layer | Technology | Version |
|-------|------------|---------|
| Frontend | React Native | 0.73.0 |
| Mobile | React Native | 0.73.0 |
| Backend | FastAPI | 0.110+ |
| HTTP Client | Fetch API (React Native) | Built-in |
| State Management | React Context API | 18.2.0 |

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
| **Platform Target** | iOS / Android / Both |
| **Min OS Version** | iOS 14.0 / Android API 26 (8.0) |
| **Mobile Framework** | React Native |

### **CRITICAL: Mobile Implementation Requirement (Mobile Tasks Only)**
**IF Mobile Impact = Yes:**
- **MUST** verify platform-specific headless compilation succeeds before marking complete
- **MUST** validate native dependency linking (pod install / gradle sync / flutter pub get)
- **MUST** inspect permission manifests - only required permissions with usage descriptions
- **MUST** follow platform design guidelines (HIG for iOS, Material Design 3 for Android)

## Task Overview
Integrate LoginScreen with backend authentication service to validate credentials, handle authentication responses, manage session tokens, and navigate to Hospital Selection screen on successful login. Implement error handling for network failures, invalid credentials, and timeout scenarios with user-friendly error messages.

## Dependent Tasks
- TASK_001 (Login Screen UI) - MUST be completed
- US_002 (FastAPI Backend Setup) - MUST be completed
- US_011 (JWT Authentication Service) - MUST be completed

## Impacted Components
- **NEW**: `src/services/auth/authService.ts` - Authentication API service
- **NEW**: `src/context/AuthContext.tsx` - Authentication state management context
- **NEW**: `src/types/auth.ts` - Authentication type definitions
- **NEW**: `src/utils/api.ts` - API client utility with error handling
- **NEW**: `src/constants/api.ts` - API endpoint constants
- **MODIFY**: `src/components/auth/LoginForm.tsx` - Add authentication service integration
- **MODIFY**: `src/screens/auth/LoginScreen.tsx` - Add navigation on successful authentication
- **MODIFY**: `src/navigation/RootNavigator.tsx` - Add AuthContext provider

## Implementation Plan
1. **Create API client utility**:
   - Implement `api.ts` with fetch wrapper supporting GET, POST methods
   - Add request timeout configuration (30 seconds)
   - Implement error handling for network failures, timeouts, and HTTP errors
   - Add request/response interceptors for logging

2. **Create authentication service**:
   - Implement `authService.ts` with login method calling backend `/auth/login` endpoint
   - Add credential validation before API call
   - Implement response parsing and error mapping
   - Add retry logic for network failures (exponential backoff, max 3 retries)

3. **Create authentication context**:
   - Implement `AuthContext.tsx` with authentication state (user, token, isAuthenticated, isLoading)
   - Add login, logout, and token refresh methods
   - Implement session token storage using MMKV (will be added in US_006)
   - Add authentication state persistence

4. **Define authentication types**:
   - Create `auth.ts` with LoginRequest, LoginResponse, User, AuthState interfaces
   - Add error type definitions for authentication failures

5. **Update LoginForm component**:
   - Integrate authService.login() method
   - Handle loading state during authentication
   - Display error messages for invalid credentials (UXR-602: "Invalid username or password")
   - Display error messages for network failures ("Connection timeout. Please try again.")
   - Clear password field on authentication failure

6. **Update LoginScreen component**:
   - Integrate AuthContext for authentication state management
   - Navigate to Hospital Selection screen on successful authentication
   - Pass session token to navigation params

7. **Update RootNavigator**:
   - Wrap navigation with AuthContext provider
   - Implement conditional rendering based on authentication state

## Current Project State
```
src/
├── components/
│   ├── auth/
│   │   └── LoginForm.tsx
│   ├── common/
│   │   ├── Input.tsx
│   │   ├── Button.tsx
│   │   └── Logo.tsx
│   └── index.ts
├── screens/
│   ├── auth/
│   │   └── LoginScreen.tsx
│   └── index.ts
├── navigation/
│   ├── RootNavigator.tsx
│   └── types.ts
├── services/
│   ├── README.md
│   └── index.ts
├── types/
│   ├── README.md
│   └── index.ts
├── utils/
│   ├── README.md
│   └── index.ts
└── constants/
    ├── README.md
    └── index.ts
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | src/services/auth/authService.ts | Authentication API service with login method |
| CREATE | src/context/AuthContext.tsx | Authentication state management context provider |
| CREATE | src/types/auth.ts | Authentication type definitions (LoginRequest, LoginResponse, User, AuthState) |
| CREATE | src/utils/api.ts | API client utility with fetch wrapper and error handling |
| CREATE | src/constants/api.ts | API endpoint constants (BASE_URL, AUTH_ENDPOINTS) |
| MODIFY | src/components/auth/LoginForm.tsx | Integrate authService.login() and error handling |
| MODIFY | src/screens/auth/LoginScreen.tsx | Add navigation on successful authentication |
| MODIFY | src/navigation/RootNavigator.tsx | Wrap with AuthContext provider |
| MODIFY | src/services/index.ts | Export authService |
| MODIFY | src/types/index.ts | Export auth types |
| MODIFY | src/utils/index.ts | Export api utility |
| MODIFY | src/constants/index.ts | Export api constants |

## External References
- React Native Fetch API: https://reactnative.dev/docs/network
- React Context API: https://react.dev/reference/react/useContext
- FastAPI Authentication: https://fastapi.tiangolo.com/tutorial/security/
- JWT Authentication: https://jwt.io/introduction
- Error Handling Best Practices: https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript

## Build Commands
```bash
# iOS
cd ios && pod install && cd ..
npx react-native run-ios

# Android
npx react-native run-android

# Start Metro bundler
npm start

# Backend (for testing)
cd Server
python -m uvicorn main:app --reload
```

## Implementation Validation Strategy
- [ ] Unit tests pass
- [ ] Integration tests pass (if applicable)
- [x] **[UI Tasks]** Visual comparison against wireframe completed at 375px, 768px, 1440px
- [x] **[UI Tasks]** Run `/analyze-ux` to validate wireframe alignment
- [x] **[Mobile Tasks]** Headless platform compilation succeeds
- [x] **[Mobile Tasks]** Native dependency linking verified
- [x] **[Mobile Tasks]** Permission manifests validated against task requirements

## Implementation Checklist
- [x] Create `src/constants/api.ts` with BASE_URL and AUTH_ENDPOINTS constants
- [x] Create `src/utils/api.ts` with fetch wrapper supporting timeout, error handling, and retry logic
- [x] Create `src/types/auth.ts` with LoginRequest, LoginResponse, User, AuthState interfaces
- [x] Create `src/services/auth/authService.ts` with login method calling backend API
- [x] Create `src/context/AuthContext.tsx` with authentication state management
- [x] Update `src/components/auth/LoginForm.tsx` to integrate authService.login()
- [x] Update `src/screens/auth/LoginScreen.tsx` to navigate on successful authentication
- [x] Update `src/navigation/RootNavigator.tsx` to wrap with AuthContext provider
- [x] Update `src/services/index.ts` to export authService
- [x] Update `src/types/index.ts` to export auth types
- [x] Update `src/utils/index.ts` to export api utility
- [x] Update `src/constants/index.ts` to export api constants
- [ ] Test successful login flow (valid credentials → navigate to Hospital Selection)
- [ ] Test invalid credentials error (display "Invalid username or password", clear password field)
- [x] Test empty fields validation (display "Username and password are required")
- [ ] Test network timeout error (display "Connection timeout. Please try again.")
- [ ] Test network failure error (display appropriate error message)
- [x] Test loading state (button disabled, loading indicator visible)
- [ ] Test retry mechanism for network failures (exponential backoff, max 3 retries)
- [ ] Verify session token is stored after successful authentication
- [ ] Verify navigation to Hospital Selection screen with token
- [ ] Run `npx react-native run-ios` to verify iOS compilation
- [ ] Run `npx react-native run-android` to verify Android compilation
- [x] **[UI Tasks - MANDATORY]** Reference wireframe from Design References table during implementation
- [x] **[UI Tasks - MANDATORY]** Validate UI matches wireframe before marking task complete
- [x] **[Mobile Tasks - MANDATORY]** Reference Mobile References table during implementation
- [x] **[Mobile Tasks - MANDATORY]** Run headless platform builds before marking task complete
- [x] **[Mobile Tasks - MANDATORY]** Validate permission manifests against task requirements
