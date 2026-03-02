# Task - TASK_004

## Requirement Reference
- User Story: US_020
- Story Location: .propel/context/tasks/us_020/us_020.md
- Acceptance Criteria:  
    - AC-1: Remove filler words and extract relevant answer with 95% accuracy
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
| Library | pytest | 7.4+ |
| Library | pytest-asyncio | 0.21+ |
| Library | pytest-mock | 3.11+ |
| Library | httpx | 0.24+ |

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
Implement comprehensive unit and integration tests for the LLM data cleaning pipeline, ensuring 95% accuracy for text cleaning operations, proper error handling, and validation of all acceptance criteria. Tests will cover service layer logic, API endpoints, guardrails, and edge cases with mocked Azure OpenAI responses.

**Core Capabilities:**
- Unit tests for DataCleaningService methods
- Unit tests for DateNormalizationService methods
- Integration tests for API endpoints
- Guardrails validation tests
- Edge case and error handling tests
- Performance and latency tests
- Mock Azure OpenAI responses for deterministic testing

## Dependent Tasks
- TASK_001 (Data Cleaning Service) - MUST be completed first
- TASK_002 (Date Normalization Service) - MUST be completed first
- TASK_003 (Data Cleaning API Endpoints) - MUST be completed first

## Impacted Components
**NEW Components:**
- `Server/tests/test_data_cleaning_service.py` - Service layer unit tests
- `Server/tests/test_date_normalization_service.py` - Date service unit tests
- `Server/tests/test_data_cleaning_endpoints.py` - API endpoint integration tests
- `Server/tests/test_guardrails.py` - Guardrails validation tests
- `Server/tests/fixtures/mock_llm_responses.py` - Mock LLM response fixtures
- `Server/tests/conftest.py` - Pytest configuration and shared fixtures (if not exists)

**MODIFIED Components:**
- `Server/requirements.txt` - Add test dependencies (pytest, pytest-asyncio, pytest-mock, httpx)

## Implementation Plan

### 1. Setup Test Infrastructure
- Create pytest configuration in conftest.py
- Create mock Azure OpenAI client fixture
- Create mock LLM response fixtures for various scenarios
- Setup test database/session fixtures (if needed)
- Configure async test support with pytest-asyncio

### 2. Implement Service Layer Unit Tests
- Test DataCleaningService.clean_text() with various inputs
- Test filler word removal accuracy (95% target)
- Test text normalization (proper case conversion)
- Test numeric preservation
- Test punctuation cleaning
- Test confidence scoring logic
- Test retry logic with exponential backoff
- Test error handling for API failures

### 3. Implement Date Normalization Tests
- Test natural language date parsing (10+ formats)
- Test MM/DD/YYYY output format validation
- Test ambiguous date detection
- Test date range validation (1900-2100)
- Test leap year validation
- Test confidence scoring for dates
- Test fallback to python-dateutil

### 4. Implement API Endpoint Tests
- Test POST /clean-text endpoint with valid requests
- Test POST /normalize-date endpoint with valid requests
- Test POST /batch endpoint with multiple fields
- Test GET /health endpoint
- Test request validation errors (400, 422)
- Test service errors (500, 503)
- Test response format compliance
- Test correlation ID generation

### 5. Implement Guardrails Tests
- Test input sanitization (max length, character validation)
- Test output validation against field types
- Test confidence threshold enforcement (>0.85)
- Test PII redaction for logging
- Test token budget enforcement
- Test date-specific validation rules

### 6. Implement Edge Case Tests
- Test low-confidence extraction flagging
- Test ambiguous date format handling
- Test API rate limiting scenarios
- Test timeout handling
- Test malformed input handling
- Test empty/null input handling

### 7. Implement Performance Tests
- Test processing latency (<1 second target)
- Test batch processing performance
- Test concurrent request handling
- Test memory usage with large inputs

## Current Project State
```
Server/
├── app/
│   ├── core/
│   │   ├── config.py
│   │   └── guardrails.py
│   ├── models/
│   │   ├── data_cleaning.py
│   │   ├── date_normalization.py
│   │   └── api_responses.py
│   ├── routers/
│   │   └── data_cleaning.py
│   ├── services/
│   │   ├── data_cleaning_service.py
│   │   └── date_normalization_service.py
│   └── dependencies.py
├── tests/
│   ├── __init__.py
│   ├── conftest.py (existing)
│   └── test_ai_processing.py (existing)
├── requirements.txt
└── main.py
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | Server/tests/test_data_cleaning_service.py | Unit tests for DataCleaningService |
| CREATE | Server/tests/test_date_normalization_service.py | Unit tests for DateNormalizationService |
| CREATE | Server/tests/test_data_cleaning_endpoints.py | Integration tests for API endpoints |
| CREATE | Server/tests/test_guardrails.py | Guardrails validation tests |
| CREATE | Server/tests/fixtures/mock_llm_responses.py | Mock LLM response fixtures |
| MODIFY | Server/tests/conftest.py | Add shared fixtures for data cleaning tests |
| MODIFY | Server/requirements.txt | Add pytest, pytest-asyncio, pytest-mock, httpx |

## External References
- [pytest Documentation](https://docs.pytest.org/en/stable/)
- [pytest-asyncio](https://pytest-asyncio.readthedocs.io/en/latest/)
- [FastAPI Testing](https://fastapi.tiangolo.com/tutorial/testing/)
- [pytest-mock Documentation](https://pytest-mock.readthedocs.io/en/latest/)
- [Python unittest.mock](https://docs.python.org/3/library/unittest.mock.html)

## Build Commands
```bash
# Install test dependencies
cd Server
pip install -r requirements.txt

