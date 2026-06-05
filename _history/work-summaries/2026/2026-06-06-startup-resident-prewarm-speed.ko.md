# 작업 요약: startup resident prewarm 속도 최적화

## 완료 내용

- Workspace Monitor 시작 직후 핵심 섹션을 idle 시간에 bounded resident set으로 prewarm하도록 변경했다.
- `overview`는 active가 아닐 때 resident retention에서 제외해 무거운 home surface가 장기 hidden tree로 남는 비용을 줄였다.
- Tool Studio panel을 memoized component로 감싸고 Shell에서 전달하는 이동 callback들을 stable callback으로 바꿨다.
- resident/prewarm 계약 테스트를 업데이트했다.
- renderer build, section performance audit, desktop test/check, internal package build를 모두 실행했다.

## 성능 결과

- 이전 bounded resident baseline: average 430ms, p95 827.8ms.
- 이번 결과: average 482ms, p95 652.7ms.
- 판단: worst-case p95는 개선됐고 mounted/resident cap 5는 유지됐다. 평균 지연은 악화되어 후속 section split/memoization 대상으로 남긴다.

## 산출물

- 내부 app: `platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`
- 내부 dmg: `platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`
