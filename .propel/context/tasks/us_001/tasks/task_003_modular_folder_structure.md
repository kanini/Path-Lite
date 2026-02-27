# Task - TASK_003

## Requirement Reference
- User Story: us_001
- Story Location: .propel/context/tasks/us_001/us_001.md
- Acceptance Criteria:  
    - **AC3**: Given the project structure is created, When I organize the codebase into modular folders, Then the system has src/ folder with subfolders: screens/, components/, services/, utils/, and navigation/.
- Edge Case:
    - N/A (Folder structure creation is deterministic)

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
| Language | TypeScript | 5.x |
| Package Manager | npm | 9.x |

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
Create a modular folder structure within the src/ directory to organize React Native codebase following industry best practices. Establish clear separation of concerns with dedicated folders for screens/, components/, services/, utils/, and navigation/. Create index.ts barrel exports for each module to enable clean imports. Add README.md files in each folder to document purpose and usage guidelines. Configure TypeScript path mappings in tsconfig.json to support absolute imports (e.g., @screens, @components, @services).

## Dependent Tasks
- TASK_001: React Native CLI initialization and project setup (MUST be completed first)
- TASK_002: React Navigation configuration and routing setup (navigation/ folder already created, will be preserved)

## Impacted Components
- **NEW**: src/screens/ (Screen components folder)
- **NEW**: src/screens/index.ts (Barrel export for screens)
- **NEW**: src/screens/README.md (Screens folder documentation)
- **NEW**: src/components/ (Reusable UI components folder)
- **NEW**: src/components/index.ts (Barrel export for components)
- **NEW**: src/components/README.md (Components folder documentation)
- **NEW**: src/services/ (API and business logic services folder)
- **NEW**: src/services/index.ts (Barrel export for services)
- **NEW**: src/services/README.md (Services folder documentation)
- **NEW**: src/utils/ (Utility functions and helpers folder)
- **NEW**: src/utils/index.ts (Barrel export for utils)
- **NEW**: src/utils/README.md (Utils folder documentation)
- **EXISTING**: src/navigation/ (Already created in TASK_002, preserve existing files)
- **NEW**: src/navigation/README.md (Navigation folder documentation)
- **NEW**: src/types/ (Shared TypeScript type definitions)
- **NEW**: src/types/index.ts (Barrel export for types)
- **NEW**: src/constants/ (App-wide constants and configuration)
- **NEW**: src/constants/index.ts (Barrel export for constants)
- **MODIFY**: tsconfig.json (Add path mappings for absolute imports)

## Implementation Plan
1. **Create src/ Root Directory**:
   - Create src/ folder in project root if not exists
   - This becomes the primary source code directory

2. **Create screens/ Folder**:
   - Create src/screens/ directory for screen components
   - Create src/screens/index.ts barrel export file
   - Create src/screens/README.md with documentation:
     - Purpose: Container components representing full screens
     - Naming convention: PascalCase with "Screen" suffix (e.g., LoginScreen.tsx)
     - Guidelines: One screen per file, screens should use navigation and services

3. **Create components/ Folder**:
   - Create src/components/ directory for reusable UI components
   - Create src/components/index.ts barrel export file
   - Create src/components/README.md with documentation:
     - Purpose: Reusable, presentational UI components
     - Naming convention: PascalCase (e.g., Button.tsx, Card.tsx)
     - Guidelines: Components should be pure, testable, and reusable

4. **Create services/ Folder**:
   - Create src/services/ directory for business logic and API services
   - Create src/services/index.ts barrel export file
   - Create src/services/README.md with documentation:
     - Purpose: API clients, data fetching, business logic services
     - Naming convention: camelCase with "Service" suffix (e.g., authService.ts)
     - Guidelines: Services should be stateless, testable, and follow single responsibility

5. **Create utils/ Folder**:
   - Create src/utils/ directory for utility functions
   - Create src/utils/index.ts barrel export file
   - Create src/utils/README.md with documentation:
     - Purpose: Pure utility functions and helpers
     - Naming convention: camelCase (e.g., formatDate.ts, validation.ts)
     - Guidelines: Functions should be pure, testable, and reusable

6. **Update navigation/ Folder**:
   - Preserve existing src/navigation/RootNavigator.tsx and types.ts from TASK_002
   - Create src/navigation/README.md with documentation:
     - Purpose: Navigation configuration and routing logic
     - Naming convention: PascalCase for navigators (e.g., RootNavigator.tsx)
     - Guidelines: Keep navigation logic separate from screens

7. **Create types/ Folder**:
   - Create src/types/ directory for shared TypeScript types
   - Create src/types/index.ts barrel export file
   - Create src/types/README.md with documentation:
     - Purpose: Shared type definitions, interfaces, and enums
     - Naming convention: PascalCase for types/interfaces (e.g., User.ts, ApiResponse.ts)

8. **Create constants/ Folder**:
   - Create src/constants/ directory for app-wide constants
   - Create src/constants/index.ts barrel export file
   - Create src/constants/README.md with documentation:
     - Purpose: App configuration, API endpoints, theme constants
     - Naming convention: UPPER_SNAKE_CASE for constants (e.g., API_BASE_URL)

9. **Configure TypeScript Path Mappings**:
   - Update tsconfig.json to add path mappings:
     - "@screens/*": ["src/screens/*"]
     - "@components/*": ["src/components/*"]
     - "@services/*": ["src/services/*"]
     - "@utils/*": ["src/utils/*"]
     - "@navigation/*": ["src/navigation/*"]
     - "@types/*": ["src/types/*"]
     - "@constants/*": ["src/constants/*"]
   - Set baseUrl to "./" in tsconfig.json

