# Task - TASK_003

## Requirement Reference
- User Story: US_021
- Story Location: .propel/context/tasks/us_021/us_021.md
- Acceptance Criteria:  
    - AC-1: Include few-shot examples for medical terms (HBsAg, Treatment Location, Gender)
    - AC-2: Include field context and expected format guidance
    - AC-3: Produce consistent extractions with >95% accuracy for medical terminology
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
| Library | Pydantic | 2.8+ |
| Library | OpenAI SDK | 1.0+ |
| AI/ML | Azure OpenAI GPT-4 | gpt-4-turbo |

**Note**: All code and libraries MUST be compatible with versions above.

## AI References (AI Tasks Only)
| Reference Type | Value |
|----------------|-------|
| **AI Impact** | Yes |
| **AIR Requirements** | AIR-008 (Prompt Quality), AIR-009 (Medical Term Accuracy) |
| **AI Pattern** | Few-Shot Learning / Structured Output |
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
Implement a comprehensive medical term extraction service that uses Azure OpenAI with few-shot prompts to extract domain-specific healthcare terminology with >95% accuracy. The service integrates prompt templates, schema validation, and re-prompting logic to ensure consistent and accurate medical term extraction.

**Core Capabilities:**
- Medical term extraction using few-shot prompts
- Field-specific extraction (HBsAg, Treatment Location, Gender)
- Abbreviation expansion and variation handling
- Schema validation integration
- Re-prompting for invalid/hallucinated values
- Confidence scoring and accuracy tracking
- Retry logic with clarification prompts

## Dependent Tasks
- TASK_001 (Medical Term Prompt Templates) - MUST be completed first
- TASK_002 (Schema Validation Service) - MUST be completed first
- US_020 (LLM Data Cleaning Pipeline) - Service infrastructure

## Impacted Components
**NEW Components:**
- `Server/app/services/medical_term_extraction_service.py` - Medical term extraction service
- `Server/app/models/medical_extraction.py` - Pydantic models for medical extraction
- `Server/app/routers/medical_extraction.py` - API endpoints for medical term extraction

**MODIFIED Components:**
- `Server/app/dependencies.py` - Add medical extraction service dependency
- `Server/app/services/__init__.py` - Export MedicalTermExtractionService
- `Server/app/routers/__init__.py` - Register medical extraction router
- `Server/main.py` - Include medical extraction router

## Implementation Plan

### 1. Create Medical Extraction Pydantic Models
- Define `MedicalExtractionRequest` with raw_text, field_type, context
- Define `MedicalExtractionResponse` with extracted_value, confidence, is_valid, retry_count
- Define `MedicalFieldType` enum (HBSAG, TREATMENT_LOCATION, GENDER)
- Define `RePromptRequest` for clarification scenarios

### 2. Implement Prompt Template Loader
- Load prompt templates from medical_terms/ directory
- Cache templates in memory for performance
- Support dynamic template selection by field type
- Implement template variable substitution

### 3. Implement Medical Term Extraction Service
- Create `MedicalTermExtractionService` class
- Implement `extract_medical_term()` orchestration method
- Implement field-specific extraction methods:
  - `_extract_hbsag()` using HBsAg prompt template
  - `_extract_treatment_location()` using location prompt
  - `_extract_gender()` using gender prompt
- Integrate abbreviation expansion
- Integrate schema validation
- Implement re-prompting logic for invalid values

### 4. Implement Extraction Workflow
- Load appropriate prompt template for field type
- Substitute context and raw_text into template
- Call Azure OpenAI with structured output
- Parse and validate response
- If invalid, generate clarification prompt and retry (max 3)
- Track confidence scores and accuracy metrics
- Return validated extraction result

### 5. Implement Re-Prompting Logic
- Detect validation failures from SchemaValidationService
- Generate clarification prompt with valid options
- Append clarification to conversation history
- Retry extraction with enhanced context
- Track retry count per field
- Escalate to manual entry after max retries

