# Forge v2 — Risk Register

> Known risks for the v2 rebuild, each with prevention, detection, and rollback.

| # | Risk | Why it matters |
|---|---|---|
| 1 | Overbuilding | Burns time/tokens, breaks discipline, produces unstable UI |
| 2 | Fake AI claims | Destroys trust; violates honesty layer |
| 3 | Choppy UI | Undermines premium positioning |
| 4 | Too many agents too early | Coordination overhead, token waste, confusion |
| 5 | Token waste | Cost + slow iteration |
| 6 | Vercel production accidentally changing | User-facing breakage |
| 7 | Branch confusion | Work lost or applied to wrong branch |
| 8 | SOJ/Ziggma/Sushi contamination | Cross-project pollution, broken builds |
| 9 | Installing too many frameworks | Bloat, conflicts, security surface |
| 10 | Claude editing too much at once | Unreviewable diffs, hidden regressions |
| 11 | No evidence trail | Claims can't be verified |
| 12 | Poor design consistency | UI drifts from the design system |
| 13 | Hidden mock behavior | Users misled about what's real |
| 14 | Secrets exposure | Security incident |

## Detail per risk

### 1. Overbuilding
- **Prevention:** one mission per day; plan-before-edit; Design System Day first.
- **Detection:** diff touches multiple areas; scope creep in plan review.
- **Rollback:** revert the branch commit; re-scope to a single area.

### 2. Fake AI claims
- **Prevention:** honesty layer; Reality Map labels; no animating mock as real.
- **Detection:** QA/UI Agent + Reality Map audit; mismatch between label and behavior.
- **Rollback:** correct the label immediately; treat as a bug.

### 3. Choppy UI
- **Prevention:** design system motion rules (150–300ms, calm easing, reduced-motion).
- **Detection:** visual QA against design system on preview URL.
- **Rollback:** revert offending component styles.

### 4. Too many agents too early
- **Prevention:** only 7 MVP agents active; later-agents stay dormant docs.
- **Detection:** workflow references a non-MVP agent.
- **Rollback:** disable/ignore the extra agent; revert to MVP set.

### 5. Token waste
- **Prevention:** scoped inspections; cheaper tiers for routine roles; no broad scans.
- **Detection:** repeated re-reading of the same files; oversized prompts.
- **Rollback:** tighten scope; cache project truth in Memory.

### 6. Vercel production accidentally changing
- **Prevention:** never merge to `master` without approval; previews only.
- **Detection:** check target branch before any deploy/merge.
- **Rollback:** redeploy last known-good production commit; revert merge.

### 7. Branch confusion
- **Prevention:** confirm `git branch --show-current` at start of every mission.
- **Detection:** unexpected branch in status output.
- **Rollback:** checkout correct branch; cherry-pick/move commits if needed.

### 8. SOJ/Ziggma/Sushi contamination
- **Prevention:** never reference other projects; agents read only this repo.
- **Detection:** grep for foreign project names in diffs/deps.
- **Rollback:** revert contaminated files; remove foreign deps.

### 9. Installing too many frameworks
- **Prevention:** dependency plan gate; only safe essentials; no blind shadcn/MCP/etc.
- **Detection:** package.json diff review.
- **Rollback:** `npm uninstall` the package; restore lockfile.

### 10. Claude editing too much at once
- **Prevention:** one builder, one area; Patch Guardian gate; minimal diffs.
- **Detection:** `git diff --stat` shows wide spread.
- **Rollback:** revert; re-do in smaller scoped patches.

### 11. No evidence trail
- **Prevention:** Evidence Vault discipline; store proof for each claim.
- **Detection:** a claim with no linked evidence.
- **Rollback:** re-run the check and record evidence before proceeding.

### 12. Poor design consistency
- **Prevention:** Design Director sign-off; reuse tokens/primitives.
- **Detection:** ad-hoc colors/spacing not from the scale.
- **Rollback:** refactor to tokens; revert one-off styles.

