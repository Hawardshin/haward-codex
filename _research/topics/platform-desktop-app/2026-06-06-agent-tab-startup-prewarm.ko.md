# Agent 탭 시작 선로딩 참고 노트

- 대상: `platform-desktop-app/renderer/workspace-monitor`
- 신뢰도: 공식 문서 기반

## 참고한 원칙

- React `lazy`는 컴포넌트 코드 로드를 첫 render 시점까지 미룬다. 따라서 loader가 무거운 shell import를 직접 들고 있으면 loader hydrate 자체가 늦어질 수 있다.
- `Suspense` fallback은 lazy boundary loading 상태를 사용자에게 보여주는 경계로 쓴다.
- Next.js lazy loading은 dynamic import 경계를 명시해 초기 bundle 비용과 render 비용을 나누는 데 쓴다.

## 로컬 결정

- `SnapshotLoader`는 snapshot fetch와 최소 startup window만 담당한다.
- `MonitorShellBoundary`가 heavy `MonitorShell` dynamic import를 소유한다.
- `MonitorShell`은 12개 section resident set을 startup에 잡고, 2.6초 warmup overlay 동안 패널 mount와 module prewarm을 진행한다.
- production static export 설정은 유지하되 dev에서는 제외해 `desktop:dev` hydration 경로를 복구한다.
