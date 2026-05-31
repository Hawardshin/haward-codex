# 스펙: 아키텍처 우선 코딩

## 배경

사용자는 소스코드를 작성할 때 best architecture를 당연히 찾아야 한다고 지시했다. 기존 코딩 조사는 오픈소스 코드 참고를 요구했지만, 아키텍처 후보 비교와 선택 근거를 별도 readiness 조건으로 강제하지 않았다.

## 목표

- 소스 코드 작성 전 architecture reference를 확인한다.
- 최소 두 개의 아키텍처 옵션을 비교한다.
- 선택 구조와 제외 대안, 경계, 품질 속성, 검증 영향을 기록한다.
- 누락 시 `complete-coding-research`가 구현 전 gap으로 막는다.

## 범위

- `coding-research-agent` readiness checker
- coding research 설정/템플릿/문서
- source registry와 coding research profile
- persistent instructions, workflow, prompt
- 요구사항/히스토리/평가 산출물

## 비범위

- 특정 프로젝트의 실제 제품 아키텍처 선택
- 외부 아키텍처 도구 설치
- C4/arc42 산출물 자동 생성 도구

## 성공 기준

- `architecture_reference_sources`, `architecture_options`, `architecture_decision_notes`가 coding research 입력에 추가된다.
- architecture fields 누락 시 테스트가 실패하도록 readiness checker가 gap을 반환한다.
- 관련 정책과 히스토리 문서가 한영으로 남는다.

