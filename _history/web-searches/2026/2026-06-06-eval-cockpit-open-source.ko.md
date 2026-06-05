# 웹 검색 기록: AI EVAL cockpit 오픈소스 후보

## 목적

사용자가 AI 평가 기능, EVAL 오픈소스 기능, 현재 작업 EVAL 탭, 히스토리/토큰/툴 사용 비교 보고서를 요청했다. 구현 전 공식 문서와 공개 저장소를 확인해 후보 도구와 UI 비교 축을 정했다.

## 검색어

- `OpenAI Evals GitHub open source evaluation framework official`
- `Inspect AI evaluation framework official documentation GitHub`
- `promptfoo open source LLM eval framework official docs GitHub`
- `DeepEval open source LLM evaluation framework official docs GitHub`
- `Ragas open source evaluation framework official docs GitHub`
- `Comet Opik open source LLM evaluation observability official docs GitHub`
- `Arize Phoenix open source LLM evaluation observability official docs GitHub`
- `Langfuse open source LLM observability evaluation official docs GitHub`
- `AI evaluation report dashboard best practices model comparison traces tokens tools`
- `LLM evaluation dashboard open source UI score report trace comparison official docs`

## 확인한 강한 출처

| 출처 | 유형 | 확인 내용 | 계획 반영 |
| --- | --- | --- | --- |
| https://github.com/openai/evals | 공식 GitHub | eval registry/runner 계열 후보 | EVAL 후보 목록에 추가 |
| https://inspect.aisi.org.uk/ | 공식 docs | task/scorer/log/viewer 기반 평가 구조 | 시나리오/score display 참고 |
| https://github.com/promptfoo/promptfoo | 공식 GitHub | prompt/provider 비교와 assertion 기반 regression gate | provider 비교 후보로 추가 |
| https://github.com/confident-ai/deepeval | 공식 GitHub | pytest-style LLM test와 agent/tool-use eval 후보 | 툴 사용 평가 후보로 추가 |
| https://github.com/explodinggradients/ragas | 공식 GitHub | RAG 평가와 testset/metric 후보 | RAG-specific score 후보로 추가 |
| https://github.com/Arize-ai/phoenix | 공식 GitHub | trace/eval/debugging observability | trace score 후보로 추가 |
| https://github.com/comet-ml/opik | 공식 GitHub | traces, scoring, prompt optimization | local/self-host score 후보로 추가 |
| https://github.com/langfuse/langfuse | 공식 GitHub | traces, datasets, scores, prompt management | score-on-trace 후보로 유지 |

## 계획 영향

- 이번 slice는 외부 runner를 설치하지 않고 local-first `EvaluationReportPanel`을 구현한다.
- 오픈소스 후보는 `open-source-feature-reference-registry.json`에 추가한다.
- UI는 current work score, evidence coverage, tool signals, token/cost trace, history comparison, scenarios, candidates, bottlenecks를 보여준다.
- 후속으로 실제 runner를 붙일 때는 설치 감사와 라이선스/보안 검토가 필요하다.

## 약한 출처/제외

- SEO형 비교 글과 vendor ranking page는 후보 발견에는 도움될 수 있지만 구현 근거로 쓰지 않았다.
- 커뮤니티 반응은 채택/발견 신호일 뿐 품질 근거가 아니므로 이번 판단 근거에서 제외했다.

## 불확실성

- 각 프로젝트의 최신 기능, 라이선스, 배포 방식은 변경될 수 있다.
- 실제 설치 전에는 repository clone, license review, security review, rollback plan이 필요하다.
