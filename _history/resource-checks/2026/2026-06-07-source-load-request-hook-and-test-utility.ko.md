# 2026-06-07 소스 로드 요청 훅 및 테스트 유틸 분리 리소스 체크

## 리소스 영향

- 새 장기 실행 서버 없음.
- 새 파일 핸들, watcher, interval, worker, 네트워크 연결 없음.
- React hook은 `useRef`와 `useCallback`만 사용하며 컴포넌트 unmount 후 별도 cleanup이 필요한 외부 리소스를 만들지 않는다.
- 내부 패키징 명령은 Tauri `.app`과 DMG 산출물을 생성하고 내부 앱을 열었다.
- `open-internal-app.mjs`는 기본 실행에서 기존 앱 인스턴스를 재사용하고, 명시적 `--new-instance`일 때만 새 인스턴스를 연다.

## 확인

- `corepack pnpm run desktop:package:run:internal`: 통과.
- 패키징 중 Rust 테스트 8개 통과.
- macOS `.app` codesign 검증 통과.
- DMG `hdiutil verify` 통과.
- 기존 누적 내부 앱 프로세스를 종료한 뒤 재실행했다.
- 최종 `pgrep -fl agent-workspace-platform-desktop`: 1개 프로세스.
- 최종 Agent Workspace Platform DMG mount: 없음.
- 최종 `lsof -ti tcp:3217`: 없음.
