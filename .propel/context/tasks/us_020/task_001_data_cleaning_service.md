# Task - TASK_001

## Requirement Reference
- User Story: US_020
- Story Location: .propel/context/tasks/us_020/us_020.md
- Acceptance Criteria:  
    - AC-1: Remove filler words ("the", "is", "was", "patient", "name", "uh", "um", "like") and extract relevant answer
    - AC-3: Apply text casing normalization to proper case
    - AC-4: Preserve numeric data exactly as spoken
    - AC-5: Remove unnecessary punctuation except dates (slashes) and decimals (periods)
- Edge Case:
    - Low-confidence extractions flagged for manual review (threshold >0.85)

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
Implement a comprehensive LLM-based data cleaning service that processes conversational responses to remove filler words, normalize formatting, and extract clean structured data. The service will use Azure OpenAI with structured outputs to transform natural language responses into validated field values with confidence scoring.

**Core Capabilities:**
- Filler word removal using LLM-based extraction
- Text normalization (proper case conversion)
- Numeric data preservation
- Punctuation cleaning with context awareness
- Confidence scoring for extraction quality
- Low-confidence flagging for manual review

## Dependent Tasks
- US_019 (Azure OpenAI Integration) - MUST be completed first
- Azure OpenAI configuration in environment variables
- Pydantic models for structured outputs

## Impacted Components
**NEW Components:**
- `Server/app/services/data_cleaning_service.py` - Core data cleaning service
- `Server/app/models/data_cleaning.py` - Pydantic schemas for cleaning operations
- `Server/app/prompts/data_cleaning/` - Prompt templates directory
- `Server/app/prompts/data_cleaning/filler_removal.txt` - Filler word removal prompt
- `Server/app/prompts/data_cleaning/text_normalization.txt` - Text normalization prompt
- `Server/app/core/guardrails.py` - Input/output validation guardrails

**MODIFIED Components:**
- `Server/app/dependencies.py` - Add data cleaning service dependency
- `Server/requirements.txt` - Add regex library if needed

## Implementation Plan

### 1. Create Pydantic Models for Data Cleaning
- Define `CleaningRequest` schema with raw_text, field_type, context
- Define `CleaningResponse` schema with cleaned_value, confidence_score, requires_review
- Define `FieldType` enum (NAME, DATE, NUMERIC, TEXT, MRN)
- Add validation constraints and field descriptions

### 2. Create Prompt Templates
- Design filler word removal prompt with examples
- Design text normalization prompt with proper case rules
- Include few-shot examples for each cleaning operation
- Define structured output schema in prompts

### 3. Implement Data Cleaning Service
- Create `DataCleaningService` class with async methods
- Implement `clean_text()` method orchestrating cleaning pipeline
- Implement `remove_filler_words()` using LLM extraction
- Implement `normalize_casing()` for proper case conversion
- Implement `preserve_numerics()` to protect numeric values
- Implement `clean_punctuation()` with context awareness
- Add confidence scoring logic (>0.85 threshold)
- Implement retry logic with exponential backoff

### 4. Implement Guardrails
- Input sanitization (max length, character validation)
- Output validation against expected field types
- Confidence threshold enforcement
- PII detection and redaction for logging
- Token budget enforcement per request

### 5. Add Service Dependency Injection
- Register service in dependency injection system
- Create factory function for service instantiation
- Ensure proper async context management

