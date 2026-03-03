# Task - TASK_002

## Requirement Reference
- User Story: us_019
- Story Location: .propel/context/tasks/us_019/us_019.md
- Acceptance Criteria:
    - AC-2: Given I need structured outputs, When I define Pydantic models, Then the system has Pydantic 2.8+ schemas for each form field (MRN, FirstName, LastName, DOB, Gender, etc.) with type validation and constraints.
    - AC-4: Given API call succeeds, When I receive the response, Then the system validates the structured output against Pydantic schema, ensures type safety, and returns extracted value with confidence score.
- Edge Case:
    - N/A (model definitions are deterministic)

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
| Library | pydantic-settings | >=2.0 |
| AI/ML | Azure OpenAI GPT-5-mini | 2024-07-18 |

**Note**: All code, and libraries, MUST be compatible with versions above.

## AI References (AI Tasks Only)
| Reference Type | Value |
|----------------|-------|
| **AI Impact** | Yes |
| **AIR Requirements** | AIR-001, AIR-002 |
| **AI Pattern** | Structured Output Extraction |
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
Define Pydantic 2.8+ schemas for structured output extraction from Azure OpenAI. These models will be used with OpenAI's structured output feature to ensure type-safe extraction of patient form fields (MRN, FirstName, LastName, DOB, Gender, etc.) with validation constraints and confidence scoring.

## Dependent Tasks
- task_001_azure_openai_sdk_setup.md - Must be completed

## Impacted Components
| Action | Component | Project |
|--------|-----------|---------|
| CREATE | Structured output models | Server/app/models/structured_outputs.py |
| MODIFY | Models __init__.py | Server/app/models/__init__.py |

## Implementation Plan
1. **Create structured_outputs.py** - Define base extraction model with confidence score
2. **Define field-specific models** - Create models for each patient form field type
3. **Add validation constraints** - Implement Pydantic validators for field-specific rules
4. **Create composite extraction model** - Define model for full form extraction
5. **Add JSON schema generation** - Ensure models can generate OpenAI-compatible JSON schemas
6. **Export models** - Update __init__.py for clean imports

**Focus on how to implement**

## Current Project State
```
Server/
├── app/
│   ├── models/
│   │   ├── __init__.py        # (MODIFY)
│   │   ├── ai.py
│   │   ├── auth.py
│   │   └── patient.py
│   └── ...
└── requirements.txt
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | Server/app/models/structured_outputs.py | Pydantic models for structured output extraction with confidence scores |
| MODIFY | Server/app/models/__init__.py | Export new structured output models |

## External References
- [Pydantic V2 Documentation](https://docs.pydantic.dev/latest/)
- [OpenAI Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs)
- [Pydantic JSON Schema Generation](https://docs.pydantic.dev/latest/concepts/json_schema/)

## Build Commands
```bash
cd Server
python -c "from app.models.structured_outputs import PatientFieldExtraction; print(PatientFieldExtraction.model_json_schema())"
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
- [ ] Create structured_outputs.py with BaseExtraction model containing confidence_score: float (0.0-1.0)
- [ ] Define MRNExtraction model with mrn: str, pattern validation (alphanumeric, length constraints)
- [ ] Define NameExtraction model with first_name: str, last_name: str, min_length=1
- [ ] Define DOBExtraction model with dob: date, validator for reasonable date range
- [ ] Define GenderExtraction model with gender: Literal["Male", "Female", "Other", "Unknown"]
- [ ] Define PatientFieldExtraction composite model combining all field types
- [ ] Add model_config with json_schema_extra for OpenAI structured output compatibility
- [ ] Write unit tests validating schema generation and field constraints
