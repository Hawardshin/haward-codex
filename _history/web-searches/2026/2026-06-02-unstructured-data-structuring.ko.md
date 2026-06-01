# 웹 검색 기록: 비정형 데이터 정형화

## 요청

AI가 잘하는 것 중 하나는 비정형 데이터를 정형화하는 것이라는 사용자 지시.

## 검색어

- `LLM extract structured data from unstructured text official documentation JSON schema information extraction`
- `AI unstructured data to structured data information extraction official documentation`
- `large language models structured data extraction unstructured text paper`
- `Google Cloud Document AI custom extractor structured data official documentation`
- `Azure AI Language custom named entity recognition extract structured information official documentation`
- `AWS Textract extract text and structured data from documents official documentation`

## 확인한 출처

- Google Cloud Document AI extraction overview: `https://docs.cloud.google.com/document-ai/docs/extracting-overview`
- Microsoft Azure AI Language custom NER overview: `https://learn.microsoft.com/en-us/azure/ai-services/language-service/custom-named-entity-recognition/overview`
- Amazon Textract overview: `https://docs.aws.amazon.com/textract/latest/dg/what-is.html`
- Amazon Textract response objects: `https://docs.aws.amazon.com/textract/latest/dg/how-it-works-document-layout.html`
- Structured information extraction from scientific text with LLMs: `https://pmc.ncbi.nlm.nih.gov/articles/PMC10869356/`
- LLMs4SchemaDiscovery: `https://research.tue.nl/en/publications/llms4schemadiscovery-a-human-in-the-loop-workflow-for-scientific-/`

## 제외한 약한 출처

- 일반 블로그의 “LLM으로 JSON 만들기” 튜토리얼은 제품/논문 수준의 근거가 충분해 채택하지 않았다.
- 도구 광고성 페이지는 정확한 schema/provenance/validation 원칙을 세우는 근거로 약해 제외했다.

## 계획 반영

- 정형화는 요약이 아니라 schema-driven extraction으로 다룬다.
- 각 값은 source provenance와 source location을 가져야 한다.
- 누락, 모호, 충돌, 추론값을 분리해 downstream 자동화의 과신을 줄인다.
- 정형화 결과를 근거나 자동화 입력으로 쓰기 전 schema validation, source sample audit, contradiction check를 요구한다.

## 불확실성

- 이번 작업은 플랫폼 원칙과 profile/workflow 설계다.
- 실제 OCR, 문서 파서, LLM extractor 도입 시에는 해당 도구의 최신 문서, 라이선스, 비용, 보안, 테스트를 별도로 확인해야 한다.
