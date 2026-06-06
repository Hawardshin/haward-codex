# 2026-06-06 종합 개선 요구사항

## 배경

사용자는 성능, UI, 기능, 사용성, 디자인, 네이티브 자원 활용, EVAL, 오픈소스 참고, 히스토리 기반 개선을 한꺼번에 요구했다. 전 저장소 무차별 변경 대신, 실제 제품 화면에서 이 요구들을 지속적으로 평가하고 우선순위화하는 기반이 필요하다.

## 요구사항

- REQ-CI-001: EVAL 탭은 현재 작업만이 아니라 성능, UX, 네이티브 리소스, 근거/EVAL, 패키징, 오픈소스, 자동화 연속성을 종합해 보여야 한다.
- REQ-CI-002: 종합 개선 차원은 stable ID를 가져야 하며 후속 telemetry나 외부 EVAL runner가 연결될 수 있어야 한다.
- REQ-CI-003: UI는 desktop dense panel로 유지하고 텍스트가 버튼이나 카드 크기를 밀어내지 않도록 wrap 가능한 구조를 가져야 한다.
- REQ-CI-004: 종합 개선 surface는 정적 계약 검사와 테스트로 보호되어야 한다.
- REQ-CI-005: 구현 후 check, test, build, internal package, Browser smoke를 실행한다.

## 비요구사항

- 이번 slice에서 새 외부 EVAL dependency를 설치하지 않는다.
- 이번 slice에서 Rust/Tauri resource telemetry 저장소 구조를 새로 만들지 않는다.
- 이번 slice에서 모든 UI 컴포넌트를 전면 리팩터링하지 않는다.

## 수용 기준

- `data-eval-comprehensive-improvement="all-signal-cockpit"` surface가 EVAL 탭에 존재한다.
- 7개 개선 차원이 UI와 계약 검사에 모두 존재한다.
- `npm run check`가 새 계약 검사를 실행한다.
- renderer build와 internal package가 완료된다.
