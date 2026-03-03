# Task - TASK_003

## Requirement Reference
- User Story: us_020
- Story Location: .propel/context/tasks/us_020/us_020.md
- Acceptance Criteria:
    - AC-1: Given conversational response is received, When I apply filler word removal, Then the system removes words and extracts only the relevant answer.
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
Integrate the DataCleaningService with FastAPI endpoints. Create REST API endpoints for data cleaning operations, implement proper error handling with clarification responses for ambiguous data, add comprehensive integration tests validating all cleaning transformations (filler removal, date normalization, case normalization, numeric preservation, punctuation cleaning).

## Dependent Tasks
- task_001_data_cleaning_models.md - Must be completed
- task_002_llm_data_cleaning_service.md - Must be completed

## Impacted Components
| Action | Component | Project |
|--------|-----------|---------|
| MODIFY | AI processing router | Server/app/routers/ai_processing.py |
| CREATE | Cleaning request/response models | Server/app/models/cleaning_api.py |
| MODIFY | Dependencies | Server/app/dependencies.py |
| CREATE | Integration tests | Server/tests/test_data_cleaning_api.py |

## Implementation Plan
1. **Create cleaning API models** - Request/response Pydantic models for cleaning endpoints
2. **Add data cleaning service dependency** - Create FastAPI dependency for DataCleaningService injection
3. **Implement clean endpoint** - POST /ai/clean endpoint for single field cleaning
4. **Implement batch clean endpoint** - POST /ai/clean/batch for multiple fields
5. **Implement clarification response** - Return clarification_needed with suggested question for ambiguous data
6. **Add manual review flag handling** - Include requires_review in response for low-confidence results
7. **Create integration tests** - Test all 5 acceptance criteria transformations

**Focus on how to implement**

## Current Project State
```
Server/
├── app/
│   ├── core/
│   │   ├── config.py
│   │   ├── azure_openai.py
│   │   └── guardrails.py
│   ├── models/
│   │   ├── structured_outputs.py
│   │   ├── data_cleaning.py      # From task_001
│   │   ├── extraction_api.py     # From US_019
│   │   └── ...
│   ├── routers/
│   │   └── ai_processing.py      # (MODIFY)
│   ├── services/
│   │   ├── extraction_service.py
│   │   ├── data_cleaning_service.py  # From task_002
│   │   └── __init__.py
│   ├── utils/
│   │   ├── text_transformers.py  # From task_001
│   │   └── date_normalizer.py    # From task_002
│   └── dependencies.py           # (MODIFY)
├── tests/
└── main.py
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | Server/app/models/cleaning_api.py | CleanRequest, CleanResponse, BatchCleanRequest, ClarificationResponse models |
| MODIFY | Server/app/dependencies.py | Add get_data_cleaning_service() dependency |
| MODIFY | Server/app/routers/ai_processing.py | Add POST /ai/clean, POST /ai/clean/batch endpoints |
| CREATE | Server/tests/test_data_cleaning_api.py | Integration tests for all cleaning transformations |

## External References
- [FastAPI Response Models](https://fastapi.tiangolo.com/tutorial/response-model/)
- [FastAPI Union Response Types](https://fastapi.tiangolo.com/advanced/additional-responses/)
- [pytest Parametrize](https://docs.pytest.org/en/stable/how-to/parametrize.html)

## Build Commands
```bash
cd Server
pytest tests/test_data_cleaning_api.py -v
uvicorn main:app --reload
# Test: curl -X POST http://localhost:8000/ai/clean -H "Content-Type: application/json" -d '{"text": "Patient name is JOHN SMITH", "field_type": "name"}'
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
- [ ] Create CleanRequest(text: str, field_type: FieldType, config: Optional[CleaningConfig]) model
- [ ] Create CleanResponse(cleaned_value: str, original: str, confidence_score: float, requires_review: bool, clarification_needed: bool, clarification_message: Optional[str]) model
- [ ] Create BatchCleanRequest(text: str, field_types: List[FieldType]) model
- [ ] Add get_data_cleaning_service() dependency in dependencies.py
- [ ] Implement POST /ai/clean endpoint returning CleanResponse
- [ ] Implement POST /ai/clean/batch endpoint for multiple field cleaning
- [ ] Add clarification response logic for ambiguous dates (HTTP 200 with clarification_needed=True)
- [ ] Create parametrized tests for filler word removal: "Patient name is Chaman" → "Chaman"
- [ ] Create parametrized tests for date normalization: "January 15th, 1980" → "01/15/1980"
- [ ] Create parametrized tests for case normalization: "JOHN SMITH" → "John Smith"
