---
trigger: glob
globs: "**/*.py,**/pyproject.toml,**/requirements.txt,**/alembic.ini"
---

# Python FastAPI Architecture Guidelines

SOLID principles and Python best practices for robust, maintainable systems.

## Before Implementation
1. Explain SOLID principles applied and affected layers
2. Check SRP adherence and proper dependency inversion
3. Validate class/function structure and test naming
4. Review type hints and Pydantic model design

## SOLID Principles
- **SRP**: One reason to change per class/module
- **OCP**: Open for extension, closed for modification (use protocols, abstract base classes)
- **LSP**: Subtypes substitutable for base types (proper inheritance)
- **ISP**: No forced dependency on unused methods (focused interfaces)
- **DIP**: Depend on abstractions (protocols, ABCs), not concretions

## Python Best Practices
- async/await for all I/O operations
- Dependency injection via FastAPI Depends()
- Type hints with mypy or pyright validation
- Pydantic for data validation and settings
- Context managers for resource management
- Generators for memory-efficient iteration

## Security & Compliance
- Authorization at service/domain level
- PCI-DSS, SOX, LGPD compliance
- Domain events for audit trails
- Secure secrets management (never in code)
- Input validation and sanitization

## Performance
- Async operations with asyncio
- Efficient queries with SQLAlchemy 2.0 async
- Appropriate caching strategies (Redis)
- Connection pooling for databases
- Properly sized aggregates and batch operations

## Layers

### API Layer (Routers)
- Route definitions with FastAPI APIRouter
- Request/response Pydantic models
- Dependency injection for services
- Minimal business logic (delegate to services)
- HTTP status codes and error handling

### Service Layer
- Business logic orchestration
- Transaction management
- Domain event publishing
- Input validation before domain operations
- Dependency injection for repositories

### Domain Layer
- Pure business logic (no framework dependencies)
- Domain models and value objects
- Business rule validation
- Domain events for state changes
- Rich domain models with behavior

### Repository Layer
- Data access abstraction
- SQLAlchemy async sessions
- Query optimization
- Unit of work pattern
- Interface definitions in domain layer

### Infrastructure Layer
- Database configuration and connection
- External service adapters
- Event bus implementation
- Caching implementation
- Message queue integration

## Testing
- Naming: `test_function_name_condition_expected()`
- pytest with pytest-asyncio for async tests
- Unit tests for domain logic (pure Python)
- Integration tests for API endpoints and repositories
- Fixtures for test data and dependencies
- Mock external dependencies with pytest-mock
- Min 85% coverage for domain/service layers

## Test Categories
- Domain models: business rules and validation
- Value objects: immutability and equality
- Services: orchestration and transaction management
- Repositories: data access and queries
- API endpoints: request/response and status codes
- Authentication/authorization flows

## Data Models

### Pydantic Models (Schemas)
- Request models with validation
- Response models with serialization
- Separate Create/Update/Read models
- Use Field() for constraints and docs
- Config for ORM mode and JSON encoding

### SQLAlchemy Models (Entities)
- Async-compatible declarative models
- Relationships with lazy loading strategies
- Indexes for query optimization
- Constraints for data integrity
- Separate from Pydantic schemas

## Async Patterns
- Use async/await for all I/O operations
- Async context managers for sessions
- Async generators for streaming
- asyncio.gather() for concurrent operations
- Proper exception handling in async code

## Configuration Management
- Pydantic BaseSettings for configuration
- Environment variables with .env files
- Separate configs for dev/test/prod
- Secrets from environment or secret managers
- Validation of configuration on startup

## Financial Domain
- Decimal type for monetary values
- Currency-aware value objects
- Proper rounding per financial standards
- Saga patterns for distributed transactions
- Immutable audit trails via domain events
- Compensation patterns for rollback
- Transaction isolation levels

## Error Handling
- Custom exception hierarchy
- HTTPException for API errors
- Global exception handlers
- Structured error responses (RFC 7807)
- Proper logging of exceptions
- Exception chaining with `raise ... from`

## Dependency Injection
- FastAPI Depends() for DI
- Singleton services via functools.lru_cache
- Request-scoped dependencies
- Override dependencies for testing
- Layered dependency composition
