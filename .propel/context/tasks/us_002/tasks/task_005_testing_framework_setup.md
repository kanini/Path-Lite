# Task - TASK_005

## Requirement Reference
- User Story: US_002
- Story Location: .propel/context/tasks/us_002/us_002.md
- Acceptance Criteria:  
    - **AC3**: Given dependencies need management, When I set up Poetry for dependency management, Then the system has pyproject.toml with all required dependencies: fastapi, uvicorn, pydantic, python-jose (JWT), azure-openai, and pytest.
- Edge Case:
    - N/A (Testing framework setup)

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
| Library | pytest | 8.x |
| Library | pytest-asyncio | 0.23+ |
| Library | httpx | 0.27+ |
| Library | pytest-cov | 4.x |

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
Set up comprehensive testing framework with pytest, pytest-asyncio for async tests, httpx for API testing, and pytest-cov for code coverage. Create sample tests for routers and establish testing best practices.

## Dependent Tasks
- TASK_001: Python Project Initialization
- TASK_002: FastAPI Async Configuration
- TASK_003: Router Structure Setup
- TASK_004: Development Server Setup

## Impacted Components
- **MODIFY**: Server/pyproject.toml (add test dependencies)
- **CREATE**: Server/pytest.ini (pytest configuration)
- **CREATE**: Server/tests/conftest.py (pytest fixtures)
- **CREATE**: Server/tests/test_main.py (main app tests)
- **CREATE**: Server/tests/test_auth.py (auth router tests)
- **CREATE**: Server/tests/test_patients.py (patients router tests)
- **CREATE**: Server/tests/test_ai_processing.py (AI router tests)
- **CREATE**: Server/.coveragerc (coverage configuration)
- **MODIFY**: Server/README.md (add testing documentation)

## Implementation Plan
1. **Testing Dependencies Installation**
   - Add pytest to dependencies
   - Add pytest-asyncio for async test support
   - Add httpx for TestClient (async HTTP client)
   - Add pytest-cov for code coverage
   - Add pytest-mock for mocking support

2. **Pytest Configuration**
   - Create pytest.ini with test discovery settings
   - Configure asyncio mode for pytest-asyncio
   - Set up test markers (unit, integration, slow)
   - Configure test output format
   - Set up coverage reporting

3. **Test Fixtures Setup**
   - Create conftest.py with shared fixtures
   - Implement test_client fixture using TestClient
   - Implement async_client fixture for async tests
   - Implement mock_db fixture for database mocking
   - Implement mock_user fixture for authentication

4. **Main Application Tests**
   - Create test_main.py
   - Test health check endpoint
   - Test CORS configuration
   - Test OpenAPI schema generation
   - Test application startup/shutdown events

5. **Router Tests**
   - Create test_auth.py for authentication endpoints
   - Create test_patients.py for patient endpoints
   - Create test_ai_processing.py for AI endpoints
   - Test request validation (Pydantic models)
   - Test response formatting
   - Test error handling

6. **Coverage Configuration**
   - Create .coveragerc for coverage settings
   - Configure coverage source paths
   - Set coverage thresholds
   - Configure coverage report format
   - Exclude test files from coverage

7. **Testing Documentation**
   - Document testing commands in README
   - Add testing best practices guide
   - Document fixture usage
   - Add examples for writing new tests

## Current Project State
```
Server/
├── pyproject.toml
├── main.py
├── app/
│   ├── __init__.py
│   ├── core/
│   │   ├── __init__.py
│   │   ├── config.py
│   │   └── middleware.py
│   ├── routers/
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   ├── patients.py
│   │   └── ai_processing.py
│   ├── models/
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   ├── patient.py
│   │   └── ai.py
│   ├── services/
│   │   └── __init__.py
│   ├── utils/
│   │   └── __init__.py
│   └── dependencies.py
├── scripts/
│   ├── __init__.py
│   ├── dev.py
│   ├── start.sh
│   └── start.bat
├── tests/
│   └── __init__.py
├── .env
├── .env.example
└── README.md
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| MODIFY | Server/pyproject.toml | Add pytest, pytest-asyncio, httpx, pytest-cov, pytest-mock |
| CREATE | Server/pytest.ini | Pytest configuration file |
| CREATE | Server/tests/conftest.py | Shared test fixtures |
| CREATE | Server/tests/test_main.py | Main application tests |
| CREATE | Server/tests/test_auth.py | Authentication router tests |
| CREATE | Server/tests/test_patients.py | Patients router tests |
| CREATE | Server/tests/test_ai_processing.py | AI processing router tests |
| CREATE | Server/.coveragerc | Coverage configuration |
| MODIFY | Server/README.md | Add testing documentation section |

## External References
- [Pytest Documentation](https://docs.pytest.org/)
- [Pytest-Asyncio Documentation](https://pytest-asyncio.readthedocs.io/)
- [FastAPI Testing](https://fastapi.tiangolo.com/tutorial/testing/)
- [HTTPX Documentation](https://www.python-httpx.org/)
- [Pytest-Cov Documentation](https://pytest-cov.readthedocs.io/)

## Build Commands
```bash
# Install test dependencies
cd Server
poetry add --group dev pytest pytest-asyncio httpx pytest-cov pytest-mock

