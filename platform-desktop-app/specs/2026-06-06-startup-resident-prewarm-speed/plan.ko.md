# 계획: startup resident prewarm 속도 최적화

## 작업 모드

- `standard`
- 이유: desktop renderer 성능과 패키징 검증을 포함하는 의미 있는 구현 변경이다.

## 단계

1. 기존 bounded resident 구현과 성능 baseline을 확인한다.
2. resident cap을 유지한 채 startup idle prewarm을 추가한다.
3. overview retention 제외와 Tool Studio memo/stable callback을 적용한다.
4. 성능 계약 테스트를 업데이트한다.
5. renderer test/check/build, section performance audit, bundle budget을 실행한다.
6. desktop test/check와 internal package build를 실행한다.
7. post-package developer snapshot을 복구하고 기록/평가/커밋/푸시를 완료한다.

## 결정

- React tree 전체 상주 확대는 하지 않는다.
- p95 개선을 우선 수용 기준으로 삼고, 평균 지연이 악화되면 tradeoff로 기록한다.
- public release 관련 signing/notarization blocker는 이번 내부 패키징 acceptance에서 제외한다.
