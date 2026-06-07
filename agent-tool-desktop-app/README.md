# Agent Tool Desktop App

## Purpose

`agent-tool-desktop-app/`은 에이전트 생성, 도구 관리, Ollama/local model 관리, provider 직접 실행, AgentCore-style runtime 운영을 맡는 별도 설치형 데스크톱 앱 제품 홈이다.

이 프로젝트의 핵심 결정은 `platform-desktop-app/`과 이 앱이 둘 다 데스크톱 앱이라는 점이다. `platform-desktop-app/`은 Git 프로젝트 관리와 현재 작업 보고에 집중하고, `agent-tool-desktop-app/`은 고급 에이전트/도구/모델 운영에 집중한다.

`agent-platform/`은 이 앱의 사용자-facing 제품 홈이 아니라 재사용 가능한 내부 엔진, 정책, 검증, agent/tool/runtime contract 레이어다.

## Status

- Current phase: product boundary scaffold
- Owner: personal
- Registry: `_ops/projects/registry.json`

## Scope Boundary

- Belongs here:
  - agent/tool/Ollama management desktop product requirements
  - desktop UI and runtime boundary for agent/tool operations
  - user-facing controls for local model catalogs and provider execution
  - product-specific configs, specs, tests, and artifacts
- Shared engine:
  - reusable agent specifications and evaluation helpers in `agent-platform/`
  - shared policies, workflows, and history records under `_docs/`, `_ops/`, and `_history/`
- Out of scope:
  - Git workspace portfolio, project timeline, evidence review, and project reports owned by `platform-desktop-app/`
  - raw secrets or private local model credentials in tracked files
  - public release readiness claims before installer, signing, updater, privacy, and smoke-test gates exist

## Structure

```text
agent-tool-desktop-app/
  artifacts/
  configs/
  docs/
  docs/requirements/
  specs/
  src/
  tests/
```

## Commands

No runnable desktop shell is introduced in this boundary scaffold. Runtime, package, and validation commands must be added with a future implementation slice.
