# Task - TASK_003

## Requirement Reference
- User Story: US_019
- Story Location: .propel/context/tasks/us_019/us_019.md
- Acceptance Criteria:  
    - AC-3: Given STT output is received, When I send text to Azure OpenAI, Then the system calls the API with structured output schema, receives validated response in under 1 second, and extracts clean field value.
    - AC-4: Given API call succeeds, When I receive the response, Then the system validates the structured output against Pydantic schema, ensures type safety, and returns extracted value with confidence score.
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
| Library | openai, Pydantic | 1.0+, 2.8+ |
| AI/ML | Azure OpenAI GPT-4o-mini | gpt-4o-mini-2024-07-18 |

**Note**: All code, and libraries, MUST be compatible with versions above.

## AI References (AI Tasks Only)
| Reference Type | Value |
|----------------|-------|
| **AI Impact** | Yes |
| **AIR Requirements** | AIR-001, AIR-002, AIR-005, AIR-009, AIR-012, AIR-013 |
| **AI Pattern** | Structured Outputs |
| **Prompt Template Path** | Server/app/prompts/field_extraction_prompts.py |
| **Guardrails Config** | Server/app/models/schemas/field_schemas.py |
| **Model Provider** | Azure OpenAI |

## Mobile References (Mobile Tasks Only)
| Reference Type | Value |
|----------------|-------|
| **Mobile Impact** | No |
| **Platform Target** | N/A |
| **Min OS Version** | N/A |
| **Mobile Framework** | N/A |

## Task Overview
Implement Azure OpenAI structured output integration for conversational data extraction with Pydantic schema enforcement. This task creates the core LLM processing service that accepts STT transcription text, sends it to Azure OpenAI with structured output schema, validates the response against Pydantic models, and returns extracted field values with confidence scores. The implementation includes prompt engineering for medical terminology, input sanitization for prompt injection prevention, rate limiting with request queuing, and comprehensive error handling with fallback mechanisms.

## Dependent Tasks
- TASK_001 (Azure OpenAI SDK Setup) - MUST be completed for Azure OpenAI client
- TASK_002 (Pydantic Schema Models) - MUST be completed for structured output schemas

## Impacted Components
- **NEW**: `Server/app/services/field_extraction_service.py` - Field extraction service with structured outputs
- **NEW**: `Server/app/prompts/__init__.py` - Prompt template package
- **NEW**: `Server/app/prompts/field_extraction_prompts.py` - Field extraction prompt templates
- **NEW**: `Server/app/utils/input_sanitizer.py` - Input sanitization for prompt injection prevention
- **NEW**: `Server/app/utils/rate_limiter.py` - Rate limiting and request queue management
- **MODIFY**: `Server/app/services/azure_openai_service.py` - Add structured output method
- **MODIFY**: `Server/app/routers/ai_processing.py` - Integrate field extraction service

## Implementation Plan
1. **Create Prompt Templates**: Define system prompts and few-shot examples for field extraction with medical terminology context
2. **Implement Input Sanitization**: Create sanitizer utility to remove/escape special characters and prevent prompt injection attacks
3. **Extend Azure OpenAI Service**: Add `extract_field_with_schema()` method that accepts Pydantic schema and returns validated structured output
4. **Implement Field Extraction Service**: Create service layer orchestrating prompt construction, API calls, and response validation
5. **Add Rate Limiting**: Implement token bucket rate limiter with request queue to handle Azure OpenAI throttling (60 RPM limit)
6. **Implement Retry Logic**: Add exponential backoff retry for transient failures with max 3 attempts
7. **Add Confidence Scoring**: Extract confidence scores from LLM responses and validate against 0.85 threshold (AIR-014)
8. **Create API Endpoint**: Add POST /api/v1/ai/extract-field endpoint accepting field_type and transcription_text
9. **Implement Fallback Mechanism**: Return low-confidence flag when confidence < 0.85 or after 3 failed retries

## Current Project State
```
Server/
├── app/
│   ├── services/
│   │   └── azure_openai_service.py (from TASK_001)
│   ├── models/
│   │   ├── schemas/ (from TASK_002)
│   │   └── ai.py
│   ├── routers/
│   │   └── ai_processing.py (placeholder)
│   └── core/
│       └── azure_openai_client.py
└── requirements.txt
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | d:\Path_Lite\Server\app\prompts\__init__.py | Prompt template package initialization |
| CREATE | d:\Path_Lite\Server\app\prompts\field_extraction_prompts.py | System prompts and few-shot examples for field extraction |
| CREATE | d:\Path_Lite\Server\app\utils\__init__.py | Utilities package initialization |
| CREATE | d:\Path_Lite\Server\app\utils\input_sanitizer.py | Input sanitization utility for prompt injection prevention |
| CREATE | d:\Path_Lite\Server\app\utils\rate_limiter.py | Token bucket rate limiter with request queue |
| CREATE | d:\Path_Lite\Server\app\services\field_extraction_service.py | Field extraction orchestration service |
| MODIFY | d:\Path_Lite\Server\app\services\azure_openai_service.py | Add extract_field_with_schema() method for structured outputs |
| MODIFY | d:\Path_Lite\Server\app\routers\ai_processing.py | Add POST /api/v1/ai/extract-field endpoint |
| CREATE | d:\Path_Lite\Server\tests\test_field_extraction.py | Unit tests for field extraction service |

## External References
- [Azure OpenAI Structured Outputs Guide](https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/structured-outputs)
- [Prompt Engineering Best Practices](https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/prompt-engineering)
- [Pydantic JSON Schema](https://docs.pydantic.dev/latest/concepts/json_schema/)
- [OWASP Prompt Injection Prevention](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
- [Token Bucket Rate Limiting Algorithm](https://en.wikipedia.org/wiki/Token_bucket)

## Build Commands
```bash
# Install dependencies
cd Server
pip install -r requirements.txt

