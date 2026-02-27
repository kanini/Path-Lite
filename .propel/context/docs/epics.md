# Epic Decomposition

## Epic Summary Table

| Epic ID | Epic Title | Mapped Requirement IDs |
|---------|------------|------------------------|
| EP-001 | Project Foundation & Technical Infrastructure | TR-001, TR-002, TR-003, TR-020, NFR-030, NFR-031, NFR-032 |
| EP-002 | Mock Data Layer & Local Storage | DR-001, DR-002, DR-003, DR-004, DR-005, DR-006, DR-007, DR-008, DR-009, DR-010, TR-003, TR-012 |
| EP-003 | Authentication & Session Management | FR-001, FR-002, FR-003, FR-004, NFR-013, NFR-015, TR-009, TR-012 |
| EP-004 | Hospital & Patient Management | FR-005, FR-006, FR-007, FR-008, FR-009, FR-010, FR-011, FR-012, FR-013, FR-014, FR-015 |
| EP-005 | AI Conversational Interface Foundation | FR-016, FR-017, FR-018, FR-023, AIR-003, AIR-004, TR-005, TR-006, NFR-002, NFR-007, NFR-021 |
| EP-006 | LLM Data Extraction & Cleaning Pipeline | FR-019, FR-020, FR-021, FR-022, FR-024, FR-025, FR-026, FR-027, FR-028, FR-029, AIR-001, AIR-002, AIR-005, AIR-008, AIR-009, TR-004, TR-007, NFR-003 |
| EP-007 | Multi-Layer Validation Engine | FR-030, FR-031, FR-032, FR-033, FR-034, FR-035, FR-036, FR-037, FR-038, FR-039, FR-040, FR-041, TR-008, NFR-004 |
| EP-008 | Clarification & Intent Detection | FR-042, FR-043, FR-044, FR-045, FR-046, FR-047, FR-048, FR-049, FR-050, FR-051, AIR-006, AIR-007 |
| EP-009 | Session Continuity & Resume Capability | FR-052, FR-053, FR-054, FR-055, FR-056, FR-057, TR-012, NFR-028, NFR-029 |
| EP-010 | AI-Driven Review & Error Correction | FR-058, FR-059, FR-060, FR-061, FR-062, FR-063, FR-064, FR-065, FR-066, FR-067, FR-068, FR-069, FR-070, FR-071, FR-072 |
| EP-011 | Confirmation Screen & Manual Editing | FR-098, FR-099, FR-100, FR-101, FR-102, FR-103, FR-104, FR-105, FR-106, FR-107 |
| EP-012 | Report Generation & Final Submission | FR-073, FR-074, FR-075, FR-076, FR-077, FR-078, FR-079, FR-080, FR-081, FR-082, FR-083, FR-084 |
| EP-013 | Hemodialysis Form Schema & Data Model | FR-085, FR-086, TR-011 |
| EP-014 | Responsive UI/UX for Tablets | FR-087, FR-088, FR-089, FR-090, FR-091, FR-092, NFR-006, NFR-009, NFR-010, NFR-017, NFR-018, NFR-019, NFR-020, TR-019 |
| EP-015 | Security & Compliance | NFR-011, NFR-012, NFR-014, NFR-016, TR-010, TR-015, AIR-013 |
| EP-016 | Audit Logging & Compliance Tracking | FR-093, FR-094, FR-095, FR-096, FR-097, NFR-014, DR-010, TR-013, AIR-011 |
| EP-017 | Performance Optimization & Reliability | NFR-001, NFR-005, NFR-026, NFR-027, AIR-012, AIR-014, AIR-015, AIR-017, TR-014, TR-016, TR-017 |
| EP-018 | Scalability & Extensibility Architecture | NFR-022, NFR-023, NFR-024, NFR-025, TR-011 |
| EP-019 | Error Handling & Graceful Degradation | NFR-008, NFR-027, AIR-010, TR-018 |

**Notes:**
1. **Green-field Project Detected**: No existing codebase found. EP-001 (Project Foundation) is first epic with highest priority.
2. **EP-DATA Triggered**: DR-001 through DR-010 requirements present in design.md. EP-002 (Mock Data Layer) created as critical dependency.
3. **Zero Orphaned Requirements**: All 107 FR requirements, 32 NFR requirements, 20 TR requirements, 10 DR requirements, and 17 AIR requirements mapped to epics.
4. **No [UNCLEAR] Requirements**: All requirements are well-defined and ready for epic mapping.
5. **Epic Ordering**: Prioritized by business value and dependency (infrastructure → data → features → optimization).

