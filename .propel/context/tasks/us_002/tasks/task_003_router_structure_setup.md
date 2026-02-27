# Task - TASK_003

## Requirement Reference
- User Story: US_002
- Story Location: .propel/context/tasks/us_002/us_002.md
- Acceptance Criteria:  
    - **AC5**: Given the backend needs structure, When I organize the codebase, Then the system has separate routers for authentication, patients, and AI processing with proper dependency injection.
- Edge Case:
    - N/A (Structural organization task)

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
| Backend | Python | 3.11+ |
| Backend | FastAPI | 0.110+ |
| Backend | Pydantic | 2.x |

**Note**: All code and libraries MUST be compatible with versions above.

## AI References (AI Tasks Only)
| Reference Type | Value |
|----------------|-------|
| **AI Impact** | No |
| **AIR Requirements** | N/A |
| **AI Pattern** | N/A |
| **Prompt Template Path** | N/A |
| **Guardrails Config** | N/A |
| **Model Provider** | N/A |

## Mobile References (Mobile Tasks Only)
| Reference Type | Value |
|----------------|-------|
| **Mobile Impact** | No |
| **Platform Target** | N/A |
| **Min OS Version** | N/A |
| **Mobile Framework** | N/A |

## Task Overview
Create modular router structure for authentication, patients, and AI processing endpoints with proper dependency injection, route organization, and API versioning. This task establishes the foundation for all API endpoint development.

## Dependent Tasks
- TASK_001: Python Project Initialization
- TASK_002: FastAPI Async Configuration

## Impacted Components
- **CREATE**: Server/app/routers/auth.py (authentication endpoints)
- **CREATE**: Server/app/routers/patients.py (patient management endpoints)
- **CREATE**: Server/app/routers/ai_processing.py (AI conversation endpoints)
- **CREATE**: Server/app/dependencies.py (dependency injection functions)
- **MODIFY**: Server/app/routers/__init__.py (export all routers)
- **MODIFY**: Server/main.py (register routers with API versioning)
- **CREATE**: Server/app/models/auth.py (authentication schemas)
- **CREATE**: Server/app/models/patient.py (patient schemas)
- **CREATE**: Server/app/models/ai.py (AI processing schemas)

## Implementation Plan
1. **Dependency Injection Setup**
   - Create app/dependencies.py for shared dependencies
   - Implement get_current_user dependency (placeholder)
   - Implement get_db dependency (placeholder for database session)
   - Implement get_settings dependency (configuration access)
   - Add dependency injection examples and patterns

2. **Authentication Router Creation**
   - Create app/routers/auth.py with APIRouter
   - Define placeholder endpoints: POST /login, POST /register, POST /logout, GET /me
   - Add route tags for OpenAPI grouping
   - Implement dependency injection for authentication
   - Add request/response models in app/models/auth.py

3. **Patients Router Creation**
   - Create app/routers/patients.py with APIRouter
   - Define placeholder endpoints: GET /patients, POST /patients, GET /patients/{id}, PUT /patients/{id}
   - Add route tags for OpenAPI grouping
   - Implement dependency injection for authentication and database
   - Add request/response models in app/models/patient.py

4. **AI Processing Router Creation**
   - Create app/routers/ai_processing.py with APIRouter
   - Define placeholder endpoints: POST /conversations, POST /conversations/{id}/messages, GET /conversations/{id}
   - Add route tags for OpenAPI grouping
   - Implement dependency injection for authentication and AI service
   - Add request/response models in app/models/ai.py

5. **Pydantic Models Creation**
   - Create auth.py models: LoginRequest, LoginResponse, RegisterRequest, UserResponse
   - Create patient.py models: PatientCreate, PatientUpdate, PatientResponse, PatientList
   - Create ai.py models: ConversationCreate, MessageCreate, ConversationResponse, MessageResponse
   - Add proper validation rules and field descriptions

6. **Router Registration**
   - Import all routers in main.py
   - Register routers with API versioning prefix (/api/v1)
   - Configure router-specific middleware if needed
   - Add router documentation in OpenAPI

7. **API Versioning Strategy**
   - Implement /api/v1 prefix for all routes
   - Document versioning strategy in README
   - Prepare structure for future v2 endpoints

