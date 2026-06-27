# Forge v2 — Model & Effort Routing

> Recommended model/effort per agent, plus cost-tiered presets. Aliases only — verify
> availability locally. Do not hardcode unverified exact model IDs. `fable` only if
> supported in this Claude Code install. If `effort` frontmatter isn't supported, set
> effort at runtime via `/model`.

## Per-agent routing

| Agent | Model | Effort | Notes |
|---|---|---|---|
| CEO Lead | `opus` (fable-level if available) | high / xhigh | Orchestration, judgment |
| Design Director | `opus` or `sonnet` | high | `opus` for critical design review |
| Frontend | `sonnet` | medium / high | high for tricky primitives |
| QA/UI | `sonnet` | medium | Visual/interaction QA |
| Release/Test | `sonnet` | medium | Build/release readiness |
| Memory | `haiku` or `sonnet` | low / medium | Truth + log upkeep |
| Docs/Report | `haiku` or `sonnet` | low / medium | Reports + docs |
| Research | `sonnet` | medium / high | Tool/approach research |
| Security | `sonnet` or `opus` | high | `opus` for critical review |
| Patch Guardian | `opus` or `sonnet` | high | `opus` for final critical gate |

## Cost-tiered presets

### Cheapest safe setup (token-frugal)
- CEO `sonnet` (high), Design Director `sonnet`, Frontend `sonnet` (med),
  QA/UI `sonnet` (med), Release/Test `sonnet` (med), Memory `haiku`, Docs `haiku`,
  Research `sonnet`, Security `sonnet`, Patch Guardian `sonnet` (high).
- Use for low-risk, well-scoped days (e.g. doc updates, small primitive tweaks).

### Balanced setup (default)
- CEO `opus` (high), Design Director `sonnet` (high), Frontend `sonnet` (med/high),
  QA/UI `sonnet`, Release/Test `sonnet`, Memory `haiku`, Docs `haiku`,
  Research `sonnet`, Security `sonnet`, Patch Guardian `opus` for the final gate else `sonnet`.
- Use for Design System Day and normal build days.

### Maximum quality setup (high-stakes)
- CEO `opus`/fable (xhigh), Design Director `opus` (high), Frontend `sonnet` (high),
  QA/UI `sonnet` (high), Release/Test `sonnet`, Memory `sonnet`, Docs `sonnet`,
  Research `sonnet` (high), Security `opus` (high), Patch Guardian `opus` (high).
- Use for milestone snapshots, security-sensitive reviews, or first real integrations.

## When NOT to use Opus / Fable

- Routine doc edits, log updates, simple QA passes, small reversible changes.
- High-volume parallel sessions (cost multiplies fast).
- When `sonnet` clearly suffices — reserve top tiers for orchestration, critical design,
  security, and the final patch gate.

## When Haiku is enough

- Memory updates, daily log entries, report formatting, simple inventory/listing tasks.

## Token / cost warning

Each agent/session consumes quota independently. Higher tiers + higher effort + more
parallel sessions = materially more cost. Default to **2–4 agents**, the **balanced**
preset, and lift to **maximum quality** only for high-stakes missions. Agent View sessions
each bill separately — keep to 2–4.
