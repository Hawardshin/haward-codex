# Capability Promotion Policy

## 목적

플랫폼은 다양한 작업을 수행하면서 반복, 병목, 누락, 수동 재작업을 발견하면 기능 추가 후보를 스스로 만들 수 있어야 한다. 다만 이것은 불투명한 자율 변경이 아니라, 기록 가능한 bounded black-box 처리다.

## 원칙

- 자동화는 사람이 반복해서 하던 일을 줄이기 위한 것이다.
- 사용자는 자동으로 개선되는 느낌을 받을 수 있지만, 내부 기록은 항상 열람 가능해야 한다.
- 후보 생성은 넓게 허용하되, 실행은 위험도에 따라 제한한다.
- 새 기능은 가장 작은 재사용 자산부터 검토한다.
- 고위험 변경은 사람 체크포인트, rollback, 감사 기록 없이 실행하지 않는다.

## 승격 순서

1. `prompt`: 반복되는 판단 프레이밍
2. `workflow`: 순서와 종료 조건이 있는 반복 절차
3. `template`: 반복되는 구조
4. `tool`: 결정적 실행, 변환, 검증, 생성
5. `skill`: 반복되는 에이전트 행동, 도메인 규칙, 도구 통합 지식
6. `agent`: 입력/출력/도구/정책/검증 계약이 필요한 반복 역할
7. `project_feature`: UI, 모니터, 데스크톱 앱, 프로젝트 제품 기능

## 사람 체크포인트

다음은 자동 실행 금지 대상이다.

- destructive file/git/database/infrastructure change
- secret, token, credential, private data 처리
- install, upgrade, removal, global configuration
- permission, cost, public deployment, publishing
- security/privacy-sensitive feature
- irreversible migration
- 프로젝트 소유 경계가 불명확한 변경

## 완료 기준

승격된 capability는 다음을 남겨야 한다.

- 관찰 근거
- 후보와 기각된 더 가벼운 대안
- 위험도
- 검증 계획과 결과
- rollback 또는 disablement 경로
- 문서
- 평가
- 커밋과 push
