# Task - TASK_004

## Requirement Reference
- User Story: us_019
- Story Location: .propel/context/tasks/us_019/us_019.md
- Acceptance Criteria:
    - AC-3: Given STT output is received, When I send text to Azure OpenAI, Then the system calls the API with structured output schema, receives validated response in under 1 second, and extracts clean field value.
    - AC-4: Given API call succeeds, When I receive the response, Then the system validates the structured output against Pydantic schema, ensures type safety, and returns extracted value with confidence score.
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
| Backend | Python/FastAPI | 3.11+ / 0.110.0+ |
| Library | openai | >=1.0 |
| Library | pydantic | >=2.8 |
| Library | tenacity | >=8.0 |
| AI/ML | Azure OpenAI GPT-5-mini | 2024-07-18 |

**Note**: All code, and libraries, MUST be compatible with versions above.

## AI References (AI Tasks Only)
| Reference Type | Value |
|----------------|-------|
| **AI Impact** | Yes |
| **AIR Requirements** | AIR-001, AIR-002 |
| **AI Pattern** | Structured Output Extraction |
| **Prompt Template Path** | Server/app/prompts/extraction/ |
| **Guardrails Config** | Server/app/core/guardrails.py |
| **Model Provider** | Azure OpenAI |

## Mobile References (Mobile Tasks Only)
| Reference Type | Value |
|----------------|-------|
| **Mobile Impact** | No |
| **Platform Target** | N/A |
| **Min OS Version** | N/A |
| **Mobile Framework** | N/A |

## Task Overview
Integrate the Azure OpenAI extraction service with FastAPI endpoints. Create REST API endpoints for field extraction, add health check endpoint for Azure OpenAI connectivity verification, implement proper error handling with appropriate HTTP status codes, and add comprehensive integration tests to verify <1 second processing latency and 95% accuracy requirements.

## Dependent Tasks
- task_001_azure_openai_sdk_setup.md - Must be completed
- task_002_pydantic_structured_output_models.md - Must be completed
- task_003_azure_openai_service.md - Must be completed

## Impacted Components
| Action | Component | Project |
|--------|-----------|---------|
| MODIFY | AI processing router | Server/app/routers/ai_processing.py |
| CREATE | Extraction request/response models | Server/app/models/extraction_api.py |
| MODIFY | Dependencies | Server/app/dependencies.py |
| CREATE | Integration tests | Server/tests/test_extraction_api.py |

## Implementation Plan
1. **Create extraction API models** - Request/response Pydantic models for API endpoints
2. **Add extraction service dependency** - Create FastAPI dependency for ExtractionService injection
3. **Implement extraction endpoint** - POST /ai/extract endpoint for field extraction
4. **Implement batch extraction endpoint** - POST /ai/extract/batch for multiple fields
5. **Add health check endpoint** - GET /ai/health for Azure OpenAI connectivity verification
6. **Implement error handling** - Custom exception handlers for API errors
7. **Add latency tracking** - Middleware/decorator for response time measurement
8. **Create integration tests** - Test latency (<1s) and accuracy (95%) requirements

**Focus on how to implement**

## Current Project State
```
Server/
├── app/
│   ├── core/
│   │   ├── config.py
│   │   ├── azure_openai.py    # From task_001
│   │   ├── guardrails.py      # From task_003
│   │   └── middleware.py
│   ├── models/
│   │   ├── structured_outputs.py  # From task_002
│   │   ├── ai.py
│   │   └── ...
│   ├── routers/
│   │   └── ai_processing.py   # (MODIFY)
│   ├── services/
│   │   ├── extraction_service.py  # From task_003
│   │   └── __init__.py
│   └── dependencies.py        # (MODIFY)
├── tests/                     # (CREATE if not exists)
└── main.py
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | Server/app/models/extraction_api.py | ExtractionRequest, ExtractionResponse, BatchExtractionRequest models |
| MODIFY | Server/app/dependencies.py | Add get_extraction_service() dependency |
| MODIFY | Server/app/routers/ai_processing.py | Add POST /ai/extract, POST /ai/extract/batch, GET /ai/health endpoints |
| CREATE | Server/tests/test_extraction_api.py | Integration tests for extraction endpoints with latency/accuracy validation |

## External References
- [FastAPI Dependency Injection](https://fastapi.tiangolo.com/tutorial/dependencies/)
- [FastAPI Error Handling](https://fastapi.tiangolo.com/tutorial/handling-errors/)
- [pytest-asyncio](https://pytest-asyncio.readthedocs.io/en/latest/)

## Build Commands
```bash
cd Server
pytest tests/test_extraction_api.py -v
uvicorn main:app --reload
# Test endpoint: curl -X POST http://localhost:8000/ai/extract -H "Content-Type: application/json" -d '{"text": "Patient MRN is 12345", "field_type": "mrn"}'
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
- [ ] Create extraction_api.py with ExtractionRequest(text: str, field_type: FieldType) model
- [ ] Create ExtractionResponse(value: Any, confidence_score: float, field_type: str, processing_time_ms: int, fallback_to_manual: bool) model
- [ ] Create BatchExtractionRequest(text: str, field_types: List[FieldType]) model
- [ ] Add get_extraction_service() dependency in dependencies.py
- [ ] Implement POST /ai/extract endpoint returning ExtractionResponse
- [ ] Implement POST /ai/extract/batch endpoint for multiple field extraction
- [ ] Implement GET /ai/health endpoint verifying Azure OpenAI connectivity
- [ ] Add latency tracking using time.perf_counter() in endpoint handlers
- [ ] Create integration tests validating <1000ms response time
- [ ] Create accuracy tests with sample STT outputs (target 95%)
