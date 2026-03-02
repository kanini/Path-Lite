# Task - TASK_003

## Requirement Reference
- User Story: US_020
- Story Location: .propel/context/tasks/us_020/us_020.md
- Acceptance Criteria:  
    - AC-1: Remove filler words and extract relevant answer
    - AC-2: Convert natural language dates to MM/DD/YYYY format
    - AC-3: Apply text casing normalization to proper case
    - AC-4: Preserve numeric data exactly as spoken
    - AC-5: Remove unnecessary punctuation except dates and decimals
- Edge Case:
    - Low-confidence extractions flagged for manual review (threshold >0.85)
    - Ambiguous date formats prompt for clarification

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
| Backend | FastAPI | 0.110.0+ |
| Backend | Python | 3.11+ |
| Library | Pydantic | 2.8+ |
| Library | OpenAI SDK | 1.0+ |

**Note**: All code and libraries MUST be compatible with versions above.

## AI References (AI Tasks Only)
| Reference Type | Value |
|----------------|-------|
| **AI Impact** | Yes |
| **AIR Requirements** | AIR-005 (Data Quality & Validation) |
| **AI Pattern** | Tool Calling / Structured Output |
| **Prompt Template Path** | Server/app/prompts/data_cleaning/ |
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
Implement RESTful API endpoints for the LLM data cleaning pipeline, exposing text cleaning and date normalization services to frontend applications. The endpoints will provide a unified interface for processing conversational responses with proper error handling, validation, and performance monitoring.

**Core Capabilities:**
- POST endpoint for general text cleaning
- POST endpoint for date normalization
- Batch processing endpoint for multiple fields
- Health check endpoint for service monitoring
- Proper HTTP status codes and error responses
- Request/response validation using Pydantic
- Performance metrics and logging

## Dependent Tasks
- TASK_001 (Data Cleaning Service) - MUST be completed first
- TASK_002 (Date Normalization Service) - MUST be completed first

## Impacted Components
**NEW Components:**
- `Server/app/routers/data_cleaning.py` - Data cleaning API endpoints
- `Server/app/models/api_responses.py` - Common API response models

**MODIFIED Components:**
- `Server/app/routers/__init__.py` - Register data cleaning router
- `Server/main.py` - Include data cleaning router in app

## Implementation Plan

### 1. Create API Response Models
- Define `ApiSuccessResponse` generic wrapper
- Define `ApiErrorResponse` with error details
- Define `BatchCleaningRequest` for multiple fields
- Define `BatchCleaningResponse` with results array
- Define `HealthCheckResponse` for service status

### 2. Implement Data Cleaning Endpoints
- Create `/api/v1/data-cleaning/clean-text` POST endpoint
- Create `/api/v1/data-cleaning/normalize-date` POST endpoint
- Create `/api/v1/data-cleaning/batch` POST endpoint for bulk operations
- Create `/api/v1/data-cleaning/health` GET endpoint
- Add proper OpenAPI documentation with examples

### 3. Implement Request Validation
- Validate request body using Pydantic models
- Add field-level validation (max lengths, required fields)
- Implement custom validators for field types
- Add request size limits (max 10 fields per batch)

### 4. Implement Error Handling
- Handle service-level exceptions (LLM API failures)
- Handle validation errors with detailed messages
- Implement proper HTTP status codes (200, 400, 422, 500, 503)
- Add correlation IDs for request tracking
- Log errors with context (no PII)

### 5. Add Performance Monitoring
- Add request timing middleware
- Log processing duration per request
- Add metrics for confidence scores
- Track low-confidence flagging rate
- Monitor API error rates

### 6. Implement Security Headers
- Add CORS configuration for allowed origins
- Add rate limiting headers
- Implement request timeout (30 seconds)
- Add authentication dependency (future-ready)

## Current Project State
```
Server/
├── app/
│   ├── core/
│   │   ├── config.py
│   │   └── guardrails.py
│   ├── models/
│   │   ├── data_cleaning.py
│   │   └── date_normalization.py
│   ├── routers/
│   │   ├── __init__.py
│   │   ├── ai_processing.py
│   │   ├── auth.py
│   │   └── patients.py
│   ├── services/
│   │   ├── __init__.py
│   │   ├── data_cleaning_service.py
│   │   └── date_normalization_service.py
│   └── dependencies.py
├── main.py
└── requirements.txt
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | Server/app/routers/data_cleaning.py | REST API endpoints for data cleaning |
| CREATE | Server/app/models/api_responses.py | Common API response wrapper models |
| MODIFY | Server/app/routers/__init__.py | Register data_cleaning router |
| MODIFY | Server/main.py | Include data_cleaning router in FastAPI app |

## External References
- [FastAPI Router Documentation](https://fastapi.tiangolo.com/tutorial/bigger-applications/)
- [FastAPI Response Models](https://fastapi.tiangolo.com/tutorial/response-model/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [REST API Best Practices](https://restfulapi.net/http-status-codes/)
- [OpenAPI Documentation](https://swagger.io/specification/)

## Build Commands
```bash
# Install dependencies
cd Server
pip install -r requirements.txt

