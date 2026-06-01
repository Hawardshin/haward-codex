# 딥리서치 에이전트 조사 노트

## 요약

딥리서치 에이전트는 단순 검색 요약이 아니라 긴 보고서를 만들기 위한 조사 패키지를 만든다. 주요 패턴은 계획, 질문 분해, 반복 검색, 출처 랭킹, 근거 추출, 모순 정리, 합성, citation audit, skeptic review, 보고서 작성이다.

## 핵심 근거

- OpenAI API Deep Research는 복잡한 분석/조사 작업에서 다수 출처를 찾아 분석/종합해 포괄적인 보고서를 만드는 모델을 제시한다.
- Exa Research API는 planning, searching, reasoning/synthesis의 비동기 다단계 파이프라인을 제시한다.
- LangChain Deep Agents deep research 예시는 todo 계획, sub-agent 조사, 검색 결과 평가, citation 포함 최종 보고서 합성을 강조한다.
- `langchain-ai/open_deep_research`는 supervisor-researcher, parallel processing, MCP support 같은 구현 패턴을 보여준다.
- Cited but Not Verified와 ReportBench 계열 연구는 citation이 존재해도 실제 source support가 약할 수 있으므로 citation audit와 unsupported claim 검사가 필요하다고 본다.

## 설계에 반영한 내용

- 기존 `research-insight-planner-agent`와 분리한다.
- `deep-research-agent`는 보고서 작성 준비 상태를 검증한다.
- 필수 단계는 query decomposition, source strategy, iterative retrieval, source quality review, evidence extraction, contradiction mapping, synthesis, report writing plan, citation audit, skeptic review로 둔다.
- 긴 보고서 산출물은 `report_outline`, `report_targets`, `evidence_items`, `source_value_provenance`를 가져야 한다.

## 남은 개선점

- 실제 검색 API/브라우저/MCP 연결은 이번 구현 이후 별도 확장으로 검토한다.
- 여러 실제 보고서가 쌓이면 source count와 evidence item threshold를 조정한다.

