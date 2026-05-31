# Plan: Source Discovery, Provenance, And Korean Local Reviews

## Execution Plan

1. Search the web for Naver/Kakao APIs, Korean/global technology blogs, India technology sources, and paper discovery sources.
2. Add provenance/evidence fields to planner and evaluator inputs.
3. Add `source-discovery-registry.json` and source-list updates.
4. Add `_tools/korean-local-review/` for Korean-user query planning and candidate quality scoring.
5. Link the new rules from source collection, prompts, workflows, persistent instructions, and memory bootstrap.
6. Document overlap and source-of-truth boundaries in an audit note.
7. Run tests, JSON/config checks, and close-out evaluation.

## Validation Strategy

- Python unit tests
- JSON syntax validation
- config contract
- memory bootstrap
- tool CLI smoke tests
- work evaluation
- workspace index/task board checks
