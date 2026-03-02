# Task - TASK_004

## Requirement Reference
- User Story: US_019
- Story Location: .propel/context/tasks/us_019/us_019.md
- Acceptance Criteria:  
    - AC-3: Given STT output is received, When I send text to Azure OpenAI, Then the system calls the API with structured output schema, receives validated response in under 1 second, and extracts clean field value.
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
| Library | openai, Pydantic | 1.0+, 2.8+ |
| AI/ML | Azure OpenAI GPT-4o-mini | gpt-4o-mini-2024-07-18 |

**Note**: All code, and libraries, MUST be compatible with versions above.

## AI References (AI Tasks Only)
| Reference Type | Value |
|----------------|-------|
| **AI Impact** | Yes |
| **AIR Requirements** | AIR-005, AIR-009 |
| **AI Pattern** | Structured Outputs |
| **Prompt Template Path** | Server/app/prompts/data_cleaning_prompts.py |
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
Implement LLM-based data cleaning pipeline to remove filler words, normalize formatting, and extract relevant values from conversational STT transcriptions. This task creates a preprocessing layer that cleans raw voice input before field extraction, handling common speech patterns (um, uh, like), normalizing date formats (January 15 1980 -> 2024-01-15), standardizing name capitalization, and removing irrelevant conversational context. The pipeline improves extraction accuracy by providing clean, normalized input to the structured output extraction service.

## Dependent Tasks
- TASK_001 (Azure OpenAI SDK Setup) - MUST be completed for Azure OpenAI client
- TASK_002 (Pydantic Schema Models) - MUST be completed for validation schemas

## Impacted Components
- **NEW**: `Server/app/services/data_cleaning_service.py` - Data cleaning orchestration service
- **NEW**: `Server/app/prompts/data_cleaning_prompts.py` - Data cleaning prompt templates
- **NEW**: `Server/app/utils/text_normalizer.py` - Text normalization utilities (regex-based fallback)
- **MODIFY**: `Server/app/services/field_extraction_service.py` - Integrate data cleaning before extraction
- **NEW**: `Server/tests/test_data_cleaning.py` - Unit tests for data cleaning service

## Implementation Plan
1. **Create Data Cleaning Prompts**: Define system prompts for filler word removal, format normalization, and value extraction
2. **Implement Text Normalizer Utility**: Create regex-based fallback for common cleaning patterns (remove "um", "uh", "like", normalize whitespace)
3. **Create Data Cleaning Service**: Implement service layer with clean_transcription() method using LLM for intelligent cleaning
4. **Add Field-Specific Cleaning**: Implement specialized cleaning for dates (normalize to ISO 8601), names (title case), MRN (extract digits only)
5. **Integrate with Field Extraction**: Update FieldExtractionService to call DataCleaningService before extraction
6. **Add Cleaning Validation**: Verify cleaned output maintains semantic meaning and doesn't lose critical information
7. **Implement Fallback Logic**: Use regex-based TextNormalizer when LLM cleaning fails or times out

## Current Project State
```
Server/
├── app/
│   ├── services/
│   │   ├── azure_openai_service.py
│   │   └── field_extraction_service.py (from TASK_003)
│   ├── prompts/
│   │   └── field_extraction_prompts.py
│   ├── utils/
│   │   ├── input_sanitizer.py
│   │   └── rate_limiter.py
│   └── models/
│       └── schemas/
└── tests/
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | d:\Path_Lite\Server\app\prompts\data_cleaning_prompts.py | System prompts for data cleaning with examples |
| CREATE | d:\Path_Lite\Server\app\utils\text_normalizer.py | Regex-based text normalization fallback utility |
| CREATE | d:\Path_Lite\Server\app\services\data_cleaning_service.py | Data cleaning orchestration service with LLM integration |
| MODIFY | d:\Path_Lite\Server\app\services\field_extraction_service.py | Add data cleaning step before field extraction |
| CREATE | d:\Path_Lite\Server\tests\test_data_cleaning.py | Unit tests for data cleaning service and text normalizer |

## External References
- [Azure OpenAI Text Completion](https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/completions)
- [Python Regex Documentation](https://docs.python.org/3/library/re.html)
- [ISO 8601 Date Format](https://en.wikipedia.org/wiki/ISO_8601)
- [Text Normalization Techniques](https://en.wikipedia.org/wiki/Text_normalization)

## Build Commands
```bash
# Install dependencies
cd Server
pip install -r requirements.txt

