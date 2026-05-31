# Maintainable Language, Architecture, And Folder Decisions

## Summary

Coding research should separate language/runtime choice, official structure conventions, architecture theory, practitioner opinions, and folder semantics when judging "good structure." Formal architecture guidance and maintainable practitioner structure can differ, so the difference should be recorded and tied to local validation.

## Reusable Rules

- Compare at least two language/runtime candidates.
- Check official docs by ecosystem. Spring Boot, Next.js, Python packaging, and Go modules use different structure conventions.
- Put C4, arc42, SEI, cloud architecture frameworks, papers, and standards in `architecture_theory_sources`.
- Put practitioner blogs, Stack Overflow, Reddit, GitHub Discussions, and issue debates in `architecture_practitioner_sources`.
- Compare at least two folder structures and record folder name meaning, responsibility, expected files, and test placement.

## References

- Spring Boot structuring code: https://docs.spring.io/spring-boot/reference/using/structuring-your-code.html
- Next.js project structure: https://nextjs.org/docs/app/getting-started/project-structure
- PyPA src layout: https://packaging.python.org/en/latest/discussions/src-layout-vs-flat-layout/
- Go module layout: https://go.dev/doc/modules/layout
- arc42: https://arc42.org/
- C4 model: https://c4model.info/
- SEI Views and Beyond: https://www.sei.cmu.edu/library/views-and-beyond-the-sei-approach-for-architecture-documentation/
- Multivocal literature review guideline: https://doi.org/10.1016/j.infsof.2018.09.006

## Caution

Community reactions and practitioner opinions are useful for finding recurring problems and friction, but they are not factual proof. Cross-check them with official docs, standards, papers, and maintained open-source code.
