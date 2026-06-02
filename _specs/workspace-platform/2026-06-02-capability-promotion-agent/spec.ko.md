# Capability Promotion Agent Spec

## 요구사항

- `REQ-WS-070`

## 목표

플랫폼이 다양한 작업 중 반복, 병목, 누락, 수동 재작업을 관찰해 개선 아이디어를 만들고, 그 아이디어를 평가한 뒤 안전한 범위에서는 검증 가능한 자산으로 승격한다.

## 범위

- capability promotion registry 추가
- capability promotion agent spec 추가
- 정책, workflow, prompt 추가
- requirements, memory bootstrap, history, evaluation 연결

## 비범위

- 실제 장기 실행 background worker 구현
- 자동 설치, 권한 변경, public 배포 실행
- 사용자의 승인 없이 high-risk capability 적용

## 핵심 결정

- 이름은 `blackbox-agent`가 아니라 `capability-promotion-agent`로 둔다. 사용자는 자동처럼 느낄 수 있지만 내부는 투명해야 하기 때문이다.
- 새 기능은 `prompt -> workflow -> template -> tool -> skill -> agent -> project_feature` 순서로 가장 작은 자산을 우선한다.
- 아이디어는 생성과 평가를 분리한다. 선택된 아이디어, 기각된 아이디어, 대기열 아이디어와 이유를 남긴다.
- 고위험 작업은 human decision inbox로 보낸다.

## 수용 기준

- 레지스트리는 자기 설명 설정 계약을 만족한다.
- 에이전트 spec은 `inspect-agent`로 읽힌다.
- memory bootstrap에서 warm anchor로 발견된다.
- 생성된 아이디어는 평가 점수와 선택/기각/대기 이유가 있어야 한다.
- 관련 요구사항, 계획, 요청 추적, 평가가 남는다.
