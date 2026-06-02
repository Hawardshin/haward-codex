# Plan: Desktop Decision Resume

- Date: 2026-06-02
- Work mode: `governance`
- Selection reason: This changes desktop runtime commands, CLI stdin lifecycle, human decision inbox state, and requirements/specs.

## Execution Plan

1. Use web-first intake to check Tauri state/stdin and HITL resume patterns.
2. Review existing `answer_human_decision`, CLI session store, and decision metadata structure.
3. Add `DecisionResumeReport` and `answer_and_resume_human_decision` to the Tauri backend.
4. Refactor answer persistence into a helper shared by answer-only and answer-and-resume paths.
5. Add linked session id/status and `Answer & Resume` action to the Workspace Monitor decision inbox.
6. Update readiness/tests, requirements, specs, architecture, history, and evaluation records.
7. Run TypeScript, platform desktop tests/readiness, static build, omission/resource/grounding/evaluation.

## Controls

- Do not auto-resume.
- If the session is not active, save only the answer and show resume status/detail.
- Do not claim Tauri compilation in an environment without Rust/Cargo.