# Run tests
pytest tests/test_data_cleaning_endpoints.py -v

# Start development server
python scripts/dev.py

# Test endpoints
curl -X POST http://localhost:8000/api/v1/data-cleaning/clean-text \
  -H "Content-Type: application/json" \
  -d '{"raw_text": "The patient name is uh John Smith", "field_type": "NAME"}'
```

## Implementation Validation Strategy
- [ ] Unit tests pass for all endpoints
- [ ] Integration tests pass with service mocks
- [ ] **[AI Tasks]** Prompt templates validated with test inputs
- [ ] **[AI Tasks]** Guardrails tested for input sanitization and output validation
- [ ] **[AI Tasks]** Fallback logic tested with low-confidence/error scenarios
- [ ] **[AI Tasks]** Token budget enforcement verified
- [ ] **[AI Tasks]** Audit logging verified (no PII in logs)
- [ ] All endpoints return proper status codes
- [ ] Error responses include detailed messages
- [ ] Batch processing handles partial failures
- [ ] Health check endpoint returns service status
- [ ] OpenAPI documentation generated correctly
- [ ] CORS headers configured properly
- [ ] Request validation enforced
- [ ] Performance metrics logged

## Implementation Checklist
- [ ] Create `Server/app/models/api_responses.py`
  - [ ] Define `ApiSuccessResponse[T]` generic model
  - [ ] Define `ApiErrorResponse` with code, message, details
  - [ ] Define `BatchCleaningRequest` with items array
  - [ ] Define `BatchCleaningResponse` with results and errors
  - [ ] Define `HealthCheckResponse` with status, services
- [ ] Create `Server/app/routers/data_cleaning.py`
  - [ ] Create APIRouter with prefix="/api/v1/data-cleaning", tags=["Data Cleaning"]
  - [ ] Implement POST `/clean-text` endpoint
    - [ ] Inject DataCleaningService dependency
    - [ ] Validate CleaningRequest body
    - [ ] Call service.clean_text()
    - [ ] Return ApiSuccessResponse with CleaningResponse
    - [ ] Handle exceptions with proper status codes
  - [ ] Implement POST `/normalize-date` endpoint
    - [ ] Inject DateNormalizationService dependency
    - [ ] Validate DateNormalizationRequest body
    - [ ] Call service.normalize_date()
    - [ ] Return ApiSuccessResponse with DateNormalizationResponse
    - [ ] Handle exceptions with proper status codes
  - [ ] Implement POST `/batch` endpoint
    - [ ] Inject both services
    - [ ] Validate BatchCleaningRequest (max 10 items)
    - [ ] Process each item based on field_type
    - [ ] Collect results and errors
    - [ ] Return BatchCleaningResponse
    - [ ] Handle partial failures gracefully
  - [ ] Implement GET `/health` endpoint
    - [ ] Check Azure OpenAI connectivity
    - [ ] Return service status (healthy/degraded/unhealthy)
    - [ ] Include version and timestamp
  - [ ] Add OpenAPI documentation with examples
  - [ ] Add correlation ID generation for requests
  - [ ] Add request timing logging
- [ ] Update `Server/app/routers/__init__.py`
  - [ ] Import data_cleaning router
  - [ ] Add to __all__ export list
- [ ] Update `Server/main.py`
  - [ ] Import data_cleaning router
  - [ ] Add app.include_router(data_cleaning.router)
  - [ ] Ensure proper router ordering
- [ ] Add error handling middleware
  - [ ] Handle HTTPException
  - [ ] Handle RequestValidationError
  - [ ] Handle service-level exceptions
  - [ ] Log errors with correlation ID (no PII)
- [ ] Add performance monitoring
  - [ ] Log request duration
  - [ ] Log confidence scores distribution
  - [ ] Track low-confidence rate
  - [ ] Monitor API error rate
- [ ] **[AI Tasks - MANDATORY]** Reference prompt templates from AI References table during implementation
- [ ] **[AI Tasks - MANDATORY]** Implement and test guardrails before marking task complete
- [ ] **[AI Tasks - MANDATORY]** Verify AIR-005 requirements are met (data quality, validation)
