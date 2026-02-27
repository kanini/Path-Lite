---
description: Generates production-ready CI/CD pipeline scripts from pipeline specifications including GitHub Actions workflows with security gates, testing stages, deployment automation, and rollback procedures for multi-environment deployments.
auto_execution_mode: 1
---

# Pipeline Script Generator

As a Senior DevOps Engineer expert in GitHub Actions, generate production-ready CI/CD pipeline scripts from the provided pipeline specification. This workflow creates secure, maintainable workflow files with comprehensive security gates, testing, and deployment automation.

## Input Parameters
**Accepts:** CI/CD specification path | CICD-XXX requirements list

### Argument Types:
1. **CI/CD Spec Document**: Path to cicd-spec.md file (e.g., `.propel/context/devops/cicd-spec.md`)
2. **Requirements List**: Comma-separated CICD-XXX IDs to implement
3. **Direct Requirements**: Text describing pipeline to generate

### Optional Parameters:
| Parameter | Default | Description |
|-----------|---------|-------------|
| `--platform` | `github-actions` | Platform: `github-actions`, `azure-devops`, `gitlab-ci` |
| `--environments` | `dev,qa,staging,prod` | Environments to generate pipelines for |
| `--skip-security` | `false` | Skip security gates (NOT recommended) |

### Input Processing Algorithm
1. **CI/CD Spec Detection**: Check for `.propel/context/devops/cicd-spec.md`
2. **Requirement Extraction**: Parse CICD-XXX requirements
3. **Platform Validation**: Verify supported platform
4. **Environment Parsing**: Validate environment list

## Output
- **Artifact Directory**: `.propel/context/pipelines/github-actions/.github/workflows/`
- **Console Output**:
  - List of generated workflow files
  - Workflow validation results
  - Security configuration summary

**Note:**
- **File Handling**: IF files exist → UPDATE changed sections only (delta mode). IF files do not exist → CREATE complete files.
- **Directory Creation**: Create full directory structure before writing.

---

## Deep Research Methodology

### MCP Tools Required
- `mcp__sequential-thinking__sequentialthinking` - Complex workflow logic, conditional deployments
- `mcp__context7__resolve-library-id` - Pin GitHub Actions versions
- `mcp__context7__get-library-docs` - Fetch GitHub Actions syntax, reusable workflows

**Fallback Strategy:** If MCP unavailable:
- Sequential-thinking → Use structured iterative analysis
- Context7 → Use WebSearch for "GitHub Actions [feature] 2026"
- Document fallback usage in output

---

## Execution Flow

### Phase 0: Input Validation
1. Validate $ARGUMENTS is provided
2. Verify cicd-spec.md exists at specified path
3. Parse optional parameters
4. Validate platform selection

**Fail Fast:** If cicd-spec.md not found → STOP, request to run `plan-cicd-pipeline.md` first

### Phase 1: Requirements Analysis
**Use:** `mcp__sequential-thinking__sequentialthinking`

1. **Parse CI/CD Specification**
   - Extract all CICD-XXX requirements
   - Identify build requirements (CICD-001 to CICD-009)
   - Identify quality requirements (CICD-010 to CICD-019)
   - Identify security requirements (CICD-020 to CICD-029)
   - Identify test requirements (CICD-030 to CICD-039)
   - Identify deployment requirements (CICD-050 to CICD-059)
   - Identify approval requirements (CICD-060 to CICD-069)

2. **Identify Technology Stack**
   - Parse build tools from spec
   - Parse test frameworks
   - Parse deployment targets

3. **Map to Workflow Files**
   | Workflow | Purpose | Trigger |
   |----------|---------|---------|
   | ci.yml | Build, test, scan | Push, PR |
   | cd-dev.yml | Deploy to dev | Push to develop |
   | cd-qa.yml | Deploy to QA | Merge to develop |
   | cd-staging.yml | Deploy to staging | Merge to main |
   | cd-prod.yml | Deploy to prod | Tag release |

### Phase 2: Platform Research
**Use:** `mcp__context7__resolve-library-id`, `mcp__context7__get-library-docs`

**For GitHub Actions:**
1. Fetch latest syntax documentation
2. Research current best practices for:
   - Workflow permissions
   - Environment protection rules
   - OIDC authentication
   - Reusable workflows
   - Composite actions

**For Actions:**
1. Pin versions for:
   - `actions/checkout@v4`
   - `actions/setup-node@v4`
   - `actions/setup-dotnet@v4`
   - `github/codeql-action@v3`
   - `aquasecurity/trivy-action@master`

### Phase 3: Directory Structure Creation
Create the following structure:

