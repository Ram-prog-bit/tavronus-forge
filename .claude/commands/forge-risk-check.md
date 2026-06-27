---
description: Run the Forge v2 risk sweep — overbuild, fake AI claims, UI drift, token waste, tool soup, agent chaos, branch confusion, Vercel production risk, contamination, secrets. Inspection only.
---

# /forge-risk-check

**Purpose:** Periodic risk sweep against the register, to catch drift early.

**When to use:** Before big pushes, after multi-agent days, or weekly.
**When NOT to use:** As a substitute for build/QA (run those too).

## Required docs to read
`docs/FORGE_V2_RISK_REGISTER.md`, `docs/FORGE_V2_REALITY_MAP.md`, `CLAUDE.md`.

## Allowed agents
CEO Lead, Patch Guardian, Security, Memory.

## Risks to check
- **Overbuilding** — scope creep beyond one mission.
- **Fake AI claims** — mock presented as real.
- **Choppy / vibe-coded UI** — design-system drift.
- **Tool soup** — too many tools/deps installed.
- **GStack misuse** — any shipping/credential command used.
- **Agent chaos** — >4 agents, or parallel edits to same files.
- **Token waste** — redundant scans/sessions.
- **Branch confusion** — wrong branch, accidental master work.
- **Vercel production risk** — anything pointing at production.
- **npm audit** — pre-existing Next vulns (do not `--force`).
- **Contamination** — SOJ / Ziggma / SushiSwap.
- **Secrets exposure** — keys/tokens in diffs.

## Steps
1. Confirm branch + status + diff stat.
2. Walk each risk; mark OK / watch / blocked with evidence.
3. Recommend the smallest safe mitigation per flagged risk.

## Forbidden actions
No edits/installs/deploys. Inspection only.

## Final report format
**Risk table** (risk / status / evidence / mitigation) · **Top concern** · **Next step**.
