# Source Collector

## 목적

웹 검색에서 모은 많은 출처를 반복적으로 정리하기 위한 Python 도구다.

이 도구는 현재 단계에서 직접 웹을 크롤링하지 않는다. 대신 웹 검색, OpenAI web search, SearXNG, Tavily, SerpApi, 수동 조사 등에서 얻은 결과를 JSON으로 넣으면 다음을 수행한다.

- 검색어와 출처 목록 정규화
- 사람이 실제로 검색하듯 query ladder 생성
- 출처 유형별 bundle coverage 확인
- 공식 자료, 논문, 기술 블로그, 오픈소스, 커뮤니티/소셜 신호, 반대 사례 충족 여부 확인
- 출처 품질 점수와 adoption signal 점수 계산
- Markdown 리서치 보고서와 JSON 요약 생성

나중에 실제 검색 provider adapter를 붙일 수 있도록 입력/출력 형식을 먼저 고정한다.

## 입력

기본 템플릿:

```bash
python3 _tools/source-collector/src/source_collector.py init /tmp/source-bundle.json --topic "agent search automation" --purpose "Choose source collection automation." --access-date 2026-05-31
```

입력 파일은 다음 필드를 가진다.

- `topic`
- `purpose`
- `access_date`
- `queries`
- `required_bundle`
- `sources`
- `notes`

출처 유형:

- `official`
- `paper`
- `standard`
- `open_source`
- `tech_blog`
- `analysis`
- `community`
- `social`
- `news`
- `internal`
- `contrary`
- `other`

## 명령

사람형 검색 query ladder 생성:

```bash
python3 _tools/source-collector/src/source_collector.py query-plan "agent search automation" --depth deep --output /tmp/query-plan.md --json-output /tmp/query-plan.json
```

보고서 생성:

```bash
python3 _tools/source-collector/src/source_collector.py report _tools/source-collector/examples/source-bundle-template.json --output /tmp/source-report.md --json-output /tmp/source-report.json
```

bundle 충족 여부 확인:

```bash
python3 _tools/source-collector/src/source_collector.py check _tools/source-collector/examples/source-bundle-template.json
```

엄격 모드:

```bash
python3 _tools/source-collector/src/source_collector.py check _tools/source-collector/examples/source-bundle-template.json --strict
```

## 점수 해석

- `quality_score`: 출처 유형, 저자/발행자, 날짜, claim, 신뢰도 메모, 계획 영향이 반영된 점수
- `adoption_signal_score`: likes, shares, comments, GitHub stars, Hacker News points, Reddit score, LinkedIn reactions 같은 인기도/현업 신호 점수

중요: adoption signal은 사실 증명이 아니라 무엇을 더 조사할지 알려주는 신호다.

## 검증

```bash
python3 -m unittest discover -s _tools/source-collector/tests
```

## 향후 확장

- SearXNG adapter
- Tavily adapter
- SerpApi adapter
- OpenAI web search 결과 importer
- query plan을 실제 provider별 검색 요청으로 변환하는 adapter
- source-quality evaluator agent 연동
