# Resource Check

- 런타임 리스크: 개발 서버와 in-app Browser 검증을 사용했다.
- 서버: `corepack pnpm run dev --port 3020`를 검증 후 `Ctrl-C`로 종료했다.
- 브라우저: 로컬 앱 DOM을 확인했고 console warn/error는 없었다.
- 장기 실행 프로세스: 최종 응답 전 남아 있는 검증용 dev server 없음.
- 패키징: Tauri internal package build가 `.app`와 `.dmg`를 생성하고 signature/DMG verify까지 통과했다.
