# 2026-06-07 소스 에디터 액션 상태 분리 리소스 체크

## 리소스 영향

- 새 장기 실행 서버 없음.
- 새 파일 핸들, watcher, interval, worker, 네트워크 연결 없음.
- 새 helper는 순수 상태 계산 함수와 타입 export만 포함한다.
- 테스트 importer는 테스트 실행 중 임시 data URL 변환만 수행하며 별도 프로세스나 외부 리소스를 만들지 않는다.

## 확인

- `node --test tests/source-editor-helper-behavior.test.mjs`: 통과, 4개.
- `node --test tests/source-editor-templates.test.mjs`: 통과, 10개.
- `node --test tests/tool-studio.test.mjs`: 통과, 54개.
- `corepack pnpm --filter workspace-monitor run check`: 통과.
- `corepack pnpm --filter workspace-monitor test`: 통과, 109개.
- `corepack pnpm --filter platform-desktop-app test`: 통과, 30개.
- `corepack pnpm run desktop:package:run:internal`: 통과.
- 패키징 중 Rust `cargo test`: 통과, 8개.
- macOS `.app` codesign 검증 통과.
- DMG `hdiutil verify`: 통과.
- 내부 앱 실행 모드: `reuse_existing_instance`.
- 최종 리소스 상태는 후속 hygiene 명령에서 확인한다.
