# Shared Workspace Resource Cache 조사 요약

## 출처

- React official docs: `useMemo`, `memo`, `useDeferredValue`, `lazy`
- Tauri official docs: Process Model, Architecture

## 해석

- React 최적화는 무조건적 memo가 아니라 비용이 있는 계산/렌더/prop 안정성 문제를 줄이는 데 써야 한다.
- Tauri는 시스템 작업을 Rust core process로 두는 게 맞지만, frontend resident surface가 같은 core 명령을 동시에 반복 호출하면 OS 자원을 더 쓰면서도 탭 전환 지연을 만들 수 있다.
- 이 플랫폼은 `desktop`과 `source` surface가 둘 다 resident로 올라올 수 있으므로, source catalog prepare와 workspace warmup은 component instance가 아니라 module-level in-flight/cache로 공유하는 편이 현재 구조와 잘 맞는다.

## 적용 결정

- 새 dependency나 저장소 schema를 만들지 않는다.
- `prepare_workspace_os_resources`와 `warm_workspace_os_resources` 호출에 짧은 TTL cache와 동일 key in-flight dedupe를 둔다.
- force refresh는 cache를 우회하되 동일 key in-flight는 공유한다.
