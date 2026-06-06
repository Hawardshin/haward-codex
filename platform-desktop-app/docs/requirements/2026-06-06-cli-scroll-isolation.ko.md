# CLI 스크롤 겹침 제거 요구사항

- 날짜: 2026-06-06
- 소유 프로젝트: `platform-desktop-app`
- 작업 모드: `standard`
- 요청 요약: CLI 기능의 스크롤이 다른 스크롤과 겹쳐 설정 화면 사용이 불편하다는 지적을 반영한다.

## 요구사항

1. 설정 모달은 바깥 backdrop이 아니라 설정 본문 패널이 세로 스크롤을 소유해야 한다.
2. CLI 어댑터 설정 안내, 단계 카드, 명령 복사 버튼은 별도 세로/가로 스크롤을 만들지 않아야 한다.
3. 긴 CLI 명령과 설명은 버튼 위치를 밀거나 가로 스크롤을 만들지 않고 카드 안에서 줄바꿈되어야 한다.
4. Agent CLI Cockpit의 명령 복사 영역은 카드 안에서 접히는 그리드로 배치되어 다른 스크롤바와 겹치지 않아야 한다.
5. 변경 후 정적 테스트, 빌드, 내부 데스크톱 패키징을 실행해야 한다.

## 수용 기준

- `.settings-dialog-backdrop`은 page-level 스크롤을 만들지 않는다.
- `.settings-tab-panel`만 설정 본문 세로 스크롤 컨테이너로 남는다.
- `.cli-adapter-setup-guide`, `.cli-setup-stepper`, `.cli-command-copy-row`, `.agent-cli-command-stack`은 내부 overflow 스크롤을 만들지 않는다.
- CLI 명령 복사 버튼은 접히는 그리드 안에서 위치가 안정적이다.
- 테스트가 스크롤 소유권과 CLI 그리드 계약을 검증한다.

## 근거

- MDN `overscroll-behavior`: 중첩 스크롤의 체이닝과 전파는 명시적으로 제어해야 한다.
- Apple Human Interface Guidelines `Scrolling`: 스크롤 가능한 콘텐츠의 범위와 조작 대상이 분명해야 한다.
- Fluent/Windows scroll guidance: 스크롤 영역은 사용자가 조작 중인 표면 안에서 예측 가능해야 한다.
