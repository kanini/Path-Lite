# Task - TASK_004

## Requirement Reference
- User Story: US_021
- Story Location: .propel/context/tasks/us_021/us_021.md
- Acceptance Criteria:  
    - AC-3: Produce consistent extractions across similar inputs with >95% accuracy for medical terminology
    - AC-4: Handle variations ("Hep B positive" → "Positive", "male patient" → "Male", "operating room" → "OR")
    - AC-5: Validate LLM outputs against form schema enums
- Edge Case:
    - Validate against schema enums; reject hallucinated values; re-ask question with clarification
    - Include abbreviation mappings in prompt

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

**Note**: All code and libraries MUST be compatible with versions above.

## AI References (AI Tasks Only)
| Reference Type | Value |
|----------------|-------|
| **AI Impact** | Yes |
| **AIR Requirements** | AIR-008 (Prompt Quality), AIR-009 (Medical Term Accuracy) |
| **AI Pattern** | Few-Shot Learning / Validation |
| **Prompt Template Path** | Server/app/prompts/medical_terms/ |
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
Implement comprehensive unit and integration tests for the medical term extraction pipeline, ensuring >95% accuracy for medical terminology extraction, proper schema validation, re-prompting logic, and variation handling. Tests will validate prompt quality, extraction consistency, and edge case handling with mocked Azure OpenAI responses.

**Core Capabilities:**
- Unit tests for MedicalTermExtractionService methods
- Unit tests for SchemaValidationService
- Integration tests for medical extraction API endpoints
- Prompt template validation tests
- Accuracy measurement tests (>95% target)
- Variation handling tests
- Re-prompting and retry logic tests
- Hallucination detection tests

## Dependent Tasks
- TASK_001 (Medical Term Prompt Templates) - MUST be completed first
- TASK_002 (Schema Validation Service) - MUST be completed first
- TASK_003 (Medical Term Extraction Service) - MUST be completed first

## Impacted Components
**NEW Components:**
- `Server/tests/test_medical_term_extraction_service.py` - Service layer unit tests
- `Server/tests/test_schema_validation_service.py` - Schema validation unit tests
- `Server/tests/test_medical_extraction_endpoints.py` - API endpoint integration tests
- `Server/tests/test_prompt_templates.py` - Prompt template validation tests
- `Server/tests/fixtures/mock_medical_responses.py` - Mock LLM response fixtures
- `Server/tests/data/medical_test_cases.yaml` - Test case data for accuracy measurement

**MODIFIED Components:**
- `Server/tests/conftest.py` - Add medical extraction test fixtures

## Implementation Plan

### 1. Create Test Data and Fixtures
- Create medical test cases YAML with 100+ examples per field type
- Create mock Azure OpenAI response fixtures
- Create test fixtures for services and dependencies
- Design test cases covering variations and edge cases

### 2. Implement Prompt Template Validation Tests
- Test prompt template loading and parsing
- Validate few-shot examples are present (5+ per template)
- Test variable substitution in templates
- Validate structured output schema definitions
- Test abbreviation mappings completeness

### 3. Implement Schema Validation Service Tests
- Test exact match validation
- Test case-insensitive matching
- Test fuzzy matching with threshold (>0.85)
- Test hallucination detection
- Test clarification prompt generation
- Test retry count tracking
- Test abbreviation expansion

### 4. Implement Medical Term Extraction Service Tests
- Test HBsAg extraction with variations (20+ test cases)
- Test Treatment Location extraction (20+ test cases)
- Test Gender extraction (20+ test cases)
- Test confidence scoring accuracy
- Test re-prompting logic for invalid values
- Test retry limit enforcement (max 3)
- Test error handling for API failures

### 5. Implement Accuracy Measurement Tests
- Create test suite with 100+ examples per field type
- Measure extraction accuracy (target >95%)
- Test consistency across similar inputs
- Measure variation handling accuracy
- Track false positives and false negatives
- Generate accuracy report

### 6. Implement API Endpoint Tests
- Test POST /extract endpoint with valid requests
- Test POST /batch endpoint with multiple fields
- Test GET /accuracy-metrics endpoint
- Test request validation errors (400, 422)
- Test service errors (500, 503)
- Test response format compliance

### 7. Implement Edge Case Tests
- Test hallucinated medical term rejection
- Test ambiguous input handling
- Test empty/null input handling
- Test extremely long input (>1000 chars)
- Test special characters in medical terms
- Test concurrent extraction requests

