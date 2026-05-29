# AI Dev Templates

Practical AI templates for developers who want to 
build faster with Claude, Gemini, and GitHub Copilot.

Built and maintained by [Rohit Nair](https://mintpixel.in) 
— Full-Stack Engineer specialising in Angular + NestJS.

---

## What's Inside

### CLAUDE.md — Angular + NestJS
Drop this in your project root. Claude reads it 
automatically and understands your stack, patterns, 
and constraints before generating any code.

→ [View template](./CLAUDE.md)

**What it includes:**
- Full Angular 19 + NestJS project context
- NgRx patterns Claude should follow
- Code style rules and naming conventions
- What good output looks like for your stack
- Adaptable section for any framework

---

## Prompt Templates

Ready-to-use prompts structured to give Claude 
the right context before it generates anything.
Copy, fill in the brackets, paste into Claude.

### NgRx Debugging
6 battle-tested prompts for debugging NgRx state issues —
silent failures, race conditions, stale selectors, 
effect not triggering, and full architecture review.

→ [View templates](./prompt-templates/ngrx-debugging.md)

### NestJS API Design
7 prompts for designing NestJS endpoints, guards, 
modules, DTOs, Supabase queries, and full feature 
implementation with AI assistance.

→ [View templates](./prompt-templates/nestjs-api-design.md)

---

## NestJS Snippets

Production-ready NestJS code you can drop into 
any project. Built with AI — reviewed for real 
production use.

### JWT Auth Guard
Complete JWT authentication guard with:
- @Public() decorator for route exemptions
- @Roles() decorator for role-based access
- Proper error handling (expired vs invalid token)
- Separate RolesGuard for composable auth
- Usage examples for every scenario

→ [View snippet](./nestjs-snippets/auth.guard.ts)

### Feature Module Structure
Production NestJS module pattern with:
- Complete folder structure guide
- Controller skeleton (thin — delegates only)
- Service skeleton (owns all business logic)
- DTO skeleton with class-validator
- Three rules I never break in production

→ [View snippet](./nestjs-snippets/feature.module.ts)

---

## How to Use

### CLAUDE.md
1. Copy `CLAUDE.md` into your project root
2. Edit the sections marked `[EDIT]`
3. For Claude Code — reads automatically on `/init`
4. For Claude.ai — paste relevant sections at conversation start

### Prompt Templates
1. Open the template file
2. Copy the prompt you need
3. Replace everything in `[BRACKETS]` with your actual code
4. Paste into Claude
5. Stay in the same conversation — Claude retains context

### NestJS Snippets
1. Copy the file into your project
2. Update imports to match your module structure
3. Remove the comment examples — keep only what you need

---

## Coming Soon

- Angular signals migration guide
- Prompt templates for NgRx → signals migration
- NestJS + Supabase integration patterns
- Token efficiency guide for long AI sessions
- Resume analyser — full build in public

---

## Built in Public

I'm documenting everything I build and learn on LinkedIn.

Daily posts on Angular, NestJS, AI workflows, and 
building production systems with AI assistance.

Follow along: [linkedin.com/in/rohit-nair-007408217](https://www.linkedin.com/in/rohit-nair-007408217)

---

## Connect

- **Portfolio:** [rohit-nair296.onrender.com](https://rohit-nair296.onrender.com/)
- **LinkedIn:** [Rohit Nair](https://linkedin.com/in/rohit-nair-007408217)
- **GitHub:** [rohitnair-dev](https://github.com/rohitnair-dev)

---

*If this helped you — star the repo and share it 
with a developer who'd find it useful.*

*Angular + NestJS · AI-Powered Workflows · Building in Public*
