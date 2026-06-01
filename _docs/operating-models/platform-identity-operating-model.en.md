# Platform Identity Operating Model

## One Sentence

This platform turns the user's intent into evidence-backed plans and verifiable outcomes, then models repeated human work processes into more efficient methods and durable automation assets.

## Why It Exists

Working with AI can make projects move quickly, but speed also makes context easy to lose. Decisions made in chat disappear, source quality becomes unclear, specs drift from implementation, and project structure becomes harder to understand as more work accumulates.

This repository is designed to reverse that pattern. User intent becomes requirements. Requirements become specs and plans. Implementation passes validation and evaluation. Results become history, summaries, and commits. The goal is not one impressive answer; the goal is an environment that reduces the time people spend repeating the same work and gets more useful over time.

## Core Identity

The platform has three identities.

### 1. Agent-Building Platform

`agent-platform/` provides reusable capabilities for research, planning, evaluation, grounding, memory bootstrap, config validation, notifications, and open-source review. New agents can reuse those capabilities instead of starting from scratch.

### 2. Project Operations Monorepo

Separate interests such as presentation agents, monitoring UI, research tools, and local review tools live as separate root projects. Each project owns its README, docs, specs, source, tests, and artifacts. Only shared capabilities are promoted into `_docs`, `_ops`, `_tools`, `_skills`, `_research`, and `_history`.

### 3. Long-Term Memory And Evidence System

Web search records, source lists, requirements, specs, plans, summaries, evaluations, installation audits, and commit hashes are memory for future work. They are not unquestioned truth; they are evidence handles that future agents can inspect and revalidate.

### 4. Repetitive-Work Reduction Engine

The platform does not stop at imitating human process. It looks for repeated actions across research, comparison, judgment, execution, and verification, then turns them into a better sequence, a smaller tool, a better prompt, or a clearer template. The goal is not more automation for its own sake; it is less repeated human work and less elapsed time.

## Operating Loop

```text
capture intent
  -> web-first research
  -> memory bootstrap
  -> work mode selection
  -> requirements/spec/plan
  -> execution
  -> validation/grounding
  -> evaluation/rework
  -> history/commit/push
  -> capability promotion
```

The loop is not meant to create paperwork for its own sake. It exists to keep judgment visible. Small work can use a light mode. Work involving durable structure, policy, external facts, or shared capabilities uses a stricter mode.

When the loop repeats, the repetition itself becomes an object of study. Repeated research, file lookup, validation, or report writing should first be documented as a process, then split into the smallest automation-worthy unit.

## What Good Output Means Here

Good output is not only something that works or looks polished. In this platform, good output also has these properties.

- It connects back to the requirement or request that motivated it.
- It records which sources or prior artifacts shaped the decision.
- It shows the plan or trade-offs behind important choices.
- It includes validation steps and results.
- It is evaluated against the initial instruction.
- It leaves enough context for future work to resume without chat memory.

## The Direction Of The Platform

The platform should become sharper through use. Its strength is not decorative automation; it is clear structure.

Over time, it should move toward this shape:

- When the user states a goal, the agent asks better questions and builds a research plan first.
- Research agents collect evidence from official docs, papers, engineering blogs, community signals, and Korean local sources when relevant.
- Implementation agents compare language, architecture, folder structure, and open-source options before choosing a maintainable path.
- Evaluation agents compare the initial intent with the actual result and send gaps back into rework.
- Monitoring UI shows history, projects, specs, evaluations, and active work in one place.
- Repeated workflows become skills, tools, prompts, and templates so future work becomes faster and more reliable.
- Work timing, bottleneck records, and evaluator results show whether repetition is actually being reduced.

## Important Boundaries

The platform increases agent autonomy, but the user keeps final authority. Security, privacy, publication, cost, and hard-to-reverse changes must be handled explicitly. Stored knowledge can become stale, so important decisions need current sources and validation.

## Start Here

- Root overview: `README.md`
- Operations hub: `_ops/index.md`
- Operating philosophy: `_philosophy/agent-operating-philosophy.ko.md`
- Concept review: `_philosophy/platform-concept-review.ko.md`
- Core project: `agent-platform/README.md`
- Recent work summaries: `_history/work-summaries/`
- Monitoring UI project: `workspace-monitor/`
