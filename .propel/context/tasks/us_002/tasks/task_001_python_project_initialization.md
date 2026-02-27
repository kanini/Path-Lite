# Task - TASK_001

## Requirement Reference
- User Story: US_002
- Story Location: .propel/context/tasks/us_002/us_002.md
- Acceptance Criteria:  
    - **AC1**: Given I need to initialize the backend, When I create the FastAPI project structure, Then the system has a Python 3.11+ project with pyproject.toml (Poetry), main.py entry point, and app/ folder with routers/, models/, services/, and utils/ subfolders.
    - **AC3**: Given dependencies need management, When I set up Poetry for dependency management, Then the system has pyproject.toml with all required dependencies: fastapi, uvicorn, pydantic, python-jose (JWT), azure-openai, and pytest.
- Edge Case:
    - What happens when Python version is below 3.11? (Validate Python version before Poetry install; display error with upgrade instructions)
    - How does the system handle Poetry installation failures? (Provide fallback pip install instructions; document Poetry installation steps)

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
| Backend | Poetry | 1.7+ |
| Backend | Pydantic | 2.x |
| Backend | Uvicorn | 0.27+ |
| Library | python-jose | 3.3+ |
| Library | azure-openai | 1.x |
| Library | pytest | 8.x |

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
Initialize a FastAPI backend project with proper Python 3.11+ environment, Poetry dependency management, and standard project structure including routers, models, services, and utils folders. This task establishes the foundation for all backend development work.

## Dependent Tasks
- None (This is a foundational task)

## Impacted Components
- **NEW**: Server/ (root backend directory)
- **NEW**: Server/pyproject.toml (Poetry configuration)
- **NEW**: Server/main.py (FastAPI entry point)
- **NEW**: Server/app/ (application package)
- **NEW**: Server/app/routers/ (API route handlers)
- **NEW**: Server/app/models/ (Pydantic models)
- **NEW**: Server/app/services/ (business logic)
- **NEW**: Server/app/utils/ (helper functions)

## Implementation Plan
1. **Python Version Validation**
   - Check Python version is 3.11 or higher
   - Display clear error message with upgrade instructions if version is below 3.11
   - Document Python installation/upgrade steps in README

2. **Poetry Installation & Verification**
   - Install Poetry package manager (if not already installed)
   - Verify Poetry installation with `poetry --version`
   - Document fallback pip installation method in case Poetry fails

3. **Project Initialization**
   - Create Server/ directory at project root
   - Initialize Poetry project with `poetry init`
   - Configure pyproject.toml with project metadata

4. **Dependency Configuration**
   - Add core dependencies: fastapi[all], uvicorn[standard], pydantic, python-jose[cryptography], openai (Azure OpenAI SDK), pytest, pytest-asyncio
   - Add development dependencies: black, flake8, mypy, httpx (for testing)
   - Lock dependencies with `poetry lock`

5. **Project Structure Creation**
   - Create app/ package with __init__.py
   - Create app/routers/ for API endpoints
   - Create app/models/ for Pydantic schemas
   - Create app/services/ for business logic
   - Create app/utils/ for helper functions
   - Create tests/ directory for pytest

6. **Entry Point Setup**
   - Create main.py with minimal FastAPI application
   - Add basic health check endpoint
   - Configure application metadata (title, version, description)

7. **Documentation**
   - Create README.md with setup instructions
   - Document Python version requirements
   - Document Poetry installation steps
   - Document project structure overview

## Current Project State
```
Path-Lite/
├── .propel/
├── Docs/
├── Screenshots/
├── .gitignore
└── mcp_config.json
```

## Expected Changes
| Action | File Path | Description |
|--------|-----------|-------------|
| CREATE | Server/pyproject.toml | Poetry configuration with all dependencies |
| CREATE | Server/main.py | FastAPI application entry point |
| CREATE | Server/app/__init__.py | Application package initialization |
| CREATE | Server/app/routers/__init__.py | Routers package initialization |
| CREATE | Server/app/models/__init__.py | Models package initialization |
| CREATE | Server/app/services/__init__.py | Services package initialization |
| CREATE | Server/app/utils/__init__.py | Utils package initialization |
| CREATE | Server/tests/__init__.py | Tests package initialization |
| CREATE | Server/README.md | Backend setup and usage documentation |
| CREATE | Server/.env.example | Environment variables template |
| CREATE | Server/.gitignore | Python-specific gitignore patterns |

## External References
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Poetry Documentation](https://python-poetry.org/docs/)
- [Python 3.11 Release Notes](https://docs.python.org/3/whatsnew/3.11.html)
- [Pydantic V2 Documentation](https://docs.pydantic.dev/latest/)
- [Azure OpenAI Python SDK](https://github.com/openai/openai-python)

## Build Commands
```bash
# Python version check
python --version

# Poetry installation (if needed)
curl -sSL https://install.python-poetry.org | python3 -

# Project initialization
cd Server
poetry install

# Activate virtual environment
poetry shell

# Run development server (after setup)
poetry run uvicorn main:app --reload
```

## Implementation Validation Strategy
- [x] Python version 3.11+ verified
- [x] Poetry installed and version confirmed
- [x] pyproject.toml created with all required dependencies
- [x] All project directories created with __init__.py files
- [x] main.py created with basic FastAPI app
- [x] Dependencies installed successfully with `poetry install`
- [x] Virtual environment activates without errors
- [x] README.md contains clear setup instructions
- [x] .env.example created with placeholder variables
- [ ] Unit tests pass (N/A - no tests yet)
- [ ] Integration tests pass (N/A - no integration yet)

## Implementation Checklist
- [ ] Validate Python version is 3.11 or higher
- [ ] Install Poetry package manager
- [ ] Create Server/ directory at project root
- [ ] Initialize Poetry project with `poetry init`
- [ ] Configure pyproject.toml with project metadata (name, version, description, authors)
- [ ] Add fastapi[all] dependency (version 0.110+)
- [ ] Add uvicorn[standard] dependency (version 0.27+)
- [ ] Add pydantic dependency (version 2.x)
- [ ] Add python-jose[cryptography] dependency (version 3.3+)
- [ ] Add openai dependency for Azure OpenAI (version 1.x)
- [ ] Add pytest and pytest-asyncio dependencies
- [ ] Add development dependencies (black, flake8, mypy, httpx)
- [ ] Run `poetry lock` to generate lock file
- [ ] Create app/ directory with __init__.py
- [ ] Create app/routers/ directory with __init__.py
- [ ] Create app/models/ directory with __init__.py
- [ ] Create app/services/ directory with __init__.py
- [ ] Create app/utils/ directory with __init__.py
- [ ] Create tests/ directory with __init__.py
- [ ] Create main.py with FastAPI() instance
- [ ] Add basic health check endpoint in main.py
- [ ] Configure CORS middleware placeholder in main.py
- [ ] Create README.md with setup instructions
- [ ] Document Python version requirements in README
- [ ] Document Poetry installation steps in README
- [ ] Document project structure in README
- [ ] Create .env.example with placeholder environment variables
- [ ] Create .gitignore with Python-specific patterns
- [ ] Run `poetry install` to verify all dependencies install correctly
- [ ] Test virtual environment activation with `poetry shell`
- [ ] Verify project structure matches expected layout
