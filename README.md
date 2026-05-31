# Codex Agent Workspace

이 저장소는 개인 에이전트 구축 플랫폼과 관련 프로젝트를 장기적으로 관리하는 작업 공간이다.

## 운영 원칙

- 모든 작업 산출물은 이 저장소의 git 이력으로 추적한다.
- 의미 있는 변경 단위가 끝날 때마다 커밋한다.
- 커밋이 만들어지면 바로 원격 저장소에 push한다.
- 의미 있는 작업을 닫기 전 초기 지시와 결과를 평가하고, 차이가 있으면 재작업한다.
- 평가 전에는 했던 작업을 요약하고 관련된 이전 작업이나 좋은 레퍼런스를 먼저 조사한다.
- 앞으로 모든 새 지시는 웹 검색을 먼저 수행한 뒤 계획, 저장소 탐색, 구현으로 들어간다.
- 모든 재사용 프롬프트 실행도 `_ops/prompts/README.ko.md`의 공통 계약을 따라 웹 검색으로 시작한다.
- 의미 있는 작업은 `_history/web-searches/YYYY/`에 공개 검색 판단 요약을 남기고 평가 입력에 `web_search_record_targets`를 포함한다.
- 공개 검색 판단 요약에는 검색어, 확인한 출처, 제외한 약한 출처, 계획 반영 인사이트, 남은 불확실성을 남기며 내부 추론 원문은 저장하지 않는다.
- 웹 검색 후에는 `memory-bootstrap-agent`로 필수 메모리 anchor를 확인하고 핵심 세팅을 로드한다.
- 조사나 계획에 영향을 주는 검색은 공식 자료, 논문, 외국 기술 블로그, 오픈소스, 조사 아티클, 커뮤니티/소셜 신호를 폭넓게 수집한다.
- 중요한 계획은 AI의 내부 추정만으로 세우지 않고, 웹 검색과 다른 검색 채널을 통해 인사이트를 도출한 뒤 수립한다.
- `research-insight-planner-agent`는 핵심 조사 에이전트이며 Perplexity식 answer engine처럼 질문 이해, 검색, 출처 순위화, 증거 추출, 종합, citation grounding, skeptic review 단계를 거친다.
- 일반 조사 계획은 `agent-platform/configs/research/research-agent-profile.json`, `answer_engine_stages`, `citation_requirements`를 기록한다.
- API, 라이브러리, 버그 원인, 아키텍처, 성능, 보안, 마이그레이션 같은 코딩 조사는 `coding-research-agent`로 표준 종료 질문까지 답한 뒤 구현한다.
- 코딩 조사는 `source_types`를 명시하고 최소 3개 이상의 서로 다른 출처 유형을 통해 확인한다.
- 코딩 조사는 어떤 출처 설정을 참고했는지 `reference_config_paths`로 남긴다.
- 소스 코드를 작성하는 에이전트는 관련 오픈소스 구조, 참고 구현, 잘 작성된 코드와 테스트를 조사하고 `code_reference_sources`, `code_reference_notes`로 남긴다.
- 공유 설정 파일은 `reader_guide`, `reference_links`, `structure_rules`, `field_guide`를 포함해 파일만 열어도 참고 링크와 구조 규칙을 알 수 있어야 한다.
- 최종 산출물에 사실 주장이 포함되면 `hallucination-guard-agent`로 근거, 검증, 불확실성 표시를 확인한다.
- 이 저장소의 운영 철학은 `_philosophy/`에 둔다.
- 의미 있는 작업의 최종 평가는 `_history/evaluations/YYYY/` 아래 파일로 남긴다.
- 중요한 계획을 세우는 과정은 `_history/plans/YYYY/` 아래 파일로 남긴다.
- 나중에 문서만 보고도 한 일을 쉽게 파악할 수 있도록 `_history/work-summaries/YYYY/` 아래 빠른 작업 요약을 남긴다.
- 진행 중인 에이전트와 병렬 작업은 `_ops/coordination/`에서 한 번에 볼 수 있게 관리한다.
- 여러 프로젝트는 저장소 최상단의 개별 폴더로 관리한다.
- 프로젝트별 코드, 문서, 설정, 산출물은 해당 프로젝트 폴더 안에 둔다.
- 새 관심사나 독립 라이프사이클이 생기면 새 루트 프로젝트로 만들고 `_ops/projects/`에 등록한다.
- 공통 문서, 템플릿, 보관 자료처럼 프로젝트가 아닌 폴더는 `_` 접두어를 사용한다.
- 반복되는 작업은 필요한 경우 스킬, 도구, 템플릿으로 승격한다.
- 긴 대화에서 중요한 결정과 작업 내용은 저장소 문서와 히스토리 로그로 압축한다.
- 에이전트 구현은 특별한 이유가 없으면 Python을 우선한다.
- 직접 만들기 전에 성숙한 오픈소스 도구와 라이브러리를 먼저 검토한다.
- 작업에 맞는 성숙한 오픈소스가 있으면 필요할 때 프로젝트/도구 범위에 설치해 사용한다.
- 오픈소스 설치 전에는 설치 명령, dependency 기록 파일, 라이선스/보안 검토, 검증 방법, rollback 계획을 남긴다.
- 실제 설치, 업그레이드, 제거, 전역 환경 변경은 `_history/installations/YYYY/`에 상세 기록을 남기고 `_ops/installations/registry.json`에 인덱싱한다.
- 설치 작업을 닫을 때는 평가 입력에 `installation_occurred`와 `installation_record_targets`를 남긴다.
- 반복 적용해야 하는 사용자 지시는 저장소 규칙으로 문서화한다.
- 사용자가 읽는 문서와 히스토리는 한국어를 기본으로 한다.
- 실제 실행 프롬프트 본문은 토큰 절약을 위해 영어로 작성한다.
- 중요한 지속 문서는 한국어 문서와 영어 문서를 함께 둔다.

