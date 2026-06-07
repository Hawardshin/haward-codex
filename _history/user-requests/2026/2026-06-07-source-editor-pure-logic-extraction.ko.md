# 2026-06-07 지속적 소스코드 구현 요청

## 요청 요약

- 사용자는 “지속적 구현”을 요청했다.
- 이전 소스 에디터 모듈 분리의 후속 슬라이스로, `MonitorShell.tsx` 안의 소스 에디터 순수 계산 로직을 더 분리했다.

## 이번 슬라이스

- 소스 diff 계산과 Monaco 언어 매핑을 `components/workbench/source-editor/`로 이동했다.
- `MonitorShell.tsx`는 UI 상태와 렌더링만 담당하고, 소스 에디터 순수 로직은 모듈에서 import한다.

## 수용 기준

- `MonitorShell.tsx`가 `buildSourceDiffSummary`와 `monacoLanguageFromPath` 구현을 직접 소유하지 않는다.
- `source-editor/index.ts`가 새 순수 로직 모듈을 export한다.
- 구조 테스트, 전체 Workspace Monitor 테스트, 타입/계약 체크, 내부 패키징이 통과한다.
