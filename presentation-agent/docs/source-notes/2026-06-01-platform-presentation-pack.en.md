# Platform Presentation Pack Source Notes

- Date: 2026-06-01
- Purpose: preserve the internal and external evidence used by the platform presentation pack so future preparation can review it quickly.

## External Presentation References

| Source | URL | Role in this work |
| --- | --- | --- |
| Duarte Presentation Formula | https://www.duarte.com/training/presentation-formula/ | Presentation structure that moves an audience from current state to desired future state |
| Duarte story techniques | https://www.duarte.com/blog/move-presentation-audience-with-story-techniques-in-presentations/ | Problem, transition, and conclusion flow |
| Harvard Catalyst slide guidance | https://catalyst.harvard.edu/writing-communication-center/visualize-science/slides/ | One core message per slide |
| MIT AeroAstro slide design | https://mitcommlab.mit.edu/aeroastro/commkit/slide-design/ | Clarity, contrast, and visual hierarchy for technical presentations |
| Pitch presentation structure guide | https://pitch.com/guides/presentation/structure-your-presentation | Organizing a presentation around hook, problem, evidence, and action |

## Internal Evidence

| Area | Internal file | Used for |
| --- | --- | --- |
| Platform identity | `_docs/operating-models/platform-identity-operating-model.ko.md` | Personal agent work OS and accumulated work structure |
| Project registry | `_ops/projects/registry.json` | Three registered active root projects |
| Operating loop | `_ops/workflows/00-start-here.md`, `_ops/workflows/05-web-first-intake.md`, `_ops/workflows/40-evaluate-and-rework.md` | Web-first intake, memory bootstrap, evaluation and rework loop |
| Requirements/specs | `_requirements/`, `_specs/`, `presentation-agent/specs/2026-06-01-platform-presentation-pack/` | Spec-driven workflow |
| Research settings | `agent-platform/configs/research/research-agent-profile.json`, `agent-platform/configs/research/source-discovery-registry.json` | Answer-engine stages and source collection policy |
| Quality gates | `agent-platform/src/agent_platform/evaluation/` | Work evaluator, hallucination guard, and knowledge skeptic |
| Presentation agent | `presentation-agent/src/presentation_agent/html_deck.py`, `presentation-agent/data/reference-index/starter-reference-catalog.json` | Deck-spec-based HTML rendering and reference catalog |
| Monitoring | `workspace-monitor/README.md`, `workspace-monitor/scripts/collect-workspace.mjs`, `workspace-monitor/components/MonitorShell.tsx` | Repository snapshot and Next.js UI |

## Reliability Notes

- External sources were used for presentation structure and slide-design guidance, not as proof of repository-internal facts.
- Internal facts are grounded in repository files and generated artifact state.
- Community signals and design galleries were not used as factual proof for this presentation pack.
- Before public presentation, re-check current file state and private-data exposure.