```
.propel/context/pipelines/github-actions/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── cd-dev.yml
│       ├── cd-qa.yml
│       ├── cd-staging.yml
│       ├── cd-prod.yml
│       ├── security-scan.yml
│       ├── terraform-plan.yml
│       └── terraform-apply.yml
└── README.md
```

### Phase 4: CI Workflow Generation
**Use:** `mcp__sequential-thinking__sequentialthinking`

Generate `ci.yml`:

```yaml
name: CI Pipeline

on:
  push:
    branches: [develop, main, 'feature/**']
  pull_request:
    branches: [develop, main]

permissions:
  contents: read
  security-events: write
  actions: read

jobs:
  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup [runtime]
        uses: actions/setup-[runtime]@v4
        with:
          [runtime]-version: '[version]'

      - name: Install dependencies
        run: [install command]

      - name: Build
        run: [build command]

      - name: Upload artifact
        uses: actions/upload-artifact@v4
        with:
          name: build-artifact
          path: [build output path]

  lint:
    name: Lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run linter
        run: [lint command]

  unit-tests:
    name: Unit Tests
    runs-on: ubuntu-latest
    needs: [build]
    steps:
      - uses: actions/checkout@v4
      - name: Run tests
        run: [test command]
      - name: Upload coverage
        uses: codecov/codecov-action@v4

  security-scan:
    name: Security Scan
    runs-on: ubuntu-latest
    needs: [build]
    steps:
      - uses: actions/checkout@v4

      - name: SAST - CodeQL
        uses: github/codeql-action/analyze@v3

      - name: SCA - Snyk
        uses: snyk/actions/[runtime]@master
        with:
          args: --severity-threshold=high
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}

      - name: Secrets Detection
        uses: gitleaks/gitleaks-action@v2
```

### Phase 5: Security Scan Workflow Generation
Generate `security-scan.yml`:

```yaml
name: Security Scan

on:
  push:
    branches: [main, develop]
  schedule:
    - cron: '0 0 * * 0'  # Weekly

permissions:
  contents: read
  security-events: write

jobs:
  sast:
    name: SAST Analysis
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Initialize CodeQL
        uses: github/codeql-action/init@v3
      - name: Perform CodeQL Analysis
        uses: github/codeql-action/analyze@v3

  sca:
    name: Dependency Scan
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Snyk
        uses: snyk/actions/[runtime]@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}

  container-scan:
    name: Container Scan
    runs-on: ubuntu-latest
    if: ${{ github.event_name != 'schedule' }}
    steps:
      - uses: actions/checkout@v4
      - name: Build image
        run: docker build -t app:${{ github.sha }} .
      - name: Scan image
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: app:${{ github.sha }}
          severity: CRITICAL,HIGH
          exit-code: 1

  secrets-scan:
    name: Secrets Detection
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: Run GitLeaks
        uses: gitleaks/gitleaks-action@v2
```

### Phase 6: CD Workflow Generation
**Use:** `mcp__sequential-thinking__sequentialthinking`

Generate environment-specific CD workflows:

**cd-staging.yml (with approval):**
```yaml
name: Deploy to Staging

on:
  push:
    branches: [main]

permissions:
  contents: read
  id-token: write

jobs:
  deploy:
    name: Deploy to Staging
    runs-on: ubuntu-latest
    environment:
      name: staging
      url: https://staging.example.com

    steps:
      - uses: actions/checkout@v4

      - name: Download artifact
        uses: actions/download-artifact@v4

      - name: Login to Azure
        uses: azure/login@v2
        with:
          client-id: ${{ secrets.AZURE_CLIENT_ID }}
          tenant-id: ${{ secrets.AZURE_TENANT_ID }}
          subscription-id: ${{ secrets.AZURE_SUBSCRIPTION_ID }}

      - name: Deploy
        run: [deployment command]

      - name: Smoke Test
        run: [smoke test command]

      - name: Notify Success
        if: success()
        uses: slackapi/slack-github-action@v1
        with:
          payload: |
            {"text": "Staging deployment successful"}
```

**cd-prod.yml (with canary and rollback):**
```yaml
name: Deploy to Production

on:
  push:
    tags: ['v*']

permissions:
  contents: read
  id-token: write

jobs:
  deploy-canary:
    name: Deploy Canary (10%)
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://prod.example.com

    steps:
      - uses: actions/checkout@v4

      - name: Deploy Canary
        run: [canary deployment command]

      - name: Validate Canary
        run: |
          sleep 300  # 5 min observation
          [validation script]

  deploy-full:
    name: Deploy Full
    needs: [deploy-canary]
    runs-on: ubuntu-latest

    steps:
      - name: Deploy 100%
        run: [full deployment command]

      - name: Smoke Test
        run: [smoke test command]

  rollback:
    name: Rollback
    needs: [deploy-full]
    if: failure()
    runs-on: ubuntu-latest

    steps:
      - name: Rollback Deployment
        run: [rollback command]

      - name: Notify Rollback
        uses: slackapi/slack-github-action@v1
        with:
          payload: |
            {"text": "ALERT: Production rollback executed"}
```