---

## Epic Descriptions

### EP-001: Project Foundation & Technical Infrastructure
**Business Value**: Establishes development environment and project scaffolding to enable all subsequent development work. Critical foundation for green-field project.

**Description**: Set up React Native mobile application structure (iOS & Android), FastAPI backend API project, development environment configuration, dependency management (Node.js 18+, Python 3.11+, Poetry), code quality tools (ESLint, Prettier, JSDoc), version control workflows, and Azure infrastructure provisioning (App Service for FastAPI, OpenAI service, Application Insights). Includes project scaffolding with modular architecture, navigation setup (React Navigation), and comprehensive documentation (README, setup guides, architecture diagrams).

**UI Impact**: No

**Screen References**: N/A

**Key Deliverables**:
- React Native project scaffolding with iOS and Android configurations
- FastAPI backend project structure with async architecture
- Development environment setup documentation
- Azure infrastructure provisioning scripts
- Code quality tooling (ESLint, Prettier, Jest, pytest)
- Version control workflows and branching strategy
- Comprehensive README and setup guides

**Dependent EPICs**: None (first epic)

---

### EP-002: Mock Data Layer & Local Storage
**Business Value**: Provides encrypted local storage for all mock patient data, session state, and audit logs without database dependency. Enables HIPAA-compliant data protection and session persistence for prototype validation.

**Description**: Implement MMKV-based local storage architecture for mock data only (no database). Create encrypted MMKV instances for mock PHI data (patient demographics, admission data, clinical intake) and separate instance for mock audit logs. Define mock data models (Patient, TreatmentSession, User, Hospital, AuditLog, FormSchema) as JSON structures. Implement data integrity constraints (MRN numeric validation, DOB date validation, email RFC compliance), referential integrity between mock patient records and treatment sessions, data retention policies (session data 24 hours, completed forms indefinite), backup mechanisms (device-level iOS iCloud/Android backup), and mock data export capability for future EHR integration validation.

**UI Impact**: No

**Screen References**: N/A

**Key Deliverables**:
- MMKV integration with AES-256 encryption for mock PHI data
- Separate MMKV instance for mock audit logs
- Mock data models (Patient, TreatmentSession, User, Hospital, AuditLog, FormSchema)
- Data integrity constraint validation functions
- Referential integrity enforcement logic
- Data retention policy implementation
- Device-level backup configuration
- Mock data export utility for future integration

**Dependent EPICs**: EP-001

---

### EP-003: Authentication & Session Management
**Business Value**: Secures application access with nurse authentication and manages session lifecycle with 30-minute timeout. Protects patient data access and ensures compliance with security requirements.

**Description**: Implement JWT-based authentication with hardcoded mock credentials (no database). Create login screen with username/password fields, credential validation against mock authentication data, session token generation with 30-minute expiry, automatic session timeout after inactivity, and redirect to Hospital Selection screen upon successful authentication. Implement secure session state persistence in MMKV with last field index tracking for resume capability. Handle session expiry, logout functionality, and token refresh mechanisms.

**UI Impact**: Yes

**Screen References**: N/A (Login screen, Hospital Selection screen - UI design not in figma_spec.md)

**Key Deliverables**:
- Login screen with username/password authentication
- Mock authentication service with hardcoded credentials
- JWT token generation and validation (jsonwebtoken library)
- Session timeout implementation (30-minute inactivity)
- Session state persistence in MMKV
- Automatic logout on session expiry
- Token refresh mechanism
- Redirect to Hospital Selection after successful login

**Dependent EPICs**: EP-001, EP-002

---

### EP-004: Hospital & Patient Management
**Business Value**: Enables nurses to select hospital context and search for existing patients or create new patient records. Core workflow for initiating patient data entry with MRN-based validation.

**Description**: Implement Hospital Selection screen with searchable list of hardcoded mock hospitals. Create Patient Dashboard displaying all mock patients (Active/Completed) for selected hospital from hardcoded data. Implement "Add New" button to initiate new patient entry workflow with Hemodialysis treatment type selection. Build Patient Recall Search popup with fields (First Name, Last Name, MRN, DOB, Admission/Encounter Number), enforce MRN as mandatory field, enable Search button only when minimum two fields entered including MRN, search hardcoded mock patient records, redirect to treatment page with prefilled mock data if patient exists, or allow new mock patient creation with MRN and details stored in MMKV.

