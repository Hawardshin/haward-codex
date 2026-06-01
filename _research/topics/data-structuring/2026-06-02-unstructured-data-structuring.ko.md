# 비정형 데이터 정형화 조사 메모

## 핵심 결론

AI가 잘하는 일 중 하나는 비정형 또는 반정형 입력에서 구조를 찾아내는 것이다. 플랫폼에서는 이 능력을 긴 대화, 조사 자료, 문서, 리뷰, 로그, 메모를 요구사항, 스펙, 태스크, evidence item, 표, JSON, 평가 입력으로 바꾸는 공통 capability로 다룬다.

## 근거 역할

- Google Document AI는 문서에서 key-value, table, schema-defined entity, layout structure를 추출하는 제품군을 제공한다.
- Azure Custom NER는 domain-specific entity를 unstructured text에서 추출하는 흐름과 schema/label/evaluation lifecycle을 보여준다.
- Amazon Textract는 문서를 text, form, table, block object, confidence, geometry 같은 구조로 반환한다.
- 구조화 정보 추출 논문들은 LLM이 schema를 따라 scientific text에서 record를 추출할 수 있지만, task-specific evaluation과 human-in-the-loop schema refinement가 중요함을 보여준다.

## 플랫폼 적용

- 정형화 작업은 먼저 target schema를 정한다.
- 직접 추출한 값, 모델 해석, 파생 점수, 추천을 분리한다.
- 각 값에는 source pointer를 붙인다.
- 누락/모호/충돌은 빈칸 대신 명시 상태로 남긴다.
- downstream 자동화 전 schema validation과 sample/source audit를 수행한다.

## 재사용 주의

정형화 결과는 깔끔해 보여도 근거 자체는 아니다. 정형화된 표나 JSON은 출처, confidence, 검증이 붙을 때만 다음 계획이나 자동화의 입력으로 쓴다.
