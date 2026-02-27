# Architecture Design

## Project Overview

PATH Lite is a cross-platform mobile application (iOS & Android) that transforms manual form-based patient data entry into an AI-driven conversational interface for healthcare professionals. The system enables nurses to complete patient demographic, admission, and Hemodialysis treatment documentation through natural voice interaction, reducing documentation time by 40-60%, minimizing data entry errors, and decreasing cognitive load while maintaining strict HIPAA compliance and validation requirements. This is a prototype phase to validate the AI-driven conversational approach before production deployment.

## Architecture Goals

- **Goal 1**: Deliver sub-2-second voice interaction latency for real-time conversational data entry across STT, LLM processing, and TTS pipeline
- **Goal 2**: Achieve 95% accuracy in AI-driven data extraction from conversational responses through structured LLM outputs and multi-layer validation
- **Goal 3**: Ensure HIPAA-compliant architecture with end-to-end encryption, secure session management, and comprehensive audit logging for patient data protection
- **Goal 4**: Provide seamless session continuity with zero data loss through robust state persistence and resume capability across app interruptions
- **Goal 5**: Enable modular, extensible architecture supporting future expansion to additional treatment types beyond Hemodialysis and PATH Full integration

## Non-Functional Requirements

- NFR-001: System MUST maintain response latency under 2 seconds for all voice interactions (STT + LLM + TTS pipeline)
- NFR-002: System MUST complete voice-to-text conversion in under 1 second using optimized STT engine
- NFR-003: System MUST complete AI processing and data extraction in under 1 second using Azure OpenAI structured outputs
- NFR-004: System MUST complete form validation in under 500 milliseconds using client-side validation engine
- NFR-005: System MUST handle concurrent voice input without audio interference through proper microphone resource management
- NFR-006: System MUST provide simple conversational interface requiring minimal training for nurses
- NFR-007: System MUST provide clear audio feedback for all user interactions via TTS with configurable voice settings
- NFR-008: System MUST display intuitive error messages with actionable guidance through conversational AI responses
- NFR-009: System MUST support single-handed operation for tablet use with touch-friendly UI elements (minimum 44x44pt tap targets)
- NFR-010: System MUST maintain consistent UI patterns across all screens following React Native design guidelines
- NFR-011: System MUST implement HIPAA-compliant architecture for patient data protection with Azure OpenAI BAA coverage
- NFR-012: System MUST encrypt all data transmission using TLS 1.3 or higher for API communications
- NFR-013: System MUST implement secure session management with token-based authentication and 30-minute timeout
- NFR-014: System MUST maintain comprehensive audit trail for all data access and modifications per HIPAA requirements
- NFR-015: System MUST implement role-based access control for user permissions (Phase 1: nurse role only)
- NFR-016: System MUST sanitize all voice input before processing to prevent injection attacks
- NFR-017: System MUST be responsive for iPad devices ranging from 7-inch to 12.9-inch screen sizes
- NFR-018: System MUST support iOS 14.0 and above with React Native compatibility
- NFR-019: System MUST support Android 10.0 and above with React Native compatibility
- NFR-020: System MUST support both portrait and landscape orientations seamlessly with responsive layout
- NFR-021: System MUST work with standard tablet microphones without requiring external hardware
- NFR-022: System MUST support future PATH Full integration through modular architecture and clean API boundaries
- NFR-023: System MUST use extensible architecture to support additional treatment types beyond Hemodialysis
- NFR-024: System MUST implement modular design patterns for feature expansion with plugin-based form schemas
- NFR-025: System MUST support horizontal scaling for increased user load in future phases (not required for Phase 1)
- NFR-026: System MUST maintain 99% uptime during business hours (8 AM - 8 PM) for prototype validation
- NFR-027: System MUST gracefully handle network interruptions with automatic retry mechanisms (exponential backoff)
- NFR-028: System MUST preserve session state during app backgrounding or interruptions with MMKV persistence
- NFR-029: System MUST provide offline capability for partial data storage when network is unavailable
- NFR-030: System MUST use standardized coding conventions and documentation (ESLint, Prettier, JSDoc)
- NFR-031: System MUST implement comprehensive error logging for troubleshooting with structured logging format
- NFR-032: System MUST support version updates without data loss through database migration strategies

## Data Requirements

