# n8n-nodes-clarity-ppm

[Velocity BPA Licensing Notice]

This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).

Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.

For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

---

[![NPM Version](https://img.shields.io/npm/v/n8n-nodes-clarity-ppm.svg)](https://www.npmjs.com/package/n8n-nodes-clarity-ppm)
[![License: BSL-1.1](https://img.shields.io/badge/License-BSL--1.1-blue.svg)](LICENSE)

An n8n community node package for **Broadcom® Clarity PPM** (Project and Portfolio Management) - enabling enterprise-grade project portfolio management automation including strategic planning, resource management, financial tracking, and collaborative work management.

![Clarity PPM Node](https://img.shields.io/badge/n8n-community%20node-orange)

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Credentials](#credentials)
- [Resources & Operations](#resources--operations)
- [Usage Examples](#usage-examples)
- [Query Parameters](#query-parameters)
- [Filter Expressions](#filter-expressions)
- [Troubleshooting](#troubleshooting)
- [Development](#development)
- [License](#license)
- [Support](#support)

---

## Features

This node provides comprehensive integration with Broadcom Clarity PPM REST API v1:

- **Projects** - Create, read, update, delete projects with full field support
- **Tasks** - Manage project tasks, milestones, and work breakdown structures
- **Timesheets** - Create, submit, approve timesheets with time entries
- **Resources** - Query employee and resource information
- **Roadmaps** - Strategic planning with roadmap items and scenarios
- **Teams** - Team management with allocations and definitions
- **Cost Plans** - Financial forecasting and budget management
- **Benefit Plans** - ROI and benefit tracking
- **Lookups** - Access system lookup values for dropdowns
- **Integrations** - Manage integration records
- **User Profile** - Get authenticated user information

### Authentication Methods

- **API Key (Bearer Token)** - Recommended for production
- **Basic Authentication** - Username/password
- **Token-Based (Session)** - Login/logout API

---

## Installation

### Via n8n Community Nodes (Recommended)

1. Open your n8n instance
2. Go to **Settings** → **Community Nodes**
3. Click **Install a community node**
4. Enter: `n8n-nodes-clarity-ppm`
5. Click **Install**

### Manual Installation

```bash
# Navigate to your n8n installation directory
cd ~/.n8n

# Install the package
npm install n8n-nodes-clarity-ppm

# Restart n8n
```

### Local Development Installation

```bash
# Clone the repository
git clone https://github.com/Velocity-BPA/n8n-nodes-clarity-ppm.git
cd n8n-nodes-clarity-ppm

# Install dependencies
pnpm install

# Build the package
pnpm build

# Link to n8n (for development)
pnpm link --global
cd ~/.n8n
pnpm link --global n8n-nodes-clarity-ppm

# Restart n8n
```

---

## Credentials

### Setting Up Clarity PPM Credentials

1. In n8n, go to **Credentials** → **New**
2. Search for "Clarity PPM API"
3. Configure based on your authentication method:

#### API Key Authentication (Recommended)

```
Host URL: https://clarity.yourcompany.com:8080
Authentication Type: API Key (Bearer Token)
API Key: your-jwt-api-key
Client ID: CLIENT_YOUR-APP
```

#### Basic Authentication

```
Host URL: https://clarity.yourcompany.com:8080
Authentication Type: Basic Auth
Username: your-username
Password: your-password
```

#### Token Authentication

```
Host URL: https://clarity.yourcompany.com:8080
Authentication Type: Token (Login/Logout)
Username: your-username
Password: your-password
```

### Prerequisites in Clarity PPM

1. User must have **"API - Access"** right enabled
2. For API Key auth: Generate API key in Clarity Admin → API Keys
3. For API Key auth: Register your client application in Clarity

---

## Resources & Operations

| Resource | Operations |
|----------|------------|
| **Project** | Create, Get, Get Many, Update, Delete |
| **Task** | Create, Get, Get Many, Update, Delete |
| **Timesheet** | Create, Get, Get Many, Update, Delete, Submit, Approve |
| **Resource** | Get, Get Many |
| **Roadmap** | Create, Get, Get Many, Update |
| **Team** | Create, Get, Get Many, Update, Delete |
| **Cost Plan** | Create, Get, Get Many, Update, Delete |
| **Benefit Plan** | Get, Get Many |
| **Lookup** | Get Values |
| **Integration** | Create, Get, Get Many, Update |
| **User Profile** | Get |

---

## Usage Examples

### Example 1: Create a Project with Tasks

```javascript
// Node 1: Create Project
Resource: Project
Operation: Create
Project Code: PRJ-2024-001
Project Name: Digital Transformation Initiative
Additional Fields:
  - Description: Enterprise digital transformation project
  - Schedule Start: 2024-01-15
  - Schedule Finish: 2024-12-31
  - Priority: 1
  - Is Active: true

// Node 2: Create Task
Resource: Task
Operation: Create
Project ID: {{ $json._internalId }}
Task Name: Requirements Gathering
Additional Fields:
  - Start Date: 2024-01-15
  - Finish Date: 2024-02-15
  - Is Milestone: false
```

### Example 2: Timesheet Workflow

```javascript
// Node 1: Get Open Timesheets
Resource: Timesheet
Operation: Get Many
Filters:
  - Status: Open (0)
  - Resource ID: 5000001

// Node 2: Submit Timesheet
Resource: Timesheet
Operation: Submit
Timesheet ID: {{ $json._internalId }}

// Node 3: Approve Timesheet (manager workflow)
Resource: Timesheet
Operation: Approve
Timesheet ID: {{ $json._internalId }}
```

### Example 3: Financial Planning

```javascript
// Node 1: Get Cost Plans for Project
Resource: Cost Plan
Operation: Get Many
Investment ID: 5000001
Filters:
  - Plan Type: Cost Plan (Forecast)

// Node 2: Create Budget Plan
Resource: Cost Plan
Operation: Create
Plan Name: Q1 2024 Budget
Investment ID: 5000001
Plan Type: Budget Plan
Additional Fields:
  - Is Plan of Record: true
```

### Example 4: Roadmap Management

```javascript
// Node 1: Create Roadmap
Resource: Roadmap
Operation: Create
Roadmap Code: RM-2024-001
Roadmap Name: 2024 Strategic Initiatives
Additional Fields:
  - Type: Investment
  - Status: Draft
  - Start Date: 2024-01-01
  - Finish Date: 2024-12-31
```

### Example 5: Lookup Values for Dropdowns

```javascript
// Get available project statuses
Resource: Lookup
Operation: Get Values
Lookup Code: INVESTMENT_OBJ_STATUS

// Get project managers
Resource: Lookup
Operation: Get Values
Lookup Code: BROWSE_PROJMGR
```

---

## Query Parameters

### Common Options

| Option | Description | Example |
|--------|-------------|---------|
| **Fields** | Specific fields to return | `code,name,isActive` |
| **Expand** | Include sub-resources inline | `tasks,teams` |
| **Sort** | Sort order | `name asc`, `scheduleStart desc` |
| **Include Links** | Include lookup links | `true` |

### Pagination

The node handles pagination automatically when using "Return All". For manual control:

- **Limit**: Maximum records to return (1-500)
- **Return All**: Fetch all records using pagination

---

## Filter Expressions

Clarity PPM uses a powerful filter expression syntax:

### Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `=` | Equals | `(status = 'APPROVED')` |
| `!=` | Not equals | `(status != 'DRAFT')` |
| `>`, `<`, `>=`, `<=` | Comparison | `(priority > 5)` |
| `in` | In list | `(status in ('APPROVED', 'ACTIVE'))` |
| `startsWith` | String starts with | `(name startsWith 'Project')` |
| `endsWith` | String ends with | `(code endsWith '-001')` |
| `contains` | String contains | `(description contains 'important')` |
| `and`, `or` | Logical operators | `(isActive = true) and (priority > 3)` |

### Examples

```
# Active projects with high priority
(isActive = true) and (priority >= 8)

# Projects by specific manager
(manager = 5000001)

# Timesheets in specific status
(status = 0) or (status = 2)

# Resources by name pattern
(lastName startsWith 'Smith')
```

---

## Troubleshooting

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| `401 Unauthorized` | Invalid credentials | Verify API key or username/password |
| `403 Forbidden` | Insufficient permissions | Check user has "API - Access" right |
| `404 Not Found` | Resource doesn't exist | Verify the resource ID exists |
| `CMN-0007` | Required field missing | Provide all required fields |
| `validation.requiredFieldMissing` | Required attribute not provided | Check field requirements |

### Connection Issues

1. **SSL/TLS Errors**: Ensure your Clarity instance has valid SSL certificates
2. **Timeout**: Increase timeout settings for large data sets
3. **SSO Environments**: Use API Key or Token authentication (Basic Auth won't work)

### Best Practices

- Use API Key authentication for production workflows
- Implement error handling with "Continue On Fail" option
- Use pagination for large datasets (>100 records)
- Cache lookup values to reduce API calls
- Test credentials with User Profile → Get operation

---

## Development

### Prerequisites

- Node.js >= 18.10
- pnpm >= 9.1

### Setup

```bash
# Clone repository
git clone https://github.com/Velocity-BPA/n8n-nodes-clarity-ppm.git
cd n8n-nodes-clarity-ppm

# Install dependencies
pnpm install

# Build
pnpm build

# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Lint
pnpm lint

# Fix lint issues
pnpm lintfix

# Format code
pnpm format
```

### Project Structure

```
n8n-nodes-clarity-ppm/
├── credentials/
│   └── ClarityPpmApi.credentials.ts
├── nodes/
│   └── ClarityPpm/
│       ├── ClarityPpm.node.ts
│       ├── ClarityPpm.node.json
│       ├── clarity-ppm.svg
│       ├── GenericFunctions.ts
│       ├── descriptions/
│       │   ├── ProjectDescription.ts
│       │   ├── TaskDescription.ts
│       │   ├── TimesheetDescription.ts
│       │   └── ...
│       └── types/
│           └── index.ts
├── test/
│   ├── ClarityPpm.node.test.ts
│   ├── GenericFunctions.test.ts
│   └── ClarityPpmApi.credentials.test.ts
├── package.json
├── tsconfig.json
├── LICENSE
├── COMMERCIAL_LICENSE.md
├── LICENSING_FAQ.md
└── README.md
```

---

## License

This n8n community node is licensed under the **Business Source License 1.1**.

### Free Use
Permitted for personal, educational, research, and internal business use.

### Commercial Use
Use of this node within any SaaS, PaaS, hosted platform, managed service,
or paid automation offering requires a commercial license.

For licensing inquiries:
**licensing@velobpa.com**

See [LICENSE](LICENSE), [COMMERCIAL_LICENSE.md](COMMERCIAL_LICENSE.md), and [LICENSING_FAQ.md](LICENSING_FAQ.md) for complete details.

---

## Third-Party Notices

Broadcom® Clarity PPM is a registered trademark of Broadcom Inc. This n8n community node package is developed and maintained by Velocity BPA, LLC and is not affiliated with, endorsed by, or sponsored by Broadcom Inc.

---

## Support

### Documentation

- [Broadcom Clarity PPM Documentation](https://techdocs.broadcom.com/clarity)
- [Clarity REST API Reference](https://techdocs.broadcom.com/us/en/ca-enterprise-software/business-management/clarity-project-and-portfolio-management-ppm-on-premise/16-4-0/reference/Clarity-REST-APIs.html)
- [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)

### Getting Help

- **Issues**: [GitHub Issues](https://github.com/Velocity-BPA/n8n-nodes-clarity-ppm/issues)
- **Email**: licensing@velobpa.com
- **Website**: [velobpa.com](https://velobpa.com)

### Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests to the GitHub repository.

---

## Changelog

### v1.0.0 (Initial Release)

- Full support for 11 Clarity PPM resources
- Three authentication methods (API Key, Basic, Token)
- Comprehensive filter expression support
- Pagination support for large datasets
- Full test coverage

---

*Developed by [Velocity BPA](https://velobpa.com) • An n8n Community Node*
