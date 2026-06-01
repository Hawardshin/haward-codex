# 프로젝트 폴더 인벤토리 감사 요구사항 검토

## 검토 대상

- 요구사항: `REQ-WS-027`
- 변경 기록: `_requirements/changes/2026-06-01-project-folder-inventory-audit.ko.md`
- 기준선: `_requirements/baselines/2026-05-31-workspace-platform.ko.md`

## 검토 결과

- 상태: 승인
- 이유: 루트 구조 정책만으로는 프로젝트 내부 durable folder의 의미를 지속적으로 확인하기 어렵다.
- 기존 요구사항과의 관계: `REQ-WS-026`은 root folder classification을 다루고, `REQ-WS-027`은 registered project 내부 top-level folder inventory와 generated output ignore 검증을 다룬다.

## 수용 기준

- `agent-platform/specs/`와 `workspace-monitor/public/`처럼 실제로 존재하는 durable top-level folder가 registry에 설명되어 있다.
- generated output pattern이 정책과 `.gitignore` 양쪽에 반영되어 있다.
- 구조 감사가 gap과 warning 없이 통과한다.

