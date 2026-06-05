# 근본 개선 구조 스펙

## 배경

기존 `historyInsightLoop`는 반복된 히스토리 패턴을 보여준다. 이번 스펙은 그 패턴을 상위 구조로 해석해 “왜 계속 같은 문제가 반복되는지”와 “어떤 구조 원칙으로 플랫폼을 바꿀지”를 보여준다.

## 범위

- 새 snapshot 모델: `fundamentalImprovementStructure`
- 새 collector lib: `scripts/lib/fundamental-improvement-structure.mjs`
- Product Structure UI 보드
- customer snapshot sanitizer
- collector/readiness 테스트와 generated snapshot 갱신

## 모델

- 입력: `historyInsightLoop`
- 출력:
  - `operatingModel`: signal intake, structural diagnosis, improvement thesis, package execution, fitness check, memory feedback
  - `structuralPrinciples`: 근본 원칙, 원인, 적용 지점, evidence path
  - `improvementPackages`: 지금 적용할 구조 개선 패키지
  - `fitnessChecks`: 반복 방지를 위한 검증 계약

## 제외

- 새 런타임 프로세스나 native telemetry 저장소 추가
- 내부 히스토리 전체 본문을 UI에 추가
- customer snapshot에 내부 evidence path 노출
