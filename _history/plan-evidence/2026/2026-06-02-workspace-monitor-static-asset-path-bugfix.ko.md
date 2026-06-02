# 계획 근거: Workspace Monitor 정적 asset 경로 버그 수정

## 분해 판단

- 사용자 요청은 넓었지만, 전체 저장소 검증 결과에서 즉시 재현된 기능적 버그는 `workspace-monitor` 정적 export의 root-relative asset path였다.
- 이미 `workspace-monitor`, `platform-desktop-app`, `agent-platform`, naming/structure audit가 기본 검증을 통과했으므로, 이번 slice는 재현된 static asset path 문제에 집중했다.

## 선택한 해결책

- Next build output의 `_next` asset path는 `assetPrefix: "./"`로 상대화한다.
- public snapshot JSON fetch는 현재 문서 URL 기준으로 생성해 root/subpath를 모두 지원한다.
- 회귀 방지는 `perf:budget`에 넣어 성능 예산과 static packaging 안전성을 함께 확인한다.

## 검증 계획

- `workspace-monitor` check/test/build/perf
- repository-root static server에서 subpath URL smoke
- `file://` smoke는 asset path 회귀 확인용으로만 사용하고, local JSON fetch 실패는 별도 Tauri 검증 리스크로 기록
