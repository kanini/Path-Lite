# Architecture Design

## Project Overview

PATH Lite is an AI-driven mobile conversational data entry system for iOS and Android tablets that enables nurses to capture patient demographic, admission, and treatment details through voice-based interaction. The system replaces manual form-based data entry with an intelligent conversational assistant powered by Azure OpenAI, providing sequential question flow, real-time speech-to-text conversion, intelligent validation, clarification handling, session continuity, and confirmation workflows. Target users are hospital nurses performing hemodialysis patient intake in clinical environments. Phase 1 focuses on Hemodialysis treatment workflow with mock authentication and patient database services.

## Architecture Goals

- **AG-001: AI-Powered Conversational Interface**: Deliver natural language voice interaction with 95%+ speech recognition accuracy for medical terminology in clinical environments, reducing data entry time by 40% compared to manual forms
- **AG-002: Offline-First Mobile Architecture**: Ensure partial session persistence and resume capability with local-first data storage, enabling uninterrupted workflow during network interruptions common in hospital settings
- **AG-003: Real-Time Validation & Data Quality**: Enforce mandatory field completion and multi-layer validation (schema, type, regex, format) at point of capture, achieving near-zero incomplete documentation rates
- **AG-004: Healthcare Compliance & Audit**: Implement comprehensive audit logging for all data entry, modification, and session events with HIPAA-ready architecture patterns for future production integration
- **AG-005: Scalable AI Orchestration**: Design modular AI service architecture supporting multiple concurrent nurse sessions with sub-2-second response times for conversational interactions

## Non-Functional Requirements

### Performance Requirements

- NFR-001: System MUST support 50 concurrent nurse sessions with AI conversational assistant without performance degradation
- NFR-002: System MUST respond to voice input with transcribed text within 2 seconds under normal network conditions (95th percentile)
- NFR-003: System MUST complete AI question-to-question transition within 1 second after successful field validation
- NFR-004: System MUST load Patient Dashboard with up to 500 patient records within 3 seconds
- NFR-005: System MUST persist partial session data to local storage within 500ms of interruption event

### Availability & Reliability Requirements

- NFR-006: System MUST maintain offline capability for partial session storage with automatic sync on network reconnection
- NFR-007: System MUST handle network interruptions gracefully with retry logic (exponential backoff, max 3 attempts) for AI service calls
- NFR-008: System MUST resume interrupted sessions from exact field position with 100% data integrity
- NFR-009: System MUST provide fallback to manual form entry if AI services are unavailable for more than 30 seconds
- NFR-010: Backend API MUST achieve 99.5% uptime during business hours (6 AM - 10 PM hospital local time)

### Scalability Requirements

- NFR-011: System MUST scale to support 200 concurrent nurse users across multiple hospitals without architecture changes
- NFR-012: System MUST handle 10,000 patient records per hospital without query performance degradation
- NFR-013: AI orchestration service MUST support horizontal scaling to handle peak usage (shift changes: 7-8 AM, 3-4 PM)
- NFR-014: System MUST support addition of new treatment types (beyond Hemodialysis) without core architecture refactoring

### Security Requirements

- NFR-015: System MUST encrypt all data in transit using TLS 1.3 for API communications
- NFR-016: System MUST encrypt sensitive patient data at rest using AES-256 encryption in local storage
- NFR-017: System MUST implement secure session token management with automatic expiration after 8 hours of inactivity
- NFR-018: System MUST sanitize all voice transcriptions before AI processing to prevent prompt injection attacks
- NFR-019: System MUST comply with HIPAA security requirements for Protected Health Information (PHI) handling in preparation for production integration
- NFR-020: System MUST implement role-based access control (RBAC) for nurse authentication and authorization

### Usability Requirements

- NFR-021: System MUST achieve 95%+ speech-to-text accuracy for medical terminology in clinical noise environments (50-60 dB)
- NFR-022: System MUST support clarification requests with alternative question phrasing within 3 attempts before fallback
- NFR-023: System MUST provide visual confirmation of transcribed text before validation to enable nurse correction
- NFR-024: System MUST display field-level validation errors with specific correction guidance within 1 second
- NFR-025: System MUST enable session resume within 5 seconds of reopening treatment page for interrupted sessions

### Maintainability Requirements

- NFR-026: System MUST implement modular architecture with clear separation between mobile UI, backend API, and AI orchestration layers
- NFR-027: System MUST provide comprehensive API documentation using OpenAPI 3.0 specification
- NFR-028: System MUST implement structured logging with correlation IDs for distributed tracing across mobile, backend, and AI services
- NFR-029: System MUST support feature flags for gradual rollout of AI capabilities and A/B testing
- NFR-030: System MUST maintain backward compatibility for mobile app versions (N-1 version support)

### Compliance & Audit Requirements

- NFR-031: System MUST log all patient data entry, modification, and deletion events with timestamp, nurse ID, and change details
- NFR-032: System MUST maintain immutable audit trail with tamper-evident logging for regulatory compliance
- NFR-033: System MUST support audit log retention for minimum 7 years in compliance with healthcare regulations
- NFR-034: System MUST provide audit log export capability in standard formats (JSON, CSV) for compliance reporting
- NFR-035: System MUST implement data anonymization for non-production environments (development, testing)

## Data Requirements

### Data Structure Requirements

- DR-001: System MUST define Patient entity with attributes: MRN (unique identifier), First Name, Middle Name, Last Name, DOB, Gender, Admission Number
- DR-002: System MUST define Treatment entity with attributes: Treatment ID, Patient ID (foreign key), Treatment Type, Treatment Location, Room Number, Treatment Date, Status
- DR-003: System MUST define Clinical Intake entity with attributes: HBsAg Status, HBsAg Date Drawn, HBsAg Source, HBsAb Value, HBsAb Date Drawn, HBsAb Source
- DR-004: System MUST define Session entity with attributes: Session ID, Patient ID, Nurse ID, Hospital ID, Start Time, Last Update Time, Completion Status, Last Field Index
- DR-005: System MUST define Audit Log entity with attributes: Log ID, Session ID, Event Type, Timestamp, Nurse ID, Field Name, Old Value, New Value, Device ID

