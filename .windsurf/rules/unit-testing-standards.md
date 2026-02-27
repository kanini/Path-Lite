---
trigger: glob
globs: "**/unittest/*.md"
---

# Test Strategies by Technology

## Standards
- **Write Minimal Tests During Development:** Do NOT write tests for every change or intermediate step. Focus on completing the feature implementation first, then add strategic tests only at logical completion points
- **Test Only Core User Flows:** Write tests exclusively for critical paths and primary user workflows. Skip writing tests for non-critical utilities and secondary workflows until if/when you're instructed to do so.
- **Test Behavior, Not Implementation:** Focus tests on what the code does, not how it does it, to reduce brittleness
- **Clear Test Names:** Use descriptive names that explain what's being tested and the expected outcome.
- **Fast Execution:** Keep unit tests fast (milliseconds) so developers run them frequently during development

## Mock Boundaries
- Mock: External APIs, repository interfaces, queues, caches, third-party services
- Do NOT mock: Domain logic, value objects, pure functions
- Database tests: Use connection string from appsettings/environment, not in-memory substitutes

## JavaScript/TypeScript (Jest/Vitest)
- Framework: Jest (pinned version)
- Structure: describe/it with beforeEach/afterEach hooks
- Mocking: jest.mock() for dependencies
- Assertions: expect() statements
- Location: `__tests__/` or `*.test.js/ts` alongside source
- Naming: `ComponentName.test.js/ts`

## Python (pytest/unittest)
- Framework: pytest (pinned version)
- Structure: test_ prefix for functions
- Setup: fixtures for setup/teardown, @pytest.mark decorators
- Assertions: assert statements
- Location: `tests/` directory
- Naming: `test_component_name.py`

## .NET (xUnit/NUnit/MSTest)
- Framework: xUnit (pinned version)
- Structure: [Fact]/[Theory] attributes
- Setup: IDisposable for setup/cleanup
- Mocking: Moq for dependencies
- Assertions: Assert.Equal/True/False
- Location: `ProjectName.Tests/` directory
- Naming: `ComponentNameTests.cs`

## Java (JUnit/TestNG)
- Framework: JUnit 5 (pinned version)
- Structure: @Test annotation with @BeforeEach/@AfterEach
- Mocking: Mockito for dependencies
- Assertions: assertEquals/assertTrue
- Location: `src/test/java/`
- Naming: `ComponentNameTest.java`

## React Native (Jest + RNTL + Detox)
- Framework: Jest with @testing-library/react-native
- Component testing: render(), screen queries, fireEvent, waitFor
- Native module mocking: jest.mock('react-native') for platform APIs
- Integration: Detox for E2E (requires device/simulator)
- Location: `__tests__/` or `*.test.tsx` alongside source
- Naming: `ComponentName.test.tsx`

## Flutter (flutter_test + integration_test)
- Framework: flutter_test (built-in, headless)
- Widget testing: testWidgets(), pumpWidget(), find.byType/byKey
- Golden testing: matchesGoldenFile() for visual regression
- Platform channel mocking: setMockMethodCallHandler for native bridges
- Integration: integration_test package (requires device/simulator)
- Location: `test/` (unit), `integration_test/` (E2E)
- Naming: `component_name_test.dart`

## iOS Native (XCTest + XCUITest)
- Framework: XCTest (XCTestCase subclass, test-prefixed methods)
- Setup: setUp()/tearDown() lifecycle; async via XCTestExpectation or async/await
- Assertions: XCTAssertEqual, XCTAssertTrue, XCTAssertNil, XCTAssertThrowsError
- UI Testing: XCUITest (requires simulator/device)
- Mocking: Protocol-based dependency injection (manual mocks or Mockingbird)
- Location: `ProjectNameTests/` (unit), `ProjectNameUITests/` (UI)
- Naming: `ComponentNameTests.swift`

## Android Native (JUnit + Espresso + Robolectric)
- Unit: JUnit 5 + Robolectric for Android framework classes (headless, no emulator)
- Instrumented: Espresso for UI (requires device/emulator)
- Compose: createComposeRule(), onNodeWithText(), performClick(), assertIsDisplayed()
- Assertions: assertEquals, assertThat (Truth library preferred)
- Location: `src/test/` (unit, headless), `src/androidTest/` (instrumented, device)
- Naming: `ComponentNameTest.kt`

## Test Plan Example: React Component (Jest)

**User Story:** us_001 - User Login Form Component

**Components:**
- LoginForm.tsx, useAuthValidation.ts, authService.ts

**Test Cases:**
- Render form with email and password fields
- Validate email format on blur
- Validate password strength
- Submit form with valid credentials
- Display error on invalid credentials
- Handle empty form submission
- Handle network timeout
- Handle special characters in password

**Mocks:**
- authService.login() → mock API call
- useRouter() → mock navigation