**UI Impact**: Yes

**Screen References**: N/A (Hospital Selection, Patient Dashboard, Patient Recall Search popup - UI design not in figma_spec.md)

**Key Deliverables**:
- Hospital Selection screen with searchable hospital list
- Patient Dashboard with Active/Completed patient list
- "Add New" button with treatment type selection (Hemodialysis)
- Patient Recall Search popup with multi-field search
- MRN mandatory field enforcement
- Search button enable/disable logic (minimum 2 fields including MRN)
- Mock patient record search from hardcoded data
- Redirect to treatment page with prefilled data or new patient creation
- Mock patient data storage in MMKV

**Dependent EPICs**: EP-001, EP-002, EP-003

---

### EP-005: AI Conversational Interface Foundation
**Business Value**: Delivers core voice interaction capability with Text-to-Speech (TTS) and Speech-to-Text (STT) engines. Enables hands-free data entry reducing documentation time by 40-60% and decreasing cognitive load for nurses.

**Description**: Integrate @react-native-voice/voice for Speech-to-Text (native iOS/Android speech recognition) and expo-speech for Text-to-Speech (platform-native synthesis). Implement microphone permission handling, voice capture with noise suppression configuration, TTS activation on form open, sequential question delivery via TTS, STT output capture, and AI voice icon with visual states (active/inactive/listening). Configure voice settings (speech rate, voice selection), audio feedback for user interactions, and single-handed operation support for tablet use.

**UI Impact**: Yes

**Screen References**: N/A (AI voice icon, listening indicator - UI design not in figma_spec.md)

**Key Deliverables**:
- @react-native-voice/voice integration for STT
- expo-speech integration for TTS
- Microphone permission handling (iOS/Android)
- Voice capture with noise suppression
- TTS automatic activation on form open
- Sequential question delivery via TTS
- AI voice icon with visual states (active/inactive/listening)
- Audio feedback for user interactions
- Voice settings configuration (speech rate, voice selection)
- Single-handed operation support

**Dependent EPICs**: EP-001, EP-004

---

### EP-006: LLM Data Extraction & Cleaning Pipeline
**Business Value**: Achieves 95% accuracy in AI-driven data extraction from conversational responses through Azure OpenAI structured outputs. Eliminates manual data entry errors and normalizes natural language input to structured form fields.

**Description**: Integrate Azure OpenAI GPT-5-mini with structured outputs using Pydantic models for data extraction. Implement LLM-based data cleaning pipeline to remove filler words ("the", "is", "was", "patient", "name", "uh", "um", "like"), normalize text casing to proper case for name fields, standardize date formats to MM/DD/YYYY from natural language (e.g., "January 15th, 1980" → "01/15/1980"), preserve numeric values exactly as spoken, remove punctuation except where required (dates, decimals), and extract only relevant answers from conversational responses (e.g., "Patient name is Chaman" → "Chaman"). Implement prompt engineering with few-shot examples for medical terminology extraction, LLM output validation against form schema to prevent hallucinations, and field mapping based on question context.

**UI Impact**: No

**Screen References**: N/A

**Key Deliverables**:
- Azure OpenAI GPT-5-mini integration with structured outputs
- Pydantic models for form field schemas
- LLM data cleaning pipeline (filler word removal, text normalization)
- Date format standardization (natural language → MM/DD/YYYY)
- Conversational response extraction (remove context, keep value)
- Prompt engineering with few-shot examples for medical terms
- LLM output validation against form schema
- Field mapping logic based on question context
- Confidence scoring for extractions

**Dependent EPICs**: EP-001, EP-002, EP-013

---

### EP-007: Multi-Layer Validation Engine
**Business Value**: Ensures data integrity and compliance through comprehensive validation (schema, data type, regex, business rules). Prevents incomplete documentation and reduces data entry errors through mandatory field enforcement.

**Description**: Implement client-side validation engine using Yup validation library to achieve <500ms validation latency. Create multi-layer validation: schema validation (field exists in form schema), data type validation (String, Integer, Date, Enum, Boolean), regex validation patterns (MRN numeric only, Phone pattern check, ID format check, Email RFC-compliant format), and business rules validation. Enforce mandatory field completion before submission (MRN, First Name, Last Name, DOB, Gender, Treatment Location, Room Number, HBsAg, HBsAb). Allow optional fields to be skipped and stored as NULL or default value. Request corrected input via AI voice when validation fails, re-validate field after correction attempt, and prevent form submission if any mandatory field is incomplete.

