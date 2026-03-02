# Task - TASK_005

## Requirement Reference
- User Story: US_019
- Story Location: .propel/context/tasks/us_019/us_019.md
- Acceptance Criteria:  
    - AC-3: Given STT output is received, When I send text to Azure OpenAI, Then the system calls the API with structured output schema, receives validated response in under 1 second, and extracts clean field value.
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
| Library | Pydantic, structlog | 2.8+, 24.1+ |
| AI/ML | Azure OpenAI GPT-4o-mini | gpt-4o-mini-2024-07-18 |

**Note**: All code, and libraries, MUST be compatible with versions above.

## AI References (AI Tasks Only)
| Reference Type | Value |
|----------------|-------|
| **AI Impact** | Yes |
| **AIR Requirements** | AIR-011, AIR-013 |
| **AI Pattern** | Structured Outputs |
| **Prompt Template Path** | N/A (Logging infrastructure task) |
| **Guardrails Config** | N/A (Logging infrastructure task) |
| **Model Provider** | Azure OpenAI |

## Mobile References (Mobile Tasks Only)
| Reference Type | Value |
|----------------|-------|
| **Mobile Impact** | No |
| **Platform Target** | N/A |
| **Min OS Version** | N/A |
| **Mobile Framework** | N/A |

## Task Overview
Implement comprehensive audit logging for all Azure OpenAI interactions to meet HIPAA compliance requirements (NFR-014, AIR-011). This task creates structured logging infrastructure that captures all LLM prompts, responses, confidence scores, extraction results, and errors while ensuring PII redaction. The logging system uses structlog for structured JSON logging with fields: timestamp, request_id, user_id, field_type, prompt_hash (not full prompt to avoid PII), response_confidence, extraction_success, error_details, and processing_duration. Logs are written to separate audit log files with 6-year retention policy.

## Dependent Tasks
- TASK_003 (Structured Output Integration) - MUST be completed for field extraction service

## Impacted Components
- **NEW**: `Server/app/core/audit_logger.py` - Audit logging configuration and utilities
- **NEW**: `Server/app/utils/pii_redactor.py` - PII redaction utility for log sanitization
- **NEW**: `Server/app/models/audit_log.py` - Audit log Pydantic models
- **MODIFY**: `Server/app/services/field_extraction_service.py` - Add audit logging to extraction operations
- **MODIFY**: `Server/app/services/azure_openai_service.py` - Add audit logging to API calls
- **MODIFY**: `Server/requirements.txt` - Add structlog dependency
- **NEW**: `Server/logs/audit/` - Audit log directory with rotation configuration

## Implementation Plan
1. **Add Structlog Dependency**: Add structlog>=24.1 to requirements.txt for structured JSON logging
2. **Create Audit Logger Configuration**: Configure structlog with JSON renderer, timestamp processor, and log level filtering
3. **Define Audit Log Models**: Create Pydantic models for AIInteractionLog with all required fields
4. **Implement PII Redactor**: Create utility to detect and redact PII patterns (MRN, names, DOB) from log messages
5. **Add Audit Logging to Field Extraction**: Instrument FieldExtractionService with audit log calls for all extraction attempts
6. **Add Audit Logging to Azure OpenAI Service**: Instrument API calls with request/response logging (hash prompts, redact PII)
7. **Configure Log Rotation**: Set up log rotation with 100MB file size limit and 6-year retention
8. **Add Request ID Tracking**: Ensure request_id from RequestIDMiddleware is included in all audit logs

## Current Project State
```
Server/
├── app/
│   ├── services/
│   │   ├── field_extraction_service.py (from TASK_003)
│   │   ├── azure_openai_service.py
│   │   └── data_cleaning_service.py
│   ├── core/
│   │   ├── middleware.py (has RequestIDMiddleware)
│   │   └── config.py
│   └── utils/
│       ├── input_sanitizer.py
│       └── rate_limiter.py
└── requirements.txt
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| MODIFY | d:\Path_Lite\Server\requirements.txt | Add structlog>=24.1 for structured logging |
| CREATE | d:\Path_Lite\Server\app\core\audit_logger.py | Audit logger configuration with structlog setup |
| CREATE | d:\Path_Lite\Server\app\utils\pii_redactor.py | PII detection and redaction utility |
| CREATE | d:\Path_Lite\Server\app\models\audit_log.py | Pydantic models for audit log entries |
| MODIFY | d:\Path_Lite\Server\app\services\field_extraction_service.py | Add audit logging to extract_field() method |
| MODIFY | d:\Path_Lite\Server\app\services\azure_openai_service.py | Add audit logging to extract_field_with_schema() method |
| CREATE | d:\Path_Lite\Server\logs\audit\.gitkeep | Create audit log directory (logs excluded from git) |
| CREATE | d:\Path_Lite\Server\.gitignore | Add logs/ directory to gitignore |

## External References
- [Structlog Documentation](https://www.structlog.org/en/stable/)
- [HIPAA Audit Log Requirements](https://www.hhs.gov/hipaa/for-professionals/security/laws-regulations/index.html)
- [Python Logging Best Practices](https://docs.python.org/3/howto/logging.html)
- [PII Detection Patterns](https://en.wikipedia.org/wiki/Personal_data)
- [Log Rotation with Python](https://docs.python.org/3/library/logging.handlers.html#rotatingfilehandler)

## Build Commands
```bash
# Install dependencies
cd Server
pip install -r requirements.txt