## 최상단 폴더 규칙

프로젝트 폴더는 루트에 직접 만든다.

```text
codex/
  agent-platform/
  browser-agent/
  research-agent/
  _docs/
  _philosophy/
  _history/
  _ops/
  _ops/projects/
  _research/
  _skills/
  _templates/
  _tools/
  _archive/
```

프로젝트 폴더 이름은 다음 규칙을 따른다.

- `kebab-case`를 사용한다.
- 목적이 드러나는 짧은 이름을 쓴다.
- 실험용 프로젝트는 `experiment-` 접두어를 붙인다.
- 더 이상 진행하지 않는 프로젝트는 `_archive/`로 옮긴다.

## 예약 폴더

- `_docs/`: 저장소 전체 운영 문서와 의사결정 기록
- `_philosophy/`: 에이전트와 플랫폼 운영의 근본 철학
- `_history/`: 날짜별 작업 히스토리와 요약
- `_history/work-summaries/`: 사람이 빠르게 읽는 날짜별 작업 요약과 HTML 인덱스
- `_history/web-searches/`: 프롬프트/작업마다 수행한 웹 검색과 공개 판단 요약
- `_history/plans/`: 에이전트가 계획을 세운 과정 기록
- `_ops/`: 운영 허브, 프롬프트, 워크플로, 저장소 맵
- `_ops/installations/`: 설치 레지스트리와 설치 감사 추적 규칙
- `_ops/projects/`: 루트 프로젝트 등록부와 경계 관리
- `_research/`: 인터넷 조사와 외부 레퍼런스 중 재사용 가치가 있는 내용
- `_skills/`: git으로 추적할 커스텀 Codex 스킬 원본과 레지스트리
- `_templates/`: 새 프로젝트를 만들 때 복사할 기본 구조
- `_tools/`: 여러 프로젝트에서 재사용할 로컬 도구와 스크립트
- `_archive/`: 중단, 폐기, 보류된 프로젝트

## 새 프로젝트 기본 구조

```text
project-name/
  README.md
  artifacts/
  docs/
  src/
  tests/
```

프로젝트 성격에 따라 `src/`와 `tests/`가 필요 없을 수 있지만, `README.md`는 반드시 둔다.