**UI Impact**: Yes

**Screen References**: N/A (Validation error messages, field highlighting - UI design not in figma_spec.md)

**Key Deliverables**:
- Yup validation library integration
- Schema validation (field existence check)
- Data type validation (String, Integer, Date, Enum, Boolean)
- Regex validation patterns (MRN, Phone, Email, ID formats)
- Business rules validation engine
- Mandatory field enforcement (8 required fields)
- Optional field handling (NULL/default values)
- AI voice validation error announcements
- Re-validation after correction
- Form submission blocking for incomplete mandatory fields

**Dependent EPICs**: EP-001, EP-006, EP-013

---

### EP-008: Clarification & Intent Detection
**Business Value**: Handles nurse clarification requests and no-response scenarios intelligently. Improves user experience by detecting intent ("Repeat", "What do you mean?") and managing session timeouts gracefully.

**Description**: Implement LLM-based intent detection for clarification phrases ("Repeat", "What do you mean?", "I don't understand"), edit intent ("Yes, edit"), and submission intent ("Submit", "Report looks fine, submit"). Rephrase or repeat current question when clarification is requested while maintaining same field context. Implement no-response handling: wait 5 seconds after asking question, repeat question if no response detected, retry up to 3 times, auto-close AI session after 3 failed response attempts, save partial data when session auto-closes, and notify nurse of session closure via TTS and visual notification.

**UI Impact**: Yes

**Screen References**: N/A (Session closure notification - UI design not in figma_spec.md)

**Key Deliverables**:
- LLM-based clarification intent detection
- Question rephrasing logic for clarification requests
- Field context maintenance during clarification exchanges
- No-response detection (5-second wait)
- Question repeat mechanism (up to 3 retries)
- Auto-close session after 3 failed responses
- Partial data save on session auto-close
- TTS and visual notification for session closure
- Edit intent detection for error correction workflow
- Submission intent detection for final submission

**Dependent EPICs**: EP-001, EP-006

---

### EP-009: Session Continuity & Resume Capability
**Business Value**: Provides zero-data-loss resume capability across app interruptions. Enables nurses to pause and resume data entry without losing progress, improving workflow flexibility and user satisfaction.

**Description**: Implement session state persistence with last field index tracking in MMKV. Save partial form data when AI session closes before completion, store last unanswered field index in session state, maintain session state across app interruptions (backgrounding, crashes, timeouts), resume from first unanswered question when session is reopened, preserve all previously answered field values during resume, and prevent restarting conversation from beginning on session resume. Detect incomplete session state on treatment page open, display confirmation "You have an incomplete session. Would you like to resume?", allow "Start Over" option to clear partial data, and handle session expiry (>24 hours old) with automatic cleanup.

**UI Impact**: Yes

**Screen References**: N/A (Session resume confirmation dialog - UI design not in figma_spec.md)

**Key Deliverables**:
- Session state persistence in MMKV (last field index tracking)
- Partial form data save on session close
- Session state maintenance across app interruptions
- Resume from last unanswered question
- Previously answered field value preservation
- Incomplete session detection on treatment page open
- Session resume confirmation dialog
- "Start Over" option to clear partial data
- Session expiry handling (>24 hours)
- Automatic stale session cleanup

**Dependent EPICs**: EP-001, EP-002, EP-005

---

### EP-010: AI-Driven Review & Error Correction
**Business Value**: Validates completed form and guides nurses through error correction using AI-driven workflow. Ensures all fields pass validation before submission, reducing data quality issues and compliance risks.

**Description**: Implement comprehensive review validation triggered by "Please review the form" voice command or Review button click. Perform multi-layer validation (schema, data type, regex, required fields), identify and categorize field-level errors/warnings/mismatched values by section, verbally summarize validation errors with section and field details via TTS, and ask nurse if they want to edit errors. Detect edit intent ("Yes, edit"), navigate to first erroneous field automatically, auto-focus erroneous field for correction, re-ask specific question for erroneous field via TTS, process corrected voice response through STT → LLM cleaning → validation pipeline, update field with corrected value after successful validation, automatically return to Review screen after all corrections, and trigger validation again. Announce "All fields are valid. Do you want to submit?" via TTS when validation passes and enable Continue button.

**UI Impact**: Yes

