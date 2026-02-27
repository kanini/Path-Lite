# Task - TASK_005

## Requirement Reference
- User Story: US_004
- Story Location: `.propel/context/tasks/us_004/us_004.md`
- Acceptance Criteria:  
    - **AC5**: Given the backend needs to run, When I start the FastAPI server, Then the system runs uvicorn with auto-reload on localhost:8000 and displays "Application startup complete" message.
- Edge Case:
    - N/A (Covered by FastAPI startup validation)

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
| Backend | FastAPI | 0.110.0 |
| Database | N/A | N/A |
| Library | Uvicorn | 0.27.0 |
| AI/ML | Azure OpenAI | gpt-4 |
| Vector Store | N/A | N/A |
| AI Gateway | N/A | N/A |
| Mobile | N/A | N/A |

**Note**: All code, and libraries, MUST be compatible with versions above.

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
Create FastAPI application entry point with uvicorn server configuration, implement startup event handlers to display "Application startup complete" message, configure auto-reload for development, and create development server startup scripts with proper error handling and logging.

## Dependent Tasks
- TASK_002 (Environment Variables Configuration) - IN PROGRESS
- TASK_003 (Dependency Installation Automation) - IN PROGRESS

## Impacted Components
- **CREATE**: `/Server/app/main.py` - FastAPI application entry point
- **CREATE**: `/Server/app/config.py` - Application configuration from environment
- **CREATE**: `/Server/scripts/start-dev.py` - Development server starter
- **CREATE**: `/Server/scripts/start-dev.bat` - Windows wrapper
- **CREATE**: `/Server/scripts/start-dev.sh` - Unix/macOS wrapper
- **MODIFY**: `/Server/pyproject.toml` - Add dev script command

## Implementation Plan
1. **Create FastAPI Application**: Implement main.py with FastAPI instance
2. **Add Startup Event Handler**: Display "Application startup complete" message
3. **Configure Uvicorn Settings**: Set host, port, reload, log level
4. **Create Configuration Module**: Load settings from environment variables
5. **Implement Development Starter**: Script to run uvicorn with proper settings
6. **Add Health Check Endpoint**: Verify server is running correctly
7. **Create Platform Wrappers**: Shell scripts for different operating systems
8. **Add Logging Configuration**: Structured logging for development
9. **Test Server Startup**: Validate all components work together

## Current Project State
```
Path-Lite/Server/
├── pyproject.toml (FastAPI and Uvicorn dependencies)
├── .env.example (Server configuration)
├── app/
│   ├── __init__.py
│   ├── models/
│   ├── routers/
│   ├── services/
│   └── utils/
└── tests/
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | `/Server/app/main.py` | FastAPI application with startup event and "Application startup complete" message |
| CREATE | `/Server/app/config.py` | Pydantic Settings for environment variable management |
| CREATE | `/Server/scripts/start-dev.py` | Python script to start uvicorn with auto-reload on localhost:8000 |
| CREATE | `/Server/scripts/start-dev.sh` | Unix/macOS shell wrapper for development server |
| CREATE | `/Server/scripts/start-dev.bat` | Windows batch wrapper for development server |
| MODIFY | `/Server/pyproject.toml` | Add [tool.poetry.scripts] dev command |
| CREATE | `/Server/app/routers/health.py` | Health check endpoint router |
| CREATE | `/Server/docs/BACKEND_DEVELOPMENT.md` | Backend development guide with API documentation |

## External References
- [FastAPI First Steps](https://fastapi.tiangolo.com/tutorial/first-steps/)
- [FastAPI Events: startup - shutdown](https://fastapi.tiangolo.com/advanced/events/)
- [Uvicorn Deployment](https://www.uvicorn.org/deployment/)
- [Pydantic Settings](https://docs.pydantic.dev/latest/concepts/pydantic_settings/)
- [FastAPI Settings and Environment Variables](https://fastapi.tiangolo.com/advanced/settings/)
- [Python Logging Best Practices](https://docs.python.org/3/howto/logging.html)

## Build Commands
```bash
# From Server directory
poetry run python scripts/start-dev.py

# Or using Poetry script
poetry run dev

# Or using shell wrapper
./scripts/start-dev.sh  # Unix/macOS
scripts\start-dev.bat   # Windows
```

## Implementation Validation Strategy
- [ ] FastAPI application starts successfully
- [ ] Uvicorn runs on localhost:8000 with auto-reload enabled
- [ ] "Application startup complete" message displays in console
- [ ] Health check endpoint returns 200 OK
- [ ] Environment variables load correctly from .env file
- [ ] Auto-reload triggers on code changes
- [ ] Server logs are clear and informative
- [ ] Platform-specific wrappers work correctly
- [ ] API documentation available at http://localhost:8000/docs

## Implementation Checklist
- [ ] Create `/Server/app/config.py` with Pydantic BaseSettings
- [ ] Define Settings class with environment variables
- [ ] Add AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_KEY fields
- [ ] Add SERVER_HOST, SERVER_PORT, DEBUG_MODE fields
- [ ] Add JWT_SECRET, CORS_ORIGINS fields
- [ ] Configure .env file loading with python-dotenv
- [ ] Create `/Server/app/main.py` FastAPI application
- [ ] Initialize FastAPI instance with title, version, description
- [ ] Add CORS middleware configuration
- [ ] Implement @app.on_event("startup") handler
- [ ] Add logger.info("Application startup complete") message
- [ ] Add startup validation for required environment variables
- [ ] Create `/Server/app/routers/health.py` router
- [ ] Implement GET /health endpoint returning {"status": "healthy"}
- [ ] Include health router in main.py
- [ ] Create `/Server/scripts/start-dev.py` script
- [ ] Import uvicorn and run with config: host="0.0.0.0", port=8000, reload=True
- [ ] Add log_level="info" configuration
- [ ] Add error handling for port already in use
- [ ] Create `/Server/scripts/start-dev.sh` shell script
- [ ] Add shebang and poetry run command
- [ ] Make executable (chmod +x)
- [ ] Create `/Server/scripts/start-dev.bat` batch script
- [ ] Add poetry run command for Windows
- [ ] Update `/Server/pyproject.toml` [tool.poetry.scripts]
- [ ] Add dev = "scripts.start-dev:main" script entry
- [ ] Create `/Server/docs/BACKEND_DEVELOPMENT.md` guide
- [ ] Document how to start development server
- [ ] Document API documentation access (Swagger UI)
- [ ] Document environment variable requirements
- [ ] Test server startup with poetry run dev
- [ ] Verify "Application startup complete" message appears
- [ ] Test health check endpoint with curl or browser
- [ ] Test auto-reload by modifying a file
- [ ] Verify API docs at http://localhost:8000/docs