- DR-001: System MUST store patient demographic data including MRN, First Name, Middle Initial, Last Name, DOB, Gender
- DR-002: System MUST store admission data including Admission/Encounter Number, Treatment Location, Room Number
- DR-003: System MUST store clinical intake data including HBsAg (status, date, source), HBsAb (value, date, source)
- DR-004: System MUST enforce data integrity constraints: MRN (numeric only), DOB (valid date), Email (RFC-compliant format)
- DR-005: System MUST maintain referential integrity between patient records and treatment sessions
- DR-006: System MUST implement data retention policy: session data retained for 24 hours, completed forms retained indefinitely in Phase 1
- DR-007: System MUST support data backup through device-level backup mechanisms (iOS iCloud, Android backup)
- DR-008: System MUST encrypt sensitive data at rest using MMKV encryption with AES-256
- DR-009: System MUST support data migration for future production EHR integration with export capability
- DR-010: System MUST maintain audit log data including timestamp, user ID, action type, before/after values for 6 years per HIPAA

### Domain Entities

- **Patient**: Represents a patient record with demographic information (MRN, name, DOB, gender), admission details (encounter number, location, room), and clinical data (HBsAg, HBsAb). Unique identifier: MRN. Relationships: One-to-many with TreatmentSession.

- **TreatmentSession**: Represents a single Hemodialysis treatment data entry session with form data, completion status, session state (last field index), and timestamps. Unique identifier: SessionID. Relationships: Many-to-one with Patient, one-to-many with AuditLog.

- **User**: Represents a nurse user with credentials, hospital assignment, and role. Unique identifier: UserID. Relationships: One-to-many with TreatmentSession, one-to-many with AuditLog.

- **Hospital**: Represents a hospital facility with name, code, and configuration. Unique identifier: HospitalID. Relationships: One-to-many with User, one-to-many with Patient.

- **AuditLog**: Represents an audit trail entry with timestamp, user ID, action type, entity type, entity ID, before/after values, and IP address. Unique identifier: LogID. Relationships: Many-to-one with User, many-to-one with TreatmentSession.

- **FormSchema**: Represents the Hemodialysis form structure with field definitions, validation rules, question templates, and field ordering. Unique identifier: SchemaID. Supports extensibility for future treatment types.

## AI Consideration

**Status:** Applicable

**Rationale:** Analysis of spec.md identified 26 `[AI-CANDIDATE]` tags and 4 `[HYBRID]` tags across functional requirements, indicating significant AI-driven features including conversational interface, LLM data extraction, intent detection, and voice-guided workflows.

## AI Requirements

- AIR-001: System MUST use Azure OpenAI GPT-4o-mini for conversational data extraction with structured outputs to ensure <1 second processing latency (traces to NFR-003)
- AIR-002: System MUST implement structured output schema using Pydantic models to guarantee 95% data extraction accuracy from conversational responses (traces to NFR-001, Success Criteria)
- AIR-003: System MUST use Text-to-Speech (TTS) engine for sequential question delivery with natural voice quality and <500ms synthesis time (traces to NFR-007)
- AIR-004: System MUST use Speech-to-Text (STT) engine for voice capture with <1 second transcription latency and noise suppression (traces to NFR-002)
- AIR-005: System MUST implement LLM-based data cleaning pipeline to remove filler words, normalize formatting, and extract relevant values (traces to FR-024 through FR-029)
- AIR-006: System MUST detect clarification intent using LLM classification for phrases like "Repeat", "What do you mean?", "I don't understand" (traces to FR-042)
- AIR-007: System MUST detect edit intent and submission intent using LLM classification for conversational commands (traces to FR-065, FR-074, FR-081)
- AIR-008: System MUST implement prompt engineering with few-shot examples for domain-specific medical terminology extraction (traces to NFR-001)
- AIR-009: System MUST validate LLM outputs against form schema before field population to prevent hallucinations (traces to DR-004)
- AIR-010: System MUST implement fallback mechanisms for LLM failures with graceful degradation to manual entry mode (traces to NFR-027)
- AIR-011: System MUST log all AI interactions including prompts, responses, and confidence scores for audit compliance (traces to NFR-014, FR-096)
- AIR-012: System MUST implement rate limiting and retry logic for Azure OpenAI API calls to handle throttling (traces to NFR-027)
- AIR-013: System MUST sanitize voice input before LLM processing to prevent prompt injection attacks (traces to NFR-016)
- AIR-014: System MUST implement confidence threshold (>0.85) for LLM extractions with manual review flag for low-confidence values (traces to Risk R-002)
- AIR-015: System MUST cache LLM responses for identical questions within session to reduce latency and API costs (traces to NFR-001)

