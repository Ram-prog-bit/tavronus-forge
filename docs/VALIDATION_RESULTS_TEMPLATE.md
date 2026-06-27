# Tavronus Forge — Validation Results Template

Fill this in **after** running multiple tester sessions (forms collected in
`TESTER_FEEDBACK_FORM.md`). It turns raw feedback into a decision.

---

## 1. Validation batch summary

- Date range: ______ → ______
- Number of testers: ______
- Tester types: ______
- App version / commit tested: ______
- URL tested: (local http://localhost:5642 / production)

## 2. Score table

One row per tester. Confusion: 1 = none, 5 = high (lower is better).

| Tester | Clarity | UI seriousness | Ease of use | Mode usefulness | Artifact usefulness | Trust/honesty | Desire for real | Confusion (↓) |
|---|---|---|---|---|---|---|---|---|
| T1 | | | | | | | | |
| T2 | | | | | | | | |
| T3 | | | | | | | | |
| T4 | | | | | | | | |
| T5 | | | | | | | | |
| **Avg** | | | | | | | | |

## 3. Mode interest summary

| Mode | # ranked #1 | Common reasons | Concerns | Become real soon? |
|---|---|---|---|---|
| Plan | | | | |
| Prompt | | | | |
| Review | | | | |
| Debug | | | | |
| Checklist | | | | |

## 4. Pattern summary

- **Repeated positives:** ______________________________________________
- **Repeated confusion points:** _______________________________________
- **Repeated feature requests:** _______________________________________
- **Repeated trust/honesty issues:** ___________________________________
- **Repeated UI complaints:** __________________________________________
- **Repeated artifact complaints:** ____________________________________

## 5. Decision gates

Mark each Pass / Fail with a one-line reason.

- **Gate A — Product clarity:** Pass if most testers can explain Forge correctly after the demo. → ______
- **Gate B — Mock honesty:** Pass if testers understand local/mock status and don't feel tricked. → ______
- **Gate C — Workflow usefulness:** Pass if testers complete the guided tasks and see value. → ______
- **Gate D — Mode priority:** Pass if one mode clearly wins as the next real-AI mode. → ______
- **Gate E — Real-AI readiness:** Pass if testers want real AI *after* understanding the mock status. → ______

## 6. Final decision (pick one)

- [ ] Continue validation (more testers needed)
- [ ] Improve positioning / onboarding
- [ ] Improve artifact templates
- [ ] Build optional server-side Prompt mode
- [ ] Plan code context / import before Review/Debug
- [ ] Pause real-AI work

## 7. Recommendation (fill in)

> "Based on **___** tester sessions, Tavronus Forge should next focus on
> **[decision]** because **[reason]**. The strongest mode signal was **[mode]**.
> The biggest risk before building real AI is **[risk]**."

## 8. Next-pass recommendation

Map the outcome to the next pass:

- If **Prompt mode wins** → next pass is **Real Prompt Mode Technical Spec Pass 1**.
- If **people are confused** → next pass is **Onboarding / Positioning Pass 1**.
- If **artifacts are weak** → next pass is **Artifact Template Upgrade Pass 1**.
- If **Review/Debug wins** → next pass is **Code Context Planning Pass 1**.

Record the chosen next pass here: ______________________________________
