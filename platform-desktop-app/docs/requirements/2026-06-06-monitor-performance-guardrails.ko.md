# 요구사항: Monitor 성능 가드레일 완성

## 사용자 요구

탭 이동이 여전히 느리므로 근본 원인을 다시 보고, 데스크톱 앱의 CPU/RAM/runtime 자원을 실제로 활용하면서 구현과 빌드까지 끝낸다. 범위가 넓다는 이유로 회피하지 않는다.

## 범위

- 이미 구현된 resident tab, preload, lazy boundary, source editor decoupling을 유지한다.
- 무거운 패널이 다시 정적 import로 돌아와 초기/전환 비용을 키우지 못하도록 정적 계약을 둔다.
- 탭 전환 감사를 1회성 숫자가 아니라 반복 실행 가능한 예산으로 만든다.
- click-to-visible 시간뿐 아니라 browser main-thread long task도 측정한다.
- 성능 계약은 Workspace Monitor check, desktop readiness, tests, internal packaging path에서 검증된다.

## 수용 기준

- `MonitorShell.tsx`의 heavy workbench panel은 type-only import, `next/dynamic`, explicit preload path 계약을 만족해야 한다.
- `workspace-monitor` check는 lazy-boundary contract를 실행해야 한다.
- section switch audit는 `--runs=N` 반복 측정과 long-task summary를 출력해야 한다.
- built `out/` 산출물 기준으로 `perf:budget`, `perf:sections`, `perf:sections:repeat`, `perf:buttons`가 통과해야 한다.
- `platform-desktop-app package:internal`이 끝까지 통과해 `.app`와 `.dmg`를 생성해야 한다.

## 비범위

- 이번 슬라이스는 `MonitorShell.tsx` 전면 라우팅 재작성이나 Tauri command module 분해를 직접 수행하지 않는다.
- public macOS release readiness를 주장하지 않는다. Developer ID signing, notarization, updater, clean-machine smoke는 별도 release gate다.

## 근거

- Next.js lazy loading guidance: https://nextjs.org/docs/app/guides/lazy-loading
- React transition/deferred rendering guidance: https://react.dev/reference/react/useTransition
- React deferred value guidance: https://react.dev/reference/react/useDeferredValue
- web.dev long task guidance: https://web.dev/articles/optimize-long-tasks
- web.dev INP guidance: https://web.dev/articles/optimize-inp