### AI Architecture Pattern

**Selected Pattern:** Hybrid (Tool Calling + Structured Outputs)

**Rationale:**
- **Structured Outputs**: Primary pattern for data extraction from conversational responses. Azure OpenAI structured outputs with Pydantic schemas ensure strict adherence to form field schemas, eliminating JSON parsing errors and guaranteeing type safety for medical data.
- **Tool Calling**: Secondary pattern for intent detection (clarification, edit, submit). LLM classifies user intent and triggers appropriate system actions (re-ask question, navigate to field, submit form).
- **No RAG Required**: Phase 1 has fixed form schema for Hemodialysis with no need for document retrieval or knowledge base queries.
- **No Fine-tuning Required**: GPT-4o-mini with prompt engineering and few-shot examples sufficient for medical terminology extraction in prototype phase.

## Architecture and Design Decisions

- **Decision 1: React Native for Cross-Platform Mobile**: Selected React Native over Flutter/native development to leverage JavaScript ecosystem, enable code reuse across iOS/Android (90%+ shared codebase), and align with organizational technology stack constraint (C-001). Provides mature voice integration libraries (@react-native-voice/voice, expo-speech) and strong community support.

- **Decision 2: MMKV for Local Storage**: Selected react-native-mmkv over AsyncStorage for session persistence and offline storage due to 30x faster performance, synchronous API (eliminates promise overhead), built-in AES-256 encryption for PHI protection, and support for complex data types without serialization. Critical for <500ms validation latency (NFR-004) and HIPAA encryption requirements (NFR-011, DR-008).

- **Decision 3: Azure OpenAI Structured Outputs**: Selected Azure OpenAI structured outputs over JSON mode for LLM data extraction to guarantee strict schema adherence, eliminate parsing errors, and ensure type safety for medical data. Pydantic integration enables compile-time validation and reduces runtime errors. Azure deployment ensures HIPAA BAA coverage (NFR-011) and data residency compliance.

- **Decision 4: Client-Side Validation Engine**: Implemented multi-layer validation (schema, data type, regex, business rules) on client-side using Yup validation library to achieve <500ms validation latency (NFR-004), reduce API calls, and enable offline validation capability. Server-side validation retained for final submission as defense-in-depth.

- **Decision 5: Modular Form Schema Architecture**: Designed plugin-based form schema system with JSON schema definitions to support future treatment types (NFR-023) and PATH Full integration (NFR-022). Each treatment type has isolated schema file with field definitions, validation rules, and question templates.

- **Decision 6: Stateful Session Management**: Implemented session state persistence with last field index tracking to enable zero-data-loss resume capability (NFR-028, FR-052-057). Session state stored in MMKV with automatic save on field completion and app backgrounding.

- **Decision 7: Hybrid Voice Integration**: Selected @react-native-voice/voice for STT (native iOS/Android speech recognition) and expo-speech for TTS (platform-native synthesis) over cloud-based solutions to minimize latency, reduce API costs, and enable offline TTS capability. Cloud STT (Azure Speech) considered for future noise suppression enhancements.

- **Decision 8: FastAPI Backend with Async Architecture**: Selected FastAPI over Express/Django for backend due to native async/await support (critical for concurrent Azure OpenAI calls), automatic OpenAPI documentation, Pydantic validation integration, and high performance (comparable to Node.js). Python ecosystem aligns with Azure OpenAI SDK and data science tooling.

- **Decision 9: Token-Based Authentication with JWT**: Implemented JWT-based authentication over session cookies for mobile compatibility, stateless API design, and support for future microservices architecture. 30-minute token expiry with refresh token mechanism (NFR-013).

- **Decision 10: Comprehensive Audit Logging**: Designed structured audit logging with timestamp, user ID, action type, entity type, entity ID, before/after values, and IP address to meet HIPAA requirements (NFR-014, DR-010). Logs stored in separate encrypted MMKV instance with 6-year retention.

## Technology Stack

