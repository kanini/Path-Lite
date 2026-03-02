# Task - TASK_001

## Requirement Reference
- User Story: US_019
- Story Location: .propel/context/tasks/us_019/us_019.md
- Acceptance Criteria:  
    - AC-1: Given I need AI processing, When I integrate Azure OpenAI SDK, Then the system has azure-openai Python library installed with GPT-5-mini (2024-07-18) model configured and HIPAA BAA verified.
    - AC-5: Given API configuration is needed, When I set up Azure OpenAI, Then the system has endpoint URL, API key stored in environment variables, and connection verified with test request.
- Edge Case:
    - What happens when Azure OpenAI API returns error? (Implement exponential backoff retry; log error details; fallback to manual entry after 3 failed attempts)
    - How does the system handle API rate limiting? (Implement request queue; throttle requests to stay within limits; display "Processing..." message during queue wait)

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
| Frontend | N/A | N/A |
| Backend | FastAPI | 0.110+ |
| Database | N/A | N/A |
| Library | openai (Azure OpenAI SDK) | 1.0+ |
| AI/ML | Azure OpenAI GPT-4o-mini | gpt-4o-mini-2024-07-18 |

**Note**: All code, and libraries, MUST be compatible with versions above.

## AI References (AI Tasks Only)
| Reference Type | Value |
|----------------|-------|
| **AI Impact** | Yes |
| **AIR Requirements** | AIR-001, AIR-002 |
| **AI Pattern** | Structured Outputs |
| **Prompt Template Path** | N/A (SDK configuration task) |
| **Guardrails Config** | N/A (SDK configuration task) |
| **Model Provider** | Azure OpenAI |

## Mobile References (Mobile Tasks Only)
| Reference Type | Value |
|----------------|-------|
| **Mobile Impact** | No |
| **Platform Target** | N/A |
| **Min OS Version** | N/A |
| **Mobile Framework** | N/A |

## Task Overview
Install and configure Azure OpenAI Python SDK with GPT-4o-mini model for conversational data extraction. This task establishes the foundational AI infrastructure by setting up the Azure OpenAI client, configuring environment variables for secure credential management, implementing connection verification, and establishing retry logic with exponential backoff for API resilience. The configuration ensures HIPAA BAA compliance through Azure OpenAI Enterprise Agreement and validates connectivity with a test request.

## Dependent Tasks
- US_002 (FastAPI Backend Setup) - MUST be completed for backend infrastructure
- US_003 (Azure Infrastructure Provisioning) - MUST be completed for Azure OpenAI resource provisioning

## Impacted Components
- **NEW**: `Server/app/services/azure_openai_service.py` - Azure OpenAI client wrapper service
- **NEW**: `Server/app/core/azure_openai_client.py` - Azure OpenAI client singleton initialization
- **MODIFY**: `Server/app/core/config.py` - Add Azure OpenAI configuration settings
- **MODIFY**: `Server/requirements.txt` - Add openai SDK dependency
- **MODIFY**: `Server/.env.example` - Add Azure OpenAI environment variable templates

## Implementation Plan
1. **Update Dependencies**: Add `openai>=1.0` to requirements.txt for Azure OpenAI SDK support
2. **Configure Environment Variables**: Extend Settings class in config.py with Azure OpenAI endpoint, API key, deployment name (gpt-4o-mini-2024-07-18), and API version (2024-02-01)
3. **Create Azure OpenAI Client Singleton**: Implement client initialization in azure_openai_client.py with connection pooling and timeout configuration
4. **Implement Service Layer**: Create AzureOpenAIService in services/ with methods for connection verification, health check, and error handling
5. **Add Retry Logic**: Implement exponential backoff retry decorator using tenacity library for transient failures (rate limiting, network errors)
6. **Connection Verification**: Create test endpoint to validate Azure OpenAI connectivity and model availability
7. **Update Environment Template**: Document required environment variables in .env.example with placeholder values