### Data Integrity Requirements

- DR-006: System MUST enforce MRN uniqueness constraint per hospital to prevent duplicate patient records
- DR-007: System MUST validate referential integrity between Treatment and Patient entities (cascade delete protection)
- DR-008: System MUST enforce mandatory field constraints at database level for: MRN, First Name, Last Name, DOB, Gender, Treatment Location, Room Number, HBsAg, HBsAb
- DR-009: System MUST validate date field logical constraints (DOB cannot be future date, Date Drawn cannot be more than 1 year in past)
- DR-010: System MUST implement optimistic locking for concurrent session updates to prevent data overwrites

### Data Retention & Archival Requirements

- DR-011: System MUST retain active patient records indefinitely until explicit deletion by authorized personnel
- DR-012: System MUST archive completed treatment records after 90 days to separate archival storage
- DR-013: System MUST retain partial session data for 7 days before automatic cleanup
- DR-014: System MUST retain audit logs for minimum 7 years in compliance with healthcare data retention policies
- DR-015: System MUST implement soft delete for patient records with 30-day recovery window before permanent deletion

### Data Backup & Recovery Requirements

- DR-016: System MUST perform automated daily backups of all patient data with point-in-time recovery capability
- DR-017: System MUST maintain backup retention for 30 days with weekly snapshots retained for 1 year
- DR-018: System MUST support disaster recovery with Recovery Time Objective (RTO) of 4 hours and Recovery Point Objective (RPO) of 1 hour
- DR-019: System MUST encrypt all backup data using AES-256 encryption with separate key management
- DR-020: System MUST test backup restoration procedures quarterly to ensure data recovery capability

### Data Migration Requirements

- DR-021: System MUST support data export in standard formats (JSON, CSV, HL7 FHIR) for future EHR integration
- DR-022: System MUST provide data migration scripts for transitioning from Phase 1 mock database to production EHR systems
- DR-023: System MUST maintain data schema versioning with backward-compatible migration paths
- DR-024: System MUST support bulk data import for initial hospital patient roster setup
- DR-025: System MUST validate data integrity during migration with automated reconciliation reports

### Domain Entities

**Patient Entity**
- Represents individual patient receiving hemodialysis treatment
- Attributes: MRN (Primary Key, String, Unique per Hospital), First Name (String, Required), Middle Name (String, Optional), Last Name (String, Required), DOB (Date, Required), Gender (Enum: Male/Female, Required), Admission Number (String, Optional), Hospital ID (Foreign Key, Required), Created Date (Timestamp), Updated Date (Timestamp), Status (Enum: Active/Archived/Deleted)
- Relationships: One-to-Many with Treatment, One-to-Many with Session

**Treatment Entity**
- Represents single hemodialysis treatment session for a patient
- Attributes: Treatment ID (Primary Key, UUID), Patient ID (Foreign Key, Required), Treatment Type (Enum: Hemodialysis - Phase 1 only), Treatment Location (Enum: OR/Bedside/ICU/CCU/ER/Multi-Tx Room, Required), Room Number (String, Required), Treatment Date (Timestamp, Required), Status (Enum: In Progress/Completed/Cancelled), Created By (Nurse ID), Created Date (Timestamp), Updated Date (Timestamp)
- Relationships: Many-to-One with Patient, One-to-One with Clinical Intake

**Clinical Intake Entity**
- Represents clinical lab results and intake data for treatment
- Attributes: Intake ID (Primary Key, UUID), Treatment ID (Foreign Key, Required), HBsAg Status (Enum: Positive/Negative/Unknown, Required), HBsAg Date Drawn (Date, Optional), HBsAg Source (Enum: Hospital/Davita Patient Portal/Non-Davita Source, Optional), HBsAb Value (Decimal, Required), HBsAb Date Drawn (Date, Optional), HBsAb Source (Enum: Hospital/Davita Patient Portal/Non-Davita Source, Optional)
- Relationships: One-to-One with Treatment

**Session Entity**
- Represents AI conversational data entry session with partial state persistence
- Attributes: Session ID (Primary Key, UUID), Patient ID (Foreign Key, Required), Nurse ID (Foreign Key, Required), Hospital ID (Foreign Key, Required), Start Time (Timestamp, Required), Last Update Time (Timestamp, Required), Completion Status (Enum: In Progress/Completed/Abandoned/Auto-Closed), Last Field Index (Integer, Required), Partial Data (JSON, stores completed field values), Device ID (String), Network Status (Enum: Online/Offline)
- Relationships: Many-to-One with Patient, Many-to-One with Nurse, One-to-Many with Audit Log

**Audit Log Entity**
- Represents immutable audit trail for all data entry and modification events
- Attributes: Log ID (Primary Key, UUID), Session ID (Foreign Key, Required), Event Type (Enum: Session Start/Field Entry/Field Edit/Validation Error/Session Resume/Session Complete/Session Abandon), Timestamp (Timestamp with Timezone, Required), Nurse ID (Foreign Key, Required), Field Name (String, Optional), Old Value (String, Optional), New Value (String, Optional), Device ID (String), IP Address (String), Error Details (JSON, Optional)
- Relationships: Many-to-One with Session

**Nurse Entity**
- Represents authenticated nurse user
- Attributes: Nurse ID (Primary Key, UUID), Username (String, Unique, Required), Password Hash (String, Required - Phase 1 mock), First Name (String, Required), Last Name (String, Required), Email (String, Required), Role (Enum: Nurse/Supervisor/Admin), Hospital Assignments (Array of Hospital IDs), Status (Enum: Active/Inactive), Last Login (Timestamp), Created Date (Timestamp)
- Relationships: One-to-Many with Session

**Hospital Entity**
- Represents hospital facility where treatments occur
- Attributes: Hospital ID (Primary Key, UUID), Hospital Name (String, Required), Address (String), City (String), State (String), Zip Code (String), Status (Enum: Active/Inactive), Created Date (Timestamp)
- Relationships: One-to-Many with Patient, One-to-Many with Nurse

