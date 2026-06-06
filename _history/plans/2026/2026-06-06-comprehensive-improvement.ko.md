# 2026-06-06 종합 개선 구현 계획

## 목표

`platform-desktop-app`의 EVAL 탭에 종합 개선 cockpit를 추가해 성능, UX, 네이티브 리소스, EVAL 근거, 패키징, 오픈소스 활용, 자동화 연속성을 한 화면에서 비교한다.

## 단계

1. 웹 기준과 저장소 hot anchor 확인.
2. 대범위 요청을 `EvaluationReportPanel` 중심 slice로 분해.
3. 종합 개선 점수 모델과 7개 차원을 UI에 구현.
4. CSS를 추가해 desktop dense surface로 읽히게 한다.
5. `check-comprehensive-improvement-contract.mjs`를 추가하고 `npm run check`에 연결한다.
6. 테스트 기대값을 갱신한다.
7. collector, check, test, build, package, Browser smoke를 실행한다.
8. 평가, trace, omission/resource/timing 기록 후 commit/push한다.

## 결정

- 새 탭을 만들지 않는다. 기존 EVAL 탭이 목적과 잘 맞고 resident/preload 최적화 구조를 건드리지 않아 성능 위험이 낮다.
- 외부 EVAL runner는 설치하지 않는다. 설치 audit이 필요한 별도 slice로 분리한다.
- 점수는 지금은 repository evidence 기반이며, 이후 runtime telemetry 기반으로 보강할 수 있게 차원 ID를 고정한다.
