# Capture Research Workflow

## Purpose

인터넷 조사나 외부 레퍼런스 확인에서 재사용 가치가 있는 내용을 저장소 문서로 남긴다.

## Sequence

1. Review the sources used during the task.
2. Decide whether the finding is reusable, decision-relevant, or useful for future evaluation.
3. If the reusable finding is a large-company, research-lab, architecture-center, or high-signal site, update `agent-platform/configs/research/enterprise-source-registry.json` and `_research/source-lists/enterprise-high-quality-sites.*.md`.
4. Choose a topic path under `_research/topics/<topic>/`.
5. Create Korean and English notes from `_templates/research-note/` when the finding is durable.
6. Record source URLs, access date, summary, derived insights, planning impact, reliability, applicability, and related work.
7. Record freshness and known uncertainty so future work can validate the note.
8. Update `_research/index.ko.md` and `_research/index.en.md`.
9. Link the note from the relevant project doc, history entry, or evaluation report.

## Rule

Do not document every web page. Capture only information that is likely to reduce future work or improve future decisions.