**Screen References**: N/A (Review screen, error navigation - UI design not in figma_spec.md)

**Key Deliverables**:
- Review validation trigger (voice command or button click)
- Comprehensive validation execution (all layers)
- Error categorization by section and field
- TTS error summary with section/field details
- Edit intent detection
- Automatic navigation to first erroneous field
- Auto-focus erroneous field
- Re-ask question for erroneous field via TTS
- Corrected response processing (STT → LLM → validation)
- Field update after successful correction
- Automatic return to Review screen after corrections
- Re-validation after corrections
- Continue button enable after successful validation

**Dependent EPICs**: EP-001, EP-005, EP-006, EP-007, EP-008

---

### EP-011: Confirmation Screen & Manual Editing
**Business Value**: Provides structured summary page for final review with manual edit capability. Ensures nurses can verify all entered data before submission, reducing errors and improving data quality.

**Description**: Display structured summary page after all mandatory fields are filled. Automatically redirect user to Review accordion/tab upon form completion with clear navigation state in left panel showing current Review tab. Provide edit option for all displayed fields on summary page, allow manual edits to any field from confirmation screen, re-validate all edited fields before accepting changes, display field labels and values in organized sections, highlight mandatory vs optional fields, provide clear visual indication of edit mode vs view mode, and save form data only after explicit confirmation from user.

**UI Impact**: Yes

**Screen References**: N/A (Confirmation/Review screen - UI design not in figma_spec.md)

**Key Deliverables**:
- Structured summary page with all field values
- Automatic redirect to Review tab after form completion
- Left panel navigation state update (Review tab active)
- Edit option for all fields on summary page
- Manual edit capability from confirmation screen
- Re-validation of edited fields
- Organized sections for field display
- Mandatory vs optional field highlighting
- Edit mode vs view mode visual indication
- Explicit confirmation required before save

**Dependent EPICs**: EP-001, EP-007, EP-010

---

### EP-012: Report Generation & Final Submission
**Business Value**: Generates patient report from submitted form data and completes final submission workflow. Provides visual confirmation of data accuracy before saving to local storage.

**Description**: Enable Continue button after successful review validation. Ask "Do you want to continue?" via TTS after review completion and display View Report and Submit buttons after Continue action. Generate report based on submitted mock form data, display generated report when View Report button is clicked, wait for user instruction after displaying report, detect final submission intent ("Report looks fine, submit"), save mock form data to local MMKV storage (no database), generate submission confirmation, announce successful submission via TTS ("Form submitted successfully. Patient record has been saved."), and redirect to Patient Dashboard. Handle report review errors with "Go back" or "Edit form" commands to return to form editing mode.

**UI Impact**: Yes

**Screen References**: N/A (Report view, Submit buttons - UI design not in figma_spec.md)

**Key Deliverables**:
- Continue button enable after successful validation
- TTS prompt "Do you want to continue?"
- View Report and Submit buttons display
- Report generation from mock form data
- Report display screen
- Final submission intent detection
- Mock form data save to MMKV (no database)
- Submission confirmation generation
- TTS success announcement
- Redirect to Patient Dashboard after submission
- "Go back" command handling for report errors

**Dependent EPICs**: EP-001, EP-002, EP-008, EP-010, EP-011

---

### EP-013: Hemodialysis Form Schema & Data Model
**Business Value**: Defines complete form structure for Hemodialysis treatment with field definitions, validation rules, and question templates. Enables modular architecture for future treatment type expansion.

**Description**: Create JSON schema definition for Hemodialysis form with Demographics & Admission fields (MRN, First Name, Middle Initial/Name, Last Name, DOB, Admission/Encounter Number, Gender, Treatment Location, Room Number) and Clinical Intake fields (HBsAg, HBsAg Date Drawn, HBsAg Source, HBsAb Immune Value, HBsAb Date Drawn, HBsAb Source). Define field properties (data type, required/optional, validation rules, regex patterns, enum values) and create JSON question configuration file stored locally containing TTS question templates for all 15 form fields (e.g., "Please provide the Medical Record Number", "What is the patient's first name?"). Configure field ordering for sequential conversation flow (1-15 sequence) and default values. Implement modular form schema architecture with plugin-based design to support future treatment types and PATH Full integration.

**UI Impact**: No

**Screen References**: N/A

