# 2026-06-07 desktop monitor panel split continuation resource check

## 런타임 리소스

- 장기 실행 exec 세션: 없음
- 패키징 파이프라인 세션: 종료됨
- 내부 앱: `open-internal-app.mjs`가 `.app`을 열었음. 사용자가 실행 확인을 원한 경로의 산출로 간주한다.
- 브라우저/서버 새 실행: 없음

## 빌드 산출물

- Tauri release binary, `.app`, `.dmg`가 `src-tauri/target/release/bundle/` 아래 갱신됨.
- workspace snapshot collect가 generated/public snapshot 파일을 갱신함.

## 민감 경계

- `_private/` 열람 없음
- 지원 번들 또는 credential secret 원문 생성 없음
