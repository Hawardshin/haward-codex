# 요구사항 변경: 구현 완료 후 자동 빌드

## 사용자 지시

- 구현이 끝날 때마다 사용자가 직접 빌드하지 않도록 에이전트가 빌드까지 자동으로 실행해야 한다.

## 변경

- `REQ-WS-091`을 추가한다.
- 의미 있는 구현 작업은 최종 응답 전에 담당 프로젝트의 build 또는 package 명령을 실행해야 한다.
- build 명령이 없거나, 안전하지 않거나, 비용이 과도하거나, 변경 범위 밖이면 이유와 대체 검증을 기록해야 한다.

## 영향 범위

- `AGENTS.md`
- `_docs/instructions/persistent-instructions.md`
- `_docs/instructions/persistent-instructions.ko.md`
- `_docs/instructions/persistent-instructions.en.md`
- `agent-platform/configs/memory/bootstrap-manifest.json`

## 검증 기준

- 향후 구현 작업 close-out에서 build/package 실행 결과가 최종 응답 또는 평가 기록에 포함되어야 한다.
- docs-only 또는 build 대상이 없는 작업은 예외 사유와 대체 검증을 기록해야 한다.