10. **Configure Metro Bundler for Absolute Imports**:
    - Update metro.config.js to support absolute imports if needed
    - Verify Metro can resolve path mappings

11. **Create Root src/index.ts**:
    - Create src/index.ts as central export point
    - Export all modules from subfolders

12. **Validation**:
    - Verify all folders and README.md files are created
    - Verify tsconfig.json path mappings are correct
    - Test absolute imports by importing a module using @ prefix
    - Run TypeScript compiler to ensure no errors

## Current Project State
```
PathLite/
├── android/                    # Android native code
├── ios/                        # iOS native code
├── node_modules/               # npm dependencies
├── src/
│   └── navigation/             # Created in TASK_002
│       ├── RootNavigator.tsx
│       └── types.ts
├── App.tsx                     # App entry component
├── index.js                    # App entry point
├── package.json                # Dependency manifest
├── tsconfig.json               # TypeScript config
└── [other config files]
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | /src/screens/ | Folder for screen components |
| CREATE | /src/screens/index.ts | Barrel export for screens |
| CREATE | /src/screens/README.md | Screens folder documentation |
| CREATE | /src/components/ | Folder for reusable UI components |
| CREATE | /src/components/index.ts | Barrel export for components |
| CREATE | /src/components/README.md | Components folder documentation |
| CREATE | /src/services/ | Folder for API and business logic services |
| CREATE | /src/services/index.ts | Barrel export for services |
| CREATE | /src/services/README.md | Services folder documentation |
| CREATE | /src/utils/ | Folder for utility functions |
| CREATE | /src/utils/index.ts | Barrel export for utils |
| CREATE | /src/utils/README.md | Utils folder documentation |
| CREATE | /src/navigation/README.md | Navigation folder documentation |
| CREATE | /src/types/ | Folder for shared TypeScript types |
| CREATE | /src/types/index.ts | Barrel export for types |
| CREATE | /src/types/README.md | Types folder documentation |
| CREATE | /src/constants/ | Folder for app-wide constants |
| CREATE | /src/constants/index.ts | Barrel export for constants |
| CREATE | /src/constants/README.md | Constants folder documentation |
| CREATE | /src/index.ts | Root barrel export for src/ |
| MODIFY | /tsconfig.json | Add path mappings for absolute imports (@screens, @components, etc.) |

## External References
- [React Native Project Structure Best Practices](https://reactnative.dev/docs/getting-started)
- [TypeScript Path Mapping](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping)
- [Metro Bundler Configuration](https://facebook.github.io/metro/docs/configuration)
- [Barrel Exports Pattern](https://basarat.gitbook.io/typescript/main-1/barrel)
- [Clean Architecture in React Native](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

## Build Commands
```bash
# No build commands required - folder structure creation only

# Verify TypeScript compilation after path mapping changes
npx tsc --noEmit

# Test absolute imports work
npm run android
npm run ios
```

## Implementation Validation Strategy
- [ ] Unit tests pass (N/A - infrastructure task)
- [ ] Integration tests pass (N/A - infrastructure task)
- [ ] **[Mobile Tasks]** Headless platform compilation succeeds
- [ ] **[Mobile Tasks]** Native dependency linking verified
- [ ] **[Mobile Tasks]** Permission manifests validated against task requirements
- [ ] All folders created: screens/, components/, services/, utils/, navigation/, types/, constants/
- [ ] All index.ts barrel export files created
- [ ] All README.md documentation files created
- [ ] tsconfig.json updated with path mappings
- [ ] TypeScript compilation passes with `npx tsc --noEmit`
- [ ] Absolute imports work (test by importing a module using @ prefix)
- [ ] Existing navigation/ files preserved from TASK_002

## Implementation Checklist
- [ ] Create src/screens/ folder
- [ ] Create src/screens/index.ts barrel export
- [ ] Create src/screens/README.md with documentation
- [ ] Create src/components/ folder
- [ ] Create src/components/index.ts barrel export
- [ ] Create src/components/README.md with documentation
- [ ] Create src/services/ folder
- [ ] Create src/services/index.ts barrel export
- [ ] Create src/services/README.md with documentation
- [ ] Create src/utils/ folder
- [ ] Create src/utils/index.ts barrel export
- [ ] Create src/utils/README.md with documentation
- [ ] Create src/navigation/README.md (preserve existing RootNavigator.tsx and types.ts)
- [ ] Create src/types/ folder
- [ ] Create src/types/index.ts barrel export
- [ ] Create src/types/README.md with documentation
- [ ] Create src/constants/ folder
- [ ] Create src/constants/index.ts barrel export
- [ ] Create src/constants/README.md with documentation
- [ ] Create src/index.ts root barrel export
- [ ] Update tsconfig.json with path mappings for @screens, @components, @services, @utils, @navigation, @types, @constants
- [ ] Set baseUrl to "./" in tsconfig.json
- [ ] Run `npx tsc --noEmit` to verify TypeScript compilation
- [ ] Test absolute imports by creating a test file and importing using @ prefix
- [ ] **[Mobile Tasks - MANDATORY]** Reference Mobile References table during implementation
- [ ] **[Mobile Tasks - MANDATORY]** Run headless platform builds before marking task complete
- [ ] **[Mobile Tasks - MANDATORY]** Validate permission manifests against task requirements
- [ ] Verify all folders and files are created correctly
