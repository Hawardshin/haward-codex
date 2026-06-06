# Plan: OSS Pattern Adoption Gate

## 실행 순서

1. 웹 우선 조사로 high-signal agent platform repositories를 확인한다.
2. memory bootstrap과 project boundary를 확인하고 `agent-platform`으로 scope를 고정한다.
3. coding research record에 언어, 아키텍처, 폴더 구조 선택지를 기록한다.
4. `agent_platform.oss.pattern_adoption` validator를 추가한다.
5. CLI 명령과 config template, tests를 추가한다.
6. `docs/open-source-integration.md`와 README에 사용법을 연결한다.
7. 새 CLI, config contract, touched-area tests, full tests를 실행한다.
8. omission/evaluation/history records를 작성한다.

## 선택된 방식

- Selected work mode: `governance`
- Selected language: Python native validator
- Selected architecture: extend existing OSS validation layer
- Selected folder structure: `agent-platform/src/agent_platform/oss`, `configs/open-source`, `tests`

## 직접 code import 판단

이번 slice에서는 외부 코드 복사와 dependency install을 하지 않는다. 직접 import는 향후 feature target이 명확하고 license/provenance gates를 통과할 때만 별도 human checkpoint 뒤에서 진행한다.
