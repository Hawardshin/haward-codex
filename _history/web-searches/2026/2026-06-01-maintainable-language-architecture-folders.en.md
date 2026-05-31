# Web Search Record: Maintainable Language, Architecture, And Folder Decisions

## Search Time

- Date: 2026-06-01
- Purpose: verify evidence for strengthening coding research around language selection, theory/practitioner architecture comparison, and folder semantics

## Queries

- `Spring Boot reference documentation structuring your code package organization docs.spring.io`
- `Next.js project structure official docs app getting started`
- `PyPA src layout vs flat layout official packaging guide`
- `Go documentation organizing a Go module packages official`
- `arc42 architecture documentation official template building blocks`
- `C4 model official software architecture diagrams containers components code`
- `SEI views and beyond software architecture documentation official`
- `multivocal literature review software engineering practitioner grey literature guidelines`

## Checked Sources

| Source | Type | Used For |
| --- | --- | --- |
| https://docs.spring.io/spring-boot/reference/using/structuring-your-code.html | official | Spring Boot package/component-scan boundaries |
| https://nextjs.org/docs/app/getting-started/project-structure | official | Next.js file-system structure, colocation, and private folders |
| https://packaging.python.org/en/latest/discussions/src-layout-vs-flat-layout/ | official | Python `src` vs flat layout trade-offs |
| https://go.dev/doc/modules/layout | official | Go module/package organization |
| https://arc42.org/ | standard/reference | Architecture documentation structure |
| https://c4model.info/ | standard/reference | System/container/component/code views |
| https://www.sei.cmu.edu/library/views-and-beyond-the-sei-approach-for-architecture-documentation/ | official | View-based architecture documentation |
| https://doi.org/10.1016/j.infsof.2018.09.006 | paper | Mixing formal literature and practitioner grey literature |
| https://martinfowler.com/architecture/ | tech_blog | Practitioner architecture trade-off discovery seed |
| https://stackoverflow.com/questions/tagged/software-architecture | community | Recurring practitioner questions and vote/accepted-answer signals |

## Weak Source Handling

- Community and social signals are adoption, discovery, or risk signals, not factual proof.
- Official docs are ecosystem-specific and should not be blindly generalized across languages or projects.

## Plan Impact

- Add language selection, theory/practitioner architecture evidence, folder structure, and folder semantics fields to `coding-research-agent`.
- Add language-specific structure docs and practitioner source seeds to `coding-research-profile.json`.
- Update docs and prompts so future implementation work must record these fields.

## Uncertainty

- Source URLs were checked on 2026-06-01. Future docs may move or change version-specific guidance.
