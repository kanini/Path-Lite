# Task - TASK_002

## Requirement Reference
- User Story: us_020
- Story Location: .propel/context/tasks/us_020/us_020.md
- Acceptance Criteria:
    - AC-1: Given conversational response is received, When I apply filler word removal, Then the system removes words: "the", "is", "was", "patient", "name", "uh", "um", "like" and extracts only the relevant answer.
    - AC-2: Given date input is in natural language, When I apply date normalization, Then the system converts formats like "January 15th, 1980" to "01/15/1980".
    - AC-3: Given name fields are entered, When I apply text casing normalization, Then the system converts to proper case.
    - AC-4: Given numeric values are spoken, When I preserve numeric data, Then the system keeps numbers exactly as spoken.
    - AC-5: Given punctuation is present, When I clean the text, Then the system removes unnecessary punctuation except for dates and decimals.
- Edge Case:
    - What happens when LLM extracts incorrect value? (Implement confidence threshold >0.85; flag low-confidence extractions for manual review)
    - How does the system handle ambiguous date formats? (Prompt for clarification via TTS; ask "Did you mean MM/DD/YYYY or DD/MM/YYYY?")

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
| Library | python-dateutil | >=2.8 |
| Library | tenacity | >=8.0 |
| AI/ML | Azure OpenAI GPT-5-mini | 2024-07-18 |

**Note**: All code, and libraries, MUST be compatible with versions above.

## AI References (AI Tasks Only)
| Reference Type | Value |
|----------------|-------|
| **AI Impact** | Yes |
| **AIR Requirements** | AIR-005 |
| **AI Pattern** | Data Transformation Pipeline |
| **Prompt Template Path** | Server/app/prompts/cleaning/ |
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
Implement the LLM-based data cleaning service that orchestrates text transformations using Azure OpenAI for intelligent extraction and deterministic utilities for normalization. This service combines LLM extraction with rule-based cleaning to transform conversational responses into clean structured data with confidence scoring and manual review flagging.

## Dependent Tasks
- US_019 task_003_azure_openai_service.md - Must be completed (ExtractionService)
- task_001_data_cleaning_models.md - Must be completed (models and transformers)

## Impacted Components
| Action | Component | Project |
|--------|-----------|---------|
| CREATE | Data cleaning service | Server/app/services/data_cleaning_service.py |
| CREATE | Cleaning prompt templates | Server/app/prompts/cleaning/ |
| CREATE | Date normalizer utility | Server/app/utils/date_normalizer.py |
| MODIFY | Guardrails config | Server/app/core/guardrails.py |
| MODIFY | Services __init__.py | Server/app/services/__init__.py |

## Implementation Plan
1. **Create cleaning prompt templates** - Define system and user prompts for LLM-based cleaning
2. **Implement date normalizer** - Parse natural language dates and convert to MM/DD/YYYY format
3. **Create DataCleaningService class** - Main service orchestrating LLM + deterministic cleaning
4. **Implement clean_field method** - Generic method applying appropriate cleaning based on field type
5. **Implement clean_patient_data method** - Composite cleaning for all patient fields
6. **Add confidence threshold logic** - Flag low-confidence (<0.85) extractions for manual review
7. **Add ambiguous date handling** - Detect ambiguous dates and return clarification request
8. **Update guardrails** - Add cleaning-specific input/output validation

**Focus on how to implement**

## Current Project State
```
Server/
├── app/
│   ├── core/
│   │   ├── config.py
│   │   ├── azure_openai.py       # From US_019
│   │   └── guardrails.py         # From US_019 (MODIFY)
│   ├── models/
│   │   ├── structured_outputs.py # From US_019
│   │   └── data_cleaning.py      # From task_001
│   ├── services/
│   │   ├── extraction_service.py # From US_019
│   │   └── __init__.py           # (MODIFY)
│   ├── utils/
│   │   └── text_transformers.py  # From task_001
│   └── prompts/
│       └── extraction/           # From US_019
└── requirements.txt
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | Server/app/prompts/cleaning/system_prompt.txt | System prompt for data cleaning LLM calls |
| CREATE | Server/app/prompts/cleaning/field_cleaning.txt | User prompt template for field-specific cleaning |
| CREATE | Server/app/utils/date_normalizer.py | DateNormalizer class with parse_natural_date(), normalize_to_mmddyyyy() |
| CREATE | Server/app/services/data_cleaning_service.py | DataCleaningService with clean_field(), clean_patient_data() methods |
| MODIFY | Server/app/core/guardrails.py | Add validate_cleaned_output(), detect_ambiguous_date() functions |
| MODIFY | Server/app/services/__init__.py | Export DataCleaningService |

## External References
- [python-dateutil Parser](https://dateutil.readthedocs.io/en/stable/parser.html)
- [Azure OpenAI Structured Outputs](https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/structured-outputs)
- [Data Cleaning Best Practices](https://www.ibm.com/topics/data-cleaning)

## Build Commands
```bash
cd Server
python -c "from app.services.data_cleaning_service import DataCleaningService; print('Service initialized')"
pytest tests/test_data_cleaning_service.py -v
pytest tests/test_date_normalizer.py -v
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
- [ ] Create Server/app/prompts/cleaning/ directory with system_prompt.txt and field_cleaning.txt
- [ ] Implement DateNormalizer class with parse_natural_date(text: str) -> Optional[date]
- [ ] Implement normalize_to_mmddyyyy(d: date) -> str returning "MM/DD/YYYY" format
- [ ] Implement detect_ambiguous_date(text: str) -> bool for dates like "03/04/1980"
- [ ] Create DataCleaningService with dependency injection for ExtractionService
- [ ] Implement clean_field(text: str, field_type: FieldType, config: CleaningConfig) -> CleanedField
- [ ] Implement clean_patient_data(text: str) -> CleaningResult with all fields cleaned
- [ ] Add requires_review flag when confidence_score < 0.85
- [ ] Add clarification_needed flag with message for ambiguous dates
