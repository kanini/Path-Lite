# Task - TASK_002

## Requirement Reference
- User Story: US_004
- Story Location: `.propel/context/tasks/us_004/us_004.md`
- Acceptance Criteria:  
    - **AC2**: Given environment variables are needed, When I configure the development environment, Then the system has .env.example file with all required variables documented: AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_KEY, JWT_SECRET, and API_BASE_URL.
- Edge Case:
    - N/A (Covered by validation in dependent tasks)

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
| Library | python-dotenv | 1.0+ |
| AI/ML | Azure OpenAI | gpt-4 |
| Vector Store | N/A | N/A |
| AI Gateway | N/A | N/A |
| Mobile | React Native | 0.73.0 |

**Note**: All code, and libraries, MUST be compatible with versions above.

## AI References (AI Tasks Only)
| Reference Type | Value |
|----------------|-------|
| **AI Impact** | Yes |
| **AIR Requirements** | N/A (Configuration only) |
| **AI Pattern** | N/A |
| **Prompt Template Path** | N/A |
| **Guardrails Config** | N/A |
| **Model Provider** | Azure OpenAI |

## Mobile References (Mobile Tasks Only)
| Reference Type | Value |
|----------------|-------|
| **Mobile Impact** | Yes |
| **Platform Target** | Both |
| **Min OS Version** | iOS 13.4 / Android API 26 (8.0) |
| **Mobile Framework** | React Native |

## Task Overview
Create and update .env.example files for both React Native frontend and FastAPI backend with comprehensive documentation for all required environment variables including AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_KEY, JWT_SECRET, and API_BASE_URL. Ensure proper security guidance and validation for sensitive credentials.

## Dependent Tasks
- US_001 (React Native Project Scaffolding) - COMPLETED
- US_002 (FastAPI Backend Setup) - COMPLETED

## Impacted Components
- **MODIFY**: `/Server/.env.example` - Backend environment template
- **CREATE**: `/.env.example` - Frontend environment template
- **MODIFY**: `/README.md` - Add environment setup section
- **CREATE**: `/docs/ENVIRONMENT_VARIABLES.md` - Detailed environment variable documentation

## Implementation Plan
1. **Audit Existing Variables**: Review current .env.example files in Server and root
2. **Define Required Variables**: List all required variables for frontend and backend
3. **Update Backend .env.example**: Add missing variables with descriptions
4. **Create Frontend .env.example**: Define React Native environment variables
5. **Document Security Best Practices**: Add guidance for sensitive credentials
6. **Create Variable Documentation**: Detailed explanation of each variable
7. **Add Validation Examples**: Show how to validate environment configuration
8. **Update README**: Reference environment setup in main documentation

## Current Project State
```
Path-Lite/
├── .env (contains CONTEXT7_API_KEY only)
├── Server/
│   ├── .env.example (contains Azure OpenAI config)
│   └── .env (actual values)
├── package.json
└── README.md
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| MODIFY | `/Server/.env.example` | Add JWT_SECRET, enhance Azure OpenAI documentation, add validation notes |
| CREATE | `/.env.example` | Create frontend environment template with API_BASE_URL, AZURE_OPENAI_ENDPOINT (for mobile AI features) |
| CREATE | `/docs/ENVIRONMENT_VARIABLES.md` | Comprehensive documentation for all environment variables with examples |
| MODIFY | `/README.md` | Add "Environment Configuration" section with setup instructions |
| CREATE | `/scripts/validate-env.js` | Script to validate required environment variables are set |

## External References
- [React Native Environment Variables](https://reactnative.dev/docs/environment-variables)
- [FastAPI Settings Management](https://fastapi.tiangolo.com/advanced/settings/)
- [python-dotenv Documentation](https://github.com/theskumar/python-dotenv)
- [Azure OpenAI Service](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [OWASP Secrets Management](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)

## Build Commands
N/A - Configuration task

## Implementation Validation Strategy
- [x] All required variables documented in .env.example files (Server only)
- [x] Backend .env.example includes AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_KEY, JWT_SECRET
- [ ] Frontend .env.example includes API_BASE_URL
- [x] Each variable has clear description and example value (Server)
- [x] Security warnings added for sensitive credentials (Server)
- [ ] Validation script checks for required variables
- [ ] Documentation explains how to obtain API keys
- [x] .gitignore properly excludes .env files
- [x] **[AI Tasks]** Azure OpenAI configuration variables are complete
- [ ] **[Mobile Tasks]** Mobile-specific environment variables are documented

## Implementation Checklist
- [x] Review existing `/Server/.env.example` file
- [x] Add JWT_SECRET to backend .env.example with generation instructions
- [x] Enhance AZURE_OPENAI_ENDPOINT documentation with example format
- [x] Enhance AZURE_OPENAI_KEY documentation with security warning
- [x] Add AZURE_OPENAI_DEPLOYMENT variable with model name
- [x] Add AZURE_OPENAI_API_VERSION variable
- [ ] Create `/.env.example` for React Native frontend
- [ ] Add API_BASE_URL to frontend .env.example (http://localhost:8000)
- [ ] Add AZURE_OPENAI_ENDPOINT to frontend (for mobile AI features)
- [ ] Document environment variable naming conventions
- [ ] Create `/docs/ENVIRONMENT_VARIABLES.md` with detailed explanations
- [ ] Document how to generate JWT_SECRET securely
- [ ] Document how to obtain Azure OpenAI credentials
- [ ] Add examples of valid variable values
- [ ] Add security best practices section
- [ ] Create environment validation script (`/scripts/validate-env.js`)
- [ ] Add validation for required backend variables
- [ ] Add validation for required frontend variables
- [x] Update README.md with environment setup section (Server README)
- [x] Add instructions to copy .env.example to .env (Server README)
- [x] Verify .gitignore excludes .env files (both root and Server)
- [ ] Test validation script with missing variables
- [ ] Test validation script with all variables present