# Run all tests
poetry run pytest

# Run tests with coverage
poetry run pytest --cov=app --cov-report=html --cov-report=term

# Run specific test file
poetry run pytest tests/test_auth.py

# Run tests with markers
poetry run pytest -m unit
poetry run pytest -m integration

# Run tests in verbose mode
poetry run pytest -v

# Run tests and show print statements
poetry run pytest -s
```

## Implementation Validation Strategy
- [x] All test dependencies installed successfully
- [x] pytest.ini configuration loads without errors
- [x] Test fixtures work correctly
- [x] Sample tests pass for all routers
- [x] Code coverage report generates successfully
- [x] Coverage meets minimum threshold (>80%)
- [x] Test markers work correctly
- [x] Async tests execute properly
- [x] TestClient works for API testing
- [ ] Unit tests pass
- [ ] Integration tests pass (if applicable)

## Implementation Checklist
- [x] Add pytest to pyproject.toml dev dependencies
- [x] Add pytest-asyncio to dev dependencies
- [x] Add httpx to dev dependencies
- [x] Add pytest-cov to dev dependencies
- [x] Add pytest-mock to dev dependencies
- [x] Run `poetry install` to install test dependencies
- [x] Create pytest.ini file
- [x] Configure testpaths = ["tests"] in pytest.ini
- [x] Configure asyncio_mode = auto in pytest.ini
- [x] Add test markers: unit, integration, slow
- [x] Configure addopts for verbose output and coverage
- [x] Create tests/conftest.py
- [x] Implement test_client fixture using TestClient from fastapi.testclient
- [x] Implement async_client fixture using AsyncClient from httpx
- [x] Implement mock_settings fixture for configuration
- [x] Implement mock_user fixture for authentication tests
- [x] Create tests/test_main.py
- [x] Write test for GET /health endpoint (test_health_check)
- [x] Write test for CORS headers (test_cors_headers)
- [x] Write test for OpenAPI schema (test_openapi_schema)
- [x] Write test for application startup (test_app_startup)
- [x] Create tests/test_auth.py
- [x] Write test for POST /api/v1/auth/login (test_login_success)
- [x] Write test for POST /api/v1/auth/login with invalid credentials (test_login_invalid)
- [x] Write test for POST /api/v1/auth/register (test_register_success)
- [x] Write test for GET /api/v1/auth/me (test_get_current_user)
- [x] Create tests/test_patients.py
- [x] Write test for GET /api/v1/patients (test_list_patients)
- [x] Write test for POST /api/v1/patients (test_create_patient)
- [x] Write test for GET /api/v1/patients/{id} (test_get_patient)
- [x] Write test for PUT /api/v1/patients/{id} (test_update_patient)
- [x] Create tests/test_ai_processing.py
- [x] Write test for POST /api/v1/ai/conversations (test_create_conversation)
- [x] Write test for POST /api/v1/ai/conversations/{id}/messages (test_send_message)
- [x] Write test for GET /api/v1/ai/conversations/{id} (test_get_conversation)
- [x] Create .coveragerc file
- [x] Configure [run] source = app in .coveragerc
- [x] Configure [run] omit = tests/*, */migrations/* in .coveragerc
- [x] Configure [report] precision = 2 in .coveragerc
- [x] Configure [report] fail_under = 80 in .coveragerc
- [x] Run `poetry run pytest` to verify all tests pass
- [x] Run `poetry run pytest --cov=app --cov-report=html` to generate coverage report
- [x] Verify coverage meets 80% threshold
- [x] Update README.md with "Testing" section
- [x] Document how to run tests in README
- [x] Document how to run tests with coverage in README
- [x] Document test markers and their usage in README
- [x] Add examples for writing new tests in README