# Run all tests
pytest tests/ -v

# Run specific test file
pytest tests/test_data_cleaning_service.py -v

# Run with coverage
pytest tests/ --cov=app --cov-report=html

# Run performance tests only
pytest tests/ -v -m performance

# Run async tests
pytest tests/ -v --asyncio-mode=auto
```

## Implementation Validation Strategy
- [ ] All unit tests pass (min 85% coverage for services)
- [ ] All integration tests pass
- [ ] **[AI Tasks]** Prompt templates validated with test inputs
- [ ] **[AI Tasks]** Guardrails tested for input sanitization and output validation
- [ ] **[AI Tasks]** Fallback logic tested with low-confidence/error scenarios
- [ ] **[AI Tasks]** Token budget enforcement verified
- [ ] **[AI Tasks]** Audit logging verified (no PII in logs)
- [ ] 95% accuracy achieved for filler word removal
- [ ] Date normalization accuracy validated (10+ formats)
- [ ] Confidence scoring accuracy validated
- [ ] Edge cases handled correctly
- [ ] Performance targets met (<1 second)
- [ ] Error handling comprehensive
- [ ] Mock responses realistic and comprehensive

## Implementation Checklist
- [ ] Update `Server/requirements.txt`
  - [ ] Add pytest>=7.4.0
  - [ ] Add pytest-asyncio>=0.21.0
  - [ ] Add pytest-mock>=3.11.0
  - [ ] Add httpx>=0.24.0
  - [ ] Add pytest-cov>=4.1.0
- [ ] Create `Server/tests/fixtures/mock_llm_responses.py`
  - [ ] Define mock responses for filler word removal
  - [ ] Define mock responses for text normalization
  - [ ] Define mock responses for date parsing
  - [ ] Define mock error responses (timeout, rate limit, 5xx)
  - [ ] Define low-confidence response fixtures
- [ ] Update `Server/tests/conftest.py`
  - [ ] Add mock_azure_openai_client fixture
  - [ ] Add mock_data_cleaning_service fixture
  - [ ] Add mock_date_normalization_service fixture
  - [ ] Add test_client fixture for API testing
  - [ ] Configure pytest-asyncio mode
- [ ] Create `Server/tests/test_data_cleaning_service.py`
  - [ ] Test clean_text() with filler words (10+ cases)
  - [ ] Test text normalization (UPPERCASE, lowercase, MiXeD)
  - [ ] Test numeric preservation ("123456", "Room 405")
  - [ ] Test punctuation cleaning
  - [ ] Test confidence scoring (>0.85 threshold)
  - [ ] Test retry logic (3 attempts with backoff)
  - [ ] Test API error handling (timeout, 5xx, rate limit)
  - [ ] Test low-confidence flagging
  - [ ] Verify 95% accuracy target
- [ ] Create `Server/tests/test_date_normalization_service.py`
  - [ ] Test natural language dates ("January 15th, 1980")
  - [ ] Test conversational dates ("born on March 3rd, 1975")
  - [ ] Test various formats (10+ test cases)
  - [ ] Test MM/DD/YYYY output validation
  - [ ] Test ambiguous date detection
  - [ ] Test date range validation (1900-2100)
  - [ ] Test leap year validation
  - [ ] Test confidence scoring
  - [ ] Test fallback to python-dateutil
  - [ ] Test error handling
- [ ] Create `Server/tests/test_data_cleaning_endpoints.py`
  - [ ] Test POST /api/v1/data-cleaning/clean-text
    - [ ] Valid request returns 200
    - [ ] Invalid request returns 422
    - [ ] Service error returns 500
    - [ ] Response format validation
  - [ ] Test POST /api/v1/data-cleaning/normalize-date
    - [ ] Valid date request returns 200
    - [ ] Invalid date returns 422
    - [ ] Ambiguous date flagged correctly
  - [ ] Test POST /api/v1/data-cleaning/batch
    - [ ] Multiple fields processed correctly
    - [ ] Partial failures handled
    - [ ] Max 10 items enforced
  - [ ] Test GET /api/v1/data-cleaning/health
    - [ ] Returns service status
    - [ ] Includes version and timestamp
  - [ ] Test correlation ID generation
  - [ ] Test error response format
- [ ] Create `Server/tests/test_guardrails.py`
  - [ ] Test sanitize_input() max length enforcement
  - [ ] Test validate_output() field type checking
  - [ ] Test check_confidence_threshold() (>0.85)
  - [ ] Test redact_pii_for_logging()
  - [ ] Test token budget enforcement (max 500 tokens)
  - [ ] Test date-specific validations
  - [ ] Test input character validation
- [ ] Add performance tests
  - [ ] Test processing latency (<1 second)
  - [ ] Test batch processing time
  - [ ] Test concurrent requests (10 parallel)
  - [ ] Mark with @pytest.mark.performance
- [ ] Add edge case tests
  - [ ] Test empty input handling
  - [ ] Test null input handling
  - [ ] Test extremely long input (>1000 chars)
  - [ ] Test special characters and unicode
  - [ ] Test malformed JSON requests
- [ ] **[AI Tasks - MANDATORY]** Reference prompt templates from AI References table during implementation
- [ ] **[AI Tasks - MANDATORY]** Implement and test guardrails before marking task complete
- [ ] **[AI Tasks - MANDATORY]** Verify AIR-005 requirements are met (data quality, validation)
