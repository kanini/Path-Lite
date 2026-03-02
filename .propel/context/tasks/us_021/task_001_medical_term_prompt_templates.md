# Task - TASK_001

## Requirement Reference
- User Story: US_021
- Story Location: .propel/context/tasks/us_021/us_021.md
- Acceptance Criteria:  
    - AC-1: Include few-shot examples for medical terms (HBsAg, Treatment Location, Gender)
    - AC-2: Include field context and expected format guidance
    - AC-4: Handle variations ("Hep B positive" → "Positive", "male patient" → "Male", "operating room" → "OR")
- Edge Case:
    - Include abbreviation mappings in prompt ("Hep B" → "HBsAg", "OR" → "Operating Room")

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
| **AIR Requirements** | AIR-008 (Prompt Quality), AIR-009 (Medical Term Accuracy) |
| **AI Pattern** | Few-Shot Learning / Structured Output |
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
Design and implement comprehensive prompt templates for medical terminology extraction using few-shot learning. The templates will guide Azure OpenAI to accurately extract domain-specific healthcare terms with >95% accuracy by providing context-aware examples, abbreviation mappings, and expected output formats.

**Core Capabilities:**
- Few-shot examples for medical terms (HBsAg, Treatment Location, Gender)
- Field context and format guidance
- Abbreviation expansion mappings
- Variation handling (synonyms, colloquialisms)
- Structured output schema definitions
- Validation rules for medical term enums

## Dependent Tasks
- US_020 (LLM Data Cleaning Pipeline) - Prompt infrastructure established
- US_019 (Azure OpenAI Integration) - MUST be completed first

## Impacted Components
**NEW Components:**
- `Server/app/prompts/medical_terms/__init__.py` - Medical term prompts package
- `Server/app/prompts/medical_terms/hbsag_extraction.txt` - HBsAg status extraction prompt
- `Server/app/prompts/medical_terms/treatment_location_extraction.txt` - Treatment location prompt
- `Server/app/prompts/medical_terms/gender_extraction.txt` - Gender extraction prompt
- `Server/app/prompts/medical_terms/abbreviation_mappings.yaml` - Medical abbreviation dictionary
- `Server/app/prompts/medical_terms/field_schemas.yaml` - Medical field enum definitions
- `Server/app/prompts/medical_terms/README.md` - Prompt engineering documentation

**MODIFIED Components:**
- None (new prompt templates only)

## Implementation Plan

### 1. Research Medical Terminology Standards
- Review HIPAA-compliant medical terminology standards
- Identify common abbreviations in healthcare (Hep B, OR, ICU, ER)
- Document standard enum values for each field type
- Research variation patterns in conversational medical terms

### 2. Design Abbreviation Mapping Dictionary
- Create YAML file with medical abbreviation mappings
- Include bidirectional mappings (abbreviation ↔ full term)
- Cover HBsAg variations (Hep B, Hepatitis B, HBV)
- Cover treatment locations (OR, Operating Room, Surgery)
- Cover gender variations (M, Male, F, Female)

### 3. Define Field Schema Enums
- Create YAML file with valid enum values per field
- HBsAg: [Positive, Negative, Unknown]
- Treatment Location: [OR, Bedside, ICU-CCU, ER, Multi-Tx Room]
- Gender: [Male, Female]
- Include validation rules and constraints

### 4. Create HBsAg Extraction Prompt Template
- Design system message with medical context
- Include 5+ few-shot examples covering variations
- Add field context: "Extract HBsAg status from patient response"
- Define structured output schema (status, confidence)
- Include abbreviation handling instructions
- Add validation rules against enum values

### 5. Create Treatment Location Extraction Prompt
- Design system message for location extraction
- Include 5+ few-shot examples (OR, Bedside, ICU-CCU, ER, Multi-Tx Room)
- Handle abbreviations (OR → Operating Room)
- Define structured output schema
- Add multi-location handling logic

### 6. Create Gender Extraction Prompt
- Design system message for gender extraction
- Include 5+ few-shot examples (male patient, female, M, F)
- Handle variations and pronouns
- Define structured output schema
- Add sensitivity and privacy considerations

### 7. Document Prompt Engineering Guidelines
- Create README with prompt design principles
- Document few-shot example selection criteria
- Include prompt testing methodology
- Add version control guidelines for prompts
- Document accuracy measurement approach

