# 데스크톱 제품 폴더 구조 재편 계획

## 작업 단위

| Slice | 작업 | 주요 경로 | 검증 |
| --- | --- | --- | --- |
| S1 | renderer 소스 이동 | `platform-desktop-app/renderer/workspace-monitor/` | `git diff --name-status`, structure audit |
| S2 | runtime/build 경로 재연결 | `pnpm-workspace.yaml`, `platform-desktop-app/src-tauri/tauri.conf.json`, scripts | `pnpm install --lockfile-only`, app checks |
| S3 | 운영 경계 갱신 | `_ops/projects/`, `_docs/`, product docs/configs | docs audit, config contract |
| S4 | snapshot/build 검증 | renderer collector/build/test/perf | customer build, monitor tests, perf budget |
| S5 | trace/evaluation 기록 | specs, history, web search, evaluation | omission/evaluation files |

## 병렬화

- 빌드/테스트/감사 명령은 서로 파일을 쓰지 않는 단계에서 병렬 실행한다.
- git state, generated maps, customer snapshot 생성은 순차 처리한다.