## Current Project State
```
Server/
├── app/
│   ├── core/
│   │   ├── __init__.py
│   │   └── config.py (Azure OpenAI config exists)
│   ├── models/
│   │   ├── __init__.py
│   │   └── ai.py (existing AI models)
│   ├── routers/
│   │   ├── __init__.py
│   │   └── ai_processing.py (placeholder endpoints)
│   ├── services/
│   │   └── __init__.py (empty)
│   ├── dependencies.py (basic dependencies)
│   └── __init__.py
├── requirements.txt (openai>=1.0 present)
└── main.py
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | Server/app/models/data_cleaning.py | Pydantic schemas for cleaning requests/responses |
| CREATE | Server/app/services/data_cleaning_service.py | Core data cleaning service with LLM integration |
| CREATE | Server/app/prompts/data_cleaning/__init__.py | Prompt templates package |
| CREATE | Server/app/prompts/data_cleaning/filler_removal.txt | Filler word removal prompt template |
| CREATE | Server/app/prompts/data_cleaning/text_normalization.txt | Text normalization prompt template |
| CREATE | Server/app/core/guardrails.py | Input/output validation guardrails |
| MODIFY | Server/app/dependencies.py | Add get_data_cleaning_service() dependency |
| MODIFY | Server/app/services/__init__.py | Export DataCleaningService |

## External References
- [Azure OpenAI Structured Outputs](https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/structured-outputs)
- [Pydantic V2 Documentation](https://docs.pydantic.dev/latest/)
- [OpenAI Python SDK](https://github.com/openai/openai-python)
- [FastAPI Dependency Injection](https://fastapi.tiangolo.com/tutorial/dependencies/)
- [HIPAA Compliance for AI](https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/artificial-intelligence/index.html)

## Build Commands
```bash
# Install dependencies
cd Server
pip install -r requirements.txt

# Run tests
pytest tests/test_data_cleaning_service.py -v

# Start development server
python scripts/dev.py
```

## Implementation Validation Strategy
- [ ] Unit tests pass for all cleaning methods
- [ ] Integration tests pass with Azure OpenAI mock
- [ ] **[AI Tasks]** Prompt templates validated with test inputs
- [ ] **[AI Tasks]** Guardrails tested for input sanitization and output validation
- [ ] **[AI Tasks]** Fallback logic tested with low-confidence/error scenarios
- [ ] **[AI Tasks]** Token budget enforcement verified
- [ ] **[AI Tasks]** Audit logging verified (no PII in logs)
- [ ] Confidence scoring accuracy validated (>0.85 threshold)
- [ ] Filler word removal tested with conversational inputs
- [ ] Text normalization tested with various case formats
- [ ] Numeric preservation validated
- [ ] Punctuation cleaning tested with dates and decimals

## Implementation Checklist
- [ ] Create `Server/app/models/data_cleaning.py` with Pydantic schemas
  - [ ] Define `CleaningRequest` with raw_text, field_type, context fields
  - [ ] Define `CleaningResponse` with cleaned_value, confidence_score, requires_review
  - [ ] Define `FieldType` enum (NAME, DATE, NUMERIC, TEXT, MRN)
  - [ ] Add Field() validators and descriptions
- [ ] Create prompt template directory `Server/app/prompts/data_cleaning/`
  - [ ] Create `filler_removal.txt` with few-shot examples
  - [ ] Create `text_normalization.txt` with proper case rules
  - [ ] Include structured output schema in prompts
- [ ] Create `Server/app/services/data_cleaning_service.py`
  - [ ] Implement `DataCleaningService` class
  - [ ] Add `__init__()` with Azure OpenAI client initialization
  - [ ] Implement `clean_text()` orchestration method
  - [ ] Implement `_remove_filler_words()` with LLM call
  - [ ] Implement `_normalize_casing()` for proper case
  - [ ] Implement `_preserve_numerics()` protection logic
  - [ ] Implement `_clean_punctuation()` with context awareness
  - [ ] Add `_calculate_confidence()` scoring method
  - [ ] Implement retry logic with exponential backoff (3 attempts)
  - [ ] Add error handling for API failures
- [ ] Create `Server/app/core/guardrails.py`
  - [ ] Implement `sanitize_input()` (max 1000 chars, valid UTF-8)
  - [ ] Implement `validate_output()` against field type
  - [ ] Implement `check_confidence_threshold()` (>0.85)
  - [ ] Implement `redact_pii_for_logging()` function
  - [ ] Add token budget enforcement (max 500 tokens per request)
- [ ] Update `Server/app/dependencies.py`
  - [ ] Add `get_data_cleaning_service()` dependency function
  - [ ] Use functools.lru_cache for singleton pattern
  - [ ] Inject Settings dependency
- [ ] Update `Server/app/services/__init__.py`
  - [ ] Export DataCleaningService class
- [ ] **[AI Tasks - MANDATORY]** Reference prompt templates from AI References table during implementation
- [ ] **[AI Tasks - MANDATORY]** Implement and test guardrails before marking task complete
- [ ] **[AI Tasks - MANDATORY]** Verify AIR-005 requirements are met (data quality, validation)
