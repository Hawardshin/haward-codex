# 요청-결과 추적: 다중 CLI 데스크톱 오케스트레이션

| 항목 | 내용 |
| --- | --- |
| 요청 ID | `UR-2026-06-02-047` |
| 작업 모드 | `governance` |
| 요구사항 | `REQ-WS-085`, `PDA-REQ-013` - `PDA-REQ-017`, `PDA-UX-009` - `PDA-UX-012` |
| 웹 검색 | `_history/web-searches/2026/2026-06-02-multi-cli-desktop-orchestration.ko.md` |
| 계획 | `_history/plans/2026/2026-06-02-multi-cli-desktop-orchestration.ko.md` |
| 스펙 | `platform-desktop-app/specs/2026-06-02-multi-cli-orchestration-desktop/` |
| 아키텍처 | `platform-desktop-app/docs/architecture/multi-cli-orchestration-runtime.ko.md` |
| 평가 | `_history/evaluations/2026/2026-06-02-multi-cli-desktop-orchestration-evaluation-input.json` |

## 결과

- 네 AI CLI를 optional adapter 후보로 등록했다.
- multi-CLI supervisor, 질문 보류, decision inbox, terminal output 구조화, source editor 후보, 데이터 축적 계약을 문서화했다.
- 실제 CLI 실행과 dependency 설치는 후속 구현으로 명확히 분리했다.