# Create audit log directory
mkdir -p logs/audit

# Run development server
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000

# View audit logs
tail -f logs/audit/ai_interactions.log
```

## Implementation Validation Strategy
- [ ] Unit tests pass
- [ ] Integration tests pass (if applicable)
- [ ] **[AI Tasks]** Prompt templates validated with test inputs (N/A for logging infrastructure)
- [ ] **[AI Tasks]** Guardrails tested for input sanitization and output validation (N/A for logging infrastructure)
- [ ] **[AI Tasks]** Fallback logic tested with low-confidence/error scenarios (N/A for logging infrastructure)
- [ ] **[AI Tasks]** Token budget enforcement verified (N/A for logging infrastructure)
- [ ] **[AI Tasks]** Audit logging verified (no PII in logs)
- [ ] Audit logs written to logs/audit/ai_interactions.log in JSON format
- [ ] All required fields present in audit log entries (timestamp, request_id, user_id, field_type, etc.)
- [ ] PII redaction works correctly for MRN, names, DOB patterns
- [ ] Prompt hashing prevents full prompt storage while maintaining traceability
- [ ] Request ID from RequestIDMiddleware included in all audit logs
- [ ] Log rotation activates at 100MB file size
- [ ] Audit logs are human-readable JSON with proper formatting
- [ ] No PII present in audit log files after redaction

## Implementation Checklist
- [ ] Add structlog>=24.1 to requirements.txt
- [ ] Create app/core/audit_logger.py with structlog configuration
- [ ] Configure structlog processors: TimeStamper(fmt="iso"), StackInfoRenderer(), JSONRenderer()
- [ ] Set log level to INFO for audit logs (capture all AI interactions)
- [ ] Configure file handler with RotatingFileHandler (maxBytes=100MB, backupCount=72 for 6-year retention)
- [ ] Set log file path to logs/audit/ai_interactions.log
- [ ] Create app/models/audit_log.py with AIInteractionLog Pydantic model
- [ ] Define fields: timestamp (datetime), request_id (str), user_id (str), field_type (str), prompt_hash (str), response_confidence (float), extraction_success (bool), error_details (Optional[str]), processing_duration_ms (int)
- [ ] Create app/utils/pii_redactor.py with PIIRedactor class
- [ ] Implement detect_mrn() method with regex pattern r'\b\d{6,10}\b'
- [ ] Implement detect_names() method with pattern r'\b[A-Z][a-z]+\s[A-Z][a-z]+\b'
- [ ] Implement detect_dob() method with pattern r'\b\d{4}-\d{2}-\d{2}\b' and r'\b\d{2}/\d{2}/\d{4}\b'
- [ ] Implement redact() method replacing detected PII with [REDACTED_MRN], [REDACTED_NAME], [REDACTED_DOB]
- [ ] Implement hash_prompt() utility using hashlib.sha256 to create prompt hash
- [ ] Update FieldExtractionService.extract_field() to log extraction attempts
- [ ] Log before extraction: field_type, prompt_hash, request_id, user_id
- [ ] Log after extraction: response_confidence, extraction_success, processing_duration_ms
- [ ] Log on error: error_details with exception type and message (redacted)
- [ ] Update AzureOpenAIService.extract_field_with_schema() to log API calls
- [ ] Log API request: model_version, schema_name, request_id
- [ ] Log API response: response_time_ms, token_usage (if available)
- [ ] Use PIIRedactor.redact() on all log messages before writing
- [ ] Ensure request_id from context (RequestIDMiddleware) is included in all logs
- [ ] Create logs/audit/ directory with .gitkeep file
- [ ] Add logs/ to .gitignore to prevent committing log files
- [ ] Write unit tests for PIIRedactor with test cases for MRN, names, DOB detection
- [ ] Write integration tests for audit logging with mocked field extraction
- [ ] Verify audit log JSON structure matches AIInteractionLog schema
- [ ] Test log rotation by generating >100MB of logs
- [ ] Manually inspect audit logs to confirm no PII present
- [ ] Verify all AI interactions logged (successful extractions, failures, retries)
- [ ] **[AI Tasks - MANDATORY]** Verify AIR-011 requirements are met (all AI interactions logged)
- [ ] **[AI Tasks - MANDATORY]** Verify AIR-013 requirements are met (input sanitization before logging)