# Run development server
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Test field extraction endpoint
curl -X POST http://localhost:8000/api/v1/ai/extract-field \
  -H "Content-Type: application/json" \
  -d '{"field_type": "mrn", "transcription_text": "My medical record number is 123456"}'

# Run unit tests
pytest tests/test_field_extraction.py -v
```

## Implementation Validation Strategy
- [ ] Unit tests pass
- [ ] Integration tests pass (if applicable)
- [ ] **[AI Tasks]** Prompt templates validated with test inputs
- [ ] **[AI Tasks]** Guardrails tested for input sanitization and output validation
- [ ] **[AI Tasks]** Fallback logic tested with low-confidence/error scenarios
- [ ] **[AI Tasks]** Token budget enforcement verified
- [ ] **[AI Tasks]** Audit logging verified (no PII in logs)
- [ ] Structured output API call completes in <1 second (NFR-003)
- [ ] Pydantic schema validation succeeds for valid LLM responses
- [ ] Confidence score extraction works correctly (0.0-1.0 range)
- [ ] Input sanitization blocks prompt injection attempts (test with special characters)
- [ ] Rate limiter queues requests when limit exceeded (60 RPM)
- [ ] Retry logic triggers on 429 rate limit errors with exponential backoff
- [ ] Low-confidence flag returns when confidence < 0.85
- [ ] Fallback mechanism activates after 3 failed retry attempts
- [ ] API endpoint returns 200 OK with extracted field value and confidence score

## Implementation Checklist
- [ ] Create app/prompts/ directory structure
- [ ] Create field_extraction_prompts.py with SYSTEM_PROMPT constant for field extraction context
- [ ] Add few-shot examples for MRN extraction: "User: My MRN is 123456 -> {mrn: '123456', confidence: 0.95}"
- [ ] Add few-shot examples for name extraction: "User: My name is John Smith -> {first_name: 'John', last_name: 'Smith', confidence: 0.98}"
- [ ] Add few-shot examples for DOB extraction: "User: I was born on January 15, 1980 -> {dob: '1980-01-15', confidence: 0.92}"
- [ ] Create input_sanitizer.py with sanitize_input() function removing/escaping special characters
- [ ] Implement prompt injection detection for patterns like "Ignore previous instructions"
- [ ] Create rate_limiter.py with TokenBucketRateLimiter class (capacity: 60, refill_rate: 1 per second)
- [ ] Implement request queue with asyncio.Queue for rate limit overflow
- [ ] Add extract_field_with_schema() method to AzureOpenAIService accepting schema_class: Type[BaseModel]
- [ ] Configure Azure OpenAI API call with response_format={"type": "json_schema", "json_schema": schema}
- [ ] Parse LLM response and validate against Pydantic schema using schema_class.model_validate()
- [ ] Create FieldExtractionService class in field_extraction_service.py
- [ ] Implement extract_field() method accepting field_type: str and transcription_text: str
- [ ] Map field_type to appropriate Pydantic schema (mrn -> MRNField, first_name -> FirstNameField, etc.)
- [ ] Construct prompt using SYSTEM_PROMPT + few-shot examples + user transcription
- [ ] Call AzureOpenAIService.extract_field_with_schema() with sanitized input
- [ ] Extract confidence score from LLM response and validate >= 0.85 threshold
- [ ] Implement @retry decorator with exponential backoff (max_attempts=3, wait_exponential: multiplier=1, min=1s, max=10s)
- [ ] Add error handling for ValidationError, RateLimitError, APIConnectionError, Timeout
- [ ] Log all extraction attempts with timestamp, field_type, confidence, success/failure (no PII)
- [ ] Update ai_processing.py router with POST /api/v1/ai/extract-field endpoint
- [ ] Define FieldExtractionRequest model: field_type: str, transcription_text: str
- [ ] Define FieldExtractionResponse model: field_value: Any, confidence: float, requires_manual_review: bool
- [ ] Inject FieldExtractionService via FastAPI Depends()
- [ ] Return 200 OK with extracted value or 422 Unprocessable Entity for validation failures
- [ ] Write unit tests for sanitize_input() with prompt injection test cases
- [ ] Write unit tests for rate limiter with burst request simulation
- [ ] Write integration tests for extract_field() with mocked Azure OpenAI responses
- [ ] Test low-confidence scenario (confidence < 0.85) returns requires_manual_review: true
- [ ] Test retry logic with simulated 429 rate limit errors
- [ ] Verify latency <1 second with performance profiling
- [ ] **[AI Tasks - MANDATORY]** Reference prompt templates from field_extraction_prompts.py during implementation
- [ ] **[AI Tasks - MANDATORY]** Implement and test guardrails (input sanitization) before marking task complete
- [ ] **[AI Tasks - MANDATORY]** Verify AIR-001, AIR-002, AIR-005, AIR-009, AIR-012, AIR-013 requirements are met