## AI Consideration

**Status:** Applicable

**Rationale:** Specification contains 15 `[AI-CANDIDATE]` requirements (FR-021 to FR-025, FR-027, FR-029, FR-039, FR-040, FR-042, FR-043, FR-099) and 1 `[HYBRID]` requirement (FR-026) related to AI conversational assistant, speech-to-text processing, natural language understanding for clarification detection, and conversational error feedback. GenAI fit assessment indicates HIGH-FIT for conversational data entry workflow.

## AI Requirements

### AI Functional Requirements

- AIR-001: System MUST integrate Azure OpenAI GPT-4o-mini model for conversational question generation based on Patient Details Form schema with context-aware sequential flow (Traces to: NFR-001, NFR-002, FR-021 to FR-023)
- AIR-002: System MUST integrate speech-to-text engine (Azure Speech Services) with medical terminology custom model achieving 95%+ accuracy in clinical noise environments (50-60 dB) (Traces to: NFR-021, FR-024, FR-025)
- AIR-003: System MUST implement natural language understanding (NLU) for clarification intent detection with 90%+ accuracy for phrases: "Repeat", "What do you mean?", "I don't understand", and semantic variations (Traces to: NFR-022, FR-039, FR-040)
- AIR-004: System MUST generate alternative question phrasing using GPT-4o-mini when clarification is requested, maintaining field context and providing field-specific examples (Traces to: NFR-022, FR-042, FR-043)
- AIR-005: System MUST implement conversational error feedback generation for validation failures with user-friendly language avoiding technical jargon (Traces to: NFR-024, FR-099)

### AI Quality Requirements

- AIR-006: System MUST implement prompt engineering with system prompts defining nurse-patient context, medical terminology constraints, and HIPAA-compliant language guidelines (Traces to: NFR-019, NFR-021)
- AIR-007: System MUST implement input sanitization and output validation to prevent prompt injection attacks and ensure generated questions align with form schema (Traces to: NFR-018)
- AIR-008: System MUST cache AI-generated questions for identical field sequences to reduce API latency and costs, with cache invalidation on schema changes (Traces to: NFR-002, NFR-003)
- AIR-009: System MUST implement fallback mechanisms for AI service failures: retry with exponential backoff (3 attempts), then graceful degradation to manual form entry (Traces to: NFR-007, NFR-009)
- AIR-010: System MUST log all AI interactions (prompts, responses, latency, errors) for model performance monitoring and continuous improvement (Traces to: NFR-028, NFR-031)

### AI Observability Requirements

- AIR-011: System MUST track AI service metrics: response time (p50, p95, p99), token usage, error rate, cache hit rate, and cost per session (Traces to: NFR-028)
- AIR-012: System MUST implement distributed tracing for AI request flow: mobile → backend → Azure OpenAI → speech services with correlation IDs (Traces to: NFR-028)
- AIR-013: System MUST alert on AI service degradation: response time > 5 seconds, error rate > 5%, or speech recognition accuracy < 90% (Traces to: NFR-010)
- AIR-014: System MUST provide AI performance dashboard displaying: daily session count, average questions per session, clarification rate, and accuracy metrics (Traces to: NFR-028)
- AIR-015: System MUST implement A/B testing framework for prompt variations and question phrasing strategies with statistical significance tracking (Traces to: NFR-029)

### AI Architecture Pattern

**Selected Pattern:** Tool Calling with Structured Output

**Rationale:**
- **Tool Calling**: GPT-4o-mini function calling used to generate structured questions based on form schema, ensuring questions align with field types, validation rules, and mandatory/optional status
- **Structured Output**: AI responses formatted as JSON with fields: `question_text`, `field_name`, `field_type`, `validation_rules`, `examples`, enabling deterministic validation and UI rendering
- **Hybrid Approach**: AI generates conversational questions (creative), but validation and field mapping are deterministic (rule-based), ensuring data integrity
- **No RAG Required**: Form schema is static and embedded in system prompts; no dynamic knowledge retrieval needed for Phase 1
- **No Fine-Tuning Required**: GPT-4o-mini's base model with medical terminology in prompts provides sufficient accuracy; fine-tuning deferred to Phase 2 based on production data

**Alternative Patterns Considered:**
- **RAG (Retrieval-Augmented Generation)**: Not applicable for Phase 1 as form schema is static; may be relevant in Phase 2 for EHR integration with dynamic patient history retrieval
- **Fine-Tuning**: Deferred to Phase 2 due to lack of production conversation data; GPT-4o-mini base model sufficient for structured question generation
- **Prompt Chaining**: Considered for multi-turn clarification but adds latency; single-turn tool calling with context injection preferred for <2s response time requirement

## Architecture and Design Decisions

### AD-001: Offline-First Mobile Architecture with Local-First Data Storage

**Decision:** Implement offline-first architecture using React Native AsyncStorage for local data persistence with background sync to backend API when network is available.

**Rationale:**
- Hospital WiFi networks frequently experience dead zones and interruptions during nurse mobility
- Partial session data must persist across app lifecycle events (backgrounding, force-close, device restart)
- NFR-006 requires offline capability; NFR-008 requires 100% data integrity on session resume
- AsyncStorage provides 6MB+ storage capacity sufficient for 100+ partial sessions with patient data
- Conflict resolution handled by session timestamps and optimistic locking (DR-010)

**Trade-offs:**
- **Pros**: Uninterrupted workflow during network outages, faster perceived performance, reduced backend dependency
- **Cons**: Increased mobile app complexity for sync logic, potential data conflicts requiring resolution, storage quota management

**Alternatives Considered:**
- **Online-Only Architecture**: Rejected due to NFR-006 offline requirement and hospital network reliability concerns
- **SQLite Local Database**: Considered but adds complexity for simple key-value session storage; deferred to Phase 2 for full offline patient database

### AD-002: AI Orchestration Service as Separate Microservice

**Decision:** Implement AI orchestration as dedicated FastAPI microservice separate from core backend API, handling all Azure OpenAI and Speech Services interactions.

