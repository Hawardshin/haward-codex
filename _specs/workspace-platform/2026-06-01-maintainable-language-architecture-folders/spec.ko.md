# 스펙: 유지보수 가능한 언어/아키텍처/폴더 결정

## 목표

코딩 조사에서 구현 언어, 아키텍처 근거, 폴더 구조를 유지보수 관점으로 명시하게 한다. 이론상 베스트 프랙티스와 실무자 의견이 다를 수 있음을 기록하고, 폴더만 보아도 의미와 소유 경계를 파악할 수 있게 한다.

## 요구사항

- `REQ-WS-022`
- 구현 전 최소 두 개의 언어/런타임 후보를 비교한다.
- 아키텍처 이론/프레임워크 근거와 실무자 의견 근거를 분리한다.
- 최소 두 개의 폴더 구조 후보와 선택 근거, 폴더 의미, 유지보수 근거를 기록한다.

## 구현 범위

- `agent-platform/src/agent_platform/planning/coding_research.py`
- `agent-platform/tests/test_coding_research.py`
- `agent-platform/configs/planning/coding-research-template.json`
- `agent-platform/configs/research/coding-research-profile.json`
- 관련 문서, 운영 프롬프트, 요구사항, 히스토리

## 제외 범위

- 특정 프로젝트의 실제 폴더 구조 재설계
- 새 외부 패키지 설치