### 6. Implement API Endpoints
- POST `/api/v1/medical-extraction/extract` for single field
- POST `/api/v1/medical-extraction/batch` for multiple fields
- GET `/api/v1/medical-extraction/accuracy-metrics` for monitoring
- Proper error handling and status codes

## Current Project State
```
Server/
├── app/
│   ├── core/
│   │   ├── config.py
│   │   ├── guardrails.py
│   │   └── schema_loader.py (created in TASK_002)
│   ├── models/
│   │   ├── data_cleaning.py
│   │   ├── date_normalization.py
│   │   └── schema_validation.py (created in TASK_002)
│   ├── prompts/
│   │   └── medical_terms/ (created in TASK_001)
│   │       ├── hbsag_extraction.txt
│   │       ├── treatment_location_extraction.txt
│   │       ├── gender_extraction.txt
│   │       ├── field_schemas.yaml
│   │       └── abbreviation_mappings.yaml
│   ├── services/
│   │   ├── data_cleaning_service.py
│   │   ├── date_normalization_service.py
│   │   └── schema_validation_service.py (created in TASK_002)
│   ├── routers/
│   │   ├── ai_processing.py
│   │   └── data_cleaning.py
│   └── dependencies.py
└── requirements.txt
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | Server/app/models/medical_extraction.py | Pydantic models for medical extraction |
| CREATE | Server/app/services/medical_term_extraction_service.py | Medical term extraction service |
| CREATE | Server/app/routers/medical_extraction.py | API endpoints for medical extraction |
| MODIFY | Server/app/dependencies.py | Add get_medical_extraction_service() dependency |
| MODIFY | Server/app/services/__init__.py | Export MedicalTermExtractionService |
| MODIFY | Server/app/routers/__init__.py | Register medical_extraction router |
| MODIFY | Server/main.py | Include medical_extraction router |

## External References
- [Few-Shot Prompting Best Practices](https://platform.openai.com/docs/guides/prompt-engineering)
- [Azure OpenAI Structured Outputs](https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/structured-outputs)
- [Medical Terminology Standards](https://www.nlm.nih.gov/research/umls/)
- [LLM Accuracy Measurement](https://arxiv.org/abs/2305.14251)
- [Retry Strategies for LLMs](https://platform.openai.com/docs/guides/error-codes)

## Build Commands
```bash
# Install dependencies
cd Server
pip install -r requirements.txt

# Run tests
pytest tests/test_medical_term_extraction_service.py -v

# Start development server
python scripts/dev.py

# Test endpoint
curl -X POST http://localhost:8000/api/v1/medical-extraction/extract \
  -H "Content-Type: application/json" \
  -d '{"raw_text": "Patient is Hep B positive", "field_type": "HBSAG"}'
