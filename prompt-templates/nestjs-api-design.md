# NestJS API Design — Prompt Templates
> Copy these prompts directly into Claude for faster, more accurate NestJS API design.
> Each prompt is structured to give Claude your constraints before it generates anything.
> Part of the ai-dev-templates collection by Rohit Nair — github.com/rohitnair-dev

---

## How to Use These Templates

1. Copy the prompt
2. Replace everything in `[BRACKETS]` with your actual context
3. Paste into Claude
4. Stay in the same conversation — Claude retains your architecture context

---

## Template 1 — New API Endpoint Design

**When to use:** Designing a new endpoint before writing any code.

```
I'm adding a new API endpoint to my NestJS application.

My current stack:
- NestJS version: [VERSION]
- Database: [Supabase / PostgreSQL / MongoDB]
- Auth: [JWT / Session / API Key]
- Existing module structure: [DESCRIBE OR PASTE FOLDER STRUCTURE]

What this endpoint needs to do:
[DESCRIBE IN PLAIN ENGLISH — e.g. "Accept a PDF file upload, 
extract text, send to Claude API, return structured analysis"]

Request details:
- Method: [GET / POST / PUT / PATCH / DELETE]
- Who calls it: [Public / Authenticated user / Admin only]
- Expected request body/params: [DESCRIBE OR PASTE]
- Expected response shape: [DESCRIBE OR PASTE]

Before writing any code — challenge my endpoint design.
Check for:
- Whether this should be one endpoint or split into multiple
- Missing validation on the request
- Error states I haven't considered
- Whether the response shape is consistent with my existing API
- Security implications (who should have access to what)

Then generate: DTO, Controller method, Service method, 
and any Guards needed. Follow NestJS best practices — 
thin controller, all logic in service.
```

---

## Template 2 — NestJS Guard Implementation

**When to use:** Adding authentication or authorisation to routes.

```
I need to implement a NestJS guard for [DESCRIBE PURPOSE — 
e.g. "JWT authentication" or "role-based access control" 
or "API rate limiting"].

My auth setup:
[DESCRIBE YOUR CURRENT AUTH APPROACH]

Routes that need this guard:
[LIST THE ROUTES OR DESCRIBE THE PATTERN]

What the guard should allow:
[DESCRIBE ALLOWED CASES]

What the guard should block:
[DESCRIBE BLOCKED CASES]

Edge cases to handle:
[e.g. "Expired tokens should return 401 not 403" or 
"Admin users bypass role checks"]

Generate the guard with:
- Proper NestJS CanActivate implementation
- Correct HTTP exception types for each failure case
- A decorator I can use to apply it cleanly
- Example of how to apply it to a controller and a single route
```

---

## Template 3 — NestJS Module Structure

**When to use:** Starting a new feature module from scratch.

```
I'm building a new NestJS feature module for [FEATURE NAME].

My existing application structure:
[PASTE YOUR CURRENT SRC FOLDER STRUCTURE]

What this module needs to handle:
[DESCRIBE THE FULL FEATURE — data it manages, 
operations it performs, external services it calls]

External dependencies this module will use:
[e.g. "Supabase client", "Claude API", "SendGrid", "Stripe"]

Other modules it needs to interact with:
[e.g. "AuthModule for user context", "NotificationsModule"]

Generate:
1. The complete folder structure for this module
2. Module decorator with correct imports/exports
3. Service skeleton with method signatures (no implementation yet)
4. Controller skeleton with route decorators
5. DTOs for the main request/response shapes
6. Any interfaces or types needed

Do not implement the service methods yet — 
I want to review the structure first.
```

---

## Template 4 — API Error Handling Audit

**When to use:** Reviewing existing endpoints for inconsistent error handling.