### 13. Hidden mock behavior
- **Prevention:** Reality Map + visible honesty labels in UI.
- **Detection:** UI area with no state label.
- **Rollback:** add/correct label; treat as a bug.

### 14. Secrets exposure
- **Prevention:** never print/commit secrets; `.env` gitignored; Security Agent.
- **Detection:** scan diffs for keys/tokens before commit.
- **Rollback:** rotate the secret; purge from staging (never rewrite shared history
  without explicit approval).

---

## CEO Priming v2 — additional risks

| # | Risk | Why it matters |
|---|---|---|
| 15 | Tool soup | Too many tools (GStack/Agent View/VS Code/MCP) dilute focus and add surface |
| 16 | GStack misuse | `/ship`, `/land-and-deploy`, `/setup-browser-cookies` could deploy or leak creds |
| 17 | Agent chaos | >4 agents or many parallel sessions cause confusion + token burn |
| 18 | Parallel edit collisions | Two sessions editing the same files corrupt each other's work |
| 19 | Vercel production risk | An accidental master push / merge / deploy changes production |
| 20 | npm audit issue | Pre-existing Next/eslint-config-next vulns; `--force` would break the app |
| 21 | Unstable design system | Skipping Design System Day discipline yields inconsistent UI |
| 22 | Dependency bloat | Installing hype tools (shadcn/Graphify/ECC/Ponytail) bloats and risks the repo |
| 23 | Bun/GStack half-state | GStack staged but not set up could be mistaken for active |

### 15. Tool soup
- **Prevention:** keep the Claude Code extension panel primary; add tools deliberately, documented.
- **Detection:** tools referenced that aren't in the docs/setup files.
- **Rollback:** stop using the extra tool; remove staged installs (e.g. delete `~/.claude/skills/gstack`).

### 16. GStack misuse
- **Prevention:** allow-list only planning/review/QA/security commands (`FORGE_V2_GSTACK_SETUP.md`).
- **Detection:** any `/ship` / `/land-and-deploy` / `/setup-browser-cookies` invocation.
- **Rollback:** abort the command; verify no deploy/credential action occurred; report.

### 17. Agent chaos
- **Prevention:** default 2–4 agents; CEO picks the smallest team; no 10-agent runs without approval.
- **Detection:** >4 active agents/sessions.
- **Rollback:** stop extra sessions; consolidate to the core roster.

### 18. Parallel edit collisions
- **Prevention:** one builder (Frontend) at a time; Agent View sessions are read-only; use worktrees for true parallel edits.
- **Detection:** two sessions touching the same files; conflicting diffs.
- **Rollback:** revert the conflicted area; redo serially.

### 19. Vercel production risk
- **Prevention:** push only `forge-v2-rebuild`; never `master`; no deploy commands.
- **Detection:** target branch != `forge-v2-rebuild` in a push/merge.
- **Rollback:** redeploy last known-good production commit; revert the merge.

### 20. npm audit issue
- **Prevention:** do not run `npm audit fix --force`; track a deliberate Next.js upgrade separately.
- **Detection:** `npm audit` summary; unexpected major version bumps in the lockfile.
- **Rollback:** restore `package.json`/`package-lock.json` from git.

### 21. Unstable design system
- **Prevention:** Design System Day first; Design Director sign-off; reuse tokens/primitives.
- **Detection:** ad-hoc colors/spacing not from the scale; inconsistent components.
- **Rollback:** refactor to tokens; revert one-off styling.

### 22. Dependency bloat
- **Prevention:** dependency plan gate; only safe essentials; deferred list enforced.
- **Detection:** `package.json` diff adds unapproved packages.
- **Rollback:** `npm uninstall`; restore lockfile.

### 23. Bun/GStack half-state
- **Prevention:** Reality Map labels GStack "staged, not activated"; docs state the Bun blocker.
- **Detection:** assuming GStack `/` commands work before `./setup` ran.
- **Rollback:** install Bun + run `./setup`, or delete the staged folder if abandoning.
