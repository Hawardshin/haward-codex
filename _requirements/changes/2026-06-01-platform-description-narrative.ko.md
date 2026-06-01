# 요구사항 변경: 플랫폼 설명 강화

## 출처 요청

- `UR-2026-06-01-021`

## 변경 이유

사용자가 이 플랫폼에 대한 설명을 더 자세하고 멋지게 작성하라고 요청했다. 기존 README는 운영 규칙과 세부 절차가 풍부했지만, 처음 읽는 사람이 플랫폼의 정체성, 존재 이유, 핵심 루프, 축적되는 자산을 빠르게 이해하기에는 첫 설명이 짧았다.

## 추가 요구사항

### REQ-WS-037

플랫폼은 첫 진입점과 운영 모델 문서에서 사용자가 이해할 수 있는 상세한 정체성 설명을 제공해야 한다. 설명은 플랫폼의 목적, 해결하는 문제, 핵심 운영 루프, 축적되는 자산, 프로젝트 경계, 평가와 근거 기반 운영의 가치를 포함해야 한다.

## 영향 범위

- `README.md`
- `agent-platform/README.md`
- `_docs/operating-models/`
- `agent-platform/configs/memory/bootstrap-manifest.json`
- `_ops/index.md`

## 검증 방법

- 문서 리뷰
- `docs-audit`
- `check-memory-bootstrap`
- `check-config-contract`
- `workspace-health --include-build`