**Rationale:**
- Isolates AI-specific logic (prompt engineering, retry logic, caching, observability) from core business logic
- Enables independent scaling of AI service during peak usage (NFR-013) without scaling entire backend
- Simplifies AI service monitoring, cost tracking, and A/B testing (AIR-011, AIR-015)
- Allows AI service replacement or multi-provider strategy without core API changes
- Supports feature flags for gradual AI rollout (NFR-029)

**Trade-offs:**
- **Pros**: Independent scalability, clear separation of concerns, easier AI provider migration, isolated failure domain
- **Cons**: Additional network hop adds 50-100ms latency, increased deployment complexity, inter-service authentication overhead

**Alternatives Considered:**
- **Monolithic Backend with AI Integration**: Rejected due to scaling and maintainability concerns; AI and CRUD operations have different scaling profiles
- **Client-Side AI Integration**: Rejected due to API key security, lack of centralized monitoring, and inability to implement server-side caching

### AD-003: Stateless Backend API with Session State in Database

**Decision:** Implement stateless FastAPI backend with all session state persisted in database (PostgreSQL), using JWT tokens for authentication.

**Rationale:**
- Enables horizontal scaling without session affinity requirements (NFR-011, NFR-013)
- Simplifies deployment and load balancing across multiple backend instances
- Session state in database ensures consistency across mobile app restarts and device switches
- JWT tokens eliminate server-side session storage and enable stateless authentication (NFR-017)
- Aligns with cloud-native architecture patterns for future Azure/AWS deployment

**Trade-offs:**
- **Pros**: Horizontal scalability, simplified deployment, no session affinity, cloud-native
- **Cons**: Database queries for every session state retrieval, JWT token size overhead, token revocation complexity

**Alternatives Considered:**
- **Stateful Backend with In-Memory Sessions**: Rejected due to horizontal scaling limitations and session loss on server restart
- **Redis Session Store**: Considered but adds infrastructure complexity for Phase 1; deferred to Phase 2 for caching layer

### AD-004: Multi-Layer Validation Architecture (Client + Server + AI)

**Decision:** Implement validation at three layers: (1) Mobile client for immediate feedback, (2) Backend API for authoritative validation, (3) AI service for conversational error guidance.

**Rationale:**
- Client-side validation provides instant feedback (<100ms) for user experience (NFR-024)
- Server-side validation ensures data integrity regardless of client version or tampering (DR-008)
- AI-generated conversational error messages improve usability over technical error codes (AIR-005)
- Defense-in-depth approach prevents invalid data from reaching database
- Supports backward compatibility as validation rules evolve (NFR-030)

**Trade-offs:**
- **Pros**: Immediate user feedback, data integrity guarantee, improved error messages, security defense-in-depth
- **Cons**: Validation logic duplication across layers, increased maintenance burden, potential inconsistencies if not synchronized

**Alternatives Considered:**
- **Server-Only Validation**: Rejected due to poor user experience with network round-trip for every field
- **Client-Only Validation**: Rejected due to security concerns and inability to enforce data integrity

### AD-005: Azure OpenAI with HIPAA BAA for Production Readiness

**Decision:** Use Azure OpenAI Service (not OpenAI API) with Business Associate Agreement (BAA) for HIPAA compliance preparation.

**Rationale:**
- Azure OpenAI provides HIPAA BAA coverage for GPT-4o-mini and Speech Services (NFR-019)
- Data residency in Azure regions meets healthcare compliance requirements
- No data retention for API calls when configured with zero retention policy
- Integrated with Azure Monitor for observability and audit logging (AIR-011, AIR-012)
- Supports private endpoints and VNet integration for future production deployment

**Trade-offs:**
- **Pros**: HIPAA compliance, data residency control, enterprise SLA, integrated monitoring, private networking
- **Cons**: Higher cost than OpenAI API (~20-30% premium), Azure vendor lock-in, regional availability limitations

**Alternatives Considered:**
- **OpenAI API**: Rejected due to lack of HIPAA BAA and data retention concerns for PHI
- **Anthropic Claude**: Considered but Azure OpenAI preferred for integrated Azure ecosystem and Speech Services

### AD-006: Structured Logging with Correlation IDs for Distributed Tracing

**Decision:** Implement structured JSON logging with correlation IDs propagated across mobile app, backend API, and AI orchestration service.

**Rationale:**
- Enables end-to-end tracing of user requests across distributed services (NFR-028, AIR-012)
- Facilitates debugging of AI conversation flows with full context (prompt, response, validation, errors)
- Supports compliance audit requirements with immutable log trail (NFR-031, NFR-032)
- Enables performance analysis and bottleneck identification (AIR-011)
- Integrates with centralized logging platforms (Azure Monitor, ELK) for future production

**Trade-offs:**
- **Pros**: End-to-end visibility, debugging efficiency, compliance support, performance insights
- **Cons**: Increased log volume and storage costs, PII/PHI redaction complexity, correlation ID propagation overhead

**Alternatives Considered:**
- **Simple Text Logging**: Rejected due to inability to correlate distributed requests and poor query performance
- **OpenTelemetry**: Considered for Phase 2 but adds complexity for Phase 1 mock services

### AD-007: Exponential Backoff Retry with Circuit Breaker for AI Services

**Decision:** Implement exponential backoff retry (3 attempts, 1s/2s/4s delays) with circuit breaker pattern for AI service failures.

**Rationale:**
- Handles transient network failures and Azure OpenAI rate limiting gracefully (NFR-007)
- Circuit breaker prevents cascading failures and reduces load on degraded services
- Fallback to manual form entry after 3 failed attempts ensures workflow continuity (NFR-009)
- Aligns with cloud-native resilience patterns for production readiness
- Reduces user frustration with automatic retry before requiring manual intervention

**Trade-offs:**
- **Pros**: Resilience to transient failures, prevents cascading failures, automatic recovery, user experience continuity
- **Cons**: Increased latency during failures (up to 7s for 3 retries), complexity in retry state management

