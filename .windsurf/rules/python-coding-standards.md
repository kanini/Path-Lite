---
trigger: glob
globs: "**/*.py"
---

# Python Development

## General
- High confidence suggestions only when reviewing code
- Document design decisions in docstrings
- Handle edge cases with clear exception handling

## Naming Conventions
- snake_case for functions, methods, variables, modules
- PascalCase for classes
- UPPER_CASE for constants
- Prefix private members with single underscore (e.g., _internal_method)
- Prefix strongly private members with double underscore for name mangling

## Formatting
- Follow PEP 8 style guide
- Use Black formatter for consistent code formatting
- Maximum line length: 88 characters (Black default) or 79 (PEP 8)
- Use type hints for function signatures and class attributes
- Docstrings for all public modules, classes, and functions (Google or NumPy style)
- Use `"""triple quotes"""` for docstrings

## Project Structure
- Feature-based or domain-driven design organization
- Separate models, services, and data access layers
- Environment-specific configuration using pydantic-settings or python-dotenv
- Use `__init__.py` for package initialization and exports

## Type Hints & Type Safety
- Use type hints for all function signatures
- Leverage `typing` module (Optional, Union, List, Dict, etc.)
- Use `typing.Protocol` for structural subtyping
- Enable mypy or pyright for static type checking
- Use Pydantic models for data validation and serialization

## Data Access
- SQLAlchemy 2.0+ for ORM with async support
- Alembic for database migrations
- Repository pattern when beneficial
- Use async database drivers (asyncpg, aiomysql)
- Efficient query patterns to avoid N+1 problems

## Authentication & Authorization
- JWT tokens with python-jose or PyJWT
- OAuth 2.0/OpenID Connect with authlib
- Role-based and permission-based authorization
- Secure password hashing with passlib (bcrypt)
- Consistent security across all endpoints

## Validation & Error Handling
- Pydantic models for request/response validation
- Custom exception classes for domain errors
- Global exception handlers for standardized responses
- RFC 7807 problem details for error responses
- Proper exception chaining with `raise ... from`

## API Documentation
- OpenAPI/Swagger auto-generated from FastAPI
- Comprehensive docstrings for endpoints
- Request/response examples in schema definitions
- Version APIs using path prefixes or headers

## Logging
- Structured logging with structlog or python-json-logger
- Appropriate log levels (DEBUG, INFO, WARNING, ERROR, CRITICAL)
- Correlation IDs for request tracking
- Integration with observability platforms (DataDog, New Relic)

## Testing
- pytest for test framework
- Test critical paths only
- Use fixtures for test setup and teardown
- Mock dependencies with pytest-mock or unittest.mock
- Match existing test style and naming (test_function_name_condition_expected)
- Use parametrize for multiple test cases

## Performance
- Async/await patterns throughout for I/O operations
- Caching strategies (Redis, in-memory with cachetools)
- Connection pooling for databases and external services
- Pagination, filtering, sorting for large datasets
- Use generators for memory-efficient iteration

## Dependency Management
- Poetry or pip-tools for dependency management
- Pin exact versions in production (poetry.lock or requirements.txt)
- Separate dev dependencies from production
- Regular security audits with safety or pip-audit

## Deployment
- Use Docker for containerization
- Multi-stage builds for smaller images
- Health checks and readiness probes
- Environment-specific configuration per deployment stage
- Use gunicorn or uvicorn for production ASGI server