**Key Deliverables**:
- Hemodialysis form JSON schema definition
- Demographics & Admission field definitions (9 fields: MRN, First Name, Middle Initial/Name, Last Name, DOB, Admission/Encounter Number, Gender, Treatment Location, Room Number)
- Clinical Intake field definitions (6 fields: HBsAg, HBsAg Date Drawn, HBsAg Source, HBsAb Immune Value, HBsAb Date Drawn, HBsAb Source)
- Field properties (data type, required/optional, validation rules)
- Regex patterns for field validation
- Enum values for dropdown fields (Gender: Male/Female, Treatment Location: OR/Bedside/ICU-CCU/ER/Multi-Tx Room, HBsAg: Positive/Negative/Unknown, HBsAb Source: Hospital/Davita Patient Portal/Non-Davita Source)
- **JSON question configuration file** with TTS question templates for all 15 form fields stored locally for voice interaction
- Field ordering for sequential conversation flow (1-15 sequence)
- Default values for optional fields
- Modular form schema architecture (plugin-based design)

**Dependent EPICs**: EP-001

---

### EP-014: Responsive UI/UX for Tablets
**Business Value**: Delivers intuitive, touch-friendly interface optimized for 7-12.9 inch tablets in both portrait and landscape orientations. Ensures usability in clinical environments with clear visual hierarchy and consistent design patterns.

**Description**: Implement responsive layout supporting 7-12.9 inch tablets in portrait and landscape orientations. Use primary theme color #1566A7 (Blue) consistently throughout application. Implement touch-friendly UI elements with minimum 44x44pt tap targets, maintain clear visual hierarchy and readability in clinical lighting conditions, display AI voice icon with clear visual states (active/inactive/listening), provide simple conversational interface requiring minimal training, provide clear audio feedback for all user interactions, display intuitive error messages with actionable guidance, support single-handed operation for tablet use, and maintain consistent UI patterns across all screens following React Native design guidelines.

**UI Impact**: Yes

**Screen References**: N/A (All screens - UI design not in figma_spec.md)

**Key Deliverables**:
- Responsive layout for 7-12.9 inch tablets (portrait/landscape)
- Primary theme color #1566A7 (Blue) implementation
- Touch-friendly UI elements (minimum 44x44pt tap targets)
- Clear visual hierarchy for clinical lighting conditions
- AI voice icon with visual states (active/inactive/listening)
- Simple conversational interface design
- Clear audio feedback for interactions
- Intuitive error messages with actionable guidance
- Single-handed operation support
- Consistent UI patterns across all screens
- React Native design guidelines compliance

**Dependent EPICs**: EP-001

---

### EP-015: Security & Compliance
**Business Value**: Ensures HIPAA-compliant architecture with end-to-end encryption, secure session management, and input sanitization. Protects patient data and prevents security vulnerabilities.

**Description**: Implement HIPAA-compliant architecture for patient data protection with Azure OpenAI BAA coverage. Encrypt all data transmission using TLS 1.3 or higher for API communications. Implement secure session management with token-based authentication (JWT) and 30-minute timeout. Sanitize all voice input before LLM processing to prevent prompt injection attacks. Implement role-based access control for user permissions (Phase 1: nurse role only). Configure Azure OpenAI with HIPAA BAA verification, data processing in-memory with no retention, and data residency compliance.

**UI Impact**: No

**Screen References**: N/A

**Key Deliverables**:
- HIPAA-compliant architecture design
- Azure OpenAI BAA coverage verification
- TLS 1.3 encryption for all API communications
- JWT-based secure session management
- 30-minute session timeout implementation
- Voice input sanitization before LLM processing
- Prompt injection attack prevention
- Role-based access control (nurse role)
- Azure OpenAI HIPAA configuration
- Data processing in-memory (no retention)
- Data residency compliance verification

**Dependent EPICs**: EP-001, EP-003

---

### EP-016: Audit Logging & Compliance Tracking
**Business Value**: Maintains comprehensive audit trail for all data access and modifications per HIPAA requirements. Enables compliance tracking, troubleshooting, and security incident investigation.

**Description**: Implement structured audit logging with timestamp, user ID, action type, entity type, entity ID, before/after values, and IP address. Log all user actions with timestamp, user ID, and action type in local MMKV storage as mock audit data (no database). Log all data modifications with before/after values, all validation failures with error details, and all AI interactions including questions asked and responses received in local MMKV storage. Maintain mock audit trail in separate encrypted MMKV instance for compliance and troubleshooting purposes with 6-year retention policy.

**UI Impact**: No