```

## Implementation Validation Strategy
- [ ] Unit tests pass for all extraction methods
- [ ] Integration tests pass with Azure OpenAI mock
- [ ] **[AI Tasks]** Prompt templates validated with test inputs
- [ ] **[AI Tasks]** Guardrails tested for input sanitization and output validation
- [ ] **[AI Tasks]** Fallback logic tested with low-confidence/error scenarios
- [ ] **[AI Tasks]** Token budget enforcement verified
- [ ] **[AI Tasks]** Audit logging verified (no PII in logs)
- [ ] >95% accuracy achieved for medical term extraction
- [ ] Schema validation integrated correctly
- [ ] Re-prompting logic works for invalid values
- [ ] Abbreviation expansion functional
- [ ] Retry logic enforced (max 3 attempts)
- [ ] API endpoints return proper responses
- [ ] Accuracy metrics tracked and reported

## Implementation Checklist
- [ ] Create `Server/app/models/medical_extraction.py`
  - [ ] Define `MedicalExtractionRequest` with raw_text, field_type, context, conversation_history
  - [ ] Define `MedicalExtractionResponse` with extracted_value, confidence, is_valid, retry_count, validation_message
  - [ ] Define `MedicalFieldType` enum (HBSAG, TREATMENT_LOCATION, GENDER)
  - [ ] Define `RePromptRequest` with original_text, invalid_value, valid_options
  - [ ] Add field validators and constraints
- [ ] Create `Server/app/services/medical_term_extraction_service.py`
  - [ ] Implement `MedicalTermExtractionService` class
  - [ ] Add `__init__()` with Azure OpenAI client, SchemaValidationService, prompt loader
  - [ ] Implement `extract_medical_term()` main orchestration method
    - [ ] Route to field-specific extraction method
    - [ ] Integrate schema validation
    - [ ] Handle re-prompting on validation failure
    - [ ] Track retry count (max 3)
    - [ ] Return validated extraction result
  - [ ] Implement `_extract_hbsag()` method
    - [ ] Load hbsag_extraction.txt template
    - [ ] Substitute context and raw_text
    - [ ] Call Azure OpenAI with structured output
    - [ ] Parse response and extract value
  - [ ] Implement `_extract_treatment_location()` method
    - [ ] Load treatment_location_extraction.txt template
    - [ ] Handle multi-location scenarios
    - [ ] Extract and validate location
  - [ ] Implement `_extract_gender()` method
    - [ ] Load gender_extraction.txt template
    - [ ] Handle pronouns and variations
    - [ ] Extract and validate gender
  - [ ] Implement `_load_prompt_template()` helper
    - [ ] Read template file from prompts/medical_terms/
    - [ ] Cache templates in memory
    - [ ] Support variable substitution
  - [ ] Implement `_expand_abbreviations()` helper
    - [ ] Load abbreviation_mappings.yaml
    - [ ] Expand abbreviations before extraction
  - [ ] Implement `_generate_clarification_prompt()` method
    - [ ] Use SchemaValidationService clarification
    - [ ] Append to conversation history
    - [ ] Include valid options
  - [ ] Implement `_calculate_confidence()` method
    - [ ] Use LLM confidence score
    - [ ] Adjust based on validation result
  - [ ] Add retry logic with exponential backoff
  - [ ] Add error handling and logging
- [ ] Create `Server/app/routers/medical_extraction.py`
  - [ ] Create APIRouter with prefix="/api/v1/medical-extraction", tags=["Medical Extraction"]
  - [ ] Implement POST `/extract` endpoint
    - [ ] Inject MedicalTermExtractionService dependency
    - [ ] Validate MedicalExtractionRequest body
    - [ ] Call service.extract_medical_term()
    - [ ] Return MedicalExtractionResponse
    - [ ] Handle exceptions with proper status codes
  - [ ] Implement POST `/batch` endpoint
    - [ ] Accept array of extraction requests
    - [ ] Process each request
    - [ ] Return array of responses
  - [ ] Implement GET `/accuracy-metrics` endpoint
    - [ ] Return accuracy statistics
    - [ ] Include retry rate, validation failure rate
  - [ ] Add OpenAPI documentation with examples
  - [ ] Add correlation ID generation
- [ ] Update `Server/app/dependencies.py`
  - [ ] Add `get_medical_extraction_service()` dependency
  - [ ] Inject SchemaValidationService dependency
  - [ ] Use functools.lru_cache for singleton
- [ ] Update `Server/app/services/__init__.py`
  - [ ] Export MedicalTermExtractionService class
- [ ] Update `Server/app/routers/__init__.py`
  - [ ] Import medical_extraction router
  - [ ] Add to __all__ export list
- [ ] Update `Server/main.py`
  - [ ] Import medical_extraction router
  - [ ] Add app.include_router(medical_extraction.router)
- [ ] **[AI Tasks - MANDATORY]** Reference prompt templates from AI References table during implementation
- [ ] **[AI Tasks - MANDATORY]** Implement and test guardrails before marking task complete
- [ ] **[AI Tasks - MANDATORY]** Verify AIR-008 and AIR-009 requirements are met (prompt quality, >95% medical accuracy)
