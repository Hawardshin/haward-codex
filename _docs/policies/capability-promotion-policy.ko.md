# Capability Promotion Policy

## 목적

플랫폼은 다양한 작업을 수행하면서 반복, 병목, 누락, 수동 재작업을 발견하면 기능 추가 후보를 스스로 만들 수 있어야 한다. 다만 이것은 불투명한 자율 변경이 아니라, 기록 가능한 bounded black-box 처리다.

## 원칙

- 자동화는 사람이 반복해서 하던 일을 줄이기 위한 것이다.
- 사용자는 자동으로 개선되는 느낌을 받을 수 있지만, 내부 기록은 항상 열람 가능해야 한다.
- 후보 생성은 넓게 허용하되, 실행은 위험도에 따라 제한한다.
- 아이디어를 내기 전에 유능한 사람이 직접 이 일을 한다면 어떤 순서로 목표를 정하고, 맥락을 읽고, 근거를 확인하고, 메모를 남기고, 선택지를 비교하고, 실행하고, 검증하고, 인수인계할지 모델링한다.
- 아이디어 생성과 아이디어 평가는 분리한다. 첫 아이디어를 바로 실행하지 않고, 여러 아이디어를 만들고 기준에 따라 평가한다.
- 새 기능은 가장 작은 재사용 자산부터 검토한다.
- 고위험 변경은 사람 체크포인트, rollback, 감사 기록 없이 실행하지 않는다.

## 사람형 작업 모델

자동화 후보는 먼저 사람이 직접 수행하는 절차로 설명되어야 한다.

- 목표와 성공 기준
- 기존 맥락과 제약 확인
- 출처 또는 로컬 근거 확인
- 가정, 모르는 점, 작업 메모
- 선택지와 trade-off 비교
- 결정 이유 또는 사람 판단 필요 지점
- 가장 작은 안전한 실행 단계
- 결과 검증
- 인수인계 요약과 다음 행동
- 누락과 재작업 가능성 검토

이 모델을 만들 수 없으면 자동화 후보를 바로 만들지 않고 문서화, 체크리스트, 프롬프트 개선, 추가 조사 중 더 작은 조치를 먼저 검토한다.

## 승격 순서

1. `prompt`: 반복되는 판단 프레이밍
2. `workflow`: 순서와 종료 조건이 있는 반복 절차
3. `template`: 반복되는 구조
4. `tool`: 결정적 실행, 변환, 검증, 생성
5. `skill`: 반복되는 에이전트 행동, 도메인 규칙, 도구 통합 지식
6. `agent`: 입력/출력/도구/정책/검증 계약이 필요한 반복 역할
7. `project_feature`: UI, 모니터, 데스크톱 앱, 프로젝트 제품 기능

## 아이디어 평가

생성된 아이디어는 승격 전에 평가받아야 한다.

- 반복 감소
- 시간 절감
- 유지보수 비용
- 근거 강도
- 위험도와 rollback 적합성
- 가장 작은 자산으로 해결하는지

평가 결과는 `promote_now`, `queue_for_later`, `merge_with_existing_asset`, `reject`, `human_review_required` 중 하나로 남긴다. 기각되거나 대기열로 간 아이디어도 이유를 기록한다.

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
- 사람형 작업 모델과 작업 흔적
- 위험도
- 검증 계획과 결과
- rollback 또는 disablement 경로
- 문서
- 평가
- 커밋과 push