# Run unit tests
pytest tests/test_data_cleaning.py -v

# Test data cleaning endpoint
curl -X POST http://localhost:8000/api/v1/ai/clean-text \
  -H "Content-Type: application/json" \
  -d '{"text": "Um, my medical record number is, like, 1 2 3 4 5 6"}'
```

## Implementation Validation Strategy
- [ ] Unit tests pass
- [ ] Integration tests pass (if applicable)
- [ ] **[AI Tasks]** Prompt templates validated with test inputs
- [ ] **[AI Tasks]** Guardrails tested for input sanitization and output validation
- [ ] **[AI Tasks]** Fallback logic tested with low-confidence/error scenarios
- [ ] **[AI Tasks]** Token budget enforcement verified
- [ ] **[AI Tasks]** Audit logging verified (no PII in logs)
- [ ] Filler words removed correctly (um, uh, like, you know)
- [ ] Date normalization works for common formats (January 15 1980 -> 1980-01-15)
- [ ] Name capitalization standardized (john smith -> John Smith)
- [ ] MRN extraction handles spaced digits (1 2 3 4 5 6 -> 123456)
- [ ] Regex fallback activates when LLM cleaning fails
- [ ] Cleaned text maintains semantic meaning (no information loss)
- [ ] Cleaning completes in <500ms to maintain <1s total latency budget

## Implementation Checklist
- [ ] Create data_cleaning_prompts.py with CLEANING_SYSTEM_PROMPT constant
- [ ] Add few-shot examples: "Input: Um, my MRN is, like, 1 2 3 4 5 6 -> Output: My MRN is 123456"
- [ ] Add few-shot examples: "Input: I was born on January 15, 1980 -> Output: I was born on 1980-01-15"
- [ ] Add few-shot examples: "Input: My name is john smith -> Output: My name is John Smith"
- [ ] Create text_normalizer.py with TextNormalizer class
- [ ] Implement remove_filler_words() method with regex patterns for um, uh, like, you know, etc.
- [ ] Implement normalize_whitespace() method to collapse multiple spaces to single space
- [ ] Implement normalize_dates() method with regex for common date patterns (MM/DD/YYYY, Month DD YYYY)
- [ ] Implement normalize_names() method with title case conversion
- [ ] Implement extract_digits() method to remove spaces from digit sequences
- [ ] Create DataCleaningService class in data_cleaning_service.py
- [ ] Implement clean_transcription() method accepting raw_text: str and field_type: str
- [ ] Use field_type to apply field-specific cleaning rules (dates for DOB, digits for MRN, title case for names)
- [ ] Call Azure OpenAI with cleaning prompt + raw_text for intelligent cleaning
- [ ] Add timeout of 500ms for LLM cleaning to maintain latency budget
- [ ] Implement fallback to TextNormalizer.remove_filler_words() + normalize_whitespace() on LLM failure/timeout
- [ ] Validate cleaned output is not empty and maintains minimum semantic content
- [ ] Log cleaning operations with before/after text length, cleaning method (LLM/regex), and duration
- [ ] Update FieldExtractionService.extract_field() to call DataCleaningService.clean_transcription() before extraction
- [ ] Add cleaned_text field to audit logs for traceability
- [ ] Write unit tests for TextNormalizer with various filler word patterns
- [ ] Write unit tests for date normalization with formats: MM/DD/YYYY, Month DD YYYY, DD-MM-YYYY
- [ ] Write unit tests for name normalization with lowercase, uppercase, mixed case inputs
- [ ] Write integration tests for DataCleaningService with mocked Azure OpenAI responses
- [ ] Test fallback logic by simulating LLM timeout
- [ ] Verify cleaning latency <500ms with performance profiling
- [ ] Test edge cases: empty input, only filler words, very long transcriptions (>500 chars)
- [ ] **[AI Tasks - MANDATORY]** Reference prompt templates from data_cleaning_prompts.py during implementation
- [ ] **[AI Tasks - MANDATORY]** Implement and test guardrails before marking task complete
- [ ] **[AI Tasks - MANDATORY]** Verify AIR-005 and AIR-009 requirements are met