## Current Project State
```
Server/
├── app/
│   ├── core/
│   │   ├── config.py
│   │   ├── guardrails.py
│   │   └── schema_loader.py
│   ├── models/
│   │   ├── medical_extraction.py
│   │   └── schema_validation.py
│   ├── prompts/
│   │   └── medical_terms/
│   │       ├── hbsag_extraction.txt
│   │       ├── treatment_location_extraction.txt
│   │       ├── gender_extraction.txt
│   │       ├── field_schemas.yaml
│   │       └── abbreviation_mappings.yaml
│   ├── services/
│   │   ├── medical_term_extraction_service.py
│   │   └── schema_validation_service.py
│   └── routers/
│       └── medical_extraction.py
├── tests/
│   ├── __init__.py
│   ├── conftest.py
│   └── test_ai_processing.py
└── requirements.txt
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | Server/tests/test_medical_term_extraction_service.py | Service layer unit tests |
| CREATE | Server/tests/test_schema_validation_service.py | Schema validation unit tests |
| CREATE | Server/tests/test_medical_extraction_endpoints.py | API endpoint integration tests |
| CREATE | Server/tests/test_prompt_templates.py | Prompt template validation tests |
| CREATE | Server/tests/fixtures/mock_medical_responses.py | Mock LLM response fixtures |
| CREATE | Server/tests/data/medical_test_cases.yaml | Test case data for accuracy measurement |
| MODIFY | Server/tests/conftest.py | Add medical extraction test fixtures |

## External References
- [pytest Documentation](https://docs.pytest.org/en/stable/)
- [pytest-asyncio](https://pytest-asyncio.readthedocs.io/en/latest/)
- [FastAPI Testing](https://fastapi.tiangolo.com/tutorial/testing/)
- [LLM Testing Best Practices](https://arxiv.org/abs/2305.14251)
- [Medical Terminology Testing](https://www.nlm.nih.gov/research/umls/)

## Build Commands
```bash
# Install test dependencies
cd Server
pip install -r requirements.txt

# Run all tests
pytest tests/ -v

# Run specific test file
pytest tests/test_medical_term_extraction_service.py -v

# Run with coverage
pytest tests/ --cov=app --cov-report=html

# Run accuracy measurement tests
pytest tests/test_medical_term_extraction_service.py::test_accuracy_measurement -v

