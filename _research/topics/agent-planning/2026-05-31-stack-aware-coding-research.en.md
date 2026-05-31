# Stack-Aware Coding Research

## Summary

Coding research should not treat "check official docs" as a single generic task. Java/Spring Boot, C, React, Next.js, and similar technologies each have different authoritative references, so the technology stack and official docs/standards must be recorded separately. Stack Overflow, Reddit, GitHub Issues/Discussions, and similar threads are useful for recurring problems and practical edge cases, but they are adoption, discovery, or risk signals rather than proof.

## Reusable Rules

- `technology_stack`: record languages, runtimes, frameworks, major libraries, and standards.
- `technology_official_docs`: record official docs or standards for each major technology.
- `stack_version_constraints`: record current/target versions, standards, compatibility ranges, or explicit unknowns.
- `issue_discussion_sources`: record Stack Overflow, Reddit, GitHub Issues/Discussions, project forums, or none-found search records.
- `issue_discussion_notes`: summarize high-vote/accepted answers, unresolved issues, stale answers, version differences, and contrary views.
- `community_signal_notes`: explain how votes, likes, reactions, stars, or comments were interpreted as adoption, discovery, or risk signals.

## References

- Spring Boot Reference Documentation: https://docs.spring.io/spring-boot/reference/index.html
- React docs: https://react.dev/learn
- Next.js docs: https://nextjs.org/docs
- ISO/IEC 9899:2024: https://www.iso.org/standard/82075.html
- Stack Overflow vote-up privilege: https://stackoverflow.com/help/privileges/vote-up
- GitHub Reactions API docs: https://docs.github.com/en/rest/reactions/reactions

## Applied To

- `agent-platform/src/agent_platform/planning/coding_research.py`
- `agent-platform/configs/research/coding-research-profile.json`
- `agent-platform/configs/planning/coding-research-template.json`
- `_ops/prompts/86-coding-research.md`
- `_ops/workflows/56-coding-research.md`
