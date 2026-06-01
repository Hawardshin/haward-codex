# 스펙: 플랫폼 설명 강화

## 목적

처음 읽는 사용자가 이 저장소가 단순 규칙 모음이 아니라 개인 AI 에이전트 구축 플랫폼이라는 점을 빠르게 이해하도록 설명을 보강한다.

## 요구사항

- `REQ-WS-037`

## 범위

- 루트 README의 첫 진입 설명
- `agent-platform/README.md`의 중심 프로젝트 설명
- `_docs/operating-models/platform-identity-operating-model.*.md` 한영 문서
- `_ops/index.md`와 memory bootstrap에서 새 설명 문서 탐색 가능성

## 비범위

- 실제 에이전트 런타임 기능 변경
- UI 디자인 변경
- 새로운 프로젝트 생성

## 수용 기준

- 루트 README가 플랫폼의 목적, 해결하는 문제, 핵심 루프, 축적되는 자산을 설명한다.
- 별도 operating model 문서가 플랫폼 아이덴티티를 더 자세히 설명한다.
- 중심 프로젝트 README가 `agent-platform/`의 역할을 구체적으로 설명한다.
- 새 설명 문서는 `_ops/index.md`, `_docs/operating-models/README.*.md`, memory bootstrap에서 찾을 수 있다.
- 문서/설정 감사와 전체 workspace health가 통과한다.
