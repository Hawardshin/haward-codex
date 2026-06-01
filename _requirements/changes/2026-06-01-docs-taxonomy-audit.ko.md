# 문서 카테고리와 누락 방지 요구사항 변경

## 변경 요약

- 날짜: 2026-06-01
- 변경 ID: `REQ-CHANGE-2026-06-01-DOCS-TAXONOMY-AUDIT`
- 관련 요청: `UR-2026-06-01-014`
- 추가 요구사항: `REQ-WS-031`
- 상태: 반영됨

## 사용자 의도

대화와 작업 히스토리가 길어질수록 현재 구조에서 중요한 문서가 누락될 수 있으므로, `_docs/`를 종류별로 나누고 다음 세션에서도 빠진 문서를 찾을 수 있는 구조가 필요하다.

## 변경 내용

- `_docs/`를 `instructions`, `policies`, `operating-models`, `governance` 카테고리로 나눈다.
- `_docs/registry.json`에 카테고리 목적, 허용 root 파일, 필수 문서, 한영 companion 정책, audit command를 기록한다.
- `_tools/docs-audit/`를 추가해 root에 흩어진 문서, 잘못된 category placement, 필수 문서 누락, 한영 companion 누락을 검증한다.
- `AGENTS.md`, README, `_ops/index.md`, persistent instructions, memory bootstrap에 새 구조와 검증 명령을 연결한다.

## 근거

- Diataxis는 문서를 독자 니즈와 문서 목적에 맞춰 구조화하는 접근을 제시한다.
- GitLab 문서 가이드는 concept, task, reference, troubleshooting 같은 topic type 구분을 운영한다.
- Google Developer Documentation Style Guide는 일관된 기술 문서 스타일과 조직화 기준을 제공한다.

## 영향 범위

- `_docs/`
- `_tools/docs-audit/`
- `AGENTS.md`, `README.md`, `_ops/index.md`
- `agent-platform/configs/memory/bootstrap-manifest.json`
- 히스토리, 요구사항, 스펙, 평가 기록
