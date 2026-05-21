# CLAUDE.md — AI Context File
> Drop this file in the root of any project.
> Claude reads it automatically and uses it to understand your stack,
> patterns, and constraints before generating any code.
> Adapt the sections marked [EDIT] to match your specific project.

---

## Project Overview

**Project name:** [EDIT — e.g. "MintPixel Portfolio", "Resume Analyser"]
**Type:** [EDIT — e.g. "Full-stack web app", "API service", "CLI tool"]
**Status:** [EDIT — e.g. "Production", "Active development", "MVP"]
**Primary goal right now:** [EDIT — e.g. "Build resume upload and analysis feature"]

---

## Tech Stack

### Frontend
- **Framework:** Angular 19 (standalone components, signals, SSR)
- **State management:** NgRx (actions, reducers, effects, selectors)
- **UI library:** PrimeNG 19 + Bootstrap 5
- **Charts:** Highcharts
- **Styling:** SCSS + CSS custom properties (runtime themeable)
- **HTTP:** Angular HttpClient with interceptors
- **Auth:** JWT + route guards + tokenGuard
- **Build:** Angular CLI + SSR via Express

### Backend
- **Runtime:** Node.js
- **Framework:** NestJS (modules, controllers, services, guards)
- **Database:** Supabase (PostgreSQL)
- **Auth:** JWT + RBAC (role-based access control)
- **File storage:** Supabase Storage
- **API style:** RESTful

### AI & Tools
- **Primary AI:** Claude (complex reasoning, architecture, debugging)
- **Research AI:** Gemini (large context, cross-source research)
- **Real-time info:** Perplexity
- **In-editor:** GitHub Copilot (boilerplate only)

### Dev Tools
- **Version control:** Git
- **CI/CD:** [EDIT]
- **Hosting:** Render (backend), [EDIT frontend]

---

## Architecture Patterns — Follow These Always

### Angular (Frontend)

```
src/app/
  auth/          → Login, register, auth service, guards
  core/          → Global services, interceptors, guards
  features/      → Full-page feature components (lazy loaded)
  layouts/       → Page shells (MainLayout, AuthLayout)
  shared/        → Reusable components, pipes, directives
  styles/        → Global SCSS, theme tokens
```

**Component rules:**
- Always use standalone components — no NgModules
- Use signals for local component state
- Use NgRx for shared/global state
- Use OnPush change detection on all components
- Lazy load every route with loadComponent()
- Use inject() over constructor injection

**NgRx pattern:**
```typescript
// Actions — always typed, never generic
export const loadUser = createAction('[User] Load User');
export const loadUserSuccess = createAction(
  '[User] Load User Success',
  props<{ user: User }>()
);

// Effects — always handle errors, never swallow them
loadUser$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loadUser),
    switchMap(() =>
      this.userService.getUser().pipe(
        map(user => loadUserSuccess({ user })),
        catchError(error => of(loadUserFailure({ error })))
      )
    )
  )
);
```

**Styling rules:**
- Use CSS custom properties from theme tokens — never hardcode colours
- Variables: --primary, --accent, --background, --surface, --text-primary, --text-secondary
- Mobile-first responsive — use Bootstrap grid, Flexbox for components

---

### NestJS (Backend)

```
src/
  modules/       → Feature modules (auth, profile, ai, contact)
  common/        → Shared guards, interceptors, decorators, pipes
  config/        → Environment config, validation schemas
  main.ts        → Bootstrap, global pipes, CORS, Swagger
```

**Module pattern:**
```typescript
@Module({
  imports: [TypeOrmModule.forFeature([Entity])],
  controllers: [FeatureController],
  providers: [FeatureService],
  exports: [FeatureService],
})
export class FeatureModule {}
```

**Controller rules:**
- Keep controllers thin — only HTTP handling
- All business logic lives in services
- Always use DTOs with class-validator for input validation
- Always return consistent response shape:
```typescript
{ success: boolean, data: T, message?: string }
```

**Guard pattern:**
```typescript
// Always use JWT guard + role guard together on protected routes
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Get('protected-route')
```

**Error handling:**
- Use NestJS built-in HttpException for all errors
- Never return raw database errors to the client
- Always log errors with context before throwing

---

## Code Style Rules

### TypeScript
- **Never use `any`** — always define proper types or interfaces
- Use `interface` for data shapes, `type` for unions/intersections
- Always handle null/undefined explicitly — no implicit assumptions
- Use async/await over raw Promises
- Export types from a central `types/index.ts`

### Naming
- Components: `PascalCase` — `UserProfileComponent`
- Services: `PascalCase` + Service suffix — `UserService`
- Files: `kebab-case` — `user-profile.component.ts`
- Variables/functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- NgRx actions: `[Feature] Action Name` — `[User] Load User Success`

### Comments
- Comment the **why** not the **what**
- No commented-out code in commits
- Complex logic gets a JSDoc block

---

## What I Am Currently Building

[EDIT — Be specific. Claude uses this to understand your immediate context]

Example:
> "I am building a resume analyser feature. Users upload a PDF resume.
> The backend extracts text, sends it to Claude API, and returns
> structured analysis with suggested improvements and interview questions.
> Frontend is Angular with a file upload component and results display."

---

## Current Known Issues

[EDIT — List any bugs or tech debt Claude should be aware of]

Example:
- NgRx effects not handling token refresh on 401 responses
- Profile image upload occasionally fails on large files (>5MB)
- SSR hydration mismatch on theme switching

---

## Decisions Already Made — Do Not Suggest Alternatives

[EDIT — List architectural decisions that are final]

Example:
- Using Supabase — do not suggest Firebase or PlanetScale
- Using PrimeNG — do not suggest Angular Material
- Using NgRx — do not suggest Signals-only state management
- Authentication is JWT-based — do not suggest session cookies

---

## What Good Output Looks Like

When generating code for this project:

✅ Use standalone Angular components with signals
✅ Follow the folder structure above exactly
✅ Include error handling in every async operation
✅ Use the CSS variables — never hardcode colours
✅ Add JSDoc comments on public service methods
✅ Keep components under 200 lines — extract logic to services
✅ Always use TypeScript strict types — no `any`

❌ Do not generate NgModule-based code
❌ Do not use constructor injection — use inject()
❌ Do not suggest libraries not already in the stack
❌ Do not hardcode API URLs — use environment files
❌ Do not skip error handling to keep examples short

---

## Adaptable For Any Stack

If you're not using Angular + NestJS, keep these sections and update:

| Section | What to change |
|---|---|
| Tech Stack | Your framework, ORM, database, auth method |
| Architecture Patterns | Your folder structure and conventions |
| Code Style Rules | Your team's agreed naming and formatting |
| What I Am Currently Building | Always project-specific |
| Decisions Already Made | Always project-specific |

The sections that stay identical regardless of stack:
- What Good Output Looks Like (philosophy)
- Current Known Issues (project state)
- Decisions Already Made (constraints)

---

## How To Use This File

**For Claude Code (terminal):**
Drop this file in your project root. Claude Code reads it automatically on `/init`.

**For Claude.ai chat:**
Paste the relevant sections at the start of any new conversation.

**For GitHub Copilot:**
Copilot doesn't read CLAUDE.md — use it only for Claude and Claude Code.

**Update this file when:**
- You make a major architectural decision
- You start a new feature with new constraints
- You onboard a new AI tool to your workflow

---

*Template by Rohit Nair — [github.com/rohitnair321](https://github.com/rohitnair-dev)*
*Angular + NestJS · AI-Powered Workflows · [rohit-nair296.onrender.com](https://rohit-nair296.onrender.com/)*
