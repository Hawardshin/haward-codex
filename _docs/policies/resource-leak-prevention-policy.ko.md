# 리소스 누수 방지 정책

## 목적

이 플랫폼은 장시간 실행 에이전트, 병렬 작업, 브라우저 검증, Next.js 모니터링 UI, Python 도구, 외부 CLI adapter를 계속 붙여 가는 구조다. 따라서 메모리 누수와 리소스 누수는 성능 문제가 아니라 플랫폼 신뢰성 문제로 다룬다.

## 적용 대상

다음 작업은 `resource_risk_occurred=true` 후보로 본다.

- 장시간 실행 에이전트, daemon, 서버, watcher, scheduler
- Playwright, Chrome, Browser 같은 브라우저 자동화와 테스트 fixture
- subprocess, 외부 CLI adapter, background worker, queue
- 파일 핸들, 임시 파일, 네트워크 연결, stream, timer, subscription
- cache, in-memory index, snapshot, 대용량 문서/검색 결과/이미지/HTML 처리
- Next.js build/dev/server, Node worker, Python process, Tauri/Electron/Go/Rust sidecar

## 규칙

1. 리소스를 열거나 시작하는 코드는 cleanup 경로가 있어야 한다.
2. Python에서는 가능한 경우 context manager, `try/finally`, bounded collection, streaming/chunking을 우선한다.
3. Node/Next.js에서는 `process.memoryUsage()`, heap profile, Next.js memory debug 기능 같은 측정 경로를 검토한다.
4. Playwright/브라우저 작업은 page/context/browser 생명주기를 명시하고, 실패 경로에서도 닫히는지 확인한다.
5. cache, queue, worker, watcher는 크기, TTL, 종료 조건, backpressure, cancellation 또는 dispose 경로를 가져야 한다.
6. 대용량 입력은 가능한 한 전체 로드보다 streaming, pagination, chunking, sampling, on-disk artifact로 처리한다.
7. 리소스 위험이 있는 작업은 `_history/evaluations/YYYY/` 또는 프로젝트별 history에 resource check JSON을 남기고 `check-resources`를 실행한다.
8. 작업 평가 입력에는 `resource_risk_occurred=true`와 `resource_check_targets`를 포함한다.
9. 위험을 수용할 때는 owner, 이유, 관측 지표, 재검토 트리거를 rationale에 남긴다.

## 근거

- Python `tracemalloc`은 allocation snapshot 비교와 peak/current traced memory 측정을 제공한다.
- Node.js `process.memoryUsage()`는 RSS, V8 heap, external, ArrayBuffer 메모리를 확인하는 기본 측정 경로다.
- Next.js는 build memory debugging, heap profile, heap snapshot 같은 메모리 조사 방법을 문서화한다.
- Playwright는 격리된 browser context 모델을 제공하므로 context/browser 생명주기를 닫는 구조가 중요하다.

## 실행 경로

- Workflow: `_ops/workflows/69-resource-leak-prevention.md`
- Prompt: `_ops/prompts/100-resource-leak-prevention.md`
- Agent docs: `agent-platform/docs/resource-guard-agent.ko.md`
- Template: `agent-platform/configs/evaluation/resource-guard-template.json`
- CLI: `PYTHONPATH=src python3 -m agent_platform.cli check-resources <input.json>`