### Phase 7: Terraform Workflows Generation
Generate `terraform-plan.yml` and `terraform-apply.yml`:

```yaml
name: Terraform Plan

on:
  pull_request:
    paths:
      - '.propel/context/iac/**'

permissions:
  contents: read
  pull-requests: write
  id-token: write

jobs:
  plan:
    name: Terraform Plan
    runs-on: ubuntu-latest
    strategy:
      matrix:
        environment: [dev, qa, staging, prod]

    steps:
      - uses: actions/checkout@v4

      - name: Setup Terraform
        uses: hashicorp/setup-terraform@v3

      - name: Terraform Init
        run: terraform init
        working-directory: .propel/context/iac/azure/terraform/environments/${{ matrix.environment }}

      - name: Terraform Plan
        run: terraform plan -out=plan.tfplan
        working-directory: .propel/context/iac/azure/terraform/environments/${{ matrix.environment }}

      - name: Security Scan
        uses: aquasecurity/tfsec-action@v1
        with:
          working_directory: .propel/context/iac/azure/terraform/
```

### Phase 8: Documentation
Generate README.md:
- Workflow descriptions
- Trigger conditions
- Required secrets
- Environment setup
- Manual trigger instructions

---

## Guardrails

**CRITICAL Rules:**
- `.windsurf/rules/cicd-pipeline-standards.md` **[CRITICAL]**
- `.windsurf/rules/gitops-standards.md` **[CRITICAL]**
- `.windsurf/rules/security-standards-owasp.md` **[CRITICAL]**

---

## Code Generation Standards

### Workflow Permissions
- Always use minimum required permissions
- Never use `permissions: write-all`
- Prefer OIDC over long-lived credentials