프로젝트 전용 파일은 해당 프로젝트 폴더 안에 둔다. 여러 프로젝트에서 재사용되는 자산만 `_tools/`, `_templates/`, `_docs/`, `_ops/`, `_research/`, `_skills/`, `_philosophy/`로 승격한다.

## 문서와 산출물 형식

- Markdown은 규칙, 로그, 결정 기록, 간단한 설명에 기본으로 사용한다.
- HTML은 대시보드, 시각적 보고서, 제품 명세, 리뷰 가능한 산출물처럼 브라우저에서 보는 편이 나은 경우 적극 검토한다.
- 프로젝트별 HTML 산출물은 기본적으로 `project-name/artifacts/` 아래에 둔다.
- 장기적으로 재사용할 HTML 패턴은 `_templates/html-artifact/`에 템플릿으로 정리한다.
- 중요한 운영 문서는 `name.ko.md`, `name.en.md` 형식으로 한국어/영어 병렬 문서를 만든다.
- 프롬프트 문서의 설명은 한국어로 쓸 수 있지만, 실제 `Prompt` 코드 블록은 영어로 쓴다.

## 작업 히스토리

- 날짜별 작업 로그는 `_history/YYYY/YYYY-MM-DD.md`에 기록한다.
- 빠른 작업 요약은 `_history/work-summaries/YYYY/YYYY-MM-DD.ko.md`와 영어 companion에 기록한다.
- 브라우저로 한눈에 볼 요약은 `_history/work-summaries/index.html`에 둔다.
- 로그에는 목적, 변경 파일, 주요 결정, 커밋 해시를 남긴다.
- 컨텍스트가 길어지면 대화 내용을 요약해 히스토리와 관련 프로젝트 문서에 반영한다.

## 운영 허브

- 작업 시작점은 `_ops/index.md`로 둔다.
- 모든 새 지시는 `_ops/workflows/05-web-first-intake.md`에 따라 웹 검색으로 시작한다.
- 프롬프트 공통 계약은 `_ops/prompts/README.ko.md`에서 확인하고, 검색 기록 템플릿은 `_templates/web-search-record/`에서 확인한다.
- AI가 세팅을 잊지 않게 하는 부트스트랩 manifest는 `agent-platform/configs/memory/bootstrap-manifest.json`에 둔다.
- 공유 설정 파일의 자기 설명 기준은 `_docs/self-documenting-config-policy.ko.md`와 `agent-platform`의 `check-config-contract` 명령을 따른다.
- 출처 수집 기준은 `_docs/source-collection-policy.ko.md`를 따른다.
- 오픈소스 설치 기준은 `_docs/open-source-installation-policy.ko.md`를 따른다.
- 설치 기록은 `_ops/installations/registry.json`과 `_history/installations/`에서 확인한다.
- 핵심 조사 에이전트 프로필은 `agent-platform/configs/research/research-agent-profile.json`에서 확인한다.
- 진행 중인 에이전트와 병렬 작업은 `_ops/coordination/board.ko.md`와 `_ops/coordination/board.html`에서 확인한다.
- 완료된 작업을 빠르게 볼 때는 `_history/work-summaries/index.html` 또는 `_history/work-summaries/YYYY/YYYY-MM-DD.ko.md`를 먼저 확인한다.
- 프로젝트 목록과 경계는 `_ops/projects/index.ko.md`와 `_ops/projects/registry.json`에서 확인한다.
- 반복 프롬프트는 `_ops/prompts/`에서 관리한다.
- 반복 워크플로는 `_ops/workflows/`에서 관리한다.
- 운영 철학은 `_philosophy/`에서 관리한다.
- 작업 종료 전 평가는 `_ops/workflows/40-evaluate-and-rework.md`를 따른다.
- 검색 기반 계획 과정은 `_history/plans/`에 저장한다.
- 무엇이 어디에 있는지에 대한 지도는 `_ops/maps/`에 둔다.
- 구조가 바뀌면 `python3 _tools/workspace-index/src/workspace_index.py`로 맵을 갱신한다.

## 작업 평가 루프

