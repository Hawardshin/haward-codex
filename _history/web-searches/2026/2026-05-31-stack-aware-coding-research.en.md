# Web Search Record: Stack-Aware Coding Research

## Purpose

The user instructed that coding research should account for technology-specific official docs, such as Java/Spring Boot, C, React, and Next.js, and high-signal Stack Overflow, Reddit, GitHub, and discussion evidence. I checked official docs/standards and community signal interpretation before changing the coding research contract.

## Queries

- `Spring Boot official documentation reference guide`
- `React official documentation learn react`
- `Next.js official documentation docs app router`
- `ISO C23 programming language standard official ISO`
- `Stack Overflow help why vote upvotes answers official`
- `Stack Overflow help accepted answer votes official`
- `GitHub Docs issue reactions discussions official`
- `Reddit developer discussions evidence signals software engineering research`

## Sources Checked

| Source | Type | Access Date | Use |
| --- | --- | --- | --- |
| [Spring Boot Reference Documentation](https://docs.spring.io/spring-boot/reference/index.html) | official | 2026-05-31 | Spring Boot implementation/runtime decisions should start from Spring's official reference |
| [React docs](https://react.dev/learn) | official | 2026-05-31 | React APIs and recommended usage should be checked against React's official docs |
| [Next.js docs](https://nextjs.org/docs) | official | 2026-05-31 | Next.js routing, rendering, and API decisions should use official docs |
| [ISO/IEC 9899:2024](https://www.iso.org/standard/82075.html) | standard | 2026-05-31 | C language decisions should be grounded in the language standard |
| [Stack Overflow vote-up privilege](https://stackoverflow.com/help/privileges/vote-up) | community | 2026-05-31 | Votes should be interpreted as usefulness/community signals, not proof |
| [GitHub Reactions API docs](https://docs.github.com/en/rest/reactions/reactions) | official | 2026-05-31 | Reactions can be recorded as engagement signals on issues/discussions |

## Weak Sources Ignored

- Generic SEO blogs: useful only as discovery seeds, not replacements for official docs or standards.
- Old Q&A/Reddit answers: stale when version context is missing.
- Popularity-only pages: votes and likes are adoption/discovery signals, not proof.

## Plan Impact

- Add `technology_stack`, `technology_official_docs`, and `stack_version_constraints` to `coding-research-agent`.
- Report gaps when known stack items lack matching official docs or standards.
- Add `issue_discussion_sources`, `issue_discussion_notes`, and `community_signal_notes`.
- Require `community` or `social` in `source_types` when issue/discussion evidence is used.

## Uncertainty

- This does not create a complete official-doc mapping for every technology. It starts with likely recurring technologies such as Spring Boot, React, Next.js, ISO C, Java, JavaScript, TypeScript, Python, and Node.js.
- Community signal quality still depends on discussion date, version, answer status, and maintenance context.
