# Task - TASK_002

## Requirement Reference
- User Story: US_021
- Story Location: .propel/context/tasks/us_021/us_021.md
- Acceptance Criteria:  
    - AC-5: Validate LLM outputs against form schema enums and reject invalid values with re-prompt request
- Edge Case:
    - Validate against schema enums; reject hallucinated values; re-ask question with clarification

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
| Library | PyYAML | 6.0+ |

**Note**: All code and libraries MUST be compatible with versions above.

## AI References (AI Tasks Only)
| Reference Type | Value |
|----------------|-------|
| **AI Impact** | Yes |
| **AIR Requirements** | AIR-008 (Prompt Quality), AIR-009 (Medical Term Accuracy) |
| **AI Pattern** | Validation / Guardrails |
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
Implement a comprehensive schema validation service that validates LLM-extracted medical terms against predefined enum schemas. The service will detect hallucinated or invalid values, trigger re-prompting with clarification, and ensure only valid medical terminology is accepted into the system.

**Core Capabilities:**
- Load and parse field schema definitions from YAML
- Validate extracted values against enum constraints
- Detect hallucinated medical terms
- Generate clarification prompts for invalid values
- Track validation failures and retry attempts
- Provide detailed validation error messages

## Dependent Tasks
- TASK_001 (Medical Term Prompt Templates) - Schema definitions created
- US_020 (LLM Data Cleaning Pipeline) - Guardrails infrastructure

## Impacted Components
**NEW Components:**
- `Server/app/services/schema_validation_service.py` - Schema validation service
- `Server/app/models/schema_validation.py` - Pydantic models for validation
- `Server/app/core/schema_loader.py` - YAML schema loader utility

**MODIFIED Components:**
- `Server/app/core/guardrails.py` - Add schema validation guardrails
- `Server/app/dependencies.py` - Add schema validation service dependency
- `Server/app/services/__init__.py` - Export SchemaValidationService
- `Server/requirements.txt` - Add PyYAML dependency

## Implementation Plan

### 1. Create Schema Validation Pydantic Models
- Define `ValidationRequest` schema with field_name, extracted_value, field_type
- Define `ValidationResponse` schema with is_valid, error_message, suggested_values, clarification_prompt
- Define `FieldSchema` model for enum definitions
- Define `ValidationResult` enum (VALID, INVALID, HALLUCINATED, AMBIGUOUS)

### 2. Implement Schema Loader Utility
- Create YAML parser for field_schemas.yaml
- Load schema definitions at service initialization
- Cache schemas in memory for performance
- Implement schema reload mechanism
- Add validation for schema file format

### 3. Implement Schema Validation Service
- Create `SchemaValidationService` class
- Implement `validate_field()` method for enum checking
- Implement `detect_hallucination()` for invalid values
- Implement `generate_clarification_prompt()` for re-prompting
- Add fuzzy matching for near-miss values (e.g., "Positiv" → "Positive")
- Track validation attempts per field

### 4. Implement Validation Logic
- Exact match validation against enum values
- Case-insensitive matching with normalization
- Fuzzy matching with similarity threshold (>0.85)
- Abbreviation expansion before validation
- Multi-value validation for array fields

### 5. Implement Re-Prompting Logic
- Generate clarification prompts for invalid values
- Include valid options in clarification
- Track retry count (max 3 attempts)
- Escalate to manual entry after max retries
- Log validation failures for analysis

### 6. Add Validation Guardrails
- Pre-validation input sanitization
- Post-validation output verification
- Hallucination detection rules
- Confidence threshold for fuzzy matches
- Audit logging for validation failures

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
│   ├── prompts/
│   │   ├── data_cleaning/
│   │   └── medical_terms/ (created in TASK_001)
│   │       ├── field_schemas.yaml
│   │       └── abbreviation_mappings.yaml
│   ├── services/
│   │   ├── data_cleaning_service.py
│   │   └── date_normalization_service.py
│   └── dependencies.py
└── requirements.txt
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | Server/app/models/schema_validation.py | Pydantic models for schema validation |
| CREATE | Server/app/services/schema_validation_service.py | Schema validation service implementation |
| CREATE | Server/app/core/schema_loader.py | YAML schema loader utility |
| MODIFY | Server/app/core/guardrails.py | Add schema validation guardrails |
| MODIFY | Server/app/dependencies.py | Add get_schema_validation_service() dependency |
| MODIFY | Server/app/services/__init__.py | Export SchemaValidationService |
| MODIFY | Server/requirements.txt | Add PyYAML>=6.0 |

