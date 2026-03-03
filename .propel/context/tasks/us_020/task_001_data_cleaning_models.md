# Task - TASK_001

## Requirement Reference
- User Story: us_020
- Story Location: .propel/context/tasks/us_020/us_020.md
- Acceptance Criteria:
    - AC-1: Given conversational response is received, When I apply filler word removal, Then the system removes words: "the", "is", "was", "patient", "name", "uh", "um", "like" and extracts only the relevant answer.
    - AC-3: Given name fields are entered, When I apply text casing normalization, Then the system converts to proper case.
    - AC-4: Given numeric values are spoken, When I preserve numeric data, Then the system keeps numbers exactly as spoken.
    - AC-5: Given punctuation is present, When I clean the text, Then the system removes unnecessary punctuation except for dates and decimals.
- Edge Case:
    - What happens when LLM extracts incorrect value? (Implement confidence threshold >0.85; flag low-confidence extractions for manual review)

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
| **Prompt Template Path** | N/A (model definitions only) |
| **Guardrails Config** | N/A (model definitions only) |
| **Model Provider** | Azure OpenAI |

## Mobile References (Mobile Tasks Only)
| Reference Type | Value |
|----------------|-------|
| **Mobile Impact** | No |
| **Platform Target** | N/A |
| **Min OS Version** | N/A |
| **Mobile Framework** | N/A |

## Task Overview
Define Pydantic models for data cleaning pipeline inputs/outputs and implement deterministic text transformation utilities. This includes models for cleaned data with confidence scores, filler word lists, and utility functions for text normalization (casing, punctuation removal, numeric preservation).

## Dependent Tasks
- US_019 task_002_pydantic_structured_output_models.md - Must be completed (base extraction models)

## Impacted Components
| Action | Component | Project |
|--------|-----------|---------|
| CREATE | Data cleaning models | Server/app/models/data_cleaning.py |
| CREATE | Text transformer utilities | Server/app/utils/text_transformers.py |
| MODIFY | Models __init__.py | Server/app/models/__init__.py |
| MODIFY | requirements.txt | Server/requirements.txt |

## Implementation Plan
1. **Create data_cleaning.py models** - Define CleanedField, CleaningResult, CleaningConfig models
2. **Define filler word configuration** - Create configurable filler word list with defaults
3. **Implement text transformer utilities** - Create pure functions for text transformations
4. **Add proper case converter** - Implement title case normalization for names
5. **Add punctuation cleaner** - Remove punctuation while preserving dates/decimals
6. **Add numeric extractor** - Extract and preserve numeric values from text
7. **Export models and utilities** - Update __init__.py files

**Focus on how to implement**

## Current Project State
```
Server/
├── app/
│   ├── models/
│   │   ├── __init__.py           # (MODIFY)
│   │   ├── structured_outputs.py # From US_019
│   │   ├── ai.py
│   │   └── patient.py
│   ├── utils/
│   │   └── __init__.py
│   └── ...
└── requirements.txt              # (MODIFY)
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| MODIFY | Server/requirements.txt | Add python-dateutil>=2.8 for date parsing |
| CREATE | Server/app/models/data_cleaning.py | CleanedField, CleaningResult, CleaningConfig, FillerWordConfig models |
| CREATE | Server/app/utils/text_transformers.py | Pure functions: remove_filler_words(), normalize_case(), clean_punctuation(), extract_numeric() |
| MODIFY | Server/app/models/__init__.py | Export data cleaning models |

## External References
- [Pydantic V2 Validators](https://docs.pydantic.dev/latest/concepts/validators/)
- [Python String Methods](https://docs.python.org/3/library/stdtypes.html#string-methods)
- [python-dateutil](https://dateutil.readthedocs.io/en/stable/)

## Build Commands
```bash
cd Server
pip install -r requirements.txt
python -c "from app.models.data_cleaning import CleanedField; from app.utils.text_transformers import remove_filler_words; print('Models loaded')"
pytest tests/test_text_transformers.py -v
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
- [ ] Add python-dateutil>=2.8 to requirements.txt
- [ ] Create CleanedField model with value: str, original: str, confidence_score: float, requires_review: bool
- [ ] Create CleaningConfig model with filler_words: List[str], confidence_threshold: float (default 0.85)
- [ ] Create FillerWordConfig with default list: ["the", "is", "was", "patient", "name", "uh", "um", "like"]
- [ ] Implement remove_filler_words(text: str, filler_words: List[str]) -> str
- [ ] Implement normalize_case(text: str, case_type: Literal["title", "upper", "lower"]) -> str
- [ ] Implement clean_punctuation(text: str, preserve_patterns: List[str]) -> str
- [ ] Implement extract_numeric(text: str) -> Optional[str] for extracting numbers
