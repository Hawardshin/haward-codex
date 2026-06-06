# Platform Desktop App 종합 개선 리서치 노트

## 목적

`platform-desktop-app`의 반복 개선 요구를 한 번성 UI 패치가 아니라, 계속 측정하고 우선순위를 정할 수 있는 제품 내 EVAL surface로 전환한다.

## 근거 출처

- Tauri Process Model: https://tauri.app/concept/process-model/
  - Core process가 창, 시스템 메뉴, notification, IPC, 글로벌 상태와 같은 네이티브 책임을 가진다는 점을 확인했다.
  - 리소스 개선 차원은 WebView 렌더링만 보지 않고 subprocess, PTY, cache, memory retention, IPC 소유권을 함께 추적해야 한다.
- Apple Human Interface Guidelines: https://developer.apple.com/design/human-interface-guidelines/
  - 플랫폼 UI는 레이아웃, 입력 방식, 컨트롤 상태가 명확해야 한다.
  - 사용자가 지적한 버튼, 드롭다운, 설정 선택지는 UX control clarity 차원으로 고정한다.
- W3C WCAG 2.2: https://www.w3.org/TR/WCAG22/
  - focus와 target size 같은 상호작용 품질은 장식이 아니라 회귀 방지 조건이다.
  - 선택형 컨트롤과 버튼 상태 표기는 접근성 기준과도 연결된다.
- Google Engineering Practices Small CLs: https://google.github.io/eng-practices/review/developer/small-cls.html
  - 넓은 요청은 검토 가능한 단위로 나누고, 테스트와 함께 닫아야 한다.
  - 이번 slice는 `EvaluationReportPanel`과 그 계약으로 제한했다.

## 구현으로 이어진 인사이트

- 기존 EVAL 탭은 이미 현재 작업, 히스토리, 토큰/툴 사용, 오픈소스 EVAL 후보를 모으고 있었다. 새 탭보다 이곳에 종합 개선 차원을 통합하는 것이 빠르고 유지보수성이 높다.
- 점수 차원은 사용자의 반복 요구를 직접 반영해 `desktop-performance`, `ux-control-clarity`, `native-resource-lifecycle`, `eval-evidence`, `release-packaging`, `open-source-leverage`, `automation-continuity`로 잡았다.
- 정적 계약 검사를 추가해야 UI surface가 후속 리팩터링 중 조용히 사라지지 않는다.

## 남은 후속 후보

- 실제 runtime metric 기반 점수: Browser latency, long task, Rust side resource telemetry를 `workspace-snapshot`에 구조화한다.
- 외부 EVAL runner 설치: promptfoo, DeepEval, Phoenix, Opik, Langfuse 중 하나를 audit 후 project-local로 붙인다.
- OS resource ownership: PTY/session/subprocess/timer/cache 종료 계약을 Rust/Tauri command 경계에서 더 강하게 측정한다.