| Layer | Technology | Version | Justification (NFR/DR/AIR) |
|-------|------------|---------|----------------------------|
| Frontend | React Native | 0.73+ | NFR-017, NFR-018, NFR-019, NFR-020 - Cross-platform mobile with iOS 14+ and Android 10+ support, responsive design for 7-12.9" tablets |
| Mobile | React Native | 0.73+ | NFR-017, NFR-018, NFR-019 - Native mobile framework for iOS and Android with single codebase |
| Backend | FastAPI | 0.110+ | NFR-001, NFR-003, AIR-001 - Async Python framework for Azure OpenAI integration with <1s processing latency |
| Database | MMKV (react-native-mmkv) | 2.12+ | DR-008, NFR-028, NFR-004 - Encrypted local storage with synchronous API for session persistence and offline capability |
| AI/ML | Azure OpenAI GPT-4o-mini, @react-native-voice/voice (STT), expo-speech (TTS) | GPT-4o-mini-2024-07-18, voice 3.2+, expo-speech 11.7+ | AIR-001, AIR-002, AIR-003, AIR-004, NFR-011 - HIPAA-compliant LLM with structured outputs, native STT/TTS for <2s latency |
| Testing | Jest, React Native Testing Library, Playwright (future E2E) | Jest 29+, RNTL 12+, Playwright 1.40+ | NFR-030 - Unit testing for React Native components and FastAPI endpoints |
| Infrastructure | Azure App Service (FastAPI), Azure OpenAI Service, Device Storage (MMKV) | N/A | NFR-011, NFR-026 - Cloud backend with HIPAA BAA, local mobile storage for offline capability |
| Security | TLS 1.3, JWT (jsonwebtoken), MMKV Encryption (AES-256) | TLS 1.3, JWT 9.0+, MMKV built-in | NFR-012, NFR-013, DR-008 - End-to-end encryption, token-based auth, encrypted local storage |
| Deployment | Azure App Service, Apple App Store, Google Play Store | N/A | NFR-018, NFR-019 - Cloud backend deployment, mobile app distribution |
| Monitoring | Azure Application Insights, React Native Error Boundary | App Insights SDK 2.8+ | NFR-031 - Structured logging, error tracking, performance monitoring |
| Documentation | JSDoc, OpenAPI (FastAPI auto-generated), Markdown | JSDoc 4+, OpenAPI 3.1 | NFR-030 - Code documentation, API documentation, architecture documentation |

### Alternative Technology Options

- **Flutter vs React Native**: Flutter considered for superior performance and UI consistency but rejected due to organizational JavaScript expertise, smaller healthcare library ecosystem, and React Native's mature voice integration libraries.

- **AsyncStorage vs MMKV**: AsyncStorage rejected due to async overhead (impacts NFR-004 validation latency), lack of encryption (violates DR-008), and 30x slower performance compared to MMKV.

- **Cloud STT (Azure Speech) vs Native STT (@react-native-voice/voice)**: Cloud STT considered for advanced noise suppression but rejected for Phase 1 due to added latency (network round-trip), API costs, and offline capability requirement (NFR-029). Native STT selected for <1s transcription (NFR-002) with future cloud upgrade path for noise handling (Risk R-001).

- **OpenAI API vs Azure OpenAI**: Direct OpenAI API rejected due to lack of HIPAA BAA coverage (NFR-011), data residency concerns, and no enterprise SLA. Azure OpenAI selected for HIPAA compliance, BAA automatic inclusion with Enterprise Agreement, and data processing in-memory with no retention.

- **JSON Mode vs Structured Outputs**: JSON mode rejected due to inability to guarantee strict schema adherence, requiring additional validation logic. Structured outputs selected for guaranteed type safety (AIR-002), elimination of parsing errors, and Pydantic integration.

### AI Component Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| Model Provider | Azure OpenAI GPT-4o-mini (2024-07-18) | LLM inference for conversational data extraction, intent detection, and data cleaning with structured outputs |
| Vector Store | N/A | Not required for Phase 1 - no RAG or document retrieval use case |
| AI Gateway | Custom FastAPI Middleware | Request routing, response caching (identical questions), structured logging, rate limiting, and retry logic |
| Guardrails | Pydantic Structured Outputs + Yup Validation | Schema validation (Pydantic for LLM outputs), content filtering (input sanitization), field-level validation (Yup) |

### Technology Decision Matrix