- `work-evaluator-agent`가 초기 지시, 실제 결과, 변경 파일, 검증 결과를 비교한다.
- 평가 입력에는 작업 요약과 확인한 레퍼런스를 포함한다.
- 평가 입력에는 검색 과정 기록 파일 경로인 `web_search_record_targets`를 포함한다.
- 평가 입력에는 사용자가 나중에 읽을 요약 파일 경로인 `work_summary_targets`를 포함한다.
- 관련 작업을 평가할 때는 저장소 내 이전 작업, 공식 문서, 성숙한 오픈소스, 좋은 외부 사례를 먼저 확인한다.
- 외부 사실이나 최신 정보가 계획에 영향을 주면 `research-insight-planner-agent`로 검색, 인사이트, 계획, 검증 단계를 구조화한다.
- `research-insight-planner-agent`를 쓰는 작업은 계획 히스토리 파일 경로를 지정하고 저장한다.
- 코딩 조사 후 구현으로 넘어갈 때는 `coding-research-agent`로 확인한 출처, 선택지, 추천안, 위험, 검증 계획, 다음 행동을 구조화한다.
- 설치가 실제로 발생한 작업은 `_history/installations/YYYY/` 상세 기록과 `_ops/installations/registry.json` 인덱스를 확인한다.
- 인터넷 조사에서 다음에도 참고할 가치가 있는 내용은 `_research/`에 출처와 함께 문서화한다.
- 지식 베이스를 근거로 사용할 때는 `knowledge-skeptic-agent`로 틀렸을 가능성을 검증한다.
- 최종 답변, 문서, 계획, 평가 보고서에 사실 주장이 있으면 `hallucination-guard-agent`가 주장별 근거와 검증 단계를 확인한다.
- 근거 없는 주장은 삭제하거나, 검증하거나, 불확실성으로 명시한다.
- 누락이나 불일치가 있으면 follow-up action으로 바꾸고 다시 작업한다.
- 재작업 후 평가와 검증을 다시 통과한 뒤 커밋하고 push한다.
- 최종 평가 보고서는 `_history/evaluations/YYYY/YYYY-MM-DD-<slug>.ko.md`에 저장한다.
- 평가 에이전트 설정은 `agent-platform/configs/agents/work-evaluator-agent.json`에 둔다.

## 스킬과 도구 승격 기준

- 반복되는 판단 절차나 도메인 지식은 스킬 후보로 본다.
- 반복 실행되는 명령, 변환, 검증, 생성 작업은 도구 후보로 본다.
- 새 스킬 원본은 `_skills/`에, 재사용 도구는 `_tools/`에 추적한다.
- 실제 Codex 스킬 설치가 필요하면 `$CODEX_HOME/skills`에 반영하되, 원본은 이 저장소에서 관리한다.
- 많은 출처를 반복적으로 정리할 때는 `_tools/source-collector/`로 출처 묶음을 정규화하고 점수화한다.

## 구현 선호

- 에이전트 런타임과 백엔드 자동화는 Python을 기본 선택지로 둔다.
- 프론트엔드, 브라우저 UI, 정적 산출물은 프로젝트 성격에 맞춰 HTML, CSS, JavaScript 또는 별도 프레임워크를 사용할 수 있다.
- 오픈소스는 유지보수 상태, 라이선스, 문서 품질, 커뮤니티 신뢰도를 확인하고 사용한다.
- 검증된 오픈소스로 해결되는 기반 기능은 직접 구현하지 않는 쪽을 우선 검토한다.
- 설치가 필요한 오픈소스는 project-local dependency로 기록하고 테스트나 smoke test로 검증한다.

## 커밋 규칙

커밋 메시지는 다음 형식을 기본으로 한다.

```text
type(scope): summary
```

예시:

- `docs(workspace): define project folder rules`
- `feat(agent-platform): add first workflow runner`
- `fix(browser-agent): handle empty page title`

권장 타입:

- `docs`: 문서 변경
- `feat`: 기능 추가
- `fix`: 버그 수정
- `refactor`: 동작 변경 없는 구조 개선
- `test`: 테스트 추가 또는 수정
- `chore`: 설정, 빌드, 기타 관리 작업

커밋 후에는 별도 지시가 없어도 즉시 `origin/main`에 push한다.