**Alternatives Considered:**
- **Immediate Failure**: Rejected due to poor user experience and inability to handle transient network issues
- **Unlimited Retries**: Rejected due to potential infinite loops and poor user experience during sustained outages

## Technology Stack

| Layer | Technology | Version | Justification (NFR/DR/AIR) |
|-------|------------|---------|----------------------------|
| **Mobile** | React Native | 0.73+ | NFR-026 (cross-platform iOS/Android), NFR-006 (offline-first with AsyncStorage), NFR-023 (rich UI for visual confirmation) |
| **Mobile State** | React Query + Zustand | 5.x / 4.x | NFR-006 (offline-first caching), NFR-008 (session state management), NFR-003 (optimistic updates) |
| **Mobile Storage** | AsyncStorage | 1.21+ | NFR-005 (fast local persistence <500ms), NFR-006 (offline capability), DR-013 (partial session retention) |
| **Voice Input** | react-native-voice | 3.2+ | AIR-002 (device microphone integration), NFR-021 (speech capture in clinical environments) |
| **Backend API** | FastAPI | 0.110+ | NFR-002 (async performance), NFR-026 (modular architecture), NFR-027 (OpenAPI docs), NFR-030 (versioning support) |
| **AI Orchestration** | FastAPI (separate service) | 0.110+ | AIR-001 to AIR-015 (AI service isolation), NFR-013 (independent scaling), NFR-029 (feature flags) |
| **Database** | PostgreSQL | 16+ | DR-006 to DR-010 (ACID compliance, referential integrity, constraints), NFR-011 (scalability to 10K+ records), DR-016 (point-in-time recovery) |
| **ORM** | SQLAlchemy (async) | 2.0+ | NFR-002 (async database queries), DR-010 (optimistic locking), NFR-026 (modular data layer) |
| **AI Model** | Azure OpenAI GPT-4o-mini | 2024-07-18 | AIR-001 (conversational question generation), AIR-004 (alternative phrasing), NFR-019 (HIPAA BAA), NFR-002 (low latency) |
| **Speech-to-Text** | Azure Speech Services | Latest | AIR-002 (medical terminology custom model), NFR-021 (95%+ accuracy), NFR-019 (HIPAA BAA) |
| **AI Gateway** | Custom FastAPI middleware | N/A | AIR-008 (response caching), AIR-011 (metrics tracking), AIR-007 (input sanitization), NFR-018 (prompt injection prevention) |
| **Authentication** | JWT (PyJWT) | 2.8+ | NFR-017 (stateless sessions, 8-hour expiration), NFR-020 (RBAC), NFR-015 (secure token signing) |
| **Encryption** | cryptography (Python) | 42+ | NFR-015 (TLS 1.3), NFR-016 (AES-256 at rest), DR-019 (backup encryption) |
| **Logging** | structlog | 24+ | NFR-028 (structured JSON logs), AIR-012 (correlation IDs), NFR-031 (audit trail) |
| **Testing** | Pytest + React Native Testing Library | 8.x / 14.x | NFR-026 (maintainability), NFR-035 (data anonymization for tests) |
| **API Docs** | FastAPI OpenAPI | Built-in | NFR-027 (OpenAPI 3.0 spec), NFR-026 (API documentation) |
| **Monitoring** | Azure Monitor (future) | N/A | AIR-011 (AI metrics), AIR-013 (alerting), NFR-010 (uptime tracking) |

### Alternative Technology Options

**Mobile Framework Alternatives:**
- **Flutter**: Considered for performance and single codebase, but rejected due to team expertise in React/JavaScript ecosystem and smaller healthcare-specific library ecosystem
- **Native iOS/Android**: Rejected due to dual codebase maintenance burden and slower development velocity for Phase 1 MVP

**Backend Framework Alternatives:**
- **Node.js (Express/NestJS)**: Considered for JavaScript ecosystem alignment with React Native, but rejected due to FastAPI's superior async performance, automatic OpenAPI generation, and Python AI library ecosystem
- **Django**: Rejected due to synchronous nature and heavier framework overhead for API-only backend

**Database Alternatives:**
- **MongoDB**: Considered for flexible schema, but rejected due to lack of ACID guarantees for healthcare data integrity (DR-008) and weaker referential integrity enforcement
- **SQLite**: Considered for simplicity, but rejected due to limited concurrent write support (NFR-001: 50 concurrent sessions) and lack of enterprise backup features (DR-016)

**AI Model Alternatives:**
- **GPT-4o**: Considered for higher accuracy, but rejected due to 3x higher cost and unnecessary capability for structured question generation; GPT-4o-mini sufficient for Phase 1
- **Anthropic Claude 3.5 Sonnet**: Considered for longer context window, but rejected due to lack of HIPAA BAA on Anthropic API and preference for Azure ecosystem integration

**Speech-to-Text Alternatives:**
- **Google Cloud Speech-to-Text**: Considered for medical model, but rejected due to Azure ecosystem preference and HIPAA BAA complexity across multiple cloud providers
- **Whisper (OpenAI)**: Considered for open-source option, but rejected due to lack of real-time streaming, higher latency, and no HIPAA compliance path

### AI Component Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Model Provider** | Azure OpenAI GPT-4o-mini | LLM inference for conversational question generation, clarification rephrasing, error message generation |
| **Speech-to-Text** | Azure Speech Services | Real-time voice transcription with medical terminology custom model |
| **AI Gateway** | Custom FastAPI middleware | Request routing, response caching (Redis future), prompt injection prevention, token usage tracking |
| **Guardrails** | Pydantic + Custom validators | Structured output validation (JSON schema), content filtering (PII redaction), prompt sanitization |
| **Prompt Management** | LangChain (lightweight) | System prompt templates, few-shot examples, context injection for field metadata |
| **Observability** | structlog + Azure Monitor | AI request tracing, latency metrics, token usage, error rate, cache hit rate |

### Technology Decision Matrix

