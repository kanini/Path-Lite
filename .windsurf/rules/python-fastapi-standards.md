---
trigger: glob
globs: "**/*.py, **/*.json, **/pyproject.toml, **/requirements.txt"
---

# FastAPI REST API Development

FastAPI modern Python REST APIs with async support and automatic documentation.

## API Design
- REST principles: resource-oriented URLs, appropriate HTTP verbs
- Async route handlers for I/O-bound operations
- Status codes, content negotiation, response formatting
- Dependency injection system for shared logic

## Project Structure
- Feature folders or domain-driven design
- Separation: models (schemas), services, repositories, routers
- main.py or app.py for application initialization
- config.py for settings using pydantic BaseSettings

## Routers & Endpoints
- APIRouter for modular route organization
- Path operation decorators (@app.get, @app.post, etc.)
- Dependency injection via Depends()
- Response models with response_model parameter
- Status code specification with status_code parameter

## Request/Response Models
- Pydantic models for request validation and serialization
- Separate schemas for Create, Update, Response operations
- Use Field() for validation constraints and documentation
- Config class for ORM mode and other settings
- Example values using schema_extra or Field(example=...)

## Data Access
- SQLAlchemy 2.0+ async ORM
- Alembic for database migrations and seeding
- Repository pattern for data access abstraction
- Async session management with async context managers
- Efficient query patterns (select with joinedload/selectinload)

## Authentication & Authorization
- OAuth2 with Password flow for JWT tokens
- Security dependencies for protected routes
- HTTPBearer for token authentication
- Role-based and permission-based authorization
- Secure password hashing with passlib[bcrypt]

## Validation & Error Handling
- Automatic validation via Pydantic models
- Custom validators using @validator decorator
- HTTPException for API errors with detail messages
- Global exception handlers with @app.exception_handler
- RequestValidationError for validation error customization

## API Versioning & Documentation
- URL path versioning (/api/v1/, /api/v2/)
- Automatic OpenAPI schema generation
- Customize docs with title, description, version
- Tags for endpoint grouping
- Include_in_schema parameter to hide endpoints

## Middleware
- CORS middleware for cross-origin requests
- Custom middleware for logging, timing, correlation IDs
- Trusted host middleware for security
- GZip middleware for response compression

## Dependency Injection
- Reusable dependencies with Depends()
- Database session dependencies
- Authentication/authorization dependencies
- Shared business logic dependencies
- Sub-dependencies for composition

## Background Tasks
- BackgroundTasks for async operations after response
- Celery or ARQ for complex task queues
- Proper error handling in background tasks
- Monitoring and retry logic

## Logging & Monitoring
- Structured logging with correlation IDs
- Request/response logging middleware
- Integration with APM tools (DataDog, New Relic)
- Health check endpoints (/health, /ready)
- Metrics endpoints for Prometheus

## Testing
- pytest with pytest-asyncio for async tests
- TestClient for endpoint testing
- Mock database with pytest fixtures
- Test authentication and authorization flows
- Integration tests with test database

## Performance
- Async/await throughout for I/O operations
- Redis for caching and session storage
- Connection pooling for databases
- Pagination with limit/offset or cursor-based
- Response compression with GZip middleware
- Database query optimization with indexes

## WebSocket Support
- WebSocket endpoints for real-time communication
- Connection management and lifecycle
- Authentication for WebSocket connections
- Broadcast patterns for multiple clients

## Deployment
- Docker containerization with multi-stage builds
- Uvicorn or Gunicorn with Uvicorn workers
- Environment variables for configuration
- Health checks and readiness probes
- Horizontal scaling with load balancers
- Production settings: workers, timeout, keep-alive
