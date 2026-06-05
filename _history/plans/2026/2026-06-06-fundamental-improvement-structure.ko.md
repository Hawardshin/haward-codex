# 근본 개선 구조 적용 계획

## 목표

다양한 히스토리에서 반복 신호를 읽고, 이를 구조적 개선 원칙과 실행 가능한 개선 패키지로 승격해 Workspace Monitor와 desktop product snapshot에 적용한다.

## 실행 계획

1. 기존 `historyInsightLoop`를 입력으로 받는 `fundamentalImprovementStructure` collector를 추가한다.
2. snapshot stats/type/customer sanitizer에 구조 개선 모델을 연결한다.
3. Product Structure 화면에 구조 원칙, 개선 패키지, fitness check를 보여주는 보드를 추가한다.
4. collector/readiness 테스트를 추가하고 generated snapshot을 갱신한다.
5. Browser smoke와 `desktop:package:internal`까지 실행한다.

## 판단 기준

- 내부 히스토리 evidence path는 developer snapshot에만 존재한다.
- customer snapshot은 내부 근거와 구조 진단 세부를 제거한다.
- UI는 한 화면 안에서 “반복 패턴”보다 상위의 “근본 구조”를 먼저 보여준다.
- 새 구조는 테스트와 빌드로 검증된다.