## External References
- [Pydantic Validators](https://docs.pydantic.dev/latest/concepts/validators/)
- [PyYAML Documentation](https://pyyaml.org/wiki/PyYAMLDocumentation)
- [Fuzzy String Matching](https://github.com/seatgeek/thefuzz)
- [Schema Validation Best Practices](https://json-schema.org/understanding-json-schema/)
- [LLM Hallucination Detection](https://arxiv.org/abs/2305.14251)

## Build Commands
```bash
# Install dependencies
cd Server
pip install -r requirements.txt

# Validate schema files
python -c "from app.core.schema_loader import SchemaLoader; SchemaLoader().load_schemas()"

# Run tests
pytest tests/test_schema_validation_service.py -v

# Start development server
python scripts/dev.py
```

## Implementation Validation Strategy
- [ ] Unit tests pass for all validation scenarios
- [ ] Schema loader correctly parses YAML files
- [ ] **[AI Tasks]** Prompt templates validated with test inputs
- [ ] **[AI Tasks]** Guardrails tested for input sanitization and output validation
- [ ] **[AI Tasks]** Fallback logic tested with low-confidence/error scenarios
- [ ] **[AI Tasks]** Token budget enforcement verified
- [ ] **[AI Tasks]** Audit logging verified (no PII in logs)
- [ ] Exact match validation works correctly
- [ ] Fuzzy matching detects near-misses
- [ ] Hallucination detection flags invalid values
- [ ] Clarification prompts generated correctly
- [ ] Retry logic enforced (max 3 attempts)
- [ ] Abbreviation expansion integrated

## Implementation Checklist
- [ ] Create `Server/app/models/schema_validation.py`
  - [ ] Define `ValidationRequest` with field_name, extracted_value, field_type
  - [ ] Define `ValidationResponse` with is_valid, error_message, suggested_values, clarification_prompt
  - [ ] Define `FieldSchema` with field_name, enum_values, allow_fuzzy, fuzzy_threshold
  - [ ] Define `ValidationResult` enum (VALID, INVALID, HALLUCINATED, AMBIGUOUS)
  - [ ] Add field validators and constraints
- [ ] Create `Server/app/core/schema_loader.py`
  - [ ] Implement `SchemaLoader` class
  - [ ] Add `load_schemas()` method to parse field_schemas.yaml
  - [ ] Add `get_field_schema()` method to retrieve specific field
  - [ ] Implement schema caching with LRU cache
  - [ ] Add schema validation on load
  - [ ] Implement reload mechanism for schema updates
- [ ] Create `Server/app/services/schema_validation_service.py`
  - [ ] Implement `SchemaValidationService` class
  - [ ] Add `__init__()` with SchemaLoader initialization
  - [ ] Implement `validate_field()` main validation method
    - [ ] Exact match validation (case-insensitive)
    - [ ] Fuzzy matching with threshold (>0.85)
    - [ ] Abbreviation expansion before validation
    - [ ] Multi-value validation for arrays
  - [ ] Implement `_detect_hallucination()` method
    - [ ] Check if value exists in any schema
    - [ ] Flag completely invalid medical terms
  - [ ] Implement `_generate_clarification_prompt()` method
    - [ ] Include original question
    - [ ] List valid options
    - [ ] Provide context for re-asking
  - [ ] Implement `_fuzzy_match()` helper method
    - [ ] Use Levenshtein distance or similar
    - [ ] Return best match if above threshold
  - [ ] Add `_expand_abbreviation()` helper
    - [ ] Load abbreviation_mappings.yaml
    - [ ] Expand before validation
  - [ ] Track validation attempts per field (max 3)
  - [ ] Add error handling and logging
- [ ] Update `Server/app/core/guardrails.py`
  - [ ] Add `validate_against_schema()` guardrail
  - [ ] Add `detect_medical_hallucination()` function
  - [ ] Add `sanitize_medical_term()` function
  - [ ] Integrate with existing guardrails
- [ ] Update `Server/requirements.txt`
  - [ ] Add PyYAML>=6.0
  - [ ] Add python-Levenshtein>=0.21.0 (for fuzzy matching)
- [ ] Update `Server/app/dependencies.py`
  - [ ] Add `get_schema_validation_service()` dependency
  - [ ] Use functools.lru_cache for singleton
  - [ ] Inject SchemaLoader dependency
- [ ] Update `Server/app/services/__init__.py`
  - [ ] Export SchemaValidationService class
- [ ] **[AI Tasks - MANDATORY]** Reference prompt templates from AI References table during implementation
- [ ] **[AI Tasks - MANDATORY]** Implement and test guardrails before marking task complete
- [ ] **[AI Tasks - MANDATORY]** Verify AIR-008 and AIR-009 requirements are met (prompt quality, medical accuracy)
