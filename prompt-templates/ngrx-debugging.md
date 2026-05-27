# NgRx Debugging — Prompt Templates
> Copy these prompts directly into Claude for faster, more accurate NgRx debugging.
> Each prompt is structured to give Claude the context it needs before generating output.
> Part of the ai-dev-templates collection by Rohit Nair — github.com/rohitnair-dev

---

## How to Use These Templates

1. Copy the prompt
2. Replace everything in `[BRACKETS]` with your actual code/context
3. Paste into Claude
4. Follow up with specific questions in the same conversation

---

## Template 1 — Silent State Update Failure

**When to use:** Action dispatches correctly but state doesn't update. No error thrown.

```
I have an NgRx state management issue where an action dispatches 
correctly but the state isn't updating as expected.

My current setup:
- Angular version: [VERSION]
- NgRx version: [VERSION]

Action:
[PASTE YOUR ACTION]

Reducer:
[PASTE YOUR REDUCER]

Effect (if relevant):
[PASTE YOUR EFFECT]

Selector I'm using to read state:
[PASTE YOUR SELECTOR]

Component subscription:
[PASTE HOW YOU'RE SUBSCRIBING]

What I expect to happen:
[DESCRIBE EXPECTED BEHAVIOUR]

What actually happens:
[DESCRIBE ACTUAL BEHAVIOUR]

Before suggesting a fix — trace the full action → reducer → 
selector chain and identify where the state mutation is breaking. 
Then explain why your fix won't cause downstream issues in other 
parts of the state tree.
```

---

## Template 2 — Effect Not Triggering

**When to use:** Effect should fire after an action but nothing happens.

```
My NgRx effect is not triggering after the action dispatches.
I've confirmed the action reaches the store via Redux DevTools.

Effect code:
[PASTE YOUR EFFECT]

The action it should respond to:
[PASTE THE ACTION]

What the effect should do:
[DESCRIBE EXPECTED BEHAVIOUR]

What I've already checked:
- [ ] Action type string matches exactly
- [ ] Effect is registered in the module/config
- [ ] Observable chain is not broken
- [ ] No unhandled errors swallowing the stream

Identify the most likely cause given my effect code.
Check for: type mismatch, missing catchError, broken pipe chain,
incorrect operator usage (switchMap vs mergeMap vs concatMap),
or missing dispatch flag.
```

---

## Template 3 — Race Condition in Effects

**When to use:** Intermittent state corruption or unexpected behaviour under fast user interaction.

```
I have a race condition in my NgRx effects. The issue appears 
when [DESCRIBE TRIGGER — e.g. "user clicks rapidly" or 
"multiple API calls fire simultaneously"].

Effect causing the issue:
[PASTE YOUR EFFECT]

State shape relevant to this effect:
[PASTE RELEVANT STATE INTERFACE]

The problem:
[DESCRIBE WHAT GOES WRONG]

Analyse whether I should be using switchMap, mergeMap, 
concatMap, or exhaustMap here — and explain the specific 
reason based on the cancellation and ordering requirements 
of this particular effect. Don't just recommend switchMap 
by default.
```

---

## Template 4 — Selector Returning Stale Data

**When to use:** Component showing outdated state after store updates.

```
My NgRx selector is returning stale data even after the store 
has been updated.

Selector:
[PASTE YOUR SELECTOR]

How I'm using it in the component:
[PASTE COMPONENT CODE]

State shape:
[PASTE RELEVANT STATE INTERFACE]

I've confirmed the store update happens via Redux DevTools.
The component is not re-rendering with the new value.

Check for: missing memoisation, reference equality issues 
with objects/arrays, OnPush change detection not triggering,
async pipe missing, or selector projector returning new 
object reference on every call.
```

---

## Template 5 — Full State Architecture Review

**When to use:** Starting a new feature or refactoring existing state.

```
I'm building a new NgRx feature module for [FEATURE NAME].

Here's what it needs to do:
[DESCRIBE THE FEATURE IN PLAIN ENGLISH]

Existing state shape (relevant parts):
[PASTE EXISTING STATE INTERFACES]

API endpoints this feature will consume:
[LIST ENDPOINTS WITH METHOD AND PAYLOAD]

My proposed state shape:
[PASTE YOUR PROPOSED INTERFACE — or write "I haven't decided yet"]

Before I implement anything — review my proposed state shape 
and challenge it. Look for:
- Over-normalisation or under-normalisation
- Missing loading/error states
- State that belongs in component not store
- Naming inconsistencies with existing state
- Anything that will cause selector complexity later

Then suggest the actions, reducer, effects, and selectors 
I'll need — with the exact NgRx pattern I should follow 
for this Angular version.
```

---

## Template 6 — NgRx Effect to Signal Migration

**When to use:** Migrating from NgRx effects to Angular signals for local state.

```
I want to migrate this NgRx effect to use Angular signals 
for local component state instead.

Current effect:
[PASTE YOUR EFFECT]

Current component using this state:
[PASTE COMPONENT CODE]

The reason I want to migrate:
[e.g. "This state is only used in one component" or 
"The NgRx overhead isn't justified here"]

Analyse whether this migration makes sense given the 
usage pattern. If yes — show me the signal-based equivalent 
with proper error handling. If no — explain why the state 
should stay in the store.
```

---

## Pro Tips for NgRx Debugging with Claude

**Always include:**
- Your NgRx version — patterns changed significantly between v14 and v17
- The Redux DevTools output if available — paste the action log
- Your Angular version — standalone vs module-based affects patterns

**Never do this:**
- Paste your entire state file and ask "what's wrong"
- Ask without showing the selector AND the component together
- Skip the "what I expect vs what happens" section

**Best follow-up prompts:**
- "What are the edge cases this fix doesn't handle?"
- "How would this break under concurrent dispatches?"
- "Show me the unit test for this effect"

---

## Related Templates

- [NestJS API Design](./nestjs-api-design.md)
- [CLAUDE.md for Angular + NestJS](../CLAUDE.md)

---

*By Rohit Nair — Full-Stack Engineer · Angular · NestJS · AI Workflows*
*github.com/rohitnair-dev · mintpixel.in · linkedin.com/in/rohit-nair-007408217*
