# Platform Presentation Pack Guide

- Date: 2026-06-01
- Owning project: `presentation-agent`
- Audience: the user or reviewers who need to understand the current personal agent platform and then dive into each project
- Scope: one overall HTML platform deck, three per-project HTML decks, and embedded speaker notes

## Recommended Sequence

1. `workspace-platform-overview.html`
   - Explain the platform philosophy and operating loop first.
   - The 15-slide deck targets roughly 25-35 minutes.
2. `project-agent-platform.html`
   - Explain agent building, research, evaluation, grounding, memory, and config contracts.
   - Use as a 10-15 minute deep dive.
3. `project-workspace-monitor.html`
   - Explain how history and document-based operational state become a UI.
   - Use as an 8-12 minute deep dive.
4. `project-presentation-agent.html`
   - Explain the presentation production loop, reference-first policy, deck-spec, and HTML/PPTX path.
   - Use as a 10-15 minute deep dive.

Running every deck sequentially is a 55-75 minute session. For a shorter introduction, use only the overall platform deck and continue with the project deck that matches the audience questions.

## Artifacts

| Type | File | Description |
| --- | --- | --- |
| Index | `presentation-agent/artifacts/html/platform-presentation-pack-index.html` | Start page linking the four HTML decks |
| Overall platform | `presentation-agent/artifacts/html/workspace-platform-overview.html` | Platform philosophy, work OS, operating loop, shared folders, quality gates |
| agent-platform | `presentation-agent/artifacts/html/project-agent-platform.html` | Agent engine, CLI, evaluation, and config structure |
| workspace-monitor | `presentation-agent/artifacts/html/project-workspace-monitor.html` | Next.js repository monitoring UI |
| presentation-agent | `presentation-agent/artifacts/html/project-presentation-agent.html` | Presentation agent and HTML deck generation loop |

## Script Usage

- Each slide's `speaker_notes` is the baseline talk track.
- Use the HTML deck's notes panel to follow the delivery flow.
- Do not merely read the slide text; explain the reasoning path using the `source document` notes.
- Before public use, run a separate review for private data, local paths, and non-public history exposure.

## Improvement Candidates

- Derive a 10-minute summary and a 60-minute deep dive from the same deck-spec.
- Add actual screenshots or diagrams to each project deck.
- Connect `artifact_pptx.py` with the Presentations skill to produce an official editable PPTX artifact.
