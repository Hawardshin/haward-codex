# Spec: Presentation Reference Collection Foundation

## Goal

Create a data structure, validation tool, and conversion entry point inside `presentation-agent/` for repeated collection of presentation design and PPT/HTML references.

## User Request Link

- Create the presentation agent as a new project separate from coding work.
- Collect many beautiful PPT and HTML presentation references.
- Prepare a structure that can convert PPT to HTML.
- Keep references and assets inside one project.

## Functional Requirements

- At least 50 starter source records.
- Each record stores source, access date, license status, download eligibility, and HTML conversion path.
- Raw storage allow/deny rules are explicit in config.
- Provide a Python tool that converts PPTX text structure to HTML.
- Register a presentation reference collection skill under `_skills/`.

## Quality Requirements

- Catalog validation catches duplicate IDs, missing fields, malformed URLs, and license/download conflicts.
- Tests cover catalog breadth and baseline PPTX conversion.
- Documentation and history are stored in Korean/English pairs.

