# Resume Analyser
> AI-powered resume analysis and interview question generator
> Built with Angular + NestJS + Claude API

---

## What It Does

Upload a resume. Get back:

- **Strengths analysis** — what the resume does well
- **Gap analysis** — what's missing or weak
- **ATS score** — how well it passes automated screening
- **Rewrite suggestions** — specific improvements with examples
- **Interview questions** — generated based on the actual resume content
- **Role fit score** — match percentage against a job description

---

## Why I'm Building This

Most resume analysers give generic feedback.

"Add more action verbs." "Quantify your achievements."

That's not useful. This one reads your actual resume, understands your domain, and gives you specific, contextual feedback — the kind you'd get from a senior hiring manager who actually read it.

Built as a real product, not a demo.

---

## Tech Stack

```
Frontend:   Angular 19 (standalone, signals, SSR)
Backend:    NestJS + Node.js
AI:         Claude API (claude-sonnet-4-20250514)
Database:   Supabase (PostgreSQL)
Storage:    Supabase Storage (PDF uploads)
Auth:       JWT
Hosting:    Render
```

---

## Architecture

```
User uploads PDF
      ↓
NestJS — PDF text extraction (pdf-parse)
      ↓
Claude API — structured analysis prompt
      ↓
Structured JSON response
      ↓
Angular — results dashboard
      ↓
Optional: match against job description
```

---

## Current Status

🟡 **In active development — Week 1**

- [ ] Project scaffold — NestJS + Angular
- [ ] PDF upload endpoint
- [ ] Text extraction service
- [ ] Claude API integration
- [ ] Basic analysis prompt
- [ ] Results UI
- [ ] Job description matching
- [ ] Interview question generator
- [ ] User accounts + history
- [ ] Production deployment

---

## Roadmap

### Phase 1 — Core Analysis (Current)
PDF upload → text extraction → Claude analysis → results display

### Phase 2 — Job Matching
Paste a job description → get role fit score + tailored suggestions

### Phase 3 — Interview Prep
Generate role-specific interview questions from resume content

### Phase 4 — History & Accounts
Save analyses, track improvements across multiple resume versions

---

## Building in Public

I'm documenting this build on LinkedIn as I go.

Every week I share what I built, what broke, what I learned.

Follow the build: [linkedin.com/in/rohit-nair-007408217](https://linkedin.com/in/rohit-nair-007408217)

---

## Local Setup

*Coming once core architecture is stable*

```bash
# Clone
git clone https://github.com/rohitnair-dev/resume-analyser

# Backend
cd backend
npm install
cp .env.example .env
npm run start:dev

# Frontend
cd frontend
npm install
npm start
```

---

## Environment Variables

```env
# Backend .env
CLAUDE_API_KEY=your_key_here
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_service_key
JWT_SECRET=your_jwt_secret
PORT=3000
```

---

## Contributing

This is a personal build-in-public project. Not accepting PRs yet.

But if you find something interesting — open an issue or DM me on LinkedIn.

---

## Connect

- **Portfolio:** [rohit-nair296.onrender.com](https://rohit-nair296.onrender.com/)
- **LinkedIn:** [Rohit Nair](https://linkedin.com/in/rohit-nair-007408217)
- **GitHub:** [rohitnair-dev](https://github.com/rohitnair-dev)

---

*Building this alongside a full-time engineering role at Infosys.*
*Angular + NestJS + Claude API + Supabase*