| Metric (from NFR/DR/AIR) | React Native | Flutter | Rationale |
|--------------------------|--------------|---------|-----------|
| Cross-platform Support (NFR-017, NFR-018, NFR-019) | ✅ iOS 14+, Android 10+ | ✅ iOS 14+, Android 10+ | Both support target platforms |
| Voice Integration Maturity (AIR-003, AIR-004) | ✅ @react-native-voice/voice, expo-speech | ⚠️ flutter_tts, speech_to_text | React Native has more mature healthcare voice libraries |
| Development Speed (Organizational Constraint C-001) | ✅ JavaScript expertise | ❌ Dart learning curve | React Native aligns with existing team skills |
| **Winner** | **React Native** | - | Better voice ecosystem, team expertise, organizational alignment |

| Metric (from NFR/DR/AIR) | MMKV | AsyncStorage | Rationale |
|--------------------------|------|--------------|-----------|
| Performance (NFR-004 <500ms validation) | ✅ Synchronous, 30x faster | ❌ Async, slower | MMKV eliminates promise overhead |
| Encryption (DR-008 AES-256) | ✅ Built-in AES-256 | ❌ No encryption | MMKV meets HIPAA encryption requirement |
| Data Type Support (DR-001-003) | ✅ Native types (no serialization) | ❌ String only (requires JSON.stringify) | MMKV reduces serialization overhead |
| **Winner** | **MMKV** | - | Superior performance, encryption, type support |

| Metric (from NFR/DR/AIR) | Azure OpenAI | OpenAI API | Rationale |
|--------------------------|--------------|------------|-----------|
| HIPAA Compliance (NFR-011) | ✅ BAA included with Enterprise Agreement | ❌ No BAA for standard API | Azure OpenAI meets healthcare compliance |
| Data Residency (NFR-011) | ✅ Data processed in-memory, no retention | ⚠️ Data retention policies unclear | Azure guarantees no PHI storage |
| Latency (NFR-003 <1s) | ✅ <1s with structured outputs | ✅ <1s with structured outputs | Both meet latency requirement |
| **Winner** | **Azure OpenAI** | - | HIPAA compliance, BAA coverage, data residency guarantees |

## Technical Requirements

- TR-001: System MUST use React Native 0.73+ framework for cross-platform mobile development justified by NFR-017, NFR-018, NFR-019, NFR-020
- TR-002: System MUST use FastAPI 0.110+ framework for backend API with async/await support justified by NFR-001, NFR-003, AIR-001
- TR-003: System MUST use MMKV (react-native-mmkv 2.12+) for local encrypted storage justified by DR-008, NFR-028, NFR-004
- TR-004: System MUST integrate Azure OpenAI GPT-4o-mini (2024-07-18) with structured outputs for LLM processing justified by AIR-001, AIR-002, NFR-011
- TR-005: System MUST integrate @react-native-voice/voice 3.2+ for Speech-to-Text functionality justified by AIR-004, NFR-002
- TR-006: System MUST integrate expo-speech 11.7+ for Text-to-Speech functionality justified by AIR-003, NFR-007
- TR-007: System MUST implement Pydantic 2.8+ models for structured output schema definition justified by AIR-002, AIR-009
- TR-008: System MUST implement Yup validation library for client-side form validation justified by NFR-004, DR-004
- TR-009: System MUST implement JWT-based authentication with jsonwebtoken 9.0+ justified by NFR-013, NFR-015
- TR-010: System MUST implement TLS 1.3 encryption for all API communications justified by NFR-012
- TR-011: System MUST implement modular form schema architecture with JSON schema definitions justified by NFR-023, NFR-024
- TR-012: System MUST implement session state persistence with last field index tracking justified by NFR-028, FR-052-057
- TR-013: System MUST implement comprehensive audit logging with structured format justified by NFR-014, DR-010
- TR-014: System MUST implement exponential backoff retry logic for Azure OpenAI API calls justified by NFR-027, AIR-012
- TR-015: System MUST implement input sanitization for voice input before LLM processing justified by NFR-016, AIR-013
- TR-016: System MUST implement confidence threshold (>0.85) for LLM extractions with manual review flag justified by AIR-014
- TR-017: System MUST implement LLM response caching for identical questions within session justified by AIR-015, NFR-001
- TR-018: System MUST implement graceful degradation to manual entry mode on LLM failures justified by AIR-010, NFR-027
- TR-019: System MUST implement responsive layout supporting 7-12.9 inch tablets in portrait/landscape justified by NFR-017, NFR-020
- TR-020: System MUST implement Azure Application Insights SDK for error logging and performance monitoring justified by NFR-031