## Current Project State
```
Server/
├── app/
│   ├── prompts/
│   │   └── data_cleaning/ (created in US_020)
│   │       ├── __init__.py
│   │       ├── filler_removal.txt
│   │       ├── text_normalization.txt
│   │       └── date_normalization.txt
│   ├── core/
│   │   ├── config.py
│   │   └── guardrails.py
│   └── models/
│       └── data_cleaning.py
└── requirements.txt
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | Server/app/prompts/medical_terms/__init__.py | Medical term prompts package initialization |
| CREATE | Server/app/prompts/medical_terms/hbsag_extraction.txt | HBsAg status extraction prompt with few-shot examples |
| CREATE | Server/app/prompts/medical_terms/treatment_location_extraction.txt | Treatment location extraction prompt |
| CREATE | Server/app/prompts/medical_terms/gender_extraction.txt | Gender extraction prompt |
| CREATE | Server/app/prompts/medical_terms/abbreviation_mappings.yaml | Medical abbreviation dictionary |
| CREATE | Server/app/prompts/medical_terms/field_schemas.yaml | Medical field enum definitions |
| CREATE | Server/app/prompts/medical_terms/README.md | Prompt engineering documentation |

## External References
- [Few-Shot Learning with LLMs](https://platform.openai.com/docs/guides/prompt-engineering/strategy-provide-examples)
- [Azure OpenAI Best Practices](https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/prompt-engineering)
- [HIPAA Medical Terminology Standards](https://www.hhs.gov/hipaa/for-professionals/index.html)
- [HL7 FHIR Terminology](https://www.hl7.org/fhir/terminologies.html)
- [Prompt Engineering Guide](https://www.promptingguide.ai/techniques/fewshot)

## Build Commands
```bash
# Validate YAML files
cd Server/app/prompts/medical_terms
python -m yaml abbreviation_mappings.yaml
python -m yaml field_schemas.yaml

# Test prompt templates
pytest tests/test_medical_term_prompts.py -v
```

## Implementation Validation Strategy
- [ ] All prompt templates created with 5+ few-shot examples
- [ ] Abbreviation mappings cover common medical terms
- [ ] Field schemas define valid enum values
- [ ] **[AI Tasks]** Prompt templates validated with test inputs
- [ ] **[AI Tasks]** Guardrails tested for input sanitization and output validation
- [ ] **[AI Tasks]** Fallback logic tested with low-confidence/error scenarios
- [ ] **[AI Tasks]** Token budget enforcement verified
- [ ] **[AI Tasks]** Audit logging verified (no PII in logs)
- [ ] Few-shot examples cover variation patterns
- [ ] Structured output schemas defined
- [ ] Documentation complete and clear

## Implementation Checklist
- [ ] Research medical terminology standards
  - [ ] Review HIPAA-compliant terminology
  - [ ] Document common medical abbreviations
  - [ ] Identify variation patterns
- [ ] Create `Server/app/prompts/medical_terms/` directory
- [ ] Create `Server/app/prompts/medical_terms/__init__.py`
- [ ] Create `Server/app/prompts/medical_terms/abbreviation_mappings.yaml`
  - [ ] Add HBsAg variations (Hep B, Hepatitis B, HBV, HBsAg)
  - [ ] Add treatment locations (OR/Operating Room, ICU/Intensive Care Unit, ER/Emergency Room)
  - [ ] Add gender variations (M/Male, F/Female)
  - [ ] Include bidirectional mappings
- [ ] Create `Server/app/prompts/medical_terms/field_schemas.yaml`
  - [ ] Define HBsAg enum: [Positive, Negative, Unknown]
  - [ ] Define Treatment Location enum: [OR, Bedside, ICU-CCU, ER, Multi-Tx Room]
  - [ ] Define Gender enum: [Male, Female]
  - [ ] Add validation rules per field
- [ ] Create `Server/app/prompts/medical_terms/hbsag_extraction.txt`
  - [ ] Write system message with medical context
  - [ ] Add 5+ few-shot examples:
    - [ ] "Patient is Hep B positive" → Positive
    - [ ] "HBsAg test came back negative" → Negative
    - [ ] "Hepatitis B status unknown" → Unknown
    - [ ] "The patient has hepatitis B" → Positive
    - [ ] "No HBV detected" → Negative
  - [ ] Define structured output schema (status, confidence, raw_text)
  - [ ] Include abbreviation handling instructions
  - [ ] Add enum validation rules
- [ ] Create `Server/app/prompts/medical_terms/treatment_location_extraction.txt`
  - [ ] Write system message for location extraction
  - [ ] Add 5+ few-shot examples:
    - [ ] "Patient is in the operating room" → OR
    - [ ] "Treatment at bedside" → Bedside
    - [ ] "Admitted to ICU-CCU" → ICU-CCU
    - [ ] "ER visit" → ER
    - [ ] "Multiple treatment rooms" → Multi-Tx Room
  - [ ] Define structured output schema
  - [ ] Include abbreviation expansion
  - [ ] Add multi-location handling logic
- [ ] Create `Server/app/prompts/medical_terms/gender_extraction.txt`
  - [ ] Write system message for gender extraction
  - [ ] Add 5+ few-shot examples:
    - [ ] "The patient is male" → Male
    - [ ] "Female patient" → Female
    - [ ] "M" → Male
    - [ ] "F" → Female
    - [ ] "He was admitted" → Male
  - [ ] Define structured output schema
  - [ ] Add privacy and sensitivity notes
  - [ ] Include pronoun handling
- [ ] Create `Server/app/prompts/medical_terms/README.md`
  - [ ] Document prompt design principles
  - [ ] Explain few-shot example selection criteria
  - [ ] Include prompt testing methodology
  - [ ] Add version control guidelines
  - [ ] Document accuracy measurement (>95% target)
  - [ ] Include troubleshooting guide
- [ ] **[AI Tasks - MANDATORY]** Reference prompt templates from AI References table during implementation
- [ ] **[AI Tasks - MANDATORY]** Implement and test guardrails before marking task complete
- [ ] **[AI Tasks - MANDATORY]** Verify AIR-008 and AIR-009 requirements are met (prompt quality, medical accuracy)
