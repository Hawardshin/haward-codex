# `_docs` 카테고리와 누락 방지 스펙

## 목적

작업과 문서가 늘어날 때 `_docs/`의 중요한 운영 문서가 루트에 흩어지거나 누락되지 않도록, 문서 종류별 카테고리와 deterministic audit를 만든다.

## 요구사항

- 관련 요구사항: `REQ-WS-031`
- 관련 요청: `UR-2026-06-01-014`
- 작업 모드: `standard`

## 범위

- `_docs/` 문서 재분류
- `_docs/registry.json` 작성
- `_tools/docs-audit/` 추가
- 운영 규칙, 메모리 부트스트랩, 히스토리, 평가 연결

## 비범위

- 프로젝트별 `docs/` 폴더 구조 재편
- `_history`, `_research`, `_ops`의 전체 taxonomy 재설계
- 문서 본문 대규모 재작성

## 기능 기준

- `_docs` root에는 등록된 index 파일만 있어야 한다.
- durable 문서는 등록된 category folder에 있어야 한다.
- 필수 문서가 사라지면 audit가 실패해야 한다.
- `.ko.md`와 `.en.md` companion 누락이 감지되어야 한다.
- 미래 에이전트가 memory bootstrap에서 docs registry를 발견해야 한다.