# Generate accuracy report
pytest tests/ -v --html=accuracy_report.html
```

## Implementation Validation Strategy
- [ ] All unit tests pass (min 85% coverage)
- [ ] All integration tests pass
- [ ] **[AI Tasks]** Prompt templates validated with test inputs
- [ ] **[AI Tasks]** Guardrails tested for input sanitization and output validation
- [ ] **[AI Tasks]** Fallback logic tested with low-confidence/error scenarios
- [ ] **[AI Tasks]** Token budget enforcement verified
- [ ] **[AI Tasks]** Audit logging verified (no PII in logs)
- [ ] >95% accuracy achieved for medical term extraction
- [ ] Variation handling accuracy validated
- [ ] Schema validation comprehensive
- [ ] Re-prompting logic functional
- [ ] Edge cases handled correctly
- [ ] API endpoints return proper responses
- [ ] Mock responses realistic and comprehensive

## Implementation Checklist
- [ ] Create `Server/tests/data/medical_test_cases.yaml`
  - [ ] Add 100+ HBsAg test cases with variations
    - [ ] "Hep B positive" → Positive
    - [ ] "HBsAg negative" → Negative
    - [ ] "Hepatitis B unknown" → Unknown
    - [ ] "Patient has HBV" → Positive
    - [ ] Include edge cases and ambiguous inputs
  - [ ] Add 100+ Treatment Location test cases
    - [ ] "Operating room" → OR
    - [ ] "Bedside treatment" → Bedside
    - [ ] "ICU-CCU admission" → ICU-CCU
    - [ ] "ER visit" → ER
    - [ ] "Multiple treatment rooms" → Multi-Tx Room
  - [ ] Add 100+ Gender test cases
    - [ ] "Male patient" → Male
    - [ ] "Female" → Female
    - [ ] "M" → Male
    - [ ] "F" → Female
    - [ ] "He was admitted" → Male
- [ ] Create `Server/tests/fixtures/mock_medical_responses.py`
  - [ ] Define mock responses for HBsAg extraction
  - [ ] Define mock responses for Treatment Location
  - [ ] Define mock responses for Gender
  - [ ] Define mock error responses (timeout, rate limit, 5xx)
  - [ ] Define mock low-confidence responses
  - [ ] Define mock hallucinated responses
- [ ] Update `Server/tests/conftest.py`
  - [ ] Add mock_azure_openai_client fixture
  - [ ] Add mock_medical_extraction_service fixture
  - [ ] Add mock_schema_validation_service fixture
  - [ ] Add test_client fixture for API testing
  - [ ] Add load_test_cases fixture
- [ ] Create `Server/tests/test_prompt_templates.py`
  - [ ] Test prompt template loading
  - [ ] Test few-shot examples present (≥5 per template)
  - [ ] Test variable substitution
  - [ ] Test structured output schema definitions
  - [ ] Test abbreviation_mappings.yaml completeness
  - [ ] Test field_schemas.yaml validity
- [ ] Create `Server/tests/test_schema_validation_service.py`
  - [ ] Test exact match validation (case-insensitive)
  - [ ] Test fuzzy matching (>0.85 threshold)
  - [ ] Test hallucination detection
  - [ ] Test clarification prompt generation
  - [ ] Test retry count tracking (max 3)
  - [ ] Test abbreviation expansion
  - [ ] Test multi-value validation
  - [ ] Test schema loading and caching
- [ ] Create `Server/tests/test_medical_term_extraction_service.py`
  - [ ] Test HBsAg extraction (20+ variations)
    - [ ] "Hep B positive" → Positive
    - [ ] "HBsAg negative" → Negative
    - [ ] "Hepatitis B unknown" → Unknown
    - [ ] Test confidence scoring
  - [ ] Test Treatment Location extraction (20+ variations)
    - [ ] "Operating room" → OR
    - [ ] "Bedside" → Bedside
    - [ ] "ICU-CCU" → ICU-CCU
    - [ ] Test multi-location handling
  - [ ] Test Gender extraction (20+ variations)
    - [ ] "Male patient" → Male
    - [ ] "Female" → Female
    - [ ] "M" → Male
    - [ ] Test pronoun handling
  - [ ] Test re-prompting logic
    - [ ] Invalid value triggers re-prompt
    - [ ] Clarification prompt includes valid options
    - [ ] Retry count increments
    - [ ] Max retries enforced (3)
  - [ ] Test accuracy measurement
    - [ ] Load 100+ test cases per field
    - [ ] Measure extraction accuracy
    - [ ] Verify >95% accuracy target
    - [ ] Generate accuracy report
  - [ ] Test error handling
    - [ ] API timeout
    - [ ] Rate limiting
    - [ ] 5xx errors
    - [ ] Invalid API responses
- [ ] Create `Server/tests/test_medical_extraction_endpoints.py`
  - [ ] Test POST /api/v1/medical-extraction/extract
    - [ ] Valid HBsAg request returns 200
    - [ ] Valid Treatment Location request returns 200
    - [ ] Valid Gender request returns 200
    - [ ] Invalid request returns 422
    - [ ] Service error returns 500
    - [ ] Response format validation
  - [ ] Test POST /api/v1/medical-extraction/batch
    - [ ] Multiple fields processed correctly
    - [ ] Partial failures handled
    - [ ] Max batch size enforced
  - [ ] Test GET /api/v1/medical-extraction/accuracy-metrics
    - [ ] Returns accuracy statistics
    - [ ] Includes retry rate
    - [ ] Includes validation failure rate
  - [ ] Test correlation ID generation
  - [ ] Test error response format
- [ ] Add edge case tests
  - [ ] Test hallucinated medical term rejection
  - [ ] Test ambiguous input handling
  - [ ] Test empty input handling
  - [ ] Test null input handling
  - [ ] Test extremely long input (>1000 chars)
  - [ ] Test special characters in medical terms
  - [ ] Test concurrent extraction requests (10 parallel)
- [ ] Add performance tests
  - [ ] Test extraction latency (<1 second)
  - [ ] Test batch processing time
  - [ ] Mark with @pytest.mark.performance
- [ ] **[AI Tasks - MANDATORY]** Reference prompt templates from AI References table during implementation
- [ ] **[AI Tasks - MANDATORY]** Implement and test guardrails before marking task complete
- [ ] **[AI Tasks - MANDATORY]** Verify AIR-008 and AIR-009 requirements are met (prompt quality, >95% medical accuracy)