## Current Project State
```
Server/
├── pyproject.toml
├── main.py (with CORS and async config)
├── app/
│   ├── __init__.py
│   ├── core/
│   │   ├── __init__.py
│   │   ├── config.py
│   │   └── middleware.py
│   ├── routers/
│   │   └── __init__.py
│   ├── models/
│   │   └── __init__.py
│   ├── services/
│   │   └── __init__.py
│   └── utils/
│       └── __init__.py
├── tests/
│   └── __init__.py
├── .env
├── .env.example
└── README.md
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | Server/app/dependencies.py | Dependency injection functions |
| CREATE | Server/app/routers/auth.py | Authentication endpoints router |
| CREATE | Server/app/routers/patients.py | Patient management endpoints router |
| CREATE | Server/app/routers/ai_processing.py | AI conversation endpoints router |
| MODIFY | Server/app/routers/__init__.py | Export all routers |
| CREATE | Server/app/models/auth.py | Authentication Pydantic schemas |
| CREATE | Server/app/models/patient.py | Patient Pydantic schemas |
| CREATE | Server/app/models/ai.py | AI processing Pydantic schemas |
| MODIFY | Server/app/models/__init__.py | Export all models |
| MODIFY | Server/main.py | Register all routers with /api/v1 prefix |
| MODIFY | Server/README.md | Document API structure and endpoints |

## External References
- [FastAPI Bigger Applications](https://fastapi.tiangolo.com/tutorial/bigger-applications/)
- [FastAPI Dependencies](https://fastapi.tiangolo.com/tutorial/dependencies/)
- [FastAPI APIRouter](https://fastapi.tiangolo.com/tutorial/bigger-applications/#apirouter)
- [Pydantic Models Documentation](https://docs.pydantic.dev/latest/concepts/models/)
- [REST API Design Best Practices](https://restfulapi.net/)

## Build Commands
```bash
# Run development server
cd Server
poetry run uvicorn main:app --reload

# Test endpoints
curl http://localhost:8000/api/v1/auth/login
curl http://localhost:8000/api/v1/patients
curl http://localhost:8000/api/v1/ai/conversations

# View OpenAPI documentation
open http://localhost:8000/docs
```

## Implementation Validation Strategy
- [x] All routers registered and accessible via /api/v1 prefix
- [x] OpenAPI documentation shows all endpoints grouped by tags
- [x] Dependency injection works for all endpoints
- [x] Pydantic models validate request/response data
- [x] Each router has proper async route handlers
- [x] API versioning prefix applied consistently
- [ ] Unit tests pass
- [ ] Integration tests pass (if applicable)

## Implementation Checklist
- [ ] Create app/dependencies.py file
- [ ] Implement get_current_user dependency (return placeholder user)
- [ ] Implement get_db dependency (return placeholder database session)
- [ ] Implement get_settings dependency (return app configuration)
- [ ] Create app/routers/auth.py with APIRouter instance
- [ ] Add auth router tags: ["Authentication"]
- [ ] Define POST /login endpoint (placeholder implementation)
- [ ] Define POST /register endpoint (placeholder implementation)
- [ ] Define POST /logout endpoint (placeholder implementation)
- [ ] Define GET /me endpoint (placeholder implementation)
- [ ] Create app/models/auth.py
- [ ] Define LoginRequest model (username, password)
- [ ] Define LoginResponse model (access_token, token_type, user)
- [ ] Define RegisterRequest model (username, email, password)
- [ ] Define UserResponse model (id, username, email, created_at)
- [ ] Create app/routers/patients.py with APIRouter instance
- [ ] Add patients router tags: ["Patients"]
- [ ] Define GET /patients endpoint (list patients with pagination)
- [ ] Define POST /patients endpoint (create new patient)
- [ ] Define GET /patients/{id} endpoint (get patient by ID)
- [ ] Define PUT /patients/{id} endpoint (update patient)
- [ ] Create app/models/patient.py
- [ ] Define PatientCreate model (first_name, last_name, mrn, dob, etc.)
- [ ] Define PatientUpdate model (optional fields for update)
- [ ] Define PatientResponse model (id, all patient fields, created_at, updated_at)
- [ ] Define PatientList model (items, total, page, page_size)
- [ ] Create app/routers/ai_processing.py with APIRouter instance
- [ ] Add AI router tags: ["AI Processing"]
- [ ] Define POST /conversations endpoint (start new conversation)
- [ ] Define POST /conversations/{id}/messages endpoint (send message)
- [ ] Define GET /conversations/{id} endpoint (get conversation history)
- [ ] Create app/models/ai.py
- [ ] Define ConversationCreate model (patient_id, treatment_type)
- [ ] Define MessageCreate model (content, role)
- [ ] Define ConversationResponse model (id, patient_id, messages, status)
- [ ] Define MessageResponse model (id, content, role, timestamp)
- [ ] Update app/routers/__init__.py to export all routers
- [ ] Update app/models/__init__.py to export all models
- [ ] Import all routers in main.py
- [ ] Register auth router with prefix="/api/v1/auth"
- [ ] Register patients router with prefix="/api/v1/patients"
- [ ] Register AI router with prefix="/api/v1/ai"
- [ ] Add dependencies parameter to router registration where needed
- [ ] Test all endpoints return placeholder responses
- [ ] Verify OpenAPI docs show all endpoints at /docs
- [ ] Verify endpoints grouped by tags in OpenAPI UI
- [ ] Update README.md with API structure documentation
- [ ] Document all endpoints with descriptions and examples
