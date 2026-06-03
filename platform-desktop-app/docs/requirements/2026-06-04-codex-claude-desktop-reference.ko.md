# Codex/Claude Desktop 레퍼런스 반영 요구사항

| ID | 요구사항 | 우선순위 | 검증 |
| --- | --- | --- | --- |
| REQ-PDA-072 | 데스크톱 앱은 Codex app과 Claude Desktop을 별도 공식 레퍼런스로 추적해야 하며, 단순 CLI wrapper나 웹 대시보드로 회귀하지 않아야 한다. | must | `reference-platform-advantage-registry.json`, readiness |
| REQ-PDA-073 | 에이전트 실행 채팅은 Codex app식 thread workbench로 취급되어야 하며, 채팅 composer, 하단 터미널, 파일/디프, artifact, decision, validation이 같은 작업 단위로 묶여야 한다. | must | `codex-style-thread-workbench`, user-flow token |
| REQ-PDA-074 | 로컬 도구, MCP 서버, desktop extension, guest CLI adapter는 Claude Desktop식 connector-first UX로 설정 탭에서 관리하고 채팅 composer 주변에서 연결 상태를 보여야 한다. | must | `claude-desktop-connector-first-chat`, user-flow token |
| REQ-PDA-075 | Codex/Claude Desktop 레퍼런스 전이 패턴은 public source only 경계를 유지하고, 누락 시 readiness/test가 실패해야 한다. | must | `check-readiness.mjs`, `readiness.test.mjs` |

## 결정

- Codex app과 Claude Desktop의 브랜드나 UI를 복제하지 않고, 공개 공식 자료에서 확인되는 데스크톱 작업 구조와 커넥터 흐름만 제품 계약으로 전이한다.
- Codex CLI나 Claude Code CLI는 여전히 선택형 guest adapter이며, 플랫폼 앱이 먼저 실행되고 작업 상태와 데이터 축적을 소유한다.
- Claude Desktop의 desktop extension/MCP 흐름은 향후 `Settings > Capabilities`와 agent work chat connector chip 구현의 기준으로 둔다.
