# 연구: AI EVAL cockpit 오픈소스 패턴

## 결론

현재 플랫폼에는 곧바로 외부 EVAL runner를 설치하기보다, 먼저 local-first 평가 cockpit이 필요하다. 이유는 현재 누락된 핵심이 runner 자체보다 “현재 작업, 히스토리, 토큰/툴 사용, 검증 근거를 한 화면에서 비교하는 사용성 표면”이기 때문이다.

## 후보 도구별 참고 패턴

| 후보 | 참고 패턴 | 이번 적용 |
| --- | --- | --- |
| OpenAI Evals | eval registry, runner, result reports | 후보 목록과 report 구조 참고 |
| Inspect AI | task/scorer/log/viewer 분리 | 시나리오와 score display 모델 참고 |
| promptfoo | prompt/provider assertions, CI gate | provider 비교/회귀 평가 후보 |
| DeepEval | pytest-style metrics, agent/tool-use eval | 툴 사용 비교 후보 |
| Phoenix | trace debugging, OpenInference/eval | unified event/trace score 후보 |
| Opik | traces, scoring, prompt optimization | self-host trace score 후보 |
| Langfuse | datasets, traces, scores, prompt management | score-on-trace 후보 |
| Ragas | RAG metrics, testset generation | RAG 특화 평가 후보 |

## 현재 플랫폼에 맞는 구조

- `eval` 탭은 사용자/개발자 모두가 보는 제품 표면이다.
- `intent` 탭은 개선 후보를 뽑는 루프이고, `eval` 탭은 점수와 비교를 보여주는 루프다.
- score는 아직 공식 benchmark가 아니라 repository snapshot 문서 메타데이터 기반의 실행 품질 신호다.
- token/cost는 현재 구조화 필드가 부족하므로 “비교 가능성 점수”로 표시하고 후속 schema 개선 후보로 남긴다.

## 설치 판단

이번 구현에서 설치는 하지 않는다. 외부 도구 설치는 다음 조건이 충족될 때 진행한다.

- 설치 범위와 exact command가 정해진다.
- 라이선스와 보안 검토가 기록된다.
- rollback plan과 verification command가 있다.
- provider credential과 local trace data boundary가 명확하다.