| Metric (from NFR/DR/AIR) | React Native + FastAPI + PostgreSQL + Azure OpenAI | Flutter + Node.js + MongoDB + OpenAI API | Native + Django + MySQL + Anthropic |
|--------------------------|-----------------------------------------------------|------------------------------------------|-------------------------------------|
| **NFR-002: Response Time <2s** | ✅ Excellent (async FastAPI, optimized queries) | ⚠️ Good (Node.js async, but MongoDB query overhead) | ⚠️ Good (Native fast, but Django sync overhead) |
| **NFR-006: Offline-First** | ✅ Excellent (AsyncStorage, React Query) | ✅ Excellent (Hive, Provider) | ⚠️ Moderate (Native storage, complex sync) |
| **NFR-019: HIPAA Compliance** | ✅ Excellent (Azure OpenAI BAA, Azure ecosystem) | ❌ Poor (OpenAI API no BAA) | ⚠️ Moderate (Anthropic BAA unclear) |
| **NFR-021: Speech Accuracy 95%+** | ✅ Excellent (Azure Speech medical model) | ✅ Excellent (Google Speech medical model) | ⚠️ Good (Whisper, but higher latency) |
| **NFR-026: Maintainability** | ✅ Excellent (modular, strong typing, OpenAPI) | ⚠️ Good (modular, but weaker typing) | ⚠️ Moderate (dual codebase, Django monolith) |
| **DR-008: Data Integrity** | ✅ Excellent (PostgreSQL ACID, constraints) | ❌ Poor (MongoDB eventual consistency) | ✅ Excellent (MySQL ACID) |
| **AIR-001: AI Integration** | ✅ Excellent (Azure OpenAI, Python AI libs) | ⚠️ Good (OpenAI API, JS libs) | ⚠️ Moderate (Anthropic, limited libs) |
| **Team Expertise** | ✅ Excellent (React + Python common stack) | ⚠️ Moderate (Flutter learning curve) | ❌ Poor (Native requires iOS + Android teams) |
| **Development Velocity** | ✅ Excellent (single codebase, rapid iteration) | ✅ Excellent (single codebase) | ❌ Poor (dual codebase, slower iteration) |
| **Total Cost (AI + Infra)** | ⚠️ Moderate (Azure OpenAI premium ~20%) | ✅ Low (OpenAI API cheaper) | ⚠️ Moderate (Anthropic pricing similar) |

**Winner: React Native + FastAPI + PostgreSQL + Azure OpenAI**

**Rationale:** Best balance of HIPAA compliance (critical for healthcare), development velocity (single codebase), data integrity (PostgreSQL ACID), and team expertise. Azure OpenAI premium cost justified by BAA coverage and integrated ecosystem. Offline-first capability and speech accuracy meet core NFRs.

## Technical Requirements

### Mobile Application Requirements

- TR-001: Mobile application MUST be built using React Native 0.73+ with TypeScript for type safety and cross-platform iOS/Android support (Justification: NFR-026 modular architecture, NFR-030 backward compatibility)
- TR-002: Mobile application MUST implement offline-first architecture using AsyncStorage for local persistence and React Query for data synchronization (Justification: NFR-006 offline capability, NFR-008 session integrity)
- TR-003: Mobile application MUST integrate react-native-voice library for device microphone access with permission handling for iOS/Android (Justification: AIR-002 speech capture, NFR-021 clinical environment support)
- TR-004: Mobile application MUST implement Zustand for global state management (authentication, hospital context, session state) with persistence middleware (Justification: NFR-005 fast persistence, NFR-008 state restoration)
- TR-005: Mobile application MUST support iOS 14+ and Android 10+ with minimum device requirements: 2GB RAM, 500MB storage (Justification: NFR-011 scalability, NFR-006 local storage)

### Backend API Requirements

- TR-006: Backend API MUST be implemented using FastAPI 0.110+ with async/await patterns for all I/O operations (database, AI services) (Justification: NFR-002 response time, NFR-001 concurrent sessions)
- TR-007: Backend API MUST use SQLAlchemy 2.0+ async ORM with PostgreSQL 16+ database for ACID compliance and referential integrity (Justification: DR-006 to DR-010 data integrity, NFR-011 scalability)
- TR-008: Backend API MUST implement RESTful endpoints with OpenAPI 3.0 specification auto-generated by FastAPI (Justification: NFR-027 API documentation, NFR-026 maintainability)
- TR-009: Backend API MUST implement JWT-based authentication with RS256 signing, 8-hour token expiration, and refresh token rotation (Justification: NFR-017 session management, NFR-020 RBAC)
- TR-010: Backend API MUST implement database connection pooling (min 10, max 50 connections) with automatic reconnection on failure (Justification: NFR-001 concurrent sessions, NFR-010 uptime)

### AI Orchestration Service Requirements

- TR-011: AI orchestration service MUST be implemented as separate FastAPI microservice with dedicated deployment and scaling configuration (Justification: NFR-013 independent scaling, AIR-011 isolated monitoring)
- TR-012: AI orchestration service MUST integrate Azure OpenAI GPT-4o-mini (2024-07-18) with function calling for structured question generation (Justification: AIR-001 conversational flow, AIR-004 alternative phrasing)
- TR-013: AI orchestration service MUST integrate Azure Speech Services with custom medical terminology model for speech-to-text transcription (Justification: AIR-002 medical accuracy, NFR-021 95%+ accuracy)
- TR-014: AI orchestration service MUST implement prompt templates using LangChain with system prompts, few-shot examples, and field metadata injection (Justification: AIR-006 prompt engineering, AIR-007 output validation)
- TR-015: AI orchestration service MUST implement response caching (in-memory for Phase 1, Redis for Phase 2) with cache key based on field name and validation rules (Justification: AIR-008 latency reduction, NFR-003 question transition <1s)

### Security Requirements

- TR-016: All API communications MUST use TLS 1.3 with certificate pinning on mobile application (Justification: NFR-015 data in transit encryption)
- TR-017: Sensitive patient data (MRN, DOB, Name) MUST be encrypted at rest in AsyncStorage using AES-256 with device keychain-backed keys (Justification: NFR-016 data at rest encryption, NFR-019 HIPAA)
- TR-018: AI service MUST implement input sanitization to prevent prompt injection: strip special characters, limit input length to 500 chars, validate against field type (Justification: NFR-018 prompt injection prevention, AIR-007 input validation)
- TR-019: Backend API MUST implement rate limiting: 100 requests/minute per user, 1000 requests/minute per IP (Justification: NFR-010 availability, security against abuse)
- TR-020: All services MUST implement CORS with whitelist of allowed origins (mobile app bundle IDs) (Justification: NFR-015 security, NFR-020 access control)

