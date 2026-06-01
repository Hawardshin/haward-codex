# 스펙: 플랫폼 컨셉과 철학 재검토

## 목표

전체 플랫폼 컨셉과 운영 철학을 재검토하고, 빠진 철학 축을 보강해 미래 에이전트가 의도를 놓치지 않게 한다.

## 요구사항

- `REQ-WS-036`

## 범위

- `_philosophy/agent-operating-philosophy.ko.md`
- `_philosophy/agent-operating-philosophy.en.md`
- `_philosophy/platform-concept-review.ko.md`
- `_philosophy/platform-concept-review.en.md`
- `agent-platform/configs/memory/bootstrap-manifest.json`
- `_ops/index.md`

## 동작

- 철학 문서가 인간 최종 권한, scoped autonomy, rollback 가능성, 보안/프라이버시, 운영 비용과 agentic debt를 명시한다.
- 컨셉 리뷰 문서가 현재 컨셉, 잘 반영된 축, 발견한 누락, 남은 개선 후보를 정리한다.
- memory bootstrap이 철학 문서를 warm required anchor로 포함한다.

## 제외

- 새 autonomy-level 도구 구현
- private data review checklist 구현
- 기존 workflow 전체 재작성
