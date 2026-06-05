# 스펙: Monitor 성능 가드레일 완성

## 목표

Workspace Monitor의 탭 전환 최적화가 이후 변경으로 퇴행하지 않게 정적 lazy-boundary 계약과 runtime 성능 감사를 제품 검증선에 묶는다.

## 언어/런타임 선택

- 옵션 A: Node 기반 정적 계약 + Playwright 런타임 감사. 기존 renderer scripts와 CI/check 흐름에 바로 들어가며 Next static export를 실제 브라우저에서 검증할 수 있어 선택했다.
- 옵션 B: Rust/Tauri native profiler command. OS 자원 측정에는 유리하지만 React import boundary와 WebView long task 회귀를 직접 잡기 어렵다.
- 옵션 C: 수동 DevTools 프로파일링. 원인 분석에는 좋지만 반복 가능한 regression gate가 아니므로 미선택.

## 아키텍처 선택

- 옵션 A: `scripts/check-lazy-boundary-contract.mjs`를 추가하고 `workspace-monitor check` 및 desktop readiness에서 요구한다. 변경자가 check를 돌리면 즉시 퇴행을 알 수 있어 선택했다.
- 옵션 B: ESLint custom rule. 장기적으로 가능하지만 현재 repo의 renderer check 흐름은 Node scripts 중심이다.
- 옵션 C: bundle size만 감시. 정적 import 회귀 일부는 잡을 수 있지만 어떤 panel이 계약을 깨는지 진단력이 낮다.

## 폴더 구조 선택

- 옵션 A: Workspace Monitor 전용 script/test와 desktop readiness script를 좁게 수정한다. 성능 계약의 소유권이 monitor에 있어 선택했다.
- 옵션 B: platform-wide performance package를 신설한다. 여러 앱으로 확장될 때 유효하지만 현재는 한 renderer만 검증 대상이라 과하다.

## 설계

- lazy-boundary contract는 heavy target component 이름과 module path 목록을 가진다.
- `MonitorShell.tsx`에서 대상 이름이 runtime import specifier에 등장하면 실패한다. `import type`은 허용한다.
- 각 대상은 `dynamic(() => import(...))` 경계를 가져야 한다.
- 각 대상 module path는 explicit preload path에 들어가야 한다.
- section switch audit는 `--runs=N`을 받아 같은 section sequence를 반복한다.
- audit는 브라우저 안에 `PerformanceObserver` longtask observer를 설치하고 section 전환 사이의 long task count, max, total을 샘플에 기록한다.
- summary는 overall p95뿐 아니라 section별 settle/long-task 통계를 출력한다.

## 수용 기준

- lazy boundary check output이 `lazy_boundary_contract_ok`를 출력한다.
- workspace-monitor `check`가 lazy boundary check를 실행한다.
- desktop readiness가 lazy boundary script 존재와 핵심 token을 검사한다.
- `perf:sections:repeat`는 `audit-section-switch-latency.mjs --runs=3`을 실행한다.
- built static export 기준 성능 감사가 resident/mounted panel count와 long-task budget을 모두 통과한다.

## 제한

- long task 측정은 Chromium PerformanceObserver 지원이 있는 환경에서 가장 신뢰할 수 있다.
- 이번 작업은 회귀 방지와 검증 강화가 중심이며, `MonitorShell.tsx`의 장기 분해는 별도 migration slice로 남긴다.
