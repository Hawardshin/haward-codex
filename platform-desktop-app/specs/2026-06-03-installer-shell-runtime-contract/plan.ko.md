# 계획: Installer Shell Runtime Contract

1. 웹-first intake로 Tauri shell, resource, filesystem, updater 경계를 확인한다.
2. 현재 `platform-desktop-app` 구조, registry, README, runtime data boundary, readiness/test, Rust command surface를 점검한다.
3. `runtime-contracts/` 폴더를 만들고 shell-readable contract와 bootstrap docs를 작성한다.
4. Tauri resource mapping과 Rust contract-read command를 구현한다.
5. contract validator를 추가하고 package check/readiness/test에 연결한다.
6. requirements, architecture docs, project registry, spec/history/evaluation을 갱신한다.
7. contract/config/test/check/Rust/evaluation 검증 후 commit/push한다.
