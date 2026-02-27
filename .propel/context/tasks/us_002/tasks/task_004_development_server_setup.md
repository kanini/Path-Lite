# Task - TASK_004

## Requirement Reference
- User Story: US_002
- Story Location: .propel/context/tasks/us_002/us_002.md
- Acceptance Criteria:  
    - **AC4**: Given the API needs to run, When I start the development server, Then uvicorn serves the FastAPI app on localhost:8000 with auto-reload enabled and OpenAPI documentation accessible at /docs.
- Edge Case:
    - N/A (Standard development server configuration)

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
| Backend | Uvicorn | 0.27+ |

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
Configure Uvicorn development server with auto-reload, proper logging, and optimal development settings. Verify OpenAPI documentation accessibility and create development scripts for easy server management.

## Dependent Tasks
- TASK_001: Python Project Initialization
- TASK_002: FastAPI Async Configuration
- TASK_003: Router Structure Setup

## Impacted Components
- **CREATE**: Server/scripts/ (development scripts directory)
- **CREATE**: Server/scripts/dev.py (development server script)
- **CREATE**: Server/scripts/start.sh (Unix start script)
- **CREATE**: Server/scripts/start.bat (Windows start script)
- **MODIFY**: Server/pyproject.toml (add scripts section)
- **MODIFY**: Server/.env.example (add server configuration)
- **MODIFY**: Server/README.md (add server startup documentation)

## Implementation Plan
1. **Uvicorn Configuration**
   - Configure uvicorn with auto-reload enabled
   - Set host to 0.0.0.0 for network accessibility
   - Set port to 8000 (configurable via environment)
   - Configure log level (info for development, warning for production)
   - Enable access logs for request tracking

2. **Development Script Creation**
   - Create scripts/dev.py for programmatic server start
   - Add command-line arguments for host, port, reload
   - Implement graceful shutdown handling
   - Add development-specific logging configuration

3. **Shell Scripts for Quick Start**
   - Create start.sh for Unix/Linux/macOS
   - Create start.bat for Windows
   - Make scripts executable and add to .gitignore if needed
   - Add error handling for missing dependencies

4. **Poetry Scripts Configuration**
   - Add [tool.poetry.scripts] section to pyproject.toml
   - Create "dev" command for development server
   - Create "start" command for production server
   - Create "test" command for running tests

5. **OpenAPI Documentation Verification**
   - Verify /docs endpoint serves Swagger UI
   - Verify /redoc endpoint serves ReDoc UI
   - Verify /openapi.json endpoint serves OpenAPI schema
   - Configure OpenAPI metadata (title, version, description)

6. **Logging Configuration**
   - Configure uvicorn logging format
   - Add request/response logging
   - Configure log rotation for production
   - Add structured logging support

7. **Development Environment Documentation**
   - Document server startup commands in README
   - Add troubleshooting section for common issues
   - Document environment variables for server configuration
   - Add examples for different development scenarios

## Current Project State
```
Server/
├── pyproject.toml
├── main.py (with routers registered)
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
├── tests/
│   └── __init__.py
├── .env
├── .env.example
└── README.md
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | Server/scripts/__init__.py | Scripts package initialization |
| CREATE | Server/scripts/dev.py | Development server launcher script |
| CREATE | Server/scripts/start.sh | Unix/Linux/macOS start script |
| CREATE | Server/scripts/start.bat | Windows start script |
| MODIFY | Server/pyproject.toml | Add [tool.poetry.scripts] section |
| MODIFY | Server/.env.example | Add SERVER_HOST, SERVER_PORT, LOG_LEVEL |
| MODIFY | Server/README.md | Add server startup and development documentation |
| CREATE | Server/.vscode/launch.json | VSCode debug configuration (optional) |

## External References
- [Uvicorn Documentation](https://www.uvicorn.org/)
- [Uvicorn Settings](https://www.uvicorn.org/settings/)
- [FastAPI Deployment](https://fastapi.tiangolo.com/deployment/)
- [Poetry Scripts](https://python-poetry.org/docs/pyproject/#scripts)
- [Python Logging Documentation](https://docs.python.org/3/library/logging.html)

## Build Commands
```bash
# Using Poetry script (after configuration)
cd Server
poetry run dev

# Direct uvicorn command
poetry run uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Using shell script
./scripts/start.sh

# Windows
scripts\start.bat

# With custom port
poetry run uvicorn main:app --reload --port 8080
```

## Implementation Validation Strategy
- [x] Development server starts successfully on localhost:8000
- [x] Auto-reload works when code changes are detected
- [x] OpenAPI documentation accessible at http://localhost:8000/docs
- [x] ReDoc documentation accessible at http://localhost:8000/redoc
- [x] OpenAPI JSON schema accessible at http://localhost:8000/openapi.json
- [x] Server logs requests and responses properly
- [x] Poetry scripts execute without errors
- [x] Shell scripts work on target platforms
- [x] Graceful shutdown works (Ctrl+C)
- [ ] Unit tests pass
- [ ] Integration tests pass (if applicable)

## Implementation Checklist
- [x] Create scripts/ directory in Server/
- [x] Create scripts/__init__.py
- [x] Create scripts/dev.py with uvicorn configuration
- [x] Add argparse for command-line arguments (--host, --port, --reload)
- [x] Implement graceful shutdown handling in dev.py
- [x] Configure uvicorn with reload=True for development
- [x] Configure uvicorn with host from environment or default 0.0.0.0
- [x] Configure uvicorn with port from environment or default 8000
- [x] Configure uvicorn log_level from environment or default "info"
- [x] Enable access_log for request tracking
- [x] Create scripts/start.sh for Unix/Linux/macOS
- [x] Add shebang (#!/bin/bash) to start.sh
- [x] Add Poetry check and installation in start.sh
- [x] Add uvicorn command with auto-reload in start.sh
- [x] Make start.sh executable (chmod +x)
- [x] Create scripts/start.bat for Windows
- [x] Add Poetry check in start.bat
- [x] Add uvicorn command with auto-reload in start.bat
- [x] Add [tool.poetry.scripts] section to pyproject.toml
- [x] Add "dev" script: "uvicorn main:app --reload --host 0.0.0.0 --port 8000"
- [x] Add "start" script: "uvicorn main:app --host 0.0.0.0 --port 8000"
- [x] Add "test" script: "pytest tests/"
- [x] Update .env.example with SERVER_HOST=0.0.0.0
- [x] Update .env.example with SERVER_PORT=8000
- [x] Update .env.example with LOG_LEVEL=info
- [x] Update .env.example with RELOAD=true
- [x] Test server starts with `poetry run dev`
- [x] Test server starts with `./scripts/start.sh`
- [x] Test server starts with `scripts\start.bat` (Windows)
- [x] Verify auto-reload works by modifying a file
- [x] Access http://localhost:8000/docs and verify Swagger UI loads
- [x] Access http://localhost:8000/redoc and verify ReDoc loads
- [x] Access http://localhost:8000/openapi.json and verify JSON schema
- [x] Test graceful shutdown with Ctrl+C
- [x] Verify server logs show request/response information
- [x] Update README.md with "Running the Development Server" section
- [x] Document all Poetry scripts in README
- [x] Add troubleshooting section for common startup issues
- [x] Add examples for different development scenarios (custom port, debug mode)
- [x] Create .vscode/launch.json for VSCode debugging (optional)
