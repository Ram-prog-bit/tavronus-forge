# Tavronus Forge — Real AI Readiness Review

A readiness assessment for a future **optional server-side Prompt mode**. Planning
only — no code, no spec. Complements `REAL_AI_ARCHITECTURE.md`.

---

## 1. Purpose

Evaluate whether Tavronus Forge is ready to build real AI yet, and what must exist
first. Short answer up front: **validate first; do not build real AI yet.**

## 2. Current readiness summary

| Dimension | Rating | Notes |
|---|---|---|
| UI readiness | **Ready** | Cockpit, modes, composer, output cards, copy/apply all shipped and polished. |
| Mode system readiness | **Ready** | Five modes with stable ids (`lib/modes.ts`); mode/context strip exists. |
| Artifact display readiness | **Ready** | `OutputCard` already renders structured artifacts + framed snippets; a real response can map to the same shape. |
| Prompt/context input readiness | **Partially ready** | The composer + editor-aware context exist; a "what to send" selector does not. |
| Architecture readiness | **Partially ready** | No server route yet; the plan (`REAL_AI_ARCHITECTURE.md`) exists but is unbuilt. |
| Security readiness | **Partially ready** | No secrets today (good); server-route + env-var discipline not yet implemented. |
| Validation readiness | **Not ready** | No tester sessions run; no `VALIDATION_RESULTS_TEMPLATE.md` filled. |

**Overall: Partially ready — gated on validation, not on UI.** The surface is ready;
the evidence and the server scaffolding are not.

## 3. Why Prompt mode is still recommended first

- Works with **open-tab content** alone — no repo indexing required.
- Delivers the product's core value: a **better copy-paste prompt**.
- **Lowest destructive risk** — a weak prompt is a minor annoyance, never a bad file write.
- Fits Ram's real workflow with **Claude Code / Cursor / GPT**.
- **Easier to validate** than Review/Debug, which need real multi-file context to be good.

## 4. What must exist before real Prompt mode

- A clear per-output **source label: Mock vs Real AI**.
- A **server-side API route** plan (future `app/api/forge-ai/route.ts`).
- An **env-var plan** (provider + key in `.env.local`, never `NEXT_PUBLIC_`).
- A **request/response contract** (see `REAL_AI_ARCHITECTURE.md` §5).
- **Error / fallback** behavior (timeout, rate-limit → fall back to mock, relabelled).
- **Rate / cost awareness**.
- **User-facing honesty text** at the point of generation.
- Guarantees: **no client secret exposure, no file writes, no terminal execution.**

## 5. Minimum viable real Prompt mode (description, not a spec)

- User types an instruction in the composer with **Prompt** mode selected.
- The current **active file content** may be included (user-visible).
- The request goes to a **server route**; the provider is called server-side.
- The route returns a **structured artifact** mapped to the existing `OutputCard` shape.
- **Copy flow** works exactly as today.
- **Mock remains the default** and the fallback.

Nothing else (no diff writes, no multi-file, no memory) in the first version.

## 6. Do-not-build-yet checklist

- [ ] Validation not run yet (no tester signal).
- [ ] No decision report (`VALIDATION_RESULTS_TEMPLATE.md` unfilled).
- [ ] Artifact templates may need improvement first.
- [ ] Onboarding/positioning may need refinement first.

If any box is unchecked, do not start implementation.

## 7. Build-readiness gates

Proceed to a technical spec only when **all** hold:

- [ ] Validation Kit completed with real testers.
- [ ] A small number of tester sessions recorded.
- [ ] Prompt mode ranked highest or clearly useful.
- [ ] Mock honesty understood by testers (they weren't fooled).
- [ ] Artifact usefulness score acceptable.
- [ ] An architecture checker pass approves the plan.

## 8. Security notes

- **No `NEXT_PUBLIC_` provider key** — ever.
- Key in **`.env.local`** only; server-side route only.
- **Sanitize** the payload shape; send only what the user intends.
- **Do not log** sensitive code blindly.
- **Do not store** user code remotely (unless a later phase explicitly designs it).
- **Do not send more context** than the user chose to include.

## 9. Future technical questions (answer before implementation)

- Which provider first? Which model?
- What max context size?
- What exact artifact schema (vs the current `title/label/body/code`)?
- What fallback when the call fails?
- What rate limits / cost ceilings?
- What should **production** do with no env key (stay mock)?
- What should **local dev** do with no env key (stay mock)?

## 10. Recommendation

1. **Complete validation first** (`VALIDATION_KIT.md` → `VALIDATION_RESULTS_TEMPLATE.md`).
2. Then create **Real Prompt Mode Technical Spec Pass 1**.
3. Then a **checker** pass on that spec.
4. Only then implement an **optional server-side Prompt mode**, mock preserved as default.
