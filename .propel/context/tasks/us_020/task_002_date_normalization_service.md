# Task - TASK_002

## Requirement Reference
- User Story: US_020
- Story Location: .propel/context/tasks/us_020/us_020.md
- Acceptance Criteria:  
    - AC-2: Convert natural language dates to MM/DD/YYYY format ("January 15th, 1980" → "01/15/1980", "born on March 3rd, 1975" → "03/03/1975")
- Edge Case:
    - Ambiguous date formats prompt for clarification via TTS (MM/DD/YYYY vs DD/MM/YYYY)

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
| Library | python-dateutil | 2.8+ |
| AI/ML | Azure OpenAI GPT-4 | gpt-4-turbo |

**Note**: All code and libraries MUST be compatible with versions above.

## AI References (AI Tasks Only)
| Reference Type | Value |
|----------------|-------|
| **AI Impact** | Yes |
| **AIR Requirements** | AIR-005 (Data Quality & Validation) |
| **AI Pattern** | Structured Output / Tool Calling |
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
Implement a specialized date normalization service that converts natural language date inputs into standardized MM/DD/YYYY format using Azure OpenAI structured outputs. The service will handle various date formats, detect ambiguous dates, and flag them for clarification while maintaining high accuracy and performance.

**Core Capabilities:**
- Natural language date parsing ("January 15th, 1980", "born on March 3rd, 1975")
- Standardized MM/DD/YYYY output format
- Ambiguous date detection (MM/DD vs DD/MM)
- Confidence scoring for date extraction
- Date validation (realistic ranges, leap years)
- Structured output using Pydantic models

## Dependent Tasks
- TASK_001 (Data Cleaning Service) - Shares guardrails and prompt infrastructure
- US_019 (Azure OpenAI Integration) - MUST be completed first

## Impacted Components
**NEW Components:**
- `Server/app/services/date_normalization_service.py` - Date normalization service
- `Server/app/models/date_normalization.py` - Pydantic schemas for date operations
- `Server/app/prompts/data_cleaning/date_normalization.txt` - Date parsing prompt template

**MODIFIED Components:**
- `Server/app/dependencies.py` - Add date normalization service dependency
- `Server/app/services/__init__.py` - Export DateNormalizationService
- `Server/requirements.txt` - Add python-dateutil library

## Implementation Plan

### 1. Create Pydantic Models for Date Normalization
- Define `DateNormalizationRequest` schema with raw_date_text, context
- Define `DateNormalizationResponse` schema with normalized_date, confidence, is_ambiguous, ambiguity_reason
- Define `DateFormat` enum (MM_DD_YYYY, DD_MM_YYYY, YYYY_MM_DD)
- Add date validation constraints (1900-2100 range)

### 2. Create Date Normalization Prompt Template
- Design prompt for extracting dates from natural language
- Include few-shot examples covering various formats
- Define structured output schema with date components
- Add ambiguity detection instructions
- Include validation rules for realistic dates

### 3. Implement Date Normalization Service
- Create `DateNormalizationService` class with async methods
- Implement `normalize_date()` main orchestration method
- Implement `_parse_with_llm()` for LLM-based extraction
- Implement `_validate_date()` for date range and leap year validation
- Implement `_detect_ambiguity()` for MM/DD vs DD/MM detection
- Add confidence scoring based on extraction clarity
- Implement fallback to python-dateutil for common formats

### 4. Implement Date-Specific Guardrails
- Input validation (max 200 chars, date-related text only)
- Output validation (valid MM/DD/YYYY format)
- Date range validation (1900-2100)
- Leap year validation
- Ambiguity threshold configuration

### 5. Add Service Dependency Injection
- Register service in dependency injection system
- Create factory function with Settings injection
- Ensure singleton pattern for service instance

