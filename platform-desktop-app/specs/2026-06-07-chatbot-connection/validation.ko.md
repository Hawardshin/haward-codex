# Validation: Chatbot Connection

날짜: 2026-06-07

## 완료된 검증

- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`
  - 결과: 통과.
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor test`
  - 결과: 통과, 90 tests.
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run collect -- --best-effort`
  - 결과: 통과, 650 inline documents / 2846 admin history records.
- `corepack pnpm -w run desktop:renderer:build`
  - 결과: 통과, Next production build와 customer bundle audit 통과.
- `corepack pnpm --dir platform-desktop-app run check`
  - 결과: 통과. 기존 public release signing/notarization/updater/clean-machine smoke gate와 developer snapshot stale warning은 report로 남았다.
- Browser smoke
  - 결과: 통과.
  - 데스크톱: `data-chatbot-connection="search-agent"` 1개, connection item 4개, 액션 `계정 연결`, `터미널 연결`, `모델 갱신` 확인.
  - 액션: `계정 연결`은 provider 설정 dialog와 login card 3개를 열고, `터미널 연결`은 terminal drawer를 연다.
  - 모바일 viewport 390x844: connection item/button overflow 없음.
  - resource lifecycle: dev server 종료 후 TCP 3225 listener 없음.
- `PYTHONPATH=src python3 -m agent_platform.cli check-resources ../_history/resource-checks/2026/2026-06-07-chatbot-connection.json`
  - 결과: 통과, `resource_ready`.
- `PYTHONPATH=src python3 -m agent_platform.cli check-omissions ../_history/omission-checks/2026/2026-06-07-chatbot-connection.json`
  - 결과: 통과, `coverage_ready`.
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-07-chatbot-connection-input.json`
  - 결과: 통과, `ready_to_close`.

## 남은 검증

- commit 및 push.

## 수동 확인 항목

- `챗봇 연결` 명령 팔레트 항목이 에이전트 화면을 연다.
- 에이전트 채팅 composer에서 provider API, 모델, 터미널 대체, 작업 실행 저장소 상태가 보인다.
- `계정 연결`은 provider 설정 dialog로 이어진다.
- `터미널 연결`은 terminal drawer를 연다.
- `모델 갱신`은 선택 provider model refresh를 호출한다.
