# 종합 개선 Cockpit 구현 계획

## 구현 순서

1. `EvaluationReportPanel.tsx`에 `ImprovementDimension` 타입과 score helper를 추가한다.
2. 현재 문서/통계/툴 신호에서 7개 차원 점수를 계산한다.
3. EVAL hero 아래에 종합 개선 panel을 렌더링한다.
4. `globals.css`에 summary, dimension, priority grid 스타일을 추가한다.
5. 정적 계약 검사 스크립트를 만들고 package `check`에 연결한다.
6. 기존 EVAL test block을 확장한다.
7. collector와 검증 명령을 실행한다.

## 롤백

- `EvaluationReportPanel.tsx`의 종합 개선 block, CSS block, check script, package script, test expectation을 되돌리면 기존 EVAL cockpit 상태로 복구된다.

## 후속 확장

- runtime metric 기반 점수 소스 추가.
- 외부 EVAL runner 설치/audit 후 candidate 점수와 report 연결.
- Rust/Tauri process/resource ownership check 연결.