### Data Layer Requirements

- TR-021: Database schema MUST enforce mandatory field constraints at table level: NOT NULL for required fields, CHECK constraints for enums (Justification: DR-008 data integrity, NFR-003 validation)
- TR-022: Database MUST implement optimistic locking using version column for concurrent session updates (Justification: DR-010 concurrent update handling, NFR-001 concurrent sessions)
- TR-023: Database MUST implement soft delete with deleted_at timestamp for patient records with 30-day retention before permanent deletion (Justification: DR-015 soft delete, DR-011 retention)
- TR-024: Database MUST implement automated daily backups with point-in-time recovery using PostgreSQL WAL archiving (Justification: DR-016 backup, DR-018 disaster recovery)
- TR-025: Database MUST implement row-level security (RLS) policies for multi-tenancy (hospital isolation) in preparation for production (Justification: NFR-020 RBAC, NFR-019 HIPAA)

### Integration Requirements

- TR-026: Mobile application MUST communicate with backend API using REST over HTTPS with JSON payloads (Justification: NFR-015 security, NFR-027 standard API)
- TR-027: Backend API MUST communicate with AI orchestration service using internal HTTP with correlation ID propagation (Justification: NFR-028 distributed tracing, AIR-012 observability)
- TR-028: AI orchestration service MUST integrate Azure OpenAI using official Python SDK with retry logic and timeout configuration (3s timeout, 3 retries) (Justification: NFR-007 graceful failures, AIR-009 fallback)
- TR-029: AI orchestration service MUST integrate Azure Speech Services using WebSocket streaming for real-time transcription (Justification: NFR-002 response time <2s, AIR-002 speech-to-text)
- TR-030: Mobile application MUST implement background sync queue for offline data with conflict resolution based on timestamp (last-write-wins) (Justification: NFR-006 offline sync, DR-010 conflict resolution)

### Observability Requirements

- TR-031: All services MUST implement structured JSON logging using structlog with fields: timestamp, correlation_id, service_name, log_level, message, context (Justification: NFR-028 distributed tracing, NFR-031 audit logging)
- TR-032: All services MUST propagate correlation IDs (UUID v4) in HTTP headers (X-Correlation-ID) across mobile → backend → AI service (Justification: AIR-012 end-to-end tracing, NFR-028 debugging)
- TR-033: AI orchestration service MUST log AI interactions with fields: prompt_tokens, completion_tokens, latency_ms, model_version, cache_hit, error_code (Justification: AIR-011 AI metrics, AIR-010 performance monitoring)
- TR-034: Backend API MUST implement health check endpoints (/health, /ready) for liveness and readiness probes (Justification: NFR-010 uptime monitoring, future Kubernetes deployment)
- TR-035: All services MUST emit metrics to Azure Monitor (future) or Prometheus-compatible endpoint: request_count, request_duration, error_rate, active_sessions (Justification: AIR-013 alerting, NFR-010 uptime)

### Testing Requirements

- TR-036: Mobile application MUST achieve 80%+ code coverage with unit tests (Jest) and integration tests (React Native Testing Library) (Justification: NFR-026 maintainability, NFR-030 backward compatibility)
- TR-037: Backend API MUST achieve 85%+ code coverage with unit tests (Pytest) and API integration tests (TestClient) (Justification: NFR-026 maintainability, DR-008 data integrity validation)
- TR-038: AI orchestration service MUST implement mock Azure OpenAI/Speech responses for deterministic testing without API costs (Justification: NFR-026 maintainability, AIR-010 AI testing)
- TR-039: All services MUST implement data anonymization for test environments: hash MRN, randomize names, shift dates (Justification: NFR-035 data anonymization, NFR-019 HIPAA)
- TR-040: End-to-end tests MUST validate complete user flows: authentication → hospital selection → patient search → AI voice entry → confirmation → submission (Justification: NFR-026 maintainability, integration validation)

## Technical Constraints & Assumptions

### Constraints

- **C-001: Phase 1 Mock Services**: Authentication and patient database are mock implementations without production EHR integration, limiting data persistence to local/development databases
- **C-002: Internet Connectivity for AI**: AI conversational assistant requires active internet connection for Azure OpenAI and Speech Services; offline mode degrades to manual form entry
- **C-003: Azure Cloud Dependency**: Architecture assumes Azure cloud infrastructure for OpenAI, Speech Services, and future production deployment; multi-cloud not supported in Phase 1
- **C-004: Single Treatment Type**: Phase 1 supports only Hemodialysis treatment workflow; architecture must support future treatment types without refactoring
- **C-005: Mobile Device Requirements**: Requires iOS 14+/Android 10+ devices with microphone, 2GB+ RAM, and 500MB storage; older devices not supported

### Assumptions

- **A-001: Hospital WiFi Availability**: Assumes hospitals provide WiFi or cellular connectivity for tablet devices with sufficient bandwidth (1 Mbps+) for AI service calls
- **A-002: Nurse Digital Literacy**: Assumes nurses are comfortable with voice interaction and can adapt to conversational AI workflow with <30 minutes training
- **A-003: Device Microphone Quality**: Assumes tablet devices have functional microphones with adequate quality for speech capture in 50-60 dB clinical noise environments
- **A-004: Azure OpenAI Availability**: Assumes Azure OpenAI GPT-4o-mini and Speech Services maintain 99.9% uptime and <2s response time during business hours
- **A-005: Data Volume**: Assumes 200 concurrent nurses, 10,000 patients per hospital, 500 sessions/day with 15 fields average per session for capacity planning

## Development Workflow

### Phase 1: Environment Setup & Foundation (Week 1-2)