**Screen References**: N/A

**Key Deliverables**:
- Structured audit log format (timestamp, user ID, action type, entity type, entity ID, before/after values, IP address)
- User action logging (all actions with timestamp and user ID)
- Data modification logging (before/after values)
- Validation failure logging (error details)
- AI interaction logging (questions and responses)
- Separate encrypted MMKV instance for audit logs
- 6-year retention policy implementation
- Mock audit trail for compliance tracking
- Audit log query and export utilities

**Dependent EPICs**: EP-001, EP-002, EP-003

---

### EP-017: Performance Optimization & Reliability
**Business Value**: Achieves sub-2-second voice interaction latency and 99% uptime during business hours. Ensures reliable, responsive user experience critical for clinical workflow adoption.

**Description**: Maintain response latency under 2 seconds for all voice interactions (STT + LLM + TTS pipeline). Complete voice-to-text conversion in under 1 second using optimized STT engine, AI processing and data extraction in under 1 second using Azure OpenAI structured outputs, and form validation in under 500 milliseconds using client-side validation engine. Handle concurrent voice input without audio interference through proper microphone resource management. Implement exponential backoff retry logic for Azure OpenAI API calls, confidence threshold (>0.85) for LLM extractions with manual review flag for low-confidence values, LLM response caching for identical questions within session to reduce latency and API costs, and rate limiting for Azure OpenAI API calls. Maintain 99% uptime during business hours (8 AM - 8 PM) and gracefully handle network interruptions with automatic retry mechanisms.

**UI Impact**: No

**Screen References**: N/A

**Key Deliverables**:
- Sub-2-second voice interaction latency (STT + LLM + TTS)
- <1 second voice-to-text conversion
- <1 second AI processing and data extraction
- <500ms form validation latency
- Concurrent voice input handling (no audio interference)
- Exponential backoff retry logic for Azure OpenAI
- Confidence threshold (>0.85) for LLM extractions
- Manual review flag for low-confidence values
- LLM response caching for identical questions
- Rate limiting for Azure OpenAI API calls
- 99% uptime during business hours
- Network interruption handling with automatic retry

**Dependent EPICs**: EP-001, EP-005, EP-006, EP-007

---

### EP-018: Scalability & Extensibility Architecture
**Business Value**: Enables future expansion to additional treatment types beyond Hemodialysis and PATH Full integration. Provides modular architecture for feature growth without major refactoring.

**Description**: Implement modular design patterns for feature expansion with plugin-based form schemas. Support future PATH Full integration through modular architecture and clean API boundaries. Use extensible architecture to support additional treatment types beyond Hemodialysis with isolated schema files for each treatment type (field definitions, validation rules, question templates). Support horizontal scaling for increased user load in future phases (not required for Phase 1 prototype).

**UI Impact**: No

**Screen References**: N/A

**Key Deliverables**:
- Modular design patterns (plugin-based architecture)
- Plugin-based form schema system
- Clean API boundaries for PATH Full integration
- Extensible architecture for additional treatment types
- Isolated schema files per treatment type
- Horizontal scaling support design (future phases)
- Feature expansion framework
- Backward compatibility mechanisms

**Dependent EPICs**: EP-001, EP-013

---

### EP-019: Error Handling & Graceful Degradation
**Business Value**: Provides fallback mechanisms for LLM failures and network interruptions. Ensures application remains functional even when AI features are unavailable, preventing workflow disruption.

**Description**: Display intuitive error messages with actionable guidance through conversational AI responses. Gracefully handle network interruptions with automatic retry mechanisms (exponential backoff). Implement fallback mechanisms for LLM failures with graceful degradation to manual entry mode. Preserve session state during app backgrounding or interruptions with MMKV persistence. Provide offline capability for partial data storage when network is unavailable. Display clear connectivity status indicator and provide automatic retry mechanism when connectivity is restored.

**UI Impact**: Yes

**Screen References**: N/A (Error messages, connectivity indicator - UI design not in figma_spec.md)

**Key Deliverables**:
- Intuitive error messages with actionable guidance
- Network interruption handling (exponential backoff)
- LLM failure fallback to manual entry mode
- Session state preservation during app backgrounding
- Offline capability for partial data storage
- Connectivity status indicator
- Automatic retry mechanism on connectivity restore
- Graceful degradation logic
- Error recovery workflows

**Dependent EPICs**: EP-001, EP-005, EP-006, EP-009

---