```
I want to audit the error handling in my NestJS service.

Service code:
[PASTE YOUR SERVICE]

My existing error handling approach (if any):
[DESCRIBE OR PASTE]

Check for:
- Unhandled promise rejections
- Raw database errors being returned to the client
- Inconsistent HTTP status codes
- Missing try/catch blocks
- Places where errors are swallowed silently
- Inconsistent error response shape

Then rewrite the service with consistent error handling.
Use NestJS HttpException. Every error should:
1. Return the correct HTTP status code
2. Return a consistent response shape: { success: false, message: string, code?: string }
3. Log the full error internally before throwing
4. Never expose raw database or internal errors to the client
```

---

## Template 5 — DTO Validation Design

**When to use:** Adding validation to request bodies.

```
I need to add validation to this NestJS endpoint.

Current controller/DTO:
[PASTE YOUR CURRENT CODE]

The data this endpoint receives:
[DESCRIBE EACH FIELD — type, required/optional, constraints]

Business rules to validate:
[e.g. "Email must be unique", "Amount must be positive", 
"Start date must be before end date"]

Generate a fully validated DTO using class-validator decorators.
Include:
- Type decorators (@IsString, @IsNumber etc)
- Constraint decorators (@MinLength, @IsEmail etc)
- Optional field handling (@IsOptional)
- Nested object validation (@ValidateNested, @Type)
- Custom error messages for each rule

Also show me how to enable global ValidationPipe in main.ts
if I haven't done it yet.
```

---

## Template 6 — Supabase Query Optimisation

**When to use:** Slow queries or N+1 problems with Supabase in NestJS.

```
I have a performance issue with a Supabase query in my 
NestJS service.

Current query:
[PASTE YOUR SUPABASE QUERY CODE]

What it's trying to fetch:
[DESCRIBE THE DATA SHAPE YOU NEED]

Current performance issue:
[e.g. "Takes 2-3 seconds", "Makes N+1 calls in a loop",
"Returns too much data"]

Database table structure (relevant tables):
[PASTE YOUR TABLE SCHEMAS OR DESCRIBE THEM]

Analyse the query and suggest:
1. Whether I should use Supabase joins vs multiple queries
2. Which fields to select explicitly instead of select('*')
3. Whether pagination is needed and how to implement it
4. Whether an index would help and which column to index
5. The optimised version of the query

Also check if I should be using Supabase RPC functions 
for any of this logic instead of client-side queries.
```

---

## Template 7 — Full Feature Implementation Prompt

**When to use:** Building a complete feature end to end with AI assistance.

```
I'm building a complete feature in NestJS + Angular.

Feature name: [NAME]

What it does (plain English):
[DESCRIBE FULLY]

Backend stack:
- NestJS [VERSION]
- Supabase (PostgreSQL)
- JWT auth already implemented

Frontend stack:
- Angular [VERSION] standalone components
- NgRx for state management
- PrimeNG UI library

Step 1 — Before any code:
Review my feature description and identify:
- The database tables/columns I'll need
- The API endpoints required
- The state management approach (NgRx vs signals)
- Any third-party services needed
- Security considerations

Do not write any code yet. 
Just give me the architecture plan to review first.
```

---

## Pro Tips for NestJS API Design with Claude

**Always provide before asking:**
- Your NestJS version — decorators and patterns changed between v9 and v10
- Your auth approach — guard implementation differs significantly
- Your database client — Supabase, TypeORM, and Prisma have different patterns
- Your existing module structure — Claude can follow your conventions if it sees them

**Best follow-up prompts after initial generation:**
- "What are the failure modes of this endpoint under high load?"
- "Show me the unit test for this service method"
- "What happens if the database connection drops mid-request?"
- "Is there a race condition if two users hit this simultaneously?"

**Never do this:**
- Ask Claude to generate a full feature without first showing your existing structure
- Accept generated code without asking "what could go wrong here?"
- Skip DTO validation because "it's just an internal API"

---

## Related Templates

- [NgRx Debugging](./ngrx-debugging.md)
- [CLAUDE.md for Angular + NestJS](../CLAUDE.md)

---

*By Rohit Nair — Full-Stack Engineer · Angular · NestJS · AI Workflows*
*github.com/rohitnair-dev · mintpixel.in · linkedin.com/in/rohit-nair-007408217*
