# 검색 기반 인사이트 계획 정책

## 목적

모든 새 지시는 먼저 웹 검색을 수행한다. 중요한 계획은 AI의 내부 확률적 추정만으로 세우지 않고, 웹 검색, 저장소 검색, 공식 문서, 논문, 코드/패키지 자료처럼 여러 검색 채널에서 근거를 모은 뒤 인사이트와 실행 계획으로 바꾼다.

조사 에이전트는 플랫폼의 핵심 기능으로 취급한다. 기본 형태는 Perplexity식 answer engine이다. 즉 검색 결과를 그대로 요약하지 않고, 질문 이해, 검색/검색 확장, 출처 순위화, 증거 추출, 종합, citation grounding, skeptic review 단계를 거친다.

철학적 배경은 [_philosophy/agent-operating-philosophy.ko.md](../_philosophy/agent-operating-philosophy.ko.md)에 둔다. 이 문서는 그 철학을 실행 정책으로 옮긴다.

## 기본 원칙

- 모든 새 사용자 지시는 웹 검색으로 시작한다.
- 최신성이나 외부 사실이 중요한 작업은 검색 결과의 원문과 확인 날짜를 남긴다.
- 웹 검색과 최소 하나 이상의 다른 검색 채널을 함께 사용한다.
- 기본 조사 프로필은 `agent-platform/configs/research/research-agent-profile.json`이다.
- 더 넓은 검색 원천은 `agent-platform/configs/research/source-discovery-registry.json`에서 확인한다.
- 한국 사용자 리뷰나 로컬 판단이 필요한 작업은 Naver Map, Kakao Map, Naver Blog/Search, 공식 페이지를 우선 확인하고 `_tools/korean-local-review/`로 후보 품질을 점수화한다.
- 계획 입력에는 `research_profile_paths`, `answer_engine_stages`, `citation_requirements`를 기록한다.
- 중요한 원천값, 설정값, 주장, 리뷰 신호, 가정, 계획 제약은 `source_value_provenance`에 기록한다.
- 실행 계획의 각 중요한 단계는 `plan_evidence`로 확인한 출처, 저장소 근거, 명시적 가정에 연결한다.
- `answer_engine_stages`에는 `query_understanding`, `search_retrieval`, `source_ranking`, `evidence_extraction`, `synthesis`, `citation_grounding`, `skeptic_review`를 모두 포함한다.
- 검색 결과를 그대로 답으로 쓰지 않고, 계획에 영향을 주는 인사이트로 재구성한다.
- 출처는 권위, 최신성, 독립성, 관련성, 방법론, claim 적합도에 따라 순위화한다.
- citation은 증명 자체가 아니라 검증 핸들이다. 인용된 출처가 해당 주장을 실제로 뒷받침하는지 확인한다.
- 내부 지식 베이스를 참고할 때는 `knowledge-skeptic-agent`로 틀렸을 가능성을 검증한다.
- 유용한 외부 레퍼런스는 `_research/`에 저장한다.
- 계획 과정은 `_history/plans/YYYY/`에 저장한다.
- 계획에는 실행 단계와 검증 단계를 함께 둔다.
- 코딩 조사는 일반 인사이트 계획 후 `coding-research-agent`로 구현 전 종료 질문까지 확인한다.

## 검색 채널

- 웹 검색: 최신 정보, 현재 문서, 외부 사례
- 저장소 검색: 기존 정책, 히스토리, 프로젝트 문서
- 공식 문서 검색: API, 라이브러리, 제품 사양
- 논문/기술 자료 검색: 에이전트 설계, 검색/추론 패턴
- 코드/패키지 검색: 실제 구현 방식, 유지보수 상태, 라이선스

## 산출물

작업 전 계획에는 다음을 남긴다.

- 목표
- 검색 질문
- 사용한 검색 채널
- 확인한 출처
- 사용한 조사 프로필 경로
- answer engine 단계
- citation 요구사항
- 원천값 출처
- 계획 단계별 근거
- 도출한 인사이트
- 계획 단계
- 검증 단계
- 남은 불확실성
- 재사용 리서치 저장 위치
- 계획 히스토리 저장 위치

## 명령

`agent-platform/`에서 실행한다.

```bash
PYTHONPATH=src python3 -m agent_platform.cli plan-from-research configs/planning/research-insight-plan-template.json
PYTHONPATH=src python3 -m agent_platform.cli complete-coding-research configs/planning/coding-research-template.json
```

## 계획 히스토리

계획을 세우는 과정은 다음 위치에 저장한다.

```text
_history/plans/YYYY/YYYY-MM-DD-<slug>.ko.md
```

계획이 실행 중 바뀌면 같은 파일의 변경 이력에 사유를 남긴다.
