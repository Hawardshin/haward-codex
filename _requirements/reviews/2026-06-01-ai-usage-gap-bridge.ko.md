# 요구사항 검토: AI 사용 격차와 간극 해소

## 검토 대상

- `REQ-WS-042`

## 적합성

- 사용자 요청은 단발성 답변보다 플랫폼 운영 방식 반영을 요구한다.
- 기존 research/search/evaluation 구조는 있었지만, AI 사용자의 숙련도 차이를 진단하고 개선하는 profile은 없었다.
- 새 요구사항은 기존 work mode, spec-driven, source grounding, capability promotion 원칙과 충돌하지 않는다.

## 결정

`REQ-WS-042`를 공통 workspace 요구사항으로 채택한다.

## 검증 기준

- `ai-usage-gap-profile.json`이 자기 설명 config 계약을 통과한다.
- workflow/prompt/router/index/memory bootstrap에서 찾을 수 있다.
- 평가 입력에 웹 검색 기록, 요구사항, 스펙, source provenance, plan evidence, timing summary가 연결된다.