## Technical Constraints & Assumptions

**Constraints:**
- **C-001**: Technology stack must use React Native for mobile, FastAPI for backend, and Azure OpenAI GPT-4o-mini for LLM processing per organizational standards
- **C-002**: Phase 1 limited to Hemodialysis treatment type only; extensible architecture required for future treatment types
- **C-003**: No production EHR integration in Phase 1; data stored in local MMKV storage with future migration strategy
- **C-004**: AI conversational features require active internet connection for Azure OpenAI API access; manual fallback required for offline scenarios
- **C-005**: Prototype phase with mock authentication and mock patient data; production-grade security and real data integration deferred to Phase 2

**Assumptions:**
- **A-001**: Nurses will grant microphone permissions and use devices with functional microphones in acceptable acoustic conditions (validated during pilot deployment)
- **A-002**: Phase 1 supports English language only for voice interaction (STT and TTS); multi-language support planned for future phases
- **A-003**: Nurses will use tablets within 7-12.9 inch screen size range with iOS 14+ or Android 10+ operating systems per organizational device standards
- **A-004**: Azure OpenAI API will maintain 99.9% uptime and respond within <1 second per request per enterprise SLA
- **A-005**: Mock patient records contain representative MRN, name, DOB, and admission data for effective recall search testing in Phase 1
- **A-006**: Clinical environments will have adequate WiFi connectivity for Azure OpenAI API calls during prototype validation
- **A-007**: Nurses will complete training on voice interaction patterns and conversational commands before pilot deployment

## Development Workflow

1. **Environment Setup**: Configure React Native development environment (Node.js 18+, React Native CLI, Xcode for iOS, Android Studio for Android), FastAPI backend environment (Python 3.11+, Poetry for dependency management), and Azure OpenAI service provisioning with HIPAA BAA verification

2. **Backend Development**: Implement FastAPI backend with Azure OpenAI integration (structured outputs, Pydantic models), JWT authentication, validation engine (Pydantic + custom business rules), audit logging middleware, and mock data services (authentication, patient data store)

3. **Mobile App Foundation**: Build React Native app structure with navigation (React Navigation), MMKV storage setup (encrypted instance for PHI, separate instance for audit logs), authentication flow (login, hospital selection, patient dashboard), and form schema loader (JSON schema parser)

4. **Voice Integration**: Integrate @react-native-voice/voice for STT (microphone permissions, noise suppression configuration), expo-speech for TTS (voice selection, speech rate configuration), and implement voice UI components (AI voice icon, listening indicator, audio feedback)

5. **AI Conversational Flow**: Implement conversational data entry logic (sequential question flow, field mapping, session state management), LLM integration (structured output calls, data cleaning pipeline, intent detection), validation engine (client-side Yup validation, server-side validation), and error correction workflow (field navigation, re-ask logic)

6. **Session Management**: Implement session persistence (save on field completion, save on app backgrounding), resume capability (detect incomplete session, load partial data, resume from last field), and session timeout handling (30-minute inactivity, auto-close after 3 no-response retries)

7. **Review & Submission**: Implement review screen (validation summary, error categorization, edit navigation), report generation (structured data formatting), and final submission (save to MMKV, audit log creation, success confirmation)

8. **Testing & Validation**: Conduct unit testing (Jest for React Native components, pytest for FastAPI endpoints), integration testing (voice flow end-to-end, LLM data extraction accuracy), and user acceptance testing (nurse pilot with actual clinical scenarios, latency measurement, accuracy validation)

9. **Deployment Preparation**: Deploy FastAPI backend to Azure App Service, build React Native apps (iOS .ipa, Android .apk), configure Azure Application Insights monitoring, and prepare pilot deployment documentation (user guide, troubleshooting guide, feedback collection process)

10. **Pilot Deployment & Iteration**: Deploy to pilot users (5-10 nurses), collect feedback (voice interaction quality, accuracy issues, usability concerns), analyze metrics (latency, accuracy, completion time), and iterate on prompt engineering and validation rules based on real-world usage
