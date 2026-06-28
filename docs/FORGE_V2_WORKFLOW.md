# Forge v2 — Workflow

> The standard operating procedure for every Forge v2 mission. Discipline over speed.

## Standard mission flow

```
User gives mission
  → Mission Control clarifies / sanitizes the task
  → CEO Agent creates the plan
  → Memory Agent loads Project Truth
  → Worker agents inspect separately (Frontend / QA-UI / Release-Test / Design Director)
  → Evidence Vault stores proof of what was inspected
  → CEO merges findings
  → Patch Guardian creates a safe patch plan
  → User approves
  → One builder (Frontend Agent) edits at a time
  → Release / Test Agent verifies (build / lint / checks)
  → Vercel preview checked
  → Final report saved
  → Memory Agent updates decisions
```

Principles:

- **Plan before edit.** No agent edits before scope is approved.
- **One builder at a time.** Only the Frontend Agent edits app code.
- **Evidence, not vibes.** Every claim has stored proof.
- **Honesty layer.** Mock vs real is always labeled.
- **Minimal safe changes.** Reuse first; smallest diff that works.
- **Patch Guardian reviews, never edits.**

## Daily workflow

1. Confirm branch (`forge-v2-rebuild`).
2. Confirm git status (clean before starting).
3. Confirm Vercel preview status.
4. Pick **one** mission.
5. Plan only (no edits).
6. Inspect (agents gather evidence).
7. Approve scope.
8. Build (Frontend Agent, one area).
9. Test (Release / Test Agent: build / lint / checks).
10. Push preview (only if approved).
11. Visual QA (QA / UI Agent against design system).
12. Final report (saved; Memory Agent updates decisions).

## Guardrails checked every mission

- Port 5642 unchanged.
- No real AI/backend/auth/db/terminal/filesystem added without approval.
- No SOJ / Ziggma / SushiSwap contamination.
- No secrets printed or committed.
- No force push, no history rewrite, no backup deletion.
- No production merge without explicit approval.
