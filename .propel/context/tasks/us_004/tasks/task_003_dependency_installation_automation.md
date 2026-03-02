# Task - TASK_003

## Requirement Reference
- User Story: US_004
- Story Location: `.propel/context/tasks/us_004/us_004.md`
- Acceptance Criteria:  
    - **AC3**: Given dependencies need installation, When I run the setup script, Then the system executes npm install for React Native dependencies and poetry install for FastAPI dependencies with success confirmation.
- Edge Case:
    - N/A (Covered by validation in setup scripts)

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
| Backend | FastAPI | 0.110.0 |
| Database | N/A | N/A |
| Library | Poetry | 1.7+ |
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
Create automated setup scripts that install all project dependencies for both React Native frontend (npm install) and FastAPI backend (poetry install) with clear success/failure feedback, error handling, and platform-specific instructions for iOS pod installation.

## Dependent Tasks
- TASK_001 (Comprehensive README Documentation) - IN PROGRESS
- TASK_002 (Environment Variables Configuration) - IN PROGRESS

## Impacted Components
- **CREATE**: `/scripts/setup.js` - Main setup orchestration script
- **CREATE**: `/scripts/setup.bat` - Windows setup wrapper
- **CREATE**: `/scripts/setup.sh` - Unix/macOS setup wrapper
- **CREATE**: `/scripts/install-frontend.js` - Frontend dependency installer
- **CREATE**: `/scripts/install-backend.js` - Backend dependency installer
- **MODIFY**: `/package.json` - Add setup script command

## Implementation Plan
1. **Design Setup Script Architecture**: Plan orchestration flow for frontend and backend
2. **Create Frontend Installer**: Script to run npm install with validation
3. **Create Backend Installer**: Script to run poetry install with validation
4. **Add iOS Pod Installation**: Include pod install for iOS dependencies
5. **Create Main Setup Script**: Orchestrate all installation steps
6. **Add Success/Failure Feedback**: Clear console output with status messages
7. **Create Platform Wrappers**: Shell scripts for different operating systems
8. **Add to package.json**: Register setup command for easy access
9. **Test Installation Flow**: Validate on clean environment

## Current Project State
```
Path-Lite/
├── package.json (React Native dependencies)
├── Server/
│   └── pyproject.toml (FastAPI dependencies with Poetry)
├── ios/
│   └── Podfile (iOS native dependencies)
└── android/ (Gradle manages dependencies)
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | `/scripts/setup.js` | Main setup script that orchestrates frontend and backend installation |
| CREATE | `/scripts/setup.bat` | Windows batch wrapper for setup script |
| CREATE | `/scripts/setup.sh` | Unix/macOS shell wrapper for setup script |
| CREATE | `/scripts/install-frontend.js` | Install React Native dependencies via npm and iOS pods |
| CREATE | `/scripts/install-backend.js` | Install FastAPI dependencies via Poetry |
| MODIFY | `/package.json` | Add "setup" script command pointing to scripts/setup.js |
| CREATE | `/scripts/utils/logger.js` | Utility for consistent console logging with colors |
| CREATE | `/scripts/utils/command-runner.js` | Utility to execute shell commands with error handling |

## External References
- [npm CLI Documentation](https://docs.npmjs.com/cli/v10/commands/npm-install)
- [Poetry Installation Guide](https://python-poetry.org/docs/#installation)
- [Poetry Commands](https://python-poetry.org/docs/cli/)
- [CocoaPods Installation](https://guides.cocoapods.org/using/getting-started.html)
- [Node.js Child Process](https://nodejs.org/api/child_process.html)
- [Cross-platform Shell Scripts](https://nodejs.org/api/process.html#process_process_platform)

## Build Commands
```bash
# After implementation
npm run setup
# or
node scripts/setup.js
```

## Implementation Validation Strategy
- [ ] Setup script successfully installs frontend dependencies
- [ ] Setup script successfully installs backend dependencies
- [ ] iOS pod installation runs on macOS only
- [ ] Success messages display after each installation step
- [ ] Error messages display with helpful guidance on failure
- [ ] Script exits with appropriate exit codes (0 = success, 1 = failure)
- [ ] Platform-specific wrappers work on Windows, macOS, Linux
- [ ] package.json setup command executes correctly
- [ ] **[Mobile Tasks]** Pod install executes successfully on macOS
- [x] **[Mobile Tasks]** Android Gradle sync is documented (Server README)

## Implementation Checklist
- [ ] Create `/scripts/utils/logger.js` with colored console output
- [ ] Create `/scripts/utils/command-runner.js` for executing shell commands
- [ ] Implement error handling in command-runner with exit code capture
- [ ] Create `/scripts/install-frontend.js` script
- [ ] Add npm install execution with progress output
- [ ] Add platform detection (macOS vs others)
- [ ] Add pod install execution for macOS (cd ios && pod install)
- [ ] Add success confirmation for frontend installation
- [ ] Create `/scripts/install-backend.js` script
- [ ] Add Poetry availability check
- [ ] Add poetry install execution (cd Server && poetry install)
- [ ] Add success confirmation for backend installation
- [ ] Create `/scripts/setup.js` main orchestration script
- [ ] Add environment check (Node.js, Python, Poetry)
- [ ] Call install-frontend.js with error handling
- [ ] Call install-backend.js with error handling
- [ ] Display final success summary with next steps
- [ ] Handle partial failures gracefully
- [ ] Create `/scripts/setup.sh` for Unix/macOS
- [ ] Make setup.sh executable (chmod +x)
- [ ] Create `/scripts/setup.bat` for Windows
- [ ] Update `/package.json` with "setup" script
- [ ] Test setup script on clean environment (if possible)
- [ ] Test error handling with missing Poetry
- [ ] Test error handling with network failures
- [ ] Verify success messages are clear and actionable
- [ ] **[Mobile Tasks - MANDATORY]** Verify pod install works on macOS
- [ ] **[Mobile Tasks - MANDATORY]** Document Android Studio Gradle sync requirement