1. **Development Environment**
   - Set up React Native development environment (Xcode for iOS, Android Studio for Android)
   - Configure FastAPI backend with PostgreSQL database (Docker Compose for local development)
   - Set up Azure OpenAI and Speech Services accounts with API keys and HIPAA BAA
   - Configure Git repository with branching strategy (main, develop, feature branches)
   - Set up CI/CD pipeline skeleton (GitHub Actions or Azure DevOps)

2. **Project Scaffolding**
   - Initialize React Native project with TypeScript, ESLint, Prettier
   - Initialize FastAPI projects (backend API, AI orchestration service) with Poetry for dependency management
   - Set up PostgreSQL database schema with migrations (Alembic)
   - Configure structured logging (structlog) and correlation ID middleware
   - Set up testing frameworks (Jest, Pytest, React Native Testing Library)

### Phase 2: Core Backend Development (Week 3-4)

3. **Database Layer**
   - Implement SQLAlchemy models for Patient, Treatment, Clinical Intake, Session, Audit Log, Nurse, Hospital entities
   - Create database migrations with constraints, indexes, and relationships
   - Implement repository pattern for data access with async methods
   - Add optimistic locking and soft delete functionality
   - Write unit tests for data layer (85%+ coverage)

4. **Authentication & Authorization**
   - Implement JWT authentication with RS256 signing and refresh tokens
   - Create mock nurse authentication service (Phase 1)
   - Implement RBAC middleware for role-based access control
   - Add session management endpoints (login, logout, refresh, validate)
   - Write integration tests for authentication flows

5. **Core API Endpoints**
   - Implement hospital management endpoints (list, search, select)
   - Implement patient management endpoints (search, create, retrieve, update)
   - Implement treatment endpoints (create, retrieve, update, complete)
   - Implement session management endpoints (create, update, resume, abandon)
   - Implement audit logging for all data modification operations

### Phase 3: AI Orchestration Service (Week 5-6)

6. **Azure OpenAI Integration**
   - Integrate Azure OpenAI SDK with GPT-4o-mini function calling
   - Implement prompt templates with system prompts and few-shot examples
   - Create question generation service with field metadata injection
   - Implement alternative phrasing service for clarifications
   - Add response caching with in-memory cache (Redis for Phase 2)

7. **Azure Speech Services Integration**
   - Integrate Azure Speech SDK with WebSocket streaming
   - Configure custom medical terminology model
   - Implement real-time transcription service with error handling
   - Add speech confidence scoring and low-confidence flagging
   - Implement retry logic with exponential backoff

8. **AI Guardrails & Validation**
   - Implement input sanitization to prevent prompt injection
   - Add Pydantic models for structured output validation
   - Implement content filtering for PII redaction
   - Add AI service health checks and circuit breaker pattern
   - Create mock AI responses for testing

### Phase 4: Mobile Application Development (Week 7-9)

9. **Mobile Foundation**
   - Set up React Native navigation (React Navigation)
   - Implement global state management (Zustand) with persistence
   - Configure AsyncStorage for offline-first data persistence
   - Set up React Query for API data fetching and caching
   - Implement correlation ID generation and propagation

10. **Authentication & Hospital Selection**
    - Build login screen with form validation
    - Implement JWT token storage and refresh logic
    - Build hospital selection screen with search functionality
    - Implement session persistence across app restarts
    - Add logout functionality with token cleanup

11. **Patient Management**
    - Build patient dashboard with active/completed filters
    - Implement patient recall search with MRN validation
    - Build treatment page with form field rendering
    - Add manual form entry as fallback
    - Implement offline data sync queue

12. **AI Voice Integration**
    - Integrate react-native-voice for microphone access
    - Build AI voice icon and activation UI
    - Implement real-time transcription display with visual confirmation
    - Add field-by-field progression with validation feedback
    - Implement clarification request handling
    - Add no-response timeout and retry logic

13. **Session Management & Confirmation**
    - Implement partial session saving on interruption
    - Build session resume detection and prompt
    - Create confirmation screen with field-level editing
    - Add final submission with validation
    - Implement audit log capture for all events

### Phase 5: Testing & Quality Assurance (Week 10-11)

14. **Unit & Integration Testing**
    - Write unit tests for mobile components (80%+ coverage)
    - Write unit tests for backend services (85%+ coverage)
    - Write integration tests for API endpoints
    - Write end-to-end tests for critical user flows
    - Implement data anonymization for test environments

15. **Performance Testing**
    - Load test backend API with 50 concurrent sessions
    - Test AI service response time under load (<2s p95)
    - Test offline-first sync with 100+ partial sessions
    - Test speech recognition accuracy with medical terminology
    - Optimize database queries and add indexes

16. **Security Testing**
    - Penetration testing for prompt injection vulnerabilities
    - Test TLS certificate pinning on mobile
    - Test encryption at rest for AsyncStorage
    - Test JWT token expiration and refresh
    - Validate CORS and rate limiting

### Phase 6: Deployment & Documentation (Week 12)

17. **Deployment**
    - Deploy backend API to staging environment (Azure App Service or AWS ECS)
    - Deploy AI orchestration service to staging
    - Deploy PostgreSQL database with backups configured
    - Configure Azure OpenAI and Speech Services for staging
    - Set up monitoring and alerting (Azure Monitor)

18. **Documentation**
    - Generate OpenAPI documentation for backend API
    - Write mobile app user guide for nurses
    - Write deployment runbook for DevOps
    - Document AI prompt templates and configuration
    - Create troubleshooting guide for common issues

19. **User Acceptance Testing**
    - Conduct UAT with pilot nurse group (5-10 nurses)
    - Collect feedback on AI conversation quality
    - Measure speech recognition accuracy in real clinical environments
    - Validate session resume and offline functionality
    - Iterate on prompt engineering based on feedback

20. **Production Readiness**
    - Final security review and HIPAA compliance checklist
    - Performance baseline establishment (response time, throughput)
    - Disaster recovery testing (backup restoration)
    - Create rollback plan for production deployment
    - Prepare Phase 2 roadmap (EHR integration, additional treatment types)
