# 계획 기록: CLI 스크롤 겹침 제거

- 날짜: 2026-06-06
- 작업 모드: `standard`
- memory bootstrap hot anchors: persistent instructions, work mode registry, CLI adapter integration workflow, desktop user-flow workflow, resource leak prevention workflow.
- view_mode: `superadmin_developer`
- install_mode: `developer`

## 실행 계획

1. 설정 모달과 CLI CSS의 스크롤 소유권을 확인한다.
2. `.settings-dialog-backdrop`은 고정 overlay, `.settings-tab-panel`은 유일한 본문 scroll owner로 바꾼다.
3. CLI setup guide와 cockpit command stack은 내부 스크롤 대신 wrap grid를 사용한다.
4. 정적 테스트와 Playwright smoke로 scroll container 수와 horizontal overflow를 확인한다.
5. build와 internal package까지 완료한다.

## 병렬화 판단

- 코드와 CSS, 테스트가 같은 파일을 공유하므로 구현은 직렬로 진행한다.
- 검증 명령은 generated snapshot을 갱신하는 단계가 있어 순서대로 실행한다.