## Current Project State
```
Server/
├── app/
│   ├── core/
│   │   ├── config.py (existing - needs Azure OpenAI settings)
│   │   ├── middleware.py
│   │   └── __init__.py
│   ├── services/ (needs creation)
│   ├── routers/
│   │   ├── ai_processing.py (existing - placeholder)
│   │   └── __init__.py
│   └── models/
│       └── ai.py (existing - basic models)
├── requirements.txt (needs openai SDK)
├── .env.example (needs Azure OpenAI vars)
└── main.py
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| MODIFY | d:\Path_Lite\Server\requirements.txt | Add openai>=1.0 and tenacity>=8.2.0 for Azure OpenAI SDK and retry logic |
| MODIFY | d:\Path_Lite\Server\app\core\config.py | Add AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_API_KEY, AZURE_OPENAI_DEPLOYMENT, AZURE_OPENAI_API_VERSION settings |
| CREATE | d:\Path_Lite\Server\app\core\azure_openai_client.py | Initialize Azure OpenAI client singleton with connection pooling |
| CREATE | d:\Path_Lite\Server\app\services\__init__.py | Service layer package initialization |
| CREATE | d:\Path_Lite\Server\app\services\azure_openai_service.py | Azure OpenAI service with connection verification and retry logic |
| MODIFY | d:\Path_Lite\Server\.env.example | Add Azure OpenAI environment variable templates with documentation |
| CREATE | d:\Path_Lite\Server\app\routers\health.py | Health check endpoint for Azure OpenAI connectivity verification |

## External References
- [Azure OpenAI Python SDK Documentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/quickstart?tabs=command-line&pivots=programming-language-python)
- [Azure OpenAI Service REST API Reference](https://learn.microsoft.com/en-us/azure/ai-services/openai/reference)
- [OpenAI Python SDK GitHub](https://github.com/openai/openai-python)
- [Tenacity Retry Library Documentation](https://tenacity.readthedocs.io/en/latest/)
- [Azure OpenAI HIPAA Compliance](https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/compliance)

## Build Commands
```bash
# Install dependencies
cd Server
pip install -r requirements.txt

# Run development server
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Test Azure OpenAI connection
curl http://localhost:8000/api/v1/health/azure-openai
```

## Implementation Validation Strategy
- [ ] Unit tests pass
- [ ] Integration tests pass (if applicable)
- [ ] **[AI Tasks]** Prompt templates validated with test inputs (N/A for SDK setup)
- [ ] **[AI Tasks]** Guardrails tested for input sanitization and output validation (N/A for SDK setup)
- [ ] **[AI Tasks]** Fallback logic tested with low-confidence/error scenarios
- [ ] **[AI Tasks]** Token budget enforcement verified (N/A for SDK setup)
- [ ] **[AI Tasks]** Audit logging verified (no PII in logs)
- [ ] Azure OpenAI client initializes successfully with valid credentials
- [ ] Connection verification endpoint returns 200 OK with valid response
- [ ] Retry logic triggers on simulated rate limit errors (429 status)
- [ ] Exponential backoff delays increase correctly (1s, 2s, 4s, 8s)
- [ ] Environment variables load correctly from .env file
- [ ] HIPAA BAA compliance verified through Azure Enterprise Agreement

## Implementation Checklist
- [ ] Add `openai>=1.0` and `tenacity>=8.2.0` to requirements.txt
- [ ] Extend Settings class in config.py with AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_API_KEY, AZURE_OPENAI_DEPLOYMENT (default: "gpt-4o-mini-2024-07-18"), AZURE_OPENAI_API_VERSION (default: "2024-02-01")
- [ ] Create app/services/ directory if not exists
- [ ] Create app/services/__init__.py with service exports
- [ ] Implement AzureOpenAI client initialization in app/core/azure_openai_client.py with singleton pattern
- [ ] Configure client timeout (30 seconds), max retries (3), and connection pooling
- [ ] Create AzureOpenAIService class in app/services/azure_openai_service.py
- [ ] Implement `verify_connection()` method to test Azure OpenAI connectivity with simple completion request
- [ ] Implement `get_health_status()` method to return connection status and model availability
- [ ] Add @retry decorator from tenacity with exponential backoff (wait_exponential: multiplier=1, min=1s, max=10s)
- [ ] Configure retry on specific exceptions: RateLimitError, APIConnectionError, Timeout
- [ ] Implement error logging for all Azure OpenAI API failures with structured logging (timestamp, error type, request ID)
- [ ] Update .env.example with Azure OpenAI environment variable templates and usage documentation
- [ ] Create health check router in app/routers/health.py with /api/v1/health/azure-openai endpoint
- [ ] Write unit tests for AzureOpenAIService.verify_connection() with mocked API responses
- [ ] Write integration test for retry logic with simulated 429 rate limit errors
- [ ] Verify AZURE_OPENAI_DEPLOYMENT uses "gpt-4o-mini-2024-07-18" model identifier
- [ ] Document Azure OpenAI BAA compliance verification steps in README
- [ ] **[AI Tasks - MANDATORY]** Verify AIR-001 requirements are met (Azure OpenAI GPT-4o-mini integration)
- [ ] **[AI Tasks - MANDATORY]** Verify AIR-002 requirements are met (structured output schema foundation established)
