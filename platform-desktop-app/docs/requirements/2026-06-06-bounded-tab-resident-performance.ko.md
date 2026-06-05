# 요구사항: bounded tab resident 성능 보정

## 사용자 요구

Workspace Monitor 탭 전환이 아직 느리다. 이전처럼 단순히 모든 탭을 메모리에 올리는 방식만으로는 부족하므로, 실제 렌더/마운트 비용과 데스크톱 native resource 활용을 분리해 다시 최적화해야 한다.

## 기능 요구사항

- top-level Workspace Monitor 섹션은 사용자가 방문한 화면의 state를 보존하되, hidden mounted panel 수가 무제한 증가하면 안 된다.
- source/code editor 화면은 draft/state 보존 우선순위가 있으므로 resident set에서 우선 유지한다.
- Monaco editor, 3D collaboration scene, admin history index 같은 무거운 code/data는 idle 시간에 prewarm한다.
- runtime/source 패널은 hidden 상태에서 불필요한 React rerender를 줄일 수 있어야 한다.
- 탭 전환 성능 감사는 resident/mounted panel count와 section settle time을 측정해야 한다.
- 구현 후 renderer build, 전체 desktop 검증, 내부 package build를 자동으로 실행한다.

## 비기능 요구사항

- Rust/Tauri native workspace resource warmup은 유지한다.
- visible section 전체를 idle로 순차 마운트하는 방식은 금지한다.
- resident panel limit은 DOM에 노출되어 Playwright 감사에서 검증 가능해야 한다.
- 검증 결과는 history/spec/evaluation 기록에 남긴다.

## 제외

- public release signing/notarization, updater, clean-machine smoke는 이번 성능 보정 범위가 아니다.
- 버튼 synthetic feedback 감사의 기존 selector 이슈는 이번 acceptance가 아니다.
