# Task - TASK_001

## Requirement Reference
- User Story: us_019
- Story Location: .propel/context/tasks/us_019/us_019.md
- Acceptance Criteria:
    - AC-1: Given I need AI processing, When I integrate Azure OpenAI SDK, Then the system has azure-openai Python library installed with GPT-5-mini (2024-07-18) model configured and HIPAA BAA verified.
    - AC-5: Given API configuration is needed, When I set up Azure OpenAI, Then the system has endpoint URL, API key stored in environment variables, and connection verified with test request.
- Edge Case:
    - What happens when Azure OpenAI API returns error? (Implement exponential backoff retry; log error details; fallback to manual entry after 3 failed attempts)

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
| Backend | Python/FastAPI | 3.11+ / 0.110.0+ |
| Library | openai | >=1.0 |
| Library | pydantic | >=2.0 |
| Library | pydantic-settings | >=2.0 |
| Library | tenacity | >=8.0 |
| AI/ML | Azure OpenAI GPT-5-mini | 2024-07-18 |

**Note**: All code, and libraries, MUST be compatible with versions above.

## AI References (AI Tasks Only)
| Reference Type | Value |
|----------------|-------|
| **AI Impact** | Yes |
| **AIR Requirements** | AIR-001, AIR-002 |
| **AI Pattern** | Structured Output Extraction |
| **Prompt Template Path** | N/A (SDK setup only) |
| **Guardrails Config** | N/A (SDK setup only) |
| **Model Provider** | Azure OpenAI |

## Mobile References (Mobile Tasks Only)
| Reference Type | Value |
|----------------|-------|
| **Mobile Impact** | No |
| **Platform Target** | N/A |
| **Min OS Version** | N/A |
| **Mobile Framework** | N/A |

## Task Overview
Set up Azure OpenAI SDK integration with proper configuration management, environment variable handling, and connection verification. This task establishes the foundational infrastructure for Azure OpenAI API communication including retry logic with exponential backoff.

## Dependent Tasks
- US_002 (FastAPI Backend Setup) - Must be completed
- US_003 (Azure Infrastructure Provisioning) - Must be completed

## Impacted Components
| Action | Component | Project |
|--------|-----------|---------|
| MODIFY | Settings class | Server/app/core/config.py |
| CREATE | Azure OpenAI client factory | Server/app/core/azure_openai.py |
| MODIFY | requirements.txt | Server/requirements.txt |
| CREATE | .env.example | Server/.env.example |

## Implementation Plan
1. **Update requirements.txt** - Add tenacity for retry logic (openai already present)
2. **Extend Settings class** - Add Azure OpenAI configuration fields with validation
3. **Create Azure OpenAI client factory** - Implement singleton client with connection pooling
4. **Implement retry logic** - Add exponential backoff with tenacity decorator
5. **Create connection verification** - Add health check endpoint for Azure OpenAI connectivity
6. **Update .env.example** - Document required environment variables

**Focus on how to implement**

## Current Project State
```
Server/
├── app/
│   ├── core/
│   │   ├── config.py          # Settings class (MODIFY)
│   │   └── middleware.py
│   ├── models/
│   │   └── ai.py
│   ├── routers/
│   │   └── ai_processing.py
│   ├── services/
│   │   └── __init__.py
│   └── dependencies.py
├── requirements.txt           # (MODIFY)
└── main.py
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| MODIFY | Server/requirements.txt | Add tenacity>=8.0 for retry logic |
| MODIFY | Server/app/core/config.py | Add AZURE_OPENAI_MODEL, AZURE_OPENAI_MAX_RETRIES, AZURE_OPENAI_TIMEOUT settings |
| CREATE | Server/app/core/azure_openai.py | Azure OpenAI client factory with retry logic and connection verification |
| CREATE | Server/.env.example | Document all required Azure OpenAI environment variables |

## External References
- [Azure OpenAI Python SDK](https://learn.microsoft.com/en-us/azure/ai-services/openai/quickstart?tabs=command-line%2Cjavascript-keyless%2Ctypescript-keyless%2Cpython-new&pivots=programming-language-python)
- [Tenacity Retry Library](https://tenacity.readthedocs.io/en/latest/)
- [Azure OpenAI HIPAA Compliance](https://learn.microsoft.com/en-us/azure/compliance/offerings/offering-hipaa-us)

## Build Commands
```bash
cd Server
pip install -r requirements.txt
python -c "from app.core.azure_openai import get_azure_openai_client; print('SDK setup verified')"
```

## Implementation Validation Strategy
- [ ] Unit tests pass
- [ ] Integration tests pass (if applicable)
- [ ] **[AI Tasks]** Prompt templates validated with test inputs
- [ ] **[AI Tasks]** Guardrails tested for input sanitization and output validation
- [ ] **[AI Tasks]** Fallback logic tested with low-confidence/error scenarios
- [ ] **[AI Tasks]** Token budget enforcement verified
- [ ] **[AI Tasks]** Audit logging verified (no PII in logs)

## Implementation Checklist
- [ ] Add tenacity>=8.0 to requirements.txt
- [ ] Extend Settings class with AZURE_OPENAI_MODEL (default: gpt-5-mini), AZURE_OPENAI_MAX_RETRIES (default: 3), AZURE_OPENAI_TIMEOUT (default: 30)
- [ ] Create azure_openai.py with AzureOpenAIClient class using singleton pattern
- [ ] Implement get_azure_openai_client() factory function with lazy initialization
- [ ] Add @retry decorator with exponential backoff (wait_exponential, stop_after_attempt=3)
- [ ] Create verify_connection() method that makes test API call
- [ ] Create .env.example with documented Azure OpenAI variables
- [ ] Write unit tests for client initialization and retry logic
