# Tool Usage Integration 리소스 체크

날짜: 2026-06-06

## 리소스 영향

- 장기 실행 서버: 아직 시작하지 않음
- Browser smoke: 예정, 실행 후 세션 정리 필요
- 패키징: Tauri/Cargo build가 CPU와 disk를 사용함
- 생성물: Next build output, Tauri `.app`, DMG, generated snapshot

## 정리 계획

- Browser/dev server를 시작하면 검증 후 종료한다.
- packaging 후 developer snapshot이 customer snapshot으로 남지 않도록 `collect`를 다시 실행한다.
- final 전에 `git status --short`로 변경 범위를 확인한다.

## 결과

- Next dev server를 Tool Studio smoke 동안만 실행하고 종료했다.
- `lsof -nP -iTCP:3000 -sTCP:LISTEN` 결과 listener 없음.
- Playwright browser는 smoke script 안에서 `browser.close()`로 종료했다.
- Tauri package는 `.app`와 DMG를 생성했고 codesign/hdiutil 검증을 통과했다.
- package 후 developer snapshot 복구를 위해 `collect`를 다시 실행했다.
