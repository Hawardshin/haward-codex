# Validate Knowledge Reference Workflow

## Purpose

지식 베이스를 참고할 때 그 내용이 틀릴 수 있음을 전제로 검증한다.

## Sequence

1. Identify the claim being reused.
2. Identify the intended use in the current task.
3. List the knowledge-base sources.
4. Ask skeptic questions about freshness, source quality, completeness, and contradictions.
5. Perform independent verification when the claim affects the work.
6. Run `knowledge-skeptic-agent` or use its prompt.
7. If the result is `verification_required`, resolve gaps before relying on the knowledge.
8. Record the validation result in the evaluation report or related docs.

## Rule

Do not use knowledge-base content as authoritative evidence just because it exists in the repository.