### Action Pinning
- Pin actions to full commit SHA for critical workflows
- Pin to major version for trusted actions (actions/*)

### Secret Handling
- Never inline secrets
- Use `${{ secrets.NAME }}` syntax
- Mask sensitive outputs

### Reusable Patterns
- Extract common steps to composite actions
- Use reusable workflows for cross-repo patterns

---


## Quality Evaluation

### 4-Tier Implementation Assessment

| Tier | Dimension | Gate | Conditional |
|------|-----------|------|-------------|
| T1 | Workflow Syntax Validation | MUST PASS | No (always required) |
| T2 | Requirements Fulfilled | MUST=100% | No (always required) |
| T3 | Security & Secrets | ≥80% | No (always required for pipelines) |
| T4 | Standards Adherence | ≥80% | Yes (skip for single-workflow changes) |

---

### Tier 1: Workflow Syntax Validation (REQUIRED)

**Goal:** Verify generated workflow files are syntactically valid

| Check | Command/Method | Expected | Actual | Status |
|-------|----------------|----------|--------|--------|
| YAML Syntax | YAML lint validation | exit 0 | [result] | PASS/FAIL |
| Action References | All `uses:` point to valid actions | 0 invalid | [result] | PASS/FAIL |

**Gate:** MUST PASS - Execution halts if syntax is invalid

---

### Tier 2: Requirements Fulfillment (REQUIRED)

**Goal:** Verify all CICD-XXX requirements from cicd-spec.md are implemented

| Check | Metric | Threshold | Actual | Score |
|-------|--------|-----------|--------|-------|
| CICD-XXX Implemented | implemented / total | 100% | [N]/[M] | [X]% |

**Execution:**
```
1. Read cicd-spec.md → Extract all CICD-XXX requirement IDs
2. Read generated workflow YAML files → Map jobs/steps to CICD-XXX requirements
3. Coverage = (implemented / total CICD-XXX) × 100%
```

**Gate:** 100% requirements implemented

---

### Tier 3: Security & Secrets (REQUIRED)

**Goal:** Verify pipeline security best practices

| Check | Command/Method | Threshold | Actual | Score |
|-------|----------------|-----------|--------|-------|
| No Inline Secrets | No literal secrets in YAML | 0 found | [count] | PASS/FAIL |
| Permissions Minimized | No `permissions: write-all` | 0 found | [count] | PASS/FAIL |
| Security Gates Present | Security scan jobs exist | ≥ 1 | [count] | PASS/FAIL |
| OIDC Auth | Cloud auth uses OIDC (no long-lived creds) | Compliant | [yes/no] | PASS/FAIL |

**Gate:** ≥ 80%

---

### Tier 4: Standards Adherence (CONDITIONAL)

**Skip Condition:** Single-workflow regeneration with no structural changes

**Goal:** Verify pipelines follow CI/CD standards

| Check | Validation | Threshold | Actual | Score |
|-------|------------|-----------|--------|-------|
| Environment Matrix | All environments configured | 100% | [X]% | PASS/FAIL |
| Approval Gates | Staging/prod require approvals | Configured | [yes/no] | PASS/FAIL |
| Artifact Retention | Retention policies configured | Present | [yes/no] | PASS/FAIL |
| Notification Config | Failure notifications configured | Present | [yes/no] | PASS/FAIL |

**Gate:** ≥ 80%

---

### Output Format

```
===========================================================
         IMPLEMENTATION EVALUATION: Pipeline Scripts
===========================================================

CICD Spec:     [cicd-spec.md path]
Platform:      [GitHub Actions/Azure DevOps/GitLab CI]
Workflows:     [count]
Environments:  [list]

-----------------------------------------------------------
TIER 1: Workflow Syntax Validation
-----------------------------------------------------------
| Check            | Expected | Actual   | Status    |
|------------------|----------|----------|-----------|
| YAML Syntax      | exit 0   | [result] | PASS/FAIL |
| Action References| 0 invalid| [result] | PASS/FAIL |

Score: [PASS/FAIL]  |  Gate: MUST PASS  |  Result: [PASS/FAIL]

-----------------------------------------------------------
TIER 2: Requirements Fulfillment
-----------------------------------------------------------
CICD-XXX Implemented: [N]/[M] = [X]%

Unimplemented: [list or "None"]

Score: [X]%  |  Gate: 100%  |  Result: [PASS/FAIL]

-----------------------------------------------------------
TIER 3: Security & Secrets
-----------------------------------------------------------
| Check              | Threshold    | Actual  | Score     |
|--------------------|--------------|---------|-----------|
| Inline Secrets     | 0 found      | [N]     | PASS/FAIL |
| Permissions        | 0 write-all  | [N]     | PASS/FAIL |
| Security Gates     | ≥ 1          | [N]     | PASS/FAIL |
| OIDC Auth          | Compliant    | [yes/no]| PASS/FAIL |

Score: [X]%  |  Gate: ≥80%  |  Result: [PASS/FAIL]

-----------------------------------------------------------
TIER 4: Standards Adherence [CONDITIONAL]
-----------------------------------------------------------
Status: [EVALUATED / SKIPPED - reason]

| Check              | Expected   | Actual   | Status    |
|--------------------|------------|----------|-----------|
| Environment Matrix | 100%       | [X]%     | PASS/FAIL |
| Approval Gates     | Configured | [yes/no] | PASS/FAIL |
| Artifact Retention | Present    | [yes/no] | PASS/FAIL |
| Notifications      | Present    | [yes/no] | PASS/FAIL |

Score: [X]%  |  Gate: ≥80%  |  Result: [PASS/FAIL/SKIPPED]

-----------------------------------------------------------
OVERALL ASSESSMENT
-----------------------------------------------------------
| Tier | Dimension              | Score       | Gate     | Result  |
|------|------------------------|-------------|----------|---------|
| T1   | Syntax Validation      | [PASS/FAIL] | MUST     | [P/F]   |
| T2   | Requirements           | [X]%        | 100%     | [P/F]   |
| T3   | Security               | [X]%        | ≥80%     | [P/F]   |
| T4   | Standards              | [X]%        | ≥80%     | [P/F/S] |

Verdict: [PASS / CONDITIONAL PASS / FAIL]

Critical Failures: [list or "None"]
===========================================================
```

---

## Human Review Gate

After workflow completion, pause for human review:

### Review Checklist
- [ ] Workflow syntax is valid
- [ ] Permissions follow least privilege
- [ ] No secrets in code
- [ ] Security gates cannot be bypassed
- [ ] Approval gates configured correctly
- [ ] Rollback procedures implemented
- [ ] Notification channels configured

### Approval Required Before
- Committing workflows to repository
- Enabling workflow runs

---

## Error Handling

| Error | Action |
|-------|--------|
| cicd-spec.md not found | STOP, run plan-cicd-pipeline first |
| Invalid platform | STOP, list valid options |
| MCP unavailable | FALLBACK to WebSearch |
| Syntax validation failure | STOP, report errors |

---

## Example Invocations

**Basic:**
```
/create-pipeline-scripts .propel/context/devops/cicd-spec.md
```

**Specific Environments:**
```
/create-pipeline-scripts .propel/context/devops/cicd-spec.md --environments dev,prod
```

**Azure DevOps:**
```
/create-pipeline-scripts .propel/context/devops/cicd-spec.md --platform azure-devops
```