## Current Project State
```
Server/
├── app/
│   ├── core/
│   │   ├── config.py
│   │   └── guardrails.py (created in TASK_001)
│   ├── models/
│   │   └── data_cleaning.py (created in TASK_001)
│   ├── prompts/
│   │   └── data_cleaning/ (created in TASK_001)
│   ├── services/
│   │   ├── __init__.py
│   │   └── data_cleaning_service.py (created in TASK_001)
│   └── dependencies.py
├── requirements.txt
└── main.py
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | Server/app/models/date_normalization.py | Pydantic schemas for date normalization |
| CREATE | Server/app/services/date_normalization_service.py | Date normalization service with LLM integration |
| CREATE | Server/app/prompts/data_cleaning/date_normalization.txt | Date parsing prompt template |
| MODIFY | Server/app/dependencies.py | Add get_date_normalization_service() dependency |
| MODIFY | Server/app/services/__init__.py | Export DateNormalizationService |
| MODIFY | Server/requirements.txt | Add python-dateutil>=2.8.0 |

## External References
- [Azure OpenAI Structured Outputs](https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/structured-outputs)
- [python-dateutil Documentation](https://dateutil.readthedocs.io/en/stable/)
- [ISO 8601 Date Format](https://en.wikipedia.org/wiki/ISO_8601)
- [Pydantic Validators](https://docs.pydantic.dev/latest/concepts/validators/)
- [Date Ambiguity Handling Best Practices](https://stackoverflow.com/questions/2265503/why-does-the-month-argument-range-from-0-to-11-in-javascripts-date-constructor)

## Build Commands
```bash
# Install dependencies
cd Server
pip install -r requirements.txt

# Run tests
pytest tests/test_date_normalization_service.py -v

# Start development server
python scripts/dev.py
```

## Implementation Validation Strategy
- [ ] Unit tests pass for all date parsing scenarios
- [ ] Integration tests pass with Azure OpenAI mock
- [ ] **[AI Tasks]** Prompt templates validated with test inputs
- [ ] **[AI Tasks]** Guardrails tested for input sanitization and output validation
- [ ] **[AI Tasks]** Fallback logic tested with low-confidence/error scenarios
- [ ] **[AI Tasks]** Token budget enforcement verified
- [ ] **[AI Tasks]** Audit logging verified (no PII in logs)
- [ ] Natural language dates converted correctly (10+ test cases)
- [ ] Ambiguous dates detected and flagged
- [ ] Date validation enforced (leap years, valid ranges)
- [ ] Confidence scoring accuracy validated
- [ ] Performance target met (<1 second processing)

## Implementation Checklist
- [ ] Create `Server/app/models/date_normalization.py`
  - [ ] Define `DateNormalizationRequest` with raw_date_text, context
  - [ ] Define `DateNormalizationResponse` with normalized_date, confidence, is_ambiguous, ambiguity_reason
  - [ ] Define `DateFormat` enum (MM_DD_YYYY, DD_MM_YYYY, YYYY_MM_DD)
  - [ ] Add date range validators (1900-2100)
  - [ ] Add MM/DD/YYYY format validator
- [ ] Create `Server/app/prompts/data_cleaning/date_normalization.txt`
  - [ ] Design prompt with natural language date examples
  - [ ] Include few-shot examples (10+ variations)
  - [ ] Add ambiguity detection instructions
  - [ ] Define structured output schema
  - [ ] Include validation rules
- [ ] Create `Server/app/services/date_normalization_service.py`
  - [ ] Implement `DateNormalizationService` class
  - [ ] Add `__init__()` with Azure OpenAI client and dateutil
  - [ ] Implement `normalize_date()` orchestration method
  - [ ] Implement `_parse_with_llm()` for LLM extraction
  - [ ] Implement `_parse_with_dateutil()` fallback method
  - [ ] Implement `_validate_date()` (range, leap year checks)
  - [ ] Implement `_detect_ambiguity()` (MM/DD vs DD/MM)
  - [ ] Implement `_format_to_mm_dd_yyyy()` standardization
  - [ ] Add `_calculate_confidence()` scoring method
  - [ ] Implement retry logic with exponential backoff (3 attempts)
  - [ ] Add error handling for API failures
- [ ] Update `Server/app/core/guardrails.py`
  - [ ] Add `validate_date_input()` (max 200 chars, date-related)
  - [ ] Add `validate_date_output()` (MM/DD/YYYY format check)
  - [ ] Add `validate_date_range()` (1900-2100)
  - [ ] Add `validate_leap_year()` function
- [ ] Update `Server/requirements.txt`
  - [ ] Add python-dateutil>=2.8.0
- [ ] Update `Server/app/dependencies.py`
  - [ ] Add `get_date_normalization_service()` dependency
  - [ ] Use functools.lru_cache for singleton
  - [ ] Inject Settings dependency
- [ ] Update `Server/app/services/__init__.py`
  - [ ] Export DateNormalizationService class
- [ ] **[AI Tasks - MANDATORY]** Reference prompt templates from AI References table during implementation
- [ ] **[AI Tasks - MANDATORY]** Implement and test guardrails before marking task complete
- [ ] **[AI Tasks - MANDATORY]** Verify AIR-005 requirements are met (data quality, validation)
