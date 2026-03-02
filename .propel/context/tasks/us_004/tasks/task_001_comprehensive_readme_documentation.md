# Task - TASK_001

## Requirement Reference
- User Story: US_004
- Story Location: `.propel/context/tasks/us_004/us_004.md`
- Acceptance Criteria:  
    - **AC1**: Given a new developer joins the team, When they follow the README setup guide, Then the system has step-by-step instructions for installing Node.js 18+, Python 3.11+, Xcode (macOS), Android Studio, and required SDKs.
- Edge Case:
    - What happens when Node.js version is incompatible? (Add version check script; display error with required version and upgrade link)
    - How does the system handle missing iOS/Android SDKs? (Provide platform-specific setup guides; include troubleshooting section for common SDK issues)

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
| Library | React Navigation | 6.1.18 |
| AI/ML | Azure OpenAI | gpt-4 |
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
Create comprehensive README.md documentation that provides step-by-step setup instructions for all development environment prerequisites including Node.js 18+, Python 3.11+, platform-specific tools (Xcode for macOS, Android Studio), and required SDKs. The documentation must enable new developers to set up their environment independently with clear troubleshooting guidance.

## Dependent Tasks
- US_001 (React Native Project Scaffolding) - COMPLETED
- US_002 (FastAPI Backend Setup) - COMPLETED

## Impacted Components
- **MODIFY**: `/README.md` - Root project documentation
- **CREATE**: `/docs/SETUP_GUIDE.md` - Detailed setup guide
- **CREATE**: `/docs/TROUBLESHOOTING.md` - Common issues and solutions
- **CREATE**: `/scripts/check-environment.js` - Environment validation script

## Implementation Plan
1. **Analyze Current README**: Review existing README.md structure and identify gaps
2. **Research Platform Requirements**: Document minimum versions for Node.js, Python, Xcode, Android Studio
3. **Create Setup Guide Structure**: Organize by platform (macOS, Windows, Linux)
4. **Document Prerequisites**: List all required tools with download links
5. **Write Installation Steps**: Provide step-by-step instructions for each tool
6. **Add Version Check Script**: Create automated environment validation
7. **Document Troubleshooting**: Add common issues and solutions
8. **Add Quick Start Section**: Provide fast-track setup for experienced developers

## Current Project State
```
Path-Lite/
├── README.md (basic React Native template)
├── package.json (React Native 0.73.0, Node >=18)
├── Server/
│   ├── pyproject.toml (Python ^3.11, FastAPI ^0.110.0)
│   └── .env.example
├── android/ (Android configuration)
├── ios/ (iOS configuration)
└── src/ (React Native source)
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| MODIFY | `/README.md` | Replace template content with comprehensive setup guide including prerequisites, installation steps, and quick start |
| CREATE | `/docs/SETUP_GUIDE.md` | Detailed platform-specific setup instructions for macOS, Windows, and Linux |
| CREATE | `/docs/TROUBLESHOOTING.md` | Common environment setup issues and solutions with SDK troubleshooting |
| CREATE | `/scripts/check-environment.js` | Node.js script to validate environment versions (Node, Python, SDKs) |
| CREATE | `/scripts/check-environment.bat` | Windows batch wrapper for environment check |
| CREATE | `/scripts/check-environment.sh` | Unix shell wrapper for environment check |

## External References
- [React Native Environment Setup](https://reactnative.dev/docs/environment-setup)
- [Node.js Installation Guide](https://nodejs.org/en/download/)
- [Python Installation Guide](https://www.python.org/downloads/)
- [Android Studio Setup](https://developer.android.com/studio/install)
- [Xcode Installation](https://developer.apple.com/xcode/)
- [Poetry Installation](https://python-poetry.org/docs/#installation)
- [React Native CLI Documentation](https://github.com/react-native-community/cli)

## Build Commands
N/A - Documentation task

## Implementation Validation Strategy
- [ ] README.md includes all required prerequisites with versions
- [ ] Platform-specific setup guides cover macOS, Windows, and Linux
- [ ] Version check script validates Node.js >=18 and Python >=3.11
- [ ] Troubleshooting guide addresses SDK installation issues
- [ ] All external links are valid and accessible
- [x] Documentation follows consistent formatting and structure (Server README)
- [ ] **[Mobile Tasks]** Platform-specific SDK setup instructions are complete
- [ ] **[Mobile Tasks]** Xcode and Android Studio installation steps are verified

## Implementation Checklist
- [x] Review current README.md and identify missing sections
- [ ] Document Node.js 18+ installation for macOS, Windows, Linux
- [x] Document Python 3.11+ installation with Poetry setup (Server README)
- [ ] Document Xcode installation and command-line tools (macOS only)
- [ ] Document Android Studio installation and SDK setup (all platforms)
- [ ] Document React Native CLI installation
- [ ] Create environment validation script (check-environment.js)
- [ ] Add version check for Node.js with error message and upgrade link
- [ ] Add version check for Python with error message and upgrade link
- [ ] Add SDK detection for iOS (Xcode) and Android (Android Studio)
- [ ] Create platform-specific shell wrappers for environment check
- [ ] Write troubleshooting section for Node.js version conflicts
- [ ] Write troubleshooting section for missing iOS/Android SDKs
- [ ] Write troubleshooting section for Metro bundler issues
- [ ] Write troubleshooting section for pod install failures (iOS)
- [ ] Write troubleshooting section for Gradle build failures (Android)
- [ ] Add quick start section for experienced developers
- [ ] Add architecture overview diagram or description
- [ ] Add links to official documentation for all tools
- [ ] Test all installation steps on clean environment (if possible)
- [ ] Validate all external links are accessible
- [ ] **[Mobile Tasks - MANDATORY]** Reference Mobile References table during implementation
- [ ] **[Mobile Tasks - MANDATORY]** Validate permission manifests against task requirements
