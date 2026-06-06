# 스펙: CLI 스크롤 겹침 제거

## 목표

CLI 설정과 Agent CLI Cockpit이 설정 모달의 기본 스크롤과 겹치지 않도록, 설정 화면의 스크롤 소유권을 한 곳으로 고정한다.

## 범위

- `workspace-monitor` 설정 모달 레이아웃 CSS
- CLI adapter setup guide CSS
- Agent CLI Cockpit command stack CSS
- 정적 회귀 테스트

## 제외

- CLI 실행 엔진 변경
- PTY, pipe, process lifecycle 변경
- provider credential 저장 방식 변경
- 새 dependency 설치

## 설계 결정

- 설정 모달의 바깥 backdrop은 고정 overlay로 두고 스크롤하지 않는다.
- `.settings-tab-panel`만 세로 스크롤을 가진다.
- CLI 설정 내부 요소는 별도 scroll container가 아니라 `auto-fit` grid와 줄바꿈으로 대응한다.
- 긴 명령어는 `overflow-wrap: anywhere`로 카드 안에서 처리한다.

## 언어/런타임 선택

- 선택: TypeScript/React 기존 컴포넌트와 CSS만 수정한다.
- 대안 A: Rust/Tauri native layout 측정 로직 추가. 이번 문제는 renderer scroll ownership이 원인이라 과하다.
- 대안 B: 새 settings route 분리. 구조 변경 비용이 크고 현재 불편의 직접 원인을 해결하지 않는다.

## 아키텍처 선택

- 선택: 기존 `MonitorShell.tsx` 구조를 유지하고 CSS 계약을 강화한다.
- 대안 A: CLI 설정 컴포넌트 분리. 장기적으로 가능하지만 이번 변경은 layout regression fix라 좁게 처리한다.
- 대안 B: 설정 모달 제거 후 전체 페이지 설정으로 이동. 사용 흐름이 크게 바뀌므로 별도 제품 설계가 필요하다.

## 폴더 구조 선택

- 선택: 기존 `docs/requirements`, `specs/<date-slug>`, `tests`, `app/globals.css`에 좁게 반영한다.
- 대안: 새 UI package 생성. 단일 CSS 계약 변경에는 유지보수 비용이 더 크다.

## 성공 조건

- 설정 화면에서 CLI 기능 때문에 두 개 이상의 세로 스크롤바가 겹치지 않는다.
- CLI command 버튼과 단계 카드는 horizontal overflow를 만들지 않는다.
- 자동 테스트와 내부 패키징이 통과한다.
