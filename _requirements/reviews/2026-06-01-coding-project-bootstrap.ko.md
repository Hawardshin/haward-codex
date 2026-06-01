# 요구사항 검토: 코딩 프로젝트 bootstrap

- 날짜: 2026-06-01
- 요구사항: `REQ-WS-038`
- 검토 결과: 승인

## 적합성

요청은 특정 앱 기능이 아니라 앞으로 여러 코딩 프로젝트를 생성하고 이어가기 위한 공통 운영 능력이다. 따라서 개별 프로젝트가 아니라 `_tools/`, `_ops/`, `_requirements/`, `_specs/`에 걸친 shared workspace capability로 관리한다.

## 범위

- 포함: 기술별 blueprint, dry-run 계획, 실제 생성, optional root registry update, 사용 문서, workflow/prompt 연결, monitor 반영
- 제외: 실제 의존성 설치, 외부 framework generator 실행, 즉시 새 제품 프로젝트 생성

## 리스크

- blueprint가 과하게 많은 파일을 만들면 낭비가 생긴다.
- framework 버전이 빨리 바뀌므로 생성 파일은 최소 구조로 제한해야 한다.
- registry update는 root project 생성에만 허용해야 한다.

## 검증 기준

단위 테스트, workspace-health, structure-audit, memory bootstrap, request trace, evaluation을 통과하면 기준선에 반영한다.
