# Task - TASK_002

## Requirement Reference
- User Story: US_019
- Story Location: .propel/context/tasks/us_019/us_019.md
- Acceptance Criteria:  
    - AC-2: Given I need structured outputs, When I define Pydantic models, Then the system has Pydantic 2.8+ schemas for each form field (MRN, FirstName, LastName, DOB, Gender, etc.) with type validation and constraints.
    - AC-4: Given API call succeeds, When I receive the response, Then the system validates the structured output against Pydantic schema, ensures type safety, and returns extracted value with confidence score.
- Edge Case:
    - What happens when Azure OpenAI API returns error? (Implement exponential backoff retry; log error details; fallback to manual entry after 3 failed attempts)

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
| Frontend | N/A | N/A |
| Backend | FastAPI | 0.110+ |
| Database | N/A | N/A |
| Library | Pydantic | 2.8+ |
| AI/ML | Azure OpenAI GPT-4o-mini | gpt-4o-mini-2024-07-18 |

**Note**: All code, and libraries, MUST be compatible with versions above.

## AI References (AI Tasks Only)
| Reference Type | Value |
|----------------|-------|
| **AI Impact** | Yes |
| **AIR Requirements** | AIR-002, AIR-009 |
| **AI Pattern** | Structured Outputs |
| **Prompt Template Path** | N/A (Schema definition task) |
| **Guardrails Config** | Server/app/models/schemas/field_schemas.py |
| **Model Provider** | Azure OpenAI |

## Mobile References (Mobile Tasks Only)
| Reference Type | Value |
|----------------|-------|
| **Mobile Impact** | No |
| **Platform Target** | N/A |
| **Min OS Version** | N/A |
| **Mobile Framework** | N/A |

## Task Overview
Define comprehensive Pydantic 2.8+ models for structured LLM outputs covering all Hemodialysis form fields (patient demographics, admission data, clinical intake). This task creates type-safe schemas with field-level validation constraints (regex patterns, value ranges, enums), confidence score tracking, and error handling. The schemas serve as guardrails for Azure OpenAI structured outputs, ensuring 95% data extraction accuracy by enforcing strict type validation and preventing hallucinations through compile-time schema enforcement.

## Dependent Tasks
- TASK_001 (Azure OpenAI SDK Setup) - MUST be completed for Azure OpenAI client availability

## Impacted Components
- **NEW**: `Server/app/models/schemas/__init__.py` - Schema package initialization
- **NEW**: `Server/app/models/schemas/field_schemas.py` - Individual field extraction schemas
- **NEW**: `Server/app/models/schemas/patient_schemas.py` - Patient demographic schemas
- **NEW**: `Server/app/models/schemas/admission_schemas.py` - Admission data schemas
- **NEW**: `Server/app/models/schemas/clinical_schemas.py` - Clinical intake schemas
- **NEW**: `Server/app/models/schemas/base_schemas.py` - Base schema with confidence score
- **MODIFY**: `Server/app/models/ai.py` - Import and use new schemas

## Implementation Plan
1. **Create Base Schema**: Define BaseExtractedField with generic value field, confidence score (0.0-1.0), and extraction metadata (timestamp, model version)
2. **Define Patient Demographic Schemas**: Create Pydantic models for MRN (numeric, 6-10 digits), FirstName (alpha, 1-50 chars), MiddleInitial (alpha, 1 char), LastName (alpha, 1-50 chars), DOB (date, past date validation), Gender (enum: Male/Female/Other/Unknown)
3. **Define Admission Schemas**: Create models for AdmissionNumber (alphanumeric, 8-15 chars), TreatmentLocation (string, 1-100 chars), RoomNumber (alphanumeric, 1-10 chars)
4. **Define Clinical Intake Schemas**: Create models for HBsAg status (enum: Positive/Negative/Unknown), HBsAg date (date), HBsAg source (enum: Lab/Patient/Chart), HBsAb value (numeric, 0-1000), HBsAb date (date), HBsAb source (enum)
5. **Add Field Constraints**: Implement Pydantic Field() validators with regex patterns, value ranges, and custom validation logic
6. **Create Confidence Score Wrapper**: Implement generic ExtractedField[T] wrapper to attach confidence scores to any field type
7. **Add Schema Documentation**: Document each field with description, examples, and validation rules using Pydantic field descriptions

