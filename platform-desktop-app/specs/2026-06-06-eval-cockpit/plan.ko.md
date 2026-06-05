# 구현 계획: AI EVAL cockpit

## 단계

1. 웹 검색과 메모리 부트스트랩을 수행하고 오픈소스 EVAL 후보를 확인한다.
2. 큰 요청을 이번 slice로 분해한다: EVAL 탭, 오픈소스 후보 레지스트리, Tool Studio 물개 캐릭터, 테스트/빌드.
3. `EvaluationReportPanel`을 추가하고 `MonitorShell`의 section/view/home/task flow에 연결한다.
4. EVAL 스타일을 추가해 기본 버튼/카드처럼 보이지 않도록 한다.
5. Tool Studio 3D character parts를 seal flipper/whisker 기반으로 교체한다.
6. 제품/뷰 모드/오픈소스 레지스트리를 갱신한다.
7. 요구사항, 스펙, 연구, 검색, 검증, close-out 기록을 남긴다.
8. tests, config contract, build, internal package, Browser smoke를 실행한다.
9. 커밋하고 `origin/main`에 push한다.

## 위험과 완화

- 위험: 외부 EVAL runner를 바로 설치하면 dependency/security scope가 커진다.
  완화: 이번 slice는 local-first report와 후보 registry까지만 구현한다.
- 위험: EVAL 탭이 기존 개선 루프와 중복된다.
  완화: `intent`는 후보 추출, `eval`은 점수/비교 보고서로 역할을 분리한다.
- 위험: resident panel 수 증가로 메모리 사용량이 늘어난다.
  완화: 사용자 요청이 메모리 사용을 통한 탭 지연 완화를 요구했고, cap을 6으로 제한한다.
