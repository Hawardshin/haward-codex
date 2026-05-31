# Plan Record: Presentation Reference Collection Foundation

## Work Mode

- Selected mode: `standard`
- Reason: this is meaningful work that creates a new project, registers its boundary, creates a skill, adds data structures, tests, history, and evaluation.

## Evidence

- Web search checked HTML presentation frameworks, PPT template galleries, design galleries, asset libraries, presentation theory, and conversion candidates.
- Repository rules require a new root project for a new domain interest, so `presentation-agent/` was created.
- Because of copyright risk, source metadata and license gates come before bulk raw PPT/asset storage.

## Execution Plan

1. Create project folders and README.
2. Create reference catalog and collection policy.
3. Implement Python validation and PPTX text-to-HTML conversion helpers.
4. Record project requirements and specs.
5. Create the presentation reference curator skill.
6. Update operations registry, history, request trace, and work summary.
7. Run tests and skill validation.
8. Create evaluation file, then commit and push.

## Parallelization Judgment

- Future source collection can run in multiple lanes.
- This initial change touches the same catalog and registries, so it is safer for one agent to write serially and use merge gates for future parallel collection.

