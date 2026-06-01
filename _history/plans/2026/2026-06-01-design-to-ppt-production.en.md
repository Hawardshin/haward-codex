# Plan Record: Design Element Collection To PPT Production

## Work Mode

- Selected mode: `standard`
- Reason: this implementation adds durable rules, a PPTX output path, a real PPTX artifact, tests, history, and evaluation to the presentation-agent project.

## Evidence

- The user instructed that when design elements are needed during presentation production, the agent should search, collect, and make PPT.
- Web search checked python-pptx, PresentationML, and PptxGenJS.
- In this session, the Presentations skill artifact-tool runtime works, so it was used as the preferred final PPTX export path.

## Execution Plan

1. Document the design search-collect-PPT workflow.
2. Build a tool that converts `deck-spec` into an artifact-tool workspace.
3. Generate a real PPTX from the sample deck spec.
4. Validate the contact sheet and PPTX structure.
5. Update requirements, specs, history, and evaluation.
6. Commit and push.