## Current Project State
```
Server/
├── app/
│   ├── models/
│   │   ├── ai.py (existing - basic conversation models)
│   │   └── __init__.py
│   ├── services/
│   │   └── azure_openai_service.py (from TASK_001)
│   └── core/
│       └── config.py
└── requirements.txt (has pydantic>=2.0)
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | d:\Path_Lite\Server\app\models\schemas\__init__.py | Schema package initialization with exports |
| CREATE | d:\Path_Lite\Server\app\models\schemas\base_schemas.py | BaseExtractedField with confidence score and metadata |
| CREATE | d:\Path_Lite\Server\app\models\schemas\field_schemas.py | Individual field extraction schemas (MRN, Name, DOB, Gender) |
| CREATE | d:\Path_Lite\Server\app\models\schemas\patient_schemas.py | Patient demographic composite schemas |
| CREATE | d:\Path_Lite\Server\app\models\schemas\admission_schemas.py | Admission data composite schemas |
| CREATE | d:\Path_Lite\Server\app\models\schemas\clinical_schemas.py | Clinical intake composite schemas (HBsAg, HBsAb) |
| MODIFY | d:\Path_Lite\Server\app\models\ai.py | Import and reference new schemas for AI processing |

## External References
- [Pydantic V2 Documentation](https://docs.pydantic.dev/latest/)
- [Pydantic Field Validators](https://docs.pydantic.dev/latest/concepts/validators/)
- [Pydantic Constrained Types](https://docs.pydantic.dev/latest/concepts/types/)
- [Azure OpenAI Structured Outputs](https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/structured-outputs)
- [Pydantic Generic Models](https://docs.pydantic.dev/latest/concepts/models/#generic-models)

## Build Commands
```bash
# Install dependencies
cd Server
pip install -r requirements.txt

# Run tests
pytest tests/test_schemas.py -v

# Validate schema definitions
python -m app.models.schemas.field_schemas
```

## Implementation Validation Strategy
- [ ] Unit tests pass
- [ ] Integration tests pass (if applicable)
- [ ] **[AI Tasks]** Prompt templates validated with test inputs (N/A for schema definition)
- [ ] **[AI Tasks]** Guardrails tested for input sanitization and output validation
- [ ] **[AI Tasks]** Fallback logic tested with low-confidence/error scenarios (N/A for schema definition)
- [ ] **[AI Tasks]** Token budget enforcement verified (N/A for schema definition)
- [ ] **[AI Tasks]** Audit logging verified (no PII in logs) (N/A for schema definition)
- [ ] All Pydantic schemas validate successfully with valid test data
- [ ] Invalid data triggers ValidationError with descriptive error messages
- [ ] Confidence score validates within 0.0-1.0 range
- [ ] MRN schema rejects non-numeric and out-of-range values
- [ ] DOB schema rejects future dates and invalid date formats
- [ ] Gender enum accepts only defined values (Male/Female/Other/Unknown)
- [ ] HBsAb numeric value validates within 0-1000 range
- [ ] Schema JSON serialization works correctly for API responses

## Implementation Checklist
- [ ] Create app/models/schemas/ directory structure
- [ ] Create base_schemas.py with BaseExtractedField model (fields: value: Any, confidence: float, extracted_at: datetime, model_version: str)
- [ ] Add confidence score validation: Field(ge=0.0, le=1.0) for confidence field
- [ ] Create field_schemas.py with individual field models
- [ ] Define MRNField: value as string matching regex r'^\d{6,10}$', description "Medical Record Number (6-10 digits)"
- [ ] Define FirstNameField: value as string with min_length=1, max_length=50, pattern=r'^[A-Za-z\s\-\']+$'
- [ ] Define MiddleInitialField: value as string with min_length=1, max_length=1, pattern=r'^[A-Za-z]$'
- [ ] Define LastNameField: value as string with min_length=1, max_length=50, pattern=r'^[A-Za-z\s\-\']+$'
- [ ] Define DOBField: value as date with custom validator to ensure past date only
- [ ] Define GenderField: value as Literal["Male", "Female", "Other", "Unknown"]
- [ ] Create patient_schemas.py with PatientDemographicExtraction composite model
- [ ] Create admission_schemas.py with AdmissionNumberField, TreatmentLocationField, RoomNumberField
- [ ] Create clinical_schemas.py with HBsAgStatusField (enum), HBsAgDateField, HBsAgSourceField (enum)
- [ ] Add HBsAbValueField: value as float with ge=0, le=1000
- [ ] Add HBsAbDateField and HBsAbSourceField with appropriate constraints
- [ ] Implement generic ExtractedField[T] wrapper using Pydantic generics for type-safe confidence wrapping
- [ ] Add field descriptions and examples to all schema fields using Field(description="...")
- [ ] Create __init__.py in schemas/ package exporting all schema classes
- [ ] Write unit tests for each schema with valid and invalid test cases
- [ ] Test ValidationError messages for clarity and actionability
- [ ] Verify Pydantic version is 2.8+ in requirements.txt
- [ ] **[AI Tasks - MANDATORY]** Verify AIR-002 requirements are met (Pydantic 2.8+ schemas with type validation)
- [ ] **[AI Tasks - MANDATORY]** Verify AIR-009 requirements are met (LLM output validation against form schema)
