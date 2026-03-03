# Task - TASK_003

## Requirement Reference
- User Story: us_019
- Story Location: .propel/context/tasks/us_019/us_019.md
- Acceptance Criteria:
    - AC-3: Given STT output is received, When I send text to Azure OpenAI, Then the system calls the API with structured output schema, receives validated response in under 1 second, and extracts clean field value.
    - AC-4: Given API call succeeds, When I receive the response, Then the system validates the structured output against Pydantic schema, ensures type safety, and returns extracted value with confidence score.
- Edge Case:
    - What happens when Azure OpenAI API returns error? (Implement exponential backoff retry; log error details; fallback to manual entry after 3 failed attempts)
    - How does the system handle API rate limiting? (Implement request queue; throttle requests to stay within limits; display "Processing..." message during queue wait)

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
| Library | tenacity | >=8.0 |
| AI/ML | Azure OpenAI GPT-5-mini | 2024-07-18 |

**Note**: All code, and libraries, MUST be compatible with versions above.

## AI References (AI Tasks Only)
| Reference Type | Value |
|----------------|-------|
| **AI Impact** | Yes |
| **AIR Requirements** | AIR-001, AIR-002 |
| **AI Pattern** | Structured Output Extraction |
| **Prompt Template Path** | Server/app/prompts/extraction/ |
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
Implement the Azure OpenAI service layer that handles structured output extraction from conversational text. This service will receive STT (Speech-to-Text) output, send it to Azure OpenAI with structured output schemas, validate responses against Pydantic models, and return extracted values with confidence scores. Includes retry logic, rate limiting handling, and fallback mechanisms.

## Dependent Tasks
- task_001_azure_openai_sdk_setup.md - Must be completed
- task_002_pydantic_structured_output_models.md - Must be completed

## Impacted Components
| Action | Component | Project |
|--------|-----------|---------|
| CREATE | Azure OpenAI extraction service | Server/app/services/extraction_service.py |
| CREATE | Prompt templates | Server/app/prompts/extraction/ |
| CREATE | Guardrails configuration | Server/app/core/guardrails.py |
| MODIFY | Services __init__.py | Server/app/services/__init__.py |

## Implementation Plan
1. **Create prompt templates directory** - Define system and user prompts for field extraction
2. **Implement guardrails module** - Input sanitization and output validation logic
3. **Create ExtractionService class** - Main service for Azure OpenAI structured output calls
4. **Implement extract_field method** - Generic method for single field extraction
5. **Implement extract_patient_data method** - Composite extraction for all patient fields
6. **Add rate limiting handler** - Request queue with throttling
7. **Implement fallback logic** - Return manual entry flag after 3 failed attempts
8. **Add audit logging** - Log prompts/responses with PII redaction

**Focus on how to implement**

## Current Project State
```
Server/
├── app/
│   ├── core/
│   │   ├── config.py
│   │   ├── azure_openai.py    # From task_001
│   │   └── middleware.py
│   ├── models/
│   │   ├── structured_outputs.py  # From task_002
│   │   └── ...
│   ├── services/
│   │   └── __init__.py        # (MODIFY)
│   └── ...
└── requirements.txt
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | Server/app/prompts/extraction/system_prompt.txt | System prompt for field extraction |
| CREATE | Server/app/prompts/extraction/field_extraction.txt | User prompt template for field extraction |
| CREATE | Server/app/core/guardrails.py | Input sanitization and output validation functions |
| CREATE | Server/app/services/extraction_service.py | ExtractionService class with structured output extraction |
| MODIFY | Server/app/services/__init__.py | Export ExtractionService |

## External References
- [Azure OpenAI Structured Outputs](https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/structured-outputs)
- [OpenAI Python SDK Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs)
- [Rate Limiting Best Practices](https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/quota)

## Build Commands
```bash
cd Server
python -c "from app.services.extraction_service import ExtractionService; print('Service initialized')"
pytest tests/test_extraction_service.py -v
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
- [ ] Create Server/app/prompts/extraction/ directory with system_prompt.txt and field_extraction.txt
- [ ] Implement guardrails.py with sanitize_input() and validate_output() functions
- [ ] Create ExtractionService class with dependency injection for AzureOpenAIClient
- [ ] Implement extract_field(text: str, field_type: FieldType) -> ExtractionResult method
- [ ] Implement extract_patient_data(text: str) -> PatientFieldExtraction method
- [ ] Add @retry decorator with exponential backoff (max 3 attempts)
- [ ] Implement rate limiting with asyncio.Semaphore for concurrent request control
- [ ] Add fallback_to_manual flag in response when all retries exhausted
- [ ] Implement audit logging with PII redaction (mask MRN, DOB in logs)
