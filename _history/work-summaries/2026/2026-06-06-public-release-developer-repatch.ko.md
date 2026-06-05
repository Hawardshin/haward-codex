# 2026-06-06 Work Summary: Public Release Developer Repatch

- `TAURI_SIGNING_PRIVATE_KEY_PATH`를 public release config와 preflight에서 지원했다.
- `public-release-dev-env.mjs`와 `desktop:release:dev-env`를 추가했다.
- dev env scaffold는 ignored target 아래 dev updater key를 생성하고 private key content 대신 key path를 export한다.
- 테스트와 문서를 갱신했다.
- 내부 패키징 빌드와 dev env 적용 public package fail-fast 검증까지 실행했다.
