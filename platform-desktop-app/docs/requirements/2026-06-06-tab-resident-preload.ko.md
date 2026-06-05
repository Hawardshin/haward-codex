# 요구사항: 탭 상주 선마운트 최적화

## 사용자 요구

Workspace Monitor 탭 이동이 여전히 매우 느리다. 탭을 이동할 때마다 많은 화면이 새로 불러오고 마운트되는 느낌이 있으므로, 데스크톱 앱답게 시작 후 메모리를 더 사용해서 주요 탭을 미리 올려두고 전환 비용을 줄여야 한다.

## 기능 요구사항

- 주요 Workspace Monitor 섹션은 최초 방문 시마다 React tree를 새로 만드는 구조가 아니라, 시작 직후 idle 시간에 순차적으로 resident 상태로 만든다.
- 사용자가 탭을 누르기 전 `pointerdown` 시점에도 대상 섹션을 resident로 표시해 클릭 후 첫 렌더 지연을 줄인다.
- 숨겨진 섹션은 DOM/React state를 유지하되, `hidden`과 `aria-hidden`으로 비활성 탭 접근성을 분리한다.
- source/desktop 런타임 화면처럼 부작용이 있는 표면은 상주 상태에서도 현재 활성 탭일 때만 launch request와 active polling 성격의 동작을 받는다.
- 구현 완료 후 테스트, 타입체크, 내부 패키징 빌드를 자동 실행한다.

## 비기능 요구사항

- 초기 메모리 사용량 증가는 의도적으로 허용하되, 모든 섹션을 한 프레임에 동시에 마운트하지 않고 idle scheduling으로 나눈다.
- 탭별 상태 보존과 전환 체감 속도를 우선한다.
- 기존 source editor state 보존 계약, styled control 계약, history payload 계약이 깨지면 안 된다.

## 제외

- 파일 watcher, 외부 데이터 전체 선적재, 무제한 DOM 생성 정책은 이번 범위에서 제외한다.
- Tauri/Rust native file cache 자체는 이전 Rust resource optimization slice의 책임으로 유지한다.
